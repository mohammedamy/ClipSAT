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

// Matches HTML comments, skipped container elements (<script>, <style>, <textarea>, <pre>,
// <code>, <noscript>, <annotation>), or individual HTML tags (<...>).
const TOKEN_RE = /(<!--[\s\S]*?-->|<(?:script|style|textarea|pre|code|noscript|annotation)\b[^>]*>[\s\S]*?<\/(?:script|style|textarea|pre|code|noscript|annotation)>|<[^>]+>)/gi;

// Matches \( ... \) (inline, group 1) or \[ ... \] (display, group 2).
// Non-greedy, single-pair matching only — same as KaTeX auto-render's
// default delimiter behavior (no nested same-kind delimiters).
const MATH_RE = /\\\((.+?)\\\)|\\\[(.+?)\\\]/gs;

const RENDER_CACHE = new Map();

function decodeHtmlEntities(s) {
  if (s.indexOf('&') === -1) return s;
  return String(s)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function renderChunkMath(text, warn) {
  if (!text || (text.indexOf('\\(') === -1 && text.indexOf('\\[') === -1)) return text;
  return text.replace(MATH_RE, (rawDelimited, inlineSrc, displaySrc) => {
    const isDisplay = displaySrc !== undefined;
    const src = decodeHtmlEntities(isDisplay ? displaySrc : inlineSrc);
    const cacheKey = (isDisplay ? 'D:' : 'I:') + src;
    const cached = RENDER_CACHE.get(cacheKey);
    if (cached !== undefined) return cached;
    try {
      const rendered = katex.renderToString(src, { displayMode: isDisplay, throwOnError: false });
      RENDER_CACHE.set(cacheKey, rendered);
      return rendered;
    } catch (err) {
      warn(rawDelimited, err.message);
      return rawDelimited;
    }
  });
}

/**
 * Renders every math expression in <body> to KaTeX HTML in place without
 * constructing a full DOM AST in memory. Returns the mutated HTML string,
 * or the original `html` untouched if no math delimiters are present.
 */
function renderChapterMath(html, pageLabel) {
  if (!html || (html.indexOf('\\(') === -1 && html.indexOf('\\[') === -1)) return html;
  const bodyOpen = /<body\b[^>]*>/i.exec(html);
  if (!bodyOpen) return html;
  const bodyStart = bodyOpen.index + bodyOpen[0].length;
  const bodyCloseIdx = html.lastIndexOf('</body>');
  const bodyEnd = bodyCloseIdx !== -1 ? bodyCloseIdx : html.length;
  const bodyHtml = html.slice(bodyStart, bodyEnd);

  let warnCount = 0;
  const warn = (rawDelimited, message) => {
    warnCount++;
    console.warn(
      `[katex-ssr] ${pageLabel}: failed to render ${JSON.stringify(rawDelimited)} — ${message}`
    );
  };

  const parts = [html.slice(0, bodyStart)];
  let lastIdx = 0;
  TOKEN_RE.lastIndex = 0;
  let m;
  while ((m = TOKEN_RE.exec(bodyHtml)) !== null) {
    if (m.index > lastIdx) {
      parts.push(renderChunkMath(bodyHtml.slice(lastIdx, m.index), warn));
    }
    parts.push(m[0]);
    lastIdx = TOKEN_RE.lastIndex;
  }
  if (lastIdx < bodyHtml.length) {
    parts.push(renderChunkMath(bodyHtml.slice(lastIdx), warn));
  }
  parts.push(html.slice(bodyEnd));

  if (warnCount > 0) {
    console.warn(`[katex-ssr] ${pageLabel}: ${warnCount} expression(s) left as raw text — see warnings above.`);
  }

  return parts.join('');
}

module.exports = { renderChapterMath };
