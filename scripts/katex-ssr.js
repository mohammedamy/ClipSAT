/* ── Build-time KaTeX pre-rendering (SSR across all 31 tracks + 612 chapter pages) ──
   Renders static chapter math (\(...\) and \[...\]) to KaTeX HTML at build time
   so boxes are sized on first paint (0 CLS, 0 client-side boot reflow).
   Includes:
   - Bounded LRU cache (MAX_RENDER_CACHE = 8000) to keep Eleventy V8 heap < 512 MB.
   - Semantic spoken-math (.sr-only) translation for LaTeX fractions, roots,
     integrals, sums, and relations (WP-29) while preserving exact `data-tex`
     for DOCX OMML equation export and emitting zero duplicate MathML DOM trees. */
'use strict';

const katex = require('katex');

const TOKEN_RE = /(<!--[\s\S]*?-->|<(?:script|style|textarea|pre|code|noscript|annotation)\b[^>]*>[\s\S]*?<\/(?:script|style|textarea|pre|code|noscript|annotation)>|<[^>]+>)/gi;
const MATH_RE = /\\\((.+?)\\\)|\\\[(.+?)\\\]/gs;

const MAX_RENDER_CACHE = 3000;
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

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Converts LaTeX macros into concise, natural screen-reader speech (VoiceOver / NVDA)
 * while leaving plain ASCII expressions (e.g. `x^2 + 1 = 0`) untouched.
 */
function texToSpeech(tex) {
  if (!tex || tex.indexOf('\\') === -1) return tex;
  let s = String(tex);
  // Expand nested fractions & roots up to 4 levels deep
  for (let pass = 0; pass < 4; pass++) {
    const prev = s;
    s = s
      .replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, 'fraction $1 over $2')
      .replace(/\\sqrt\s*\[([^\[\]]*)\]\s*\{([^{}]*)\}/g, '$1 root of $2')
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, 'square root of $1')
      .replace(/\\(?:text|mathrm|mathbf|mathit|operatorname)\s*\{([^{}]*)\}/g, '$1')
      .replace(/\\overline\s*\{([^{}]*)\}/g, '$1 bar')
      .replace(/\\vec\s*\{([^{}]*)\}/g, 'vector $1')
      .replace(/\\hat\s*\{([^{}]*)\}/g, '$1 hat');
    if (s === prev) break;
  }
  s = s
    .replace(/\\(?:left|right|bigl|bigr|Bigl|Bigr|displaystyle|textstyle)\b/g, '')
    .replace(/\\[,;:!]\s*/g, ' ')
    .replace(/\\quad\b|\\qquad\b/g, ' ')
    .replace(/\\leq?\b/g, ' <= ')
    .replace(/\\geq?\b/g, ' >= ')
    .replace(/\\neq\b/g, ' != ')
    .replace(/\\approx\b/g, ' approximately ')
    .replace(/\\equiv\b/g, ' congruent to ')
    .replace(/\\pm\b/g, ' plus or minus ')
    .replace(/\\mp\b/g, ' minus or plus ')
    .replace(/\\times\b/g, ' times ')
    .replace(/\\cdot\b/g, ' times ')
    .replace(/\\div\b/g, ' divided by ')
    .replace(/\\infty\b/g, 'infinity')
    .replace(/\\to\b|\\rightarrow\b/g, ' approaches ')
    .replace(/\\Rightarrow\b/g, ' implies ')
    .replace(/\\iff\b|\\Leftrightarrow\b/g, ' if and only if ')
    .replace(/\\int\b/g, 'integral ')
    .replace(/\\sum\b/g, 'sum ')
    .replace(/\\prod\b/g, 'product ')
    .replace(/\\lim\b/g, 'limit ')
    .replace(/\\pi\b/g, 'pi')
    .replace(/\\theta\b/g, 'theta')
    .replace(/\\alpha\b/g, 'alpha')
    .replace(/\\beta\b/g, 'beta')
    .replace(/\\gamma\b/g, 'gamma')
    .replace(/\\delta\b/g, 'delta')
    .replace(/\\Delta\b/g, 'Delta')
    .replace(/\\lambda\b/g, 'lambda')
    .replace(/\\mu\b/g, 'mu')
    .replace(/\\sigma\b/g, 'sigma')
    .replace(/\\omega\b/g, 'omega')
    .replace(/\\(?:sin|cos|tan|csc|sec|cot|arcsin|arccos|arctan|ln|log|det|gcd|lcm)\b/g, (m) => m.slice(1))
    .replace(/\s{2,}/g, ' ')
    .trim();
  return s || tex;
}

function cacheSet(key, val) {
  if (RENDER_CACHE.size >= MAX_RENDER_CACHE) {
    const oldest = RENDER_CACHE.keys().next().value;
    if (oldest !== undefined) RENDER_CACHE.delete(oldest);
  }
  RENDER_CACHE.set(key, val);
}

