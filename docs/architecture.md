# Architecture & Build Record — what was made and why

This document maps every part of the codebase to its purpose and the reasoning
behind it. It complements [`decision-log.md`](decision-log.md) (high-level ADRs)
and the approved plan. Read this to understand *why each file exists* before
changing it.

> Status: first working build. Space-scan pipeline is functional on device:
> LiDAR mesh + keyframe-baked UV texture exported as OBJ+MTL+PNG, previewed in
> SceneKit. Object-capture pipeline compiles; on-device validation pending.

---

## 1. The problem this solves

Capture real-world **objects** and **rooms** in 3D on an iPhone Pro, fusing the
cameras with the LiDAR scanner, and reconstruct **entirely on-device** (no cloud).
Reference product: Epic Games RealityScan — but RealityScan reconstructs in the
cloud, so our differentiator is *local processing* plus *LiDAR as a first-class
input*. Required outputs: textured mesh (USDZ/OBJ), raw LiDAR mesh, point cloud
(PLY).

## 2. Why this shape (the three load-bearing choices)

1. **Hybrid native engine, not a custom SfM/MVS pipeline.** Apple already ships an
   on-device photogrammetry pipeline (`PhotogrammetrySession`) and a LiDAR scene
   mesher (ARKit). Re-implementing Structure-from-Motion + Multi-View-Stereo on a
   phone would be months of work for worse quality. We orchestrate Apple's
   engines instead. → ADR-0001.
2. **Two pipelines, one shared tail.** Objects and rooms have fundamentally
   different capture ergonomics and APIs, so they are separate front-ends that
   converge on a shared reconstruction/export/library tail. → §4.
3. **Every Apple framework behind a thin protocol.** RealityKit/ARKit/Model I/O
   can't run in unit tests or the Simulator. Wrapping each behind a project-owned
   protocol lets the view models (the logic worth testing) run against named
   fakes. → ADR-0004.

## 3. Data flow

```
 OBJECT MODE                              SPACE MODE
 ObjectCaptureScanner                     ARSceneScanner
   (ObjectCaptureSession)                   (ARKit .mesh + .sceneDepth)
   → images+depth+gravity folder            → ARMeshAnchors + CameraKeyframes
        │                                        │
        ▼                                        ▼
 PhotogrammetryReconstructor              MeshBuilder  (exploded vertices)
   (PhotogrammetrySession → USDZ)           │
                                          UVAtlasPacker (per-face atlas cells)
                                            │
                                          TextureBaker  (project keyframes → PNG)
                                            │
                                          OBJ + MTL + PNG
                                          DepthFrameSampler → PLYPointCloudExporter
        │                                        │
        └──────────────┬─────────────────────────┘
                       ▼
            ScanLibrary (adopt OBJ + companions → ScanArtifact)
                       ▼
            SceneKitPreview (OBJ) / QuickLookPreview (USDZ)
```

## 4. Module-by-module: what & why

### Domain/ — pure value types (no frameworks, fully tested)
| File | What | Why |
|---|---|---|
| `ScanMode.swift` | `.object` / `.space` enum | One symbol drives which pipeline + UI is selected; avoids boolean flags scattered around. |
| `ScanArtifact.swift` | Immutable result descriptor + `ModelFormat` | The file on disk is the source of truth; this is its typed handle for the library/UI. |
| `CaptureCoverage.swift` | Yaw-sector occupancy math | The RealityScan-style "have you been all the way around?" feedback. Pure so the angle-wrapping (the easy-to-break part) is unit-tested without a camera. |
| `DeviceCapability.swift` | `DeviceCapabilityProbe` protocol + `CaptureCapabilityGate` | LiDAR/Object-Capture/scene-recon are hard requirements; the gate produces an exact, user-facing reason per mode and is testable via a fake probe. |

### Platform/
| File | What | Why |
|---|---|---|
| `LiveDeviceCapabilityProbe.swift` | Real probe via ARKit/RealityKit | Apple exposes no direct "has LiDAR" flag, so we infer it from `sceneDepth`/`.mesh` support. Isolated here so the gate logic stays pure. |

### Capture/Object/
| File | What | Why |
|---|---|---|
| `ObjectScanning.swift` | `@MainActor` protocol + `ObjectScanState`/`ObjectCaptureStage` value types | The seam that lets the view model run on a `FakeObjectScanner`. Project-owned state types so the UI never imports RealityKit. |
| `ObjectCaptureScanner.swift` | Wraps `ObjectCaptureSession` | Bridges the session's `@Observable` state to an `AsyncStream` and auto-advances `ready→detecting` so the UX is "aim, confirm box, circle". |
| `ObjectCaptureStore.swift` | On-disk layout (images/checkpoint/model) | Object Capture writes to folders; centralizing the paths makes them testable against a temp dir and keeps the scanner focused. |

