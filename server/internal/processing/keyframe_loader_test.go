package processing

import (
	"encoding/json"
	"image"
	"image/jpeg"
	"os"
	"path/filepath"
	"testing"
)

func TestLoadKeyframes_DecodesMetaAndImages(t *testing.T) {
	dir := t.TempDir()
	writeTestKeyframeJPEG(t, dir, 0, 32, 24)
	meta := keyframeMetaFile{Keyframes: []keyframeMetaEntry{{
		Index:      0,
		Transform:  identity4(),
		Intrinsics: [9]float32{100, 0, 0, 0, 100, 0, 16, 12, 1},
	}}}
	meta.Keyframes[0].Resolution.Width = 32
	meta.Keyframes[0].Resolution.Height = 24
	writeMetaJSON(t, dir, meta)

	kfs, err := LoadKeyframes(dir)
	if err != nil {
		t.Fatalf("LoadKeyframes: %v", err)
	}
	if len(kfs) != 1 {
		t.Fatalf("got %d keyframes, want 1", len(kfs))
	}
	if kfs[0].Width != 32 || kfs[0].Height != 24 || kfs[0].fx() != 100 {
		t.Fatalf("keyframe fields wrong: %+v", kfs[0])
	}
}

func TestLoadKeyframes_MissingMetaErrors(t *testing.T) {
	if _, err := LoadKeyframes(t.TempDir()); err == nil {
		t.Fatal("expected error for missing keyframes_meta.json")
	}
}

// writeTestKeyframeJPEG writes a solid JPEG keyframe at the given index.
func writeTestKeyframeJPEG(t *testing.T, dir string, idx, w, h int) {
	t.Helper()
	img := image.NewRGBA(image.Rect(0, 0, w, h))
	f, err := os.Create(filepath.Join(dir, "keyframe_000.jpg"))
	if err != nil {
		t.Fatalf("create jpeg: %v", err)
	}
	defer f.Close()
	if err := jpeg.Encode(f, img, nil); err != nil {
		t.Fatalf("encode jpeg: %v", err)
	}
}

// writeMetaJSON serializes meta to keyframes_meta.json in dir.
func writeMetaJSON(t *testing.T, dir string, meta keyframeMetaFile) {
	t.Helper()
	b, _ := json.Marshal(meta)
	if err := os.WriteFile(filepath.Join(dir, "keyframes_meta.json"), b, 0o644); err != nil {
		t.Fatalf("write meta: %v", err)
	}
}
