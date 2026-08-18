# ClipSAT — Content model

**Schema: `course_schema.json`** (repo root, v2 — blocks model). This document explains the shape and the
bilingual rule; the schema file is the enforced source of truth (`scripts/validate-content.js` validates
against it in `npm run build`/CI) — if this doc and the schema ever disagree, the schema wins, and this doc
is wrong. **v2 replaced a v1 fixed-field design that turned out not to match real content** — see
`docs/DECISIONS/0002-blocks-model-not-fixed-fields.md` for why, before assuming a rigid shape here either.

## Scope

Covers `content/{track}/{chapter-slug}.json` — the target content system chapters are migrating into
(pilot: qudrat, see `docs/PHASE1-2_TARGET_ARCHITECTURE.md` WP6). **Does NOT cover** `bank-data/*.json`
(the large per-track MCQ question pools) — that's a separate, already-correct, intentionally-untouched
system with its own ad hoc shape (`pool`/`sections`/`letters`).

## The one rule that matters: bilingual fields

Every user-facing string is:

```json
{ "en": "Linear Equation", "ar": "معادلة خطية" }
```

or, for a string not yet translated:

```json
{ "en": "Linear Equation", "ar": null }
```

`ar: null` is valid and expected for most content today. `dir="rtl"` is derived from the active language at
render time; never stored in content data.

## Top-level shape

```
{ id, meta: { title, subtitle, level, prerequisites, color, icon, estimatedHours, examBoard, tags },
  chapters: [ { id, title, description,
                content: { blocks: [ ...ordered... ], videos: [...], explorers: [...] },
                quizWidget: { enabled } } ] }
```

## Blocks — the core of a chapter

`content.blocks[]` is an **ordered** array — order is preserved from the source, because that's how a
chapter actually reads. Each block has a `kind`:

| kind | Shape | What it covers (real markup evidence, WP6) |
|---|---|---|
| `callout` | `{ style, label?, body, copyLatex? }` | The vast majority of prose content. `style` is one of `def` (definition), `thm` (theorem/rule), `note`, `warn` (often a practice problem), `pf` (proof), `example` (worked example, `<div class="example">` wrapper), `example-card` (a worked example rendered in the smaller `<div class="fcard">` stat-card wrapper instead — a real if less common pattern, found converting qudrat ch.6/ch.8), `tip` (study-strategy tip). All share one label+body shape in the real HTML (`class="callout def/thm/note/warn/pf"` — 489 instances sitewide, `class="example"` — 398 instances). `style` picks the CSS the template renders, not a class name the content author needs to know. |
| `table` | `{ caption?, columns[], rows[][] }` | A structured data table (`class="exam-table"`, 22 instances) — e.g. an exam section map. |
| `cards` | `{ items: [{label, value}] }` | A small stat-card grid (`class="formula-cards"`, 212 instances) — e.g. Format/Calculator/Skills/Signature. |
| `text` | `{ body }` | A plain paragraph with no wrapper — e.g. a chapter's opening sentence before the first callout. |

There is **no separate `workedExample` block with a `steps[]` array** — no such structure exists in real
markup (checked sitewide); a worked example is a `callout` with `style: "example"`, prose all the way
through, matching the source.

### Not modeled as content: the chapter quiz widget

Every chapter's "Chapter Quiz" section (question count/level selectors + a Generate button) is a **live
widget** (`genChapterQuiz()` in `engine.js`) that reads `bank-data/{track}.json` at request time — it is
not per-chapter static data. `chapter.quizWidget: { enabled }` is a render flag, not quiz content; there is
nothing to author here beyond whether the widget appears.

## Videos

`content.videos[]` — unchanged from the original design.

## Explorers (`explorer` block kind, `docs/DECISIONS/0003-explorer-block.md`, done)

An `explorer` block is a `blocks[]` entry, not a separate array — explorers appear *inline* in a chapter's
real reading order (prose → explorer → prose → explorer → …), so they live in the same ordered sequence
as everything else.

**A real explorer isn't just `<canvas id="...">`** — `qud-ratio`'s two explorers and `qud-compare`'s one
are each a full accessible widget: a title bar with an "interactive" badge, the canvas, a "View as data"
toggle button, a hidden `<table>` fallback panel for non-visual equivalents (real, deliberate accessibility
work — see the a11y sweep in project memory), 0–2 `<input type="range">` sliders each with their own id, a
`<div class="readout" aria-live="polite">` block of live-updating result rows, and an optional note.

