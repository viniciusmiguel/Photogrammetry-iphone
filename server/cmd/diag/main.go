// Command diag renders a shaded view of the LiDAR mesh from a keyframe's camera
// using the SAME projection the texture baker uses. The mesh geometry is
// independent of the keyframe pixels, so comparing this render's structure to
// the keyframe photo is a non-circular check of whether the world→image
// projection is horizontally/vertically mirrored.
//
// Usage: go run ./cmd/diag <scanDir> <keyframeIndex>
package main

import (
	"fmt"
	"image"
	"image/color"
	"image/png"
	"math"
	"os"
	"strconv"

	"github.com/vmiguel/photogrammetry-server/internal/processing"
	"github.com/vmiguel/photogrammetry-server/internal/storage"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("usage: diag <scanDir> <keyframeIndex>")
		os.Exit(1)
	}
	scanDir := os.Args[1]

	anchorsFile, err := os.Open(scanDir + "/raw/mesh_anchors.bin")
	must(err)
	anchors, err := storage.DeserializeMeshAnchors(anchorsFile)
	must(err)
	var b processing.MeshBuilder
	for _, a := range anchors {
		b.Add(a)
	}
	faces := b.WorldFaceVertices()

	kfs, err := processing.LoadKeyframes(scanDir + "/raw")
	must(err)

	// "rebake" re-runs BakeTexture (with the current occlusion logic) over the
	// stored raw data and overwrites processed/texture.png, so a fix can be
	// verified without re-uploading from the phone.
	if os.Args[2] == "rebake" {
		layout := processing.PackUVAtlas(len(faces), 2048)
		atlas := processing.BakeTextureMultiView(faces, layout, kfs)
		writePNG(scanDir+"/processed/texture.png", atlas)
		fmt.Printf("rebaked texture for %d faces, %d keyframes\n", len(faces), len(kfs))
		return
	}

	kfIndex, _ := strconv.Atoi(os.Args[2])
	kf := kfs[kfIndex]
	fmt.Printf("faces=%d keyframe=%d %dx%d\n", len(faces), kfIndex, kf.Width, kf.Height)

	inv := processing.Mat4Inverse(kf.Transform)
	fx, fy := kf.Intrinsics[0], kf.Intrinsics[4]
	cx, cy := kf.Intrinsics[6], kf.Intrinsics[7]
	W, H := kf.Width, kf.Height

	// Load the baked texture + per-face UVs so we can also render a TEXTURED
	// reprojection using three.js's exact sampling convention.
	texFile, err := os.Open(scanDir + "/processed/texture.png")
	must(err)
	tex, err := png.Decode(texFile)
	must(err)
	layout := processing.PackUVAtlas(len(faces), 2048)

	geo := image.NewRGBA(image.Rect(0, 0, W, H))
	textured := image.NewRGBA(image.Rect(0, 0, W, H))
	zbuf := make([]float32, W*H)
	zbuf2 := make([]float32, W*H)
	for i := range zbuf {
		zbuf[i] = math.MaxFloat32
		zbuf2[i] = math.MaxFloat32
	}

	for fi, f := range faces {
		var px, py, depth [3]float32
		ok := true
		for i := 0; i < 3; i++ {
			cam := processing.Mat4MulVec(inv, [4]float32{f[i][0], f[i][1], f[i][2], 1})
			if cam[2] >= 0 { // behind camera
				ok = false
				break
			}
			px[i] = cx + fx*cam[0]/(-cam[2])
			py[i] = cy + fy*cam[1]/(-cam[2])
			depth[i] = -cam[2]
		}
		if !ok {
			continue
		}
		shade := faceShade(f)
		fillTriangle(geo, zbuf, W, H, px, py, depth, color.RGBA{shade, shade, shade, 255})
		// Textured: average the face's 3 UVs to a flat color, sampled from the
		// atlas the way three.js does (flipY=true → row=(1-v)*texH).
		uv := layout.FaceUVs[fi]
		u := (uv[0][0] + uv[1][0] + uv[2][0]) / 3
		v := (uv[0][1] + uv[1][1] + uv[2][1]) / 3
		fillTriangle(textured, zbuf2, W, H, px, py, depth, sampleThreeJS(tex, u, v))
	}

	writePNG(scanDir+"/diag_geometry_kf"+strconv.Itoa(kfIndex)+".png", geo)
	writePNG(scanDir+"/diag_textured_kf"+strconv.Itoa(kfIndex)+".png", textured)

	renderWebPose(faces, layout, tex, scanDir)
}

