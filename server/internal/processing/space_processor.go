package processing

import (
	"fmt"
	"image"
	"image/png"
	"os"
	"path/filepath"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// SpaceProcessor runs the space-scan pipeline: mesh anchors → UV atlas →
// texture bake → OBJ/MTL export. It reads raw inputs and writes processed
// outputs through the injected Store, publishing progress via Publisher.
type SpaceProcessor struct {
	store *storage.Store
	pub   Publisher
}

// NewSpaceProcessor wires a SpaceProcessor with its store and event publisher.
func NewSpaceProcessor(store *storage.Store, pub Publisher) *SpaceProcessor {
	return &SpaceProcessor{store: store, pub: pub}
}

// Process executes the full space pipeline for scanID, returning RawStats for
// meta.json. Progress events are published at parse/bake/export/done stages.
func (sp *SpaceProcessor) Process(scanID string) (storage.RawStats, error) {
	builder, anchorCount, err := sp.buildMesh(scanID)
	if err != nil {
		return storage.RawStats{}, err
	}
	keyframes, err := LoadKeyframes(sp.store.RawDir(scanID))
	if err != nil {
		return storage.RawStats{}, err
	}
	if err := sp.bakeAndExport(scanID, builder, keyframes); err != nil {
		return storage.RawStats{}, err
	}
	stats := storage.RawStats{
		AnchorCount:   anchorCount,
		KeyframeCount: len(keyframes),
		PointCount:    sp.countPoints(scanID),
		FaceCount:     builder.FaceCount(),
	}
	publishProgress(sp.pub, scanID, 1.0, "done")
	return stats, nil
}

// buildMesh deserializes mesh_anchors.bin and accumulates a MeshBuilder.
func (sp *SpaceProcessor) buildMesh(scanID string) (*MeshBuilder, int, error) {
	path := filepath.Join(sp.store.RawDir(scanID), "mesh_anchors.bin")
	f, err := os.Open(path)
	if err != nil {
		return nil, 0, fmt.Errorf("opening %q: %w", path, err)
	}
	defer f.Close()
	anchors, err := storage.DeserializeMeshAnchors(f)
	if err != nil {
		return nil, 0, err
	}
	builder := &MeshBuilder{}
	for _, a := range anchors {
		builder.Add(a)
	}
	publishProgress(sp.pub, scanID, 0.1, "parsed mesh anchors")
	publishLog(sp.pub, scanID, fmt.Sprintf("parsed %d anchors, %d faces", len(anchors), builder.FaceCount()))
	return builder, len(anchors), nil
}

// bakeAndExport packs UVs, bakes texture.png, and writes mesh.obj + mesh.mtl.
func (sp *SpaceProcessor) bakeAndExport(scanID string, builder *MeshBuilder, keyframes []Keyframe) error {
	faces := builder.WorldFaceVertices()
	layout := PackUVAtlas(builder.FaceCount(), DefaultAtlasSize)
	atlas := BakeTextureMultiView(faces, layout, keyframes)
	if err := sp.writeTexture(scanID, atlas); err != nil {
		return err
	}
	publishProgress(sp.pub, scanID, 0.5, "baked texture")
	if err := sp.writeOBJ(scanID, builder, layout); err != nil {
		return err
	}
	publishProgress(sp.pub, scanID, 0.9, "exported mesh")
	return nil
}

// writeTexture encodes the baked atlas to processed/texture.png.
func (sp *SpaceProcessor) writeTexture(scanID string, atlas image.Image) error {
	path := filepath.Join(sp.store.ProcessedDir(scanID), "texture.png")
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("creating %q: %w", path, err)
	}
	defer f.Close()
	if err := png.Encode(f, atlas); err != nil {
		return fmt.Errorf("encoding texture %q: %w", path, err)
	}
	return nil
}

// writeOBJ writes processed/mesh.obj and processed/mesh.mtl.
func (sp *SpaceProcessor) writeOBJ(scanID string, builder *MeshBuilder, layout UVAtlasLayout) error {
	dir := sp.store.ProcessedDir(scanID)
	objF, err := os.Create(filepath.Join(dir, "mesh.obj"))
	if err != nil {
		return fmt.Errorf("creating mesh.obj in %q: %w", dir, err)
	}
	defer objF.Close()
	mtlF, err := os.Create(filepath.Join(dir, "mesh.mtl"))
	if err != nil {
		return fmt.Errorf("creating mesh.mtl in %q: %w", dir, err)
	}
	defer mtlF.Close()
	return ExportOBJ(objF, mtlF, builder.Exploded(), layout.FaceUVs)
}

// countPoints parses pointcloud.ply for stats; returns 0 if absent/unreadable.
func (sp *SpaceProcessor) countPoints(scanID string) int {
	path := filepath.Join(sp.store.RawDir(scanID), "pointcloud.ply")
	f, err := os.Open(path)
	if err != nil {
		return 0
	}
	defer f.Close()
	pts, err := ParsePLY(f)
	if err != nil {
		return 0
	}
	return len(pts)
}
