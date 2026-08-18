# ClipSAT — Architecture

System design, module boundaries, and the reasoning behind them. For "where do I edit X," see
`docs/RECIPES.md`. For the content schema itself, see `docs/CONTENT_MODEL.md`. For why specific decisions
were made, see `docs/DECISIONS/`.

## The two content systems

ClipSAT is mid-migration between two coexisting content systems. Check which one a track uses before
editing it (`docs/MAP.json` / `AGENTS.md` say which).

**Legacy** — content lives inline in root `index.html` (still the case for 20 of 21 tracks). `build.js`
extracts it at build time into `public/css/main.css`, `public/js/engine.js`,
`src/_includes/tracks/{track}.html`, and `src/_includes/base.njk` (generated from `build.js`'s `baseNjk`
string). Eleventy then wraps each track's extracted include with `base.njk` to produce `_site/{track}/`.

**Target** — content lives in `content/{track}/*.json` (schema-validated against `course_schema.json`),
rendered directly by Nunjucks partials (`src/_includes/partials/`) via a hand-authored
`src/{track}/index.njk`. No `build.js` extraction step for these tracks — `build.js`'s `MIGRATED_TRACKS`
set tells it to leave that track's `index.njk` alone. `qudrat` is the only track on this system so far
(`docs/DECISIONS/0005-qudrat-cutover.md`).

Both systems produce pages that use the same `base.njk` shell, the same `bank-data/*.json` question
banks, the same `public/js/engine.js` explorer/quiz JS, and the same `window.i18n` language toggle — the
migration changes where *content* lives, not the runtime engine, the explorer JS, or the deploy pipeline.

## Why two systems coexist, not a big-bang rewrite

Non-negotiable constraint from the re-engineering brief: incremental, reversible migration, deployable and
correct after every step. The qudrat cutover alone required 8 work packages (WP1–WP8) and found real
problems only visible once real content was actually converted (`docs/DECISIONS/0002` and `0003`
corrected the schema shape twice; `0005` found 3 missing pieces by reading the full legacy markup). A
big-bang rewrite of all 21 tracks at once would have multiplied that risk 21×, with no ability to catch
and fix a wrong design decision before it was baked into 20 more tracks.

## Data flow (target system, per request)

```
content/{track}/_meta.json ──┐
content/{track}/{ch}.json ───┼──> migratedContent.js (Eleventy global data)
content/{track}/_practice-set.json ┘         │
                                              ▼
                          src/{track}/index.njk
                     (subject-head.njk, rail.njk,
                    chapter.njk × N, practice-set.njk,
                  test-generator.njk, downloads-block.njk)
                                              │
                                        base.njk shell
                                              │
                                   _site/{track}/index.html
```

Each `chapter.njk` dispatches its `content.blocks[]` to one of `partials/blocks/{callout,table,cards,
text,explorer}.njk` by `kind` (`course_schema.json`'s discriminated union — `docs/DECISIONS/0002`/`0003`
explain why these five, not a fixed definitions/theorems/examples split).

## Bilingual rendering

Every user-facing string in the target system is `{en, ar}`. A shared macro
(`src/_includes/partials/_bilingual.njk`) renders both languages into the DOM as sibling `.i18n-en`/
`.i18n-ar` elements (the second omitted if `ar` is `null`), and a small, additive extension to
`index.html`'s existing `_applyToDOM()` — the function the site's real `window.i18n.setLocale()` already
calls on every toggle — flips which one is visible. No second toggle mechanism; the same header button
drives legacy dictionary-key content and target-system embedded-pair content on the same page.
`docs/DECISIONS/0004` has the full reasoning, including why dictionary injection was rejected.

## The explorer engine boundary

56 interactive canvas explorers (`docs/INVENTORY.md` §A) are hand-written JS in `public/js/engine.js`,
each keyed to specific, pre-existing DOM ids. The target system's `explorer` block kind
(`docs/DECISIONS/0003`) is deliberately a **reference + exact shell**, not a generic reusable explorer
type: it places the correct pre-existing ids into the correct pre-existing HTML shape, and holds the
surrounding text bilingually — it does not, and is not meant to, let a content author invent a *new*
explorer from data alone. Authoring a new explorer still means writing real JS in `engine.js`. This
matches the product roadmap's explicit "don't rebuild the explorer engine" guidance.

## Two separately-deployed pieces

The static site (this repo, built by `build.js` + Eleventy, deployed to GitHub Pages via
`.github/workflows/deploy.yml`) is not the whole system:

- **`app.py`** — a Flask reverse-proxy for the "Ask Mr. Mohamed" AI chat feature. Needs its own host and
  `ANTHROPIC_API_KEY`. Not built or deployed by this repo's CI. See `docs/DEPLOY.md`.
- **Supabase** (`supabase/schema.sql`, `public/js/cloud-sync.js`) — optional account/cloud-sync backend,
  a thin layer over the existing localStorage progress system. Setup: `SUPABASE_SETUP.md`.

## Navigation and chapter switching (target system)

`src/{track}/index.njk` wraps everything in `<main id="view-{track}" class="view">` — required by the
site's existing `showView()`/`goChapter()` JS (root implementations in `index.html`, wrapped by several
later feature layers — see `docs/DECISIONS/0005` for the trace). Chapters are hidden by CSS
(`.chapter{display:none}`) and shown by toggling a `.ch-active` class; `showView()` defaults to activating
the first `.chapter` in DOM order if none is active yet. This means: chapter render order in
`index.njk` must match `content/{track}/_meta.json`'s `chapterOrder` exactly, which must match the nav
rail's order exactly (`rail.njk` reads the same `chapters` array, so this holds automatically as long as
both are fed the same ordered array — don't reorder one without the other).
