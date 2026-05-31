# Server Architecture Plan — iOS → Go API + React Web UI

> **Status:** implemented. This is the original plan. The space-scan texturing
> later evolved beyond a straight port of the Swift baker — see
> [`texturing-pipeline.md`](texturing-pipeline.md) for the as-built multi-view
> texturer, viewer, reprocess endpoint, and diagnostics, and ADR-0009–0013 in
> [`decision-log.md`](decision-log.md) for the rationale.

## Context

The original app processed all photogrammetry on-device. This plan shifts processing
to a local-network Go server, adds a React+Tailwind+Three.js web UI for inspection,
and adds a Settings tab to the iOS app for server configuration.

- **Object Capture processing**: COLMAP subprocess on the server (`brew install colmap`)
- **Space Scan upload**: truly raw sensor data — `ARMeshAnchor` geometry + YCbCr keyframes
  (JPEG-encoded) + PLY point cloud; server replicates the OBJ+texture-bake pipeline in Go
- **Offline fallback**: both pipelines keep the current on-device path when no server is configured

---

## Phase 1 — iOS: Settings, Upload Infrastructure, ViewModel Changes

### New files

| File | Purpose |
|---|---|
| `source/Photogrammetry/App/ServerSettings.swift` | `ServerSettings` struct (host, port, `baseURL`, `isConfigured`), UserDefaults persistence |
| `source/Photogrammetry/App/ServerSettingsStore.swift` | `@Observable ServerSettingsStore` — auto-saves on `didSet`, passed through `AppDependencies` |
| `source/Photogrammetry/Upload/ScanUploadService.swift` | `ScanUploadService` protocol, `UploadEvent` enum, `SpaceScanPayload`, `ObjectScanPayload` |
| `source/Photogrammetry/Upload/SpaceScanSerializer.swift` | Converts `[ARMeshAnchor]` + `[CameraKeyframe]` + `[ColoredPoint]` → `SpaceScanPayload` |
| `source/Photogrammetry/Upload/HTTPScanUploadService.swift` | `actor HTTPScanUploadService` — streams multipart upload via `URLSessionUploadTask`, reports per-byte progress |
| `source/Photogrammetry/ViewModels/UploadViewModel.swift` | `@Observable UploadViewModel` — mirrors `ReconstructionViewModel` shape for the Object Capture upload path |
| `source/Photogrammetry/UI/Settings/SettingsView.swift` | Settings form: host TextField, port Stepper, resolved URL display |
| `source/Photogrammetry/UI/Reconstruction/UploadProgressView.swift` | Progress view for upload phases (mirrors `ReconstructionProgressView`) |

### Modified files

| File | Change |
|---|---|
| `source/Photogrammetry/App/AppDependencies.swift` | Add `uploadService: ScanUploadService` and `settingsStore: ServerSettingsStore` |
| `source/Photogrammetry/Capture/Space/SpaceScanning.swift` | Add `currentAnchors`, `currentKeyframes`, `currentPoints` properties + `pause()` method |
| `source/Photogrammetry/Capture/Space/ARSceneScanner.swift` | Implement new protocol members; `pause()` calls `session?.pause()` + emits `running: false` |
| `source/Photogrammetry/ViewModels/SpaceScanViewModel.swift` | Add `uploading(Double)` + `uploaded(scanID:)` phases; `finish()` forks on `isConfigured` |
| `source/Photogrammetry/UI/Capture/ObjectCaptureFlowView.swift` | `startReconstructionIfReady()` forks: upload path creates `UploadViewModel`, offline path unchanged |
| `source/Photogrammetry/UI/Capture/SpaceScanFlowView.swift` | Handle `.uploading` + `.uploaded` phases in the phase switch |
| `source/Photogrammetry/UI/RootView.swift` | Add Settings tab |
| `source/PhotogrammetryTests/Fakes.swift` | Add `FakeScanUploadService`; extend `FakeSpaceScanner` with new protocol members |
| `source/project.yml` | Register all new source files |

### Wire format — Space Scan (`SerializedMeshAnchor` binary, little-endian)

