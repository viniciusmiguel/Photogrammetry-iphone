import Foundation
import Observation

/// Runs an on-device reconstruction and exposes progress/result to the UI.
/// Adopts the finished model into the library. Driven by the `ModelReconstructing`
/// protocol so tests use a `FakeModelReconstructor`.
@MainActor
@Observable
final class ReconstructionViewModel {
    enum Phase: Equatable {
        case idle
        case running(Double)        // 0...1
        case finished(ScanArtifact)
        case failed(String)
    }

    private(set) var phase: Phase = .idle

    private let reconstructor: ModelReconstructing
    private let library: ScanLibrary
    private var runTask: Task<Void, Never>?

    init(reconstructor: ModelReconstructing, library: ScanLibrary) {
        self.reconstructor = reconstructor
        self.library = library
    }

    /// Reconstructs the images in `imagesFolder` and files the result under
    /// `displayName` in the library.
    func run(
        imagesFolder: URL,
        detail: ReconstructionDetail,
        outputURL: URL,
        displayName: String
    ) {
        phase = .running(0)
        runTask = Task { [weak self] in
            guard let self else { return }
            await self.consume(
                self.reconstructor.reconstruct(
                    imagesAt: imagesFolder, detail: detail,
                    outputURL: outputURL),
                displayName: displayName)
        }
    }

    func cancel() {
        runTask?.cancel()
    }

    private func consume(
        _ events: AsyncStream<ReconstructionEvent>, displayName: String
    ) async {
        for await event in events {
            switch event {
            case .progress(let fraction):
                phase = .running(fraction)
            case .finished(let url):
                phase = adopt(url, displayName: displayName)
            case .processingCancelled:
                phase = .idle
            case .failed(let reason):
                phase = .failed(reason)
            }
        }
    }

    private func adopt(_ url: URL, displayName: String) -> Phase {
        do {
            let artifact = try library.adopt(
                fileAt: url, mode: .object, displayName: displayName)
            return .finished(artifact)
        } catch {
            return .failed(
                "Reconstruction succeeded but saving failed: "
                    + error.localizedDescription)
        }
    }
}
