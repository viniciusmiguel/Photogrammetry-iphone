import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  deleteScan,
  fileURL,
  getScan,
  health,
  listScans,
} from '../api/client';

function mockFetchOnce(body: unknown, ok = true, status = 200): void {
  const json = vi.fn().mockResolvedValue(body);
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok, status, statusText: 'X', json }),
  );
}

describe('api/client', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('listScans calls /api/scans', async () => {
    mockFetchOnce([]);
    await listScans();
    expect(fetch).toHaveBeenCalledWith('/api/scans');
  });

  it('getScan calls /api/scans/{id}', async () => {
    mockFetchOnce({ id: 'abc' });
    await getScan('abc');
    expect(fetch).toHaveBeenCalledWith('/api/scans/abc');
  });

  it('deleteScan issues a DELETE to /api/scans/{id}', async () => {
    mockFetchOnce(undefined);
    await deleteScan('abc');
    expect(fetch).toHaveBeenCalledWith('/api/scans/abc', { method: 'DELETE' });
  });

  it('health calls /api/health', async () => {
    mockFetchOnce({ status: 'ok' });
    await expect(health()).resolves.toEqual({ status: 'ok' });
  });

  it('throws on non-2xx with status and url', async () => {
    mockFetchOnce(null, false, 500);
    await expect(listScans()).rejects.toThrow('/api/scans');
    await expect(getScan('z')).rejects.toThrow('500');
  });

  it('fileURL builds the correct path', () => {
    expect(fileURL('id1', 'raw/keyframe_000.jpg')).toBe(
      '/api/files/id1/raw/keyframe_000.jpg',
    );
  });
});
