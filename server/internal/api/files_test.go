package api

import (
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

func TestServeScanFile_ServesAndBlocksTraversal(t *testing.T) {
	srv, store := testServer(t)
	if _, err := store.CreateScan("file-1", storage.ModeSpace); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	target := filepath.Join(store.ProcessedDir("file-1"), "model.txt")
	if err := os.WriteFile(target, []byte("hello-model"), 0o644); err != nil {
		t.Fatalf("write file: %v", err)
	}

	rec := httptest.NewRecorder()
	srv.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/files/file-1/processed/model.txt", nil))
	if rec.Code != http.StatusOK || rec.Body.String() != "hello-model" {
		t.Fatalf("serve = %d %q", rec.Code, rec.Body.String())
	}
	if rec.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Error("missing CORS header on served file")
	}
}

func TestSafeJoin_NeutralizesTraversal(t *testing.T) {
	base := t.TempDir()
	// Leading ".." sequences are collapsed against root, so the result can
	// never escape base. Verify the resolved path stays within base.
	got, ok := safeJoin(base, "../../etc/passwd")
	if !ok {
		t.Fatal("neutralized path should be allowed")
	}
	if !strings.HasPrefix(got, base+string(filepath.Separator)) {
		t.Fatalf("resolved path %q escaped base %q", got, base)
	}
	if _, ok := safeJoin(base, "sub/file.txt"); !ok {
		t.Fatal("legitimate nested path should be allowed")
	}
}

func TestSafeJoin_CollapsesDotDotWithinBase(t *testing.T) {
	base := t.TempDir()
	got, ok := safeJoin(base, "a/../b.txt")
	if !ok || !strings.HasSuffix(got, "b.txt") {
		t.Fatalf("safeJoin a/../b.txt = %q ok=%v", got, ok)
	}
}
