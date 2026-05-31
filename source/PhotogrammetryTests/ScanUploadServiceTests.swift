import XCTest
@testable import Photogrammetry

/// Drives `UploadViewModel` against `FakeScanUploadService` to verify the
/// object-capture upload path and its phase transitions.
@MainActor
final class ScanUploadServiceTests: XCTestCase {
    private var root: URL!
    private var uploadService: FakeScanUploadService!
    private var viewModel: UploadViewModel!

    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
        try FileManager.default.createDirectory(at: root, withIntermediateDirectories: true)
        uploadService = FakeScanUploadService()
        viewModel = UploadViewModel(uploadService: uploadService)
    }

    override func tearDownWithError() throws {
        try? FileManager.default.removeItem(at: root)
    }

    private func makeImage(_ name: String) throws {
        try Data("heic".utf8).write(to: root.appendingPathComponent(name))
    }

    func test_runUploadsImagesAndReportsSubmitted() async throws {
        try makeImage("image_0.heic")
        try makeImage("image_1.heic")
        uploadService.objectScanEvents = [.submitted(scanID: "obj-1")]

        viewModel.run(imagesFolder: root, serverURL: URL(string: "http://host:8080")!)

        await eventually {
            if case .submitted(let id) = self.viewModel.phase { return id == "obj-1" }
            return false
        }
        XCTAssertTrue(uploadService.didUploadObjectScan)
        XCTAssertEqual(uploadService.lastServerURL?.absoluteString, "http://host:8080")
    }

    func test_progressUpdatesPhase() async throws {
        try makeImage("image_0.heic")
        uploadService.objectScanEvents = [.progress(0.42), .submitted(scanID: "obj-2")]

        viewModel.run(imagesFolder: root, serverURL: URL(string: "http://host:8080")!)

        await eventually {
            if case .submitted = self.viewModel.phase { return true }
            return false
        }
    }

    func test_failureSetsFailedPhase() async throws {
        try makeImage("image_0.heic")
        uploadService.objectScanEvents = [.failed("server offline")]

        viewModel.run(imagesFolder: root, serverURL: URL(string: "http://host:8080")!)

        await eventually {
            if case .failed(let reason) = self.viewModel.phase { return reason == "server offline" }
            return false
        }
    }
}
