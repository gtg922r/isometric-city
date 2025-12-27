import { GameState, DemandReport, DemandCategoryBreakdown } from '@/types/game';
import { msg } from 'gt-next';

/**
 * Calculates a detailed breakdown of demand factors for the Demand Report Modal.
 * Replicates the logic from calculateStats in simulation.ts to provide a transparent 
 * explanation of why demand is at its current level.
 */
export function calculateDemandBreakdown(state: GameState): DemandReport {
  const { stats, effectiveTaxRate, grid, gridSize } = state;
  const { population, jobs } = stats;

  // 1. Gather counts and flags for special factors
  let subwayTiles = 0;
  let subwayStations = 0;
  let railTiles = 0;
  let railStations = 0;
  let hasAirport = false;
  let hasCityHall = false;
  let hasSpaceProgram = false;
  let stadiumCount = 0;
  let museumCount = 0;
  let hasAmusementPark = false;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const tile = grid[y][x];
      const building = tile.building;

      if (tile.hasSubway) subwayTiles++;
      if (building.type === 'subway_station') subwayStations++;
      if (building.type === 'rail' || tile.hasRailOverlay) railTiles++;
      if (building.type === 'rail_station') railStations++;
      
      if (building.constructionProgress === undefined || building.constructionProgress >= 100) {
        if (building.type === 'airport') hasAirport = true;
        if (building.type === 'city_hall') hasCityHall = true;
        if (building.type === 'space_program') hasSpaceProgram = true;
        if (building.type === 'stadium') stadiumCount++;
        if (building.type === 'museum') museumCount++;
        if (building.type === 'amusement_park') hasAmusementPark = true;
      }
    }
  }

  // 2. Replication of tax logic
  const taxMultiplier = Math.max(0, 1 - (effectiveTaxRate - 9) / 91);
  const taxAdditiveModifier = (9 - effectiveTaxRate) * 2;

  // 3. Residential Breakdown
  const resBase = (jobs - population * 0.7) / 18;
  const resCityHall = hasCityHall ? 8 : 0;
  const resSpaceProgram = hasSpaceProgram ? 10 : 0;
  const resMuseum = Math.min(10, museumCount * 5);
  
  const resTotalPreTax = resBase + resCityHall + resSpaceProgram + resMuseum;
  const resTaxImpact = (resTotalPreTax * taxMultiplier + taxAdditiveModifier) - resTotalPreTax;
  
  const residential: DemandCategoryBreakdown = {
    total: Math.min(100, Math.max(-100, resTotalPreTax + resTaxImpact)),
    factors: [
      { name: msg('Base Demand'), value: resBase, description: msg('Ratio of jobs to population') },
      { name: msg('City Hall'), value: resCityHall },
      { name: msg('Space Program'), value: resSpaceProgram },
      { name: msg('Museums'), value: resMuseum },
      { name: msg('Tax Impact'), value: resTaxImpact, description: msg('Effect of current tax rate') }
    ].filter(f => f.value !== 0 || f.name === msg('Base Demand') || f.name === msg('Tax Impact')),
    advice: resBase < 0 ? msg('Create more jobs to attract residents.') : msg('Zone more residential areas to house new citizens.')
  };

  // 4. Commercial Breakdown
  const subwayBonus = Math.min(20, subwayTiles * 0.5 + subwayStations * 3);
  const comBase = (population * 0.3 - jobs * 0.3) / 4 + subwayBonus;
  const comAirport = hasAirport ? 15 : 0;
  const comCityHall = hasCityHall ? 10 : 0;
  const comStadium = Math.min(20, stadiumCount * 12);
  const comMuseum = Math.min(15, museumCount * 8);
  const comAmusementPark = hasAmusementPark ? 18 : 0;
  const comRail = Math.min(12, railTiles * 0.15 + railStations * 4);

  const comTotalPreTax = comBase + comAirport + comCityHall + comStadium + comMuseum + comAmusementPark + comRail;
  const comTaxImpact = (comTotalPreTax * taxMultiplier + taxAdditiveModifier * 0.8) - comTotalPreTax;

  const commercial: DemandCategoryBreakdown = {
    total: Math.min(100, Math.max(-100, comTotalPreTax + comTaxImpact)),
    factors: [
      { name: msg('Base Demand'), value: comBase, description: msg('Consumer base vs available shops') },
      { name: msg('Airport'), value: comAirport },
      { name: msg('City Hall'), value: comCityHall },
      { name: msg('Stadiums'), value: comStadium },
      { name: msg('Museums'), value: comMuseum },
      { name: msg('Amusement Park'), value: comAmusementPark },
      { name: msg('Rail Network'), value: comRail },
      { name: msg('Tax Impact'), value: comTaxImpact }
    ].filter(f => f.value !== 0 || f.name === msg('Base Demand') || f.name === msg('Tax Impact')),
    advice: comBase < 0 ? msg('Grow your population to increase commercial demand.') : msg('Zone more commercial areas for new businesses.')
  };

  // 5. Industrial Breakdown
  const indBase = (population * 0.35 - jobs * 0.3) / 2.0;
  const indAirport = hasAirport ? 10 : 0;
  const indCityHall = hasCityHall ? 5 : 0;
  const indSpaceProgram = hasSpaceProgram ? 20 : 0;
  const indRail = Math.min(18, railTiles * 0.25 + railStations * 6);

  const indTotalPreTax = indBase + indAirport + indCityHall + indSpaceProgram + indRail;
  const indTaxImpact = (indTotalPreTax * taxMultiplier + taxAdditiveModifier * 0.5) - indTotalPreTax;

  const industrial: DemandCategoryBreakdown = {
    total: Math.min(100, Math.max(-100, indTotalPreTax + indTaxImpact)),
    factors: [
      { name: msg('Base Demand'), value: indBase, description: msg('Available labor for factories') },
      { name: msg('Airport'), value: indAirport },
      { name: msg('City Hall'), value: indCityHall },
      { name: msg('Space Program'), value: indSpaceProgram },
      { name: msg('Rail Network'), value: indRail },
      { name: msg('Tax Impact'), value: indTaxImpact }
    ].filter(f => f.value !== 0 || f.name === msg('Base Demand') || f.name === msg('Tax Impact')),
    advice: indBase < 0 ? msg('Increase population to provide more labor for industry.') : msg('Zone more industrial areas to expand production.')
  };

  return { residential, commercial, industrial };
}