import Foundation
import ModelIO

/// Production `MeshExporting` backed by Model I/O (`MDLAsset`), which can read
/// USD and export OBJ/USD. PLY meshes are out of scope here (point clouds use
/// `PLYPointCloudExporter`); requesting PLY mesh export throws.
struct ModelIOMeshExporter: MeshExporting {
    func export(
        from sourceURL: URL,
        to destinationURL: URL,
        as format: ModelFormat
    ) throws {
        if sourceURL.pathExtension.lowercased() == format.fileExtension {
            try FileManager.default.copyItem(at: sourceURL, to: destinationURL)
            return
        }
        guard MDLAsset.canExportFileExtension(format.fileExtension) else {
            throw MeshExportError.unsupportedConversion(
                from: sourceURL.pathExtension, to: format)
        }
        let asset = MDLAsset(url: sourceURL)
        try asset.export(to: destinationURL)
    }
}
