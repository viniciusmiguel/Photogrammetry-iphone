import type { ScanDetail } from '../api/types';
import { OBJViewer } from '../viewers/OBJViewer';
import { PLYViewer } from '../viewers/PLYViewer';

interface ViewerTabProps {
  scan: ScanDetail;
}

const OBJ_PATH = 'processed/mesh.obj';
const PLY_PATH = 'raw/pointcloud.ply';

export function ViewerTab({ scan }: ViewerTabProps): JSX.Element {
  if (scan.processed_files.includes(OBJ_PATH)) {
    return <OBJViewer scanId={scan.id} />;
  }
  if (scan.raw_files.includes(PLY_PATH)) {
    return <PLYViewer scanId={scan.id} />;
  }
  return (
    <p className="text-slate-400">No 3D model yet — still processing.</p>
  );
}
