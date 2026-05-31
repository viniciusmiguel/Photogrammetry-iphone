# Decision Log

Architectural decisions for the on-device iPhone photogrammetry app.
Newest first. Each entry: context → decision → consequences.

## ADR-0013 — Reprocess endpoint: re-run processing on stored raw data

**Date:** 2026-05-31

**Context.** Texturing/processing improved repeatedly (multi-view baking,
occlusion, future atlas fixes). Re-capturing every scan from the phone to pick
up a server-side change is slow, and the raw sensor data is already stored.

**Decision.** Add `POST /api/scans/{id}/reprocess`, which re-enqueues the scan's
stored `raw/` data through the current pipeline (using the scan's own mode) and
overwrites `processed/`. A **Reprocess** button on the scan detail page calls it,
polls to completion (logs stream live over SSE), and re-mounts the 3D viewer so
it reloads the regenerated mesh/texture. The file endpoint now sends
`Cache-Control: no-cache` (with `Last-Modified`) so reprocessed output is fetched
instead of a stale cached copy; `http.ServeFile` answers conditional requests
with 304 when unchanged.

**Consequences.** Algorithm changes can be applied to existing scans in seconds.
`server/cmd/diag <scanDir> rebake` does the same from the CLI for debugging.

## ADR-0012 — Blender synthetic ground truth; real-data ghosting is ARKit pose drift, not a storage bug

**Date:** 2026-05-31

**Context.** Real scans showed texture ghosting (an object duplicated onto
nearby/perpendicular walls) that was hard to attribute — projection? UV? atlas?
viewer? serialization? Self-reprojection tests are circular (the same projection
places and colors a face, so any self-consistent error hides).

**Decision.** Build an **independent** ground truth in Blender
(`/tmp/blender_truth.py`, regenerable): a Y-up room with grid walls (scale +
perspective), an in-scene XYZ axis gizmo, a protruding "fumehood", and distinct
colored markers, rendered shadeless (emission = albedo) through cameras
constructed in the exact ARKit intrinsics convention. A built-in self-check
confirms the server's projection formula matches Blender's own
`world_to_camera_view` to ~0 px. The render + camera poses + mesh + point cloud
are exported in the upload wire format and POSTed like a real scan.

**Findings.** (1) The baked result reproduces the Blender render exactly — so
projection, UV mapping, occlusion, and view selection are **correct**. (2)
Re-rendering with cameras rolled 90° (portrait-held phone → sideways landscape
image, like the real iPhone) still bakes perfectly — **the 90° image rotation is
handled, not a bug**; it is just ARKit's raw sensor orientation, which the camera
transform encodes. (3) Injecting a small rigid perturbation into the *exported*
camera transforms (render from the true pose, tell the server a slightly wrong
one) **reproduces the exact ghosting**. So the real-world ghosting is **ARKit SLAM
pose drift** — the stored poses are inherently imperfect — not a serialization
error. Forensic inspection of a real scan (keyframe dims = meta resolution,
sane landscape intrinsics, transforms encoding the portrait roll, 14-anchor
geometry reconstructed correctly) confirmed: nothing is mis-stored.

**Consequences.** `server/cmd/diag` (per-keyframe reprojection, geometry render,
web-pose render) and `blender_truth.py` are kept as the validation harness.
Reducing drift ghosting requires keyframe pose refinement (deferred); view-
consolidation (`PHOTOG_SEAM_LAMBDA`) does not help it.

## ADR-0011 — Display the baked texture UNLIT in the web viewer

**Date:** 2026-05-31

**Context.** The three.js viewer rendered correct textures dark and unevenly
shaded — a large part of why scans looked "broken." `MTLLoader` builds a
`MeshPhongMaterial` and uses the baked texture as a *diffuse map*, so three.js
multiplies it by the scene lights. But a photogrammetry texture is already the
final photographic color (the camera images *are* the lighting).

**Decision.** After load, replace each material with an unlit
`THREE.MeshBasicMaterial` carrying the baked map (sRGB), so the model reproduces
the baked atlas at full brightness regardless of scene lights. Verified against
the Blender ground truth: the viewer now matches the known-correct render.

**Consequences.** Lights remain for the gizmo only. A separate earlier fix made
the gizmo render loop robust: the main scene pass keeps `autoClear` on (cleared
every frame, so a stale Vite-HMR render loop can no longer accumulate/ghost the
mesh), with auto-clear disabled only transiently for the corner ViewHelper.

## ADR-0010 — Multi-view texturing (graph-cut view selection + occlusion + seam leveling)

**Date:** 2026-05-31

**Context.** The ported per-face baker (ADR-0005) picked, per face, the single
best-*facing* keyframe and sampled whatever pixel it projected to — with no
visibility test. Around a protruding object this ghosts it onto hidden/adjacent
and perpendicular surfaces. A naive occlusion pass made it worse: rejecting the
occluded best view and *falling back* to oblique views spread the ghost across
several keyframes (multiple duplicates).

**Decision.** Replace per-face best-keyframe selection with proper multi-view
texturing, reusing the existing per-face atlas/UV/OBJ export:
1. **Occlusion** — rasterize a depth map per keyframe; a face occluded at its
   projection is an invalid view.
2. **Data term** — per-(face,view) cost = projected area, gated by occlusion /
   frustum / front-facing; normalized per face.
3. **View selection** — graph-cut **alpha-expansion** (Dinic max-flow,
   Kolmogorov–Zabih submodular Potts reduction) minimizes data cost + a Potts
   seam penalty, so occluded views are never chosen and adjacent faces stay
   consistent. Faces with no valid view get neutral fill (no ghost).
4. **Seam leveling** — per-vertex additive color correction toward the mean of
   all views meeting at a shared vertex, so seams between differently-textured
   faces are C0-continuous.

Modules: `view_scoring.go`, `depth_map.go`, `graphcut.go`, `seam_leveling.go`,
`adjacency.go` (face adjacency rebuilt from the exploded mesh), orchestrated by
`multiview_texturer.go`. `PHOTOG_SEAM_LAMBDA` tunes the seam weight.

**Consequences.** Ghosting from occlusion is eliminated (validated on ground
truth); residual ghosting comes from pose drift (ADR-0012), not view selection.
~8 s to bake ~60–75 k faces. Graph-cut cost grows with face count. The per-face
atlas is still low-detail (faceted), and overflows past 65 k faces (known issue,
see [`texturing-pipeline.md`](texturing-pipeline.md)).

## ADR-0009 — Shift photogrammetry processing to a local Go server

**Date:** 2026-05-31

**Context.** On-device processing limits visibility into the reconstruction pipeline
(hard to inspect raw sensor data, no structured logs, no remote UI). Object Capture
reconstruction quality is capped by iOS's `.reduced` detail ceiling on
`PhotogrammetrySession`. The phone, server, and developer machine are all on the same
local network.

**Decision.** After capture finishes the iOS app transmits raw sensor data to a Go
HTTP server on the LAN instead of processing on-device:

- **Space Scan**: sends `ARMeshAnchor` binary + JPEG-encoded keyframes (Q95) + PLY
  point cloud. Server replicates the OBJ+texture-bake pipeline in Go (ports of
  `MeshBuilder`, `UVAtlasPacker`, `TextureBaker`).
- **Object Capture**: sends raw HEIC images as multipart parts. Server runs COLMAP
  for photogrammetry reconstruction.

A React+Tailwind+Three.js web UI is served from the same Go binary, showing raw sensor
data (keyframe browser, point cloud stats) and the final reconstructed mesh in a 3D
viewer, plus a live SSE log stream for troubleshooting.

The iOS app retains the existing on-device code paths as an **offline fallback**
(activated when no server host is configured in the new Settings tab).

**Consequences.**
- Full reconstruction pipeline visible and debuggable via structured JSON logs and the
  web UI.
- Object Capture quality no longer capped by iOS's `.reduced` ceiling (COLMAP can run
  at full resolution).
