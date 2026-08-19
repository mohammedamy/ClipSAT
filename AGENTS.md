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
2. **Target (qudrat/tahsili/act2/est2/est/appc/apstats/apbc/act/precalc/ibsl/ibhl are LIVE — 12 of 21 tracks migrated):** content lives in `content/{track}/_meta.json`
   (incl. `chapterOrder` — the source of truth for display order, not filesystem listing order) +
   `content/{track}/{chapter-slug}.json` (+ optional `_practice-set.json`), schema-validated against
   `course_schema.json` (a `blocks[]` model — see `docs/DECISIONS/0002`/`0003`), rendered by
   `src/_includes/partials/*.njk` via `src/{track}/index.njk` (hand-maintained for migrated tracks —
   `build.js`'s `MIGRATED_TRACKS` set must list the track or the next build silently overwrites this file
   back to the legacy include). Bilingual text renders via the `_bilingual.njk` macro and drives the
   site's **real, existing** language toggle (`window.i18n` — extended, not replaced, `docs/DECISIONS/0004`).
   See `docs/CONTENT_MODEL.md` and `docs/DECISIONS/0005-qudrat-cutover.md` (the actual cutover, incl. the
   rollback path — `index.html`'s `qud-*` section and `tracks/qudrat.html` are kept, unused, on purpose).
   To migrate the next track, follow the same sequence WP6-WP8 used, in order — don't skip the pilot's
   lessons: the schema was wrong twice before it matched real content (`docs/DECISIONS/0002`/`0003`), and
   the cutover itself found 3 more missing pieces (`docs/DECISIONS/0005`) that only turned up from reading
   the ACTUAL legacy markup in full, not from assuming the pattern already built would cover everything.
   One more recurring lesson (`docs/DECISIONS/0006`): a shared partial's "boilerplate" copy has three times
   now turned out to be one specific track's copy hardcoded and silently wrong on every other migrated
   track (chapter-tag pill, test-generator description, downloads section, practice-set intro — all found
   by diffing a new track's real source text against what the partial actually renders). When migrating a
   new track, diff its real copy against every partial it uses, don't assume "boilerplate" is actually
   shared until you've checked. Also don't assume a fixed per-chapter block ORDER — `est`'s real source
   showed several chapters skip the "Reference" callout-thm box qud/tah/act2/est2 usually open with, or
   skip the later `callout def`, in different combinations per chapter; read each chapter's actual markup
   order and reproduce it exactly rather than reusing the previous track's template shape.

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
- **`course-loader.js`, `router.js`, `storage.js`, `desmos-widget.js` were deleted (WP4)** — confirmed
  orphaned in the Phase 0 audit, only referenced by `sw.js`'s precache list. Deleting them also fixed a
  real bug: `.eleventy.js` never copied them into `_site/`, so `sw.js`'s `cache.addAll()` shell pre-cache
  (atomic — one 404 fails the whole call) had been silently failing on every install. If you're reading
  this in a checkout from before WP4, these files may still be present; check `git log` for the deletion.
- **`courses/`** contains only `.gitkeep` — not the same thing as `content/` (the new content root).
- **Monetization is copy, not code** — `free-tier-promise.html` describes a paid tier; no billing/gating
  exists in the app.

## Style preferences (Mohamed)

- Math deliverables (worksheets/exams) as `.docx` with native Word equations (OMML), not images/plain LaTeX.
- Diagrams/graphs via GeoGebra where applicable.
- Concise, direct responses — minimal narration, don't restate what was just done.
- Real work as a PR, not a narrated plan.

## More docs

`docs/ARCHITECTURE.md` (system design, the two content systems, data flow), `docs/DEPLOY.md` (build/CI/
rollback), `docs/CONTENT_MODEL.md` (target-system schema), `docs/RECIPES.md` (file-level steps per task),
`docs/PHASE8_TOKEN_VERIFICATION.md` (measured, not projected, token savings — qudrat scope only),
`docs/DECISIONS/` (why, per decision, in the order they were made).

## Full history / superseded docs

`CLAUDE_CODE_STARTER_PROMPT.md` (pre-dates this file, being folded in here — check both until fully merged),
`AUDIT.md` and `docs/INVENTORY.md` (point-in-time audits, historical record, not current-state truth),
`docs/PHASE1-2_TARGET_ARCHITECTURE.md` (the active migration plan this file's "target" column refers to).
