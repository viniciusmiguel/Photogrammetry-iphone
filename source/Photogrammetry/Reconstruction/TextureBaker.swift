import UIKit
import simd

/// Projects camera keyframes onto the UV atlas to produce a baked texture.
///
/// For each atlas texel the baker:
///   1. Identifies which face owns its cell (via `UVAtlasLayout`).
///   2. Computes barycentric coordinates within the fixed cell triangle
///      (v0=top-left, v1=top-right, v2=bottom-centre — matching `UVAtlasPacker`).
///   3. Interpolates the world-space position.
///   4. Finds the keyframe with the best viewing angle for that face.
///   5. Projects the world point through the keyframe camera and samples YCbCr.
///
/// Texels outside the cell triangle or with no valid keyframe get a mid-gray fill.
enum TextureBaker {
    /// Returns RGBA pixel data for a `layout.atlasSize × layout.atlasSize` image.
    static func bake(
        worldFaceVertices: [[SIMD3<Float>]],
        layout: UVAtlasLayout,
        keyframes: [CameraKeyframe]
    ) -> Data {
        let size = layout.atlasSize
        let cellSize = layout.cellSize
        let faceCount = worldFaceVertices.count

        var pixels = [UInt8](repeating: 128, count: size * size * 4)
        // Pre-fill alpha to 255 so the PNG is fully opaque.
        for i in stride(from: 3, to: pixels.count, by: 4) { pixels[i] = 255 }

        // Precompute per-keyframe data to avoid redundant work in the inner loop.
        let camInverses = keyframes.map { $0.transform.inverse }
        let camPositions = keyframes.map { kf -> SIMD3<Float> in
            SIMD3(kf.transform.columns.3.x,
                  kf.transform.columns.3.y,
                  kf.transform.columns.3.z)
        }

        for faceIndex in 0..<faceCount {
            let verts = worldFaceVertices[faceIndex]
            let origin = layout.cellOrigins[faceIndex]

            let e1 = verts[1] - verts[0]
            let e2 = verts[2] - verts[0]
            let faceNormal = normalize(cross(e1, e2))

            for ty in 0..<cellSize {
                for tx in 0..<cellSize {
                    // Barycentric coords for (tx,ty) within the fixed cell triangle.
                    // Derived from pA=(0,0), pB=(1,0), pC=(0.5,1) (normalised).
                    let tNorm = (Float(tx) + 0.5) / Float(cellSize)
                    let sNorm = (Float(ty) + 0.5) / Float(cellSize)
                    let λ0 = 1 - tNorm - 0.5 * sNorm
                    let λ1 = tNorm - 0.5 * sNorm
                    let λ2 = sNorm
                    guard λ0 >= 0, λ1 >= 0, λ2 >= 0 else { continue }

                    let worldPos = λ0 * verts[0] + λ1 * verts[1] + λ2 * verts[2]

                    let rgb = bestKeyframeSample(
                        worldPos: worldPos, faceNormal: faceNormal,
                        keyframes: keyframes, camInverses: camInverses,
                        camPositions: camPositions)
                    guard let rgb else { continue }

                    let atlasX = origin.x + tx
                    let atlasY = origin.y + ty
                    guard atlasX < size, atlasY < size else { continue }
                    let off = (atlasY * size + atlasX) * 4
                    pixels[off] = rgb.x; pixels[off+1] = rgb.y
                    pixels[off+2] = rgb.z; pixels[off+3] = 255
                }
            }
        }
        DiagnosticLog.info("TextureBaker — baked \(faceCount) faces")
        return Data(pixels)
    }

    /// Converts the raw RGBA data to a PNG for writing to disk.
    static func pngData(rgba: Data, size: Int) -> Data? {
        var mutableRGBA = rgba
        return mutableRGBA.withUnsafeMutableBytes { buf -> Data? in
            let colorSpace = CGColorSpaceCreateDeviceRGB()
            guard let ctx = CGContext(
                data: buf.baseAddress, width: size, height: size,
                bitsPerComponent: 8, bytesPerRow: size * 4,
                space: colorSpace,
                bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue),
                  let cgImg = ctx.makeImage() else { return nil }
            return UIImage(cgImage: cgImg).pngData()
        }
    }

    // MARK: - Private

    private static func bestKeyframeSample(
        worldPos: SIMD3<Float>,
        faceNormal: SIMD3<Float>,
        keyframes: [CameraKeyframe],
        camInverses: [simd_float4x4],
        camPositions: [SIMD3<Float>]
    ) -> SIMD3<UInt8>? {
        var bestDot: Float = 0
        var bestRGB: SIMD3<UInt8>? = nil

        for (i, keyframe) in keyframes.enumerated() {
            // Visibility: face normal must point toward the camera.
            let toCamera = normalize(camPositions[i] - worldPos)
            let facing = dot(faceNormal, toCamera)
            guard facing > bestDot else { continue }

            // Project world position into camera space (ARKit: camera looks down -Z).
            let camSpace = camInverses[i] * SIMD4<Float>(worldPos, 1)
            guard camSpace.z < 0 else { continue }

            // camera.transform is sensor-aligned (same convention as
            // ARCamera.intrinsics), so camSpace.x/y map directly to
            // sensor U/V. No orientation rotation is needed here.
            let k = keyframe.intrinsics
            let projX = k[2][0] + k[0][0] * camSpace.x / (-camSpace.z)
            let projY = k[2][1] + k[1][1] * camSpace.y / (-camSpace.z)
            let imgW = Float(keyframe.imageResolution.width)
            let imgH = Float(keyframe.imageResolution.height)
            guard projX >= 0, projX < imgW, projY >= 0, projY < imgH else { continue }

            bestDot = facing
            bestRGB = YCbCrSampler.sampleRGB(
                keyframe.image, u: projX / imgW, v: projY / imgH)
        }
        return bestRGB
    }
}
