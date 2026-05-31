import Foundation

/// On-device store of finished scans. Source of truth is the filesystem under
/// `root/Library`; this type lists/persists `ScanArtifact`s and is testable
/// against a temporary directory.
@MainActor
final class ScanLibrary {
    private let libraryFolder: URL
    private let fileManager: FileManager

    init(root: URL, fileManager: FileManager = .default) {
        self.libraryFolder = root.appendingPathComponent(
            "Library", isDirectory: true)
        self.fileManager = fileManager
    }

    /// Moves a freshly reconstructed file into the library and returns its
    /// artifact descriptor. Optional `companions` (e.g. MTL, PNG) are moved
    /// into the same library folder preserving their filenames.
    func adopt(
        fileAt source: URL,
        companions: [URL] = [],
        mode: ScanMode,
        displayName: String
    ) throws -> ScanArtifact {
        try ensureFolder()
        let format = try modelFormat(for: source)
        // Preserve the source filename (already UUID-prefixed) so companion
        // files can be resolved by their matching stem.
        let destination = libraryFolder.appendingPathComponent(source.lastPathComponent)
        try fileManager.moveItem(at: source, to: destination)
        for companion in companions {
            let dest = libraryFolder.appendingPathComponent(companion.lastPathComponent)
            try? fileManager.moveItem(at: companion, to: dest)
        }
        return ScanArtifact(
            id: UUID(), mode: mode, format: format,
            url: destination, createdAt: .now, displayName: displayName)
    }

    /// All primary model files (OBJ/USDZ/PLY) currently in the library,
    /// newest first. Companion files (MTL, PNG) are excluded.
    func storedFileURLs() throws -> [URL] {
        guard fileManager.fileExists(atPath: libraryFolder.path) else { return [] }
        let modelExts = Set(ModelFormat.allCases.map { $0.fileExtension })
        let keys: [URLResourceKey] = [.contentModificationDateKey]
        let contents = try fileManager.contentsOfDirectory(
            at: libraryFolder, includingPropertiesForKeys: keys)
        let models = contents.filter { modelExts.contains($0.pathExtension.lowercased()) }
        return try models.sorted(by: newerFirst)
    }

    private func newerFirst(_ lhs: URL, _ rhs: URL) throws -> Bool {
        try modified(lhs) > modified(rhs)
    }

    private func modified(_ url: URL) throws -> Date {
        try url.resourceValues(forKeys: [.contentModificationDateKey])
            .contentModificationDate ?? .distantPast
    }

    private func modelFormat(for url: URL) throws -> ModelFormat {
        guard let format = ModelFormat(
            rawValue: url.pathExtension.lowercased()) else {
            throw LibraryError.unknownFormat(extension: url.pathExtension)
        }
        return format
    }

    private func ensureFolder() throws {
        try fileManager.createDirectory(
            at: libraryFolder, withIntermediateDirectories: true)
    }
}

enum LibraryError: Error, Equatable {
    case unknownFormat(extension: String)
}
