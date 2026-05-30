# Architecture & Build Record — what was made and why

This document maps every part of the codebase to its purpose and the reasoning
behind it. It complements [`decision-log.md`](decision-log.md) (high-level ADRs)
and the approved plan. Read this to understand *why each file exists* before
changing it.

> Status: greenfield scaffold. All Apple-framework wrappers are written against
> the documented SDK but **not yet compiled** (developed on Linux without Xcode —
> see [README](../README.md)). Pure-logic modules are unit-tested.

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
   → images+depth+gravity folder            → ARMeshAnchors + depth frames
        │                                        │
        ▼                                        ▼
 PhotogrammetryReconstructor              MeshBuilder (ARMesh→MDLMesh→USDZ)
   (PhotogrammetrySession → USDZ)         DepthFrameSampler→PLYPointCloudExporter
        │                                        │
        └──────────────┬─────────────────────────┘
                       ▼
            ScanLibrary (adopt file → ScanArtifact)
                       ▼
            UI: QuickLook preview + share/export (USDZ/OBJ/PLY)
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
| `ARSceneScanner.swift` | Wraps an ARKit session | Collects/dedupes `ARMeshAnchor`s and fuses depth. **Does not own the `ARSession`** — only one may run at a time and `ARView.session` is read-only, so it attaches as delegate to the preview view's session. |
| `DepthDeprojection.swift` | Pure pinhole back-projection | The geometry most likely to be wrong (intrinsics, the ARKit −Z convention). Pulled out as a pure function and unit-tested. |
| `DepthFrameSampler.swift` | ARFrame depth → world points | Plumbing between `ARDepthData` buffers and `DepthDeprojection`; subsamples + scales intrinsics to the depth-map resolution. |

### Reconstruction/
| File | What | Why |
|---|---|---|
| `ModelReconstructing.swift` | Protocol + `ReconstructionDetail`/`ReconstructionEvent` | Decouples the app from `PhotogrammetrySession.Output`; events stream to the UI; tests use a `FakeModelReconstructor`. |
| `PhotogrammetryReconstructor.swift` | Wraps `PhotogrammetrySession` | The on-device object reconstructor. Streams progress, honors cancellation, maps SDK output to our events. |
| `MeshBuilder.swift` | `ARMeshGeometry` → `MDLMesh` → USDZ/OBJ | The space-mode equivalent of reconstruction: bakes anchor vertices to world space and exports via Model I/O. |

### Export/
| File | What | Why |
|---|---|---|
| `MeshExporting.swift` | Protocol + `MeshExportError` | Thin seam over Model I/O; errors carry the offending path/format. |
| `ModelIOMeshExporter.swift` | USDZ↔OBJ via `MDLAsset` | Same-format requests are a copy; cross-format uses Model I/O. PLY meshes are deliberately rejected (point clouds use the dedicated writer). |
| `PLYPointCloudExporter.swift` | ASCII PLY writer | No native PLY export exists. Pure (serialize then write) so the exact byte layout is golden-file tested. |

### Storage/
| File | What | Why |
|---|---|---|
| `ScanLibrary.swift` | Adopts finished files; lists them newest-first | On-device persistence with the filesystem as source of truth; testable against a temp dir. |

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
| `Reconstruction/ReconstructionProgressView.swift` | Progress + QuickLook result | One `QLPreviewController` bridge reused for previews. |
| `Library/ScanLibraryView.swift` | Lists/previews saved scans | Reads from `ScanLibrary`. |

### PhotogrammetryTests/
Named fakes (`Fakes.swift`) per CLAUDE.md (no inline stubs) + unit tests for all
pure logic and every view-model state transition. `AsyncTestSupport.swift`'s
`eventually` drains view-model `AsyncStream` listeners deterministically (no
sleeps → keeps tests F.I.R.S.T). Framework wrappers are validated on device, not
here.

## 5. What is intentionally NOT here (and why)

- **Gaussian splatting** — no native Apple API; deferred. → ADR-0002.
- **Custom SfM/MVS** — Apple's engine is better/cheaper than a phone reimpl. → ADR-0001.
- **Photo texture projection onto space meshes** — stretch goal; space meshes
  ship untextured for now.
- **Cloud sync** — explicitly out of scope this phase.
- **A checked-in `.xcodeproj`** — generated from `source/project.yml` via XcodeGen
  to keep project config as reviewable text.

## 6. Known follow-ups before first green build (on a Mac)

1. Confirm exact `ObjectCaptureSession` API surface (`Configuration.checkpointDirectory`,
   `startDetecting/startCapturing`, `CaptureState` cases).
2. Confirm `PhotogrammetrySession.Output` case names in the target SDK.
3. Validate `MeshBuilder` Model I/O buffer/descriptor setup on real `ARMeshAnchor`
   data (vertex stride, index width).
4. Verify the single-AR-session wiring (`MeshPreviewView` → `ARSceneScanner.attach`)
   on device.
