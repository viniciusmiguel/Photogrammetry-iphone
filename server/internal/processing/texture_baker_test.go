package processing

import (
	"image"
	"image/color"
	"testing"
)

// solidKeyframe builds a keyframe whose image is a single solid color, with a
// camera at camZ on +Z looking down -Z (identity rotation) and given intrinsics.
func solidKeyframe(c color.RGBA, camZ float32, w, h int, fx float32) Keyframe {
	img := image.NewRGBA(image.Rect(0, 0, w, h))
	for i := 0; i < len(img.Pix); i += 4 {
		img.Pix[i], img.Pix[i+1], img.Pix[i+2], img.Pix[i+3] = c.R, c.G, c.B, 255
	}
	transform := identity4()
	transform[14] = camZ // camera world position (0,0,camZ)
	intr := [9]float32{}
	intr[0], intr[4] = fx, fx                     // fx, fy
	intr[6], intr[7] = float32(w)/2, float32(h)/2 // cx, cy
	return Keyframe{Image: img, Transform: transform, Intrinsics: intr, Width: w, Height: h}
}

// frontFace is a triangle in the z=0 plane facing +Z.
func frontFace() [3][3]float32 {
	return [3][3]float32{{-1, -1, 0}, {1, -1, 0}, {-1, 1, 0}}
}

func TestBakeTexture_SamplesKeyframeColor(t *testing.T) {
	faces := [][3][3]float32{frontFace()}
	layout := PackUVAtlas(1, 64)
	red := color.RGBA{R: 200, G: 10, B: 20, A: 255}
	atlas := BakeTexture(faces, layout, []Keyframe{solidKeyframe(red, 3, 256, 256, 120)})
	if !atlasHasColor(atlas, layout, 0, red) {
		t.Fatal("baked cell did not receive the keyframe color (still fill?)")
	}
}

func TestBakeTexture_PicksMoreFrontFacingCamera(t *testing.T) {
	faces := [][3][3]float32{frontFace()}
	layout := PackUVAtlas(1, 64)
	// Head-on camera (green) sits on +Z axis; oblique camera (blue) is offset so
	// its facing angle to the +Z normal is smaller. Green should win.
	green := solidKeyframe(color.RGBA{G: 255, A: 255}, 3, 256, 256, 120)
	blue := solidKeyframe(color.RGBA{B: 255, A: 255}, 3, 256, 256, 120)
	blue.Transform[12] = 6 // shift camera far along +X → more oblique
	blue.Transform[13] = 6
	atlas := BakeTexture(faces, layout, []Keyframe{blue, green})
	if !atlasHasColor(atlas, layout, 0, color.RGBA{G: 255, A: 255}) {
		t.Fatal("expected the head-on (green) camera to win")
	}
}

func TestBakeTexture_FillWhenNoKeyframe(t *testing.T) {
	faces := [][3][3]float32{frontFace()}
	layout := PackUVAtlas(1, 64)
	// Camera behind the face (negative Z) so the point is never in front.
	behind := solidKeyframe(color.RGBA{R: 255, A: 255}, -3, 256, 256, 120)
	atlas := BakeTexture(faces, layout, []Keyframe{behind})
	if atlasHasColor(atlas, layout, 0, color.RGBA{R: 255, A: 255}) {
		t.Fatal("behind-camera color must not be sampled")
	}
}

// atlasHasColor reports whether any texel in face f's cell matches want.
func atlasHasColor(atlas *image.RGBA, layout UVAtlasLayout, f int, want color.RGBA) bool {
	origin := layout.CellOrigins[f]
	for ty := 0; ty < layout.CellSize; ty++ {
		for tx := 0; tx < layout.CellSize; tx++ {
			r, g, b, _ := atlas.At(origin[0]+tx, origin[1]+ty).RGBA()
			if uint8(r>>8) == want.R && uint8(g>>8) == want.G && uint8(b>>8) == want.B {
				return true
			}
		}
	}
	return false
}
