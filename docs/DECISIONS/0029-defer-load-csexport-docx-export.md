# ADR 0029 — Defer-load CSExport (docx export), the second Phase 5.015 module

**Date:** 2026-09-16
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015; second application of ADR 0028's pattern

## Context

ADR 0028 established the pattern (a `deferred-manifest.json` entry, a small loader module
exposing one `_ensure*()` promise, every real trigger point funneled through it) and one
hard-won rule: audit every module that depends on the deferred feature for the "checked once,
synchronously, at its own load time" shape before assuming a `window.X && ...` guard makes a
defer safe — that shape is what made TeacherMode's first defer attempt silently lose behavior,
not throw.

`CSExport` (`04-docx-export.js`, docx export + chapter printing) was checked against exactly
that standard before touching anything. Three real cross-module dependents exist
(`03-ai-chat-and-practice-quiz.js`, `22-assignments-reports-search.js`, `20b-teacher-mode.js`),
and in every one of them the `window.CSExport && ...` check sits **inside a function body**,
re-evaluated each time that function is actually called by a user action — never once at
module-load time. That's the safe shape; no equivalent of ADR 0028's fix was needed here.

One thing the audit did find worth fixing: `downloads-block.njk`'s own docx button had
`onclick="window.CSExport?window.CSExport.downloadChapterDocx(this):downloadDocx(this)"` — a
fallback to a *bare* `downloadDocx` global that was itself only ever defined inside
`04-docx-export.js`. Deferring that file without touching this onclick would have made the
"fallback" throw a `ReferenceError` the instant `CSExport` was ever absent, which — post-defer —
is every page load until the module fetches. Rewritten to route through the same
`_ensureCSExport()` loader instead.

`22`'s two CSExport-dependent methods (`CSAssign.generate`, `CSReport.generate`) and
`20b`'s own docx/print buttons are all only reachable through buttons Teacher Mode's own UI
renders — meaning they're already gated behind `_ensureTeacherMode()`. Rather than add a third,
redundant trigger, `20b-teacher-mode-loader.js`'s `_ensureTeacherMode()` now also kicks off
`_ensureCSExport()` in parallel (not chained/blocking) the moment it runs, so `CSExport` has a
head start loading by the time a user could reach any of those buttons. `03`'s `printPQResult`
has no caller anywhere in the codebase today — left alone as pre-existing dead code, not a
reason to add a trigger.

## Decision

`04-docx-export.js` moves to `deferred-manifest.json` (output: `docx-export.js`). A new loader,
`04b-docx-export-loader.js` (takes `04`'s old manifest position), exposes
`window._ensureCSExport()`. `downloads-block.njk`'s two buttons (download `.docx`, print
chapter) are rewritten to call it, with the print button falling back to `window.print()` if
the deferred load itself fails (network error) rather than doing nothing.

## Consequences

- `engine.js` shrinks by a further ~37KB minified — combined with ADR 0028's TeacherMode defer,
  ~62KB has now moved off the critical path, out of an original ~994KB baseline.
- A new regression test confirms `docx-export.js` isn't requested before the download button is
  clicked, is requested once it is, and the click handler completes without throwing — the
  check that would have caught the `ReferenceError` risk found above. `downloadChapterDocx()`'s
  own document generation depends on JSZip (external CDN), which this session's sandbox can't
  reach (a pre-existing, already-documented gap unrelated to this defer) — the test targets the
  defer mechanism itself, not that gap. 82/82 checks pass (81 prior + 1 new).
- `printPQResult` (dead code, `03-ai-chat-and-practice-quiz.js`) is noted here rather than
  removed — deleting genuinely-unused code is a reasonable future cleanup, but it's unrelated to
  this deferred-loading pass and wasn't the reason it was found.
- Remaining Phase 5.015 candidate: `24-gamification.js`. Its entry points are more scattered
  (referenced directly from `base.njk`'s own static markup, not only from behind another
  deferred module's UI like `CSExport`'s were) — expect it to need its own trigger-point audit,
  not a reused chain.
