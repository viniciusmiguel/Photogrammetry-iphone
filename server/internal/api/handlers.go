// Package api implements the HTTP layer: routing, middleware, SSE, and the
// upload/list/detail/delete handlers backed by storage and processing.
package api

import (
	"encoding/json"
	"log/slog"
	"mime/multipart"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/vmiguel/photogrammetry-server/internal/processing"
	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// Handlers holds the dependencies shared by all HTTP handlers.
type Handlers struct {
	store  *storage.Store
	queue  *processing.Queue
	broker *SSEBroker
}

// NewHandlers wires the handler set with its injected dependencies.
func NewHandlers(store *storage.Store, queue *processing.Queue, broker *SSEBroker) *Handlers {
	return &Handlers{store: store, queue: queue, broker: broker}
}

// scanDetail is the /api/scans/{id} response: meta plus discovered files,
// split by stage so the web UI can pick the viewer (processed) and the raw
// data browser (raw) without re-parsing paths.
type scanDetail struct {
	storage.Meta
	RawFiles       []string `json:"raw_files"`
	ProcessedFiles []string `json:"processed_files"`
}

// splitByStage partitions relative scan paths into the raw/ and processed/
// buckets the web UI expects. Other files (e.g. meta.json) are ignored.
func splitByStage(files []string) (raw, processed []string) {
	raw, processed = []string{}, []string{}
	for _, f := range files {
		switch {
		case strings.HasPrefix(f, "raw/"):
			raw = append(raw, f)
		case strings.HasPrefix(f, "processed/"):
			processed = append(processed, f)
		}
	}
	return raw, processed
}

// Health reports liveness.
func (h *Handlers) Health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// UploadSpace accepts a multipart space scan, persists it, and enqueues it.
func (h *Handlers) UploadSpace(w http.ResponseWriter, r *http.Request) {
	form, err := h.parseUpload(w, r)
	if err != nil {
		return
	}
	id, ok := h.createScan(w, storage.ModeSpace)
	if !ok {
		return
	}
	kfCount, err := saveSpaceUpload(h.store, id, form)
	if err != nil {
		h.failUpload(w, id, err)
		return
	}
	slog.Info("space upload received", "scan_id", id, "keyframes", kfCount)
	h.enqueueAndAccept(w, id, storage.ModeSpace)
}

// UploadObject accepts a multipart object scan, persists it, and enqueues it.
func (h *Handlers) UploadObject(w http.ResponseWriter, r *http.Request) {
	form, err := h.parseUpload(w, r)
	if err != nil {
		return
	}
	id, ok := h.createScan(w, storage.ModeObject)
	if !ok {
		return
	}
	imgCount, err := saveObjectUpload(h.store, id, form)
	if err != nil {
		h.failUpload(w, id, err)
		return
	}
	slog.Info("object upload received", "scan_id", id, "images", imgCount)
	h.enqueueAndAccept(w, id, storage.ModeObject)
}

// parseUpload parses the multipart form or writes a 400 and returns an error.
func (h *Handlers) parseUpload(w http.ResponseWriter, r *http.Request) (*multipart.Form, error) {
	if err := r.ParseMultipartForm(maxUploadMemory); err != nil {
		writeError(w, http.StatusBadRequest, "invalid multipart form: "+err.Error())
		return nil, err
	}
	return r.MultipartForm, nil
}

// createScan generates an id and creates the scan dir, or writes a 500.
func (h *Handlers) createScan(w http.ResponseWriter, mode string) (string, bool) {
	id, err := newUUIDv4()
	if err != nil {
		writeError(w, http.StatusInternalServerError, "generating scan id: "+err.Error())
		return "", false
	}
	if _, err := h.store.CreateScan(id, mode); err != nil {
		writeError(w, http.StatusInternalServerError, "creating scan: "+err.Error())
		return "", false
	}
	return id, true
}

// failUpload deletes a partially-written scan and writes a 400.
func (h *Handlers) failUpload(w http.ResponseWriter, id string, err error) {
	slog.Error("upload failed", "scan_id", id, "error", err)
	_ = h.store.DeleteScan(id)
	writeError(w, http.StatusBadRequest, err.Error())
}

// enqueueAndAccept queues the job and returns 202 with the scan id.
func (h *Handlers) enqueueAndAccept(w http.ResponseWriter, id, mode string) {
	h.queue.Enqueue(processing.Job{ScanID: id, Mode: mode})
	writeJSON(w, http.StatusAccepted, map[string]string{"scan_id": id})
}

// ListScans returns all scans, newest first.
func (h *Handlers) ListScans(w http.ResponseWriter, r *http.Request) {
	metas, err := h.store.ListScans()
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	if metas == nil {
		metas = []storage.Meta{}
	}
	writeJSON(w, http.StatusOK, metas)
}

// GetScan returns meta + file list for one scan, or 404.
func (h *Handlers) GetScan(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if !h.store.ScanExists(id) {
		writeError(w, http.StatusNotFound, "scan not found: "+id)
		return
	}
	meta, err := h.store.ReadMeta(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	files, err := h.store.ListFiles(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	raw, processed := splitByStage(files)
	writeJSON(w, http.StatusOK, scanDetail{
		Meta: meta, RawFiles: raw, ProcessedFiles: processed})
}

// DeleteScan removes a scan directory, or 404 if unknown.
func (h *Handlers) DeleteScan(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if !h.store.ScanExists(id) {
		writeError(w, http.StatusNotFound, "scan not found: "+id)
		return
	}
	if err := h.store.DeleteScan(id); err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"deleted": id})
}

// Reprocess re-runs the processing pipeline on an existing scan's stored raw
// data (overwriting its processed outputs), so algorithm improvements can be
// applied without re-capturing from the phone. Returns 202 like an upload.
func (h *Handlers) Reprocess(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if !h.store.ScanExists(id) {
		writeError(w, http.StatusNotFound, "scan not found: "+id)
		return
	}
	meta, err := h.store.ReadMeta(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	slog.Info("reprocess requested", "scan_id", id, "mode", meta.Mode)
	h.enqueueAndAccept(w, id, meta.Mode)
}

// writeJSON encodes v as JSON with the given status code.
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(v); err != nil {
		slog.Error("encoding json response", "error", err)
	}
}

// writeError writes a JSON {"error": msg} body with the given status.
func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}
