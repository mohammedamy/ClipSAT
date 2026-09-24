# ADR 0035 — Generate tests and papers slot by slot from each exam's blueprint

**Date:** 2026-09-24
**Status:** Accepted
**Builds on:** ADR 0034 (review of AI questions)

## Context

ADR 0034 made sure each AI question is correct, on-syllabus and clearly posed. The maintainer then
asked that a generated test also match the real paper's *specification*: the number of questions
per part, the difficulty level, and each topic's weight on the exam.

The full-exam generator asked the model for the whole paper in one call. It then cut the reply
evenly across the sections. So topic mix, difficulty profile and per-part counts were whatever the
model happened to produce. A stronger model would drift less, but nothing in that design could make
the result match.

## Decision

The code plans the paper, and the model only fills slots.

1. **Blueprints** (`src/scripts/modules/05c-exam-blueprints.js`). Each exam has:
   - topics, with published weights where they exist and the source cited:
     - SAT: Digital SAT assessment framework;
     - ACT: ACT reporting categories;
     - AP Calculus AB/BC, AP Precalculus, AP Statistics: CED unit weightings;
     - IB AA SL/HL: recommended teaching hours;
     - Cambridge IGCSE 0580 (Extended): Cambridge publishes no topic weights, so each topic is
       weighted by its share of the Extended learning outcomes in the 2025–2027 / 2028–2030
       syllabus (31/22/7/13/5/6/8/5/9 of 106), and the table says so;
   - optional assessment objectives (`ao`), assigned per slot within each part. IGCSE Extended uses
     the syllabus balance AO1 45 % / AO2 55 %;
   - optional excluded content (`exclude`), added to every generation prompt. IGCSE excludes
     matrices and linear programming, which are no longer in the syllabus;
   - a difficulty mix (easy/medium/hard) and an order (ACT runs easy → hard). Exam boards don't
     publish difficulty shares, so these are ClipSAT's calibration, and the file says so;
   - question-bank domains for each topic, used for fallback.

   Exams whose board publishes no topic weights get an even split over their syllabus domains,
   marked *provisional*. The paper shows that label until the official distribution is supplied.
   Section and part structure (counts, calculator rules, MCQ/FRQ) stays in `window.examSpecs`.
2. **Plan** (`05d-blueprint-assembler.js`, `plan`). Every question becomes a slot
   `{part, topic, difficulty, type, calculator}`:
   - topic counts use largest-remainder rounding of the weights over all slots of each type;
   - difficulty counts use the mix within each part (or the single level chosen for a practice test).
3. **Fill** (`fill`):
   - Slots are generated in per-topic batches of up to 8 (three calls in flight). Each question is
     tied to its slot number.
   - The ADR 0034 review runs with the slot's topic and difficulty as targets. It rejects a question
     that tests another topic or sits at another difficulty, the same way it rejects a wrong answer.
   - Empty slots get one more AI round. Any still empty are filled from the checked question bank
     with the same topic and difficulty, labelled "Question bank".
4. **Paper:**
   - questions sit in their planned part and order;
   - a blueprint table above the paper lists each topic's exam weight against its question count,
     the difficulty split, how many slots came from AI and from the bank, and the source of the
     weights.

## Consequences

- Topic weights, difficulty split and per-part counts match the blueprint exactly, whichever model
  is used. A stronger model means fewer rejections and fewer bank fills.
- A full paper costs about one generation and one review call per 8 questions, plus a retry round,
  three at a time. For example, 60 ACT questions take about 16 calls.
- The weights for Qudrat, Tahsili, EST I/II, ACT 2, AS/A Level and Precalculus are
  provisional until the official specifications are confirmed.
- IGCSE's `examSpecs` entry described the pre-2025 format. It now follows the current syllabus:
  Paper 2 (non-calculator) and Paper 4 (calculator), 2 hours and 100 marks each. The IGCSE question
  bank still holds a "Matrices" domain that is out of syllabus; the blueprint never draws from it.
- The ACT spec in `examSpecs` still describes the 60-question / 60-minute / 5-option paper. The
  current ACT format has changed and should be confirmed with the maintainer before the structure
  is updated.
- Tests: `tests/e2e/ai-verify.spec.js`, with a slot-aware provider stub, checks:
  - a 60-question ACT paper's exact topic counts (5/8/8/8/6/25) and difficulty split (21/24/15);
  - the easy → hard order;
  - the retry round and the bank fill;
  - a full IGCSE paper: two 20-question papers, outcome-share topic counts, the AO1/AO2 split,
    calculator rules per paper and the excluded content in every prompt;
  - a single-level SAT practice test;
  - all the ADR 0034 review rules.
