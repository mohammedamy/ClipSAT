/**
 * ClipSAT Forms API  v1.1
 * ════════════════════════════════════════════════════════════════════════
 * Thin wrapper around the Google Forms REST API — plain fetch() calls, no
 * gapi client library. ClipSAT only ever needs 3 Forms endpoints
 * (forms.create, forms.batchUpdate, forms.responses.list), so hand-written
 * wrappers are less code and easier to debug than pulling in the full
 * discovery-doc-driven gapi.client for that.
 *
 * Questions with real math (\( \)/\[ \]) get an actual rendered image on
 * the question stem — via math-image.js's render→Drive-upload pipeline —
 * since Google Forms cannot render LaTeX/KaTeX at all. Answer choices
 * NEVER get an image (the Forms API has no such field on a choice option),
 * so they always go through mathToPlainText() below instead; a question
 * with no math in its text skips the image pipeline entirely (no point
 * rendering a picture of plain English).
 *
 * Scopes required: forms.body (create/edit), forms.responses.readonly
 * (results dashboard), plus math-image.js's drive.file (image uploads) —
 * all requested together by quiz-capture-ui.js whenever any "Create Google
 * Form" action starts. See google-integration.js's incremental-scope design.
 *
 * Public API — window.ClipSATForms
 * ─────────────────────────────────
 *   .SCOPES                        → every scope this module (+ math-image.js) needs
 *   .createFromQuiz(quizData, onProgress?) → Promise<{formId, responderUri, editUri}>
 *       onProgress(done, total) is called as each question's image finishes
 *       rendering/uploading — image rendering is the slow part of this call.
 *   .getResponses(formId)          → Promise<Array of Forms API response objects>
 *   .mathToPlainText(s)            → string — converts \( \)/\[ \] LaTeX source to plain text
 */
