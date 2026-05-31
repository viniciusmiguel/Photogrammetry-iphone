package processing

import (
	"image"
	"image/color"
)

// Keyframe is a decoded capture frame plus its camera parameters.
// Transform is the camera-to-world matrix (column-major). Intrinsics is the
// 3x3 camera matrix, column-major (element = col*3+row).
type Keyframe struct {
	Image      image.Image
	Transform  Mat4
	Intrinsics [9]float32
	Width      int
	Height     int
}

// fx, fy, cx, cy extract focal lengths and principal point from the
// column-major 3x3 intrinsics (fx@0, fy@4, cx@6, cy@7).
func (k Keyframe) fx() float32 { return k.Intrinsics[0] }
func (k Keyframe) fy() float32 { return k.Intrinsics[4] }
func (k Keyframe) cx() float32 { return k.Intrinsics[6] }
func (k Keyframe) cy() float32 { return k.Intrinsics[7] }

// camPrep holds per-keyframe precomputed projection state.
type camPrep struct {
	inverse  Mat4       // world-to-camera
	position [3]float32 // camera world position (transform col 3)
}

// BakeTexture renders a baked color atlas by projecting each atlas texel onto
// the best front-facing keyframe and sampling its color. Ports the Swift
// TextureBaker. Returns an *image.RGBA of atlasSize×atlasSize.
func BakeTexture(faces [][3][3]float32, layout UVAtlasLayout, keyframes []Keyframe) *image.RGBA {
	atlas := newFilledAtlas(layout.AtlasSize)
	preps := prepCameras(keyframes)
	for f := range faces {
		bakeFace(atlas, faces[f], layout.CellOrigins[f], layout.CellSize, keyframes, preps)
	}
	return atlas
}

// newFilledAtlas allocates an RGBA atlas pre-filled with RGB=128, A=255.
func newFilledAtlas(size int) *image.RGBA {
	atlas := image.NewRGBA(image.Rect(0, 0, size, size))
	for i := 0; i < len(atlas.Pix); i += 4 {
		atlas.Pix[i], atlas.Pix[i+1], atlas.Pix[i+2], atlas.Pix[i+3] = 128, 128, 128, 255
	}
	return atlas
}

// prepCameras precomputes the world-to-camera inverse and camera world
// position for each keyframe.
func prepCameras(keyframes []Keyframe) []camPrep {
	preps := make([]camPrep, len(keyframes))
	for i, kf := range keyframes {
		preps[i] = camPrep{
			inverse:  Mat4Inverse(kf.Transform),
			position: [3]float32{kf.Transform[12], kf.Transform[13], kf.Transform[14]},
		}
	}
	return preps
}

// bakeFace rasterizes one face's cell, sampling each texel from the best
// front-facing keyframe.
func bakeFace(atlas *image.RGBA, verts [3][3]float32, origin [2]int, cellSize int, keyframes []Keyframe, preps []camPrep) {
	e1 := vec3Sub(verts[1], verts[0])
	e2 := vec3Sub(verts[2], verts[0])
	normal := vec3Normalize(vec3Cross(e1, e2))
	for ty := 0; ty < cellSize; ty++ {
		for tx := 0; tx < cellSize; tx++ {
			world, ok := texelWorldPos(verts, tx, ty, cellSize)
			if !ok {
				continue
			}
			if rgb, ok := bestKeyframeColor(world, normal, keyframes, preps); ok {
				setAtlasTexel(atlas, origin[0]+tx, origin[1]+ty, rgb)
			}
		}
	}
}

// texelWorldPos converts a cell-local texel to a world position via the
// barycentric scheme from the Swift baker; ok=false when outside the triangle.
func texelWorldPos(verts [3][3]float32, tx, ty, cellSize int) ([3]float32, bool) {
	tNorm := (float32(tx) + 0.5) / float32(cellSize)
	sNorm := (float32(ty) + 0.5) / float32(cellSize)
	l0 := 1 - tNorm - 0.5*sNorm
	l1 := tNorm - 0.5*sNorm
	l2 := sNorm
	if l0 < 0 || l1 < 0 || l2 < 0 {
		return [3]float32{}, false
	}
	var w [3]float32
	for i := 0; i < 3; i++ {
		w[i] = l0*verts[0][i] + l1*verts[1][i] + l2*verts[2][i]
	}
	return w, true
}

// bestKeyframeColor selects the most front-facing keyframe that sees worldPos
// in front of the camera and within image bounds, and returns its sampled RGB.
func bestKeyframeColor(world, normal [3]float32, keyframes []Keyframe, preps []camPrep) (color.RGBA, bool) {
	var bestDot float32
	var best color.RGBA
	found := false
	for i := range keyframes {
		facing := vec3Dot(normal, vec3Normalize(vec3Sub(preps[i].position, world)))
		if facing <= bestDot {
			continue
		}
		rgb, ok := projectAndSample(world, keyframes[i], preps[i])
		if !ok {
			continue
		}
		bestDot = facing
		best = rgb
		found = true
	}
	return best, found
}

// projectAndSample projects worldPos into keyframe kf and returns the sampled
// color, or ok=false if behind the camera or off-image.
func projectAndSample(world [3]float32, kf Keyframe, prep camPrep) (color.RGBA, bool) {
	cam := Mat4MulVec(prep.inverse, [4]float32{world[0], world[1], world[2], 1})
	if cam[2] >= 0 { // ARKit camera looks down -Z; positive Z is behind
		return color.RGBA{}, false
	}
	projX := kf.cx() + kf.fx()*cam[0]/(-cam[2])
	projY := kf.cy() + kf.fy()*cam[1]/(-cam[2])
	if projX < 0 || projX >= float32(kf.Width) || projY < 0 || projY >= float32(kf.Height) {
		return color.RGBA{}, false
	}
	return sampleNearest(kf.Image, int(projX), int(projY)), true
}

// sampleNearest reads the nearest-neighbor pixel as an opaque RGBA color.
func sampleNearest(img image.Image, x, y int) color.RGBA {
	r, g, b, _ := img.At(img.Bounds().Min.X+x, img.Bounds().Min.Y+y).RGBA()
	return color.RGBA{uint8(r >> 8), uint8(g >> 8), uint8(b >> 8), 255}
}

// setAtlasTexel writes an opaque color into the atlas at (x, y).
func setAtlasTexel(atlas *image.RGBA, x, y int, c color.RGBA) {
	atlas.SetRGBA(x, y, c)
}
