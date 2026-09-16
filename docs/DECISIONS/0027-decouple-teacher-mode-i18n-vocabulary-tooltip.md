# ADR 0027 — Decouple i18n, Teacher Mode, and the vocabulary tooltip from one mixed-concern module

**Date:** 2026-09-16
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.014

## Context

Phase 5.014 set out to reduce critical-path JS per page (the roadmap's original framing:
"per-track code-splitting... target <300KB critical-path JS per track"). Before writing any
splitting code, that framing was checked against the real site structure: every one of
ClipSAT's 26 tracks *and* the home page render through the exact same `base.njk` shell, which
unconditionally wires up the site's shared UI chrome — mistakes/progress panels, the AI chat
panel, Teacher Mode, gamification, the language toggle, search — identically everywhere. Track
content itself already lives outside `engine.js` entirely, in `content/{track}/*.json` and
`bank-data/*.json`, fetched at runtime. There is no real per-track axis inside `engine.js` to
split along: nearly the whole bundle is genuinely shared infrastructure, not per-track logic.

A "lazy-load rarely-used features instead" alternative was also checked against real call
sites before committing to it, and turned out riskier than it looked: e.g. `CSExport` (docx
export, `04-docx-export.js`) has three real call sites across three other modules, all
defensively guarded (`window.CSExport && ...`) — meaning a bad defer would not throw, it would
silently no-op the feature the first time it's used, exactly the kind of regression this site's
own Playwright suite (Phase 5.009) would not catch, since it only checks for thrown/console
errors, not silently-degraded feature behavior.

Given that, the founder chose the properly-scoped path: decouple the codebase's mixed-concern
modules first (so what's core-and-eager is cleanly separated from what's feature-and-deferrable),
before attempting any actual deferred loading. This ADR is that first slice.

`src/scripts/modules/20-full-exam-and-teacher-mode.js` (from Phase 5.012's split, 1,712 lines)
was one such mixed-concern module — it inherited that shape purely from being adjacent content
in the original 19,135-line file, not from any real design intent. Parsing it with Acorn one
level deeper than Phase 5.012 did (into the statements *inside* its own top-level IIFE, not
just at the whole-file level) found four independent pieces sharing that one wrapper:

1. A vocabulary-tooltip feature (`VOCAB` dictionary, popup UI, a decorator that rescans newly
   rendered quiz content for tooltip terms) — self-contained, no external dependents found.
2. `window.TeacherMode` (487 lines) — depends only on Phase 5.012's `01-i18n-strings.js`
   globals and the external JSZip CDN script. Has exactly one real external dependent: `22-
   assignments-reports-search.js` unconditionally decorates `window.TeacherMode.toggle` at load
   time (no defensive guard) — meaning TeacherMode must still load *before* module 22 does, an
   ordering constraint carried into `manifest.json`'s position, not yet a candidate for deferred
   loading on its own.
3. `window.i18n` (919 lines) — the site's real, universal language-toggle implementation, wired
   directly into `base.njk`'s `#i18n-toggle-btn` on every single page. Depends only on the
   `window.MathJax` KaTeX-compatibility shim, referenced lazily (only when a locale switch
   actually re-renders math), so load order doesn't matter here.
4. A small (27-line) DOM cleanup IIFE, already fully self-contained, with zero dependencies in
   either direction.

A scope-aware free-variable trace (the same method Phase 5.012 used, applied one level deeper)
confirmed none of these four pieces reference private state belonging to any of the others —
the only real coupling is TeacherMode's one external dependent, already accounted for above.

## Decision

Split `20-full-exam-and-teacher-mode.js` into four files, replacing its single `manifest.json`
entry with four in the same relative position (preserving TeacherMode's load-before-module-22
ordering): `20a-vocabulary-tooltip.js`, `20b-teacher-mode.js`, `20c-i18n.js`,
`20d-view-shell-cleanup.js`. Each extracted piece's source was verified byte-identical to the
corresponding original statement (via direct AST substring comparison, not by eye) before the
old file was deleted. All four are still loaded eagerly — this pass is decoupling, not deferred
loading. A misplaced trailing comment header ("CLIPSAT PRINT SYSTEM") that textually sat after
this module but described the *next* one was moved to actually prefix `21-print-cq.js`, where
it belongs.

**Verification:** since this pass, unlike Phase 5.012, genuinely restructures code (one shared
closure becomes four separate ones) rather than only relocating it, a plain byte-diff of the
built output isn't the right safety bar on its own. Three checks were used together instead:
(1) each extracted piece's source verified byte-identical to its original statement via AST
comparison; (2) a whitespace-normalized diff of the full built `engine.js` before/after,
confirming the only divergence is the expected new IIFE wrapper boundaries (plus one inert
UglifyJS semicolon-omission choice at a wrapper seam, harmless under `compress:false`); (3) the
full Phase-5.009 regression suite (78 checks) plus two new checks added here for the two
features this pass actually touches, which nothing in the existing suite covered before: the
`#i18n-toggle-btn` language toggle (locale, `<html lang>`, and `data-i18n` text all update and
un-update on a second click) and `#teacherModeBtn`'s `body.teacher-mode` class toggle. 80/80
pass.

## Consequences

- `i18n` — genuinely universal, present on every page — is now a standalone module instead of
  being bundled with a large, rarely-used teacher-reporting feature it has nothing to do with.
- `TeacherMode` is now independently named and scoped, and its one real ordering dependency
  (module 22's eager, unguarded `.toggle` decoration) is now documented rather than implicit.
  Deferring `TeacherMode`'s load is still not safe on its own — module 22 would need its own
  fix first (a defensive check, or moving the decoration to fire lazily too) — that remains
  explicit follow-up work, not done here.
- The vocabulary-tooltip feature is now independently visible and named, instead of being an
  anonymous 258-line prefix inside a much larger file most readers would assume was all
  teacher-mode code.
- Two new regression checks (i18n toggle, Teacher Mode toggle) close a real, previously-existing
  gap in Phase 5.009's suite — they'd have caught nothing today, but would catch a real future
  regression in either feature, refactor-triggered or not.
- Phase 5.014's original "per-track, <300KB critical path" framing does not hold up against
  this codebase's actual architecture (see Context) and should be read as superseded by this
  ADR's narrower, verified scope: decoupling mixed-concern modules so *later* deferred-loading
  work (once each remaining external dependent, like module 22's, is made safe) has clean seams
  to work from. `24-gamification.js` and the large `19-interactive-activities-engine-v1.js` /
  `02-core-app.js` modules were not touched in this pass and remain candidates for the same
  treatment in a future one.
