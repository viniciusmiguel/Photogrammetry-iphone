import SwiftUI

/// Top-level navigation: pick a capture mode (gated by device capability) or
/// browse the library.
struct RootView: View {
    let dependencies: AppDependencies

    var body: some View {
        TabView {
            CaptureHomeView(dependencies: dependencies)
                .tabItem { Label("Capture", systemImage: "camera.viewfinder") }

            ScanLibraryView(library: dependencies.library)
                .tabItem { Label("Library", systemImage: "square.stack.3d.up") }
        }
    }
}

/// Lets the user choose a `ScanMode`; blocks unsupported devices with the exact
/// reason from `CaptureCapabilityGate`.
struct CaptureHomeView: View {
    let dependencies: AppDependencies

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                ForEach(ScanMode.allCases) { mode in
                    modeButton(mode)
                }
            }
            .padding()
            .navigationTitle("New Scan")
        }
    }

    @ViewBuilder
    private func modeButton(_ mode: ScanMode) -> some View {
        switch dependencies.capabilityGate.support(for: mode) {
        case .supported:
            NavigationLink(mode.title) {
                destination(for: mode)
            }
            .buttonStyle(.borderedProminent)
        case .unsupported(let reason):
            VStack(spacing: 4) {
                Text(mode.title).font(.headline)
                Text(reason.message)
                    .font(.footnote).foregroundStyle(.secondary)
            }
        }
    }

    @ViewBuilder
    private func destination(for mode: ScanMode) -> some View {
        switch mode {
        case .object:
            ObjectCaptureFlowView(dependencies: dependencies)
        case .space:
            SpaceScanFlowView(dependencies: dependencies)
        }
    }
}
