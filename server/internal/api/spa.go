package api

import (
	"io/fs"
	"net/http"
	"strings"
)

// SPAHandler serves a single-page app from an fs.FS, falling back to
// index.html for unknown non-/api routes so client-side routing works.
type SPAHandler struct {
	files     http.FileSystem
	indexHTML []byte
}

// NewSPAHandler builds an SPA handler over dist (the embedded web/dist tree).
// indexHTML must be the contents of dist's index.html for the fallback.
func NewSPAHandler(dist fs.FS, indexHTML []byte) *SPAHandler {
	return &SPAHandler{files: http.FS(dist), indexHTML: indexHTML}
}

// ServeHTTP serves the requested asset, or the index.html fallback when the
// asset is missing and the path is not an /api route.
func (s *SPAHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/api/") {
		http.NotFound(w, r)
		return
	}
	if s.tryServeFile(w, r) {
		return
	}
	s.serveIndex(w)
}

// tryServeFile serves an existing asset, returning false if it does not exist.
func (s *SPAHandler) tryServeFile(w http.ResponseWriter, r *http.Request) bool {
	name := strings.TrimPrefix(r.URL.Path, "/")
	if name == "" {
		return false
	}
	f, err := s.files.Open(name)
	if err != nil {
		return false
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil || info.IsDir() {
		return false
	}
	http.ServeContent(w, r, name, info.ModTime(), f)
	return true
}

// serveIndex writes the SPA index.html fallback.
func (s *SPAHandler) serveIndex(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(s.indexHTML)
}
