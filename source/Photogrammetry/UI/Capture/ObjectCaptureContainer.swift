import RealityKit
import SwiftUI

/// Embeds Apple's `ObjectCaptureView` (live camera + point-cloud + bounding box)
/// and layers our custom coverage overlay and stage-specific controls on top —
/// keeping Apple's reconstruction guidance while delivering the custom UX.
struct ObjectCaptureContainer: View {
    let session: ObjectCaptureSession
    let scanState: ObjectScanState
    let onConfirmBox: () -> Void
    let onFinish: () -> Void

    var body: some View {
        ZStack(alignment: .top) {
            ObjectCaptureView(session: session)
                .ignoresSafeArea()

            CoverageHeatmapOverlay(
                coverage: scanState.coverage,
                capturedImageCount: scanState.capturedImageCount)
                .padding(.top, 16)

            VStack {
                Spacer()
                controls
                    .padding(.bottom, 32)
            }
        }
    }

    @ViewBuilder
    private var controls: some View {
        switch scanState.stage {
        case .detecting:
            Button("Start Capture", action: onConfirmBox)
                .buttonStyle(.borderedProminent)
        case .capturing:
            Button("Finish", action: onFinish)
                .buttonStyle(.bordered)
                .disabled(!scanState.coverage.isComplete)
        default:
            EmptyView()
        }
    }
}
