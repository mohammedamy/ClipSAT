# ADR 0005 — Cut `/qudrat/` over to render from `content/`, keep the legacy source as a rollback path

**Date:** 2026-08-18
**Status:** Accepted

## Context

By WP7, qudrat's content was fully migrated and verified in isolation (`/wp6-verify/`, not linked from
nav). Actually cutting the live `/qudrat/` page over to render from `content/qudrat/*` instead of
`index.html`'s `qud-*` section / `src/_includes/tracks/qudrat.html` is the first change in this whole
migration that changes what a real page actually serves, not just adds new unused files.

Reading `src/_includes/tracks/qudrat.html` in full (rather than only the parts already converted) found
three real, previously-missed pieces that a page-level cutover needs and no prior work package had
built: a `<section class="subject-head">` (page `<h1>` + a stat row), a `<aside class="rail">` nav
sidebar wired to the site's existing `goChapter(id, trackId)` JS, and an entirely separate `qud-testgen`
("Test generator") section — found only because the rail listed a target (`qud-testgen`) that didn't
match any chapter converted so far. Tracing `goChapter()`/`showView()` back to their root
implementations (both wrapped multiple times by later feature layers) found the actual activation
mechanism: chapters are hidden by CSS (`.chapter{display:none}`) and shown by toggling a `.ch-active`
class, defaulting to the first `.chapter` in DOM order if none is active — meaning render order has to
match the rail's order exactly, and the whole thing has to sit inside `<main id="view-qudrat" class="view">`
(part of the legacy include's own markup, not provided by `base.njk` — missed on the first attempt here
too, caught by `document.getElementById('view-qudrat')` returning null in verification, not by luck).

A structural fingerprint of every `id`/`class` in the legacy file (not just spot-reading) confirmed no
further gaps beyond those three.

Also found and fixed during this pass: `downloads-block.njk`/`practice-set.njk` were deriving their
section `id` as `{{ trackId }}-downloads`/`-practice` — for qudrat that's `qudrat-downloads`, but the
real source id (and the rail's `data-target`, and any existing URL-hash deep link) is `qud-downloads`
(the site uses per-track abbreviated prefixes, not the full trackId — tahsili's is `tah-*`). Fixed by
making both partials take an explicit `sectionId` rather than deriving one, to avoid silently breaking
hash deep-links (`#view/qudrat/qud-downloads`) — a real "no URL breakage" concern, not cosmetic.

`build.js` regenerates `src/{track}/index.njk` from `index.html` on every run — including qudrat's, which
would silently clobber the hand-maintained cutover file back to the legacy `{% include %}` wrapper on the
next build. Fixed with a `MIGRATED_TRACKS` set `build.js` checks before writing that file.

## Decision

Cut `/qudrat/` over. `src/qudrat/index.njk` now assembles `subject-head.njk` + `rail.njk` + all 9
`chapter.njk` chapters (in `_meta.json`'s explicit `chapterOrder` — filesystem directory-listing order is
not reliable, and `scripts/validate-content.js` now cross-checks every `chapterOrder` entry has a matching
file, and every chapter file is listed in the order, so a silently-missing chapter fails the build) +
`practice-set.njk` + `test-generator.njk` + `downloads-block.njk`, reading from `migratedContent.js` (a
new generic Eleventy data file — any future migrated track just needs a `content/{track}/_meta.json` to
show up, no code change).

**`index.html`'s `qud-*` section and `src/_includes/tracks/qudrat.html` are deliberately NOT deleted.**
`build.js` keeps extracting `tracks/qudrat.html` as before (harmless — nothing includes it anymore). This
is the rollback path: if something is found wrong after this ships, reverting is `git revert` on this PR,
or in an emergency, changing `src/qudrat/index.njk` back to `{% include "tracks/qudrat.html" %}` and
removing `'qudrat'` from `build.js`'s `MIGRATED_TRACKS` restores the exact prior page with zero data loss.
Deleting the legacy source is separate, later work, only after this cutover has been live and confirmed
stable — not bundled into the same change as the cutover itself.

## Verification

More extensive than any prior step in this migration, because this is the first one that changes what a
real page serves:

- **Structural**: every expected element present with the exact right ids — `#view-qudrat` found and
  `.active`; 12 `.chapter` sections (9 chapters + practice + testgen + downloads); default-active chapter
  correctly `qud-about` (matches `showView()`'s first-chapter-wins default, which depends on DOM order
  matching array order); rail correctly highlights the active chapter.
- **Interactive navigation**: clicked a rail link (not a programmatic call) — active chapter switched,
  previous chapter hid, rail highlight moved, URL hash updated to `#view/qudrat/qud-ratio` (real
  deep-linking, unmodified `goChapter()`).
- **Explorers actually run**: `qud-ratio`'s canvas explorer rendered a live bar chart from
  `engine.js`'s existing drawing code (not reimplemented); dragged a slider programmatically
  (`qudRatioA` 2→7) and confirmed both the live value display and the calculated share readout updated
  correctly (48→84), matching the real formula.
- **Bank-data JS still works**: clicked "Generate test" in the Test Generator section — pulled 10 real
  questions from `bank-data/qudrat.json` with correct difficulty tags and collapsible solutions.
- **Language toggle** works on the fully assembled page: subject-head, rail, and chapter content all
  switch together correctly; canvas `aria-label` switches; untranslated content correctly stays English.
- **Console errors compared against an unrelated, untouched track** (`/calculus/`) to separate real
  regressions from pre-existing local-dev-server noise — the same 404s (cloud-sync/teacher-view scripts,
  environment-specific) appear on both, confirming this cutover introduces zero new errors.
- **Full-repo diff reviewed before committing**: confirmed no other track's `index.njk`, no
  `src/_includes/tracks/*.html` for any other track, and no CSS were touched — the change is exactly as
  scoped.
