# ADR 0037 — Defer-load the AI exam pipeline; keep the repeat check eager

**Date:** 2026-09-25
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015; ADRs 0034, 0035 (the pipeline),
0036 (the previous deferral)

## Context

ADR 0036 named the AI exam pipeline as the largest block every page downloads without needing it:

| Module | Source size | What it does |
|---|---|---|
| `05b-ai-question-verifier.js` | 15KB | reviews each AI question |
| `05c-exam-blueprints.js` | 32KB | per-exam blueprints |
| `05d-blueprint-assembler.js` | 14KB | plans slots and fills them |

Every use of these three is inside `05`, on the AI branch of `genTest` and `genFullExam`. That
branch is only reached after a student presses Generate with the AI source chosen. The badge
renderer checks `window.ClipSATVerifyAI` before using it. Nothing wraps these globals at load
time, and none has a load-time side effect.

`05e-redundancy-check.js` is different. The question-bank practice test and the bank full-exam
builder in `02` call it without any AI. If it loaded late, bank papers would silently lose the
no-repeat check. It stays eager; it is 5KB.

## Decision

1. **Ship the three modules as one file.** `deferred-manifest.json` entries may now list
   `sources`. `build.js` concatenates them in order, minifies them, and ships them as
   `public/js/ai-exam.js`. They leave `manifest.json`.
2. **Add `window._ensureAIExam()` to `05`.** It is a load-once promise with the same shape as
   `_ensurePracticeQuiz()`. Both AI paths call it first, then build the blueprint, plan and fill
   inside its `.then`. A load failure reaches each path's existing `.catch`, which shows the
   message.
3. **Warm the load.** The first `pointerdown` or `focusin` inside any `.testgen` box, when AI is
   available, starts the load. So the file is usually there before Generate is pressed.

## Consequences

- `engine.js`: 894,124 → 847,022 bytes (−47.1KB). `ai-exam.js` is 48KB, fetched only by
  students who generate an AI test.
- Cumulative 5.015 total: about 268KB deferred.
- Tests: `ai-verify.spec.js` checks that `ai-exam.js` is not requested with the page and is loaded
  when an AI paper is generated. Tests that call the pipeline's globals directly await
  `_ensureAIExam()` first.
