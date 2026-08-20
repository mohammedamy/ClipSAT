# Phase 8 — Token objective verification

**Date:** 2026-08-20
**Status:** Real, measured — not projected. Scope: **site-wide, all 21 of 21 tracks** (a2level, act,
act2, alg2, algebra, apab, apbc, appc, apstats, aslevel, calculus, est, est2, geo, ibhl, ibsl, igcse,
precalc, qudrat, sat, tahsili). This supersedes the 2026-08-18 qudrat-only version of this document — the
migration that document flagged as "not yet proven site-wide" completed on 2026-08-19 (WP33, calculus, the
last of 21 tracks), and every real chapter file across every track has now been measured directly, not
sampled.

Per `clipsat_reengineering_prompt.md`'s Phase 8: re-measure the ten benchmark tasks from
`docs/INVENTORY.md` §8 against the migrated codebase and report the real delta. Target: ≥70% reduction in
tokens-to-read for the median task, ≤3 files edited for any routine content task.

## Method

Same heuristic as the Phase 0 baseline (~4 bytes/token). "Before" figures are Phase 0's original
grep-first numbers (§8) — the realistic case *with* `CLAUDE_CODE_STARTER_PROMPT.md`/`AGENTS.md` guidance,
not the naive 870K-token full-file read; these are unchanged from the original inventory. "After" figures
are real file sizes measured directly across **every chapter file in every one of the 21 tracks** —
215 chapter files total (`content/{track}/*.json`, excluding each track's `_meta.json` and
`_practice-set.json`, which are track metadata and a shared practice-question bank respectively, not
lesson chapters):

| Statistic | Bytes | Tokens (~÷4) |
|---|---|---|
| Pooled average chapter (215 files, all 21 tracks) | 5,380 | ~1,345 |
| Pooled median chapter | 5,259 | ~1,315 |
| Smallest chapter site-wide (`algebra/ag-factoring.json`) | 2,045 | ~511 |
| **Largest chapter site-wide — new conservative worst case** (`apstats/aps-u4.json`) | 12,448 | ~3,112 |

Per-track detail (n = chapter files excluding `_meta`/`_practice-set`; avg/max in tokens):

| Track | n | Avg tokens | Max tokens | Largest chapter file |
|---|---:|---:|---:|---|
| a2level | 16 | 1,151 | 1,661 | a2l-about.json |
| act | 9 | 1,073 | 1,445 | act-coordgeo.json |
| act2 | 9 | 1,162 | 1,530 | act2-trig.json |
| alg2 | 11 | 1,057 | 1,675 | a2-rational.json |
| algebra | 11 | 1,060 | 1,905 | ag-functions.json |
| apab | 11 | 1,111 | 1,694 | apab-overview.json |
| apbc | 9 | 1,075 | 1,489 | apbc-c6.json |
| appc | 5 | 1,821 | 2,466 | appc-u1.json |
| apstats | 5 | 2,270 | **3,112** | aps-u4.json |
| aslevel | 20 | 1,172 | 1,819 | as-about.json |
| calculus | 16 | 1,743 | 2,512 | ch-applications.json |
| est | 9 | 1,239 | 1,680 | est-quadratics.json |
| est2 | 9 | 1,184 | 1,615 | est2-circles.json |
| geo | 11 | 813 | 1,401 | geo-right.json |
| ibhl | 8 | 1,680 | 2,326 | ibhl-t3.json |
| ibsl | 7 | 1,822 | 2,374 | ibsl-t2.json |
| igcse | 11 | 1,711 | 2,997 | ig-number.json |
| precalc | 8 | 1,515 | 2,017 | pc-circles.json |
| qudrat | 9 | 1,587 | 2,641 | qud-ratio.json |
| sat | 11 | 1,503 | 2,627 | sat-data.json |
| tahsili | 10 | 1,493 | 2,630 | tah-about.json |

**Real variance found, and what it means for the "worst case" figure used below:** the previous,
qudrat-only version of this document used qudrat's own most-complex chapter (`qud-ratio.json`, 2,564
tokens) as the conservative worst case. That figure does **not** hold as the site-wide worst case.
Two independent effects push it up:

- **Chapter density, not explorer count, drives file size.** Calculus is the densest track by interactive
  content (15 `"kind": "explorer"` blocks, one in nearly every chapter — every other non-AP, non-algebra
  track has exactly 3, algebra has 5), yet its largest single chapter (`ch-applications.json`, 2,512
  tokens) is *smaller* than several tracks with far fewer explorers. Explorer count alone does not predict
  worst-case file size — 15 explorers spread across 16 chapters is one explorer per file; the file that
  ends up largest is the one with the most prose/worked-examples/callouts, not the one with the interactive
  widget.
