import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TooltipProvider } from '../tooltip';
import { ShortcutTooltip } from '../ShortcutTooltip';

describe('ShortcutTooltip', () => {
  it('renders the tooltip content and the shortcut', async () => {
    render(
      <TooltipProvider>
        <ShortcutTooltip content="Build Road" shortcut="R">
          <button>Hover me</button>
        </ShortcutTooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Hover me');
    
    act(() => {
        trigger.focus();
    });

    await waitFor(() => {
        const contentElements = screen.getAllByText('Build Road');
        expect(contentElements.length).toBeGreaterThan(0);
        expect(contentElements[0]).toBeInTheDocument();

        const shortcutElements = screen.getAllByText('(R)');
        expect(shortcutElements.length).toBeGreaterThan(0);
        expect(shortcutElements[0]).toBeInTheDocument();
    });
  });

  it('renders only content if no shortcut is provided', async () => {
    render(
      <TooltipProvider>
        <ShortcutTooltip content="Inspect">
          <button>Hover me</button>
        </ShortcutTooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Hover me');
    
    act(() => {
        trigger.focus();
    });

    await waitFor(() => {
        const contentElements = screen.getAllByText('Inspect');
        expect(contentElements.length).toBeGreaterThan(0);
        expect(contentElements[0]).toBeInTheDocument();
        
        expect(screen.queryByText('(')).not.toBeInTheDocument();
    });
  });
});
