# ADR 0032 — Make the text-size and high-contrast toggles actually work, and make the header fit

**Date:** 2026-09-23
**Status:** Accepted
**Related:** Roadmap Pillar 4 (Accessibility & Inclusivity), MVP item "Adjustable text size + high-contrast toggle"; ADR 0030 (axe-core sweep)

## Context

The roadmap still listed "adjustable text size + high-contrast toggle" as pending. In fact both
toggles had shipped on Aug 28 (`#fsToggle` and `#hcToggle` in `build.js`'s `baseNjk`, with their
logic in `07-ui-bootstrap-and-search.js`). Testing them in a browser showed three defects.

- **High contrast did nothing in dark mode.** `body.hc` redefines `--muted`, `--faint` and `--line`
  as full-ink tokens. `body.dark`'s token block sets the same properties at the same specificity,
  and it appears later in `main.css`, so it won. In light mode the toggle worked. In dark mode muted
  text stayed at `#94a3b8`.
- **Text size skipped some text.** `html.fs-lg` / `html.fs-xl` scale the root font size, which only
  reaches rem/em rules. `body` was `17px`, and the phone breakpoints set it to `16px`, `15.5px` and
  `15px`. So text inheriting straight from `body` did not grow: plain lesson paragraphs, the KaTeX
  inside them, and on phones essentially all body text. On `/precalc/` at desktop width, 41 visible
  text elements were unchanged at A++.
- **The header overflowed, even at the default size.** The Aug 28 toggles added three 36px buttons
  to the header row. At 360–414px the row needed about 440px, so the Menu button (the only way into
  the phone nav) sat mostly or wholly off-screen. It also overflowed at 421–520px, at 601px, and at
  761–834px, where More (Teacher Mode and site links) was off-screen on iPad portrait.
  `body{overflow-x:hidden}` clipped the overflow, so nothing scrolled sideways and nothing looked
  broken until you looked for the button.

All three have the same cause, the one already recorded in ADR 0030: an **unconditional rule later
in `main.css` silently overriding an earlier, more specific intent.**

- `body.dark` overrides `body.hc`.
- The v5 design block's `.brand .name{font-size:1.68rem}` overrides every phone breakpoint's smaller
  size.
- The v5.1 search block's `#topic-search{width:140px}` overrides the 1250/1050/900/820px search-width
  breakpoints. A max-width-768px block does the same at 761–768px.

## Decision

1. **High contrast:** use `body.hc, body.dark.hc` as the selector, so the dark pair
   out-specifies `body.dark`.
2. **Text size:** set `body` in rem at every breakpoint (`1.0625rem`, `1rem`, `.96875rem`,
   `.9375rem`). These are pixel-identical at the default root size, so nothing changes until the
   toggle is used.
3. **Header fit:** add rules placed after the overriding blocks, not edits to the dead ones:
   - Phones (≤600px):
     - brand name 18px;
     - 6px gap between header items;
     - 32px toggles with no extra right margin.
   - ≤400px: Menu shows ☰ / ✕ only. Its accessible name "Toggle menu" is unchanged.
   - ≤340px: the brand word is hidden and the logo stays.
   - ≤520px: the header copy of the subject dropdown is hidden. The hamburger panel already carries
     its clone.
   - 761–900px: the dropdown and toggles are slightly smaller.
   - Search widths: re-asserted below the base 140px rule, plus the 761–768px case.

   Header chrome (brand name, toggles, Menu) is sized in **px**, so the A+/A++ toggle grows the
   page's content but not the header row. Browser zoom still scales everything.
4. **Regression tests** in `tracks.spec.js`:
   - high contrast lifts muted/faint to ink, in light and in dark;
   - body text scales through A, A+ and A++, and the choice persists across a reload;
   - no header control is off-screen at 11 widths from 320 to 834px at A++, and the hamburger still
     opens.

   Each was confirmed to fail on the previous CSS.

## Consequences

- The Pillar 4 item "adjustable text size + high-contrast toggle" is now shipped and verified. It had
  existed since Aug 28, but it did not work in dark mode, missed body text, and broke the phone
  header.
- An axe scan with high contrast on, in both colour schemes, is clean on the home page and Precalculus.
- Checked visually on the home page, Precalculus, Qudrat in Arabic (RTL header) and with the search
  box focused. Every width from 320 to 1440px fits at A and at A++.
- Still open: `main.css` has more of these late overrides. The header and search ones found here are
  fixed at the point of use, not by deleting the earlier dead rules, which is a larger clean-up best
  done with a visual-diff check.
