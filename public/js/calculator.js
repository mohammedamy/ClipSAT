/**
 * ClipSAT Calculator  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * A from-scratch scientific + graphing calculator with two selectable
 * keypad "skins" — TI-84 Plus CE style and Casio fx-991 ClassWiz style —
 * sharing one calculation engine underneath, so a result never differs by
 * skin. This is NOT a ROM emulator: TI's and Casio's actual device
 * firmware is copyrighted and isn't something a web app can legally bundle
 * or redistribute (real ROM-based emulators like jsTIfied/WabbitEmu/CEmu
 * require the user to dump their own calculator's ROM for exactly that
 * reason). What this gives a student instead is the same keypad layout,
 * the same button behavior, and matching results — enough that the muscle
 * memory built here carries straight over to a real exam calculator.
 *
 * Scope (matches what was asked for, not a full CAS):
 *   - Scientific functions: trig (deg/rad/grad), logs, roots, factorial,
 *     nCr/nPr, memory, Ans, a decimal→fraction toggle.
 *   - 2D function graphing (Y1–Y6): window/zoom/pan/trace, plus a per-row
 *     =/</≤/>/≥ relation that shades the solution region of an inequality
 *     (dashed boundary for strict </>, solid for ≤/≥). TI skin only — a
 *     real fx-991 has no graph screen, so the Casio skin doesn't offer one
 *     either; that's intentional device parity, not a missing feature.
 *   - Matrices (A/B/C, up to 5×5): add/sub/multiply/scale, determinant,
 *     inverse, transpose, RREF.
 *   - Equation solver: 2/3-variable simultaneous linear systems, degree
 *     2–4 polynomial roots (real + complex), and a numeric f(x)=0 solver.
 *
 * Two ways to use it — see window.ClipSATCalc at the bottom:
 *   - A floating launcher (bottom-right on every page) opens it as a
 *     modal, built once and reused (state persists across opens/closes in
 *     the same page load) — the "inline widget" alongside chapters.
 *   - The standalone page (src/calculator/index.njk) mounts a second,
 *     independent instance directly into the page instead of a modal.
 * ════════════════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════
     PART 1 — EXPRESSION ENGINE (tokenize → parse → evaluate)
     Grammar (standard calculator precedence, right-assoc ^, implicit
     multiplication for "2π", "3sin(30)", "2(4+5)"):
       expression := term (('+'|'-') term)*
       term       := unary (('*'|'/'|implicit) unary)*
       unary      := ('-'|'+') unary | power
       power      := postfix ('^' unary)?
       postfix    := primary ('!'|'%')*
       primary    := number | '(' expression ')' | ident ['(' args ')']
     Every keypad function button inserts a matching opening paren (e.g.
     "sin(", "√(") so the parser only ever needs to handle well-formed
     calls — real calculators accept a trailing unclosed paren too, so
     parsePrimary()/evaluate() below are tolerant of one going missing.
     ══════════════════════════════════════════════════════════════════════ */
  function tokenize(src) {
    var s = String(src)
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/→/g, '->');
    var toks = [], i = 0, n = s.length;
    while (i < n) {
      var c = s.charAt(i);
      if (c === ' ' || c === '\t') { i++; continue; }
      if (/[0-9.]/.test(c)) {
        var j = i, sawDot = false;
        // Stop at a SECOND '.' rather than swallowing it into this token:
        // "1.2.3" used to scan the whole thing as one num token but
        // parseFloat() silently drops everything from the 2nd dot on
        // (value 1.2), while `raw` below kept the full "1.2.3" text — the
        // live preview showed one number, ENTER computed a different one.
        // Stopping here instead re-tokenizes the rest starting at the 2nd
        // dot (".3" becomes its own number, implicit-multiplied against
        // the first — 1.2*.3), so raw and value always agree on what was
        // actually typed. A real device's own "." key just refuses a
        // second decimal point in the same number in the first place;
        // this is the engine-level equivalent for free-typed text.
        while (j < n && /[0-9.]/.test(s.charAt(j))) {
          if (s.charAt(j) === '.') { if (sawDot) break; sawDot = true; }
          j++;
        }
        if (j < n && (s.charAt(j) === 'E' || s.charAt(j) === 'e') && /[0-9+\-]/.test(s.charAt(j + 1) || '')) {
          j++;
          if (s.charAt(j) === '+' || s.charAt(j) === '-') j++;
          while (j < n && /[0-9]/.test(s.charAt(j))) j++;
        }
        // `raw` keeps the exact substring the user typed ("3.", "007") —
        // only used by the natural-math renderer below (PART 4b) so the
        // live preview shows literally what's on the line, not a
        // recomputed/reformatted number; evalNode() still only ever reads
        // `value`, so this has zero effect on calculation.
        toks.push({ type: 'num', value: parseFloat(s.slice(i, j)), raw: s.slice(i, j) });
        i = j;
        continue;
      }
      if (s.slice(i, i + 2) === '->') {
        toks.push({ type: 'op', value: '->' }); i += 2; continue;
      }
      if (/[A-Za-z_]/.test(c)) {
        var k = i;
        while (k < n && /[A-Za-z_0-9]/.test(s.charAt(k))) k++;
        toks.push({ type: 'ident', value: s.slice(i, k) });
        i = k;
        continue;
      }
      if ('+-*/^%!(),'.indexOf(c) !== -1) { toks.push({ type: 'op', value: c }); i++; continue; }
      i++; // unrecognized char — skip defensively, keypad shouldn't ever produce one
    }
    return toks;
  }

  function Parser(toks) { this.t = toks; this.p = 0; }
  Parser.prototype.peek = function () { return this.t[this.p]; };
  Parser.prototype.isOp = function (tok, v) { return !!tok && tok.type === 'op' && tok.value === v; };
  Parser.prototype.eatOp = function (v) { if (this.isOp(this.peek(), v)) { this.p++; return true; } return false; };
  Parser.prototype.canStartFactor = function (tok) {
    return !!tok && (tok.type === 'num' || tok.type === 'ident' || this.isOp(tok, '('));
  };
  Parser.prototype.parseExpression = function () {
    var node = this.parseTerm();
    while (this.isOp(this.peek(), '+') || this.isOp(this.peek(), '-')) {
      var op = this.t[this.p++].value;
      node = { type: 'bin', op: op, l: node, r: this.parseTerm() };
    }
    return node;
  };
  Parser.prototype.parseTerm = function () {
    var node = this.parseUnary();
    while (true) {
      var tok = this.peek();
      if (this.isOp(tok, '*') || this.isOp(tok, '/')) {
        this.p++;
        node = { type: 'bin', op: tok.value, l: node, r: this.parseUnary() };
      } else if (this.canStartFactor(tok)) {
        node = { type: 'bin', op: '*', l: node, r: this.parseUnary() }; // implicit multiplication
      } else break;
    }
    return node;
  };
  Parser.prototype.parseUnary = function () {
    var tok = this.peek();
    if (this.isOp(tok, '-') || this.isOp(tok, '+')) { this.p++; return { type: 'unary', op: tok.value, a: this.parseUnary() }; }
    return this.parsePower();
  };
  Parser.prototype.parsePower = function () {
    var node = this.parsePostfix();
    if (this.eatOp('^')) node = { type: 'bin', op: '^', l: node, r: this.parseUnary() }; // right-assoc, allows 2^-3
    return node;
  };
  Parser.prototype.parsePostfix = function () {
    var node = this.parsePrimary();
    while (true) {
      if (this.eatOp('!')) node = { type: 'post', op: '!', a: node };
      else if (this.eatOp('%')) node = { type: 'post', op: '%', a: node };
      else break;
    }
    return node;
  };
  Parser.prototype.parsePrimary = function () {
    var tok = this.peek();
    if (!tok) return { type: 'num', value: NaN };
    if (tok.type === 'num') { this.p++; return { type: 'num', value: tok.value }; }
    if (this.isOp(tok, '(')) {
      this.p++;
      var node = this.parseExpression();
      this.eatOp(')'); // tolerant of a missing trailing paren, like a real calculator
      return node;
    }
    if (tok.type === 'ident') {
      this.p++;
      var name = tok.value;
      if (this.isOp(this.peek(), '(')) {
        this.p++;
        var args = [];
        if (!this.isOp(this.peek(), ')')) {
          args.push(this.parseExpression());
          while (this.eatOp(',')) args.push(this.parseExpression());
        }
        this.eatOp(')');
        return { type: 'call', name: name, args: args };
      }
      return { type: 'var', name: name };
    }
    this.p++; // stray operator — advance defensively rather than looping forever
    return { type: 'num', value: NaN };
  };

  function toAngle(rad, mode) { return mode === 'deg' ? rad * 180 / Math.PI : mode === 'grad' ? rad * 200 / Math.PI : rad; }
  function fromAngle(v, mode) { return mode === 'deg' ? v * Math.PI / 180 : mode === 'grad' ? v * Math.PI / 200 : v; }

  function factorial(n) {
    if (n < 0 || Math.floor(n) !== n || n > 170) return NaN; // real calculators cap around here too (float overflow)
    var r = 1;
    for (var i = 2; i <= n; i++) r *= i;
    return r;
  }
  function permut(n, r) { if (r > n || r < 0) return NaN; return factorial(n) / factorial(n - r); }
  function combin(n, r) { if (r > n || r < 0) return NaN; return factorial(n) / (factorial(r) * factorial(n - r)); }

  function callFn(name, a, ctx) {
    var x = a[0];
    switch (name.toLowerCase()) {
      case 'sin': return Math.sin(fromAngle(x, ctx.angle));
      case 'cos': return Math.cos(fromAngle(x, ctx.angle));
      case 'tan': return Math.tan(fromAngle(x, ctx.angle));
      case 'asin': return toAngle(Math.asin(x), ctx.angle);
      case 'acos': return toAngle(Math.acos(x), ctx.angle);
      case 'atan': return toAngle(Math.atan(x), ctx.angle);
      case 'sinh': return (Math.exp(x) - Math.exp(-x)) / 2;
      case 'cosh': return (Math.exp(x) + Math.exp(-x)) / 2;
      case 'tanh': return (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1);
      case 'ln': return Math.log(x);
      case 'log': return Math.log(x) / Math.LN10;
      case 'logb': return Math.log(a[1]) / Math.log(x); // logb(base, value) — from the keypad's "log▸base" button
      case 'sqrt': return Math.sqrt(x);
      case 'cbrt': return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1 / 3);
      case 'nthroot': return (a[1] < 0 && Math.round(x) % 2 === 1) ? -Math.pow(-a[1], 1 / x) : Math.pow(a[1], 1 / x); // nthroot(n, value)
      case 'exp': return Math.exp(x);
      case 'abs': return Math.abs(x);
      case 'ncr': return combin(x, a[1]);
      case 'npr': return permut(x, a[1]);
      case 'fact': return factorial(x);
      case 'randint': return Math.floor(Math.random() * (a[1] - x + 1)) + x;
      case 'rand': return Math.random();
      case 'pi': return Math.PI;
      case 'e': return Math.E;
      // Probability distributions (Stats tab's Distributions panel is the
      // friendly way to reach these — see buildStatsScreen() — but they're
      // real callable functions too, same as sin(/log( above, matching a
      // real TI-84's DISTR menu items being ordinary function calls once
      // inserted). mu/sigma default to the standard normal (0,1) when
      // omitted, same convention TI-84 itself uses for a 2-arg normalcdf.
      case 'normalpdf': return normPdfStd((x - (a[1] || 0)) / (a[2] != null ? a[2] : 1)) / (a[2] != null ? a[2] : 1);
      case 'normalcdf': return normCdfStd((a[1] - (a[2] || 0)) / (a[3] != null ? a[3] : 1)) - normCdfStd((x - (a[2] || 0)) / (a[3] != null ? a[3] : 1));
      case 'invnorm': return (a[1] || 0) + (a[2] != null ? a[2] : 1) * invNormStd(x);
      case 'binompdf': return binomPdf(x, a[1], a[2]); // binompdf(n, p, x)
      case 'binomcdf': return binomCdf(x, a[1], a[2]);
      case 'poissonpdf': return poissonPdf(x, a[1]); // poissonpdf(lambda, x)
      case 'poissoncdf': return poissonCdf(x, a[1]);
      default: return NaN;
    }
  }

  function evalNode(node, ctx) {
    switch (node.type) {
      case 'num': return node.value;
      case 'var':
        var nm = node.name.toLowerCase();
        if (nm === 'pi') return Math.PI;
        if (nm === 'e') return Math.E;
        if (ctx.vars.hasOwnProperty(nm)) return ctx.vars[nm];
        if (nm === 'ans') return 0; // callers that don't thread the full var store (e.g. the equation solver's f(x) probe) still get a defined Ans
        return NaN;
      case 'unary': var u = evalNode(node.a, ctx); return node.op === '-' ? -u : u;
      case 'post':
        var p = evalNode(node.a, ctx);
        if (node.op === '!') return factorial(p);
        if (node.op === '%') return p / 100;
        return p;
      case 'bin':
        var l = evalNode(node.l, ctx), r = evalNode(node.r, ctx);
        switch (node.op) {
          case '+': return l + r;
          case '-': return l - r;
          case '*': return l * r;
          case '/': return l / r;
          case '^': return Math.pow(l, r);
        }
        return NaN;
      case 'call':
        var args = node.args.map(function (n) { return evalNode(n, ctx); });
        return callFn(node.name, args, ctx);
    }
    return NaN;
  }

  // Public entry point: evaluate(exprString, {angle:'deg'|'rad'|'grad', vars:{ans, x, a, b ...}})
  function evaluate(src, ctx) {
    ctx = ctx || { angle: 'deg', vars: {} };
    if (!ctx.vars) ctx.vars = {};
    try {
      var toks = tokenize(src);
      if (!toks.length) return NaN;
      var ast = new Parser(toks).parseExpression();
      return evalNode(ast, ctx);
    } catch (e) { return NaN; }
  }

  // Decimal → simple fraction (continued-fraction best-rational-approximation,
  // capped so it lands on "nice" schoolwork fractions like 3/4 or 1/3 rather
  // than a huge denominator chasing full float precision — matches what a
  // Casio's S⇔D key actually shows).
  function toFraction(x) {
    if (!isFinite(x)) return null;
    var sign = x < 0 ? -1 : 1; x = Math.abs(x);
    var whole = Math.floor(x), frac = x - whole;
    if (frac < 1e-10) return { whole: sign * whole, num: 0, den: 1 };
    var n0 = 0, n1 = 1, d0 = 1, d1 = 0, cur = frac, num = 1, den = 1;
    for (var i = 0; i < 25; i++) {
      var a = Math.floor(cur);
      var n2 = a * n1 + n0, d2 = a * d1 + d0;
      if (d2 > 100000) break;
      n0 = n1; n1 = n2; d0 = d1; d1 = d2; num = n1; den = d1;
      var rem = cur - a;
      if (rem < 1e-9) break;
      cur = 1 / rem;
    }
    if (Math.abs(num / den - frac) > 1e-6) return null; // no clean fraction found — leave as decimal
    return { whole: sign * whole, num: num, den: den };
  }

  /* ══════════════════════════════════════════════════════════════════════
     PART 2 — MATRICES
     Plain 2D-array matrices with Gauss-Jordan elimination shared by
     inverse(), rref(), and the simultaneous-equation solver in Part 3.
     ══════════════════════════════════════════════════════════════════════ */
  var Mat = {
    zeros: function (r, c) { var m = []; for (var i = 0; i < r; i++) { m.push([]); for (var j = 0; j < c; j++) m[i].push(0); } return m; },
    clone: function (A) { return A.map(function (row) { return row.slice(); }); },
    add: function (A, B) { return A.map(function (row, i) { return row.map(function (v, j) { return v + B[i][j]; }); }); },
    sub: function (A, B) { return A.map(function (row, i) { return row.map(function (v, j) { return v - B[i][j]; }); }); },
    scale: function (A, k) { return A.map(function (row) { return row.map(function (v) { return v * k; }); }); },
    mul: function (A, B) {
      var r = A.length, k = B.length, c = B[0].length, out = Mat.zeros(r, c);
      for (var i = 0; i < r; i++) for (var j = 0; j < c; j++) { var s = 0; for (var x = 0; x < k; x++) s += A[i][x] * B[x][j]; out[i][j] = s; }
      return out;
    },
    transpose: function (A) { var r = A.length, c = A[0].length, out = Mat.zeros(c, r); for (var i = 0; i < r; i++) for (var j = 0; j < c; j++) out[j][i] = A[i][j]; return out; },
    minor: function (A, ri, ci) { return A.filter(function (_, i) { return i !== ri; }).map(function (row) { return row.filter(function (_, j) { return j !== ci; }); }); },
    det: function (A) {
      var n = A.length;
      if (n === 1) return A[0][0];
      if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
      var d = 0;
      for (var c = 0; c < n; c++) d += (c % 2 === 0 ? 1 : -1) * A[0][c] * Mat.det(Mat.minor(A, 0, c));
      return d;
    },
    // Gauss-Jordan with partial pivoting on an augmented [A | rhs] matrix
    // (rhs may be the identity, for inverse(), or a single results column,
    // for solving Ax=b) — returns the reduced rhs, or null if A is singular.
    solveAugmented: function (A, rhs) {
      var n = A.length, m = Mat.clone(A), b = rhs.map(function (row) { return row.slice(); });
      for (var col = 0; col < n; col++) {
        var piv = col;
        for (var r = col + 1; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[piv][col])) piv = r;
        if (Math.abs(m[piv][col]) < 1e-10) return null; // singular
        if (piv !== col) { var t1 = m[piv]; m[piv] = m[col]; m[col] = t1; var t2 = b[piv]; b[piv] = b[col]; b[col] = t2; }
        var pv = m[col][col];
        for (var j = 0; j < n; j++) m[col][j] /= pv;
        for (var j2 = 0; j2 < b[col].length; j2++) b[col][j2] /= pv;
        for (var r2 = 0; r2 < n; r2++) {
          if (r2 === col) continue;
          var f = m[r2][col];
          if (!f) continue;
          for (var j3 = 0; j3 < n; j3++) m[r2][j3] -= f * m[col][j3];
          for (var j4 = 0; j4 < b[r2].length; j4++) b[r2][j4] -= f * b[col][j4];
        }
      }
      return b;
    },
    inverse: function (A) {
      var n = A.length, I = Mat.zeros(n, n);
      for (var i = 0; i < n; i++) I[i][i] = 1;
      return Mat.solveAugmented(A, I);
    },
    // Reduced row-echelon form of a (possibly non-square) matrix — its own
    // Gauss-Jordan pass since solveAugmented() above assumes a square A.
    rref: function (A) {
      var m = Mat.clone(A), rows = m.length, cols = m[0].length, lead = 0;
      for (var r = 0; r < rows && lead < cols; r++) {
        var i = r;
        while (Math.abs(m[i][lead]) < 1e-10) {
          i++;
          if (i === rows) { i = r; lead++; if (lead === cols) return m; }
        }
        var tmp = m[i]; m[i] = m[r]; m[r] = tmp;
        var lv = m[r][lead];
        m[r] = m[r].map(function (v) { return v / lv; });
        for (var ri = 0; ri < rows; ri++) {
          if (ri === r) continue;
          var f = m[ri][lead];
          m[ri] = m[ri].map(function (v, j) { return v - f * m[r][j]; });
        }
        lead++;
      }
      return m;
    }
  };

  /* ══════════════════════════════════════════════════════════════════════
     PART 3 — EQUATION SOLVER
     ══════════════════════════════════════════════════════════════════════ */
  // 2 or 3 unknowns: coeffs is an n×(n+1) augmented matrix (last column is
  // the RHS). Returns {x:[...]} or {error:'no unique solution'}.
  function solveLinearSystem(coeffs) {
    var n = coeffs.length;
    var A = coeffs.map(function (row) { return row.slice(0, n); });
    var b = coeffs.map(function (row) { return [row[n]]; });
    var res = Mat.solveAugmented(A, b);
    if (!res) return { error: true };
    return { x: res.map(function (row) { return row[0]; }) };
  }

  // Complex helpers for the polynomial root finder below.
  function cAdd(a, b) { return { re: a.re + b.re, im: a.im + b.im }; }
  function cSub(a, b) { return { re: a.re - b.re, im: a.im - b.im }; }
  function cMul(a, b) { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; }
  function cDiv(a, b) { var d = b.re * b.re + b.im * b.im || 1e-300; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }; }
  function cAbs(a) { return Math.sqrt(a.re * a.re + a.im * a.im); }

  // Durand-Kerner (Weierstrass) simultaneous iteration — every root, real or
  // complex, of a degree-n polynomial in one pass; robust and short enough
  // to keep the solver self-contained instead of branching per degree.
  // coeffs = [a_n, ..., a_1, a_0], highest degree first, a_n != 0.
  function polyRoots(coeffs) {
    var n = coeffs.length - 1;
    if (n < 1) return [];
    var a = coeffs.map(function (c) { return c / coeffs[0]; });
    function evalPoly(z) {
      var acc = { re: 1, im: 0 };
      for (var i = 1; i < a.length; i++) acc = cAdd(cMul(acc, z), { re: a[i], im: 0 });
      return acc;
    }
    var roots = [];
    for (var i = 0; i < n; i++) {
      var ang = 2 * Math.PI * i / n + 0.35;
      roots.push({ re: 0.4 + 0.9 * Math.cos(ang), im: 0.9 * Math.sin(ang) });
    }
    for (var iter = 0; iter < 300; iter++) {
      var maxDelta = 0;
      for (var k = 0; k < n; k++) {
        var num = evalPoly(roots[k]);
        var den = { re: 1, im: 0 };
        for (var j = 0; j < n; j++) { if (j === k) continue; den = cMul(den, cSub(roots[k], roots[j])); }
        var delta = cDiv(num, den);
        roots[k] = cSub(roots[k], delta);
        maxDelta = Math.max(maxDelta, cAbs(delta));
      }
      if (maxDelta < 1e-12) break;
    }
    // Clean up float dust so a real root like 2.0000000003 reads as 2.
    return roots.map(function (z) {
      var re = Math.abs(z.re) < 1e-9 ? 0 : z.re, im = Math.abs(z.im) < 1e-7 ? 0 : z.im;
      return { re: Math.round(re * 1e9) / 1e9, im: Math.round(im * 1e9) / 1e9 };
    }).sort(function (p, q) { return p.re - q.re || p.im - q.im; });
  }

  // Numeric f(x)=0 solver (Casio "SOLVE" / TI Solver) — Newton-Raphson with
  // a numeric central-difference derivative, guarded against a flat/zero
  // derivative and capped iterations so a bad guess fails cleanly instead
  // of hanging.
  function solveNumeric(expr, guess, angle) {
    var h = 1e-6;
    function f(x) { return evaluate(expr, { angle: angle, vars: { x: x } }); }
    var x = guess;
    for (var i = 0; i < 100; i++) {
      var fx = f(x);
      if (!isFinite(fx)) return { error: true };
      if (Math.abs(fx) < 1e-10) return { x: x };
      var d = (f(x + h) - f(x - h)) / (2 * h);
      if (!isFinite(d) || Math.abs(d) < 1e-12) return { error: true };
      var next = x - fx / d;
      if (!isFinite(next)) return { error: true };
      if (Math.abs(next - x) < 1e-12) return { x: next };
      x = next;
    }
    return { error: true };
  }

  /* ══════════════════════════════════════════════════════════════════════
     PART 3b — STATISTICS & PROBABILITY DISTRIBUTIONS
     Two independent pieces: the distribution functions (normalpdf/cdf,
     invNorm, binompdf/cdf, poissonpdf/cdf) are wired into callFn() below
     so they're usable as ordinary typed expressions on the Calc screen,
     exactly like sin(/log( already are, AND driven from a friendlier
     parameter form on the Stats tab (Part 5); stats1Var()/stats2Var()
     back the Stats tab's 1-Var/2-Var-and-regression output only — a real
     device doesn't expose "the mean of L1" as a typeable function, so
     these aren't in callFn().
     ══════════════════════════════════════════════════════════════════════ */
  // Abramowitz & Stegun 7.1.26 — ~1.5e-7 max error, the standard
  // textbook approximation and plenty of precision for anything this
  // calculator displays (fmtNum itself rounds past 1e-10).
  function erf(x) {
    var sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    var t = 1 / (1 + p * x);
    var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }
  function normCdfStd(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function normPdfStd(z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); }
  // Peter Acklam's rational approximation for the inverse standard normal
  // CDF (the quantile function) — accurate to ~1.15e-9, the standard
  // textbook/production algorithm for this (no closed form exists).
  function invNormStd(p) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    var pLow = 0.02425, pHigh = 1 - pLow, q, r;
    if (p < pLow) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    } else if (p <= pHigh) {
      q = p - 0.5; r = q * q;
      return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
  }
  // A separate nCr from combin() above (which factorial() caps at n=170,
  // matching a real device's own error there) — binompdf/cdf need to
  // handle a much larger n (e.g. n=500 trials) without hitting that cap,
  // so this multiplies/divides incrementally instead of ever forming a
  // raw factorial, staying numerically sane far past n=170.
  function combinSafe(n, r) {
    if (r < 0 || r > n || n < 0) return 0;
    r = Math.min(r, n - r);
    var result = 1;
    for (var i = 0; i < r; i++) result *= (n - i) / (i + 1);
    return result;
  }
  function binomPdf(n, p, x) {
    if (x < 0 || x > n || Math.floor(x) !== x) return 0;
    return combinSafe(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
  }
  function binomCdf(n, p, x) {
    var s = 0;
    for (var k = 0; k <= Math.floor(x); k++) s += binomPdf(n, p, k);
    return s;
  }
  // Same incremental-not-factorial reasoning as combinSafe() above — built
  // up term-by-term (p(k) = p(k-1)*λ/k) so a large x never forms x!.
  function poissonPdf(lambda, x) {
    if (x < 0 || Math.floor(x) !== x) return 0;
    var p = Math.exp(-lambda);
    for (var k = 1; k <= x; k++) p *= lambda / k;
    return p;
  }
  function poissonCdf(lambda, x) {
    var term = Math.exp(-lambda), s = term;
    for (var k = 1; k <= Math.floor(x); k++) { term *= lambda / k; s += term; }
    return s;
  }

  // ── 1-Var / 2-Var Stats (Stats tab only — see the note above) ──
  function quantileMedianOfHalves(sorted) {
    // TI-84's own Q1/Q3 convention: the median of the lower/upper half,
    // EXCLUDING the overall median itself when n is odd (not every
    // textbook agrees on a quartile method — this one matches the real
    // device's 1-Var Stats output, which is the point of this app).
    var n = sorted.length;
    function median(arr) {
      var m = arr.length;
      if (!m) return NaN;
      return m % 2 ? arr[(m - 1) / 2] : (arr[m / 2 - 1] + arr[m / 2]) / 2;
    }
    var lowerEnd = Math.floor(n / 2);
    var upperStart = n % 2 ? Math.ceil(n / 2) : n / 2;
    return { median: median(sorted), q1: median(sorted.slice(0, lowerEnd)), q3: median(sorted.slice(upperStart)) };
  }
  // Returns null for an empty list; sample stdev (sx) is NaN for n=1 (a
  // real device shows the same "undefined" there — n-1 in the
  // denominator divides by zero).
  function stats1Var(xs) {
    var n = xs.length;
    if (!n) return null;
    var sum = xs.reduce(function (a, b) { return a + b; }, 0);
    var sumSq = xs.reduce(function (a, b) { return a + b * b; }, 0);
    var mean = sum / n;
    var sx = n > 1 ? Math.sqrt((sumSq - n * mean * mean) / (n - 1)) : NaN;
    var sigmax = Math.sqrt(Math.max(0, sumSq - n * mean * mean) / n);
    var sorted = xs.slice().sort(function (a, b) { return a - b; });
    var q = quantileMedianOfHalves(sorted);
    return { n: n, sum: sum, sumSq: sumSq, mean: mean, sx: sx, sigmax: sigmax, min: sorted[0], q1: q.q1, median: q.median, q3: q.q3, max: sorted[n - 1] };
  }
  // Linear regression y = a + bx (the standard least-squares fit both
  // real devices default to) plus the correlation coefficient r.
  function stats2Var(xs, ys) {
    var n = xs.length;
    if (!n || ys.length !== n) return null;
    var sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
    for (var i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; syy += ys[i] * ys[i]; sxy += xs[i] * ys[i]; }
    var xbar = sx / n, ybar = sy / n;
    var Sxx = sxx - n * xbar * xbar, Syy = syy - n * ybar * ybar, Sxy = sxy - n * xbar * ybar;
    var b = Sxy / Sxx, a = ybar - b * xbar;
    var r = Sxy / Math.sqrt(Sxx * Syy);
    return { n: n, xbar: xbar, ybar: ybar, a: a, b: b, r: r, r2: r * r };
  }

  /* ══════════════════════════════════════════════════════════════════════
     PART 4 — SHARED HELPERS
     ══════════════════════════════════════════════════════════════════════ */
  function fmtNum(x) {
    if (x == null || isNaN(x)) return 'Error';
    if (!isFinite(x)) return x > 0 ? '∞' : '-∞';
    if (x === 0) return '0';
    var abs = Math.abs(x);
    if (abs !== 0 && (abs < 1e-6 || abs >= 1e10)) {
      // toExponential(6) always pads the mantissa to 6 decimal places
      // ("1.000000e10" for a round 1e10) — trim trailing zeros the same
      // way the plain-decimal branch below already does, so a round
      // number in scientific range reads "1e10", not "1.000000e10".
      var exp = x.toExponential(6).replace(/e\+?(-?)(\d+)/, 'e$1$2');
      var parts = exp.split('e');
      var mant = parts[0].indexOf('.') !== -1 ? parts[0].replace(/0+$/, '').replace(/\.$/, '') : parts[0];
      return mant + 'e' + parts[1];
    }
    var s = String(Math.round(x * 1e10) / 1e10);
    if (s.indexOf('.') !== -1) s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s;
  }
  function el(tag, cls, html) { var d = document.createElement(tag); if (cls) d.className = cls; if (html != null) d.innerHTML = html; return d; }

  var COLORS = ['#e11d48', '#2563eb', '#16a34a', '#d97706', '#7c3aed', '#0891b2'];
  // '#rrggbb' -> 'rgba(r,g,b,alpha)', for inequality shading fills below.
  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* ══════════════════════════════════════════════════════════════════════
     PART 4b — NATURAL MATH DISPLAY ("CAS style")
     Re-renders the SAME AST the engine already parses (Part 1) as real
     typeset math — stacked a/b fractions, a √ radical with a bar drawn
     over its contents, and true superscript exponents — instead of the
     flat "sqrt(2)/x^2" a plain text box can only ever show. Two call
     sites use this: a live preview above the entry line (so typing reads
     like a MathPrint/CAS screen while it's still being edited) and the
     history list (so past work reads the same way). This module only
     ever READS an AST it builds with the existing tokenize()/Parser — it
     never evaluates anything and never changes what's actually typed, so
     the calculation itself (evalNode(), evaluate()) is untouched by it;
     the worst a bug here can do is a cosmetic misrender, never a wrong
     answer.
     ══════════════════════════════════════════════════════════════════════ */
  function mSpan(cls, kids) {
    var s = document.createElement('span');
    if (cls) s.className = cls;
    (kids || []).forEach(function (k) { s.appendChild(typeof k === 'string' ? document.createTextNode(k) : k); });
    return s;
  }
  function mText(t) { return document.createTextNode(t); }

  var FN_DISPLAY = { asin: 'sin⁻¹', acos: 'cos⁻¹', atan: 'tan⁻¹' };
  var VAR_DISPLAY = { pi: 'π', ans: 'Ans' };

  // Standard precedence-climbing pretty printer: parens are re-inserted
  // exactly where they're needed for the redisplay to still mean what the
  // parsed AST means, even though the parser itself discards explicit
  // parens the user typed (parsePrimary() just returns the inner node).
  // Fractions, radicals, and function calls are self-delimiting (the bar/
  // radical sign/parens already show their extent) so they never need an
  // outer paren no matter the surrounding context.
  function mPrec(node) {
    switch (node.type) {
      case 'num': case 'var': case 'call': return 6;
      case 'post': return 5;
      case 'unary': return 3;
      case 'bin': return node.op === '^' ? 4 : (node.op === '*' || node.op === '/') ? 2 : 1;
    }
    return 6;
  }
  function mRender(node, minPrec, tightRight) {
    minPrec = minPrec || 0;
    if (!node) return mText('');
    var inner;
    switch (node.type) {
      case 'num':
        if (node.raw != null) inner = mText(node.raw);
        else if (isNaN(node.value)) inner = mSpan('cc-mplaceholder', ['▢']); // an as-yet-unfilled slot (e.g. "√(" with nothing typed after it yet)
        else inner = mText(fmtNum(node.value));
        break;
      case 'var':
        var nm = node.name.toLowerCase();
        inner = mSpan(nm === 'pi' ? 'cc-mconst' : 'cc-mvar', [VAR_DISPLAY.hasOwnProperty(nm) ? VAR_DISPLAY[nm] : node.name]);
        break;
      case 'unary':
        inner = mSpan('cc-munary', [node.op === '-' ? '−' : '+', mRender(node.a, 3, true)]);
        break;
      case 'post':
        inner = mSpan(null, [mRender(node.a, 6), node.op === '!' ? '!' : '%']);
        break;
      case 'bin':
        inner = mRenderBin(node);
        break;
      case 'call':
        inner = mRenderCall(node);
        break;
      default:
        inner = mText('?');
    }
    if (node.type === 'call' || (node.type === 'bin' && node.op === '/')) return inner; // self-delimiting — never needs an outer paren
    var p = mPrec(node);
    if (p < minPrec || (tightRight && p === minPrec)) return mSpan('cc-mparen', ['(', inner, ')']);
    return inner;
  }
  function mRenderBin(node) {
    if (node.op === '/') {
      return mSpan('cc-mfrac', [mSpan('cc-mnum', [mRender(node.l, 0)]), mSpan('cc-mden', [mRender(node.r, 0)])]);
    }
    if (node.op === '^') {
      var base = mRender(node.l, 5);
      if (node.l.type === 'bin' && node.l.op === '/') base = mSpan('cc-mparen', ['(', base, ')']); // a fraction base still gets parens before the exponent, for clarity
      return mSpan('cc-mpow', [base, mSpan('cc-msup', [mRender(node.r, 0)])]);
    }
    if (node.op === '*') {
      // Implicit-multiplication juxtaposition ("2π", "3sin(30)", "x√5")
      // reads as plain textbook notation with no visible operator — but
      // only when the RIGHT side isn't itself a bare digit: "2*3" as "23"
      // would read as one number, and "sqrt(5)*2" as "√52" reads as
      // "the square root of 52" (the radical bar gives no visual cue
      // that its content ends before that trailing digit). Whenever the
      // right operand is a plain number, keep the × visible.
      var showTimes = node.r.type === 'num';
      return mSpan('cc-mbin', [mRender(node.l, 2), showTimes ? ' × ' : '', mRender(node.r, 2)]);
    }
    if (node.op === '-') return mSpan('cc-mbin', [mRender(node.l, 1), ' − ', mRender(node.r, 1, true)]);
    return mSpan('cc-mbin', [mRender(node.l, 1), ' + ', mRender(node.r, 1)]); // '+'
  }
  function mArgList(args) {
    var s = mSpan('cc-margs', ['(']);
    (args || []).forEach(function (a, i) { if (i > 0) s.appendChild(mText(', ')); s.appendChild(mRender(a, 0)); });
    s.appendChild(mText(')'));
    return s;
  }
  function mRadical(indexFrag, contentNode) {
    var kids = [];
    if (indexFrag != null) kids.push(mSpan('cc-msqrt-n', [indexFrag]));
    kids.push(mSpan('cc-msqrt-rad', ['√']));
    kids.push(mSpan('cc-msqrt-content', [mRender(contentNode, 0)]));
    return mSpan('cc-msqrt' + (indexFrag != null ? ' cc-msqrt-idx' : ''), kids);
  }
  function mRenderCall(node) {
    var name = node.name.toLowerCase(), args = node.args;
    if (name === 'sqrt') return mRadical(null, args[0]);
    if (name === 'cbrt') return mRadical('3', args[0]);
    if (name === 'nthroot' && args.length >= 2) return mRadical(mRender(args[0], 0), args[1]);
    if (name === 'abs') return mSpan('cc-mabs', ['|', mRender(args[0], 0), '|']);
    if (name === 'logb' && args.length >= 2) return mSpan('cc-mfn', ['log', mSpan('cc-msub', [mRender(args[0], 0)]), mArgList(args.slice(1))]);
    return mSpan('cc-mfn', [FN_DISPLAY.hasOwnProperty(name) ? FN_DISPLAY[name] : node.name, mArgList(args)]);
  }

  // Public entry point for both call sites below: tolerant of a
  // half-typed expression (reuses the same tolerant tokenize()/Parser the
  // engine itself uses) — falls back to the raw string rather than
  // showing nothing if parsing throws.
  function mathPreviewFrag(str) {
    var frag = document.createDocumentFragment();
    var s = String(str == null ? '' : str).trim();
    if (!s) return frag;
    try {
      var toks = tokenize(s);
      if (!toks.length) return frag;
      // A STO-> line ("5 → A") doesn't parse as one expression — render
      // the left side (what's being stored) as normal math, then the
      // arrow, then the raw variable name typed after it.
      var arrowIndex = -1;
      for (var ai = 0; ai < toks.length; ai++) { if (toks[ai].type === 'op' && toks[ai].value === '->') { arrowIndex = ai; break; } }
      if (arrowIndex !== -1) {
          var leftToks = toks.slice(0, arrowIndex);
          var rightToks = toks.slice(arrowIndex + 1);
          var leftAst = leftToks.length ? new Parser(leftToks).parseExpression() : null;
          if (leftAst) frag.appendChild(mRender(leftAst, 0));
          frag.appendChild(mSpan('cc-mbin', [' → ']));
          rightToks.forEach(function (t) { frag.appendChild(mText(t.raw || t.value)); });
          return frag;
      }

      frag.appendChild(mRender(new Parser(toks).parseExpression(), 0));
    } catch (e) {
      frag.appendChild(mText(s));
    }
    return frag;
  }

  /* ══════════════════════════════════════════════════════════════════════
     PART 5 — APP UI (built once per mounted instance; buildApp() returns
     nothing but wires everything into `container`)
     ══════════════════════════════════════════════════════════════════════ */
  function buildApp(container, opts) {
    opts = opts || {};
    var state = {
      skin: 'ti84',              // 'ti84' | 'casio'
      screen: 'calc',            // 'calc' | 'graph' | 'matrix' | 'eqn'
      angle: 'deg',              // 'deg' | 'rad' | 'grad'
      // One-shot modifiers, same as a real device's 2ND/SHIFT and ALPHA
      // keys: pressing one arms it, the NEXT key consumes it (taking that
      // key's shift/alpha function instead of its primary one) and it
      // disarms itself again — see modKey()/insKeyMod() below. Mutually
      // exclusive, like the real thing.
      shift: false,
      alpha: false,
      traceMode: false,
      traceX: null,
      vars: { ans: 0, m: 0 },    // Unified variable store (A-Z, ans, m)
      history: [],               // [{expr, result}]
      // rel: '=' plots a plain curve (the default, unchanged behavior);
      // '<' | '<=' | '>' | '>=' also shades the solution region of the
      // inequality y <rel> expr — below the curve for '<'/'<=', above it
      // for '>'/'>='. A strict '<' or '>' draws a dashed boundary (the
      // curve itself isn't part of the solution set — standard textbook
      // convention); '<='/'>=' draws it solid.
      graphs: [
        { expr: 'x^2', rel: '=', on: true }, { expr: '', rel: '=', on: true }, { expr: '', rel: '=', on: true },
        { expr: '', rel: '=', on: true }, { expr: '', rel: '=', on: true }, { expr: '', rel: '=', on: true }
      ],
      win: { xmin: -10, xmax: 10, ymin: -10, ymax: 10 },
      matrices: { A: Mat.zeros(2, 2), B: Mat.zeros(2, 2), C: Mat.zeros(2, 2) },
      eqnVars: 2,
      eqnCoeffs: Mat.zeros(3, 4),
      // L1/L2 — the Stats tab's data list, kept in `state` (unlike the
      // eqn solver's own per-render-local input values above) so a data
      // set survives switching tabs and back, same as the matrix editors
      // already do. Values are strings (not parsed numbers) so a blank
      // row reads as blank, not "0" — buildStatsScreen() parses on demand.
      stat: { rows: [{ x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }] }
    };

    container.innerHTML = '';
    var app = el('div', 'cc-app skin-' + state.skin);
    container.appendChild(app);

    // Two fixed rows — tabs, then controls — instead of one flex-wrap
    // row where tabs and controls could interleave and wrap mid-group
    // depending on exactly how much width was left over ("scrambled").
    var topbar = el('div', 'cc-topbar');
    var tabs = el('div', 'cc-tabs');
    var topbarControls = el('div', 'cc-topbar-controls');
    var skinToggle = el('div', 'cc-skintoggle');
    var angleBtn = el('button', 'cc-angle-btn');
    angleBtn.type = 'button';
    topbar.appendChild(tabs);
    topbarControls.appendChild(angleBtn);
    topbarControls.appendChild(skinToggle);
    if (opts.onClose) {
      var closeBtn = el('button', 'cc-close-btn', '✕');
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close calculator');
      closeBtn.onclick = opts.onClose;
      topbarControls.appendChild(closeBtn);
    }
    topbar.appendChild(topbarControls);
    app.appendChild(topbar);

    var body = el('div', 'cc-body');
    app.appendChild(body);

    // ── Skin toggle ──
    // "TI-84"/"Casio" rather than the full "TI-84 Plus CE"/"Casio
    // fx-991" — still unambiguous, but a long label here was the single
    // biggest thing pushing .cc-topbar into extra wrapped rows on a
    // narrow phone, eating into fitKeypad()'s height budget for no real
    // benefit; the full device name is still in each button's title
    // attribute (a hover tooltip) and in the page's own heading on the
    // standalone /calculator/ route.
    [['ti84', 'TI-84', 'TI-84 Plus CE'], ['casio', 'Casio', 'Casio fx-991']].forEach(function (s) {
      var b = el('button', 'cc-skin-btn' + (s[0] === state.skin ? ' on' : ''), s[1]);
      b.type = 'button';
      b.title = s[2];
      b.onclick = function () {
        state.skin = s[0];
        if (state.skin === 'casio' && state.screen === 'graph') state.screen = 'calc'; // real fx-991 has no graph screen
        render();
      };
      skinToggle.appendChild(b);
    });

    function cycleAngle() {
      state.angle = state.angle === 'deg' ? 'rad' : state.angle === 'rad' ? 'grad' : 'deg';
      render();
    }
    angleBtn.onclick = cycleAngle;

    function tabList() {
      var list = [['calc', '🧮 Calc'], ['matrix', '▦ Matrix'], ['eqn', '𝑓 Solver'], ['stat', '📊 Stats']];
      if (state.skin === 'ti84') list.splice(1, 0, ['graph', '📈 Graph']);
      return list;
    }

    function renderTabs() {
      tabs.innerHTML = '';
      tabList().forEach(function (t) {
        var b = el('button', 'cc-tab' + (t[0] === state.screen ? ' on' : ''), t[1]);
        b.type = 'button';
        b.onclick = function () { 
            state.screen = t[0]; 
            state.traceMode = false;
            render(); 
        };
        tabs.appendChild(b);
      });
    }

    // ══════════ CALC SCREEN ══════════
    // .cc-screen (history + input) and .cc-keypad are siblings, not
    // history/input/keypad all three flat in .cc-calc — that's what
    // lets fitKeypad()/calculator.css move the screen to the keypad's
    // side in landscape instead of only ever stacking above it.
    var exprInput, historyEl, keypadEl, screenEl, previewEl, entryLcdEl;
    var shiftBtn, alphaBtn; // the keypad's 2ND/SHIFT and ALPHA toggle keys — (re)assigned in buildTIKeypad()/buildCasioKeypad()
    function buildCalcScreen() {
      var wrap = el('div', 'cc-calc');
      screenEl = el('div', 'cc-screen');
      wrap.appendChild(screenEl);

      historyEl = el('div', 'cc-history');
      screenEl.appendChild(historyEl);
      renderHistory();

      // One shared "LCD panel" (.cc-entry-lcd) holding two lines — a
      // read-only natural-math preview of the current line on top, the
      // actual editable plain-text entry line below it — rather than two
      // separate boxes. That's the same split every real MathPrint/CAS
      // display effectively shows (typeset math above, an edit cursor
      // you actually type into below); insertAtCursor()/backspace()/etc.
      // still work exactly as before, only against a plain <input>, so
      // none of the editing/eval logic below needed to change.
      entryLcdEl = el('div', 'cc-entry-lcd');
      previewEl = el('div', 'cc-preview');
      previewEl.setAttribute('aria-hidden', 'true'); // decorative re-rendering of the input below; that input is what's announced to a screen reader
      entryLcdEl.appendChild(previewEl);

      var inputRow = el('div', 'cc-inputrow');
      exprInput = document.createElement('input');
      exprInput.type = 'text';
      exprInput.className = 'cc-expr-input';
      exprInput.autocomplete = 'off';
      exprInput.spellcheck = false;
      exprInput.setAttribute('aria-label', 'Expression');
      exprInput.placeholder = state.skin === 'ti84' ? '' : '0';
      inputRow.appendChild(exprInput);
      entryLcdEl.appendChild(inputRow);
      screenEl.appendChild(entryLcdEl);
      exprInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); runCalc(); }
      });
      exprInput.addEventListener('input', updatePreview);
      updatePreview();

      keypadEl = state.skin === 'ti84' ? buildTIKeypad() : buildCasioKeypad();
      wrap.appendChild(keypadEl);
      body.appendChild(wrap);
      exprInput.focus();
      requestAnimationFrame(fitKeypad);
    }

    // Mirrors exprInput's current value into the natural-math preview
    // line. A plain keydown/typed character fires the 'input' listener
    // above on its own, but insertAtCursor()/backspace()/clearAll() set
    // .value programmatically (from a keypad button click) — that does
    // NOT fire a native 'input' event, so each of those calls this
    // directly too.
    function updatePreview() {
      if (!previewEl) return;
      var v = exprInput ? exprInput.value : '';
      previewEl.classList.toggle('empty', !v.trim());
      previewEl.innerHTML = '';
      previewEl.appendChild(mathPreviewFrag(v));
    }

    // Sizes the keypad (and .cc-app's own width, so the frame keeps
    // hugging it) to whatever's actually available on THIS screen — a
    // phone, a tablet, a laptop, a classroom smartboard — so every key
    // is visible without scrolling the calculator itself, in EITHER
    // orientation. Recomputed on build, on window resize, and whenever
    // the modal opens (the viewport may have changed, or rotated, while
    // it was closed).
    //
    // Portrait vs landscape isn't just a size difference — it's a
    // different SHAPE of problem. A tall, narrow viewport (a phone
    // upright) has width to spare relative to its height, so stacking
    // the screen above the keypad (real device layout) costs little.
    // A wide, short viewport (a phone on its side, and — this is the
    // one that actually matters most — EVERY laptop/desktop browser
    // window, which is wide-but-short exactly like a landscape phone)
    // has the opposite shape: stacking there forces the keypad to share
    // its already-scarce height with a screen block above it, shrinking
    // keys far more than the width ever needed to, and squeezing
    // .cc-app's whole width down to match a tiny keypad — which is
    // exactly what starved the Graph screen's Y1-Y6 inputs of room to
    // type a formula into. So in landscape .cc-app.landscape moves the
    // screen BESIDE the keypad instead (calculator.css) — the keypad's
    // key positions/order never change, only where the screen sits
    // relative to it, same as a real handheld doesn't reflow its key
    // layout when you turn it sideways.
    function fitKeypad() {
      if (!keypadEl || state.screen !== 'calc' || !keypadEl.isConnected) { fitNonCalcScreen(); return; }
      app.style.maxHeight = ''; // clear any cap fitNonCalcScreen() left behind — the Calc screen sizes its own height via the key math below
      var cols = 5, gap = 4;
      // Row count is no longer a fixed number: the real keypad's rows
      // aren't all the same shape any more (a plain .cc-keyrow is one
      // key-height; the 2ND/SHIFT D-pad cluster — .cc-keyrow-cluster —
      // is two, since its own two stacked key rows share the D-pad's
      // height). Reading it straight off the built keypad means this
      // never needs to be kept in sync by hand as the row layouts
      // change (already bit once — see #196/#197 history).
      var rows = 0;
      for (var ri = 0; ri < keypadEl.children.length; ri++) {
        rows += keypadEl.children[ri].classList.contains('cc-keyrow-cluster') ? 2 : 1;
      }
      if (!rows) rows = 9;
      var inModal = !!(container.classList && container.classList.contains('cc-modal-box'));
      var landscape = window.innerWidth > window.innerHeight;
      app.classList.toggle('landscape', landscape);

      // Width budget: measure a container WE aren't the one sizing, so
      // there's no circularity. In the modal, .cc-app centers over the
      // whole viewport (minus the overlay's own edge padding); on the
      // standalone page, the true limit is the page's own content
      // column (.wrap), i.e. this mount point's parent — not .cc-app or
      // .cc-modal-box, both of which this function sets below.
      var widthBudget = inModal
        ? window.innerWidth - 32
        : (container.parentElement ? container.parentElement.getBoundingClientRect().width : container.getBoundingClientRect().width) || window.innerWidth;

      // Height budget: how much of the viewport the calculator itself
      // may use. The modal already caps its own box to 94vh; standalone
      // has no such cap (the page can scroll to it), so this is a
      // practical "fits in one screenful once you're looking at it"
      // target rather than a hard page-level constraint.
      var viewportBudget = inModal ? window.innerHeight * 0.92 : window.innerHeight * 0.94;
      // appPad is .cc-app's own 10px-a-side padding (calculator.css'
      // .skin-ti84/.skin-casio) — added so the case color shows as a
      // real bezel around the topbar/body instead of just a 1px border.
      var bodyPad = 20 /* .cc-body padding */, appPad = 12 /* .cc-app padding, 6px a side */, appBorder = 2, margin = 16 /* breathing room */;

      // Multiple passes, not one: .cc-topbar's own height depends both
      // on how many lines its tabs wrap onto (which depends on .cc-app's
      // width) AND on --cc-key itself (the tabs/angle/skin buttons scale
      // with it too, in calculator.css) — both of which this function
      // computes. Measuring once against whatever the calculator
      // happened to have already (the pre-JS CSS fallback, or a stale
      // size from before an orientation change) can read a wrapped,
      // inflated topbar height, under-budget the keypad, and never
      // revisit it. Applying each pass's result before the next
      // re-measures lets the topbar settle at the size that's actually
      // about to ship, same as a layout reflow settling in a couple of
      // frames rather than one.
      var size = 56;
      for (var pass = 0; pass < 3; pass++) {
        var topbarH = topbar.getBoundingClientRect().height;
        var totalW, screenW;

        if (landscape) {
          // The screen sits beside the keypad now, not above it, so
          // the keypad's height budget is just the topbar + chrome —
          // not topbar + screen + chrome — a lot more room than
          // portrait gets for the exact same viewport height.
          var availableHeightL = viewportBudget - topbarH - bodyPad - appPad - appBorder - margin;
          var byHeightL = (availableHeightL - gap * (rows - 1)) / rows;
          // The screen column: enough to comfortably read/type a
          // formula (this is what the Graph tab's Y1-Y6 inputs live in
          // too) — roughly a third of the available width, bounded so
          // it's never cramped nor so wide it starves the keypad.
          var innerWidthL = widthBudget - bodyPad - appPad;
          screenW = Math.max(200, Math.min(360, innerWidthL * 0.36));
          var byWidthL = (innerWidthL - screenW - gap - gap * (cols - 1)) / cols;
          // Floor dropped from 30 to 20: the keypad grew from 8 to 10
          // row-units once the D-pad/soft-key rows joined it (#197), so
          // the same extreme landscape-phone case (~375px tall) needs to
          // shrink further than before to still fit with no scrolling —
          // still fully usable at 20px, just cozier than everywhere else.
          size = Math.max(20, Math.min(96, Math.floor(Math.min(byWidthL, byHeightL))));

          totalW = size * cols + gap * (cols - 1);
          screenEl.style.width = screenW + 'px';
        } else {
          var historyH = historyEl ? historyEl.getBoundingClientRect().height : 54;
          // entryLcdEl is the one shared LCD panel holding BOTH the
          // natural-math preview line and the actual entry line now (see
          // buildCalcScreen()) — measuring it as a whole covers both
          // without needing to track their heights separately.
          var entryH = entryLcdEl ? entryLcdEl.getBoundingClientRect().height : 70;
          var calcGaps = 8 * 2; // .cc-calc's own gap:8px, between its 2 children (.cc-screen, .cc-keypad)
          var chromeH = topbarH + historyH + entryH + calcGaps + bodyPad + appPad + appBorder + margin;
          var availableHeightP = viewportBudget - chromeH;

          var byWidthP = (widthBudget - bodyPad - appPad - gap * (cols - 1)) / cols;
          var byHeightP = (availableHeightP - gap * (rows - 1)) / rows;
          // Smaller footprint, big legible text (face font is a
          // fraction of this in calculator.css) — a compact key with
          // large type, not a big key with small print. byHeight always
          // wins when it's the smaller of the two: fitting the viewport
          // height (no scrolling to reach a key) is the hard
          // requirement here, ahead of a wider keypad.
          size = Math.max(26, Math.min(72, Math.floor(Math.min(byWidthP, byHeightP))));

          totalW = size * cols + gap * (cols - 1);
          screenEl.style.width = ''; // clear any landscape-set width
        }

        keypadEl.style.width = totalW + 'px';
        app.style.setProperty('--cc-key', size + 'px');
        // .cc-app's width also governs the Graph/Matrix/Solver screens
        // (they share the same frame): screen column + gap + keypad in
        // landscape, just the keypad in portrait.
        var totalAppW = (landscape ? screenW + gap + totalW : totalW) + bodyPad + appPad + appBorder;
        app.style.maxWidth = totalAppW + 'px';
        if (inModal) container.style.maxWidth = totalAppW + 'px'; // keeps the modal box hugging .cc-app too — no dead space around it either
      }
    }

    // Graph/Matrix/Solver have no keypad, so fitKeypad() above never ran
    // for them — .cc-app just grew to fit their content instead (a tall
    // Y1-Y6 editor + graph canvas, a wide matrix grid, …). Inside the
    // modal that's caught by .cc-modal-box's own 94vh safety-net scroll,
    // but on the standalone page (no modal wrapping it) nothing bounds
    // .cc-app's height at all, so the whole PAGE scrolled to reach the
    // rest of the calculator — exactly what fitKeypad() exists to
    // prevent on the Calc screen, just never extended to these three.
    // Same viewport-budget idea, just capping .cc-app's height directly
    // (there's no keypad to sum row-heights from here); .cc-body's own
    // overflow:auto (calculator.css) then turns any real overflow into
    // a small scrollbar *inside* the calculator instead of the page.
    function fitNonCalcScreen() {
      if (!app || !app.isConnected || state.screen === 'calc') return;
      var inModal = !!(container.classList && container.classList.contains('cc-modal-box'));
      app.classList.toggle('landscape', window.innerWidth > window.innerHeight);
      app.style.maxHeight = (inModal ? window.innerHeight * 0.92 : window.innerHeight * 0.94) + 'px';
    }

    // A result string is usually a plain number, but the Casio skin's
    // S⇔D key (toggleFraction() below) can turn it into "3/4" or "1 3/4"
    // — render that the same stacked-fraction way as everywhere else
    // instead of leaving it as a linear "1 3/4" once it's a fraction.
    var RESULT_FRAC_RE = /^(-?\d+)?\s*(\d+)\/(\d+)$/;
    function renderResult(str) {
      var m = RESULT_FRAC_RE.exec(String(str).trim());
      if (!m) return mText(str);
      var kids = [];
      if (m[1]) kids.push(mText(m[1] + ' '));
      kids.push(mSpan('cc-mfrac', [mSpan('cc-mnum', [m[2]]), mSpan('cc-mden', [m[3]])]));
      return mSpan(null, kids);
    }
    function renderHistory() {
      if (!historyEl) return;
      historyEl.innerHTML = '';
      state.history.slice(-30).forEach(function (h) {
        var row = el('div', 'cc-hist-row');
        var exprEl = el('div', 'cc-hist-expr');
        exprEl.appendChild(mathPreviewFrag(h.expr));
        row.appendChild(exprEl);
        var resEl = el('div', 'cc-hist-res');
        resEl.appendChild(mText('= '));
        resEl.appendChild(renderResult(h.result));
        row.appendChild(resEl);
        historyEl.appendChild(row);
      });
      historyEl.scrollTop = historyEl.scrollHeight;
    }

    function insertAtCursor(text) {
      if (!exprInput) return;
      var start = exprInput.selectionStart == null ? exprInput.value.length : exprInput.selectionStart;
      var end = exprInput.selectionEnd == null ? exprInput.value.length : exprInput.selectionEnd;
      var v = exprInput.value;
      exprInput.value = v.slice(0, start) + text + v.slice(end);
      var caret = start + text.length;
      exprInput.focus();
      exprInput.setSelectionRange(caret, caret);
      updatePreview();
    }
    function backspace() {
      if (!exprInput) return;
      var start = exprInput.selectionStart, end = exprInput.selectionEnd, v = exprInput.value;
      if (start === end && start > 0) { exprInput.value = v.slice(0, start - 1) + v.slice(end); start--; }
      else exprInput.value = v.slice(0, start) + v.slice(end);
      exprInput.focus();
      exprInput.setSelectionRange(start, start);
      updatePreview();
    }
    function clearAll() { if (exprInput) { exprInput.value = ''; exprInput.focus(); updatePreview(); } historyBrowseAt = null; }
    
    function runCalc() {
      if (!exprInput || !exprInput.value.trim()) return;
      var exprStr = exprInput.value;
      var storeTarget = null;

      // Named-variable storage (STO->): "expr → var" stores the result
      // into state.vars[var] instead of (only) Ans.
      if (exprStr.indexOf('→') !== -1) {
          var parts = exprStr.split('→');
          exprStr = parts[0];
          storeTarget = parts[1].trim().toLowerCase();
      }

      var result = evaluate(exprStr, { angle: state.angle, vars: state.vars });
      var display = fmtNum(result);
      
      state.history.push({ expr: exprInput.value, result: display });
      
      if (!isNaN(result)) {
          state.vars.ans = result;
          if (storeTarget && /^[a-z]$/.test(storeTarget)) {
              state.vars[storeTarget] = result;
          } else if (storeTarget === 'm') {
              state.vars.m = result;
          }
      }
      
      exprInput.value = '';
      renderHistory();
      exprInput.focus();
      updatePreview();
      historyBrowseAt = null;
    }

    function keyBtn(label, handler, cls) {
      // A 4+ character label ("CLEAR", "ENTER", "STO▸M", "log(", "×10ˣ")
      // gets a smaller face font (see .cc-keyrow .cc-key.cc-key-sm in
      // calculator.css) so it still fits on one line at a keypad square's
      // width — harmless on the non-keypad buttons that also go through
      // keyBtn() (Zoom/matrix-ops/eqn-solver), since that rule only
      // fires inside .cc-keyrow. A few labels (x², x⁻¹, xʸ, ×10ˣ) now
      // carry real <sup> markup for a properly positioned exponent
      // instead of a Unicode superscript glyph — strip tags before
      // measuring so that markup doesn't inflate the "how many
      // characters" count and shrink the face font unnecessarily.
      var plainLen = String(label).replace(/<[^>]*>/g, '').length;
      var longLabel = plainLen >= 4 ? ' cc-key-sm' : '';
      var b = el('button', 'cc-key' + longLabel + (cls ? ' ' + cls : ''), label);
      b.type = 'button';
      b.onclick = function () {
        // Snapshot BEFORE running the handler: a handler itself may arm
        // a modifier as part of what it does (2ND+STO▸'s RCL, and STO▸'s
        // own primary press, both alpha-lock for the variable-letter key
        // that has to follow — see modKey() mods.shiftFn/primaryFn below)
        // and that newly-armed state must survive this same click, not
        // be wiped by the one-shot cleanup below in the same tick.
        var wasShift = state.shift, wasAlpha = state.alpha;
        handler();
        // Every key except the 2ND/SHIFT and ALPHA toggles themselves
        // disarms a pending shift/alpha the moment it's pressed — same
        // as a real calculator: 2ND then any key (mapped or not) always
        // consumes/cancels the pending modifier, it doesn't stay armed.
        // Only clears whichever modifier was ALREADY armed walking in —
        // not one the handler just armed on its own (see above).
        if (b !== shiftBtn && b !== alphaBtn) {
          if (wasShift) { state.shift = false; if (shiftBtn) shiftBtn.classList.remove('active'); }
          if (wasAlpha) { state.alpha = false; if (alphaBtn) alphaBtn.classList.remove('active'); }
        }
      };
      return b;
    }
    // modKey() is the single mechanism behind every key that can do more
    // than one thing: `mods.shiftFn`/`mods.alphaFn` run instead of
    // `primaryFn` while 2ND/SHIFT or ALPHA is armed (checked at the
    // moment of the click — keyBtn()'s own onclick above disarms it
    // right after, so this only ever sees "armed" for the ONE key press
    // that follows pressing the modifier). `mods.shiftLabel`/
    // `mods.alphaLabel` render as small corner legends on the key face,
    // the same convention a real device prints its shifted functions in.
    function modKey(label, primaryFn, mods, cls) {
      mods = mods || {};
      // `shiftText`/`alphaText` (just "insert this other text") is the
      // common case even for keys that also need a custom primaryFn (STO▸
      // inserts → AND alpha-locks; MATH/APPS/PRGM's ALPHA legend just
      // types a letter) — build the matching shiftFn/alphaFn from it
      // automatically instead of making every call site do it, unless
      // one was already given explicitly (STO▸'s shift IS a custom
      // function — arming RCL's alpha-lock — not plain text insertion).
      var shiftFn = mods.shiftFn || (mods.shiftText != null ? function () { insertAtCursor(mods.shiftText); } : null);
      var alphaFn = mods.alphaFn || (mods.alphaText != null ? function () { insertAtCursor(mods.alphaText); } : null);
      var b = keyBtn(label, function () {
        if (state.shift && shiftFn) shiftFn();
        else if (state.alpha && alphaFn) alphaFn();
        else primaryFn();
      }, cls);
      if (mods.shiftLabel) b.appendChild(el('span', 'cc-key-shiftlabel', mods.shiftLabel));
      if (mods.alphaLabel) b.appendChild(el('span', 'cc-key-alphalabel', mods.alphaLabel));
      return b;
    }
    function insKey(label, text, cls) { return modKey(label, function () { insertAtCursor(text); }, null, cls); }
    // Sugar for the common case: a key whose shift/alpha function is
    // also just "insert this other text" (sin -> sin⁻¹, ( -> the
    // variable y, …) rather than a whole different action like STO▸M's
    // shift (RCL, i.e. recallMemory()).
    function insKeyMod(label, text, mods, cls) {
      mods = mods || {};
      var m = { shiftLabel: mods.shiftLabel, alphaLabel: mods.alphaLabel };
      if (mods.shiftText != null) m.shiftFn = function () { insertAtCursor(mods.shiftText); };
      if (mods.alphaText != null) m.alphaFn = function () { insertAtCursor(mods.alphaText); };
      return modKey(label, function () { insertAtCursor(text); }, m, cls);
    }

    // Lays out one keyrow per array of keyBtn()/insKey() buttons. Columns
    // default to however many keys are in THAT row — a real keypad isn't
    // one uniform grid: the real TI-84/fx-991EX both mix narrower 3-key
    // rows (2ND/MODE/DEL), standard 5-key rows, and a wider 6-key row
    // (fx-991EX's a-b/c…10ˣ row) at DIFFERENT widths but the SAME row
    // height (.cc-key's height, not an aspect-ratio square anymore — see
    // calculator.css) so the whole keypad still reads as one grid instead
    // of rows visibly drifting out of alignment height-wise. A button
    // tagged 'wide' (the "0" key — the standard wide-zero convention
    // every phone/OS calculator uses) gets a 2fr column instead of 1fr.
    function appendKeyRows(kp, rows) {
      rows.forEach(function (r) {
        var row = el('div', 'cc-keyrow');
        var hasWide = r.some(function (b) { return b.classList.contains('wide'); });
        if (hasWide) {
          row.style.gridTemplateColumns = r.map(function (b) { return b.classList.contains('wide') ? 'minmax(0, 2fr)' : 'minmax(0, 1fr)'; }).join(' ');
          // The "0" key's row splits into (r.length + 1) fr-units (2 for
          // "0" + 1 each for the rest) instead of r.length, so its OTHER
          // keys get a narrower column than every other row — keyBtn()'s
          // length-only threshold doesn't know that, so a short-but-not-
          // tiny label ("Ans") that fits fine elsewhere can still
          // overflow here.
          r.forEach(function (b) { if (!b.classList.contains('wide')) b.classList.add('cc-key-sm'); });
        } else {
          row.style.gridTemplateColumns = 'repeat(' + r.length + ', minmax(0, 1fr))';
          // A row with MORE than the standard 5 columns (Casio's
          // a-b/c…ln row, its (-)/°'"/x⁻¹/sin/cos/tan row, and its
          // STO/ENG/(/)/S⇔D/M+ row all pack 6 keys into one row) gives
          // every key a narrower column than keyBtn()'s label-length
          // threshold assumes — a short label that fits fine at the
          // standard 5-column width ("sin", "STO", "ENG") still wraps
          // mid-word here, so shrink every key in the row the same way
          // the wide-"0" row above already does for its own narrower
          // neighbors.
          if (r.length > 5) r.forEach(function (b) { b.classList.add('cc-key-sm'); });
        }
        r.forEach(function (b) { row.appendChild(b); });
        kp.appendChild(row);
      });
    }
    // A row that isn't a plain array of keys — the 2ND/MODE/DEL (TI) or
    // SHIFT/ALPHA/…/MENU/ON (Casio) rows, where a circular D-pad sits
    // beside 2-3 narrower keys (Casio has a second such column on the
    // D-pad's OTHER side too — SHIFT/ALPHA left, MENU/ON right) and
    // spans down into the row below it, exactly like the real device.
    // `leftStacked`/`rightStacked` are each [[row1 keys], [row2 keys]]
    // (2 short rows sharing the D-pad's height); `rightStacked` is
    // omitted on TI, which only has keys on the D-pad's left. `dpad` is
    // buildDpad()'s element. Returns one element appendKeyRows()-style
    // rows.forEach() can't produce, so callers append it directly.
    function buildDpadCluster(leftStacked, dpad, rightStacked) {
      function col(stacked) {
        var c = el('div', 'cc-cluster-keys');
        stacked.forEach(function (r) {
          var row = el('div', 'cc-keyrow');
          row.style.gridTemplateColumns = 'repeat(' + r.length + ', minmax(0, 1fr))';
          r.forEach(function (b) { row.appendChild(b); });
          c.appendChild(row);
        });
        return c;
      }
      var wrap = el('div', 'cc-keyrow-cluster');
      wrap.appendChild(col(leftStacked));
      wrap.appendChild(dpad);
      if (rightStacked) wrap.appendChild(col(rightStacked));
      return wrap;
    }

    var historyBrowseAt = null;
    // Set (then consumed/cleared) by TI's 2ND+VARS shift below, right
    // before switching to the Stats tab — tells buildStatsScreen() which
    // of its own local mode buttons ('1var'/'2var'/'distr') to open on,
    // same as a real device's DISTR shift dropping you straight into a
    // distributions menu rather than the plain STAT screen.
    var statsInitialMode = null;
    function moveCaret(dir) {
      if (state.screen === 'graph' && state.traceMode) {
          if (state.traceX == null) state.traceX = (state.win.xmin + state.win.xmax) / 2;
          var step = (state.win.xmax - state.win.xmin) / 100;
          state.traceX += dir * step;
          drawGraph();
          return;
      }
      if (!exprInput) return;
      var pos = exprInput.selectionStart == null ? exprInput.value.length : exprInput.selectionStart;
      pos = Math.max(0, Math.min(exprInput.value.length, pos + dir));
      exprInput.focus();
      exprInput.setSelectionRange(pos, pos);
    }
    
    function historyStep(dir) {
      if (!exprInput || !state.history.length) return;
      if (historyBrowseAt === null) historyBrowseAt = state.history.length;
      historyBrowseAt = Math.max(0, Math.min(state.history.length - 1, historyBrowseAt + dir));
      exprInput.value = state.history[historyBrowseAt].expr;
      exprInput.focus();
      updatePreview();
    }
    
    function buildDpad() {
      var dpad = el('div', 'cc-dpad');
      [['▲', 'up', function () { historyStep(-1); }], ['◄', 'left', function () { moveCaret(-1); }],
        ['►', 'right', function () { moveCaret(1); }], ['▼', 'down', function () { historyStep(1); }]].forEach(function (a) {
        var b = keyBtn(a[0], a[2], 'cc-dp cc-dp-' + a[1]);
        dpad.appendChild(b);
      });
      // Removing center button entirely (real TI-84 and Casio fx-991EX don't have interactive centers here)
      var hub = el('div', 'cc-dp cc-dp-center');
      dpad.appendChild(hub);
      return dpad;
    }

    function decoKey(label, cls) { return keyBtn(label, function () {}, cls); }
    function noop() {}

    function switchToTrace() { 
        state.screen = 'graph'; 
        state.traceMode = true; 
        state.traceX = (state.win.xmin + state.win.xmax) / 2;
        render(); 
    }
    function switchToGraph() { state.screen = 'graph'; state.traceMode = false; render(); }

    function openMathMenu() {
        var overlay = el('div', 'cc-overlay-menu');
        var menu = el('div', 'cc-popup-menu');
        menu.appendChild(el('div', 'cc-popup-title', 'MATH / PRB'));
        
        // nCr/nPr/!/rand/randInt genuinely live under the real TI-84's
        // MATH -> PRB submenu; ∛/ⁿ√ live under the MATH tab itself
        // (items 4/5 on a real device) — this app has one unified MATH
        // menu rather than PRB as a separate tab, so both live here.
        var options = [['nCr', 'ncr('], ['nPr', 'npr('], ['!', '!'], ['rand', 'rand'], ['randInt', 'randint('], ['∛', 'cbrt('], ['ⁿ√', 'nthroot(']];
        options.forEach(function(opt) {
            var btn = el('button', 'cc-popup-btn', opt[0]);
            btn.onclick = function() {
                insertAtCursor(opt[1]);
                overlay.remove();
            };
            menu.appendChild(btn);
        });
        
        var closeBtn = el('button', 'cc-popup-close', 'Cancel');
        closeBtn.onclick = function() { overlay.remove(); };
        menu.appendChild(closeBtn);
        
        overlay.appendChild(menu);
        app.appendChild(overlay);
    }

    function runCalcPrompt() {
        var exprStr = exprInput.value;
        if (!exprStr.trim()) return;
        
        var tokens = tokenize(exprStr);
        var neededVars = [];
        var builtins = ['sin','cos','tan','asin','acos','atan','sinh','cosh','tanh','ln','log','logb','sqrt','cbrt','nthroot','exp','abs','ncr','npr','fact','randint','rand','pi','e','ans'];
        
        tokens.forEach(function(t) {
            if (t.type === 'ident') {
                var v = t.value.toLowerCase();
                if (builtins.indexOf(v) === -1 && neededVars.indexOf(v) === -1) neededVars.push(v);
            }
        });
        
        if (neededVars.length === 0) {
            runCalc();
            return;
        }
        
        var overlay = el('div', 'cc-overlay-menu');
        var menu = el('div', 'cc-popup-menu');
        menu.appendChild(el('div', 'cc-popup-title', 'Enter Values'));
        
        var inputs = {};
        neededVars.forEach(function(v) {
            var row = el('div', 'cc-popup-row');
            row.appendChild(el('span', 'cc-popup-label', v.toUpperCase() + ' = '));
            var inp = document.createElement('input');
            inp.type = 'number';
            inp.className = 'cc-popup-input';
            inp.value = state.vars[v] || 0;
            inputs[v] = inp;
            row.appendChild(inp);
            menu.appendChild(row);
        });
        
        var rowBtns = el('div', 'cc-popup-row');
        var cancelBtn = el('button', 'cc-popup-close', 'Cancel');
        cancelBtn.onclick = function() { overlay.remove(); };
        var solveBtn = el('button', 'cc-popup-btn active', 'CALC');
        solveBtn.onclick = function() {
            neededVars.forEach(function(v) {
                state.vars[v] = parseFloat(inputs[v].value) || 0;
            });
            overlay.remove();
            runCalc();
        };
        rowBtns.appendChild(cancelBtn);
        rowBtns.appendChild(solveBtn);
        menu.appendChild(rowBtns);
        
        overlay.appendChild(menu);
        app.appendChild(overlay);
    }

    // The 2ND/SHIFT and ALPHA toggle keys
    function buildModKeys(shiftLabel) {
      shiftBtn = keyBtn(shiftLabel, function () {
        state.shift = !state.shift;
        state.alpha = false;
        shiftBtn.classList.toggle('active', state.shift);
        alphaBtn.classList.remove('active');
      }, 'mod mod-shift');
      alphaBtn = keyBtn('ALPHA', function () {
        state.alpha = !state.alpha;
        state.shift = false;
        alphaBtn.classList.toggle('active', state.alpha);
        shiftBtn.classList.remove('active');
      }, 'mod mod-alpha');
      state.shift = false;
      state.alpha = false;
    }

    function buildTIKeypad() {
      var kp = el('div', 'cc-keypad cc-keypad-ti');
      buildModKeys('2ND');
      appendKeyRows(kp, [
        [keyBtn('Y=', switchToGraph, 'fn'), keyBtn('WINDOW', switchToGraph, 'fn'), keyBtn('ZOOM', switchToGraph, 'fn'), keyBtn('TRACE', switchToTrace, 'fn'), keyBtn('GRAPH', switchToGraph, 'fn')]
      ]);
      kp.appendChild(buildDpadCluster(
        [[shiftBtn, keyBtn('MODE', cycleAngle, 'fn'), keyBtn('DEL', backspace, 'op')],
          [alphaBtn, insKey('X,T,θ,n', 'x', 'fn'), decoKey('STAT', 'fn')]],
        buildDpad()
      ));
      
      // TI Keys with full accurate ALPHA mapping
      appendKeyRows(kp, [
        [modKey('MATH', openMathMenu, { shiftLabel: 'TEST', shiftFn: noop, alphaLabel: 'A', alphaText: 'A' }, 'fn'),
          modKey('APPS', noop, { shiftLabel: 'ANGLE', shiftFn: noop, alphaLabel: 'B', alphaText: 'B' }, 'fn'),
          modKey('PRGM', noop, { shiftLabel: 'DRAW', shiftFn: noop, alphaLabel: 'C', alphaText: 'C' }, 'fn'),
          modKey('VARS', noop, { shiftLabel: 'DISTR', shiftFn: function () { statsInitialMode = 'distr'; state.screen = 'stat'; render(); } }, 'fn'),
          keyBtn('CLEAR', clearAll, 'op')],
          
        [insKeyMod('x<sup>-1</sup>', '^(-1)', { shiftLabel: 'MATRIX', shiftFn: function(){ state.screen = 'matrix'; render(); }, alphaLabel: 'D', alphaText: 'D' }, 'fn'),
          insKeyMod('sin', 'sin(', { shiftLabel: 'sin⁻¹', shiftText: 'asin(', alphaLabel: 'E', alphaText: 'E' }, 'fn'),
          insKeyMod('cos', 'cos(', { shiftLabel: 'cos⁻¹', shiftText: 'acos(', alphaLabel: 'F', alphaText: 'F' }, 'fn'),
          insKeyMod('tan', 'tan(', { shiftLabel: 'tan⁻¹', shiftText: 'atan(', alphaLabel: 'G', alphaText: 'G' }, 'fn'),
          insKeyMod('x<sup>y</sup>', '^', { shiftLabel: 'π', shiftText: 'pi', alphaLabel: 'H', alphaText: 'H' }, 'op')],
          
        [insKeyMod('x<sup>2</sup>', '^2', { shiftLabel: '√', shiftText: 'sqrt(', alphaLabel: 'I', alphaText: 'I' }, 'fn'),
          insKeyMod(',', ',', { shiftLabel: 'EE', shiftText: 'E', alphaLabel: 'J', alphaText: 'J' }, 'op'),
          insKeyMod('(', '(', { shiftLabel: '{', shiftText: '{', alphaLabel: 'K', alphaText: 'K' }, 'op'),
          insKeyMod(')', ')', { shiftLabel: '}', shiftText: '}', alphaLabel: 'L', alphaText: 'L' }, 'op'),
          insKeyMod('÷', '/', { shiftLabel: 'e', shiftText: 'e', alphaLabel: 'M', alphaText: 'M' }, 'op')],
          
        [insKeyMod('LOG', 'log(', { shiftLabel: '10ˣ', shiftText: '10^(', alphaLabel: 'N', alphaText: 'N' }, 'fn'),
          insKeyMod('7', '7', { shiftLabel: 'u', shiftText: 'u', alphaLabel: 'O', alphaText: 'O' }), 
          insKeyMod('8', '8', { shiftLabel: 'v', shiftText: 'v', alphaLabel: 'P', alphaText: 'P' }), 
          insKeyMod('9', '9', { shiftLabel: 'w', shiftText: 'w', alphaLabel: 'Q', alphaText: 'Q' }), 
          insKeyMod('×', '*', { shiftLabel: '[', shiftText: '[', alphaLabel: 'R', alphaText: 'R' }, 'op')],
          
        [insKeyMod('LN', 'ln(', { shiftLabel: 'eˣ', shiftText: 'exp(', alphaLabel: 'S', alphaText: 'S' }, 'fn'), 
          insKeyMod('4', '4', { shiftLabel: 'L4', shiftText: 'L4', alphaLabel: 'T', alphaText: 'T' }), 
          insKeyMod('5', '5', { shiftLabel: 'L5', shiftText: 'L5', alphaLabel: 'U', alphaText: 'U' }), 
          insKeyMod('6', '6', { shiftLabel: 'L6', shiftText: 'L6', alphaLabel: 'V', alphaText: 'V' }), 
          insKeyMod('−', '-', { shiftLabel: ']', shiftText: ']', alphaLabel: 'W', alphaText: 'W' }, 'op')],
          
        [modKey('STO▸', function () {
            // A real STO-> alpha-locks immediately so the very next key
            // types the variable letter (no separate ALPHA press needed)
            // — same one-shot mechanism as 2ND/ALPHA themselves.
            insertAtCursor('→'); state.alpha = true; alphaBtn.classList.add('active');
          }, { shiftLabel: 'RCL', shiftFn: function(){ state.alpha = true; alphaBtn.classList.add('active'); }, alphaLabel: 'X', alphaText: 'X' }, 'fn'),
          insKeyMod('1', '1', { shiftLabel: 'L1', shiftText: 'L1', alphaLabel: 'Y', alphaText: 'Y' }), 
          insKeyMod('2', '2', { shiftLabel: 'L2', shiftText: 'L2', alphaLabel: 'Z', alphaText: 'Z' }), 
          insKeyMod('3', '3', { shiftLabel: 'L3', shiftText: 'L3', alphaLabel: 'θ', alphaText: 'θ' }), 
          insKeyMod('+', '+', { shiftLabel: 'mem', shiftText: '', alphaLabel: '"', alphaText: '"' }, 'op')],
          
        [decoKey('ON', 'fn'),
          insKeyMod('0', '0', { shiftLabel: 'catalog', shiftText: '', alphaLabel: '␣', alphaText: ' ' }, 'wide'), 
          insKeyMod('.', '.', { shiftLabel: 'i', shiftText: 'i', alphaLabel: ':', alphaText: ':' }), 
          insKeyMod('(-)', '-', { shiftLabel: 'ans', shiftText: 'ans', alphaLabel: '?', alphaText: '?' }, 'op'), 
          keyBtn('ENTER', runCalc, 'op enter')]
      ]);
      return kp;
    }

    function buildCasioKeypad() {
      var kp = el('div', 'cc-keypad cc-keypad-casio');
      buildModKeys('SHIFT');
      kp.appendChild(buildDpadCluster(
        [[shiftBtn, alphaBtn], [decoKey('OPTN', 'fn'), keyBtn('CALC', runCalcPrompt, 'fn')]],
        buildDpad(),
        [[decoKey('MENU', 'fn'), decoKey('ON', 'fn')], [decoKey('d/dx', 'fn'), insKey('x', 'x', 'fn')]]
      ));
      
      // Casio keys with full accurate Shift/Alpha mapping
      appendKeyRows(kp, [
        [insKey('a b/c', '/', 'fn'), 
          insKeyMod('√▢', 'sqrt(', { shiftLabel: '∛', shiftText: 'cbrt(' }, 'fn'),
          insKey('x²', '^2', 'fn'), 
          insKeyMod('x^■', '^', { shiftLabel: 'x√', shiftText: 'nthroot(' }, 'fn'), 
          insKeyMod('log_■', 'logb(', { shiftLabel: '10ˣ', shiftText: '10^(' }, 'fn'), 
          insKeyMod('ln', 'ln(', { shiftLabel: 'eˣ', shiftText: 'exp(' }, 'fn')],
          
        [insKeyMod('(-)', '-', { alphaLabel: 'A', alphaText: 'A' }, 'fn'),
          insKeyMod('°\'"', '°\'"', { alphaLabel: 'B', alphaText: 'B' }, 'fn'),
          insKeyMod('x⁻¹', '^(-1)', { alphaLabel: 'C', alphaText: 'C' }, 'fn'),
          insKeyMod('sin', 'sin(', { shiftLabel: 'sin⁻¹', shiftText: 'asin(', alphaLabel: 'D', alphaText: 'D' }, 'fn'),
          insKeyMod('cos', 'cos(', { shiftLabel: 'cos⁻¹', shiftText: 'acos(', alphaLabel: 'E', alphaText: 'E' }, 'fn'),
          insKeyMod('tan', 'tan(', { shiftLabel: 'tan⁻¹', shiftText: 'atan(', alphaLabel: 'F', alphaText: 'F' }, 'fn')],
          
        [modKey('STO', function () {
            insertAtCursor('→'); state.alpha = true; alphaBtn.classList.add('active');
          }, { shiftLabel: 'RCL', shiftFn: function(){ state.alpha = true; alphaBtn.classList.add('active'); } }, 'fn'),
          decoKey('ENG', 'fn'),
          insKeyMod('(', '(', { alphaLabel: 'X', alphaText: 'X' }, 'op'), 
          insKeyMod(')', ')', { alphaLabel: 'Y', alphaText: 'Y' }, 'op'),
          modKey('S⇔D', toggleFraction, { alphaLabel: 'M', alphaText: 'M' }, 'fn'),
          modKey('M+', function () { state.vars.m += state.vars.ans; }, { shiftLabel: 'M-', shiftFn: function () { state.vars.m -= state.vars.ans; } }, 'fn')],
          
        [insKey('7', '7'), insKey('8', '8'), insKey('9', '9'), keyBtn('DEL', backspace, 'op clr'), keyBtn('AC', clearAll, 'op clr')],
        [insKey('4', '4'), insKey('5', '5'), insKey('6', '6'), insKeyMod('×', '*', { shiftLabel: 'nPr', shiftText: 'npr(' }, 'op'), insKeyMod('÷', '/', { shiftLabel: 'nCr', shiftText: 'ncr(' }, 'op')],
        [insKey('1', '1'), insKey('2', '2'), insKey('3', '3'), insKeyMod('+', '+', { shiftLabel: 'Pol', shiftText: '' }, 'op'), insKeyMod('−', '-', { shiftLabel: 'Rec', shiftText: '' }, 'op')],
        [insKey('0', '0', 'wide'), insKeyMod('.', '.', { shiftLabel: 'Ran#', shiftText: 'rand' }, 'op'), insKeyMod('×10ˣ', 'E', { shiftLabel: 'π', shiftText: 'pi', alphaLabel: 'e', alphaText: 'e' }, 'fn'), insKeyMod('Ans', 'Ans', { shiftLabel: '%', shiftText: '%' }, 'fn'), keyBtn('=', runCalc, 'op enter')]
      ]);
      return kp;
    }

    // A real fx-991's S⇔D key genuinely TOGGLES the last result back and
    // forth between fraction and decimal on repeat presses — this used to
    // only ever go decimal->fraction (pressing it again just recomputed
    // and reassigned the identical fraction text, so it looked "stuck").
    // `last.fracShown` remembers which form is currently displayed.
    function toggleFraction() {
      var last = state.history[state.history.length - 1];
      if (!last) return;
      if (last.fracShown) {
        last.result = fmtNum(state.vars.ans);
        last.fracShown = false;
      } else {
        var frac = toFraction(state.vars.ans);
        if (frac) {
          var txt = (frac.whole ? frac.whole + ' ' : '') + (frac.den > 1 ? frac.num + '/' + frac.den : (frac.whole ? '' : '0'));
          last.result = txt.trim() || '0';
          last.fracShown = true;
        }
      }
      renderHistory();
    }

    // ══════════ GRAPH SCREEN (TI skin only) ══════════
    var graphCanvas, graphCtx, traceLabel;
    function buildGraphScreen() {
      var wrap = el('div', 'cc-graph');
      var yEditor = el('div', 'cc-yeditor');
      state.graphs.forEach(function (g, i) {
        var row = el('div', 'cc-yrow');
        var swatch = el('span', 'cc-yswatch');
        swatch.style.background = COLORS[i % COLORS.length];
        var chk = document.createElement('input');
        chk.type = 'checkbox'; chk.checked = g.on;
        chk.setAttribute('aria-label', 'Show Y' + (i + 1));
        chk.onchange = function () { g.on = chk.checked; drawGraph(); };
        var label = el('span', 'cc-ylabel', 'Y' + (i + 1));
        var rel = document.createElement('select');
        rel.className = 'cc-yrel';
        [['=', '='], ['<', '<'], ['<=', '≤'], ['>', '>'], ['>=', '≥']].forEach(function (o) {
          var opt = document.createElement('option'); opt.value = o[0]; opt.textContent = o[1];
          if (o[0] === g.rel) opt.selected = true;
          rel.appendChild(opt);
        });
        rel.setAttribute('aria-label', 'Y' + (i + 1) + ' relation (= for a plain curve, or </≤/>/≥ to shade an inequality)');
        rel.onchange = function () { g.rel = rel.value; drawGraph(); };
        var input = document.createElement('input');
        input.type = 'text'; input.className = 'cc-yinput'; input.value = g.expr;
        input.placeholder = 'e.g. x^2 - 3';
        input.setAttribute('aria-label', 'Y' + (i + 1) + ' expression');
        input.oninput = function () { g.expr = input.value; drawGraph(); };
        row.appendChild(chk); row.appendChild(swatch); row.appendChild(label); row.appendChild(rel); row.appendChild(input);
        yEditor.appendChild(row);
      });
      wrap.appendChild(yEditor);
      
      var hintText = state.traceMode ? 'Trace mode: step the marked point along Y1.' : 'Set a row to <, ≤, >, or ≥ to shade an inequality.';
      wrap.appendChild(el('div', 'cc-graph-hint', hintText));

      // The Graph screen has no keypad/D-pad of its own (it's a separate
      // screen from Calc, same as a real device's dedicated graph
      // display) — so TRACE mode needs its own ◀/▶ step controls here
      // rather than relying on a D-pad that isn't on screen. Reuses the
      // exact same moveCaret(dir) the Calc screen's D-pad calls, which
      // already branches on state.traceMode.
      if (state.traceMode) {
        var traceRow = el('div', 'cc-winrow');
        traceRow.appendChild(keyBtn('◀ Trace', function () { moveCaret(-1); }, 'fn'));
        traceRow.appendChild(keyBtn('Trace ▶', function () { moveCaret(1); }, 'fn'));
        traceRow.appendChild(keyBtn('Exit Trace', function () { state.traceMode = false; render(); }, 'fn'));
        wrap.appendChild(traceRow);
      }

      var winRow = el('div', 'cc-winrow');
      [['xmin', 'Xmin'], ['xmax', 'Xmax'], ['ymin', 'Ymin'], ['ymax', 'Ymax']].forEach(function (f) {
        var lab = el('label', 'cc-winfield', f[1] + ' ');
        var input = document.createElement('input');
        input.type = 'number'; input.value = state.win[f[0]]; input.step = 'any';
        input.oninput = function () { var v = parseFloat(input.value); if (isFinite(v)) { state.win[f[0]] = v; drawGraph(); } };
        lab.appendChild(input);
        winRow.appendChild(lab);
      });
      var zoomStd = keyBtn('ZStandard', function () { state.win = { xmin: -10, xmax: 10, ymin: -10, ymax: 10 }; refreshWinInputs(); drawGraph(); }, 'fn');
      var zoomIn = keyBtn('Zoom In', function () { zoomGraph(0.6); }, 'fn');
      var zoomOut = keyBtn('Zoom Out', function () { zoomGraph(1.6); }, 'fn');
      winRow.appendChild(zoomIn); winRow.appendChild(zoomOut); winRow.appendChild(zoomStd);
      wrap.appendChild(winRow);

      function refreshWinInputs() {
        var inputs = winRow.querySelectorAll('input');
        var keys = ['xmin', 'xmax', 'ymin', 'ymax'];
        for (var i = 0; i < inputs.length; i++) inputs[i].value = state.win[keys[i]];
      }

      var canvasWrap = el('div', 'cc-canvaswrap');
      graphCanvas = document.createElement('canvas');
      graphCanvas.className = 'cc-graph-canvas';
      canvasWrap.appendChild(graphCanvas);
      traceLabel = el('div', 'cc-trace-label');
      traceLabel.hidden = true;
      canvasWrap.appendChild(traceLabel);
      wrap.appendChild(canvasWrap);
      body.appendChild(wrap);

      graphCtx = graphCanvas.getContext('2d');
      wireGraphInteraction();
      requestAnimationFrame(function () { fitNonCalcScreen(); sizeGraphCanvas(); drawGraph(); });
    }

    function zoomGraph(factor) {
      var cx = (state.win.xmin + state.win.xmax) / 2, cy = (state.win.ymin + state.win.ymax) / 2;
      var hw = (state.win.xmax - state.win.xmin) / 2 * factor, hh = (state.win.ymax - state.win.ymin) / 2 * factor;
      state.win = { xmin: cx - hw, xmax: cx + hw, ymin: cy - hh, ymax: cy + hh };
      var wrapEl = body.querySelector('.cc-winrow');
      if (wrapEl) { var inputs = wrapEl.querySelectorAll('input'); var keys = ['xmin', 'xmax', 'ymin', 'ymax']; for (var i = 0; i < inputs.length; i++) inputs[i].value = Math.round(state.win[keys[i]] * 100) / 100; }
      drawGraph();
    }

    function sizeGraphCanvas() {
      if (!graphCanvas) return;
      var dpr = window.devicePixelRatio || 1;
      var rect = graphCanvas.parentElement.getBoundingClientRect();
      var w = Math.max(220, rect.width), h = Math.max(200, Math.min(480, w * 0.85));
      graphCanvas.style.width = w + 'px';
      graphCanvas.style.height = h + 'px';
      graphCanvas.width = Math.round(w * dpr);
      graphCanvas.height = Math.round(h * dpr);
      graphCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawGraph() {
      if (!graphCanvas || !graphCtx) return;
      var w = graphCanvas.clientWidth, h = graphCanvas.clientHeight;
      var win = state.win;
      function X(x) { return (x - win.xmin) / (win.xmax - win.xmin) * w; }
      function Y(y) { return h - (y - win.ymin) / (win.ymax - win.ymin) * h; }
      graphCtx.clearRect(0, 0, w, h);
      graphCtx.fillStyle = getComputedStyle(app).getPropertyValue('--cc-screen-bg') || '#fff';
      graphCtx.fillRect(0, 0, w, h);

      // Gridlines + axes
      graphCtx.strokeStyle = 'rgba(120,130,150,.25)'; graphCtx.lineWidth = 1;
      var xStep = niceStep(win.xmax - win.xmin), yStep = niceStep(win.ymax - win.ymin);
      graphCtx.beginPath();
      for (var gx = Math.ceil(win.xmin / xStep) * xStep; gx <= win.xmax; gx += xStep) { graphCtx.moveTo(X(gx), 0); graphCtx.lineTo(X(gx), h); }
      for (var gy = Math.ceil(win.ymin / yStep) * yStep; gy <= win.ymax; gy += yStep) { graphCtx.moveTo(0, Y(gy)); graphCtx.lineTo(w, Y(gy)); }
      graphCtx.stroke();
      graphCtx.strokeStyle = 'rgba(90,100,120,.7)'; graphCtx.lineWidth = 1.4;
      graphCtx.beginPath(); graphCtx.moveTo(X(0), 0); graphCtx.lineTo(X(0), h); graphCtx.moveTo(0, Y(0)); graphCtx.lineTo(w, Y(0)); graphCtx.stroke();

      state.graphs.forEach(function (g, i) {
        if (!g.on || !g.expr.trim()) return;
        var color = COLORS[i % COLORS.length];
        var steps = Math.max(120, Math.round(w));

        if (g.rel && g.rel !== '=') {
          var above = g.rel === '>' || g.rel === '>=';
          var edgeY = above ? 0 : h;
          graphCtx.fillStyle = hexToRgba(color, 0.16);
          graphCtx.beginPath();
          graphCtx.moveTo(X(win.xmin), edgeY);
          for (var f = 0; f <= steps; f++) {
            var fx = win.xmin + (f / steps) * (win.xmax - win.xmin);
            var fy = evaluate(g.expr, { angle: state.angle, vars: Object.assign({x: fx}, state.vars) });
            var fpy = isFinite(fy) ? Math.max(0, Math.min(h, Y(fy))) : edgeY;
            graphCtx.lineTo(X(fx), fpy);
          }
          graphCtx.lineTo(X(win.xmax), edgeY);
          graphCtx.closePath();
          graphCtx.fill();
        }

        graphCtx.strokeStyle = color;
        graphCtx.lineWidth = 2.2;
        graphCtx.setLineDash(g.rel === '<' || g.rel === '>' ? [6, 4] : []);
        graphCtx.beginPath();
        var started = false, prevPxY = null;
        for (var s = 0; s <= steps; s++) {
          var xv = win.xmin + (s / steps) * (win.xmax - win.xmin);
          var yv = evaluate(g.expr, { angle: state.angle, vars: Object.assign({x: xv}, state.vars) });
          if (!isFinite(yv)) { started = false; prevPxY = null; continue; }
          var py = Y(yv);
          if (prevPxY != null && Math.abs(py - prevPxY) > h * 1.6) { started = false; } // asymptote guard
          if (!started) { graphCtx.moveTo(X(xv), py); started = true; } else { graphCtx.lineTo(X(xv), py); }
          prevPxY = py;
        }
        graphCtx.stroke();
        graphCtx.setLineDash([]);
      });

      // Handle Keypad Trace Mode rendering
      if (state.traceMode && state.traceX != null) {
          var firstGraph = state.graphs.filter(function(g) { return g.on && g.expr.trim(); })[0];
          if (firstGraph) {
              var trY = evaluate(firstGraph.expr, { angle: state.angle, vars: Object.assign({x: state.traceX}, state.vars) });
              if (isFinite(trY)) {
                  graphCtx.fillStyle = '#000';
                  graphCtx.beginPath();
                  graphCtx.arc(X(state.traceX), Y(trY), 4, 0, Math.PI * 2);
                  graphCtx.fill();
                  graphCtx.strokeStyle = 'rgba(0,0,0,0.5)';
                  graphCtx.lineWidth = 1;
                  graphCtx.beginPath();
                  graphCtx.moveTo(X(state.traceX), 0);
                  graphCtx.lineTo(X(state.traceX), h);
                  graphCtx.moveTo(0, Y(trY));
                  graphCtx.lineTo(w, Y(trY));
                  graphCtx.stroke();
                  
                  traceLabel.hidden = false;
                  traceLabel.textContent = 'x=' + fmtNum(state.traceX) + '  y=' + fmtNum(trY);
              }
          }
      }
    }
    function niceStep(range) {
      var raw = range / 10, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
      var norm = raw / mag;
      var step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
      return step * mag;
    }
    function wireGraphInteraction() {
      var dragging = false, lastX = 0, lastY = 0;
      graphCanvas.addEventListener('pointerdown', function (e) {
        dragging = true; lastX = e.clientX; lastY = e.clientY;
        try { graphCanvas.setPointerCapture(e.pointerId); } catch (err) {}
      });
      graphCanvas.addEventListener('pointermove', function (e) {
        if (dragging) {
          var w = graphCanvas.clientWidth, h = graphCanvas.clientHeight;
          var dx = (e.clientX - lastX) / w * (state.win.xmax - state.win.xmin);
          var dy = (e.clientY - lastY) / h * (state.win.ymax - state.win.ymin);
          state.win.xmin -= dx; state.win.xmax -= dx; state.win.ymin += dy; state.win.ymax += dy;
          lastX = e.clientX; lastY = e.clientY;
          drawGraph();
          return;
        }
        if (!state.traceMode) traceAt(e);
      });
      function stop() { dragging = false; }
      graphCanvas.addEventListener('pointerup', stop);
      graphCanvas.addEventListener('pointerleave', function () { stop(); if(!state.traceMode) traceLabel.hidden = true; });
      graphCanvas.addEventListener('wheel', function (e) {
        e.preventDefault();
        zoomGraph(e.deltaY > 0 ? 1.15 : 0.87);
      }, { passive: false });
      function traceAt(e) {
        var first = state.graphs.filter(function (g) { return g.on && g.expr.trim(); })[0];
        if (!first) { traceLabel.hidden = true; return; }
        var rect = graphCanvas.getBoundingClientRect();
        var w = graphCanvas.clientWidth;
        var xv = state.win.xmin + (e.clientX - rect.left) / w * (state.win.xmax - state.win.xmin);
        var yv = evaluate(first.expr, { angle: state.angle, vars: Object.assign({x: xv}, state.vars) });
        if (!isFinite(yv)) { traceLabel.hidden = true; return; }
        traceLabel.hidden = false;
        traceLabel.textContent = 'x=' + fmtNum(xv) + '  y=' + fmtNum(yv);
      }
    }

    // ══════════ MATRIX SCREEN ══════════
    function buildMatrixScreen() {
      var wrap = el('div', 'cc-matrix');
      var editors = el('div', 'cc-mat-editors');
      ['A', 'B', 'C'].forEach(function (name) { editors.appendChild(buildMatrixEditor(name)); });
      wrap.appendChild(editors);

      var opsRow = el('div', 'cc-mat-ops');
      var ops = [
        ['A+B', function () { return Mat.add(state.matrices.A, state.matrices.B); }],
        ['A−B', function () { return Mat.sub(state.matrices.A, state.matrices.B); }],
        ['A×B', function () { return Mat.mul(state.matrices.A, state.matrices.B); }],
        ['2×A', function () { return Mat.scale(state.matrices.A, 2); }],
        ['Aᵀ', function () { return Mat.transpose(state.matrices.A); }],
        ['A⁻¹', function () { return Mat.inverse(state.matrices.A); }],
        ['rref(A)', function () { return Mat.rref(state.matrices.A); }],
        ['det(A)', function () { return Mat.det(state.matrices.A); }]
      ];
      var resultBox = el('div', 'cc-mat-result');
      ops.forEach(function (o) {
        var b = keyBtn(o[0], function () {
          var out;
          try { out = o[1](); } catch (e) { out = null; }
          renderMatResult(resultBox, out);
        }, 'fn');
        opsRow.appendChild(b);
      });
      wrap.appendChild(opsRow);
      wrap.appendChild(resultBox);
      body.appendChild(wrap);
      requestAnimationFrame(fitNonCalcScreen);
    }
    function buildMatrixEditor(name) {
      var box = el('div', 'cc-mat-box');
      box.appendChild(el('div', 'cc-mat-title', 'Matrix ' + name));
      var dimRow = el('div', 'cc-mat-dims');
      var rowsInput = document.createElement('input'); rowsInput.type = 'number'; rowsInput.min = 1; rowsInput.max = 5; rowsInput.value = state.matrices[name].length;
      var colsInput = document.createElement('input'); colsInput.type = 'number'; colsInput.min = 1; colsInput.max = 5; colsInput.value = state.matrices[name][0].length;
      dimRow.appendChild(rowsInput); dimRow.appendChild(el('span', null, '×')); dimRow.appendChild(colsInput);
      box.appendChild(dimRow);
      var grid = el('div', 'cc-mat-grid');
      box.appendChild(grid);
      function renderGrid() {
        grid.innerHTML = '';
        var m = state.matrices[name];
        grid.style.gridTemplateColumns = 'repeat(' + m[0].length + ', 44px)';
        m.forEach(function (row, i) { row.forEach(function (v, j) {
          var input = document.createElement('input'); input.type = 'number'; input.value = v; input.step = 'any';
          input.oninput = function () { state.matrices[name][i][j] = parseFloat(input.value) || 0; };
          grid.appendChild(input);
        }); });
      }
      function resize() {
        var r = Math.max(1, Math.min(5, parseInt(rowsInput.value, 10) || 1));
        var c = Math.max(1, Math.min(5, parseInt(colsInput.value, 10) || 1));
        var next = Mat.zeros(r, c);
        for (var i = 0; i < Math.min(r, state.matrices[name].length); i++)
          for (var j = 0; j < Math.min(c, state.matrices[name][0].length); j++) next[i][j] = state.matrices[name][i][j];
        state.matrices[name] = next;
        renderGrid();
      }
      rowsInput.onchange = resize; colsInput.onchange = resize;
      renderGrid();
      return box;
    }
    function renderMatResult(box, out) {
      if (out == null) { box.textContent = 'Undefined (dimension mismatch or singular matrix)'; return; }
      if (typeof out === 'number') { box.textContent = fmtNum(out); return; }
      var table = el('table', 'cc-mat-result-table');
      out.forEach(function (row) {
        var tr = document.createElement('tr');
        row.forEach(function (v) { var td = document.createElement('td'); td.textContent = fmtNum(v); tr.appendChild(td); });
        table.appendChild(tr);
      });
      box.innerHTML = ''; box.appendChild(table);
    }

    // ══════════ EQUATION SOLVER SCREEN ══════════
    function buildEqnScreen() {
      var wrap = el('div', 'cc-eqn');
      var modeRow = el('div', 'cc-eqn-modes');
      var modes = [['lin2', 'Linear (2 var)'], ['lin3', 'Linear (3 var)'], ['poly2', 'Polynomial (deg 2)'], ['poly3', 'Polynomial (deg 3)'], ['poly4', 'Polynomial (deg 4)'], ['numeric', 'f(x)=0 solver']];
      var current = 'lin2';
      var panel = el('div', 'cc-eqn-panel');
      modes.forEach(function (m) {
        var b = keyBtn(m[1], function () { current = m[0]; renderPanel(); }, 'fn' + (m[0] === current ? ' on' : ''));
        modeRow.appendChild(b);
      });
      wrap.appendChild(modeRow); wrap.appendChild(panel);
      body.appendChild(wrap);
      renderPanel();
      requestAnimationFrame(fitNonCalcScreen);

      function setActive(name) {
        var btns = modeRow.querySelectorAll('button');
        for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].textContent === labelFor(name));
      }
      function labelFor(name) { for (var i = 0; i < modes.length; i++) if (modes[i][0] === name) return modes[i][1]; return ''; }

      function renderPanel() {
        panel.innerHTML = '';
        setActive(current);
        if (current === 'lin2' || current === 'lin3') renderLinear(current === 'lin3' ? 3 : 2);
        else if (current === 'numeric') renderNumeric();
        else renderPoly(current === 'poly2' ? 2 : current === 'poly3' ? 3 : 4);
      }

      function renderLinear(n) {
        var grid = el('div', 'cc-eqn-grid');
        var vars = ['x', 'y', 'z'];
        var coeffs = [];
        for (var i = 0; i < n; i++) {
          var row = el('div', 'cc-eqn-row');
          coeffs.push([]);
          for (var j = 0; j < n; j++) {
            var inp = document.createElement('input'); inp.type = 'number'; inp.step = 'any'; inp.value = j === 0 ? 1 : 0;
            coeffs[i].push(inp);
            row.appendChild(inp);
            row.appendChild(el('span', 'cc-eqn-var', vars[j]));
            if (j < n - 1) row.appendChild(el('span', null, '+'));
          }
          row.appendChild(el('span', null, '='));
          var rhs = document.createElement('input'); rhs.type = 'number'; rhs.step = 'any'; rhs.value = 0;
          coeffs[i].push(rhs);
          row.appendChild(rhs);
          grid.appendChild(row);
        }
        var out = el('div', 'cc-eqn-out');
        var go = keyBtn('Solve', function () {
          var matrix = coeffs.map(function (row) { return row.map(function (inp) { return parseFloat(inp.value) || 0; }); });
          var res = solveLinearSystem(matrix);
          if (res.error) { out.textContent = 'No unique solution (dependent or inconsistent system).'; return; }
          out.textContent = res.x.map(function (v, i) { return vars[i] + ' = ' + fmtNum(v); }).join('   ');
        }, 'fn enter');
        panel.appendChild(grid); panel.appendChild(go); panel.appendChild(out);
      }

      function renderPoly(deg) {
        var row = el('div', 'cc-eqn-row cc-eqn-poly');
        var vars = ['x' + degSup(deg), 'x' + degSup(deg - 1)];
        var inputs = [];
        for (var i = 0; i <= deg; i++) {
          var inp = document.createElement('input'); inp.type = 'number'; inp.step = 'any'; inp.value = i === 0 ? 1 : 0;
          inputs.push(inp);
          row.appendChild(inp);
          if (i < deg) row.appendChild(el('span', 'cc-eqn-var', 'x' + degSup(deg - i)));
        }
        row.appendChild(el('span', null, '= 0'));
        var out = el('div', 'cc-eqn-out');
        var go = keyBtn('Solve', function () {
          var coeffs = inputs.map(function (inp) { return parseFloat(inp.value) || 0; });
          var roots = polyRoots(coeffs);
          out.innerHTML = roots.map(function (z) {
            return 'x = ' + (z.im === 0 ? fmtNum(z.re) : fmtNum(z.re) + (z.im >= 0 ? ' + ' : ' − ') + fmtNum(Math.abs(z.im)) + 'i');
          }).join('<br>');
        }, 'fn enter');
        panel.appendChild(row); panel.appendChild(go); panel.appendChild(out);
      }
      function degSup(n) { return n === 1 ? '' : n === 2 ? '²' : n === 3 ? '³' : n === 4 ? '⁴' : '^' + n; }

      function renderNumeric() {
        var row = el('div', 'cc-eqn-row');
        row.appendChild(el('span', null, 'f(x) = '));
        var fInput = document.createElement('input'); fInput.type = 'text'; fInput.placeholder = 'e.g. x^3 - x - 2'; fInput.style.flex = '1';
        row.appendChild(fInput);
        var guessRow = el('div', 'cc-eqn-row');
        guessRow.appendChild(el('span', null, 'Initial guess x = '));
        var gInput = document.createElement('input'); gInput.type = 'number'; gInput.value = 1; gInput.step = 'any';
        guessRow.appendChild(gInput);
        var out = el('div', 'cc-eqn-out');
        var go = keyBtn('Solve', function () {
          var res = solveNumeric(fInput.value, parseFloat(gInput.value) || 0, state.angle);
          out.textContent = res.error ? 'No root found near that guess — try a different starting value.' : ('x ≈ ' + fmtNum(res.x));
        }, 'fn enter');
        panel.appendChild(row); panel.appendChild(guessRow); panel.appendChild(go); panel.appendChild(out);
      }
    }

    // ══════════ STATS SCREEN (1-Var/2-Var stats + probability distributions) ══════════
    // Distribution catalog for the picker below — id matches the callFn()
    // case (Part 1) exactly, so this panel and typing e.g. "normalpdf(0)"
    // directly on the Calc screen are the same function, just two ways to
    // reach it (mirrors MATH's popup being a friendlier front for
    // functions that are also directly typeable).
    var DISTR_DEFS = [
      { id: 'normalpdf', label: 'Normal Pdf', hint: 'height of the normal curve at x', params: [['x', 'x', ''], ['mu', 'μ (mean)', '0'], ['sigma', 'σ (st. dev.)', '1']],
        compute: function (v) { return normPdfStd((v.x - v.mu) / v.sigma) / v.sigma; } },
      { id: 'normalcdf', label: 'Normal Cdf', hint: 'P(lower ≤ X ≤ upper)', params: [['lower', 'lower bound', '-1e99'], ['upper', 'upper bound', ''], ['mu', 'μ (mean)', '0'], ['sigma', 'σ (st. dev.)', '1']],
        compute: function (v) { return normCdfStd((v.upper - v.mu) / v.sigma) - normCdfStd((v.lower - v.mu) / v.sigma); } },
      { id: 'invnorm', label: 'Inverse Normal', hint: 'the x with this much area to its left', params: [['area', 'area (0–1)', ''], ['mu', 'μ (mean)', '0'], ['sigma', 'σ (st. dev.)', '1']],
        compute: function (v) { return v.mu + v.sigma * invNormStd(v.area); } },
      { id: 'binompdf', label: 'Binomial Pdf', hint: 'P(X = x) for X ~ Binomial(n, p)', params: [['n', 'n (trials)', ''], ['p', 'p (success prob.)', ''], ['x', 'x (successes)', '']],
        compute: function (v) { return binomPdf(v.n, v.p, v.x); } },
      { id: 'binomcdf', label: 'Binomial Cdf', hint: 'P(X ≤ x) for X ~ Binomial(n, p)', params: [['n', 'n (trials)', ''], ['p', 'p (success prob.)', ''], ['x', 'x (successes)', '']],
        compute: function (v) { return binomCdf(v.n, v.p, v.x); } },
      { id: 'poissonpdf', label: 'Poisson Pdf', hint: 'P(X = x) for X ~ Poisson(λ)', params: [['lambda', 'λ (mean rate)', ''], ['x', 'x', '']],
        compute: function (v) { return poissonPdf(v.lambda, v.x); } },
      { id: 'poissoncdf', label: 'Poisson Cdf', hint: 'P(X ≤ x) for X ~ Poisson(λ)', params: [['lambda', 'λ (mean rate)', ''], ['x', 'x', '']],
        compute: function (v) { return poissonCdf(v.lambda, v.x); } }
    ];

    function buildStatsScreen() {
      var wrap = el('div', 'cc-stat');
      var modeRow = el('div', 'cc-eqn-modes');
      var modes = [['1var', '1-Var Stats'], ['2var', '2-Var / LinReg'], ['distr', 'Distributions']];
      var current = statsInitialMode || '1var';
      statsInitialMode = null;
      var panel = el('div', 'cc-eqn-panel');
      modes.forEach(function (m) {
        var b = keyBtn(m[1], function () { current = m[0]; renderPanel(); }, 'fn' + (m[0] === current ? ' on' : ''));
        modeRow.appendChild(b);
      });
      wrap.appendChild(modeRow); wrap.appendChild(panel);
      body.appendChild(wrap);
      renderPanel();
      requestAnimationFrame(fitNonCalcScreen);

      function setActive(name) {
        var btns = modeRow.querySelectorAll('button');
        for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].textContent === labelFor(name));
      }
      function labelFor(name) { for (var i = 0; i < modes.length; i++) if (modes[i][0] === name) return modes[i][1]; return ''; }

      function renderPanel() {
        panel.innerHTML = '';
        setActive(current);
        if (current === 'distr') renderDistr();
        else renderListStats(current === '2var');
      }

      // Shared L1/L2 list editor for both 1-Var and 2-Var Stats — the same
      // rows (state.stat.rows) back both modes so switching between them
      // doesn't lose what's been typed in; 2-Var just also shows the Y
      // column. Blank/non-numeric rows are silently skipped when
      // computing (lets the list have a few spare blank rows to grow
      // into, same as a real device's list editor never insisting every
      // cell be filled before you can compute).
      function renderListStats(showY) {
        var rows = state.stat.rows;
        var grid = el('div', 'cc-stat-grid');
        var head = el('div', 'cc-stat-row cc-stat-head');
        head.appendChild(el('span', 'cc-stat-cell', 'L1 (x)'));
        if (showY) head.appendChild(el('span', 'cc-stat-cell', 'L2 (y)'));
        head.appendChild(el('span', 'cc-stat-cell', ''));
        grid.appendChild(head);

        function renderRows() {
          var body2 = grid.querySelectorAll('.cc-stat-row:not(.cc-stat-head)');
          for (var k = 0; k < body2.length; k++) body2[k].remove();
          rows.forEach(function (r, i) {
            var row = el('div', 'cc-stat-row');
            var xInp = document.createElement('input'); xInp.type = 'text'; xInp.inputMode = 'decimal'; xInp.value = r.x;
            xInp.setAttribute('aria-label', 'L1 row ' + (i + 1));
            xInp.oninput = function () { r.x = xInp.value; };
            row.appendChild(xInp);
            if (showY) {
              var yInp = document.createElement('input'); yInp.type = 'text'; yInp.inputMode = 'decimal'; yInp.value = r.y;
              yInp.setAttribute('aria-label', 'L2 row ' + (i + 1));
              yInp.oninput = function () { r.y = yInp.value; };
              row.appendChild(yInp);
            }
            var rm = keyBtn('✕', function () {
              if (rows.length <= 1) return; // always leave at least one row
              rows.splice(rows.indexOf(r), 1);
              renderRows();
            }, 'op cc-stat-rm');
            row.appendChild(rm);
            grid.appendChild(row);
          });
        }
        renderRows();

        var addRow = keyBtn('+ Add row', function () { rows.push({ x: '', y: '' }); renderRows(); }, 'fn');
        var out = el('div', 'cc-eqn-out cc-stat-out');
        var go = keyBtn(showY ? 'Calculate 2-Var Stats' : 'Calculate 1-Var Stats', function () {
          var xs = [], ys = [];
          rows.forEach(function (r) {
            var xv = parseFloat(r.x), yv = parseFloat(r.y);
            if (showY) { if (isFinite(xv) && isFinite(yv)) { xs.push(xv); ys.push(yv); } }
            else if (isFinite(xv)) xs.push(xv);
          });
          if (showY) {
            var r2v = xs.length >= 2 ? stats2Var(xs, ys) : null;
            if (!r2v) { out.textContent = 'Enter at least 2 (x, y) pairs.'; return; }
            out.innerHTML = [
              'n = ' + r2v.n,
              'x̄ = ' + fmtNum(r2v.xbar) + '   ȳ = ' + fmtNum(r2v.ybar),
              'ŷ = ' + fmtNum(r2v.a) + ' + ' + fmtNum(r2v.b) + 'x   (linear regression)',
              'r = ' + fmtNum(r2v.r) + '   r² = ' + fmtNum(r2v.r2)
            ].join('<br>');
          } else {
            var r1v = xs.length ? stats1Var(xs) : null;
            if (!r1v) { out.textContent = 'Enter at least 1 value in L1.'; return; }
            out.innerHTML = [
              'n = ' + r1v.n + '   Σx = ' + fmtNum(r1v.sum) + '   Σx² = ' + fmtNum(r1v.sumSq),
              'x̄ (mean) = ' + fmtNum(r1v.mean),
              'Sx (sample st. dev.) = ' + (isNaN(r1v.sx) ? 'undefined (n=1)' : fmtNum(r1v.sx)),
              'σx (population st. dev.) = ' + fmtNum(r1v.sigmax),
              'minX = ' + fmtNum(r1v.min) + '   Q1 = ' + fmtNum(r1v.q1),
              'median = ' + fmtNum(r1v.median),
              'Q3 = ' + fmtNum(r1v.q3) + '   maxX = ' + fmtNum(r1v.max)
            ].join('<br>');
          }
        }, 'fn enter');

        panel.appendChild(grid); panel.appendChild(addRow); panel.appendChild(go); panel.appendChild(out);
      }

      function renderDistr() {
        var pickRow = el('div', 'cc-stat-distr-pick');
        var select = document.createElement('select');
        select.className = 'cc-stat-select';
        DISTR_DEFS.forEach(function (d) {
          var opt = document.createElement('option'); opt.value = d.id; opt.textContent = d.label;
          select.appendChild(opt);
        });
        pickRow.appendChild(select);
        var hint = el('div', 'cc-graph-hint');
        var paramsBox = el('div', 'cc-eqn-panel cc-stat-distr-params');
        var out = el('div', 'cc-eqn-out cc-stat-out');
        panel.appendChild(pickRow); panel.appendChild(hint); panel.appendChild(paramsBox); panel.appendChild(out);

        function renderParams() {
          var def = DISTR_DEFS.filter(function (d) { return d.id === select.value; })[0];
          hint.textContent = def.hint;
          paramsBox.innerHTML = '';
          out.textContent = '';
          var inputs = {};
          def.params.forEach(function (p) {
            var row = el('div', 'cc-eqn-row');
            row.appendChild(el('span', 'cc-eqn-var', p[1] + ' ='));
            var inp = document.createElement('input'); inp.type = 'text'; inp.inputMode = 'decimal'; inp.value = p[2];
            inputs[p[0]] = inp;
            row.appendChild(inp);
            paramsBox.appendChild(row);
          });
          var go = keyBtn('Calculate', function () {
            var v = {}, bad = false;
            def.params.forEach(function (p) {
              var n = parseFloat(inputs[p[0]].value);
              if (!isFinite(n)) bad = true;
              v[p[0]] = n;
            });
            if (bad) { out.textContent = 'Fill in every field with a number.'; return; }
            var result = def.compute(v);
            out.textContent = isFinite(result) ? fmtNum(result) : 'Undefined for those parameters.';
          }, 'fn enter');
          paramsBox.appendChild(go);
        }
        select.onchange = renderParams;
        renderParams();
      }
    }

    // ══════════ RENDER DISPATCH ══════════
    function render() {
      app.className = 'cc-app skin-' + state.skin;
      renderTabs();
      angleBtn.textContent = state.angle.toUpperCase();
      angleBtn.title = 'Angle mode (click to cycle DEG / RAD / GRAD)';
      var skinBtns = skinToggle.querySelectorAll('.cc-skin-btn');
      for (var i = 0; i < skinBtns.length; i++) skinBtns[i].classList.toggle('on', skinBtns[i].textContent.indexOf(state.skin === 'ti84' ? 'TI-84' : 'Casio') === 0);
      body.innerHTML = '';
      if (state.screen === 'calc') buildCalcScreen();
      else if (state.screen === 'graph' && state.skin === 'ti84') buildGraphScreen();
      else if (state.screen === 'matrix') buildMatrixScreen();
      else if (state.screen === 'eqn') buildEqnScreen();
      else if (state.screen === 'stat') buildStatsScreen();
      else { state.screen = 'calc'; buildCalcScreen(); }
    }
    render();

    // Re-fit on window resize/orientation-change — debounced so dragging
    // a browser window (or a live-resizing split view) doesn't thrash
    // layout on every intermediate pixel.
    var fitResizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(fitResizeTimer);
      fitResizeTimer = setTimeout(fitKeypad, 120);
    });

    return {
      resize: function () {
        if (state.screen === 'calc') { requestAnimationFrame(fitKeypad); return; }
        fitNonCalcScreen();
        if (state.screen === 'graph') { sizeGraphCanvas(); drawGraph(); }
      }
    };
  }

  /* ══════════════════════════════════════════════════════════════════════
     PART 6 — LAUNCHER + MODAL (the "inline widget" — a persistent instance
     built once on first open and reused, mirroring CSGamify's whiteboard
     _ensureToolbar()/toggle pattern in src/scripts/engine.js) + the
     standalone-page mount point.
     ══════════════════════════════════════════════════════════════════════ */
  var modalInstance = null, modalEl = null;

  function ensureModal() {
    if (modalEl) return;
    modalEl = el('div', 'cc-modal-overlay');
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Calculator');
    modalEl.addEventListener('click', function (e) { if (e.target === modalEl) closeModal(); });
    var box = el('div', 'cc-modal-box');
    modalEl.appendChild(box);
    document.body.appendChild(modalEl);
    modalInstance = buildApp(box, { onClose: closeModal });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalEl.classList.contains('show')) closeModal(); });
  }
  function openModal() {
    ensureModal();
    modalEl.classList.add('show');
    if (modalInstance) modalInstance.resize();
  }
  function closeModal() {
    if (modalEl) modalEl.classList.remove('show');
  }

  function ensureLauncher() {
    if (document.getElementById('ccLauncherBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'ccLauncherBtn';
    btn.type = 'button';
    btn.className = 'cc-launcher-btn';
    btn.title = 'Open calculator (TI-84 / Casio fx-991)';
    btn.setAttribute('aria-label', 'Open calculator');
    btn.textContent = '🖩';
    btn.onclick = openModal;
    document.body.appendChild(btn);
  }

  function init() {
    // Standalone page (src/calculator/index.njk) — mount a second,
    // independent instance directly, and skip the floating launcher there
    // (redundant with the page itself).
    var standaloneRoot = document.getElementById('calculator-standalone-root');
    if (standaloneRoot) buildApp(standaloneRoot, {});
    else ensureLauncher();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.ClipSATCalc = {
    mount: buildApp,
    openModal: openModal,
    closeModal: closeModal,
    // Exposed for future automated testing / other modules — not otherwise used internally.
    _engine: { evaluate: evaluate, toFraction: toFraction, Mat: Mat, solveLinearSystem: solveLinearSystem, polyRoots: polyRoots, solveNumeric: solveNumeric }
  };
})();