The `explorer` block captures this whole shape (`title`, `canvasId`, `ariaLabel`, `dataPanel { btnId,
panelId, descId, rowsId, caption, columns }`, `controls[] { id, valueDisplayId, label, ariaLabel, min, max,
value, step }`, `readouts[] { id, label, colorClass }`, `note`) — but it is a **reference + exact-shell**
block, not a generic reusable explorer type: `canvasId` and every control/readout id must be the exact
string `public/js/engine.js`'s existing, hand-written, per-explorer JS already looks for. The schema does
not invent new explorer behavior and a template rendering this block does not either — it only places the
correct pre-existing ids into the correct pre-existing HTML shape. Verified against all 3 real instances
in qudrat (`docs/DECISIONS/0003`); a genuinely different explorer shape elsewhere in the site may need its
own new block kind, derived the same way — from real markup, not by assumption.

## Practice set (`src/_includes/partials/practice-set.njk`, `content/{track}/_practice-set.json`, done)

`qud-practice` is 22 KB of real content (50 individually worked problems, each tagged by difficulty) —
not chapter prose and not a template shell, so it isn't a `chapter` file and isn't `blocks[]`-shaped. It's
a flat, uniform, numbered list: every one of the 50 `<div class="problem">` items in the source has the
exact same shape (`{number, question, difficulty}` in the header, `solution` below), which made it
possible to extract systematically (regex, not hand-transcription) with a sanity check confirming exactly
50 items numbered 1–50, no gaps or duplicates — lower transcription-error risk than the chapter-by-chapter
conversions, precisely because the structure is this regular.

New schema shape: `practiceSet` (`content/{track}/_practice-set.json`) — `{ items: [{ number, question,
solution, difficulty }] }`, `question`/`solution` as `bilingualText`, `difficulty` one of `Basic` /
`Intermediate` / `Advanced` (the real values used in source). Optional per track; most tracks don't have
this section. `practice-set.njk` renders it with the exact same markup/classes as the source, including
the unmodified `onclick="toggleSol(this)"` — the show/hide behavior is unchanged, existing `engine.js` JS,
not reimplemented. Verified: the existing JS correctly toggles the new markup's solution visibility.

## Downloads section (`src/_includes/partials/downloads-block.njk`, done)

`qud-downloads` turned out to be a mix, not pure boilerplate: generic PDF/DOCX buttons (identical every
track), real per-track "Past Papers" links to the exam board's own site (`meta.officialLinks[]` — label,
url, note, each a `bilingualText`/plain string), a small pair of numbers the boilerplate copy needs
(`meta.downloadsInfo.chapterCount`/`worksheetCount`), and a live JS widget (`.worksheet-library
[data-track]`, populated at runtime by `engine.js` — not authored content, the partial just emits the
correct `data-track` attribute and lets the existing JS do its job, same as today).

**This section's boilerplate copy (headings, button labels, descriptions) has zero Arabic translation
anywhere in the live site, for any of the 21 tracks** — verified by checking for `data-i18n` attributes,
not assumed. `downloads-block.njk` hardcodes the real English text and does not invent an Arabic version;
inventing one would violate "content is sacred" just as much as mistranslating existing content would.

The source markup also has a real bug, present across all 21 tracks: an unclosed `<div class="dl">`
around the DOCX card that nests the "Past Papers" card inside it instead of beside it (browsers silently
recover; the visual result still looks fine because CSS doesn't depend on the exact nesting depth here).
`downloads-block.njk` emits properly-nested HTML instead of reproducing the bug — same text, same links,
same buttons, corrected structure.

## Worked example: `qud-about`, converted

See `course_schema.json`'s `examples[0]` — a faithful (trimmed for length) excerpt of the real `qud-about`
chapter, validated by `scripts/validate-content.js` on every build. Note the `text` block for the opening
paragraph, the `table` block for the section map, the `cards` block for the stat grid, and `callout` blocks
for everything else — this is the actual shape a converted chapter takes, not a hypothetical one.

## Validation

```bash
npm run validate-content   # or: node scripts/validate-content.js
```

Runs automatically as part of `npm run build`. Validates every `content/{track}/*.json` file against
`course_schema.json`, plus the schema's own `examples` (catching the schema and its documentation
drifting apart). Fails the build with a specific per-field error list on any mismatch.

## Before converting a new chapter

**Grep the real markup first.** Don't assume the block kinds above are exhaustive — they were derived from
qudrat's `qud-about` plus a sitewide class-name check, not from every track. If a chapter has a genuinely
new shape, add a block kind for it (following `docs/DECISIONS/0002`'s pattern: real evidence, not a guess)
rather than distorting content to fit an existing kind.
