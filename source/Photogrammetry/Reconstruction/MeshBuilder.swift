import ARKit
import ModelIO
import simd

/// Accumulates `ARMeshAnchor` geometry into a world-space mesh using exploded
/// vertices (3 unique vertices per face, no sharing). This lets each face
/// receive independent UV coordinates from `UVAtlasPacker` without seams.
///
/// Callers should build a fresh instance per export from the latest anchor set.
final class MeshBuilder {
    // 9 floats per face: (x,y,z) × 3 vertices, world space.
    private var explodedPositions: [Float] = []

    var isEmpty: Bool { explodedPositions.isEmpty }
    var faceCount: Int { explodedPositions.count / 9 }

    /// World-space vertex triplets for each face — consumed by `TextureBaker`.
    var worldFaceVertices: [[SIMD3<Float>]] {
        var result = [[SIMD3<Float>]]()
        result.reserveCapacity(faceCount)
        for i in 0..<faceCount {
            let b = i * 9
            result.append([
                SIMD3(explodedPositions[b],   explodedPositions[b+1], explodedPositions[b+2]),
                SIMD3(explodedPositions[b+3], explodedPositions[b+4], explodedPositions[b+5]),
                SIMD3(explodedPositions[b+6], explodedPositions[b+7], explodedPositions[b+8]),
            ])
        }
        return result
    }

    func add(_ anchor: ARMeshAnchor) {
        if explodedPositions.isEmpty {
            DiagnosticLog.debug(
                "MeshBuilder.add — face bytesPerIndex=\(anchor.geometry.faces.bytesPerIndex)")
        }
        let geometry = anchor.geometry
        let facePtr = geometry.faces.buffer.contents()
        let faceCount = geometry.faces.count
        let perPrimitive = geometry.faces.indexCountPerPrimitive
        let bytesPerIdx = geometry.faces.bytesPerIndex

        for faceIndex in 0..<faceCount {
            for k in 0..<perPrimitive {
                let byteOffset = (faceIndex * perPrimitive + k) * bytesPerIdx
                let vertIdx: Int
                if bytesPerIdx == MemoryLayout<UInt16>.size {
                    vertIdx = Int(facePtr.advanced(by: byteOffset)
                        .assumingMemoryBound(to: UInt16.self).pointee)
                } else {
                    vertIdx = Int(facePtr.advanced(by: byteOffset)
                        .assumingMemoryBound(to: UInt32.self).pointee)
                }
                let local = readVertex(at: vertIdx, from: geometry.vertices)
                let world = anchor.transform * SIMD4<Float>(local, 1)
                explodedPositions.append(contentsOf: [world.x, world.y, world.z])
            }
        }
    }

    /// Exports the mesh as OBJ + MTL. The MTL texture reference is set but
    /// callers should post-process the MTL to ensure a relative path.
    func export(
        to url: URL, layout: UVAtlasLayout, textureURL: URL
    ) throws {
        guard !isEmpty else {
            throw MeshExportError.readFailed(path: url.path)
        }
        let allocator = MDLMeshBufferDataAllocator()
        let mesh = makeMesh(allocator: allocator, layout: layout, textureURL: textureURL)
        let asset = MDLAsset()
        asset.add(mesh)
        try asset.export(to: url)
    }

    // MARK: - Private

    private func makeMesh(
        allocator: MDLMeshBufferDataAllocator,
        layout: UVAtlasLayout,
        textureURL: URL
    ) -> MDLMesh {
        // Build interleaved vertex buffer: float3 position + float2 UV = 20 bytes/vertex.
        var interleaved = [Float]()
        interleaved.reserveCapacity(faceCount * 3 * 5)
        for faceIndex in 0..<faceCount {
            let posBase = faceIndex * 9
            let uvs = faceIndex < layout.faceUVs.count
                ? layout.faceUVs[faceIndex]
                : [SIMD2<Float>.zero, .zero, .zero]
            for k in 0..<3 {
                let pb = posBase + k * 3
                interleaved.append(contentsOf: [
                    explodedPositions[pb], explodedPositions[pb+1], explodedPositions[pb+2],
                    uvs[k].x, uvs[k].y,
                ])
            }
        }

        // Trivial sequential indices (one per vertex, no sharing).
        let vertexCount = faceCount * 3
        let indices = Array(UInt32(0)..<UInt32(vertexCount))

        let vertData = Data(bytes: interleaved, count: interleaved.count * MemoryLayout<Float>.size)
        let idxData = Data(bytes: indices, count: indices.count * MemoryLayout<UInt32>.size)
        let vertBuf = allocator.newBuffer(with: vertData, type: .vertex)
        let idxBuf = allocator.newBuffer(with: idxData, type: .index)

        let material = MDLMaterial(name: "baked", scatteringFunction: MDLScatteringFunction())
        material.setProperty(
            MDLMaterialProperty(name: "map_Kd", semantic: .baseColor, url: textureURL))

        let submesh = MDLSubmesh(
            indexBuffer: idxBuf, indexCount: vertexCount,
            indexType: .uInt32, geometryType: .triangles, material: material)

        let mesh = MDLMesh(
            vertexBuffer: vertBuf, vertexCount: vertexCount,
            descriptor: positionUVDescriptor(), submeshes: [submesh])
        mesh.addNormals(withAttributeNamed: MDLVertexAttributeNormal, creaseThreshold: 0.75)
        return mesh
    }

    private func readVertex(
        at index: Int, from source: ARGeometrySource
    ) -> SIMD3<Float> {
        let base = source.buffer.contents()
            .advanced(by: source.offset + source.stride * index)
            .assumingMemoryBound(to: Float.self)
        return SIMD3<Float>(base[0], base[1], base[2])
    }

    private func positionUVDescriptor() -> MDLVertexDescriptor {
        let d = MDLVertexDescriptor()
        d.attributes[0] = MDLVertexAttribute(
            name: MDLVertexAttributePosition, format: .float3, offset: 0, bufferIndex: 0)
        d.attributes[1] = MDLVertexAttribute(
            name: MDLVertexAttributeTextureCoordinate, format: .float2, offset: 12, bufferIndex: 0)
        d.layouts[0] = MDLVertexBufferLayout(stride: 20)
        return d
    }
}
