import { useEffect, useRef, useState } from 'react';
import { subscribeScanEvents } from '../api/sse';
import type { SSEEvent } from '../api/types';

interface LogStreamProps {
  scanId: string;
}

type StreamState = 'streaming' | 'completed' | 'failed';

function toLine(event: SSEEvent): string | null {
  if (event.type === 'log') {
    return typeof event.data === 'string'
      ? event.data
      : JSON.stringify(event.data);
  }
  if (event.type === 'completed') {
    return '✓ processing completed';
  }
  if (event.type === 'failed') {
    return `✗ processing failed${event.data ? `: ${String(event.data)}` : ''}`;
  }
  return null;
}

function toProgress(data: unknown): number | null {
  if (typeof data === 'number') {
    return data;
  }
  if (data && typeof data === 'object' && 'fraction' in data) {
    const fraction = (data as { fraction: unknown }).fraction;
    return typeof fraction === 'number' ? fraction : null;
  }
  return null;
}

export function LogStream({ scanId }: LogStreamProps): JSX.Element {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [state, setState] = useState<StreamState>('streaming');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([]);
    setProgress(null);
    setState('streaming');

    const stop = subscribeScanEvents(scanId, (event) => {
      if (event.type === 'progress') {
        const fraction = toProgress(event.data);
        if (fraction !== null) {
          setProgress(fraction);
        }
        return;
      }
      if (event.type === 'completed') {
        setState('completed');
      }
      if (event.type === 'failed') {
        setState('failed');
      }
      const line = toLine(event);
      if (line) {
        setLines((prev) => [...prev, line]);
      }
    });

    return stop;
  }, [scanId]);

  useEffect(() => {
    // scrollIntoView is absent in some non-browser DOM environments (jsdom).
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [lines.length]);

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <span
          data-testid="stream-state"
          className={`text-sm font-medium ${
            state === 'failed'
              ? 'text-red-400'
              : state === 'completed'
                ? 'text-green-400'
                : 'text-blue-400'
          }`}
        >
          {state}
        </span>
        {progress !== null && (
          <span className="text-xs text-slate-400">
            {Math.round(progress * 100)}%
          </span>
        )}
      </div>
      {progress !== null && (
        <div className="mb-2 h-1.5 w-full overflow-hidden rounded bg-slate-800">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${Math.min(100, Math.round(progress * 100))}%` }}
          />
        </div>
      )}
      <div className="h-72 overflow-y-auto rounded-lg border border-slate-800 bg-black/50 p-3 font-mono text-xs text-slate-300">
        {lines.length === 0 ? (
          <p className="text-slate-600">Waiting for log output…</p>
        ) : (
          lines.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
