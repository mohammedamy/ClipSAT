# ADR 0026 — Split the monolithic engine.js into named source modules

**Date:** 2026-09-16
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.012

## Context

`src/scripts/engine.js` was a single 19,135-line hand-edited file — every editor session
had to load the whole thing to change one feature, and its own comment headers (e.g. two
differently-scoped blocks both loosely called "Interactive Activities Engine") were not a
reliable guide to where one feature's code actually started and ended: a prior attempt to
extract what looked like a clean, self-contained IIFE from its comment header found no
matching `window.X =` export or closing `})();` in the assumed line range, and was correctly
abandoned rather than guessed at.

The fix was to stop reading comment headers and parse the file for real. `engine.js` is a
classic (non-module) script — Acorn (already a transitive devDependency, via `uglify-js`)
parses it as exactly **70 top-level statements**, each with a hard start/end byte offset a
parser guarantees, not a human eyeballing brace-matching. A scope-aware free-variable walk
over each statement (tracking function/block scopes, hoisted `var`s, catch/for-loop
bindings) found the *actual* cross-statement dependencies: almost entirely forward/backward
references to other top-level `function` declarations, top-level `var`s, or `window.X =`
assignments — i.e. ordinary globals in a shared script scope, not hidden coupling. A few
names (`showView` among them) are deliberately redefined by several later statements in
original file order (each wrapping the previous definition) — order-preserving concatenation
keeps that composition intact.

## Decision

Split `engine.js` at its top-level statement boundaries only into 25 named files under
`src/scripts/modules/`, listed in execution order in `src/scripts/modules/manifest.json`.
Each module is one or more complete, adjacent top-level statements — never a cut through the
inside of a single function/IIFE body, since that would mean turning private closure
variables into shared globals: a real refactor, not a reorganization, and out of scope for a
"no behavior change" pass. One module (`02-core-app.js`, the original file's largest IIFE at
~8,400 lines: figure rendering, view engine, bank loading) is still large for the same
reason — sub-splitting its internals is future work, not this ADR.

`build.js`'s Step 2 now reads `manifest.json`, concatenates the listed files in that exact
order, and minifies the result — replacing the single `fs.readFileSync('src/scripts/engine.js')`
call. The old monolithic file is deleted; the split is a pure move, not a rewrite of any line.

**Verification, not assumption:** before deleting the monolith, the new build's
`public/js/engine.js` was diffed byte-for-byte against a build from the untouched monolith —
identical. The full Phase-5.009 Playwright regression suite (26 tracks × 3 checks) was run
against the split build before this change was considered done.

## Consequences

- Editing one feature now means opening one file in the 40–1,900 line range instead of
  searching a 19,135-line one; module filenames describe what's inside (`14-quiz-timer.js`,
  `24-gamification.js`, etc.) instead of relying on inline comment headers that had already
  drifted from the real structure once.
- `manifest.json`'s order is load-bearing, not cosmetic: it must match the original file's
  statement order exactly, because later modules rely on earlier ones' globals, and a few
  globals (`showView`) are intentionally redefined by multiple modules in sequence.
  Reordering the manifest changes behavior; adding a new module means inserting it at the
  correct position for what it depends on and what depends on it, not appending it.
- `02-core-app.js` remains a large, still-monolithic module by design — it was not analyzed
  deeply enough internally to split safely in this pass. Phase 5.014 (real per-track code
  splitting via a bundler) is the place to take that on, once module boundaries this coarse
  are in place to build from.
- This ADR's module list and the free-variable dependency trace behind it are disposable
  scratch work, not a document to maintain — `manifest.json` plus each module's own content
  is the durable source of truth. If a future pass moves code between modules, update
  `manifest.json` and re-verify with the same byte-diff + regression-suite method used here,
  not by inspection alone.
