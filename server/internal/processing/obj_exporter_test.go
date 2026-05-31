package processing

import (
	"strings"
	"testing"
)

func TestExportOBJ_WritesGeometryAndMaterial(t *testing.T) {
	exploded := []float32{
		0, 0, 0, 1, 0, 0, 0, 1, 0, // one triangle, 9 floats
	}
	faceUVs := [][3][2]float32{{{0, 1}, {1, 1}, {0.5, 0}}}
	var obj, mtl strings.Builder
	if err := ExportOBJ(&obj, &mtl, exploded, faceUVs); err != nil {
		t.Fatalf("ExportOBJ: %v", err)
	}
	o := obj.String()
	for _, want := range []string{"mtllib mesh.mtl", "usemtl baked", "v 0.000000 0.000000 0.000000", "vt 0.000000 1.000000", "f 1/1 2/2 3/3"} {
		if !strings.Contains(o, want) {
			t.Errorf("OBJ missing %q\n%s", want, o)
		}
	}
	if !strings.Contains(mtl.String(), "map_Kd texture.png") {
		t.Errorf("MTL missing map_Kd:\n%s", mtl.String())
	}
}

func TestExportOBJ_VertexCountMatchesFaces(t *testing.T) {
	exploded := make([]float32, 18) // 2 faces
	faceUVs := [][3][2]float32{{}, {}}
	var obj, mtl strings.Builder
	if err := ExportOBJ(&obj, &mtl, exploded, faceUVs); err != nil {
		t.Fatalf("ExportOBJ: %v", err)
	}
	if got := countLinesPrefixed(obj.String(), "v "); got != 6 {
		t.Fatalf("got %d v lines, want 6", got)
	}
	if got := countLinesPrefixed(obj.String(), "f "); got != 2 {
		t.Fatalf("got %d f lines, want 2", got)
	}
}

// countLinesPrefixed counts lines in s that begin with prefix.
func countLinesPrefixed(s, prefix string) int {
	n := 0
	for _, line := range strings.Split(s, "\n") {
		if strings.HasPrefix(line, prefix) {
			n++
		}
	}
	return n
}
