import ARKit
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
    private(set) var didPause = false
    private(set) var finishedMeshURL: URL?
    var finishError: Error?

    // Raw-data accessors for the upload path; tests can preset these.
    var currentAnchors: [ARMeshAnchor] = []
    var currentKeyframes: [CameraKeyframe] = []
    var currentPoints: [ColoredPoint] = []

    init() {
        var captured: AsyncStream<SpaceScanState>.Continuation!
        states = AsyncStream { captured = $0 }
        continuation = captured
    }

    func start() { didStart = true }

    func finish(meshURL: URL, pointCloudURL: URL, textureURL: URL) throws {
        if let finishError { throw finishError }
        // Simulate writing the mesh and a 1-byte texture so library.adopt succeeds.
        try Data("obj".utf8).write(to: meshURL)
        try Data([0]).write(to: textureURL)
        finishedMeshURL = meshURL
    }

    func pause() { didPause = true }

    func cancel() {}

    func emit(_ state: SpaceScanState) { continuation.yield(state) }
}

/// Replays a fixed `UploadEvent` sequence and records which method was called.
/// `@unchecked Sendable`: the tracking fields are touched only from the test's
/// main thread, so no synchronization is required.
final class FakeScanUploadService: ScanUploadService, @unchecked Sendable {
    var spaceScanEvents: [UploadEvent] = []
    var objectScanEvents: [UploadEvent] = []
    private(set) var didUploadSpaceScan = false
    private(set) var didUploadObjectScan = false
    private(set) var lastServerURL: URL?

    func uploadSpaceScan(
        _ payload: SpaceScanPayload, serverURL: URL
    ) -> AsyncStream<UploadEvent> {
        didUploadSpaceScan = true
        lastServerURL = serverURL
        return Self.stream(spaceScanEvents)
    }

    func uploadObjectScan(
        _ payload: ObjectScanPayload, serverURL: URL
    ) -> AsyncStream<UploadEvent> {
        didUploadObjectScan = true
        lastServerURL = serverURL
        return Self.stream(objectScanEvents)
    }

    private static func stream(_ events: [UploadEvent]) -> AsyncStream<UploadEvent> {
        AsyncStream { continuation in
            for event in events { continuation.yield(event) }
            continuation.finish()
        }
    }
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
