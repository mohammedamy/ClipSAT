# ADR 0038 — Every canvas explorer's "View as data" panel works, and a test keeps it so

**Date:** 2026-09-25
**Status:** Accepted
**Related:** Roadmap Pillar 4 (Accessibility), "screen-reader fallback for canvas explorers";
ADR 0003 (explorer block), ADR 0030 (axe-core sweep)

## Context

A canvas is invisible to a screen reader. Every explorer block already declares a text
alternative:

- a canvas `aria-label`;
- a "📊 View as data (non-visual equivalent)" panel: a live description plus a data table, filled
  by the explorer's own `engine.js` code on every redraw.

The content audit showed all 128 explorers have both. That only proves the markup exists, so each
panel was tested in a real browser: open it, check it is filled, move the first slider, and check
it changes. Four real defects turned up:

1. **Growth & decay (AP Precalculus Unit 2 and Precalculus) and eccentricity (Precalculus):**
   - The draw code writes to readout elements that the content never rendered: a doubling-time /
     half-life row, and the conic's changing "c (focus distance)" / "p (focal length)" label.
   - `null.textContent` threw on every draw, so the description and table never filled. The
     drawing and the other readouts also stopped at that point.
2. **De Moivre (IB HL):** the panel described only the roots of unity. The θ slider changed
   nothing in the text version.
3. **All explorers:** a panel was filled only when the canvas first drew, which happens on first
   scroll into view. A panel opened before that — e.g. a screen-reader user jumping to the
   button — was blank. The browser test found this on Calculus's two-canvas accumulation explorer
   once the other fixes were in.

## Decision

- **Readout label ids.** Readout rows accept an optional `labelId` (schema + `explorer.njk`), for
  labels the code rewrites. The three explorers get their missing rows and ids back. Their draw
  code also tolerates a missing element, so one missing readout can never again silence a whole
  explorer.
- **De Moivre description.** It now states z = r cis(θ) and z^n = r^n cis(nθ) for the current
  values.
- **Draw on open.** Opening any "View as data" panel first draws every not-yet-drawn canvas in
  that explorer. This is `drawExplorerOf()`, used by `wireDataToggle()` and the two custom toggles.
- **Test.** `tests/e2e/explorers.spec.js` runs one test per track, and fails on page errors. For
  every explorer it:
  - opens the explorer's chapter;
  - presses "View as data" without scrolling to the canvas;
  - requires a description and at least one table row;
  - requires the panel to change when the first slider moves.

## Consequences

- All 128 explorers on 26 tracks pass. The four fixed ones fail on the old code.
- Pillar 4's "screen-reader / non-visual fallback for canvas explorers" is met for the existing
  explorers, and the test holds new explorers to the same bar. Sonification is not part of this
  change.
