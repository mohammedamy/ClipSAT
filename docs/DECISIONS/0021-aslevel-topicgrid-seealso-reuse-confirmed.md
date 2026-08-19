# ADR 0021 — aslevel: topicGrid/seeAlso/compact-quiz reuse confirmed at scale

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `aslevel` (Cambridge AS Level Mathematics, the twentieth track and the largest by
chapter count so far) confirms every schema addition from ADR 0019 (a2level) generalizes, with
no new block/tag shapes needed — but at meaningfully greater scale and one real structural
asymmetry worth recording precisely.

1. **20 chapters** (about + 19 numbered: 11 Pure-1 + 3 Mechanics-1 + 5 Statistics-1) — the
   largest chapter count of any track migrated so far.
2. **`topicGridBlock`/`seeAlsoBlock`/`quizWidget.variant:'compact'` reused far more heavily**
   than a2level: 8 of 19 numbered chapters (all 3 Mechanics chapters + all 5 Statistics chapters)
   use the topic-grid/compact-quiz shape, vs. a2level's 4 of 11 — confirming these were never
   a2level-specific, exactly as ADR 0019 anticipated.
3. **A real, confirmed asymmetry**: not every compact-quiz chapter has a `seeAlso` block.
   `as-datarepresent` (ch.15) uses the compact quiz shape but has NO see-also row — 7 `see-also`
   blocks across 8 compact-quiz chapters, verified exactly via grep before transcribing (not
   assumed from a2level's 1:1 pairing there).
4. **Confirmed real bidirectional cross-track references.** Several `aslevel` see-also links
   point into `a2level` chapters (`as-drv`→`a2l-conrv`, `as-bindist`→`a2l-poisson`,
   `as-normdist`→`a2l-hypothesis`) — the schema's `seeAlsoBlock.links[].trackId` (added
   speculatively in ADR 0019 from a2level's one-directional evidence) is now confirmed as a real,
   intentional bidirectional reference network between the two A-Level tracks, not a one-off.
5. `chapterTag` uses the plain single-`weightBadge` shape (paper code "P1"/"M1"/"S1"), matching
   a2level's shape exactly — confirming igcse's multi-badge `badges[]` deviation (ADR 0020) really
   was igcse-specific, not a general Cambridge-family pattern.

## Decision

No schema changes. This migration is a pure confirmation-at-scale of ADR 0019's additions.

## Consequences

- All structural counts verified to match the legacy source exactly: 23 `.chapter` sections, 19
  `.as-tag` chapterTags, 79 `.fcard`s, 3 `.explorer`s, 38 `.example`s, 69 `.problem`s, 48
  `.topic-card`s (8 chapters × 6), 7 `.see-also` blocks, 8 `.cq-controls` (compact quiz)
  instances.
- Verified interactive: the coordinate-geometry explorer's real slider drag to `m=-2, b=4`
  correctly drove readouts to slope `-2`, y-intercept `(0, 4)`, x-intercept `(2.00, 0)`
  (`-2x+4=0 → x=2`, checked by hand); the discrete-random-variables chapter's cross-track
  see-also link correctly targets `goChapter('a2l-conrv','a2level')`; `as-datarepresent`
  confirmed to have zero `.see-also` blocks despite using the compact quiz, matching the source
  asymmetry exactly.
- `aslevel` is the 20th of 21 tracks live. 1 remains: `calculus` (last, largest, 1912 lines,
  needs `explorerBlock.canvas3d` from ibhl, ADR 0011).
