import Foundation

/// Coverage of an object as the user circles it, modeled as occupancy of
/// equal-width yaw sectors (RealityScan-style "have you been all the way
/// around?" feedback). Pure value type so the math is unit-testable without a
/// live capture session.
///
/// Example:
/// ```
/// var coverage = CaptureCoverage(sectorCount: 12)
/// coverage.record(yawRadians: .pi)      // mark the far side as seen
/// coverage.fraction                     // 1.0 / 12.0
/// ```
struct CaptureCoverage: Equatable, Sendable {
    let sectorCount: Int
    private(set) var seenSectors: Set<Int>

    init(sectorCount: Int) {
        precondition(
            sectorCount > 0,
            "sectorCount must be > 0, got \(sectorCount)")
        self.sectorCount = sectorCount
        self.seenSectors = []
    }

    /// Marks the sector containing `yawRadians` (any real angle) as captured.
    mutating func record(yawRadians: Double) {
        seenSectors.insert(sectorIndex(for: yawRadians))
    }

    /// Fraction of sectors captured, in `0...1`.
    var fraction: Double {
        Double(seenSectors.count) / Double(sectorCount)
    }

    /// True once every sector has at least one capture.
    var isComplete: Bool {
        seenSectors.count == sectorCount
    }

    /// Sectors still missing a capture, sorted for stable UI rendering.
    var missingSectors: [Int] {
        (0..<sectorCount).filter { !seenSectors.contains($0) }
    }

    /// Maps any yaw angle into `0..<sectorCount`, normalizing negatives and
    /// values beyond 2π so callers don't have to pre-wrap the angle.
    private func sectorIndex(for yawRadians: Double) -> Int {
        let twoPi = 2.0 * Double.pi
        let normalized = yawRadians.truncatingRemainder(dividingBy: twoPi)
        let positive = normalized < 0 ? normalized + twoPi : normalized
        let index = Int(positive / twoPi * Double(sectorCount))
        return min(index, sectorCount - 1)  // guard the 2π boundary
    }
}
