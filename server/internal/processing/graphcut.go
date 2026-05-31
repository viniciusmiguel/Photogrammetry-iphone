package processing

import "math"

// infiniteCost is the finite stand-in for +Inf used throughout the expansion
// graph. Hard constraints (forced terminal links, invalid labels) use this so
// max-flow stays in finite arithmetic. Kept well below float64 overflow so a
// handful can be summed without producing +Inf.
const infiniteCost = 1e18

// AlphaExpansion minimizes the multi-label MRF energy
//
//	E(L) = sum_f dataCost[f][L[f]]  +  lambda * sum_{(a,b) in edges} [L[a] != L[b]]
//
// (Potts smoothness) over labels L[f] in [0, numLabels). dataCost[f] has length
// numLabels; a label that is invalid for face f must be passed as a large finite
// cost (e.g. 1e18), NOT +Inf. edges are undirected adjacency pairs of face
// indices. Returns the chosen label per face. Deterministic: given identical
// inputs it must return identical output (no map iteration order, no rng).
//
// Example:
//
//	labels := AlphaExpansion(dataCost, [][2]int{{0, 1}}, 10.0, 3)
func AlphaExpansion(dataCost [][]float64, edges [][2]int, lambda float64, numLabels int) []int {
	labels := initialLabeling(dataCost, numLabels)
	if numLabels <= 1 || len(labels) == 0 {
		return labels
	}
	const maxSweeps = 8
	for sweep := 0; sweep < maxSweeps; sweep++ {
		improved := false
		for alpha := 0; alpha < numLabels; alpha++ {
			if tryExpansion(labels, dataCost, edges, lambda, alpha) {
				improved = true
			}
		}
		if !improved {
			break
		}
	}
	return labels
}

// initialLabeling picks each face's lowest-data-cost label (ties → lowest index).
func initialLabeling(dataCost [][]float64, numLabels int) []int {
	labels := make([]int, len(dataCost))
	for f := range dataCost {
		labels[f] = argminCost(dataCost[f], numLabels)
	}
	return labels
}

// argminCost returns the index of the minimum cost in costs, scanning the first
// numLabels entries and breaking ties toward the lowest index for determinism.
func argminCost(costs []float64, numLabels int) int {
	best := 0
	bestCost := math.Inf(1)
	for l := 0; l < numLabels && l < len(costs); l++ {
		if costs[l] < bestCost {
			bestCost = costs[l]
			best = l
		}
	}
	return best
}

// tryExpansion builds and solves the alpha-expansion move, committing the new
// labeling only if it does not increase total energy. Returns true if it moved.
func tryExpansion(labels []int, dataCost [][]float64, edges [][2]int, lambda float64, alpha int) bool {
	candidate := expansionLabeling(labels, dataCost, edges, lambda, alpha)
	before := totalEnergy(labels, dataCost, edges, lambda)
	after := totalEnergy(candidate, dataCost, edges, lambda)
	if after < before-energyEpsilon(before) {
		copy(labels, candidate)
		return true
	}
	return false
}

// energyEpsilon is a relative guard so floating-point noise around the infinite
// constant cannot register as a spurious "improvement".
func energyEpsilon(energy float64) float64 {
	return 1e-6 * (1.0 + math.Abs(energy))
}

// expansionLabeling solves one Potts expansion move via min-cut and returns the
// resulting labeling (faces on the source side switch to alpha).
func expansionLabeling(labels []int, dataCost [][]float64, edges [][2]int, lambda float64, alpha int) []int {
	g := newExpansionGraph(len(labels))
	addDataTerms(g, labels, dataCost, alpha)
	addSmoothnessTerms(g, labels, edges, lambda)
	g.flow.compute(g.source, g.sink)
	return readLabeling(g, labels, alpha)
}

// expansionGraph wires the binary expansion problem onto a maxFlow instance.
// Convention: a face cut to the SOURCE side takes label alpha; the SINK side
// keeps its current label.
type expansionGraph struct {
	flow         *maxFlow
	source, sink int
	faceNode     []int // faceNode[f] = node id of face f
}

// newExpansionGraph allocates source (0), sink (1), and one node per face. The
// Potts pairwise term needs no auxiliary nodes under the KZ reduction.
func newExpansionGraph(numFaces int) *expansionGraph {
	g := &expansionGraph{
		source:   0,
		sink:     1,
		faceNode: make([]int, numFaces),
	}
	for f := 0; f < numFaces; f++ {
		g.faceNode[f] = f + 2
	}
	g.flow = newMaxFlow(numFaces + 2)
	return g
}

