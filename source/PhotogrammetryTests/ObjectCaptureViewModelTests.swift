import XCTest
@testable import Photogrammetry

@MainActor
final class ObjectCaptureViewModelTests: XCTestCase {
    private var scanner: FakeObjectScanner!
    private var viewModel: ObjectCaptureViewModel!
    private var store: ObjectCaptureStore!

    override func setUpWithError() throws {
        scanner = FakeObjectScanner()
        store = ObjectCaptureStore(
            root: FileManager.default.temporaryDirectory
                .appendingPathComponent(UUID().uuidString),
            id: UUID())
        viewModel = ObjectCaptureViewModel(scanner: scanner, store: store)
    }

    func test_startInvokesScanner() {
        viewModel.start()
        XCTAssertTrue(scanner.didStart)
    }

    func test_mirrorsScannerStateUpdates() async {
        viewModel.start()
        scanner.emit(ObjectScanState(
            stage: .capturing,
            coverage: CaptureCoverage(sectorCount: 24),
            capturedImageCount: 7))
        await eventually { self.viewModel.scanState.capturedImageCount == 7 }
        XCTAssertEqual(viewModel.scanState.stage, .capturing)
    }

    func test_completedStageExposesImagesFolder() async {
        viewModel.start()
        scanner.emit(ObjectScanState(
            stage: .completed,
            coverage: CaptureCoverage(sectorCount: 24),
            capturedImageCount: 30))
        await eventually {
            self.viewModel.imagesFolderForReconstruction != nil
        }
        XCTAssertEqual(
            viewModel.imagesFolderForReconstruction, store.imagesFolder)
    }

    func test_confirmBoundingBoxForwardsToScanner() {
        viewModel.confirmBoundingBox()
        XCTAssertTrue(scanner.didBeginCapturing)
    }
}
