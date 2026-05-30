import Foundation
import Observation
import RealityKit

/// Production `ObjectScanning` backed by `RealityKit.ObjectCaptureSession`.
///
/// Bridges the session's `@Observable` state into an `AsyncStream` using
/// `withObservationTracking`, and auto-advances `ready → detecting` so the
/// caller only has to confirm the bounding box (`beginCapturing`).
///
/// `@MainActor` because `ObjectCaptureSession` must be driven from the main
/// actor; the underlying session is also handed to `ObjectCaptureView`.
@MainActor
final class ObjectCaptureScanner: ObjectScanning {
    /// Sectors the coverage ring is divided into; one is filled per shot as the
    /// user circles the object.
    private let sectorCount = 24
    private let targetShotsPerPass = 24

    let session = ObjectCaptureSession()

    private var continuation: AsyncStream<ObjectScanState>.Continuation?
    private var coverage: CaptureCoverage

    let states: AsyncStream<ObjectScanState>

    init() {
        self.coverage = CaptureCoverage(sectorCount: sectorCount)
        var captured: AsyncStream<ObjectScanState>.Continuation!
        self.states = AsyncStream { captured = $0 }
        self.continuation = captured
    }

    func start(into store: ObjectCaptureStore) throws {
        try store.prepare()
        var configuration = ObjectCaptureSession.Configuration()
        configuration.checkpointDirectory = store.checkpointFolder
        session.start(
            imagesDirectory: store.imagesFolder,
            configuration: configuration)
        observe()
    }

    func beginCapturing() {
        session.startCapturing()
    }

    func finish() {
        session.finish()
    }

    func cancel() {
        session.cancel()
        continuation?.finish()
        continuation = nil
    }

    /// Re-registers observation after every change so the stream stays live for
    /// the whole capture (Observation fires `onChange` once per registration).
    private func observe() {
        withObservationTracking {
            _ = session.state
            _ = session.numberOfShotsTaken
        } onChange: { [weak self] in
            Task { @MainActor in
                self?.emit()
                self?.observe()
            }
        }
        emit()
    }

    private func emit() {
        autoAdvanceFromReady()
        updateCoverage(forShots: session.numberOfShotsTaken)
        let state = ObjectScanState(
            stage: stage(from: session.state),
            coverage: coverage,
            capturedImageCount: session.numberOfShotsTaken)
        continuation?.yield(state)
        if case .completed = session.state { continuation?.finish() }
    }

    /// Apple gates capture behind a detecting step; we drive it automatically so
    /// the user experience is "aim, confirm box, circle".
    private func autoAdvanceFromReady() {
        if case .ready = session.state { _ = session.startDetecting() }
    }

    private func updateCoverage(forShots shots: Int) {
        guard shots > 0 else { return }
        let twoPi = 2.0 * Double.pi
        let yaw = Double(shots % targetShotsPerPass)
            / Double(targetShotsPerPass) * twoPi
        coverage.record(yawRadians: yaw)
    }

    private func stage(
        from state: ObjectCaptureSession.CaptureState
    ) -> ObjectCaptureStage {
        switch state {
        case .initializing: return .initializing
        case .ready: return .ready
        case .detecting: return .detecting
        case .capturing: return .capturing
        case .finishing: return .finishing
        case .completed: return .completed
        case .failed(let error): return .failed(error.localizedDescription)
        @unknown default: return .failed("Unknown capture state")
        }
    }
}
