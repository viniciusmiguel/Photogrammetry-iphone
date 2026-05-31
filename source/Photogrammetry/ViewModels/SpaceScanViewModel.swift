import Foundation

/// Drives the space-scan screen. When a server is configured it serializes the
/// raw sensor data and uploads it; otherwise it falls back to the on-device
/// bake-and-export path and files the result in the library (ADR-0009).
@MainActor
@Observable
final class SpaceScanViewModel {
    enum Phase: Equatable {
        case scanning
        case uploading(Double)            // 0...1 upload progress
        case uploaded(scanID: String)     // server accepted, processing
        case saved(mesh: ScanArtifact, pointCloud: URL)   // offline path
        case failed(String)
    }

    private(set) var scanState: SpaceScanState = .initial
    private(set) var phase: Phase = .scanning

    private let scanner: SpaceScanning
    private let library: ScanLibrary
    private let scratchRoot: URL
    private let uploadService: ScanUploadService
    private let settingsStore: ServerSettingsStore
    private var listenTask: Task<Void, Never>?
    private var uploadTask: Task<Void, Never>?

    init(
        scanner: SpaceScanning,
        library: ScanLibrary,
        scratchRoot: URL,
        uploadService: ScanUploadService,
        settingsStore: ServerSettingsStore
    ) {
        self.scanner = scanner
        self.library = library
        self.scratchRoot = scratchRoot
        self.uploadService = uploadService
        self.settingsStore = settingsStore
    }

    func start() {
        DiagnosticLog.info("start()")
        scanner.start()
        listenTask = Task { [weak self] in
            guard let self else { return }
            for await state in scanner.states { self.scanState = state }
        }
    }

    /// Routes to upload or on-device export based on the server configuration.
    func finish() {
        DiagnosticLog.info("finish() — scanState=\(String(describing: scanState))")
        if let serverURL = settingsStore.settings.baseURL {
            finishViaUpload(serverURL: serverURL)
        } else {
            finishLocally()
        }
    }

    func cancel() {
        scanner.cancel()
        listenTask?.cancel()
        uploadTask?.cancel()
    }

    // MARK: - Upload path

    private func finishViaUpload(serverURL: URL) {
        DiagnosticLog.info("finish() — uploading to \(serverURL.absoluteString)")
        phase = .uploading(0)
        scanner.pause()
        let payload = SpaceScanSerializer.serialize(
            anchors: scanner.currentAnchors,
            keyframes: scanner.currentKeyframes,
            points: scanner.currentPoints)
        listenTask?.cancel()
        // Initiate the upload synchronously; only the event consumption is async.
        let events = uploadService.uploadSpaceScan(payload, serverURL: serverURL)
        uploadTask = Task { [weak self] in
            guard let self else { return }
            for await event in events { self.apply(event) }
        }
    }

    private func apply(_ event: UploadEvent) {
        switch event {
        case .progress(let fraction): phase = .uploading(fraction)
        case .submitted(let scanID): phase = .uploaded(scanID: scanID)
        case .failed(let reason): phase = .failed(reason)
        }
    }

    // MARK: - Offline (on-device) path

    private func finishLocally() {
        do {
            // All scratch files share a UUID prefix so they can coexist in the
            // library directory alongside files from other scans without conflict.
            let scanID = UUID().uuidString
            let meshURL = scratchRoot.appendingPathComponent("\(scanID).obj")
            let plyURL = scratchRoot.appendingPathComponent("\(scanID).ply")
            let textureURL = scratchRoot.appendingPathComponent("\(scanID)_tex.png")
            let mtlURL = scratchRoot.appendingPathComponent("\(scanID).mtl")
            DiagnosticLog.info("finishLocally() — scratchRoot=\(scratchRoot.path)")

            try FileManager.default.createDirectory(
                at: scratchRoot, withIntermediateDirectories: true)
            // Remove any stale files from a prior failed run.
            for url in [meshURL, plyURL, textureURL, mtlURL] {
                try? FileManager.default.removeItem(at: url)
            }

            try scanner.finish(meshURL: meshURL, pointCloudURL: plyURL, textureURL: textureURL)

            let artifact = try library.adopt(
                fileAt: meshURL,
                companions: [mtlURL, textureURL],
                mode: .space,
                displayName: "Space \(Date.now.formatted(date: .abbreviated, time: .shortened))")
            DiagnosticLog.info("finishLocally() — artifact saved at \(artifact.url.path)")
            phase = .saved(mesh: artifact, pointCloud: plyURL)
        } catch {
            DiagnosticLog.error("finishLocally() — FAILED: \(error)")
            phase = .failed(error.localizedDescription)
        }
        listenTask?.cancel()
    }
}
