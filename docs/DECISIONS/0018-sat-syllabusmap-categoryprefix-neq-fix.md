# ADR 0018 — sat: `syllabusMap` block, chapterTag `categoryPrefix`, LaTeX-corruption fixes

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `sat` (Digital SAT Math, the seventeenth track) is the first track with a genuinely new
top-level widget and two distinct, real content-corruption bugs in the legacy source.

1. **A new exam-blueprint bar chart.** `sat-about`'s real markup has a
   `<div class="syllabus-map">` — an `<h3>` title, one `.sm-row` per topic with a topic label, a
   %-width bar, a displayed percent, and a small tag `<span>` — found on NO prior track. Confirmed
   reused by `igcse` (not yet migrated), with real per-row differences expected there (multiple
   tags per row for Core/Extended tiers, no inline `style` on the tag spans) — modeled generically
   enough (`tags[]` array, optional per-tag `style`) to cover both without assuming they're
   identical.
2. **`chapterTag`'s `category` variant, two real deviations.** `.sat-domain-tag` has no
   weight-badge span at all (already-optional per ADR 0017's `weightBadge`), and an optional plain
   "Domain: " prefix between the emoji and the bold category name — `sat-desmos`'s real tag
   ("📌 <strong>All domains</strong> …") has NO such prefix, confirming it's genuinely per-chapter,
   not a track-wide constant.
3. **A systematic `\neq` → newline-corruption bug.** At exactly 4 sites in the legacy source, the
   literal two characters `\n` (meant as the start of `\neq`) are an actual newline byte instead —
   silently swallowing the "n" (`Denom. \(\` + LF + `eq0\)`, etc.). Confirmed via byte-level
   analysis, distinct from a second, unrelated bug:
4. **Missing `\\` row-separators in 2 `\begin{cases}...\end{cases}` piecewise functions** (ch8's
   worked example 8.B and its chapter problem) — same bug category as alg2's matrix fix (ADR 0016).

No new block kind was needed for `sat`'s 20 worked examples — the existing `callout` `style:
'example'` (in use since algebra/WP22) already matches `<div class="example"><span
class="xt">...</span>...</div>` exactly.

## Decision

- Add `syllabusMapBlock` (`kind: 'syllabusMap'`) — `{title, rows: [{topic, barPercent, pctText,
  tags: [{text, className, style?}]}], note?}`. Rendered via a new
  `partials/blocks/syllabus-map.njk`, dispatched from `chapter.njk`.
- Add `chapterTag`'s category-variant `categoryPrefix` (optional string) — rendered between the
  emoji and the bold category name.
- Fix (not reproduce) the 4 `\neq`-corruption sites and the 2 missing-`\\` sites during
  transcription — write correct LaTeX in the generated content JSON.

## Consequences

- All structural counts verified to match the legacy source exactly: 14 `.chapter` sections, 10
  `.sat-domain-tag` chapterTags, 76 `.fcard`s, 3 `.explorer`s, 28 `.example`s, 59 `.problem`s
  (9 chapter problems + 50 practice items).
- Verified interactive: a real slider change on `satM` (slope) correctly drove `satLineCanvas`'s
  draw logic — readouts computed slope `-2`, y-intercept `(0, 1)`, x-intercept `(0.50, 0)` for
  `m=-2, b=1`, confirming the explorer wiring (not just markup) is correct. The
  `downloads-block.njk`'s existing unclosed-`<div>` fix (docs, WP12) was re-confirmed on `sat`'s
  DOCX/pp-card nesting bug — 3 flat sibling `.dl` cards render, matching the partial's documented
  fix rather than the source's accidental nesting.
- `sat` is the 17th of 21 tracks live. 4 remain: igcse, aslevel, a2level, calculus (last, largest).
