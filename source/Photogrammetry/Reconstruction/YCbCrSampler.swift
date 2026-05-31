import CoreVideo
import simd

/// Samples colour from the biplanar YCbCr CVPixelBuffer that ARKit vends as
/// `ARFrame.capturedImage` (kCVPixelFormatType_420YpCbCr8BiPlanarFullRange).
///
/// Follows the same lock/unlock pattern used by `DepthFrameSampler`.
enum YCbCrSampler {
    /// Returns RGB at normalised image coordinates (u, v) ∈ [0, 1].
    static func sampleRGB(
        _ buffer: CVPixelBuffer, u: Float, v: Float
    ) -> SIMD3<UInt8> {
        CVPixelBufferLockBaseAddress(buffer, .readOnly)
        defer { CVPixelBufferUnlockBaseAddress(buffer, .readOnly) }

        let yW = CVPixelBufferGetWidthOfPlane(buffer, 0)
        let yH = CVPixelBufferGetHeightOfPlane(buffer, 0)
        let yBPR = CVPixelBufferGetBytesPerRowOfPlane(buffer, 0)
        let yBase = CVPixelBufferGetBaseAddressOfPlane(buffer, 0)!

        let px = max(0, min(Int(u * Float(yW)), yW - 1))
        let py = max(0, min(Int(v * Float(yH)), yH - 1))
        let y = Float(yBase.advanced(by: py * yBPR + px).load(as: UInt8.self))

        let cbcrW = CVPixelBufferGetWidthOfPlane(buffer, 1)
        let cbcrH = CVPixelBufferGetHeightOfPlane(buffer, 1)
        let cbcrBPR = CVPixelBufferGetBytesPerRowOfPlane(buffer, 1)
        let cbcrBase = CVPixelBufferGetBaseAddressOfPlane(buffer, 1)!
        let cpx = max(0, min(px / 2, cbcrW - 1))
        let cpy = max(0, min(py / 2, cbcrH - 1))
        let cb = Float(cbcrBase.advanced(by: cpy * cbcrBPR + cpx * 2).load(as: UInt8.self))
        let cr = Float(cbcrBase.advanced(by: cpy * cbcrBPR + cpx * 2 + 1).load(as: UInt8.self))

        // BT.709 full-range (iPhone cameras output Rec.709, not BT.601)
        let r = clamp(y + 1.5748 * (cr - 128))
        let g = clamp(y - 0.18732 * (cb - 128) - 0.46812 * (cr - 128))
        let b = clamp(y + 1.8556 * (cb - 128))
        return SIMD3<UInt8>(UInt8(r), UInt8(g), UInt8(b))
    }

    private static func clamp(_ v: Float) -> Float {
        max(0, min(255, v.rounded()))
    }
}
