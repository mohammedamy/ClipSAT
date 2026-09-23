# E2E regression suite — Plan 5, Phase 5.009

This is the "run the checks before cutting the monolith" gate that Plan 5's
Pillar 5 status panel refers to at Phase 5.016. Its job is narrow on purpose:
catch a regression in **figure rendering** (build-time KaTeX SSR + canvas
explorers) or **quiz state** (`genChapterQuiz`/`cqPick` in `engine.js`) the
moment `index.html`/`engine.js` gets split apart in Stage C — not to be a
general test suite for the whole site.

## Running it

```bash
npm run build       # produces _site/ — the suite tests that output, not a dev server
npm run test:e2e
```

`playwright.config.js` starts its own static server for `_site/`
(`tests/e2e/static-server.js`) and tears it down after, so no manual server
step is needed beyond `npm run build`.

## What each track is checked for

1. **Loads clean** — HTTP 200, the right `track-{id}` body class, at least
   one `.katex` element (proof the build-time KaTeX pre-render — Phase
   5.006 — still fired), and zero uncaught JS errors or same-origin
   console errors.
2. **Quiz state** — clicks the first chapter's "Generate Quiz" button,
   waits on the real `CS_bankReady` promise and `clipsat:quiz-ready` event
   `engine.js` already exposes (no polling, no arbitrary sleeps), confirms
   at least one question rendered, then clicks an answer and confirms
   `cqPick()` marked it answered and the score bar incremented.

The track list itself comes from `bank-data/*.json` — the same files
`CS_loadTrackBank()` fetches at runtime — filtered to tracks that actually
built a page, so it can't silently drift from what's live the way a
hand-maintained array would.

## Known gap: external CDN reachability

Claude Code's own sandboxed dev container blocks outbound requests to
`cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, and `apis.google.com` (network
policy, not a bug), so KaTeX's live auto-render, Supabase, and Google
Sign-In never load there. The suite excludes console errors from those
hosts so it stays meaningful in that environment. Neither check above
actually depends on those libraries — build-time KaTeX SSR and
`genChapterQuiz`/`cqPick` are same-origin vanilla JS — so this doesn't
weaken what the suite catches; it just means the *live* math-rendering and
sign-in paths only get exercised in an environment with normal internet
egress (GitHub Actions CI, or a normal dev machine).

## Not yet covered

- Per-explorer correctness (56 canvas explorers) beyond "a canvas element
  exists and has a nonzero bounding box" — deeper coverage is incremental
  work, not a Phase 5.009 blocker.

## Accessibility sweep (`a11y.spec.js`)

Pillar 4's automated WCAG 2.1 AA check: axe-core (`@axe-core/playwright`)
runs against the home page and every track, in both light and dark colour
schemes, with every chapter forced visible (`.chapter{display:block}`).
Chapters are panel-mode, and axe skips hidden content, so a default-view
scan only ever checks the one chapter a page opens on. That is how an
initial default-view scan reported zero violations while real failures
(unlabelled test-generator selects, low-contrast text, keyboard-unreachable
wide equations) sat in every other chapter. Any WCAG 2.1 A/AA violation
fails the test and prints each rule, its impact, and the offending
selectors. See docs/DECISIONS/0030-axe-core-ci-sweep.md.

## CI

`.github/workflows/pr-checks.yml`'s `e2e-and-a11y` job runs this whole
suite (`npm run test:e2e`) on every PR, after installing Playwright's
Chromium and running `npm run build`.

