package processing

import "github.com/vmiguel/photogrammetry-server/internal/storage"

// MeshBuilder accumulates exploded world-space face vertices, 9 floats per
// face (3 vertices × xyz). It ports the Swift MeshBuilder: each anchor face's
// local vertices are transformed to world space and appended in order, so the
// vertex list is "exploded" (no shared/indexed vertices).
type MeshBuilder struct {
	exploded []float32 // 9 floats per face, world space
}

// Add transforms every face of the anchor into world space and appends the
// resulting 9 floats per face. world = anchor.Transform * (local, 1).
func (b *MeshBuilder) Add(a storage.MeshAnchor) {
	for _, face := range a.Faces {
		for k := 0; k < 3; k++ {
			local := a.Vertices[face[k]]
			w := Mat4MulVec(a.Transform, [4]float32{local[0], local[1], local[2], 1})
			b.exploded = append(b.exploded, w[0], w[1], w[2])
		}
	}
}

// FaceCount returns the number of accumulated faces.
func (b *MeshBuilder) FaceCount() int { return len(b.exploded) / 9 }

// WorldFaceVertices returns per-face world-space vertices: [face][vertex][xyz].
func (b *MeshBuilder) WorldFaceVertices() [][3][3]float32 {
	n := b.FaceCount()
	out := make([][3][3]float32, n)
	for f := 0; f < n; f++ {
		base := f * 9
		for v := 0; v < 3; v++ {
			out[f][v] = [3]float32{
				b.exploded[base+v*3],
				b.exploded[base+v*3+1],
				b.exploded[base+v*3+2],
			}
		}
	}
	return out
}

// Exploded returns the raw exploded vertex buffer (9 floats per face).
func (b *MeshBuilder) Exploded() []float32 { return b.exploded }
