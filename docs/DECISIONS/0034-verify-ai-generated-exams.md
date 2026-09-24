# ADR 0034 — Review every AI-generated exam question before it is shown; show only confirmed ones

**Date:** 2026-09-24
**Status:** Accepted

## Context

The test generator and the full-exam generator create questions with AI whenever it is available
(signed in, or a personal key). They asked the model for questions, options *and* the answer key in
one call, at `temperature: 0.85`, and rendered the reply as-is. Nothing checked the key or the topic.
The maintainer reported generated tests full of wrong and irrelevant questions. They asked for
precise review before the final test is shown, with AI generation kept.

## Decision

1. **AI stays the default source.** `test-generator.njk` gains a `.tg-source` select:
   "AI-generated (reviewed)" (default) or "Question bank". The bank is used when chosen, or when AI
   is not available.
2. **Every AI question is reviewed, and only confirmed questions are shown**
   (`src/scripts/modules/05b-ai-question-verifier.js`).
   - *Structure:* an MCQ needs ≥3 non-empty, distinct options and an in-range integer key.
   - *Key consistency:* the prompt requires `answerValue` (the final result of the worked solution)
     and `choiceValues` (each option's value), both as plain-text math. The keyed option must equal
     `answerValue`, and no other option may.
   - *Independent review:* a second call at temperature 0 sees only each question and its options,
     never the key or solution. It is given the track's syllabus (the same text the generator gets)
     and the requested level. For each question it:
     - solves the question;
     - judges `in_syllabus`, `level_ok` and `well_posed` (unambiguous, all information given,
       exactly one correct option).
   - *Removal rules:* a question is removed if any of the following holds:
     - the reviewer's answer differs from the key;
     - any of the reviewer's judgements is false;
     - the review returned no verdict for it (a failed review call removes everything rather than
       showing unreviewed questions);
     - it is a free-response question with no checkable final answer (`numericAnswer` or
       `answerExpr`).
3. **Generation prompt:**
   - accuracy and syllabus relevance come first, and the key must follow from the worked solution;
   - temperature drops from 0.85 to 0.3.
4. **Over-generation:** the practice test asks for about 80% more questions than requested, so a
   full set usually survives review. Full papers are already near the token budget, so they drop
   failing questions without over-generating.
5. **What the visitor sees:**
   - every question shown carries "✓ Reviewed";
   - a summary line gives how many questions were removed, and why.

## Consequences

- An AI test costs one extra model call: the review, which sends questions and options only.
- Review catches:
  - keys that contradict the model's own solution;
  - duplicate or equal options;
  - off-syllabus or wrong-level questions;
  - ambiguous questions;
  - wrong keys the reviewer solves differently.

  It cannot *prove* a question correct: two model calls can agree on the same wrong answer. The
  question bank, whose answers are computed and second-reviewed (ADR 0025), remains one click away.
- A test can come back shorter than requested when many questions are removed. The summary says so.
- Fixed while testing: ten tracks have no full-exam block (calculus, geo, algebra, alg2, linalg, mvc,
  odes, act2l2, est2l2, dev-content-preview). There the test generator had no `.tg-out`, so
  "Generate test" threw and rendered nothing from any source. Those tracks now get their own output
  container.
- Tests: `tests/e2e/ai-verify.spec.js` stubs the provider and covers:
  - every removal rule;
  - that the key and solution never reach the reviewer;
  - AI as the default, and the bank when chosen or when AI is unavailable (including the
    no-output-container regression);
  - the full-exam path.
