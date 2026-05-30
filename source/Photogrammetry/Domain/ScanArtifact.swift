import Foundation

/// A file format a scan can be exported to.
enum ModelFormat: String, CaseIterable, Sendable {
    case usdz
    case obj
    case ply

    /// Lowercase filename extension (no dot).
    var fileExtension: String { rawValue }
}

/// A reconstructed result produced by either pipeline and persisted in the
/// library. Immutable value type — the file at `url` is the source of truth.
///
/// Example:
/// ```
/// let artifact = ScanArtifact(
///     id: UUID(), mode: .object, format: .usdz,
///     url: modelURL, createdAt: .now, displayName: "Sneaker")
/// ```
struct ScanArtifact: Identifiable, Hashable, Sendable {
    let id: UUID
    let mode: ScanMode
    let format: ModelFormat
    let url: URL
    let createdAt: Date
    let displayName: String
}
