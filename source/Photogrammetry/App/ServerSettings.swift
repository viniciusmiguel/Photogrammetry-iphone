import Foundation

/// Connection details for the local-network processing server. When a host is
/// set, finished captures upload their raw sensor data to the server instead of
/// reconstructing on-device (see ADR-0009). Persisted as a JSON blob in
/// `UserDefaults` so there are no external dependencies.
struct ServerSettings: Equatable, Sendable, Codable {
    var host: String   // e.g. "192.168.1.10" — empty means "process on-device"
    var port: Int      // e.g. 8080

    /// Whitespace-only hosts count as unconfigured so a stray space can't
    /// silently route uploads to `http:// :8080`.
    var isConfigured: Bool {
        !host.trimmingCharacters(in: .whitespaces).isEmpty
    }

    /// `nil` when unconfigured — callers use this to pick the offline path.
    var baseURL: URL? {
        guard isConfigured else { return nil }
        let trimmed = host.trimmingCharacters(in: .whitespaces)
        return URL(string: "http://\(trimmed):\(port)")
    }

    static let `default` = ServerSettings(host: "", port: 8080)
    static let defaultsKey = "server_settings"

    static func load(from defaults: UserDefaults = .standard) -> ServerSettings {
        guard let data = defaults.data(forKey: defaultsKey),
              let decoded = try? JSONDecoder().decode(ServerSettings.self, from: data)
        else { return .default }
        return decoded
    }

    func save(to defaults: UserDefaults = .standard) {
        guard let data = try? JSONEncoder().encode(self) else {
            DiagnosticLog.error(
                "ServerSettings.save — encode failed for host=\(host) port=\(port)")
            return
        }
        defaults.set(data, forKey: ServerSettings.defaultsKey)
    }
}
