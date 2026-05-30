import Foundation
@testable import Photogrammetry

/// Named fakes for the capture/reconstruction protocols (per CLAUDE.md — no
/// inline stubs). Each records calls and lets tests drive output deterministically.

struct FakeDeviceCapabilityProbe: DeviceCapabilityProbe {
    var hasLiDAR: Bool
    var supportsObjectCapture: Bool
    var supportsSceneReconstruction: Bool
}

@MainActor
final class FakeObjectScanner: ObjectScanning {
    let states: AsyncStream<ObjectScanState>
    private let continuation: AsyncStream<ObjectScanState>.Continuation

    private(set) var didStart = false
    private(set) var didBeginCapturing = false
    private(set) var didFinish = false
    private(set) var didCancel = false

    init() {
        var captured: AsyncStream<ObjectScanState>.Continuation!
        states = AsyncStream { captured = $0 }
        continuation = captured
    }

    func start(into store: ObjectCaptureStore) throws { didStart = true }
    func beginCapturing() { didBeginCapturing = true }
    func finish() { didFinish = true }
    func cancel() { didCancel = true }

    /// Test hook: push a new state to subscribers.
    func emit(_ state: ObjectScanState) { continuation.yield(state) }
}

@MainActor
final class FakeSpaceScanner: SpaceScanning {
    let states: AsyncStream<SpaceScanState>
    private let continuation: AsyncStream<SpaceScanState>.Continuation

    private(set) var didStart = false
    private(set) var finishedMeshURL: URL?
    var finishError: Error?

    init() {
        var captured: AsyncStream<SpaceScanState>.Continuation!
        states = AsyncStream { captured = $0 }
        continuation = captured
    }

    func start() { didStart = true }

    func finish(meshURL: URL, pointCloudURL: URL) throws {
        if let finishError { throw finishError }
        // Simulate writing the mesh so the library can adopt it.
        try Data("usdz".utf8).write(to: meshURL)
        finishedMeshURL = meshURL
    }

    func cancel() {}

    func emit(_ state: SpaceScanState) { continuation.yield(state) }
}

/// Replays a fixed event sequence, recording the inputs it was asked to process.
struct FakeModelReconstructor: ModelReconstructing {
    let events: [ReconstructionEvent]

    func reconstruct(
        imagesAt imagesFolder: URL,
        detail: ReconstructionDetail,
        outputURL: URL
    ) -> AsyncStream<ReconstructionEvent> {
        AsyncStream { continuation in
            for event in events { continuation.yield(event) }
            continuation.finish()
        }
    }
}
