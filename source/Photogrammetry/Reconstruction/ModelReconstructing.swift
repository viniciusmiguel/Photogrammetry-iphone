import Foundation

/// Reconstructs a 3D model from a folder of captured images (+ depth/gravity).
///
/// Thin interface over `PhotogrammetrySession` so view models can be driven by a
/// `FakeModelReconstructor` in unit tests. Implementations stream
/// `ReconstructionEvent`s and must honor task cancellation.
///
/// Example:
/// ```
/// for await event in reconstructor.reconstruct(
///         imagesAt: folder, detail: .medium, outputURL: dest) {
///     if case .finished(let url) = event { present(url) }
/// }
/// ```
protocol ModelReconstructing: Sendable {
    func reconstruct(
        imagesAt imagesFolder: URL,
        detail: ReconstructionDetail,
        outputURL: URL
    ) -> AsyncStream<ReconstructionEvent>
}
