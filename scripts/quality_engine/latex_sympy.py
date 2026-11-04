#!/usr/bin/env python3
"""
scripts/quality_engine/latex_sympy.py
Zero-ANTLR Pure-Python LaTeX -> SymPy AST Parser & Symbolic Comparator (Wave 3 — WP-33)
"""

from __future__ import annotations
import re
import warnings
from functools import lru_cache
import sympy as sp

warnings.filterwarnings('ignore', category=SyntaxWarning)
from sympy.parsing.sympy_parser import (
     parse_expr,
    standard_transformations,
    implicit_multiplication_application,
    convert_xor,
)

TRANSFORMATIONS = standard_transformations + (implicit_multiplication_application, convert_xor)

_SYMPY_LOCALS = {
    'pi': sp.pi,
    'e': sp.E,
    'E': sp.E,
    'I': sp.I,
    'oo': sp.oo,
    'sqrt': sp.sqrt,
    'cbrt': lambda z: z ** sp.Rational(1, 3),
    'sin': sp.sin,
    'cos': sp.cos,
    'tan': sp.tan,
    'sec': sp.sec,
    'csc': sp.csc,
    'cot': sp.cot,
    'asin': sp.asin,
    'acos': sp.acos,
    'atan': sp.atan,
    'ln': sp.log,
    'log': sp.log,
    'exp': sp.exp,
    'Abs': sp.Abs,
    'abs': sp.Abs,
    'binomial': sp.binomial,
    'factorial': sp.factorial,
    'Rational': sp.Rational,
}
for _ch in 'abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ':
    if _ch not in _SYMPY_LOCALS:
        _SYMPY_LOCALS[_ch] = sp.Symbol(_ch, real=True)
_SYMPY_LOCALS['theta'] = sp.Symbol('theta', real=True)
_SYMPY_LOCALS['alpha'] = sp.Symbol('alpha', real=True)
_SYMPY_LOCALS['beta'] = sp.Symbol('beta', real=True)
_SYMPY_LOCALS['gamma'] = sp.Symbol('gamma', real=True)
_SYMPY_LOCALS['lam'] = sp.Symbol('lam', real=True)


def _extract_braced(s: str, start: int) -> tuple[str, int] | None:
    """Given s[start] == '{', return (inside, index_after_closing_brace)."""
    if start >= len(s) or s[start] != '{':
        return None
    depth = 0
    i = start
    while i < len(s):
        if s[i] == '\\' and i + 1 < len(s):
            i += 2
            continue
        if s[i] == '{':
            depth += 1
        elif s[i] == '}':
            depth -= 1
            if depth == 0:
                return s[start + 1:i], i + 1
        i += 1
    return None


def strip_delims(raw: str) -> str:
    s = str(raw or '').strip()
    # Strip bilingual <span class="en-trans">...</span> if choice is bilingual
    s = re.sub(r'<span\s+class="en-trans">.*?</span>', '', s, flags=re.S)
    s = re.sub(r'</?[A-Za-z!][^>]*>', ' ', s)
    s = s.strip()
    if (s.startswith(r'\(') and s.endswith(r'\)')) or (s.startswith(r'\[') and s.endswith(r'\]')):
        s = s[2:-2].strip()
    elif s.startswith('$$') and s.endswith('$$') and len(s) >= 4:
        s = s[2:-2].strip()
    # If string is a single \(...\) followed by a unit word (e.g. "\(12\) cm" or "12 units"),
    # only strip pure unit words when no other math exists
    m_single = re.match(r'^\\\((.*?)\\\)\s*(?:units?|cm|mm|m|km|ft|in|s|sec|min|hr|hours?|days?|°|degrees?|rad|radians?|م|سم|كم|ريال|ريالات|درجة|وحدة|وحدات)?\.?$', s)
    if m_single:
        s = m_single.group(1).strip()
    return s


