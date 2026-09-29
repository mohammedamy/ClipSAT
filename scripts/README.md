# scripts/

Build-time tooling, run by `npm run build` (see `docs/DEPLOY.md`) or standalone via `npm run <name>`.

- `check-shell-sync.js` — fails if `index.html`'s header/footer drifted from `build.js`'s `baseNjk` copy
- `validate-content.js` — validates every `content/{track}/*.json` against `course_schema.json`
- `lighthouse-audit.js` — `npm run lighthouse`: mobile Lighthouse audit of the home page and every track,
  served gzip-compressed like GitHub Pages; writes `lighthouse-report/summary.md`. Run in CI by
  `.github/workflows/lighthouse.yml` (a local run can't reach the CDNs, so its numbers are optimistic)
- `stamp-sw-version.js` — run by `.eleventy.js` after each build; stamps `_site/sw.js`'s `SW_VERSION` with a
  hash of the JS/CSS it caches, so a deploy that changes them reaches returning visitors (ADR 0046)
- `sweep-hex-to-tokens.py` — one-off migration tool (WP2), finds/replaces hardcoded hex colors in
  `index.html`'s `<style>` blocks that exactly duplicate a design token; re-runnable, not build-wired

Does NOT contain: `build.js` (repo root, the main extraction script) or `parse_notes.py`/
`tools/worksheet_gen/` (standalone content-authoring tools, not part of the build).
