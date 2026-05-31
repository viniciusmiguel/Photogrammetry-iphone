package processing

import "testing"

// Two triangles sharing the edge (0,0,0)-(1,0,0) form one adjacency.
func TestFaceAdjacency_SharedEdge(t *testing.T) {
	faces := [][3][3]float32{
		{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}},
		{{1, 0, 0}, {0, 0, 0}, {1, -1, 0}}, // shares the (0,0,0)-(1,0,0) edge
	}
	edges := FaceAdjacency(faces)
	if len(edges) != 1 {
		t.Fatalf("expected 1 adjacency, got %d", len(edges))
	}
	if edges[0].A != 0 || edges[0].B != 1 {
		t.Fatalf("expected pair (0,1), got (%d,%d)", edges[0].A, edges[0].B)
	}
}

// Triangles with no common vertices are not adjacent.
func TestFaceAdjacency_Disjoint(t *testing.T) {
	faces := [][3][3]float32{
		{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}},
		{{10, 10, 10}, {11, 10, 10}, {10, 11, 10}},
	}
	if got := FaceAdjacency(faces); len(got) != 0 {
		t.Fatalf("expected 0 adjacencies, got %d", len(got))
	}
}

// A quad split into two triangles sharing the diagonal yields one adjacency,
// and quantization tolerates sub-0.1mm float differences on the shared vertices.
func TestFaceAdjacency_QuantizedMatch(t *testing.T) {
	faces := [][3][3]float32{
		{{0, 0, 0}, {1, 0, 0}, {1, 1, 0}},
		{{0, 0, 0}, {1, 1, 0}, {0, 1, 0}}, // shares diagonal (0,0,0)-(1,1,0)
	}
	faces[1][1][0] += 1e-6 // tiny perturbation, well under 0.1mm
	edges := FaceAdjacency(faces)
	if len(edges) != 1 {
		t.Fatalf("expected 1 adjacency across the diagonal, got %d", len(edges))
	}
	if pairs := FacePairs(edges); pairs[0] != [2]int{0, 1} {
		t.Fatalf("FacePairs wrong: %v", pairs)
	}
}
