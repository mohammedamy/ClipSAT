# ADR 0045 — Load the figure renderers on demand

**Date:** 2026-09-27
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015. Same mechanism as ADRs 0037, 0041
and 0042. With this change `engine.js` meets the phase's target of under 300KB.

## Context

Two figure renderers shipped in `engine.js` to every page:

- `window._renderFig` in `02-core-app.js`, with the shared `FIG_*` palette (57KB of source). It
  draws question-bank figures.
- `window.renderMathFigure` in `05-test-generator-and-ai-settings.js`, with its SVG renderers
  (36KB). It draws the figure schema that AI tests use (function graphs, 2D/3D geometry, charts,
  number lines). `_renderFig` routes figures in that schema to it.

Nothing draws a figure when a page loads. Parsing both blocks with acorn showed that they use
nothing from their modules' scope except 05's `esc`, and nothing else in those modules uses them.
Four places call them:

- the chapter quiz (03), the only eager caller;
- the question-bank paper (`bank-exam.js`, ADR 0042);
- the AI test and paper (`ai-exam.js`, ADR 0041), which already loads `bank-exam.js` first;
- one `ai-verify` test that draws a cylinder.

## Decision

1. **Both blocks move verbatim to `02c-figures.js`,** which ships as `public/js/figures.js`
   (`deferred-manifest.json`). It carries its own copy of `esc`.
2. **02 adds `window._ensureFigures()`,** a load-once promise, and a warm-load on the first
   `pointerdown`/`focusin` inside a chapter quiz.
3. **`_ensureBankExam()` also loads `figures.js`,** so the question-bank paper, and the AI
   pipeline (whose `_ensureAIExam()` calls `_ensureBankExam()`), have the renderers before they
   draw.
4. **The chapter quiz stays synchronous.** If the renderers are not loaded yet, it renders every
   question at once with an empty figure slot, then fills the slots when `figures.js` arrives.
   The slots are looked up inside that quiz's own paper, so a quiz generated again before the
   file arrives is not filled with the old quiz's figures. The wrappers other modules add to
   `genChapterQuiz` (timer, vocabulary marking, level preset) are unchanged. If the file cannot
   load, each slot shows the error.

## Consequences

- `engine.js` goes from 344KB to 274KB (−70KB) on every page. `figures.js` is 72KB. A visitor
  downloads it only after touching a chapter quiz, generating a quiz or paper that has figures,
  or generating any question-bank or AI paper.
- Tests (`tracks.spec.js`, new):
  - `engine.js` is under 300KB and no longer contains `_renderFig`, `renderGeom3D` or the palette;
  - on Geometry, `figures.js` does not load with the page; a chapter quiz generated before it
    loads fills every figure slot with an SVG once it arrives, and a second quiz draws its
    figures at once, with one request in all;
  - if `figures.js` cannot load, the quiz still shows all 10 questions and each slot shows the
    error;
  - `_ensureBankExam()` makes both renderers available;
  - there are no page errors.
- `ai-verify.spec.js`'s cylinder test now awaits `_ensureFigures()` before drawing. The rest
  pass unchanged.
- **To change how a figure is drawn,** edit `02c-figures.js`.
