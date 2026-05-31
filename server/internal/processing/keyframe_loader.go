package processing

import (
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"os"
	"path/filepath"
)

// keyframeMetaFile is the JSON document the iPhone uploads alongside JPEGs.
type keyframeMetaFile struct {
	Keyframes []keyframeMetaEntry `json:"keyframes"`
}

// keyframeMetaEntry describes one keyframe's camera parameters. transform and
// intrinsics are column-major float arrays as sent by iOS.
type keyframeMetaEntry struct {
	Index      int         `json:"index"`
	Transform  [16]float32 `json:"transform"`
	Intrinsics [9]float32  `json:"intrinsics"`
	Resolution struct {
		Width  int `json:"width"`
		Height int `json:"height"`
	} `json:"resolution"`
}

// LoadKeyframes reads keyframes_meta.json plus keyframe_<index>.jpg files from
// rawDir and decodes them into baker-ready Keyframes (in entry order).
//
// Example:
//
//	kfs, err := LoadKeyframes(store.RawDir(id))
func LoadKeyframes(rawDir string) ([]Keyframe, error) {
	meta, err := readKeyframeMeta(rawDir)
	if err != nil {
		return nil, err
	}
	kfs := make([]Keyframe, 0, len(meta.Keyframes))
	for _, e := range meta.Keyframes {
		kf, err := loadKeyframe(rawDir, e)
		if err != nil {
			return nil, err
		}
		kfs = append(kfs, kf)
	}
	return kfs, nil
}

// readKeyframeMeta loads and decodes keyframes_meta.json.
func readKeyframeMeta(rawDir string) (keyframeMetaFile, error) {
	path := filepath.Join(rawDir, "keyframes_meta.json")
	b, err := os.ReadFile(path)
	if err != nil {
		return keyframeMetaFile{}, fmt.Errorf("reading %q: %w", path, err)
	}
	var meta keyframeMetaFile
	if err := json.Unmarshal(b, &meta); err != nil {
		return keyframeMetaFile{}, fmt.Errorf("unmarshaling %q: %w", path, err)
	}
	return meta, nil
}

// loadKeyframe decodes one keyframe JPEG and binds it to its camera params.
func loadKeyframe(rawDir string, e keyframeMetaEntry) (Keyframe, error) {
	path := filepath.Join(rawDir, fmt.Sprintf("keyframe_%03d.jpg", e.Index))
	img, err := decodeJPEG(path)
	if err != nil {
		return Keyframe{}, err
	}
	w, h := e.Resolution.Width, e.Resolution.Height
	if w == 0 || h == 0 {
		w, h = img.Bounds().Dx(), img.Bounds().Dy()
	}
	return Keyframe{Image: img, Transform: e.Transform, Intrinsics: e.Intrinsics, Width: w, Height: h}, nil
}

// decodeJPEG reads and decodes a JPEG file into an image.Image.
func decodeJPEG(path string) (image.Image, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("opening keyframe %q: %w", path, err)
	}
	defer f.Close()
	img, err := jpeg.Decode(f)
	if err != nil {
		return nil, fmt.Errorf("decoding keyframe %q: %w", path, err)
	}
	return img, nil
}
