# Server texturing pipeline, viewer, and diagnostics

What the server does to a **space scan** after upload, how the web viewer shows
it, and the tooling used to validate it. Complements the decisions in
[`decision-log.md`](decision-log.md) (ADR-0009 through ADR-0013).

## Space-scan processing (`server/internal/processing`)

```
raw/mesh_anchors.bin  ──► DeserializeMeshAnchors ──► MeshBuilder (anchor→world,
                                                      exploded: 9 floats/face)
                                                        │
raw/keyframe_*.jpg ─┐                            PackUVAtlas (one square cell/face)
raw/keyframes_meta ─┴► LoadKeyframes ──► BakeTextureMultiView ───────────┐
                                                        │                │
                                                        ▼                ▼
                                              processed/texture.png   processed/mesh.obj + mesh.mtl
```

### Multi-view texturing (ADR-0010) — `BakeTextureMultiView`

The atlas is still a per-face grid of cells (`uv_packer.go`), but **which**
keyframe fills each cell is chosen globally instead of per-face-greedily:

| File | Responsibility |
|---|---|
| `adjacency.go` | Rebuild face adjacency from the exploded mesh by matching shared edge vertex positions (0.1 mm quantization). Needed for the smoothness term + seam leveling. |
| `depth_map.go` | Rasterize a front-most depth buffer per keyframe (2× downscaled) → per-point occlusion test. |
| `view_scoring.go` | Per-(face,view) **data cost**: projected area, invalidated if behind camera / out of frustum / back-facing / occluded. Normalized per face to `[0,1]`. |
| `graphcut.go` | **Alpha-expansion** multi-label MRF minimizer (Dinic max-flow + Kolmogorov–Zabih submodular Potts reduction). Picks one view per face minimizing `data + λ·seams`. |
| `seam_leveling.go` | Per-vertex additive RGB correction toward the mean of all views meeting at a shared vertex → C0-continuous seams. |
| `multiview_texturer.go` | Orchestrates the above and bakes each cell from its chosen view, applying the seam correction and skipping per-texel-occluded points. |

Occluded views are effectively infinite cost, so a protruding object can never
bleed onto surfaces it hides; the Potts term keeps neighbours on one view so a
single object can't be scattered across several keyframes. Faces with no valid
view are left neutral (no ghost).

**Object scans** still run COLMAP (`colmap_runner.go` / `object_processor.go`).

## Web viewer (`web/src/viewers`)

- Baked texture is shown **unlit** (`MeshBasicMaterial`, ADR-0011) — it is the
  final photographic color, not an albedo to be lit. Lights exist only for the
  orientation gizmo.
- `three-scene.ts` adds a corner `ViewHelper` gizmo + labeled origin axes. The
  render loop keeps `autoClear` on for the main pass (no accumulation/ghosting
  even if a stale HMR loop lingers) and toggles it off only for the gizmo pass.
- `base: '/'` (absolute asset URLs) so reloading on `/scans/<id>` works.
- `GET /api/scans/{id}` returns `raw_files` + `processed_files` split by stage.

## Reprocess (ADR-0013)

`POST /api/scans/{id}/reprocess` re-runs the pipeline on stored `raw/` data and
overwrites `processed/`. The **Reprocess** button (scan detail page) calls it,
polls to completion, and reloads the viewer. Processed files are served
`Cache-Control: no-cache` so the new output is fetched, not a stale copy.

## Diagnostics / validation harness

- **`server/cmd/diag <scanDir> [keyframeIndex|rebake]`** — re-bake a scan from
  stored raw data, or render diagnostics from a keyframe: `diag_textured_kf*.png`
  (reproject the baked atlas through that keyframe — should match the photo),
  `diag_geometry_kf*.png` (shaded geometry), `diag_web_pose.png` (the viewer's
  default framing). Honors `PHOTOG_SEAM_LAMBDA`.
- **`/tmp/blender_truth.py`** (ADR-0012) — generate a synthetic, ground-truth
  scan in the upload wire format. Cameras are built in the ARKit intrinsics
  convention with a 0-px projection self-check. Env: `PORTRAIT=1` (90° roll, like
  a portrait-held phone), `NOISE=<f>` (perturb exported poses to simulate SLAM
  drift), `OUT=<dir>`. Upload with `curl -F mesh_anchors=@… -F keyframes_meta=@…
  -F keyframe_0=@… … -F point_cloud=@…`.

This harness established that the pipeline is correct end-to-end and that
real-data ghosting is camera-pose drift, not a storage/processing bug.

## Tunables

- `PHOTOG_SEAM_LAMBDA` (default `0.1`) — Potts seam weight. Higher = larger
  single-view patches/fewer seams; does **not** fix drift ghosting.
- `PHOTOGRAMMETRY_PORT` / `PHOTOGRAMMETRY_DATA` / `PHOTOGRAMMETRY_COLMAP`.

## Known issues / future work

1. **Atlas overflow > 65 k faces** — the 2048² atlas at the 8 px minimum cell
   size holds only 65 536 cells; larger meshes lose texture on the overflow
   faces. Fix: shrink cells and/or grow the atlas with face count.
2. **Pose-drift ghosting** — residual ghosting at depth edges from imperfect
   ARKit poses. Proper fix is keyframe pose refinement / bundle adjustment
   before baking (deferred).
3. **Per-face faceting** — each face gets ~one color (cell resolution), so fine
   detail is blocky. A higher-resolution or chart-based atlas would improve it.
4. **Keyframe thumbnails display sideways** in the Raw Data tab — the raw ARKit
   sensor orientation (correct for processing); rotating for display is cosmetic.
