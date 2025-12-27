# Upstream Impact Report (Template)

**Track ID:** [Sync Track ID]
**Upstream Target:** [e.g., upstream/main]
**Comparison Date:** YYYY-MM-DD

## 1. Context Analysis
*Summary of the git log review (HEAD..upstream/main).*
- **Primary Upstream Themes:** [e.g., performance optimizations, bug fixes in rendering]
- **Key Commits/Authors:** [e.g., @author1 added feature X]

## 2. Intersection Report
*Files changed upstream that intersect with features listed in `FORK_FEATURES.md`.*

| File Path | Fork Feature | Impact Level | Recommended Decision |
|-----------|--------------|--------------|----------------------|
| [path]    | [feature]    | [High/Med/Low]| [TAKE/KEEP/HYBRID]   |

## 3. Decision Matrix
*Detailed reasoning for non-trivial decisions.*

### [Feature Name]
- **Intersection:** [Describe the overlap]
- **Decision:** [TAKE_UPSTREAM / KEEP_FORK / HYBRID]
- **Rationale:** [Explain why this decision was made]

## 4. "Safe" Changes (Non-Intersecting)
*Files changed upstream that do not overlap with fork-exclusive features.*
- [Path 1]
- [Path 2]

## 5. Verification Plan (Custom Additions)
*List any manual verification steps beyond the standard project Checkpoint Protocol.*
- [ ] [Verification Task]
