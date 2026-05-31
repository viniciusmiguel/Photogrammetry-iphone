import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from '../components/StatusBadge';
import type { ScanStatus } from '../api/types';

describe('StatusBadge', () => {
  const cases: Array<[ScanStatus, string]> = [
    ['pending', 'bg-slate-700'],
    ['processing', 'bg-blue-600'],
    ['completed', 'bg-green-600'],
    ['failed', 'bg-red-600'],
  ];

  it.each(cases)('renders %s with its color class', (status, expectedClass) => {
    render(<StatusBadge status={status} />);
    const badge = screen.getByTestId('status-badge');
    expect(badge).toHaveTextContent(status);
    expect(badge.className).toContain(expectedClass);
    expect(badge).toHaveAttribute('data-status', status);
  });
});
