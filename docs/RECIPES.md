# ClipSAT — Task recipes

Exact file-level steps for the 10 benchmark maintenance tasks (see `docs/INVENTORY.md` §8 for the
token-cost measurements these recipes are based on). **Check which content system the track uses first**
(legacy `index.html`, or migrated `content/{track}/`) — see `AGENTS.md`. As of this writing only `qudrat`
is migrated; everything below assumes legacy unless noted.

## 1. Add a new lesson/chapter to an existing course (EN + AR)

**Legacy:** open `index.html`, find the `view-{track}` section, locate the chapter list, insert the new
chapter markup (definitions/theorems/examples/quiz) following the pattern of an adjacent chapter in the
same file. Grep for the track's existing chapter titles first — don't read the whole file.
Then: `node build.js && npx @11ty/eleventy` regenerates `src/_includes/tracks/{track}.html` — don't
hand-edit that file. `scripts/bump-version.js` (once it exists) handles cache-busting; until then, bump the
version string by hand in `public/css/main.css`, `public/js/engine.js`, `sw.js`.

**Migrated (e.g. qudrat):** add a new `content/{track}/{chapter-slug}.json` conforming to
`course_schema.json`, with every text field as `{ "en": "...", "ar": "..." | null }`. No `build.js` step.

## 2. Add an entirely new course/track with 5 lessons

Files: `index.html` (new `view-{track}` section + nav entry), new `src/{track}/index.njk` (copy an
existing track's 8-line file, change the ID), `sitemap.xml` (new `<url>` entry), `build.js` (add the
track ID to its track-list constant), new `bank-data/{track}.json` (question pool). Confirm the track ID
against the existing list in `AGENTS.md`/`CLAUDE_CODE_STARTER_PROMPT.md` before picking a new one.

## 3. Change the primary brand color / heading typeface site-wide

File: `public/css/main.css` only. Change the relevant token(s) — see `docs/DESIGN_TOKENS.md` for names.
**Check for hardcoded hex values first** (`grep -o '#[0-9a-fA-F]\{3,6\}' public/css/main.css | sort -u`) —
if the color/property you're changing has hardcoded instances outside the token, this becomes a
find-and-replace pass across the same file, not a one-line token edit.

## 4. Add a new question type to the quiz/practice module

This is an engine change, not a content change. File: `index.html`'s quiz-generation JS (search for
`genChapterQuiz`, `genTest`, `CS_loadTrackBank` per `AGENTS.md`'s known-entry-points list) — or, once
`build.js`'s extraction is retired, `public/js/engine.js` directly. If the new type needs new fields,
every track's `bank-data/{track}.json` that uses it needs the new field added to its question objects.

## 5. Fix a layout defect in Arabic RTL, mobile

File: `public/css/main.css` first — look for the relevant selector, check for `dir`-scoped rules nearby.
If the defect is structural (wrong element order, not just style), the fix is in `index.html` (legacy
tracks) or the relevant `src/_includes/partials/*.njk` (migrated tracks). Test at both a mobile viewport
and with `dir="rtl"` before shipping — this class of bug has shipped before without both checks.

## 6. Embed a new video into an existing lesson

**Legacy:** insert an `<iframe>`/embed directly in the relevant chapter section of `index.html`, following
an existing example (grep `youtube.com` in `index.html` — there are only 2 today, so read both first).
**Migrated:** add an entry to the chapter's `content.videos[]` array (see `docs/CONTENT_MODEL.md`) —
`{ "id", "provider": "youtube", "videoId", "title": {en, ar}, "topicTag" }`. Rendered by
`src/_includes/partials/video-embed.njk`.

## 7. Add a new top-level nav item + landing page

Files: `index.html`'s nav markup AND `build.js`'s `baseNjk` string's nav markup (**both** — this is the
confirmed footer/nav duplication, see `AGENTS.md` "Known gaps"; a change to one without the other makes
pages visibly diverge), plus `.eleventy.js` (if the landing page is a new standalone HTML file, add
`addPassthroughCopy`) and `sitemap.xml`.

## 8. Update the site-wide footer (links, contact, social handles)

Files: `index.html`'s footer AND `build.js`'s `baseNjk` string's footer (**both**, same duplication as
task 7). Verify both copies match after editing — diff them if unsure.

## 9. Add structured data / SEO metadata to a lesson page type

File: `build.js`'s `baseNjk` string — the `<meta name="description">`, `og:*`, `canonical`, and
`application/ld+json` blocks are already centralized here for all 21 tracks. One edit point, no per-track
changes needed unless the metadata should vary by track (in which case, thread a new variable through the
same template).

## 10. Translate an existing English-only page into Arabic

Same pattern as task 1 — this is the exact task type behind the last several merged PRs (qudrat/tahsili
chapter translations). **Legacy:** edit the relevant `index.html` section, wrapping Arabic text in
`<span dir="rtl">` or using the existing `data-i18n-html`/`data-lang` toggle pattern — check how the
*adjacent already-translated* chapter in the same track did it, and match that, don't invent a new pattern
mid-track. **Migrated:** set the `"ar"` field (was `null`) on each relevant string in the chapter's
`content/{track}/{chapter}.json`.
