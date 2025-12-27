import React from 'react';
import { render, screen } from '@testing-library/react';
import { DemandReportModal } from '../DemandReportModal';
import { vi, describe, it, expect } from 'vitest';
import { createInitialGameState } from '@/lib/simulation';

// Mock GameContext
vi.mock('@/context/GameContext', () => ({
  useGame: vi.fn(() => ({
    state: createInitialGameState(20),
  })),
}));

// Mock gt-next
vi.mock('gt-next', () => ({
  msg: vi.fn((text) => text),
}));

describe('DemandReportModal', () => {
  it('renders correctly when open', () => {
    render(<DemandReportModal open={true} onOpenChange={() => {}} />);
    
    expect(screen.getByText('City Demand Report')).toBeInTheDocument();
    // Use getAllByText because "Residential" appears in tabs and header
    expect(screen.getAllByText('Residential').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Commercial').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Industrial').length).toBeGreaterThan(0);
  });

  it('renders residential demand factors by default', () => {
    render(<DemandReportModal open={true} onOpenChange={() => {}} />);
    
    expect(screen.getByText('Base Demand')).toBeInTheDocument();
    expect(screen.getByText('Tax Impact')).toBeInTheDocument();
  });
});