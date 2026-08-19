# ADR 0012 — `testGenerator.hasFullExam`, readout `parts`, per-card `wide`

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `geo` (Geometry, the thirteenth track) is the simplest shape since `precalc` — no
`chapterTag`, no in-chapter practice-problem block, worked examples use the plain `example`
callout style already modeled. Three real deviations surfaced, none seen in any of the 12 prior
tracks:

1. **No "Full official exam paper" section at all.** Every track migrated so far has a mini
   practice-test control row PLUS a full-exam generator below it. geo's real
   `<section id="geo-testgen">` has only the mini controls — no `.tg-divider`, no exam
   title/description/button, no `genFullExam()` call anywhere in this section.
2. **A compound readout row.** geo-right's Pythagoras explorer has one row, `a² + b²`, whose
   `<span class="v">` contains TWO separately-updating `<span id>` children joined by literal
   `" + "` text — not the one-id-per-row shape every other readout (across all 21 legacy tracks,
   confirmed by search) uses.
3. **A per-card `wide` class.** geo-transform's formula-cards row has one card (`Reflection`)
   with an extra `wide` class among three plain siblings — the `cards` block kind had no way to
   express this (only `downloadsInfo.resourceCards[].wide` and `workedExampleCard`-adjacent
   blocks did).

A fourth, smaller deviation: 2 of geo's 3 explorer sliders show no live value next to their label
at all (`<label>Tilt the transversal</label>`, no `<span class="mono">`) — the derived readouts
below already show the result, so no value-display span exists in source.

## Decision

- Add `testGenerator.hasFullExam` (boolean, default `true`) — `false` omits the entire "Full
  official exam paper" block; the `exam*` fields become unused. Also relaxed `testGenerator`'s
  `required` list to `[]` since every field is now conditionally needed.
- Add `explorerBlock.readouts[].parts` (optional array of `{id, value, suffix}`) — when set,
  overrides `id`/`value` and renders each part as its own `<span id>` with literal suffix text; the
  outer `<span class="v">` gets no `id` of its own, matching source.
- Add `cardsBlock.items[].wide` (optional boolean, default `false`) — adds the `wide` class to just
  that one card.
- Made `explorerBlock.controls[].valueDisplayId` optional — omit the field entirely when source has
  no value-display span (was previously always-required, always-rendered).

## Consequences

- All four additions are optional/defaulted. Re-verified qudrat (full-exam section still renders,
  no stray `.fcard.wide`) unaffected.
- Verified interactive: dragged geo-right's `Leg a` slider to `2` — `geoPav` showed `2`, the
  compound readout correctly showed `4 + 16`, and the independent `geoPc2` row recalculated to
  `20` (checked by hand: `2²+4²=4+16=20`).
- 50-item practice set (`standard` variant, real `b`/`i`/`a`↔`Basic`/`Intermediate`/`Advanced`
  mapping, no `levelLabel` needed) extracted via the established regex-script method, not
  hand-transcribed.
- geo is the 13th of 21 tracks live.
