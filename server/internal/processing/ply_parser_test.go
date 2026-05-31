package processing

import (
	"strings"
	"testing"
)

const samplePLY = `ply
format ascii 1.0
element vertex 2
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
end_header
1.5 2.5 3.5 255 0 128
-1.0 0.0 4.0 10 20 30
`

func TestParsePLY_RoundTrip(t *testing.T) {
	pts, err := ParsePLY(strings.NewReader(samplePLY))
	if err != nil {
		t.Fatalf("ParsePLY: %v", err)
	}
	if len(pts) != 2 {
		t.Fatalf("got %d points, want 2", len(pts))
	}
	if pts[0].Pos != [3]float32{1.5, 2.5, 3.5} || pts[0].Color != [3]uint8{255, 0, 128} {
		t.Fatalf("point 0 = %+v", pts[0])
	}
	if pts[1].Pos != [3]float32{-1.0, 0.0, 4.0} || pts[1].Color != [3]uint8{10, 20, 30} {
		t.Fatalf("point 1 = %+v", pts[1])
	}
}

func TestParsePLY_Truncated(t *testing.T) {
	bad := strings.Replace(samplePLY, "-1.0 0.0 4.0 10 20 30\n", "", 1)
	if _, err := ParsePLY(strings.NewReader(bad)); err == nil {
		t.Fatal("expected error for truncated body, got nil")
	}
}

func TestParsePLY_MissingHeader(t *testing.T) {
	if _, err := ParsePLY(strings.NewReader("ply\nend_header\n")); err == nil {
		t.Fatal("expected error for header without vertex count, got nil")
	}
}
