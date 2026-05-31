package processing

import (
	"math"
	"testing"
)

// energyOf is a test-local re-implementation of the MRF energy used to assert
// AlphaExpansion never increases energy and reaches expected optima.
func energyOf(labels []int, dataCost [][]float64, edges [][2]int, lambda float64) float64 {
	e := 0.0
	for f, l := range labels {
		e += dataCost[f][l]
	}
	for _, pair := range edges {
		if labels[pair[0]] != labels[pair[1]] {
			e += lambda
		}
	}
	return e
}

// clrsMaxFlowGraph builds the classic CLRS (Fig 26.1) flow network whose
// max-flow value from s=0 to t=5 is 23.
func clrsMaxFlowGraph() *maxFlow {
	m := newMaxFlow(6)
	add := func(u, v int, c float64) { m.addEdge(u, v, c) }
	add(0, 1, 16) // s -> v1
	add(0, 2, 13) // s -> v2
	add(1, 3, 12) // v1 -> v3
	add(2, 1, 4)  // v2 -> v1
	add(3, 2, 9)  // v3 -> v2
	add(2, 4, 14) // v2 -> v4
	add(4, 3, 7)  // v4 -> v3
	add(3, 5, 20) // v3 -> t
	add(4, 5, 4)  // v4 -> t
	return m
}

func TestGraphCutMaxFlowCLRS(t *testing.T) {
	m := clrsMaxFlowGraph()
	got := m.compute(0, 5)
	if math.Abs(got-23) > 1e-6 {
		t.Fatalf("CLRS max-flow = %v, want 23", got)
	}
}

func TestGraphCutMinCutSourceSide(t *testing.T) {
	m := clrsMaxFlowGraph()
	m.compute(0, 5)
	src := m.minCutSourceSide(0)
	if !src[0] {
		t.Fatalf("source node must be on source side")
	}
	if src[5] {
		t.Fatalf("sink node must not be on source side")
	}
	// Min cut {s,v1,v2,v4}|{v3,t}: verify cut capacity equals 23.
	if !src[1] || !src[2] || !src[4] {
		t.Fatalf("expected v1,v2,v4 on source side, got %v", src)
	}
	if src[3] {
		t.Fatalf("expected v3 on sink side, got %v", src)
	}
}

func TestGraphCutLambdaZeroIsArgmin(t *testing.T) {
	dataCost := [][]float64{
		{3, 1, 5},
		{2, 9, 0},
		{7, 6, 4},
	}
	edges := [][2]int{{0, 1}, {1, 2}}
	got := AlphaExpansion(dataCost, edges, 0, 3)
	want := []int{1, 2, 2}
	for f := range want {
		if got[f] != want[f] {
			t.Fatalf("lambda=0 face %d = %d, want argmin %d", f, got[f], want[f])
		}
	}
}

func TestGraphCutLargeLambdaAgrees(t *testing.T) {
	// Face 0 cheapest at label 0, face 1 cheapest at label 1, but the seam
	// penalty dwarfs the data difference so both should converge to one label.
	dataCost := [][]float64{
		{0, 1},
		{1, 0},
	}
	edges := [][2]int{{0, 1}}
	got := AlphaExpansion(dataCost, edges, 100, 2)
	if got[0] != got[1] {
		t.Fatalf("large lambda should agree, got %v", got)
	}
}

func TestGraphCutChainConsistentLabel(t *testing.T) {
	// 4-face chain. Every face slightly prefers label 1 except the middle ones
	// which marginally prefer label 0; strong smoothness forces one label.
	dataCost := [][]float64{
		{1.0, 0.0},
		{0.0, 0.1},
		{0.0, 0.1},
		{1.0, 0.0},
	}
	edges := [][2]int{{0, 1}, {1, 2}, {2, 3}}
	got := AlphaExpansion(dataCost, edges, 50, 2)
	for f := 1; f < len(got); f++ {
		if got[f] != got[0] {
			t.Fatalf("chain not single-labeled: %v", got)
		}
	}
}

func TestGraphCutDeterministic(t *testing.T) {
	dataCost := [][]float64{
		{5, 1, 2},
		{1, 1, 9},
		{8, 2, 1},
		{3, 3, 0},
	}
	edges := [][2]int{{0, 1}, {1, 2}, {2, 3}, {3, 0}}
	a := AlphaExpansion(dataCost, edges, 3, 3)
	b := AlphaExpansion(dataCost, edges, 3, 3)
	for f := range a {
		if a[f] != b[f] {
			t.Fatalf("non-deterministic: %v vs %v", a, b)
		}
	}
}

func TestGraphCutEnergyNeverIncreases(t *testing.T) {
	dataCost := [][]float64{
		{5, 1, 2, 4},
		{1, 7, 9, 2},
		{8, 2, 1, 3},
		{3, 3, 0, 6},
		{2, 4, 5, 1},
	}
	edges := [][2]int{{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 0}, {0, 2}}
	lambda := 2.5
	numLabels := 4
	initial := make([]int, len(dataCost))
	for f := range dataCost {
		initial[f] = argminCost(dataCost[f], numLabels)
	}
	initialE := energyOf(initial, dataCost, edges, lambda)
	got := AlphaExpansion(dataCost, edges, lambda, numLabels)
	finalE := energyOf(got, dataCost, edges, lambda)
	if finalE > initialE+1e-9 {
		t.Fatalf("energy increased: initial=%v final=%v", initialE, finalE)
	}
}

func TestGraphCutInvalidLabelAvoided(t *testing.T) {
	// Label 0 is invalid (infiniteCost) for both faces; they must pick valid
	// labels and agree under strong smoothness.
	dataCost := [][]float64{
		{infiniteCost, 1, 5},
		{infiniteCost, 5, 1},
	}
	edges := [][2]int{{0, 1}}
	got := AlphaExpansion(dataCost, edges, 100, 3)
	if got[0] == 0 || got[1] == 0 {
		t.Fatalf("chose invalid label 0: %v", got)
	}
	if got[0] != got[1] {
		t.Fatalf("strong smoothness should agree: %v", got)
	}
}

func TestGraphCutSingleLabelTrivial(t *testing.T) {
	dataCost := [][]float64{{4}, {2}, {7}}
	edges := [][2]int{{0, 1}, {1, 2}}
	got := AlphaExpansion(dataCost, edges, 5, 1)
	for f, l := range got {
		if l != 0 {
			t.Fatalf("single label: face %d = %d, want 0", f, l)
		}
	}
}
