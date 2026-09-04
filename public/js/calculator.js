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
      .replace(/π/g, 'pi').replace(/√/g, 'sqrt');
    var toks = [], i = 0, n = s.length;
    while (i < n) {
      var c = s.charAt(i);
      if (c === ' ' || c === '\t') { i++; continue; }
      if (/[0-9.]/.test(c)) {
        var j = i;
        while (j < n && /[0-9.]/.test(s.charAt(j))) j++;
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
      case 'rand': return Math.random();
      case 'pi': return Math.PI;
      case 'e': return Math.E;
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
        if (nm === 'ans') return ctx.vars.ans || 0;
        if (ctx.vars.hasOwnProperty(nm)) return ctx.vars[nm];
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

  // Public entry point: evaluate(exprString, {angle:'deg'|'rad'|'grad', vars:{ans, x, ...}})
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
     PART 4 — SHARED HELPERS
     ══════════════════════════════════════════════════════════════════════ */
  function fmtNum(x) {
    if (x == null || isNaN(x)) return 'Error';
    if (!isFinite(x)) return x > 0 ? '∞' : '-∞';
    if (x === 0) return '0';
    var abs = Math.abs(x);
    if (abs !== 0 && (abs < 1e-6 || abs >= 1e10)) return x.toExponential(6).replace(/e\+?(-?)(\d+)/, 'e$1$2');
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
  var VAR_DISPLAY = { pi: 'π', ans: 'Ans', m: 'M' };

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
      ans: 0,
      mem: 0,
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
      eqnCoeffs: Mat.zeros(3, 4)
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
      var list = [['calc', '🧮 Calc'], ['matrix', '▦ Matrix'], ['eqn', '𝑓 Solver']];
      if (state.skin === 'ti84') list.splice(1, 0, ['graph', '📈 Graph']);
      return list;
    }

    function renderTabs() {
      tabs.innerHTML = '';
      tabList().forEach(function (t) {
        var b = el('button', 'cc-tab' + (t[0] === state.screen ? ' on' : ''), t[1]);
        b.type = 'button';
        b.onclick = function () { state.screen = t[0]; render(); };
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
      if (!keypadEl || state.screen !== 'calc' || !keypadEl.isConnected) return;
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
      var result = evaluate(exprStr, { angle: state.angle, vars: { ans: state.ans, m: state.mem } });
      var display = fmtNum(result);
      state.history.push({ expr: exprStr, result: display });
      if (!isNaN(result)) state.ans = result;
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
        handler();
        // Every key except the 2ND/SHIFT and ALPHA toggles themselves
        // disarms a pending shift/alpha the moment it's pressed — same
        // as a real calculator: 2ND then any key (mapped or not) always
        // consumes/cancels the pending modifier, it doesn't stay armed.
        if (b !== shiftBtn && b !== alphaBtn && (state.shift || state.alpha)) {
          state.shift = false;
          state.alpha = false;
          if (shiftBtn) shiftBtn.classList.remove('active');
          if (alphaBtn) alphaBtn.classList.remove('active');
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
      var b = keyBtn(label, function () {
        if (state.shift && mods.shiftFn) mods.shiftFn();
        else if (state.alpha && mods.alphaFn) mods.alphaFn();
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
    // The circular 4-way D-pad both real keypads have beside 2ND/SHIFT —
    // not decorative: left/right move the entry line's caret, up/down
    // step back/forward through history (the same "recall a previous
    // line" gesture a real calculator's arrow keys give you), matching
    // real function with real keys rather than a placeholder graphic.
    var historyBrowseAt = null;
    function moveCaret(dir) {
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
    function buildDpad(hasCenter) {
      var dpad = el('div', 'cc-dpad');
      [['▲', 'up', function () { historyStep(-1); }], ['◄', 'left', function () { moveCaret(-1); }],
        ['►', 'right', function () { moveCaret(1); }], ['▼', 'down', function () { historyStep(1); }]].forEach(function (a) {
        var b = keyBtn(a[0], a[2], 'cc-dp cc-dp-' + a[1]);
        dpad.appendChild(b);
      });
      // The fx-991EX's D-pad has a raised center OK button (re-runs the
      // current line, same as ENTER/=); the TI-84's doesn't — it's just
      // open space between the 4 arrows — so this stays a plain
      // (non-interactive) hub there.
      var hub = hasCenter ? keyBtn('', runCalc, 'cc-dp cc-dp-center') : el('div', 'cc-dp cc-dp-center');
      dpad.appendChild(hub);
      return dpad;
    }
    function decoKey(label, cls) { return keyBtn(label, function () {}, cls); } // a real, present key for a real menu (MATH, APPS, OPTN, …) this engine doesn't have — present rather than silently dropped, but honest that it does nothing

    function recallMemory() { insertAtCursor('M'); } // ctx.vars.m is wired up in runCalc() below
    function storeToMemory() { state.mem = state.ans; }
    // Y=/WINDOW/ZOOM/TRACE/GRAPH (TI's soft-key row, directly under the
    // screen) each open a different menu on the real device; this app's
    // Graph screen already holds the Y= editor, window fields, AND zoom
    // controls in one place, so all five converge on the same screen.
    function switchToGraph() { state.screen = 'graph'; render(); }

    // The 2ND/SHIFT and ALPHA toggle keys — same on both skins apart from
    // their label/color (calculator.css keys those off '.mod-shift'/
    // '.mod-alpha' + the skin class). Pressing one arms it and disarms
    // the other; keyBtn()'s own onclick disarms whichever is armed again
    // the moment any OTHER key is pressed (see modKey() above) — exactly
    // a real calculator's one-shot 2ND/ALPHA behavior.
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
    function noopKey() { return keyBtn('', function () {}, 'noop'); }

    // The real TI-84 Plus CE layout — soft-key row under the screen, the
    // 2ND/MODE/DEL + ALPHA/X,T,θ,n/STAT rows beside the D-pad, the MATH/
    // APPS/PRGM/VARS/CLEAR row, then the function+digit block — not a
    // condensed stand-in for it. 2ND arms a key's blue shift-function
    // (small legend at the top of the key face) for the next press,
    // exactly like the real device. Every function this engine actually
    // has is reachable somewhere below (nCr/nPr genuinely DO live under
    // MATH's PRB submenu on a real TI-84, so that's where their shifts
    // sit here too); the ones the real TI-84 reaches via menus we don't
    // have (ANGLE, DRAW, TEST, DISTR, LIST, real MEM) are present as
    // real, clickable, but honestly inert keys (decoKey()) rather than
    // silently dropped or wired to nothing.
    function buildTIKeypad() {
      var kp = el('div', 'cc-keypad cc-keypad-ti');
      buildModKeys('2ND');
      appendKeyRows(kp, [
        [keyBtn('Y=', switchToGraph, 'fn'), keyBtn('WINDOW', switchToGraph, 'fn'), keyBtn('ZOOM', switchToGraph, 'fn'), keyBtn('TRACE', switchToGraph, 'fn'), keyBtn('GRAPH', switchToGraph, 'fn')]
      ]);
      kp.appendChild(buildDpadCluster(
        [[shiftBtn, keyBtn('MODE', cycleAngle, 'fn'), keyBtn('DEL', backspace, 'op')],
          [alphaBtn, insKey('X,T,θ,n', 'x', 'fn'), decoKey('STAT', 'fn')]],
        buildDpad(false)
      ));
      appendKeyRows(kp, [
        [modKey('MATH', function () {}, { shiftLabel: 'nCr', shiftFn: function () { insertAtCursor('ncr('); } }, 'fn'),
          modKey('APPS', function () {}, { shiftLabel: 'nPr', shiftFn: function () { insertAtCursor('npr('); } }, 'fn'),
          decoKey('PRGM', 'fn'), decoKey('VARS', 'fn'), keyBtn('CLEAR', clearAll, 'op')],
        [modKey('x<sup>-1</sup>', function () { insertAtCursor('^(-1)'); }, { shiftLabel: 'MATRIX', shiftFn: function () { state.screen = 'matrix'; render(); } }, 'fn'),
          insKeyMod('sin', 'sin(', { shiftLabel: 'sin⁻¹', shiftText: 'asin(' }, 'fn'),
          insKeyMod('cos', 'cos(', { shiftLabel: 'cos⁻¹', shiftText: 'acos(' }, 'fn'),
          insKeyMod('tan', 'tan(', { shiftLabel: 'tan⁻¹', shiftText: 'atan(' }, 'fn'),
          insKeyMod('x<sup>y</sup>', '^', { shiftLabel: 'π', shiftText: 'pi' }, 'op')],
        [insKeyMod('x<sup>2</sup>', '^2', { shiftLabel: '√', shiftText: 'sqrt(' }, 'fn'),
          insKeyMod(',', ',', { shiftLabel: 'EE', shiftText: 'E' }, 'op'),
          insKeyMod('(', '(', { shiftLabel: 'x!', shiftText: '!' }, 'op'),
          insKeyMod(')', ')', { shiftLabel: '%', shiftText: '%' }, 'op'),
          insKeyMod('÷', '/', { shiftLabel: 'e', shiftText: 'e' }, 'op')],
        [insKeyMod('LOG', 'log(', { shiftLabel: '10ˣ', shiftText: '10^(' }, 'fn'), insKey('7', '7'), insKey('8', '8'), insKey('9', '9'), insKey('×', '*', 'op')],
        [insKeyMod('LN', 'ln(', { shiftLabel: 'eˣ', shiftText: 'exp(' }, 'fn'), insKey('4', '4'), insKey('5', '5'), insKey('6', '6'), insKey('−', '-', 'op')],
        [modKey('STO▸', storeToMemory, { shiftLabel: 'RCL', shiftFn: recallMemory }, 'fn'), insKey('1', '1'), insKey('2', '2'), insKey('3', '3'), insKey('+', '+', 'op')],
        [modKey('ON', function () {}, { shiftLabel: 'ⁿ√', shiftFn: function () { insertAtCursor('nthroot('); } }, 'fn'),
          insKey('0', '0', 'wide'), insKey('.', '.'), insKey('(-)', '-', 'op'), keyBtn('ENTER', runCalc, 'op enter')]
      ]);
      return kp;
    }

    // The real fx-991EX ClassWiz layout — SHIFT/ALPHA and OPTN/CALC
    // beside the D-pad with MENU/ON on its other side, the a-b/c…10ˣ/eˣ
    // row, the sin/cos/tan row on its own, STO/ENG/(/)/S⇔D/M+M-, then
    // digits — not a condensed stand-in for it. SHIFT (yellow) arms a
    // key's red shift-function legend (inverse trig, 10^x/e^x/∛/x³,
    // RCL, nCr/nPr, %); ALPHA (red) arms the real fx-991's own
    // ALPHA+)/ALPHA+( convention for the x/y variables (there's no
    // dedicated X,T,θ,n key on a Casio — this is how a real one reaches
    // those two letters fastest, so it's the mapping SHIFT gets here,
    // not a made-up one). CALC doubles as this engine's "=" (a real
    // fx-991's CALC key genuinely does re-evaluate the stored line).
    function buildCasioKeypad() {
      var kp = el('div', 'cc-keypad cc-keypad-casio');
      buildModKeys('SHIFT');
      kp.appendChild(buildDpadCluster(
        [[shiftBtn, alphaBtn], [decoKey('OPTN', 'fn'), keyBtn('CALC', runCalc, 'fn')]],
        buildDpad(true),
        [[decoKey('MENU', 'fn'), decoKey('ON', 'fn')], [decoKey('d/dx', 'fn'), insKey('x', 'x', 'fn')]]
      ));
      appendKeyRows(kp, [
        [insKey('a b/c', '/', 'fn'), insKey('√▢', 'sqrt(', 'fn'),
          insKeyMod('x<sup>2</sup>', '^2', { shiftLabel: '∛', shiftText: 'cbrt(' }, 'fn'),
          insKey('x³', '^3', 'fn'), insKey('ⁿ√▢', 'nthroot(', 'fn'), insKey('10ˣ', '10^(', 'fn')],
        [insKey('log▸', 'log(', 'fn'),
          insKeyMod('ln', 'ln(', { shiftLabel: 'eˣ', shiftText: 'exp(' }, 'fn'),
          insKeyMod('(-)', '-', { shiftLabel: '%', shiftText: '%' }, 'op'),
          modKey('°\'"', function () {}, { shiftLabel: 'nPr', shiftFn: function () { insertAtCursor('npr('); } }, 'fn'),
          insKeyMod('x!', '!', { shiftLabel: 'nCr', shiftText: 'ncr(' }, 'fn')],
        [insKeyMod('sin', 'sin(', { shiftLabel: 'sin⁻¹', shiftText: 'asin(' }, 'fn'),
          insKeyMod('cos', 'cos(', { shiftLabel: 'cos⁻¹', shiftText: 'acos(' }, 'fn'),
          insKeyMod('tan', 'tan(', { shiftLabel: 'tan⁻¹', shiftText: 'atan(' }, 'fn')],
        [modKey('STO', storeToMemory, { shiftLabel: 'RCL', shiftFn: recallMemory }, 'fn'),
          decoKey('ENG', 'fn'),
          insKeyMod('(', '(', { alphaLabel: 'Y', alphaText: 'y' }, 'op'), insKeyMod(')', ')', { alphaLabel: 'X', alphaText: 'x' }, 'op'),
          keyBtn('S⇔D', toggleFraction, 'fn'),
          modKey('M+', function () { state.mem += state.ans; }, { shiftLabel: 'M-', shiftFn: function () { state.mem -= state.ans; } }, 'fn')],
        // 'clr' (in addition to 'op') singles DEL/AC out for their own
        // blue accent in calculator.css — a real fx-991EX has these two
        // as blue keys, distinct from the plain white parens/arithmetic
        // keys the rest of 'op' covers.
        [insKey('7', '7'), insKey('8', '8'), insKey('9', '9'), keyBtn('DEL', backspace, 'op clr'), keyBtn('AC', clearAll, 'op clr')],
        [insKey('4', '4'), insKey('5', '5'), insKey('6', '6'), insKey('×', '*', 'op'), insKey('÷', '/', 'op')],
        [insKey('1', '1'), insKey('2', '2'), insKey('3', '3'), insKey('+', '+', 'op'), insKey('−', '-', 'op')],
        [insKey('0', '0', 'wide'), insKey('.', '.'), insKey('×10<sup>x</sup>', 'E', 'fn'), insKey('Ans', 'Ans', 'fn'), keyBtn('=', runCalc, 'op enter')]
      ]);
      return kp;
    }

    function toggleFraction() {
      var frac = toFraction(state.ans);
      var last = state.history[state.history.length - 1];
      if (!last) return;
      if (frac) {
        var txt = (frac.whole ? frac.whole + ' ' : '') + (frac.den > 1 ? frac.num + '/' + frac.den : (frac.whole ? '' : '0'));
        last.result = txt.trim() || '0';
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
      wrap.appendChild(el('div', 'cc-graph-hint', 'Set a row to &lt;, ≤, &gt;, or ≥ to shade the solution region of an inequality (dashed boundary = strict, solid = ≤/≥).'));

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
      requestAnimationFrame(function () { sizeGraphCanvas(); drawGraph(); });
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
      // Taller aspect (0.85 of width) and a generous cap (480px) for a
      // bigger plotting area when .cc-app has the room to give it — but
      // .cc-app's own width is now fitKeypad()'s call (see calculator.js
      // PART 5), sized to whatever screen it's on, so this floor stays
      // low enough not to force the canvas wider than a narrow phone's
      // .cc-app and get clipped by its overflow:hidden.
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

        // Inequality shading (y <rel> expr): fill from the boundary curve
        // out to the top of the canvas for '>'/'>=' or the bottom for
        // '<'/'<=', BEFORE the boundary line so the line draws crisp on
        // top of its own fill. Undefined/asymptotic points clamp to the
        // canvas edge rather than breaking the fill polygon — good enough
        // for shading (the boundary line below still shows the real gap).
        if (g.rel && g.rel !== '=') {
          var above = g.rel === '>' || g.rel === '>=';
          var edgeY = above ? 0 : h;
          graphCtx.fillStyle = hexToRgba(color, 0.16);
          graphCtx.beginPath();
          graphCtx.moveTo(X(win.xmin), edgeY);
          for (var f = 0; f <= steps; f++) {
            var fx = win.xmin + (f / steps) * (win.xmax - win.xmin);
            var fy = evaluate(g.expr, { angle: state.angle, vars: { x: fx, ans: state.ans } });
            var fpy = isFinite(fy) ? Math.max(0, Math.min(h, Y(fy))) : edgeY;
            graphCtx.lineTo(X(fx), fpy);
          }
          graphCtx.lineTo(X(win.xmax), edgeY);
          graphCtx.closePath();
          graphCtx.fill();
        }

        graphCtx.strokeStyle = color;
        graphCtx.lineWidth = 2.2;
        // Strict '<' / '>' means the boundary itself isn't part of the
        // solution set — dashed, the standard textbook convention; '=',
        // '<=' and '>=' all draw a solid curve.
        graphCtx.setLineDash(g.rel === '<' || g.rel === '>' ? [6, 4] : []);
        graphCtx.beginPath();
        var started = false, prevPxY = null;
        for (var s = 0; s <= steps; s++) {
          var xv = win.xmin + (s / steps) * (win.xmax - win.xmin);
          var yv = evaluate(g.expr, { angle: state.angle, vars: { x: xv, ans: state.ans } });
          if (!isFinite(yv)) { started = false; prevPxY = null; continue; }
          var py = Y(yv);
          if (prevPxY != null && Math.abs(py - prevPxY) > h * 1.6) { started = false; } // asymptote guard
          if (!started) { graphCtx.moveTo(X(xv), py); started = true; } else { graphCtx.lineTo(X(xv), py); }
          prevPxY = py;
        }
        graphCtx.stroke();
        graphCtx.setLineDash([]);
      });
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
        traceAt(e);
      });
      function stop() { dragging = false; }
      graphCanvas.addEventListener('pointerup', stop);
      graphCanvas.addEventListener('pointerleave', function () { stop(); traceLabel.hidden = true; });
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
        var yv = evaluate(first.expr, { angle: state.angle, vars: { x: xv } });
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
        if (state.screen === 'graph') { sizeGraphCanvas(); drawGraph(); }
        if (state.screen === 'calc') requestAnimationFrame(fitKeypad);
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
