# ADR 0017 — algebra: `cards.heading`, `equationDisplay`, checkbox controls

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `algebra` (Algebra 1, the sixteenth track) is the densest explorer track yet — 5
explorers across 11 chapters, no chapterTag anywhere (matches precalc/geo),
`testGenerator.hasFullExam:false` (matches geo/alg2), and practice-set items numbered `"A1"`
through `"A50"` (an alphanumeric prefix — `practiceSet.items[].number` now accepts a string, not
just an integer). Three more real explorer shapes surfaced, all new despite 15 tracks already
migrated:

1. **A plain `<h3>` heading above some `formula-cards` rows.** "Three forms of a line", "Three
   forms of a quadratic", "Special products & factoring" — present on 3 of algebra's rows, absent
   on the rest and on every prior track's `cards` blocks.
2. **A bare live-equation `<div>`, not wrapped in a `callout.note`.** alg2's `ratEq`/`conicEq`
   (ADR 0012) were embedded inside a `callout.note`'s `<p>`. algebra's `lineEq`/`quadEq`/`tfEq` are
   instead a standalone `<div class="mono" id="..." style="...">` sitting directly between the
   controls and the readouts — a different real shape, not a variant of the first.
3. **A real checkbox control.** `ag-exponential`'s `expInv` ("Show inverse ... and the line
   y=x") is a genuine `<input type="checkbox">`, not a slider or select — the first checkbox
   found across all 16 explorers seen in this migration, with a completely different markup
   shape (`<label class="chk"><input type="checkbox">text</label>`, no `.ctrl` wrapper, no
   value-display span).

## Decision

- Add `cardsBlock.heading` (optional string) — renders a plain `<h3>` immediately before
  `.formula-cards`.
- Add `explorerBlock.equationDisplay` (optional `{id, value, style}`) — a bare `<div class="mono"
  id>` between controls and readouts, distinct from `note`'s embedded-`<b>` trick.
- Add `explorerBlock.controls[].checkbox` (boolean) + `.checked` (boolean) — when `checkbox` is
  true, the control renders as `<label class="chk"><input type="checkbox">...</label>` instead of
  the usual `.ctrl` wrapper; all slider/select-only fields become unused.
- Widened `practiceSet.items[].number` to `integer | string`.

## Consequences

- All additions optional/defaulted — re-verified qudrat (no checkboxes, 9 `.formula-cards` with
  no stray `<h3>`) unaffected.
- Verified interactive: a real click on `expInv` toggled `checked=true`, and BOTH the
  `equationDisplay` (`y = 1·2ˣ` → `y = 1.0·2.0ˣ`) and the readouts (behavior → "growth (b > 1)",
  y-intercept → "(0, 1.0)") updated correctly — confirming the checkbox genuinely drives
  engine.js, not just markup.
- algebra is the 16th of 21 tracks live.
