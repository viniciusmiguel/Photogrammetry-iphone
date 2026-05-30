import Foundation
import Observation

/// Drives the space-scan screen: runs the LiDAR scan, then writes the mesh
/// (USDZ) and point cloud (PLY) and files the mesh in the library. Depends on
/// the `SpaceScanning` protocol for testability.
@MainActor
@Observable
final class SpaceScanViewModel {
    enum Phase: Equatable {
        case scanning
        case saved(mesh: ScanArtifact, pointCloud: URL)
        case failed(String)
    }

    private(set) var scanState: SpaceScanState = .initial
    private(set) var phase: Phase = .scanning

    private let scanner: SpaceScanning
    private let library: ScanLibrary
    private let scratchRoot: URL
    private var listenTask: Task<Void, Never>?

    init(scanner: SpaceScanning, library: ScanLibrary, scratchRoot: URL) {
        self.scanner = scanner
        self.library = library
        self.scratchRoot = scratchRoot
    }

    func start() {
        scanner.start()
        listenTask = Task { [weak self] in
            guard let self else { return }
            for await state in scanner.states { self.scanState = state }
        }
    }

    func finish() {
        do {
            let meshURL = scratchRoot.appendingPathComponent("space.usdz")
            let plyURL = scratchRoot.appendingPathComponent("space.ply")
            try FileManager.default.createDirectory(
                at: scratchRoot, withIntermediateDirectories: true)
            try scanner.finish(meshURL: meshURL, pointCloudURL: plyURL)
            let artifact = try library.adopt(
                fileAt: meshURL, mode: .space,
                displayName: "Space \(Date.now.formatted(date: .abbreviated, time: .shortened))")
            phase = .saved(mesh: artifact, pointCloud: plyURL)
        } catch {
            phase = .failed(error.localizedDescription)
        }
        listenTask?.cancel()
    }

    func cancel() {
        scanner.cancel()
        listenTask?.cancel()
    }
}
