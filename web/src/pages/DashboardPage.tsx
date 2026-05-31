import { useCallback, useEffect, useState } from 'react';
import { listScans } from '../api/client';
import type { Scan } from '../api/types';
import { ScanCard } from '../components/ScanCard';

type LoadState = 'loading' | 'loaded' | 'error';

export function DashboardPage(): JSX.Element {
  const [scans, setScans] = useState<Scan[]>([]);
  const [state, setState] = useState<LoadState>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const load = useCallback(async (): Promise<void> => {
    setState('loading');
    try {
      const result = await listScans();
      setScans(result);
      setState('loaded');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
      setState('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100">Scans</h1>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
        >
          Refresh
        </button>
      </div>

      {state === 'loading' && (
        <p className="text-slate-400">Loading scans…</p>
      )}

      {state === 'error' && (
        <p className="text-red-400">Failed to load scans: {errorMessage}</p>
      )}

      {state === 'loaded' && scans.length === 0 && (
        <p className="text-slate-400">
          No scans yet — capture one from the iPhone app.
        </p>
      )}

      {state === 'loaded' && scans.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scans.map((scan) => (
            <ScanCard key={scan.id} scan={scan} />
          ))}
        </div>
      )}
    </div>
  );
}
