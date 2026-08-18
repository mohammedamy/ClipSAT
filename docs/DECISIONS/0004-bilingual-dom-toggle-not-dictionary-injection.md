# ADR 0004 — Wire migrated content into the existing language toggle via dual-DOM + a small `_applyToDOM()` extension

**Date:** 2026-08-18
**Status:** Accepted

## Context

Migrated content (`content/{track}/*.json`) embeds bilingual text directly as `{en, ar}` pairs. The
site's existing language toggle (`window.i18n`, `index.html`) works differently: elements carry a
`data-i18n="key"` attribute (no visible text of their own until JS runs), and `setLocale()` looks the key
up in a closed-over `_strings.en`/`_strings.ar` dictionary object, then writes the result into the
element's `textContent`/`innerHTML`. Only one language's actual text exists in the DOM at a time.

`_strings` is a private variable inside `window.i18n`'s IIFE — the returned public API is only
`{t, setLocale, getLocale}`, with no method to add new keys after the fact. Two ways to make migrated
content participate in the same toggle were considered:

1. **Inject into the dictionary.** Requires either hand-editing `_strings` inside `index.html`'s source
   for every migrated string (defeats the purpose of moving content out of `index.html`), or adding a new
   public method (e.g. `registerStrings()`) so build-time code could merge migrated content's pairs in.
   Works, but every migrated string would need a synthesized, globally-unique key, and the dictionary
   would grow to hold content that no longer conceptually lives in `index.html`.
2. **Render both languages into the DOM, toggle visibility.** No dictionary, no synthesized keys —
   `content/*.json` already has both languages side by side.

## Decision

Went with (2). Each bilingual field renders as a small wrapper (`<span data-bilingual>` by default, or a
block tag when the field's content itself contains block-level HTML) with two children: `.i18n-en`
(visible by default) and `.i18n-ar` (`dir="rtl"`, starts `hidden` — omitted entirely if the source `ar`
was `null`, i.e. genuinely not yet translated). A shared Nunjucks macro,
`src/_includes/partials/_bilingual.njk`, generates this consistently everywhere.

`index.html`'s `_applyToDOM()` (the function `setLocale()` already calls on every toggle) gets one small,
purely additive extension: a `document.querySelectorAll('[data-bilingual]')` scan that flips which child
is `hidden` based on the current locale. A companion `data-bilingual-attrs` scan handles values that must
be plain attributes (e.g. `aria-label`) rather than visible content, since the dual-span trick doesn't
work inside an attribute — each carries `data-{attr}-en`/`-ar` plus a real default value.

Both additions are new `querySelectorAll` calls appended after the three existing scans — they don't
touch, reorder, or change the existing `data-i18n`/`data-i18n-html`/`data-i18n-attr` logic at all. On
every page written before this change, both selectors match zero elements, so the extension is a
guaranteed no-op there.

## Consequences

- **The exact same button and JS** (`window.i18n.setLocale()`, the header's 🌐 toggle) now drives both
  the legacy dictionary-key content and the new embedded-pair content, on the same page, at the same
  time — no second toggle mechanism, no mode-switching.
- Verified: regression-tested the *existing* toggle on the live `/qudrat/` page before and after this
  change (identical behavior, confirmed via `window.i18n.setLocale('ar')` — title/intro/`dir` all
  correct). Verified the *new* mechanism end-to-end on `/wp6-verify/`, including a real click on the
  actual header button (not just a programmatic `setLocale()` call): full-page RTL mirroring, correct
  Arabic in all 5 translated qudrat chapters, correct English fallback in the 4 untranslated ones and in
  `qud-compare`'s explorer, correct `aria-label` switching, MathJax re-typesetting correctly on toggle.
- **Caught and fixed a real bug during this verification, not before it**: two explorer `ariaLabel`
  fields in `content/qudrat/qud-ratio.json` had been hardcoded to English-only literals during WP6e's
  conversion, even though real Arabic translations existed in the source dictionary (`qud.ratio.exp1-aria`
  / `exp2-aria`). The toggle-testing process is exactly what surfaced this — a value that never changes
  under `setLocale('ar')` is a loud, easy-to-notice signal, unlike a silent content gap.
- `RTL_SCOPE_SELECTOR` (the pre-existing hardcoded selector list `setLocale()` uses to set `dir="rtl"` on
  specific legacy containers) is untouched and still only covers the 5 already-hand-translated legacy
  chapters — migrated content doesn't need an entry there, since `dir="rtl"` is set directly on each
  `.i18n-ar` span at render time instead of via a maintained selector list. This is a small, real
  improvement over the legacy pattern (one less "remember to add it to two places" spot), not just parity
  with it.
