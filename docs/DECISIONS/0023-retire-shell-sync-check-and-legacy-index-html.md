# ADR 0023 — Retire scripts/check-shell-sync.js and delete the legacy index.html pipeline

**Date:** 2026-08-20
**Status:** Accepted
**Supersedes:** ADR 0001 (shell-sync-check-not-removal)

## Context

ADR 0001 (2026-08-18) deliberately did NOT remove `index.html`'s dead `<header>`/`<footer>`
copy, since it was "unconfirmed whether it's still used for direct-preview convenience." Instead
it added `scripts/check-shell-sync.js`, wired into `npm run build`, to fail loudly if
`index.html`'s header/footer ever drifted from `build.js`'s `baseNjk` header/footer — the two
independently hand-maintained copies of the same shell markup.

Since then (WP10, this same session): all 21 subject tracks finished migrating to
`content/{track}/*.json` (docs/DECISIONS/0005 onward), and `index.html`'s CSS (step 1), JS
(step 2), and homepage (step 3) were each moved to real, hand-maintained source files
(`src/styles/main.css`, `src/scripts/engine.js`, `src/_includes/tracks/home.html`). By WP10 step
4, `index.html`'s only remaining live purpose was being one half of the shell-sync comparison
— nothing else read it, and `check-shell-sync.js`'s own header comment already noted the
underlying "is it still used for direct preview" question was never resolved either way.

## Decision

Delete the root `index.html` file (41K+ lines at its original size; ~22K by this point, mostly
dead CSS/JS/track markup already neutralized in prior WP10 steps) and the now-fully-dead
`src/_includes/tracks/*.html` rollback copies for all 21 migrated tracks (not `home.html`,
which is the real source now). Retire `scripts/check-shell-sync.js` and its `npm run build`
step — with only one copy of the header/footer left (`build.js`'s `baseNjk`), the drift
scenario it existed to catch is now structurally impossible, not just currently passing.

## Consequences

- `build.js` shrinks from 7 extraction steps reading a 3MB+ source file to 5 steps reading small,
  real source files — no more regex-based HTML parsing at all.
- The "two places to edit" trap this whole ADR chain (0001 → here) was about is fully closed:
  header/footer, CSS, JS, and every track's content each have exactly one real source now.
- `index.html` and the 21 dead track files remain fully recoverable from git history — this is
  not data loss, only a working-tree change. `git log -- index.html` / `git show <sha>:index.html`
  retrieve any prior state.
- If a future need for "preview the site without running the build pipeline" resurfaces, that's
  a new, different feature request (e.g. a lightweight static preview page) — not a reason to
  keep an unmaintained, drifting 41K-line monolith around "just in case."
