import SwiftUI

/// App entry point. Builds the live dependency graph once and hands it to the
/// root view.
@main
struct PhotogrammetryApp: App {
    private let dependencies = AppDependencies.live()

    var body: some Scene {
        WindowGroup {
            RootView(dependencies: dependencies)
        }
    }
}
