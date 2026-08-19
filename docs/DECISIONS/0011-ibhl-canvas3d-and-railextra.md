# ADR 0011 — `explorerBlock.canvas3d` and `rail.njk`'s `railExtra`

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `ibhl` (IB Mathematics HL, the twelfth track) is the same IB site family as `ibsl`
(WP23) and reuses every shape ADR 0010 introduced (orphaned-content bug and fix, `example-grid`
callout style, per-badge `chapterTag` classes, `testGenerator`/`downloadsInfo` `ib` variants) with
zero further schema changes — confirming those additions generalize within the family rather than
being ibsl-specific. Two genuinely new real deviations surfaced:

1. **A lazy-loaded WebGL/Three.js 3D explorer shape.** `ibhl-t3`'s cross-product explorer has no
   plain `<canvas>` at all — instead a `🧊 View u × v in 3D` toggle button that mounts a Three.js
   scene into an initially-`hidden` wrap div on click. A legacy-file check found this exact
   pattern (`.ex-3d-btn`/`.ex-3d-wrap`/`.ex-3d-hint`, with an IDENTICAL hint sentence on every
   instance) already exists 4 more times in `calculus`'s not-yet-migrated source — this is a real,
   reusable site feature (presumably from the "WebGL 3D spike" prior work), not a one-off.
2. **A rail widget found on no other track, not even ibsl.** ibhl's real `<aside class="rail">`
   has a "Curriculum Mapping" `<select>` (`window.CSGamify.mapCurriculum`) as its last child —
   checked, and truly unique to this one track among all 21.

## Decision

- Add `explorerBlock.canvas3d` (optional object: `btnId`, `wrapId`, `hintId`, `btnLabel`,
  `ariaLabel`, `btnStyle`) — when present, `explorer.njk` renders the toggle-button shape instead
  of a plain `<canvas>`. `canvasId`/top-level `ariaLabel` are no longer unconditionally required
  (only needed when `canvas3d` is absent). The hint paragraph's text is IDENTICAL on every real
  instance checked (5 so far, across 2 tracks) — kept as static template markup, not a field.
- Add `rail.njk`'s `railExtra` (optional raw HTML string) — rendered as the last child inside
  `<aside>`. Chosen over new schema fields because the widget is confirmed exclusive to one track;
  a track-specific literal markup string in that track's own `index.njk` is simpler and more
  honest than schema fields no other track will ever use.

## Consequences

- Both additions are optional — re-verified qudrat (no `.mapper-wrap`, explorer still a plain
  `<canvas id="qudRatioCanvas">`) unaffected.
- Verified interactive: `ibhlCrossBtn` click correctly toggled `aria-expanded`/`hidden` and mounted
  a real `<canvas>` (Three.js renderer) inside `#ibhlCrossWrap` — the lazy-load genuinely works,
  not just the button chrome.
- `calculus` (the 21st and last track) will need `canvas3d` for at least 4 more real instances —
  already covered by this schema, no further changes anticipated there for this specific shape.
- ibhl is the 12th of 21 tracks live.