def _expand_latex_macros(s: str) -> str:
    # Iteratively expand \frac, \dfrac, \tfrac, \binom, \sqrt[n]{x}, \sqrt{x}, ^{...}
    for _ in range(12):
        changed = False
        # \frac{a}{b}, \dfrac{a}{b}, \tfrac{a}{b}
        for macro in (r'\dfrac', r'\tfrac', r'\frac'):
            idx = s.find(macro)
            while idx != -1:
                p1 = idx + len(macro)
                while p1 < len(s) and s[p1].isspace():
                    p1 += 1
                b1 = _extract_braced(s, p1)
                if b1:
                    num_s, p2 = b1
                    while p2 < len(s) and s[p2].isspace():
                        p2 += 1
                    b2 = _extract_braced(s, p2)
                    if b2:
                        den_s, p3 = b2
                        s = s[:idx] + f'(({num_s})/({den_s}))' + s[p3:]
                        changed = True
                        break
                idx = s.find(macro, idx + 1)
            if changed:
                break
        if changed:
            continue

        # \binom{n}{k}
        idx = s.find(r'\binom')
        if idx != -1:
            p1 = idx + 6
            while p1 < len(s) and s[p1].isspace():
                p1 += 1
            b1 = _extract_braced(s, p1)
            if b1:
                n_s, p2 = b1
                while p2 < len(s) and s[p2].isspace():
                    p2 += 1
                b2 = _extract_braced(s, p2)
                if b2:
                    k_s, p3 = b2
                    s = s[:idx] + f'binomial({n_s},{k_s})' + s[p3:]
                    continue

        # \sqrt[n]{x}
        m_nroot = re.search(r'\\sqrt\s*\[([^\[\]]+)\]\s*\{', s)
        if m_nroot:
            b = _extract_braced(s, m_nroot.end() - 1)
            if b:
                rad_s, p_end = b
                deg_s = m_nroot.group(1)
                s = s[:m_nroot.start()] + f'(({rad_s})**(1/({deg_s})))' + s[p_end:]
                continue

        # \sqrt{x}
        idx = s.find(r'\sqrt')
        if idx != -1:
            p1 = idx + 5
            while p1 < len(s) and s[p1].isspace():
                p1 += 1
            b1 = _extract_braced(s, p1)
            if b1:
                rad_s, p2 = b1
                s = s[:idx] + f'sqrt({rad_s})' + s[p2:]
                continue

        # ^{...}
        idx = s.find('^')
        pos = 0
        while idx != -1:
            p1 = idx + 1
            while p1 < len(s) and s[p1].isspace():
                p1 += 1
            b1 = _extract_braced(s, p1)
            if b1:
                exp_s, p2 = b1
                s = s[:idx] + f'**({exp_s})' + s[p2:]
                changed = True
                break
            pos = idx + 1
            idx = s.find('^', pos)
        if changed:
            continue
        break
    return s


