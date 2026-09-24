# ADR 0034 — Verify AI-generated exam questions before showing them; default to the question bank

**Date:** 2026-09-24
**Status:** Accepted

## Context

The test generator and the full-exam generator have an AI path. It is used automatically for any
signed-in visitor, and for anyone with a personal key. That path asked the model for questions,
options *and* the answer key in one call, at `temperature: 0.85`, and rendered the reply as-is.
Nothing checked the key, so a confident wrong answer reached students. The maintainer reported AI
exams "full of wrong questions".

## Decision

1. **The question bank is the default source.** `test-generator.njk` gains a `.tg-source` select:
   "Question bank (checked)" (the default) or "AI-generated (auto-checked)". AI generation runs only
   when it is picked there *and* AI is available. Picking it without AI access shows a notice and
   uses the bank.
2. **Every AI question passes three gates before it is shown**
   (`src/scripts/modules/05b-ai-question-verifier.js`). A question that fails any gate is dropped.
   - *Structure:* an MCQ has ≥3 non-empty, distinct options and an in-range integer key.
   - *Key consistency:* the prompt now requires `answerValue` (the final result of the worked
     solution) and `choiceValues` (each option's value), both as plain-text math.
     - The keyed option must equal `answerValue`, and no other option may.
     - Numbers and fractions are compared directly; other expressions use
       `ClipSATSymbolicCheck` (numeric sampling).
     - If the fields can't be evaluated, the question is marked "unchecked" rather than dropped.
   - *Independent re-solve:* a second call at temperature 0 sees only each question and its options.
     It gets no key and no solution, and picks an answer. A disagreement drops the question. Numeric
     FRQs are re-solved against `numericAnswer`.
3. **Generation temperature drops from 0.85 to 0.3.** The generation prompt now says accuracy comes
   first, and the key must follow from the worked solution.
4. **The practice test over-generates by about 50%, so a full set usually survives the drops.**
   Full papers are already near the token budget, so they drop failing questions without
   over-generating.
5. **What the visitor sees:**
   - each question carries a badge: "✓ Checked" (passed every gate) or "⚠ Unchecked";
   - a summary line says how many questions were removed.

## Consequences

- An AI test costs one extra model call: the re-solve, which sends questions and options only.
- The checks catch several failure modes:
  - a key that contradicts the model's own solution;
  - duplicate options, or two options with the same value;
  - a wrong answer that the model reproduces consistently.

  They cannot prove a question correct: two model calls can agree on the same wrong answer. The
  bank stays the default because its answers are computed and second-reviewed (ADR 0025).
- Fixed while testing: ten tracks have no full-exam block (calculus, geo, algebra, alg2, linalg, mvc,
  odes, act2l2, est2l2, dev-content-preview). There the test generator had no `.tg-out`, so
  "Generate test" threw and rendered nothing on every source. Those tracks now get their own output
  container.
- Tests: `tests/e2e/ai-verify.spec.js` stubs the provider and covers:
  - each gate;
  - the bank-default path, including the no-output-container regression;
  - the full-exam path.
