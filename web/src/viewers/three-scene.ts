import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js';

export interface ViewerScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  /** Corner orientation gizmo (click an axis to snap the camera). */
  viewHelper: ViewHelper;
  /** Labeled X/Y/Z axes at the model origin. */
  axes: THREE.Group;
  clock: THREE.Clock;
}

/** Creates a configured scene/camera/renderer/controls bound to a container. */
export function createViewerScene(container: HTMLElement): ViewerScene {
  const width = container.clientWidth || 1;
  const height = container.clientHeight || 1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 1000);
  camera.position.set(0, 0, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(1, 1, 1);
  scene.add(hemi, dir);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axes = createAxes();
  scene.add(axes);

  const viewHelper = new ViewHelper(camera, renderer.domElement);

  return { scene, camera, renderer, controls, viewHelper, axes, clock: new THREE.Clock() };
}

/** Renders one frame: main scene + the corner orientation gizmo.
 *
 * The main pass keeps `autoClear` ON so the framebuffer is cleared every frame —
 * this guarantees no accumulation/ghosting even if a stale render loop lingers
 * (e.g. after a Vite HMR update). Auto-clear is disabled only transiently for
 * the gizmo pass (which must draw over the scene), then restored. */
export function renderViewer(view: ViewerScene): void {
  const delta = view.clock.getDelta();
  if (view.viewHelper.animating) {
    view.viewHelper.update(delta);
  }
  view.controls.update();

  view.renderer.autoClear = true;
  view.renderer.render(view.scene, view.camera);

  view.renderer.autoClear = false;
  view.renderer.clearDepth();
  view.viewHelper.render(view.renderer);
  view.renderer.autoClear = true;
}

/** Forwards a pointer click to the gizmo; returns true if it started a snap. */
export function handleViewerClick(view: ViewerScene, event: MouseEvent): boolean {
  return view.viewHelper.handleClick(event);
}

/** Centers an object at the origin, frames the camera, and sizes the axes. */
export function frameObject(object: THREE.Object3D, view: ViewerScene): void {
  const { camera, controls, axes } = view;
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  // Axes sit at the (recentered) origin and span ~60% of the model so they're
  // visible without overwhelming it. Directions are world (ARKit) directions —
  // only the model is translated, never rotated.
  axes.scale.setScalar(maxDim * 0.6);

  const fov = (camera.fov * Math.PI) / 180;
  const distance = (maxDim / 2 / Math.tan(fov / 2)) * 1.6;

  camera.position.set(0, 0, distance);
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  controls.target.set(0, 0, 0);
  controls.update();
}

/** Disposes renderer resources and detaches the canvas from the DOM. */
export function disposeViewerScene(view: ViewerScene): void {
  view.viewHelper.dispose();
  view.controls.dispose();
  view.renderer.dispose();
  const canvas = view.renderer.domElement;
  canvas.parentElement?.removeChild(canvas);
}

/** Builds a unit-size axes triad (X=red, Y=green, Z=blue) with text labels. */
function createAxes(): THREE.Group {
  const group = new THREE.Group();
  group.add(new THREE.AxesHelper(1));
  group.add(makeAxisLabel('X', '#ff5d5d', new THREE.Vector3(1.12, 0, 0)));
  group.add(makeAxisLabel('Y', '#5dff7a', new THREE.Vector3(0, 1.12, 0)));
  group.add(makeAxisLabel('Z', '#5d9dff', new THREE.Vector3(0, 0, 1.12)));
  return group;
}

/** Renders a single axis letter to a sprite so it always faces the camera. */
function makeAxisLabel(
  text: string,
  color: string,
  position: THREE.Vector3,
): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.font = 'bold 46px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 32, 32);
  }
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(canvas),
      depthTest: false,
      transparent: true,
    }),
  );
  sprite.position.copy(position);
  sprite.scale.setScalar(0.22);
  return sprite;
}
