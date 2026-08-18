# ClipSAT — Deploy

## Build

```bash
npm run build
```

Runs, in order: `node scripts/check-shell-sync.js` (fails if `index.html`'s header/footer has drifted
from `build.js`'s `baseNjk` copy — `docs/DECISIONS/0001`), `node scripts/validate-content.js` (fails if
any `content/{track}/*.json` doesn't match `course_schema.json`, or if `_meta.json`'s `chapterOrder`
doesn't exactly match the chapter files on disk), `node build.js` (extracts CSS/JS/per-track HTML from
`index.html` for every track *not* in `build.js`'s `MIGRATED_TRACKS` set), then `npx @11ty/eleventy`
(renders `_site/`).

```bash
npm start
```

`npx @11ty/eleventy --serve` — local dev server at `http://localhost:8080/ClipSAT/`. Does **not** run
`build.js` first — if you changed `index.html`, run `npm run build` (or `npm run extract`) at least once
before starting the dev server, or you'll be looking at stale extracted output.

## Environments

**Production**: `https://mohammedamy.github.io/ClipSAT/`, GitHub Pages, deployed from the `gh-pages`
artifact `.github/workflows/deploy.yml` builds. No staging environment — PRs are verified locally
(`npm run build` + manual/browser checks) before merge; merging to `main` deploys directly.

**Local dev**: `npm start`, `http://localhost:8080/ClipSAT/`. `pathPrefix: "/ClipSAT/"` in `.eleventy.js`
applies locally too — don't navigate to bare `http://localhost:8080/`, it 404s.

## CI/CD

`.github/workflows/deploy.yml` — triggers on push to `main` (or manual `workflow_dispatch`). Steps:
checkout, Node 20 + npm cache, `npm ci`, `npm run build`, upload `_site/` as a Pages artifact, deploy.
**Nothing needs to be built locally before pushing** — CI runs the same `npm run build` from whatever's on
the branch — but running it locally first catches a failure before it ships instead of after.

No test suite currently exists. `npm run build`'s own success (including the two validation scripts) is
the only automated gate.

## Deploy workflow (branch → PR → merge)

```bash
git checkout -b <short-description>
git add <files> && git commit -m "..."
git push -u origin <branch>
gh pr create --fill
```

**Never push directly to `main`.** Merge only after `npm run build` passes locally. Wait ~1–2 minutes
after merge for the Actions run to complete, then verify live — **hard-reload (Cmd+Shift+R)** when
checking, since `js/engine.js`/`css/main.css` cache for 10 minutes (`bank-data/*.json` doesn't cache
long, content-bank changes show up immediately).

## Rollback

**A bad deploy on `main`**: `git revert <merge-commit>`, push, wait for the next Actions run. GitHub Pages
has no separate "previous deploy" button — the fix is always a new commit that reverts the bad one, not a
dashboard action.

**A migrated track that turns out wrong** (target-system cutover, e.g. qudrat): the legacy source is kept
on purpose, unused, specifically for this. Revert `src/{track}/index.njk` to
`{% include "tracks/{track}.html" %}` and remove the track from `build.js`'s `MIGRATED_TRACKS` set — the
next build regenerates the legacy page exactly as it was, with zero data loss, since `index.html`'s
section for that track and `build.js`'s extraction of it were never touched by the cutover.
`docs/DECISIONS/0005-qudrat-cutover.md` has the full reasoning for keeping this path open.

## Separately-deployed pieces (not covered by this repo's CI)

- **`app.py`** (Flask, the "Ask Mr. Mohamed" chat proxy) — needs its own host, `ANTHROPIC_API_KEY`,
  `CLIPSAT_ALLOWED_ORIGIN`, `FLASK_SECRET_KEY` env vars. See the docstring at the top of `app.py` for full
  setup (`pip install`, `gunicorn` command). Not built, tested, or deployed by `.github/workflows/deploy.yml`.
- **Supabase** (optional cloud-sync/accounts backend) — see `SUPABASE_SETUP.md`. Nothing existing breaks
  if this is never set up; it's a thin optional layer over localStorage.

## Common failures

`fatal: cannot lock ref` / `Unable to create .git/index.lock: File exists` — stale lock file:
`rm -f .git/*.lock .git/refs/heads/*.lock`.

`npm run build` fails at the `check-shell-sync` step — the `index.html` header/footer and `build.js`'s
`baseNjk` copy have drifted (only relevant if you edited either one). Mirror the change into the other,
re-run.

`npm run build` fails at the `validate-content` step — a `content/{track}/*.json` file doesn't match
`course_schema.json`, or `_meta.json`'s `chapterOrder` has an entry with no matching chapter file (or vice
versa). The error output names the exact file and field.
