import simd

/// Packed layout for a square texture atlas where every face occupies one
/// equally-sized rectangular cell. All cells share the same `cellSize`, so
/// `TextureBaker` can reverse-map any atlas pixel to its owning face with
/// simple integer division — no lookup table needed.
struct UVAtlasLayout {
    /// One UV triplet per face ([v0, v1, v2]), normalised to [0, 1].
    let faceUVs: [[SIMD2<Float>]]
    /// Top-left atlas pixel coordinate per face.
    let cellOrigins: [SIMD2<Int>]
    let cellSize: Int
    let atlasSize: Int
}

/// Assigns each mesh face a square cell in a 2D atlas using row-major packing.
/// Cell size is chosen so the atlas is well-utilised for the given face count.
enum UVAtlasPacker {
    /// - Parameters:
    ///   - faceCount: Total number of triangles in the mesh.
    ///   - atlasSize: Edge length of the square atlas in pixels (default 2048).
    static func pack(faceCount: Int, atlasSize: Int = 2048) -> UVAtlasLayout {
        let cellSize = max(8, Int(sqrt(Double(atlasSize * atlasSize)
            / Double(max(1, faceCount)))))
        let cellsPerRow = max(1, atlasSize / cellSize)
        let inv = Float(atlasSize)

        var faceUVs: [[SIMD2<Float>]] = []
        var cellOrigins: [SIMD2<Int>] = []
        faceUVs.reserveCapacity(faceCount)
        cellOrigins.reserveCapacity(faceCount)

        for i in 0..<faceCount {
            let col = i % cellsPerRow
            let row = i / cellsPerRow
            let cx = col * cellSize
            let cy = row * cellSize

            // Fixed vertex positions within the cell (pixel coords, y-down):
            //   v0 → top-left    v1 → top-right    v2 → bottom-centre
            // TextureBaker relies on this fixed arrangement for barycentric math.
            let u0 = (Float(cx) + 0.5) / inv
            let u1 = (Float(cx + cellSize) - 0.5) / inv
            let u2 = (Float(cx) + Float(cellSize) * 0.5) / inv
            // V is flipped to OBJ convention (V=0 at bottom, V=1 at top) so
            // SceneKit's V-flip on load converts back to Metal's V=0-at-top,
            // matching the PNG texture baked in pixel (V-down) convention.
            let vTopOBJ = 1.0 - (Float(cy) + 0.5) / inv
            let vBotOBJ = 1.0 - (Float(cy + cellSize) - 0.5) / inv

            faceUVs.append([SIMD2(u0, vTopOBJ), SIMD2(u1, vTopOBJ), SIMD2(u2, vBotOBJ)])
            cellOrigins.append(SIMD2(cx, cy))
        }

        return UVAtlasLayout(
            faceUVs: faceUVs, cellOrigins: cellOrigins,
            cellSize: cellSize, atlasSize: atlasSize)
    }
}
