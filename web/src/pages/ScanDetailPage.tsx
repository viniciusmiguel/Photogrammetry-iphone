import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteScan, getScan, reprocessScan } from '../api/client';
import type { ScanDetail } from '../api/types';
import { StatusBadge } from '../components/StatusBadge';
import { LogStream } from '../components/LogStream';
import { relativeTime } from '../components/relativeTime';
import { RawDataTab } from './RawDataTab';
import { ViewerTab } from './ViewerTab';

type Tab = 'raw' | 'viewer' | 'logs';
type LoadState = 'loading' | 'loaded' | 'error';

const TABS: ReadonlyArray<{ id: Tab; label: string }> = [
  { id: 'raw', label: 'Raw Data' },
  { id: 'viewer', label: '3D Viewer' },
  { id: 'logs', label: 'Processing Logs' },
];

export function ScanDetailPage(): JSX.Element {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scan, setScan] = useState<ScanDetail | null>(null);
  const [state, setState] = useState<LoadState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [tab, setTab] = useState<Tab>('raw');
  const [busy, setBusy] = useState(false);
  const [viewerKey, setViewerKey] = useState(0);

  const load = useCallback(async (): Promise<void> => {
    setState('loading');
    try {
      setScan(await getScan(id));
      setState('loaded');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
      setState('error');
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = useCallback(async (): Promise<void> => {
    await deleteScan(id);
    navigate('/');
  }, [id, navigate]);

  // Re-run processing on the stored raw data, then poll until it finishes and
  // bump the viewer key so it re-fetches the regenerated mesh/texture.
  const onReprocess = useCallback(async (): Promise<void> => {
    setBusy(true);
    try {
      await reprocessScan(id);
      setScan((prev) =>
        prev ? { ...prev, status: 'processing', error: undefined } : prev,
      );
      for (let i = 0; i < 60; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const fresh = await getScan(id);
        setScan(fresh);
        if (fresh.status === 'completed' || fresh.status === 'failed') {
          setViewerKey((k) => k + 1);
          break;
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }, [id]);

  if (state === 'loading') {
    return <p className="text-slate-400">Loading scan…</p>;
  }
  if (state === 'error' || !scan) {
    return <p className="text-red-400">Failed to load scan: {errorMessage}</p>;
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="text-xl font-semibold capitalize text-slate-100">
          {scan.mode} scan
        </h1>
        <StatusBadge status={scan.status} />
        <span className="text-sm text-slate-400">
          {relativeTime(scan.created_at)}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => void onReprocess()}
            disabled={busy}
            title="Re-run processing on this scan's stored raw data"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {busy ? 'Reprocessing…' : 'Reprocess'}
          </button>
          <button
            type="button"
            onClick={() => void onDelete()}
            disabled={busy}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </header>

      {scan.error && (
        <p className="mb-4 rounded-lg border border-red-800 bg-red-950 p-3 text-sm text-red-300">
          {scan.error}
        </p>
      )}

      <nav className="mb-4 flex gap-1 border-b border-slate-800">
        {TABS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setTab(entry.id)}
            className={`px-4 py-2 text-sm ${
              tab === entry.id
                ? 'border-b-2 border-blue-500 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {entry.label}
          </button>
        ))}
      </nav>

      {tab === 'raw' && <RawDataTab scan={scan} />}
      {tab === 'viewer' && <ViewerTab key={viewerKey} scan={scan} />}
      {tab === 'logs' && <LogStream scanId={scan.id} />}
    </div>
  );
}
