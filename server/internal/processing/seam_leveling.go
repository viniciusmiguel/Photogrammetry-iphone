package processing

// SeamLeveling returns a per-face, per-vertex additive RGB correction that blends
// color seams between faces textured from different views. For every shared mesh
// vertex it averages the colors that all incident faces sample there (each from
// its chosen view) and moves each face toward that average.
//
// Because a shared edge's two endpoints get the same averaged target for both
// faces, and each face interpolates the correction linearly across the cell, the
// corrected colors agree along the whole shared edge — the seam becomes C0
// continuous — while interior (same-view) regions are essentially unchanged
// (their incident faces already sample matching colors, so the average ≈ each).
func SeamLeveling(faces [][3][3]float32, labels []int, anyValid []bool, keyframes []Keyframe, preps []camPrep) [][3][3]float64 {
	vColor, vHas := sampleFaceVertexColors(faces, labels, anyValid, keyframes, preps)
	means := vertexColorMeans(faces, vColor, vHas)
	return vertexCorrections(faces, vColor, vHas, means)
}

// sampleFaceVertexColors samples each face vertex's color from that face's chosen
// view (label). Missing/invalid samples are flagged so they don't skew averages.
func sampleFaceVertexColors(faces [][3][3]float32, labels []int, anyValid []bool, keyframes []Keyframe, preps []camPrep) ([][3][3]float64, [][3]bool) {
	vColor := make([][3][3]float64, len(faces))
	vHas := make([][3]bool, len(faces))
	for f := range faces {
		if !anyValid[f] {
			continue
		}
		v := labels[f]
		for i := 0; i < 3; i++ {
			if c, ok := sampleVertexColor(faces[f][i], keyframes[v], preps[v]); ok {
				vColor[f][i] = c
				vHas[f][i] = true
			}
		}
	}
	return vColor, vHas
}

type colorAccumulator struct {
	sum [3]float64
	n   int
}

// vertexColorMeans averages, per shared mesh vertex, the colors all incident
// faces sample there.
func vertexColorMeans(faces [][3][3]float32, vColor [][3][3]float64, vHas [][3]bool) map[vertexKey][3]float64 {
	acc := make(map[vertexKey]*colorAccumulator)
	for f := range faces {
		for i := 0; i < 3; i++ {
			if !vHas[f][i] {
				continue
			}
			key := quantizeVertex(faces[f][i])
			a := acc[key]
			if a == nil {
				a = &colorAccumulator{}
				acc[key] = a
			}
			for c := 0; c < 3; c++ {
				a.sum[c] += vColor[f][i][c]
			}
			a.n++
		}
	}
	means := make(map[vertexKey][3]float64, len(acc))
	for key, a := range acc {
		means[key] = [3]float64{a.sum[0] / float64(a.n), a.sum[1] / float64(a.n), a.sum[2] / float64(a.n)}
	}
	return means
}

// vertexCorrections forms correction = mean - sampled for each face vertex.
func vertexCorrections(faces [][3][3]float32, vColor [][3][3]float64, vHas [][3]bool, means map[vertexKey][3]float64) [][3][3]float64 {
	corr := make([][3][3]float64, len(faces))
	for f := range faces {
		for i := 0; i < 3; i++ {
			if !vHas[f][i] {
				continue
			}
			mean := means[quantizeVertex(faces[f][i])]
			for c := 0; c < 3; c++ {
				corr[f][i][c] = mean[c] - vColor[f][i][c]
			}
		}
	}
	return corr
}

// sampleVertexColor projects a world vertex into a view and returns its RGB, or
// ok=false if behind the camera or off-image.
func sampleVertexColor(v [3]float32, kf Keyframe, prep camPrep) ([3]float64, bool) {
	cam := Mat4MulVec(prep.inverse, [4]float32{v[0], v[1], v[2], 1})
	if cam[2] >= 0 {
		return [3]float64{}, false
	}
	x := kf.cx() + kf.fx()*cam[0]/(-cam[2])
	y := kf.cy() + kf.fy()*cam[1]/(-cam[2])
	if x < 0 || x >= float32(kf.Width) || y < 0 || y >= float32(kf.Height) {
		return [3]float64{}, false
	}
	c := sampleNearest(kf.Image, int(x), int(y))
	return [3]float64{float64(c.R), float64(c.G), float64(c.B)}, true
}
