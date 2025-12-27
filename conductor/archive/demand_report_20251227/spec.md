# Specification: Demand Report Modal

## Overview
This feature introduces a detailed "Demand Report" modal that explains the factors influencing the current Residential, Commercial, and Industrial (RCI) demand. Users can access this modal by clicking on the RCI bars in the TopBar or by pressing a keyboard shortcut.

## Functional Requirements
- **Trigger Mechanisms:**
    - Clicking on the RCI demand charts (bars) in the TopBar.
    - Keyboard shortcut: `D`.
- **Modal Content:**
    - **Categorized Breakdown:** Sections for Residential, Commercial, and Industrial demand.
    - **Visual Indicators:** Use icons and color-coding consistent with the game's theme.
    - **Demand Factors:**
        - **Base Demand:** Derived from the ratio of population and jobs.
        - **Tax Impact:** Show how the current tax rate (multiplier and additive modifier) affects demand.
        - **Special Building Bonuses:** List bonuses from buildings like Airports, City Halls, Space Programs, Stadiums, and Museums.
        - **Infrastructure Bonuses:** Include boosts from Subway and Rail networks.
    - **Detailed Table:** A breakdown showing the raw numbers for each factor, helping the user understand "why" the demand is at its current value.
    - **Actionable Advice:** Brief tips on how to improve specific demand types (e.g., "Increase jobs to boost residential demand").

## Technical Implementation (Estimation Approach)
- **Modular Logic:** To avoid heavy refactoring of the simulation engine and ensure compatibility with upstream changes, the demand factors will be **estimated in the UI layer**.
- **Demand Utility:** Create a utility function (e.g., `calculateDemandBreakdown`) that replicates the logic found in `simulation.ts` but returns a structured object for display.
- **State Integration:** The modal will read directly from the `GameState` (population, jobs, grid counts for buildings/infrastructure).

## Acceptance Criteria
- [ ] Clicking RCI bars opens the Demand Report modal.
- [ ] Pressing 'D' opens the Demand Report modal.
- [ ] The modal displays a categorized breakdown for RCI.
- [ ] The factors shown (Base, Tax, Bonuses) roughly sum up to the current demand values shown in the TopBar.
- [ ] The modal is responsive and works on mobile.
- [ ] The modal can be closed via an 'X' button or by clicking outside.

## Out of Scope
- Real-time editing of demand factors from the modal (this is a report, not a cheat menu).
- Historical demand charts (separate feature).
