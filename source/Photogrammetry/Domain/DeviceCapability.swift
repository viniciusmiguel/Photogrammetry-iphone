import Foundation

/// Why a device cannot run a capture pipeline, with enough detail to show the
/// user (and to assert in tests) exactly what was missing.
enum CaptureUnsupportedReason: Equatable, Sendable {
    case missingLiDAR
    case objectCaptureUnavailable
    case sceneReconstructionUnavailable

    var message: String {
        switch self {
        case .missingLiDAR:
            return "This device has no LiDAR scanner. A LiDAR-equipped "
                + "iPhone Pro (iPhone 12 Pro or later) is required."
        case .objectCaptureUnavailable:
            return "Object Capture is unavailable on this device."
        case .sceneReconstructionUnavailable:
            return "Scene reconstruction is unavailable on this device."
        }
    }
}

/// The hardware/OS facts each pipeline needs, abstracted behind a protocol so
/// the gating logic is testable with a fake probe (no real ARKit/RealityKit).
protocol DeviceCapabilityProbe: Sendable {
    var hasLiDAR: Bool { get }
    var supportsObjectCapture: Bool { get }
    var supportsSceneReconstruction: Bool { get }
}

/// Decides, per `ScanMode`, whether the current device can run that pipeline.
///
/// Example:
/// ```
/// let gate = CaptureCapabilityGate(probe: LiveDeviceCapabilityProbe())
/// switch gate.support(for: .object) {
/// case .supported:            startCapture()
/// case .unsupported(let why): showAlert(why.message)
/// }
/// ```
struct CaptureCapabilityGate: Sendable {
    enum Support: Equatable, Sendable {
        case supported
        case unsupported(CaptureUnsupportedReason)
    }

    private let probe: DeviceCapabilityProbe

    init(probe: DeviceCapabilityProbe) {
        self.probe = probe
    }

    func support(for mode: ScanMode) -> Support {
        guard probe.hasLiDAR else { return .unsupported(.missingLiDAR) }
        switch mode {
        case .object:
            return probe.supportsObjectCapture
                ? .supported : .unsupported(.objectCaptureUnavailable)
        case .space:
            return probe.supportsSceneReconstruction
                ? .supported : .unsupported(.sceneReconstructionUnavailable)
        }
    }
}
