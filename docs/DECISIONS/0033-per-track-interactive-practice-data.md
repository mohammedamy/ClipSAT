# ADR 0033 — Ship Interactive Practice data per track, not inline in engine.js

**Date:** 2026-09-23
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015; follows ADR 0028/0029/0031 (deferred modules). It also does, for one module, the per-track split that ADR 0027/5.014 found had no general axis.

## Context

`19-interactive-activities-engine-v1.js` was the largest remaining module: 1,878 lines, 157KB of
source. An audit showed it is almost entirely **data**. Lines 3–1520 are a table, `D['<chapter
section id>'] = {…}`, holding the "Interactive Practice" widgets (Quick Check, Matching,
True/False, Step Builder, Worked Example, function Explorer) for **every chapter of every track**.
The engine that renders them is only about 350 lines.

So every page downloaded and parsed all 197 entries (about 140KB), though each page shows only its
own track's chapters. Mapping every entry to the built pages that contain its section id found:

- each of the 197 entries belongs to **exactly one** track (21 tracks in all);
- the home page uses none;
- act2l2, est2l2, linalg, mvc and odes have no entries.

The only page with all of them is `dev-content-preview`, an internal preview.

This is a real per-track axis, unlike 5.014's finding for the engine as a whole.

The module runs things at load that deferring must keep (the ADR 0028 hazard):

- `_injectAll()` 800ms after `DOMContentLoaded`;
- an `IntersectionObserver` over the data's section ids;
- a `goChapter` wrapper;
- `window.ClipSATIX.refreshAll`, which `20c-i18n.js` calls on a locale toggle.

## Decision

1. **Data moves to `src/scripts/ix-data/{track}.js`, one file per track.**
   - The entries were split with a real parse (acorn), not by hand.
   - Each file holds its track's entries verbatim, wrapped in
     `(window.__ixData = window.__ixData || []).push(function (D) { … })`.
   - The per-track heading comments that separated tracks became the file names.
   - `D` from the original module was compared with `D` rebuilt from the 21 files, both as source
     and as minified output: all 197 entries are deep-equal.
2. **`build.js`** minifies each file to `public/js/ix/{track}.js`, and deletes outputs whose source
   was removed. Before `engine.js` is minified, it replaces the engine's `/*@IX_TRACKS@*/[]`
   placeholder with the list of tracks that have a file. The build fails loudly if the placeholder
   is missing.
3. **The engine stays eager in `engine.js`** (about 16KB of source) and keeps the old behaviour:
   - At `DOMContentLoaded` it reads the track from `<body class="track-{id}">`. If that track is in
     `IX_TRACKS`, it appends `<script async src="/js/ix/{id}.js">`. A track without data never
     requests a file.
   - It injects once **both** the data has registered and 800ms have passed since
     `DOMContentLoaded`, the same point as before. The `IntersectionObserver` is set up then too,
     because it needs the data's ids.
   - `window.__ixData` works before or after the engine runs: pushes made earlier are queued, and
     later ones call straight into the engine.
   - `goChapter` and `ClipSATIX.refreshAll` are unchanged. Each is a no-op until the data is in, and
     the post-load injection covers anything they missed.
4. **Adding Interactive Practice to a chapter** now means editing that track's
   `src/scripts/ix-data/{track}.js`. The entry shapes are documented in the engine module.

## Consequences

- `engine.js`: 981,434 → 844,272 bytes (about 137KB, 14%), on every page including home.
- A track page now fetches only its own data, 3.6–13KB minified (21 files, 135.7KB in total), async
  after `DOMContentLoaded`. The service worker's network-first dynamic cache keeps it for offline
  use after the first visit, like the other deferred files.
- Cumulative 5.015: about 207KB off the critical path. That covers TeacherMode, CSExport, the
  whiteboard, and this change.
- `dev-content-preview` no longer shows Interactive Practice widgets. Its body class matches no data
  file, and it is an internal page.
- Verified on all 27 built pages:
  - every track injects exactly its own widget count (home and the 5 tracks without data: 0);
  - each requests only its own file;
  - there are no script errors.
- Widgets still work: Quick Check options, jumping via `goChapter`, and KaTeX typesetting (checked
  with KaTeX served locally). An Arabic toggle re-renders all 8 Qudrat widgets in Arabic.
- Regression tests in `tracks.spec.js` check that:
  - `engine.js` no longer contains the data;
  - `/calculus/` requests only `calculus.js` and gets all 16 widgets;
  - home and `/act2l2/` request nothing;
  - the Arabic re-render works.
