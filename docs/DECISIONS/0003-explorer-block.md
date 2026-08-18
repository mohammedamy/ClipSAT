# ADR 0003 — Model interactive explorers as an in-flow `explorer` block, as an exact shell not a generic type

**Date:** 2026-08-18
**Status:** Accepted

## Context

Two qudrat chapters (`qud-ratio`, `qud-compare`) were deliberately left unmigrated in WP6 because their
embedded interactive explorers didn't fit the `blocks[]` model — flagged in `docs/CONTENT_MODEL.md` as
needing "its own scoped design decision, not a rushed extension."

Reading the real markup for all 3 explorer instances in these two chapters (qud-ratio's ratio-sharing and
percentage-change explorers, qud-compare's A-vs-B explorer) found one consistent structure across all
three: a title bar (`<div class="ex-top">`), a canvas plus an accessible non-visual fallback (a toggle
button + a hidden `<table>` populated live by `engine.js`), 0–2 `<input type="range">` sliders each with a
live-updating value `<span>`, a `<div class="readout" aria-live="polite">` block of live-updating result
rows, and an optional note callout.

Critically, **every id inside this structure is hardcoded, bespoke, and already load-bearing** —
`public/js/engine.js` has hand-written JS for each of these specific explorers that looks up these exact
ids (`qudRatioA`, `qudShareA`, `qudCmpCanvas`, etc.). There is no generic "slider explorer" component in
`engine.js` that a data file could parametrize; each of the 56 explorers sitewide (per `docs/INVENTORY.md`
§A) is its own hand-written function.

## Decision

Add `explorer` as a new `blocks[]` kind (not a separate `content.explorers[]` array, which the original
WP5 design had) — explorers appear *inline* in a chapter's real reading order (prose → explorer → prose →
explorer → …), and `blocks[]`'s entire point is preserving that order.

The block is explicitly a **shell, not a generic type**: `canvasId` and every control/readout id are
plain strings that must exactly match what `engine.js` already expects — the schema does not invent new
explorer behavior, and a template rendering this block does not either. Its only job is to place the
correct pre-existing ids into the correct pre-existing HTML shape, and hold the surrounding text (title,
aria-labels, control labels, note) bilingually, in the same `{en, ar}` shape as the rest of the schema.

The old `content.explorers[]` array (WP5, id + canvasId + type + description — a lighter "reference only"
design, written before any real explorer markup had been read) is removed. It was never used by any
migrated chapter, so removing it costs nothing.

## Consequences

- Verified against 3 real instances, not guessed at — but that's a small sample. A genuinely different
  explorer shape elsewhere in the site (drag-based, multi-canvas, a different accessibility pattern) may
  not fit this block and would need its own new kind, the same way this one was derived: read the real
  markup first, don't extend by assumption.
- This does not, and is not meant to, make explorers "just data" the way callouts/tables/cards are.
  Authoring a *new* explorer still means writing real JS in `engine.js` — this block only lets an
  *existing* explorer's surrounding chapter content live in `content/` instead of `index.html`.
- `qud-ratio` and `qud-compare` can now be converted using the same faithful, i18n-dictionary-sourced
  pipeline as the other 7 qudrat chapters.
