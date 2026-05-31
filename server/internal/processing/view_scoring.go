package processing

import "math"

// invalidViewCost marks a (face, view) the face cannot legally be textured from
// (behind the camera, out of frustum, back-facing, or occluded). Kept finite and
// large so the graph-cut never picks it unless nothing else is available.
const invalidViewCost = 1e18

// ViewScoring holds, per face, the graph-cut data cost of texturing it from each
// keyframe plus visibility bookkeeping.
type ViewScoring struct {
	DataCost [][]float64 // [face][view]; invalidViewCost where not legally visible
	Visible  [][]bool    // [face][view]
	AnyValid []bool      // [face]: at least one legal view
}

// ScoreViews computes the per-(face, view) data term for view selection. Quality
// is the face's projected area in the view (closer/more head-on = higher
// resolution = better), gated by occlusion so a protruding object cannot score a
// surface hidden behind it. Costs are normalized per face to [0,1] (best=0) so a
// single Potts smoothness weight balances seams against view preference.
func ScoreViews(faces [][3][3]float32, keyframes []Keyframe, preps []camPrep, depths []depthMap) ViewScoring {
	nF, nV := len(faces), len(keyframes)
	vs := ViewScoring{
		DataCost: make([][]float64, nF),
		Visible:  make([][]bool, nF),
		AnyValid: make([]bool, nF),
	}
	for f := range faces {
		normal := faceNormalVec(faces[f])
		quality := make([]float64, nV)
		visible := make([]bool, nV)
		var qmax float64
		for v := range keyframes {
			q, ok := viewQuality(faces[f], normal, keyframes[v], preps[v], depths[v])
			quality[v], visible[v] = q, ok
			if ok && q > qmax {
				qmax = q
			}
		}
		vs.DataCost[f] = normalizeData(quality, visible, qmax)
		vs.Visible[f] = visible
		vs.AnyValid[f] = qmax > 0
	}
	return vs
}

// normalizeData maps qualities to per-face data costs in [0,1] (best view = 0),
// or invalidViewCost where the view is unusable.
func normalizeData(quality []float64, visible []bool, qmax float64) []float64 {
	cost := make([]float64, len(quality))
	for v := range quality {
		if !visible[v] || qmax <= 0 {
			cost[v] = invalidViewCost
			continue
		}
		cost[v] = (qmax - quality[v]) / qmax
	}
	return cost
}

// viewQuality returns the projected area of the face in the view and whether the
// face is legally visible there (in front, in frustum, front-facing, unoccluded).
func viewQuality(verts [3][3]float32, normal [3]float32, kf Keyframe, prep camPrep, depth depthMap) (float64, bool) {
	px, py, ok := projectFaceToImage(verts, kf, prep)
	if !ok {
		return 0, false
	}
	centroid := faceCentroid(verts)
	toCam := vec3Normalize([3]float32{
		prep.position[0] - centroid[0],
		prep.position[1] - centroid[1],
		prep.position[2] - centroid[2],
	})
	if vec3Dot(normal, toCam) <= 0 { // back-facing
		return 0, false
	}
	if pointOccluded(centroid, kf, prep, depth) {
		return 0, false
	}
	area := math.Abs(float64(triEdge(px[0], py[0], px[1], py[1], px[2], py[2]))) * 0.5
	return area, true
}

// projectFaceToImage projects the 3 vertices to full-image pixels, requiring all
// to be in front of and inside the frustum.
func projectFaceToImage(verts [3][3]float32, kf Keyframe, prep camPrep) (px, py [3]float32, ok bool) {
	for i := 0; i < 3; i++ {
		cam := Mat4MulVec(prep.inverse, [4]float32{verts[i][0], verts[i][1], verts[i][2], 1})
		if cam[2] >= 0 {
			return px, py, false
		}
		x := kf.cx() + kf.fx()*cam[0]/(-cam[2])
		y := kf.cy() + kf.fy()*cam[1]/(-cam[2])
		if x < 0 || x >= float32(kf.Width) || y < 0 || y >= float32(kf.Height) {
			return px, py, false
		}
		px[i], py[i] = x, y
	}
	return px, py, true
}

// pointOccluded reports whether a world point is hidden behind nearer geometry
// in this view.
func pointOccluded(centroid [3]float32, kf Keyframe, prep camPrep, depth depthMap) bool {
	cam := Mat4MulVec(prep.inverse, [4]float32{centroid[0], centroid[1], centroid[2], 1})
	if cam[2] >= 0 {
		return true
	}
	projX := kf.cx() + kf.fx()*cam[0]/(-cam[2])
	projY := kf.cy() + kf.fy()*cam[1]/(-cam[2])
	return depth.occluded(projX, projY, -cam[2])
}

func faceNormalVec(v [3][3]float32) [3]float32 {
	return vec3Normalize(vec3Cross(vec3Sub(v[1], v[0]), vec3Sub(v[2], v[0])))
}

func faceCentroid(v [3][3]float32) [3]float32 {
	return [3]float32{
		(v[0][0] + v[1][0] + v[2][0]) / 3,
		(v[0][1] + v[1][1] + v[2][1]) / 3,
		(v[0][2] + v[1][2] + v[2][2]) / 3,
	}
}
