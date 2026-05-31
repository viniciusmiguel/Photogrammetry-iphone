import type { Scan, ScanDetail, HealthResponse } from './types';

const BASE = '/api';

/**
 * GET helper that throws on non-2xx with a message containing status + url.
 * Example: `await getJSON<Scan[]>('/scans')`.
 */
async function getJSON<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function listScans(): Promise<Scan[]> {
  return getJSON<Scan[]>('/scans');
}

export async function getScan(id: string): Promise<ScanDetail> {
  return getJSON<ScanDetail>(`/scans/${id}`);
}

export async function deleteScan(id: string): Promise<void> {
  const url = `${BASE}/scans/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`DELETE ${url} failed: ${res.status} ${res.statusText}`);
  }
}

/** Re-runs processing on a scan's stored raw data (overwrites processed output). */
export async function reprocessScan(id: string): Promise<void> {
  const url = `${BASE}/scans/${id}/reprocess`;
  const res = await fetch(url, { method: 'POST' });
  if (!res.ok) {
    throw new Error(`POST ${url} failed: ${res.status} ${res.statusText}`);
  }
}

/** Builds the URL for a raw or processed file inside a scan. */
export function fileURL(id: string, path: string): string {
  return `${BASE}/files/${id}/${path}`;
}

export async function health(): Promise<HealthResponse> {
  return getJSON<HealthResponse>('/health');
}
