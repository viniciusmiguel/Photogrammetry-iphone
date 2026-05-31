package processing

import "math"

// DefaultAtlasSize is the texture atlas dimension used by the space pipeline.
const DefaultAtlasSize = 2048

// UVAtlasLayout maps each face to a grid cell in the texture atlas and stores
// the per-vertex UVs (already V-flipped to OBJ convention).
type UVAtlasLayout struct {
	FaceUVs     [][3][2]float32
	CellOrigins [][2]int // pixel (cx, cy) top-left of each face's cell
	CellSize    int
	AtlasSize   int
}

// PackUVAtlas lays out faceCount faces into a square grid of cells inside an
// atlasSize×atlasSize texture. Ports the Swift UVAtlasPacker exactly,
// including the V-flip from texture-space to OBJ convention.
func PackUVAtlas(faceCount, atlasSize int) UVAtlasLayout {
	cellSize := computeCellSize(faceCount, atlasSize)
	cellsPerRow := max1(atlasSize / cellSize)
	inv := float32(atlasSize)
	layout := UVAtlasLayout{
		FaceUVs:     make([][3][2]float32, faceCount),
		CellOrigins: make([][2]int, faceCount),
		CellSize:    cellSize,
		AtlasSize:   atlasSize,
	}
	for i := 0; i < faceCount; i++ {
		col := i % cellsPerRow
		row := i / cellsPerRow
		cx := col * cellSize
		cy := row * cellSize
		layout.FaceUVs[i] = cellUVs(cx, cy, cellSize, inv)
		layout.CellOrigins[i] = [2]int{cx, cy}
	}
	return layout
}

// computeCellSize mirrors the Swift cellSize formula (min 8 px).
func computeCellSize(faceCount, atlasSize int) int {
	area := float64(atlasSize * atlasSize)
	cs := int(math.Sqrt(area / float64(max1(faceCount))))
	if cs < 8 {
		return 8
	}
	return cs
}

// cellUVs computes the three OBJ-convention UVs for a cell at (cx, cy).
func cellUVs(cx, cy, cellSize int, inv float32) [3][2]float32 {
	u0 := (float32(cx) + 0.5) / inv
	u1 := (float32(cx+cellSize) - 0.5) / inv
	u2 := (float32(cx) + float32(cellSize)*0.5) / inv
	vTop := 1.0 - (float32(cy)+0.5)/inv          // V-flip to OBJ convention
	vBot := 1.0 - (float32(cy+cellSize)-0.5)/inv // PRESERVE
	return [3][2]float32{{u0, vTop}, {u1, vTop}, {u2, vBot}}
}

// max1 returns n clamped to a minimum of 1.
func max1(n int) int {
	if n < 1 {
		return 1
	}
	return n
}
