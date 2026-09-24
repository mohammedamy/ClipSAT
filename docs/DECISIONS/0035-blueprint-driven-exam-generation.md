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

## Current specifications (September 2026)

The maintainer asked for every exam to follow its most recent specification. Official sites were not
reachable from the build environment, so each item below was cross-checked in more than one published
summary of the board's announcement:

- **ACT** — enhanced ACT (from September 2025): 45 questions in 50 minutes, four answer choices,
  calculator throughout. Preparing for Higher Math 80% (Number & Quantity 10–12%, Algebra, Functions and
  Geometry 17–20% each, Statistics & Probability 12–15%), Integrating Essential Skills 20%. The real
  test scores 41 and field-tests 4; ClipSAT scores all 45.
- **AP Calculus AB/BC** (May 2027): 42 MCQ in 100 minutes (Part A 29 no calculator, 62 min; Part B
  13 calculator, 38 min); 6 FRQ unchanged. Course content and unit weights unchanged.
- **AP Precalculus** (May 2027): 42 MCQ in 105 minutes (Part A 29 / 65 min; Part B 13 / 40 min);
  4 FRQ in 70 minutes (2 calculator, 2 no calculator, 35 min each).
- **AP Statistics** (revised five-unit course, May 2027): 42 MCQ in 90 minutes, 4 FRQ of 10 points in
  90 minutes; unit weights 20–30 / 15–25 / 15–25 / 10–20 / 10–20%. Removed topics go in `exclude`.
- **All AP MCQs** have four options. The generator is told the option count, a generated MCQ with a
  different count is rejected, and bank fills use only items with that count.
- **Digital SAT**: each 22-question module is 17 multiple choice + 5 student-produced response
  (about 75/25). The real test mixes them; ClipSAT groups them within the module.
- **IB Mathematics: AA** — the 2021 guide stays in force until the new guide's first exams in May 2029.
  Its papers are written (Section A short response, Section B extended response); they were wrongly
  set as multiple choice. HL gains Paper 3 (two extended questions, 55 marks, 60 minutes).
- **Cambridge 9709** (2026–2027): Paper 1 and Paper 3 are 1 h 50 min, 75 marks. Their blueprints now
  use only that paper's syllabus topics (the old split mixed mechanics and statistics into Paper 1).
  Cambridge publishes no topic weighting, so the topics are weighted evenly and marked provisional.
- **GAT Qudrat** quantitative: arithmetic 40%, geometry 24%, algebra 23%, statistics and analysis 13%.
- **ACT International Subject Test — Mathematics 1** (`act2`): 50 questions in 60 minutes, calculator,
  about half Algebra II and half precalculus.
- **EST II Mathematics Level 1 / Level 2**: 50 questions in 60 minutes, calculator allowed. Topics are
  the EST Description Document's areas (Academic Assessment Ltd.): Numerations and Operations 10–14%
  (both levels), Algebra and Functions 32–42% (L1) / 46–50% (L2). The other four areas share the rest
  evenly until their published ranges are supplied (marked provisional). All four answer choices.
- **ACT International Subject Test — Mathematics 2** (`act2l2`): Algebra II 50 / precalculus 50, with
  its own generator prompt (it previously fell back to a generic "Mathematics" prompt, as did `est2l2`).
  Mathematics 1 (`act2`) uses four options, matching its question bank.
- **SAAT Tahsili**: Qiyas publishes no topic distribution. The topic list and weights follow the
  lessons per part of the "Excellence in SAAT" syllabus book the maintainer supplied (algebra 24,
  geometry 14, trigonometry 4, calculus 3, statistics 5 of 50) — provisional, and the paper says so.
- **Not changed, still to confirm:** EST I (the EST FAQ calls Math "a unified test, calculator allowed
  throughout" while older descriptions give two sections; the question count is not published in
  anything reachable) keeps the provisional even split.

## Consequences

- Topic weights, difficulty split and per-part counts match the blueprint exactly, whichever model
  is used. A stronger model means fewer rejections and fewer bank fills.
- A full paper costs about one generation and one review call per 8 questions, plus a retry round,
  three at a time. For example, 45 ACT questions take about 12 calls.
- Provisional until official distributions are supplied: EST I and Precalculus (even split), the
  unpublished part of EST II's split, Tahsili (syllabus-book proxy) and Cambridge 9709 Papers 1 and 3
  (even split over the paper's topics).
- IGCSE's `examSpecs` entry described the pre-2025 format. It now follows the current syllabus:
  Paper 2 (non-calculator) and Paper 4 (calculator), 2 hours and 100 marks each. The IGCSE question
  bank still holds a "Matrices" domain that is out of syllabus; the blueprint never draws from it.
- Tests: `tests/e2e/ai-verify.spec.js`, with a slot-aware provider stub, checks:
  - a 45-question enhanced-ACT paper's topic counts (5 / 8–9 / 8–9 / 8–9 / 6 / 9), difficulty split
    (16/18/11) and four options on every item, bank fills included;
  - every exam's part structure against its current specification;
  - the easy → hard order;
  - the retry round and the bank fill;
  - a full IGCSE paper: two 20-question papers, outcome-share topic counts, the AO1/AO2 split,
    calculator rules per paper and the excluded content in every prompt;
  - a single-level SAT practice test;
  - all the ADR 0034 review rules.
