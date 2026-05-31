package storage

import (
	"encoding/binary"
	"fmt"
	"io"
)

// MeshAnchor is one ARKit mesh anchor decoded from the iPhone wire format.
// Transform is column-major (element = col*4+row) to match simd_float4x4.
type MeshAnchor struct {
	ID        [16]byte
	Transform [16]float32 // column-major: element index = col*4 + row
	Vertices  [][3]float32
	Faces     [][3]uint32
}

const vertexStrideBytes = 12 // 3 × float32, the only stride iOS emits.

// DeserializeMeshAnchors decodes the little-endian mesh-anchor blob produced
// by the iOS capture pipeline. The blob is a uint32 anchor count followed by
// that many anchors (see binary.go doc / spec for the per-anchor layout).
//
// Example:
//
//	anchors, err := DeserializeMeshAnchors(file)
func DeserializeMeshAnchors(r io.Reader) ([]MeshAnchor, error) {
	var count uint32
	if err := binary.Read(r, binary.LittleEndian, &count); err != nil {
		return nil, fmt.Errorf("reading anchor count: %w", err)
	}
	anchors := make([]MeshAnchor, 0, count)
	for i := uint32(0); i < count; i++ {
		a, err := readAnchor(r)
		if err != nil {
			return nil, fmt.Errorf("anchor %d/%d: %w", i, count, err)
		}
		anchors = append(anchors, a)
	}
	return anchors, nil
}

// readAnchor decodes a single anchor record from r.
func readAnchor(r io.Reader) (MeshAnchor, error) {
	var a MeshAnchor
	if err := binary.Read(r, binary.LittleEndian, &a.ID); err != nil {
		return a, fmt.Errorf("reading UUID: %w", err)
	}
	if err := binary.Read(r, binary.LittleEndian, &a.Transform); err != nil {
		return a, fmt.Errorf("reading transform: %w", err)
	}
	verts, err := readVertices(r)
	if err != nil {
		return a, err
	}
	a.Vertices = verts
	faces, err := readFaces(r)
	if err != nil {
		return a, err
	}
	a.Faces = faces
	return a, nil
}

// readVertices decodes the vertex block (count, stride, then xyz floats).
func readVertices(r io.Reader) ([][3]float32, error) {
	var count, stride uint32
	if err := binary.Read(r, binary.LittleEndian, &count); err != nil {
		return nil, fmt.Errorf("reading vertexCount: %w", err)
	}
	if err := binary.Read(r, binary.LittleEndian, &stride); err != nil {
		return nil, fmt.Errorf("reading vertexStride: %w", err)
	}
	if stride != vertexStrideBytes {
		return nil, fmt.Errorf("vertexStride = %d, expected %d", stride, vertexStrideBytes)
	}
	verts := make([][3]float32, count)
	for i := range verts {
		if err := binary.Read(r, binary.LittleEndian, &verts[i]); err != nil {
			return nil, fmt.Errorf("reading vertex %d/%d: %w", i, count, err)
		}
	}
	return verts, nil
}

// readFaces decodes the face block, normalizing 2- or 4-byte indices to uint32.
func readFaces(r io.Reader) ([][3]uint32, error) {
	var count, bytesPerIndex uint32
	if err := binary.Read(r, binary.LittleEndian, &count); err != nil {
		return nil, fmt.Errorf("reading faceCount: %w", err)
	}
	if err := binary.Read(r, binary.LittleEndian, &bytesPerIndex); err != nil {
		return nil, fmt.Errorf("reading bytesPerIndex: %w", err)
	}
	if bytesPerIndex != 2 && bytesPerIndex != 4 {
		return nil, fmt.Errorf("bytesPerIndex = %d, expected 2 or 4", bytesPerIndex)
	}
	faces := make([][3]uint32, count)
	for i := range faces {
		for k := 0; k < 3; k++ {
			idx, err := readIndex(r, bytesPerIndex)
			if err != nil {
				return nil, fmt.Errorf("reading face %d index %d: %w", i, k, err)
			}
			faces[i][k] = idx
		}
	}
	return faces, nil
}

// readIndex reads a single triangle index of the given byte width as uint32.
func readIndex(r io.Reader, bytesPerIndex uint32) (uint32, error) {
	if bytesPerIndex == 2 {
		var v uint16
		if err := binary.Read(r, binary.LittleEndian, &v); err != nil {
			return 0, err
		}
		return uint32(v), nil
	}
	var v uint32
	if err := binary.Read(r, binary.LittleEndian, &v); err != nil {
		return 0, err
	}
	return v, nil
}
