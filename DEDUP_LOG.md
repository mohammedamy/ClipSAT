# ClipSAT Dedup Log

**Historical — frozen as of WP10 step 4 (2026-08-20).** This file recorded every duplicate
content block removed during the legacy `index.html`/`build.js` per-track extraction pipeline
(the one real entry ever logged, calculus's DUP-001 duplicate FTC theorem block, was fixed
directly in `content/calculus/*.json` when calculus migrated — see docs/DECISIONS/0022). That
extraction pipeline is retired (docs/DECISIONS/0023); `build.js` no longer regenerates this file.
Kept as a historical record, not actively maintained.

Records every duplicate content block removed during Phase 1 extraction.
Each entry is logged here BEFORE removal so changes are auditable.

## Summary

| ID | Track | Type | Identifier | Size | Notes |
|----|-------|------|-----------|------|-------|
| — | — | — | — | — | *No duplicates removed in this build* |

## Build history

| Date | Script version | Tracks processed | Dups removed |
|------|---------------|-----------------|-------------|
| 2026-08-20 | build.js v1.0 | 22 | 0 |
