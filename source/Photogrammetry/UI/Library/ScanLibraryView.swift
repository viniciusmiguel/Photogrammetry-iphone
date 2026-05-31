import SwiftUI

/// Lists saved scans and previews/shares them. Reads file URLs from
/// `ScanLibrary` (filesystem is the source of truth).
struct ScanLibraryView: View {
    let library: ScanLibrary

    @State private var fileURLs: [URL] = []
    @State private var loadError: String?

    var body: some View {
        NavigationStack {
            content
                .navigationTitle("Library")
                .onAppear(perform: reload)
        }
    }

    @ViewBuilder
    private var content: some View {
        if let loadError {
            ContentUnavailableView(
                "Couldn’t load library",
                systemImage: "xmark.icloud", description: Text(loadError))
        } else if fileURLs.isEmpty {
            ContentUnavailableView(
                "No scans yet", systemImage: "cube.transparent",
                description: Text("Captured models will appear here."))
        } else {
            List(fileURLs, id: \.self) { url in
                NavigationLink(url.lastPathComponent) {
                    ModelPreview(url: url)
                }
            }
        }
    }

    private func reload() {
        do {
            fileURLs = try library.storedFileURLs()
        } catch {
            loadError = error.localizedDescription
        }
    }
}
