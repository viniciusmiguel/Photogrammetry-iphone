import Foundation
import simd

/// A single coloured point in a fused cloud.
struct ColoredPoint: Equatable, Sendable {
    let position: SIMD3<Float>
    let color: SIMD3<UInt8>   // r, g, b
}

/// Writes a coloured point cloud to ASCII PLY. Pure (no I/O until `write`), so
/// the exact byte layout is golden-file testable.
///
/// Example:
/// ```
/// let exporter = PLYPointCloudExporter()
/// let text = exporter.makeASCII([ColoredPoint(position: .zero,
///                                             color: .init(255, 0, 0))])
/// try exporter.write(points, to: url)
/// ```
struct PLYPointCloudExporter {
    /// Serializes `points` to a complete ASCII PLY document.
    func makeASCII(_ points: [ColoredPoint]) -> String {
        header(count: points.count) + points.map(line).joined()
    }

    /// Writes the PLY document for `points` to `url` (UTF-8).
    func write(_ points: [ColoredPoint], to url: URL) throws {
        try makeASCII(points).write(to: url, atomically: true, encoding: .utf8)
    }

    private func header(count: Int) -> String {
        precondition(count >= 0, "point count must be >= 0, got \(count)")
        return """
        ply
        format ascii 1.0
        element vertex \(count)
        property float x
        property float y
        property float z
        property uchar red
        property uchar green
        property uchar blue
        end_header

        """
    }

    private func line(_ point: ColoredPoint) -> String {
        let p = point.position
        let c = point.color
        return "\(p.x) \(p.y) \(p.z) \(c.x) \(c.y) \(c.z)\n"
    }
}
