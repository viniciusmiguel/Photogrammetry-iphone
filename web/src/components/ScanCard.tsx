import { Link } from 'react-router-dom';
import type { Scan } from '../api/types';
import { StatusBadge } from './StatusBadge';
import { relativeTime } from './relativeTime';

interface ScanCardProps {
  scan: Scan;
}

const MODE_ICON: Record<Scan['mode'], string> = {
  space: '🏠',
  object: '📦',
};

export function ScanCard({ scan }: ScanCardProps): JSX.Element {
  return (
    <Link
      to={`/scans/${scan.id}`}
      className="block rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-600 hover:bg-slate-800"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium capitalize text-slate-200">
          <span aria-hidden>{MODE_ICON[scan.mode]}</span>
          {scan.mode}
        </span>
        <StatusBadge status={scan.status} />
      </div>
      <div className="mt-2 font-mono text-xs text-slate-500">{scan.id}</div>
      <div className="mt-1 text-xs text-slate-400">
        {relativeTime(scan.created_at)}
      </div>
      {scan.raw_stats && (
        <div className="mt-3 grid grid-cols-2 gap-1 text-xs text-slate-400">
          <span>{scan.raw_stats.keyframe_count} keyframes</span>
          <span>{scan.raw_stats.anchor_count} anchors</span>
          <span>{scan.raw_stats.point_count} points</span>
          <span>{scan.raw_stats.face_count} faces</span>
        </div>
      )}
    </Link>
  );
}
