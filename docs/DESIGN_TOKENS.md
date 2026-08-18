# ClipSAT — Design tokens

**Single source of truth: `public/css/main.css`.** This document explains the naming scheme and usage
rule; it does not restate every value — that would create a second place to keep in sync, which is exactly
the pattern this repo is trying to eliminate (see `docs/INVENTORY.md` §2 on the footer/nav duplication).

## Current state (honest, not aspirational)

87 CSS custom properties exist and cover color, spacing, radius, shadow ("elevation"), and easing. They
are the *intended* single source of truth, but **215 distinct hardcoded hex values also exist in the same
file**, outside the token layer (measured in the Phase 0 audit, `docs/INVENTORY.md` §3/§6). A full rebrand
today is not a guaranteed one-file edit — check for hardcoded instances of whatever you're changing first:

```bash
grep -o '#[0-9a-fA-F]\{3,6\}' public/css/main.css | sort | uniq -c | sort -rn
```

Sweeping the remaining hardcoded values into tokens is planned (`docs/PHASE1-2_TARGET_ARCHITECTURE.md`,
Phase 1 principle #5 / WP2) but has not shipped yet.

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
