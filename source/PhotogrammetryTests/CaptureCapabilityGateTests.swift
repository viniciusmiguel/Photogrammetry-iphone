import XCTest
@testable import Photogrammetry

final class CaptureCapabilityGateTests: XCTestCase {
    func test_noLiDAR_blocksBothModes() {
        let gate = makeGate(lidar: false, object: true, scene: true)
        XCTAssertEqual(gate.support(for: .object), .unsupported(.missingLiDAR))
        XCTAssertEqual(gate.support(for: .space), .unsupported(.missingLiDAR))
    }

    func test_objectModeRequiresObjectCapture() {
        let gate = makeGate(lidar: true, object: false, scene: true)
        XCTAssertEqual(
            gate.support(for: .object),
            .unsupported(.objectCaptureUnavailable))
        XCTAssertEqual(gate.support(for: .space), .supported)
    }

    func test_spaceModeRequiresSceneReconstruction() {
        let gate = makeGate(lidar: true, object: true, scene: false)
        XCTAssertEqual(
            gate.support(for: .space),
            .unsupported(.sceneReconstructionUnavailable))
        XCTAssertEqual(gate.support(for: .object), .supported)
    }

    func test_fullyCapableDeviceSupportsAll() {
        let gate = makeGate(lidar: true, object: true, scene: true)
        XCTAssertEqual(gate.support(for: .object), .supported)
        XCTAssertEqual(gate.support(for: .space), .supported)
    }

    private func makeGate(
        lidar: Bool, object: Bool, scene: Bool
    ) -> CaptureCapabilityGate {
        CaptureCapabilityGate(probe: FakeDeviceCapabilityProbe(
            hasLiDAR: lidar,
            supportsObjectCapture: object,
            supportsSceneReconstruction: scene))
    }
}