- Adds operational dependency: COLMAP must be installed on the server machine
  (`brew install colmap`).
- Space Scan wire format (binary mesh anchors + JPEG keyframes) must be kept in sync
  between iOS serialiser and Go deserialiser; documented in `docs/server-architecture.md`.
- BT.709 YCbCr→RGB conversion is moved to the iOS JPEG encoder (absorbed by the
  standard JPEG pipeline) rather than replicated in Go.
- See `docs/server-architecture.md` for full implementation plan.

## ADR-0008 — camera.transform is sensor-aligned; no orientation rotation in TextureBaker

**Date:** 2026-05-31

**Context.** Initial attempt at texture baking projected world points to sensor
pixel coordinates using `camera.transform.inverse` + raw intrinsics, which gave
correct results in some areas but wrong colors in "large sections." A subsequent
fix added a `displayToSensor` rotation matrix per keyframe to account for the
assumption that `camera.transform` is display-aligned while intrinsics are
sensor-aligned.

**Decision.** Remove the `displayToSensor` rotation entirely. `camera.transform`
is **sensor-aligned** for all interface orientations. Evidence: `DepthDeprojection`
uses `cameraTransform` (= `ARCamera.transform`) with the raw sensor intrinsics and
produces correct world-space points regardless of device orientation. The inverse
(world → sensor pixel) uses the same convention: `camera.transform.inverse *
worldPoint` gives sensor-aligned camera space; applying intrinsics directly gives
correct sensor pixel coordinates. The live mesh preview confirms geometry is
correct; only the colour sampling formula matters.