(function () {
  'use strict';

  var API = 'https://forms.googleapis.com/v1/forms';
  var SCOPES = [
    'https://www.googleapis.com/auth/forms.body',
    'https://www.googleapis.com/auth/forms.responses.readonly'
  ].concat((window.ClipSATMathImage && window.ClipSATMathImage.SCOPES) || ['https://www.googleapis.com/auth/drive.file']);

  function log(msg) { if (window.CLIPSAT_GOOGLE_DEBUG) { try { console.log('[ClipSATForms]', msg); } catch (e) {} } }

  function authHeaders() {
    var t = window.ClipSATGoogle && window.ClipSATGoogle.getToken();
    if (!t) throw new Error('Not connected to Google — call ClipSATGoogle.ensureScopes() first.');
    return { 'Authorization': 'Bearer ' + t, 'Content-Type': 'application/json' };
  }

  function apiFetch(url, opts) {
    opts = opts || {};
    opts.headers = Object.assign({}, authHeaders(), opts.headers || {});
    return fetch(url, opts).then(function (r) {
      if (r.ok) return r.status === 204 ? {} : r.json();
      return r.json().catch(function () { return {}; }).then(function (body) {
        var msg = (body && body.error && body.error.message) || ('HTTP ' + r.status);
        throw new Error('Google Forms API: ' + msg);
      });
    });
  }

  // Google Forms cannot render math at all, so every question/choice string
  // goes through here first. This is a real (if intentionally modest) LaTeX
  // → plain-text converter, not just a delimiter-stripper — an early version
  // only stripped the outer $…$/\(…\) wrapper and left raw commands like
  // \dfrac{2}{9} or \text{ and } sitting in the text verbatim, which reads as
  // broken, not "plain". \dfrac{a}{b} becomes "a/b", \sqrt{a} becomes "√(a)",
  // \text{…}/\mathrm{…} unwrap to their own content, common symbols (\times,
  // \pi, \le, …) become their real Unicode character, and anything left
  // (\sin, \log, …) just has its backslash dropped so it reads as a plain
  // word. This is NOT the "unicode superscript tricks" this module
  // deliberately avoids elsewhere (stacking ² ³ … for arbitrary multi-digit
  // exponents is genuinely lossy) — turning a fraction bar into "/" or
  // \sqrt{} into "√()" is a safe, meaning-preserving substitution.
  function findMatchingBrace(s, openIdx) {
    var depth = 0;
    for (var i = openIdx; i < s.length; i++) {
      if (s[i] === '{') depth++;
      else if (s[i] === '}') { depth--; if (depth === 0) return i; }
    }
    return -1;
  }

  // Replaces every \cmd{arg1}{arg2}… in s with template(args). Repeats until
  // no more matches so nested commands (e.g. \dfrac{\sqrt{2}}{3}) resolve
  // from the inside out over successive calls in the pipeline below.
  function replaceCmd(s, cmd, argCount, template) {
    var re = new RegExp('\\\\' + cmd + '(?![a-zA-Z])');
    var out = s, m, guard = 0;
    while ((m = re.exec(out)) && guard++ < 300) {
      var start = m.index, pos = start + m[0].length, args = [], ok = true;
      for (var a = 0; a < argCount; a++) {
        while (out[pos] === ' ') pos++;
        if (out[pos] !== '{') { ok = false; break; }
        var close = findMatchingBrace(out, pos);
        if (close === -1) { ok = false; break; }
        args.push(out.slice(pos + 1, close));
        pos = close + 1;
      }
      if (!ok) { out = out.slice(0, start) + out.slice(start + m[0].length); continue; }
      out = out.slice(0, start) + template(args) + out.slice(pos);
    }
    return out;
  }

  var SYMBOLS = [
    ['leq', '≤'], ['le', '≤'], ['geq', '≥'], ['ge', '≥'], ['neq', '≠'], ['ne', '≠'],
    ['times', '×'], ['div', '÷'], ['cdot', '·'], ['pm', '±'], ['mp', '∓'],
    ['approx', '≈'], ['equiv', '≡'], ['infty', '∞'], ['rightarrow', '→'], ['to', '→'],
    ['leftarrow', '←'], ['leftrightarrow', '↔'], ['cup', '∪'], ['cap', '∩'],
    ['in', '∈'], ['notin', '∉'], ['subset', '⊂'], ['subseteq', '⊆'], ['emptyset', '∅'],
    ['angle', '∠'], ['perp', '⊥'], ['parallel', '∥'], ['sum', 'Σ'], ['prod', 'Π'],
    // Longer names first so e.g. \oiint isn't cut short by \oint matching its prefix.
    ['oiiint', '∰'], ['oiint', '∯'], ['iiint', '∭'], ['iint', '∬'], ['oint', '∮'], ['int', '∫'],
    ['partial', '∂'], ['nabla', '∇'], ['degree', '°'],
    ['pi', 'π'], ['theta', 'θ'], ['alpha', 'α'], ['beta', 'β'], ['gamma', 'γ'],
    ['Gamma', 'Γ'], ['delta', 'δ'], ['Delta', 'Δ'], ['lambda', 'λ'], ['mu', 'μ'],
    ['sigma', 'σ'], ['Sigma', 'Σ'], ['phi', 'φ'], ['varphi', 'φ'], ['omega', 'ω'],
    ['Omega', 'Ω'], ['rho', 'ρ'], ['tau', 'τ']
  ];

  // Real Unicode superscript/subscript characters for BARE single-character
  // exponents/indices (x^2, a_n) — safe here specifically because anything
  // more complex than one character already got routed to needsImage()'s
  // image pipeline (see math-image.js's COMPLEX_SCRIPT check) before this
  // function ever sees it; a single digit/letter has no ambiguity to lose.
  // Built from explicit code points (not typed glyphs) so every character
  // is exactly what it says, not whatever a copy/paste happened to carry.
  function cp(code) { return String.fromCodePoint(code); }
  var SUP = {
    '0': cp(0x2070), '1': cp(0x00B9), '2': cp(0x00B2), '3': cp(0x00B3), '4': cp(0x2074),
    '5': cp(0x2075), '6': cp(0x2076), '7': cp(0x2077), '8': cp(0x2078), '9': cp(0x2079),
    '+': cp(0x207A), '-': cp(0x207B), '=': cp(0x207C), '(': cp(0x207D), ')': cp(0x207E),
    'a': cp(0x1D43), 'b': cp(0x1D47), 'c': cp(0x1D9C), 'd': cp(0x1D48), 'e': cp(0x1D49), 'f': cp(0x1DA0),
    'g': cp(0x1D4D), 'h': cp(0x02B0), 'i': cp(0x2071), 'j': cp(0x02B2), 'k': cp(0x1D4F), 'l': cp(0x02E1),
    'm': cp(0x1D50), 'n': cp(0x207F), 'o': cp(0x1D52), 'p': cp(0x1D56), 'r': cp(0x02B3), 's': cp(0x02E2),
    't': cp(0x1D57), 'u': cp(0x1D58), 'v': cp(0x1D5B), 'w': cp(0x02B7), 'x': cp(0x02E3), 'y': cp(0x02B8), 'z': cp(0x1DBB),
    'A': cp(0x1D2C), 'B': cp(0x1D2E), 'D': cp(0x1D30), 'E': cp(0x1D31), 'G': cp(0x1D33), 'H': cp(0x1D34),
    'I': cp(0x1D35), 'J': cp(0x1D36), 'K': cp(0x1D37), 'L': cp(0x1D38), 'M': cp(0x1D39), 'N': cp(0x1D3A),
    'O': cp(0x1D3C), 'P': cp(0x1D3E), 'R': cp(0x1D3F), 'T': cp(0x1D40), 'U': cp(0x1D41), 'V': cp(0x2C7D), 'W': cp(0x1D42),
    // C, F, Q, S, X, Y, Z have no standard uppercase-superscript Unicode
    // character — those (rare as bare exponents) just keep the ^ fallback.
    // ∞ has no distinct superscript glyph either, but unlike a letter it's
    // visually unambiguous on its own — "Σ_{n=0}^∞" reads fine without a
    // marker, so map it to itself: the caret still gets dropped, just with
    // no visual change to the symbol (this is why \sum_{n=0}^\infty, one of
    // the most common upper bounds in this content, is worth special-casing
    // rather than leaving as the only exponent that still shows a bare ^).
    '∞': cp(0x221E)
  };
  var SUB = {
    '0': cp(0x2080), '1': cp(0x2081), '2': cp(0x2082), '3': cp(0x2083), '4': cp(0x2084),
    '5': cp(0x2085), '6': cp(0x2086), '7': cp(0x2087), '8': cp(0x2088), '9': cp(0x2089),
    '+': cp(0x208A), '-': cp(0x208B), '=': cp(0x208C), '(': cp(0x208D), ')': cp(0x208E),
    'a': cp(0x2090), 'e': cp(0x2091), 'h': cp(0x2095), 'i': cp(0x1D62), 'j': cp(0x2C7C), 'k': cp(0x2096),
    'l': cp(0x2097), 'm': cp(0x2098), 'n': cp(0x2099), 'o': cp(0x2092), 'p': cp(0x209A), 'r': cp(0x1D63),
    's': cp(0x209B), 't': cp(0x209C), 'u': cp(0x1D64), 'v': cp(0x1D65), 'x': cp(0x2093),
    // b, c, d, f, g, q, w, y, z have no subscript Unicode equivalent at
    // all — Unicode's subscript letter coverage is inherently incomplete;
    // those keep the _ fallback (still readable, just not "true" subscript).
    '∞': cp(0x221E) // see the SUP map's note on this same entry
  };

  // \mathbb{X} → real Unicode double-struck (blackboard-bold) letters.
  // Most of A–Z live in the contiguous Mathematical Double-Struck block
  // (U+1D538+), but C/H/N/P/Q/R/Z instead use older, separately-assigned
  // legacy code points (ℂℍℕℙℚℝℤ) predating that block — both are checked
  // here explicitly rather than assumed contiguous.
  var MATHBB = {
    A: cp(0x1D538), B: cp(0x1D539), C: cp(0x2102), D: cp(0x1D53B), E: cp(0x1D53C),
    F: cp(0x1D53D), G: cp(0x1D53E), H: cp(0x210D), I: cp(0x1D540), J: cp(0x1D541),
    K: cp(0x1D542), L: cp(0x1D543), M: cp(0x1D544), N: cp(0x2115), O: cp(0x1D546),
    P: cp(0x2119), Q: cp(0x211A), R: cp(0x211D), S: cp(0x1D54A), T: cp(0x1D54B),
    U: cp(0x1D54C), V: cp(0x1D54D), W: cp(0x1D54E), X: cp(0x1D54F), Y: cp(0x1D550), Z: cp(0x2124)
  };

  function mathToPlainText(s) {
    s = String(s == null ? '' : s);
    // Protect genuine literal \{ \} (set notation) from the later generic
    // grouping-brace strip by stashing them first and restoring at the end.
    s = s.replace(/\\\{/g, '').replace(/\\\}/g, '');
    // Outer math-mode delimiters.
    s = s.replace(/\\\[/g, '').replace(/\\\]/g, '')
      .replace(/\\\(/g, '').replace(/\\\)/g, '')
      .replace(/\$\$?/g, '');
    // Sizing commands (\left( \right] …) — drop the command, keep the delimiter.
    s = s.replace(/\\left/g, '').replace(/\\right/g, '');
    // LaTeX itself adds visual spacing around commands like \frac and \oint
    // even with no literal space in the source — plain text needs that
    // spacing made explicit, or two converted tokens run together unreadably
    // (e.g. "\frac{1}{2}\oint(...)" → "1/2∮(...)" with no gap at all).
    // Ensure at least one space before a following backslash command — but
    // ONLY when the preceding character genuinely ends a token (a letter,
    // digit, or closing bracket). A blacklist approach here (space unless
    // whitespace/open-bracket/^/_) also matched operators like "-", so
    // "{-\infty}" got a space shoved inside it ("- \infty") and then failed
    // the superscript converter's "every character maps" check. Operators,
    // ^, _, and open brackets all mean "still building up one argument" —
    // never insert a space there.
    s = s.replace(/([a-zA-Z0-9)}=])(\\[a-zA-Z])/g, '$1 $2');
    // Fractions and roots — do a few passes so nested cases resolve.
    for (var pass = 0; pass < 4; pass++) {
      s = replaceCmd(s, 'dfrac', 2, function (a) { return wrapFracPart(a[0]) + '/' + wrapFracPart(a[1]); });
      s = replaceCmd(s, 'frac', 2, function (a) { return wrapFracPart(a[0]) + '/' + wrapFracPart(a[1]); });
      s = replaceCmd(s, 'tfrac', 2, function (a) { return wrapFracPart(a[0]) + '/' + wrapFracPart(a[1]); });
      s = replaceCmd(s, 'sqrt', 1, function (a) { return '√(' + a[0] + ')'; });
    }
    // Text/formatting wrappers — just unwrap to their own content.
    ['text', 'mathrm', 'mathbf', 'mathit', 'textbf', 'textit', 'operatorname', 'mbox'].forEach(function (cmd) {
      for (var i = 0; i < 3; i++) s = replaceCmd(s, cmd, 1, function (a) { return a[0]; });
    });
    // \mathbb{R} (blackboard-bold, i.e. the real numbers / ℝ, ℂ, ℤ, ℚ, ℕ, …
    // set-notation letters) — extremely common in this content and had no
    // handling at all before, so it fell all the way through to the generic
    // word-command fallback and came out as "mathbbR" stuck together (same
    // failure shape as \vec{v} → "vecv" before that got its own fix).
    // Real Unicode double-struck letters where they exist (all of A–Z do,
    // some via dedicated legacy code points rather than the contiguous
    // math-alphanumeric block); falls back to the bare letter, still
    // correct just not bold-doubled, for anything this map doesn't cover
    // (mathbb applied to something other than a single letter).
    for (var bb = 0; bb < 3; bb++) {
      s = replaceCmd(s, '(?:mathbb|Bbb)', 1, function (a) { return MATHBB[a[0]] || a[0]; });
    }
    // Single-letter accents/decorations (vectors, unit normals, means, …) —
    // without this, \vec{v} fell through to the generic word-command
    // fallback below and came out as "vecv" (backslash dropped, but the
    // command NAME left as a bare word jammed against its own argument,
    // same class of bug \displaystyle had). A trailing Unicode combining
    // mark is the best plain-text can do for "arrow/hat/bar over a letter"
    // — it renders correctly in most fonts, and degrades to at-worst an
    // adjacent mark rather than a nonsense word.
    var ACCENTS = { vec: '⃗', overrightarrow: '⃗', hat: '̂', widehat: '̂',
      bar: '̄', overline: '̄', dot: '̇', ddot: '̈', tilde: '̃', widetilde: '̃' };
    Object.keys(ACCENTS).forEach(function (cmd) {
      for (var i = 0; i < 3; i++) s = replaceCmd(s, cmd, 1, function (a) { return a[0] + ACCENTS[cmd]; });
    });
    // \underline{X} has no good combining-mark equivalent that reads well
    // inline — just unwrap to the content rather than leave it unhandled.
    for (var u = 0; u < 3; u++) s = replaceCmd(s, 'underline', 1, function (a) { return a[0]; });
    // Known symbols (longest-name variants first so \leq/\neq aren't cut short by \le/\ne).
    SYMBOLS.forEach(function (pair) {
      s = s.replace(new RegExp('\\\\' + pair[0] + '(?![a-zA-Z])', 'g'), pair[1]);
    });
    s = s.replace(/\\%/g, '%');
    // Thin-space / spacing commands.
    s = s.replace(/\\[!,;:]|\\quad|\\qquad/g, ' ');
    // Mode-switch / layout commands that carry no visible meaning of their
    // own (\displaystyle, \limits, …) — must be dropped ENTIRELY, not run
    // through the generic word-command fallback below, which would leave
    // the bare word "displaystyle" sitting in the text (a real bug this
    // fixes: "\dfrac{d}{dx}\displaystyle\int" was rendering as
    // "d/dxdisplaystyle∫" instead of "d/dx ∫").
    s = s.replace(/\\(displaystyle|textstyle|scriptstyle|scriptscriptstyle|limits|nolimits|noindent|relax)(?![a-zA-Z])/g, '');
    // Anything left that's a plain word command (\sin, \log, \ln, \lim, …) —
    // just drop the backslash so it reads as the word it already looks like.
    s = s.replace(/\\([a-zA-Z]+)/g, '$1');
    // Superscripts/subscripts → real Unicode characters instead of a bare
    // ^/_ marker. Braced groups (x^{12}) convert in full when every
    // character inside has a Unicode equivalent (digits always do; mixed
    // content like {2x+1} doesn't, and falls back to ^(2x+1) rather than
    // silently dropping the grouping those braces were doing); bare single
    // characters (x^2, a_n) convert directly. This MUST run before the
    // indiscriminate brace-strip below, which would otherwise erase the
    // very grouping info this needs to tell "x^{12}" apart from "x^1" + "2".
    function convertScript(map, fallbackOpen, fallbackClose) {
      return function (full, braced, bare) {
        var body = braced != null ? braced : bare;
        var all = body.split('').every(function (ch) { return map[ch] !== undefined; });
        if (all) return body.split('').map(function (ch) { return map[ch]; }).join('');
        return braced != null ? (fallbackOpen + body + fallbackClose) : full;
      };
    }
    s = s.replace(/\^\{([^{}]+)\}|\^([0-9a-zA-Z+\-=()∞])/g, convertScript(SUP, '^(', ')'));
    s = s.replace(/_\{([^{}]+)\}|_([0-9a-zA-Z+\-=()∞])/g, convertScript(SUB, '_(', ')'));
    // Whatever braces remain at this point are pure LaTeX grouping (e.g. an
    // argument some other command already consumed the meaning of) — safe
    // to drop now.
    s = s.replace(/[{}]/g, '');
    // Restore literal set-notation braces.
    s = s.replace(//g, '{').replace(//g, '}');
    return s.replace(/\s+/g, ' ').trim();
  }

  // Wrap a fraction's numerator/denominator in parens only when it actually
  // needs it (contains a +/- so "a/b" doesn't turn a-1/b+1 into something
  // that reads like a - (1/b) + 1) — plain digits/letters stay bare.
  function wrapFracPart(s) {
    return /[+\-]/.test(s) ? '(' + s + ')' : s;
  }

  // The Forms API hard-rejects a RADIO question whose options have two
  // identical values (whole batchUpdate fails, not just that one item) —
  // and that's a real risk once rich LaTeX gets flattened to plain text:
  // two choices that look different in source (\le vs \leq, or just two
  // distinct expressions that happen to simplify to the same short string)
  // can legitimately collide after mathToPlainText(). Rather than let one
  // colliding question break the entire form, make every duplicate past
  // the first unique with a trailing zero-width space — invisible to a
  // student reading the form, but a distinct string as far as the API (and
  // the grading answer-key lookup, which reads value off this same array)
  // are concerned. The correct-answer's own value is read from this same
  // array after dedup, so grading stays correct automatically.
  function dedupeOptionValues(options) {
    var counts = {};
    options.forEach(function (opt) {
      var base = opt.value;
      counts[base] = (counts[base] || 0) + 1;
      if (counts[base] > 1) opt.value = base + new Array(counts[base]).join('​');
    });
    return options;
  }

  // Builds the Image object Forms expects, explicitly telling it what
  // width to display the image at (math-image.js hands back the rendered
  // content's own natural pixel width, since the container shrink-wraps to
  // its content). Without this, a short answer choice's image — mostly
  // whitespace-free but still just one small element among a page of UI —
  // could get displayed far smaller than its own content warrants; asking
  // for it explicitly avoids leaving that entirely up to Forms' own
  // default sizing. 740 is the API's documented max; a small floor keeps a
  // render that came back oddly tiny from being unreadably small anyway.
  function imageObj(img, altText) {
    var width = Math.max(80, Math.min(740, img.width || 400));
    return { sourceUri: img.sourceUri, altText: altText, properties: { width: width } };
  }

  // quizData: { title, questions: [{text, choices:[], correctIndex, type:'mcq'|'frq', points}] }
  // Runs `fn` over `items` with at most `limit` in flight at once — a full
  // exam can have 50+ questions, and firing render+upload for all of them
  // simultaneously would hammer both html2canvas (CPU) and the Drive API
  // (rate limits) at once.
  function mapLimit(items, limit, fn) {
    var results = new Array(items.length);
    var next = 0, active = 0;
    return new Promise(function (resolve) {
      if (!items.length) { resolve(results); return; }
      function pump() {
        while (active < limit && next < items.length) {
          (function (i) {
            active++;
            fn(items[i], i).then(function (r) { results[i] = r; }).catch(function () { results[i] = null; }).then(function () {
              active--;
              if (next >= items.length && active === 0) resolve(results);
              else pump();
            });
          })(next++);
        }
      }
      pump();
    });
  }

  function createFromQuiz(quizData, onProgress) {
    var title = quizData.title || 'ClipSAT Quiz';
    var questions = quizData.questions || [];
    var mathImg = window.ClipSATMathImage;

    // Google Forms' Option object genuinely does support an image
    // (Option.image, alongside the required text value) — not just the
    // question stem. So the render pipeline runs over BOTH: every
    // question's stem text AND every individual choice, each independently
    // checked with needsImage() (only truly complex math gets an image;
    // "x²" or "2x+3" is left as the already-good plain text). One flat job
    // list keeps this one bounded-concurrency pass instead of two.
    var jobs = [];
    questions.forEach(function (q, qi) {
      if (mathImg && mathImg.needsImage(q.text)) jobs.push({ qi: qi, ci: null, text: q.text });
      if (q.type !== 'frq' && q.choices) {
        q.choices.forEach(function (c, ci) {
          if (mathImg && mathImg.needsImage(c)) jobs.push({ qi: qi, ci: ci, text: c });
        });
      }
    });
    var totalImages = jobs.length, doneImages = 0;

    var imagesReady = mapLimit(jobs, 4, function (job) {
      return mathImg.renderQuestionImage(job.text).then(function (img) {
        doneImages++;
        if (onProgress) onProgress(doneImages, totalImages);
        return img;
      });
    }).then(function (results) {
      // Index results back into {stemImages[qi], choiceImages[qi][ci]} so the
      // build loop below can look each one up in O(1) instead of re-scanning.
      // A job whose result is null despite needsImage() saying yes is a real
      // failure (network/render/upload — see math-image.js's console
      // warnings for which), not a "this math was simple enough" skip —
      // track it so the caller can tell the teacher, instead of it silently
      // looking identical to an intentional plain-text choice.
      var stemImages = {}, choiceImages = {}, failedImages = 0;
      jobs.forEach(function (job, idx) {
        if (!results[idx]) { failedImages++; return; }
        if (job.ci == null) stemImages[job.qi] = results[idx];
        else { choiceImages[job.qi] = choiceImages[job.qi] || {}; choiceImages[job.qi][job.ci] = results[idx]; }
      });
      return { stemImages: stemImages, choiceImages: choiceImages, failedImages: failedImages, totalImages: totalImages };
    });

    return imagesReady.then(function (imgs) {
      return apiFetch(API, {
        method: 'POST',
        body: JSON.stringify({ info: { title: title, documentTitle: title } })
      }).then(function (form) {
        var formId = form.formId;
        var requests = [];
        // Turn on quiz mode so per-question `grading` blocks (correct answers
        // + point values, added below) are accepted by batchUpdate at all.
        requests.push({
          updateSettings: {
            settings: { quizSettings: { isQuiz: true } },
            updateMask: 'quizSettings.isQuiz'
          }
        });

        questions.forEach(function (q, i) {
          var qText = mathToPlainText(q.text);
          var question;
          if (q.type !== 'frq' && q.choices && q.choices.length) {
            var options = q.choices.map(function (c) { return { value: mathToPlainText(c) }; });
            dedupeOptionValues(options);
            var qChoiceImages = imgs.choiceImages[i] || {};
            options.forEach(function (opt, ci) {
              if (qChoiceImages[ci]) opt.image = imageObj(qChoiceImages[ci], opt.value);
            });
            question = {
              required: false,
              choiceQuestion: { type: 'RADIO', options: options, shuffle: false }
            };
            if (q.correctIndex != null && q.correctIndex >= 0 && q.correctIndex < options.length) {
              question.grading = {
                pointValue: q.points || 1,
                correctAnswers: { answers: [{ value: options[q.correctIndex].value }] }
              };
            }
          } else {
            question = { required: false, textQuestion: { paragraph: true } };
          }
          var item = { title: qText, questionItem: { question: question } };
          if (imgs.stemImages[i]) item.questionItem.image = imageObj(imgs.stemImages[i], qText);
          requests.push({ createItem: { item: item, location: { index: i } } });
        });

        return apiFetch(API + '/' + formId + ':batchUpdate', {
          method: 'POST',
          body: JSON.stringify({ requests: requests })
        }).then(function () {
          return apiFetch(API + '/' + formId).then(function (full) {
            return { formId: formId, responderUri: full.responderUri, editUri: 'https://docs.google.com/forms/d/' + formId + '/edit',
              failedImages: imgs.failedImages, totalImages: imgs.totalImages };
          });
        });
      });
    });
  }

  function getResponses(formId) {
    return apiFetch(API + '/' + formId + '/responses').then(function (r) {
      return r.responses || [];
    });
  }

  window.ClipSATForms = {
    SCOPES: SCOPES,
    createFromQuiz: createFromQuiz,
    getResponses: getResponses,
    mathToPlainText: mathToPlainText
  };
})();
