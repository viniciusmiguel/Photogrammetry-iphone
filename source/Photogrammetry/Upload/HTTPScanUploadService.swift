import Foundation

/// Production `ScanUploadService` backed by `URLSession`. Bodies are streamed
/// from a temp file (not buffered in memory) because space/object uploads can be
/// 100–200 MB. Per-byte progress comes from a `URLSessionTaskDelegate`.
///
/// `actor` isolation keeps the stream continuation race-free under
/// `SWIFT_STRICT_CONCURRENCY: complete` — delegate callbacks arrive off the main
/// actor.
actor HTTPScanUploadService: ScanUploadService {
    nonisolated func uploadSpaceScan(
        _ payload: SpaceScanPayload, serverURL: URL
    ) -> AsyncStream<UploadEvent> {
        stream(serverURL: serverURL, path: "api/scans/space") {
            try MultipartBody.spaceScan(payload)
        }
    }

    nonisolated func uploadObjectScan(
        _ payload: ObjectScanPayload, serverURL: URL
    ) -> AsyncStream<UploadEvent> {
        stream(serverURL: serverURL, path: "api/scans/object") {
            try MultipartBody.objectScan(payload)
        }
    }

    // MARK: - Shared upload pipeline

    private nonisolated func stream(
        serverURL: URL,
        path: String,
        buildBody: @escaping @Sendable () throws -> MultipartBody
    ) -> AsyncStream<UploadEvent> {
        AsyncStream { continuation in
            let task = Task {
                await Self.run(
                    serverURL: serverURL, path: path,
                    buildBody: buildBody, continuation: continuation)
            }
            continuation.onTermination = { _ in task.cancel() }
        }
    }

    private static func run(
        serverURL: URL,
        path: String,
        buildBody: @Sendable () throws -> MultipartBody,
        continuation: AsyncStream<UploadEvent>.Continuation
    ) async {
        do {
            let body = try buildBody()
            defer { try? FileManager.default.removeItem(at: body.fileURL) }
            let scanID = try await send(
                to: serverURL.appendingPathComponent(path),
                body: body, continuation: continuation)
            DiagnosticLog.info("upload — server accepted scanID=\(scanID)")
            continuation.yield(.submitted(scanID: scanID))
        } catch is CancellationError {
            // Termination handler already cancelled the task; nothing to report.
        } catch {
            DiagnosticLog.error("upload — failed: \(error)")
            continuation.yield(.failed(error.localizedDescription))
        }
        continuation.finish()
    }

    private static func send(
        to url: URL,
        body: MultipartBody,
        continuation: AsyncStream<UploadEvent>.Continuation
    ) async throws -> String {
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue(body.contentType, forHTTPHeaderField: "Content-Type")

        let delegate = UploadProgressDelegate { fraction in
            continuation.yield(.progress(fraction))
        }
        let (data, response) = try await URLSession.shared.upload(
            for: request, fromFile: body.fileURL, delegate: delegate)

        guard let http = response as? HTTPURLResponse else {
            throw UploadError.invalidResponse
        }
        guard (200..<300).contains(http.statusCode) else {
            throw UploadError.badStatus(http.statusCode, String(data: data, encoding: .utf8) ?? "")
        }
        return try decodeScanID(data)
    }

    private static func decodeScanID(_ data: Data) throws -> String {
        struct Accepted: Decodable { let scan_id: String }
        return try JSONDecoder().decode(Accepted.self, from: data).scan_id
    }
}

enum UploadError: Error, LocalizedError {
    case invalidResponse
    case badStatus(Int, String)
    case missingFile(URL)

    var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "Server returned a non-HTTP response."
        case .badStatus(let code, let body):
            return "Server rejected upload (HTTP \(code)): \(body)"
        case .missingFile(let url):
            return "Image file not found at \(url.path)"
        }
    }
}

/// Forwards `URLSession` upload progress as a 0...1 fraction.
private final class UploadProgressDelegate: NSObject, URLSessionTaskDelegate {
    private let onProgress: @Sendable (Double) -> Void

    init(onProgress: @escaping @Sendable (Double) -> Void) {
        self.onProgress = onProgress
    }

    func urlSession(
        _ session: URLSession, task: URLSessionTask,
        didSendBodyData bytesSent: Int64,
        totalBytesSent: Int64, totalBytesExpectedToSend: Int64
    ) {
        guard totalBytesExpectedToSend > 0 else { return }
        onProgress(Double(totalBytesSent) / Double(totalBytesExpectedToSend))
    }
}
