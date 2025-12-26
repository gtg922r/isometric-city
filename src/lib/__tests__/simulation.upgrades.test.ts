import { describe, it, expect, vi } from 'vitest';
import { createInitialGameState, simulateTick } from '../simulation';
import { Building, Tile, GameState } from '@/types/game';

describe('Simulation Upgrades', () => {
  it('applies upgraded range and magnitude to service coverage', () => {
    let state = createInitialGameState(40, 'Test City');
    
    // Clear grid to ensure clean test
    for (let y = 0; y < 40; y++) {
      for (let x = 0; x < 40; x++) {
        state.grid[y][x].building = {
          type: 'grass',
          level: 0,
          population: 0,
          jobs: 0,
          powered: false,
          watered: false,
          onFire: false,
          fireProgress: 0,
          age: 0,
          constructionProgress: 100,
          abandoned: false
        };
      }
    }

    // Place a police station at center
    const policeX = 10;
    const policeY = 10;
    state.grid[policeY][policeX].building = {
      type: 'police_station',
      level: 1,
      population: 0,
      jobs: 0,
      powered: true,
      watered: true,
      onFire: false,
      fireProgress: 0,
      age: 100,
      constructionProgress: 100,
      abandoned: false,
      isUpgraded: false
    };

    // Run one tick to update coverage
    let stateAfterTick = simulateTick(state);
    
    // Base range for police is 13.
    // At distance 12, coverage should be low but positive.
    const dist12Coverage = stateAfterTick.services.police[10][22] || stateAfterTick.services.police[10][0]; 
    // Wait, grid is 20x20. (10, 0) is distance 10.
    const coverageAt10 = stateAfterTick.services.police[10][0];
    expect(coverageAt10).toBeGreaterThan(0);
    
    // Now upgrade the building
    state.grid[policeY][policeX].building.isUpgraded = true;
    let stateAfterUpgradeTick = simulateTick(state);
    
    // Upgraded range is 1.5x (19.5), magnitude is 1.5x
    const upgradedCoverageAt10 = stateAfterUpgradeTick.services.police[10][0];
    expect(upgradedCoverageAt10).toBeGreaterThan(coverageAt10);
  });

  it('accounts for increased maintenance in budget', () => {
    let state = createInitialGameState(40, 'Test City');
    
    // Place a power plant
    const plantX = 2;
    const plantY = 2;
    state.grid[plantY][plantX].building = {
      type: 'power_plant',
      level: 1,
      population: 0,
      jobs: 0,
      powered: true,
      watered: true,
      onFire: false,
      fireProgress: 0,
      age: 100,
      constructionProgress: 100,
      abandoned: false,
      isUpgraded: false
    };

    let stateAfterTick = simulateTick(state);
    const baseCost = stateAfterTick.budget.power.cost;
    expect(baseCost).toBe(150); // Power plant base maintenance is 150

    // Upgrade the power plant
    state.grid[plantY][plantX].building.isUpgraded = true;
    let stateAfterUpgradeTick = simulateTick(state);
    
    // Upgraded maintenance is 2x
    expect(stateAfterUpgradeTick.budget.power.cost).toBe(300);
  });

  it('reduces pollution for upgraded power plants', () => {
    let state = createInitialGameState(40, 'Test City');
    
    // Place a power plant
    const plantX = 5;
    const plantY = 5;
    state.grid[plantY][plantX].building = {
      type: 'power_plant',
      level: 1,
      population: 0,
      jobs: 0,
      powered: true,
      watered: true,
      onFire: false,
      fireProgress: 0,
      age: 100,
      constructionProgress: 100,
      abandoned: false,
      isUpgraded: false
    };

    // Run multiple ticks to let pollution accumulate
    let currentState = state;
    for (let i = 0; i < 5; i++) {
      currentState = simulateTick(currentState);
    }
    const basePollution = currentState.grid[plantY][plantX].pollution;
    expect(basePollution).toBeGreaterThan(0);

    // Upgrade the power plant
    state.grid[plantY][plantX].building.isUpgraded = true;
    // Reset pollution to compare accumulation rate
    state.grid[plantY][plantX].pollution = 0;
    
    currentState = state;
    for (let i = 0; i < 5; i++) {
      currentState = simulateTick(currentState);
    }
    const upgradedPollution = currentState.grid[plantY][plantX].pollution;
    
    // Pollution multiplier is 0.8
    expect(upgradedPollution).toBeLessThan(basePollution);
  });
});
