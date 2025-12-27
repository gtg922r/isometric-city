# Plan: Demand Report Modal Implementation

## Phase 1: Demand Breakdown Logic (TDD)
- [ ] Task: Create `src/lib/demandUtils.ts` to isolate demand calculation logic.
- [ ] Task: Implement `calculateDemandBreakdown(state: GameState)` replicating `simulation.ts` logic for estimation.
- [ ] Task: Write unit tests in `src/lib/__tests__/demandUtils.test.ts` to verify breakdown factors (Base, Tax, Bonuses).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Demand Breakdown Logic' (Protocol in workflow.md)

## Phase 2: Demand Report Modal Component
- [ ] Task: Create `src/components/game/DemandReportModal.tsx` using `shadcn/ui` Dialog primitives.
- [ ] Task: Implement the categorized layout (Residential, Commercial, Industrial).
- [ ] Task: Add the detailed breakdown tables with icons and formatting for "positive/negative" impacts.
- [ ] Task: Add localized actionable advice strings for each demand type.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Demand Report Modal Component' (Protocol in workflow.md)

## Phase 3: Integration & Triggers
- [ ] Task: Update `GameContext` or `Game.tsx` to manage the modal's open/close state.
- [ ] Task: Modify `src/components/game/TopBar.tsx` to make RCI bars clickable.
- [ ] Task: Add 'D' key listener to `src/hooks/useGameKeyboard.ts`.
- [ ] Task: Ensure the modal is accessible and readable on mobile in `src/components/mobile/MobileTopBar.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration & Triggers' (Protocol in workflow.md)

## Phase 4: Polishing & Cleanup
- [ ] Task: Update `FORK_FEATURES.md` to include the Demand Report Modal.
- [ ] Task: Refine animations and styling to match the "zen" city-builder aesthetic.
- [ ] Task: Final pass on localization and string keys.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Polishing & Cleanup' (Protocol in workflow.md)
