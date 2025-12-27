# Upstream Impact Report

**Track ID:** upstream_sync_20251227
**Upstream Target:** upstream/main
**Comparison Date:** 2025-12-27

## 1. Context Analysis
Significant activity in `upstream/main` focusing on modularization, performance, and internationalization.
- **Primary Upstream Themes:**
    - **i18n (Locadex):** Integration of translation system across UI and game types.
    - **Componentization:** `CanvasIsometricGrid` has been split into specialized modules (`lightingSystem.ts`, `bridgeDrawing.ts`, `buildingSprite.ts`).
    - **Performance:** Saving now uses a WebWorker; LZ compression for save files.
    - **UX:** Toast tips system and command menu improvements.
- **Key Authors:** Andrew Milich (@amilich) and locadex-agent[bot].

## 2. Intersection Report
Files changed upstream that intersect with features listed in `FORK_FEATURES.md`.

| File Path | Fork Feature | Impact Level | Recommended Decision |
|-----------|--------------|--------------|----------------------|
| `src/lib/simulation.ts` | Building Upgrades, Overlay | High | HYBRID |
| `src/context/GameContext.tsx` | Building Upgrades | High | HYBRID |
| `src/lib/shareState.ts` | Building Upgrades | High | HYBRID |
| `src/components/game/CanvasIsometricGrid.tsx` | Target Level Overlay | CRITICAL | HYBRID |
| `src/hooks/useGameKeyboard.ts` | Advanced Shortcuts | High | HYBRID |
| `src/types/game.ts` | New Park Tools | High | HYBRID |
| `src/components/Game.tsx` | UI Integration | Medium | HYBRID |

## 3. Decision Matrix

### CanvasIsometricGrid Refactoring
- **Intersection:** Upstream extracted bridge and building logic. Fork has 'Target Level Overlay' logic embedded in the main draw loop.
- **Decision:** HYBRID
- **Rationale:** We must re-integrate the `TargetLevel` overlay logic into the new modularized drawing system, likely within the new `buildingSprite.ts` or as a standalone overlay module if upstream created one.

### i18n Integration
- **Intersection:** Upstream wrapped all `TOOL_INFO` strings in `msg()`. Fork has ~30 new tools in `src/types/game.ts`.
- **Decision:** HYBRID
- **Rationale:** We will adopt the `msg()` wrapping for all existing tools and manually wrap our new Park tools to maintain consistency with the new i18n system.

### Save System (LZ & WebWorker)
- **Intersection:** Upstream changed how games are saved/loaded. Fork has `isUpgraded` property in buildings that must persist.
- **Decision:** HYBRID
- **Rationale:** Ensure the new LZ encoding and WebWorker serialization logic includes the `isUpgraded` field and any other fork-specific building properties.

## 4. "Safe" Changes (Non-Intersecting)
- `src/components/ui/TipToast.tsx`
- `src/hooks/useTipSystem.ts`
- `src/components/game/panels/AdvisorsPanel.tsx` (and other panels)
- `src/components/mobile/MobileToolbar.tsx`
- `public/_gt/*.json` (translations)

## 5. Verification Plan (Custom Additions)
- [ ] Verify that all 30+ new Park tools are correctly localized (or at least wrapped for locadex).
- [ ] Verify that "Building Upgrades" still increase service range after the hospital radius update upstream.
- [ ] Verify that "Target Level Overlay" still renders correctly with the new componentized grid.
- [ ] Verify that save files with upgraded buildings are correctly compressed and decompressed.
