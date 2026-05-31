import { fileURL } from '../api/client';
import type { ScanDetail } from '../api/types';
import { StatTile } from '../components/StatTile';
import { KeyframeStrip } from '../components/KeyframeStrip';

interface RawDataTabProps {
  scan: ScanDetail;
}

const KEYFRAME_RE = /^raw\/keyframe_.*\.jpg$/;
const OBJECT_IMAGE_RE = /^raw\/images\/.*\.(jpg|jpeg|png)$/i;

function imageUrls(scan: ScanDetail, pattern: RegExp): string[] {
  return scan.raw_files
    .filter((path) => pattern.test(path))
    .map((path) => fileURL(scan.id, path));
}

export function RawDataTab({ scan }: RawDataTabProps): JSX.Element {
  const isSpace = scan.mode === 'space';
  const thumbnailUrls = imageUrls(
    scan,
    isSpace ? KEYFRAME_RE : OBJECT_IMAGE_RE,
  );

  return (
    <div className="space-y-6">
      {isSpace && scan.raw_stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Anchors" value={scan.raw_stats.anchor_count} />
          <StatTile label="Keyframes" value={scan.raw_stats.keyframe_count} />
          <StatTile label="Points" value={scan.raw_stats.point_count} />
          <StatTile label="Faces" value={scan.raw_stats.face_count} />
        </div>
      )}

      <section>
        <h3 className="mb-2 text-sm font-medium text-slate-300">
          {isSpace ? 'Keyframes' : `Images (${thumbnailUrls.length})`}
        </h3>
        <KeyframeStrip urls={thumbnailUrls} />
      </section>

      <section>
        <h3 className="mb-2 text-sm font-medium text-slate-300">Raw files</h3>
        <ul className="space-y-1 text-sm">
          {scan.raw_files.map((path) => (
            <li key={path}>
              <a
                href={fileURL(scan.id, path)}
                download
                className="font-mono text-blue-400 hover:underline"
              >
                {path}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
