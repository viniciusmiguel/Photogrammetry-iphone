# Decision Log

Architectural decisions for the on-device iPhone photogrammetry app.
Newest first. Each entry: context → decision → consequences.

## ADR-0001 — Hybrid native engine (Object Capture + ARKit LiDAR mesh)

**Date:** 2026-05-30

**Context.** We need on-device 3D capture for both bounded *objects* and larger
*rooms/spaces* on iPhone Pro (LiDAR). Options considered: (a) Apple Object Capture
only, (b) a custom Structure-from-Motion / Multi-View-Stereo pipeline, (c) hybrid.

**Decision.** Hybrid.
- **Objects** → `RealityKit.ObjectCaptureSession` for guided capture +
  `PhotogrammetrySession` for on-device reconstruction (USDZ). LiDAR depth and
  gravity are fed as per-image samples to improve metric scale and low-texture
  surfaces.
- **Spaces** → ARKit `sceneReconstruction = .mesh` (`ARMeshAnchor`) plus
  `frameSemantics = .sceneDepth` for a fused point cloud. Exported directly as
  mesh; no PhotogrammetrySession on this path.

**Consequences.** Best quality-per-effort; fully on-device. We do *not* control
the photogrammetry algorithm internals (acceptable). A custom SfM/MVS pipeline is
rejected for now (very large effort, hard on-device).

## ADR-0002 — Outputs: textured mesh (USDZ/OBJ), raw LiDAR mesh, point cloud (PLY)

**Date:** 2026-05-30

**Decision.** Ship USDZ (native), OBJ (via Model I/O `MDLAsset`), raw LiDAR mesh
(from `ARMeshGeometry`), and PLY point clouds (custom writer). **Gaussian
splatting is deferred** — no native Apple API; revisit as a stretch goal.

## ADR-0003 — Custom RealityScan-style capture UI

**Date:** 2026-05-30

**Decision.** Custom SwiftUI capture experience (coverage heatmap, photo count,
shutter). For the object path we overlay custom UI on `ObjectCaptureView` to keep
Apple's reconstruction quality + live point-cloud/bounding-box guidance. The space
path is fully custom ARKit UI.

**Fallback (documented, not chosen).** If overlay limits become blocking, switch
the object path to manual AVFoundation capture feeding `PhotogrammetrySession`
samples directly — full UI control at the cost of rebuilding guidance.

## ADR-0004 — Thin protocol wrappers + MVVM + XcodeGen

**Date:** 2026-05-30

**Decision.** Every Apple framework (RealityKit, ARKit, Model I/O, AVFoundation)
sits behind a project-owned protocol, injected via initializer (no global
singletons), so MVVM view models are unit-testable with named fake classes. The
Xcode project is generated from a text `project.yml` via **XcodeGen** for
reviewable, reproducible project config.

**Consequences.** Hardware-dependent code (sessions) is validated by on-device
manual runs; pure logic (coverage math, PLY bytes, capability gating, USD→OBJ) is
covered by `xcodebuild test`.
