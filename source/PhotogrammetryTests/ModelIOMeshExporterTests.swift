import XCTest
@testable import Photogrammetry

/// Only the same-format passthrough branch is unit-tested; cross-format
/// conversion requires Model I/O reading a real USD asset and is covered by the
/// on-device verification steps in the README.
final class ModelIOMeshExporterTests: XCTestCase {
    private let exporter = ModelIOMeshExporter()

    func test_sameFormatCopiesFile() throws {
        let source = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID()).usdz")
        let destination = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID()).usdz")
        try Data("usdz-bytes".utf8).write(to: source)
        defer {
            try? FileManager.default.removeItem(at: source)
            try? FileManager.default.removeItem(at: destination)
        }

        try exporter.export(from: source, to: destination, as: .usdz)

        let copied = try String(contentsOf: destination, encoding: .utf8)
        XCTAssertEqual(copied, "usdz-bytes")
    }
}
