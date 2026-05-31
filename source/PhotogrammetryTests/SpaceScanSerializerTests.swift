import XCTest
import simd
@testable import Photogrammetry

/// Validates the exact byte layout of the mesh-anchor wire format. This is the
/// contract the Go server's `storage/binary.go` parses, so any change here must
/// be mirrored there (ADR-0009).
final class SpaceScanSerializerTests: XCTestCase {
    func test_emptyAnchorListWritesOnlyCount() {
        let blob = SpaceScanSerializer.meshAnchorBlob([])
        XCTAssertEqual(blob.count, 4)
        var reader = BlobReader(blob)
        XCTAssertEqual(reader.uint32(), 0)
    }

    func test_anchorBlobRoundTrips() {
        let anchor = SerializedMeshAnchor(
            anchorID: UUID(),
            transform: (0..<16).map { Float($0) },
            localVertices: [SIMD3(1, 2, 3), SIMD3(4, 5, 6), SIMD3(7, 8, 9)],
            faceIndices: [0, 1, 2],
            originalBytesPerIndex: 2)

        let blob = SpaceScanSerializer.meshAnchorBlob([anchor])
        var reader = BlobReader(blob)

        XCTAssertEqual(reader.uint32(), 1)                  // anchor count
        XCTAssertEqual(reader.uuidBytes(), anchor.anchorID.uuidBytes)
        XCTAssertEqual(reader.floats(16), anchor.transform)

        XCTAssertEqual(reader.uint32(), 3)                  // vertex count
        XCTAssertEqual(reader.uint32(), 12)                 // vertex stride
        XCTAssertEqual(reader.floats(9), [1, 2, 3, 4, 5, 6, 7, 8, 9])

        XCTAssertEqual(reader.uint32(), 1)                  // face count
        XCTAssertEqual(reader.uint32(), 4)                  // bytesPerIndex (widened)
        XCTAssertEqual(reader.uint32(), 0)
        XCTAssertEqual(reader.uint32(), 1)
        XCTAssertEqual(reader.uint32(), 2)
        XCTAssertTrue(reader.isAtEnd)
    }

    func test_multipleAnchorsAreConcatenated() {
        let make = { (id: UUID) in
            SerializedMeshAnchor(
                anchorID: id, transform: Array(repeating: 0, count: 16),
                localVertices: [SIMD3(0, 0, 0)], faceIndices: [],
                originalBytesPerIndex: 4)
        }
        let blob = SpaceScanSerializer.meshAnchorBlob([make(UUID()), make(UUID())])
        var reader = BlobReader(blob)
        XCTAssertEqual(reader.uint32(), 2)
    }
}

private extension UUID {
    var uuidBytes: [UInt8] {
        var raw = uuid
        return withUnsafeBytes(of: &raw) { Array($0) }
    }
}

/// Minimal little-endian reader mirroring how the Go server parses the blob.
private struct BlobReader {
    private let data: [UInt8]
    private var offset = 0

    init(_ data: Data) { self.data = Array(data) }

    var isAtEnd: Bool { offset == data.count }

    mutating func uint32() -> UInt32 {
        let slice = data[offset..<offset + 4]
        offset += 4
        return slice.reversed().reduce(0) { ($0 << 8) | UInt32($1) }
    }

    mutating func floats(_ count: Int) -> [Float] {
        (0..<count).map { _ in Float(bitPattern: uint32()) }
    }

    mutating func uuidBytes() -> [UInt8] {
        let slice = Array(data[offset..<offset + 16])
        offset += 16
        return slice
    }
}
