# ADR 0024 — Homepage CLS 0.535 is the first-visit splash screen, not KaTeX

**Date:** 2026-08-20
**Status:** Accepted (investigation closed; no code fix applied)

## Context

Phase 6 (Lighthouse/a11y/SEO, `clipsat_reengineering_prompt.md`) measured the production
homepage at Performance 0.42–0.52, with **CLS 0.535** — weight 25 of the Performance score and
by far its single largest penalty. This ADR records what actually causes it, because two
plausible-sounding hypotheses were tested and **disproven** first, and re-deriving that costs
real time.

## Investigation (in order)

**Hypothesis 1 — KaTeX reflow in `#deep-content`. DISPROVEN.**
The server sends raw `\( … \)` / `\[ … \]` LaTeX (verified with `curl` — there is no build-time
math rendering); KaTeX's deferred CDN scripts replace it with taller typeset markup after load,
so the reasoning was that `#deep-content` ("A sample of the rigor", 66 of the homepage's 71 LaTeX
delimiters) grows and pushes the footer down. Fix shipped as PR #145: `min-height` reserving that
section's real measured post-KaTeX height at 3 breakpoints.
**Result: CLS stayed at exactly 0.535, bit-for-bit unchanged.** Verified on production at
Lighthouse's own 412px test width that the reservation *was* working (section sits at exactly
3820px, never exceeds it) — so "the box grows" was not the mechanism. PR #145 was reverted.

**Hypothesis 2 — canvas `draw()` force-flushing KaTeX's pending layout. DISPROVEN.**
The trace shows `sizeOf()` (`engine.js`) calling `canvas.getBoundingClientRect()` shortly after
KaTeX's mutation burst, which does force a synchronous layout flush. Blocking `auto-render.min.js`
dropped CLS 0.535 → 0.03, which seemed to confirm KaTeX involvement.
**That was a red herring**: blocking it merely shifts load timing so the real event falls outside
the measured window. Correlation, not cause.

**Actual cause — confirmed from the trace's `impacted_nodes`:**
```
old_rect: [0, 67, 412, 440]   new_rect: [0, 0, 0, 0]
frame_max_distance: 17159.16  (== main#view-home's full height)
had_recent_input: true
```
The footer is recorded at **y=67 in the viewport** — i.e. the page is collapsed to almost nothing
at that instant — then moves by exactly `main#view-home`'s height. That is the page settling
*behind the intro splash*: `#clipsat-splash` is `position:fixed; inset:0; z-index:99999`
(`main.css`) covering the whole screen while content lays out behind it.

**Why every Lighthouse run hits it:** `engine.js`'s splash IIFE gates on
`localStorage.getItem('clipsat_splash_seen')` and calls `sp.remove()` immediately when set.
Lighthouse always runs with a **fresh browser profile**, so it takes the first-visit path on
*every* run, always sees the splash, and always records the settle as one enormous shift.

## Decision

**No code fix.** Revert PR #145 (irrelevant to the real cause; it reserved 3,820px for no
benefit) and document this instead.

Rationale: the splash shows **once ever, per browser**. Every returning visitor gets `sp.remove()`
with no splash and no shift, so the 0.535 is substantially a *synthetic-measurement artifact*, not
a defect real users experience. Fixing it means restructuring how a full-screen fixed overlay
relates to page layout — real regression risk to the page shell, in exchange for improving a
first-visit-only metric. That trade wasn't worth taking unprompted.

## Consequences

- Homepage Performance stays ~0.45–0.52 in Lighthouse, dominated by this one artifact. Treat that
  number as understating real-user experience until/unless the splash is restructured.
- **Do not re-attempt a CSS `min-height`/space-reservation fix** — measured, disproven, reverted.
- **Do not trust `--blocked-url-patterns` results as causal** on this page; timing shifts move the
  event out of the measurement window and produce false "fixes."
- To re-measure honestly, either run Lighthouse with a profile that already has
  `clipsat_splash_seen` set, or read `impacted_nodes` from the raw trace (`--save-assets`, then
  the `LayoutShift` events) rather than trusting the summary audit's node attribution.
- Other Phase 6 findings remain genuinely open and unrelated to this: LCP ~4.3s, render-blocking
  CSS (~980ms), ~46KB unused CSS, ~187KB unused JS, cache lifetimes (needs content-hashed
  filenames, since GitHub Pages can't set custom cache headers).
