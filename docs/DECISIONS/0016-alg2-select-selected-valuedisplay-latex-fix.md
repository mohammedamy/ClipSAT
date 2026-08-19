# ADR 0016 — alg2: `options[].selected`, `valueDisplay`, matrix LaTeX fix

**Date:** 2026-08-19
**Status:** Accepted

## Context

Migrating `alg2` (Algebra 2, the fifteenth track) reused the `category` chapterTag variant with a
new className/badgeClassName pair and a non-percentage `weightBadge` ("A2") with zero schema
changes, and `testGenerator.hasFullExam:false` (same real shape geo introduced). Three more real
findings surfaced.

1. **A `<select>` that DOES mark one option `selected`.** apab's `apRiemType` (WP26) had no
   `selected` attribute anywhere; alg2's `polyDeg` control has `<option value="3" selected>`. The
   two real tracks disagree, so `selected` has to be a per-option field, not a variant-level default.
2. **A slider whose displayed value differs from its own `value=` attribute.** `polyA`'s
   `<input value="2">` but its `<span class="mono">` shows `1` — engine.js maps slider positions to
   a different displayed scale. Every prior track's slider had these equal; alg2 is the first real
   counter-example.
3. **A genuine LaTeX-escaping bug in `a2-matrices`' "Solving a 3×3 system" worked example.** Matrix
   rows are missing their `\\` row-separator (`2&1\1&-3` instead of `2&1\\1&-3`), three times in
   the same example. Verified in-browser this does NOT currently throw a KaTeX error (KaTeX must
   silently tolerate the malformed escape), but it's still a real typo, not intended content — fixed
   by restoring the missing backslashes, same category as apab's Unit 1 fix (technical/markup
   corruption, not a content judgment call).

## Decision

- Add `explorerBlock.controls[].options[].selected` (optional boolean, default `false`) — renders
  `selected` on that one `<option>`.
- Add `explorerBlock.controls[].valueDisplay` (optional string) — the value-display span's real
  text when it differs from the `<input>`'s own `value=` attribute; defaults to `value` when absent.
- Fixed the matrix LaTeX's missing `\\` separators in content, not reproduced.

## Consequences

- Both control additions are optional/defaulted — no changes needed to apab's or geo's already-shipped
  explorers.
- Verified in-browser: `polyDeg`'s `<option value="3" selected>` renders byte-exact; `polyA`'s
  input value (`2`) and display span (`1`) both render exactly as source; the matrix example
  renders with zero KaTeX errors.
- alg2 is the 15th of 21 tracks live.
