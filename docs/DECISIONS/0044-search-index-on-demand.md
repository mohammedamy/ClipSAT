# ADR 0044 — Load the cross-track search index on demand

**Date:** 2026-09-26
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015.

## Context

`build.js` generates `window.SEARCH_CHAPTER_INDEX`, the chapter index for every track: 331
entries with 1,977 keywords. It prepended the index to `engine.js`, so the index made up 67KB of
the 411KB every page downloaded.

Only the header's topic search (`CSSearch` in `22-assignments-reports-search.js`) reads it. The
search's own index is built from two sources:

- this page's rail and the course list, always available;
- the cross-track index, when present.

## Decision

1. **`build.js` writes the index to `public/js/search-index.js`** and no longer prepends it to
   `engine.js`. `01-i18n-strings.js` still defaults `SEARCH_CHAPTER_INDEX` to `[]`.
2. **`CSSearch.onInput` loads the file once, the first time it runs.** The search box's
   `onfocus` also calls `onInput`, so focusing the box starts the load.
   - When the file arrives, the search index is rebuilt.
   - If the box still has focus and a query of two or more characters, the query runs again.
   - Until then, results come from this page's chapters and the course list, as before.
   - A failed load leaves those results in place, and a later search retries.

## Consequences

- `engine.js` goes from 411KB to 344KB (−67KB) on every page. A visitor downloads
  `search-index.js` (68KB) only if they use the search box.
- Test (`tracks.spec.js`, new):
  - `engine.js` no longer contains the index, and `search-index.js` does not load with the page;
  - typing "law of cosines" on the Calculus page loads it once and lists Trigonometry chapters
    from other courses;
  - there are no page errors.
