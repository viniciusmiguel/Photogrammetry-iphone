import Foundation

/// High-level state of a guided object capture, projected from
/// `ObjectCaptureSession.CaptureState` into a project-owned type the UI and
/// tests can use without importing RealityKit.
enum ObjectCaptureStage: Equatable, Sendable {
    case initializing
    case ready                 // point the device at the object
    case detecting             // adjusting the bounding box
    case capturing             // circling the object
    case finishing
    case completed             // images ready for reconstruction
    case failed(String)
}

/// Live, observable scan progress for the capture UI.
struct ObjectScanState: Equatable, Sendable {
    var stage: ObjectCaptureStage
    var coverage: CaptureCoverage
    var capturedImageCount: Int

    static func initial(sectorCount: Int) -> ObjectScanState {
        ObjectScanState(
            stage: .initializing,
            coverage: CaptureCoverage(sectorCount: sectorCount),
            capturedImageCount: 0)
    }
}

/// Drives a guided object capture. Thin interface over `ObjectCaptureSession`
/// so the view model can run against a `FakeObjectScanner` in tests.
///
/// `@MainActor`: the only implementation drives `ObjectCaptureSession`, which is
/// main-actor bound; this also lets the view model call it without hops.
@MainActor
protocol ObjectScanning: AnyObject {
    /// Emits a new `ObjectScanState` whenever capture progresses.
    var states: AsyncStream<ObjectScanState> { get }

    /// Begins capture, writing images into `store.imagesFolder`.
    func start(into store: ObjectCaptureStore) throws

    /// Confirms the detected bounding box and moves to `.capturing`.
    func beginCapturing()

    /// Ends capture; on success the stream reaches `.completed`.
    func finish()

    /// Aborts the current capture and releases the camera.
    func cancel()
}
