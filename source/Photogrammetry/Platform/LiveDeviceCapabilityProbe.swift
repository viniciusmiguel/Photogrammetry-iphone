import ARKit
import RealityKit
// ObjectCaptureSession lives in the _RealityKit_SwiftUI cross-import overlay,
// loaded only when both RealityKit and SwiftUI are imported (iOS 26.2 SDK).
import SwiftUI

/// Production `DeviceCapabilityProbe` backed by the real Apple frameworks.
///
/// LiDAR presence is inferred from ARKit's depth/scene-reconstruction support:
/// both `sceneDepth` and `.mesh` reconstruction are only available on LiDAR
/// devices, so they double as the LiDAR check (Apple exposes no direct flag).
struct LiveDeviceCapabilityProbe: DeviceCapabilityProbe {
    var hasLiDAR: Bool {
        ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth)
    }

    // Snapshotted at @MainActor init time (AppDependencies.live() is @MainActor),
    // stored as a plain let so it can be read from any isolation domain. This
    // avoids calling the @MainActor-isolated isSupported getter at each call site
    // (iOS 26 SDK moved ObjectCaptureSession into _RealityKit_SwiftUI, which
    // annotates isSupported as @MainActor).
    let supportsObjectCapture: Bool

    @MainActor
    init() {
        #if !targetEnvironment(simulator)
        supportsObjectCapture = ObjectCaptureSession.isSupported
        #else
        supportsObjectCapture = false
        #endif
    }

    var supportsSceneReconstruction: Bool {
        ARWorldTrackingConfiguration.supportsSceneReconstruction(.mesh)
    }
}
