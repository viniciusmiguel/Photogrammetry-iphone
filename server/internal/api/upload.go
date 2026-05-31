package api

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// maxUploadMemory bounds in-memory multipart buffering before spilling to disk.
const maxUploadMemory = 32 << 20 // 32 MiB

// saveSpaceUpload writes all space-scan parts into the scan's raw directory.
// Returns the keyframe count discovered among the parts.
func saveSpaceUpload(store *storage.Store, scanID string, form *multipart.Form) (int, error) {
	rawDir := store.RawDir(scanID)
	if err := savePart(form, "mesh_anchors", filepath.Join(rawDir, "mesh_anchors.bin")); err != nil {
		return 0, err
	}
	if err := savePart(form, "keyframes_meta", filepath.Join(rawDir, "keyframes_meta.json")); err != nil {
		return 0, err
	}
	if err := savePart(form, "point_cloud", filepath.Join(rawDir, "pointcloud.ply")); err != nil {
		return 0, err
	}
	return saveKeyframes(rawDir, form)
}

// saveKeyframes writes each keyframe_<i> part to keyframe_<iii>.jpg.
func saveKeyframes(rawDir string, form *multipart.Form) (int, error) {
	count := 0
	for name := range form.File {
		if !strings.HasPrefix(name, "keyframe_") {
			continue
		}
		idx, err := strconv.Atoi(strings.TrimPrefix(name, "keyframe_"))
		if err != nil {
			return 0, fmt.Errorf("bad keyframe part name %q: %w", name, err)
		}
		dst := filepath.Join(rawDir, fmt.Sprintf("keyframe_%03d.jpg", idx))
		if err := savePart(form, name, dst); err != nil {
			return 0, err
		}
		count++
	}
	return count, nil
}

// saveObjectUpload writes object-scan image parts into raw/images.
// Returns the number of images saved.
func saveObjectUpload(store *storage.Store, scanID string, form *multipart.Form) (int, error) {
	imagesDir := filepath.Join(store.RawDir(scanID), "images")
	if err := os.MkdirAll(imagesDir, 0o755); err != nil {
		return 0, fmt.Errorf("creating images dir %q: %w", imagesDir, err)
	}
	count := 0
	for name := range form.File {
		if !strings.HasPrefix(name, "image_") {
			continue
		}
		idx, err := strconv.Atoi(strings.TrimPrefix(name, "image_"))
		if err != nil {
			return 0, fmt.Errorf("bad image part name %q: %w", name, err)
		}
		dst := filepath.Join(imagesDir, fmt.Sprintf("image_%d.heic", idx))
		if err := savePart(form, name, dst); err != nil {
			return 0, err
		}
		count++
	}
	return count, nil
}

// savePart copies a single multipart file part to dst.
func savePart(form *multipart.Form, partName, dst string) error {
	headers := form.File[partName]
	if len(headers) == 0 {
		return fmt.Errorf("missing required multipart part %q", partName)
	}
	src, err := headers[0].Open()
	if err != nil {
		return fmt.Errorf("opening part %q: %w", partName, err)
	}
	defer src.Close()
	out, err := os.Create(dst)
	if err != nil {
		return fmt.Errorf("creating %q: %w", dst, err)
	}
	defer out.Close()
	if _, err := io.Copy(out, src); err != nil {
		return fmt.Errorf("writing part %q to %q: %w", partName, dst, err)
	}
	return nil
}
