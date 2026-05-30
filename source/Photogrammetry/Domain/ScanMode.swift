import Foundation

/// The two capture pipelines the app supports.
///
/// - `object`: guided turntable/flip capture of a bounded object, reconstructed
///   with `PhotogrammetrySession` into a textured mesh.
/// - `space`: free-roam ARKit LiDAR scan of a room/scene, exported as the raw
///   reconstructed mesh and/or a fused point cloud.
///
/// Example:
/// ```
/// let mode = ScanMode.object
/// session.start(for: mode)
/// ```
enum ScanMode: String, CaseIterable, Identifiable, Sendable {
    case object
    case space

    var id: String { rawValue }

    /// Human-facing label for the capture UI.
    var title: String {
        switch self {
        case .object: return "Object"
        case .space: return "Space"
        }
    }
}