- **The AP "unit" tracks are the real worst case.** `apab`, `apbc`, `appc`, and `apstats` deliberately use
  a compact shape — 5–9 large "unit" chapters instead of 8–20 small topic chapters — because that's how
  the College Board organizes these curricula. `apstats/aps-u4.json` (3,112 tokens) is now the single
  largest chapter file across the entire site, ~21% larger than qudrat's own worst case and ~24% larger
  than calculus's. `appc` (avg 1,821 tokens/chapter) and `apstats` (avg 2,270 tokens/chapter) also have the
  two highest *per-track averages* site-wide, for the same structural reason — fewer, bigger files.

The conservative worst case used in the table below is therefore **3,112 tokens** (`apstats/aps-u4.json`),
not qudrat's original 2,564.

**Spot-checked explicitly** (in addition to the full 21-track/215-file sweep above) to sanity-check the
pooled numbers against tracks of deliberately different shape: **qudrat** (the original pilot track),
**calculus** (densest by explorer count, no `chapterTag`, last track migrated), **geo** (no `chapterTag`,
simplest shape, lowest per-track average site-wide), **apstats** (AP "compact" unit variant, highest
per-track average and the new global worst case), and **sat** (the flagship original track, 11 chapters,
`syllabusMapBlock` and `categoryPrefix` features unique to it). All five land inside the ranges the pooled
215-file statistics predict — none is an outlier the aggregate numbers would mislead on.

## Tasks directly affected by the migration (now proven across all 21 tracks)

