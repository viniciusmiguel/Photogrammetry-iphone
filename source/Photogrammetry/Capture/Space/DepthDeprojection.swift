import simd

/// Pinhole camera intrinsics for a depth frame (pixels).
struct CameraIntrinsics: Equatable, Sendable {
    let fx: Float
    let fy: Float
    let cx: Float
    let cy: Float
}

/// Back-projects a depth sample into world space. Isolated as a pure function so
/// the geometry (the part most likely to be wrong) is unit-testable without
/// ARKit.
///
/// `depth` is the metric distance (meters) along the camera's view ray for pixel
/// `(u, v)`. ARKit's camera looks down its local -Z axis, hence the negation.
///
/// Example:
/// ```
/// let world = DepthDeprojection.worldPoint(
///     u: 320, v: 240, depth: 1.0, intrinsics: k, cameraTransform: t)
/// ```
enum DepthDeprojection {
    static func worldPoint(
        u: Float,
        v: Float,
        depth: Float,
        intrinsics: CameraIntrinsics,
        cameraTransform: simd_float4x4
    ) -> SIMD3<Float> {
        let x = (u - intrinsics.cx) / intrinsics.fx * depth
        let y = (v - intrinsics.cy) / intrinsics.fy * depth
        let cameraPoint = SIMD4<Float>(x, y, -depth, 1)
        let world = cameraTransform * cameraPoint
        return SIMD3<Float>(world.x, world.y, world.z)
    }
}
