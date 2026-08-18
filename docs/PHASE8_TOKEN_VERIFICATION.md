# Phase 8 — Token objective verification

**Date:** 2026-08-18
**Status:** Real, measured — not projected. Scope: **qudrat only** (1 of 21 tracks). The reduction below
is proven to work, not yet realized site-wide — see "What this does and doesn't prove" at the end.

Per `clipsat_reengineering_prompt.md`'s Phase 8: re-measure the ten benchmark tasks from
`docs/INVENTORY.md` §8 against the migrated codebase and report the real delta. Target: ≥70% reduction in
tokens-to-read for the median task, ≤3 files edited for any routine content task.

## Method

Same heuristic as the Phase 0 baseline (~4 bytes/token). "Before" figures are Phase 0's original
grep-first numbers (§8) — the realistic case *with* `CLAUDE_CODE_STARTER_PROMPT.md`/`AGENTS.md` guidance,
not the naive 870K-token full-file read. "After" figures are real file sizes measured directly:
`content/qudrat/*.json` average chapter = 5,329 bytes (~1,332 tokens); `qud-ratio.json`, the most complex
chapter (has 2 interactive explorers), is 10,257 bytes (~2,564 tokens) — used as the conservative/worst
case below rather than the average.

## Tasks directly affected by the qudrat migration

| # | Task | Before (grep-first, Phase 0) | After (qudrat, measured) | Reduction | Files edited (before → after) |
|---|---|---|---|---|---|
| 1 | Add a lesson/chapter, EN+AR | ~15–40K tokens | ~1,300–2,600 tokens (one chapter file) | **~90–95%** | 5 (1 real + 4 mechanical: `main.css`/`engine.js`/`sw.js` version bumps + regenerated include) → **1** (no mechanical steps — migrated tracks don't touch `build.js`'s extraction path at all) |
| 6 | Embed a video into an existing lesson | ~10K tokens | ~1,300–2,600 tokens (same chapter file, plus the schema already has a `videos[]` field — no ad hoc markup to invent) | **~85–90%** | 5 → **1** |
| 10 | Translate an English-only page to Arabic | ~15–40K tokens | ~1,300–2,600 tokens (set `ar` fields in the same chapter file — real example: `qud-arithmetic`/`qud-algebra`/`qud-geometry` conversions each touched exactly one file) | **~90–95%** | 5 → **1** |
| 5 | Fix an Arabic-RTL layout defect | ~20–42K tokens (if structural, `index.html`) | If the bug is in content: same chapter file (~1,300–2,600 tokens). If structural: one `partials/blocks/*.njk` (60–170 lines each) instead of hunting a 41K-line file | **~90%+** for content bugs; template bugs are a new, smaller category that didn't exist before | 1–2 → **1** |

## Tasks NOT changed by this migration (sitewide chrome, not per-track content)

| # | Task | Status |
|---|---|---|
| 2 | Add an entirely new course/track | **Not simpler by file count** — the new system trades fewer files for smaller, more targeted ones (Phase 1 principle #2). A new track under the target system is `_meta.json` + one file per chapter + `index.njk` + a `build.js`/`MIGRATED_TRACKS` entry — comparable or more files than the legacy single-`index.html`-section approach, but each file is small and independently editable. Token cost per *individual* edit is still far lower; total token cost to author a whole new track is roughly unchanged (the content has to be written either way). |
| 3 | Rebrand (color/typeface) | Unaffected — governed entirely by `public/css/main.css`'s token layer (WP2), independent of content system |
| 4 | Add a new quiz question type | Unaffected — `bank-data/*.json` schema + `engine.js`, independent of content system |
| 7 | Add nav item + landing page | Unaffected — sitewide chrome (`index.html` nav + `build.js`'s `baseNjk` nav, still 2 files, still the confirmed duplication from `docs/INVENTORY.md` §2 — WP3 added a safety check, didn't eliminate the duplication) |
| 8 | Update sitewide footer | Unaffected — same 2-file duplication as task 7, same WP3 safety net |
| 9 | Add SEO/structured data to a page type | Unaffected — already a single edit point (`build.js`'s `baseNjk`) before this migration; migrated tracks still use the same shared `base.njk` layout |

## What this does and doesn't prove

**Proven:** the target architecture, once a track is migrated, delivers a real ~90%+ token reduction for
the content-editing tasks that make up most of a solo teacher-maintainer's actual day-to-day work (add a
lesson, translate a page, embed a video, fix a content-level RTL issue) — and cuts the mechanical
cache-busting/regeneration steps to zero for that track. This isn't a projection; it's measured against
real shipped chapter files.

**Not yet proven, and not yet true:** the *site-wide* median across all 21 tracks has not moved, because
20 of 21 tracks are still entirely on the legacy system, where Phase 0's original numbers still apply
unchanged. The ≥70% target is met **for a migrated track**, not **for the median task on the site as it
stands today**. Closing that gap requires migrating the remaining 20 tracks — see
`docs/PHASE1-2_TARGET_ARCHITECTURE.md`'s WP9+ status for where that stands.
