import Foundation
import RealityKit

/// Production reconstructor backed by `RealityKit.PhotogrammetrySession`.
///
/// Runs entirely on-device. The session ingests the captured images (Object
/// Capture writes depth + gravity alongside each image, which the session picks
/// up automatically) and emits a single USDZ at the requested detail.
struct PhotogrammetryReconstructor: ModelReconstructing {
    func reconstruct(
        imagesAt imagesFolder: URL,
        detail: ReconstructionDetail,
        outputURL: URL
    ) -> AsyncStream<ReconstructionEvent> {
        AsyncStream { continuation in
            let task = Task {
                await run(imagesFolder, detail, outputURL, continuation)
            }
            continuation.onTermination = { _ in task.cancel() }
        }
    }

    private func run(
        _ imagesFolder: URL,
        _ detail: ReconstructionDetail,
        _ outputURL: URL,
        _ continuation: AsyncStream<ReconstructionEvent>.Continuation
    ) async {
        do {
            let session = try PhotogrammetrySession(input: imagesFolder)
            let request = PhotogrammetrySession.Request.modelFile(
                url: outputURL, detail: detail.sessionDetail)
            try session.process(requests: [request])
            await forward(session.outputs, outputURL, continuation)
        } catch {
            continuation.yield(.failed(describe(error, imagesFolder)))
            continuation.finish()
        }
    }

    /// Bridges the session's async output sequence to our event stream.
    private func forward(
        _ outputs: PhotogrammetrySession.Outputs,
        _ outputURL: URL,
        _ continuation: AsyncStream<ReconstructionEvent>.Continuation
    ) async {
        do {
            for try await output in outputs {
                switch output {
                case .requestProgress(_, let fraction):
                    continuation.yield(.progress(fraction))
                case .requestComplete:
                    continuation.yield(.finished(outputURL))
                case .processingCancelled:
                    continuation.yield(.processingCancelled)
                case .requestError(_, let error):
                    continuation.yield(.failed(error.localizedDescription))
                default:
                    break
                }
            }
        } catch {
            continuation.yield(.failed(error.localizedDescription))
        }
        continuation.finish()
    }

    private func describe(_ error: Error, _ folder: URL) -> String {
        "PhotogrammetrySession failed for input \(folder.path): "
            + error.localizedDescription
    }
}

private extension ReconstructionDetail {
    var sessionDetail: PhotogrammetrySession.Request.Detail {
        switch self {
        case .reduced: return .reduced
        // iOS only ships .preview and .reduced; cap higher-quality requests at .reduced.
        case .medium, .full, .raw: return .reduced
        }
    }
}
