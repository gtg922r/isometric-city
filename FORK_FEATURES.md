# Fork Feature Registry

This file tracks all features unique to this fork of IsoCity. It serves as a reference for Conductor during upstream synchronization tracks to identify potential conflict zones and protect architectural invariants.

## Summary of Divergence

| Feature Name | Status | Primary Files | Description |
|--------------|--------|---------------|-------------|
| Building Upgrades | Completed | `src/config/buildingUpgrades.ts`, `src/lib/upgradeUtils.ts`, `src/lib/simulation.ts`, `src/components/game/BuildingUpgradeUI.tsx`, `src/context/GameContext.tsx` | Modular system to enhance service buildings with increased range and efficiency. |
| Target Level Overlay | Completed | `src/lib/simulation.ts`, `src/components/game/CanvasIsometricGrid.tsx` | Visual feedback showing the potential growth level of zoned buildings. |

## Detailed Feature Registry

### [Building Upgrades]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Do not overwrite `upgradeUtils.ts`.
    - Merges in `simulation.ts` (specifically `calculateServiceCoverage` and `updateBudgetCosts`) must preserve calls to `getBuildingRange`, `getBuildingMaintenance`, etc.
    - `GameContext.tsx` must maintain the `upgradeBuilding` action and migration logic for `isUpgraded` property.
- **Key Files:**
    - `src/config/buildingUpgrades.ts`
    - `src/lib/upgradeUtils.ts`
    - `src/components/game/BuildingUpgradeUI.tsx`

### [Target Level Overlay]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Preserve the `calculateTargetLevel` export in `simulation.ts`.
    - Preserve the 'targetLevel' overlay rendering logic in `CanvasIsometricGrid.tsx`.
- **Key Files:**
    - `src/lib/simulation.ts` (calculateTargetLevel)
    - `src/components/game/CanvasIsometricGrid.tsx` (Overlay rendering)

---
*Note: This registry is maintained by Conductor during 'Robust Upstream Sync' tracks.*
