import Foundation

/// Composition root: constructs the concrete implementations once and injects
/// them downward (per CLAUDE.md — no global singletons reached into by views).
///
/// Swap any field for a fake in tests or previews by constructing your own
/// `AppDependencies`.
@MainActor
struct AppDependencies {
    let capabilityGate: CaptureCapabilityGate
    let reconstructor: ModelReconstructing
    let meshExporter: MeshExporting
    let library: ScanLibrary

    static func live() -> AppDependencies {
        AppDependencies(
            capabilityGate: CaptureCapabilityGate(
                probe: LiveDeviceCapabilityProbe()),
            reconstructor: PhotogrammetryReconstructor(),
            meshExporter: ModelIOMeshExporter(),
            library: ScanLibrary(root: AppDependencies.documentsRoot()))
    }

    private static func documentsRoot() -> URL {
        FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    }
}
