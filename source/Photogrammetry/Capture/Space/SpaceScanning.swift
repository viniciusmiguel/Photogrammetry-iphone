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

    /// Stops scanning and writes the reconstructed mesh (USDZ) and fused point
    /// cloud (PLY) to `meshURL` / `pointCloudURL`.
    func finish(meshURL: URL, pointCloudURL: URL) throws

    func cancel()
}
