package processing

import (
	"testing"
	"time"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

func TestQueue_ProcessSpaceCompletes(t *testing.T) {
	store, _ := storage.NewStore(t.TempDir())
	id := "queued-space"
	if _, err := store.CreateScan(id, storage.ModeSpace); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	writeSpaceRaw(t, store, id)
	q := NewQueue(store, &recordingPublisher{}, "/no/such/colmap")
	q.Enqueue(Job{ScanID: id, Mode: storage.ModeSpace})
	if got := waitForStatus(t, store, id); got != storage.StatusCompleted {
		t.Fatalf("final status = %q, want completed", got)
	}
}

func TestQueue_UnknownModeFails(t *testing.T) {
	store, _ := storage.NewStore(t.TempDir())
	id := "queued-bad"
	if _, err := store.CreateScan(id, "bogus"); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	q := NewQueue(store, &recordingPublisher{}, "/no/such/colmap")
	q.Enqueue(Job{ScanID: id, Mode: "bogus"})
	if got := waitForStatus(t, store, id); got != storage.StatusFailed {
		t.Fatalf("final status = %q, want failed", got)
	}
}

// waitForStatus polls meta.json until the scan reaches a terminal state or the
// deadline elapses, returning the last observed status.
func waitForStatus(t *testing.T, store *storage.Store, id string) string {
	t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		m, err := store.ReadMeta(id)
		if err == nil && (m.Status == storage.StatusCompleted || m.Status == storage.StatusFailed) {
			return m.Status
		}
		time.Sleep(10 * time.Millisecond)
	}
	m, _ := store.ReadMeta(id)
	return m.Status
}
