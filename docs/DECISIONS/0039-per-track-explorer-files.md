# ADR 0039 — Ship each track's canvas explorers as its own file

**Date:** 2026-09-25
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015. Follows the same per-track split as
ADR 0033 (Interactive Practice data).

## Context

`02-core-app.js` was 526KB of source, and most of it was canvas explorers. Each explorer is a
self-contained IIFE, `(function(){ var canvas=document.getElementById('…'); if(!canvas) return; … })();`,
that closes over shared helpers in 02's outer function. Every page downloaded and parsed all of
them, though each page shows only its own track's explorers.

Each of 02's 138 top-level IIFEs was parsed with acorn and mapped to the built pages that contain
the element ids it looks up (`dev-content-preview` excluded). The results:

- **133 belong to exactly one track** (320KB of source across 26 tracks). Calculus has 51KB,
  IB HL 28KB and a2level 3KB.
- **5 stay in 02:**
  - the header menu, used on every page;
  - the home-page derivative and Riemann explorers;
  - one explorer shared by a2level and alg2;
  - the syllabus-map registrations.

What the moved IIFEs use from 02's scope:

- `register`, `redrawAll`, `wireDataToggle`, `renderDataRows`, `fmt` and `Plot`;
- a few small helpers: `dfdx`, `integrate`, `arrow`, `_deg`, `_fitView`, `_clip`, `_set`,
  `_slider` and `_num`;
- the plot colours (`INK`, `INDIGO`, `AMBER2`, …).

None of them assigns to a variable in 02's scope. None of them sets a `window.*` global.

The one catch is the colours. `refreshPlotColors()` reassigns them from the CSS tokens when the
theme changes, so a copy taken at load would go stale.

## Decision

1. **Explorers move to `src/scripts/explorers/{track}.js`, one file per track.**
   - Each file holds its IIFEs verbatim, with their comments, in source order.
   - The files were cut from acorn's statement positions, not by hand.
   - Each file is wrapped in `(function(K){ … })(window.CSExplorerKit)`.
2. **02 exports the shared helpers as `window.CSExplorerKit`** (just before `init`). Its
   `colors()` function returns the current plot colours.
   - Each track file keeps local copies of the colours.
   - Its local `register` wraps every draw function, re-reading the colours before each draw.
   - A theme change therefore still repaints in the new colours, because `CSPlotRefresh()`
     calls `redrawAll()`, which calls each wrapped draw.
3. **`build.js` minifies them to `public/js/ex/{track}.js`**, the same way as `js/ix/`, and
   deletes outputs whose source file is gone.
   - `src/_data/explorerTracks.js` lists the same directory.
   - `base.njk` emits `<script src="/js/ex/{track}.js">` right after `engine.js`, and only for a
     listed track.
   - The dev content preview loads every track's file.
4. **Load order is unchanged in effect.** The file is a plain (not deferred) script after
   `engine.js`, so its explorers register before `DOMContentLoaded`. `init()` therefore still
   runs `showView()` and `redrawAll()` after every explorer has registered, as before.

## Consequences

- `engine.js`: 847KB → 577KB (−270KB), on every page.
- A track page adds its own file: 3KB (a2level) to 41KB (calculus). The home page adds nothing.
- Per-track files are not in the service worker's shell list, so they use the network-first
  tier, the same as `js/ix/`.
- Tests (`tests/e2e/explorers.spec.js`):
  - the existing per-track check still passes for all 128 explorers (each "View as data"
    panel is filled, follows its slider, and causes no page errors);
  - new: `engine.js` no longer contains a track explorer;
  - new: a track page requests only its own file, and the home page requests none;
  - new: a moved explorer repaints after the colour tokens change.
- **To add an explorer to a track,** add the IIFE to `src/scripts/explorers/{track}.js`, not
  to 02. A new helper it needs must be added to `CSExplorerKit` and to the file's prologue.
