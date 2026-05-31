import Foundation

/// A multipart/form-data body written to a temp file so large uploads stream
/// from disk instead of buffering in memory. The boundary travels in
/// `contentType`; callers delete `fileURL` after the upload completes.
struct MultipartBody: Sendable {
    let fileURL: URL
    let contentType: String

    /// Builds the space-scan body: binary mesh anchors, keyframe metadata JSON,
    /// one JPEG part per keyframe, and the PLY point cloud.
    static func spaceScan(_ payload: SpaceScanPayload) throws -> MultipartBody {
        try build { writer in
            try writer.part(
                name: "mesh_anchors", filename: "mesh_anchors.bin",
                contentType: "application/octet-stream",
                body: SpaceScanSerializer.meshAnchorBlob(payload.anchors))

            let meta = KeyframesMetadata(keyframes: payload.keyframes.map(\.metadata))
            try writer.part(
                name: "keyframes_meta", filename: "keyframes_meta.json",
                contentType: "application/json",
                body: try JSONEncoder().encode(meta))

            for keyframe in payload.keyframes {
                try writer.part(
                    name: "keyframe_\(keyframe.index)",
                    filename: "keyframe_\(keyframe.index).jpg",
                    contentType: "image/jpeg", body: keyframe.jpegData)
            }

            try writer.part(
                name: "point_cloud", filename: "pointcloud.ply",
                contentType: "text/plain", body: payload.pointCloudPLY)
        }
    }

    /// Builds the object-scan body: a `scan_type` field, an `image_count` field,
    /// and one HEIC part per image (read one at a time to cap peak memory).
    static func objectScan(_ payload: ObjectScanPayload) throws -> MultipartBody {
        try build { writer in
            try writer.field(name: "scan_type", value: "object")
            try writer.field(name: "image_count", value: String(payload.imageURLs.count))
            for (index, imageURL) in payload.imageURLs.enumerated() {
                guard let data = try? Data(contentsOf: imageURL) else {
                    throw UploadError.missingFile(imageURL)
                }
                try writer.part(
                    name: "image_\(index)", filename: imageURL.lastPathComponent,
                    contentType: "image/heic", body: data)
            }
        }
    }

    // MARK: - Private

    private static func build(_ write: (MultipartWriter) throws -> Void) throws -> MultipartBody {
        let boundary = "Boundary-\(UUID().uuidString)"
        let fileURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("upload-\(UUID().uuidString).multipart")
        FileManager.default.createFile(atPath: fileURL.path, contents: nil)
        let handle = try FileHandle(forWritingTo: fileURL)
        defer { try? handle.close() }

        let writer = MultipartWriter(boundary: boundary, handle: handle)
        try write(writer)
        try writer.finish()
        return MultipartBody(
            fileURL: fileURL,
            contentType: "multipart/form-data; boundary=\(boundary)")
    }
}

/// Writes multipart parts to an open file handle. Kept separate so the part
/// framing lives in one place.
private struct MultipartWriter {
    let boundary: String
    let handle: FileHandle

    func field(name: String, value: String) throws {
        try part(name: name, filename: nil, contentType: "text/plain",
                 body: Data(value.utf8))
    }

    func part(name: String, filename: String?, contentType: String, body: Data) throws {
        var header = "--\(boundary)\r\n"
        header += "Content-Disposition: form-data; name=\"\(name)\""
        if let filename { header += "; filename=\"\(filename)\"" }
        header += "\r\nContent-Type: \(contentType)\r\n\r\n"
        try handle.write(contentsOf: Data(header.utf8))
        try handle.write(contentsOf: body)
        try handle.write(contentsOf: Data("\r\n".utf8))
    }

    func finish() throws {
        try handle.write(contentsOf: Data("--\(boundary)--\r\n".utf8))
    }
}
