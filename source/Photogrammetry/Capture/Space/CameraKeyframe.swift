import ARKit
import CoreVideo
import simd

/// A snapshot of one ARKit camera frame retained for texture projection.
/// The raw YCbCr buffer is kept so YCbCr→RGB conversion is deferred to
/// export time and we pay the cost only once per texel.
struct CameraKeyframe: @unchecked Sendable {
    let image: CVPixelBuffer         // kCVPixelFormatType_420YpCbCr8BiPlanarFullRange
    let transform: simd_float4x4     // camera local-to-world pose
    let intrinsics: simd_float3x3    // ARCamera.intrinsics at full image resolution
    let imageResolution: CGSize
    // No orientation matrix needed: camera.transform is already sensor-aligned
    // (same space as ARCamera.intrinsics). DepthDeprojection uses the same
    // convention and produces correct world-space points for all orientations.
}