function renderChunkMath(text, warn, state) {
  if (!text || (text.indexOf('\\(') === -1 && text.indexOf('\\[') === -1)) return text;
  if (state && (state.hiddenDepth > 0 || state.count >= state.maxExpressions)) return text;
  return text.replace(MATH_RE, (rawDelimited, inlineSrc, displaySrc) => {
    if (state && state.count >= state.maxExpressions) return rawDelimited;
    const isDisplay = displaySrc !== undefined;
    const src = decodeHtmlEntities(isDisplay ? displaySrc : inlineSrc);
    if (state && state.maxTexLength && src.length > state.maxTexLength) return rawDelimited;
    if (state) state.count++;
    const cacheKey = (isDisplay ? 'D:' : 'I:') + src;
    const cached = RENDER_CACHE.get(cacheKey);
    if (cached !== undefined) return cached;
    try {
      const origWarn = console.warn;
      console.warn = (msg, ...rest) => {
        if (typeof msg === 'string' && msg.startsWith('No character metrics for ')) return;
        origWarn.call(console, msg, ...rest);
      };
      let rendered;
      try {
        rendered = katex.renderToString(src, {
          displayMode: isDisplay,
          output: 'html',
          throwOnError: false,
          strict: false
        });
      } finally {
        console.warn = origWarn;
      }
      if (rendered.indexOf('<span class="katex">') !== -1) {
        const escSrc = escapeHtml(src);
        const escSpeech = escapeHtml(texToSpeech(src));
        rendered = rendered.replace(
          '<span class="katex">',
          () => `<span class="katex" data-tex="${escSrc}"><span class="sr-only">${escSpeech}</span>`
        );
      }
      cacheSet(cacheKey, rendered);
      return rendered;
    } catch (err) {
      warn(rawDelimited, err.message);
      return rawDelimited;
    }
  });
}

function updateHiddenState(tag, state) {
  if (!state || !state.skipHiddenContainers || !tag || tag[0] !== '<' || tag.startsWith('<!--')) return;
  if (tag[1] === '/') {
    const closeMatch = /^<\/([a-z0-9]+)/i.exec(tag);
    if (!closeMatch) return;
    const tn = closeMatch[1].toLowerCase();
    if (state.stack.length) {
      const top = state.stack[state.stack.length - 1];
      if (top.tag === tn) {
        state.stack.pop();
        if (top.hidden) state.hiddenDepth--;
      }
    }
    return;
  }
  if (tag.endsWith('/>')) return;
  const openMatch = /^<([a-z0-9]+)/i.exec(tag);
  if (!openMatch) return;
  const tn = openMatch[1].toLowerCase();
  if (tn === 'br' || tn === 'hr' || tn === 'img' || tn === 'input' || tn === 'meta' || tn === 'link' || tn === 'source' || tn === 'path' || tn === 'circle' || tn === 'line' || tn === 'rect' || tn === 'polygon' || tn === 'polyline') {
    return;
  }
  const isHidden =
    tn === 'details' ||
    /\bhidden\b/i.test(tag) ||
    /\bclass="[^"]*\b(?:solution|we-solution-reveal|pp-hints|pp-hint)\b/i.test(tag);
  state.stack.push({ tag: tn, hidden: isHidden });
  if (isHidden) state.hiddenDepth++;
}

function renderChapterMath(html, pageLabel, opts) {
  if (!html || (html.indexOf('\\(') === -1 && html.indexOf('\\[') === -1)) return html;
  const bodyOpen = /<body\b[^>]*>/i.exec(html);
  if (!bodyOpen) return html;
  const bodyStart = bodyOpen.index + bodyOpen[0].length;
  const bodyCloseIdx = html.lastIndexOf('</body>');
  const bodyEnd = bodyCloseIdx !== -1 ? bodyCloseIdx : html.length;
  const bodyHtml = html.slice(bodyStart, bodyEnd);

  const state = opts
    ? {
        count: 0,
        maxExpressions: typeof opts.maxExpressions === 'number' ? opts.maxExpressions : Infinity,
        maxTexLength: typeof opts.maxTexLength === 'number' ? opts.maxTexLength : 0,
        skipHiddenContainers: Boolean(opts.skipHiddenContainers),
        hiddenDepth: 0,
        stack: [],
      }
    : null;

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
      parts.push(renderChunkMath(bodyHtml.slice(lastIdx, m.index), warn, state));
    }
    updateHiddenState(m[0], state);
    parts.push(m[0]);
    lastIdx = TOKEN_RE.lastIndex;
  }
  if (lastIdx < bodyHtml.length) {
    parts.push(renderChunkMath(bodyHtml.slice(lastIdx), warn, state));
  }
  parts.push(html.slice(bodyEnd));

  if (warnCount > 0) {
    console.warn(`[katex-ssr] ${pageLabel}: ${warnCount} expression(s) left as raw text — see warnings above.`);
  }

  return parts.join('');
}

module.exports = { renderChapterMath, texToSpeech };
