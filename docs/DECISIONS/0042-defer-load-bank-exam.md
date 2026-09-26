# ADR 0042 — Load the question-bank full exam and the exam specs on demand

**Date:** 2026-09-26
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015. Same mechanism as ADRs 0036, 0037
and 0041.

## Context

`02-core-app.js` shipped two blocks to every page that only a paper generator uses:

- `window.examSpecs`, the real exam configurations (19KB of source);
- the question-bank `genFullExam` (20KB), which builds a full paper from the bank.

Parsing both with acorn showed they use nothing from 02's shared scope. Only four places read
them:

- 02's own `genFullExam`;
- the AI pipeline (`05a`, and `05c` via the assembler), which is already deferred;
- two wrappers added at load:
  - 05's AI override, which captures `window.genFullExam` as its question-bank fallback;
  - `20a-vocabulary-tooltip.js`, which marks vocabulary 1.2 s after a paper is generated;
- three `ai-verify` tests, all of which already await `_ensureAIExam()`.

## Decision

1. **Both blocks move verbatim to `02b-bank-exam.js`,** which ships as `public/js/bank-exam.js`
   (`deferred-manifest.json`) and exports `window.CSBankExam.genFullExam`.
2. **02 keeps the load-time pieces:**
   - `window._ensureBankExam()`, a load-once promise;
   - a warm-load on the first `pointerdown`/`focusin` inside a test generator;
   - `window.genFullExam`, which waits for the file and hands off to `CSBankExam`.
   It stays a global so the wrappers still wrap it. A load failure shows the error in the test's
   output box.
3. **`_ensureAIExam()` loads `bank-exam.js` first,** because the AI pipeline reads
   `window.examSpecs`.
4. **The 20a wrapper waits for `genFullExam`'s promise** before its 1.2 s marking delay.

## Consequences

- `engine.js` goes from 458KB to 429KB (−29KB) on every page. `bank-exam.js` is 31KB, and a
  visitor downloads it only after touching a test generator or generating a paper.
- Tests:
  - new: `engine.js` no longer contains `examSpecs`;
  - new: `bank-exam.js` does not load with the page but does load when a question-bank paper is
    generated;
  - new: the ACT paper has the spec's 45 questions and no repeated question;
  - `ai-verify.spec.js` and `tracks.spec.js` pass unchanged.
- **To change an exam's configuration or the question-bank paper builder,** edit
  `02b-bank-exam.js`.
