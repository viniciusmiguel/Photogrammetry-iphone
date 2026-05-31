package processing

import (
	"math"
	"testing"
)

func TestPackUVAtlas_ZeroFaces(t *testing.T) {
	layout := PackUVAtlas(0, 2048)
	if len(layout.FaceUVs) != 0 || len(layout.CellOrigins) != 0 {
		t.Fatalf("expected empty layout, got %d UVs", len(layout.FaceUVs))
	}
	if layout.CellSize < 8 {
		t.Fatalf("cellSize = %d, want >= 8", layout.CellSize)
	}
}

func TestPackUVAtlas_CellSizeShrinksWithMoreFaces(t *testing.T) {
	few := PackUVAtlas(4, 2048)
	many := PackUVAtlas(4096, 2048)
	if many.CellSize >= few.CellSize {
		t.Fatalf("cellSize did not shrink: few=%d many=%d", few.CellSize, many.CellSize)
	}
	if many.CellSize < 8 {
		t.Fatalf("cellSize floor violated: %d", many.CellSize)
	}
}

func TestPackUVAtlas_VFlipInvariant(t *testing.T) {
	layout := PackUVAtlas(16, 2048)
	inv := float32(layout.AtlasSize)
	for i := range layout.FaceUVs {
		cy := layout.CellOrigins[i][1]
		// Top vertices use pixel V = cy+0.5; OBJ V = 1 - that.
		wantTopV := 1.0 - (float32(cy)+0.5)/inv
		gotTopV := layout.FaceUVs[i][0][1]
		if math.Abs(float64(gotTopV-wantTopV)) > 1e-6 {
			t.Fatalf("face %d top V = %f, want %f (V-flip broken)", i, gotTopV, wantTopV)
		}
	}
}

func TestPackUVAtlas_CellOriginsTile(t *testing.T) {
	// 16 faces in a 256-px atlas keeps cellSize small so several cells fit per
	// row, letting us assert horizontal then vertical tiling.
	layout := PackUVAtlas(16, 256)
	if layout.CellOrigins[0] != [2]int{0, 0} {
		t.Fatalf("first cell origin = %v, want [0 0]", layout.CellOrigins[0])
	}
	cellsPerRow := 256 / layout.CellSize
	if cellsPerRow < 2 {
		t.Fatalf("test needs >=2 cells per row, got %d", cellsPerRow)
	}
	if layout.CellOrigins[1][0] != layout.CellSize || layout.CellOrigins[1][1] != 0 {
		t.Fatalf("second cell origin = %v, want [%d 0]", layout.CellOrigins[1], layout.CellSize)
	}
}
