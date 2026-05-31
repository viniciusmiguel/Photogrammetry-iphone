package processing

import "math"

// vec3Sub returns a-b component-wise.
func vec3Sub(a, b [3]float32) [3]float32 {
	return [3]float32{a[0] - b[0], a[1] - b[1], a[2] - b[2]}
}

// vec3Cross returns the cross product a×b.
func vec3Cross(a, b [3]float32) [3]float32 {
	return [3]float32{
		a[1]*b[2] - a[2]*b[1],
		a[2]*b[0] - a[0]*b[2],
		a[0]*b[1] - a[1]*b[0],
	}
}

// vec3Dot returns the dot product a·b.
func vec3Dot(a, b [3]float32) float32 {
	return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
}

// vec3Normalize returns a unit-length copy of v, or v unchanged if zero-length.
func vec3Normalize(v [3]float32) [3]float32 {
	l := float32(math.Sqrt(float64(vec3Dot(v, v))))
	if l == 0 {
		return v
	}
	return [3]float32{v[0] / l, v[1] / l, v[2] / l}
}
