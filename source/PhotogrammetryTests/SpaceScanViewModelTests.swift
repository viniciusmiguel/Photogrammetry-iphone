import XCTest
@testable import Photogrammetry

@MainActor
final class SpaceScanViewModelTests: XCTestCase {
    private var root: URL!
    private var scanner: FakeSpaceScanner!
    private var library: ScanLibrary!
    private var viewModel: SpaceScanViewModel!

    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
        scanner = FakeSpaceScanner()
        library = ScanLibrary(root: root)
        viewModel = SpaceScanViewModel(
            scanner: scanner, library: library,
            scratchRoot: root.appendingPathComponent("scratch"))
    }

    override func tearDownWithError() throws {
        try? FileManager.default.removeItem(at: root)
    }

    func test_startRunsScannerAndMirrorsState() async {
        viewModel.start()
        XCTAssertTrue(scanner.didStart)
        scanner.emit(SpaceScanState(
            meshAnchorCount: 3, pointCount: 500, isRunning: true))
        await eventually { self.viewModel.scanState.pointCount == 500 }
        XCTAssertEqual(viewModel.scanState.meshAnchorCount, 3)
    }

    func test_finishSavesMeshToLibrary() {
        viewModel.start()
        viewModel.finish()
        guard case .saved(let mesh, let pointCloud) = viewModel.phase else {
            return XCTFail("expected saved, got \(viewModel.phase)")
        }
        XCTAssertEqual(mesh.mode, .space)
        XCTAssertTrue(FileManager.default.fileExists(atPath: mesh.url.path))
        XCTAssertEqual(pointCloud.lastPathComponent, "space.ply")
    }

    func test_finishFailureSurfacesError() {
        struct ScanFailure: Error {}
        scanner.finishError = ScanFailure()
        viewModel.start()
        viewModel.finish()
        if case .failed = viewModel.phase { return }
        XCTFail("expected failed, got \(viewModel.phase)")
    }
}