// renderWebPose renders the textured mesh exactly the way the web viewer frames
// it: model centered at origin, camera on +Z looking at the origin with +Y up,
// 50° vertical FOV. If the room comes out upside-down here, the data has a real
// Y flip (the web viewer would show the same).
func renderWebPose(faces [][3][3]float32, layout processing.UVAtlasLayout, tex image.Image, scanDir string) {
	W, H := 800, 600
	// Model bounding box → center + max dimension (matches frameObject).
	lo := [3]float32{math.MaxFloat32, math.MaxFloat32, math.MaxFloat32}
	hi := [3]float32{-math.MaxFloat32, -math.MaxFloat32, -math.MaxFloat32}
	for _, f := range faces {
		for _, v := range f {
			for k := 0; k < 3; k++ {
				lo[k] = float32(math.Min(float64(lo[k]), float64(v[k])))
				hi[k] = float32(math.Max(float64(hi[k]), float64(v[k])))
			}
		}
	}
	center := [3]float32{(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2}
	maxDim := float32(math.Max(float64(hi[0]-lo[0]), math.Max(float64(hi[1]-lo[1]), float64(hi[2]-lo[2]))))
	if maxDim == 0 {
		maxDim = 1
	}

	fovY := 50.0 * math.Pi / 180
	fy := float32(float64(H) / 2 / math.Tan(fovY/2))
	fx := fy
	cx, cy := float32(W)/2, float32(H)/2
	dist := maxDim / 2 / float32(math.Tan(fovY/2)) * 1.6
	// Eye on +Z from the center, looking at the center, +Y up.
	eye := [3]float32{center[0], center[1], center[2] + dist}

	img := image.NewRGBA(image.Rect(0, 0, W, H))
	zbuf := make([]float32, W*H)
	for i := range zbuf {
		zbuf[i] = math.MaxFloat32
	}

	for fi, f := range faces {
		// Back-face cull like three.js FrontSide: skip faces whose normal points
		// away from the camera.
		fc := [3]float32{(f[0][0] + f[1][0] + f[2][0]) / 3, (f[0][1] + f[1][1] + f[2][1]) / 3, (f[0][2] + f[1][2] + f[2][2]) / 3}
		n := normalize(cross(sub(f[1], f[0]), sub(f[2], f[0])))
		viewRay := [3]float32{fc[0] - eye[0], fc[1] - eye[1], fc[2] - eye[2]}
		if n[0]*viewRay[0]+n[1]*viewRay[1]+n[2]*viewRay[2] >= 0 {
			continue
		}
		var px, py, depth [3]float32
		ok := true
		for i := 0; i < 3; i++ {
			// Camera looks down -Z with +Y up: world == camera space here since
			// eye is axis-aligned, so just translate by -eye. z<0 is in front.
			camX := f[i][0] - eye[0]
			camY := f[i][1] - eye[1]
			camZ := f[i][2] - eye[2]
			if camZ >= 0 {
				ok = false
				break
			}
			px[i] = cx + fx*camX/(-camZ)
			py[i] = cy - fy*camY/(-camZ) // image y is down, world Y is up
			depth[i] = -camZ
		}
		if !ok {
			continue
		}
		uv := layout.FaceUVs[fi]
		u := (uv[0][0] + uv[1][0] + uv[2][0]) / 3
		v := (uv[0][1] + uv[1][1] + uv[2][1]) / 3
		fillTriangle(img, zbuf, W, H, px, py, depth, sampleThreeJS(tex, u, v))
	}
	writePNG(scanDir+"/diag_web_pose.png", img)
}

// faceShade returns a grayscale Lambert shade from the face normal so the
// render reads like a clay model — good for comparing structure to the photo.
func faceShade(f [3][3]float32) uint8 {
	e1 := sub(f[1], f[0])
	e2 := sub(f[2], f[0])
	n := normalize(cross(e1, e2))
	light := normalize([3]float32{0.3, 0.6, 0.6})
	d := n[0]*light[0] + n[1]*light[1] + n[2]*light[2]
	if d < 0 {
		d = -d
	}
	return uint8(40 + 200*d)
}

// sampleThreeJS reads the atlas the way three.js samples a texture with the
// default flipY=true: UV v maps to image row (1-v)*height, u to col u*width.
func sampleThreeJS(tex image.Image, u, v float32) color.RGBA {
	b := tex.Bounds()
	w, h := b.Dx(), b.Dy()
	col := int(u * float32(w))
	row := int((1 - v) * float32(h))
	if col < 0 {
		col = 0
	}
	if col >= w {
		col = w - 1
	}
	if row < 0 {
		row = 0
	}
	if row >= h {
		row = h - 1
	}
	r, g, bl, _ := tex.At(b.Min.X+col, b.Min.Y+row).RGBA()
	return color.RGBA{uint8(r >> 8), uint8(g >> 8), uint8(bl >> 8), 255}
}

func writePNG(path string, img image.Image) {
	out, err := os.Create(path)
	must(err)
	must(png.Encode(out, img))
	out.Close()
	fmt.Println("wrote", path)
}

func fillTriangle(img *image.RGBA, zbuf []float32, W, H int, px, py, depth [3]float32, col color.RGBA) {
	minX := int(math.Floor(float64(min3(px[0], px[1], px[2]))))
	maxX := int(math.Ceil(float64(max3(px[0], px[1], px[2]))))
	minY := int(math.Floor(float64(min3(py[0], py[1], py[2]))))
	maxY := int(math.Ceil(float64(max3(py[0], py[1], py[2]))))
	if minX < 0 {
		minX = 0
	}
	if minY < 0 {
		minY = 0
	}
	if maxX >= W {
		maxX = W - 1
	}
	if maxY >= H {
		maxY = H - 1
	}
	area := edge(px[0], py[0], px[1], py[1], px[2], py[2])
	if area == 0 {
		return
	}
	for y := minY; y <= maxY; y++ {
		for x := minX; x <= maxX; x++ {
			fxp, fyp := float32(x)+0.5, float32(y)+0.5
			w0 := edge(px[1], py[1], px[2], py[2], fxp, fyp) / area
			w1 := edge(px[2], py[2], px[0], py[0], fxp, fyp) / area
			w2 := edge(px[0], py[0], px[1], py[1], fxp, fyp) / area
			if (w0 < 0 || w1 < 0 || w2 < 0) && (w0 > 0 || w1 > 0 || w2 > 0) {
				continue
			}
			z := w0*depth[0] + w1*depth[1] + w2*depth[2]
			idx := y*W + x
			if z < zbuf[idx] {
				zbuf[idx] = z
				img.Set(x, y, col)
			}
		}
	}
}

func edge(ax, ay, bx, by, cx, cy float32) float32 {
	return (bx-ax)*(cy-ay) - (by-ay)*(cx-ax)
}

func sub(a, b [3]float32) [3]float32 { return [3]float32{a[0] - b[0], a[1] - b[1], a[2] - b[2]} }
func cross(a, b [3]float32) [3]float32 {
	return [3]float32{a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]}
}
func normalize(a [3]float32) [3]float32 {
	l := float32(math.Sqrt(float64(a[0]*a[0] + a[1]*a[1] + a[2]*a[2])))
	if l == 0 {
		return a
	}
	return [3]float32{a[0] / l, a[1] / l, a[2] / l}
}
func min3(a, b, c float32) float32 {
	return float32(math.Min(float64(a), math.Min(float64(b), float64(c))))
}
func max3(a, b, c float32) float32 {
	return float32(math.Max(float64(a), math.Max(float64(b), float64(c))))
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
