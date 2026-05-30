import SwiftUI

/// Orchestrates the object pipeline: guided capture → on-device reconstruction
/// → result. Owns the concrete `ObjectCaptureScanner` (needed to render
/// `ObjectCaptureView`) and passes it to the view model via the `ObjectScanning`
/// protocol.
struct ObjectCaptureFlowView: View {
    let dependencies: AppDependencies

    @State private var scanner = ObjectCaptureScanner()
    @State private var captureVM: ObjectCaptureViewModel?
    @State private var reconstructionVM: ReconstructionViewModel?
    @State private var store = ObjectCaptureStore(
        root: ObjectCaptureFlowView.captureRoot(), id: UUID())
    @State private var detail: ReconstructionDetail = .medium

    var body: some View {
        Group {
            if let reconstructionVM {
                ReconstructionProgressView(viewModel: reconstructionVM)
            } else if let captureVM {
                ObjectCaptureContainer(
                    session: scanner.session,
                    scanState: captureVM.scanState,
                    onConfirmBox: captureVM.confirmBoundingBox,
                    onFinish: captureVM.finish)
                .onChange(of: captureVM.imagesFolderForReconstruction) {
                    startReconstructionIfReady()
                }
            } else {
                ProgressView().onAppear(perform: beginCapture)
            }
        }
        .navigationBarTitleDisplayMode(.inline)
    }

    private func beginCapture() {
        let viewModel = ObjectCaptureViewModel(scanner: scanner, store: store)
        viewModel.start()
        captureVM = viewModel
    }

    private func startReconstructionIfReady() {
        guard let folder = captureVM?.imagesFolderForReconstruction else {
            return
        }
        let viewModel = ReconstructionViewModel(
            reconstructor: dependencies.reconstructor,
            library: dependencies.library)
        viewModel.run(
            imagesFolder: folder, detail: detail,
            outputURL: store.modelOutputURL,
            displayName: "Object \(Date.now.formatted(date: .abbreviated, time: .shortened))")
        reconstructionVM = viewModel
    }

    /// Per-capture scratch space under Caches (safe to be purged after export).
    private static func captureRoot() -> URL {
        FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("ObjectCaptures", isDirectory: true)
    }
}
