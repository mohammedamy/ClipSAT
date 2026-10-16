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
 * → hand back the uploaded file's thumbnailLink (Google's documented,
 * reliably-fetchable URL for this — see imageFetchUrl()'s comment for why
 * NOT the more obvious drive.google.com/uc?export=view pattern) for
 * forms-api.js to attach as the question's image.
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
    var s = String(text || '');
    if (!s) return false;
    if (/\\\(|\\\[|\$\$|\$(?!\s*\d+(?:\.\d+)?(?:\s|$))/.test(s)) return true;
    if (/\\[a-zA-Z]|[\^_]\{?[\w+-]+/.test(s)) return true;
    if (/[\^_{}±≤≥≠≈√πθ∞×÷·°]/.test(s)) return true;
    if (/\b(sin|cos|tan|sec|csc|cot|log|ln|lim)\b/.test(s)) return true;
    return false;
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

  function needsImage(text, figure, figureHtml) {
    if (figure || figureHtml) return true;
    text = String(text || '');
    return hasMath(text);
  }

  function needsChoiceImage(text) {
    var s = String(text || '').trim();
    if (!s) return false;
    if ((s.startsWith('\\(') && s.endsWith('\\)')) || (s.startsWith('\\[') && s.endsWith('\\]'))) {
      s = s.slice(2, -2).trim();
    } else if (s.startsWith('$') && s.endsWith('$') && s.length > 2) {
      s = s.slice(1, -1).trim();
    }
    if (/^[-+]?\d+(?:\.\d+)?%?$/.test(s)) return false;
    if (/^[-+]?[a-zA-Z]$/.test(s)) return false;
    if (/^\(\s*[-+]?[0-9.]+\s*,\s*[-+]?[0-9.]+\s*\)$/.test(s)) return false;
    var words = s.match(/[a-zA-Z]{2,}/g) || [];
    var mathFns = {sin:1, cos:1, tan:1, sec:1, csc:1, cot:1, log:1, ln:1, lim:1, exp:1, frac:1, sqrt:1};
    if (words.length >= 2 && words.every(function(w){ return !mathFns[w.toLowerCase()]; }) && !/[\\^_{}√±≤≥≠≈πθ∞×÷]/.test(s)) {
      return false;
    }
    return /\\(frac|sqrt|int|sum|prod|lim|begin|vec|overline)|[\^_]|\\[a-zA-Z]|[\^_{}±≤≥≠≈√πθ∞×÷·°]/.test(s);
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

  var COMPLEX_MATH = /\\(d?frac|tfrac|cfrac|sqrt|int|iint|iiint|oint|sum|prod|lim|binom|vec|hat|bar|overline|underline|overrightarrow|overleftarrow|begin|matrix|pmatrix|bmatrix|cases)(?![a-zA-Z])/;

  function hasComplexMath(text) {
    if (!text) return false;
    var s = String(text);
    return COMPLEX_MATH.test(s) || COMPLEX_SCRIPT.test(s);
  }

  function sanitizeSvg(svgStr) {
    if (!svgStr || typeof svgStr !== 'string') return '';
    var s = svgStr;
    var colorMap = {
      '--fig-indigo': '#1E3A6E',
      '--fig-indigo-2': '#2B5BA8',
      '--fig-indigo-soft': 'rgba(30,58,110,0.08)',
      '--fig-amber': '#C8902A',
      '--fig-amber-text': '#8A6017',
      '--fig-amber-soft': 'rgba(200,144,42,0.16)',
      '--fig-teal': '#0e9f8f',
      '--fig-ink': '#0E1726',
      '--fig-muted': '#5a6577',
      '--fig-grid': '#c9d4e8',
      '--fig-border': '#dde4f0',
      '--fig-bg': '#ffffff',
      '--paper': '#ffffff',
      '--paper-2': '#f8fafc',
      '--font-sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };
    Object.keys(colorMap).forEach(function (varName) {
      var re = new RegExp('var\\(' + varName + '(?:,\\s*[^)]+)?\\)', 'g');
      s = s.replace(re, colorMap[varName]);
    });
    if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/i.test(s)) {
      s = s.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    return s;
  }

  function extractSvg(str) {
    if (!str || typeof str !== 'string') return null;
    var m = str.match(/<svg[\s\S]*?<\/svg>/i);
    return m ? m[0] : null;
  }

  function getSvgDimensions(svgStr) {
    var wMatch = svgStr.match(/\bwidth=["']?(\d+(?:\.\d+)?)/i);
    var hMatch = svgStr.match(/\bheight=["']?(\d+(?:\.\d+)?)/i);
    var vbMatch = svgStr.match(/\bviewBox=["']?[-\d.]+\s+[-\d.]+\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/i);
    var w = wMatch ? Math.round(parseFloat(wMatch[1])) : (vbMatch ? Math.round(parseFloat(vbMatch[1])) : 320);
    var h = hMatch ? Math.round(parseFloat(hMatch[1])) : (vbMatch ? Math.round(parseFloat(vbMatch[2])) : 220);
    return { w: Math.max(40, w), h: Math.max(40, h) };
  }

  function renderSvgDirect(svgStr, scale) {
    scale = scale || SCALE;
    return new Promise(function (resolve) {
      if (typeof window === 'undefined' || typeof document === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) {
        resolve(null);
        return;
      }
      try {
        var cleanSvg = sanitizeSvg(svgStr);
        var dims = getSvgDimensions(cleanSvg);
        var w = dims.w, h = dims.h;

        if (!/\bwidth=/i.test(cleanSvg)) cleanSvg = cleanSvg.replace(/<svg\b/i, '<svg width="' + w + '"');
        if (!/\bheight=/i.test(cleanSvg)) cleanSvg = cleanSvg.replace(/<svg\b/i, '<svg height="' + h + '"');

        var blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var img = new Image();

        img.onload = function () {
          try {
            URL.revokeObjectURL(url);
            var canvas = document.createElement('canvas');
            canvas.width = Math.round(w * scale);
            canvas.height = Math.round(h * scale);
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(function (pngBlob) {
              if (!pngBlob) { resolve(null); return; }
              resolve({ blob: pngBlob, width: w });
            }, 'image/png');
          } catch (e) {
            URL.revokeObjectURL(url);
            resolve(null);
          }
        };
        img.onerror = function () {
          URL.revokeObjectURL(url);
          resolve(null);
        };
        img.src = url;
      } catch (err) {
        resolve(null);
      }
    });
  }

  function svgToDataImgTag(svgStr) {
    var cleanSvg = sanitizeSvg(svgStr);
    var dims = getSvgDimensions(cleanSvg);
    var b64 = '';
    try {
      if (typeof btoa !== 'undefined') b64 = btoa(unescape(encodeURIComponent(cleanSvg)));
    } catch (e) {}
    var src = b64 ? 'data:image/svg+xml;base64,' + b64 : 'data:image/svg+xml;utf8,' + encodeURIComponent(cleanSvg);
    return '<img src="' + src + '" width="' + dims.w + '" height="' + dims.h + '" style="display:block;margin:0 auto;width:' + dims.w + 'px;height:' + dims.h + 'px;max-width:100%;box-sizing:border-box;" alt="Diagram">';
  }

  function ensureFiguresReady() {
    if (window._renderFig && window.renderMathFigure) return Promise.resolve();
    if (typeof window._ensureFigures === 'function') {
      return window._ensureFigures().catch(function () {});
    }
    return Promise.resolve();
  }

  function renderToPngBlob(text, figure, figureHtml) {
    return ensureFiguresReady().then(function () {
      var figHtml = '';
      if (figureHtml && typeof figureHtml === 'string' && figureHtml.trim()) {
        figHtml = figureHtml;
      } else if (figure) {
        if (typeof figure === 'string') {
          figHtml = figure;
        } else if (figure.type === 'table' || figure.headers || figure.rows || figure.data) {
          var hdrs = (figure.headers || []).map(function (h) {
            return '<th>' + escHtml(String(h != null ? h : '')) + '</th>';
          }).join('');
          var rws = (figure.rows || figure.data || []).map(function (r) {
            return '<tr>' + (Array.isArray(r) ? r.map(function (c) {
              return '<td>' + escHtml(String(c != null ? c : '')) + '</td>';
            }).join('') : '<td>' + escHtml(String(r != null ? r : '')) + '</td>') + '</tr>';
          }).join('');
          figHtml = '<table class="exam-table">' + (hdrs ? '<thead><tr>' + hdrs + '</tr></thead>' : '') + '<tbody>' + rws + '</tbody></table>';
        } else if (window._renderFig) {
          figHtml = window._renderFig(figure);
        } else if (window.renderMathFigure) {
          figHtml = window.renderMathFigure(figure);
        }
      }

      var extractedSvg = extractSvg(figHtml);

      // Fast, pristine path: If figure is purely an SVG and text has no complex math (e.g. coordinates or simple question stem),
      // render the SVG directly using native canvas image rasterization with zero html2canvas distortion.
      if (extractedSvg && !hasComplexMath(text)) {
        return renderSvgDirect(extractedSvg, SCALE).then(function (res) {
          if (res) return res;
          return renderWithHtml2Canvas(text, figHtml);
        });
      }

      return renderWithHtml2Canvas(text, figHtml);
    });
  }

  function renderWithHtml2Canvas(text, figHtml) {
    return loadHtml2Canvas().then(function () {
      return new Promise(function (resolve) {
        var container = document.createElement('div');
        // Place in off-screen viewport with valid 0,0 origins so html2canvas computes perfect matrices
        container.style.cssText = 'position:fixed;left:0;top:0;z-index:-99999;pointer-events:none;background:#ffffff;'
          + 'display:inline-block;padding:16px 20px;max-width:640px;box-sizing:border-box;'
          + 'font-family:Georgia,"Times New Roman",serif;font-size:24px;line-height:1.5;color:#111;';

        container.style.setProperty('--fig-indigo', '#1E3A6E');
        container.style.setProperty('--fig-indigo-2', '#2B5BA8');
        container.style.setProperty('--fig-indigo-soft', 'rgba(30,58,110,0.08)');
        container.style.setProperty('--fig-amber', '#C8902A');
        container.style.setProperty('--fig-amber-text', '#8A6017');
        container.style.setProperty('--fig-amber-soft', 'rgba(200,144,42,0.16)');
        container.style.setProperty('--fig-teal', '#0e9f8f');
        container.style.setProperty('--fig-ink', '#0E1726');
        container.style.setProperty('--fig-muted', '#5a6577');
        container.style.setProperty('--fig-grid', '#c9d4e8');
        container.style.setProperty('--fig-border', '#dde4f0');
        container.style.setProperty('--fig-bg', '#ffffff');
        container.style.setProperty('--paper', '#ffffff');

        var isArabic = /[\u0600-\u06FF]/.test(String(text || ''));

        var styles = '<style>'
          + '.exam-table { border-collapse: collapse; margin: 8px auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; border: 1px solid #999; }'
          + '.exam-table th, .exam-table td { border: 1px solid #999; padding: 6px 12px; text-align: center; }'
          + '.exam-table th { background: #e8edf8; color: #1a1a2e; font-weight: bold; }'
          + '.clipsat-fig-wrap { display: block; margin: 10px auto 0; text-align: center; width: 100%; }'
          + '.clipsat-fig-wrap img, .clipsat-fig-wrap svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }'
          + '</style>';

        var inner = '';
        if (text) {
          var autoMath = window.CSAutoMath || function (s) { return s; };
          var processedText = autoMath(text);
          var wrapped = hasMath(processedText) && !/\\\(|\\\[|\$/.test(processedText) ? '\\(' + processedText + '\\)' : processedText;
          wrapped = wrapped.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');
          wrapped = wrapped.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, function(m, innerM){
            if(/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(innerM)) return m;
            return '\\(' + innerM + '\\)';
          });
          var textStyle = 'margin-bottom:' + (figHtml ? '14px;' : '0;')
            + (isArabic ? 'direction:rtl;text-align:right;font-family:"Noto Sans Arabic","Segoe UI",Tahoma,sans-serif;' : 'text-align:left;');
          inner += '<div class="clipsat-math-stem" style="' + textStyle + '">' + escHtml(wrapped) + '</div>';
        }

        if (figHtml) {
          var cleanFigHtml = figHtml;
          var extracted = extractSvg(figHtml);
          if (extracted) {
            // Convert inline SVG to data URI image so html2canvas uses native rasterization rather than flawed SVG path parsing
            cleanFigHtml = svgToDataImgTag(extracted);
          }
          inner += '<div class="clipsat-fig-wrap">' + cleanFigHtml + '</div>';
        }

        container.innerHTML = styles + inner;
        document.body.appendChild(container);

        function cleanup() { if (container.parentNode) container.parentNode.removeChild(container); }

        try {
          if (window.renderMathInElement) window.renderMathInElement(container, KATEX_OPTS);
        } catch (e) {
          warn('KaTeX render threw: ' + e.message, text);
        }

        var go = function () {
          window.html2canvas(container, {
            backgroundColor: '#ffffff',
            scale: SCALE,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 1024,
            windowHeight: 768,
            onclone: function (clonedDoc, clonedElement) {
              clonedElement.style.position = 'static';
              clonedElement.style.left = '0';
              clonedElement.style.top = '0';
              clonedElement.style.margin = '0';
            }
          }).then(function (canvas) {
            canvas.toBlob(function (blob) {
              cleanup();
              if (!blob) { warn('canvas.toBlob produced no image (possibly a tainted/zero-size canvas)', text); resolve(null); return; }
              resolve({ blob: blob, width: Math.round(canvas.width / SCALE) });
            }, 'image/png');
          }).catch(function (err) { warn('html2canvas failed: ' + (err && err.message), text); cleanup(); resolve(null); });
        };

        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(go, 80); });
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
      // Also request thumbnailLink here (not just id) so renderQuestionImage
      // doesn't need a second round-trip to fetch it — see makePublic's
      // comment for why this, not id alone, is what Forms actually needs.
      return fetch(DRIVE_UPLOAD_API + '?uploadType=multipart&fields=id,thumbnailLink', {
        method: 'POST',
        headers: { 'Authorization': authHeader(), 'Content-Type': 'multipart/related; boundary="' + boundary + '"' },
        body: body
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (json) {
          if (!r.ok || !json.id) throw new Error('Drive upload failed: ' + driveErrorMessage(r, json));
          return { fileId: json.id, thumbnailLink: json.thumbnailLink || null };
        });
      });
    });
  }

  function makePublic(upload) {
    return fetch(DRIVE_API + '/' + upload.fileId + '/permissions', {
      method: 'POST',
      headers: { 'Authorization': authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'reader', type: 'anyone' })
    }).then(function (r) {
      if (r.ok) return upload;
      return r.json().catch(function () { return {}; }).then(function (json) {
        throw new Error('Could not make the uploaded image link-viewable: ' + driveErrorMessage(r, json));
      });
    });
  }

  // Build the URL actually handed to Forms as image.sourceUri. Confirmed
  // live: the previously-used https://drive.google.com/uc?export=view&id=…
  // pattern uploads and permissions successfully (this function never even
  // throws) but Google Forms' own backend then fails to fetch it —
  // "Google Forms API: Failed to add image: https://drive.google.com/uc?…" —
  // that endpoint isn't an officially supported direct-image-fetch URL and
  // has become unreliable for exactly this server-to-server use. Drive's own
  // thumbnailLink (Google's documented pattern for this — see e.g. Forms API
  // examples using Files.get(id,{fields:'thumbnailLink'})) is what's
  // actually meant to be fetched directly; it comes back sized small
  // (…=s220) so the size suffix is bumped up for a crisp-enough result.
  // Falls back to the old URL shape in the rare case Drive omits
  // thumbnailLink, rather than failing the image outright.
  function imageFetchUrl(upload) {
    if (upload.thumbnailLink) return upload.thumbnailLink.replace(/=s\d+$/, '=s1000');
    return 'https://drive.google.com/uc?export=view&id=' + upload.fileId;
  }

  // Full pipeline for one question/choice. Never rejects — resolves null on
  // any failure so the caller can fall back to plain text for just that one
  // item, but every failure is logged (see warn()) so it's diagnosable
  // instead of being indistinguishable from "this math didn't need an image."
  function renderQuestionImage(text, figure, figureHtml) {
    return renderToPngBlob(text, figure, figureHtml).then(function (rendered) {
      if (!rendered) return null; // renderToPngBlob already warned about the specific cause
      return uploadToDrive(rendered.blob, 'clipsat-question-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.png')
        .then(makePublic)
        .then(function (upload) { return { sourceUri: imageFetchUrl(upload), width: rendered.width }; })
        .catch(function (err) { warn(err && err.message, text); return null; });
    }).catch(function (err) { warn('Unexpected error: ' + (err && err.message), text); return null; });
  }

  window.ClipSATMathImage = {
    SCOPES: ['https://www.googleapis.com/auth/drive.file'],
    hasMath: hasMath,
    hasComplexMath: hasComplexMath,
    needsImage: needsImage,
    needsChoiceImage: needsChoiceImage,
    renderQuestionImage: renderQuestionImage,
    sanitizeSvg: sanitizeSvg,
    getSvgDimensions: getSvgDimensions
  };
})();
