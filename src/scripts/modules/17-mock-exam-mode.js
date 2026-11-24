(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════
     CLIP-SAT COMPUTER-BASED TESTING (CBT) EXAM SIMULATOR
     Authentic testing environment for Digital SAT, Qiyas (GAT/SAAT),
     ACT, EST, Cambridge IGCSE / A-Level, AP, and IB Mathematics.
     Features: Single-question flow, Question Navigator Palette,
     Mark for Review, Pre-Submission Review Screen, Scaled Score Engine,
     and Deep Domain Diagnostics.
     ═══════════════════════════════════════════════════════════════════ */

  var _tmr = null, _secs = 0, _totalSecs = 0;
  var _trackId = '', _pidx = 0;
  var _paper = null;
  var _pool = [];
  var _curIdx = 0;
  var _answers = {}; // qIndex -> string or choice index
  var _flags = {}; // qIndex -> bool
  var _viewMode = 'cbt'; // 'cbt' (single question) or 'all' (stacked review)
  var _isSubmitted = false;
  var _lastDownloadArgs = null;
  var _satFullPool = [];
  var _satAdaptiveState = null;

  /* ── WP-42: 3PL IRT & 2-Stage Adaptive Digital SAT Engine ────────────── */
  var _SAT_DOMAIN_QUOTAS = [
    { name: 'Algebra', count: 8 },
    { name: 'Advanced Math', count: 8 },
    { name: 'Problem-Solving and Data Analysis', count: 3 },
    { name: 'Geometry and Trigonometry', count: 3 }
  ];

  function _getItemIRT(q) {
    if (q && q.irt && typeof q.irt.a === 'number' && typeof q.irt.b === 'number') {
      return { a: q.irt.a, b: q.irt.b, c: typeof q.irt.c === 'number' ? q.irt.c : (q.type === 'mcq' ? 0.25 : 0) };
    }
    var diff = String((q && q.difficulty) || 'medium').toLowerCase();
    var b = diff === 'easy' ? -1.1 : (diff === 'hard' ? 1.3 : 0.1);
    return { a: 1.25, b: b, c: (q && q.type === 'mcq') ? 0.25 : 0.0 };
  }

  function _compute3PLEAP(items, outcomes) {
    var nodes = 61;
    var minT = -4.0, maxT = 4.0, step = (maxT - minT) / (nodes - 1);
    var thetas = new Array(nodes);
    var logPost = new Array(nodes);
    var maxLP = -Infinity;
    for (var g = 0; g < nodes; g++) {
      var th = minT + g * step;
      thetas[g] = th;
      var lp = -0.5 * th * th;
      for (var i = 0; i < items.length; i++) {
        var prm = _getItemIRT(items[i]);
        var z = -1.702 * prm.a * (th - prm.b);
        var ez = z > 35 ? Infinity : (z < -35 ? 0 : Math.exp(z));
        var p = prm.c + (1 - prm.c) / (1 + ez);
        if (p < 1e-9) p = 1e-9;
        if (p > 1 - 1e-9) p = 1 - 1e-9;
        var y = outcomes[i] ? 1 : 0;
        lp += y ? Math.log(p) : Math.log(1 - p);
      }
      logPost[g] = lp;
      if (lp > maxLP) maxLP = lp;
    }
    var sumW = 0, sumTW = 0;
    var weights = new Array(nodes);
    for (var j = 0; j < nodes; j++) {
      var w = Math.exp(logPost[j] - maxLP);
      weights[j] = w;
      sumW += w;
      sumTW += thetas[j] * w;
    }
    var mean = sumW > 0 ? (sumTW / sumW) : 0;
    var sumVar = 0;
    for (var k = 0; k < nodes; k++) {
      var d = thetas[k] - mean;
      sumVar += d * d * weights[k];
    }
    var sem = sumW > 0 ? Math.sqrt(Math.max(0.01, sumVar / sumW)) : 1.0;
    return { theta: Math.round(mean * 1000) / 1000, sem: Math.round(sem * 1000) / 1000 };
  }

  function _thetaToSatScaled(theta, sem, routedTrack, rawCorrect, totalItems) {
    // Map logit [-3.0, +2.6] -> [200, 800], rounded to nearest 10
    var norm = (theta + 2.8) / 5.2;
    if (norm < 0) norm = 0;
    if (norm > 1) norm = 1;
    var rawScaled = 200 + norm * 600;
    if (totalItems > 0 && rawCorrect >= totalItems && routedTrack !== 'standard') {
      rawScaled = 800;
    } else if (totalItems > 0 && rawCorrect === 0) {
      rawScaled = 200;
    }
    if (routedTrack === 'standard') {
      // Authentic College Board routing ceiling on Standard/Lower Module 2
      rawScaled = Math.min(rawScaled, (totalItems > 0 && rawCorrect >= totalItems) ? 640 : 620);
    }
    var scaled = Math.max(200, Math.min(800, Math.round(rawScaled / 10) * 10));
    var ciBand = Math.max(10, Math.min(60, Math.round((sem * 105) / 10) * 10));
    return {
      score: scaled,
      ci: ciBand,
      low: Math.max(200, scaled - ciBand),
      high: Math.min(800, scaled + ciBand),
      theta: theta,
      sem: sem,
      routedTrack: routedTrack || 'hard'
    };
  }

  function _drawSatAdaptiveModule(rawPool, opts) {
    opts = opts || {};
    var stage = opts.stage || 1;
    var adaptiveTrack = opts.adaptiveTrack || 'routing'; // 'routing' | 'hard' | 'standard'
    var excludeIds = opts.excludeIds || new Set();
    var targetSpr = typeof opts.sprCount === 'number' ? opts.sprCount : (stage === 2 ? 6 : 5);
    var targetTotal = 22;

    var avail = (rawPool || []).filter(function (q) {
      return q && !excludeIds.has(q.id) && (q.type === 'mcq' || q.type === 'spr');
    });

    function inBand(q) {
      var b = _getItemIRT(q).b;
      if (stage === 2 && adaptiveTrack === 'hard') return b >= 0.05;
      if (stage === 2 && adaptiveTrack === 'standard') return b <= 0.65;
      return b >= -1.85 && b <= 1.75;
    }

    function shuf(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    var used = new Set();
    var chosenSpr = [];
    var chosenMcq = [];

    // Allocate SPRs across the 4 domains proportionally (2 Alg, 2 Adv, 1 PSDA/Geo, +1 for 6-SPR M2)
    var sprDomainPlan = targetSpr >= 6
      ? { 'Algebra': 2, 'Advanced Math': 2, 'Problem-Solving and Data Analysis': 1, 'Geometry and Trigonometry': 1 }
      : { 'Algebra': 2, 'Advanced Math': 2, 'Problem-Solving and Data Analysis': 1, 'Geometry and Trigonometry': 0 };

    _SAT_DOMAIN_QUOTAS.forEach(function (dq) {
      var domPool = avail.filter(function (q) { return q.domain === dq.name; });
      var bandDom = domPool.filter(inBand);
      var src = bandDom.length >= dq.count ? bandDom : domPool;

      var wantSpr = sprDomainPlan[dq.name] || 0;
      var wantMcq = dq.count - wantSpr;

      var sprCands = shuf(src.filter(function (q) { return q.type === 'spr'; }));
      if (sprCands.length < wantSpr) {
        sprCands = sprCands.concat(shuf(domPool.filter(function (q) { return q.type === 'spr' && sprCands.indexOf(q) === -1; })));
      }
      for (var s = 0; s < sprCands.length && wantSpr > 0; s++) {
        if (!used.has(sprCands[s].id)) {
          used.add(sprCands[s].id);
          chosenSpr.push(sprCands[s]);
          wantSpr--;
        }
      }
      wantMcq += wantSpr; // if domain lacked SPR, fill slot with MCQ and top up SPR below

      var mcqPool = src.filter(function (q) { return q.type === 'mcq' && !used.has(q.id); });
      // Prioritize >= 30% figure items per domain
      var figMcq = shuf(mcqPool.filter(function (q) { return Boolean(q.figure || q.fig); }));
      var plainMcq = shuf(mcqPool.filter(function (q) { return !(q.figure || q.fig); }));
      var orderedMcq = figMcq.slice(0, Math.ceil(wantMcq * 0.35)).concat(shuf(figMcq.slice(Math.ceil(wantMcq * 0.35)).concat(plainMcq)));
      if (orderedMcq.length < wantMcq) {
        orderedMcq = orderedMcq.concat(shuf(domPool.filter(function (q) { return q.type === 'mcq' && !used.has(q.id) && orderedMcq.indexOf(q) === -1; })));
      }
      for (var m = 0; m < orderedMcq.length && wantMcq > 0; m++) {
        if (!used.has(orderedMcq[m].id)) {
          used.add(orderedMcq[m].id);
          chosenMcq.push(orderedMcq[m]);
          wantMcq--;
        }
      }
    });

    // Top up if needed to exact targetTotal
    while (chosenSpr.length < targetSpr) {
      var extraSpr = avail.find(function (q) { return q.type === 'spr' && !used.has(q.id); });
      if (!extraSpr) break;
      used.add(extraSpr.id);
      chosenSpr.push(extraSpr);
    }
    while (chosenSpr.length + chosenMcq.length < targetTotal) {
      var extraMcq = avail.find(function (q) { return q.type === 'mcq' && !used.has(q.id); });
      if (!extraMcq) break;
      used.add(extraMcq.id);
      chosenMcq.push(extraMcq);
    }

    // Sort MCQs and SPRs smoothly by IRT difficulty b so each subset progresses naturally
    chosenMcq.sort(function (a, b) { return _getItemIRT(a).b - _getItemIRT(b).b; });
    chosenSpr.sort(function (a, b) { return _getItemIRT(a).b - _getItemIRT(b).b; });

    // Intersperse SPR items across authentic Bluebook positions (never clumped all at the end)
    var sprSlots = chosenSpr.length === 6 ? [3, 7, 11, 15, 18, 20] : [3, 8, 12, 16, 20];
    var sprSlotSet = {};
    for (var si = 0; si < chosenSpr.length && si < sprSlots.length; si++) sprSlotSet[sprSlots[si]] = true;

    var finalModule = [];
    var mi = 0, pi = 0;
    for (var pos = 0; pos < targetTotal; pos++) {
      if (sprSlotSet[pos] && pi < chosenSpr.length) {
        finalModule.push(chosenSpr[pi++]);
      } else if (mi < chosenMcq.length) {
        finalModule.push(chosenMcq[mi++]);
      } else if (pi < chosenSpr.length) {
        finalModule.push(chosenSpr[pi++]);
      }
    }
    return finalModule;
  }

  function _gradeSingleItemQuick(q, userAns) {
    if (!q) return false;
    if (q.type === 'spr') {
      var val = userAns != null ? String(userAns).trim().toLowerCase() : '';
      var target = String(q.sprAnswer != null ? q.sprAnswer : (q.ans != null ? q.ans : '')).trim().toLowerCase();
      if (!val || !target) return false;
      if (val === target) return true;
      if (window.ClipSATAnswerCheck && typeof window.ClipSATAnswerCheck.equivalent === 'function') {
        try { if (window.ClipSATAnswerCheck.equivalent(val, target)) return true; } catch (_e) { }
      }
      var toN = function (s) {
        if (!s) return NaN;
        if (s.indexOf('/') !== -1) {
          var p = s.split('/');
          var n = parseFloat(p[0]), d = parseFloat(p[1]);
          return (d !== 0 && !isNaN(n) && !isNaN(d)) ? (n / d) : NaN;
        }
        return parseFloat(s);
      };
      var vn = toN(val), tn = toN(target);
      return (!isNaN(vn) && !isNaN(tn) && Math.abs(vn - tn) < 1e-4);
    }
    var chosen = (userAns !== undefined && userAns !== null) ? parseInt(userAns, 10) : -1;
    return chosen === q.answer;
  }

  function _routeSatModule2(m1Items, m1Outcomes, fullPool) {
    var eap = _compute3PLEAP(m1Items, m1Outcomes);
    var rawM1 = 0;
    for (var i = 0; i < m1Outcomes.length; i++) { if (m1Outcomes[i]) rawM1++; }
    var routedTrack = (eap.theta >= 0.15 || rawM1 >= 15) ? 'hard' : 'standard';
    var exclude = new Set(m1Items.map(function (q) { return q.id; }));
    var m2Items = _drawSatAdaptiveModule(fullPool, {
      stage: 2,
      adaptiveTrack: routedTrack,
      excludeIds: exclude,
      sprCount: 6
    });
    return {
      routedTrack: routedTrack,
      m1Theta: eap.theta,
      m1Sem: eap.sem,
      m1Raw: rawM1,
      module2Items: m2Items
    };
  }

  function _complexityScore(q) {
    if (!q) return 0;
    var text = String(q.text || q.q || '');
    var sol = String(q.sol || q.solution || q.exp || q.expl || '');
    var score = Math.min(text.length, 600) * 0.12 + Math.min(sol.length, 900) * 0.15;
    var latexMatches = (text + ' ' + sol).match(/\\(?:frac|sqrt|int|sum|lim|sin|cos|tan|log|ln|binom|vec|matrix|begin)/g);
    if (latexMatches) score += latexMatches.length * 6;
    if (/\([b-d]\)|\([ii]+\)/i.test(text)) score += 25;
    if (q.figure || q.fig || q.table) score += 10;
    return score;
  }

  function _pickBalancedWithProgression(pool, allPool, targetCount, tracker) {
    var seenKeys = new Set();
    var filterUnique = function (arr) {
      var out = [];
      for (var i = 0; i < arr.length; i++) {
        var q = arr[i];
        var k = (q.id || q.text || q.q || '').trim();
        if (k && !seenKeys.has(k)) {
          out.push(q);
        }
      }
      return out;
    };
    var shuffleArr = function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    };
    var pickFromTier = function (bucket, targetCount, figRatio) {
      if (targetCount <= 0 || !bucket.length) return [];
      var shuf = shuffleArr(bucket);
      var withFig = shuf.filter(function (q) { return !!(q.figure || q.fig || q.table); });
      var noFig = shuf.filter(function (q) { return !(q.figure || q.fig || q.table); });
      var targetFigs = Math.min(withFig.length, Math.max(1, Math.ceil(targetCount * 0.30)));
      var chosen = [];
      for (var f = 0; f < withFig.length && chosen.length < targetFigs; f++) {
        var qf = withFig[f];
        var kf = (qf.id || qf.text || qf.q || '').trim();
        if (!seenKeys.has(kf) && (!tracker || tracker.add(qf))) {
          seenKeys.add(kf);
          chosen.push(qf);
        }
      }
      var rem = noFig.concat(withFig);
      for (var r = 0; r < rem.length && chosen.length < targetCount; r++) {
        var qr = rem[r];
        var kr = (qr.id || qr.text || qr.q || '').trim();
        if (!seenKeys.has(kr) && (!tracker || tracker.add(qr))) {
          seenKeys.add(kr);
          chosen.push(qr);
        }
      }
      chosen.sort(function (a, b) { return _complexityScore(a) - _complexityScore(b); });
      return chosen;
    };

    var easyQ = Math.max(1, Math.round(targetCount * 0.30));
    var hardQ = Math.max(1, Math.round(targetCount * 0.25));
    var medQ = Math.max(0, targetCount - easyQ - hardQ);

    var easyBucket = pool.filter(function (q) { return (q.difficulty || 'medium').toLowerCase() === 'easy'; });
    var medBucket = pool.filter(function (q) { return (q.difficulty || 'medium').toLowerCase() === 'medium'; });
    var hardBucket = pool.filter(function (q) { return (q.difficulty || 'medium').toLowerCase() === 'hard'; });

    var pEasy = pickFromTier(easyBucket, easyQ, 0.35).map(function (q) { return Object.assign({}, q, { difficulty: 'easy' }); });
    var pMed = pickFromTier(medBucket, medQ, 0.35).map(function (q) { return Object.assign({}, q, { difficulty: 'medium' }); });
    var pHard = pickFromTier(hardBucket, hardQ, 0.35).map(function (q) { return Object.assign({}, q, { difficulty: 'hard' }); });

    var picked = pEasy.concat(pMed).concat(pHard);

    // Backfill if needed from pool or allPool while preserving difficulty progression
    var backfillSources = [pool, allPool || []];
    for (var sIdx = 0; sIdx < backfillSources.length && picked.length < targetCount; sIdx++) {
      var src = shuffleArr(filterUnique(backfillSources[sIdx]));
      for (var b = 0; b < src.length && picked.length < targetCount; b++) {
        var qb = src[b];
        var kb = (qb.id || qb.text || qb.q || '').trim();
        if (!seenKeys.has(kb)) {
          seenKeys.add(kb);
          picked.push(qb);
        }
      }
    }

    var diffRank = { easy: 1, medium: 2, hard: 3 };
    picked.sort(function (a, b) {
      var da = diffRank[(a.difficulty || 'medium').toLowerCase()] || 2;
      var db = diffRank[(b.difficulty || 'medium').toLowerCase()] || 2;
      if (da !== db) return da - db;
      return _complexityScore(a) - _complexityScore(b);
    });
    return picked;
  }

  var MENA_BILINGUAL_TRACKS = {
    qudrat: 1, tahsili: 1, gaten: 1, 'gat-en': 1, 'saat-en': 1,
    sat: 1, est: 1, est2: 1, est2l2: 1, igcse: 1
  };

  function _resolveBankTrack(viewId) {
    var m = {
      'ib-aa-sl': 'ibsl',
      'ib-ai-sl': 'ibsl',
      'ib-aa-hl': 'ibhl',
      'ib-ai-hl': 'ibhl',
      'gat-en': 'gaten',
      'saat-en': 'gaten'
    };
    return m[viewId] || viewId;
  }

  function _activeExamLang(trackId) {
    try {
      var saved = (typeof localStorage !== 'undefined' && localStorage.getItem('clipsat_exam_lang')) || '';
      if (saved === 'ar' || saved === 'en' || saved === 'both') {
        if (MENA_BILINGUAL_TRACKS[trackId]) return saved;
      }
    } catch (_e) { }
    if (trackId === 'qudrat' || trackId === 'tahsili') return 'both';
    if (typeof document !== 'undefined') {
      if ((document.documentElement && document.documentElement.lang === 'ar') || (document.body && document.body.classList.contains('rtl'))) {
        return MENA_BILINGUAL_TRACKS[trackId] ? 'ar' : 'en';
      }
    }
    return 'en';
  }

  var PAPERS = {
    qudrat: [
      { name: 'القسم الكمي — اختبار محوسب كامل (Qudrat CBT)', minutes: 25, qCount: 24, calc: false, qcRatio: 0.292, domains: ['arithmetic', 'algebra', 'geometry', 'ratio', 'percent', 'speed', 'comparison'] },
      { name: 'قسم المقارنات الرياضية (Quantitative Comparisons)', minutes: 20, qCount: 20, calc: false, qcOnly: true, domains: ['comparison', 'arithmetic', 'geometry'] }
    ],
    tahsili: [
      { name: 'رياضيات التحصيلي — اختبار محوسب تجريبي (SAAT Math CBT)', minutes: 25, qCount: 22, calc: false, domains: ['functions', 'algebra', 'trig', 'vectors', 'matrices', 'calculus', 'probability'] }
    ],
    sat: [
      { name: 'Digital SAT® Math — Full 2-Stage Adaptive Test (Module 1 + Module 2)', minutes: 35, qCount: 22, calc: true, adaptiveTwoStage: true, satStratified: true, stage: 1, domains: ['algebra', 'advanced', 'problem-solving', 'geometry'] },
      { name: 'Digital SAT® Math — Module 1 (Routing Stage)', minutes: 35, qCount: 22, calc: true, satStratified: true, stage: 1, domains: ['algebra', 'advanced', 'problem-solving', 'geometry'] },
      { name: 'Digital SAT® Math — Module 2 (Hard Adaptive Stage)', minutes: 35, qCount: 22, calc: true, satStratified: true, stage: 2, adaptiveTrack: 'hard', domains: ['algebra', 'advanced', 'problem-solving', 'geometry'] },
      { name: 'Digital SAT® Math — Module 2 (Standard Adaptive Stage)', minutes: 35, qCount: 22, calc: true, satStratified: true, stage: 2, adaptiveTrack: 'standard', domains: ['algebra', 'advanced', 'problem-solving', 'geometry'] }
    ],
    igcse: [
      { name: 'Cambridge IGCSE® 0580 — Paper 2 (Non-Calculator)', minutes: 90, qCount: 20, calc: false, domains: ['number', 'algebra', 'geometry', 'trigonometry', 'probability', 'statistics'] },
      { name: 'Cambridge IGCSE® 0580 — Paper 4 (Calculator Allowed)', minutes: 120, qCount: 24, calc: true, domains: ['number', 'algebra', 'mensuration', 'geometry', 'trigonometry', 'statistics'] }
    ],
    act: [
      { name: 'ACT® Mathematics — Enhanced 4-Choice CBT', minutes: 50, qCount: 45, calc: true, domains: ['pre-algebra', 'elementary-algebra', 'intermediate-algebra', 'coordinate-geometry', 'plane-geometry', 'trigonometry'] }
    ],
    est: [
      { name: 'EST I — Section 3: Mathematics (No Calculator)', minutes: 25, qCount: 20, calc: false, domains: ['algebra', 'functions', 'geometry'] },
      { name: 'EST I — Section 4: Mathematics (Calculator Permitted)', minutes: 55, qCount: 38, calc: true, domains: ['algebra', 'functions', 'geometry', 'statistics'] }
    ],
    est2: [
      { name: 'EST II — Mathematics Level 1', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'geometry', 'trigonometry', 'statistics'] }
    ],
    est2l2: [
      { name: 'EST II — Mathematics Level 2 (Advanced)', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'complex', 'vectors', 'matrices', 'calculus', 'trigonometry'] }
    ],
    apab: [
      { name: 'AP® Calculus AB — Section I Part A (Non-Calculator)', minutes: 60, qCount: 28, calc: false, typeFilter: 'mcq', domains: ['limits', 'derivatives', 'integrals', 'applications'] },
      { name: 'AP® Calculus AB — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 14, calc: true, typeFilter: 'mcq', domains: ['derivatives', 'integrals', 'applications'] },
      { name: 'AP® Calculus AB — Section II Part A Free Response (Graphing Calculator)', minutes: 30, qCount: 2, calc: true, structuredOnly: true },
      { name: 'AP® Calculus AB — Section II Part B Free Response (No Calculator)', minutes: 60, qCount: 4, calc: false, structuredOnly: true }
    ],
    apbc: [
      { name: 'AP® Calculus BC — Section I Part A (Non-Calculator)', minutes: 60, qCount: 28, calc: false, typeFilter: 'mcq', domains: ['derivatives', 'integrals', 'series', 'parametrics', 'polars'] },
      { name: 'AP® Calculus BC — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 14, calc: true, typeFilter: 'mcq', domains: ['derivatives', 'integrals', 'series', 'vector-calculus'] },
      { name: 'AP® Calculus BC — Section II Part A Free Response (Graphing Calculator)', minutes: 30, qCount: 2, calc: true, structuredOnly: true },
      { name: 'AP® Calculus BC — Section II Part B Free Response (No Calculator)', minutes: 60, qCount: 4, calc: false, structuredOnly: true }
    ],
    appc: [
      { name: 'AP® Precalculus — Section I Part A (Non-Calculator)', minutes: 65, qCount: 28, calc: false, typeFilter: 'mcq', domains: ['polynomials', 'rationals', 'exponential', 'logarithmic', 'trigonometry'] },
      { name: 'AP® Precalculus — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 12, calc: true, typeFilter: 'mcq', domains: ['trigonometry', 'parameters', 'matrices'] },
      { name: 'AP® Precalculus — Section II Part A Free Response (Graphing Calculator)', minutes: 30, qCount: 2, calc: true, structuredOnly: true },
      { name: 'AP® Precalculus — Section II Part B Free Response (No Calculator)', minutes: 30, qCount: 2, calc: false, structuredOnly: true }
    ],
    apstats: [
      { name: 'AP® Statistics — Section I Multiple Choice', minutes: 90, qCount: 40, calc: true, typeFilter: 'mcq', domains: ['exploring-data', 'sampling-experimentation', 'probability', 'inference'] },
      { name: 'AP® Statistics — Section II Multi-Part Free Response', minutes: 90, qCount: 4, calc: true, structuredOnly: true }
    ],
    aslevel: [
      { name: 'Paper 1 — Pure Maths 1 (Cambridge 9709)', minutes: 105, qCount: 12, calc: true, domains: ['pure', 'algebra', 'quadratic', 'trigonometry', 'sequence', 'series', 'differentiation', 'integration'] },
      { name: 'Paper 4 — Mechanics 1 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['mechanic', 'forces', 'newton', 'energy', 'kinematics', 'work', 'power'] },
      { name: 'Paper 5 — Statistics 1 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['statistic', 'normal', 'binomial', 'permutation', 'combination', 'probability'] }
    ],
    a2level: [
      { name: 'Paper 3 — Pure Maths 3 (Cambridge 9709)', minutes: 110, qCount: 12, calc: true, domains: ['pure', 'complex', 'vector', 'differential equation', 'integration', 'series', 'numerical'] },
      { name: 'Paper 6 — Statistics 2 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['poisson', 'continuous random', 'sampling', 'hypothesis', 'estimation'] }
    ],
    ibsl: [
      { name: 'IB Math AA SL — Paper 1 (No Calculator)', minutes: 90, qCount: 9, calc: false, courseFilter: 'ib-aa-sl', paperFilter: 'P1' },
      { name: 'IB Math AA SL — Paper 2 (GDC Required)', minutes: 90, qCount: 9, calc: true, courseFilter: 'ib-aa-sl', paperFilter: 'P2' },
      { name: 'IB Math AI SL — Paper 1 (GDC Required)', minutes: 90, qCount: 9, calc: true, courseFilter: 'ib-ai-sl', paperFilter: 'P1' },
      { name: 'IB Math AI SL — Paper 2 (GDC Required)', minutes: 90, qCount: 9, calc: true, courseFilter: 'ib-ai-sl', paperFilter: 'P2' }
    ],
    ibhl: [
      { name: 'IB Math AA HL — Paper 1 (No Calculator)', minutes: 120, qCount: 11, calc: false, courseFilter: 'ib-aa-hl', paperFilter: 'P1' },
      { name: 'IB Math AA HL — Paper 2 (GDC Required)', minutes: 120, qCount: 11, calc: true, courseFilter: 'ib-aa-hl', paperFilter: 'P2' },
      { name: 'IB Math AA HL — Paper 3 (Investigation · GDC Required)', minutes: 60, qCount: 2, calc: true, courseFilter: 'ib-aa-hl', paperFilter: 'P3' },
      { name: 'IB Math AI HL — Paper 1 (GDC Required)', minutes: 120, qCount: 11, calc: true, courseFilter: 'ib-ai-hl', paperFilter: 'P1' },
      { name: 'IB Math AI HL — Paper 2 (GDC Required)', minutes: 120, qCount: 11, calc: true, courseFilter: 'ib-ai-hl', paperFilter: 'P2' },
      { name: 'IB Math AI HL — Paper 3 (Investigation · GDC Required)', minutes: 60, qCount: 2, calc: true, courseFilter: 'ib-ai-hl', paperFilter: 'P3' }
    ],
    act2: [
      { name: 'ACT® International Subject Test — Mathematics 1 (CBT)', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'functions', 'geometry', 'trigonometry', 'statistics'] }
    ],
    act2l2: [
      { name: 'ACT® International Subject Test — Mathematics 2 (Advanced CBT)', minutes: 60, qCount: 50, calc: true, domains: ['complex', 'matrices', 'vectors', 'functions', 'trigonometry', 'limits'] }
    ],
    addmath: [
      { name: 'Cambridge IGCSE® 0606 / Edexcel 4PM1 — Paper 1 (Non-Calculator)', minutes: 120, qCount: 14, calc: false, domains: ['functions', 'quadratic', 'polynomial', 'logarithm', 'trigonometry', 'permutation', 'differentiation', 'integration'] },
      { name: 'Cambridge IGCSE® 0606 / Edexcel 4PM1 — Paper 2 (Calculator Allowed)', minutes: 120, qCount: 14, calc: true, domains: ['functions', 'binomial', 'Circular', 'differentiation', 'integration', 'kinematics', 'vector'] }
    ],
    edexcel: [
      { name: 'Pearson Edexcel IGCSE® 4MA1 — Paper 1H (Higher Tier · Non-Calculator)', minutes: 120, qCount: 22, calc: false, domains: ['number', 'algebra', 'functions', 'geometry', 'trigonometry', 'differentiation', 'probability'] },
      { name: 'Pearson Edexcel IGCSE® 4MA1 — Paper 2H (Higher Tier · Calculator Allowed)', minutes: 120, qCount: 22, calc: true, domains: ['surds', 'quadratic', 'series', 'circle', 'vector', 'kinematics', 'statistics'] }
    ],
    gaten: [
      { name: 'ETEC / Qiyas English GAT — Quantitative Aptitude CBT', minutes: 25, qCount: 24, calc: false, subtrackFilter: 'gat-en', domains: ['GAT Arithmetic', 'GAT Ratios', 'GAT Quantitative', 'GAT Data'] },
      { name: 'ETEC / Qiyas English SAAT — Mathematics Achievement CBT', minutes: 25, qCount: 24, calc: false, subtrackFilter: 'saat-en', domains: ['SAAT Logic', 'SAAT Functions', 'SAAT Trigonometry', 'SAAT Differential'] }
    ],
    olympiad: [
      { name: 'NSMO of KSA (Mawhiba) — National Olympiad CBT Simulation', minutes: 90, qCount: 25, calc: false, typeFilter: 'mcq', domains: ['NSMO of KSA', 'Olympiad Algebra', 'Modular Arithmetic', 'Diophantine', 'Circle Geometry', 'Invariants'] },
      { name: 'KAUST Mathematics Competition (KMC) — Qualifier & Thuwal Finals CBT', minutes: 90, qCount: 25, calc: false, typeFilter: 'mcq', domains: ['KAUST', 'Olympiad Algebra', 'Recurrence', 'Bijective Counting', 'Triangle Centers'] },
      { name: 'MAA AMC 10/12 & Kangaroo Math Arabia — Competition Simulation', minutes: 75, qCount: 25, calc: false, typeFilter: 'mcq', domains: ['Olympiad Algebra', 'Modular Arithmetic', 'Diophantine', 'Bijective Counting', 'Recurrence', 'Circle Geometry', 'Triangle Centers', 'Invariants'] },
      { name: 'Olympiad Stage 1 — Integer Entry Qualifier (000–999 · No Calculator)', minutes: 90, qCount: 15, calc: false, typeFilter: 'spr' },
      { name: 'Olympiad Stage 2 — National Finals Deductive Proof Paper (No Calculator)', minutes: 120, qCount: 6, calc: false, structuredOnly: true }
    ],
    mathai: [
      { name: 'Math for AI & Data Science — Foundations Assessment (Part A: Linear Algebra & Optimization)', minutes: 60, qCount: 20, calc: true, domains: ['Vectors', 'Matrices', 'Gradient Descent'] },
      { name: 'Math for AI & Data Science — Statistical Modeling & PCA (Part B)', minutes: 60, qCount: 20, calc: true, domains: ['Probability', 'Distributions', 'Regression', 'Principal Component'] }
    ],
    algebra: [
      { name: 'Algebra I — Comprehensive End-of-Course Exam (Part 1: Non-Calculator)', minutes: 45, qCount: 20, calc: false, domains: ['linear', 'inequalities', 'systems', 'exponents', 'polynomials'] },
      { name: 'Algebra I — Comprehensive End-of-Course Exam (Part 2: Calculator)', minutes: 45, qCount: 20, calc: true, domains: ['functions', 'quadratics', 'exponential', 'radicals', 'data'] }
    ],
    geo: [
      { name: 'Euclidean & Analytic Geometry — Comprehensive Exam', minutes: 60, qCount: 30, calc: true, domains: ['angles', 'triangles', 'congruence', 'similarity', 'trigonometry', 'circles', 'volume'] }
    ],
    alg2: [
      { name: 'Algebra II — Comprehensive End-of-Course Assessment', minutes: 60, qCount: 30, calc: true, domains: ['functions', 'complex', 'polynomials', 'rational', 'exponential', 'logarithmic', 'sequences', 'conics'] }
    ],
    precalc: [
      { name: 'Pre-Calculus — Comprehensive Examination', minutes: 60, qCount: 30, calc: true, domains: ['functions', 'trigonometry', 'identities', 'vectors', 'polar', 'conics', 'matrices', 'limits'] }
    ],
    calculus: [
      { name: 'Differential & Integral Calculus — Part A (Non-Calculator)', minutes: 50, qCount: 22, calc: false, domains: ['limits', 'derivatives', 'applications', 'integrals'] },
      { name: 'Differential & Integral Calculus — Part B (Graphing Calculator)', minutes: 40, qCount: 16, calc: true, domains: ['derivatives', 'integrals', 'differential-equations', 'series'] }
    ],
    linalg: [
      { name: 'University Linear Algebra — Midterm Examination (Systems, Matrices & Spaces)', minutes: 75, qCount: 20, calc: false, domains: ['vectors', 'systems', 'matrices', 'determinants', 'subspaces'] },
      { name: 'University Linear Algebra — Final Examination (Eigenvalues, Orthogonality & SVD)', minutes: 90, qCount: 25, calc: false, domains: ['transformations', 'eigenvalues', 'orthogonality', 'symmetric'] }
    ],
    mvc: [
      { name: 'Multivariable Calculus — Midterm Exam (3D Vectors, Partial Derivatives & Gradients)', minutes: 75, qCount: 20, calc: false, domains: ['vectors', 'curves', 'partial', 'gradient', 'optimization'] },
      { name: 'Multivariable Calculus — Final Exam (Multiple Integrals & Vector Calculus)', minutes: 90, qCount: 25, calc: false, domains: ['double', 'triple', 'line-integrals', 'green', 'stokes', 'divergence'] }
    ],
    odes: [
      { name: 'Ordinary Differential Equations — Comprehensive University Exam', minutes: 90, qCount: 25, calc: false, domains: ['first-order', 'separable', 'second-order', 'laplace', 'systems', 'series', 'boundary'] }
    ]
  };
  PAPERS['ib-aa-sl'] = PAPERS.ibsl.slice(0, 2);
  PAPERS['ib-ai-sl'] = PAPERS.ibsl.slice(2, 4);
  PAPERS['ib-aa-hl'] = PAPERS.ibhl.slice(0, 3);
  PAPERS['ib-ai-hl'] = PAPERS.ibhl.slice(3, 6);
  PAPERS['gat-en'] = [PAPERS.gaten[0]];
  PAPERS['saat-en'] = [PAPERS.gaten[1]];

  function _ensureBank(viewId) {
    var canonicalId = _resolveBankTrack(viewId);
    if (window.fullExamBank && window.fullExamBank[canonicalId] && window.fullExamBank[canonicalId].pool) {
      return Promise.resolve(window.fullExamBank[canonicalId]);
    }
    if (window.CS_loadTrackBank) {
      return window.CS_loadTrackBank(canonicalId);
    }
    return fetch('/bank-data/' + canonicalId + '.json?v=20261105a')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d) {
          window.fullExamBank = window.fullExamBank || {};
          window.fullExamBank[canonicalId] = d;
        }
        return d;
      })
      .catch(function () { return null; });
  }

  function _renderQFig(q) {
    var f = q.figure || q.fig || q.table;
    if (!f) return '';
    if (typeof f === 'string') return f;
    if (f.type === 'table' || Array.isArray(f.headers) || Array.isArray(f.rows)) {
      var hdrs = (Array.isArray(f.headers) ? f.headers : []).map(function (th) {
        return '<th>' + (typeof window._autoMath === 'function' ? window._autoMath(th != null ? String(th) : '') : th) + '</th>';
      }).join('');
      var rawRows = Array.isArray(f.rows) ? f.rows : (Array.isArray(f.data) ? f.data : []);
      var rws = rawRows.map(function (r) {
        return '<tr>' + (Array.isArray(r) ? r.map(function (c) {
          return '<td>' + (typeof window._autoMath === 'function' ? window._autoMath(c != null ? String(c) : '') : c) + '</td>';
        }).join('') : '<td>' + String(r) + '</td>') + '</tr>';
      }).join('');
      return '<div class="table-wrap"><table class="exam-table">' + (hdrs ? '<thead><tr>' + hdrs + '</tr></thead>' : '') + '<tbody>' + rws + '</tbody></table></div>';
    }
    if (window._renderFig) return window._renderFig(f);
    if (window.renderMathFigure) return window.renderMathFigure(f);
    return '';
  }

  function _isQuantComp(q) {
    if (!q) return false;
    if (q.qc_col_a && q.qc_col_b) return true;
    if (q.domain === 'Quantitative Comparisons' || q.domain === 'Quantitative Comparison') return true;
    var t = (q.text || q.q || '').trim();
    return (
      t.indexOf('قارن') !== -1 ||
      t.indexOf('Compare') !== -1 ||
      (t.indexOf('العمود A') !== -1 && t.indexOf('العمود B') !== -1) ||
      (t.indexOf('العمود أ') !== -1 && t.indexOf('العمود ب') !== -1) ||
      (t.indexOf('Quantity A') !== -1 && t.indexOf('Quantity B') !== -1) ||
      (t.indexOf('القيمة الأولى') !== -1 && t.indexOf('القيمة الثانية') !== -1) ||
      Boolean(q.val1 && q.val2)
    );
  }

  function _parseCompBoxes(q, langMode) {
    if (q && (q.qc_col_a || q.qc_col_a_ar)) {
      var mode = langMode || 'both';
      var caAr = q.qc_col_a_ar || q.qc_col_a || '';
      var cbAr = q.qc_col_b_ar || q.qc_col_b || '';
      var caEn = q.qc_col_a || q.qc_col_a_ar || '';
      var cbEn = q.qc_col_b || q.qc_col_b_ar || '';
      var ctxAr = q.qc_context_ar || '';
      var ctxEn = q.qc_context || '';
      var v1, v2, ctxOut;
      if (mode === 'ar') {
        v1 = caAr; v2 = cbAr; ctxOut = ctxAr || ctxEn;
      } else if (mode === 'en') {
        v1 = caEn; v2 = cbEn; ctxOut = ctxEn || ctxAr;
      } else {
        v1 = (caAr && caEn && caAr !== caEn) ? (caAr + ' <span style="color:var(--muted,#64748b);font-size:.85em">(' + caEn + ')</span>') : (caAr || caEn);
        v2 = (cbAr && cbEn && cbAr !== cbEn) ? (cbAr + ' <span style="color:var(--muted,#64748b);font-size:.85em">(' + cbEn + ')</span>') : (cbAr || cbEn);
        ctxOut = (ctxAr && ctxEn && ctxAr !== ctxEn) ? (ctxAr + ' / ' + ctxEn) : (ctxAr || ctxEn);
      }
      return { context: ctxOut, val1: v1, val2: v2 };
    }

    var t = (q.text || q.q || '').trim();
    var val1 = q.val1 || '', val2 = q.val2 || '', context = q.context || '';

    if (!val1 && !val2) {
      var clean = t.replace(/<strong>قارن\s*\/?\s*Compare:?<\/strong>/i, '').trim();
      var emMatch = clean.match(/<em>([\s\S]*?)<\/em>/i);
      var arPart = clean.replace(/<em>[\s\S]*?<\/em>/i, '').trim();
      var enPart = emMatch ? emMatch[1].trim() : '';

      var colAMatch = arPart.match(/(?:العمود\s*[Aأ]|القيمة\s*الأولى|Quantity\s*A)\s*[:：\-]?\s*([^\n\r<]+)/i);
      var colBMatch = arPart.match(/(?:العمود\s*[Bب]|القيمة\s*الثانية|Quantity\s*B)\s*[:：\-]?\s*([^\n\r<]+)/i);

      var splitColA = arPart.split(/(?:العمود\s*[Aأ]|القيمة\s*الأولى|Quantity\s*A)\s*[:：\-]?/i);
      if (splitColA.length > 1) {
        var rawCtx = splitColA[0].replace(/<br\s*\/?>/gi, ' ').trim();
        if (rawCtx) {
          context = rawCtx;
        }
      }

      if (colAMatch) val1 = colAMatch[1].trim();
      if (colBMatch) val2 = colBMatch[1].trim();

      if (enPart) {
        var enColAMatch = enPart.match(/Quantity\s*A\s*[:：\-]?\s*([^\n\r<]+)/i);
        var enColBMatch = enPart.match(/Quantity\s*B\s*[:：\-]?\s*([^\n\r<]+)/i);
        var enSplit = enPart.split(/Quantity\s*A\s*[:：\-]?/i);
        var enCtx = (enSplit.length > 1) ? enSplit[0].replace(/<br\s*\/?>/gi, ' ').trim() : '';

        if (enCtx && context && context !== enCtx) {
          context = context + ' / ' + enCtx;
        } else if (!context && enCtx) {
          context = enCtx;
        }

        if (enColAMatch && enColAMatch[1].trim() !== val1) {
          val1 = val1 + ' <span style="color:var(--muted,#64748b);font-size:.85em">(' + enColAMatch[1].trim() + ')</span>';
        }
        if (enColBMatch && enColBMatch[1].trim() !== val2) {
          val2 = val2 + ' <span style="color:var(--muted,#64748b);font-size:.85em">(' + enColBMatch[1].trim() + ')</span>';
        }
      }
    }
    return { context: context, val1: val1, val2: val2 };
  }

  function _filterPoolForPaper(rawPool, paper) {
    var base = (rawPool || []).filter(function (q) {
      var d = (q.domain || '').toLowerCase();
      return d.indexOf('format') === -1 && d.indexOf('strategy') === -1 && d.indexOf('overview') === -1;
    });
    if (!paper) return base;

    // WP-37: Strict No-Calculator filter — never admit calc:true items into a No-Calc paper
    if (paper.calc === false) {
      base = base.filter(function (q) { return q.calc === false; });
    }
    if (paper.subtrackFilter) {
      var subFiltered = base.filter(function (q) { return q.subtrack === paper.subtrackFilter; });
      if (subFiltered.length) base = subFiltered;
    }
    if (paper.courseFilter) {
      var crsFiltered = base.filter(function (q) { return q.course === paper.courseFilter; });
      if (crsFiltered.length) base = crsFiltered;
    }
    if (paper.paperFilter) {
      var pFiltered = base.filter(function (q) {
        return q.paper && q.paper.indexOf(paper.paperFilter) !== -1;
      });
      if (pFiltered.length >= Math.min(2, paper.qCount || 2)) base = pFiltered;
    }
    if (paper.structuredOnly) {
      var sFiltered = base.filter(function (q) { return q.type === 'structured' || q.type === 'proof'; });
      if (sFiltered.length) base = sFiltered;
    } else if (paper.typeFilter) {
      var tFiltered = base.filter(function (q) { return q.type === paper.typeFilter; });
      if (tFiltered.length) base = tFiltered;
    }
    if (paper.qcOnly) {
      var qcFiltered = base.filter(function (q) { return _isQuantComp(q); });
      if (qcFiltered.length) base = qcFiltered;
    }
    return base;
  }

  function _drawPaperPool(rawPool, paper, tracker) {
    if (paper && (paper.satStratified || paper.adaptiveTwoStage)) {
      return _drawSatAdaptiveModule(rawPool, {
        stage: paper.stage || 1,
        adaptiveTrack: paper.adaptiveTrack || 'routing',
        sprCount: (paper.stage === 2) ? 6 : 5
      });
    }
    var strictBase = _filterPoolForPaper(rawPool, paper);
    var domainFilter = paper && paper.domains;
    var pool = strictBase;
    if (domainFilter && domainFilter.length) {
      var filtered = strictBase.filter(function (q) {
        var d = ((q.domain || '') + ' ' + (q.text || q.q || '')).toLowerCase();
        return domainFilter.some(function (f) { return d.indexOf(f.toLowerCase()) !== -1; });
      });
      if (filtered.length >= Math.min(8, strictBase.length)) pool = filtered;
    }
    var targetCount = Math.min((paper && paper.qCount) || 20, strictBase.length);
    if (paper && typeof paper.qcRatio === 'number' && paper.qcRatio > 0 && targetCount >= 8) {
      var qcPool = strictBase.filter(function (q) { return _isQuantComp(q); });
      var nonQcPool = pool.filter(function (q) { return !_isQuantComp(q); });
      var qcTarget = Math.min(qcPool.length, Math.round(targetCount * paper.qcRatio));
      var nonQcTarget = Math.max(0, targetCount - qcTarget);
      var pickedNonQc = _pickBalancedWithProgression(nonQcPool, nonQcPool, nonQcTarget, tracker);
      var pickedQc = _pickBalancedWithProgression(qcPool, qcPool, qcTarget, tracker);
      return pickedNonQc.concat(pickedQc);
    }
    // IMPORTANT: pass strictBase (already No-Calc / subtrack / course filtered) as backfill source!
    return _pickBalancedWithProgression(pool, strictBase, targetCount, tracker);
  }

  function _isQuestionAnswered(idx) {
    var ans = _answers[idx];
    if (ans === undefined || ans === null) return false;
    if (typeof ans === 'object') {
      return window.CSStructuredFRQ ? window.CSStructuredFRQ.isStateAnswered(ans) : Object.keys(ans).length > 0;
    }
    return String(ans).trim() !== '';
  }

  function _goToQuestion(idx) {
    if (idx < 0 || idx >= _pool.length) return;
    _curIdx = idx;

    var body = document.getElementById('mock-exam-body');
    if (!body) return;

    var qs = body.querySelectorAll('.mock-q');
    qs.forEach(function (el, i) {
      if (_viewMode === 'all') {
        el.classList.remove('cbt-hidden');
      } else {
        if (i === idx) el.classList.remove('cbt-hidden');
        else el.classList.add('cbt-hidden');
      }
    });

    _updateHeaderTools();
    _updateFooterNav();
    _typesetMath(body);

    body.scrollTop = 0;
  }

  function _toggleFlag() {
    _flags[_curIdx] = !_flags[_curIdx];
    _updateHeaderTools();
    _updateFooterNav();
  }

  function _toggleViewMode() {
    _viewMode = (_viewMode === 'cbt' ? 'all' : 'cbt');
    _goToQuestion(_curIdx);
  }

  function _toggleFullscreen() {
    var overlay = document.getElementById('mock-exam-overlay');
    if (!document.fullscreenElement) {
      if (overlay && overlay.requestFullscreen) overlay.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  function _updateHeaderTools() {
    var flagBtn = document.getElementById('cbt-flag-btn');
    if (flagBtn) {
      var isFlagged = !!_flags[_curIdx];
      flagBtn.classList.toggle('flagged', isFlagged);
      flagBtn.innerHTML = isFlagged ? '🚩 Flagged' : '🏳️ Flag for Review';
      flagBtn.style.display = _isSubmitted ? 'none' : 'inline-flex';
    }
    var curQ = _pool[_curIdx];
    if (curQ && typeof curQ.calc === 'boolean' && !_isSubmitted) {
      if (typeof window.setFloatingCalcLocked === 'function') {
        window.setFloatingCalcLocked(curQ.calc === false, (_paper && _paper.name) || '');
      }
      var titleEl = document.getElementById('mock-exam-title');
      if (titleEl && _paper) {
        var calcBadge = curQ.calc
          ? '<span style="background:rgba(255,255,255,.18);padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:600">🖩 Calculator Allowed</span>'
          : '<span style="background:#b91c1c;padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:700">🚫 No Calculator</span>';
        titleEl.innerHTML = '<span>' + _paper.name + '</span> ' + calcBadge;
      }
    }
  }

  function _updateFooterNav() {
    var footer = document.getElementById('mock-exam-footer');
    if (!footer || _isSubmitted) return;

    var isLast = (_curIdx === _pool.length - 1);
    var isFirst = (_curIdx === 0);

    var answeredCount = 0;
    for (var i = 0; i < _pool.length; i++) {
      if (_isQuestionAnswered(i)) answeredCount++;
    }

    var html = '<div class="mock-cbt-nav">'
      + '<button type="button" class="cbt-nav-btn" onclick="window.cbtPrevQuestion()" ' + (isFirst ? 'disabled' : '') + '>← Previous</button>'
      + '<div style="display:flex;align-items:center;gap:8px">'
      + '  <button type="button" class="cbt-q-pill" onclick="window.toggleCBTPalette()">'
      + '    <span>▤ Question ' + (_curIdx + 1) + ' of ' + _pool.length + '</span>'
      + '    <span style="font-size:.72rem;background:rgba(0,0,0,.08);padding:2px 7px;border-radius:10px">' + answeredCount + '/' + _pool.length + '</span>'
      + '  </button>'
      + '  <button type="button" class="cbt-nav-btn" style="padding:7px 12px;font-size:.78rem" onclick="window.cbtToggleViewMode()">' + (_viewMode === 'cbt' ? '📄 View All' : '🎯 Single Q') + '</button>'
      + '</div>';

    if (isLast) {
      html += '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.cbtShowReviewScreen()">Review & Finish →</button>';
    } else {
      html += '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.cbtNextQuestion()">Next →</button>';
    }
    html += '</div>';

    footer.innerHTML = html;
  }

  window.cbtPrevQuestion = function () {
    if (_curIdx > 0) _goToQuestion(_curIdx - 1);
  };

  window.cbtNextQuestion = function () {
    if (_curIdx < _pool.length - 1) _goToQuestion(_curIdx + 1);
    else window.cbtShowReviewScreen();
  };

  window.cbtToggleViewMode = function () {
    _toggleViewMode();
  };

  window.toggleCBTPalette = function () {
    var modal = document.getElementById('cbt-palette-modal');
    if (!modal) return;
    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
    } else {
      _renderPalette(modal);
      modal.classList.add('show');
    }
  };

  window.closeCBTPalette = function () {
    var modal = document.getElementById('cbt-palette-modal');
    if (modal) modal.classList.remove('show');
  };

  function _renderPalette(container) {
    var answeredCount = 0;
    var flaggedCount = 0;
    var gridHtml = '';

    for (var i = 0; i < _pool.length; i++) {
      var ans = _isQuestionAnswered(i);
      var flg = !!_flags[i];
      var act = (i === _curIdx);
      if (ans) answeredCount++;
      if (flg) flaggedCount++;

      var cls = 'cbt-pal-item' + (ans ? ' answered' : '') + (flg ? ' flagged' : '') + (act ? ' active' : '');
      gridHtml += '<button type="button" class="' + cls + '" onclick="window.cbtJumpQuestion(' + i + ')">' + (i + 1) + '</button>';
    }

    container.innerHTML = [
      '<div class="cbt-palette-card">',
      '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border,#cbd5e1);padding-bottom:12px;margin-bottom:14px">',
      '<h4 style="margin:0;font-size:1.1rem;font-weight:700">Question Navigator Palette</h4>',
      '<button type="button" class="mock-exit-btn" onclick="window.closeCBTPalette()" style="padding:2px 8px;font-size:1.2rem">&times;</button>',
      '</div>',
      '<div style="display:flex;gap:12px;font-size:.78rem;color:var(--muted,#64748b);margin-bottom:14px;flex-wrap:wrap">',
      '<span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:3px;background:#dbeafe;border:1.5px solid #3b82f6;display:inline-block"></span> Answered (' + answeredCount + ')</span>',
      '<span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:3px;background:#fff;border:1.5px solid #cbd5e1;display:inline-block"></span> Unanswered (' + (_pool.length - answeredCount) + ')</span>',
      '<span style="display:flex;align-items:center;gap:5px">🚩 Marked for Review (' + flaggedCount + ')</span>',
      '</div>',
      '<div class="cbt-palette-grid">' + gridHtml + '</div>',
      '<div style="margin-top:16px;display:flex;justify-content:space-between;gap:10px">',
      '<button type="button" class="cbt-nav-btn" onclick="window.cbtShowReviewScreen()">Review Summary Screen</button>',
      '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.closeCBTPalette()">Back to Current Question</button>',
      '</div>',
      '</div>'
    ].join('');
  }

  window.cbtJumpQuestion = function (idx) {
    window.closeCBTPalette();
    _goToQuestion(idx);
  };

  window.cbtShowReviewScreen = function () {
    window.closeCBTPalette();
    var body = document.getElementById('mock-exam-body');
    if (!body) return;

    var answeredCount = 0;
    var flaggedCount = 0;
    var rowsHtml = '';

    for (var i = 0; i < _pool.length; i++) {
      var q = _pool[i];
      var ans = _isQuestionAnswered(i);
      var flg = !!_flags[i];
      if (ans) answeredCount++;
      if (flg) flaggedCount++;

      var statusBadge = ans
        ? '<span style="background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:4px;font-size:.75rem;font-weight:700">✓ Answered</span>'
        : '<span style="background:#fef3c7;color:#b45309;padding:3px 8px;border-radius:4px;font-size:.75rem;font-weight:700">⚠️ Unanswered</span>';

      var flagBadge = flg
        ? '<span style="background:#fef2f2;color:#b91c1c;padding:3px 8px;border-radius:4px;font-size:.75rem;font-weight:700">🚩 For Review</span>'
        : '';

      rowsHtml += '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--paper,#fff);justify-content:space-between">'
        + '<div style="display:flex;align-items:center;gap:12px">'
        + '  <span style="font-weight:800;font-size:.9rem;color:var(--indigo,#1e3e70);width:32px">#' + (i + 1) + '</span>'
        + '  <span style="font-size:.82rem;color:var(--muted,#64748b)">' + (q.domain || 'Mathematics') + '</span>'
        + '</div>'
        + '<div style="display:flex;align-items:center;gap:8px">'
        + statusBadge + flagBadge
        + '  <button type="button" class="cbt-nav-btn" style="padding:4px 10px;font-size:.76rem" onclick="window.cbtReturnToQuestion(' + i + ')">Go to Q →</button>'
        + '</div>'
        + '</div>';
    }

    var alertMsg = (answeredCount === _pool.length)
      ? '<div style="background:#f0fdf4;border:1px solid #86efac;color:#166534;padding:12px;border-radius:8px;margin-bottom:16px;font-size:.88rem;font-weight:600">Great job! You have answered all ' + _pool.length + ' questions. Ready to submit?</div>'
      : '<div style="background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:12px;border-radius:8px;margin-bottom:16px;font-size:.88rem;font-weight:600">⚠️ Notice: You still have <strong>' + (_pool.length - answeredCount) + ' unanswered question(s)</strong>. Are you sure you want to finish now?</div>';

    body.innerHTML = [
      '<div style="max-width:760px;margin:0 auto">',
      '<div style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:12px;padding:24px;box-shadow:0 8px 24px rgba(0,0,0,.06)">',
      '<h3 style="margin-top:0;font-size:1.3rem;font-weight:800;color:var(--indigo,#132746)">Examination Section Review</h3>',
      '<p style="color:var(--muted,#64748b);font-size:.88rem;margin-bottom:16px">Check your answers and flagged items before submitting your paper.</p>',
      alertMsg,
      '<div style="border:1px solid var(--border,#cbd5e1);border-radius:8px;overflow:hidden;margin-bottom:20px;max-height:55vh;overflow-y:auto">' + rowsHtml + '</div>',
      '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">',
      '<button type="button" class="cbt-nav-btn" onclick="window.cbtReturnToQuestion(' + _curIdx + ')">← Return to Questions</button>',
      '<button type="button" class="mock-submit-btn" style="padding:10px 24px;font-size:.95rem" onclick="submitMockExam()">Submit Final Examination ✓</button>',
      '</div>',
      '</div>',
      '</div>'
    ].join('');

    var footer = document.getElementById('mock-exam-footer');
    if (footer) footer.innerHTML = '';
  };

  window.cbtReturnToQuestion = function (idx) {
    // Re-render questions into body and jump
    _renderQuestionsDOM();
    _goToQuestion(idx || 0);
  };

  function _typesetMath(el) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (e) { }
    } else if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([el]).catch(function () { });
    }
  }

  function _bindStructuredFRQHook() {
    if (window.CSStructuredFRQ && typeof window.CSStructuredFRQ.setOnChangeHook === 'function') {
      window.CSStructuredFRQ.setOnChangeHook(function (qIdx, st) {
        _answers[qIdx] = Object.assign({}, st);
        _updateFooterNav();
      });
    }
  }
  _bindStructuredFRQHook();

  var _prevSetExamLang = window.ClipSATSetExamLang;
  window.ClipSATSetExamLang = function (lang, btn) {
    try { localStorage.setItem('clipsat_exam_lang', lang); } catch (_e) { }
    if (typeof _prevSetExamLang === 'function') {
      try { _prevSetExamLang(lang, btn); } catch (_e2) { }
    } else if (typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('cs-lang-ar', 'cs-lang-en', 'cs-lang-both');
      document.body.classList.add('cs-lang-' + lang);
      document.querySelectorAll('.cs-lt-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
    }
    if (!_isSubmitted && typeof document !== 'undefined' && document.body && document.body.classList.contains('cbt-open') && _pool && _pool.length) {
      _renderQuestionsDOM();
      _goToQuestion(_curIdx);
    }
  };

  function _selectBilingualStem(q, activeLang) {
    var _loc = window.CSItemLocale;
    var enTxt = (q.text || q.q || '').trim();
    var arTxt = (q.text_ar || '').trim();
    if(_loc && _loc.isBoilerplateAr(arTxt)) arTxt = '';
    if (!arTxt) return enTxt;
    var hasEmbeddedBi = /en-trans|<em>/i.test(enTxt) && /[\u0600-\u06FF]/.test(enTxt);
    if (activeLang === 'ar') {
      return arTxt;
    }
    if (activeLang === 'both') {
      if (hasEmbeddedBi) return enTxt;
      if (arTxt === enTxt) return arTxt;
      return '<span class="q-lang-ar" dir="rtl">' + arTxt + '</span><br><span class="q-lang-en en-trans" dir="ltr">' + enTxt + '</span>';
    }
    return enTxt;
  }

  function _selectBilingualChoices(q, activeLang) {
    var _loc = window.CSItemLocale;
    var enCh = Array.isArray(q.choices) ? q.choices : [];
    var arCh = Array.isArray(q.choices_ar) && q.choices_ar.length === enCh.length && !(_loc && q.choices_ar.some(_loc.isBoilerplateAr)) ? q.choices_ar : null;
    if (!arCh) return enCh;
    if (activeLang === 'ar') return arCh;
    if (activeLang === 'both') {
      return enCh.map(function (c, idx) {
        var a = String(arCh[idx] || '').trim();
        var e = String(c || '').trim();
        if (!a || a === e || /[\u0600-\u06FF]/.test(e)) return e || a;
        return '<span class="q-lang-ar" dir="rtl">' + a + '</span> <span class="q-lang-en en-trans" dir="ltr">(' + e + ')</span>';
      });
    }
    return enCh;
  }

  function _renderQuestionsDOM() {
    var body = document.getElementById('mock-exam-body');
    if (!body) return;

    var h = '';
    var activeLang = (_paper && _paper.lang) ? _paper.lang : _activeExamLang(_trackId);
    var isArPaper = (activeLang === 'ar');
    var letters = (_paper && Array.isArray(_paper.letters) && _paper.letters.length)
      ? _paper.letters
      : (isArPaper ? ['أ', 'ب', 'ج', 'د'] : ['A', 'B', 'C', 'D', 'E']);
    var _fmtBi = window.CSFormatBilingual || function (s) { return s; };

    _pool.forEach(function (q, i) {
      var isPre = Boolean(q.preRendered);
      var isComp = !isPre && _isQuantComp(q);
      var isStructured = !isPre && (q.type === 'structured' || q.type === 'proof') && Array.isArray(q.parts) && q.parts.length > 0 && Boolean(window.CSStructuredFRQ);
      var figHtml = isPre ? (q.figure || '') : _renderQFig(q);
      var qText = isPre ? (q.text || q.q || '').trim() : _selectBilingualStem(q, activeLang);
      var activeChoices = isPre ? (q.choices || []) : _selectBilingualChoices(q, activeLang);
      var isFlagged = !!_flags[i];
      var diffKey = ['easy', 'medium', 'hard'].indexOf((q.difficulty || '').toLowerCase()) !== -1
        ? q.difficulty.toLowerCase()
        : 'medium';
      var diffLabel = isArPaper
        ? (diffKey === 'easy' ? 'أساسي' : (diffKey === 'hard' ? 'متقدم / تحدي' : 'قياسي'))
        : (diffKey === 'easy' ? 'Foundational' : (diffKey === 'hard' ? 'Challenging' : 'Standard'));
      var diffStyle = diffKey === 'easy'
        ? 'background:#dcfce7;color:#166534;border:1px solid #bbf7d0'
        : (diffKey === 'hard'
          ? 'background:#fee2e2;color:#991b1b;border:1px solid #fecaca'
          : 'background:#fef3c7;color:#92400e;border:1px solid #fde68a');
      var secBanner = '';
      if (q.sectionTitle) {
        secBanner = '<div style="font-size:.75rem;font-weight:700;color:var(--indigo,#1e3e70);background:var(--paper-2,#f1f5f9);padding:5px 10px;border-radius:6px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px">'
          + '<span>' + q.sectionTitle + (q.partLabel ? ' · ' + q.partLabel : '') + '</span>'
          + (typeof q.calc === 'boolean'
            ? '<span style="font-size:.7rem;padding:2px 7px;border-radius:4px;color:#fff;background:' + (q.calc ? '#15803d' : '#dc2626') + '">' + (q.calc ? (isArPaper ? '🖩 مسموح بالآلة الحاسبة' : '🖩 Calculator Permitted') : (isArPaper ? '🚫 بدون آلة حاسبة' : '🚫 No Calculator')) + '</span>'
            : '')
          + '</div>';
      }
      var marksBadge = q.marks
        ? '<span style="font-size:.74rem;font-weight:700;background:#e2e8f0;color:#1e293b;padding:2px 8px;border-radius:4px;margin-left:6px">[' + q.marks + ' ' + (q.marks === 1 ? (isArPaper ? 'درجة' : 'mark') : (isArPaper ? 'درجات' : 'marks')) + ']</span>'
        : '';

      h += '<div class="mock-q' + (i === _curIdx ? '' : ' cbt-hidden') + '" id="mock-q-' + i + '" dir="' + (isArPaper ? 'rtl' : 'ltr') + '">'
        + secBanner
        + '<div class="mq-num" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">'
        + '  <div style="display:flex;align-items:center;flex-wrap:wrap;gap:6px">'
        + '    <span style="font-weight:800;font-size:.9rem;color:var(--indigo,#1e3e70)">' + (isArPaper ? 'السؤال ' + (i + 1) + ' من ' + _pool.length : 'Question ' + (i + 1) + ' of ' + _pool.length) + '</span>'
        + '    <span style="font-size:.74rem;background:var(--paper-2,#f1f5f9);padding:2px 8px;border-radius:4px;color:var(--muted,#64748b)">' + (q.domain || 'Math') + '</span>'
        + '    <span style="font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:4px;text-transform:uppercase;' + diffStyle + '">' + diffLabel + '</span>'
        + marksBadge
        + '  </div>'
        + '</div>';

      if (figHtml) {
        h += '<div class="mock-q-figure" style="margin-bottom:14px;text-align:center">' + figHtml + '</div>';
      }

      if (isComp) {
        var comp = _parseCompBoxes(q, activeLang);
        h += '<div class="mq-text" dir="rtl" style="font-weight:700;margin-bottom:10px">' + (activeLang === 'en' ? 'Compare the two quantities:' : (activeLang === 'ar' ? 'قارن بين القيمتين التاليتين:' : 'قارن بين القيمتين التاليتين / Compare the two quantities:')) + '</div>';
        if (comp.context) {
          h += '<div class="mock-qc-context" style="background:var(--paper-2,#f8fafc);border-left:3px solid var(--indigo,#1e3e70);border-right:3px solid var(--indigo,#1e3e70);padding:8px 12px;margin-bottom:12px;border-radius:4px;font-size:1rem;font-weight:600">' + _fmtBi(comp.context) + '</div>';
        }
        h += '<div class="mock-qc-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">'
          + '<div class="mock-qc-box" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--border,#cbd5e1);border-radius:8px;padding:12px;text-align:center">'
          + '<div style="font-size:.82rem;font-weight:700;color:var(--indigo,#1e3e70);margin-bottom:4px">' + (activeLang === 'en' ? 'Column A' : (activeLang === 'ar' ? 'القيمة الأولى' : 'القيمة الأولى (Column A)')) + '</div>'
          + '<div style="font-size:1.05rem;font-weight:600">' + _fmtBi(comp.val1 || qText) + '</div>'
          + '</div>'
          + '<div class="mock-qc-box" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--border,#cbd5e1);border-radius:8px;padding:12px;text-align:center">'
          + '<div style="font-size:.82rem;font-weight:700;color:var(--amber,#9e6515);margin-bottom:4px">' + (activeLang === 'en' ? 'Column B' : (activeLang === 'ar' ? 'القيمة الثانية' : 'القيمة الثانية (Column B)')) + '</div>'
          + '<div style="font-size:1.05rem;font-weight:600">' + _fmtBi(comp.val2 || '—') + '</div>'
          + '</div>'
          + '</div>';
      } else {
        h += '<div class="mq-text" style="font-size:1.02rem;line-height:1.65;margin-bottom:16px">' + (isPre ? qText : _fmtBi(qText)) + '</div>';
      }

      var isSPR = (q.type === 'spr' || q.isSPR);
      var isFRQ = (q.type === 'frq');
      var currentAns = _answers[i];

      if (isStructured) {
        h += window.CSStructuredFRQ.renderCBTWidget(q, i, currentAns, {
          lang: activeLang,
          formatMath: _fmtBi
        });
      } else {
        if (isFRQ) {
          h += '<div style="margin:12px 0">'
            + '<label style="display:block;font-size:.82rem;color:var(--muted,#64748b);margin-bottom:5px;font-weight:700">✏️ Structured Mathematical Working Space (Optional Scratchpad):</label>'
            + '<textarea class="mock-frq-area" placeholder="Write your step-by-step derivation, equations, and working here..." style="width:100%;min-height:85px;padding:10px 14px;border:1.5px solid var(--border,#cbd5e1);border-radius:8px;font-family:var(--sans);font-size:.9rem;margin-bottom:10px"></textarea>'
            + '</div>';
        }

        if (isSPR || (isFRQ && (!activeChoices || !activeChoices.length))) {
          h += '<div class="mock-spr-wrap" style="margin:14px 0">'
            + '<label style="display:block;font-size:.84rem;color:var(--muted,#64748b);margin-bottom:6px;font-weight:600">' + (isFRQ ? 'Final Verified Numerical / Algebraic Answer:' : (isArPaper ? 'الإجابة الرقمية (Grid-in):' : 'Student-Produced Response (Grid-in):')) + '</label>'
            + '<input type="text" class="mock-spr-input" name="mq' + i + '" value="' + (currentAns != null && typeof currentAns !== 'object' ? String(currentAns).replace(/"/g, '&quot;') : '') + '" placeholder="e.g. 7/4 or 1.75" oninput="window.cbtRecordAnswer(' + i + ', this.value)" style="width:220px;padding:10px 14px;border:1.5px solid var(--border,#cbd5e1);border-radius:8px;font-family:var(--mono,monospace);font-size:1.05rem">'
            + '</div>';
        } else if (activeChoices && activeChoices.length) {
          if (isFRQ) {
            h += '<div style="font-size:.83rem;font-weight:700;color:var(--indigo,#1e3e70);margin-bottom:8px">Select your verified final analytical result for CBT auto-grading:</div>';
          }
          h += '<div class="mock-choices-list" style="display:flex;flex-direction:column;gap:8px">';
          activeChoices.forEach(function (c, ci) {
            var letLabel = letters[ci] || String.fromCharCode(65 + ci);
            var chText = isPre ? String(c || '') : (typeof window.CSAutoMath === 'function' ? window.CSAutoMath(c) : String(c || ''));
            var plainChoice = String(c || '').replace(/<[^>]*>/g, '').replace(/\\\(|\\\)/g, '').replace(/"/g, '&quot;').trim();
            var isChecked = (currentAns === ci);
            h += '<div class="mock-choice-wrap" style="display:flex;align-items:center;gap:6px">'
              + '<label class="mock-choice-row" style="flex:1;display:flex;align-items:flex-start;gap:10px;padding:11px 14px;border:1.5px solid ' + (isChecked ? '#3b82f6' : 'var(--border,#e2e8f0)') + ';border-radius:8px;cursor:pointer;background:' + (isChecked ? 'rgba(59,130,246,0.08)' : 'var(--paper,#fff)') + ';transition:all .15s ease">'
              + '<input type="radio" name="mq' + i + '" value="' + ci + '" aria-label="' + letLabel + ': ' + plainChoice + '" ' + (isChecked ? 'checked' : '') + ' onchange="window.cbtRecordAnswer(' + i + ', ' + ci + ')" style="margin-top:4px">'
              + '<span style="font-weight:800;color:var(--indigo,#1e3e70)">' + letLabel + '.</span>'
              + '<span class="mock-choice-text" style="flex:1">' + (isPre ? chText : _fmtBi(chText)) + '</span>'
              + '</label>'
              + '<button type="button" class="cbt-strike-btn" title="' + (isArPaper ? 'استبعاد الخيار (شطب)' : 'Cross out / eliminate option') + '" aria-label="' + (isArPaper ? 'استبعاد الخيار ' + letLabel : 'Cross out option ' + letLabel) + '" aria-pressed="false" onclick="window.cbtToggleStrike(' + i + ',' + ci + ',this)" style="min-width:34px;min-height:34px;border-radius:8px;border:1px solid var(--border,#cbd5e1);background:var(--paper,#fff);color:var(--muted,#64748b);font-size:.8rem;font-weight:800;cursor:pointer;flex-shrink:0"><span style="text-decoration:line-through">' + letLabel + '</span></button>'
              + '</div>';
          });
          h += '</div>';
        }
      }

      h += '</div>';
    });

    body.innerHTML = h;
    if (window.CSStructuredFRQ && typeof window.CSStructuredFRQ.bindCanvases === 'function') {
      window.CSStructuredFRQ.bindCanvases(body);
    }
    body.setAttribute('data-pool', JSON.stringify(_pool.map(function (q) {
      var _loc = window.CSItemLocale;
      var _arSol = (q.sol_ar && !(_loc && _loc.isBoilerplateAr(q.sol_ar))) ? q.sol_ar : '';
      var solStr = (isArPaper && _arSol) ? _arSol : (q.sol || q.expl || '');
      return {
        answer: q.answer,
        ans: q.sprAnswer || q.finalAnswer || q.ans || q.answer,
        sprAnswer: q.sprAnswer || q.finalAnswer || q.ans || '',
        type: (q.type === 'frq' && (!q.choices || !q.choices.length)) ? 'spr' : (q.type || 'mcq'),
        marks: q.marks || 1,
        domain: q.domain || 'Math',
        sol: solStr,
        sol_ar: _arSol
      };
    })));
  }

  window.cbtToggleStrike = function (qIdx, ci, btn) {
    var wrap = btn && btn.closest('.mock-choice-wrap');
    if (!wrap) return;
    var row = wrap.querySelector('.mock-choice-row');
    var struck = !wrap.classList.contains('cbt-struck');
    wrap.classList.toggle('cbt-struck', struck);
    if (btn) {
      btn.setAttribute('aria-pressed', struck ? 'true' : 'false');
      btn.style.background = struck ? 'var(--indigo,#1e3e70)' : 'var(--paper,#fff)';
      btn.style.color = struck ? '#fff' : 'var(--muted,#64748b)';
    }
    if (row) {
      row.style.opacity = struck ? '0.45' : '1';
      row.style.textDecoration = struck ? 'line-through' : 'none';
    }
  };

  window.cbtRecordAnswer = function (qIdx, val) {
    _answers[qIdx] = val;
    // Highlight choice row if radio
    var qEl = document.getElementById('mock-q-' + qIdx);
    if (qEl) {
      var rows = qEl.querySelectorAll('.mock-choice-row');
      rows.forEach(function (r, ci) {
        var checked = (val === ci);
        r.style.borderColor = checked ? '#3b82f6' : 'var(--border,#e2e8f0)';
        r.style.background = checked ? 'rgba(59,130,246,0.08)' : 'var(--paper,#fff)';
      });
    }
    _updateFooterNav();
  };

  function _enterCBTModalLock(){
    document.body.classList.add('cbt-open');
    var cp = document.getElementById('chatPanel');
    if(cp){
      cp.classList.remove('open');
      cp.setAttribute('aria-hidden', 'true');
      try{ cp.setAttribute('inert', ''); }catch(e){}
    }
    var cf = document.getElementById('chatFab');
    if(cf) cf.setAttribute('aria-expanded', 'false');
  }

  function _unwrapMark(mark){
    var p = mark && mark.parentNode;
    if(!p) return;
    while(mark.firstChild) p.insertBefore(mark.firstChild, mark);
    p.removeChild(mark);
    if(p.normalize) p.normalize();
  }

  window.cbtHighlightSelection = function(){
    var sel = window.getSelection ? window.getSelection() : null;
    if(!sel || !sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    var anc = range.commonAncestorContainer;
    var ancEl = anc.nodeType === 1 ? anc : anc.parentElement;
    if(!ancEl) return;
    var stemRoot = ancEl.closest('.mq-text, .mock-qc-context, .mock-qc-box, .mock-stem, .mock-q-body, .mock-q');
    if(!stemRoot || !stemRoot.closest('#mock-exam-body')) return;

    var existingMark = ancEl.closest('mark.cbt-hl');
    if(existingMark){
      _unwrapMark(existingMark);
      sel.removeAllRanges();
      return;
    }
    if(range.collapsed) return;

    var mark = document.createElement('mark');
    mark.className = 'cbt-hl';
    try{
      range.surroundContents(mark);
      sel.removeAllRanges();
      return;
    }catch(e){}

    // Multi-element range fallback: wrap each text slice cleanly inside stemRoot
    var walker = document.createTreeWalker(stemRoot, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while((n = walker.nextNode())){
      if(!n.nodeValue || !n.nodeValue.trim()) continue;
      if(n.parentElement && n.parentElement.closest('mark.cbt-hl, svg, .katex-mathml')) continue;
      if(range.intersectsNode && range.intersectsNode(n)) nodes.push(n);
    }
    for(var i = 0; i < nodes.length; i++){
      var tn = nodes[i];
      var s = (tn === range.startContainer) ? range.startOffset : 0;
      var en = (tn === range.endContainer) ? range.endOffset : tn.nodeValue.length;
      if(en <= s) continue;
      var target = s > 0 ? tn.splitText(s) : tn;
      if(en - s < target.nodeValue.length) target.splitText(en - s);
      var m = document.createElement('mark');
      m.className = 'cbt-hl';
      target.parentNode.insertBefore(m, target);
      m.appendChild(target);
    }
    sel.removeAllRanges();
  };

  window.cbtClearHighlights = function(){
    var qEl = document.getElementById('mock-q-' + _curIdx);
    var marks = qEl ? qEl.querySelectorAll('mark.cbt-hl') : [];
    if(!marks.length){
      var mb = document.getElementById('mock-exam-body');
      marks = mb ? mb.querySelectorAll('mark.cbt-hl') : [];
    }
    for(var i = 0; i < marks.length; i++) _unwrapMark(marks[i]);
  };

  function _buildCBTToolsHtml(prefixHtml, calcBtnHtml){
    return (prefixHtml || '') + (calcBtnHtml || '')
      + '<button type="button" class="hdr-btn" id="cbt-hl-btn" onclick="window.cbtHighlightSelection()" title="Highlight selected question text">🖍️ Highlight</button>'
      + '<button type="button" class="hdr-btn" id="cbt-hl-clear-btn" onclick="window.cbtClearHighlights()" title="Clear highlights">Clear</button>'
      + '<button type="button" class="hdr-btn" onclick="window.openFormulaModal&&window.openFormulaModal()" title="Reference Formulas">📐 Formulas</button>'
      + '<button type="button" class="hdr-btn" id="cbt-scratchpad-btn" onclick="window.toggleWhiteboard&&window.toggleWhiteboard()" title="Open Scratchpad (Alt+S)">✏️ Scratchpad</button>'
      + '<button type="button" class="cbt-flag-btn" id="cbt-flag-btn" onclick="window.cbtToggleFlagCurrent()">🏳️ Flag for Review</button>'
      + '<button type="button" class="hdr-btn" onclick="window.cbtToggleFullscreen()" title="Toggle Fullscreen">⛶</button>';
  }

  window.cbtToggleFlagCurrent = function (idx) {
    if (typeof idx !== 'number' || isNaN(idx)) idx = _curIdx;
    _flags[idx] = !_flags[idx];
    var qEl = document.getElementById('mock-q-' + idx);
    if (qEl) {
      var btn = qEl.querySelector('.cbt-flag-btn');
      if (btn) {
        var flg = !!_flags[idx];
        btn.classList.toggle('flagged', flg);
        btn.innerHTML = flg ? '🚩 Flagged' : '🏳️ Flag';
      }
    }
    _updateHeaderTools();
    _updateFooterNav();
  };

  window.openMockExam = function (viewId, pidx) {
    var trackId = String(viewId || '').toLowerCase().trim();
    if (!trackId && typeof window !== 'undefined') {
      if (window.location && window.location.pathname) {
        var match = window.location.pathname.match(/\/([a-z0-9_-]+)/);
        if (match && match[1] && match[1] !== 'home') trackId = match[1];
      }
      if (!trackId && window.CLIPSAT_TRACK && window.CLIPSAT_TRACK !== 'home') {
        trackId = window.CLIPSAT_TRACK;
      }
    }
    if (!trackId) trackId = 'sat';

    pidx = parseInt(pidx, 10) || 0;
    _trackId = trackId;
    _pidx = pidx;
    _curIdx = 0;
    _answers = {};
    _flags = {};
    _viewMode = 'cbt';
    _isSubmitted = false;
    if (window.CSStructuredFRQ && typeof window.CSStructuredFRQ.resetStore === 'function') {
      window.CSStructuredFRQ.resetStore();
    }
    _bindStructuredFRQHook();

    var overlay = document.getElementById('mock-exam-overlay');
    if (!overlay) return;

    var body = document.getElementById('mock-exam-body');
    if (body) {
      body.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--muted)">'
        + '<div class="ai-spinner" style="margin:0 auto 16px"></div>'
        + '<p style="font-size:1.05rem;font-weight:600;margin-bottom:6px">Preparing Computer-Based Test (CBT) environment…</p>'
        + '<p style="font-size:.85rem;color:var(--muted,#64748b)">Loading question bank & rendering engine for ' + trackId.toUpperCase() + '</p>'
        + '</div>';
    }
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Computer-Based Mock Exam Simulator');
    overlay.classList.add('show');
    _enterCBTModalLock();

    var loadFigures = (typeof window._ensureFigures === 'function')
      ? window._ensureFigures().catch(function () { })
      : Promise.resolve();

    return Promise.all([_ensureBank(trackId), loadFigures]).then(function (res) {
      var bank = res[0];
      if (!bank) {
        if (body) {
          body.innerHTML = '<div style="text-align:center;padding:60px 20px">'
            + '<div style="font-size:2.4rem;margin-bottom:12px">⚠️</div>'
            + '<h3 style="color:#dc2626;font-size:1.25rem;font-weight:700;margin-bottom:8px">Question Bank Unavailable</h3>'
            + '<p style="color:var(--muted,#64748b);font-size:.92rem;max-width:480px;margin:0 auto 20px">The question bank for "<strong>' + trackId.toUpperCase() + '</strong>" could not be loaded. Please check your network connection and try again.</p>'
            + '<div style="display:flex;gap:12px;justify-content:center">'
            + '  <button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.openMockExam(\'' + trackId + '\',' + pidx + ')">↻ Retry</button>'
            + '  <button type="button" class="cbt-nav-btn" onclick="window.closeMockExam()">✕ Close</button>'
            + '</div></div>';
        }
        return;
      }

      var papers = PAPERS[trackId] || [
        { name: trackId.toUpperCase() + ' Comprehensive CBT Practice', minutes: 45, qCount: 15, calc: true }
      ];
      var paper = papers[pidx] || papers[0];
      _paper = paper;

      // Extract pool
      var allPool = [];
      if (Array.isArray(bank.pool) && bank.pool.length) {
        allPool = bank.pool.slice();
      } else if (bank.easy || bank.medium || bank.hard) {
        var cvt = function (a, diff) {
          return (a || []).map(function (q) {
            return Object.assign({}, q, {
              type: q.type || 'mcq',
              difficulty: diff,
              domain: q.domain || 'Mathematics',
              text: q.text || q.q || '',
              choices: q.choices || [],
              answer: q.answer,
              sol: q.sol || q.expl || '',
              figure: q.figure || q.fig
            });
          });
        };
        allPool = cvt(bank.easy, 'easy').concat(cvt(bank.medium, 'medium')).concat(cvt(bank.hard, 'hard'));
      }

      var tracker = window.ClipSATRedundancy ? window.ClipSATRedundancy.tracker() : null;
      var picked = _drawPaperPool(allPool, paper, tracker);

      _lastDownloadArgs = null;
      _satFullPool = allPool.slice();
      _satAdaptiveState = (paper && paper.adaptiveTwoStage)
        ? { stage: 1, m1Pool: null, m1Answers: null, m1Outcomes: null, routedTrack: null, m1Theta: 0, m1Sem: 1 }
        : null;
      _pool = picked.map(function (q) {
        var isFixed = q.fixedChoices || _isQuantComp(q);
        return (!isFixed && window._shuffleQ) ? window._shuffleQ(q) : q;
      });
      if (!_pool.length) {
        if (body) {
          body.innerHTML = '<div style="text-align:center;padding:60px 20px">'
            + '<h3 style="color:#b45309;font-size:1.2rem;margin-bottom:8px">No Questions Available</h3>'
            + '<p style="color:var(--muted);font-size:.9rem;margin-bottom:16px">No questions could be matched for this paper.</p>'
            + '<button type="button" class="cbt-nav-btn" onclick="window.closeMockExam()">✕ Close</button>'
            + '</div>';
        }
        return;
      }

      // Render Header Tools
      var titleEl = document.getElementById('mock-exam-title');
      if (titleEl) {
        var calcBadge = paper.calc
          ? '<span style="background:rgba(255,255,255,.18);padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:600">🖩 Calculator Allowed</span>'
          : '<span style="background:#b91c1c;padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:700">🚫 No Calculator</span>';
        titleEl.innerHTML = '<span>' + paper.name + '</span> ' + calcBadge;
      }

      if (typeof window.setFloatingCalcLocked === 'function') {
        window.setFloatingCalcLocked(paper.calc === false, paper.name);
      }

      var hdr = document.getElementById('mock-exam-header');
      if (hdr) {
        var toolsDiv = hdr.querySelector('.mock-tools-wrap');
        if (!toolsDiv) {
          toolsDiv = document.createElement('div');
          toolsDiv.className = 'mock-tools-wrap';
          toolsDiv.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:auto;margin-right:12px';
          var timerEl = document.getElementById('mock-exam-timer');
          if (timerEl) hdr.insertBefore(toolsDiv, timerEl);
        }

        var calcBtnHtml = (paper.calc !== false)
          ? '<button type="button" class="hdr-btn" onclick="window.toggleFloatingCalc&&window.toggleFloatingCalc()" title="Open Desmos Graphing Calculator (Alt+C)">🧮 Calculator</button>'
          : '';

        var langToggleHtml = '';
        if (MENA_BILINGUAL_TRACKS[trackId]) {
          var curLang = _activeExamLang(trackId);
          langToggleHtml = '<div class="cs-lang-toggle-group" style="margin-right:4px">'
            + '<button type="button" class="cs-lt-btn' + (curLang === 'ar' ? ' active' : '') + '" data-lang="ar" onclick="window.ClipSATSetExamLang&&window.ClipSATSetExamLang(\'ar\',this)" title="Arabic Only">🇸🇦 عربي</button>'
            + '<button type="button" class="cs-lt-btn' + (curLang === 'en' ? ' active' : '') + '" data-lang="en" onclick="window.ClipSATSetExamLang&&window.ClipSATSetExamLang(\'en\',this)" title="English Only">🇬🇧 English</button>'
            + '<button type="button" class="cs-lt-btn' + (curLang === 'both' ? ' active' : '') + '" data-lang="both" onclick="window.ClipSATSetExamLang&&window.ClipSATSetExamLang(\'both\',this)" title="Bilingual">🌐 ثنائي</button>'
            + '</div>';
        }

        toolsDiv.innerHTML = _buildCBTToolsHtml(langToggleHtml, calcBtnHtml);
      }

      _secs = (paper.minutes || 45) * 60;
      _totalSecs = _secs;

      // Render questions DOM and navigate to question 0
      _renderQuestionsDOM();
      _goToQuestion(0);

      if (_tmr) clearInterval(_tmr);
      _renderTimer();
      _tmr = setInterval(function () {
        _secs--;
        _renderTimer();
        if (_secs <= 0) {
          clearInterval(_tmr);
          _tmr = null;
          submitMockExam();
        }
      }, 1000);
    }).catch(function (err) {
      console.error('CBT initialization error:', err);
      if (body) {
        body.innerHTML = '<div style="text-align:center;padding:60px 20px">'
          + '<div style="font-size:2.4rem;margin-bottom:12px">⚠️</div>'
          + '<h3 style="color:#dc2626;font-size:1.25rem;font-weight:700;margin-bottom:8px">CBT Preparation Error</h3>'
          + '<p style="color:var(--muted,#64748b);font-size:.92rem;max-width:480px;margin:0 auto 20px">' + String((err && err.message) || 'An unexpected error occurred while loading CBT.') + '</p>'
          + '<div style="display:flex;gap:12px;justify-content:center">'
          + '  <button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.openMockExam(\'' + trackId + '\',' + pidx + ')">↻ Retry</button>'
          + '  <button type="button" class="cbt-nav-btn" onclick="window.closeMockExam()">✕ Close</button>'
          + '</div></div>';
      }
    });
  };

  window.openDownloadExamCBT = function (trackId, examFilename, examTitle, lang) {
    trackId = String(trackId || 'sat').toLowerCase().trim();
    _trackId = trackId;
    _pidx = 0;
    _curIdx = 0;
    _answers = {};
    _flags = {};
    _viewMode = 'cbt';
    _isSubmitted = false;
    if (window.CSStructuredFRQ && typeof window.CSStructuredFRQ.resetStore === 'function') {
      window.CSStructuredFRQ.resetStore();
    }
    _bindStructuredFRQHook();
    _lastDownloadArgs = [trackId, examFilename, examTitle, lang];

    var cdnPrefix = String(window.CLIPSAT_CDN_BASE || '').replace(/\/+$/, '');
    var isProdNoCdn = !cdnPrefix && typeof location !== 'undefined' && /(?:^|\.)clipsat\.org$/i.test(location.hostname || '');
    var rawGhExamUrl = 'https://raw.githubusercontent.com/mohammedamy/ClipSAT/main/public/downloads/' + trackId + '/' + examFilename;
    var examUrl = (isProdNoCdn ? rawGhExamUrl : (cdnPrefix + '/downloads/' + trackId + '/' + examFilename));
    var overlay = document.getElementById('mock-exam-overlay');
    if (!overlay) {
      if (typeof window._openDownloadInBrowser === 'function') {
        window._openDownloadInBrowser(null, examUrl, examTitle || examFilename);
      } else {
        window.open(examUrl + '?cbt=1', '_blank');
      }
      return;
    }

    var body = document.getElementById('mock-exam-body');
    if (body) {
      body.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--muted)">'
        + '<div class="ai-spinner" style="margin:0 auto 16px"></div>'
        + '<p style="font-size:1.05rem;font-weight:600;margin-bottom:6px">Loading Official Practice Exam into CBT Simulator…</p>'
        + '<p style="font-size:.85rem;color:var(--muted,#64748b)">' + (examTitle || examFilename) + '</p>'
        + '</div>';
    }
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Computer-Based Mock Exam Simulator');
    overlay.classList.add('show');
    _enterCBTModalLock();

    fetch(examUrl)
      .then(function (r) {
        if (!r.ok && examUrl !== rawGhExamUrl) return fetch(rawGhExamUrl);
        return r;
      })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (htmlText) {
        var doc = new DOMParser().parseFromString(htmlText, 'text/html');
        var payloadEl = doc.getElementById('clipsat-cbt-payload');
        if (!payloadEl) throw new Error('CBT payload missing in exam document.');
        var payload = JSON.parse(payloadEl.textContent);

        var loadedPool = (payload.questions || []).map(function (qm) {
          var qNode = doc.getElementById('fep-q-' + qm.qNum);
          var figNode = qNode ? qNode.querySelector('.fep-figure') : null;
          var bodyNode = qNode ? qNode.querySelector('.fep-qbody') : null;
          var solNode = doc.querySelector('#fep-sol-' + qm.qNum + ' .fep-sol-body');

          var choicesHtml = [];
          if (qm.type === 'mcq' && qNode) {
            var chNodes = qNode.querySelectorAll('.fep-choice .fep-ctext');
            chNodes.forEach(function (cn) { choicesHtml.push(cn.innerHTML); });
          } else if (qm.type === 'frq' && Array.isArray(qm.cbtChoicesHtml) && qm.cbtChoicesHtml.length) {
            choicesHtml = qm.cbtChoicesHtml.slice();
          }

          return {
            preRendered: true,
            qNum: qm.qNum,
            sectionTitle: qm.sectionTitle || '',
            partLabel: qm.partLabel || '',
            calc: Boolean(qm.calc),
            type: qm.type || 'mcq',
            difficulty: qm.difficulty || 'medium',
            marks: Number(qm.marks) || 1,
            domain: qm.domain || 'Mathematics',
            text: bodyNode ? bodyNode.innerHTML : '',
            figure: figNode ? figNode.innerHTML : '',
            choices: choicesHtml,
            answer: typeof qm.answer === 'number' ? qm.answer : 0,
            ans: qm.finalAnswerText || String(qm.answer || 0),
            sprAnswer: qm.finalAnswerText || '',
            sol: solNode ? solNode.innerHTML : ''
          };
        });

        if (!loadedPool.length) {
          throw new Error('No questions found in exam payload.');
        }

        _pool = loadedPool;
        var hasAnyCalc = _pool.some(function (q) { return q.calc !== false; });
        var firstCalc = _pool[0] ? (_pool[0].calc !== false) : hasAnyCalc;

        _paper = {
          name: examTitle || (payload.paperTitle + ' — Exam #' + payload.examNumber),
          minutes: Number(payload.durationMinutes) || 60,
          qCount: _pool.length,
          calc: firstCalc,
          lang: payload.lang || lang || 'en',
          letters: payload.letters || ['A', 'B', 'C', 'D'],
          isDownloadExam: true,
          examFilename: examFilename,
          akFilename: payload.akFilename || ''
        };

        var titleEl = document.getElementById('mock-exam-title');
        if (titleEl) {
          var calcBadge = firstCalc
            ? '<span style="background:rgba(255,255,255,.18);padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:600">🖩 Calculator Allowed</span>'
            : '<span style="background:#b91c1c;padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:700">🚫 No Calculator</span>';
          titleEl.innerHTML = '<span>' + _paper.name + '</span> ' + calcBadge;
        }

        if (typeof window.setFloatingCalcLocked === 'function') {
          window.setFloatingCalcLocked(!firstCalc, _paper.name);
        }

        var hdr = document.getElementById('mock-exam-header');
        if (hdr) {
          var toolsDiv = hdr.querySelector('.mock-tools-wrap');
          if (!toolsDiv) {
            toolsDiv = document.createElement('div');
            toolsDiv.className = 'mock-tools-wrap';
            toolsDiv.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:auto;margin-right:12px';
            var timerEl = document.getElementById('mock-exam-timer');
            if (timerEl) hdr.insertBefore(toolsDiv, timerEl);
          }

          var calcBtnHtml = hasAnyCalc
            ? '<button type="button" class="hdr-btn" onclick="window.toggleFloatingCalc&&window.toggleFloatingCalc()" title="Open Desmos Graphing Calculator (Alt+C)">🧮 Calculator</button>'
            : '';

          var printLinkHtml = '<a class="hdr-btn" href="' + examUrl + '" target="_blank" rel="noopener" onclick="return window._openDownloadInBrowser?window._openDownloadInBrowser(event,this.href,document.title):true" style="text-decoration:none" title="Open Printable Exam Paper">🖨️ Paper</a>';

          toolsDiv.innerHTML = _buildCBTToolsHtml(printLinkHtml, calcBtnHtml);
        }

        _secs = (_paper.minutes || 60) * 60;
        _totalSecs = _secs;

        _renderQuestionsDOM();
        _goToQuestion(0);

        if (_tmr) clearInterval(_tmr);
        _renderTimer();
        _tmr = setInterval(function () {
          _secs--;
          _renderTimer();
          if (_secs <= 0) {
            clearInterval(_tmr);
            _tmr = null;
            submitMockExam();
          }
        }, 1000);
      })
      .catch(function (err) {
        console.error('CBT Download Exam load error:', err);
        if (typeof window._openDownloadInBrowser === 'function') {
          window._openDownloadInBrowser(null, examUrl, examTitle || examFilename);
        } else {
          window.open(examUrl + '?cbt=1', '_blank');
        }
      });
  };

  window.retakeCurrentCBTExam = function () {
    if (_lastDownloadArgs && _lastDownloadArgs.length >= 2) {
      window.openDownloadExamCBT(_lastDownloadArgs[0], _lastDownloadArgs[1], _lastDownloadArgs[2], _lastDownloadArgs[3]);
    } else {
      window.openMockExam(_trackId, _pidx);
    }
  };

  window.cbtToggleFullscreen = function () {
    _toggleFullscreen();
  };

  function _renderTimer() {
    var el = document.getElementById('mock-exam-timer');
    if (!el) return;
    var m = Math.floor(Math.max(0, _secs) / 60);
    var s = Math.max(0, _secs) % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    el.style.color = _secs < 300 ? '#fca5a5' : '#ffffff';
  }

  function _getScaledScoreEstimate(trackId, correct, total) {
    var p = total > 0 ? (correct / total) : 0;
    var baseTrack = _resolveBankTrack(trackId);
    if (baseTrack === 'sat') {
      var satScore = 200 + Math.round(p * 600);
      if (p >= 0.95) satScore = 800;
      else if (p >= 0.88) satScore = 740 + Math.round((p - 0.88) * 800);
      else if (p >= 0.75) satScore = 650 + Math.round((p - 0.75) * 690);
      else if (p >= 0.50) satScore = 500 + Math.round((p - 0.50) * 600);
      return { label: 'Projected SAT Math Score', value: satScore + ' / 800', badge: satScore >= 700 ? '95th+ Percentile' : 'Competitive' };
    }
    if (baseTrack === 'qudrat' || baseTrack === 'tahsili') {
      var qScore = Math.round(50 + p * 50);
      return { label: 'Estimated Qiyas Scale Score', value: qScore + ' / 100', badge: qScore >= 90 ? 'ممتاز (Top 5%)' : 'جيد جداً' };
    }
    if (baseTrack === 'act') {
      var actScore = Math.max(1, Math.min(36, Math.round(p * 36)));
      return { label: 'Projected ACT Math Score', value: actScore + ' / 36', badge: actScore >= 30 ? 'Elite' : 'Standard' };
    }
    if (baseTrack === 'igcse' || baseTrack === 'edexcel' || baseTrack === 'aslevel' || baseTrack === 'a2level' || baseTrack === 'addmath') {
      var g = p >= 0.85 ? 'Grade 9 (A*)' : p >= 0.72 ? 'Grade 8 (A)' : p >= 0.60 ? 'Grade 7 (A)' : p >= 0.50 ? 'Grade 6 (B)' : 'Grade 5 (C)';
      return { label: (baseTrack === 'addmath' ? 'Projected Cambridge Grade (0606 / 4PM1)' : baseTrack === 'edexcel' ? 'Projected Edexcel 4MA1 Grade' : 'Projected Cambridge Grade'), value: g, badge: p >= 0.72 ? 'Distinction' : 'Passing' };
    }
    if (baseTrack === 'gaten') {
      var gScore = Math.round(55 + p * 44);
      return { label: 'Projected Qiyas GAT/SAAT Score', value: gScore + ' / 100', badge: gScore >= 85 ? 'Top 5% STEM' : 'Standard' };
    }
    if (baseTrack === 'olympiad') {
      var oScore = Math.round(p * 150);
      return { label: 'Projected NSMO / KAUST / Olympiad Score', value: oScore + ' / 150', badge: oScore >= 105 ? 'NSMO / KMC Finalist & AIME Qualifier' : 'Contest Ready' };
    }
    if (baseTrack === 'mathai') {
      var aiPct = Math.round(p * 100);
      return { label: 'AI Math Mastery Score', value: aiPct + '%', badge: aiPct >= 80 ? 'Mastery (Level 4)' : aiPct >= 65 ? 'Proficient' : 'Developing' };
    }
    if (baseTrack === 'ibsl' || baseTrack === 'ibhl') {
      var ibG = p >= 0.80 ? 'Grade 7' : p >= 0.68 ? 'Grade 6' : p >= 0.55 ? 'Grade 5' : p >= 0.40 ? 'Grade 4' : 'Grade 3';
      return { label: 'Projected IB Boundary', value: ibG, badge: p >= 0.68 ? 'Top Band' : 'Standard' };
    }
    return { label: 'Accuracy Rating', value: Math.round(p * 100) + '%', badge: 'Completed' };
  }

  function submitMockExam() {
    if (_tmr) { clearInterval(_tmr); _tmr = null; }

    var body = document.getElementById('mock-exam-body');
    if (!body) return;

    // WP-42: Live 2-Stage Adaptive Digital SAT Transition (Module 1 -> Module 2)
    if (_paper && _paper.adaptiveTwoStage && _satAdaptiveState && _satAdaptiveState.stage === 1) {
      var m1Outcomes = _pool.map(function (q, qi) {
        return _gradeSingleItemQuick(q, _answers[qi]);
      });
      var route = _routeSatModule2(_pool, m1Outcomes, _satFullPool);
      _satAdaptiveState.stage = 2;
      _satAdaptiveState.m1Pool = _pool.slice();
      _satAdaptiveState.m1Answers = Object.assign({}, _answers);
      _satAdaptiveState.m1Outcomes = m1Outcomes;
      _satAdaptiveState.routedTrack = route.routedTrack;
      _satAdaptiveState.m1Theta = route.m1Theta;
      _satAdaptiveState.m1Sem = route.m1Sem;

      _pool = route.module2Items.map(function (q) {
        var isFixed = q.fixedChoices || _isQuantComp(q);
        return (!isFixed && window._shuffleQ) ? window._shuffleQ(q) : q;
      });
      _answers = {};
      _flags = {};
      _curIdx = 0;
      _isSubmitted = false;
      _secs = (_paper.minutes || 35) * 60;
      _totalSecs = _secs;

      var titleM2 = document.getElementById('mock-exam-title');
      if (titleM2) {
        titleM2.innerHTML = '<span>Digital SAT® Math — Module 2 of 2 (Adaptive Stage)</span> '
          + '<span style="background:rgba(255,255,255,.18);padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:600">🖩 Calculator Allowed</span>';
      }

      _renderQuestionsDOM();
      _goToQuestion(0);
      _renderTimer();
      _tmr = setInterval(function () {
        _secs--;
        _renderTimer();
        if (_secs <= 0) {
          clearInterval(_tmr);
          _tmr = null;
          submitMockExam();
        }
      }, 1000);
      return;
    }

    // If finishing Stage 2 of 2-stage adaptive SAT, merge Module 1 + Module 2 (44 items) for combined IRT scoring & review
    if (_paper && _paper.adaptiveTwoStage && _satAdaptiveState && _satAdaptiveState.stage === 2 && Array.isArray(_satAdaptiveState.m1Pool)) {
      var m1Len = _satAdaptiveState.m1Pool.length;
      var mergedAnswers = {};
      Object.keys(_satAdaptiveState.m1Answers || {}).forEach(function (k) {
        mergedAnswers[parseInt(k, 10)] = _satAdaptiveState.m1Answers[k];
      });
      Object.keys(_answers || {}).forEach(function (k) {
        mergedAnswers[m1Len + parseInt(k, 10)] = _answers[k];
      });
      _pool = _satAdaptiveState.m1Pool.concat(_pool);
      _answers = mergedAnswers;
      _renderQuestionsDOM();
    }

    _isSubmitted = true;

    if (typeof window.setFloatingCalcLocked === 'function') {
      window.setFloatingCalcLocked(false);
    }
    if (typeof window.closeFloatingCalc === 'function') {
      window.closeFloatingCalc();
    }

    // Ensure all question cards are visible in review mode
    var allQEls = body.querySelectorAll('.mock-q');
    allQEls.forEach(function (el) { el.classList.remove('cbt-hidden'); });

    var pool = JSON.parse(body.getAttribute('data-pool') || '[]');
    var correct = 0, totalGraded = 0;
    var domainStats = {};
    var activeLang = (_paper && _paper.lang) ? _paper.lang : _activeExamLang(_trackId);
    var _fmtBi = window.CSFormatBilingual || function (s) { return s; };

    _pool.forEach(function (q, i) {
      var meta = pool[i] || {};
      var d = q.domain || meta.domain || 'Math';
      if (!domainStats[d]) domainStats[d] = { total: 0, correct: 0 };
      domainStats[d].total++;

      var qEl = document.getElementById('mock-q-' + i);
      if (!qEl) return;

      var isStructured = !q.preRendered && (q.type === 'structured' || q.type === 'proof') && Array.isArray(q.parts) && q.parts.length > 0 && Boolean(window.CSStructuredFRQ);
      var isSPR = !isStructured && (meta.type === 'spr' || meta.isSPR);
      var sprInput = qEl.querySelector('.mock-spr-input');
      var radios = qEl.querySelectorAll('input[type=radio]');
      var userAns = _answers[i];
      var isRight = false;
      var targetAns = String(meta.sprAnswer != null ? meta.sprAnswer : (meta.ans != null ? meta.ans : (Array.isArray(meta.choices) && meta.answer != null ? meta.choices[meta.answer] : meta.answer))).trim().toLowerCase();

      if (isStructured) {
        totalGraded++;
        var g = window.CSStructuredFRQ.gradeStructuredResponse(q, userAns, window.ClipSATAnswerCheck);
        window.CSStructuredFRQ.toggleRubric(i, true);
        correct += g.ratio;
        domainStats[d].correct += g.ratio;
        isRight = (g.ratio >= 0.999);
        qEl.setAttribute('data-correct', isRight ? '1' : '0');

        var resBoxS = document.createElement('div');
        resBoxS.className = 'mock-res-feedback';
        resBoxS.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:8px;font-size:.88rem;line-height:1.6;' + (g.ratio >= 0.7 ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : (g.ratio > 0 ? 'background:#fffbeb;border:1px solid #fcd34d;color:#92400e' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b'));
        resBoxS.innerHTML = '<div style="font-weight:700;font-size:.95rem;margin-bottom:4px">'
          + (isRight ? '✓ Full Marks Awarded' : (g.awardedMarks > 0 ? '◐ Partial Credit Awarded' : '✗ Review Markscheme & Rubric'))
          + ' — <span>' + g.awardedMarks + ' / ' + g.totalMarks + ' marks</span></div>'
          + window.CSStructuredFRQ.renderPrintableMarkScheme(q, _fmtBi, activeLang)
          + (meta.sol ? '<div style="margin-top:8px;border-top:1px dashed rgba(0,0,0,.15);padding-top:8px;color:var(--ink,#1e293b)"><strong>Complete Examiner Solution:</strong><br>' + meta.sol + '</div>' : '');
        qEl.appendChild(resBoxS);

      } else if (isSPR) {
        totalGraded++;
        var val = userAns != null ? String(userAns).trim().toLowerCase() : '';
        isRight = (val !== '' && val === targetAns);

        if (!isRight && val !== '' && window.ClipSATAnswerCheck && typeof window.ClipSATAnswerCheck.equivalent === 'function') {
          try { isRight = Boolean(window.ClipSATAnswerCheck.equivalent(val, targetAns)); } catch (_eqErr) { }
        }

        if (!isRight) {
          var _toNum = function (s) {
            if (!s) return NaN;
            s = String(s).trim();
            if (s.indexOf('/') !== -1) {
              var p = s.split('/');
              var n = parseFloat(p[0]), den = parseFloat(p[1]);
              return (den !== 0 && !isNaN(n) && !isNaN(den)) ? (n / den) : NaN;
            }
            return parseFloat(s);
          };
          var vNum = _toNum(val);
          var tNum = _toNum(targetAns);
          if (!isNaN(vNum) && !isNaN(tNum) && Math.abs(vNum - tNum) < 1e-4) {
            isRight = true;
          }
        }

        if (isRight) {
          correct++;
          domainStats[d].correct++;
          if (sprInput) {
            sprInput.style.borderColor = '#16a34a';
            sprInput.style.background = '#f0fdf4';
          }
        } else if (sprInput) {
          sprInput.style.borderColor = '#dc2626';
          sprInput.style.background = '#fef2f2';
        }

        qEl.setAttribute('data-correct', isRight ? '1' : '0');

        var resBox = document.createElement('div');
        resBox.className = 'mock-res-feedback';
        resBox.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:8px;font-size:.88rem;line-height:1.6;' + (isRight ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b');
        resBox.innerHTML = '<div style="font-weight:700;font-size:.95rem;margin-bottom:4px">' + (isRight ? '✓ Correct Answer' : '✗ Incorrect') + '</div>'
          + '<div>Your Answer: <code>' + (val || '(Blank)') + '</code> · Correct: <code>' + targetAns + '</code></div>'
          + (meta.sol ? '<div style="margin-top:8px;border-top:1px dashed rgba(0,0,0,.15);padding-top:8px;color:var(--ink,#1e293b)"><strong>Mathematical Explanation:</strong><br>' + meta.sol + '</div>' : '');
        qEl.appendChild(resBox);

      } else if (radios.length) {
        totalGraded++;
        var chosen = (userAns !== undefined && userAns !== null) ? parseInt(userAns, 10) : -1;
        isRight = (chosen === meta.answer);
        if (isRight) {
          correct++;
          domainStats[d].correct++;
        }

        qEl.setAttribute('data-correct', isRight ? '1' : '0');

        radios.forEach(function (r, ci) {
          var row = r.closest('.mock-choice-row');
          if (!row) return;
          if (ci === meta.answer) {
            row.style.background = '#f0fdf4';
            row.style.borderColor = '#22c55e';
            row.style.fontWeight = '700';
          } else if (ci === chosen && !isRight) {
            row.style.background = '#fef2f2';
            row.style.borderColor = '#ef4444';
          }
        });

        var resBox = document.createElement('div');
        resBox.className = 'mock-res-feedback';
        resBox.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:8px;font-size:.88rem;line-height:1.6;' + (isRight ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b');
        resBox.innerHTML = '<div style="font-weight:700;font-size:.95rem;margin-bottom:4px">' + (isRight ? '✓ Correct Answer' : '✗ Incorrect') + '</div>'
          + (meta.sol ? '<div style="margin-top:8px;border-top:1px dashed rgba(0,0,0,.15);padding-top:8px;color:var(--ink,#1e293b)"><strong>Mathematical Explanation:</strong><br>' + meta.sol + '</div>' : '');
        qEl.appendChild(resBox);
      }
    });

    var pct = totalGraded ? Math.round((correct / totalGraded) * 100) : 0;
    var scaled = _getScaledScoreEstimate(_trackId, correct, totalGraded);
    if (_resolveBankTrack(_trackId) === 'sat' && _pool.length > 0) {
      var itemOutcomes = _pool.map(function (_q, qi) {
        var el = document.getElementById('mock-q-' + qi);
        return el ? (el.getAttribute('data-correct') === '1') : false;
      });
      var eapAll = _compute3PLEAP(_pool, itemOutcomes);
      var rTrack = (_satAdaptiveState && _satAdaptiveState.routedTrack) || ((_paper && _paper.adaptiveTrack) || 'hard');
      var satIrt = _thetaToSatScaled(eapAll.theta, eapAll.sem, rTrack, Math.round(correct), totalGraded);
      scaled = {
        label: 'Projected SAT Math Score',
        value: satIrt.score + ' / 800 (±' + satIrt.ci + ', θ=' + satIrt.theta.toFixed(2) + ', ' + (rTrack === 'standard' ? 'Standard M2' : 'Hard M2') + ')',
        badge: satIrt.score >= 700 ? '95th+ Percentile' : 'Competitive'
      };
    }
    var correctDisp = Math.abs(correct - Math.round(correct)) < 1e-6 ? String(Math.round(correct)) : (Math.round(correct * 10) / 10).toFixed(1);
    var mistakesCount = Math.max(0, Math.ceil(totalGraded - correct - 1e-6));

    var title = document.getElementById('mock-exam-title');
    if (title) {
      title.innerHTML = 'Examination Completed — <strong>Score: ' + correctDisp + '/' + totalGraded + ' (' + pct + '%)</strong>';
    }

    // Persist CBT attempt to local history, AccuracyLog, MistakeLog (ML), Gamify XP & Analytics
    try {
      var hist = JSON.parse(localStorage.getItem('clipsat_cbt_history') || '[]');
      if (!Array.isArray(hist)) hist = [];
      hist.unshift({
        track: _trackId,
        paper: (_paper && _paper.name) ? _paper.name : (_trackId.toUpperCase() + ' CBT'),
        score: Number(correctDisp) || 0,
        total: totalGraded,
        pct: pct,
        scaled: scaled ? scaled.value : '',
        ts: Date.now()
      });
      localStorage.setItem('clipsat_cbt_history', JSON.stringify(hist.slice(0, 30)));
    } catch (_) { }
    try {
      if (window.AccuracyLog && typeof window.AccuracyLog.record === 'function') {
        Object.keys(domainStats).forEach(function (dn) {
          var st = domainStats[dn];
          var cInt = Math.round(st.correct || 0);
          var wInt = Math.max(0, Math.round((st.total || 0) - (st.correct || 0)));
          for (var ci = 0; ci < cInt; ci++) window.AccuracyLog.record(_trackId, dn, true);
          for (var wi = 0; wi < wInt; wi++) window.AccuracyLog.record(_trackId, dn, false);
        });
      }
      if (window.ML && typeof window.ML.add === 'function' && Array.isArray(_pool)) {
        _pool.forEach(function (q, qi) {
          if (!q || !Array.isArray(q.choices) || typeof q.answer !== 'number') return;
          var chosen = _answers[qi];
          if (chosen !== undefined && chosen !== q.answer) {
            window.ML.add({
              id: q.id || (_trackId + '-cbt-' + qi),
              viewId: _trackId,
              domain: q.domain || 'General',
              q: q.text || q.q || '',
              wrong: q.choices[chosen] != null ? String(q.choices[chosen]) : String(chosen),
              right: q.choices[q.answer] != null ? String(q.choices[q.answer]) : String(q.answer)
            });
          }
        });
      }
      if (window.CSGamify && typeof window.CSGamify.addXP === 'function') {
        window.CSGamify.addXP(Math.max(15, Math.round(pct * 0.5)));
      }
      if (window.ClipSATAnalytics && typeof window.ClipSATAnalytics.track === 'function') {
        window.ClipSATAnalytics.track('mock_exam_complete', {
          track: _trackId,
          paper: (_paper && _paper.name) || '',
          score: Number(correctDisp) || 0,
          total: totalGraded,
          pct: pct
        });
      }
    } catch (_) { }

    // Build Domain Breakdown HTML
    var domainBarsHtml = '';
    Object.keys(domainStats).forEach(function (dName) {
      var st = domainStats[dName];
      var dPct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
      var stCorrDisp = Math.abs(st.correct - Math.round(st.correct)) < 1e-6 ? String(Math.round(st.correct)) : (Math.round(st.correct * 10) / 10).toFixed(1);
      var barColor = dPct >= 80 ? '#16a34a' : dPct >= 50 ? '#d97706' : '#dc2626';
      domainBarsHtml += '<div style="margin-bottom:8px">'
        + '<div style="display:flex;justify-content:space-between;font-size:.78rem;font-weight:700;margin-bottom:3px">'
        + '  <span>' + dName + '</span>'
        + '  <span>' + stCorrDisp + '/' + st.total + ' (' + dPct + '%)</span>'
        + '</div>'
        + '<div style="height:6px;background:var(--border,#e2e8f0);border-radius:4px;overflow:hidden">'
        + '  <div style="width:' + dPct + '%;height:100%;background:' + barColor + ';border-radius:4px"></div>'
        + '</div>'
        + '</div>';
    });

    var heroHtml = [
      '<div id="cbt-results-hero" style="background:var(--panel,#fff);border:1.5px solid var(--border,#cbd5e1);border-radius:14px;padding:24px;margin-bottom:24px;box-shadow:0 10px 30px rgba(0,0,0,.08)">',
      '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border,#e2e8f0);padding-bottom:16px;margin-bottom:16px;flex-wrap:wrap;gap:12px">',
      '<div>',
      '<div style="font-size:.82rem;font-weight:700;color:var(--muted,#64748b);text-transform:uppercase;letter-spacing:.5px">Official CBT Performance Report</div>',
      '<h2 style="margin:4px 0 0;font-size:1.6rem;font-weight:800;color:var(--indigo,#132746)">' + (_paper ? _paper.name : 'Mathematics CBT') + '</h2>',
      '</div>',
      '<div style="text-align:right">',
      '<div style="font-size:1.8rem;font-weight:900;color:' + (pct >= 70 ? '#16a34a' : '#d97706') + '">' + correctDisp + ' <span style="font-size:1.1rem;color:var(--muted)">/ ' + totalGraded + ' (' + pct + '%)</span></div>',
      '<div style="font-size:.8rem;font-weight:700;color:#2563eb">' + scaled.label + ': ' + scaled.value + '</div>',
      '</div>',
      '</div>',
      '<div style="margin-bottom:18px">' + domainBarsHtml + '</div>',
      '<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border,#e2e8f0);padding-top:14px;flex-wrap:wrap;gap:10px">',
      '<div style="display:flex;gap:6px" id="cbt-filter-group">',
      '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.cbtFilterReview(\'all\', this)">All Questions (' + totalGraded + ')</button>',
      '<button type="button" class="cbt-nav-btn" onclick="window.cbtFilterReview(\'mistakes\', this)">Mistakes Only (' + mistakesCount + ')</button>',
      '<button type="button" class="cbt-nav-btn" onclick="window.cbtFilterReview(\'flagged\', this)">Flagged</button>',
      '</div>',
      '<div style="display:flex;gap:8px">',
      '<button type="button" class="cbt-nav-btn" onclick="window.print()">📄 Save PDF</button>',
      '<button type="button" class="cbt-nav-btn" onclick="window.retakeCurrentCBTExam()">🔄 Retake</button>',
      '</div>',
      '</div>',
      '</div>'
    ].join('');

    body.insertAdjacentHTML('afterbegin', heroHtml);

    var footer = document.getElementById('mock-exam-footer');
    if (footer) {
      footer.innerHTML = '<div style="display:flex;justify-content:space-between;width:100%">'
        + '<button class="mock-exit-btn" onclick="exitMockExam()" style="background:var(--indigo,#132746);color:#fff;border:none;padding:10px 24px;font-weight:700">Close CBT Simulator</button>'
        + '<button class="cbt-nav-btn cbt-nav-primary" onclick="window.retakeCurrentCBTExam()">🔄 Practice Again</button>'
        + '</div>';
    }

    _typesetMath(body);

    if (window.CSGamify && window.CSGamify.wbActive && window.CSGamify.toggleWhiteboard) {
      window.CSGamify.toggleWhiteboard();
    }
    body.scrollTop = 0;
  }
  window.submitMockExam = submitMockExam;

  window.cbtFilterReview = function (filter, btn) {
    var body = document.getElementById('mock-exam-body');
    if (!body) return;

    if (btn) {
      var group = btn.parentElement.querySelectorAll('button');
      group.forEach(function (b) { b.classList.remove('cbt-nav-primary'); });
      btn.classList.add('cbt-nav-primary');
    }

    var qs = body.querySelectorAll('.mock-q');
    qs.forEach(function (qEl, i) {
      var isRight = (qEl.getAttribute('data-correct') === '1');
      var isFlagged = !!_flags[i];
      if (filter === 'mistakes') {
        qEl.style.display = isRight ? 'none' : 'block';
      } else if (filter === 'flagged') {
        qEl.style.display = isFlagged ? 'block' : 'none';
      } else {
        qEl.style.display = 'block';
      }
    });
  };

  window.exitMockExam = function () {
    if (!_isSubmitted && _totalSecs > 0 && _secs > 0) {
      var answered = 0;
      for (var i = 0; i < _pool.length; i++) { if (_isQuestionAnswered(i)) answered++; }
      var confirmMsg = 'You have completed ' + answered + ' of ' + _pool.length + ' questions.\nAre you sure you want to exit the CBT Simulator without saving?';
      if (!confirm(confirmMsg)) return;
    }

    if (_tmr) { clearInterval(_tmr); _tmr = null; }
    if (typeof window.setFloatingCalcLocked === 'function') {
      window.setFloatingCalcLocked(false);
    }
    if (typeof window.closeFloatingCalc === 'function') {
      window.closeFloatingCalc();
    }
    var overlay = document.getElementById('mock-exam-overlay');
    if (overlay) overlay.classList.remove('show');
    document.body.classList.remove('cbt-open');

    if (window.CSGamify && window.CSGamify.wbActive && window.CSGamify.toggleWhiteboard) {
      window.CSGamify.toggleWhiteboard();
    }
  };
  window.closeMockExam = window.exitMockExam;
  window.CSSatAdaptive = {
    DOMAIN_QUOTAS: _SAT_DOMAIN_QUOTAS,
    getItemIRT: _getItemIRT,
    compute3PLEAP: _compute3PLEAP,
    thetaToSatScaled: _thetaToSatScaled,
    drawSatAdaptiveModule: _drawSatAdaptiveModule,
    routeSatModule2: _routeSatModule2,
    gradeSingleItemQuick: _gradeSingleItemQuick
  };
  window.CSMockExamConfig = {
    PAPERS: PAPERS,
    MENA_BILINGUAL_TRACKS: MENA_BILINGUAL_TRACKS,
    filterPoolForPaper: _filterPoolForPaper,
    drawPaperPool: _drawPaperPool,
    isQuantComp: _isQuantComp,
    parseCompBoxes: _parseCompBoxes,
    resolveBankTrack: _resolveBankTrack,
    getScaledScoreEstimate: _getScaledScoreEstimate
  };

})();
