# Photogrammetry (iPhone Pro)

On-device 3D capture for iPhone Pro. Fuses the rear cameras and the LiDAR scanner
to reconstruct **objects** (Apple Object Capture → `PhotogrammetrySession`) and
**rooms/spaces** (ARKit LiDAR scene reconstruction). All processing is local — no
cloud sync. Outputs: textured mesh (**USDZ/OBJ**), raw LiDAR mesh, and point
cloud (**PLY**). Feature reference: Epic Games RealityScan.

See [`docs/architecture.md`](docs/architecture.md) for a module-by-module "what &
why" map, and [`docs/decision-log.md`](docs/decision-log.md) for the high-level
architecture decisions (ADRs).

## Requirements

- **Hardware:** iPhone 12 Pro or later (LiDAR). The Simulator cannot run
  `PhotogrammetrySession` or LiDAR ARKit — capture/reconstruction must be tested
  on device.
- **Xcode 15+**, iOS 17 deployment target.
- [XcodeGen](https://github.com/yonwoo9/XcodeGen) for project generation:
  `brew install xcodegen`.

## Generate & open the project

```bash
cd source
xcodegen generate        # reads project.yml → Photogrammetry.xcodeproj
open Photogrammetry.xcodeproj
```

## Build & test

Unit tests cover the pure logic (coverage math, capability gating, PLY bytes,
depth deprojection, store/library filesystem, view-model state with fakes). They
run on the Simulator; framework wrappers are validated on device.

```bash
cd source
xcodegen generate
xcodebuild test \
  -project Photogrammetry.xcodeproj \
  -scheme Photogrammetry \
  -destination 'platform=iOS Simulator,name=iPhone 15 Pro'
```

## Layout

```
source/Photogrammetry/
  App/           composition root + @main
  Domain/        pure value types (ScanMode, CaptureCoverage, capability gate…)
  Capture/Object ObjectCaptureSession wrapper + on-disk store
  Capture/Space  ARKit scene-recon wrapper, depth deprojection, point fusion
  Reconstruction PhotogrammetrySession wrapper, MeshBuilder (ARMesh→MDLMesh)
  Export/        PLY writer + Model I/O mesh exporter (USDZ/OBJ)
  Storage/       on-device scan library
  UI/ + ViewModels/   SwiftUI screens (MVVM)
source/PhotogrammetryTests/   unit tests + named fakes
```

Every Apple framework sits behind a project-owned protocol injected via the
composition root (`AppDependencies`), so view models are unit-testable with the
named fakes in `PhotogrammetryTests/Fakes.swift`.

## On-device verification

1. Run on a LiDAR iPhone Pro. The capability gate admits the device; a non-LiDAR
   device shows the exact reason.
2. **Object:** scan a small object → reconstruction completes → USDZ in QuickLook
   → export OBJ/PLY via the share sheet.
3. **Space:** scan a room → live mesh appears → finish writes USDZ mesh + PLY
   point cloud; verify scale/orientation in a desktop viewer.
