package processing

import (
	"bytes"
	"context"
	"encoding/binary"
	"encoding/json"
	"image"
	"image/jpeg"
	"os"
	"path/filepath"
	"testing"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// recordingPublisher captures published events for assertions. It is the named
// fake used in place of the real SSE broker.
type recordingPublisher struct {
	events []Event
}

func (r *recordingPublisher) Publish(_ string, e Event) { r.events = append(r.events, e) }

// hasProgress reports whether a progress event with the given fraction exists.
func (r *recordingPublisher) hasFraction(f float64) bool {
	for _, e := range r.events {
		if e.Type != "progress" {
			continue
		}
		var p progressData
		if json.Unmarshal(e.Data, &p) == nil && p.Fraction == f {
			return true
		}
	}
	return false
}

func TestSpaceProcessor_ProcessWritesOutputs(t *testing.T) {
	store, _ := storage.NewStore(t.TempDir())
	id := "space-1"
	if _, err := store.CreateScan(id, storage.ModeSpace); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	writeSpaceRaw(t, store, id)
	pub := &recordingPublisher{}
	sp := NewSpaceProcessor(store, pub)
	stats, err := sp.Process(id)
	if err != nil {
		t.Fatalf("Process: %v", err)
	}
	if stats.FaceCount != 1 || stats.KeyframeCount != 1 || stats.AnchorCount != 1 {
		t.Fatalf("unexpected stats: %+v", stats)
	}
	if stats.PointCount != 2 {
		t.Fatalf("PointCount = %d, want 2", stats.PointCount)
	}
	assertProcessedOutputs(t, store, id)
	if !pub.hasFraction(1.0) {
		t.Error("missing final progress event")
	}
}

// assertProcessedOutputs verifies the three processed files exist.
func assertProcessedOutputs(t *testing.T, store *storage.Store, id string) {
	t.Helper()
	for _, name := range []string{"mesh.obj", "mesh.mtl", "texture.png"} {
		p := filepath.Join(store.ProcessedDir(id), name)
		if _, err := os.Stat(p); err != nil {
			t.Errorf("expected output %q: %v", name, err)
		}
	}
}

// writeSpaceRaw writes a minimal but valid raw space scan into the store.
func writeSpaceRaw(t *testing.T, store *storage.Store, id string) {
	t.Helper()
	raw := store.RawDir(id)
	if err := os.WriteFile(filepath.Join(raw, "mesh_anchors.bin"), spaceAnchorBlob(), 0o644); err != nil {
		t.Fatalf("write anchors: %v", err)
	}
	writeKeyframe(t, raw)
	if err := os.WriteFile(filepath.Join(raw, "pointcloud.ply"), []byte(samplePLY), 0o644); err != nil {
		t.Fatalf("write ply: %v", err)
	}
}

// spaceAnchorBlob builds a one-anchor, one-triangle blob in the z=0 plane.
func spaceAnchorBlob() []byte {
	var buf bytes.Buffer
	w := func(v any) { binary.Write(&buf, binary.LittleEndian, v) }
	w(uint32(1))                    // anchor count
	w([16]byte{})                   // uuid
	w(identity4())                  // transform
	w(uint32(3))                    // vertexCount
	w(uint32(12))                   // stride
	for _, v := range frontFace() { // reuse texture_baker_test geometry
		w([3]float32{v[0], v[1], v[2]})
	}
	w(uint32(1)) // faceCount
	w(uint32(4)) // bytesPerIndex
	w([3]uint32{0, 1, 2})
	return buf.Bytes()
}

// writeKeyframe writes keyframes_meta.json + a solid JPEG facing the triangle.
func writeKeyframe(t *testing.T, rawDir string) {
	t.Helper()
	img := image.NewRGBA(image.Rect(0, 0, 256, 256))
	for i := 0; i < len(img.Pix); i += 4 {
		img.Pix[i], img.Pix[i+1], img.Pix[i+2], img.Pix[i+3] = 0, 200, 0, 255
	}
	f, err := os.Create(filepath.Join(rawDir, "keyframe_000.jpg"))
	if err != nil {
		t.Fatalf("create jpeg: %v", err)
	}
	defer f.Close()
	if err := jpeg.Encode(f, img, &jpeg.Options{Quality: 100}); err != nil {
		t.Fatalf("encode jpeg: %v", err)
	}
	transform := identity4()
	transform[14] = 3 // camera at (0,0,3)
	meta := keyframeMetaFile{Keyframes: []keyframeMetaEntry{{
		Index:      0,
		Transform:  transform,
		Intrinsics: [9]float32{120, 0, 0, 0, 120, 0, 128, 128, 1},
	}}}
	meta.Keyframes[0].Resolution.Width = 256
	meta.Keyframes[0].Resolution.Height = 256
	b, _ := json.Marshal(meta)
	if err := os.WriteFile(filepath.Join(rawDir, "keyframes_meta.json"), b, 0o644); err != nil {
		t.Fatalf("write meta: %v", err)
	}
}

func TestObjectProcessor_MissingColmapFails(t *testing.T) {
	store, _ := storage.NewStore(t.TempDir())
	id := "obj-1"
	if _, err := store.CreateScan(id, storage.ModeObject); err != nil {
		t.Fatalf("CreateScan: %v", err)
	}
	op := NewObjectProcessor(store, &recordingPublisher{}, "/no/such/colmap")
	_, err := op.Process(context.Background(), id)
	if err == nil {
		t.Fatal("expected error for missing colmap binary")
	}
}
