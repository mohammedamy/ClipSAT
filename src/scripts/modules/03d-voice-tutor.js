/* ═══════════════════════════════════════════════════════════════════════════
   03d-voice-tutor.js — AI Voice Tutor (window.CSVoiceTutor)
   Provides natural spoken math (LaTeX-to-Speech in English & Arabic) and
   interactive voice narration across:
     1. 3-Tier Progressive Hints (.cs-hint-wrap & <details class="hint-tier">)
     2. Worked Solutions (.problem .solution, .cq-sol-box, .fep-sol-block, #mdeck-after)
     3. Interactive Practice Activities (.ix-box, Worked Examples, Step Builders)
     4. Interactive Canvas Explorers (.explorer live parameter & readout narrator)
   Speaks with OpenRouter fish-audio/s2.1-pro-free:free through the Supabase tts-proxy
   edge function (key kept server-side) and automatically falls back to the browser's
   built-in Web Speech API (window.speechSynthesis — zero latency, zero cost) whenever
   the cloud voice fails, is rate-limited, or the user is signed out.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  var _activeBtn = null;
  var _utteranceQueue = [];
  var _isSpeaking = false;
  var _cachedVoices = [];
  var _speechRate = 0.98;

  try {
    var savedRate = parseFloat(localStorage.getItem('clipsat_voice_rate'));
    if(!isNaN(savedRate) && savedRate >= 0.6 && savedRate <= 1.5){
      _speechRate = savedRate;
    }
  } catch(e){}

  function _hasSpeechSupport(){
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';
  }

  function _loadVoices(){
    if(!_hasSpeechSupport()) return [];
    try {
      var v = window.speechSynthesis.getVoices();
      if(v && v.length) _cachedVoices = v;
    } catch(e){}
    return _cachedVoices;
  }

  if(_hasSpeechSupport()){
    _loadVoices();
    if(typeof window.speechSynthesis.onvoiceschanged !== 'undefined'){
      window.speechSynthesis.onvoiceschanged = _loadVoices;
    }
  }

  function _detectLang(text, explicitLang){
    if(explicitLang === 'ar' || explicitLang === 'en') return explicitLang;
    var s = String(text || '');
    var arChars = (s.match(/[\u0600-\u06FF]/g) || []).length;
    var enChars = (s.match(/[a-zA-Z]/g) || []).length;
    if(arChars > 8 && arChars * 1.3 >= enChars) return 'ar';
    if(window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar' && arChars > 0){
      return 'ar';
    }
    return 'en';
  }

  /* Select the most natural neural/enhanced local voice for English or Arabic */
  function _pickBestVoice(lang){
    var voices = _loadVoices();
    if(!voices || !voices.length) return null;
    var isAr = (lang === 'ar');
    var targetPrefix = isAr ? 'ar' : 'en';

    var candidates = voices.filter(function(v){
      return String(v.lang || '').toLowerCase().indexOf(targetPrefix) === 0;
    });
    if(!candidates.length) return null;

    var preferredNames = isAr
      ? ['Maged', 'Tarik', 'Salma', 'Shakir', 'Laila', 'Mariam', 'Natural', 'Enhanced', 'Google العربية', 'Arabic']
      : ['Samantha (Enhanced)', 'Ava (Enhanced)', 'Allison (Enhanced)', 'Siri', 'Natural', 'Aria', 'Jenny', 'Guy', 'Google US English', 'Google UK English Female', 'Samantha', 'Ava', 'Karen', 'Daniel', 'Alex'];

    var best = null;
    var bestScore = -999;
    for(var i = 0; i < candidates.length; i++){
      var v = candidates[i];
      var name = String(v.name || '');
      var vlang = String(v.lang || '');
      var score = 0;
      if(/Enhanced|Premium|Natural|Neural|Online/i.test(name)) score += 35;
      if(!isAr && /en[-_](US|GB)/i.test(vlang)) score += 12;
      if(isAr && /ar[-_](SA|EG|AE|001)/i.test(vlang)) score += 12;
      for(var p = 0; p < preferredNames.length; p++){
        if(name.toLowerCase().indexOf(preferredNames[p].toLowerCase()) !== -1){
          score += (preferredNames.length - p) * 3;
          break;
        }
      }
      if(v.default) score += 2;
      if(score > bestScore){
        bestScore = score;
        best = v;
      }
    }
    return best || candidates[0];
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Brace-Aware Recursive LaTeX-to-Spoken-Math Engine (English & Arabic)
     ═══════════════════════════════════════════════════════════════════════════ */

  /* Extract balanced { ... } group starting at openBraceIdx */
  function _readBraced(str, openBraceIdx){
    if(str[openBraceIdx] !== '{') return null;
    var depth = 0;
    for(var i = openBraceIdx; i < str.length; i++){
      if(str[i] === '\\'){ i++; continue; }
      if(str[i] === '{') depth++;
      else if(str[i] === '}'){
        depth--;
        if(depth === 0){
          return { content: str.slice(openBraceIdx + 1, i), endIdx: i + 1 };
        }
      }
    }
    return { content: str.slice(openBraceIdx + 1), endIdx: str.length };
  }

  /* Replace \cmd{A}{B} or \cmd[opt]{A} recursively using balanced brace parsing */
  function _replaceLatexCommand2(str, cmdPattern, replacer){
    var re = new RegExp('\\\\(?:' + cmdPattern + ')\\s*\\{', 'g');
    var safety = 0;
    while(safety++ < 60){
      re.lastIndex = 0;
      var m = re.exec(str);
      if(!m) break;
      var startIdx = m.index;
      var firstBrace = startIdx + m[0].length - 1;
      var g1 = _readBraced(str, firstBrace);
      if(!g1) break;
      var cursor = g1.endIdx;
      while(cursor < str.length && /\s/.test(str[cursor])) cursor++;
      if(str[cursor] !== '{') break;
      var g2 = _readBraced(str, cursor);
      if(!g2) break;
      var inner1 = _convertMathFragment(g1.content, replacer._lang);
      var inner2 = _convertMathFragment(g2.content, replacer._lang);
      var replacement = replacer(inner1, inner2);
      str = str.slice(0, startIdx) + replacement + str.slice(g2.endIdx);
    }
    return str;
  }

  function _replaceLatexCommand1(str, cmdPattern, replacer){
    var re = new RegExp('\\\\(?:' + cmdPattern + ')\\s*(?:\\[([^\\]]*)\\]\\s*)?\\{', 'g');
    var safety = 0;
    while(safety++ < 60){
      re.lastIndex = 0;
      var m = re.exec(str);
      if(!m) break;
      var startIdx = m.index;
      var optArg = m[1] || '';
      var firstBrace = startIdx + m[0].length - 1;
      var g1 = _readBraced(str, firstBrace);
      if(!g1) break;
      var inner1 = _convertMathFragment(g1.content, replacer._lang);
      var optSpoken = optArg ? _convertMathFragment(optArg, replacer._lang) : '';
      var replacement = replacer(inner1, optSpoken);
      str = str.slice(0, startIdx) + replacement + str.slice(g1.endIdx);
    }
    return str;
  }

  function _spokenFraction(num, den, lang){
    var n = String(num || '').trim();
    var d = String(den || '').trim();
    var isAr = (lang === 'ar');

    /* Common calculus derivatives */
    if(/^d\s*y$/i.test(n) && /^d\s*x$/i.test(d)){
      return isAr ? ' مشتقة y بالنسبة إلى x ' : ' d y over d x ';
    }
    if(/^d$/i.test(n) && /^d\s*([a-zA-Z])$/i.test(d)){
      var v = d.replace(/^d\s*/i, '');
      return isAr ? (' المشتقة بالنسبة إلى ' + v + ' ') : (' the derivative with respect to ' + v + ' ');
    }
    if(/^d\^?2\s*y|d\s*squared\s*y$/i.test(n) && /^d\s*x\s*(?:\^2|squared)$/i.test(d)){
      return isAr ? ' المشتقة الثانية لـ y بالنسبة إلى x ' : ' the second derivative of y with respect to x ';
    }

    /* Common simple numerical fractions */
    if(n === '1' && d === '2') return isAr ? ' نصف ' : ' one half ';
    if(n === '1' && d === '3') return isAr ? ' ثلث ' : ' one third ';
    if(n === '2' && d === '3') return isAr ? ' ثلثان ' : ' two thirds ';
    if(n === '1' && d === '4') return isAr ? ' ربع ' : ' one fourth ';
    if(n === '3' && d === '4') return isAr ? ' ثلاثة أرباع ' : ' three fourths ';

    var needsGroup = /[+\-]/.test(n) || /[+\-]/.test(d);
    if(isAr){
      return needsGroup
        ? (' البسط ' + n + ' على المقام ' + d + ' ')
        : (' ' + n + ' على ' + d + ' ');
    }
    return needsGroup
      ? (' the quantity ' + n + ', over ' + d + ', ')
      : (' ' + n + ' over ' + d + ' ');
  }

  function _convertMathFragment(raw, lang){
    if(!raw) return '';
    var isAr = (lang === 'ar');
    var s = String(raw);

    /* Strip formatting sizing macros early */
    s = s.replace(/\\(?:left|right|big|Big|bigg|Bigg|displaystyle|textstyle|scriptstyle|!|,|;|quad|qquad)\b/g, ' ');

    /* Matrices & piecewise cases */
    s = s.replace(/\\begin\{(?:p|b|v|B)?matrix\}([\s\S]*?)\\end\{(?:p|b|v|B)?matrix\}/g, function(_, body){
      var rows = body.split(/\\\\/).map(function(r){
        return r.split('&').map(function(c){ return _convertMathFragment(c.trim(), lang); }).join(', ');
      }).filter(Boolean);
      return isAr
        ? (' المصفوفة ذات الصفوف: ' + rows.join(' ؛ ثم الصف ') + ' ')
        : (' the matrix with rows: ' + rows.join('; next row: ') + ' ');
    });
    s = s.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, function(_, body){
      var rows = body.split(/\\\\/).map(function(r){
        var parts = r.split('&').map(function(c){ return _convertMathFragment(c.trim(), lang); });
        return parts.length > 1
          ? (parts[0] + (isAr ? ' عندما ' : ' when ') + parts.slice(1).join(' '))
          : parts[0];
      }).filter(Boolean);
      return isAr
        ? (' الدالة المتعددة التعريف: ' + rows.join(' ؛ أو ') + ' ')
        : (' piecewise: ' + rows.join('; or ') + ' ');
    });

    /* Text & styling wrappers */
    var textReplacer = function(inner){ return ' ' + inner + ' '; };
    textReplacer._lang = lang;
    s = _replaceLatexCommand1(s, 'text|textbf|textit|textrm|mathrm|mathbf|mathbb|mathcal|operatorname', textReplacer);

    /* Binomial coefficients \binom{n}{k} */
    var binomReplacer = function(n, k){
      return isAr ? (' توافيق ' + n + ' فوق ' + k + ' ') : (' ' + n + ' choose ' + k + ' ');
    };
    binomReplacer._lang = lang;
    s = _replaceLatexCommand2(s, 'binom|dbinom|tbinom', binomReplacer);

    /* Fractions \frac{A}{B}, \dfrac{A}{B}, \tfrac{A}{B} */
    var fracReplacer = function(n, d){ return _spokenFraction(n, d, lang); };
    fracReplacer._lang = lang;
    s = _replaceLatexCommand2(s, 'd?frac|tfrac', fracReplacer);

    /* Roots \sqrt[n]{x} and \sqrt{x} */
    var sqrtReplacer = function(radicand, rootIdx){
      var r = String(radicand || '').trim();
      var idx = String(rootIdx || '').trim();
      if(idx === '3'){
        return isAr ? (' الجذر التكعيبي لـ ' + r + ' ') : (' the cube root of ' + r + ' ');
      }
      if(idx){
        return isAr ? (' الجذر من الرتبة ' + idx + ' لـ ' + r + ' ') : (' the ' + idx + 'th root of ' + r + ' ');
      }
      return isAr ? (' الجذر التربيعي لـ ' + r + ' ') : (' the square root of ' + r + ' ');
    };
    sqrtReplacer._lang = lang;
    s = _replaceLatexCommand1(s, 'sqrt', sqrtReplacer);

    /* Vectors, bars, hats */
    var vecReplacer = function(inner){
      return isAr ? (' المتجه ' + inner + ' ') : (' vector ' + inner + ' ');
    };
    vecReplacer._lang = lang;
    s = _replaceLatexCommand1(s, 'vec|overrightarrow', vecReplacer);

    var barReplacer = function(inner){
      return isAr ? (' ' + inner + ' شرطة ') : (' ' + inner + ' bar ');
    };
    barReplacer._lang = lang;
    s = _replaceLatexCommand1(s, 'overline|bar', barReplacer);

    /* Calculus: Limits, Integrals, Sums */
    s = s.replace(/\\lim\s*_\s*\{([^}]*)\}/g, function(_, sub){
      var cleanSub = _convertMathFragment(sub.replace(/\\to|\\rightarrow|→/g, isAr ? ' تقترب من ' : ' approaches '), lang);
      return isAr ? (' نهاية عندما ' + cleanSub + ' لـ ') : (' the limit as ' + cleanSub + ' of ');
    });
    s = s.replace(/\\int\s*_\s*(\{[^}]*\}|[a-zA-Z0-9\-]+)\s*\^\s*(\{[^}]*\}|[a-zA-Z0-9\-\\infty]+)/g, function(_, low, high){
      var a = _convertMathFragment(low.replace(/^\{|\}$/g, ''), lang);
      var b = _convertMathFragment(high.replace(/^\{|\}$/g, ''), lang);
      return isAr ? (' التكامل من ' + a + ' إلى ' + b + ' لـ ') : (' the integral from ' + a + ' to ' + b + ' of ');
    });
    s = s.replace(/\\int\b/g, isAr ? ' تكامل ' : ' the integral of ');

    s = s.replace(/\\sum\s*_\s*(\{[^}]*\}|[a-zA-Z0-9=]+)\s*\^\s*(\{[^}]*\}|[a-zA-Z0-9\\infty]+)/g, function(_, low, high){
      var a = _convertMathFragment(low.replace(/^\{|\}$/g, ''), lang);
      var b = _convertMathFragment(high.replace(/^\{|\}$/g, ''), lang);
      return isAr ? (' المجموع من ' + a + ' إلى ' + b + ' لـ ') : (' the sum from ' + a + ' to ' + b + ' of ');
    });
    s = s.replace(/\\sum\b/g, isAr ? ' مجموع ' : ' the sum of ');

    /* Derivatives f''(x), f'(x) */
    s = s.replace(/([a-zA-Z])\s*''\s*\(/g, isAr ? ' المشتقة الثانية لـ $1 عند (' : ' $1 double prime of (');
    s = s.replace(/([a-zA-Z])\s*'\s*\(/g, isAr ? ' مشتقة $1 عند (' : ' $1 prime of (');
    s = s.replace(/([a-zA-Z])\s*''\b/g, isAr ? ' $1 فتحتين ' : ' $1 double prime ');
    s = s.replace(/([a-zA-Z])\s*'\b/g, isAr ? ' $1 فتحة ' : ' $1 prime ');

    /* Inverse trig & Trig functions */
    s = s.replace(/\\(sin|cos|tan)\s*\^\s*\{\s*-1\s*\}/g, function(_, fn){
      var mapEn = { sin: 'inverse sine', cos: 'inverse cosine', tan: 'inverse tangent' };
      var mapAr = { sin: 'معكوس الجيب', cos: 'معكوس جيب التمام', tan: 'معكوس الظل' };
      return ' ' + (isAr ? mapAr[fn] : mapEn[fn]) + ' ';
    });
    s = s.replace(/\\(arcsin|arccos|arctan)\b/g, function(_, fn){
      var mapEn = { arcsin: 'arc sine', arccos: 'arc cosine', arctan: 'arc tangent' };
      var mapAr = { arcsin: 'معكوس الجيب', arccos: 'معكوس جيب التمام', arctan: 'معكوس الظل' };
      return ' ' + (isAr ? mapAr[fn] : mapEn[fn]) + ' ';
    });
    s = s.replace(/\\(sin|cos|tan|sec|csc|cot)\s*\^\s*2\b/g, function(_, fn){
      var mapEn = { sin: 'sine squared', cos: 'cosine squared', tan: 'tangent squared', sec: 'secant squared', csc: 'cosecant squared', cot: 'cotangent squared' };
      var mapAr = { sin: 'مربع الجيب', cos: 'مربع جيب التمام', tan: 'مربع الظل', sec: 'مربع القاطع', csc: 'مربع قاطع التمام', cot: 'مربع ظل التمام' };
      return ' ' + (isAr ? mapAr[fn] : mapEn[fn]) + ' ';
    });
    s = s.replace(/\\(sin|cos|tan|sec|csc|cot)\b/g, function(_, fn){
      var mapEn = { sin: 'sine', cos: 'cosine', tan: 'tangent', sec: 'secant', csc: 'cosecant', cot: 'cotangent' };
      var mapAr = { sin: 'جا', cos: 'جتا', tan: 'ظا', sec: 'قا', csc: 'قتا', cot: 'ظتا' };
      return ' ' + (isAr ? mapAr[fn] : mapEn[fn]) + ' ';
    });

    /* Logarithms */
    s = s.replace(/\\log\s*_\s*(\{[^}]*\}|[a-zA-Z0-9]+)/g, function(_, base){
      var b = _convertMathFragment(base.replace(/^\{|\}$/g, ''), lang);
      return isAr ? (' لوغاريتم للأساس ' + b + ' لـ ') : (' log base ' + b + ' of ');
    });
    s = s.replace(/\\log\b/g, isAr ? ' لوغاريتم ' : ' log of ');
    s = s.replace(/\\ln\b/g, isAr ? ' اللوغاريتم الطبيعي لـ ' : ' natural log of ');

    /* Absolute value |x| */
    s = s.replace(/\\lvert\s*([\s\S]*?)\s*\\rvert/g, function(_, inner){
      var c = _convertMathFragment(inner, lang);
      return isAr ? (' القيمة المطلقة لـ ' + c + ' ') : (' the absolute value of ' + c + ' ');
    });
    s = s.replace(/\|([^|]{1,35})\|/g, function(_, inner){
      var c = _convertMathFragment(inner, lang);
      return isAr ? (' القيمة المطلقة لـ ' + c + ' ') : (' the absolute value of ' + c + ' ');
    });

    /* Exponents & degrees */
    s = s.replace(/\^\s*\{\s*\\circ\s*\}|\^\s*\\circ|°/g, isAr ? ' درجة ' : ' degrees ');
    s = s.replace(/\^\s*\{\s*2\s*\}|\^\s*2(?![0-9])|²/g, isAr ? ' تربيع ' : ' squared ');
    s = s.replace(/\^\s*\{\s*3\s*\}|\^\s*3(?![0-9])|³/g, isAr ? ' تكعيب ' : ' cubed ');
    s = s.replace(/\^\s*\{\s*-1\s*\}/g, isAr ? ' أس سالب 1 ' : ' to the negative 1 power ');
    s = s.replace(/\^\s*\{([^}]+)\}/g, function(_, exp){
      var e = _convertMathFragment(exp, lang);
      return isAr ? (' أس ' + e + ' ') : (' to the power of ' + e + ' ');
    });
    s = s.replace(/\^\s*([a-zA-Z0-9+\-]+)/g, function(_, exp){
      return isAr ? (' أس ' + exp + ' ') : (' to the power of ' + exp + ' ');
    });

    /* Subscripts */
    s = s.replace(/_\s*\{([^}]+)\}/g, function(_, sub){
      var sb = _convertMathFragment(sub, lang);
      return isAr ? (' دليل ' + sb + ' ') : (' sub ' + sb + ' ');
    });
    s = s.replace(/_\s*([a-zA-Z0-9]+)/g, function(_, sub){
      return isAr ? (' دليل ' + sub + ' ') : (' sub ' + sub + ' ');
    });

    /* Greek letters & infinity */
    var greekEn = {
      pi: 'pi', theta: 'theta', alpha: 'alpha', beta: 'beta', gamma: 'gamma',
      delta: 'delta', Delta: 'delta', epsilon: 'epsilon', varepsilon: 'epsilon',
      lambda: 'lambda', mu: 'mu', sigma: 'sigma', Sigma: 'sigma',
      omega: 'omega', Omega: 'omega', phi: 'phi', varphi: 'phi', rho: 'rho', tau: 'tau',
      infty: 'infinity'
    };
    var greekAr = {
      pi: 'باي', theta: 'ثيتا', alpha: 'ألفا', beta: 'بيتا', gamma: 'غاما',
      delta: 'دلتا', Delta: 'دلتا', epsilon: 'إبسيلون', varepsilon: 'إبسيلون',
      lambda: 'لامدا', mu: 'ميو', sigma: 'سيغما', Sigma: 'سيغما',
      omega: 'أوميغا', Omega: 'أوميغا', phi: 'فاي', varphi: 'فاي', rho: 'رو', tau: 'تاو',
      infty: 'ما لا نهاية'
    };
    s = s.replace(/\\(pi|theta|alpha|beta|gamma|delta|Delta|epsilon|varepsilon|lambda|mu|sigma|Sigma|omega|Omega|phi|varphi|rho|tau|infty)\b/g, function(_, g){
      return ' ' + (isAr ? (greekAr[g] || g) : (greekEn[g] || g)) + ' ';
    });

    /* Unicode Greek & math symbols */
    var uniMapEn = {
      'π': ' pi ', 'θ': ' theta ', 'α': ' alpha ', 'β': ' beta ', 'γ': ' gamma ',
      'Δ': ' delta ', 'δ': ' delta ', 'λ': ' lambda ', 'μ': ' mu ', 'σ': ' sigma ',
      'ω': ' omega ', '∞': ' infinity ', '√': ' square root of ',
      '±': ' plus or minus ', '×': ' times ', '·': ' times ', '÷': ' divided by ',
      '≤': ' is less than or equal to ', '≥': ' is greater than or equal to ',
      '≠': ' is not equal to ', '≈': ' is approximately equal to ',
      '⇒': ' implies ', '→': ' approaches ', '∈': ' is in ', '∉': ' is not in ',
      '∪': ' union ', '∩': ' intersection ', '⊂': ' subset of ', '⊆': ' subset of ',
      '⊥': ' is perpendicular to ', '∥': ' is parallel to ', '∠': ' angle ', '△': ' triangle '
    };
    var uniMapAr = {
      'π': ' باي ', 'θ': ' ثيتا ', 'α': ' ألفا ', 'β': ' بيتا ', 'γ': ' غاما ',
      'Δ': ' دلتا ', 'δ': ' دلتا ', 'λ': ' لامدا ', 'μ': ' ميو ', 'σ': ' سيغما ',
      'ω': ' أوميغا ', '∞': ' ما لا نهاية ', '√': ' الجذر التربيعي لـ ',
      '±': ' زائد أو ناقص ', '×': ' ضرب ', '·': ' ضرب ', '÷': ' تقسيم ',
      '≤': ' أصغر من أو يساوي ', '≥': ' أكبر من أو يساوي ',
      '≠': ' لا يساوي ', '≈': ' يساوي تقريباً ',
      '⇒': ' يؤدي إلى ', '→': ' يقترب من ', '∈': ' ينتمي إلى ', '∉': ' لا ينتمي إلى ',
      '∪': ' اتحاد ', '∩': ' تقاطع ', '⊂': ' مجموعة جزئية من ', '⊆': ' مجموعة جزئية من ',
      '⊥': ' يعامد ', '∥': ' يوازي ', '∠': ' الزاوية ', '△': ' المثلث '
    };

    /* LaTeX relational & binary operators */
    s = s.replace(/\\pm\b/g, isAr ? ' زائد أو ناقص ' : ' plus or minus ');
    s = s.replace(/\\(?:times|cdot)\b/g, isAr ? ' ضرب ' : ' times ');
    s = s.replace(/\\div\b/g, isAr ? ' تقسيم ' : ' divided by ');
    s = s.replace(/\\(?:le|leq)\b/g, isAr ? ' أصغر من أو يساوي ' : ' is less than or equal to ');
    s = s.replace(/\\(?:ge|geq)\b/g, isAr ? ' أكبر من أو يساوي ' : ' is greater than or equal to ');
    s = s.replace(/\\(?:ne|neq)\b/g, isAr ? ' لا يساوي ' : ' is not equal to ');
    s = s.replace(/\\(?:approx|simeq)\b/g, isAr ? ' يساوي تقريباً ' : ' is approximately equal to ');
    s = s.replace(/\\(?:equiv|cong)\b/g, isAr ? ' يكافئ ' : ' is equivalent to ');
    s = s.replace(/\\(?:implies|Rightarrow|Longleftrightarrow|iff)\b/g, isAr ? ' يؤدي إلى ' : ' implies ');
    s = s.replace(/\\(?:to|rightarrow)\b/g, isAr ? ' إلى ' : ' approaches ');
    s = s.replace(/\\in\b/g, isAr ? ' ينتمي إلى ' : ' in ');
    s = s.replace(/\\notin\b/g, isAr ? ' لا ينتمي إلى ' : ' not in ');
    s = s.replace(/\\cup\b/g, isAr ? ' اتحاد ' : ' union ');
    s = s.replace(/\\cap\b/g, isAr ? ' تقاطع ' : ' intersection ');
    s = s.replace(/\\perp\b/g, isAr ? ' يعامد ' : ' is perpendicular to ');
    s = s.replace(/\\parallel\b/g, isAr ? ' يوازي ' : ' is parallel to ');
    s = s.replace(/\\angle\b/g, isAr ? ' الزاوية ' : ' angle ');
    s = s.replace(/\\triangle\b/g, isAr ? ' المثلث ' : ' triangle ');
    s = s.replace(/\\therefore\b/g, isAr ? ' إذن ' : ' therefore ');
    s = s.replace(/\\%/g, isAr ? ' بالمئة ' : ' percent ');

    /* Replace Unicode math characters */
    var uMap = isAr ? uniMapAr : uniMapEn;
    s = s.replace(/[πθαβγΔδλμσω∞√±×·÷≤≥≠≈⇒→∈∉∪∩⊂⊆⊥∥∠△]/g, function(ch){
      return uMap[ch] || (' ' + ch + ' ');
    });

    /* Distinguish unary negative (-5, = -x, (-3)) from binary subtraction (x - 5) */
    s = s.replace(/(^|[=(\[{,;:\s]|equals|is|over|of|to|plus|minus|times)\s*[−-]\s*(?=[0-9a-zA-Z(])/g, function(_, prefix){
      return prefix + (isAr ? ' سالب ' : ' negative ');
    });
    s = s.replace(/\s*[−-]\s*/g, isAr ? ' ناقص ' : ' minus ');
    s = s.replace(/\+/g, isAr ? ' زائد ' : ' plus ');
    s = s.replace(/=/g, isAr ? ' يساوي ' : ' equals ');
    s = s.replace(/</g, isAr ? ' أصغر من ' : ' is less than ');
    s = s.replace(/>/g, isAr ? ' أكبر من ' : ' is greater than ');

    /* Clean up remaining braces and stray backslashes */
    s = s.replace(/[{}]/g, ' ');
    s = s.replace(/\\([a-zA-Z]+)/g, ' $1 ');
    s = s.replace(/\\/g, ' ');
    return s.replace(/\s+/g, ' ').trim();
  }

  /* Public LaTeX-to-Spoken-Math converter for mixed prose + math strings */
  function latexToSpeech(text, lang){
    if(!text) return '';
    var resolvedLang = _detectLang(text, lang);
    var isAr = (resolvedLang === 'ar');
    var s = String(text);

    /* Strip HTML tags if any raw HTML was passed directly */
    s = s
      .replace(/<br\s*\/?>/gi, '. ')
      .replace(/<\/(?:p|div|li|tr|h[1-6])>/gi, '. ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, ' and ')
      .replace(/&lt;/g, ' < ')
      .replace(/&gt;/g, ' > ')
      .replace(/&le;/g, ' ≤ ')
      .replace(/&ge;/g, ' ≥ ')
      .replace(/&ne;/g, ' ≠ ')
      .replace(/&minus;|&ndash;|&mdash;/g, ' - ')
      .replace(/&times;/g, ' × ')
      .replace(/&divide;/g, ' ÷ ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'");

    /* Strip decorative UI emojis so the synthesizer doesn't say "light bulb emoji" */
    s = s.replace(/[💡🧭🎯🔊⏹✦✓✗⚠️🚩🏳️📋🔄🤖🖩🚫📊📘🇸🇦🇬🇧🌐]/g, ' ');

    /* Process explicit math blocks first: $$...$$, \[...\], \(...\), $...$ */
    s = s.replace(/\$\$([\s\S]*?)\$\$/g, function(_, m){
      return ' ' + _convertMathFragment(m, resolvedLang) + ' ';
    });
    s = s.replace(/\\\[([\s\S]*?)\\\]/g, function(_, m){
      return ' ' + _convertMathFragment(m, resolvedLang) + ' ';
    });
    s = s.replace(/\\\(([\s\S]*?)\\\)/g, function(_, m){
      return ' ' + _convertMathFragment(m, resolvedLang) + ' ';
    });
    s = s.replace(/\$([^$\n]+)\$/g, function(_, m){
      return ' ' + _convertMathFragment(m, resolvedLang) + ' ';
    });

    /* Also convert any un-delimited LaTeX macros or math expressions in plain text */
    if(/\\(?:frac|dfrac|tfrac|sqrt|sin|cos|tan|log|ln|lim|int|sum|pi|theta|alpha|beta|gamma|Delta|pm|times|cdot|div|le|ge|ne|approx|binom)|[πθαβγΔλμσω∞√±×÷≤≥≠≈²³]|\^[0-9{]/.test(s)){
      s = _convertMathFragment(s, resolvedLang);
    } else {
      /* Convert standalone math comparisons / equations inside prose (e.g. "x = 5" or "a + b = 10") */
      s = s.replace(/([0-9a-zA-Z)\]])\s*=\s*([+-]?[0-9a-zA-Z(\[])/g, function(_, l, r){
        var rSpoken = r.replace(/^-(?=[0-9a-zA-Z])/, isAr ? 'سالب ' : 'negative ');
        return l + (isAr ? ' يساوي ' : ' equals ') + rSpoken;
      });
      s = s.replace(/(^|[\s(=])-(?=[0-9]+\b)/g, '$1' + (isAr ? 'سالب ' : 'negative '));
    }

    /* Clean up Hint / Markscheme prefixes for smoother narration */
    s = s.replace(/Hint\s+(\d+)\s*\/\s*(\d+)\s*·/gi, 'Hint $1 of $2:');
    s = s.replace(/تلميح\s*([١٢٣123])\s*\/\s*([١٢٣123])\s*·/g, 'تلميح $1 من $2:');
    s = s.replace(/\[(?:M1|A1|R1|B1|AG)\]/g, '');

    return s.replace(/\s+/g, ' ').replace(/\.\s*\./g, '.').trim();
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     DOM Speech Text Extractor (KaTeX Annotation + Bilingual Aware)
     ═══════════════════════════════════════════════════════════════════════════ */
  function extractSpeechText(elOrHtml, lang){
    if(!elOrHtml) return '';
    if(typeof elOrHtml === 'string'){
      if(typeof document !== 'undefined' && /<[a-z][\s\S]*>/i.test(elOrHtml)){
        var tmp = document.createElement('div');
        tmp.innerHTML = elOrHtml;
        return extractSpeechText(tmp, lang);
      }
      return latexToSpeech(elOrHtml, lang);
    }

    var clone = elOrHtml.cloneNode(true);

    /* Remove interactive buttons, scripts, SVGs, and voice controls from clone */
    var junkSelectors = [
      '.cs-voice-btn', '.sol-btn', '.sol-toggle', '.btn-intuition-ar',
      '.cs-hint-btn', '.cs-hint-dots', '.ix-mp', 'button', 'script', 'style', 'svg'
    ];
    clone.querySelectorAll(junkSelectors.join(',')).forEach(function(n){ n.remove(); });

    /* Remove hidden elements */
    clone.querySelectorAll('[hidden]').forEach(function(n){ n.remove(); });
    clone.querySelectorAll('*').forEach(function(n){
      if(n.style && n.style.display === 'none') n.remove();
    });

    /* Determine target language based on page locale or explicit parameter */
    var activeLocale = lang || ((window.i18n && typeof window.i18n.getLocale === 'function') ? window.i18n.getLocale() : 'en');
    if(activeLocale === 'ar'){
      var arNodes = clone.querySelectorAll('[data-i18n-ar], .q-lang-ar');
      if(arNodes.length > 0){
        clone.querySelectorAll('[data-i18n-en], .q-lang-en, .en-trans').forEach(function(n){ n.remove(); });
      }
    } else {
      var enNodes = clone.querySelectorAll('[data-i18n-en], .q-lang-en, .en-trans');
      if(enNodes.length > 0){
        clone.querySelectorAll('[data-i18n-ar], .q-lang-ar').forEach(function(n){ n.remove(); });
      }
    }

    /* Replace KaTeX spans with their original <annotation encoding="application/x-tex"> or data-tex LaTeX */
    clone.querySelectorAll('.katex-display, .katex').forEach(function(kEl){
      if(!kEl.parentNode) return;
      var ann = kEl.querySelector('annotation[encoding="application/x-tex"]');
      var innerK = kEl.classList.contains('katex') ? kEl : kEl.querySelector('.katex');
      var tex = ann ? ann.textContent : ((innerK && innerK.getAttribute('data-tex')) || kEl.getAttribute('data-tex') || '');
      if(tex){
        var txtNode = document.createTextNode(' \\(' + tex + '\\) ');
        kEl.parentNode.replaceChild(txtNode, kEl);
      } else {
        /* Fallback: strip .katex-html so .katex-mathml / .sr-only isn't read twice */
        kEl.querySelectorAll('.katex-html').forEach(function(h){ h.remove(); });
      }
    });

    /* Replace MathJax containers if present */
    clone.querySelectorAll('mjx-container').forEach(function(mEl){
      var assistive = mEl.querySelector('mjx-assistive-mml');
      if(assistive){
        mEl.querySelectorAll('mjx-math').forEach(function(v){ v.remove(); });
      }
    });

    /* Add natural sentence pauses between block elements */
    clone.querySelectorAll('p, div, li, br, h3, h4, summary').forEach(function(bEl){
      bEl.insertAdjacentText('afterend', '. ');
    });

    var rawText = clone.textContent || '';
    var finalLang = _detectLang(rawText, lang);
    return latexToSpeech(rawText, finalLang);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Speech Synthesis Playback & Button State Management
     ═══════════════════════════════════════════════════════════════════════════ */
  function _setBtnState(btn, speaking){
    if(!btn) return;
    var isAr = btn.getAttribute('data-voice-lang') === 'ar' ||
      (window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar');
    if(speaking){
      btn.classList.add('is-speaking');
      btn.setAttribute('aria-pressed', 'true');
      if(!btn.hasAttribute('data-orig-html')){
        btn.setAttribute('data-orig-html', btn.innerHTML);
      }
      var compact = btn.classList.contains('cs-voice-btn-sm');
      btn.innerHTML = compact
        ? '<span>⏹</span>'
        : ('<span>⏹</span><span>' + (isAr ? 'إيقاف الصوت' : 'Stop Voice') + '</span>');
    } else {
      btn.classList.remove('is-speaking');
      btn.setAttribute('aria-pressed', 'false');
      var orig = btn.getAttribute('data-orig-html');
      if(orig){
        btn.innerHTML = orig;
      }
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Cloud voice (OpenRouter fish-audio/s2.1-pro-free:free via the Supabase
     "tts-proxy" edge function) with automatic fallback to the browser's Web
     Speech voice. The OpenRouter key never reaches the browser — it lives in
     the Supabase secret OPENROUTER_API_KEY. ANY failure (not signed in, quota /
     rate limit 429, credits 402, outage, timeout, autoplay block, missing
     secret) silently falls back to the browser voice below, and after a
     quota-style failure cloud voice is paused for a while so the next click
     starts the browser voice instantly. Opt out: localStorage
     clipsat_cloud_voice = '0'.
     ═══════════════════════════════════════════════════════════════════════════ */
  var TTS_PROXY_URL = 'https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/tts-proxy';
  var CLOUD_CHUNK_MAX = 600;
  var CLOUD_FETCH_TIMEOUT_MS = 15000;
  var CLOUD_CACHE_MAX = 40;
  var _playToken = 0;
  var _cloudAudio = null;
  var _cloudPausedUntilMem = 0;
  var _cloudCache = {};
  var _cloudCacheOrder = [];

  function _cloudPausedUntil(){
    var stored = 0;
    try { stored = parseInt(sessionStorage.getItem('clipsat_tts_pause') || '0', 10) || 0; } catch(e){}
    return Math.max(_cloudPausedUntilMem, stored);
  }
  function _pauseCloud(ms){
    _cloudPausedUntilMem = Date.now() + ms;
    try { sessionStorage.setItem('clipsat_tts_pause', String(_cloudPausedUntilMem)); } catch(e){}
  }
  function _cloudAvailable(){
    try { if(localStorage.getItem('clipsat_cloud_voice') === '0') return false; } catch(e){}
    if(typeof window.fetch !== 'function' || typeof window.Audio !== 'function') return false;
    if(typeof window.URL === 'undefined' || typeof window.URL.createObjectURL !== 'function') return false;
    var cloud = window.ClipSATCloud;
    if(!cloud || !cloud.configured) return false;
    return Date.now() > _cloudPausedUntil();
  }

  function _fetchCloudAudio(text, lang){
    var key = lang + '|' + text;
    if(_cloudCache[key]) return Promise.resolve(_cloudCache[key]);
    var cloud = window.ClipSATCloud;
    return Promise.resolve(cloud && cloud.ready).then(function(){
      var client = cloud.getClient && cloud.getClient();
      if(!client) throw new Error('NOT_SIGNED_IN');
      return client.auth.getSession();
    }).then(function(r){
      var session = r && r.data && r.data.session;
      if(!session || !session.access_token) throw new Error('NOT_SIGNED_IN');
      var cfg = window.CLIPSAT_CLOUD_CONFIG || {};
      var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, CLOUD_FETCH_TIMEOUT_MS) : null;
      return fetch(TTS_PROXY_URL, {
        method: 'POST', mode: 'cors',
        signal: ctrl ? ctrl.signal : undefined,
        headers: {
          'Authorization': 'Bearer ' + session.access_token,
          'apikey': cfg.anonKey || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, lang: lang })
      }).then(function(res){
        if(timer) clearTimeout(timer);
        if(!res.ok){
          var err = new Error('TTS_HTTP_' + res.status);
          err.status = res.status;
          throw err;
        }
        return res.blob();
      }, function(e){
        if(timer) clearTimeout(timer);
        throw e;
      });
    }).then(function(blob){
      if(!blob || !blob.size || (blob.type && blob.type.indexOf('audio') !== 0 && blob.type.indexOf('octet-stream') === -1)){
        throw new Error('TTS_BAD_AUDIO');
      }
      var url = URL.createObjectURL(blob);
      _cloudCache[key] = url;
      _cloudCacheOrder.push(key);
      while(_cloudCacheOrder.length > CLOUD_CACHE_MAX){
        var old = _cloudCacheOrder.shift();
        try { URL.revokeObjectURL(_cloudCache[old]); } catch(e){}
        delete _cloudCache[old];
      }
      return url;
    }).catch(function(e){
      var st = e && e.status;
      if(st === 429 || st === 402 || st === 503) _pauseCloud(30 * 60 * 1000);
      else if(e && e.message !== 'NOT_SIGNED_IN') _pauseCloud(2 * 60 * 1000);
      throw e;
    });
  }

  function stop(){
    _playToken++;
    _utteranceQueue = [];
    _isSpeaking = false;
    if(_cloudAudio){
      try {
        _cloudAudio.onended = null;
        _cloudAudio.onerror = null;
        _cloudAudio.pause();
      } catch(e){}
      _cloudAudio = null;
    }
    if(_hasSpeechSupport()){
      try { window.speechSynthesis.cancel(); } catch(e){}
    }
    if(_activeBtn){
      _setBtnState(_activeBtn, false);
      _activeBtn = null;
    }
  }

  /* Split long text into natural sentence chunks (< max chars; default 210 so Chrome Web Speech never times out) */
  function _chunkSentences(text, max){
    max = max || 210;
    var clean = String(text || '').replace(/\s+/g, ' ').trim();
    if(!clean) return [];
    var rawParts = clean.split(/(?<=[.!?؛،:])\s+/);
    var chunks = [];
    var current = '';
    for(var i = 0; i < rawParts.length; i++){
      var part = rawParts[i].trim();
      if(!part) continue;
      if((current + ' ' + part).trim().length <= max){
        current = (current ? (current + ' ' + part) : part);
      } else {
        if(current) chunks.push(current);
        if(part.length <= max){
          current = part;
        } else {
          /* Split very long clause on commas */
          var sub = part.split(/,\s+/);
          current = '';
          for(var j = 0; j < sub.length; j++){
            if((current + ', ' + sub[j]).trim().length <= max){
              current = current ? (current + ', ' + sub[j]) : sub[j];
            } else {
              if(current) chunks.push(current);
              current = sub[j];
            }
          }
        }
      }
    }
    if(current) chunks.push(current);
    return chunks.length ? chunks : [clean];
  }

  function _finishPlayback(token, opts){
    if(token !== _playToken) return;
    var finishedBtn = _activeBtn;
    _isSpeaking = false;
    _activeBtn = null;
    _cloudAudio = null;
    if(finishedBtn) _setBtnState(finishedBtn, false);
    if(typeof opts.onEnd === 'function') opts.onEnd();
  }

  /* Browser Web Speech voice (the original, always-available method). */
  function _speakBrowser(spokenText, lang, opts, token){
    if(token !== _playToken) return;
    if(!_hasSpeechSupport()){
      _finishPlayback(token, opts);
      return;
    }
    var voice = _pickBestVoice(lang);
    var chunks = _chunkSentences(spokenText);
    if(!chunks.length){
      _finishPlayback(token, opts);
      return;
    }
    var idx = 0;
    function speakNextChunk(){
      if(token !== _playToken) return;
      if(!_isSpeaking || idx >= chunks.length){
        _finishPlayback(token, opts);
        return;
      }
      var u = new window.SpeechSynthesisUtterance(chunks[idx]);
      u.lang = (lang === 'ar') ? 'ar-SA' : 'en-US';
      if(voice){
        u.voice = voice;
        if(voice.lang) u.lang = voice.lang;
      }
      u.rate = opts.rate || _speechRate || 0.98;
      u.pitch = 1.0;
      u.onend = function(){
        idx++;
        speakNextChunk();
      };
      u.onerror = function(){
        if(token !== _playToken) return;
        var errBtn = _activeBtn;
        _isSpeaking = false;
        _activeBtn = null;
        if(errBtn) _setBtnState(errBtn, false);
      };
      _utteranceQueue.push(u);
      try {
        window.speechSynthesis.speak(u);
      } catch(e){
        stop();
      }
    }
    speakNextChunk();
  }

  /* Cloud voice: chunk -> fetch -> play, prefetching the next chunk while the
     current one plays. Any failure hands the REMAINING text to the browser voice. */
  function _speakCloud(spokenText, lang, opts, token){
    var chunks = _chunkSentences(spokenText, CLOUD_CHUNK_MAX);
    if(!chunks.length){
      _finishPlayback(token, opts);
      return;
    }
    function fallbackFrom(i){
      if(token !== _playToken) return;
      _speakBrowser(chunks.slice(i).join(' '), lang, opts, token);
    }
    function playChunk(i, urlPromise){
      urlPromise.then(function(url){
        if(token !== _playToken) return;
        var nextPromise = null;
        if(i + 1 < chunks.length){
          nextPromise = _fetchCloudAudio(chunks[i + 1], lang);
          nextPromise.catch(function(){});
        }
        var a = new window.Audio(url);
        var rate = opts.rate || _speechRate || 1;
        a.playbackRate = Math.min(1.5, Math.max(0.7, rate));
        _cloudAudio = a;
        a.onended = function(){
          if(token !== _playToken) return;
          if(nextPromise) playChunk(i + 1, nextPromise);
          else _finishPlayback(token, opts);
        };
        a.onerror = function(){
          _pauseCloud(2 * 60 * 1000);
          fallbackFrom(i);
        };
        var p = a.play();
        if(p && typeof p.catch === 'function'){
          /* e.g. autoplay blocked after the network wait -> browser voice */
          p.catch(function(){ fallbackFrom(i); });
        }
      }, function(){
        fallbackFrom(i);
      });
    }
    playChunk(0, _fetchCloudAudio(chunks[0], lang));
  }

  function speak(text, opts){
    opts = opts || {};
    var lang = _detectLang(text, opts.lang);
    var spokenText = opts.alreadyConverted ? String(text || '').trim() : latexToSpeech(text, lang);
    if(!spokenText) return false;

    /* Toggle off if clicking the same active button while speaking */
    if(_isSpeaking && opts.btn && _activeBtn === opts.btn){
      stop();
      return false;
    }

    stop();

    var useCloud = _cloudAvailable();
    if(!useCloud && !_hasSpeechSupport()){
      return false;
    }

    var token = _playToken;
    _activeBtn = opts.btn || null;
    _isSpeaking = true;
    if(_activeBtn) _setBtnState(_activeBtn, true);

    if(useCloud) _speakCloud(spokenText, lang, opts, token);
    else _speakBrowser(spokenText, lang, opts, token);
    return true;
  }


  function toggleSpeak(btn, targetElOrText, lang){
    if(_isSpeaking && btn && _activeBtn === btn){
      stop();
      return;
    }
    var speech = (typeof targetElOrText === 'string')
      ? latexToSpeech(targetElOrText, lang)
      : extractSpeechText(targetElOrText, lang);
    speak(speech, { btn: btn, lang: lang, alreadyConverted: true });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Surface 1: Progressive Hints Narration
     ═══════════════════════════════════════════════════════════════════════════ */
  function speakTier(btn, ev){
    if(ev && typeof ev.stopPropagation === 'function'){
      ev.stopPropagation();
      ev.preventDefault();
    }
    if(!btn) return;
    if(_isSpeaking && _activeBtn === btn){
      stop();
      return;
    }
    var tierEl = btn.closest('.cs-hint-tier, details.hint-tier');
    if(!tierEl) return;
    if(tierEl.tagName === 'DETAILS' && !tierEl.open){
      tierEl.open = true;
    }
    var bodyEl = tierEl.querySelector('.cs-hint-body') || tierEl;
    var speech = extractSpeechText(bodyEl);
    speak(speech, { btn: btn, alreadyConverted: true });
  }

  function speakCurrentHint(btn){
    if(!btn) return;
    if(_isSpeaking && _activeBtn === btn){
      stop();
      return;
    }
    var wrap = btn.closest('.cs-hint-wrap');
    if(!wrap) return;
    var step = parseInt(wrap.getAttribute('data-hint-step') || '0', 10);
    if(step === 0){
      var hintBtn = wrap.querySelector('.cs-hint-btn');
      if(hintBtn && window.CSHintEngine && typeof window.CSHintEngine.revealNext === 'function'){
        window.CSHintEngine.revealNext(hintBtn);
        step = parseInt(wrap.getAttribute('data-hint-step') || '1', 10);
      }
    }
    var activeTier = wrap.querySelector('.cs-hint-tier[data-tier="' + step + '"]') || wrap.querySelector('.cs-hint-tier');
    if(!activeTier) return;
    var speech = extractSpeechText(activeTier);
    speak(speech, { btn: btn, alreadyConverted: true });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Surface 2: Worked Solutions Narration (Chapters, Practice Sets, Quizzes, Exams)
     ═══════════════════════════════════════════════════════════════════════════ */
  function speakProblemSolution(btn){
    if(!btn) return;
    if(_isSpeaking && _activeBtn === btn){
      stop();
      return;
    }
    var prob = btn.closest('.problem, .cq-item, .fep-item, .m-deck-card');
    if(!prob) return;

    /* If inside a lesson/practice-set .problem and solution is collapsed, open it so student can follow along visually */
    if(prob.classList.contains('problem') && !prob.classList.contains('open')){
      var solBtn = prob.querySelector('.sol-btn, .sol-toggle');
      if(solBtn && typeof window.toggleSol === 'function' && solBtn.classList.contains('sol-btn')){
        window.toggleSol(solBtn);
      } else {
        prob.classList.add('open');
      }
    }

    var solEl = prob.querySelector('.solution, .cq-sol-box, .fep-sol-block, .mdeck-sol-box');
    if(!solEl) return;
    var speech = extractSpeechText(solEl);
    speak(speech, { btn: btn, alreadyConverted: true });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Surface 3: Interactive Canvas Explorer Live State Narrator (.explorer)
     ═══════════════════════════════════════════════════════════════════════════ */
  function explainExplorer(btn){
    if(!btn) return;
    if(_isSpeaking && _activeBtn === btn){
      stop();
      return;
    }
    var exp = btn.closest('.explorer');
    if(!exp) return;

    var isAr = (window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar');
    var lang = isAr ? 'ar' : 'en';
    var parts = [];

    /* 1. Explorer Title */
    var titleEl = exp.querySelector('.ex-top .et');
    var titleText = titleEl ? extractSpeechText(titleEl, lang) : '';
    if(titleText){
      parts.push(isAr
        ? ('المستكشف التفاعلي: ' + titleText + '.')
        : ('Interactive Explorer: ' + titleText + '.'));
    }

    /* 2. Current Control / Slider Settings */
    var ctrlDescs = [];
    exp.querySelectorAll('.ex-controls .ctrl, .ex-controls label.chk').forEach(function(ctrl){
      if(ctrl.classList.contains('chk')){
        var chk = ctrl.querySelector('input[type="checkbox"]');
        var chkLbl = extractSpeechText(ctrl, lang);
        if(chk && chkLbl){
          ctrlDescs.push(chkLbl + (isAr ? (chk.checked ? ' مفعّل' : ' غير مفعّل') : (chk.checked ? ' is enabled' : ' is disabled')));
        }
        return;
      }
      var lblEl = ctrl.querySelector('label');
      var rangeEl = ctrl.querySelector('input[type="range"]');
      var selectEl = ctrl.querySelector('select');
      var activeRadio = ctrl.querySelector('.radios button.on');

      if(lblEl){
        var lblText = extractSpeechText(lblEl, lang);
        if(selectEl && selectEl.options && selectEl.selectedIndex >= 0){
          var optText = latexToSpeech(selectEl.options[selectEl.selectedIndex].text, lang);
          ctrlDescs.push(lblText + ': ' + optText);
        } else if(activeRadio){
          var radText = extractSpeechText(activeRadio, lang);
          ctrlDescs.push(lblText + ': ' + radText);
        } else if(rangeEl){
          var monoInLabel = lblEl.querySelector('.mono');
          if(monoInLabel){
            ctrlDescs.push(lblText);
          } else {
            ctrlDescs.push(lblText + (isAr ? ' مضبوط على ' : ' set to ') + latexToSpeech(rangeEl.value, lang));
          }
        }
      }
    });

    if(ctrlDescs.length){
      parts.push(isAr
        ? ('الإعدادات الحالية للمتغيرات هي: ' + ctrlDescs.join('، و') + '.')
        : ('Current parameter settings: ' + ctrlDescs.join(', ') + '.'));
    }

    /* 3. Live Equation Display (if present) */
    var eqDisplay = exp.querySelector('.ex-controls > .mono');
    if(eqDisplay && eqDisplay.textContent.trim()){
      var eqSpoken = extractSpeechText(eqDisplay, lang);
      if(eqSpoken){
        parts.push(isAr
          ? ('المعادلة الحالية هي: ' + eqSpoken + '.')
          : ('The active equation is: ' + eqSpoken + '.'));
      }
    }

    /* 4. Live Computed Readouts (.readout .readrow) */
    var readDescs = [];
    exp.querySelectorAll('.readout .readrow').forEach(function(row){
      var spans = row.children;
      if(spans && spans.length >= 2){
        var rLabel = extractSpeechText(spans[0], lang);
        var rVal = extractSpeechText(spans[1], lang);
        if(rLabel && rVal && rVal !== '—' && rVal !== '-'){
          readDescs.push(rLabel + (isAr ? ' يساوي ' : ' is ') + rVal);
        }
      }
    });
    if(readDescs.length){
      parts.push(isAr
        ? ('القيم الناتجة على الرسم الآن: ' + readDescs.join('، و') + '.')
        : ('Live calculated readouts: ' + readDescs.join(', ') + '.'));
    }

    /* 5. Pedagogical Note / Concept Takeaway */
    var noteEl = exp.querySelector('.callout.note');
    if(noteEl){
      var noteSpeech = extractSpeechText(noteEl, lang);
      if(noteSpeech){
        parts.push(isAr ? ('الفكرة الأساسية: ' + noteSpeech) : ('Key insight: ' + noteSpeech));
      }
    } else {
      parts.push(isAr
        ? 'جرّب تحريك أشرطة التمرير لتغيير المعاملات وملاحظة كيف يتغير التمثيل البياني والقيم المحسوبة فوراً.'
        : 'Try dragging the sliders or changing the controls, then click Explain again to hear how the graph and values respond.');
    }

    speak(parts.join(' '), { btn: btn, lang: lang, alreadyConverted: true });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Surface 4: Interactive Practice Activities Narrator (.ix-box)
     ═══════════════════════════════════════════════════════════════════════════ */
  function explainIxBox(btn){
    if(!btn) return;
    if(_isSpeaking && _activeBtn === btn){
      stop();
      return;
    }
    var box = btn.closest('.ix-box');
    if(!box) return;

    var isAr = (window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar');
    var lang = isAr ? 'ar' : 'en';
    var parts = [];

    var h3 = box.querySelector('h3');
    if(h3){
      parts.push(extractSpeechText(h3, lang) + '.');
    }

    /* Direct prompt paragraph if present */
    var promptP = box.querySelector(':scope > p');
    if(promptP){
      parts.push(extractSpeechText(promptP, lang) + '.');
    }

    /* Worked Example (Step Reveal): if no steps are revealed yet, reveal Step 1 automatically! */
    var srStepsWrap = box.querySelector('.ix-sr-steps');
    if(srStepsWrap){
      var revealedSteps = srStepsWrap.querySelectorAll('.ix-sr-step');
      if(revealedSteps.length === 0){
        var showFirstBtn = box.querySelector('.ix-sr-btn');
        if(showFirstBtn) showFirstBtn.click();
        revealedSteps = srStepsWrap.querySelectorAll('.ix-sr-step');
      }
      revealedSteps.forEach(function(stEl, idx){
        var body = stEl.querySelector('.ix-sr-body') || stEl;
        parts.push((isAr ? ('الخطوة ' + (idx + 1) + ': ') : ('Step ' + (idx + 1) + ': ')) + extractSpeechText(body, lang) + '.');
      });
    }

    /* Step Builder steps & visible hints */
    var sbSteps = box.querySelectorAll('.ix-sb-step');
    if(sbSteps.length){
      sbSteps.forEach(function(stEl, idx){
        var lbl = stEl.querySelector('.ix-sb-body > span');
        var inp = stEl.querySelector('.ix-sb-inp');
        var hintBox = stEl.querySelector('.ix-sb-hint-box');
        var stepDesc = (isAr ? ('الخطوة ' + (idx + 1) + ': ') : ('Step ' + (idx + 1) + ': '))
          + (lbl ? extractSpeechText(lbl, lang) : '');
        if(inp && inp.value){
          stepDesc += (isAr ? (' الإجابة المدخلة ' + latexToSpeech(inp.value, lang)) : (' current entry ' + latexToSpeech(inp.value, lang)));
        }
        if(hintBox && hintBox.style.display !== 'none'){
          stepDesc += '. ' + extractSpeechText(hintBox, lang);
        }
        parts.push(stepDesc + '.');
      });
    }

    /* Visible Feedback Boxes (.ix-fb, .ix-sb-res, .ix-tf-exp) */
    box.querySelectorAll('.ix-fb, .ix-sb-res.show, .ix-tf-exp.show, .ix-ms-tip-box').forEach(function(fb){
      if(fb.style && fb.style.display === 'none') return;
      var fbText = extractSpeechText(fb, lang);
      if(fbText) parts.push(fbText + '.');
    });

    speak(parts.join(' '), { btn: btn, lang: lang, alreadyConverted: true });
  }

  /* Stop any active narration if the student switches chapters or views */
  if(typeof document !== 'undefined'){
    document.addEventListener('visibilitychange', function(){
      if(document.hidden && _isSpeaking) stop();
    });
  }

  window.CSVoiceTutor = {
    isSupported: _hasSpeechSupport,
    latexToSpeech: latexToSpeech,
    extractSpeechText: extractSpeechText,
    speak: speak,
    stop: stop,
    toggleSpeak: toggleSpeak,
    speakTier: speakTier,
    speakCurrentHint: speakCurrentHint,
    speakProblemSolution: speakProblemSolution,
    explainExplorer: explainExplorer,
    explainIxBox: explainIxBox
  };
})();
