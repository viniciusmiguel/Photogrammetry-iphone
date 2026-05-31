import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DashboardPage } from '../pages/DashboardPage';
import type { Scan } from '../api/types';
import * as client from '../api/client';

vi.mock('../api/client');

const mockedListScans = vi.mocked(client.listScans);

function renderDashboard(): void {
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );
}

const sampleScans: Scan[] = [
  { id: 'scan-1', mode: 'space', status: 'completed', created_at: '2026-05-31T10:00:00Z' },
  { id: 'scan-2', mode: 'object', status: 'processing', created_at: '2026-05-31T10:05:00Z' },
];

describe('DashboardPage', () => {
  afterEach(() => vi.clearAllMocks());

  it('renders a card per scan', async () => {
    mockedListScans.mockResolvedValue(sampleScans);
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('scan-1')).toBeInTheDocument();
      expect(screen.getByText('scan-2')).toBeInTheDocument();
    });
  });

  it('shows the empty state when there are no scans', async () => {
    mockedListScans.mockResolvedValue([]);
    renderDashboard();
    await waitFor(() => {
      expect(
        screen.getByText(/No scans yet/i),
      ).toBeInTheDocument();
    });
  });

  it('shows an error state when the request fails', async () => {
    mockedListScans.mockRejectedValue(new Error('boom'));
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText(/Failed to load scans/i)).toBeInTheDocument();
    });
  });
});
