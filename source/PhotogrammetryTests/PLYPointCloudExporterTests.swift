import XCTest
import simd
@testable import Photogrammetry

final class PLYPointCloudExporterTests: XCTestCase {
    private let exporter = PLYPointCloudExporter()

    func test_emptyCloud_headerOnly() {
        let text = exporter.makeASCII([])
        XCTAssertTrue(text.contains("element vertex 0"))
        XCTAssertTrue(text.hasSuffix("end_header\n"))
    }

    func test_singlePoint_matchesGoldenLayout() {
        let point = ColoredPoint(
            position: SIMD3<Float>(1, 2, 3), color: SIMD3<UInt8>(255, 128, 0))
        let expected = """
        ply
        format ascii 1.0
        element vertex 1
        property float x
        property float y
        property float z
        property uchar red
        property uchar green
        property uchar blue
        end_header
        1.0 2.0 3.0 255 128 0

        """
        XCTAssertEqual(exporter.makeASCII([point]), expected)
    }

    func test_write_persistsToDisk() throws {
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID()).ply")
        let points = [
            ColoredPoint(position: .zero, color: SIMD3<UInt8>(1, 1, 1)),
            ColoredPoint(position: SIMD3<Float>(0, 0, 1),
                         color: SIMD3<UInt8>(2, 2, 2)),
        ]
        try exporter.write(points, to: url)
        defer { try? FileManager.default.removeItem(at: url) }
        let written = try String(contentsOf: url, encoding: .utf8)
        XCTAssertTrue(written.contains("element vertex 2"))
    }
}
