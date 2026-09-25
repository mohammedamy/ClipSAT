# ADR 0036 — Defer-load the AI practice quiz; keep chat and chapter quiz eager

**Date:** 2026-09-25
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.015; fourth application of ADR 0028's
pattern (after ADRs 0029 and 0031)

## Context

Phase 5.015's next item was an audit of `03-ai-chat-and-practice-quiz.js` (51KB source). The
module has three parts:

- **"Ask Mr. Mohamed" chat, plus the shared AI provider** (`_openrouterChat`,
  `_openrouterChatMessages`, `_openrouterEnabled`). The provider is used by the test generator,
  the exam review and the chat, on every track. Stays eager.
- **Chapter quiz** (`genChapterQuiz`). `18-chapter-quiz-timer-options.js`,
  `20a-vocabulary-tooltip.js` and `22-assignments-reports-search.js` all wrap
  `window.genChapterQuiz` at load time. Deferring it would silently drop those wrappers — the
  ADR 0028 hazard. Stays eager.
- **AI practice quiz** (`launchPracticeQuiz`, `_extractQuizJSON`, `showPracticeQuiz`,
  `showPQResult`, `pqPick`/`pqNext`/`pqExplain`, `_callAIRaw`, and the dead `printPQResult` noted
  in ADR 0029). About 280 lines. Its only entry point is `launchPracticeQuiz(mistake)`, called from
  "Still unsure" in the mistakes review (`13-mistakes-review.js`). Nothing wraps it, and it has no
  load-time side effects.

## Decision

1. **Split the practice quiz out.** Move it into `03b-practice-quiz.js`, wrapped in its own IIFE,
   and list it in `deferred-manifest.json`, which ships it as `public/js/practice-quiz.js`. It
   registers `window.CSPracticeQuiz = {launch}` and redefines `window.launchPracticeQuiz`. Its
   remaining dependencies are all eager globals: `_openrouterChat`, `escHtml`, `openAISettings`,
   `openCloudAuthModal`, `openChatWith`, `_shuffle`, `CSExport`.
2. **Keep a stub in `03`.**
   - `window._ensurePracticeQuiz()` is a load-once promise with the same shape as
     `_ensureWhiteboard()`.
   - `window.launchPracticeQuiz(mistake)` awaits it, then calls `CSPracticeQuiz.launch`. It calls
     that rather than `window.launchPracticeQuiz`, so a broken load cannot loop back into the stub.
   - A load failure shows a plain "could not load" message.
3. **Warm the load.** Opening the mistakes review starts `_ensurePracticeQuiz()`, so "Still unsure"
   is normally instant.

## Consequences

- `engine.js` shrinks by 14.3KB (908,435 → 894,124 bytes). The deferred file is 15KB.
- Cumulative 5.015 total: about 221KB deferred (TeacherMode, CSExport, whiteboard, per-track
  Interactive Practice data, practice quiz).
- Test: `tracks.spec.js` checks that `practice-quiz.js` is not requested with the page, that
  launching the practice quiz loads it, and that the quiz renders (with a stubbed provider).
- **Next candidate:** the AI exam pipeline (`05b` verifier, `05c` blueprints, `05d` assembler,
  `05e` redundancy check) is only used after "Generate" with the AI source. It is now the largest
  deferrable block. Its test hooks call its globals directly, so deferring it needs those tests to
  await a loader first.
