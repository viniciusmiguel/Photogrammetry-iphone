import ARKit
import RealityKit

/// Production `DeviceCapabilityProbe` backed by the real Apple frameworks.
///
/// LiDAR presence is inferred from ARKit's depth/scene-reconstruction support:
/// both `sceneDepth` and `.mesh` reconstruction are only available on LiDAR
/// devices, so they double as the LiDAR check (Apple exposes no direct flag).
struct LiveDeviceCapabilityProbe: DeviceCapabilityProbe {
    var hasLiDAR: Bool {
        ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth)
    }

    var supportsObjectCapture: Bool {
        ObjectCaptureSession.isSupported
    }

    var supportsSceneReconstruction: Bool {
        ARWorldTrackingConfiguration.supportsSceneReconstruction(.mesh)
    }
}
