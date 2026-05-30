import XCTest
@testable import Photogrammetry

@MainActor
final class ScanLibraryTests: XCTestCase {
    private var root: URL!
    private var library: ScanLibrary!

    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
        library = ScanLibrary(root: root)
    }

    override func tearDownWithError() throws {
        try? FileManager.default.removeItem(at: root)
    }

    func test_adoptMovesFileAndReturnsArtifact() throws {
        let source = try makeTempModel(ext: "usdz")
        let artifact = try library.adopt(
            fileAt: source, mode: .object, displayName: "Cup")
        XCTAssertEqual(artifact.format, .usdz)
        XCTAssertEqual(artifact.mode, .object)
        XCTAssertEqual(artifact.displayName, "Cup")
        XCTAssertTrue(FileManager.default.fileExists(atPath: artifact.url.path))
        XCTAssertFalse(FileManager.default.fileExists(atPath: source.path))
    }

    func test_adoptUnknownFormatThrows() throws {
        let source = try makeTempModel(ext: "xyz")
        XCTAssertThrowsError(
            try library.adopt(fileAt: source, mode: .object, displayName: "X")
        ) { error in
            XCTAssertEqual(
                error as? LibraryError, .unknownFormat(extension: "xyz"))
        }
    }

    func test_storedFileURLsListsAdoptedFiles() throws {
        _ = try library.adopt(
            fileAt: try makeTempModel(ext: "usdz"),
            mode: .object, displayName: "A")
        _ = try library.adopt(
            fileAt: try makeTempModel(ext: "obj"),
            mode: .space, displayName: "B")
        XCTAssertEqual(try library.storedFileURLs().count, 2)
    }

    func test_storedFileURLsEmptyWhenNoLibrary() throws {
        XCTAssertEqual(try library.storedFileURLs(), [])
    }

    private func makeTempModel(ext: String) throws -> URL {
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID()).\(ext)")
        try Data("model".utf8).write(to: url)
        return url
    }
}
