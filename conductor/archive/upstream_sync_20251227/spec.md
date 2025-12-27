# Specification: Robust Upstream Sync (General Maintenance)

## 1. Overview
This track executes a disciplined synchronization of the local fork with the `upstream/main` branch of the IsoCity project. The primary goal is to incorporate general maintenance updates, bug fixes, and improvements from the original repository while strictly preserving the unique features defined in `FORK_FEATURES.md`.

## 2. Source & Scope
- **Upstream Target:** `upstream/main`
- **Scope:** General maintenance and currency (no specific upstream feature targets).
- **Conflict Strategy:** Strict Manual Review (Case-by-case).
    - Ambiguous conflicts (not covered by `FORK_FEATURES.md`) will be analyzed individually.
    - Related conflicts will be grouped to streamline the decision-making process.

## 3. Workflow Protocol
This track follows the **Upstream Sync Workflow** defined in `conductor/workflow.md`:

1.  **Phase 1: Conflict Analysis**
    - Fetch latest upstream changes.
    - Generate an **Upstream Impact Report** identifying intersections with `FORK_FEATURES.md`.
    - Define a **Decision Matrix** for all conflicts (TAKE_UPSTREAM, KEEP_FORK, HYBRID).

2.  **Phase 2: Implementation**
    - Execute the merge.
    - Resolve conflicts according to the Decision Matrix.
    - Implement architectural adaptations for HYBRID decisions.

3.  **Phase 3: Verification**
    - **Automated:** Run full test suite to ensure regression safety.
    - **Manual:** Execute the **Checkpoint Protocol** for all "Intersection" files to verify fork features (Building Upgrades, Overlay, etc.) remain functional.

## 4. Decision Matrix

| Intersection Area | Component | Strategy | Rationale |
|-------------------|-----------|----------|-----------|
| i18n / Tool Names | `src/types/game.ts` | **HYBRID** | Adopt `msg()` wrapping from upstream; apply it to all 30+ fork-exclusive park tools. |
| Building Properties | `src/types/game.ts` | **KEEP_FORK** | Preserve `isUpgraded` in `Building` interface and other fork-specific types. |
| Grid Rendering | `src/components/game/CanvasIsometricGrid.tsx` | **HYBRID** | Adopt upstream componentization (lighting, bridges, sprites). Port 'Target Level Overlay' logic into the new modular drawing flow. |
| Service Simulation | `src/lib/simulation.ts` | **HYBRID** | Adopt upstream hospital radius & car scaling. Preserve Building Upgrade multipliers (`getBuildingRange`, etc.) and Target Level calculation. |
| State/Serialization | `src/lib/shareState.ts` | **HYBRID** | Adopt LZ encoding. Ensure `isUpgraded` is included in serialized building data for cross-platform compatibility and saving. |
| Keyboard Shortcuts | `src/hooks/useGameKeyboard.ts` | **HYBRID** | Adopt any new upstream shortcuts. Preserve cycling logic for fork-exclusive categories. |

## 5. Success Criteria
- The local repository is even with `upstream/main`.
- All tests pass (`npm test`).
- No regressions in Fork Features (verified via manual checkpoint).
- All merge conflicts are resolved and documented.
