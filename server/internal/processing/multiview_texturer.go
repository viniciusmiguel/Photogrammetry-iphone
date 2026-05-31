package processing

import (
	"image"
	"image/color"
	"os"
	"strconv"
)

// seamLambda is the Potts smoothness weight for view selection, relative to the
// per-face data costs (normalized to [0,1]). Higher values bias toward larger
// single-keyframe patches, which suppresses ghosting from camera-pose drift
// (misalignment shows only where two views meet, so fewer/larger patches = fewer
// such seams) at the cost of using a slightly worse-resolution view for some
// faces. Tunable via PHOTOG_SEAM_LAMBDA for experimentation.
var seamLambda = envFloat("PHOTOG_SEAM_LAMBDA", 0.1)

func envFloat(key string, def float64) float64 {
	if v, err := strconv.ParseFloat(os.Getenv(key), 64); err == nil {
		return v
	}
	return def
}

// BakeTextureMultiView produces the baked atlas using proper multi-view
// texturing: per-face view selection by graph-cut over an occlusion-gated data
// term plus a Potts seam penalty, followed by per-vertex seam color leveling.
// A protruding object can no longer bleed onto hidden surfaces (occluded views
// are invalid), and adjacent faces stay consistent (no multiplied ghosts).
func BakeTextureMultiView(faces [][3][3]float32, layout UVAtlasLayout, keyframes []Keyframe) *image.RGBA {
	atlas := newFilledAtlas(layout.AtlasSize)
	if len(keyframes) == 0 {
		return atlas
	}
	preps := prepCameras(keyframes)
	depths := buildDepthMaps(faces, keyframes, preps)
	scoring := ScoreViews(faces, keyframes, preps, depths)
	pairs := FacePairs(FaceAdjacency(faces))
	labels := AlphaExpansion(scoring.DataCost, pairs, seamLambda, len(keyframes))
	corr := SeamLeveling(faces, labels, scoring.AnyValid, keyframes, preps)

	for f := range faces {
		if !scoring.AnyValid[f] {
			continue // no legal view → leave neutral fill
		}
		v := labels[f]
		bakeLabeledFace(atlas, faces[f], layout.CellOrigins[f], layout.CellSize,
			keyframes[v], preps[v], depths[v], corr[f])
	}
	return atlas
}

// bakeLabeledFace fills one face's atlas cell from its selected view, applying
// the per-vertex seam correction and skipping per-texel-occluded points.
func bakeLabeledFace(atlas *image.RGBA, verts [3][3]float32, origin [2]int, cellSize int, kf Keyframe, prep camPrep, depth depthMap, corr [3][3]float64) {
	for ty := 0; ty < cellSize; ty++ {
		for tx := 0; tx < cellSize; tx++ {
			l0, l1, l2, ok := cellBarycentric(tx, ty, cellSize)
			if !ok {
				continue
			}
			world := baryWorld(verts, l0, l1, l2)
			rgb, ok := projectAndSample(world, kf, prep)
			if !ok || pointOccluded(world, kf, prep, depth) {
				continue
			}
			out := applyCorrection(rgb, l0, l1, l2, corr)
			setAtlasTexel(atlas, origin[0]+tx, origin[1]+ty, out)
		}
	}
}

// cellBarycentric maps a cell-local texel to barycentric weights for the fixed
// cell triangle (v0=top-left, v1=top-right, v2=bottom-centre), matching
// UVAtlasPacker; ok=false when outside the triangle.
func cellBarycentric(tx, ty, cellSize int) (l0, l1, l2 float32, ok bool) {
	tNorm := (float32(tx) + 0.5) / float32(cellSize)
	sNorm := (float32(ty) + 0.5) / float32(cellSize)
	l0 = 1 - tNorm - 0.5*sNorm
	l1 = tNorm - 0.5*sNorm
	l2 = sNorm
	if l0 < 0 || l1 < 0 || l2 < 0 {
		return 0, 0, 0, false
	}
	return l0, l1, l2, true
}

func baryWorld(verts [3][3]float32, l0, l1, l2 float32) [3]float32 {
	var w [3]float32
	for i := 0; i < 3; i++ {
		w[i] = l0*verts[0][i] + l1*verts[1][i] + l2*verts[2][i]
	}
	return w
}

// applyCorrection adds the barycentric-interpolated seam correction to a sample.
func applyCorrection(rgb color.RGBA, l0, l1, l2 float32, corr [3][3]float64) color.RGBA {
	ch := func(base float64, idx int) uint8 {
		c := base + float64(l0)*corr[0][idx] + float64(l1)*corr[1][idx] + float64(l2)*corr[2][idx]
		return clampByte(c)
	}
	return color.RGBA{
		R: ch(float64(rgb.R), 0),
		G: ch(float64(rgb.G), 1),
		B: ch(float64(rgb.B), 2),
		A: 255,
	}
}

func clampByte(v float64) uint8 {
	if v < 0 {
		return 0
	}
	if v > 255 {
		return 255
	}
	return uint8(v + 0.5)
}
