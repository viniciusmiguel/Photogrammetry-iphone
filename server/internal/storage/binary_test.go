package storage

import (
	"bytes"
	"encoding/binary"
	"testing"
)

// anchorBlob builds a one-anchor blob with the given face index width so we
// can verify both 2-byte and 4-byte index normalization.
func anchorBlob(bytesPerIndex uint32) []byte {
	var buf bytes.Buffer
	w := func(v any) { binary.Write(&buf, binary.LittleEndian, v) }
	w(uint32(1)) // anchor count
	var id [16]byte
	for i := range id {
		id[i] = byte(i + 1)
	}
	w(id)
	transform := [16]float32{}
	for i := range transform {
		transform[i] = float32(i) // distinct values to check ordering
	}
	w(transform)
	w(uint32(3))  // vertexCount
	w(uint32(12)) // vertexStride
	verts := [][3]float32{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	for _, v := range verts {
		w(v)
	}
	w(uint32(1)) // faceCount
	w(bytesPerIndex)
	writeIndices(w, []uint32{0, 1, 2}, bytesPerIndex)
	return buf.Bytes()
}

// writeIndices serializes triangle indices at the requested byte width.
func writeIndices(w func(any), idx []uint32, bytesPerIndex uint32) {
	for _, v := range idx {
		if bytesPerIndex == 2 {
			w(uint16(v))
		} else {
			w(v)
		}
	}
}

func TestDeserializeMeshAnchors_RoundTrip(t *testing.T) {
	for _, bpi := range []uint32{2, 4} {
		anchors, err := DeserializeMeshAnchors(bytes.NewReader(anchorBlob(bpi)))
		if err != nil {
			t.Fatalf("bytesPerIndex=%d: unexpected error: %v", bpi, err)
		}
		if len(anchors) != 1 {
			t.Fatalf("bytesPerIndex=%d: got %d anchors, want 1", bpi, len(anchors))
		}
		a := anchors[0]
		if a.ID[0] != 1 || a.ID[15] != 16 {
			t.Errorf("bytesPerIndex=%d: ID = %v", bpi, a.ID)
		}
		if a.Transform[5] != 5 || a.Transform[15] != 15 {
			t.Errorf("bytesPerIndex=%d: transform ordering wrong: %v", bpi, a.Transform)
		}
		if len(a.Vertices) != 3 || a.Vertices[2] != [3]float32{7, 8, 9} {
			t.Errorf("bytesPerIndex=%d: vertices = %v", bpi, a.Vertices)
		}
		if len(a.Faces) != 1 || a.Faces[0] != [3]uint32{0, 1, 2} {
			t.Errorf("bytesPerIndex=%d: faces = %v", bpi, a.Faces)
		}
	}
}

func TestDeserializeMeshAnchors_Empty(t *testing.T) {
	var buf bytes.Buffer
	binary.Write(&buf, binary.LittleEndian, uint32(0))
	anchors, err := DeserializeMeshAnchors(&buf)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(anchors) != 0 {
		t.Fatalf("got %d anchors, want 0", len(anchors))
	}
}

func TestDeserializeMeshAnchors_BadStride(t *testing.T) {
	var buf bytes.Buffer
	w := func(v any) { binary.Write(&buf, binary.LittleEndian, v) }
	w(uint32(1))
	w([16]byte{})
	w([16]float32{})
	w(uint32(0)) // vertexCount
	w(uint32(8)) // bad stride
	if _, err := DeserializeMeshAnchors(&buf); err == nil {
		t.Fatal("expected error for bad stride, got nil")
	}
}
