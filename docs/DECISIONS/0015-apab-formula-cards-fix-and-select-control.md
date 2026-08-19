# ADR 0015 — apab: reconstructed formula-cards, explorer `select` controls

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `apab` (AP Calculus AB, the fourteenth track) surfaced two real findings.

1. **A genuine markup-corruption bug in Unit 1's `formula-cards`.** The real source has an
   unclosed `<div class="ft">Limit` — never closed before the NEXT fcard's full markup begins —
   which swallows the "Squeeze theorem" and "Continuity" cards as nested children of "Limit"'s
   title div instead of sibling grid cards, then closes with a stray `</div>` that terminates
   early, leaving 3 more cards ("Key limit", second "Continuity", "IVT") outside their intended
   context. Traced through how a browser's HTML parser actually recovers from this: on the live
   (not-yet-migrated) page today, "Squeeze theorem" and the first "Continuity" card render
   VISIBLY NESTED inside "Limit"'s small title-label area, not as their own grid cards — a real,
   currently-live rendering bug. Reconstructed as 6 clean sibling cards, preserving every real
   text fragment, matching the project's established stance on fixing (not reproducing) accidental
   markup corruption (`downloads-block.njk`'s documented unclosed-div fix, the ibsl orphaned-content
   fix).
2. **A real `<select>` dropdown control.** `apab-u6`'s Riemann-sum explorer has a "Sample point"
   control that is a real `<select>` (Left endpoint/Right endpoint/Midpoint), not a range slider —
   the first non-slider control found across 14 tracks.

## Decision

- Add `explorerBlock.controls[].options` (optional array of `{value, label}`) — when set, renders
  a `<select id>` with those `<option>`s instead of `<input type=range>`; `min`/`max`/`step`/
  `valueDisplayId` become unused. No `selected` attribute is added (source has none — the
  browser's own first-option default already matches).
- `controls[].value` now accepts `number | string` (a string for the select's default value).
- Reconstructed Unit 1's formula-cards content as 6 flat sibling `cards` items, not reproduced
  as broken/nested markup.

## Consequences

- Optional/defaulted additions — re-verified qudrat (no `<select>` in any explorer) unaffected.
- Verified interactive: selected "Midpoint" and dragged `n` to 10 on the Riemann-sum explorer —
  both the select's real DOM value and the canvas/readouts (rectangle estimate 12.512, exact
  integral 12.533) updated correctly, confirming the dropdown genuinely drives engine.js, not
  just cosmetic markup.
- apab is the 14th of 21 tracks live.
