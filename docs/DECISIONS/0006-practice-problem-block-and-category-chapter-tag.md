# ADR 0006 — New `practiceProblem` block kind; `chapterTag`'s `category` variant

**Date:** 2026-08-18
**Status:** Accepted

## Context

Migrating act2 (ACT Math 2, the third track) surfaced two real content shapes not present in qudrat or
tahsili:

1. **A different chapter-tag style.** qudrat/tahsili's chapter tag is a small pill
   (`<span class="qud-tag">GAT Qudrat — Quantitative <span class="qud-wt">Ch.1 Arithmetic</span> …`).
   act2's real source instead has `<p class="act-tag">🗻 <strong>Advanced Number Theory</strong>
   <span class="act-wt">~8%</span> · Integer properties · Sequences & series · …</p>` — an outer `<p>` not
   `<span>`, an emoji, a bold category name, a %-of-test badge, and a middot-separated topic list. This is
   genuinely richer, real content (the topic list and percentage are load-bearing, not decorative), not a
   restyle of the same information.

2. **A different in-chapter practice-problem shape.** Every numbered act2 chapter ends with
   `<div class="problem"><div class="problem-q">…</div><button class="sol-btn">(chevron SVG) Show
   solution</button><div class="solution">…</div></div>`. This is distinct from both existing patterns in
   the codebase: qudrat/tahsili's in-chapter practice problem is a `callout warn` + `<details>` (a
   `calloutBlock`, already representable), and the end-of-course practice-set (`_practice-set.json`) uses
   its own `.problem`/`.ph`/`.pn`/`.pq`/`.sol-toggle` shape (a flat numbered list, not a chapter block at
   all). act2's in-chapter version shares `toggleSol(this)` and the `.problem`/`.solution` CSS class names
   with the practice-set shape, but not its internal structure — a real, third, recurring shape (once per
   numbered act2 chapter, 8 instances), not forced into an existing kind.

## Decision

- Extend `chapterTag` (added in the qudrat/tahsili chapter-tag-pill fix, this same PR-cycle) with a second
  `variant: "category"`, carrying `emoji`/`category`/`weightBadge`/`topics[]` instead of `trackLabel`/
  `badges[]`. `chapter-tag.njk` dispatches on `variant`.
- Add `practiceProblem` as a new `blocks[]` kind — `question` + `solution` only. The button's SVG icon,
  "Show solution" label, and `toggleSol(this)` handler are identical on every real instance, so they're
  static markup in `practice-problem.njk`, not per-instance schema fields (the same token-efficiency
  reasoning as ADR 0002's blocks model generally).

## Consequences

- Verified against all 8 real act2 instances of each pattern, not guessed at.
- A future track with yet another chapter-tag or practice-problem shape should get its own new
  variant/kind by the same method: read the real markup first, don't force-fit.
- `practiceProblem` is deliberately *not* used for qud/tah's `callout warn` practice-problem pattern, even
  though both end up showing a question + a revealed solution — the DOM/CSS shape genuinely differs, and
  forcing qud/tah's onto this kind (or vice versa) would require the renderer to fake markup that was never
  in their real source.
