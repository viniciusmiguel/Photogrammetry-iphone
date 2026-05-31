package processing

import (
	"math"
	"sort"
)

// FaceEdge is a shared mesh edge between two adjacent faces, with the world-space
// endpoints of the shared edge. Used for the graph-cut smoothness term and for
// seam leveling.
type FaceEdge struct {
	A, B   int        // adjacent face indices (A < B)
	V0, V1 [3]float32 // shared edge endpoints (world space)
}

// vertexKey is a quantized world position so that exploded vertices that
// coincide (the same physical mesh vertex duplicated per face) map to one key.
// 0.1 mm resolution is well below ARKit mesh vertex spacing.
type vertexKey [3]int64

func quantizeVertex(v [3]float32) vertexKey {
	return vertexKey{
		int64(math.Round(float64(v[0]) * 10000)),
		int64(math.Round(float64(v[1]) * 10000)),
		int64(math.Round(float64(v[2]) * 10000)),
	}
}

// edgeKey canonicalizes an edge as its two endpoint keys in sorted order so the
// same edge from either face produces the same key.
type edgeKey [2]vertexKey

func makeEdgeKey(a, b vertexKey) edgeKey {
	if lessVertexKey(b, a) {
		a, b = b, a
	}
	return edgeKey{a, b}
}

func lessVertexKey(a, b vertexKey) bool {
	for i := 0; i < 3; i++ {
		if a[i] != b[i] {
			return a[i] < b[i]
		}
	}
	return false
}

type edgeRecord struct {
	faces  []int
	v0, v1 [3]float32
}

// FaceAdjacency reconstructs face adjacency from the exploded face list: two
// faces are adjacent when they share an edge (two vertices at the same position).
// The result is deterministic (sorted by face pair).
func FaceAdjacency(faces [][3][3]float32) []FaceEdge {
	byEdge := indexEdges(faces)
	edges := collectAdjacentPairs(byEdge)
	sort.Slice(edges, func(i, j int) bool {
		if edges[i].A != edges[j].A {
			return edges[i].A < edges[j].A
		}
		return edges[i].B < edges[j].B
	})
	return edges
}

// indexEdges maps each canonical edge to the faces that use it and remembers the
// edge's world endpoints.
func indexEdges(faces [][3][3]float32) map[edgeKey]*edgeRecord {
	byEdge := make(map[edgeKey]*edgeRecord)
	for f := range faces {
		for e := 0; e < 3; e++ {
			p, q := faces[f][e], faces[f][(e+1)%3]
			key := makeEdgeKey(quantizeVertex(p), quantizeVertex(q))
			rec := byEdge[key]
			if rec == nil {
				rec = &edgeRecord{v0: p, v1: q}
				byEdge[key] = rec
			}
			rec.faces = append(rec.faces, f)
		}
	}
	return byEdge
}

// collectAdjacentPairs turns each shared edge into unique adjacent face pairs.
func collectAdjacentPairs(byEdge map[edgeKey]*edgeRecord) []FaceEdge {
	seen := make(map[[2]int]bool)
	var edges []FaceEdge
	for _, rec := range byEdge {
		for i := 0; i < len(rec.faces); i++ {
			for j := i + 1; j < len(rec.faces); j++ {
				a, b := rec.faces[i], rec.faces[j]
				if a == b {
					continue
				}
				if a > b {
					a, b = b, a
				}
				if seen[[2]int{a, b}] {
					continue
				}
				seen[[2]int{a, b}] = true
				edges = append(edges, FaceEdge{A: a, B: b, V0: rec.v0, V1: rec.v1})
			}
		}
	}
	return edges
}

// FacePairs projects FaceEdges to the (a,b) index pairs the graph-cut consumes.
func FacePairs(edges []FaceEdge) [][2]int {
	pairs := make([][2]int, len(edges))
	for i, e := range edges {
		pairs[i] = [2]int{e.A, e.B}
	}
	return pairs
}
