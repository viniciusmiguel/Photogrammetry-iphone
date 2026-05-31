import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const loadMTL = vi.fn();
const setPath = vi.fn();
const loadOBJ = vi.fn();
const setMaterials = vi.fn();
const objSetPath = vi.fn();

// Mock the three loaders so jsdom never touches real WebGL.
vi.mock('three/examples/jsm/loaders/MTLLoader.js', () => ({
  MTLLoader: class {
    setPath = setPath;
    load = loadMTL;
  },
}));
vi.mock('three/examples/jsm/loaders/OBJLoader.js', () => ({
  OBJLoader: class {
    setMaterials = setMaterials;
    setPath = objSetPath;
    load = loadOBJ;
  },
}));
vi.mock('../viewers/three-scene', () => ({
  createViewerScene: () => ({
    scene: { add: vi.fn() },
    camera: { updateProjectionMatrix: vi.fn(), aspect: 1 },
    renderer: {
      render: vi.fn(),
      setSize: vi.fn(),
      dispose: vi.fn(),
      domElement: document.createElement('canvas'),
    },
    controls: { update: vi.fn(), dispose: vi.fn() },
  }),
  disposeViewerScene: vi.fn(),
  frameObject: vi.fn(),
  renderViewer: vi.fn(),
  handleViewerClick: vi.fn(),
}));

import { OBJViewer } from '../viewers/OBJViewer';

describe('OBJViewer', () => {
  afterEach(() => vi.clearAllMocks());

  it('mounts a container and loads the MTL from the processed path', () => {
    const { getByTestId } = render(<OBJViewer scanId="abc123" />);
    expect(getByTestId('obj-viewer-canvas')).toBeInTheDocument();
    expect(setPath).toHaveBeenCalledWith('/api/files/abc123/processed/');
    expect(loadMTL).toHaveBeenCalledWith(
      'mesh.mtl',
      expect.any(Function),
      undefined,
      expect.any(Function),
    );
  });
});
