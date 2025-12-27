
import { describe, it, expect } from 'vitest';
import { calculateDemandBreakdown } from '../demandUtils';
import { createInitialGameState } from '../simulation';
import { GameState } from '@/types/game';

describe('demandUtils', () => {
  describe('calculateDemandBreakdown', () => {
    it('should return a breakdown with residential, commercial, and industrial categories', () => {
      const state = createInitialGameState(20);
      const breakdown = calculateDemandBreakdown(state);

      expect(breakdown).toHaveProperty('residential');
      expect(breakdown).toHaveProperty('commercial');
      expect(breakdown).toHaveProperty('industrial');
    });

    it('should calculate residential demand factors correctly', () => {
      const state = createInitialGameState(20);
      // Mock some stats to trigger factors
      state.stats.population = 1000;
      state.stats.jobs = 500;
      state.effectiveTaxRate = 9;

      const breakdown = calculateDemandBreakdown(state);
      
      // (jobs - population * 0.7) / 18
      // (500 - 700) / 18 = -200 / 18 = -11.11
      const resBreakdown = breakdown.residential;
      const baseFactor = resBreakdown.factors.find(f => f.name === 'Base Demand');
      expect(baseFactor?.value).toBeLessThan(0);
    });

    it('should reflect tax impact in the breakdown', () => {
      const state = createInitialGameState(20);
      state.effectiveTaxRate = 20; // High tax should have negative impact

      const breakdown = calculateDemandBreakdown(state);
      
      const resTaxFactor = breakdown.residential.factors.find(f => f.name === 'Tax Impact');
      expect(resTaxFactor?.value).toBeLessThan(0);
    });
  });
});
