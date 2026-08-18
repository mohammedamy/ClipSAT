# ADR 0002 — Replace the fixed-field content schema with an ordered blocks[] model

**Date:** 2026-08-18
**Status:** Accepted (supersedes part of the schema shipped in WP5 / PR #87)

## Context

WP5 extended `course_schema.json` with bilingual fields on top of its original (pre-existing, never
adopted) shape: fixed arrays `definitions[]`, `theorems[]`, `keyFormulas[]`, `workedExamples[]`, plus a
`notes` string. That shape was inherited from the schema's own speculative `examples` block, never
validated against real chapter markup.

Starting the WP6 qudrat pilot by converting `qud-about` — deliberately chosen as the simplest, cleanest,
fully-bilingual, explorer-free chapter — surfaced that the fixed-field shape doesn't match real content:

- The chapter is mostly labeled prose boxes (`<div class="callout note/thm/warn/pf/def">` and a separate
  `<div class="example">`, both `label + body`), not discrete "definitions" and "theorems" in the sense
  the schema assumed.
- It contains a **7-row data table** (no field existed for this) and a **4-item stat-card grid** (`class="cards"`
  was not present; `formula-cards` was, but for non-formula UI stats, not `keyFormulas`).
- The "Chapter Quiz" section is a **live widget** bound to `genChapterQuiz()`, reading `bank-data/{track}.json`
  at request time — not per-chapter static quiz data at all. The v1 schema's required `quiz` field had no
  real data to hold.

A sitewide grep confirmed the actual, common patterns: `callout def` (146), `callout thm` (202), `callout
note` (102), `callout warn` (36), `callout pf` (3), `class="example"` (398), `class="formula-cards"` (212),
`class="exam-table"` (22). No evidence was found anywhere in the codebase of a distinct multi-step
"workedExample.steps[]" structure (grepped for step-list class patterns — none exist); worked examples are
prose blocks like everything else.

## Decision

Replace the fixed fields with `chapterContent.blocks[]` — an ordered array of a discriminated union
(`oneOf` on a `kind` field): `callout` (label + body + a `style` enum covering def/thm/note/warn/pf/example/
tip), `table`, `cards`, and `text`. Order is preserved, matching real document flow (the old split-by-type
arrays would have scrambled a chapter's actual reading order).

Also changed `chapter.quiz` (required) to `chapter.quizWidget` (optional, `{enabled: boolean}`) — a
render-time flag, not content data, matching what the "Chapter Quiz" section actually is.

Re-validated: the new schema's own `examples` entry (a faithful, real excerpt of `qud-about`) passes
`scripts/validate-content.js`.

## Consequences

- `content/` doesn't exist yet (WP6 was interrupted by this finding before writing any real chapter files),
  so there is no migrated content to update — this correction has zero migration cost.
- `docs/CONTENT_MODEL.md` needs a rewrite to match (done in the same PR as this ADR).
- Future chapter conversions (any track) should grep the real markup for that chapter first, the way this
  one was — don't assume a content shape from the schema; derive the schema from the content.
- The `block` kind list (`callout`/`table`/`cards`/`text`) was validated only against qudrat's `qud-about`
  and a sitewide class-name grep, not against every track. A track with a genuinely different content
  shape (e.g. Calculus's `example` class, already covered) may still need a new block kind — add one when
  real content demands it, the same way this ADR was written, rather than guessing ahead of time.
