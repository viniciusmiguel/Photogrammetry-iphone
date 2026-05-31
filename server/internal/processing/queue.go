package processing

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// Job describes a single scan to process.
type Job struct {
	ScanID string
	Mode   string
}

// Queue runs scan-processing jobs, one goroutine per job. It dispatches to the
// space or object processor based on Job.Mode and updates meta.json + SSE on
// completion.
type Queue struct {
	store  *storage.Store
	pub    Publisher
	space  *SpaceProcessor
	object *ObjectProcessor
	jobs   chan Job
}

// NewQueue wires the queue with its store, publisher, and colmap path, and
// starts the dispatch loop.
func NewQueue(store *storage.Store, pub Publisher, colmapPath string) *Queue {
	q := &Queue{
		store:  store,
		pub:    pub,
		space:  NewSpaceProcessor(store, pub),
		object: NewObjectProcessor(store, pub, colmapPath),
		jobs:   make(chan Job, 64),
	}
	go q.dispatch()
	return q
}

// Enqueue submits a job for asynchronous processing.
func (q *Queue) Enqueue(job Job) { q.jobs <- job }

// dispatch consumes jobs, spawning one goroutine per job.
func (q *Queue) dispatch() {
	for job := range q.jobs {
		go q.process(job)
	}
}

// process runs one job end to end and records its terminal state.
func (q *Queue) process(job Job) {
	slog.Info("processing job", "scan_id", job.ScanID, "mode", job.Mode)
	if err := q.store.UpdateStatus(job.ScanID, storage.StatusProcessing, ""); err != nil {
		slog.Error("setting processing status", "scan_id", job.ScanID, "error", err)
	}
	stats, err := q.run(job)
	if err != nil {
		q.fail(job.ScanID, err)
		return
	}
	q.complete(job.ScanID, stats)
}

// run dispatches to the correct processor for the job's mode.
func (q *Queue) run(job Job) (storage.RawStats, error) {
	switch job.Mode {
	case storage.ModeSpace:
		return q.space.Process(job.ScanID)
	case storage.ModeObject:
		return q.object.Process(context.Background(), job.ScanID)
	default:
		return storage.RawStats{}, fmt.Errorf("unknown mode %q for scan %q", job.Mode, job.ScanID)
	}
}

// complete marks the scan completed, persisting stats and an SSE event.
func (q *Queue) complete(scanID string, stats storage.RawStats) {
	m, err := q.store.ReadMeta(scanID)
	if err == nil {
		m.Status = storage.StatusCompleted
		m.RawStats = stats
		m.Error = ""
		if err := q.store.WriteMeta(m); err != nil {
			slog.Error("writing completed meta", "scan_id", scanID, "error", err)
		}
	}
	raw, _ := json.Marshal(stats)
	q.pub.Publish(scanID, Event{Type: "completed", Data: raw})
	slog.Info("job completed", "scan_id", scanID, "stats", stats)
}

// fail marks the scan failed with err and publishes a failed SSE event.
func (q *Queue) fail(scanID string, jobErr error) {
	if err := q.store.UpdateStatus(scanID, storage.StatusFailed, jobErr.Error()); err != nil {
		slog.Error("writing failed meta", "scan_id", scanID, "error", err)
	}
	raw, _ := json.Marshal(map[string]string{"error": jobErr.Error()})
	q.pub.Publish(scanID, Event{Type: "failed", Data: raw})
	slog.Error("job failed", "scan_id", scanID, "error", jobErr)
}
