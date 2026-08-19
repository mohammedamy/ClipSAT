# ADR 0010 — ibsl: `example-grid` callout style, per-badge chapterTag classes, `ib` variants

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `ibsl` (IB Mathematics SL, the eleventh track) surfaced four real deviations from every
shape seen in the first ten tracks:

1. **A third "worked example" markup shape.** Alongside the existing `workedExampleCard`
   (`.fcard`) and `callout` style `example` (`.example` + `<span class="xt">` label), ibsl (and,
   per a legacy-file check, `ibhl`/`calculus`) uses `.example > .ex-body > <p style="font-weight:
   700">Worked Example · {title}</p>` followed by raw problem+solution `<p>` paragraphs run
   together (not split into separate fields).
2. **A real, live rendering bug in the legacy source itself**, found while reading ibsl's full
   markup: each of its 6 numbered/AI `<section class="chapter">` topics closes right after its
   `callout warn` "Practice Problem" + quiz widget, but 2–3 MORE worked examples (the shape above)
   plus 1 more `practiceProblem`-shaped block for that SAME topic sit dangling in `.content`,
   outside any `.chapter` wrapper — since `.chapter{display:none}` by default and only
   `.chapter.ch-active` shows, this orphaned content is NOT gated by chapter switching at all: it
   renders unconditionally on the page regardless of which tab is open. Confirmed by checking
   `public/css/main.css`'s `.chapter` rule and the exact DOM position of each orphaned block
   (always directly after one topic's `</section>` and before the next topic's `<section>` open —
   topically belonging to the PRECEDING topic in every instance, verified by subject match, e.g.
   the content before `ibsl-t2` opens is about sequences/logs, Topic 1's subject, not Topic 2's).
3. **A `chapterTag` pill whose badges use different classes, not one shared class.** `ibsl-tag`'s
   3 badges (`P1 & P2` / `AA SL` / `AI SL`) carry `ib-paper`/`ib-aa`/`ib-ai` respectively — every
   prior pill-variant track used ONE `badgeClassName` for every badge.
4. **`testGenerator` and `downloadsInfo` shapes with no prior precedent.** ibsl's test generator
   has TWO "Generate exam" buttons (AA/AI) sharing one `sections[]`/`examMinutesArg`, an outer
   `.testgen` wrapper, mini-test buttons OUTSIDE `.tg-controls`, and `genTest(this, trackId)`
   (an explicit trackId argument, unlike every other variant's `genTest(this)`). Its downloads
   section has NO self-serve PDF/DOCX export at all — replaced by a `.formula-cards` row of real
   resource cards (Formula Booklet/Past Papers/GDC Tips/Mark Schemes), with the `officialLinks`
   past-papers widget nested INSIDE the Mark Schemes card instead of sitting beside PDF/DOCX cards.

## Decision

- Add `calloutBlock` style `example-grid` — renders `.example > .ex-body > <p>Worked Example ·
  {label}</p>` + raw body, the static `Worked Example · ` prefix is template markup (not a field),
  matching `workedExampleCard`'s existing "Problem." prefix precedent.
- Restore the orphaned content into the chapter it topically belongs to, as the last blocks before
  the always-final quiz widget (not left dangling/unwrapped) — this is a real bug fix, not a
  reproduction of source's accidental behavior, matching the project's established stance on
  `downloads-block.njk`'s unclosed-div fix.
- `chapterTag.badges[]` items may now be a plain string (uses `badgeClassName`, unchanged) OR an
  `{text, className}` object overriding the class for just that badge. `badgeClassName` itself is
  no longer required (only needed when at least one badge is a plain string, or for `category`
  variant's `weightBadge`).
- Add `testGenerator.variant: "ib"` and `.exams[]`/`.examIntroLabel` — one button per real exam,
  sharing `sections[]`/`examMinutesArg`.
- Add `downloadsInfo.variant: "ib"` and `.resourceCards[]` (each optionally
  `officialLinksInside: true` to nest the unchanged `officialLinks` pp-card widget inside it).

## Consequences

- All additions are optional/defaulted or `oneOf`-widened — re-verified qudrat (chapterTag still
  renders with shared `badgeClassName`, unaffected) and appc (testGenerator/downloads still render
  their `compact`/`standard` shapes, unaffected) in-browser after the change.
- The orphaned-content bug fix means ibsl's migrated page shows LESS unconditional content than
  the legacy page (each restored block is now properly gated by chapter visibility) — this is
  intentional and correct, not a content loss; verified every orphaned block's exact text survived
  the move via structural counts (13 `example-grid` instances, 18 `.problem` blocks — 6
  `practiceProblem` + 12 practice-set items — both matching source's raw grep counts exactly).
- `ibsl` is the 11th of 21 tracks live — the halfway point (10/21) was crossed with the previous
  track (precalc, WP22).
