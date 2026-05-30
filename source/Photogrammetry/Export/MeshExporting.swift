import Foundation

/// Converts an existing model file to another mesh format. Thin interface over
/// Model I/O so callers/tests stay framework-free.
///
/// Implementations support same-format passthrough (e.g. USDZ→USDZ is a copy).
protocol MeshExporting: Sendable {
    /// Reads the model at `sourceURL` and writes it to `destinationURL` in
    /// `format`. Throws `MeshExportError` on unsupported conversions.
    func export(
        from sourceURL: URL,
        to destinationURL: URL,
        as format: ModelFormat
    ) throws
}

enum MeshExportError: Error, Equatable {
    case unsupportedConversion(from: String, to: ModelFormat)
    case readFailed(path: String)
}
