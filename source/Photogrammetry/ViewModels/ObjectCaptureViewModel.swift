import Foundation
import Observation

/// Drives the object-capture screen: starts the scanner, mirrors its state for
/// the UI, and signals when captured images are ready for reconstruction.
///
/// Depends only on the `ObjectScanning` protocol, so unit tests inject a
/// `FakeObjectScanner` and assert state transitions without any camera.
@MainActor
@Observable
final class ObjectCaptureViewModel {
    private(set) var scanState: ObjectScanState
    private(set) var imagesFolderForReconstruction: URL?

    private let scanner: ObjectScanning
    private let store: ObjectCaptureStore
    private var listenTask: Task<Void, Never>?

    init(scanner: ObjectScanning, store: ObjectCaptureStore) {
        self.scanner = scanner
        self.store = store
        self.scanState = .initial(sectorCount: 24)
    }

    func start() {
        do {
            try scanner.start(into: store)
            listen()
        } catch {
            scanState.stage = .failed(
                "Could not start capture: \(error.localizedDescription)")
        }
    }

    func confirmBoundingBox() {
        scanner.beginCapturing()
    }

    func finish() {
        scanner.finish()
    }

    func cancel() {
        scanner.cancel()
        listenTask?.cancel()
    }

    private func listen() {
        listenTask = Task { [weak self] in
            guard let self else { return }
            for await state in scanner.states {
                self.scanState = state
                if case .completed = state.stage {
                    self.imagesFolderForReconstruction = store.imagesFolder
                }
            }
        }
    }
}
