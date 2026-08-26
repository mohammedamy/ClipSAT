/**
 * ClipSAT Math Image Renderer  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * Renders a question's real math (the same \( \)/\[ \] KaTeX source used
 * everywhere else on the site) into an actual PNG, then uploads it to the
 * signed-in teacher's own Google Drive so Google Forms can display it —
 * Forms itself has zero math-rendering support, and its API only accepts
 * an *image* on a question stem (never on individual answer choices, which
 * is a hard Forms limitation — see forms-api.js's plain-text converter for
 * those instead).
 *
 * Pipeline per question: render (hidden DOM + KaTeX auto-render, exactly
 * like the rest of the site) → rasterize (html2canvas, lazy-loaded) →
 * upload (Drive multipart upload) → make link-viewable (Drive permission)
 * → hand back a stable https://drive.google.com/uc?... URL for forms-api.js
 * to attach as the question's image.
 *
 * Every step degrades gracefully: if rendering, upload, or the permission
 * call fails for one question, that question just falls back to plain text
 * — one bad image never fails the whole form.
 *
 * Scope required: drive.file (only ever touches files this app created —
 * requested together with the Forms scopes, see forms-api.js's SCOPES).
 *
 * Public API — window.ClipSATMathImage
 * ─────────────────────────────────────
 *   .hasMath(text)                 → bool — does this string contain \( \) or \[ \]? (loose)
 *   .needsImage(text)              → bool — is the math complex enough that plain text
 *                                    genuinely isn't good enough? (the actual gate used
 *                                    to decide whether to render+upload an image at all)
 *   .renderQuestionImage(text)     → Promise<{sourceUri}> | Promise<null> on failure
 */