**Consequences.** Projection code is simpler (no per-keyframe matrix). Incorrect
rotation was swapping the X/Y axes of the projection and causing an effective 90°
colour rotation in portrait mode.

## ADR-0007 — UV V-axis in OBJ must be OBJ-convention (V=0 at bottom)

**Date:** 2026-05-31

**Context.** The baked PNG texture is written in Metal/pixel convention (V=0 at
top). SceneKit flips V when loading OBJ (converts OBJ's V=0-at-bottom to Metal's
V=0-at-top). If UV coords are stored in pixel convention in the OBJ, SceneKit's
flip doubles the inversion and every face samples the vertically mirrored atlas
region.

**Decision.** Store UV V in OBJ convention in `UVAtlasPacker`
(`vOBJ = 1 − vPixel`). SceneKit's load-time flip then cancels this, and Metal
samples the correct row of the PNG. Texture baking remains in pixel convention
(unchanged).

**Consequences.** UV V values in the OBJ are inverted relative to the atlas pixel
rows; this is intentional and must be preserved if the exporter changes.

## ADR-0006 — Space mesh exports OBJ, not USDZ

**Date:** 2026-05-31

**Context.** `MeshBuilder` originally targeted USDZ via `MDLAsset.export(to:)`.
On device, this threw `MDLErrorDomain error 0`. Debugging showed
`MDLAsset.canExportFileExtension("usdz")` returns `false` on the test device,
meaning Model I/O's USDZ exporter is unavailable in this configuration. OBJ
export (`canExportFileExtension("obj")`) always returns `true`.

**Decision.** Export space-mode scans as OBJ + MTL + PNG. `ScanLibrary` adopts
all three files together (UUID-prefixed names prevent collisions between scans).
The MTL is patched after Model I/O writes it to use a relative `map_Kd` path so
the trio remains loadable after being moved to the library folder. `QuickLook`
does not render OBJ as interactive 3D, so a `SceneKitPreview` (`SCNView` with
`allowsCameraControl`) is used instead for the library and post-scan views.

**Consequences.** No AR Quick Look share sheet for space scans. USDZ share could
be re-enabled if a device where `canExportFileExtension("usdz")` returns `true`
is validated. `ModelFormat.usdz` is still used by the object-capture path.

## ADR-0005 — Keyframe-based UV texture baking for space scans

**Date:** 2026-05-31

**Context.** ARKit's `ARMeshGeometry` provides geometry and semantic
classification but no per-vertex colour. Initial export used per-face
classification colours (wall=red, floor=blue, …) which was visually useful but
not photorealistic.

**Decision.** Bake real camera colour onto the mesh using a keyframe projection
approach:

1. **Keyframe capture** (`ARSceneScanner`): store up to 50 `CameraKeyframe`
   snapshots during scanning, selected when the camera moves >0.3 m or rotates
   >15° since the last keyframe. Each frame retains its `CVPixelBuffer`
   (YCbCr biplanar, ~4 MB), camera transform, and intrinsics. 50 frames × 4 MB
   = ~200 MB peak — acceptable on modern iPhones.

2. **Exploded vertex mesh** (`MeshBuilder`): restructure from indexed+shared
   vertices to 3 unique vertices per face. This lets each face receive independent
   UV coordinates without UV seam handling.

3. **Per-face atlas packing** (`UVAtlasPacker`): row-major assignment of fixed
   square cells in a 2048×2048 atlas. Cell size auto-scales to face count. All
   cells are the same size, so `TextureBaker` can reverse-map any atlas pixel to
   its owning face via integer division — no lookup table.

4. **Texture baking** (`TextureBaker`): for each atlas texel, compute barycentric
   world position, find the keyframe where the face is most directly facing the
   camera (`dot(faceNormal, toCamera)` maximum), project through
   `camera.transform.inverse` + intrinsics, sample `YCbCrSampler`.

5. **Colour conversion** (`YCbCrSampler`): BT.709 full-range coefficients, not
   BT.601 — iPhone cameras output Rec.709; BT.601 shifts saturation noticeably.

**Consequences.** Baking takes ~0.5–2 s on device (CPU-bound; acceptable behind
the existing processing indicator). No occlusion test — surfaces behind furniture
may sample wrong keyframes (known follow-up, see §6). Atlas is limited to ~65k
faces at cell size 8; larger spaces are handled by the auto-scaling cell size.

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
