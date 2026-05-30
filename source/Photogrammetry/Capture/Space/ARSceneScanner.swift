import ARKit

/// Production `SpaceScanning` backed by ARKit LiDAR scene reconstruction.
///
/// Keeps the latest mesh anchors and fuses depth into a point cloud, then on
/// finish bakes the anchors into a USDZ mesh (`MeshBuilder`) plus a PLY point
/// cloud (`PLYPointCloudExporter`).
///
/// It does **not** create an `ARSession` — only one session may run at a time
/// and the preview `ARView` owns it. The flow view calls `attach(to:)` with that
/// session so this scanner becomes its delegate (verified: `ARView.session` is
/// read-only and cannot be replaced).
///
/// `@MainActor` because `ARSession` callbacks and lifecycle are main-actor bound.
@MainActor
final class ARSceneScanner: NSObject, SpaceScanning, ARSessionDelegate {
    private weak var session: ARSession?
    private var meshAnchors: [UUID: ARMeshAnchor] = [:]
    private var points: [ColoredPoint] = []
    private let pointExporter = PLYPointCloudExporter()

    private var continuation: AsyncStream<SpaceScanState>.Continuation?
    let states: AsyncStream<SpaceScanState>

    override init() {
        var captured: AsyncStream<SpaceScanState>.Continuation!
        self.states = AsyncStream { captured = $0 }
        super.init()
        self.continuation = captured
    }

    /// Binds to the AR view's already-running session. Concrete (not on the
    /// protocol) because it is RealityKit/ARKit-specific.
    func attach(to session: ARSession) {
        self.session = session
        session.delegate = self
    }

    func start() {
        emit(running: true)
    }

    func finish(meshURL: URL, pointCloudURL: URL) throws {
        session?.pause()
        emit(running: false)
        try exportMesh(to: meshURL)
        try pointExporter.write(points, to: pointCloudURL)
    }

    func cancel() {
        session?.pause()
        continuation?.finish()
        continuation = nil
    }

    private func exportMesh(to url: URL) throws {
        let builder = MeshBuilder()
        for anchor in meshAnchors.values { builder.add(anchor) }
        try builder.export(to: url)
    }

    // MARK: ARSessionDelegate

    nonisolated func session(
        _ session: ARSession, didAdd anchors: [ARAnchor]
    ) {
        Task { @MainActor in self.absorb(anchors) }
    }

    nonisolated func session(
        _ session: ARSession, didUpdate anchors: [ARAnchor]
    ) {
        Task { @MainActor in self.absorb(anchors) }
    }

    private func absorb(_ anchors: [ARAnchor]) {
        for case let mesh as ARMeshAnchor in anchors {
            meshAnchors[mesh.identifier] = mesh
        }
        accumulatePoints()
        emit(running: true)
    }

    /// Fuses the current frame's depth into the point cloud (subsampled for cost).
    private func accumulatePoints() {
        guard let frame = session.currentFrame,
              let depth = frame.sceneDepth else { return }
        points.append(
            contentsOf: DepthFrameSampler.sample(frame: frame, depth: depth))
    }

    private func emit(running: Bool) {
        continuation?.yield(
            SpaceScanState(
                meshAnchorCount: meshAnchors.count,
                pointCount: points.count,
                isRunning: running))
    }
}
