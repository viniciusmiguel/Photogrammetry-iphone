import ARKit
import CoreImage
import ImageIO
import simd

/// JSON metadata for one keyframe, paired with its JPEG part on the wire.
struct KeyframeMetadata: Codable, Equatable {
    let index: Int
    let transform: [Float]    // 16, column-major
    let intrinsics: [Float]   // 9, column-major
    let resolution: Resolution

    struct Resolution: Codable, Equatable {
        let width: Int
        let height: Int
    }
}

/// Top-level envelope for the `keyframes_meta` multipart part.
struct KeyframesMetadata: Codable, Equatable {
    let keyframes: [KeyframeMetadata]
}

extension SerializedKeyframe {
    var metadata: KeyframeMetadata {
        KeyframeMetadata(
            index: index, transform: transform, intrinsics: intrinsics,
            resolution: .init(width: width, height: height))
    }
}

/// Converts live `ARSceneScanner` state into the upload payload + binary blob.
/// The binary format is mirrored by the Go server's `storage/binary.go`; keep
/// the two in sync (see `docs/server-architecture.md`).
enum SpaceScanSerializer {
    static func serialize(
        anchors: [ARMeshAnchor],
        keyframes: [CameraKeyframe],
        points: [ColoredPoint]
    ) -> SpaceScanPayload {
        let context = CIContext()
        let serAnchors = anchors.map(serializeAnchor)
        let serKeyframes = keyframes.enumerated().map { index, keyframe in
            SerializedKeyframe(
                index: index,
                transform: columnMajor4(keyframe.transform),
                intrinsics: columnMajor3(keyframe.intrinsics),
                width: Int(keyframe.imageResolution.width),
                height: Int(keyframe.imageResolution.height),
                jpegData: encodeJPEG(keyframe.image, context: context))
        }
        let ply = Data(PLYPointCloudExporter().makeASCII(points).utf8)
        DiagnosticLog.info(
            "serialize — anchors=\(serAnchors.count) keyframes=\(serKeyframes.count) plyBytes=\(ply.count)")
        return SpaceScanPayload(
            anchors: serAnchors, keyframes: serKeyframes, pointCloudPLY: ply)
    }

    /// Concatenates all anchors into the wire blob: a uint32 count followed by
    /// each anchor's binary record.
    static func meshAnchorBlob(_ anchors: [SerializedMeshAnchor]) -> Data {
        var data = Data()
        appendLE(&data, UInt32(anchors.count))
        for anchor in anchors { appendAnchor(&data, anchor) }
        return data
    }

    // MARK: - Anchor extraction

    private static func serializeAnchor(_ anchor: ARMeshAnchor) -> SerializedMeshAnchor {
        let geometry = anchor.geometry
        let (faces, bytesPerIndex) = extractFaces(geometry.faces)
        return SerializedMeshAnchor(
            anchorID: anchor.identifier,
            transform: columnMajor4(anchor.transform),
            localVertices: extractVertices(geometry.vertices),
            faceIndices: faces,
            originalBytesPerIndex: bytesPerIndex)
    }

    private static func extractVertices(_ source: ARGeometrySource) -> [SIMD3<Float>] {
        var result = [SIMD3<Float>]()
        result.reserveCapacity(source.count)
        let pointer = source.buffer.contents()
        for i in 0..<source.count {
            let base = pointer.advanced(by: source.offset + source.stride * i)
                .assumingMemoryBound(to: Float.self)
            result.append(SIMD3<Float>(base[0], base[1], base[2]))
        }
        return result
    }

    private static func extractFaces(_ element: ARGeometryElement) -> ([UInt32], Int) {
        let bytesPerIndex = element.bytesPerIndex
        let perPrimitive = element.indexCountPerPrimitive
        let pointer = element.buffer.contents()
        var result = [UInt32]()
        result.reserveCapacity(element.count * perPrimitive)
        for face in 0..<element.count {
            for k in 0..<perPrimitive {
                let offset = (face * perPrimitive + k) * bytesPerIndex
                if bytesPerIndex == MemoryLayout<UInt16>.size {
                    result.append(UInt32(pointer.advanced(by: offset)
                        .assumingMemoryBound(to: UInt16.self).pointee))
                } else {
                    result.append(pointer.advanced(by: offset)
                        .assumingMemoryBound(to: UInt32.self).pointee)
                }
            }
        }
        return (result, bytesPerIndex)
    }

    // MARK: - Binary writing (little-endian)

    private static func appendAnchor(_ data: inout Data, _ anchor: SerializedMeshAnchor) {
        var uuid = anchor.anchorID.uuid   // uuid_t — 16 bytes, RFC 4122 order
        withUnsafeBytes(of: &uuid) { data.append(contentsOf: $0) }
        for element in anchor.transform { appendLE(&data, element) }

        appendLE(&data, UInt32(anchor.localVertices.count))
        appendLE(&data, UInt32(12))   // vertexStride
        for vertex in anchor.localVertices {
            appendLE(&data, vertex.x); appendLE(&data, vertex.y); appendLE(&data, vertex.z)
        }

        // Indices are already widened to UInt32, so the wire always uses 4 bytes.
        appendLE(&data, UInt32(anchor.faceIndices.count / 3))
        appendLE(&data, UInt32(4))    // bytesPerIndex
        for index in anchor.faceIndices { appendLE(&data, index) }
    }

    private static func appendLE(_ data: inout Data, _ value: UInt32) {
        withUnsafeBytes(of: value.littleEndian) { data.append(contentsOf: $0) }
    }

    private static func appendLE(_ data: inout Data, _ value: Float) {
        withUnsafeBytes(of: value.bitPattern.littleEndian) { data.append(contentsOf: $0) }
    }

    // MARK: - Matrix flattening

    private static func columnMajor4(_ m: simd_float4x4) -> [Float] {
        [m.columns.0.x, m.columns.0.y, m.columns.0.z, m.columns.0.w,
         m.columns.1.x, m.columns.1.y, m.columns.1.z, m.columns.1.w,
         m.columns.2.x, m.columns.2.y, m.columns.2.z, m.columns.2.w,
         m.columns.3.x, m.columns.3.y, m.columns.3.z, m.columns.3.w]
    }

    private static func columnMajor3(_ m: simd_float3x3) -> [Float] {
        [m.columns.0.x, m.columns.0.y, m.columns.0.z,
         m.columns.1.x, m.columns.1.y, m.columns.1.z,
         m.columns.2.x, m.columns.2.y, m.columns.2.z]
    }

    // MARK: - Keyframe encoding

    /// Encodes the YCbCr camera buffer as a JPEG. The encoder performs the
    /// YCbCr→RGB conversion, so the server decodes a standard RGB JPEG and needs
    /// no BT.709 code (see ADR-0009).
    private static func encodeJPEG(_ buffer: CVPixelBuffer, context: CIContext) -> Data {
        let image = CIImage(cvPixelBuffer: buffer)
        let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)
            ?? CGColorSpaceCreateDeviceRGB()
        let options: [CIImageRepresentationOption: Any] = [
            CIImageRepresentationOption(
                rawValue: kCGImageDestinationLossyCompressionQuality as String): 0.95
        ]
        guard let data = context.jpegRepresentation(
            of: image, colorSpace: colorSpace, options: options) else {
            DiagnosticLog.error("encodeJPEG — jpegRepresentation returned nil")
            return Data()
        }
        return data
    }
}
