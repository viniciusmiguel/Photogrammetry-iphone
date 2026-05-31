package processing

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

// PLYPoint is one colored point parsed from an ASCII PLY point cloud.
type PLYPoint struct {
	Pos   [3]float32
	Color [3]uint8
}

// ParsePLY reads an ASCII PLY with x y z float + red green blue uchar
// properties and returns the points. Used mainly for validation/stats.
//
// Example:
//
//	pts, err := ParsePLY(file)
func ParsePLY(r io.Reader) ([]PLYPoint, error) {
	sc := bufio.NewScanner(r)
	sc.Buffer(make([]byte, 1024*1024), 16*1024*1024)
	count, err := readPLYHeader(sc)
	if err != nil {
		return nil, err
	}
	return readPLYBody(sc, count)
}

// readPLYHeader advances past the header, returning the vertex count.
func readPLYHeader(sc *bufio.Scanner) (int, error) {
	count := -1
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if strings.HasPrefix(line, "element vertex ") {
			n, err := strconv.Atoi(strings.TrimSpace(strings.TrimPrefix(line, "element vertex ")))
			if err != nil {
				return 0, fmt.Errorf("parsing vertex count from %q: %w", line, err)
			}
			count = n
		}
		if line == "end_header" {
			if count < 0 {
				return 0, fmt.Errorf("PLY header missing 'element vertex' before end_header")
			}
			return count, nil
		}
	}
	return 0, fmt.Errorf("PLY header missing end_header")
}

// readPLYBody reads count vertex lines of "x y z r g b".
func readPLYBody(sc *bufio.Scanner, count int) ([]PLYPoint, error) {
	pts := make([]PLYPoint, 0, count)
	for i := 0; i < count; i++ {
		if !sc.Scan() {
			return nil, fmt.Errorf("PLY body truncated: got %d of %d vertices", i, count)
		}
		p, err := parsePLYLine(sc.Text())
		if err != nil {
			return nil, fmt.Errorf("vertex %d: %w", i, err)
		}
		pts = append(pts, p)
	}
	return pts, nil
}

// parsePLYLine parses a single "x y z r g b" point line.
func parsePLYLine(line string) (PLYPoint, error) {
	f := strings.Fields(line)
	if len(f) < 6 {
		return PLYPoint{}, fmt.Errorf("expected 6 fields, got %d in %q", len(f), line)
	}
	var p PLYPoint
	for i := 0; i < 3; i++ {
		v, err := strconv.ParseFloat(f[i], 32)
		if err != nil {
			return PLYPoint{}, fmt.Errorf("bad coord %q: %w", f[i], err)
		}
		p.Pos[i] = float32(v)
	}
	for i := 0; i < 3; i++ {
		v, err := strconv.Atoi(f[3+i])
		if err != nil || v < 0 || v > 255 {
			return PLYPoint{}, fmt.Errorf("bad color component %q: want 0..255", f[3+i])
		}
		p.Color[i] = uint8(v)
	}
	return p, nil
}
