# ADR 0007 — `workedExampleCard` block; `compact` variant for practiceSet/testGenerator; `eyebrowClass`

**Date:** 2026-08-18
**Status:** Accepted

## Context

Migrating `appc` (AP Precalculus, the sixth track) surfaced several real shapes not present in any
of the first five migrated tracks:

1. **A standalone worked-example card.** Every unit has 3 `<div class="fcard"><div class="ft">Worked
   Example N.M</div><p><strong>Problem.</strong> …</p><div class="solution">…</div></div>` — NOT inside
   a `.formula-cards` grid, and structurally distinct from `calloutBlock`'s `example` style.
2. **A genuinely different practice-set shape.** `appc-practice` uses `.problem#appc-pN > .prow
   (.pn + .lvl, no b/i/a class suffix) + .qt` instead of `.ph`/`.pn`/`.pq`/`.lvl {b|i|a}`; the "Show
   solution" button toggles `classList.toggle('open')` inline instead of calling the shared
   `toggleSol(this)`; there are only 6 items (not ~50); and difficulty uses **Easy/Medium/Hard**, a
   different vocabulary from every other track's Basic/Intermediate/Advanced. No intro paragraph, and
   the heading is "Practice **Set**" (capital S) not "Practice set".
3. **A genuinely different test-generator shape**, using the *same* Easy/Medium/Hard vocabulary: field
   wrappers are `class="ctrl"` not `"tg-field"`, the Difficulty `<select>` has no `selected` option and
   says "All" not "All levels", the "Show all answers" button carries an extra `ghost` class and a
   `data-state="hidden"` attribute, the heading is "Test **Generator**" (capital G), and — new — a
   Chapter Quiz widget (identical shape to a chapter's own `quizWidget`) appears after the test-generator
   controls, which no other track's test-generator section has.
4. **A functional (not decorative) extra class on the subject-head eyebrow**: `<span class="eyebrow
   amber">` — `.eyebrow.amber{color:var(--amber-text)}` is a real CSS rule, not a no-op like the missing
   `.subject-head {trackId}` class accepted for act2.

## Decision

- Add `workedExampleCard` as a new `blocks[]` kind (question/solution pair, static "Problem." prefix
  emitted by the partial, not a field — same token-efficiency reasoning as `practiceProblem`).
- Add `variant: "compact"` to both `practiceSet` and `testGenerator` (default remains `"standard"`,
  requiring zero changes to the five already-migrated tracks). Each variant renders its own real DOM
  shape and vocabulary — `compact` is not a restyle of `standard`, it's a second real shape found in
  source. Difficulty is now free text in the schema (not a fixed enum), since two real vocabularies
  already exist and a third is plausible.
- Add optional `heading` overrides to both `practiceSet` and `testGenerator` (default "Practice set" /
  "Test generator") for the real capitalization differences, and `testGenerator.chapterQuizAfter` for
  the extra widget.
- Add optional `pageHeader.eyebrowClass` for the real, functional CSS-class case.

## Consequences

- Verified against all of appc's real instances (5 chapterTags, 4 `callout warn` practice problems, 12
  worked-example cards, 6 compact practice items, 1 compact test-generator, 1 eyebrowClass) — not
  guessed at.
- The next track using either variant is a real second confirmation that `compact` generalizes, the
  same way est2 confirmed act2's `category` chapterTag and `practiceProblem` generalized (docs/
  DECISIONS/0006). If a third, different shape turns up, it gets its own variant/kind by the same
  method — read the real markup first, don't force-fit into `compact`.
- `docs/CONTENT_MODEL.md` and `AGENTS.md`'s "diff every partial against real copy" lesson now extends
  to markup shape and vocabulary, not just copy text — confirmed by this track needing three separate
  partial changes (chapter.njk dispatch, practice-set.njk, test-generator.njk) plus subject-head.njk,
  not just new content fields.
