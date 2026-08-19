# ADR 0020 — igcse: syllabusMap reuse confirmed, chapterTag multi-badge tiers

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `igcse` (Cambridge IGCSE Mathematics 0580, the nineteenth track) confirms two
predictions made in ADR 0018 and surfaces one genuinely new `chapterTag` deviation.

1. **`syllabusMapBlock` reuse confirmed, exactly as predicted.** `ig-transform` (ch.7, not ch.1)
   has the same `<div class="syllabus-map">` widget sat introduced, with the real per-row
   differences ADR 0018 anticipated: 1-2 tags per row (Core/Extended tier badges) instead of
   sat's always-one, and no inline `style` on the tag spans (sat's real tags carry
   `style="font-size:11px"`; igcse's don't) — the schema's `tags[]` array and optional per-tag
   `style` already covered both without changes.
2. **`chapterTag`'s `category` variant, a genuinely new deviation: multiple tier badges.** Every
   igcse chapter's real `.igcse-tag` has 1-2 small `<span class="tier-c">C</span>
   <span class="tier-e">E</span>` badges after the bold category name, instead of a single
   `weightBadge` (percentage or paper code) every other `category`-variant track uses. Reused the
   existing `badges[]` array (already used by the `pill` variant, `{text, className}` items)
   rather than inventing a parallel field.
3. Some individual `topics[]` entries also carry an inline tier badge suffix (e.g. `"Surds <span
   class=\"tier-e\">E</span>"`) — no schema change needed, since `topics[]` entries are already
   raw HTML strings rendered in a Nunjucks environment that runs with `autoescape:false`
   throughout.
4. `ig-transform`'s explorer control is a real `<select>` with no `valueDisplayId`, whose live
   value is a bare `<b id class="mono">` embedded inside the note's own body text — the exact
   "`block.note`'s embedded-`<b>` trick" `explorer.njk`'s own docstring already documented from an
   earlier track (WP28); no new mechanism needed.
5. Found+fixed TWO real markup-corruption bugs, not reproduced: a stray literal `">` sitting
   right after a formula-card's closing `</div>` (`ig-coordinate`'s "Intercepts" card,
   `ig-trig`'s "Back-bearing" card) — genuine source typos that would otherwise render literally
   visible on the page.

## Decision

- Extend `chapterTag`'s `badges[]` field (previously documented as "pill variant only") to also
  cover `category` variant's multi-tier-badge case — same array shape, no new field.
- Fix (not reproduce) the two stray-`">` sites during transcription.

## Consequences

- All structural counts verified to match the legacy source exactly: 14 `.chapter` sections, 15
  `.igcse-tag` chapterTags, 75 `.fcard`s, 3 `.explorer`s, 32 `.example`s, 60 `.problem`s, 1
  `.syllabus-map` widget (with 4 rows, tag-count-per-row `[2,1,2,2]` matching source exactly).
- Verified interactive: the transformations explorer's real `<select>` change to "Rotate 90°"
  correctly drove the embedded mapping-rule text to `(x, y) → (−y, x) · rotation 90°
  anticlockwise about O`; the circle-theorem explorer's slider correctly kept the inscribed angle
  at exactly half the central angle (70°/140°) across a real drag.
- `igcse` is the 19th of 21 tracks live. 2 remain: aslevel, calculus (last, largest).
