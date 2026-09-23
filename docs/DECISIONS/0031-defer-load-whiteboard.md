# ADR 0031 — Defer-load the Teacher Mode whiteboard, keep the rest of gamification eager

**Date:** 2026-09-23
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015; third application of ADR 0028's pattern (after ADR 0029)

## Context

`24-gamification.js` was the next 5.015 candidate. The roadmap flagged it as harder than
TeacherMode or CSExport because its entry points are scattered, and an audit confirmed that.
Deferring the whole file would have silently broken three things:

- **Streak tracking.** `trackStreak()` runs on every page load and writes `clipsat_streak` /
  `clipsat_last_visit`. It is a side effect, not a UI feature. If it only ran when some panel
  opened, a day on which the student visited but never opened that panel would not count, and
  the streak would reset the next day.
- **Flashcards.** `loadFlashcard()` runs on `DOMContentLoaded` and renders the FLASHCARDS
  sidebar, which is visible on every track. `base.njk`'s Review/Mastered buttons call
  `window.CSGamify.recordSRS()` directly.
- **Curriculum mapper.** `mapCurriculum()` is called from a rail `<select>` on one track.

None of these is "only reachable behind a gate". That is the ADR 0028 hazard again ("runs once
at load; if it isn't there, the behaviour is silently lost"), this time as a load-time side
effect rather than a load-time decoration.

The whiteboard (section D, about 430 of the file's 675 lines) is different. It is only usable
once Teacher Mode is on, and Teacher Mode is already deferred (ADR 0028). Its methods read and
write only its own `wb*` state and methods. Its only entry points are:

- the body-class `MutationObserver` (`tm-on` means set up the board; no `tm-on` means tear it
  down);
- `#teacherWhiteboardBtn`, which is hidden until `tm-on`.

Also found and left alone: `patchRecordAnswer()` polls for `window._recordAnswer`, which is
never defined anywhere in the codebase. It is dead code, like ADR 0029's `printPQResult`, and
its removal is not part of this change.

## Decision

1. **Split the whiteboard out.** Move it into `24b-whiteboard.js` and add that file to
   `deferred-manifest.json`, which ships it as `public/js/whiteboard.js`. It merges its methods
   onto the existing `window.CSGamify`, so every call site (`window.CSGamify.setupWhiteboard()`
   and so on) and every `this` binding is unchanged.
2. **Keep the rest eager.** `24-gamification.js` keeps XP/levels, streaks, flashcards/SRS and
   the curriculum mapper. It gains `window._ensureWhiteboard()`, a load-once promise with the
   same shape as `_ensureTeacherMode()` and `_ensureCSExport()`.
3. **Route every entry point through `_ensureWhiteboard()`:**
   - `_ensureTeacherMode()` starts it in parallel, like CSExport.
   - The observer awaits it before calling `setupWhiteboard()`, and re-checks `tm-on` after the
     load in case Teacher Mode was switched off meanwhile. It skips `exitWhiteboard()` if the
     board never loaded, since there is nothing to tear down.
   - `#teacherWhiteboardBtn`'s `onclick` (in `build.js`'s `baseNjk`) awaits it before
     `toggleWhiteboard()`.

## Consequences

- `engine.js` shrinks by about 7.8KB minified (988,574 → 980,785 bytes). That is less than the
  whiteboard's 21KB source suggests, because most of the source is comments, which
  minification already strips. The deferred file is 8.5KB.
- Cumulative 5.015 total: about 70KB deferred (TeacherMode, CSExport, whiteboard).
- A new test in `tracks.spec.js` covers the path a teacher actually takes:
  - `whiteboard.js` is not requested on page load, while `CSGamify.loadFlashcard` is still
    present;
  - turning Teacher Mode on loads it;
  - the Whiteboard button appears and opens the board (overlay and toolbar active);
  - turning Teacher Mode off tears the board down.

  A manual check confirmed that strokes actually draw.
- The remaining large candidates for 5.015 are `19-interactive-activities-engine-v1.js` and
  `03-ai-chat-and-practice-quiz.js`. Both need the same audit before any defer.
