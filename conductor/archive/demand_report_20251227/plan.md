# Plan: Demand Report Modal Implementation

## Phase 1: Demand Breakdown Logic (TDD) [checkpoint: d493a10]
- [x] Task: Create `src/lib/demandUtils.ts` to isolate demand calculation logic. a9c8d39
- [x] Task: Implement `calculateDemandBreakdown(state: GameState)` replicating `simulation.ts` logic for estimation. a9c8d39
- [x] Task: Write unit tests in `src/lib/__tests__/demandUtils.test.ts` to verify breakdown factors (Base, Tax, Bonuses). a9c8d39
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Demand Breakdown Logic' (Protocol in workflow.md)

## Phase 2: Demand Report Modal Component [checkpoint: 6e7fb2d]
- [x] Task: Create `src/components/game/DemandReportModal.tsx` using `shadcn/ui` Dialog primitives. 6e7fb2d
- [x] Task: Implement the categorized layout (Residential, Commercial, Industrial). 6e7fb2d
- [x] Task: Add the detailed breakdown tables with icons and formatting for "positive/negative" impacts. 6e7fb2d
- [x] Task: Add localized actionable advice strings for each demand type. 6e7fb2d
- [x] Task: Conductor - User Manual Verification 'Phase 2: Demand Report Modal Component' (Protocol in workflow.md) 6e7fb2d

## Phase 3: Integration & Triggers [checkpoint: a67b48e]
- [x] Task: Update `GameContext` or `Game.tsx` to manage the modal's open/close state. a67b48e
- [x] Task: Modify `src/components/game/TopBar.tsx` to make RCI bars clickable. a67b48e
- [x] Task: Add 'D' key listener to `src/hooks/useGameKeyboard.ts`. a67b48e
- [x] Task: Ensure the modal is accessible and readable on mobile in `src/components/mobile/MobileTopBar.tsx`. a67b48e
- [x] Task: Conductor - User Manual Verification 'Phase 3: Integration & Triggers' (Protocol in workflow.md) a67b48e

## Phase 4: Polishing & Cleanup [checkpoint: e17f160]
- [x] Task: Update `FORK_FEATURES.md` to include the Demand Report Modal. e17f160
- [x] Task: Refine animations and styling to match the "zen" city-builder aesthetic. e17f160
- [x] Task: Final pass on localization and string keys. e17f160
- [x] Task: Conductor - User Manual Verification 'Phase 4: Polishing & Cleanup' (Protocol in workflow.md) e17f160
