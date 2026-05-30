import XCTest
import simd
@testable import Photogrammetry

final class DepthDeprojectionTests: XCTestCase {
    private let intrinsics = CameraIntrinsics(
        fx: 100, fy: 100, cx: 50, cy: 50)

    func test_principalAxis_identityCamera_pointsDownNegativeZ() {
        let world = DepthDeprojection.worldPoint(
            u: 50, v: 50, depth: 2,
            intrinsics: intrinsics,
            cameraTransform: matrix_identity_float4x4)
        XCTAssertEqual(world.x, 0, accuracy: 1e-5)
        XCTAssertEqual(world.y, 0, accuracy: 1e-5)
        XCTAssertEqual(world.z, -2, accuracy: 1e-5)   // ARKit looks down -Z
    }

    func test_offCenterPixel_scalesByDepthAndFocalLength() {
        let world = DepthDeprojection.worldPoint(
            u: 150, v: 50, depth: 1,
            intrinsics: intrinsics,
            cameraTransform: matrix_identity_float4x4)
        // (u-cx)/fx * depth = (150-50)/100 * 1 = 1.0
        XCTAssertEqual(world.x, 1.0, accuracy: 1e-5)
    }

    func test_cameraTranslation_offsetsWorldPoint() {
        var transform = matrix_identity_float4x4
        transform.columns.3 = SIMD4<Float>(10, 0, 0, 1)   // camera at x=10
        let world = DepthDeprojection.worldPoint(
            u: 50, v: 50, depth: 1,
            intrinsics: intrinsics, cameraTransform: transform)
        XCTAssertEqual(world.x, 10, accuracy: 1e-5)
        XCTAssertEqual(world.z, -1, accuracy: 1e-5)
    }
}
