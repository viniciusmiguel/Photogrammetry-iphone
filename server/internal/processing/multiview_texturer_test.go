package processing

import (
	"image/color"
	"testing"
)

// The multi-view baker must not let a foreground occluder bleed onto a hidden
// face: with only an occluded view available, the far face has no legal view and
// stays neutral fill rather than sampling the occluder's color.
func TestBakeTextureMultiView_NoGhostOnOccludedFace(t *testing.T) {
	red := color.RGBA{R: 200, G: 10, B: 20, A: 255}
	occluder := [3][3]float32{{-1, -1, 1}, {1, -1, 1}, {-1, 1, 1}}
	far := frontFace() // z=0, hidden behind the occluder
	faces := [][3][3]float32{occluder, far}
	layout := PackUVAtlas(2, 64)

	atlas := BakeTextureMultiView(faces, layout, []Keyframe{solidKeyframe(red, 3, 256, 256, 120)})

	if !atlasHasColor(atlas, layout, 0, red) {
		t.Fatal("visible occluder face should be textured")
	}
	if atlasHasColor(atlas, layout, 1, red) {
		t.Fatal("occluded far face must stay neutral, not ghost the occluder")
	}
}

// A single visible face is textured from the only valid view.
func TestBakeTextureMultiView_TexturesVisibleFace(t *testing.T) {
	green := color.RGBA{G: 255, A: 255}
	faces := [][3][3]float32{frontFace()}
	layout := PackUVAtlas(1, 64)
	atlas := BakeTextureMultiView(faces, layout, []Keyframe{solidKeyframe(green, 3, 256, 256, 120)})
	if !atlasHasColor(atlas, layout, 0, green) {
		t.Fatal("visible face should sample the keyframe color")
	}
}
