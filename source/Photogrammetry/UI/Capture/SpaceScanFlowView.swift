import ARKit
import RealityKit
import SwiftUI

/// Space/room scan screen: live LiDAR mesh via `ARView`, stats overlay, and a
/// finish button that exports mesh + point cloud.
struct SpaceScanFlowView: View {
    let dependencies: AppDependencies

    @State private var scanner = ARSceneScanner()
    @State private var viewModel: SpaceScanViewModel?

    var body: some View {
        Group {
            if let viewModel {
                content(viewModel)
            } else {
                ProgressView().onAppear(perform: begin)
            }
        }
        .navigationBarTitleDisplayMode(.inline)
    }

    @ViewBuilder
    private func content(_ viewModel: SpaceScanViewModel) -> some View {
        switch viewModel.phase {
        case .scanning:
            ZStack(alignment: .bottom) {
                MeshPreviewView(scanner: scanner)
                statsBar(viewModel.scanState)
                Button("Finish Scan", action: viewModel.finish)
                    .buttonStyle(.borderedProminent)
                    .padding(.bottom, 32)
            }
        case .uploading(let fraction):
            VStack(spacing: 16) {
                ProgressView(value: fraction)
                Text("Uploading… \(Int(fraction * 100))%")
                Button("Cancel", action: viewModel.cancel)
            }
            .padding()
        case .uploaded(let scanID):
            ContentUnavailableView(
                "Upload complete", systemImage: "checkmark.icloud",
                description: Text("Scan ID: \(scanID)\nProcessing on the server."))
        case .saved(let mesh, _):
            ModelPreview(url: mesh.url)
        case .failed(let reason):
            ContentUnavailableView(
                "Scan failed", systemImage: "exclamationmark.triangle",
                description: Text(reason))
        }
    }

    private func statsBar(_ state: SpaceScanState) -> some View {
        VStack {
            Text("\(state.meshAnchorCount) mesh chunks · \(state.pointCount) points")
                .font(.caption).foregroundStyle(.white)
                .padding(8)
                .background(.black.opacity(0.4), in: .capsule)
            Spacer()
        }
        .padding(.top, 16)
    }

    private func begin() {
        let model = SpaceScanViewModel(
            scanner: scanner, library: dependencies.library,
            scratchRoot: SpaceScanFlowView.scratchRoot(),
            uploadService: dependencies.uploadService,
            settingsStore: dependencies.settingsStore)
        model.start()
        viewModel = model
    }

    private static func scratchRoot() -> URL {
        FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("SpaceScans", isDirectory: true)
    }
}

/// Live AR mesh visualization. Owns the single `ARSession` (created by `ARView`)
/// and hands it to the scanner so both render and reconstruct from one session —
/// only one AR session may run at a time, and `ARView.session` is read-only.
struct MeshPreviewView: UIViewRepresentable {
    let scanner: ARSceneScanner

    func makeUIView(context: Context) -> ARView {
        let view = ARView(frame: .zero)
        let configuration = ARWorldTrackingConfiguration()
        configuration.sceneReconstruction = .mesh
        configuration.frameSemantics = .sceneDepth
        view.debugOptions.insert(.showSceneUnderstanding)
        scanner.attach(to: view.session)   // delegate must be set before run
        view.session.run(configuration)
        return view
    }

    func updateUIView(_: ARView, context: Context) {}
}
