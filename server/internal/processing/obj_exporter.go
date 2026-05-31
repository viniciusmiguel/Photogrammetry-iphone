package processing

import (
	"bufio"
	"fmt"
	"io"
)

// materialName is the single material used by the baked OBJ.
const materialName = "baked"

// ExportOBJ writes a Wavefront OBJ (geometry + UVs) referencing an MTL that
// maps texture.png. The vertex/UV layout matches the exploded face buffer:
// vertex N (1-based 3N..3N+2) belongs to face N. exploded holds 9 floats per
// face (3 verts × xyz); faceUVs supplies per-face UVs.
//
// Example:
//
//	err := ExportOBJ(objW, mtlW, builder.Exploded(), layout.FaceUVs)
func ExportOBJ(objW, mtlW io.Writer, exploded []float32, faceUVs [][3][2]float32) error {
	if err := writeMTL(mtlW); err != nil {
		return err
	}
	return writeOBJ(objW, exploded, faceUVs)
}

// writeMTL writes the material file referencing texture.png.
func writeMTL(w io.Writer) error {
	bw := bufio.NewWriter(w)
	fmt.Fprintf(bw, "newmtl %s\n", materialName)
	fmt.Fprint(bw, "Ka 1.000 1.000 1.000\n")
	fmt.Fprint(bw, "Kd 1.000 1.000 1.000\n")
	fmt.Fprint(bw, "map_Kd texture.png\n")
	return bw.Flush()
}

// writeOBJ writes positions, UVs, and faces for the exploded buffer.
func writeOBJ(w io.Writer, exploded []float32, faceUVs [][3][2]float32) error {
	bw := bufio.NewWriter(w)
	fmt.Fprint(bw, "mtllib mesh.mtl\n")
	fmt.Fprintf(bw, "usemtl %s\n", materialName)
	faceCount := len(exploded) / 9
	writePositions(bw, exploded, faceCount)
	writeUVs(bw, faceUVs, faceCount)
	writeFaces(bw, faceCount)
	return bw.Flush()
}

// writePositions emits a v line per exploded vertex.
func writePositions(bw *bufio.Writer, exploded []float32, faceCount int) {
	for f := 0; f < faceCount; f++ {
		base := f * 9
		for v := 0; v < 3; v++ {
			o := base + v*3
			fmt.Fprintf(bw, "v %f %f %f\n", exploded[o], exploded[o+1], exploded[o+2])
		}
	}
}

// writeUVs emits a vt line per face vertex from faceUVs.
func writeUVs(bw *bufio.Writer, faceUVs [][3][2]float32, faceCount int) {
	for f := 0; f < faceCount; f++ {
		for v := 0; v < 3; v++ {
			fmt.Fprintf(bw, "vt %f %f\n", faceUVs[f][v][0], faceUVs[f][v][1])
		}
	}
}

// writeFaces emits one f line per face referencing sequential v/vt indices.
func writeFaces(bw *bufio.Writer, faceCount int) {
	for f := 0; f < faceCount; f++ {
		a := f*3 + 1
		fmt.Fprintf(bw, "f %d/%d %d/%d %d/%d\n", a, a, a+1, a+1, a+2, a+2)
	}
}
