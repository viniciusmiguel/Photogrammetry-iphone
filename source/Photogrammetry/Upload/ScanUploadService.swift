import Foundation

/// Progress of a scan upload, delivered as an async stream so the view models
/// can drive their UI without knowing about `URLSession`.
enum UploadEvent: Sendable, Equatable {
    case progress(Double)           // 0...1 fraction of bytes sent
    case submitted(scanID: String)  // server accepted and queued the scan
    case failed(String)             // human-readable failure reason
}

/// One mesh anchor flattened to plain arrays + the binary index data, ready to
/// serialize to the wire format documented in `docs/server-architecture.md`.
/// Local-space vertices + transform are kept separate (not pre-multiplied) so
/// the server's `MeshBuilder` port performs the same anchor→world transform the
/// Swift `MeshBuilder.add()` does.
struct SerializedMeshAnchor: Sendable, Equatable {
    let anchorID: UUID
    let transform: [Float]              // 16, column-major (simd_float4x4 order)
    let localVertices: [SIMD3<Float>]
    let faceIndices: [UInt32]           // normalized to UInt32, 3 per triangle
    let originalBytesPerIndex: Int      // 2 or 4 on the device — informational
}

/// One camera keyframe encoded as JPEG (YCbCr→RGB done by the encoder) plus the
/// pose/intrinsics the server needs to reproject world points into it.
struct SerializedKeyframe: Sendable, Equatable {
    let index: Int
    let transform: [Float]   // 16, column-major (camera-to-world)
    let intrinsics: [Float]  // 9, column-major (ARCamera.intrinsics)
    let width: Int
    let height: Int
    let jpegData: Data
}

/// Everything needed to reconstruct a space scan on the server.
struct SpaceScanPayload: Sendable, Equatable {
    let anchors: [SerializedMeshAnchor]
    let keyframes: [SerializedKeyframe]
    let pointCloudPLY: Data
}

/// Object capture sends the raw HEIC images; the server runs COLMAP on them.
/// Images stay on disk and are streamed part-by-part to avoid buffering them all.
struct ObjectScanPayload: Sendable, Equatable {
    let imageURLs: [URL]
}

/// Thin interface so the capture view models stay testable against a fake.
protocol ScanUploadService: Sendable {
    func uploadSpaceScan(
        _ payload: SpaceScanPayload, serverURL: URL
    ) -> AsyncStream<UploadEvent>

    func uploadObjectScan(
        _ payload: ObjectScanPayload, serverURL: URL
    ) -> AsyncStream<UploadEvent>
}