// addDataTerms wires each face's unary cost. Convention: source side ⇒ alpha,
// sink side ⇒ keep. The source→node link (cap keepCost) is cut when the node
// lands on the sink (keep) side; the node→sink link (cap switchCost) is cut when
// it lands on the source (alpha) side. A face already labeled alpha is forced to
// the alpha (source) terminal via an infinite keep cost.
func addDataTerms(g *expansionGraph, labels []int, dataCost [][]float64, alpha int) {
	for f, node := range g.faceNode {
		keepCost := dataCost[f][labels[f]]
		switchCost := dataCost[f][alpha]
		if labels[f] == alpha {
			switchCost = 0
			keepCost = infiniteCost // forbid leaving alpha
		}
		// Source side = alpha. Cut of source-link charges switchCost; cut of
		// sink-link charges keepCost. Boykov–Veksler–Zabih terminal layout.
		g.flow.addEdge(g.source, node, keepCost)
		g.flow.addEdge(node, g.sink, switchCost)
	}
}

// addSmoothnessTerms encodes the Potts pairwise penalty for every adjacency.
// Binary convention: x_f = 0 (source side) ⇒ face takes alpha; x_f = 1 (sink
// side) ⇒ face keeps its current label. The Potts cost is lambda whenever the
// two faces end with different labels.
func addSmoothnessTerms(g *expansionGraph, labels []int, edges [][2]int, lambda float64) {
	for _, e := range edges {
		addPottsPair(g, e[0], e[1], labels, lambda)
	}
}

// addPottsPair adds the submodular 2-label pairwise term for adjacency (a,b).
// The four-cell cost table over (x_a, x_b) for the Potts model under an
// expansion move: x=0 ⇒ alpha, x=1 ⇒ keep. Cost is lambda iff the resulting
// labels differ; alpha vs alpha is always equal so e00 = 0.
func addPottsPair(g *expansionGraph, a, b int, labels []int, lambda float64) {
	la, lb := labels[a], labels[b]
	e00 := 0.0                           // alpha vs alpha
	e01 := potts(alphaLabel, lb, lambda) // alpha vs keep(b)
	e10 := potts(la, alphaLabel, lambda) // keep(a) vs alpha
	e11 := potts(la, lb, lambda)         // keep(a) vs keep(b)
	addPairwise(g, g.faceNode[a], g.faceNode[b], e00, e01, e10, e11)
}

// alphaLabel is a sentinel distinct from any real label index so potts() treats
// "alpha" as different from any kept label whose value happens to collide.
const alphaLabel = -1

// potts returns lambda when the two labels differ, else 0.
func potts(x, y int, lambda float64) float64 {
	if x != y {
		return lambda
	}
	return 0
}

// addPairwise installs a submodular 2-label energy term E(x_i, x_j) with the
// given table cells onto the flow graph. Uses the standard Kolmogorov–Zabih
// reduction: a node on the source side has x=0, on the sink side x=1.
//
// Requires submodularity e01 + e10 >= e00 + e11 (Potts always satisfies this).
func addPairwise(g *expansionGraph, ni, nj int, e00, e01, e10, e11 float64) {
	// KZ decomposition (constant e00 dropped — it shifts all labelings equally):
	//   unary_i(x=1) = e10 - e00 ; unary_j(x=1) = e11 - e10
	//   edge i→j cut iff (x_i=0, x_j=1), capacity e01 + e10 - e00 - e11 >= 0.
	addUnaryTerm(g, ni, 0, e10-e00)
	addUnaryTerm(g, nj, 0, e11-e10)
	pairCap := e01 + e10 - e00 - e11
	if pairCap > 0 {
		g.flow.addEdge(ni, nj, pairCap)
	}
}

// addUnaryTerm adds a unary cost where x=0 (source side) costs c0 and x=1 (sink
// side) costs c1, by charging the difference on a single terminal link.
func addUnaryTerm(g *expansionGraph, node int, c0, c1 float64) {
	if c1 > c0 {
		// Cost to be on sink side (x=1) → cut source→node link.
		g.flow.addEdge(g.source, node, c1-c0)
		return
	}
	// Cost to be on source side (x=0) → cut node→sink link.
	g.flow.addEdge(node, g.sink, c0-c1)
}

