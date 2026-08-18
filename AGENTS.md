# ClipSAT — Agent orientation

Read this first, every session. It's an index, not an encyclopedia — follow the links for detail.

## What this is

ClipSAT — a free math platform for 21 tracks (SAT/AP/IGCSE/Cambridge/IB/GAT Qudrat/SAAT Tahsili), bilingual
(English LTR + Arabic RTL, in incremental rollout). Solo maintainer (Mohamed, full-time math teacher),
AI-assisted, PR-based workflow. Live at `https://mohammedamy.github.io/ClipSAT/`.

## Current architecture (as of this file's last edit — check `docs/ARCHITECTURE.md` if this feels stale)

Static site: **Eleventy 3.x + Nunjucks**, deployed via GitHub Actions to GitHub Pages (`gh-pages`).
Separate, NOT statically hosted: `app.py`, a Flask proxy for the "Ask Mr. Mohamed" AI chat feature —
needs its own host + `ANTHROPIC_API_KEY`. See `docs/DEPLOY.md`.

**Content model is mid-migration** (see `docs/DECISIONS/` and `docs/PHASE1-2_TARGET_ARCHITECTURE.md` for
the full plan). Two content systems currently coexist — check which one a given track uses before editing:

1. **Legacy (still true for most tracks):** all content — 21 tracks' chapters, definitions, theorems,
   examples, the entire JS engine — lives inline in root `index.html` (41K+ LOC). `build.js` extracts it
   into `public/css/main.css`, `public/js/engine.js`, `src/_includes/tracks/{track}.html`, and the shared
   page shell (the `baseNjk` string inside `build.js` — **`src/_includes/base.njk` is generated from this
   string, never hand-edit it directly**). Editing this system: edit `index.html` or `build.js`, then
   `node build.js && npx @11ty/eleventy`.
2. **Target (rolling out track-by-track, pilot = qudrat):** content lives in `content/{track}/{chapter}.json`,
   schema-validated against `course_schema.json`, rendered by `src/_includes/partials/*.njk`. No `build.js`
   extraction step needed for these tracks. See `docs/CONTENT_MODEL.md`.

**Question banks (already fully in the target pattern, both systems):** `bank-data/{track}.json`, fetched
client-side at runtime. Adding/editing a question = edit the JSON, zero code changes, zero rebuild.

## Where to make each common kind of change

See **`docs/RECIPES.md`** — exact file-level steps for the 10 most common tasks (add a lesson, add a
course, rebrand, add a question type, fix RTL layout, embed a video, add nav, edit footer, add SEO
metadata, translate a page). Don't improvise a task this doc already covers.

For anything else: **`docs/MAP.json`** (path → purpose, machine-readable) or `docs/ARCHITECTURE.md`
(system design, module boundaries, the "why").

## Conventions

- **Bilingual:** every user-facing string in the target content system is `{ "en": "...", "ar": "..." | null }`.
  `ar: null` = not yet translated, renders English only. `dir="rtl"` is derived from `lang`, never stored.
- **Design tokens:** `public/css/main.css` — see `docs/DESIGN_TOKENS.md`. Prefer an existing token over a
  new hex value; the file still has legacy hardcoded colors being swept out incrementally (not yet zero).
- **File size:** target ≤300 LOC per source file (≤150 preferred for components/partials). Don't add to
  `index.html` if the track you're touching has already migrated to `content/`.
- **No new dependency without one sentence justifying it** (what it replaces, what it costs).
- **Cache-busting:** `scripts/bump-version.js` handles the version strings in `main.css`/`engine.js`/`sw.js`
  automatically — don't hand-edit them (see `docs/DEPLOY.md` if that script doesn't exist yet in your checkout).

## Commands

```
npm run build     # node build.js && npx @11ty/eleventy  — full build, mirrors CI
npm start         # npx @11ty/eleventy --serve            — local dev server, use this to preview, not raw index.html
```

CI (`.github/workflows/deploy.yml`) runs the same build on every push to `main` and deploys `_site/`.
Nothing needs to be built locally before pushing, but do it anyway to catch failures before CI does.

## Deploying

Branch, commit, push, `gh pr create`, merge. **Never push directly to `main`.**

```
git checkout -b <short-description>
git add <files> && git commit -m "..."
git push -u origin <branch>
gh pr create --fill
```

Wait ~1–2 min after merge, then verify live. **Hard-reload (Cmd+Shift+R)** when checking —
`js/engine.js`/`css/main.css` cache for 10 minutes; `bank-data/*.json` doesn't cache long.

`fatal: cannot lock ref` / `Unable to create .git/index.lock`: `rm -f .git/*.lock .git/refs/heads/*.lock`.

## Known gaps and traps — check before assuming these are bugs

- **Footer/nav is still duplicated** between `index.html`'s own `<header>`/`<footer>` and `build.js`'s
  `baseNjk` string's `<header>`/`<footer>` — only the `baseNjk` copy ships; `index.html`'s is never served,
  but is still hand-maintained (unclear whether it's still used for direct preview, so it hasn't been
  removed — see `docs/PHASE1-2_TARGET_ARCHITECTURE.md` WP3). **`npm run build` now runs
  `scripts/check-shell-sync.js` first and fails loudly if the two drift** (it already caught real,
  pre-existing drift once — see `docs/DECISIONS/`). If you edit one, mirror the change in the other, then
  re-run `npm run check-shell-sync` before pushing.
- **Root-level standalone pages** (`changelog.html`, `rigor-standard.html`, `free-tier-promise.html`) need
  explicit `addPassthroughCopy(...)` entries in `.eleventy.js` or they silently vanish from `_site/`.
- **`course-loader.js`, `router.js`, `storage.js`, `desmos-widget.js`** at repo root are not loaded by any
  page — orphaned, only referenced by `sw.js`'s precache list. Confirmed dead as of the Phase 0 audit;
  check `docs/DECISIONS/` for current status before assuming they're safe to use or delete.
- **`courses/`** contains only `.gitkeep` — not the same thing as `content/` (the new content root).
- **Monetization is copy, not code** — `free-tier-promise.html` describes a paid tier; no billing/gating
  exists in the app.

## Style preferences (Mohamed)

- Math deliverables (worksheets/exams) as `.docx` with native Word equations (OMML), not images/plain LaTeX.
- Diagrams/graphs via GeoGebra where applicable.
- Concise, direct responses — minimal narration, don't restate what was just done.
- Real work as a PR, not a narrated plan.

## Full history / superseded docs

`CLAUDE_CODE_STARTER_PROMPT.md` (pre-dates this file, being folded in here — check both until fully merged),
`AUDIT.md` and `docs/INVENTORY.md` (point-in-time audits, historical record, not current-state truth),
`docs/PHASE1-2_TARGET_ARCHITECTURE.md` (the active migration plan this file's "target" column refers to).
