# ADR 0028 — Defer-load TeacherMode as the first real critical-path JS reduction

**Date:** 2026-09-16
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015; supersedes ADR 0027's
"deferring TeacherMode is not safe yet" finding

## Context

ADR 0027 decoupled `window.TeacherMode` out of a mixed-concern module but stopped short
of actually deferring its load, for a specific, named reason: `22-assignments-reports-
search.js` decorates `window.TeacherMode.toggle` once, synchronously, at its own module-
load time (adding the `body.tm-on` class and a chapter-metadata panel on top of
TeacherMode's own toggle behavior). If `TeacherMode` isn't loaded yet when that decoration
runs, ADR 0027 believed the call would throw.

Re-reading the actual code before touching it (rather than trusting that summary)
found the real mechanism was different, and the risk was real but not what was written:
`22-assignments-reports-search.js` already had a guard —
`if (!window.TeacherMode) return;` — so it would not throw. But because that guard ran
**once**, synchronously, at page load, it would silently give up forever the moment
`TeacherMode` isn't eager: the decoration would never apply, and Teacher Mode would work
(the base toggle) but silently lose the reporting panel and `tm-on` styling with no error
anywhere — exactly the kind of regression the existing Playwright suite (which only checks
for thrown/console errors) would not catch.

## Decision

Make `TeacherMode` genuinely deferred, and fix the real gap instead of leaving it as an
open risk:

1. `22-assignments-reports-search.js`'s decoration is now a named, idempotent function,
   `window._applyTeacherModeDecoration()` — still called once at its own module-load time
   (a no-op today, since `TeacherMode` is never eager anymore, kept for robustness if that
   ever changes back), and callable again later.
2. `20b-teacher-mode.js` (the module ADR 0027 extracted) is removed from
   `manifest.json` (the eager bundle) and added to a new `deferred-manifest.json`;
   `build.js` now minifies entries in that file into their own standalone
   `public/js/<output>` file instead of folding them into `engine.js`.
3. A new loader module, `20b-teacher-mode-loader.js`, takes `20b-teacher-mode.js`'s old
   position in `manifest.json` and exposes `window._ensureTeacherMode()` — a promise-based,
   load-once helper that injects `<script src="/js/teacher-mode.js">` on first call and,
   in its `onload`, calls `window._applyTeacherModeDecoration()` to wire up the cross-module
   decoration for real, once `TeacherMode` actually exists.
4. Two call sites trigger the load, both funneled through the same helper so there's one
   load path to reason about: `#navMoreBtn`'s own click handler (`02-core-app.js`) calls it
   as soon as the panel containing `#teacherModeBtn` opens — well before the user could
   reach the button — and `#teacherModeBtn`'s own `onclick` calls it too, as a safety net
   for an extremely fast click sequence racing the network fetch from the first trigger.

## Consequences

- `engine.js` shrinks by ~25KB minified (`teacher-mode.js`'s own minified size) — the
  first actual critical-path byte reduction from Phase 5.014/5.015's work; everything
  before this was reorganization with zero bytes deferred.
- A new regression test (`tests/e2e/tracks.spec.js`) specifically asserts
  `teacher-mode.js` is NOT requested before the More panel opens, IS requested once it
  does, and — the check that would have caught the real bug found above — that
  `body.tm-on` (module 22's decoration effect, not just `body.teacher-mode` from
  TeacherMode's own toggle) is present after toggling via the deferred path. All 81
  checks (78 prior + 3 site-wide, including this one) pass.
- This establishes the pattern the roadmap's revised Phase 5.015 scope needs for its
  next candidates (`24-gamification.js`, `CSExport`/docx export): a `deferred-manifest.json`
  entry, a small loader module exposing one `_ensure*()` promise-based function, every real
  trigger point funneled through it, and — critically, learned from the near-miss here —
  auditing every module that decorates the deferred feature for the same "ran once at load,
  silently gives up" shape before assuming a guard clause makes it safe.