@lru_cache(maxsize=65536)
def latex_to_sympy(raw: str) -> sp.Expr | None:
    """
    Convert a single scalar/algebraic LaTeX or plain-math expression to a SymPy Expr.
    Returns None if the string is prose, a multi-statement/equation/inequality/tuple/set,
    or otherwise non-scalar.
    """
    if raw is None:
        return None
    s = strip_delims(raw)
    if not s or len(s) > 140:
        return None

    # Strip leading variable assignment ONLY if of form "x = expr"? NO! "x = 2" vs "y = 2" are NOT equal choices!
    # Reject equations, inequalities, intervals, sets, matrices, multi-value lists, prose
    if any(tok in s for tok in ('=', '<', '>', r'\le', r'\ge', r'\neq', r'\ne', r'\approx', r'\pm', '±', ',', ';', ':', r'\cup', r'\cap', r'\in', r'\to', '→', '...', r'\dots', r'\cdots', r'\begin', '∞', r'\infty')):
        return None

    # Strip harmless wrappers & units only if purely numeric/symbolic
    s = re.sub(r'\\(?:left|right|displaystyle|textstyle|mathbf|mathit|mathrm)\b', '', s)
    s = re.sub(r'\\text\{\s*(?:units?|cm|mm|m|km|s|rad|م|سم|كم)?\s*\}', '', s)
    if r'\text' in s or re.search(r'[\u0600-\u06FF]', s):
        return None
    # Strip trailing plain units on pure numbers e.g. "6 units" -> WAIT: "6 m" vs "6 cm" would differ in units!
    # Keep unit symbols if different; only strip currency/degree if unambiguous:
    s = s.replace(r'\$', '').replace('$', '')
    if s.endswith(r'^\circ') or s.endswith('°'):
        s = re.sub(r'(?:\^\\circ|°)$', '', s).strip()
    if s.endswith(r'\%') or s.endswith('%'):
        s = re.sub(r'(?:\\%|%)$', '', s).strip() + '/100'

    # Reject multi-word English prose
    words = re.findall(r'[A-Za-z]{2,}', re.sub(r'\\[A-Za-z]+', ' ', s))
    allowed_funcs = {'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'asin', 'acos', 'atan', 'ln', 'log', 'exp', 'sqrt', 'pi', 'mod'}
    if any(w.lower() not in allowed_funcs for w in words):
        return None

    s = s.replace('−', '-').replace('–', '-').replace(r'\times', '*').replace('×', '*').replace(r'\cdot', '*').replace('·', '*').replace(r'\div', '/').replace('÷', '/')
    s = _expand_latex_macros(s)
    s = (
        s.replace(r'\pi', '(pi)')
        .replace('π', '(pi)')
        .replace(r'\theta', 'theta')
        .replace(r'\alpha', 'alpha')
        .replace(r'\beta', 'beta')
        .replace(r'\gamma', 'gamma')
        .replace(r'\lambda', 'lam')
        .replace(r'\sin', 'sin')
        .replace(r'\cos', 'cos')
        .replace(r'\tan', 'tan')
        .replace(r'\sec', 'sec')
        .replace(r'\csc', 'csc')
        .replace(r'\cot', 'cot')
        .replace(r'\arcsin', 'asin')
        .replace(r'\arccos', 'acos')
        .replace(r'\arctan', 'atan')
        .replace(r'\ln', 'ln')
        .replace(r'\log', 'log')
        .replace(r'\exp', 'exp')
        .replace(r'\,', ' ')
        .replace(r'\;', ' ')
        .replace(r'\!', '')
        .replace('{', '(')
        .replace('}', ')')
    )
    if '\\' in s:
        return None
    # Handle factorials like 5! or (n-1)!
    s = re.sub(r'(\d+|\([^()]+\))\s*!', r'factorial(\1)', s)
    # Absolute value |x| (single pair)
    if s.count('|') == 2:
        s = re.sub(r'\|([^|]+)\|', r'Abs(\1)', s)
    elif '|' in s:
        return None

    try:
        expr = parse_expr(s, local_dict=_SYMPY_LOCALS, transformations=TRANSFORMATIONS, evaluate=True)
        if isinstance(expr, sp.Expr):
            return expr
    except Exception:
        return None
    return None


def expressions_equal(e1: sp.Expr, e2: sp.Expr) -> bool:
    """Fast numeric + exact symbolic equality test between two SymPy Exprs."""
    try:
        diff = e1 - e2
        if diff == 0:
            return True
        syms = list(diff.free_symbols)
        if not syms:
            # Pure constant expression: check high-precision numeric evaluation first, then simplify
            v = complex(diff.evalf(30))
            if abs(v) > 1e-18:
                return False
            return sp.simplify(diff) == 0
        else:
            # Test at 2 deterministic non-integer primes/rationals to filter 99.9% of unequal expressions in microseconds
            pts = [
                {sym: sp.Rational(13 + 3 * idx, 7) for idx, sym in enumerate(syms)},
                {sym: sp.Rational(19 + 5 * idx, 11) for idx, sym in enumerate(syms)},
            ]
            for pt in pts:
                val = complex(diff.subs(pt).evalf(25))
                if abs(val) > 1e-14:
                    return False
            return sp.simplify(sp.expand(diff)) == 0
    except Exception:
        return False
