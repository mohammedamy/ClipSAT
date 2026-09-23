# ADR 0030 — Automated WCAG 2.1 AA sweep (axe-core) in CI, with every chapter visible

**Date:** 2026-09-23
**Status:** Accepted
**Related:** Roadmap Pillar 4 (Accessibility & Inclusivity), MVP item "Automated WCAG 2.1 AA / axe-core CI sweep"

## Context

Pillar 4 was the P0 pillar furthest behind (1/7), and its Month-5 milestone is "WCAG 2.1 AA clean
across all tracks". Nothing checked that automatically. The Playwright suite (`tests/e2e/`,
Phase 5.009) also existed but had never been wired into CI. Its README deferred that "until a PR
first depends on it".

A first axe-core scan of the home page and all 26 tracks, each in its default view, reported
**zero** violations. That result was wrong. Chapters are panel-mode (`.chapter{display:none}`
until chosen in the rail), and axe skips hidden content, so each scan checked one chapter per
track and ignored the rest. Forcing `.chapter{display:block}` and scanning again found failures on
every track:

- **select-name (critical):** the test-generator partial's Questions/Level selects had visible
  `<label>`s not associated with them. Explorer selects (e.g. `#polyDeg`) had the same problem
  wherever the content JSON set no `ariaLabel`.
- **scrollable-region-focusable (serious):** wide display equations (`.katex-display`,
  `overflow-x:auto`) became scroll containers that a keyboard can't reach.
- **color-contrast (serious):** `applyTheme()` in `06-theme-switcher.js` writes each theme's tokens
  inline on `:root`. Every theme's `--faint` (2.3–3.6:1) therefore silently overrode main.css's own
  earlier fix (`--faint:#5F6979`). There was also white text on `#B8801F` (3.4:1) on the download
  buttons, and white text on the `#4a90d9` fallback of `.ix-sb-go`/`.ix-sr-n` (3.3:1).
- `#cs-breadcrumb` / `#formula-sidebar` had an `aria-label` on a plain `<div>`, which is prohibited
  on a generic element.

## Decision

1. **Fix at the shared source, not per page:**
   - Associate the labels: `aria-label` on the test-generator selects, and `for=` on explorer.njk's
     control `<label>`.
   - Set each theme's `--faint` to the same hue adjusted to ≥4.5:1 on both that theme's `--paper`
     and `--paper-2`.
   - Darken the amber download button and the `--accent` fallback.
   - Use `<nav>`/`<aside>` landmarks for the breadcrumb and formula sidebar.
   - Add `26-scroll-region-a11y.js`, which gives `tabindex="0"` only to equations that actually
     overflow. It re-checks on chapter switch and resize. Making every equation a tab stop would
     bury the real controls.
2. **Add `tests/e2e/a11y.spec.js`:** scan home plus every track, in light *and* dark schemes, with
   all chapters forced visible. Tags are `wcag2a/wcag2aa/wcag21a/wcag21aa` (conformance only, not
   best-practice). Any violation fails the test and lists rule, impact and selectors.
3. **Wire the whole Playwright suite into `pr-checks.yml`** as a separate `e2e-and-a11y` job, so a
   regression or a11y failure is distinct from a build/content failure.

New dependency: `@axe-core/playwright` (devDependency only). It replaces a manual audit and adds
nothing to the shipped site.

## Consequences

- Any new contrast, labelling or keyboard failure in any chapter now fails the PR that introduces it.
- The scan is slow on large tracks (all chapters' KaTeX in one DOM; up to ~1–2 min per page), so
  a11y tests carry a 240s timeout and the CI job allows 40 minutes.
- Axe's automated rules are a floor, not full WCAG conformance. Still open under Pillar 4: the
  manual keyboard audit of the quiz engine, screen-reader review of explorer data panels, and the
  published third-party audit.
