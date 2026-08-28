/* ── Build-time KaTeX pre-rendering (Phase 1 trial, Calculus only) ──────────
   Scoping doc: see the "Dig into the smaller CLS source" session that traced
   the remaining post-footer-fix layout shift to math-containing content
   (e.g. div.callout.def) resizing once client-side KaTeX auto-render swaps
   raw "\(...\)"/"\[...\]" text for its rendered output. This module renders
   that same math to the same KaTeX HTML at BUILD time instead, so the box
   is already correctly sized on the very first paint — no client-side
   reflow, no shift.

   Scope: ONLY static chapter content (what a track's own content/*.json
   ships, expanded through chapter.njk + the block partials + _bilingual.njk
   by the time Eleventy hands this transform the final HTML). Explicitly
   NOT in scope: bank-data-driven quiz questions, the AI chat tutor, or any
   other content generated client-side in response to a user action — those
   happen after user input, which the Layout Instability API already
   excludes from CLS, so pre-rendering them wouldn't move the metric and
   would fight the point of them being randomized per attempt.

   Verified compatible with the site's print/export "teacher tools" without
   any data-raw preservation shim: those already just copy whatever's
   currently rendered in the DOM (data-raw is never actually set on chapter
   elements today — see this module's PR description) and re-run KaTeX auto-
   render as a harmless no-op over any already-rendered .katex spans it
   finds. This only increases how much of that copied content is already
   rendered, which is strictly compatible with how that path already
   behaves for a normally-timed user.

   Parity with the client-side shim (base.njk's inline KATEX_OPTS): same
   delimiters, same throwOnError:false (renders a red error span in place
   rather than either throwing or silently dropping the expression — matches
   what a visitor would see today for the same malformed math), same KaTeX
   version (0.16.11, pinned to match the CDN build the client still loads
   for any content this pass doesn't reach, e.g. quiz-generated math). */
'use strict';

const katex = require('katex');
const cheerio = require('cheerio');

const SKIP_TAGS = new Set(['script', 'style', 'textarea', 'pre', 'code', 'noscript']);

// Matches \( ... \) (inline, group 1) or \[ ... \] (display, group 2).
// Non-greedy, single-pair matching only — same as KaTeX auto-render's
// default delimiter behavior (no nested same-kind delimiters).
const MATH_RE = /\\\((.+?)\\\)|\\\[(.+?)\\\]/gs;

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Renders every \(...\)/\[...\] pair found in `text` to KaTeX HTML, keeping
 * surrounding plain text intact (HTML-escaped, since the result is spliced
 * back in as raw HTML). Returns null if the text has no math in it, so the
 * caller can skip touching that text node at all.
 */
function renderMathInText(text, warn) {
  MATH_RE.lastIndex = 0;
  let match = MATH_RE.exec(text);
  if (!match) return null;

  let result = '';
  let lastIndex = 0;
  do {
    result += escapeHtml(text.slice(lastIndex, match.index));
    const isDisplay = match[2] !== undefined;
    const src = isDisplay ? match[2] : match[1];
    const rawDelimited = match[0];
    try {
      result += katex.renderToString(src, { displayMode: isDisplay, throwOnError: false });
    } catch (err) {
      // throwOnError:false covers malformed TeX (renders a red error span,
      // matching what the client would show); this catch is a second net
      // for anything that still throws — e.g. a truly catastrophic parser
      // error — where falling back to the original raw text is safer than
      // failing the whole build.
      warn(rawDelimited, err.message);
      result += escapeHtml(rawDelimited);
    }
    lastIndex = MATH_RE.lastIndex;
    match = MATH_RE.exec(text);
  } while (match);
  result += escapeHtml(text.slice(lastIndex));
  return result;
}

/**
 * Walks `root`'s descendants (cheerio node), rendering math in every text
 * node found outside SKIP_TAGS. Mutates `$` in place.
 */
function walk($, root, warn) {
  $(root)
    .contents()
    .each((_, node) => {
      if (node.type === 'tag') {
        if (SKIP_TAGS.has(node.name)) return;
        walk($, node, warn);
      } else if (node.type === 'text') {
        const text = node.data;
        if (!text || (text.indexOf('\\(') === -1 && text.indexOf('\\[') === -1)) return;
        const rendered = renderMathInText(text, warn);
        if (rendered !== null) $(node).replaceWith(rendered);
      }
    });
}

/**
 * Renders every .chapter element's math to KaTeX HTML in place. Returns the
 * mutated HTML string, or the original `html` untouched if there were no
 * .chapter elements (e.g. home/legal pages never reach this far — see the
 * outputPath gate in .eleventy.js).
 */
function renderChapterMath(html, pageLabel) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const chapters = $('.chapter');
  if (chapters.length === 0) return html;

  let warnCount = 0;
  const warn = (rawDelimited, message) => {
    warnCount++;
    console.warn(
      `[katex-ssr] ${pageLabel}: failed to render ${JSON.stringify(rawDelimited)} — ${message}`
    );
  };

  chapters.each((_, ch) => walk($, ch, warn));

  if (warnCount > 0) {
    console.warn(`[katex-ssr] ${pageLabel}: ${warnCount} expression(s) left as raw text — see warnings above.`);
  }

  return $.html();
}

module.exports = { renderChapterMath };
