# ClipSAT — Design tokens

**Single source of truth: `public/css/main.css`.** This document explains the naming scheme and usage
rule; it does not restate every value — that would create a second place to keep in sync, which is exactly
the pattern this repo is trying to eliminate (see `docs/INVENTORY.md` §2 on the footer/nav duplication).

## Current state (honest, not aspirational)

87 CSS custom properties exist and cover color, spacing, radius, shadow ("elevation"), and easing. They
are the *intended* single source of truth. A full rebrand today is **not yet** a guaranteed one-file edit —
check for hardcoded instances of whatever you're changing first:

```bash
grep -o '#[0-9a-fA-F]\{3,6\}' public/css/main.css | sort | uniq -c | sort -rn
```

**WP2 status (2026-08-18):** `scripts/sweep-hex-to-tokens.py` ran a conservative first pass — it replaced
40 hardcoded hex usages that were *exact, unambiguous* duplicates of an existing token's light-mode value
with `var(--token)`, across 11 tokens (`--xp-color`, `--text-3`, `--red-50`, `--muted`, `--streak-color`,
`--indigo-50`, `--bg-page`, `--text-2`, `--success`, `--cd-yellow`, `--indigo-200`). Verified: clean build,
and spot-checked in the running site (computed color values unchanged in light mode, correct unbroken
dark-mode inheritance when toggled). **What it deliberately left alone, and why:**

- **~631 hex usages had no matching token at all** — these are either genuinely one-off colors or values
  that deserve a *new* token, which needs a human to name and categorize, not a script to guess. Not
  swept. This is most of the original 215-distinct-value count (measured in the Phase 0 audit,
  `docs/INVENTORY.md` §3/§6) — WP2 closed a slice of it, not all of it.
- **6 hex values were skipped as ambiguous** because two+ tokens share the exact same value and a script
  can't know which one is semantically correct for a given usage: `#2b5ba8` (`--indigo-2` vs `--indigo-500`),
  `#1e3a6e` (`--indigo` vs `--indigo-700`), `#ffffff` (`--bg-surface` vs `--panel` vs `--surface`),
  `#b8801f` (`--amber` vs `--amber-700`), `#b91c1c` (`--cd-red` vs `--red-500`), `#c8902a` (`--amber-2` vs
  `--amber-400` vs `--amber-500`). Worth a human pass, not urgent.
- One replacement (`--xp-color`, used for the `.as-tag`/`.as-paper` AS-Level badge) is a **value** match,
  not a **semantic** one — `--xp-color` was designed for the gamification XP bar and happens to share
  AS-Level's purple. Functionally correct (same color, now dark-mode-aware), but the token name reads
  oddly in that context. Worth a follow-up rename/split if it bothers a future reader; not a bug.

Re-run the script (`python3 scripts/sweep-hex-to-tokens.py`, no `--apply`, for a dry-run report) any time
new hardcoded colors creep back in.

## Naming scheme

| Prefix/pattern | Meaning | Example |
|---|---|---|
| `--{color}-{shade}` | A color ramp, shade as a rough 50–900 lightness scale (not strictly numeric everywhere) | `--indigo-500`, `--amber-700` |
| `--{color}-soft` / `--{color}-text` | A muted/background or text-safe variant of that color | `--amber-soft`, `--amber-text` |
| `--bg-*` | Page/surface backgrounds | `--bg-page`, `--bg-subtle`, `--bg-surface` |
| `--ink`, `--muted`, `--faint` | Text color tiers, dark → light | |
| `--border`, `--border-strong`, `--line`, `--grid` | Border/divider colors, increasing emphasis | |
| `--r-{xs,sm,md,lg,xl,pill}` | Border-radius scale | `--r-md: 10px` |
| `--elev-{1,2,3}` | Box-shadow "elevation" tiers | |
| `--ease-out`, `--ease-std` | Transition timing functions | |
| `--maxw` | Content max-width | |
| `--sans`, `--mono` | Font stacks | |
| `--cd-{green,orange,red,yellow}` | Difficulty/status indicator colors (used for quiz correctness, chapter status chips) | |

## Light/dark

Every token is defined twice: once on `:root` (light) and again inside `body.dark` (dark-mode override,
same variable name, different value). This is the correct pattern — **always add both** when introducing a
new token, or dark mode silently falls back to the light value. This exact gap has caused real bugs before
(see memory: the dark-mode contrast sweep, 3 rounds of fixes for undefined-token typos and hardcoded
light-only colors).

## Usage rule

Prefer an existing token over a new hex literal. If a needed color genuinely doesn't exist yet, add it as a
new token (both `:root` and `body.dark` entries) rather than inlining a hex value — that's how the existing
215 stray values happened in the first place.
