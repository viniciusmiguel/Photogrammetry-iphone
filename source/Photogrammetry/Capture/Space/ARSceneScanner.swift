import ARKit

/// Production `SpaceScanning` backed by ARKit LiDAR scene reconstruction.
///
/// Keeps the latest mesh anchors and, during scanning, collects camera
/// keyframes for texture baking. On finish it exports an OBJ mesh with baked
/// UV texture (PNG) and a PLY point cloud.
///
/// Does **not** create an `ARSession` — only one session may run at a time and
/// the preview `ARView` owns it. The flow view calls `attach(to:)` with that
/// session so this scanner becomes its delegate.
///
/// `@MainActor` because `ARSession` callbacks and lifecycle are main-actor bound.
@MainActor
final class ARSceneScanner: NSObject, SpaceScanning, ARSessionDelegate {
    private weak var session: ARSession?
    private var meshAnchors: [UUID: ARMeshAnchor] = [:]
    private var points: [ColoredPoint] = []
    private var keyframes: [CameraKeyframe] = []
    private var lastKeyframeTransform: simd_float4x4? = nil

    private let pointExporter = PLYPointCloudExporter()
    private var continuation: AsyncStream<SpaceScanState>.Continuation?
    let states: AsyncStream<SpaceScanState>

    override init() {
        var captured: AsyncStream<SpaceScanState>.Continuation!
        self.states = AsyncStream { captured = $0 }
        super.init()
        self.continuation = captured
    }

    /// Binds to the AR view's already-running session.
    func attach(to session: ARSession) {
        DiagnosticLog.info("attach(to:) — setting delegate")
        self.session = session
        session.delegate = self
    }

    func start() {
        DiagnosticLog.info("start() — emitting initial running state")
        emit(running: true)
    }

    func finish(meshURL: URL, pointCloudURL: URL, textureURL: URL) throws {
        DiagnosticLog.info(
            "finish() — anchors=\(meshAnchors.count) points=\(points.count) keyframes=\(keyframes.count)")
        session?.pause()
        emit(running: false)
        do {
            try exportMesh(to: meshURL, textureURL: textureURL)
            DiagnosticLog.info("finish() — mesh exported")
        } catch {
            DiagnosticLog.error("finish() — mesh export failed: \(error)")
            throw error
        }
        do {
            try pointExporter.write(points, to: pointCloudURL)
            DiagnosticLog.info("finish() — PLY exported (\(points.count) points)")
        } catch {
            DiagnosticLog.error("finish() — PLY export failed: \(error)")
            throw error
        }
    }

    func cancel() {
        DiagnosticLog.info("cancel()")
        session?.pause()
        continuation?.finish()
        continuation = nil
    }

    // MARK: - Raw data access (server upload path)

    var currentAnchors: [ARMeshAnchor] { Array(meshAnchors.values) }
    var currentKeyframes: [CameraKeyframe] { keyframes }
    var currentPoints: [ColoredPoint] { points }

    /// Stops the session without exporting; the caller serializes the raw data.
    func pause() {
        DiagnosticLog.info(
            "pause() — anchors=\(meshAnchors.count) points=\(points.count) keyframes=\(keyframes.count)")
        session?.pause()
        emit(running: false)
    }

    // MARK: - ARSessionDelegate

    nonisolated func session(_ session: ARSession, didAdd anchors: [ARAnchor]) {
        DiagnosticLog.debug("didAdd — mesh=\(anchors.filter { $0 is ARMeshAnchor }.count)")
        Task { @MainActor in self.absorb(anchors) }
    }

    nonisolated func session(_ session: ARSession, didUpdate anchors: [ARAnchor]) {
        DiagnosticLog.debug("didUpdate — mesh=\(anchors.filter { $0 is ARMeshAnchor }.count)")
        Task { @MainActor in self.absorb(anchors) }
    }

    nonisolated func session(_ session: ARSession, didFailWithError error: Error) {
        DiagnosticLog.error("ARSession didFailWithError: \(error)")
    }

    nonisolated func sessionWasInterrupted(_ session: ARSession) {
        DiagnosticLog.warn("ARSession was interrupted")
    }

    nonisolated func sessionInterruptionEnded(_ session: ARSession) {
        DiagnosticLog.info("ARSession interruption ended")
    }

    nonisolated func session(
        _ session: ARSession, cameraDidChangeTrackingState camera: ARCamera
    ) {
        DiagnosticLog.info("tracking state: \(String(describing: camera.trackingState))")
    }

