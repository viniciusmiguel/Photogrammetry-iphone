import SwiftUI

/// Renders the object-capture upload phases. Mirrors `ReconstructionProgressView`
/// but for `UploadViewModel.Phase` (a separate enum, so it's a separate view).
struct UploadProgressView: View {
    let viewModel: UploadViewModel

    var body: some View {
        switch viewModel.phase {
        case .idle:
            ProgressView("Preparing…")
        case .uploading(let fraction):
            VStack(spacing: 16) {
                ProgressView(value: fraction)
                Text("Uploading… \(Int(fraction * 100))%")
                Button("Cancel", action: viewModel.cancel)
            }
            .padding()
        case .submitted(let scanID):
            ContentUnavailableView(
                "Upload complete",
                systemImage: "checkmark.icloud",
                description: Text("Scan ID: \(scanID)\nProcessing on the server."))
        case .failed(let reason):
            ContentUnavailableView(
                "Upload failed",
                systemImage: "exclamationmark.triangle",
                description: Text(reason))
        }
    }
}
