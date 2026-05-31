package processing

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// ObjectProcessor runs the COLMAP object-scan pipeline over uploaded images.
type ObjectProcessor struct {
	store      *storage.Store
	pub        Publisher
	colmapPath string
}

// NewObjectProcessor wires an ObjectProcessor with its store, publisher, and
// the configured colmap binary path.
func NewObjectProcessor(store *storage.Store, pub Publisher, colmapPath string) *ObjectProcessor {
	return &ObjectProcessor{store: store, pub: pub, colmapPath: colmapPath}
}

// Process runs feature extraction, matching, mapping, and OBJ conversion for
// scanID. Fails early with a clear message if the colmap binary is absent.
func (op *ObjectProcessor) Process(ctx context.Context, scanID string) (storage.RawStats, error) {
	if _, err := os.Stat(op.colmapPath); err != nil {
		return storage.RawStats{}, fmt.Errorf("colmap binary not found at %q: %w", op.colmapPath, err)
	}
	imageCount, err := op.countImages(scanID)
	if err != nil {
		return storage.RawStats{}, err
	}
	if err := op.runPipeline(ctx, scanID); err != nil {
		return storage.RawStats{}, err
	}
	publishProgress(op.pub, scanID, 1.0, "done")
	return storage.RawStats{KeyframeCount: imageCount}, nil
}

// runPipeline executes the COLMAP stages in order, publishing progress.
func (op *ObjectProcessor) runPipeline(ctx context.Context, scanID string) error {
	runner := NewColmapRunner(op.colmapPath, newLogWriter(op.pub, scanID))
	dbPath := filepath.Join(op.store.ScanDir(scanID), "colmap.db")
	imagesDir := filepath.Join(op.store.RawDir(scanID), "images")
	sparseDir := filepath.Join(op.store.ScanDir(scanID), "sparse")
	if err := os.MkdirAll(sparseDir, 0o755); err != nil {
		return fmt.Errorf("creating sparse dir %q: %w", sparseDir, err)
	}
	for _, stage := range colmapStages(dbPath, imagesDir, sparseDir, op.store.ProcessedDir(scanID)) {
		publishProgress(op.pub, scanID, stage.fraction, stage.name)
		if err := runner.Run(ctx, stage.args...); err != nil {
			return err
		}
	}
	return nil
}

// colmapStage is one named COLMAP invocation with progress weight.
type colmapStage struct {
	name     string
	fraction float64
	args     []string
}

// colmapStages builds the ordered COLMAP command sequence.
func colmapStages(dbPath, imagesDir, sparseDir, processedDir string) []colmapStage {
	modelDir := filepath.Join(sparseDir, "0")
	return []colmapStage{
		{"feature_extractor", 0.2, []string{"feature_extractor", "--database_path", dbPath, "--image_path", imagesDir}},
		{"exhaustive_matcher", 0.4, []string{"exhaustive_matcher", "--database_path", dbPath}},
		{"mapper", 0.7, []string{"mapper", "--database_path", dbPath, "--image_path", imagesDir, "--output_path", sparseDir}},
		{"model_converter", 0.9, []string{"model_converter", "--input_path", modelDir, "--output_path", filepath.Join(processedDir, "model.obj"), "--output_type", "OBJ"}},
	}
}

// countImages counts files in raw/images for stats.
func (op *ObjectProcessor) countImages(scanID string) (int, error) {
	dir := filepath.Join(op.store.RawDir(scanID), "images")
	entries, err := os.ReadDir(dir)
	if err != nil {
		return 0, fmt.Errorf("reading images dir %q: %w", dir, err)
	}
	count := 0
	for _, e := range entries {
		if !e.IsDir() {
			count++
		}
	}
	return count, nil
}

// logWriter adapts COLMAP's line stream into SSE "log" events. It buffers
// partial writes and emits one event per complete line.
type logWriter struct {
	pub    Publisher
	scanID string
	buf    bytes.Buffer
}

// newLogWriter returns a logWriter publishing to pub for scanID.
func newLogWriter(pub Publisher, scanID string) *logWriter {
	return &logWriter{pub: pub, scanID: scanID}
}

// Write accumulates bytes and flushes complete newline-terminated lines.
func (w *logWriter) Write(p []byte) (int, error) {
	w.buf.Write(p)
	for {
		line, err := w.buf.ReadString('\n')
		if err != nil {
			w.buf.WriteString(line) // put back the partial line
			break
		}
		publishLog(w.pub, w.scanID, trimNewline(line))
	}
	return len(p), nil
}

// trimNewline strips a single trailing \n (and optional \r) from s.
func trimNewline(s string) string {
	if n := len(s); n > 0 && s[n-1] == '\n' {
		s = s[:n-1]
		if n := len(s); n > 0 && s[n-1] == '\r' {
			s = s[:n-1]
		}
	}
	return s
}
