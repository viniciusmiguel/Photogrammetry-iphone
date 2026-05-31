package processing

import (
	"testing"

	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

// oneTriangleAnchor builds an anchor with a single triangle and the given
// column-major transform.
func oneTriangleAnchor(transform [16]float32) storage.MeshAnchor {
	return storage.MeshAnchor{
		Transform: transform,
		Vertices:  [][3]float32{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}},
		Faces:     [][3]uint32{{0, 1, 2}},
	}
}

func TestMeshBuilder_IdentityWorldEqualsLocal(t *testing.T) {
	var b MeshBuilder
	b.Add(oneTriangleAnchor(identity4()))
	if b.FaceCount() != 1 {
		t.Fatalf("FaceCount = %d, want 1", b.FaceCount())
	}
	faces := b.WorldFaceVertices()
	want := [3][3]float32{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}}
	if faces[0] != want {
		t.Fatalf("world = %v, want local %v", faces[0], want)
	}
}

func TestMeshBuilder_TranslationShiftsVerts(t *testing.T) {
	m := identity4()
	m[12], m[13], m[14] = 5, 0, 0 // translate +5 on X
	var b MeshBuilder
	b.Add(oneTriangleAnchor(m))
	faces := b.WorldFaceVertices()
	want := [3][3]float32{{5, 0, 0}, {6, 0, 0}, {5, 1, 0}}
	if faces[0] != want {
		t.Fatalf("translated world = %v, want %v", faces[0], want)
	}
}

func TestMeshBuilder_FaceCountMultiple(t *testing.T) {
	a := storage.MeshAnchor{
		Transform: identity4(),
		Vertices:  [][3]float32{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}, {1, 1, 0}},
		Faces:     [][3]uint32{{0, 1, 2}, {1, 3, 2}},
	}
	var b MeshBuilder
	b.Add(a)
	if b.FaceCount() != 2 {
		t.Fatalf("FaceCount = %d, want 2", b.FaceCount())
	}
	if len(b.Exploded()) != 18 {
		t.Fatalf("exploded len = %d, want 18", len(b.Exploded()))
	}
}
