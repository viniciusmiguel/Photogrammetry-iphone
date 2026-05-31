import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import {
  createViewerScene,
  disposeViewerScene,
  frameObject,
  renderViewer,
  handleViewerClick,
} from './three-scene';

interface PLYViewerProps {
  scanId: string;
}

export function PLYViewer({ scanId }: PLYViewerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

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

    const loader = new PLYLoader();
    loader.load(
      `/api/files/${scanId}/raw/pointcloud.ply`,
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.PointsMaterial({
          size: 0.01,
          vertexColors: true,
        });
        const points = new THREE.Points(geometry, material);
        frameObject(points, view);
        view.scene.add(points);
      },
      undefined,
      () => setError('Failed to load pointcloud.ply'),
    );

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointerup', onClick);
      resize.disconnect();
      disposeViewerScene(view);
    };
  }, [scanId]);

  return (
    <div className="relative flex h-[28rem] flex-col">
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-sm text-red-400">
          {error}
        </div>
      )}
      <div
        ref={containerRef}
        data-testid="ply-viewer-canvas"
        className="h-full w-full flex-grow rounded-lg border border-slate-800"
      />
    </div>
  );
}
