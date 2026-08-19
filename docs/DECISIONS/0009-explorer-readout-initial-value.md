# ADR 0009 — `readouts[].value` (real initial explorer readout text)

**Date:** 2026-08-19
**Status:** Accepted

## Context

While fingerprinting `ibsl` (the eleventh track) for its own explorers, a comparison against
`explorer.njk`'s output surfaced a real, live rendering bug that predates ibsl entirely:
`explorer.njk`'s `readouts` loop has always hardcoded every readout `<span class="v">` to a
literal em-dash (`—`), regardless of what the real source shows before any slider is touched.

That happened to be correct for qudrat's and tahsili's real source (both genuinely start their
readouts at `—`, since those explorers' numbers are meaningless until the user picks two shares to
compare). But cross-checking every other already-migrated track's real legacy HTML found real,
non-`—` precomputed defaults were being silently discarded and replaced with `—` on the shipped
page:

| Track | Real default (source) | Was rendering |
|---|---|---|
| act2 | `x = 1`, `y = 0`, `140.0°`, `70.0°`, `8.89` | `—` |
| appc | `1.667`, `up`, `growth`, `3.320`, `3` | `—` |
| apstats | `31.67`, `19.5`, `0.9332`, `2.400`, `4.70`, `(69.30, 78.70)` | `—` |
| est / est2 | `100`, `10.00`, `(1, -2)`, `0.707`, etc. | `—` |
| precalc | `0.766`, `circle`, `growth`, `2.226`, etc. | `—` |

act/apbc's real source genuinely does start at `—` (verified per-id), so those two were
coincidentally unaffected — but 6 of the 10 already-shipped migrated tracks had at least one wrong
readout value live on their pages.

## Decision

- Add `explorerBlock.readouts[].value` (optional string, default `—`) — the readout span's real
  initial text, copied verbatim from source.
- `explorer.njk` now renders `{{ r.value or '—' }}` instead of a hardcoded `—`.
- Backfilled `value` on all 29 existing readout entries across the 10 already-migrated tracks
  (act, act2, apbc, appc, apstats, est, est2, precalc, qudrat, tahsili) by cross-referencing each
  real `id` against its track's legacy `src/_includes/tracks/{track}.html` — a scripted extraction
  (`class="v" id="X">TEXT<`), not hand-transcribed, then spot-verified in-browser (apstats now
  shows `31.67`/`19.5`/`0.9332`/`2.400`; qudrat unaffected, still shows `—`).

## Consequences

- Optional/defaulted field — every already-migrated track needed its content updated (not just the
  schema/partial), since this fixes what a shipped page actually displays, not just future tracks.
- Re-verified: no regression on qudrat/tahsili (still `—`), correct real values now render on
  act2/appc/apstats/est/est2/precalc.
- General lesson (extends the one in `AGENTS.md`): "matches the site's real markup exactly" claims
  in a partial's own header comment are a hypothesis too, not a guarantee — this one was wrong for
  6 of 10 tracks despite the comment's confidence, caught only by diffing against source while
  building an unrelated (later) track's explorers.
