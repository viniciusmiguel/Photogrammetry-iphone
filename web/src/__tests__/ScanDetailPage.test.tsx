import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ScanDetailPage } from '../pages/ScanDetailPage';
import type { ScanDetail, SSEEvent } from '../api/types';
import * as client from '../api/client';
import * as sse from '../api/sse';

vi.mock('../api/client');
vi.mock('../api/sse');
vi.mock('../viewers/OBJViewer', () => ({
  OBJViewer: () => <div data-testid="obj-viewer-stub" />,
}));
vi.mock('../viewers/PLYViewer', () => ({
  PLYViewer: () => <div data-testid="ply-viewer-stub" />,
}));

const mockedGetScan = vi.mocked(client.getScan);
const mockedSubscribe = vi.mocked(sse.subscribeScanEvents);

const detail: ScanDetail = {
  id: 'scan-9',
  mode: 'space',
  status: 'completed',
  created_at: '2026-05-31T10:00:00Z',
  raw_stats: { anchor_count: 4, keyframe_count: 12, point_count: 999, face_count: 50 },
  raw_files: ['raw/keyframe_000.jpg'],
  processed_files: ['processed/mesh.obj'],
};

function renderDetail(): void {
  render(
    <MemoryRouter initialEntries={['/scans/scan-9']}>
      <Routes>
        <Route path="/scans/:id" element={<ScanDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ScanDetailPage', () => {
  afterEach(() => vi.clearAllMocks());

  it('renders header stats on the raw tab', async () => {
    mockedGetScan.mockResolvedValue(detail);
    mockedSubscribe.mockReturnValue(() => {});
    renderDetail();
    await waitFor(() => expect(screen.getByText('Anchors')).toBeInTheDocument());
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('switches tabs to the 3D viewer', async () => {
    mockedGetScan.mockResolvedValue(detail);
    mockedSubscribe.mockReturnValue(() => {});
    renderDetail();
    await waitFor(() => expect(screen.getByText('Anchors')).toBeInTheDocument());
    await userEvent.click(screen.getByText('3D Viewer'));
    expect(screen.getByTestId('obj-viewer-stub')).toBeInTheDocument();
  });

  it('shows log lines pushed via subscribeScanEvents', async () => {
    mockedGetScan.mockResolvedValue(detail);
    mockedSubscribe.mockImplementation((_id, onEvent) => {
      const event: SSEEvent = { type: 'log', data: 'COLMAP feature extraction' };
      onEvent(event);
      return () => {};
    });
    renderDetail();
    await waitFor(() => expect(screen.getByText('Anchors')).toBeInTheDocument());
    await userEvent.click(screen.getByText('Processing Logs'));
    await waitFor(() =>
      expect(screen.getByText('COLMAP feature extraction')).toBeInTheDocument(),
    );
  });
});
