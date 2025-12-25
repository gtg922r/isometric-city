import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModeIndicator } from '../ModeIndicator';
import { Tool } from '@/types/game';

// Mock the GameContext
const mockUseGame = vi.fn();
vi.mock('@/context/GameContext', () => ({
  useGame: () => mockUseGame(),
}));

// Mock TOOL_INFO since it's used to get display names
vi.mock('@/types/game', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    TOOL_INFO: {
      select: { name: 'Select / Inspect', description: 'Select', cost: 0 },
      road: { name: 'Road', description: 'Build roads', cost: 10 },
      bulldoze: { name: 'Bulldoze', description: 'Destroy', cost: 5 },
    },
  };
});

describe('ModeIndicator', () => {
  it('renders "Select / Inspect" when tool is select', () => {
    mockUseGame.mockReturnValue({
      state: { selectedTool: 'select' },
    });

    render(<ModeIndicator />);
    expect(screen.getByText('Select / Inspect')).toBeInTheDocument();
  });

  it('renders "Road" when tool is road', () => {
    mockUseGame.mockReturnValue({
      state: { selectedTool: 'road' },
    });

    render(<ModeIndicator />);
    expect(screen.getByText('Road')).toBeInTheDocument();
  });

  it('renders "Bulldoze" when tool is bulldoze', () => {
    mockUseGame.mockReturnValue({
      state: { selectedTool: 'bulldoze' },
    });

    render(<ModeIndicator />);
    expect(screen.getByText('Bulldoze')).toBeInTheDocument();
  });
});