```
[16 bytes] anchor UUID (big-endian RFC 4122)
[64 bytes] transform: 16 × float32, column-major (simd_float4x4 memory layout)
[4 bytes]  vertexCount: uint32
[4 bytes]  vertexStride: uint32 (always 12)
[N × 12]   local-space float3 vertices (extracted from ARGeometrySource)
[4 bytes]  faceCount: uint32
[4 bytes]  bytesPerIndex: uint32
[M × 3 × bytesPerIndex] face indices (Go normalizes to uint32)
```

Local-space + transform kept separate so the Go `MeshBuilder` port can apply the
anchor→world multiply explicitly (same as `MeshBuilder.add()` in Swift).

Keyframe JPEG: `CIImage(cvPixelBuffer:)` → `CIContext.jpegRepresentation(quality: 0.95)`.
Server receives standard RGB JPEG; no BT.709 conversion needed on the Go side.

Multipart parts:
- Space Scan: `mesh_anchors` (binary blob, 4-byte count prefix), `keyframes_meta` (JSON), `keyframe_0`…`keyframe_N` (JPEG), `point_cloud` (PLY text)
- Object Scan: `scan_type: "object"`, `image_0`…`image_N` (individual HEICs), `image_count`

---

## Phase 2 — Go Server (`server/`)

### Directory layout

```
server/
  cmd/photogrammetry-server/main.go
  internal/
    api/
      handlers.go       — multipart upload, scan CRUD
      middleware.go     — request-id injection, structured JSON access log
      routes.go         — chi v5 router
      sse.go            — SSEBroker: fan-out per-scan progress events
    processing/
      queue.go          — one goroutine per job
      mesh_builder.go   — Go port of MeshBuilder.swift
      uv_packer.go      — Go port of UVAtlasPacker.swift
      texture_baker.go  — Go port of TextureBaker.swift
      obj_exporter.go   — writes OBJ + MTL
      ply_parser.go     — reads ASCII PLY from iOS
      space_processor.go
      object_processor.go
      colmap_runner.go  — exec.Cmd wrapper, COLMAP path configurable
    storage/
      store.go          — filesystem CRUD; meta.json sidecar
      binary.go         — deserializes iOS binary wire format
    config/config.go    — flags/env: data dir, port, COLMAP path
  go.mod               (go 1.21, chi v5 only)
```

### API routes

```
POST   /api/scans/space           Upload raw space scan → {scan_id}
POST   /api/scans/object          Upload raw object scan → {scan_id}
GET    /api/scans                 List all scans
GET    /api/scans/{id}            Single scan detail
GET    /api/scans/{id}/events     SSE: progress / log / completed / failed
GET    /api/files/{id}/{path...}  Serve any file under scan directory
DELETE /api/scans/{id}            Delete scan + files
GET    /api/health                {status:"ok"}
GET    /                          React SPA (index.html fallback)
```

### Scan lifecycle + storage

Status: `pending → processing → completed | failed`

```
<data-root>/<scan-id>/
  meta.json                  — id, mode, status, created_at, error, raw_stats
  raw/
    mesh_anchors.bin         (space)
    keyframes_meta.json      (space)
    keyframe_000.jpg …       (space)
    pointcloud.ply           (space)
    images/image_0.heic …   (object)
  processed/
    mesh.obj + mesh.mtl + texture.png   (space)
    model.obj                           (object, from COLMAP)
```

### Go port of Space Scan pipeline

**`binary.go`**: `encoding/binary` + `binary.LittleEndian`; UUID big-endian per RFC 4122;
`[16]float32` column-major (same as `simd_float4x4`).

**`mesh_builder.go`**: `mat4ColMajorMulVec` helper; accumulates exploded world-space
vertices — direct port of `MeshBuilder.add()`.

**`uv_packer.go`**: direct port of `UVAtlasPacker.pack()`; V-flip (`vOBJ = 1 − vPixel`)
preserved exactly.

**`texture_baker.go`**: `image/jpeg` decode (already RGB, no BT.709 needed); barycentric
coords; camera projection:
```go
camInv := mat4Inverse(camToWorld)
cs := mat4Mul(camInv, [4]float32{wx, wy, wz, 1})
if cs[2] >= 0 { continue }  // ARKit -Z convention
px := intrinsics[2][0] + intrinsics[0][0]*cs[0]/(-cs[2])   // [col][row]
py := intrinsics[2][1] + intrinsics[1][1]*cs[1]/(-cs[2])
```

