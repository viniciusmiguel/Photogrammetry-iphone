import Foundation
import Observation

/// Drives the object-capture upload screen: gathers the captured images and
/// streams them to the server. Mirrors `ReconstructionViewModel`'s shape so
/// `ObjectCaptureFlowView` can swap between the offline and upload paths.
@MainActor
@Observable
final class UploadViewModel {
    enum Phase: Equatable {
        case idle
        case uploading(Double)            // 0...1
        case submitted(scanID: String)
        case failed(String)
    }

    private(set) var phase: Phase = .idle

    private let uploadService: ScanUploadService
    private var runTask: Task<Void, Never>?

    init(uploadService: ScanUploadService) {
        self.uploadService = uploadService
    }

    /// Uploads every image in `imagesFolder` to `serverURL`.
    func run(imagesFolder: URL, serverURL: URL) {
        DiagnosticLog.info("UploadViewModel.run — folder=\(imagesFolder.lastPathComponent)")
        phase = .uploading(0)
        let images = Self.imageURLs(in: imagesFolder)
        let payload = ObjectScanPayload(imageURLs: images)
        // Initiate the upload synchronously; only the event consumption is async.
        let events = uploadService.uploadObjectScan(payload, serverURL: serverURL)
        runTask = Task { [weak self] in
            guard let self else { return }
            for await event in events { self.apply(event) }
        }
    }

    func cancel() {
        runTask?.cancel()
    }

    private func apply(_ event: UploadEvent) {
        switch event {
        case .progress(let fraction): phase = .uploading(fraction)
        case .submitted(let scanID): phase = .submitted(scanID: scanID)
        case .failed(let reason): phase = .failed(reason)
        }
    }

    /// Capture images are HEIC/JPG; sort by name so the server sees a stable order.
    private static func imageURLs(in folder: URL) -> [URL] {
        let extensions: Set<String> = ["heic", "jpg", "jpeg"]
        let contents = (try? FileManager.default.contentsOfDirectory(
            at: folder, includingPropertiesForKeys: nil)) ?? []
        return contents
            .filter { extensions.contains($0.pathExtension.lowercased()) }
            .sorted { $0.lastPathComponent < $1.lastPathComponent }
    }
}
