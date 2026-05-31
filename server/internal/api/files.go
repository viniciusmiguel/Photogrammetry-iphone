package api

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi/v5"
)

// ServeScanFile serves a file under <data-root>/<id>/, guarding against path
// traversal by cleaning the request path and verifying the resolved path stays
// within the scan directory. Sets Access-Control-Allow-Origin: * for the SPA.
func (h *Handlers) ServeScanFile(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	rel := chi.URLParam(r, "*")
	scanDir := h.store.ScanDir(id)
	resolved, ok := safeJoin(scanDir, rel)
	if !ok {
		writeError(w, http.StatusBadRequest, "invalid file path: "+rel)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// Revalidate via Last-Modified so a reprocess (which rewrites processed/
	// files) is picked up instead of a stale cached copy. ServeFile answers
	// conditional requests with 304 when unchanged.
	w.Header().Set("Cache-Control", "no-cache")
	http.ServeFile(w, r, resolved)
}

// safeJoin cleans rel against base and confirms the result stays within base.
// Returns ok=false on any attempted escape (e.g. "../").
func safeJoin(base, rel string) (string, bool) {
	cleaned := filepath.Clean("/" + rel) // anchor to root, collapsing ".."
	joined := filepath.Join(base, cleaned)
	absBase, err := filepath.Abs(base)
	if err != nil {
		return "", false
	}
	absJoined, err := filepath.Abs(joined)
	if err != nil {
		return "", false
	}
	if absJoined != absBase && !strings.HasPrefix(absJoined, absBase+string(filepath.Separator)) {
		return "", false
	}
	return absJoined, true
}
