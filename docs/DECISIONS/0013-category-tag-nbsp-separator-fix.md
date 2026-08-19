# ADR 0013 — `category` chapterTag's real `&nbsp;·&nbsp;` topic separator

**Date:** 2026-08-19
**Status:** Accepted

## Context

While fingerprinting `apab` (AP Calculus AB) for its own `chapterTag`, cross-checking its real
`.ap-tag` markup against `chapter-tag.njk`'s `category` variant found the topic-list separator
was wrong: the template has always joined `topics[]` with a plain `" · "` (breakable spaces on
both sides), but every real source instance checked — apab, apstats, act, act2, apbc, est, est2,
all 6 already-shipped tracks using the `category` variant — actually uses `" &nbsp;·&nbsp; "`
(non-breaking spaces around the middle dot; act's own source spells the dot as the `&#183;`
numeric entity instead of a literal `·`, same rendered character).

This is a low-severity difference — both render the identical visible glyph, the only effect is
whether the browser may break a line at that space — but it's real, confirmed live-wrong on all 6
already-shipped `category`-variant pages, and the fix is a one-line, zero-risk template change.

## Decision

Change `chapter-tag.njk`'s `category` branch to join topics with `" &nbsp;&middot;&nbsp; "`
instead of `" · "`. `&middot;` renders the identical character to both real spellings found in
source (`·` and `&#183;`).

## Consequences

- Zero schema change — pure template fix, no content JSON touched.
- Re-verified apstats' `.ap-tag` now renders the real `&nbsp;·&nbsp;` separator exactly.
- No visible glyph change on any already-shipped page — only affects where a line may wrap.
