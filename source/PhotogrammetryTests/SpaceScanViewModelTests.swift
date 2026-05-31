import XCTest
@testable import Photogrammetry

@MainActor
final class SpaceScanViewModelTests: XCTestCase {
    private var root: URL!
    private var scanner: FakeSpaceScanner!
    private var library: ScanLibrary!
    private var uploadService: FakeScanUploadService!
    private var viewModel: SpaceScanViewModel!

    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
        scanner = FakeSpaceScanner()
        library = ScanLibrary(root: root)
        uploadService = FakeScanUploadService()
        // Default settings = empty host → offline path (existing behavior).
        viewModel = makeViewModel(settings: .default)
    }

    override func tearDownWithError() throws {
        try? FileManager.default.removeItem(at: root)
    }

    private func makeViewModel(settings: ServerSettings) -> SpaceScanViewModel {
        SpaceScanViewModel(
            scanner: scanner, library: library,
            scratchRoot: root.appendingPathComponent("scratch"),
            uploadService: uploadService,
            settingsStore: ServerSettingsStore(settings: settings))
    }

    func test_startRunsScannerAndMirrorsState() async {
        viewModel.start()
        XCTAssertTrue(scanner.didStart)
        scanner.emit(SpaceScanState(
            meshAnchorCount: 3, pointCount: 500, isRunning: true))
        await eventually { self.viewModel.scanState.pointCount == 500 }
        XCTAssertEqual(viewModel.scanState.meshAnchorCount, 3)
    }

    func test_finishWithoutServerSavesMeshToLibrary() {
        viewModel.start()
        viewModel.finish()
        guard case .saved(let mesh, let pointCloud) = viewModel.phase else {
            return XCTFail("expected saved, got \(viewModel.phase)")
        }
        XCTAssertFalse(uploadService.didUploadSpaceScan)
        XCTAssertEqual(mesh.mode, .space)
        XCTAssertTrue(FileManager.default.fileExists(atPath: mesh.url.path))
        XCTAssertEqual(pointCloud.pathExtension, "ply")
    }

    func test_finishFailureSurfacesError() {
        struct ScanFailure: Error {}
        scanner.finishError = ScanFailure()
        viewModel.start()
        viewModel.finish()
        if case .failed = viewModel.phase { return }
        XCTFail("expected failed, got \(viewModel.phase)")
    }

    // MARK: - Upload path

    func test_finishWithServerUploadsInsteadOfSaving() {
        viewModel = makeViewModel(settings: ServerSettings(host: "192.168.1.5", port: 8080))
        uploadService.spaceScanEvents = [.submitted(scanID: "scan-123")]
        viewModel.start()
        viewModel.finish()
        XCTAssertTrue(uploadService.didUploadSpaceScan)
        XCTAssertTrue(scanner.didPause)
        XCTAssertEqual(uploadService.lastServerURL?.absoluteString, "http://192.168.1.5:8080")
    }

    func test_uploadSubmittedSetsUploadedPhase() async {
        viewModel = makeViewModel(settings: ServerSettings(host: "192.168.1.5", port: 8080))
        uploadService.spaceScanEvents = [.progress(0.5), .submitted(scanID: "scan-xyz")]
        viewModel.start()
        viewModel.finish()
        await eventually {
            if case .uploaded(let id) = self.viewModel.phase { return id == "scan-xyz" }
            return false
        }
    }

    func test_uploadFailureSetsFailedPhase() async {
        viewModel = makeViewModel(settings: ServerSettings(host: "10.0.0.2", port: 9000))
        uploadService.spaceScanEvents = [.failed("network down")]
        viewModel.start()
        viewModel.finish()
        await eventually {
            if case .failed(let reason) = self.viewModel.phase { return reason == "network down" }
            return false
        }
    }
}
