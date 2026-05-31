package processing

import (
	"math"
	"testing"
)

// identity4 returns the 4x4 identity in column-major layout.
func identity4() Mat4 {
	return Mat4{1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1}
}

func TestMat4MulVec_Identity(t *testing.T) {
	v := [4]float32{1, 2, 3, 4}
	if got := Mat4MulVec(identity4(), v); got != v {
		t.Fatalf("identity*v = %v, want %v", got, v)
	}
}

func TestMat4MulVec_Translation(t *testing.T) {
	// Column-major translation by (10,20,30) lives in column 3 (indices 12..14).
	m := identity4()
	m[12], m[13], m[14] = 10, 20, 30
	got := Mat4MulVec(m, [4]float32{1, 1, 1, 1})
	want := [4]float32{11, 21, 31, 1}
	if got != want {
		t.Fatalf("translated = %v, want %v", got, want)
	}
}

func TestMat4Inverse_Identity(t *testing.T) {
	if got := Mat4Inverse(identity4()); !matApproxEqual(got, identity4(), 1e-6) {
		t.Fatalf("inverse(I) = %v, want identity", got)
	}
}

func TestMat4Inverse_TRSRoundTrip(t *testing.T) {
	// Rotation about Z by 90° (column-major), then translation, then scale 2.
	m := Mat4{
		0, 2, 0, 0, // column 0
		-2, 0, 0, 0, // column 1
		0, 0, 2, 0, // column 2
		5, 6, 7, 1, // column 3 (translation)
	}
	inv := Mat4Inverse(m)
	prod := mat4Mul(m, inv)
	if !matApproxEqual(prod, identity4(), 1e-4) {
		t.Fatalf("M*inv(M) = %v, want identity", prod)
	}
}

// mat4Mul multiplies two column-major 4x4 matrices.
func mat4Mul(a, b Mat4) Mat4 {
	var out Mat4
	for col := 0; col < 4; col++ {
		for row := 0; row < 4; row++ {
			var sum float32
			for k := 0; k < 4; k++ {
				sum += a[k*4+row] * b[col*4+k]
			}
			out[col*4+row] = sum
		}
	}
	return out
}

// matApproxEqual reports whether a and b match within eps element-wise.
func matApproxEqual(a, b Mat4, eps float32) bool {
	for i := range a {
		if float32(math.Abs(float64(a[i]-b[i]))) > eps {
			return false
		}
	}
	return true
}
