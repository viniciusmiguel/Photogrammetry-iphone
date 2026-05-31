interface StatTileProps {
  label: string;
  value: number | string;
}

export function StatTile({ label, value }: StatTileProps): JSX.Element {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="text-2xl font-semibold text-slate-100">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
    </div>
  );
}