    // MARK: - Private

    private func absorb(_ anchors: [ARAnchor]) {
        let before = meshAnchors.count
        for case let mesh as ARMeshAnchor in anchors {
            meshAnchors[mesh.identifier] = mesh
        }
        DiagnosticLog.debug("absorb — meshAnchors \(before)→\(meshAnchors.count)")
        accumulatePoints()
        emit(running: true)
    }

    private func accumulatePoints() {
        guard let frame = session?.currentFrame else {
            DiagnosticLog.debug("accumulatePoints — no current frame")
            return
        }
        guard let depth = frame.sceneDepth else {
            DiagnosticLog.debug("accumulatePoints — no sceneDepth")
            return
        }
        let sampled = DepthFrameSampler.sample(frame: frame, depth: depth)
        points.append(contentsOf: sampled)
        maybeStoreKeyframe(frame)
    }

    /// Stores a keyframe when the camera has moved enough since the last one.
    private func maybeStoreKeyframe(_ frame: ARFrame) {
        guard keyframes.count < 50 else { return }
        let t = frame.camera.transform
        if let last = lastKeyframeTransform {
            let translation = simd_length(SIMD3(
                t.columns.3.x - last.columns.3.x,
                t.columns.3.y - last.columns.3.y,
                t.columns.3.z - last.columns.3.z))
            let relR = t.upperLeft3x3 * last.upperLeft3x3.transpose
            let cosAngle = (relR[0][0] + relR[1][1] + relR[2][2] - 1) / 2
            let angleDeg = acos(max(-1, min(1, cosAngle))) * 180 / .pi
            guard translation > 0.3 || angleDeg > 15 else { return }
        }
        lastKeyframeTransform = t
        let kf = CameraKeyframe(
            image: frame.capturedImage,
            transform: t,
            intrinsics: frame.camera.intrinsics,
            imageResolution: frame.camera.imageResolution)
        keyframes.append(kf)
        DiagnosticLog.debug("keyframe stored — total=\(keyframes.count)")
    }

    private func exportMesh(to url: URL, textureURL: URL) throws {
        let builder = MeshBuilder()
        for anchor in meshAnchors.values { builder.add(anchor) }
        DiagnosticLog.debug(
            "exportMesh — faces=\(builder.faceCount) keyframes=\(keyframes.count)")

        let layout = UVAtlasPacker.pack(faceCount: builder.faceCount)
        let rgba = TextureBaker.bake(
            worldFaceVertices: builder.worldFaceVertices,
            layout: layout,
            keyframes: keyframes)

        guard let pngData = TextureBaker.pngData(rgba: rgba, size: layout.atlasSize) else {
            DiagnosticLog.warn("exportMesh — PNG conversion failed, skipping texture")
            try builder.export(to: url, layout: layout, textureURL: textureURL)
            return
        }
        try pngData.write(to: textureURL)
        try builder.export(to: url, layout: layout, textureURL: textureURL)
        patchMTLTextureReference(meshURL: url, textureFilename: textureURL.lastPathComponent)
    }

    /// Ensures the MTL file written by MDL uses a relative texture path so the
    /// file remains loadable after it is moved to the library directory.
    private func patchMTLTextureReference(meshURL: URL, textureFilename: String) {
        let mtlURL = meshURL.deletingPathExtension().appendingPathExtension("mtl")
        guard var mtl = try? String(contentsOf: mtlURL, encoding: .utf8) else { return }
        var lines = mtl.components(separatedBy: "\n")
        var found = false
        for i in lines.indices {
            if lines[i].lowercased().hasPrefix("map_kd") {
                lines[i] = "map_Kd \(textureFilename)"
                found = true
            }
        }
        if !found { lines.append("map_Kd \(textureFilename)") }
        mtl = lines.joined(separator: "\n")
        try? mtl.write(to: mtlURL, atomically: true, encoding: .utf8)
    }

    private func emit(running: Bool) {
        continuation?.yield(SpaceScanState(
            meshAnchorCount: meshAnchors.count,
            pointCount: points.count,
            isRunning: running))
    }
}

private extension simd_float4x4 {
    var upperLeft3x3: simd_float3x3 {
        simd_float3x3(columns: (
            SIMD3(columns.0.x, columns.0.y, columns.0.z),
            SIMD3(columns.1.x, columns.1.y, columns.1.z),
            SIMD3(columns.2.x, columns.2.y, columns.2.z)))
    }
}