**`colmap_runner.go`**: COLMAP pipeline: `feature_extractor → exhaustive_matcher →
mapper → model_converter`; each stderr line forwarded to SSE broker as a `log` event.

### Logging

Go 1.21 `slog` in JSON mode; every request gets a `request_id` header. Processing
stages log: upload received, parse progress, anchor/keyframe counts, pipeline stage
transitions, COLMAP stdout/stderr, errors with full context.

SSE event shapes: `{"type":"log","data":"..."}`,
`{"type":"progress","data":{"fraction":0.4}}`, `{"type":"completed"}`,
`{"type":"failed","data":"..."}`.

---

## Phase 3 — React + Tailwind Web UI (`web/`)

### Stack

Vite + React 18 + TypeScript + Tailwind CSS. Packages: `react-router-dom`, `three`,
`@types/three`, `vitest`, `@testing-library/react`.

Vite dev proxy: `/api/*` → Go server port. Production: `web/vite.config.ts` sets
`build.outDir` to `server/web/dist`, which `server/web/embed.go` bakes into the
binary via `//go:embed all:dist` (go:embed can't reach across `..`, so the build
must output inside the server module). `make web` from `server/` rebuilds it.

**Scan detail contract**: `GET /api/scans/{id}` returns the scan meta plus
`raw_files` and `processed_files` (relative paths split by stage) so the web UI
picks the 3D viewer and raw-data browser without re-parsing paths.

### Pages + components

| Path | Content |
|---|---|
| `/` `DashboardPage` | Scan list cards with status badges; newest first |
| `/scans/:id` `ScanDetailPage` | Tabs: Raw Data · 3D Viewer · Processing Logs |
| `/settings` `SettingsPage` | Server info, data directory, COLMAP path |

**Raw Data tab**: keyframe thumbnail strip (`/api/files/{id}/raw/keyframe_N.jpg`),
anchor/point/face counts, download links.

**3D Viewer tab**: `OBJViewer` (Three.js `OBJLoader` + `MTLLoader` + `OrbitControls`),
`PLYViewer` (Three.js `PLYLoader`); toggle mesh / point cloud / wireframe.

**Processing Logs tab**: live SSE via `EventSource` on `/api/scans/{id}/events`;
appends to scrollable `<pre>` with color-coded levels.

---

## Phase 4 — Tests

### iOS

- `ServerSettingsTests.swift`: default not configured, save/load round-trip, URL format
- `ScanUploadServiceTests.swift`: upload path selected when server configured, offline when not, phase transitions
- Updated `SpaceScanViewModelTests.swift`: existing tests pass `ServerSettings.default` (no change); new class for upload path

### Go (`*_test.go` alongside each package)

- `binary_test.go`: wire format round-trip, UUID byte order, uint16 normalization
- `mesh_builder_test.go`: identity transform, known translation
- `uv_packer_test.go`: cell size math, V-flip invariant
- `texture_baker_test.go`: single-face/keyframe synthetic test, best-keyframe selection
- `handlers_test.go` (httptest): 202 on upload, 404 on missing, SSE format
- `store_test.go`: meta.json CRUD in temp dir

### React (vitest + React Testing Library)

- `StatusBadge.test.tsx`, `DashboardPage.test.tsx`, `ScanDetailPage.test.tsx`,
  `OBJViewer.test.tsx`

---

## Verification

1. **iOS build**: `xcodebuild … build` — zero errors; offline fallback compiles and runs
2. **iOS tests**: `xcodebuild test` — all green including upload-path tests
3. **Go**: `go test ./...` — all green; `go build ./cmd/photogrammetry-server` — binary produced
4. **React**: `npm test` — all green; `npm run build` — `dist/` produced
5. **End-to-end**: Settings → server IP → Space Scan → Finish → upload progress in app →
   `http://<server>:8080` → scan visible, 3D viewer loads OBJ, logs show pipeline stages
