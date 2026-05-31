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
    @State private var uploadVM: UploadViewModel?
    @State private var store = ObjectCaptureStore(
        root: ObjectCaptureFlowView.captureRoot(), id: UUID())
    @State private var detail: ReconstructionDetail = .medium

    var body: some View {
        Group {
            if let uploadVM {
                UploadProgressView(viewModel: uploadVM)
            } else if let reconstructionVM {
                ReconstructionProgressView(viewModel: reconstructionVM)
            } else if let captureVM {
                captureContent(viewModel: captureVM)
            } else {
                ProgressView().onAppear(perform: beginCapture)
            }
        }
        .navigationBarTitleDisplayMode(.inline)
    }

    /// Wraps `ObjectCaptureContainer` behind a `#if` so this view compiles in
    /// the simulator even though `ObjectCaptureSession` is unavailable there.
    @ViewBuilder
    private func captureContent(viewModel: ObjectCaptureViewModel) -> some View {
        #if !targetEnvironment(simulator)
        ObjectCaptureContainer(
            session: scanner.session,
            scanState: viewModel.scanState,
            onConfirmBox: viewModel.confirmBoundingBox,
            onFinish: viewModel.finish)
        .onChange(of: viewModel.imagesFolderForReconstruction) {
            startReconstructionIfReady()
        }
        #else
        ContentUnavailableView(
            "Simulator Unsupported",
            systemImage: "camera.slash",
            description: Text(
                "Object Capture requires a physical iPhone with a LiDAR camera."))
        #endif
    }

    private func beginCapture() {
        let viewModel = ObjectCaptureViewModel(scanner: scanner, store: store)
        viewModel.start()
        captureVM = viewModel
    }

    /// Routes to the server upload or the on-device reconstruction based on the
    /// server configuration (ADR-0009).
    private func startReconstructionIfReady() {
        guard let folder = captureVM?.imagesFolderForReconstruction else {
            return
        }
        if let serverURL = dependencies.settingsStore.settings.baseURL {
            let viewModel = UploadViewModel(uploadService: dependencies.uploadService)
            viewModel.run(imagesFolder: folder, serverURL: serverURL)
            uploadVM = viewModel
        } else {
            let viewModel = ReconstructionViewModel(
                reconstructor: dependencies.reconstructor,
                library: dependencies.library)
            viewModel.run(
                imagesFolder: folder, detail: detail,
                outputURL: store.modelOutputURL,
                displayName: "Object \(Date.now.formatted(date: .abbreviated, time: .shortened))")
            reconstructionVM = viewModel
        }
    }

    /// Per-capture scratch space under Caches (safe to be purged after export).
    private static func captureRoot() -> URL {
        FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("ObjectCaptures", isDirectory: true)
    }
}
