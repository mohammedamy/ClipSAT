# ADR 0041 — Ship the AI test code with the deferred AI exam pipeline

**Date:** 2026-09-26
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015. Extends ADR 0037, which deferred
05b–05d as `public/js/ai-exam.js`. Follows ADRs 0039 and 0040.

## Context

`05-test-generator-and-ai-settings.js` (96KB of source) is loaded eagerly on every page. It holds
three kinds of code.

1. **Code every page needs.**
   - The AI settings modal (`openAISettings`, `closeAISettings`, `saveAISettings`),
     `aiEnabled()`, and the loader `_ensureAIExam()`.
   - The SVG figure renderer. `window.renderMathFigure` is also used by `_renderFig` in 02 for
     question-bank figures.
   - The question-bank test (`_genTestOriginal`) and `tgReveal`.
   - The `genTest`/`genFullExam` overrides. `20a-vocabulary-tooltip.js` and `quiz-capture-ui.js`
     wrap these at load, so they must exist at load.
2. **Code used only on the AI path**, after the visitor presses Generate with the AI source:
   - the exam prompt builder `examSystemPrompt`;
   - `callAI` / `callAISolver`;
   - blueprint and letter helpers;
   - `renderAIQuestion`, and the `aiq*` handlers its markup calls;
   - `ClipSATSymbolicCheck`;
   - the AI bodies of `genTest` and `genFullExam`.

   That is about 50KB, and both AI bodies already wait for `_ensureAIExam()` before doing
   anything.

Only two of 05's private helpers are used by the AI-only code: `esc` and `renderMathFigure`. No
eager code uses anything from the AI-only part.

## Decision

1. **The AI-only code moves verbatim to `05a-ai-test.js`,** which ships first inside
   `ai-exam.js`.
   - The bodies of the two overrides become `aiGenTest` and `aiGenFullExam`, exported as
     `window.CSAITest`. Their "use the question bank instead" branches stay in 05.
   - It carries its own copy of `esc`. Its local `renderMathFigure` forwards to the eager
     `window.renderMathFigure`.
2. **05 keeps the load-time globals.**
   - `window.genTest` and `window.genFullExam` still exist at load, so the existing wrappers keep
     wrapping them. On the question-bank source they behave as before.
   - On the AI source they call `_runAI()`. It shows "Loading the exam generator…" if the bundle
     is not loaded yet, waits for `_ensureAIExam()`, and hands off to `CSAITest`.
   - A load failure shows the error in the test's output box.
3. **`_ensureAIExam()` also requires `CSAITest`** before it reports the pipeline as ready.

## Consequences

- `engine.js` goes from 513KB to 474KB (−39KB minified) on every page. `ai-exam.js` goes from 48KB
  to 87KB, and only a visitor who generates an AI test or paper downloads it. Touching a test
  generator still warms the load (ADR 0037).
- Tests:
  - `ai-verify.spec.js` passes unchanged (AI tests and full papers through the blueprint
    pipeline, and the question-bank paths);
  - new: `engine.js` no longer contains `examSystemPrompt`, `ClipSATSymbolicCheck` or
    `renderAIQuestion`, and `ai-exam.js` does.
- **To change the AI prompts or the AI rendering,** edit `05a-ai-test.js`. The settings modal,
  the figure renderer and the question-bank paths stay in 05.
