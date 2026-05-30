import ARKit
import ModelIO
import simd

/// Accumulates `ARMeshAnchor` geometry into a single world-space mesh and
/// exports it via Model I/O (USDZ/OBJ). Each anchor's vertices are baked into
/// world space using its transform, and face indices are offset so multiple
/// anchors share one buffer.
final class MeshBuilder {
    private var positions: [Float] = []      // x,y,z triples (world space)
    private var indices: [UInt32] = []

    var isEmpty: Bool { indices.isEmpty }

    /// Appends one mesh anchor. Safe to call repeatedly as anchors update;
    /// callers should rebuild from the latest anchor set rather than double-add.
    func add(_ anchor: ARMeshAnchor) {
        let geometry = anchor.geometry
        let baseVertex = UInt32(positions.count / 3)
        appendVertices(geometry.vertices, transform: anchor.transform)
        appendFaces(geometry.faces, baseVertex: baseVertex)
    }

    /// Builds an `MDLAsset` from the accumulated mesh and exports it to `url`.
    func export(to url: URL) throws {
        guard !isEmpty else {
            throw MeshExportError.readFailed(path: url.path)
        }
        let allocator = MDLMeshBufferDataAllocator()
        let mesh = makeMesh(allocator: allocator)
        let asset = MDLAsset(bufferAllocator: allocator)
        asset.add(mesh)
        try asset.export(to: url)
    }

    private func appendVertices(
        _ source: ARGeometrySource, transform: simd_float4x4
    ) {
        for i in 0..<source.count {
            let local = readVertex(at: i, from: source)
            let world = transform * SIMD4<Float>(local, 1)
            positions.append(contentsOf: [world.x, world.y, world.z])
        }
    }

    private func appendFaces(_ faces: ARGeometryElement, baseVertex: UInt32) {
        let pointer = faces.buffer.contents()
        let perPrimitive = faces.indexCountPerPrimitive
        let total = faces.count * perPrimitive
        for j in 0..<total {
            let raw = pointer
                .advanced(by: j * faces.bytesPerIndex)
                .assumingMemoryBound(to: UInt32.self).pointee
            indices.append(baseVertex + raw)
        }
    }

    private func readVertex(
        at index: Int, from source: ARGeometrySource
    ) -> SIMD3<Float> {
        let base = source.buffer.contents()
            .advanced(by: source.offset + source.stride * index)
            .assumingMemoryBound(to: Float.self)
        return SIMD3<Float>(base[0], base[1], base[2])
    }

    private func makeMesh(allocator: MDLMeshBufferDataAllocator) -> MDLMesh {
        let vertexData = Data(bytes: positions,
                              count: positions.count * MemoryLayout<Float>.size)
        let indexData = Data(bytes: indices,
                             count: indices.count * MemoryLayout<UInt32>.size)
        let vertexBuffer = allocator.newBuffer(
            with: vertexData, type: .vertex)
        let indexBuffer = allocator.newBuffer(with: indexData, type: .index)
        let submesh = MDLSubmesh(
            indexBuffer: indexBuffer, indexCount: indices.count,
            indexType: .uInt32, geometryType: .triangles, material: nil)
        let mesh = MDLMesh(
            vertexBuffer: vertexBuffer, vertexCount: positions.count / 3,
            descriptor: positionDescriptor(), submeshes: [submesh])
        return mesh
    }

    private func positionDescriptor() -> MDLVertexDescriptor {
        let descriptor = MDLVertexDescriptor()
        descriptor.attributes[0] = MDLVertexAttribute(
            name: MDLVertexAttributePosition, format: .float3,
            offset: 0, bufferIndex: 0)
        descriptor.layouts[0] = MDLVertexBufferLayout(
            stride: MemoryLayout<Float>.size * 3)
        return descriptor
    }
}
