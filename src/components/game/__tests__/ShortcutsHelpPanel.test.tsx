import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShortcutsHelpPanel } from '../ShortcutsHelpPanel';

describe('ShortcutsHelpPanel', () => {
  it('renders the shortcuts list when open', () => {
    render(<ShortcutsHelpPanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();
    // Check for some known shortcuts
    expect(screen.getByText('Bulldoze')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('Pause / Unpause')).toBeInTheDocument();
    
    // 'P' is used for Pause and Parks
    const pShortcuts = screen.getAllByText('P');
    expect(pShortcuts.length).toBeGreaterThan(0);
  });

  it('does not render when closed', () => {
    const { container } = render(<ShortcutsHelpPanel open={false} onOpenChange={() => {}} />);
    expect(screen.queryByText('Keyboard Shortcuts')).not.toBeInTheDocument();
  });
});
