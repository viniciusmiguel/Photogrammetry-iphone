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
    /// artifact descriptor.
    func adopt(
        fileAt source: URL, mode: ScanMode, displayName: String
    ) throws -> ScanArtifact {
        try ensureFolder()
        let id = UUID()
        let format = try modelFormat(for: source)
        let destination = libraryFolder.appendingPathComponent(
            "\(id.uuidString).\(format.fileExtension)")
        try fileManager.moveItem(at: source, to: destination)
        return ScanArtifact(
            id: id, mode: mode, format: format,
            url: destination, createdAt: .now, displayName: displayName)
    }

    /// All model files currently in the library, newest first.
    func storedFileURLs() throws -> [URL] {
        guard fileManager.fileExists(atPath: libraryFolder.path) else {
            return []
        }
        let keys: [URLResourceKey] = [.contentModificationDateKey]
        let contents = try fileManager.contentsOfDirectory(
            at: libraryFolder, includingPropertiesForKeys: keys)
        return try contents.sorted(by: newerFirst)
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
