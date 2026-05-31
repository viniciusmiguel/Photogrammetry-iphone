import Foundation
import OSLog

private let osLog = Logger(subsystem: "com.example.photogrammetry", category: "DiagnosticLog")

/// Writes timestamped log lines to a file in the app's tmp directory so we can
/// pull them via `devicectl device copy from --domain-type appDataContainer`.
///
/// Path: <NSTemporaryDirectory>/photogrammetry_debug.log
/// Pull: xcrun devicectl device copy from --device <udid>
///         --domain-type appDataContainer
///         --domain-identifier com.example.photogrammetry.Photogrammetry
///         --source tmp/photogrammetry_debug.log
///         --destination /tmp/photogrammetry_debug.log
enum DiagnosticLog {
    static let fileURL: URL = URL(fileURLWithPath: NSTemporaryDirectory())
        .appendingPathComponent("photogrammetry_debug.log")

    static func write(_ level: String, _ message: String,
                      file: String = #fileID, line: Int = #line) {
        let ts = ISO8601DateFormatter().string(from: Date())
        let entry = "[\(ts)] [\(level)] [\(file):\(line)] \(message)\n"
        osLog.log(level: level == "ERROR" ? .error : level == "WARN" ? .default : .debug,
                  "\(message)")
        guard let data = entry.data(using: .utf8) else { return }
        if FileManager.default.fileExists(atPath: fileURL.path) {
            if let handle = try? FileHandle(forWritingTo: fileURL) {
                handle.seekToEndOfFile()
                handle.write(data)
                try? handle.close()
            }
        } else {
            try? data.write(to: fileURL, options: .atomic)
        }
    }

    static func info(_ msg: String, file: String = #fileID, line: Int = #line) {
        write("INFO", msg, file: file, line: line)
    }

    static func debug(_ msg: String, file: String = #fileID, line: Int = #line) {
        write("DEBUG", msg, file: file, line: line)
    }

    static func error(_ msg: String, file: String = #fileID, line: Int = #line) {
        write("ERROR", msg, file: file, line: line)
    }

    static func warn(_ msg: String, file: String = #fileID, line: Int = #line) {
        write("WARN", msg, file: file, line: line)
    }

    /// Clears the log file. Call at app start so each run is clean.
    static func reset() {
        try? FileManager.default.removeItem(at: fileURL)
        info("=== session start ===")
    }
}
