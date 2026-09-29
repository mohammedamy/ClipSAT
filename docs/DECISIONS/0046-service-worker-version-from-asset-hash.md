# ADR 0046 — Stamp the service worker's version from its assets, and cache all JS/CSS first

**Date:** 2026-09-27
**Status:** Accepted
**Related:** Plan 5 (Technology Infrastructure), Phase 5.017 ("extend service-worker caching to
the new per-track bundles"). Follows ADRs 0029–0045, which moved code out of `engine.js` into
files loaded on demand.

## Context

`sw.js` serves `engine.js`, `main.css`, a few other scripts and the home page cache-first, from
a cache named after `SW_VERSION`. A browser replaces the service worker, which deletes the old
caches, only when `sw.js`'s own bytes change.

- **`SW_VERSION` was bumped by hand.** AGENTS.md described a `scripts/bump-version.js` that
  would do it, but that script never existed. The last bump, to `v2.0.30`, was on Sept 12 (PR
  #214). Since then, 41 merged PRs changed `engine.js` or `main.css` without a bump.
- **Result: returning visitors kept the `engine.js` and `main.css` they first cached.** Track
  pages are network-first, so their HTML was current, and it loaded new files (the per-track
  explorer files, ADR 0039) against an `engine.js` that predates them. A new test reproduces
  this. A deploy that changes `engine.js` but not `sw.js` never reaches a returning visitor, and
  the old caches are never dropped.
- **The files loaded on demand** (`js/ex/`, `js/ix/`, `figures.js`, `bank-exam.js`,
  `ai-exam.js`, …) fell through to the network-first tier, so they were fetched again on every
  visit.

## Decision

1. **The build stamps `SW_VERSION`.** `scripts/stamp-sw-version.js` runs from `.eleventy.js`'s
   `eleventy.after` hook. It sets `_site/sw.js`'s `SW_VERSION` to `<base>-<hash>`, where the hash
   is a SHA-256 of every file the service worker serves cache-first: the home page,
   `manifest.json`, the logo and icons, and everything under `css/` and `js/`. The base (`v2.1`)
   stays in the source `sw.js`. Any change to a cached file now changes `sw.js`, and nothing
   else does.
2. **Every file under `/css/` and `/js/` is cache-first** (`SHELL_DIRS`), not just the listed
   shell files. They are all build output covered by the hash, so a cached copy never outlives
   a deploy that changes it. They are still cached on first use, not at install (the install
   pre-cache list is unchanged, for the CLS reason recorded there).
3. **Track pages and question banks stay network-first,** so content changes appear on the
   next load, and a page visited before still opens offline.

## Consequences

- **This deploy itself changes `sw.js`,** so every returning visitor's browser installs the new
  service worker, drops the `v2.0.30` caches and gets current files.
- **On a return visit, `engine.js`, `main.css` and the track's explorer and data files load
  from the cache,** as do on-demand files already used, with no network request. The page's
  HTML is still fetched.
- **The first page load after a deploy still runs the previous version's cached files.** This
  was already the case. The page asks for an update on load (module 15), and the next load is
  current.
- Tests (`tests/e2e/service-worker.spec.js`, new; each serves `_site` from its own server with a
  simulated deploy laid over it):
  - the built `sw.js` carries the hash of the built files;
  - a deploy that changes `engine.js` reaches a returning visitor. With `sw.js` left unchanged,
    as on every deploy since v2.0.30, the same test fails: the old caches are never dropped;
  - on a return visit, `engine.js`, `main.css`, `js/ex/geo.js` and `figures.js` make no request
    to the server, and the page itself does;
  - offline, a visited track page still loads its explorers and figures.
- `tests/e2e/static-server.js` now exports `createServer(roots)`, which serves the first root
  that has a file and counts requests per path.
- **Never bump `SW_VERSION` by hand.** Change the base only to force a new version with no file
  change.
