# Fork Feature Registry

This file tracks all features unique to this fork of IsoCity. It serves as a reference for Conductor during upstream synchronization tracks to identify potential conflict zones and protect architectural invariants.

## Summary of Divergence

| Feature Name | Status | Primary Files | Description |
|--------------|--------|---------------|-------------|
| Building Upgrades | Completed | `src/config/buildingUpgrades.ts`, `src/lib/upgradeUtils.ts`, `src/lib/simulation.ts` | Modular system to enhance service buildings with increased range and efficiency. |
| Target Level Overlay | Completed | `src/lib/simulation.ts`, `src/components/game/overlays.ts` | Visual feedback showing the potential growth level of zoned buildings. |
| Advanced Shortcuts & Cycling | Completed | `src/hooks/useGameKeyboard.ts`, `src/components/game/ModeIndicator.tsx` | Category-based shortcut cycling (e.g., 'S' for Services) and improved discoverability. |
| Demand Report Modal | Completed | `src/lib/demandUtils.ts`, `src/components/game/DemandReportModal.tsx` | Transparency report explaining factors behind RCI demand (Tax, Jobs, etc.). |
| Integrated Player Guide | Completed | `PLAYER_GUIDE.md` | Comprehensive in-repo documentation of simulation mechanics. |

## Detailed Feature Registry

### [Building Upgrades]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Do not overwrite `src/lib/upgradeUtils.ts`.
    - Merges in `src/lib/simulation.ts` (specifically `calculateServiceCoverage` and `updateBudgetCosts`) must preserve calls to `getBuildingRange`, `getBuildingMaintenance`, etc.
    - `src/context/GameContext.tsx` must maintain the `upgradeBuilding` action and migration logic for `isUpgraded` property.
    - `src/lib/shareState.ts` must maintain `isUpgraded` in the serialization/deserialization logic.
- **Key Files:**
    - `src/config/buildingUpgrades.ts`
    - `src/lib/upgradeUtils.ts`
    - `src/components/game/BuildingUpgradeUI.tsx`

### [Target Level Overlay]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Preserve the `calculateTargetLevel` export in `src/lib/simulation.ts`.
    - Preserve the 'target_level' case in `src/components/game/overlays.ts`.
- **Key Files:**
    - `src/lib/simulation.ts` (calculateTargetLevel)
    - `src/components/game/overlays.ts` (Overlay logic)

### [Advanced Shortcuts & Cycling]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Protect the cycling logic in `src/hooks/useGameKeyboard.ts` (specifically the logic that checks `prevTool` to decide the next tool in a category).
    - Ensure `src/components/game/ModeIndicator.tsx` remains integrated with the TopBar.
- **Key Files:**
    - `src/hooks/useGameKeyboard.ts`
    - `src/components/game/ModeIndicator.tsx`

### [Demand Report Modal]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Do not overwrite `src/lib/demandUtils.ts` as it contains fork-specific transparency logic.
    - Ensure `src/components/game/TopBar.tsx` and `src/components/mobile/MobileTopBar.tsx` keep the demand indicator click triggers.
    - Preserve the 'D' shortcut in `src/hooks/useGameKeyboard.ts`.
- **Key Files:**
    - `src/lib/demandUtils.ts`
    - `src/components/game/DemandReportModal.tsx`

### [Integrated Player Guide]
- **Primary Owner:** Fork
- **Protection Rules:**
    - Maintain `PLAYER_GUIDE.md` as the primary source of truth for fork-specific mechanics.
- **Key Files:**
    - `PLAYER_GUIDE.md`

---
*Note: This registry is maintained by Conductor during 'Robust Upstream Sync' tracks.*