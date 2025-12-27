# Specification: Robust Upstream Sync Process

## Overview
This track formalizes the process for syncing changes from the upstream repository into our fork. Instead of haphazard merges, syncing will be treated as a first-class "Conductor Track." This ensures that incoming changes are analyzed against our fork's unique features, conflicts are resolved with documented intent, and regressions are prevented through a defined verification workflow.

## Functional Requirements

### 1. Fork Feature Registry
- **File:** Create a top-level `FORK_FEATURES.md`.
- **Content:**
    - A registry of all features unique to this fork.
    - Key files associated with each feature.
    - "Protection Rules" (e.g., architectural invariants that upstream changes should not break).
- **Purpose:** Serve as a reference for Conductor to identify potential conflict zones during sync tracks.

### 2. Upstream Sync Track Lifecycle
When an "Upstream Sync" track is initiated:
- **Conflict Analysis Phase:**
    - Perform a `git fetch upstream`.
    - **Context Gathering:** Review the git commit log between the current state and the upstream target. Use this to understand the *rationale* behind changes and the specific areas touched, acknowledging that the log may contain noise (e.g., experimental commits that were later reverted).
    - Compare current fork state with upstream's latest stable branch (e.g., `upstream/main`).
    - Generate an "Upstream Impact Report" in the track's `spec.md` or `plan.md`.
    - Identify files changed upstream that intersect with `FORK_FEATURES.md`.
- **Decision Matrix:**
    - For every identified conflict or intersection, a decision must be recorded:
        - `TAKE_UPSTREAM`: Overwrite our local change with upstream logic.
        - `KEEP_FORK`: Discard upstream change to protect fork feature.
        - `HYBRID`: Manually merge and adapt features to coexist.
- **Implementation Phase:**
    - Perform the merge/rebase based on the Decision Matrix.
    - Resolve standard git conflicts according to the documented decisions.

### 3. Verification Workflow
- **Automated:** Run the full project test suite.
- **Manual (Mandatory):** Any file identified in the "Conflict Analysis" phase requires manual verification according to the project's Checkpoint Protocol, ensuring fork features remain functional.

### 4. Conductor Documentation Updates
- **`workflow.md`:** Add a new "Upstream Sync Workflow" section detailing the Conflict Analysis (including git log review), Decision Matrix, and Verification steps.
- **`product.md`:** Add a section describing our philosophy on maintaining a robust fork while staying synced with upstream.

## Acceptance Criteria
- [ ] `FORK_FEATURES.md` exists and is populated with current divergent features (e.g., Building Upgrades).
- [ ] `workflow.md` contains the formal procedure for "Upstream Sync" tracks, explicitly mentioning git log review for context.
- [ ] A template or section for "Upstream Impact Report" is defined.
- [ ] The sync process successfully handles the transition from "Safe" to "Conflicted" areas with explicit documentation.

## Out of Scope
- Fully automated auto-merging without human review.
- Automated resolution of complex logical conflicts (AI can suggest, but human must approve decisions).