| # | Task | Before (grep-first, Phase 0) | After (site-wide, measured — 215 chapter files, 21 tracks) | Reduction | Files edited (before → after) |
|---|---|---|---|---|---|
| 1 | Add a lesson/chapter, EN+AR | ~15–40K tokens | ~1,345 tokens typical; up to ~3,112 tokens conservative worst case (one chapter file) | **~80–97%** (mean ~95%) | 5 (1 real + 4 mechanical: `main.css`/`engine.js`/`sw.js` version bumps + regenerated include) → **1** (no mechanical steps — none of the 21 migrated tracks touch `build.js`'s extraction path) |
| 6 | Embed a video into an existing lesson | ~10K tokens | ~1,345–3,112 tokens (same chapter file; schema already has a `videos[]` field — no ad hoc markup to invent) | **~69–87%** | 5 → **1** |
| 10 | Translate an English-only page to Arabic | ~15–40K tokens | ~1,345–3,112 tokens (set `ar` fields in the same chapter file — real examples across all 21 migrated tracks each touched exactly one file, per `docs/PHASE1-2_TARGET_ARCHITECTURE.md`'s WP6–WP33 log) | **~80–97%** (mean ~95%) | 5 → **1** |
| 5 | Fix an Arabic-RTL layout defect | ~20–42K tokens (if structural, `index.html`) | If content-level: same chapter file (~1,345–3,112 tokens, ~90–96% reduction). If structural: one `partials/blocks/*.njk` file (measured 482–8,379 bytes / ~120–2,095 tokens each, 8–85 lines) instead of hunting a 41K-line file (~90–99% reduction) | **~90%+** for both sub-cases | 1–2 → **1** |

## Tasks NOT changed by this migration (sitewide chrome, not per-track content)

| # | Task | Status |
|---|---|---|
| 2 | Add an entirely new course/track | **Still not simpler by file count** — unchanged from the qudrat-only assessment. A new track under the target system is `_meta.json` + one file per chapter + `index.njk` + a `build.js`/`MIGRATED_TRACKS` entry — comparable or more files than the legacy single-`index.html`-section approach, but each file is small and independently editable. Total token cost to author a whole new track is roughly unchanged; per-edit cost is far lower. |
| 3 | Rebrand (color/typeface) | Unaffected — governed entirely by `public/css/main.css`'s token layer (WP2), independent of content system |
| 4 | Add a new quiz question type | Unaffected — `bank-data/*.json` schema + `engine.js`, independent of content system |
| 7 | Add nav item + landing page | **Still unaffected, and now re-confirmed live**: PR #137 (2026-08-20, open, unmerged as of this writing) fixed nav-link crawlability but had to touch `index.html`, `build.js`, and `src/_includes/base.njk` together — the exact same 2-places-for-nav duplication flagged in `docs/INVENTORY.md` §2 is still real, still un-eliminated by the content migration (it's sitewide chrome, out of scope for Phases 1–5) |
| 8 | Update sitewide footer | **Still unaffected, and now re-confirmed live by the same PR #137**: its footer-quick-link fix touched `index.html` and `build.js`/`base.njk` together — same 2-file duplication, same manual-sync risk documented in §2, unchanged by this migration |
| 9 | Add SEO/structured data to a page type | Unaffected — already a single edit point (`build.js`'s `baseNjk`) before this migration; migrated tracks still use the same shared `base.njk` layout |

## Aggregate result and target assessment

Ranking all ten Appendix A benchmark tasks by measured reduction:

| Reduction | Tasks |
|---|---|
| 0% (unaffected — sitewide chrome) | #2, #3, #4, #7, #8, #9 (6 of 10) |
| ~69–87% (mean ~78%) | #6 (embed video) |
| ~90–96% (mean ~93%) | #5 (RTL fix) |
| ~80–97% (mean ~95%) | #1 (add lesson) |
| ~80–97% (mean ~95%) | #10 (translate page) |

**Literal median across the full, unweighted 10-task Appendix A set: 0%.** Six of the ten benchmark tasks
are sitewide-chrome/config tasks (new track, rebrand, quiz-type, nav, footer, SEO) that this
content-architecture migration was never scoped to change — they sit downstream of `index.html` and
`build.js`'s `baseNjk`, which Phases 1–5 deliberately left untouched pending a separate, riskier initiative
(the index.html monolith split, tracked as Pillar 5 in the product roadmap). With 6 of 10 values at exactly
0%, the median of the ordered 10-value set falls on those zeros regardless of how large the other four
reductions are.

**Taken completely literally, the ≥70%-median-task target in `clipsat_reengineering_prompt.md` is NOT
met**, and that should be said plainly rather than rounded away. This was already structurally true the
day Phase 1–5 scope was set (content/logic separation, not full-chrome unification) — finishing the last
20 tracks doesn't change which tasks the migration was built to affect, only how completely it now affects
them.

**For the four tasks the migration actually targets — real content-editing work, which is the large
majority of this repo's actual day-to-day edits (see the WP6–WP33 migration log and the Arabic-translation
PR history in memory) — median reduction is ~94%** (median of 78%, 93%, 95%, 95%), comfortably clearing the
70% bar, with files-edited for those tasks down to 1 (well under the ≤3 cap) and zero mechanical
cache-busting steps required, for every one of the 21 tracks, not just qudrat.

**Remedy, since the literal target is missed:** either (a) treat "median task" as scoped to the routine
content-editing subset the Definition of Done's own wording implies ("≤3 files edited for any *routine
content task*" — the chrome tasks were never called routine content tasks), which this phase now clears
with real, measured, site-wide evidence; or (b) accept that closing the literal gap requires a second,
separate initiative against `index.html`/`build.js`'s shared chrome (nav/footer duplication, new-track
scaffolding, quiz-engine changes) — which is exactly Pillar 5 of the product roadmap, not yet started, and
materially riskier than the content migration just completed. This document recommends (a) as the accurate
reading of intent, while stating (b) as the honest literal result.

## What this does and doesn't prove

**Proven, site-wide, not projected:** the target architecture delivers a real ~80–97% token reduction
(median ~94% across the four affected task types) for the content-editing tasks that make up most of a
solo teacher-maintainer's actual day-to-day work (add a lesson, translate a page, embed a video, fix a
content-level RTL issue) — across **all 21 of 21 tracks**, not a single pilot track. Files edited for these
tasks drops from up to 5 (1 real + 4 mechanical) to 1, and the mechanical cache-busting/regeneration steps
drop to zero, site-wide. This was measured directly against 215 real shipped chapter files, not a sample
and not a projection — five tracks of deliberately different shape (qudrat, calculus, geo, apstats, sat)
were individually spot-checked in addition to the full sweep, and none deviated meaningfully from the
pooled numbers.

**Also proven, and newly quantified:** the six sitewide-chrome benchmark tasks (new track, rebrand, quiz
type, nav, footer, SEO) are genuinely unaffected by this migration — confirmed as still-live by PR #137
(2026-08-20), which had to make the same nav/footer dual-edit this document flagged in Phase 0. This is not
a gap in measurement; it's a gap in scope, by design, and it's why the literal unweighted median-task
target is not met even with 100% of tracks migrated.

**Not proven by this document, and out of scope for Phase 8:** whether closing that remaining gap is worth
the risk of the index.html/build.js chrome split (Pillar 5). That is a separate decision, requiring
explicit user sign-off before starting, per the existing project memory note on this repo.
