# Plan: Robust Upstream Sync (General Maintenance)

## Phase 1: Conflict Analysis & Decision Matrix [checkpoint: 1920170]
- [x] Task: Prepare Upstream Remote and Fetch d69a32b
    - Ensure `upstream` remote is configured: `https://github.com/amilich/isometric-city.git`
    - Fetch latest changes from `upstream/main`
- [x] Task: Context Gathering & Intersection Check
    - Review `git log HEAD..upstream/main --oneline`
    - Identify files changed upstream that intersect with `FORK_FEATURES.md`
- [x] Task: Generate Upstream Impact Report
    - Use `./conductor/templates/upstream_impact_report.md`
    - List intersection zones and "Safe" changes
- [x] Task: Define Decision Matrix
    - For each intersection, document decision (TAKE_UPSTREAM, KEEP_FORK, HYBRID)
    - Group related decisions to streamline implementation
- [x] Task: Conductor - User Manual Verification 'Phase 1: Conflict Analysis & Decision Matrix' (Protocol in workflow.md) 1920170

## Phase 2: Implementation (Merge & Resolution) [checkpoint: 18a23c4]
- [x] Task: Execute Merge efa917c
    - `git merge upstream/main`
- [x] Task: Resolve Conflicts efa917c
    - Apply decisions from the Decision Matrix
    - Ensure all conflict markers are removed
- [x] Task: Implement Hybrid Adaptations efa917c
    - Perform architectural adaptations for any `HYBRID` decisions to ensure features coexist
- [x] Task: Conductor - User Manual Verification 'Phase 2: Implementation (Merge & Resolution)' (Protocol in workflow.md) 18a23c4

## Phase 3: Verification & Finalization
- [x] Task: Automated Regression Testing 02b4c2b
    - Run `npm test` and ensure all tests pass
- [x] Task: Manual Feature Audit 02b4c2b
    - Perform mandatory manual verification for all files identified in the Intersection Report
    - Verify Building Upgrades, Target Level Overlay, and Shortcuts remain functional
- [x] Task: Synchronize Project Documentation 02b4c2b
    - Update `FORK_FEATURES.md` or other docs if upstream changes impact them
- [~] Task: Track Cleanup
    - Follow the "Track Completion and Cleanup Workflow"
- [x] Task: Conductor - User Manual Verification 'Phase 3: Verification & Finalization' (Protocol in workflow.md) 02b4c2b
