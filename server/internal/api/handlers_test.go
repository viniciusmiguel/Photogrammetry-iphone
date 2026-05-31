package api

import (
	"bufio"
	"bytes"
	"context"
	"encoding/binary"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/vmiguel/photogrammetry-server/internal/processing"
	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// testServer wires a router over a temp-dir store for handler tests.
func testServer(t *testing.T) (http.Handler, *storage.Store) {
	t.Helper()
	store, err := storage.NewStore(t.TempDir())
	if err != nil {
		t.Fatalf("NewStore: %v", err)
	}
	broker := NewSSEBroker()
	queue := processing.NewQueue(store, NewProcessingPublisher(broker), "/no/such/colmap")
	h := NewHandlers(store, queue, broker)
	return NewRouter(h, http.NotFoundHandler()), store
}

func TestHealth(t *testing.T) {
	srv, _ := testServer(t)
	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/health", nil))
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `"ok"`) {
		t.Fatalf("health = %d %q", rec.Code, rec.Body.String())
	}
}

func TestListScans_Empty(t *testing.T) {
	srv, _ := testServer(t)
	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/scans", nil))
	if rec.Code != http.StatusOK || strings.TrimSpace(rec.Body.String()) != "[]" {
		t.Fatalf("list = %d %q, want 200 []", rec.Code, rec.Body.String())
	}
}

func TestGetScan_Unknown404(t *testing.T) {
	srv, _ := testServer(t)
	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/scans/nope", nil))
	if rec.Code != http.StatusNotFound {
		t.Fatalf("status = %d, want 404", rec.Code)
	}
}

func TestUploadSpace_Returns202WithScanID(t *testing.T) {
	srv, store := testServer(t)
	body, contentType := buildSpaceMultipart(t)
	req := httptest.NewRequest(http.MethodPost, "/api/scans/space", body)
	req.Header.Set("Content-Type", contentType)
	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, req)
	if rec.Code != http.StatusAccepted {
		t.Fatalf("status = %d, want 202: %s", rec.Code, rec.Body.String())
	}
	var resp map[string]string
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil || resp["scan_id"] == "" {
		t.Fatalf("response = %s, err=%v", rec.Body.String(), err)
	}
	// Let the async job reach a terminal state before the temp dir is torn
	// down, so the processing goroutine doesn't write into a removed path.
	waitForTerminal(t, store, resp["scan_id"])
}

// Regression: the scan detail must split files into raw_files/processed_files so
// the web UI can pick the 3D viewer and raw-data browser without re-parsing.
func TestGetScan_SplitsRawAndProcessedFiles(t *testing.T) {
	srv, store := testServer(t)
	body, contentType := buildSpaceMultipart(t)
	req := httptest.NewRequest(http.MethodPost, "/api/scans/space", body)
	req.Header.Set("Content-Type", contentType)
	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, req)
	var accepted map[string]string
	json.Unmarshal(rec.Body.Bytes(), &accepted)
	id := accepted["scan_id"]
	waitForTerminal(t, store, id)

	detailRec := httptest.NewRecorder()
	srv.ServeHTTP(detailRec, httptest.NewRequest(http.MethodGet, "/api/scans/"+id, nil))
	var detail struct {
		RawFiles       []string `json:"raw_files"`
		ProcessedFiles []string `json:"processed_files"`
	}
	if err := json.Unmarshal(detailRec.Body.Bytes(), &detail); err != nil {
		t.Fatalf("decode detail: %v (%s)", err, detailRec.Body.String())
	}
	if !containsPrefixed(detail.RawFiles, "raw/") {
		t.Errorf("raw_files = %v, want at least one raw/ entry", detail.RawFiles)
	}
	if !contains(detail.ProcessedFiles, "processed/mesh.obj") {
		t.Errorf("processed_files = %v, want processed/mesh.obj", detail.ProcessedFiles)
	}
}

