# -*- coding: utf-8 -*-
"""Shared helpers for MCQ worksheet generation scripts."""
import random, json, re
from fractions import Fraction as F

_NUMERIC_RE = re.compile(r"^-?[\d.,]+%?$")


def smart_fmt(v):
    """Safe default choice formatter. Three cases, to avoid two real bugs found
    by inspecting actual rendered PDFs:
      1. Value already contains a '$' (e.g. "No — $119=7\\times17$", or an
         already-$-wrapped fracstr()/mixedstr() result someone passed in
         directly): return unchanged. Wrapping it in another pair of $...$
         does NOT nest — generate.py's rich() regex greedily matches from the
         FIRST '$' to the NEXT '$', so double-wrapping strands the outer '$'
         characters as literal, visible glyphs in the PDF.
      2. Value is a bare number (int/float) or a numeric-looking string
         ("11", "9.6", "6,800", "25%"): wrap in $...$ so it renders as math,
         matching every other numeric value on the page.
      3. Anything else (plain English prose like "They are equal"): return
         unchanged, NOT wrapped in $...$. matplotlib mathtext has no concept
         of a space between bare letters in math mode — "They are equal"
         wrapped as $They are equal$ renders as "Theyareequal", silently
         losing every space. Plain reportlab text has no such problem.
    """
    s = str(v)
    if "$" in s:
        return s
    if _NUMERIC_RE.match(s.strip()):
        return f"${s}$"
    return s

def fracstr(fr):
    fr = F(fr)
    if fr.denominator == 1:
        return str(fr.numerator)
    sign = "-" if fr.numerator < 0 else ""
    return rf"{sign}\dfrac{{{abs(fr.numerator)}}}{{{fr.denominator}}}"

def mixedstr(fr):
    """Mixed-number LaTeX for an improper fraction, e.g. 22/5 -> 4\\dfrac{2}{5}."""
    fr = F(fr)
    sign = "-" if fr.numerator < 0 else ""
    n = abs(fr.numerator)
    whole, rem = divmod(n, fr.denominator)
    if rem == 0:
        return f"{sign}{whole}"
    if whole == 0:
        return f"{sign}\\dfrac{{{rem}}}{{{fr.denominator}}}"
    return rf"{sign}{whole}\dfrac{{{rem}}}{{{fr.denominator}}}"

class Bank:
    def __init__(self, seed):
        self.rng = random.Random(seed)
        self.Q = []

    def mcq(self, section, q, correct, distractors, answer, fmt=smart_fmt, figure=None):
        vals = [correct] + list(distractors)
        keys = [str(v) for v in vals]
        assert len(set(keys)) == 4, f"duplicate choice values: {vals} | Q: {q}"
        order = [0, 1, 2, 3]
        self.rng.shuffle(order)
        choices = [fmt(vals[i]) for i in order]
        ci = order.index(0)
        d = {"section": section, "q": q, "choices": choices, "correct": ci, "answer": answer, "_order": order}
        if figure:
            d["figure"] = figure
        self.Q.append(d)

    def check(self, expected):
        assert len(self.Q) == expected, f"expected {expected} questions, got {len(self.Q)}"
        for i, d in enumerate(self.Q, 1):
            assert len(d["choices"]) == 4, f"Q{i} does not have 4 choices"
            assert 0 <= d["correct"] <= 3
        n_fig = sum(1 for d in self.Q if "figure" in d)
        print(f"OK: {len(self.Q)} questions, {n_fig} with figures ({100*n_fig/len(self.Q):.0f}%)")

    def apply_ar(self, overrides, section_ar):
        """overrides: list, same length/order as self.Q, each a dict with optional
        q_ar/answer_ar/choices_ar_pre (choices_ar_pre omitted -> reuse the EN choices
        verbatim, correct for pure-numeric/notation choices with nothing to translate).
        choices_ar_pre, when given, is in the SAME pre-shuffle [correct, d1, d2, d3]
        order the original mcq() call used — this method re-applies that call's stored
        shuffle (`_order`) so the translated choice lands at the same final position/
        index as its English counterpart (the `correct` index is unchanged either way).
        section_ar: {english_section_name: arabic_section_name} for every section used."""
        assert len(overrides) == len(self.Q), f"{len(overrides)} ar overrides vs {len(self.Q)} questions"
        for d, ov in zip(self.Q, overrides):
            d["q_ar"] = ov.get("q_ar", d["q"])
            d["answer_ar"] = ov.get("answer_ar", d["answer"])
            if "choices_ar_pre" in ov:
                pre = ov["choices_ar_pre"]
                assert len(pre) == 4, f"choices_ar_pre needs 4 items: {pre} | Q: {d['q']}"
                d["choices_ar"] = [pre[i] for i in d["_order"]]
            else:
                d["choices_ar"] = d["choices"]
            assert d["section"] in section_ar, f"missing AR section name for: {d['section']}"
        self.section_ar = section_ar

    def to_sections(self, ar=False, heading_prefix=""):
        """Group self.Q (in order) into topic-JSON `sections` list. ar=True uses the
        q_ar/choices_ar/answer_ar fields set by apply_ar(); heading_prefix (e.g. 'MCQ — ')
        distinguishes these from any pre-existing free-response sections of the same name
        when merged into an existing worksheet."""
        sections = []
        cur = None
        for d in self.Q:
            heading = (self.section_ar[d["section"]] if ar else d["section"])
            heading = heading_prefix + heading
            if cur is None or cur["heading"] != heading:
                cur = {"heading": heading, "questions": []}
                sections.append(cur)
            if ar:
                qd = {"q": d["q_ar"], "choices": d["choices_ar"], "correct": d["correct"], "answer": d["answer_ar"]}
            else:
                qd = {"q": d["q"], "choices": d["choices"], "correct": d["correct"], "answer": d["answer"]}
            if "figure" in d:
                qd["figure"] = d["figure"]
            cur["questions"].append(qd)
        return sections
