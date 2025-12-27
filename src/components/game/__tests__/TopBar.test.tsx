
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopBar } from '../TopBar';
import { vi, describe, it, expect } from 'vitest';
import { createInitialGameState } from '@/lib/simulation';
import { TooltipProvider } from '@/components/ui/tooltip';

// Mock GameContext
vi.mock('@/context/GameContext', () => ({
  useGame: vi.fn(() => ({
    state: createInitialGameState(20),
  })),
}));

// Mock LanguageSelector
vi.mock('@/components/ui/LanguageSelector', () => ({
  LanguageSelector: () => <div data-testid="language-selector" />,
}));

// Mock gt-next
vi.mock('gt-next', () => ({
  msg: vi.fn((text) => text),
  useMessages: vi.fn(() => (text: any) => text),
  useLocale: vi.fn(() => 'en'),
  useSetLocale: vi.fn(() => vi.fn()),
}));

describe('TopBar', () => {
  it('calls onShowDemandReport when demand indicators are clicked', () => {
    const onShowDemandReport = vi.fn();
    render(
      <TooltipProvider>
        <TopBar onShowDemandReport={onShowDemandReport} />
      </TooltipProvider>
    );
    
    // Click on "R" indicator
    const rIndicator = screen.getByText('R');
    fireEvent.click(rIndicator);
    
    expect(onShowDemandReport).toHaveBeenCalled();
  });
});
