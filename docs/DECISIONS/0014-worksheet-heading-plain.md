# ADR 0014 — `downloadsInfo.worksheetHeadingPlain`

**Date:** 2026-08-19
**Status:** Accepted

## Context

While reading `apab`'s downloads section, its real `<h3>Worksheet Library</h3>`/`<p>...</p>` carry
NO inline styles, unlike every other track's `<h3 style="margin-top:26px">`/`<p style="font-size:
.88rem;color:var(--muted)">`. A search across all 21 legacy files found `apbc` shares this — and
`apbc` is already migrated and shipped (PR #106), meaning its live page has been rendering the
WRONG (styled) shape since that PR, undetected until now.

## Decision

Add `downloadsInfo.worksheetHeadingPlain` (boolean, default `false`). `true` renders the plain,
unstyled `<h3>`/`<p>` tags; default renders the existing styled shape every other track uses.
Retroactively set `true` on `apbc`'s `_meta.json` to fix its live page.

## Consequences

- Zero schema-breaking change — optional/defaulted field.
- Re-verified apbc now renders the plain tags; apstats (default shape) unaffected.
- This is the SECOND already-shipped-track live bug caught this session purely by reading a new
  track's real source closely (the first was the explorer-readout em-dash fix, PR #110) — the
  project's standing lesson holds: verifying a new track's markup against a shared partial keeps
  finding real bugs on tracks migrated much earlier, not just informing the new one.
