package processing

import (
	"image/color"
	"testing"
)

var scoringRed = color.RGBA{R: 200, G: 10, B: 20, A: 255}

func scoreOneFace(faces [][3][3]float32, kfs []Keyframe) ViewScoring {
	preps := prepCameras(kfs)
	depths := buildDepthMaps(faces, kfs, preps)
	return ScoreViews(faces, kfs, preps, depths)
}

func TestScoreViews_HeadOnFaceIsBest(t *testing.T) {
	faces := [][3][3]float32{frontFace()} // z=0, +Z normal
	kfs := []Keyframe{solidKeyframe(scoringRed, 3, 256, 256, 120)}
	vs := scoreOneFace(faces, kfs)

	if !vs.AnyValid[0] || !vs.Visible[0][0] {
		t.Fatal("head-on face should be visible")
	}
	if vs.DataCost[0][0] != 0 {
		t.Fatalf("only view should have data cost 0, got %v", vs.DataCost[0][0])
	}
}

func TestScoreViews_BehindCameraInvalid(t *testing.T) {
	faces := [][3][3]float32{frontFace()}
	kfs := []Keyframe{solidKeyframe(scoringRed, -3, 256, 256, 120)} // camera behind
	vs := scoreOneFace(faces, kfs)

	if vs.AnyValid[0] || vs.Visible[0][0] {
		t.Fatal("face behind the camera must be invalid")
	}
	if vs.DataCost[0][0] != invalidViewCost {
		t.Fatalf("expected invalidViewCost, got %v", vs.DataCost[0][0])
	}
}

func TestScoreViews_OccludedFaceInvalid(t *testing.T) {
	occluder := [3][3]float32{{-1, -1, 1}, {1, -1, 1}, {-1, 1, 1}}
	far := frontFace() // z=0, hidden behind the occluder
	faces := [][3][3]float32{occluder, far}
	kfs := []Keyframe{solidKeyframe(scoringRed, 3, 256, 256, 120)}
	vs := scoreOneFace(faces, kfs)

	if !vs.Visible[0][0] {
		t.Fatal("occluder itself should be visible")
	}
	if vs.Visible[1][0] || vs.AnyValid[1] {
		t.Fatal("occluded far face must not be visible (no ghosting)")
	}
}
