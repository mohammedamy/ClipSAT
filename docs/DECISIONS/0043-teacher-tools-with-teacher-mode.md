# ADR 0043 — Ship the assignment and report tools with Teacher Mode

**Date:** 2026-09-26
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015. Extends ADR 0028, which moved
TeacherMode itself to `public/js/teacher-mode.js`.

## Context

`22-assignments-reports-search.js` shipped two teacher tools in `engine.js` to every visitor:

- `CSAssign`, which builds an assignment (12KB of source);
- `CSReport`, which builds a progress report (9KB).

Their only buttons are in Teacher Mode's panel (`20b-teacher-mode.js`). The loader's own notes
(`20b-teacher-mode-loader.js`) already state that there is no other trigger for them, and there
is no URL or link entry point.

Parsing both with acorn showed that `CSReport` uses nothing from 22's scope and `CSAssign` uses
only `VIEW_META`, for its course list. `_tt`/`_ttAr` are globals from `01-i18n-strings.js`.

## Decision

1. **Both objects move verbatim to `22b-assign-report.js`.**
   `deferred-manifest.json` now builds `teacher-mode.js` from
   `["20b-teacher-mode.js", "22b-assign-report.js"]`, so they load together with Teacher Mode.
2. **22 exposes `window.CSViewMeta = VIEW_META`,** which 22b reads.

## Consequences

- `engine.js` goes from 429KB to 411KB (−18KB) on every page. `teacher-mode.js` goes from 25KB
  to 43KB, and only a visitor who opens the More panel downloads it.
- Test (`tracks.spec.js`, new):
  - `engine.js` no longer contains `CSAssign`, and `CSAssign` is undefined before Teacher Mode
    loads;
  - with Teacher Mode on, the Assignment button opens the assignment form, and its course list
    includes Calculus;
  - the Report button opens the report window;
  - there are no page errors.
- The existing Teacher Mode tests (deferred load, decoration, whiteboard) pass unchanged.
