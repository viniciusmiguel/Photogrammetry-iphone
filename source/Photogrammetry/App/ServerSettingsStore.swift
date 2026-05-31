import Foundation
import Observation

/// Observable wrapper so SwiftUI views can bind to `ServerSettings` and edits
/// persist automatically. `AppDependencies` holds one instance and hands it to
/// both `SettingsView` (edits) and the capture view models (reads).
///
/// `didSet` does not fire for the initial assignment in `init`, so loading from
/// `UserDefaults` does not redundantly write back.
@MainActor
@Observable
final class ServerSettingsStore {
    var settings: ServerSettings {
        didSet { settings.save() }
    }

    /// - Parameter settings: injectable for tests/previews; defaults to the
    ///   persisted value.
    init(settings: ServerSettings? = nil) {
        self.settings = settings ?? .load()
    }
}
