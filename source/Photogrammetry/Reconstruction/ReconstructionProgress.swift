import Foundation

/// Detail level requested for a reconstruction. Maps 1:1 onto
/// `PhotogrammetrySession.Request.Detail`, kept as a project-owned type so view
/// models and tests never import RealityKit.
enum ReconstructionDetail: String, CaseIterable, Identifiable, Sendable {
    case reduced
    case medium
    case full
    case raw

    var id: String { rawValue }

    var title: String { rawValue.capitalized }
}

/// Streamed updates from a reconstruction, surfaced to the UI. Project-owned so
/// the rest of the app is decoupled from `PhotogrammetrySession.Output`.
enum ReconstructionEvent: Sendable, Equatable {
    case progress(Double)             // 0...1
    case processingCancelled
    case finished(URL)                // model file written to URL
    case failed(String)               // human-readable reason
}
