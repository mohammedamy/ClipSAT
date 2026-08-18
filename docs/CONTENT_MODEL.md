# ClipSAT — Content model

**Schema: `course_schema.json`** (repo root). This document explains the shape and the bilingual rule;
the schema file is the enforced source of truth (`scripts/validate-content.js` validates against it in
`npm run build`/CI) — if this doc and the schema ever disagree, the schema wins, and this doc is wrong.

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

`ar: null` is valid and expected for most content today — it means "not yet translated," and a template
renders English only for that string with no Arabic toggle available. `dir="rtl"` is derived from the
active language at render time; it is never stored in content data.

**Not bilingual, deliberately:** `id` slugs, LaTeX strings (`latex` fields — math notation, not prose),
quiz choice `key`s (`"A"`/`"B"`/`"C"`/`"D"`), the correct-`answer` key, `meta.examBoard` (a proper noun),
`meta.tags` (English search keywords), `color`/`icon`/`level`/`provider`/`canvasId`/`type` (structural,
not prose).

## Top-level shape

```
{ id, meta: { title, subtitle, level, prerequisites, color, icon, estimatedHours, examBoard, tags },
  chapters: [ { id, title, description, content: { definitions, theorems, keyFormulas, workedExamples,
                                                     videos, explorers, notes },
                quiz: { questions: [ { id, text, choices, answer, solution, difficulty, tags } ] } } ] }
```

See `course_schema.json`'s `examples` array for a complete, valid, worked example — kept in sync with the
schema by `scripts/validate-content.js`, which validates the examples against the schema on every build.

## Worked example: adding one bilingual definition

```json
{
  "id": "def-linear-eq",
  "term": { "en": "Linear Equation", "ar": "معادلة خطية" },
  "body": { "en": "An equation of the form $ax + b = c$ where $a \\ne 0$.", "ar": null }
}
```

The `body` here is untranslated (`ar: null`) even though `term` is translated — this is normal and expected
for content mid-rollout; translate incrementally, field by field, chapter by chapter.

## Videos and explorers

`content.videos[]` and `content.explorers[]` are new fields with no legacy equivalent (Phase 0 found
these were thin/early features with no dedicated data shape before). `explorers[]` is a **reference only**
— `canvasId` must match an id `public/js/engine.js` already recognizes; this schema does not create new
explorer behavior, it just tells a template where to mount an existing one and what to call it in each
language. Do not use this array to try to reimplement one of the 56 existing canvas explorers as data.

## Validation

```bash
npm run validate-content   # or: node scripts/validate-content.js
```

Runs automatically as part of `npm run build`. Validates every `content/{track}/*.json` file against
`course_schema.json`, plus the schema's own `examples` (catching the schema and its documentation
drifting apart). Fails the build with a specific per-field error list on any mismatch.
