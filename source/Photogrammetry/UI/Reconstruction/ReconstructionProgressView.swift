import QuickLook
import SwiftUI

/// Shows reconstruction progress and, on success, a QuickLook preview of the
/// finished model.
struct ReconstructionProgressView: View {
    let viewModel: ReconstructionViewModel

    var body: some View {
        switch viewModel.phase {
        case .idle:
            ProgressView("Preparing…")
        case .running(let fraction):
            VStack(spacing: 16) {
                ProgressView(value: fraction)
                Text("Reconstructing… \(Int(fraction * 100))%")
                Button("Cancel", action: viewModel.cancel)
            }
            .padding()
        case .finished(let artifact):
            QuickLookPreview(url: artifact.url)
                .ignoresSafeArea()
        case .failed(let reason):
            ContentUnavailableView(
                "Reconstruction failed",
                systemImage: "exclamationmark.triangle",
                description: Text(reason))
        }
    }
}

/// Minimal `QLPreviewController` bridge for USDZ/OBJ preview.
struct QuickLookPreview: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> QLPreviewController {
        let controller = QLPreviewController()
        controller.dataSource = context.coordinator
        return controller
    }

    func updateUIViewController(_: QLPreviewController, context: Context) {}

    func makeCoordinator() -> Coordinator { Coordinator(url: url) }

    final class Coordinator: NSObject, QLPreviewControllerDataSource {
        private let url: URL
        init(url: URL) { self.url = url }

        func numberOfPreviewItems(in _: QLPreviewController) -> Int { 1 }

        func previewController(
            _: QLPreviewController, previewItemAt _: Int
        ) -> QLPreviewItem {
            url as NSURL
        }
    }
}
