import ARKit
import Foundation

/// Live stats for the space-scan UI as the LiDAR mesh grows.
struct SpaceScanState: Equatable, Sendable {
    var meshAnchorCount: Int
    var pointCount: Int
    var isRunning: Bool

    static let initial = SpaceScanState(
        meshAnchorCount: 0, pointCount: 0, isRunning: false)
}

/// Drives an ARKit LiDAR room/scene scan. Thin interface so the view model is
/// testable with a `FakeSpaceScanner`.
///
/// Only one `ARSession` may run at a time and AR views create their own, so the
/// live implementation attaches to the preview view's session (a concrete
/// `ARSceneScanner` detail) rather than owning one. The protocol stays
/// framework-free; `start()` begins emitting state once attached.
///
/// `@MainActor`: ARKit session lifecycle/callbacks are main-actor bound.
@MainActor
protocol SpaceScanning: AnyObject {
    var states: AsyncStream<SpaceScanState> { get }

    /// Starts scene reconstruction (`.mesh`) + scene depth.
    func start()

    /// Stops scanning, bakes a UV texture from accumulated camera keyframes,
    /// and writes the mesh (OBJ), point cloud (PLY), and texture (PNG).
    /// Used by the offline (on-device) path.
    func finish(meshURL: URL, pointCloudURL: URL, textureURL: URL) throws

    func cancel()

    // MARK: - Raw data access (server upload path)

    /// Latest mesh anchors collected so far. Read at finish time to serialize
    /// the raw scan for the server (ADR-0009).
    var currentAnchors: [ARMeshAnchor] { get }
    /// Camera keyframes retained for server-side texture baking.
    var currentKeyframes: [CameraKeyframe] { get }
    /// Accumulated depth point cloud.
    var currentPoints: [ColoredPoint] { get }

    /// Stops the AR session and accumulation without running the on-device
    /// export. Used before serializing the raw data for upload.
    func pause()
}
