import { useEffect, useState } from 'react';
import { health } from '../api/client';

type HealthState = 'checking' | 'ok' | 'down';

export function SettingsPage(): JSX.Element {
  const [healthState, setHealthState] = useState<HealthState>('checking');

  useEffect(() => {
    let active = true;
    health()
      .then((res) => {
        if (active) {
          setHealthState(res.status === 'ok' ? 'ok' : 'down');
        }
      })
      .catch(() => {
        if (active) {
          setHealthState('down');
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-100">Settings</h1>

      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-1 text-sm font-medium text-slate-300">
          Server health
        </h2>
        <p
          data-testid="health-state"
          className={
            healthState === 'ok'
              ? 'text-green-400'
              : healthState === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
          }
        >
          {healthState === 'ok'
            ? 'Online'
            : healthState === 'down'
              ? 'Unreachable'
              : 'Checking…'}
        </p>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        <h2 className="mb-2 text-sm font-medium text-slate-300">
          Connection
        </h2>
        <p>
          The server IP and port are configured in the iPhone capture app, not
          here. This web UI is served from the same Go server and talks to it
          over the <code className="text-slate-300">/api</code> base path.
        </p>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        <h2 className="mb-2 text-sm font-medium text-slate-300">Data</h2>
        <p>
          Raw uploads and processed artifacts are stored under the server&apos;s
          data directory. Reconstruction uses COLMAP for the photogrammetry
          pipeline; processing logs stream live on each scan&apos;s detail page.
        </p>
      </section>
    </div>
  );
}
