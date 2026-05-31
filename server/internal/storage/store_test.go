package storage

import (
	"testing"
)

func TestStore_CreateReadMeta(t *testing.T) {
	store := newTestStore(t)
	m, err := store.CreateScan("scan-1", ModeSpace)
	if err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	if m.Status != StatusPending || m.Mode != ModeSpace {
		t.Fatalf("unexpected meta: %+v", m)
	}
	got, err := store.ReadMeta("scan-1")
	if err != nil {
		t.Fatalf("ReadMeta: %v", err)
	}
	if got.ID != "scan-1" || got.CreatedAt == "" {
		t.Fatalf("round-trip mismatch: %+v", got)
	}
}

func TestStore_UpdateStatus(t *testing.T) {
	store := newTestStore(t)
	if _, err := store.CreateScan("scan-2", ModeObject); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	if err := store.UpdateStatus("scan-2", StatusFailed, "boom"); err != nil {
		t.Fatalf("UpdateStatus: %v", err)
	}
	got, _ := store.ReadMeta("scan-2")
	if got.Status != StatusFailed || got.Error != "boom" {
		t.Fatalf("status not updated: %+v", got)
	}
}

func TestStore_ListScansNewestFirst(t *testing.T) {
	store := newTestStore(t)
	older := Meta{ID: "old", Mode: ModeSpace, Status: StatusCompleted, CreatedAt: "2020-01-01T00:00:00Z"}
	newer := Meta{ID: "new", Mode: ModeSpace, Status: StatusCompleted, CreatedAt: "2025-01-01T00:00:00Z"}
	for _, m := range []Meta{older, newer} {
		if _, err := store.CreateScan(m.ID, m.Mode); err != nil {
			t.Fatalf("CreateScan %s: %v", m.ID, err)
		}
		if err := store.WriteMeta(m); err != nil {
			t.Fatalf("WriteMeta %s: %v", m.ID, err)
		}
	}
	metas, err := store.ListScans()
	if err != nil {
		t.Fatalf("ListScans: %v", err)
	}
	if len(metas) != 2 || metas[0].ID != "new" {
		t.Fatalf("expected newest first, got %+v", metas)
	}
}

func TestStore_DeleteScan(t *testing.T) {
	store := newTestStore(t)
	if _, err := store.CreateScan("scan-3", ModeSpace); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	if !store.ScanExists("scan-3") {
		t.Fatal("scan should exist before delete")
	}
	if err := store.DeleteScan("scan-3"); err != nil {
		t.Fatalf("DeleteScan: %v", err)
	}
	if store.ScanExists("scan-3") {
		t.Fatal("scan should not exist after delete")
	}
}

// newTestStore builds a Store rooted in a fresh temp dir for the test.
func newTestStore(t *testing.T) *Store {
	t.Helper()
	store, err := NewStore(t.TempDir())
	if err != nil {
		t.Fatalf("NewStore: %v", err)
	}
	return store
}
