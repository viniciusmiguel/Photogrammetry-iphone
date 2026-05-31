import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import {
  createViewerScene,
  disposeViewerScene,
  frameObject,
  renderViewer,
  handleViewerClick,
} from './three-scene';

interface OBJViewerProps {
  scanId: string;
}

// The baked texture is already the final photographic color (the camera images
// are the "lighting"), so it must be shown UNLIT. MTLLoader builds a
// MeshPhongMaterial that multiplies the texture by the scene lights, darkening
// it and adding spurious directional shading — replace those with an unlit
// MeshBasicMaterial that reproduces the baked atlas exactly.
function makeUnlit(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }
    const sources = Array.isArray(child.material)
      ? child.material
      : [child.material];
    const unlit = sources.map((m) => {
      const map = (m as THREE.MeshPhongMaterial).map ?? null;
      if (map) {
        map.colorSpace = THREE.SRGBColorSpace;
      }
      return new THREE.MeshBasicMaterial({ map });
    });
    child.material = Array.isArray(child.material) ? unlit : unlit[0];
  });
}

function applyWireframe(object: THREE.Object3D, wireframe: boolean): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      for (const material of materials) {
        (material as THREE.MeshBasicMaterial).wireframe = wireframe;
      }
    }
  });
}

export function OBJViewer({ scanId }: OBJViewerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const view = createViewerScene(container);
    let raf = 0;
    const animate = (): void => {
      raf = requestAnimationFrame(animate);
      renderViewer(view);
    };
    animate();

    const onClick = (event: MouseEvent): void => {
      handleViewerClick(view, event);
    };
    container.addEventListener('pointerup', onClick);

    const resize = new ResizeObserver(() => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      view.camera.aspect = w / h;
      view.camera.updateProjectionMatrix();
      view.renderer.setSize(w, h);
    });
    resize.observe(container);

    const basePath = `/api/files/${scanId}/processed/`;
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(basePath);
    mtlLoader.load(
      'mesh.mtl',
      (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(basePath);
        objLoader.load(
          'mesh.obj',
          (object) => {
            makeUnlit(object);
            frameObject(object, view);
            view.scene.add(object);
            modelRef.current = object;
          },
          undefined,
          () => setError('Failed to load mesh.obj'),
        );
      },
      undefined,
      () => setError('Failed to load mesh.mtl'),
    );

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointerup', onClick);
      resize.disconnect();
      disposeViewerScene(view);
      modelRef.current = null;
    };
  }, [scanId]);

  useEffect(() => {
    if (modelRef.current) {
      applyWireframe(modelRef.current, wireframe);
    }
  }, [wireframe]);

  return (
    <div className="relative flex h-[28rem] flex-col">
      <div className="absolute right-3 top-3 z-10">
        <button
          type="button"
          onClick={() => setWireframe((w) => !w)}
          className="rounded bg-slate-800 px-3 py-1 text-xs text-slate-200 hover:bg-slate-700"
        >
          Wireframe: {wireframe ? 'on' : 'off'}
        </button>
      </div>
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-sm text-red-400">
          {error}
        </div>
      )}
      <div
        ref={containerRef}
        data-testid="obj-viewer-canvas"
        className="h-full w-full flex-grow rounded-lg border border-slate-800"
      />
    </div>
  );
}
