# content/

Target-system content, one directory per migrated track. `{track}/_meta.json` (course meta +
`chapterOrder`), `{track}/{chapter-slug}.json` (one chapter each), `{track}/_practice-set.json`
(optional). Schema-validated against `../course_schema.json` on every build
(`scripts/validate-content.js`). See `docs/CONTENT_MODEL.md`.

Does NOT contain: MCQ question banks (`bank-data/` — a separate, already-correct system, not touched by
this migration), tracks still on the legacy system (their content lives in root `index.html` — check
`docs/MAP.json` for which is which).
