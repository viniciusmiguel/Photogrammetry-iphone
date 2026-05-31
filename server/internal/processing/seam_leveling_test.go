package processing

import (
	"image/color"
	"math"
	"testing"
)

// Two adjacent faces textured from different solid-color views should be pulled
// toward the average color at their shared vertices, leaving the non-shared
// vertex uncorrected.
func TestSeamLeveling_BlendsSharedVertices(t *testing.T) {
	red := color.RGBA{R: 200, G: 10, B: 20, A: 255}
	blue := color.RGBA{R: 20, G: 10, B: 200, A: 255}
	// Face 0 vertices 0,1 are shared with face 1; vertex 2 is unique.
	faceA := [3][3]float32{{0, 0, 0}, {1, 0, 0}, {0, 1, 0}}
	faceB := [3][3]float32{{1, 0, 0}, {0, 0, 0}, {1, -1, 0}}
	faces := [][3][3]float32{faceA, faceB}
	kfs := []Keyframe{
		solidKeyframe(red, 3, 256, 256, 120),
		solidKeyframe(blue, 3, 256, 256, 120),
	}
	preps := prepCameras(kfs)
	labels := []int{0, 1} // face A from red view, face B from blue view
	anyValid := []bool{true, true}

	corr := SeamLeveling(faces, labels, anyValid, kfs, preps)

	// Shared vertices of face A (indices 0 and 1) move halfway to blue.
	wantR := (float64(blue.R) - float64(red.R)) / 2 // (20-200)/2 = -90
	for _, i := range []int{0, 1} {
		if math.Abs(corr[0][i][0]-wantR) > 1 {
			t.Fatalf("face A shared vertex %d R correction = %v, want ~%v", i, corr[0][i][0], wantR)
		}
	}
	// Non-shared vertex of face A (index 2) has no correction.
	if corr[0][2][0] != 0 {
		t.Fatalf("face A unique vertex should be uncorrected, got %v", corr[0][2][0])
	}
}