func TestReprocess_RerunsStoredRawData(t *testing.T) {
	srv, store := testServer(t)
	body, contentType := buildSpaceMultipart(t)
	req := httptest.NewRequest(http.MethodPost, "/api/scans/space", body)
	req.Header.Set("Content-Type", contentType)
	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, req)
	var accepted map[string]string
	json.Unmarshal(rec.Body.Bytes(), &accepted)
	id := accepted["scan_id"]
	waitForTerminal(t, store, id)

	rrec := httptest.NewRecorder()
	srv.ServeHTTP(rrec, httptest.NewRequest(http.MethodPost, "/api/scans/"+id+"/reprocess", nil))
	if rrec.Code != http.StatusAccepted {
		t.Fatalf("reprocess = %d, want 202: %s", rrec.Code, rrec.Body.String())
	}
	var resp map[string]string
	json.Unmarshal(rrec.Body.Bytes(), &resp)
	if resp["scan_id"] != id {
		t.Fatalf("reprocess scan_id = %q, want %q", resp["scan_id"], id)
	}
	waitForTerminal(t, store, id)

	unknown := httptest.NewRecorder()
	srv.ServeHTTP(unknown, httptest.NewRequest(http.MethodPost, "/api/scans/nope/reprocess", nil))
	if unknown.Code != http.StatusNotFound {
		t.Fatalf("reprocess unknown = %d, want 404", unknown.Code)
	}
}

func contains(list []string, want string) bool {
	for _, v := range list {
		if v == want {
			return true
		}
	}
	return false
}

func containsPrefixed(list []string, prefix string) bool {
	for _, v := range list {
		if strings.HasPrefix(v, prefix) {
			return true
		}
	}
	return false
}

func TestEvents_EmitsDataFraming(t *testing.T) {
	store, _ := storage.NewStore(t.TempDir())
	broker := NewSSEBroker()
	queue := processing.NewQueue(store, NewProcessingPublisher(broker), "/no/such/colmap")
	h := NewHandlers(store, queue, broker)
	ts := httptest.NewServer(NewRouter(h, http.NotFoundHandler()))
	defer ts.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, ts.URL+"/api/scans/sse-x/events", nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("GET events: %v", err)
	}
	defer resp.Body.Close()

	waitForSubscriber(broker, "sse-x")
	broker.PublishJSON("sse-x", "completed", map[string]int{"face_count": 0})

	line, err := bufio.NewReader(resp.Body).ReadString('\n')
	if err != nil {
		t.Fatalf("reading event line: %v", err)
	}
	if !strings.HasPrefix(line, "data: ") {
		t.Fatalf("missing SSE framing, got %q", line)
	}
}

// waitForTerminal blocks until the scan reaches completed/failed so async
// processing finishes before the test's temp dir is removed.
func waitForTerminal(t *testing.T, store *storage.Store, id string) {
	t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		m, err := store.ReadMeta(id)
		if err == nil && (m.Status == storage.StatusCompleted || m.Status == storage.StatusFailed) {
			return
		}
		time.Sleep(10 * time.Millisecond)
	}
}

// waitForSubscriber blocks until scanID has at least one broker subscriber.
func waitForSubscriber(broker *SSEBroker, scanID string) {
	deadline := time.Now().Add(time.Second)
	for time.Now().Before(deadline) {
		broker.mu.RLock()
		n := len(broker.clients[scanID])
		broker.mu.RUnlock()
		if n > 0 {
			return
		}
		time.Sleep(5 * time.Millisecond)
	}
}

// buildSpaceMultipart constructs a valid space-scan multipart body and returns
// it with its Content-Type header. One anchor, one keyframe, a tiny PLY.
func buildSpaceMultipart(t *testing.T) (*bytes.Buffer, string) {
	t.Helper()
	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	writeField(t, mw, "mesh_anchors", "mesh_anchors.bin", emptyAnchorBlob())
	writeField(t, mw, "keyframes_meta", "keyframes_meta.json", []byte(`{"keyframes":[]}`))
	writeField(t, mw, "point_cloud", "pointcloud.ply", []byte("ply\nformat ascii 1.0\nelement vertex 0\nend_header\n"))
	writeField(t, mw, "keyframe_0", "keyframe_0.jpg", []byte("not-a-real-jpeg"))
	if err := mw.Close(); err != nil {
		t.Fatalf("closing multipart: %v", err)
	}
	return &buf, mw.FormDataContentType()
}

// writeField writes one form-file part.
func writeField(t *testing.T, mw *multipart.Writer, field, filename string, content []byte) {
	t.Helper()
	w, err := mw.CreateFormFile(field, filename)
	if err != nil {
		t.Fatalf("CreateFormFile %q: %v", field, err)
	}
	if _, err := w.Write(content); err != nil {
		t.Fatalf("write part %q: %v", field, err)
	}
}

// emptyAnchorBlob is a valid zero-anchor mesh blob (count=0).
func emptyAnchorBlob() []byte {
	var b bytes.Buffer
	binary.Write(&b, binary.LittleEndian, uint32(0))
	return b.Bytes()
}
