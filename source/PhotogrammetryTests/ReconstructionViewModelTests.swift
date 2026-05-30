import XCTest
@testable import Photogrammetry

@MainActor
final class ReconstructionViewModelTests: XCTestCase {
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

    func test_finishedEvent_adoptsArtifact() async throws {
        let model = try makeModelFile()
        let viewModel = makeViewModel(events: [
            .progress(0.5), .finished(model),
        ])
        viewModel.run(
            imagesFolder: root, detail: .medium,
            outputURL: model, displayName: "Vase")

        await eventually { isFinished(viewModel.phase) }
        guard case .finished(let artifact) = viewModel.phase else {
            return XCTFail("expected finished, got \(viewModel.phase)")
        }
        XCTAssertEqual(artifact.displayName, "Vase")
        XCTAssertTrue(FileManager.default.fileExists(atPath: artifact.url.path))
    }

    func test_failedEvent_surfacesReason() async {
        let viewModel = makeViewModel(events: [.failed("boom")])
        viewModel.run(
            imagesFolder: root, detail: .full,
            outputURL: root, displayName: "X")
        await eventually {
            if case .failed = viewModel.phase { return true }
            return false
        }
        XCTAssertEqual(viewModel.phase, .failed("boom"))
    }

    private func makeViewModel(
        events: [ReconstructionEvent]
    ) -> ReconstructionViewModel {
        ReconstructionViewModel(
            reconstructor: FakeModelReconstructor(events: events),
            library: library)
    }

    private func isFinished(_ phase: ReconstructionViewModel.Phase) -> Bool {
        if case .finished = phase { return true }
        return false
    }

    private func makeModelFile() throws -> URL {
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID()).usdz")
        try Data("usdz".utf8).write(to: url)
        return url
    }
}
