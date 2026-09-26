# ADR 0040 — Load the Arabic UI strings only when Arabic is used

**Date:** 2026-09-26
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015. Uses the deferred-module mechanism
from ADRs 0028, 0036 and 0037. Follows ADR 0039.

## Context

`20c-i18n.js` (126KB of source) holds `window.i18n` and its string dictionaries. The Arabic
dictionary alone is 68KB. It shipped inside `engine.js` to every visitor, although most pages
are viewed in English.

Who reads the dictionary:

- `i18n.t()`, used by `_applyToDOM()` for `data-i18n`, `data-i18n-html` and `data-i18n-attr`;
- the Interactive Practice engine (19), through `i18n.t()`. `setLocale()` already re-renders
  its widgets through `ClipSATIX.refreshAll()` after a switch.

Nothing else reads the dictionaries. Content migrated to `content/` carries both languages inline
(`data-bilingual`), which does not use the dictionary.

## Decision

1. **The `ar` dictionary moves verbatim to `20e-i18n-ar.js`.**
   - It registers itself with `window.i18n._addStrings('ar', {…})`.
   - `deferred-manifest.json` ships it as `public/js/i18n-ar.js`.
2. **`setLocale(loc)` changes the synchronous state first:** the locale, the `lang` attribute,
   `body.rtl`, `dir` on the translated containers, the toggle label, and the bilingual content.
   It then loads the locale's strings once, through a load-once promise.
   - When the strings arrive, it re-applies the dictionary, refreshes the Interactive Practice
     widgets and re-typesets the page.
   - If the visitor toggles again while the file is loading, the late arrival does nothing.
   - `setLocale` now returns that promise.
3. **A saved Arabic locale starts the load as soon as `20c` runs,** before `DOMContentLoaded`. The
   English text is visible only for the time the file takes to arrive.
4. **If the load fails,** the page stays on English strings and a later toggle retries.
   `t()` already falls back to English for a missing key.

## Consequences

- `engine.js` goes from 577KB to 513KB (−64KB) for everyone. An Arabic visitor downloads
  `i18n-ar.js` (65KB) once, and the service worker's dynamic tier caches it.
- Tests (`tests/e2e/tracks.spec.js`):
  - an English visit does not request `i18n-ar.js`, and `engine.js` no longer contains the
    Arabic strings;
  - clicking the toggle loads the file and translates a `data-i18n` label;
  - a reload with Arabic saved comes back translated and right-to-left;
  - toggling back restores English.
- **To add an Arabic string,** add it to `20e-i18n-ar.js`. English strings stay in `20c`.