// readLabeling reads the min-cut: source-reachable faces take alpha, the rest
// keep their current label.
func readLabeling(g *expansionGraph, labels []int, alpha int) []int {
	srcSide := g.flow.minCutSourceSide(g.source)
	out := make([]int, len(labels))
	for f, node := range g.faceNode {
		if srcSide[node] {
			out[f] = alpha
		} else {
			out[f] = labels[f]
		}
	}
	return out
}

// flowEdge is a single directed residual arc. cap is the remaining capacity;
// the reverse arc lives at edges[rev].
type flowEdge struct {
	to  int
	rev int
	cap float64
}

// maxFlow is a self-contained Dinic's max-flow / min-cut solver over float64
// capacities. Node ids are dense [0, n); grow with ensureNode before addEdge.
type maxFlow struct {
	edges []flowEdge
	graph [][]int // graph[u] = indices into edges of arcs leaving u
	level []int
	iter  []int
}

// newMaxFlow builds a flow network with n nodes (ids 0..n-1).
func newMaxFlow(n int) *maxFlow {
	return &maxFlow{graph: make([][]int, n)}
}

// ensureNode grows the adjacency so that node id is valid.
func (m *maxFlow) ensureNode(id int) {
	for len(m.graph) <= id {
		m.graph = append(m.graph, nil)
	}
}

// addEdge adds a directed arc u→v of capacity cap (with a 0-capacity reverse).
func (m *maxFlow) addEdge(u, v int, cap float64) {
	m.ensureNode(u)
	m.ensureNode(v)
	m.graph[u] = append(m.graph[u], len(m.edges))
	m.edges = append(m.edges, flowEdge{to: v, rev: len(m.edges) + 1, cap: cap})
	m.graph[v] = append(m.graph[v], len(m.edges))
	m.edges = append(m.edges, flowEdge{to: u, rev: len(m.edges) - 1, cap: 0})
}

// compute runs Dinic's algorithm and returns the maximum flow value s→t.
func (m *maxFlow) compute(s, t int) float64 {
	total := 0.0
	for m.buildLevels(s, t) {
		m.iter = make([]int, len(m.graph))
		for {
			pushed := m.blockingDFS(s, t, math.Inf(1))
			if pushed <= 0 {
				break
			}
			total += pushed
		}
	}
	return total
}

// buildLevels does a BFS from s on residual arcs, returning whether t is
// reachable (i.e. an augmenting path may still exist).
func (m *maxFlow) buildLevels(s, t int) bool {
	m.level = make([]int, len(m.graph))
	for i := range m.level {
		m.level[i] = -1
	}
	queue := []int{s}
	m.level[s] = 0
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		for _, ei := range m.graph[u] {
			e := m.edges[ei]
			if e.cap > flowEpsilon && m.level[e.to] < 0 {
				m.level[e.to] = m.level[u] + 1
				queue = append(queue, e.to)
			}
		}
	}
	return m.level[t] >= 0
}

// blockingDFS pushes flow along level-respecting residual paths from u to t.
func (m *maxFlow) blockingDFS(u, t int, limit float64) float64 {
	if u == t {
		return limit
	}
	for ; m.iter[u] < len(m.graph[u]); m.iter[u]++ {
		ei := m.graph[u][m.iter[u]]
		e := &m.edges[ei]
		if e.cap <= flowEpsilon || m.level[e.to] != m.level[u]+1 {
			continue
		}
		got := m.blockingDFS(e.to, t, math.Min(limit, e.cap))
		if got > flowEpsilon {
			e.cap -= got
			m.edges[e.rev].cap += got
			return got
		}
	}
	return 0
}

// minCutSourceSide returns, for every node, whether it is reachable from s in
// the residual graph after compute — i.e. the source side of the min cut.
func (m *maxFlow) minCutSourceSide(s int) []bool {
	reach := make([]bool, len(m.graph))
	queue := []int{s}
	reach[s] = true
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		for _, ei := range m.graph[u] {
			e := m.edges[ei]
			if e.cap > flowEpsilon && !reach[e.to] {
				reach[e.to] = true
				queue = append(queue, e.to)
			}
		}
	}
	return reach
}

// flowEpsilon treats tiny residuals as zero to avoid float64 cycling.
const flowEpsilon = 1e-9

// totalEnergy evaluates E(L) for the given labeling.
func totalEnergy(labels []int, dataCost [][]float64, edges [][2]int, lambda float64) float64 {
	energy := 0.0
	for f, l := range labels {
		energy += dataCost[f][l]
	}
	for _, e := range edges {
		if labels[e[0]] != labels[e[1]] {
			energy += lambda
		}
	}
	return energy
}
