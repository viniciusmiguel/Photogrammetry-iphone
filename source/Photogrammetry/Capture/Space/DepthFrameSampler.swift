import ARKit
import CoreVideo

/// Turns one ARKit depth frame into world-space coloured points, subsampling on
/// a grid to keep the fused cloud affordable. The per-pixel geometry delegates
/// to the pure `DepthDeprojection`, so only the buffer plumbing lives here.
enum DepthFrameSampler {
    /// Sample every `step`-th pixel (both axes). Confidence filtering keeps only
    /// high-confidence depths.
    static func sample(
        frame: ARFrame, depth: ARDepthData, step: Int = 8
    ) -> [ColoredPoint] {
        let map = depth.depthMap
        let width = CVPixelBufferGetWidth(map)
        let height = CVPixelBufferGetHeight(map)
        let intrinsics = scaledIntrinsics(frame: frame, width: width, height: height)

        CVPixelBufferLockBaseAddress(map, .readOnly)
        defer { CVPixelBufferUnlockBaseAddress(map, .readOnly) }
        guard let base = CVPixelBufferGetBaseAddress(map) else { return [] }
        let rowBytes = CVPixelBufferGetBytesPerRow(map)
        let transform = frame.camera.transform

        var result: [ColoredPoint] = []
        for y in stride(from: 0, to: height, by: step) {
            let row = base.advanced(by: y * rowBytes)
                .assumingMemoryBound(to: Float32.self)
            for x in stride(from: 0, to: width, by: step) {
                let d = row[x]
                guard d > 0, d.isFinite else { continue }
                let world = DepthDeprojection.worldPoint(
                    u: Float(x), v: Float(y), depth: d,
                    intrinsics: intrinsics, cameraTransform: transform)
                result.append(
                    ColoredPoint(position: world, color: SIMD3(200, 200, 200)))
            }
        }
        return result
    }

    /// ARKit intrinsics are for the full-res image; scale them to the (smaller)
    /// depth map resolution.
    private static func scaledIntrinsics(
        frame: ARFrame, width: Int, height: Int
    ) -> CameraIntrinsics {
        let k = frame.camera.intrinsics
        let imageRes = frame.camera.imageResolution
        let sx = Float(width) / Float(imageRes.width)
        let sy = Float(height) / Float(imageRes.height)
        return CameraIntrinsics(
            fx: k[0][0] * sx, fy: k[1][1] * sy,
            cx: k[2][0] * sx, cy: k[2][1] * sy)
    }
}
