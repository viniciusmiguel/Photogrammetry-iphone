import Foundation

/// Owns the on-disk layout for one object-capture session: where
/// `ObjectCaptureSession` writes images and its checkpoint, and where the
/// reconstructed model lands. Filesystem-only, so it is testable against a
/// temporary directory.
///
/// Layout under `root`:
/// ```
/// <root>/<id>/Images/        ← captured frames (+ depth/gravity)
/// <root>/<id>/Checkpoint/    ← session resume data
/// <root>/<id>/model.usdz     ← reconstruction output
/// ```
struct ObjectCaptureStore {
    let sessionRoot: URL
    let imagesFolder: URL
    let checkpointFolder: URL
    let modelOutputURL: URL

    private let fileManager: FileManager

    /// Derives the standard sub-paths for `id` under `root`. Does not touch disk
    /// until `prepare()` is called.
    init(root: URL, id: UUID, fileManager: FileManager = .default) {
        let session = root.appendingPathComponent(
            id.uuidString, isDirectory: true)
        self.sessionRoot = session
        self.imagesFolder = session.appendingPathComponent(
            "Images", isDirectory: true)
        self.checkpointFolder = session.appendingPathComponent(
            "Checkpoint", isDirectory: true)
        self.modelOutputURL = session.appendingPathComponent("model.usdz")
        self.fileManager = fileManager
    }

    /// Creates the empty images and checkpoint folders, failing loudly if the
    /// directories can't be created.
    func prepare() throws {
        try createDirectory(imagesFolder)
        try createDirectory(checkpointFolder)
    }

    /// Number of captured images currently on disk (drives the photo-count UI).
    func capturedImageCount() throws -> Int {
        guard fileManager.fileExists(atPath: imagesFolder.path) else { return 0 }
        let contents = try fileManager.contentsOfDirectory(
            at: imagesFolder, includingPropertiesForKeys: nil)
        return contents.filter { $0.pathExtension.lowercased() == "heic"
            || $0.pathExtension.lowercased() == "jpg" }.count
    }

    private func createDirectory(_ url: URL) throws {
        try fileManager.createDirectory(
            at: url, withIntermediateDirectories: true)
    }
}