### Capture/Space/
| File | What | Why |
|---|---|---|
| `SpaceScanning.swift` | `@MainActor` protocol + `SpaceScanState` | Same testability seam for the room pipeline. |
| `ARSceneScanner.swift` | Wraps an ARKit session; collects mesh anchors + camera keyframes | **Does not own the `ARSession`** — only one may run at a time, `ARView.session` is read-only; attaches as delegate. Selects keyframes on ≥0.3 m or ≥15° movement (up to 50) for texture baking. Triggers UV packing + baking at finish time, then patches the MDL-written MTL to use a relative texture path so the file survives being moved to the library. |
| `CameraKeyframe.swift` | Snapshot of one ARFrame for texture projection | Holds `CVPixelBuffer` (YCbCr, retained by strong reference), camera transform, and intrinsics. **No orientation matrix stored** — `camera.transform` is sensor-aligned regardless of interface orientation (confirmed by `DepthDeprojection` tests), so no rotation is needed before applying the intrinsics. |
| `DepthDeprojection.swift` | Pure pinhole back-projection | The geometry most likely to be wrong (intrinsics, the ARKit −Z convention). Pulled out as a pure function and unit-tested. Also serves as the canonical reference for the projection convention used by `TextureBaker`. |
| `DepthFrameSampler.swift` | ARFrame depth → world points | Plumbing between `ARDepthData` buffers and `DepthDeprojection`; subsamples + scales intrinsics to the depth-map resolution. |

### Reconstruction/
| File | What | Why |
|---|---|---|
| `ModelReconstructing.swift` | Protocol + `ReconstructionDetail`/`ReconstructionEvent` | Decouples the app from `PhotogrammetrySession.Output`; events stream to the UI; tests use a `FakeModelReconstructor`. |
| `PhotogrammetryReconstructor.swift` | Wraps `PhotogrammetrySession` | The on-device object reconstructor. Streams progress, honors cancellation, maps SDK output to our events. |
| `MeshBuilder.swift` | `ARMeshGeometry` → exploded vertex OBJ with UV | Uses **exploded vertices** (3 unique per face, no sharing) so each face can have independent UV coordinates without seam handling. Reads face indices as UInt16 or UInt32 based on `bytesPerIndex` — ARKit uses UInt16 but the field is checked rather than assumed. Exports via `MDLAsset` with a single submesh referencing the baked PNG texture. |
| `YCbCrSampler.swift` | Sample colour from ARKit's `capturedImage` | ARKit provides `CVPixelBuffer` in `kCVPixelFormatType_420YpCbCr8BiPlanarFullRange`. Samples Y (full-res plane 0) and CbCr (half-res plane 1) with safe lock/unlock. Converts using **BT.709** coefficients — iPhone cameras output Rec.709, not BT.601; using BT.601 oversaturates red/blue. |
| `UVAtlasPacker.swift` | Assigns each face a square atlas cell | Row-major packing; cell size auto-scales so the 2048×2048 atlas is well-utilised regardless of face count. **UV V is stored in OBJ convention (V=0 at bottom)** because SceneKit flips V on load to convert to Metal's V=0-at-top. The baker bakes in pixel/Metal convention, so the flip in the UV coords and the flip on load cancel correctly. |
| `TextureBaker.swift` | Projects keyframes onto atlas texels | Per-texel: compute barycentric world position, find the keyframe with the best facing angle (`dot(faceNormal, toCamera)`), project via `camera.transform.inverse` + raw intrinsics (sensor-aligned, no extra rotation), sample YCbCr. Returns raw RGBA `Data`; converts to PNG via `CGContext`+`UIImage`. |

### Export/
| File | What | Why |
|---|---|---|
| `MeshExporting.swift` | Protocol + `MeshExportError` | Thin seam over Model I/O; errors carry the offending path/format. |
| `ModelIOMeshExporter.swift` | USDZ↔OBJ via `MDLAsset` | Same-format requests are a copy; cross-format uses Model I/O. PLY meshes are deliberately rejected (point clouds use the dedicated writer). |
| `PLYPointCloudExporter.swift` | ASCII PLY writer | No native PLY export exists. Pure (serialize then write) so the exact byte layout is golden-file tested. |

