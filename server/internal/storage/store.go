// Package storage owns on-disk scan layout: scan directories, meta.json,
// and the mesh-anchor binary wire format.
package storage

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"time"
)

// Status values for a scan's lifecycle.
const (
	StatusPending    = "pending"
	StatusProcessing = "processing"
	StatusCompleted  = "completed"
	StatusFailed     = "failed"
)

// Mode values distinguishing the two capture pipelines.
const (
	ModeSpace  = "space"
	ModeObject = "object"
)

// RawStats summarizes the decoded raw inputs for a scan.
type RawStats struct {
	AnchorCount   int `json:"anchor_count"`
	KeyframeCount int `json:"keyframe_count"`
	PointCount    int `json:"point_count"`
	FaceCount     int `json:"face_count"`
}

// Meta is the persisted meta.json document for one scan.
type Meta struct {
	ID        string   `json:"id"`
	Mode      string   `json:"mode"`
	Status    string   `json:"status"`
	CreatedAt string   `json:"created_at"`
	Error     string   `json:"error,omitempty"`
	RawStats  RawStats `json:"raw_stats"`
}

// Store provides filesystem-backed scan persistence rooted at DataRoot.
type Store struct {
	dataRoot string
}

// NewStore returns a Store rooted at dataRoot, creating the root if needed.
func NewStore(dataRoot string) (*Store, error) {
	if err := os.MkdirAll(dataRoot, 0o755); err != nil {
		return nil, fmt.Errorf("creating data root %q: %w", dataRoot, err)
	}
	return &Store{dataRoot: dataRoot}, nil
}

// ScanDir returns the absolute directory for a scan id.
func (s *Store) ScanDir(id string) string { return filepath.Join(s.dataRoot, id) }

// RawDir returns the raw-input subdirectory for a scan id.
func (s *Store) RawDir(id string) string { return filepath.Join(s.dataRoot, id, "raw") }

// ProcessedDir returns the processed-output subdirectory for a scan id.
func (s *Store) ProcessedDir(id string) string {
	return filepath.Join(s.dataRoot, id, "processed")
}

// CreateScan creates the scan/raw/processed directories and writes an initial
// meta.json with status=pending. Returns the persisted Meta.
func (s *Store) CreateScan(id, mode string) (Meta, error) {
	if err := os.MkdirAll(s.RawDir(id), 0o755); err != nil {
		return Meta{}, fmt.Errorf("creating raw dir for %q: %w", id, err)
	}
	if err := os.MkdirAll(s.ProcessedDir(id), 0o755); err != nil {
		return Meta{}, fmt.Errorf("creating processed dir for %q: %w", id, err)
	}
	m := Meta{ID: id, Mode: mode, Status: StatusPending, CreatedAt: time.Now().UTC().Format(time.RFC3339)}
	if err := s.WriteMeta(m); err != nil {
		return Meta{}, err
	}
	return m, nil
}

// WriteMeta atomically writes meta.json for the scan described by m.
func (s *Store) WriteMeta(m Meta) error {
	path := filepath.Join(s.ScanDir(m.ID), "meta.json")
	b, err := json.MarshalIndent(m, "", "  ")
	if err != nil {
		return fmt.Errorf("marshaling meta for %q: %w", m.ID, err)
	}
	tmp := path + ".tmp"
	if err := os.WriteFile(tmp, b, 0o644); err != nil {
		return fmt.Errorf("writing meta tmp %q: %w", tmp, err)
	}
	if err := os.Rename(tmp, path); err != nil {
		return fmt.Errorf("renaming meta %q: %w", path, err)
	}
	return nil
}

// ReadMeta loads meta.json for the given scan id.
func (s *Store) ReadMeta(id string) (Meta, error) {
	path := filepath.Join(s.ScanDir(id), "meta.json")
	b, err := os.ReadFile(path)
	if err != nil {
		return Meta{}, fmt.Errorf("reading meta %q: %w", path, err)
	}
	var m Meta
	if err := json.Unmarshal(b, &m); err != nil {
		return Meta{}, fmt.Errorf("unmarshaling meta %q: %w", path, err)
	}
	return m, nil
}

// UpdateStatus sets status (and optional error string) on a scan's meta.json.
func (s *Store) UpdateStatus(id, status, errMsg string) error {
	m, err := s.ReadMeta(id)
	if err != nil {
		return err
	}
	m.Status = status
	m.Error = errMsg
	return s.WriteMeta(m)
}

// ListScans returns all scans' metadata, newest CreatedAt first.
func (s *Store) ListScans() ([]Meta, error) {
	entries, err := os.ReadDir(s.dataRoot)
	if err != nil {
		return nil, fmt.Errorf("reading data root %q: %w", s.dataRoot, err)
	}
	metas := make([]Meta, 0, len(entries))
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		m, err := s.ReadMeta(e.Name())
		if err != nil {
			continue // skip dirs without a readable meta.json
		}
		metas = append(metas, m)
	}
	sort.Slice(metas, func(i, j int) bool { return metas[i].CreatedAt > metas[j].CreatedAt })
	return metas, nil
}

// DeleteScan removes the entire scan directory tree.
func (s *Store) DeleteScan(id string) error {
	if err := os.RemoveAll(s.ScanDir(id)); err != nil {
		return fmt.Errorf("deleting scan %q: %w", id, err)
	}
	return nil
}

// ScanExists reports whether a scan directory with a meta.json exists.
func (s *Store) ScanExists(id string) bool {
	_, err := os.Stat(filepath.Join(s.ScanDir(id), "meta.json"))
	return err == nil
}

// ListFiles returns relative paths of all files under the scan directory.
func (s *Store) ListFiles(id string) ([]string, error) {
	root := s.ScanDir(id)
	var rels []string
	err := filepath.Walk(root, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		rel, err := filepath.Rel(root, p)
		if err != nil {
			return err
		}
		rels = append(rels, filepath.ToSlash(rel))
		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("listing files for %q: %w", id, err)
	}
	sort.Strings(rels)
	return rels, nil
}
