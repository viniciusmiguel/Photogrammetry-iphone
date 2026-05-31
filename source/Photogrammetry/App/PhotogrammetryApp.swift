import SwiftUI

/// App entry point. Builds the live dependency graph once and hands it to the
/// root view.
@main
struct PhotogrammetryApp: App {
    private let dependencies = AppDependencies.live()

    init() {
        DiagnosticLog.reset()
        DiagnosticLog.info("log path: \(DiagnosticLog.fileURL.path)")
    }

    var body: some Scene {
        WindowGroup {
            RootView(dependencies: dependencies)
        }
    }
}