### Storage/
| File | What | Why |
|---|---|---|
| `ScanLibrary.swift` | Adopts finished files + companions; lists primary models newest-first | On-device persistence with the filesystem as source of truth; testable against a temp dir. **Companion files** (`.mtl`, `_tex.png`) are moved alongside the primary OBJ so SceneKit can resolve both. `storedFileURLs()` filters to known `ModelFormat` extensions so companions don't appear as library items. Files are stored with their UUID-prefixed scratch name (not renamed) so OBJ/MTL/PNG stems match what the OBJ header references. |

### App/ — composition root
| File | What | Why |
|---|---|---|
| `AppDependencies.swift` | Builds concrete impls once, injects down | Single wiring point; per CLAUDE.md no view reaches into a global singleton. Swap any field for a fake in tests/previews. |
| `PhotogrammetryApp.swift` | `@main` | Hands the live graph to `RootView`. |

### ViewModels/ (MVVM, `@Observable`, depend only on protocols)
| File | What | Why |
|---|---|---|
| `ObjectCaptureViewModel.swift` | Mirrors scanner state; signals images-ready | Capture-screen logic, unit-tested with `FakeObjectScanner`. |
| `ReconstructionViewModel.swift` | Runs reconstruction; adopts result | Progress→library handoff, tested with `FakeModelReconstructor`. |
| `SpaceScanViewModel.swift` | Runs LiDAR scan; writes mesh+PLY | Room pipeline logic, tested with `FakeSpaceScanner`. |

### UI/ (SwiftUI)
| File | What | Why |
|---|---|---|
| `RootView.swift` | Tabs + mode selection gated by capability | Entry point; blocks unsupported devices with the exact reason. |
| `Capture/ObjectCaptureContainer.swift` | `ObjectCaptureView` + custom overlays | Keeps Apple's reconstruction guidance while delivering the custom RealityScan-style look. → ADR-0003. |
| `Capture/CoverageHeatmapOverlay.swift` | Sector ring + photo count | Visualizes `CaptureCoverage`; purely presentational. |
| `Capture/ObjectCaptureFlowView.swift` | Object capture→reconstruct orchestration | Owns the concrete scanner (needed to render the view) while the VM uses the protocol. |
| `Capture/SpaceScanFlowView.swift` | Live `ARView` mesh + finish/export | `MeshPreviewView` owns the single AR session and hands it to the scanner. |
| `Reconstruction/ReconstructionProgressView.swift` | Progress + model preview | Houses `QuickLookPreview` (USDZ/Reality via `QLPreviewController`) and `SceneKitPreview` (OBJ via `SCNView`). `ModelPreview` dispatches by file extension — QuickLook only shows interactive 3D for USDZ/Reality; OBJ needs SceneKit. |
| `Library/ScanLibraryView.swift` | Lists/previews saved scans | Reads from `ScanLibrary`; uses `ModelPreview` for format-aware display. |

### PhotogrammetryTests/
Named fakes (`Fakes.swift`) per CLAUDE.md (no inline stubs) + unit tests for all
pure logic and every view-model state transition. `AsyncTestSupport.swift`'s
`eventually` drains view-model `AsyncStream` listeners deterministically (no
sleeps → keeps tests F.I.R.S.T). Framework wrappers are validated on device, not
here.

## 5. What is intentionally NOT here (and why)

- **Gaussian splatting** — no native Apple API; deferred. → ADR-0002.
- **Custom SfM/MVS** — Apple's engine is better/cheaper than a phone reimpl. → ADR-0001.
- **Occlusion testing in texture baking** — the baker picks the best facing angle
  but does not depth-test against other geometry. Surfaces occluded by furniture
  may sample the wrong keyframe. Fixing this requires storing the depth map per
  keyframe and doing a reprojection depth test — deferred.
- **Dense UV unwrapping (xatlas-style)** — no xatlas on iOS. Per-face atlas cells
  (current approach) give 50% atlas utilisation but no seam optimisation. Could
  be improved with a native Swift port of LSCM/ABF.
- **Cloud sync** — explicitly out of scope this phase.
- **A checked-in `.xcodeproj`** — generated from `source/project.yml` via XcodeGen
  to keep project config as reviewable text.

## 6. Known follow-ups

1. Validate `ObjectCaptureSession` API surface on device (capture→reconstruct flow).
2. Add depth-test occlusion check in `TextureBaker` using stored keyframe depth maps.
3. Increase atlas resolution or cell size dynamically for very large spaces (>65k faces).
4. Consider `ARCamera.projectPoint(_:orientation:viewportSize:)` as an alternative
   projection path if the direct intrinsics approach shows colour drift for extreme
   off-axis views.
