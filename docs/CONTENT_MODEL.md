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

## Videos and explorers

`content.videos[]` and `content.explorers[]` — unchanged from the original design. `explorers[]` is a
**reference only**: `canvasId` must match an id `public/js/engine.js` already recognizes; this schema does
not create new explorer behavior, it just tells a template where to mount an existing one.

**Why explorer-heavy chapters are deliberately deferred, with evidence (checked converting qudrat, WP6):**
a real explorer isn't just `<canvas id="...">` — `qud-ratio`'s two explorers are each a full accessible
widget: a title bar with an "interactive" badge, the canvas, a "View as data" toggle button, a hidden
`<table>` fallback panel for non-visual equivalents (real, deliberate accessibility work — see the a11y
sweep in project memory), 1–2 `<input type="range">` sliders each with its own id (`qudRatioA`,
`qudRatioB`, `qudPctNew`), live-updating readout `<span>`s (`qudRatioAv`, `qudShareA`, `qudShareB`,
`qudPctChange`) wired to bespoke JS in `engine.js`, and a note callout. None of the slider ranges, ids, or
readout wiring are expressible as `blocks[]` content without either (a) a new, much larger
explorer-hosting schema that encodes every control's id/min/max/step/label — essentially re-templating a
chunk of the explorer engine as data, in tension with "don't rebuild the explorer engine" — or (b)
treating the whole `<div class="explorer">` block as an opaque raw-HTML passthrough, which drops the
"content ⟂ logic" separation for exactly the two chapters that need it most. Neither was attempted here;
this needs its own scoped design decision, not a rushed extension of `blocks[]`.

**`qud-practice` (the 50-problem practice set) is also deliberately not migrated** — it's 22 KB of real
content (50 individually worked problems, each tagged by difficulty), not a template shell. Migrating it
faithfully is comparable in effort to several more chapters and deserves its own pass, not a rushed
tail-end addition.

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
