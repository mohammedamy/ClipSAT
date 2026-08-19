# ADR 0022 — calculus: the final track, 8 new real deviations

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `calculus` completes the 21-track migration. As the site's original flagship subject —
the densest track (16 chapters, 15 explorers, no chapterTag anywhere) — it surfaces more genuinely
new structural deviations than any single track since qudrat's pilot, none of them forced into an
existing shape without real evidence:

1. **No trackId anywhere.** `<section class="subject-head">` (no trailing class) and
   `<aside id="rail">`/every `goChapter(id)` call (no trackId argument) — root `goChapter()`'s
   trackId argument is itself optional; this track's source simply never passes it, likely a
   legacy artifact of being the site's original/default view before other tracks existed.
2. **A mid-rail group header.** "Multivariable · Calc III" splits the flat chapter list before
   the Vectors chapter — a one-off, not modeled as a general per-track grouping mechanism.
3. **`textBlock.heading`** — several chapters carry a bare `<h3>` subheading with no cards block
   after it ("Related rates", "One-sided limits"), distinct from `cardsBlock.heading` (h3 directly
   before cards). A heading with **no body paragraph at all** is also real (L'Hôpital's Rule,
   directly before a callout) — `body` is now optional on `textBlock`.
4. **`explorerBlock.controls[].buttons`** — the Riemann-sum explorer's Left/Midpoint/Right
   sample-point picker is a real segmented `<div class="radios">` button group, not a
   slider/select/checkbox.
5. **`readouts[].id` truly optional (template fix).** Several readout rows are genuinely static
   with no `id` attribute in source at all (`ch-limits`' "limit as x→1 → 2.000",
   `ch-series`' "function → sin x") — the schema already documented this as allowed but the
   template unconditionally emitted `id=""`; fixed to omit the attribute entirely.
6. **`explorerBlock.canvas3d` generalized to be additive.** When `canvasId` is also set, the 3D
   toggle *coexists* with a real plain canvas (4 instances: `ch-vectors`/`partial`/`multiint`/
   `vectorcalc`) — a different real shape from ibhl's canvas3d (ADR 0011), which fully *replaces*
   the canvas. The `dataPanel`'s real position also differs between the two cases (confirmed by
   reading source byte-for-byte, not assumed symmetric).
7. **`explorerBlock.extraControls`/`.extraReadouts`** — `ch-vectors`' explorer bundles two
   independent sub-widgets sharing one canvas: a 2D vector-addition control+readout group, plus a
   second helix-parameter control+readout group for its 3D toggle sub-widget. Confirmed a genuine
   one-off across all 21 tracks.
8. **`explorerBlock.canvasId2` + inline-style passthrough fields** — `ch-ftc`'s Accumulation A(x)
   explorer stacks two canvases (f(t) above, A(t) below) with real per-instance inline styles for
   the stacked/horizontal layout (`bodyStyle`, `canvasStyle`, `canvas2Style`, `canvasWrapStyle`,
   `controlsStyle`, `readoutStyle`, `controls[].ctrlStyle`) — confirmed unique.
9. **`downloadsInfo.plannedCard`** — a real third `.dl-grid` card advertising an upcoming
   "Problem-set generator" feature with a disabled `<span class="btn ghost">` (no `onclick`, not a
   real button) — found on no other track.

`testGenerator.hasFullExam:false` (matches geo/alg2/algebra/precalc) and the fully-standard
`.problem`/`.ph`/`.pn`/`.pq`/`.lvl` practice-set shape (items numbered "P1".."P50", the same
alphanumeric pattern algebra's "A1".."A50" already required) needed no new schema.

## Decision

Add all nine items above. All are optional/additive; every prior track's already-shipped explorer,
rail, subject-head, and downloads markup renders byte-identically after these changes (re-verified
by full rebuild + diff-free structural counts on qudrat/algebra/ibhl/sat).

## Consequences

- All structural counts verified to match the legacy source exactly: 19 `.chapter` sections, 59
  `.fcard`s, 15 `.explorer`s, 42 `.example`s, 50 `.problem`s (all practice-set, zero in-chapter —
  matches precalc's chapterTag-less/problem-less density), 4 `ex-3d-btn` instances, 1 checkbox, 4
  selects, 1 button-group. `subject-head` and `rail` render with zero trackId, exactly matching
  source. The mid-rail group header, the stacked dual-canvas explorer, the dual-widget vectors
  explorer, and the planned-feature download card all render byte-exact.
- Verified interactive: the Riemann-sum explorer's real Midpoint button click correctly applied
  the `on` class and recomputed the approximation to `7.330` against an exact value of `7.333`
  (n=20, matches hand calculation); the stacked dual-canvas explorer's both canvases independently
  register with engine.js and update live; the vector-addition explorer's angle slider correctly
  recomputed the resultant, and its additive 3D toggle correctly mounted and set
  `aria-expanded="true"`.
- **All 21 of 21 tracks are now live.** The migration's core goal (WP6–WP33) is complete. Phase 6
  (Lighthouse/a11y/SEO) and Phase 8 (site-wide token re-measurement) remain separate, still-pending
  follow-ups per the original 8-phase plan. The eventual retirement of `index.html`/`build.js`'s
  extraction pipeline (deleting `src/_includes/tracks/*.html`) must NOT begin without explicit
  user sign-off — it is the point of no return and was never authorized as part of this migration.
