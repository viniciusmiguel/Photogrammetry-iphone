package processing

import "math"

// occlusionSlack is the depth tolerance (meters) when testing whether a point is
// hidden behind a nearer surface: a small constant plus a relative term to
// absorb rasterization discretization and grazing-angle error.
func occlusionSlack(front float32) float32 { return 0.03 + 0.02*front }

// depthDownscale shrinks each per-keyframe depth map relative to the full image
// to bound memory while staying sharp enough to catch protruding objects.
const depthDownscale = 2

// depthMap is a front-most-depth buffer for one keyframe in downscaled image
// space; depth holds the nearest surface distance (-camZ) per pixel.
type depthMap struct {
	w, h   int
	sx, sy float32
	depth  []float32
}

// buildDepthMaps rasterizes the mesh from every keyframe into front-most depth
// buffers for occlusion testing.
func buildDepthMaps(faces [][3][3]float32, keyframes []Keyframe, preps []camPrep) []depthMap {
	maps := make([]depthMap, len(keyframes))
	for i := range keyframes {
		maps[i] = buildDepthMap(faces, keyframes[i], preps[i])
	}
	return maps
}

func buildDepthMap(faces [][3][3]float32, kf Keyframe, prep camPrep) depthMap {
	w, h := max(1, kf.Width/depthDownscale), max(1, kf.Height/depthDownscale)
	dm := depthMap{
		w: w, h: h,
		sx:    float32(w) / float32(kf.Width),
		sy:    float32(h) / float32(kf.Height),
		depth: make([]float32, w*h),
	}
	for i := range dm.depth {
		dm.depth[i] = math.MaxFloat32
	}
	for f := range faces {
		px, py, dz, ok := projectFaceToDepth(faces[f], kf, prep, dm)
		if ok {
			rasterizeDepth(&dm, px, py, dz)
		}
	}
	return dm
}

// projectFaceToDepth projects a face's 3 vertices into depth-map pixel space,
// returning per-vertex (x, y) and depth; ok=false if any vertex is behind.
func projectFaceToDepth(verts [3][3]float32, kf Keyframe, prep camPrep, dm depthMap) (px, py, dz [3]float32, ok bool) {
	for i := 0; i < 3; i++ {
		cam := Mat4MulVec(prep.inverse, [4]float32{verts[i][0], verts[i][1], verts[i][2], 1})
		if cam[2] >= 0 {
			return px, py, dz, false
		}
		px[i] = (kf.cx() + kf.fx()*cam[0]/(-cam[2])) * dm.sx
		py[i] = (kf.cy() + kf.fy()*cam[1]/(-cam[2])) * dm.sy
		dz[i] = -cam[2]
	}
	return px, py, dz, true
}

// rasterizeDepth fills a projected triangle into the depth buffer, keeping the
// nearest surface per pixel.
func rasterizeDepth(dm *depthMap, px, py, dz [3]float32) {
	minX := max(0, int(math.Floor(float64(min(px[0], px[1], px[2])))))
	maxX := min(dm.w-1, int(math.Ceil(float64(max(px[0], px[1], px[2])))))
	minY := max(0, int(math.Floor(float64(min(py[0], py[1], py[2])))))
	maxY := min(dm.h-1, int(math.Ceil(float64(max(py[0], py[1], py[2])))))
	area := triEdge(px[0], py[0], px[1], py[1], px[2], py[2])
	if area == 0 {
		return
	}
	for y := minY; y <= maxY; y++ {
		for x := minX; x <= maxX; x++ {
			fx, fy := float32(x)+0.5, float32(y)+0.5
			w0 := triEdge(px[1], py[1], px[2], py[2], fx, fy) / area
			w1 := triEdge(px[2], py[2], px[0], py[0], fx, fy) / area
			w2 := triEdge(px[0], py[0], px[1], py[1], fx, fy) / area
			if (w0 < 0 || w1 < 0 || w2 < 0) && (w0 > 0 || w1 > 0 || w2 > 0) {
				continue
			}
			z := w0*dz[0] + w1*dz[1] + w2*dz[2]
			idx := y*dm.w + x
			if z < dm.depth[idx] {
				dm.depth[idx] = z
			}
		}
	}
}

// occluded reports whether a point at full-image (projX, projY) and depth d is
// hidden behind a nearer surface. Pixels with no recorded surface are visible.
func (dm depthMap) occluded(projX, projY, d float32) bool {
	x := int(projX * dm.sx)
	y := int(projY * dm.sy)
	if x < 0 || x >= dm.w || y < 0 || y >= dm.h {
		return false
	}
	front := dm.depth[y*dm.w+x]
	if front == math.MaxFloat32 {
		return false
	}
	return d > front+occlusionSlack(front)
}

// triEdge is the 2D cross product (signed twice-area) used for barycentric
// rasterization.
func triEdge(ax, ay, bx, by, cx, cy float32) float32 {
	return (bx-ax)*(cy-ay) - (by-ay)*(cx-ax)
}
