# scripts/

Build-time tooling, run by `npm run build` (see `docs/DEPLOY.md`) or standalone via `npm run <name>`.

- `check-shell-sync.js` — fails if `index.html`'s header/footer drifted from `build.js`'s `baseNjk` copy
- `validate-content.js` — validates every `content/{track}/*.json` against `course_schema.json`
- `sweep-hex-to-tokens.py` — one-off migration tool (WP2), finds/replaces hardcoded hex colors in
  `index.html`'s `<style>` blocks that exactly duplicate a design token; re-runnable, not build-wired

Does NOT contain: `build.js` (repo root, the main extraction script) or `parse_notes.py`/
`tools/worksheet_gen/` (standalone content-authoring tools, not part of the build).