(function () {
  'use strict';

  var H2C_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  var DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3/files';
  var DRIVE_API = 'https://www.googleapis.com/drive/v3/files';

  // \( \)/\[ \] match the site's own KaTeX auto-render config (build.js's
  // baseNjk) for bank-data-sourced quizzes. $ $/$$ $$ are ALSO required —
  // discovered live: worksheet-sourced content (tools/worksheet_gen/topics/
  // — the PDF generator's own math convention, matplotlib-mathtext style,
  // completely separate from bank-data's \(\) convention) uses bare $ $
  // exclusively. Without this, KaTeX's auto-render never found the math in
  // worksheet questions at all, and html2canvas just rasterized the raw,
  // un-typeset "$\dfrac{7}{8}\div\dfrac{7}{4}$" source as the "image." $$
  // must be listed before single $ so a display-math $$...$$ span isn't
  // mis-split by the single-$ matcher first.
  var KATEX_OPTS = {
    delimiters: [
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: false
  };

  var _h2cReady = null;
  function loadHtml2Canvas() {
    if (_h2cReady) return _h2cReady;
    _h2cReady = new Promise(function (resolve, reject) {
      if (window.html2canvas) { resolve(); return; }
      var s = document.createElement('script');
      s.src = H2C_SRC;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load the image-rendering library.')); };
      document.head.appendChild(s);
    });
    return _h2cReady;
  }

  function escHtml(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Real bank-data isn't consistent about wrapping every choice in \( \)/
  // \[ \] — several entries write bare LaTeX like "3x^{5}+2x^{3}" as a
  // choice with no delimiters at all (confirmed directly in bank-data/
  // calculus.json). Checking only for \(/\[ meant those choices could
  // NEVER be considered for an image, no matter how complex the math
  // actually was — this also looks for an actual LaTeX command (\foo) or a
  // braced script (^{...}/_{...}), which catches undelimited math too.
  function hasMath(text) {
    return /\\\(|\\\[|\\[a-zA-Z]|[\^_]\{/.test(String(text || ''));
  }

  // "Contains math delimiters" is NOT the same question as "actually needs
  // a rendered image" — most bank-data questions wrap even a bare single
  // variable in \( \), and mathToPlainText() already turns that into
  // perfectly readable plain text (x, 2x+3, π, x², √16, …). Firing a full
  // render→Drive-upload round trip for those is both slow and pointless —
  // worse, it visually clutters a simple question with an unnecessary
  // boxed image sitting under already-fine text. Only trigger the image
  // pipeline for constructs that plain text genuinely can't represent well:
  // fractions, radicals, sums/integrals/limits, matrices/cases, vectors, or
  // a superscript/subscript complex enough that "^"/"_" notation gets
  // ambiguous (e.g. x^{2x+1}, not just x^2).
  var HARD_COMMANDS = /\\(d?frac|tfrac|cfrac|sqrt|int|iint|iiint|oint|sum|prod|lim|binom|vec|hat|bar|overline|underline|overrightarrow|overleftarrow|begin)(?![a-zA-Z])/;
  var COMPLEX_SCRIPT = /[\^_]\{[^{}]{2,}\}/; // e.g. x^{2x+1} or a_{n+1} — bare x^2/a_n don't match

  function needsImage(text) {
    text = String(text || '');
    if (!hasMath(text)) return false;
    return HARD_COMMANDS.test(text) || COMPLEX_SCRIPT.test(text);
  }

  // Always-on (not gated behind CLIPSAT_GOOGLE_DEBUG) — every failure here
  // used to silently degrade to plain text with zero trace anywhere, which
  // made a real rendering bug indistinguishable from "this math was simple
  // enough to skip on purpose." A teacher/dev can now at least find out
  // something failed by opening devtools, instead of it just looking like
  // the feature quietly didn't apply.
  function warn(msg, text) {
    try { console.warn('[ClipSATMathImage] ' + msg + (text != null ? ' — text: ' + text : '')); } catch (e) {}
  }

  var SCALE = 3; // extra resolution headroom in case Forms downscales further

  // Renders `text` (raw \( \)/\[ \] source, same as bank-data) into a PNG
  // Blob + its logical (non-retina) pixel width. Resolves null (never
  // rejects) so callers can fall back cleanly.
  //
  // Container is shrink-to-fit (inline-block, no fixed width) rather than a
  // constant 600px box — a short answer choice like "e^{-zt}t^{b-1}dt" in a
  // fixed-width box left most of the canvas blank, so whatever size Forms
  // ultimately displayed it at, the actual glyphs occupied a tiny fraction
  // of it. Shrink-wrapping means every pixel of the image is real content,
  // so the same final display width reads far larger. max-width only kicks
  // in for genuinely long question stems that need to wrap.
  function renderToPngBlob(text) {
    return loadHtml2Canvas().then(function () {
      return new Promise(function (resolve) {
        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;left:-99999px;top:0;background:#ffffff;'
          + 'display:inline-block;padding:14px 18px;max-width:640px;box-sizing:border-box;'
          + 'font-family:Georgia,"Times New Roman",serif;font-size:26px;line-height:1.5;color:#111;';
        // KaTeX's auto-render only typesets what's inside a recognized
        // delimiter pair — it has no other way to know where the math is.
        // Bank data isn't always wrapped that way (some choices are bare
        // LaTeX, e.g. "3x^{5}+2x^{3}" with no delimiters at all); without
        // this, needsImage() saying yes for that text would just rasterize
        // the raw, un-typeset LaTeX source as the "image". Must check for
        // an existing $ delimiter too, not just \(/\[ — worksheet-sourced
        // text already uses $...$ around JUST its math spans (e.g. "Compute
        // $\dfrac{7}{8}$."); blindly wrapping the WHOLE string in an outer
        // \( \) would nest math-mode incorrectly and mangle it further.
        var wrapped = hasMath(text) && !/\\\(|\\\[|\$/.test(text) ? '\\(' + text + '\\)' : text;
        container.innerHTML = escHtml(wrapped);
        document.body.appendChild(container);

        function cleanup() { if (container.parentNode) container.parentNode.removeChild(container); }

        try { window.renderMathInElement(container, KATEX_OPTS); } catch (e) { warn('KaTeX render threw: ' + e.message, text); cleanup(); resolve(null); return; }

        var go = function () {
          window.html2canvas(container, { backgroundColor: '#ffffff', scale: SCALE }).then(function (canvas) {
            canvas.toBlob(function (blob) {
              cleanup();
              if (!blob) { warn('canvas.toBlob produced no image (possibly a tainted/zero-size canvas)', text); resolve(null); return; }
              resolve({ blob: blob, width: Math.round(canvas.width / SCALE) });
            }, 'image/png');
          }).catch(function (err) { warn('html2canvas failed: ' + (err && err.message), text); cleanup(); resolve(null); });
        };
        // Wait for the KaTeX webfont to actually be usable before rasterizing
        // — otherwise glyphs can be missing/fallback in the captured canvas.
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(go, 60); });
        else setTimeout(go, 300);
      });
    }).catch(function (err) { warn('Failed to load the image-rendering library: ' + (err && err.message), text); return null; });
  }

  function arrayBufferToBase64(buffer) {
    var binary = '', bytes = new Uint8Array(buffer);
    for (var i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function authHeader() {
    var t = window.ClipSATGoogle && window.ClipSATGoogle.getToken();
    if (!t) throw new Error('Not connected to Google.');
    return 'Bearer ' + t;
  }

  function driveErrorMessage(r, body) {
    return (body && body.error && body.error.message) || ('HTTP ' + r.status);
  }

  function uploadToDrive(blob, filename) {
    return blob.arrayBuffer().then(function (buf) {
      var boundary = 'clipsat-' + Math.random().toString(36).slice(2);
      var delimiter = '\r\n--' + boundary + '\r\n';
      var closeDelim = '\r\n--' + boundary + '--';
      var metadata = { name: filename, mimeType: 'image/png' };
      var body = delimiter
        + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(metadata)
        + delimiter
        + 'Content-Type: image/png\r\nContent-Transfer-Encoding: base64\r\n\r\n' + arrayBufferToBase64(buf)
        + closeDelim;
      return fetch(DRIVE_UPLOAD_API + '?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: { 'Authorization': authHeader(), 'Content-Type': 'multipart/related; boundary="' + boundary + '"' },
        body: body
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (json) {
          if (!r.ok || !json.id) throw new Error('Drive upload failed: ' + driveErrorMessage(r, json));
          return json.id;
        });
      });
    });
  }

  function makePublic(fileId) {
    return fetch(DRIVE_API + '/' + fileId + '/permissions', {
      method: 'POST',
      headers: { 'Authorization': authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'reader', type: 'anyone' })
    }).then(function (r) {
      if (r.ok) return fileId;
      return r.json().catch(function () { return {}; }).then(function (json) {
        throw new Error('Could not make the uploaded image link-viewable: ' + driveErrorMessage(r, json));
      });
    });
  }

  // Full pipeline for one question/choice. Never rejects — resolves null on
  // any failure so the caller can fall back to plain text for just that one
  // item, but every failure is logged (see warn()) so it's diagnosable
  // instead of being indistinguishable from "this math didn't need an image."
  function renderQuestionImage(text) {
    return renderToPngBlob(text).then(function (rendered) {
      if (!rendered) return null; // renderToPngBlob already warned about the specific cause
      return uploadToDrive(rendered.blob, 'clipsat-question-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.png')
        .then(makePublic)
        .then(function (fileId) { return { sourceUri: 'https://drive.google.com/uc?export=view&id=' + fileId, width: rendered.width }; })
        .catch(function (err) { warn(err && err.message, text); return null; });
    }).catch(function (err) { warn('Unexpected error: ' + (err && err.message), text); return null; });
  }

  window.ClipSATMathImage = {
    SCOPES: ['https://www.googleapis.com/auth/drive.file'],
    hasMath: hasMath,
    needsImage: needsImage,
    renderQuestionImage: renderQuestionImage
  };
})();
