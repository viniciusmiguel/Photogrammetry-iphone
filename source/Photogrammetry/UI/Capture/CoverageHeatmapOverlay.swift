import SwiftUI

/// RealityScan-style coverage ring: a circle of sector ticks that fill in as the
/// user circles the object, plus a photo count. Purely presentational — driven
/// by `CaptureCoverage` so it has no dependency on the capture session.
struct CoverageHeatmapOverlay: View {
    let coverage: CaptureCoverage
    let capturedImageCount: Int

    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                ForEach(0..<coverage.sectorCount, id: \.self) { sector in
                    tick(sector)
                }
                Text("\(Int(coverage.fraction * 100))%")
                    .font(.title3.bold())
                    .foregroundStyle(.white)
            }
            .frame(width: 120, height: 120)

            Text("\(capturedImageCount) photos")
                .font(.caption)
                .foregroundStyle(.white)
        }
        .padding()
        .background(.black.opacity(0.35), in: .rect(cornerRadius: 16))
    }

    private func tick(_ sector: Int) -> some View {
        let seen = !coverage.missingSectors.contains(sector)
        let angle = Double(sector) / Double(coverage.sectorCount) * 360.0
        return Capsule()
            .fill(seen ? Color.green : Color.white.opacity(0.25))
            .frame(width: 4, height: 14)
            .offset(y: -52)
            .rotationEffect(.degrees(angle))
    }
}
