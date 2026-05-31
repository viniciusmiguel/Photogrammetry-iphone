import type { ScanStatus } from '../api/types';

interface StatusBadgeProps {
  status: ScanStatus;
}

const STYLES: Record<ScanStatus, string> = {
  pending: 'bg-slate-700 text-slate-200',
  processing: 'bg-blue-600 text-white animate-pulse',
  completed: 'bg-green-600 text-white',
  failed: 'bg-red-600 text-white',
};

export function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  return (
    <span
      data-testid="status-badge"
      data-status={status}
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
