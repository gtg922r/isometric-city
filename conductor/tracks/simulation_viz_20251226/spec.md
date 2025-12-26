# Spec: Visualize Simulation Mechanics

## Overview
To complement the recently updated Player Guide, we will implement in-game tools that allow players to visualize the hidden mechanics of the simulation. This includes a new "Target Level" overlay and improved keyboard shortcuts for easier navigation.

## Functional Requirements

### 1. Keyboard Shortcuts Update
- **Sports Category:** Remap the shortcut for the Sports building category to **'A'**.
- **Overlay Toggling:** Remap the **'O'** key (currently unused or assigned to Sports?) to cycle through available data overlays.
    - **Cycle Order:** `None` -> `Traffic` -> `Land Value` -> `Target Level` -> `None`.
    - **Feedback:** Show a small toast or UI indicator of the active overlay.

### 2. Target Level Overlay
- **Purpose:** Visualize the potential density of each tile based on the game's simulation rules.
- **Logic:** Calculate `targetLevel` for every tile using the exact formula from `simulation.ts`:
    - `Floor(Base + Services + Age + Demand)` (simplified representation).
    - Note: Since `Age` is building-specific, for empty tiles we should project the *potential* level if a building were placed there (Age=0).
- **Visualization:**
    - Apply a color tint to the grid.
    - **Level 1-2:** Red/Orange (Low density potential).
    - **Level 3-4:** Yellow/Light Green (Medium density potential).
    - **Level 5:** Bright Green (High density potential).
- **Integration:** Must be accessible via the new 'O' shortcut loop.

## Non-Functional Requirements
- **Performance:** Overlay calculation should be efficient (ideally reusing existing simulation loops or lazy-calculated).
- **Consistency:** Colors should match existing overlay styles (e.g., traffic overlay).

## Acceptance Criteria
- [ ] Pressing 'A' selects the Sports category.
- [ ] Pressing 'O' cycles through overlays, including the new one.
- [ ] The "Target Level" overlay accurately highlights areas where buildings *would* level up vs. areas that are stifled.
- [ ] Overlay updates dynamically as services (Police, Schools) are placed.
