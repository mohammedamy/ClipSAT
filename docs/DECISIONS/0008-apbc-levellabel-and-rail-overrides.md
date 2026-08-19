# ADR 0008 — `levelLabel` for practiceSet items; rail practice-link overrides

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `apbc` (AP Calculus BC, the eighth track) surfaced two more real deviations, both in
partials previously assumed to have a fixed, site-wide shape:

1. **`practiceSet` items where the visible badge text is a different dimension from the
   CSS color class.** apbc's practice-set uses the `standard` `.ph`/`.pn`/`.pq`/`.lvl {b|i|a}`
   markup (like qud/tah/act2/est/est2), but the badge's *visible text* is `MCQ`/`FRQ` — a
   question-type label — while the underlying difficulty (which drives the `b`/`i`/`a` color
   class) is still genuinely Basic/Intermediate/Advanced per item, verified by cross-referencing
   each item's class against its real solution content. These are two independent real
   dimensions in the source, not one being mislabeled.
2. **The rail's own practice-set link text/icon is not universal.** Every migrated track so far
   had `"Practice set"`/`§` in both the section `<h2>` (already overridable, `docs/DECISIONS/0007`)
   and the rail link. apbc's real rail link reads `"Exam practice"`/`⊘` — the *same* strings as its
   section heading/icon, but rail.njk had hardcoded the site-wide phrase independent of the
   section's own heading.

## Decision

- Add `practiceSet.items[].levelLabel` (optional) — the real visible badge text, defaulting to
  `difficulty` when absent. `difficulty` itself keeps driving the CSS class lookup unconditionally
  (must stay exactly Basic/Intermediate/Advanced for the `standard` variant's color to resolve).
- Add `practiceSet.icon` (optional, defaults to `§`) alongside the existing `heading` override.
- Add `rail.njk` params `practiceSetLabel`/`practiceSetIcon` (optional) so a track's page template
  can pass its own `practiceSet.heading`/`.icon` through to the rail link instead of the hardcoded
  site-wide string — sourced from the same JSON fields added in this PR, no new data duplicated.

## Consequences

- All four additions are optional/defaulted — zero changes needed to any of the seven
  already-migrated tracks (re-verified qudrat unaffected: still renders "Practice set"/§,
  "Basic" as before).
- apbc's testGenerator turned out to be fully `standard` (unlike appc/apstats' `compact`) —
  confirms `compact` is a genuine per-track variant within the AP family, not something every
  College Board track uses; don't assume it going forward either.
- The general lesson (already noted in `AGENTS.md`) holds again: a hardcoded "site-wide" string in
  a shared partial is a hypothesis to verify per track, not a fact — this is the third partial
  (after `downloads-block.njk`/`test-generator.njk`/`practice-set.njk` in WP12, and now `rail.njk`)
  where an assumed-universal string turned out to have a real per-track exception.
