# ADR 0019 — a2level: `topicGrid`/`seeAlso` blocks, compact quiz-widget variant

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `a2level` (Cambridge A2 Level Mathematics, the eighteenth track) is the first track
whose second half has a genuinely different real markup shape from its first half — and from
every prior track. 11 chapters cover Pure 3 in the established shape (`category` chapterTag,
`callout`/`cards`/`explorer`/`example`/`practiceProblem`), but the remaining 4 chapters (Statistics
2: Poisson Distribution, Continuous Random Variables, Sampling & Estimation, Hypothesis Testing)
introduce three new real widgets, none seen in 17 prior tracks:

1. **A topic-card grid.** `<div class="topic-grid">` of 6 `<div class="topic-card"><h3>title</h3>
   <p>body</p></div>` items, always immediately after the chapterTag, before the chapter's first
   callout.
2. **A cross-reference row.** `<div class="see-also">` with a 🔗 "See also:" label and 1+
   middot-separated links, each a real `goChapter(id, trackId)` call — some links point at a
   **different track entirely** (a2level's Poisson chapter links to `aslevel`'s Binomial
   Distribution chapter, since A2 continues AS content). Always the last content block, right
   before the chapter's quiz widget.
3. **A different quiz-bar shape.** `<div class="cq-controls">` — a number `<input>` for question
   count (not a `<select>`) and a Level `<select>` whose first option reads "Any" (not "All
   Levels") — with no separate `.ch-quiz-bar`/`.ch-quiz-label` wrapper or 📝 emoji at all.

All three are confirmed reused, more extensively, on the not-yet-migrated `aslevel` track (56
`.topic-card`s, 8 `see-also` blocks found there) — designed generically enough to cover both
without assuming they're identical (same pattern as ADR 0018's `syllabusMapBlock`).

Also found+fixed: a SIXTH `\neq`-corruption site (same bug category as sat's, ADR 0018) in the
Hypothesis Testing chapter's reference callout (`\mu\neq\mu_0`), and missing `\\` row-separators
in a 3D column-vector `\begin{pmatrix}` in the Vectors chapter's problem (same category as alg2's
matrix fix, ADR 0016).

## Decision

- Add `topicGridBlock` (`kind: 'topicGrid'`) — `{items: [{title, body}]}`.
- Add `seeAlsoBlock` (`kind: 'seeAlso'`) — `{links: [{label, chapterId, trackId}]}` — `trackId` may
  differ from the current track (real cross-track links exist).
- Add `chapter.quizWidget.variant: 'compact'` — renders the `.cq-controls` shape instead of the
  standard `.ch-quiz-bar` shape. `chapter.njk` now branches on this before falling back to the
  existing markup, unconditionally rendered for every prior track (unaffected — the field is
  optional and absent everywhere else).
- Fix (not reproduce) the `\neq`-corruption site and the missing-`\\` matrix during transcription.

## Consequences

- All structural counts verified to match the legacy source exactly: 19 `.chapter` sections, 15
  `.a2-tag` chapterTags, 64 `.fcard`s, 3 `.explorer`s, 30 `.example`s, 65 `.problem`s, 24
  `.topic-card`s, 4 `.see-also` blocks, 4 `.cq-controls` (compact quiz) vs. 12 `.ch-quiz-bar`
  (standard) — exactly matching the 4 S2 / 12 Pure-3+about chapter split.
- Verified interactive: a real slider change on the vector-addition explorer (`b=(-2,4)` against
  fixed `a=(3,1)`) correctly drove the resultant readout to `(1, 5)` and magnitude `5.10`
  (`√26 ≈ 5.099`, checked by hand). A real see-also link's `onclick` correctly targets
  `goChapter('as-bindist','aslevel')` — the cross-track reference resolves to the right target
  track and chapter id.
- `a2level` is the 18th of 21 tracks live. 3 remain: igcse, aslevel, calculus (last, largest —
  `aslevel` is expected to reuse `topicGrid`/`seeAlso`/compact-quiz heavily; verify fresh, don't
  assume identical proportions).
