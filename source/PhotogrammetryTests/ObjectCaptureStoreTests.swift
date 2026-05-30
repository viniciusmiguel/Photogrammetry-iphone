import XCTest
@testable import Photogrammetry

final class ObjectCaptureStoreTests: XCTestCase {
    private var root: URL!

    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
    }

    override func tearDownWithError() throws {
        try? FileManager.default.removeItem(at: root)
    }

    func test_derivesStandardSubPaths() {
        let id = UUID()
        let store = ObjectCaptureStore(root: root, id: id)
        XCTAssertTrue(store.imagesFolder.path.hasSuffix("\(id.uuidString)/Images"))
        XCTAssertEqual(store.modelOutputURL.lastPathComponent, "model.usdz")
    }

    func test_prepareCreatesFolders() throws {
        let store = ObjectCaptureStore(root: root, id: UUID())
        try store.prepare()
        XCTAssertTrue(
            FileManager.default.fileExists(atPath: store.imagesFolder.path))
        XCTAssertTrue(
            FileManager.default.fileExists(atPath: store.checkpointFolder.path))
    }

    func test_capturedImageCountCountsOnlyImages() throws {
        let store = ObjectCaptureStore(root: root, id: UUID())
        try store.prepare()
        try Data().write(to: store.imagesFolder.appendingPathComponent("a.heic"))
        try Data().write(to: store.imagesFolder.appendingPathComponent("b.jpg"))
        try Data().write(to: store.imagesFolder.appendingPathComponent("notes.txt"))
        XCTAssertEqual(try store.capturedImageCount(), 2)
    }

    func test_capturedImageCountZeroBeforePrepare() throws {
        let store = ObjectCaptureStore(root: root, id: UUID())
        XCTAssertEqual(try store.capturedImageCount(), 0)
    }
}
