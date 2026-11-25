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
 * like the rest of the site) → native SVG <foreignObject>/Canvas rasterizer →
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

  var DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3/files';
  var DRIVE_API = 'https://www.googleapis.com/drive/v3/files';

  // \( \)/\[ \] match the site's own KaTeX auto-render config (build.js's
  // baseNjk) for bank-data-sourced quizzes. $ $/$$ $$ are ALSO required for
  // worksheet-sourced math conventions; $$ is listed before single $.
  var KATEX_OPTS = {
    delimiters: [
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: false
  };

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
  function extractLatexFromKatexHtml(str) {
    var s = String(str == null ? '' : str);
    if (s.indexOf('katex') === -1 && s.indexOf('<annotation') === -1) return s;
    var out = '';
    var idx = 0;
    while (idx < s.length) {
      var kIdx = s.indexOf('<span class="katex', idx);
      if (kIdx === -1) {
        out += s.slice(idx);
        break;
      }
      out += s.slice(idx, kIdx);
      var isDisplay = s.slice(kIdx, kIdx + 35).indexOf('katex-display') !== -1;
      var depth = 0;
      var tagRe = /<\/?span\b[^>]*>/gi;
      tagRe.lastIndex = kIdx;
      var m, endIdx = -1;
      while ((m = tagRe.exec(s)) !== null) {
        if (m[0].charAt(1) === '/') {
          depth--;
          if (depth === 0) {
            endIdx = tagRe.lastIndex;
            break;
          }
        } else {
          depth++;
        }
      }
      if (endIdx === -1) {
        out += s.slice(kIdx);
        break;
      }
      var block = s.slice(kIdx, endIdx);
      var annMatch = block.match(/<annotation[^>]*encoding=["']application\/x-tex["'][^>]*>([\s\S]*?)<\/annotation>/i);
      var dtMatch = !annMatch && block.match(/\bdata-tex=(?:"([^"]*)"|'([^']*)')/i);
      var rawTex = annMatch ? annMatch[1] : (dtMatch ? (dtMatch[1] !== undefined ? dtMatch[1] : dtMatch[2]) : null);
      if (rawTex !== null) {
        var tex = rawTex
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&');
        out += isDisplay ? ('\\[' + tex + '\\]') : ('\\(' + tex + '\\)');
      }
      idx = endIdx;
    }
    if (!/<table\b/i.test(out)) {
      out = out
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(?:div|p|li)\s*>/gi, '\n')
        .replace(/<\/?(?:span|div|p|em|strong|b|i|u|ul|ol|li|small)(?:\s+[^>]*)?>/gi, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&amp;/gi, '&')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }
    return out;
  }

  function hasMath(text) {
    var s = extractLatexFromKatexHtml(String(text || ''));
    if (!s) return false;
    if (/\\\(|\\\[|\$\$|\$(?!\s*\d+(?:\.\d+)?(?:\s|$))/.test(s)) return true;
    if (/\\[a-zA-Z]|[\^_]\{?[\w+-]+/.test(s)) return true;
    if (/[\^_{}±≤≥≠≈√πθ∞×÷·°]/.test(s)) return true;
    if (/\b(sin|cos|tan|sec|csc|cot|log|ln|lim)\b/.test(s)) return true;
    return false;
  }

  var COMPLEX_MATH = /\\(d?frac|tfrac|cfrac|sqrt|int|iint|iiint|oint|oiiint|oiint|sum|prod|lim|binom|vec|hat|widehat|bar|overline|underline|overrightarrow|overleftarrow|begin|matrix|pmatrix|bmatrix|vmatrix|cases)(?![a-zA-Z])/;
  // Treat single-digit/letter/degree scripts (x^2, 10^{12}, 10^{-4}, a_n, 30^{\circ}) as simple
  // since forms-api.js converts them cleanly to Unicode superscripts/subscripts; flag multi-term
  // or nested algebraic scripts (^{2x+1}, ^{n-1}, _{k+1}, ^{1/2}) for image rendering.
  var COMPLEX_SCRIPT = /[\^_]\{(?!(?:\\circ|\\degree|\s*[0-9+\-()∞]+\s*|\s*[a-zA-Z]\s*)\})/;

  function hasComplexMath(text) {
    if (!text) return false;
    var s = extractLatexFromKatexHtml(String(text));
    return COMPLEX_MATH.test(s) || COMPLEX_SCRIPT.test(s) || /√\s*\(/.test(s);
  }

  function needsImage(text, figure, figureHtml) {
    if (figure || figureHtml) return true;
    var s = String(text || '');
    if (/<(?:svg|table|img)\b/i.test(s)) return true;
    return hasComplexMath(s);
  }

  function needsChoiceImage(text) {
    var raw = String(text || '').trim();
    if (!raw) return false;
    if (/<(?:svg|table|img)\b/i.test(raw)) return true;
    var s = extractLatexFromKatexHtml(raw).trim();
    if (!s) return false;
    if ((s.startsWith('\\(') && s.endsWith('\\)')) || (s.startsWith('\\[') && s.endsWith('\\]'))) {
      s = s.slice(2, -2).trim();
    } else if (s.startsWith('$') && s.endsWith('$') && s.length > 2) {
      s = s.slice(1, -1).trim();
    }
    if (/^[-+]?\d+(?:\.\d+)?%?$/.test(s)) return false;
    if (/^[-+]?[a-zA-Z]$/.test(s)) return false;
    if (/^\(\s*[-+]?[0-9.]+\s*,\s*[-+]?[0-9.]+\s*\)$/.test(s)) return false;
    // Simple numeric fractions like \frac{3}{5} or -\dfrac{12}{7} render crisply as "3/5" via mathToPlainText.
    if (/^[-+]?\s*\\(?:d?frac|tfrac)\{\s*\d+\s*\}\{\s*\d+\s*\}$/.test(s)) return false;
    return hasComplexMath(s);
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

  var SCALE = 2; // 2x Retina exceeds Forms' 740px max width while cutting PNG size/encode time by ~56%

  function withTimeout(promise, ms, fallbackVal) {
    var hasFallback = arguments.length >= 3;
    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        if (hasFallback) resolve(fallbackVal);
        else reject(new Error('Operation timed out after ' + ms + 'ms'));
      }, ms);
      Promise.resolve(promise).then(function (val) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(val);
      }, function (err) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (hasFallback) resolve(fallbackVal);
        else reject(err);
      });
    });
  }

  var colorMap = {
    '--fig-indigo': '#1E3A6E',
    '--fig-indigo-2': '#2B5BA8',
    '--fig-indigo-soft': 'rgba(30, 58, 110, 0.08)',
    '--fig-indigo-fill2': 'rgba(30, 58, 110, 0.04)',
    '--indigo': '#1E3A6E',
    '--indigo-2': '#2B5BA8',
    '--indigo-soft': 'rgba(30, 58, 110, 0.08)',
    '--fig-amber': '#C8902A',
    '--fig-amber-2': '#B37D20',
    '--fig-amber-text': '#8A6017',
    '--fig-amber-soft': 'rgba(200, 144, 42, 0.16)',
    '--amber': '#C8902A',
    '--amber-2': '#B37D20',
    '--amber-text': '#8A6017',
    '--amber-soft': 'rgba(200, 144, 42, 0.16)',
    '--fig-teal': '#0E9F8F',
    '--teal': '#0E9F8F',
    '--fig-purple': '#7C3AED',
    '--purple': '#7C3AED',
    '--fig-rose': '#E11D48',
    '--rose': '#E11D48',
    '--fig-ink': '#0E1726',
    '--ink': '#0E1726',
    '--text': '#0E1726',
    '--fig-muted': '#5A6577',
    '--muted': '#5A6577',
    '--fig-grid': '#C9D4E8',
    '--grid': '#C9D4E8',
    '--fig-border': '#DDE4F0',
    '--border': '#DDE4F0',
    '--line': '#DDE4F0',
    '--fig-bg': '#FFFFFF',
    '--paper': '#FFFFFF',
    '--paper-2': '#F8FAFC',
    '--bg': '#FFFFFF',
    '--panel': '#FFFFFF',
    '--font-sans': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  function resolveCssVars(str) {
    var re = /var\(\s*(--[a-zA-Z0-9_-]+)/;
    var count = 0;
    while (re.test(str) && count++ < 300) {
      var m = re.exec(str);
      var startIdx = m.index;
      var varName = m[1];
      var openParen = startIdx + 3;
      var depth = 1;
      var closeParen = -1;
      var commaIdx = -1;
      for (var i = openParen + 1; i < str.length; i++) {
        if (str[i] === '(') depth++;
        else if (str[i] === ')') {
          depth--;
          if (depth === 0) { closeParen = i; break; }
        } else if (str[i] === ',' && depth === 1 && commaIdx === -1) {
          commaIdx = i;
        }
      }
      if (closeParen === -1) break;
      var fallback = commaIdx !== -1 ? str.slice(commaIdx + 1, closeParen).trim() : '';
      var replacement = colorMap[varName];
      if (!replacement && fallback) {
        replacement = fallback;
      }
      if (!replacement) replacement = '#000000';
      str = str.slice(0, startIdx) + replacement + str.slice(closeParen + 1);
    }
    return str;
  }

  function getSvgDimensions(svgStr) {
    var openTag = (String(svgStr || '').match(/<svg\b[^>]*>/i) || [''])[0];
    var vbMatch = openTag.match(/\bviewBox=["']?[-\d.]+[,\s]+[-\d.]+[,\s]+(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)/i)
      || String(svgStr || '').match(/\bviewBox=["']?[-\d.]+[,\s]+[-\d.]+[,\s]+(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)/i);
    var wMatch = openTag.match(/\bwidth=["']?(\d+(?:\.\d+)?)(?!\s*%)/i);
    var hMatch = openTag.match(/\bheight=["']?(\d+(?:\.\d+)?)(?!\s*%)/i);
    var w = vbMatch ? Math.round(parseFloat(vbMatch[1])) : (wMatch ? Math.round(parseFloat(wMatch[1])) : 320);
    var h = vbMatch ? Math.round(parseFloat(vbMatch[2])) : (hMatch ? Math.round(parseFloat(hMatch[1])) : 220);
    return { w: Math.max(40, w), h: Math.max(40, h) };
  }

  function sanitizeSvg(svgStr) {
    if (!svgStr || typeof svgStr !== 'string') return '';
    var s = resolveCssVars(svgStr);
    s = s.replace(/\bfont-family:\s*([^;"]*)"([^;"]*)"([^;"]*)/g, "font-family:$1'$2'$3");
    if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/i.test(s)) {
      s = s.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    var dims = getSvgDimensions(s);
    // Explicit pixel width/height for standalone Image() and Canvas rasterization
    s = s.replace(/<svg\b([^>]*)>/i, function (match, attrs) {
      attrs = attrs.replace(/\bwidth=["'][^"']*["']/i, '');
      attrs = attrs.replace(/\bheight=["'][^"']*["']/i, '');
      attrs = attrs.replace(/max-width\s*:\s*[^;"']+;?/gi, '');
      return '<svg width="' + dims.w + '" height="' + dims.h + '"' + attrs + '>';
    });
    // Ensure opaque white background so transparent fills don't display black in canvas/Forms
    if (!/<rect[^>]*fill=["']#(?:fff|ffffff)["']/i.test(s)) {
      s = s.replace(/<svg\b[^>]*>/i, function (m) {
        return m + '<rect width="' + dims.w + '" height="' + dims.h + '" fill="#ffffff"/>';
      });
    }
    return s;
  }

  function extractSvg(str) {
    if (!str || typeof str !== 'string') return null;
    var m = str.match(/<svg[\s\S]*?<\/svg>/i);
    return m ? m[0] : null;
  }

  function renderSvgDirect(svgStr, scale) {
    scale = scale || SCALE;
    return new Promise(function (resolve) {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        resolve(null);
        return;
      }
      try {
        var cleanSvg = sanitizeSvg(svgStr);
        var dims = getSvgDimensions(cleanSvg);
        var w = dims.w, h = dims.h;

        var dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cleanSvg);
        var blobUrl = null;
        if (typeof Blob !== 'undefined' && typeof URL !== 'undefined' && URL.createObjectURL) {
          try {
            var blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
            blobUrl = URL.createObjectURL(blob);
          } catch (e) {}
        }

        var img = new Image();
        var finished = false;
        var svgTimer = setTimeout(function () {
          if (finished) return;
          finished = true;
          if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e) {} }
          warn('SVG rasterization timed out');
          resolve(null);
        }, 4000);
        function finish(val) {
          if (finished) return;
          finished = true;
          clearTimeout(svgTimer);
          resolve(val);
        }

        function dataUrlToBlob(canvas) {
          try {
            var dataUrl = canvas.toDataURL('image/png');
            var byteString = atob(dataUrl.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
            return new Blob([ab], { type: 'image/png' });
          } catch (e) {
            return null;
          }
        }

        function tryExtractBlob(canvas) {
          return new Promise(function (done) {
            if (canvas.toBlob) {
              canvas.toBlob(function (pngBlob) {
                if (pngBlob) { done(pngBlob); return; }
                done(dataUrlToBlob(canvas));
              }, 'image/png');
            } else {
              done(dataUrlToBlob(canvas));
            }
          });
        }

        img.onload = function () {
          try {
            if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e) {} }
            var canvas = document.createElement('canvas');
            canvas.width = Math.round(w * scale);
            canvas.height = Math.round(h * scale);
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            tryExtractBlob(canvas).then(function (pngBlob) {
              if (!pngBlob) { finish(null); return; }
              finish({ blob: pngBlob, width: w, canvas: canvas });
            }).catch(function () { finish(null); });
          } catch (e) {
            if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e) {} }
            finish(null);
          }
        };

        var triedFallback = false;
        img.onerror = function () {
          if (!triedFallback && blobUrl && img.src !== blobUrl) {
            triedFallback = true;
            img.src = blobUrl;
            return;
          }
          if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e) {} }
          finish(null);
        };

        // Prefer data URI with charset=utf-8 for cross-platform image canvas rasterization
        img.src = dataUri;
      } catch (err) {
        resolve(null);
      }
    });
  }

  var _figuresReadyPromise = null;
  function ensureFiguresReady() {
    if (window._renderFig && window.renderMathFigure) return Promise.resolve();
    if (_figuresReadyPromise) return _figuresReadyPromise;
    var p;
    if (typeof window._ensureFigures === 'function') {
      p = window._ensureFigures().catch(function () {});
    } else if (typeof document !== 'undefined') {
      p = new Promise(function (resolve) {
        var s = document.createElement('script');
        s.src = '/js/figures.js';
        s.onload = function () { resolve(); };
        s.onerror = function () { resolve(); };
        document.head.appendChild(s);
      });
    } else {
      p = Promise.resolve();
    }
    _figuresReadyPromise = withTimeout(p, 5000, undefined);
    return _figuresReadyPromise;
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

      var extractedSvg = extractSvg(figHtml) || extractSvg(text);
      var stemText = text;
      if (extractedSvg && text && extractSvg(text)) {
        stemText = String(text).replace(/<svg[\s\S]*?<\/svg>/gi, '').trim();
      }

      // When an SVG diagram is present, rasterize it natively for 100% vector crispness.
      // Only composite stem text above the SVG if the stem actually contains complex 2D math or
      // a table (simple math already reads cleanly in Forms' item.title plain text).
      if (extractedSvg) {
        var needStemComp = !!(stemText && typeof window !== 'undefined' && (hasComplexMath(stemText) || /<table\b/i.test(stemText)));
        if (!needStemComp) {
          return renderSvgDirect(extractedSvg, SCALE).then(function (svgRes) {
            return svgRes || renderHtmlNative(stemText, figHtml);
          });
        }
        return Promise.all([
          renderSvgDirect(extractedSvg, SCALE),
          renderHtmlNative(stemText, '').catch(function () { return null; })
        ]).then(function (pair) {
          var svgRes = pair[0], txtRes = pair[1];
          if (!svgRes) return renderHtmlNative(stemText, figHtml);
          if (!txtRes || !txtRes.canvas || !svgRes.canvas) return svgRes;
          try {
            var gap = Math.round(14 * SCALE);
            var pad = Math.round(12 * SCALE);
            var compW = Math.max(txtRes.canvas.width, svgRes.canvas.width + pad * 2);
            var compH = txtRes.canvas.height + gap + svgRes.canvas.height + pad;
            var compCanvas = document.createElement('canvas');
            compCanvas.width = compW;
            compCanvas.height = compH;
            var ctx = compCanvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, compW, compH);
            ctx.drawImage(txtRes.canvas, 0, 0);
            var svgX = Math.max(0, Math.round((compW - svgRes.canvas.width) / 2));
            ctx.drawImage(svgRes.canvas, svgX, txtRes.canvas.height + gap);
            return new Promise(function (done) {
              if (compCanvas.toBlob) {
                compCanvas.toBlob(function (b) {
                  done(b ? { blob: b, width: Math.round(compW / SCALE), canvas: compCanvas } : svgRes);
                }, 'image/png');
              } else {
                done(svgRes);
              }
            });
          } catch (e) {
            return svgRes;
          }
        });
      }

      return renderHtmlNative(stemText, figHtml);
    });
  }

  function _fallbackPlainCanvas(plainText, figHtml, isArabic) {
    return new Promise(function (resolve) {
      try {
        var W = 600, padX = 24, padY = 20, lineH = 30;
        var clean = String(plainText || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        var words = clean ? clean.split(' ') : [];
        var lines = [], cur = '';
        for (var i = 0; i < words.length; i++) {
          var next = cur ? (cur + ' ' + words[i]) : words[i];
          if (next.length > 48 && cur) { lines.push(cur); cur = words[i]; }
          else cur = next;
        }
        if (cur) lines.push(cur);
        if (!lines.length) lines.push(figHtml ? 'ClipSAT Diagram' : 'Mathematics Question');
        var H = Math.max(80, padY * 2 + lines.length * lineH);
        var canvas = document.createElement('canvas');
        canvas.width = W * SCALE;
        canvas.height = H * SCALE;
        var ctx = canvas.getContext('2d');
        ctx.scale(SCALE, SCALE);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#0e1726';
        ctx.font = '20px Georgia, "Times New Roman", serif';
        ctx.textAlign = isArabic ? 'right' : 'left';
        var tx = isArabic ? (W - padX) : padX;
        for (var li = 0; li < lines.length; li++) {
          ctx.fillText(lines[li], tx, padY + 22 + li * lineH, W - padX * 2);
        }
        canvas.toBlob(function (blob) {
          resolve(blob ? { blob: blob, width: W, canvas: canvas } : null);
        }, 'image/png');
      } catch (e) {
        resolve(null);
      }
    });
  }

  function renderHtmlNative(text, figHtml) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return Promise.resolve(null);
    return new Promise(function (resolve) {
      var container = document.createElement('div');
      container.style.cssText = 'position:fixed;left:0;top:0;z-index:-99999;pointer-events:none;background:#ffffff;'
        + 'display:inline-block;padding:16px 20px;max-width:640px;box-sizing:border-box;'
        + 'font-family:Georgia,"Times New Roman",serif;font-size:24px;line-height:1.5;color:#111;';

      var cleanText = extractLatexFromKatexHtml(text);
      var isArabic = /[\u0600-\u06FF]/.test(String(cleanText || ''));

      var styles = '<style>'
        + '.exam-table, .qiyas-qc-box { border-collapse: collapse; margin: 8px auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 16px; border: 1px solid #999; }'
        + '.exam-table th, .exam-table td, .qiyas-qc-box th, .qiyas-qc-box td { border: 1px solid #999; padding: 6px 12px; text-align: center; }'
        + '.exam-table th, .qiyas-qc-box th { background: #e8edf8; color: #1a1a2e; font-weight: bold; }'
        + '.clipsat-fig-wrap { display: block; margin: 10px auto 0; text-align: center; width: 100%; }'
        + '.clipsat-fig-wrap img, .clipsat-fig-wrap svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }'
        + '</style>';

      var inner = '';
      if (cleanText) {
        var hasTableInText = /<table\b/i.test(cleanText);
        var autoMath = window.CSAutoMath || function (s) { return s; };
        var processedText = hasTableInText ? cleanText : autoMath(cleanText);
        var wrapped = (!hasTableInText && hasMath(processedText) && !/\\\(|\\\[|\$/.test(processedText)) ? '\\(' + processedText + '\\)' : processedText;
        wrapped = wrapped.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');
        wrapped = wrapped.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, function (m, innerM) {
          if (/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(innerM)) return m;
          return '\\(' + innerM + '\\)';
        });
        var textStyle = 'margin-bottom:' + (figHtml ? '14px;' : '0;')
          + (isArabic ? 'direction:rtl;text-align:right;font-family:"Noto Sans Arabic","Segoe UI",Tahoma,sans-serif;' : 'text-align:left;');
        var safeStemHtml = hasTableInText ? wrapped : escHtml(wrapped).replace(/\n/g, '<br>');
        inner += '<div class="clipsat-math-stem" style="' + textStyle + '">' + safeStemHtml + '</div>';
      }

      if (figHtml) {
        var cleanFigHtml = figHtml;
        var extracted = extractSvg(figHtml);
        if (extracted) cleanFigHtml = sanitizeSvg(extracted);
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

      var fontsReady = (document.fonts && document.fonts.ready)
        ? withTimeout(document.fonts.ready, 800, null)
        : Promise.resolve();
      function nextPaint(fn) {
        var fired = false;
        function run() {
          if (fired) return;
          fired = true;
          fn();
        }
        if (typeof requestAnimationFrame === 'function' && (!document || document.visibilityState !== 'hidden')) {
          requestAnimationFrame(run);
          setTimeout(run, 50);
        } else {
          setTimeout(run, 8);
        }
      }
      fontsReady.then(function () {
        nextPaint(function () {
          try {
            var rect = container.getBoundingClientRect ? container.getBoundingClientRect() : { width: 600, height: 140 };
            var w = Math.max(120, Math.ceil(rect.width || 600));
            var h = Math.max(60, Math.ceil(rect.height || 140));
            var xhtml = '';
            try {
              var clone = container.cloneNode(true);
              clone.style.position = 'static';
              clone.style.margin = '0';
              clone.style.width = w + 'px';
              clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
              xhtml = new XMLSerializer().serializeToString(clone);
            } catch (_xe) {
              xhtml = '<div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;padding:16px;font-family:Georgia,serif;font-size:22px;color:#111">' + container.innerHTML + '</div>';
            }
            var foSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">'
              + '<rect width="' + w + '" height="' + h + '" fill="#ffffff"/>'
              + '<foreignObject width="100%" height="100%">' + xhtml + '</foreignObject></svg>';
            cleanup();
            renderSvgDirect(foSvg, SCALE).then(function (res) {
              if (res) { resolve(res); return; }
              var plain = (window.ClipSATForms && window.ClipSATForms.mathToPlainText)
                ? window.ClipSATForms.mathToPlainText(cleanText)
                : cleanText;
              _fallbackPlainCanvas(plain, figHtml, isArabic).then(resolve);
            });
          } catch (err) {
            cleanup();
            _fallbackPlainCanvas(cleanText, figHtml, isArabic).then(resolve);
          }
        });
      });
    });
  }

  function arrayBufferToBase64(buffer) {
    var binary = '', bytes = new Uint8Array(buffer), chunk = 0x8000;
    for (var i = 0; i < bytes.byteLength; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
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

  function fetchWithTimeout(url, opts, timeoutMs) {
    opts = opts || {};
    var ms = timeoutMs || 15000;
    if (typeof AbortController === 'undefined') return fetch(url, opts);
    var ctrl = new AbortController();
    var timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, ms);
    var reqOpts = Object.assign({}, opts, { signal: ctrl.signal });
    return fetch(url, reqOpts).then(function (r) {
      clearTimeout(timer);
      return r;
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  function shouldRetryDrive(status, json, err) {
    if (err) return true;
    if (status === 429 || status === 500 || status === 502 || status === 503 || status === 504) return true;
    if (status === 403 && json && json.error && /rateLimitExceeded|userRateLimitExceeded|quota/i.test(JSON.stringify(json.error))) return true;
    return false;
  }

  function buildMultipartBody(blob, filename) {
    var boundary = 'clipsat-' + Math.random().toString(36).slice(2);
    var delimiter = '\r\n--' + boundary + '\r\n';
    var closeDelim = '\r\n--' + boundary + '--';
    var metadata = { name: filename, mimeType: 'image/png' };
    var metaPart = delimiter + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(metadata);
    if (typeof Blob !== 'undefined' && blob instanceof Blob) {
      var binPart = delimiter + 'Content-Type: image/png\r\n\r\n';
      return Promise.resolve({
        boundary: boundary,
        body: new Blob([metaPart, binPart, blob, closeDelim], { type: 'multipart/related; boundary="' + boundary + '"' })
      });
    }
    return blob.arrayBuffer().then(function (buf) {
      return {
        boundary: boundary,
        body: metaPart
          + delimiter
          + 'Content-Type: image/png\r\nContent-Transfer-Encoding: base64\r\n\r\n' + arrayBufferToBase64(buf)
          + closeDelim
      };
    });
  }

  function uploadToDrive(blob, filename, attempt) {
    attempt = attempt || 0;
    return buildMultipartBody(blob, filename).then(function (part) {
      // Also request thumbnailLink here (not just id) so renderQuestionImage
      // doesn't need a second round-trip to fetch it — see makePublic's
      // comment for why this, not id alone, is what Forms actually needs.
      return fetchWithTimeout(DRIVE_UPLOAD_API + '?uploadType=multipart&fields=id,thumbnailLink', {
        method: 'POST',
        headers: { 'Authorization': authHeader(), 'Content-Type': 'multipart/related; boundary="' + part.boundary + '"' },
        body: part.body
      }, 15000).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (json) {
          if (r.ok && json.id) return { fileId: json.id, thumbnailLink: json.thumbnailLink || null };
          if (attempt < 2 && shouldRetryDrive(r.status, json, null)) {
            var waitMs = Math.round(400 * Math.pow(2, attempt) + Math.random() * 200);
            return new Promise(function (resolve) { setTimeout(resolve, waitMs); }).then(function () {
              return uploadToDrive(blob, filename, attempt + 1);
            });
          }
          throw new Error('Drive upload failed: ' + driveErrorMessage(r, json));
        });
      }, function (err) {
        if (attempt < 2) {
          var waitMs = Math.round(400 * Math.pow(2, attempt) + Math.random() * 200);
          return new Promise(function (resolve) { setTimeout(resolve, waitMs); }).then(function () {
            return uploadToDrive(blob, filename, attempt + 1);
          });
        }
        throw err;
      });
    });
  }

  function makePublic(upload, attempt) {
    attempt = attempt || 0;
    return fetchWithTimeout(DRIVE_API + '/' + upload.fileId + '/permissions', {
      method: 'POST',
      headers: { 'Authorization': authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'reader', type: 'anyone' })
    }, 15000).then(function (r) {
      if (r.ok) return upload;
      return r.json().catch(function () { return {}; }).then(function (json) {
        if (attempt < 2 && shouldRetryDrive(r.status, json, null)) {
          var waitMs = Math.round(400 * Math.pow(2, attempt) + Math.random() * 200);
          return new Promise(function (resolve) { setTimeout(resolve, waitMs); }).then(function () {
            return makePublic(upload, attempt + 1);
          });
        }
        throw new Error('Could not make the uploaded image link-viewable: ' + driveErrorMessage(r, json));
      });
    }, function (err) {
      if (attempt < 2) {
        var waitMs = Math.round(400 * Math.pow(2, attempt) + Math.random() * 200);
        return new Promise(function (resolve) { setTimeout(resolve, waitMs); }).then(function () {
          return makePublic(upload, attempt + 1);
        });
      }
      throw err;
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
    if (upload.thumbnailLink) return upload.thumbnailLink.replace(/=s\d+$/, '=s1200');
    return 'https://lh3.googleusercontent.com/d/' + upload.fileId;
  }

  var _imageCache = {};
  var _imageCacheKeys = [];
  function makeCacheKey(text, figure, figureHtml) {
    var t = (window.ClipSATGoogle && window.ClipSATGoogle.getToken) ? String(window.ClipSATGoogle.getToken() || '') : '';
    var tokKey = t.slice(-12);
    var consentKey = (window.ClipSATGoogleFormsConsent === true) ? '1' : '0';
    var figKey = '';
    if (figure) {
      try { figKey = typeof figure === 'string' ? figure : JSON.stringify(figure); } catch (e) { figKey = String(figure); }
    }
    return tokKey + '|' + consentKey + '|' + String(text || '') + '|' + figKey + '|' + String(figureHtml || '');
  }

  // Full pipeline for one question/choice. Never rejects — resolves null on
  // any failure or timeout so the caller falls back cleanly to plain text.
  function renderQuestionImage(text, figure, figureHtml) {
    var key = makeCacheKey(text, figure, figureHtml);
    if (_imageCache[key]) return _imageCache[key];

    var pipeline = renderToPngBlob(text, figure, figureHtml).then(function (rendered) {
      if (!rendered) return null; // renderToPngBlob already warned about the specific cause
      return uploadToDrive(rendered.blob, 'clipsat-question-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.png')
        .then(function (upload) {
          // Privacy compliance: default sharing is restricted.
          // Google Forms backend requires images to be link-viewable to render them in student forms.
          // Only make the image link-viewable if the teacher has explicitly granted consent via window.ClipSATGoogleFormsConsent === true.
          if (window.ClipSATGoogleFormsConsent === true) {
            return makePublic(upload);
          }
          return upload;
        })
        .then(function (upload) { return { sourceUri: imageFetchUrl(upload), width: rendered.width }; })
        .catch(function (err) { warn(err && err.message, text); return null; });
    }).catch(function (err) { warn('Unexpected error: ' + (err && err.message), text); return null; });

    var bounded = withTimeout(pipeline, 22000, null).then(function (res) {
      if (!res) delete _imageCache[key];
      return res;
    });
    if (_imageCacheKeys.length >= 250) {
      var oldest = _imageCacheKeys.shift();
      if (oldest) delete _imageCache[oldest];
    }
    _imageCache[key] = bounded;
    _imageCacheKeys.push(key);
    return bounded;
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
