package api

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"testing/fstest"
)

// spaFS builds an in-memory dist tree with index.html and one asset.
func spaFS() fstest.MapFS {
	return fstest.MapFS{
		"index.html":    {Data: []byte("<html>spa-index</html>")},
		"assets/app.js": {Data: []byte("console.log(1)")},
	}
}

func TestSPAHandler_ServesAsset(t *testing.T) {
	h := NewSPAHandler(spaFS(), []byte("<html>spa-index</html>"))
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/assets/app.js", nil))
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), "console.log") {
		t.Fatalf("asset = %d %q", rec.Code, rec.Body.String())
	}
}

func TestSPAHandler_FallsBackToIndex(t *testing.T) {
	h := NewSPAHandler(spaFS(), []byte("<html>spa-index</html>"))
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/library/123", nil))
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), "spa-index") {
		t.Fatalf("fallback = %d %q", rec.Code, rec.Body.String())
	}
}

func TestSPAHandler_APIPathNotFound(t *testing.T) {
	h := NewSPAHandler(spaFS(), []byte("<html>spa-index</html>"))
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/unknown", nil))
	if rec.Code != http.StatusNotFound {
		t.Fatalf("api path = %d, want 404", rec.Code)
	}
}
