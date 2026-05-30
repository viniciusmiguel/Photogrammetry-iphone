import XCTest
@testable import Photogrammetry

final class CaptureCoverageTests: XCTestCase {
    func test_startsEmpty() {
        let coverage = CaptureCoverage(sectorCount: 12)
        XCTAssertEqual(coverage.fraction, 0)
        XCTAssertFalse(coverage.isComplete)
        XCTAssertEqual(coverage.missingSectors.count, 12)
    }

    func test_recordMarksOneSector() {
        var coverage = CaptureCoverage(sectorCount: 12)
        coverage.record(yawRadians: 0)
        XCTAssertEqual(coverage.fraction, 1.0 / 12.0, accuracy: 1e-9)
        XCTAssertFalse(coverage.missingSectors.contains(0))
    }

    func test_oppositeYawMarksOppositeSector() {
        var coverage = CaptureCoverage(sectorCount: 12)
        coverage.record(yawRadians: .pi)   // half-way around
        XCTAssertTrue(coverage.missingSectors.contains(0))
        XCTAssertFalse(coverage.missingSectors.contains(6))
    }

    func test_negativeAngleNormalizes() {
        var coverage = CaptureCoverage(sectorCount: 4)
        coverage.record(yawRadians: -.pi / 2)   // == 3π/2 → sector 3
        XCTAssertFalse(coverage.missingSectors.contains(3))
    }

    func test_twoPiBoundaryStaysInRange() {
        var coverage = CaptureCoverage(sectorCount: 8)
        coverage.record(yawRadians: 2 * .pi)   // wraps to sector 0, not 8
        XCTAssertEqual(coverage.missingSectors, [1, 2, 3, 4, 5, 6, 7])
    }

    func test_fullCircleIsComplete() {
        var coverage = CaptureCoverage(sectorCount: 6)
        for i in 0..<6 {
            coverage.record(yawRadians: Double(i) / 6.0 * 2 * .pi)
        }
        XCTAssertTrue(coverage.isComplete)
        XCTAssertEqual(coverage.fraction, 1.0)
    }
}
