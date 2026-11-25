#!/usr/bin/env python3
"""ClipSAT worksheet generator.

Turns a JSON topic file into a branded worksheet + answer-key PDF pair,
visually consistent with the existing worksheet library (clean sans body,
indigo question numbers, sectioned layout, ClipSAT logo header, centered
copyright footer) without cloning any third-party template.

Topic JSON schema:
{
  "track": "precalc",
  "num": "1.01",
  "title": "Functions and Function Notation",
  "sections": [
    {
      "heading": "Evaluating functions",        // optional (omit for none)
      "questions": [
        {
          "q": "Consider $f(x) = 2x^2 - 5x + 3$. Evaluate:",
          "parts": ["$f(0)$", "$f(2)$"],        // optional
          "cols": 4,                             // optional column hint for parts
          "answer": "$3$",                       // for questions without parts
          "answers": ["$3$", "$1$"],             // per-part answers
          "figure": {                            // optional matplotlib figure
            "type": "plot",                      // plot | grid
            "fns": ["x**2 - 2"],
            "xmin": -4, "xmax": 4, "ymin": -4, "ymax": 6,
            "width": 240                         // display width in points
          }
        },
        {
          "q": "A real multiple-choice question:",
          "choices": ["$12$", "$14$", "$16$", "$18$"],  // exactly 4 — renders as
                                                          // a lettered A/B/C/D list
                                                          // (أ/ب/ج/د for lang:'ar')
          "correct": 1,                          // 0-indexed into choices — the
                                                  // worksheet gives no visual hint;
                                                  // the answer key bolds this
                                                  // choice in --ok green with a
                                                  // checkmark
          "answer": "Worked explanation shown under the highlighted choice, "
                     "answer-key only — same field as the free-response case."
        }
      ]
    }
  ]
}

Math: $...$ spans are rendered with matplotlib mathtext (LaTeX subset) as
inline images with true baseline alignment.

Usage:
  python3 generate.py topic.json [more.json ...] --out OUTPUT_DIR
"""
import argparse
import hashlib
import html
import json
import os
import re
import sys

import numpy as np

try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import matplotlib.patches as mpatches
    from matplotlib import mathtext
    from matplotlib.font_manager import FontProperties
    _HAS_MPL = True
except ImportError:
    matplotlib = None
    plt = None
    mpatches = None
    mathtext = None
    FontProperties = None
    _HAS_MPL = False

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table,
    TableStyle, Image, KeepTogether, HRFlowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

try:
    import arabic_reshaper
    from bidi.algorithm import get_display
    _ARABIC_RESHAPER = arabic_reshaper.ArabicReshaper({
        "delete_harakat": False,
        "support_ligatures": True,
    })
except ImportError:
    arabic_reshaper = None
    get_display = None
    _ARABIC_RESHAPER = None

# ── ClipSAT brand (mirrors index.html CSS tokens) ────────────────────────────
INK = "#0E1726"
INDIGO = "#1E3A6E"
INDIGO2 = "#2B5BA8"
AMBER = "#C8902A"
GRID = "#c9d4e8"
CURVE = "#0e9f8f"  # teal curve color, consistent with site explorers
AMBER_TEXT = "#8A6017"  # WCAG-AA amber for on-white text labels (matches site --amber-text)
BORDER = "#dde4f0"  # hairline dividers/frames (matches site FIG_BORDER)
MUTED = "#5a6577"   # secondary/footer text (matches site FIG_MUTED)
FOOTER_TEXT = "© ClipSAT — clipsat.org | All Rights Reserved"

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
LOGO_PATH = os.path.join(SITE_ROOT, "clipsat-mark.png")
CACHE_DIR = os.path.join(HERE, ".mathcache")

ARABIC_FONT_PATH = os.path.join(HERE, "fonts", "NotoNaskhArabic-Regular.ttf")
if os.path.exists(ARABIC_FONT_PATH):
    pdfmetrics.registerFont(TTFont("NotoNaskhArabic", ARABIC_FONT_PATH))


def shape_ar(text):
    """Reshape Arabic letters to contextual joining forms and resolve the
    Unicode bidi algorithm to visual order."""
    if _ARABIC_RESHAPER is None or get_display is None:
        return text
    return get_display(_ARABIC_RESHAPER.reshape(text))

PAGE_W, PAGE_H = letter
MARGIN_L = 0.9 * inch
MARGIN_R = 0.75 * inch
MARGIN_T = 0.7 * inch
MARGIN_B = 0.85 * inch
BODY_W = PAGE_W - MARGIN_L - MARGIN_R

MATH_DPI = 300
MATH_PROP = FontProperties(size=10) if _HAS_MPL else None
_math_parser = mathtext.MathTextParser("path") if _HAS_MPL else None


# ── Inline math rendering ────────────────────────────────────────────────────
def _conv_env_mathtext(m):
    env = m.group(1)
    body = m.group(2).strip()
    rows = [r.strip() for r in re.split(r"\\\\", body) if r.strip()]
    row_strs = []
    for r in rows:
        cols = [c.strip() for c in r.split("&")]
        row_strs.append(", ".join(cols))
    joined = " ; ".join(row_strs)
    if "bmatrix" in env:
        return r"\left[" + joined + r"\right]"
    if "vmatrix" in env:
        return r"\left|" + joined + r"\right|"
    if "cases" in env:
        return r"\left\{ " + joined + r" \right."
    if "align" in env or "array" in env:
        return joined
    return r"\left(" + joined + r"\right)"


def _normalize_mathtext(tex):
    """Normalize standard LaTeX shorthands into matplotlib mathtext equivalents."""
    tex = re.sub(
        r"\\begin\{(pmatrix|bmatrix|vmatrix|Bmatrix|matrix|cases|aligned|align\*?|array)\}(?:\{[^{}]*\})?(.*?)\\end\{\1\}",
        _conv_env_mathtext,
        tex,
        flags=re.S,
    )
    tex = re.sub(r"\\(?:d|t|c)frac(?![a-zA-Z])", r"\\frac", tex)
    tex = re.sub(r"\\sqrt\s*([0-9a-zA-Z])(?![0-9a-zA-Z])", r"\\sqrt{\1}", tex)
    tex = re.sub(r"\\frac\s*([0-9])\s*([0-9])", r"\\frac{\1}{\2}", tex)
    tex = re.sub(r"\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])(?![0-9a-zA-Z])", r"\\frac{\1}{\2}", tex)
    tex = re.sub(r"\\frac\s*([0-9a-zA-Z])\s*\{", r"\\frac{\1}{", tex)
    tex = re.sub(r"\\frac\s*\{([^{}]+)\}\s*([0-9a-zA-Z])(?![0-9a-zA-Z])", r"\\frac{\1}{\2}", tex)
    tex = re.sub(r"\\displaystyle(?![a-zA-Z])", "", tex)
    tex = re.sub(r"\\textstyle(?![a-zA-Z])", "", tex)
    tex = re.sub(r"\\limits(?![a-zA-Z])", "", tex)
    tex = re.sub(r"\\[bB]igg?[lr]?(?![a-zA-Z])", "", tex)
    tex = re.sub(r"\\pmod\s*\{([^{}]*)\}", r"(\\mathrm{mod}\\ \1)", tex)
    tex = re.sub(r"\\pmod\s+([0-9a-zA-Z]+)", r"(\\mathrm{mod}\\ \1)", tex)
    tex = re.sub(r"\\bmod(?![a-zA-Z])", r"\\mathrm{mod}\\ ", tex)
    tex = re.sub(r"\\lt(?![a-zA-Z])", "<", tex)
    tex = re.sub(r"\\gt(?![a-zA-Z])", ">", tex)
    tex = re.sub(r"\\le(?![a-zA-Z])", r"\\leq", tex)
    tex = re.sub(r"\\ge(?![a-zA-Z])", r"\\geq", tex)
    tex = re.sub(r"\\ne(?![a-zA-Z])", r"\\neq", tex)
    tex = re.sub(r"\\implies(?![a-zA-Z])", r"\\Rightarrow", tex)
    tex = re.sub(r"\\iff(?![a-zA-Z])", r"\\Leftrightarrow", tex)
    tex = re.sub(r"\\to(?![a-zA-Z])", r"\\rightarrow", tex)
    tex = re.sub(r"\\gets(?![a-zA-Z])", r"\\leftarrow", tex)
    tex = re.sub(r"\\mapsto(?![a-zA-Z])", r"\\rightarrow", tex)
    tex = re.sub(r"\\xrightarrow(?:\[[^{}\]]*\])?\{[^{}]*\}", r"\\rightarrow", tex)
    tex = re.sub(r"\\stackrel\{[^{}]*\}\{([^{}]*)\}", r"\1", tex)
    tex = re.sub(r"\\overset\{[^{}]*\}\{([^{}]*)\}", r"\1", tex)
    tex = re.sub(r"\\underset\{[^{}]*\}\{([^{}]*)\}", r"\1", tex)
    tex = re.sub(r"\\land(?![a-zA-Z])", r"\\wedge", tex)
    tex = re.sub(r"\\lor(?![a-zA-Z])", r"\\vee", tex)
    tex = re.sub(r"\\(?:lnot|neg)(?![a-zA-Z])", r"\\sim", tex)
    tex = re.sub(r"\\degree(?![a-zA-Z])", r"^\\circ", tex)
    tex = re.sub(r"\\triangle(?![a-zA-Z])", r"\\Delta ", tex)
    tex = re.sub(r"\\newline(?![a-zA-Z])", "; ", tex)
    tex = re.sub(r"\\\|", r"||", tex)
    tex = re.sub(r"\\mathbf\s+([a-zA-Z0-9])(?![a-zA-Z0-9])", r"\\mathbf{\1}", tex)
    tex = re.sub(r"\\boxed\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", r"\1", tex)
    tex = re.sub(r"\\textbf\{([^{}]*)\}", r"\\mathbf{\1}", tex)
    tex = re.sub(r"\\textit\{([^{}]*)\}", r"\\mathit{\1}", tex)
    # Map any Arabic unit/label tokens inside math mode to Latin math symbols
    _ar_math_map = {
        "كم/س": "km/h",
        "كم/لتر": "km/L",
        "سم": "cm",
        "كم": "km",
        "دقيقة": "min",
        "المسافة": "d",
        "السرعة النسبية": "v_{rel}",
        "عدد العمال": "N",
        "الزمن": "t",
        "ثابت": "C",
        "الوقود": "F",
        "الساعات": "H",
        "الدقائق": "M",
        "الترتيب من البداية": "r_1",
        "الترتيب من النهاية": "r_2",
        "المشترك": "x",
        "أكبر قيمة": "x_{max}",
        "أصغر قيمة": "x_{min}",
        "م": "m",
        "ص": "H",
        "ك": "T",
    }
    for ar_tok, lat_tok in _ar_math_map.items():
        if ar_tok in tex:
            tex = tex.replace(ar_tok, lat_tok)
    # Strip any remaining Arabic characters inside math mode so mathtext never substitutes dummy boxes
    tex = re.sub(r"\\text\{\s*[\u0600-\u06FF\s]+\s*\}", "", tex)
    tex = re.sub(r"[\u0600-\u06FF]+", "", tex)
    tex = re.sub(r"\\frac\s*\{\s*\}\s*\{\s*\}", r"\\frac{\\mathrm{A}}{\\mathrm{B}}", tex)
    tex = re.sub(r"\\frac\s*\{\s*\}", r"\\frac{\\mathrm{A}}", tex)
    tex = re.sub(r"\\frac\s*(\{[^{}]+\})\s*\{\s*\}", r"\\frac\1{\\mathrm{B}}", tex)
    tex = re.sub(r"\\text\{([^}]*)\}", lambda m: r"\mathrm{" + m.group(1).replace(" ", r"\ ") + "}", tex)
    tex = re.sub(r"\\operatorname\*?\{([^}]*)\}", lambda m: r"\mathrm{" + m.group(1).replace(" ", r"\ ") + "}", tex)
    return tex


def render_math(tex, color=INK, size=10):
    """Render a $...$ span to a PNG; return (path, w_pt, h_pt, depth_pt)."""
    tex = _normalize_mathtext(tex)
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = hashlib.sha1(f"{tex}|{color}|{size}".encode()).hexdigest()[:16]
    path = os.path.join(CACHE_DIR, key + ".png")
    meta_path = os.path.join(CACHE_DIR, key + ".meta")
    if os.path.exists(path) and os.path.exists(meta_path):
        with open(meta_path, encoding="utf-8") as mf:
            width, height, depth = [float(x) for x in mf.read().strip().split(",")]
        return path, width, height, depth
    prop = FontProperties(size=size)
    width, height, depth, _, _ = _math_parser.parse(tex, dpi=72, prop=prop)
    if not os.path.exists(path):
        tmp_png = os.path.join(CACHE_DIR, f"{key}.{os.getpid()}.png")
        mathtext.math_to_image(tex, tmp_png, prop=prop, dpi=MATH_DPI, color=color, format="png")
        os.replace(tmp_png, path)
    tmp_meta = os.path.join(CACHE_DIR, f"{key}.{os.getpid()}.meta")
    with open(tmp_meta, "w", encoding="utf-8") as mf:
        mf.write(f"{width},{height},{depth}")
    os.replace(tmp_meta, meta_path)
    return path, width, height, depth


_PLACEHOLDER_BASE = 0xE000  # Private Use Area — safe from Arabic reshaping/bidi mirroring


def rich(text, color=INK, size=10, rtl=False):
    """Convert text with $...$ math spans into reportlab paragraph markup.

    Math spans are first pulled out into single-codepoint placeholders (Private
    Use Area) BEFORE any Arabic reshaping/bidi runs. This matters: the bidi
    algorithm mirrors bracket characters like ( ) in RTL context, and mixing
    Arabic reshaping into raw LaTeX source could corrupt it. By stashing the
    literal $...$ source behind an inert placeholder first, reshaping/bidi only
    ever touches genuine Arabic prose, and the placeholder — a strong-direction,
    non-mirrored character — still gets correctly positioned relative to the
    surrounding RTL text, exactly like the embedded math image is meant to sit.
    """
    math_specs = []
    _ESC_DOLLAR = "\uEFFE"

    def _stash(m):
        inner = m.group(1).replace(_ESC_DOLLAR, r"\$")
        if not inner.strip():
            return inner
        math_specs.append("$" + inner + "$")
        return chr(_PLACEHOLDER_BASE + len(math_specs) - 1)

    text = text.replace(r"\$", _ESC_DOLLAR)
    text = re.sub(r"\\\((.*?)\\\)", _stash, text, flags=re.S)
    text = re.sub(r"\\\[(.*?)\\\]", _stash, text, flags=re.S)
    text = re.sub(r"\$\$(.+?)\$\$", _stash, text, flags=re.S)
    text = re.sub(r"\$([^$\uE000-\uEFFF]+)\$", _stash, text)
    if rtl:
        text = shape_ar(text)
    out = []
    pos = 0
    for m in re.finditer(r"[-]", text):
        out.append(html.escape(text[pos:m.start()].replace(_ESC_DOLLAR, "$")))
        tex = math_specs[ord(m.group(0)) - _PLACEHOLDER_BASE]
        if not re.sub(r"[\s$]+", "", _normalize_mathtext(tex)):
            pos = m.end()
            continue
        path, w, h, d = render_math(tex, color=color, size=size)
        if w > 210.0:
            scale = 210.0 / w
            w, h, d = w * scale, h * scale, d * scale
        out.append(
            f'<img src="{path}" width="{w:.2f}" height="{h:.2f}" valign="{-d:.2f}"/>'
        )
        pos = m.end()
    out.append(html.escape(text[pos:].replace(_ESC_DOLLAR, "$")))
    return "".join(out)


# ── Figures ──────────────────────────────────────────────────────────────────
def _fig_axes(spec):
    xmin, xmax = spec.get("xmin", -5), spec.get("xmax", 5)
    ymin, ymax = spec.get("ymin", -5), spec.get("ymax", 5)
    aspect = (ymax - ymin) / max(xmax - xmin, 1e-9)
    aspect = min(max(aspect, 0.4), 1.4)  # clamp so figures never blow past a page
    fig, ax = plt.subplots(figsize=(3.2, 3.2 * aspect))
    ax.set_xlim(xmin, xmax)
    ax.set_ylim(ymin, ymax)
    xstep = max(1, round((xmax - xmin) / 8))
    ystep = max(1, round((ymax - ymin) / 8))
    ax.set_xticks(np.arange(np.ceil(xmin / xstep) * xstep, xmax + 1, xstep))
    ax.set_yticks(np.arange(np.ceil(ymin / ystep) * ystep, ymax + 1, ystep))
    ax.grid(True, color=GRID, linewidth=0.6)
    ax.tick_params(labelsize=7, colors=INK, length=0)
    for spine in ax.spines.values():
        spine.set_visible(False)
    # Only draw the x=0/y=0 reference line and axis-arrow label at the literal
    # origin when it actually falls inside the plotted window; otherwise clamp
    # to the visible axis edge. Without this, bbox_inches="tight" expands the
    # saved PNG out to the literal (0,0) label position even when e.g.
    # ymin/ymax=[5000,7000] (a real-world dollar-growth window), producing a
    # silently oversized image that blows up the PDF's page layout.
    y0 = 0 if ymin <= 0 <= ymax else (ymin if ymin > 0 else ymax)
    x0 = 0 if xmin <= 0 <= xmax else (xmin if xmin > 0 else xmax)
    if ymin <= 0 <= ymax:
        ax.axhline(0, color=INK, linewidth=0.9)
    if xmin <= 0 <= xmax:
        ax.axvline(0, color=INK, linewidth=0.9)
    ax.text(xmax + (xmax - xmin) * 0.04, y0, "$x$", fontsize=9, color=INK,
            va="center", ha="left", clip_on=False)
    ax.text(x0, ymax + (ymax - ymin) * 0.04, "$y$", fontsize=9, color=INK,
            va="bottom", ha="center", clip_on=False)
    return fig, ax


def _bbox_scale(points):
    """Characteristic size of a point set — used to size markers proportionally."""
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    return max(max(xs) - min(xs), max(ys) - min(ys), 1e-6)


def _geom_fig(points, pad_frac=0.26, base=3.0):
    """Equal-aspect, axis-free canvas auto-fit to a bounding box of `points`."""
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    xmin, xmax = min(xs), max(xs)
    ymin, ymax = min(ys), max(ys)
    w = (xmax - xmin) or 1.0
    h = (ymax - ymin) or 1.0
    padx, pady = w * pad_frac, h * pad_frac
    xmin, xmax = xmin - padx, xmax + padx
    ymin, ymax = ymin - pady, ymax + pady
    aspect = (ymax - ymin) / (xmax - xmin)
    aspect = min(max(aspect, 0.5), 1.7)
    fig, ax = plt.subplots(figsize=(base, base * aspect))
    ax.set_xlim(xmin, xmax)
    ax.set_ylim(ymin, ymax)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def _draw_right_angle(ax, vertex, p1, p2, size):
    """Small square marker at `vertex`, between the rays toward p1 and p2."""
    v = np.array(vertex, dtype=float)
    d1 = np.array(p1, dtype=float) - v
    d2 = np.array(p2, dtype=float) - v
    d1 = d1 / (np.linalg.norm(d1) + 1e-9)
    d2 = d2 / (np.linalg.norm(d2) + 1e-9)
    pts = [v + d1 * size, v + d1 * size + d2 * size, v + d2 * size]
    ax.add_patch(plt.Polygon(pts, closed=False, fill=False,
                              edgecolor=INK, linewidth=1.1, zorder=5))


def _draw_angle_arc(ax, vertex, p1, p2, radius, label=None, color=AMBER):
    """Arc marking the angle at `vertex` swept from the ray toward p1 to p2."""
    v = np.array(vertex, dtype=float)
    a1 = np.degrees(np.arctan2(*(np.array(p1) - v)[::-1]))
    a2 = np.degrees(np.arctan2(*(np.array(p2) - v)[::-1]))
    d = (a2 - a1) % 360
    if d > 180:
        a1, a2, d = a2, a1, 360 - d
    arc = mpatches.Arc(v, radius * 2, radius * 2, angle=0,
                        theta1=a1, theta2=a1 + d, color=color, linewidth=1.3, zorder=5)
    ax.add_patch(arc)
    if label:
        mid = np.radians(a1 + d / 2)
        lx, ly = v[0] + radius * 1.45 * np.cos(mid), v[1] + radius * 1.45 * np.sin(mid)
        ax.text(lx, ly, label, fontsize=8.5, color=color, ha="center", va="center")


def _draw_triangle(ax, spec):
    verts = [tuple(v) for v in spec["vertices"]]
    labels = spec.get("labels", [None, None, None])
    side_labels = spec.get("side_labels", [None, None, None])
    fill = spec.get("fill", False)
    scale = _bbox_scale(verts)

    if fill:
        ax.add_patch(plt.Polygon(verts, closed=True, fill=True,
                                  facecolor=INDIGO, alpha=0.07, edgecolor="none"))
    ax.add_patch(plt.Polygon(verts, closed=True, fill=False,
                              edgecolor=INDIGO, linewidth=1.8))

    centroid = np.mean(verts, axis=0)
    for v, lab in zip(verts, labels):
        if not lab:
            continue
        d = np.array(v) - centroid
        n = d / (np.linalg.norm(d) + 1e-9)
        lp = np.array(v) + n * scale * 0.16
        ax.text(lp[0], lp[1], lab, fontsize=10.5, color=INK,
                fontweight="bold", ha="center", va="center")

    for i in range(3):
        lab = side_labels[i] if i < len(side_labels) else None
        if not lab:
            continue
        a, b = np.array(verts[i]), np.array(verts[(i + 1) % 3])
        mid = (a + b) / 2
        edge = b - a
        normal = np.array([-edge[1], edge[0]])
        normal = normal / (np.linalg.norm(normal) + 1e-9)
        if np.dot(mid + normal * 0.01 - centroid, normal) < 0:
            normal = -normal
        lp = mid + normal * scale * 0.14
        ax.text(lp[0], lp[1], lab, fontsize=9.5, color=AMBER_TEXT,
                ha="center", va="center")

    ra = spec.get("right_angle_at")
    if ra is not None:
        v, p1, p2 = verts[ra], verts[(ra - 1) % 3], verts[(ra + 1) % 3]
        _draw_right_angle(ax, v, p1, p2, size=scale * 0.09)

    for m in spec.get("angle_marks", []):
        i = m["vertex"]
        v, p1, p2 = verts[i], verts[(i - 1) % 3], verts[(i + 1) % 3]
        _draw_angle_arc(ax, v, p1, p2, radius=m.get("radius", scale * 0.22),
                         label=m.get("label"))


def _angle_in_range(a, s, e):
    a, s, e = a % 360, s % 360, e % 360
    if s <= e:
        return s <= a <= e
    return a >= s or a <= e


def _draw_circle(ax, spec):
    r = spec.get("radius", 1)
    if isinstance(r, str):
        nums = re.findall(r"\d+(?:\.\d+)?", r)
        r = float(nums[0]) if nums else 1.0
    r = float(r) if float(r) > 0 else 1.0
    center = spec.get("center", [0, 0])
    if isinstance(center, (list, tuple)) and len(center) == 2:
        cx, cy = float(center[0]), float(center[1])
    else:
        cx, cy = 0.0, 0.0
    sector = spec.get("sector")
    if isinstance(sector, (int, float)):
        sector = {"start_deg": 0, "end_deg": float(sector), "label": f"${sector}^\\circ$"}
    elif isinstance(sector, (list, tuple)) and len(sector) >= 2:
        sector = {"start_deg": float(sector[0]), "end_deg": float(sector[1])}
    elif not isinstance(sector, dict):
        sector = None

    if sector:
        wedge = mpatches.Wedge((cx, cy), r, sector["start_deg"], sector["end_deg"],
                                facecolor=AMBER, alpha=0.18, edgecolor=AMBER, linewidth=1.3)
        ax.add_patch(wedge)
        if sector.get("label"):
            mid = np.radians((sector["start_deg"] + sector["end_deg"]) / 2)
            lx, ly = cx + r * 0.55 * np.cos(mid), cy + r * 0.55 * np.sin(mid)
            ax.text(lx, ly, sector["label"], fontsize=9.5, color=AMBER_TEXT,
                    ha="center", va="center")

    ax.add_patch(plt.Circle((cx, cy), r, fill=False, edgecolor=INDIGO, linewidth=1.8))
    ax.plot([cx], [cy], "o", color=INK, markersize=3.5)
    if spec.get("center_label"):
        ax.text(cx - r * 0.1, cy - r * 0.1, spec["center_label"], fontsize=9.5,
                 color=INK, ha="right", va="top")

    if spec.get("radius_label"):
        # default: lower-right, clear of both the conventional lower-left
        # center label and (if present) the shaded sector + its text
        default_deg = -45
        center_zone = (190, 260)
        if sector and _angle_in_range(default_deg, sector["start_deg"] - 12, sector["end_deg"] + 12):
            cand1 = sector["end_deg"] + 35
            cand2 = sector["start_deg"] - 35
            default_deg = cand2 if _angle_in_range(cand1, *center_zone) else cand1
        ang = np.radians(spec.get("radius_line_deg", default_deg))
        ex, ey = cx + r * np.cos(ang), cy + r * np.sin(ang)
        ax.plot([cx, ex], [cy, ey], color=INDIGO2, linewidth=1.3, linestyle=(0, (4, 3)))
        mx, my = cx + r * 0.52 * np.cos(ang), cy + r * 0.52 * np.sin(ang)
        ax.text(mx, my, spec["radius_label"], fontsize=9, color=INDIGO2,
                ha="left", va="bottom")

    for p in spec.get("points", []):
        ang = np.radians(p["angle"])
        px, py = cx + r * np.cos(ang), cy + r * np.sin(ang)
        ax.plot([px], [py], "o", color=INK, markersize=3.5)
        if p.get("label"):
            lx, ly = cx + r * 1.16 * np.cos(ang), cy + r * 1.16 * np.sin(ang)
            ax.text(lx, ly, p["label"], fontsize=9.5, color=INK, ha="center", va="center")

    if spec.get("chord"):
        ch = spec["chord"]
        a1, a2 = (float(ch[0]), float(ch[1])) if isinstance(ch, (list, tuple)) and len(ch) == 2 else (25.0, 145.0)
        x1, y1 = cx + r * np.cos(np.radians(a1)), cy + r * np.sin(np.radians(a1))
        x2, y2 = cx + r * np.cos(np.radians(a2)), cy + r * np.sin(np.radians(a2))
        ax.plot([x1, x2], [y1, y2], color=CURVE, linewidth=1.6)

    pad = r * 1.55
    ax.set_xlim(cx - pad, cx + pad)
    ax.set_ylim(cy - pad, cy + pad)


def _draw_polygon(ax, spec):
    """General polygon (rectangles, composite/L-shapes) with side labels."""
    verts = [tuple(v) for v in spec["vertices"]]
    n = len(verts)
    side_labels = spec.get("side_labels", [None] * n)
    scale = _bbox_scale(verts)
    cut = spec.get("cutout")  # optional inner polygon rendered as a hatched hole

    ax.add_patch(plt.Polygon(verts, closed=True, fill=True,
                              facecolor=INDIGO, alpha=0.07, edgecolor="none"))
    ax.add_patch(plt.Polygon(verts, closed=True, fill=False, edgecolor=INDIGO, linewidth=1.8))
    if cut:
        ax.add_patch(plt.Polygon(cut, closed=True, fill=True, facecolor="white",
                                  edgecolor=INDIGO2, linewidth=1.4, hatch="////",
                                  alpha=0.9))

    centroid = np.mean(verts, axis=0)
    for i in range(n):
        lab = side_labels[i] if i < len(side_labels) else None
        if not lab:
            continue
        a, b = np.array(verts[i]), np.array(verts[(i + 1) % n])
        mid = (a + b) / 2
        edge = b - a
        normal = np.array([-edge[1], edge[0]])
        normal = normal / (np.linalg.norm(normal) + 1e-9)
        if np.dot(mid + normal * 0.01 - centroid, normal) < 0:
            normal = -normal
        lp = mid + normal * scale * 0.13
        ax.text(lp[0], lp[1], lab, fontsize=9.5, color=AMBER_TEXT, ha="center", va="center")

    for m in spec.get("angle_marks", []):
        i = m["vertex"]
        v, p1, p2 = verts[i], verts[(i - 1) % n], verts[(i + 1) % n]
        if m.get("right"):
            _draw_right_angle(ax, v, p1, p2, size=scale * 0.09)


def _draw_numberline(ax, spec):
    lo, hi = spec["min"], spec["max"]
    y = 0
    shade = spec.get("shade")
    if shade:
        a, b = shade
        ax.plot([a, b], [y, y], color=AMBER, linewidth=4.5, solid_capstyle="butt", zorder=2)
    ax.annotate("", xy=(hi + 0.35, y), xytext=(lo - 0.35, y),
                arrowprops=dict(arrowstyle="-", color=INK, linewidth=1.4))
    for tip in (hi + 0.35, lo - 0.35):
        ax.annotate("", xy=(tip, y), xytext=(tip - 0.001 if tip > 0 else tip + 0.001, y),
                    arrowprops=dict(arrowstyle="-|>", color=INK, linewidth=1.4,
                                     mutation_scale=11))
    for t in range(int(np.ceil(lo)), int(np.floor(hi)) + 1):
        ax.plot([t, t], [-0.07, 0.07], color=INK, linewidth=1)
        ax.text(t, -0.26, str(t), fontsize=8.5, color=INK, ha="center", va="top")
    for m in spec.get("marks", []):
        xv, open_ = m["x"], m.get("open", False)
        ax.plot([xv], [y], marker="o", markersize=7.5,
                markerfacecolor="white" if open_ else AMBER,
                markeredgecolor=AMBER, markeredgewidth=1.7, zorder=3)
        if m.get("label"):
            ax.text(xv, 0.26, m["label"], fontsize=8.5, color=AMBER_TEXT,
                    ha="center", va="bottom")
    ax.set_xlim(lo - 0.65, hi + 0.65)
    ax.set_ylim(-0.55, 0.55)


def _draw_bars(ax, spec):
    cats, vals = spec["categories"], spec["values"]
    hi = spec.get("highlight_index")
    xs = np.arange(len(cats))
    colors = [AMBER if i == hi else INDIGO2 for i in range(len(cats))]
    ax.bar(xs, vals, color=colors, width=0.62, zorder=3)
    ax.set_xticks(xs)
    ax.set_xticklabels(cats, fontsize=8.5, color=INK)
    ax.tick_params(axis="y", labelsize=8, colors=INK, length=0)
    ax.grid(axis="y", color=GRID, linewidth=0.6, zorder=0)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(INK)
    if spec.get("ylabel"):
        ax.set_ylabel(spec["ylabel"], fontsize=8.5, color=INK)
    top = max(vals)
    for x, v in zip(xs, vals):
        ax.text(x, v + top * 0.03, str(v), fontsize=8.5, color=INK, ha="center", va="bottom")
    ax.set_ylim(0, top * 1.2)


def _iso3(ix, iy, iz):
    """Standard isometric projection (mirrors the live site's renderGeom3D)."""
    return (ix - iz) * 0.866, iy - (ix + iz) * 0.5


def _draw_solid(spec):
    """Isometric-projected 3D solid: rectangular_prism/cube, cylinder, cone,
    square_pyramid, sphere. Same INDIGO/AMBER palette as the live-site figures
    so a PDF worksheet and a live quiz question showing the same solid match."""
    solid = spec.get("solid", "rectangular_prism")
    dims = spec.get("dims", [4, 3, 2])
    l = dims[0] if len(dims) > 0 else 4.0
    w = dims[1] if len(dims) > 1 else l
    h = dims[2] if len(dims) > 2 else l
    labels = spec.get("labels", {})
    fig, ax = plt.subplots(figsize=(3.0, 2.6))
    pts = []

    def face(vs, alpha):
        pts.extend(vs)
        ax.add_patch(plt.Polygon(vs, closed=True, facecolor=INDIGO2, alpha=alpha,
                                  edgecolor=INDIGO2, linewidth=1.3, zorder=3))

    def dash(p1, p2):
        pts.extend([p1, p2])
        ax.plot([p1[0], p2[0]], [p1[1], p2[1]], color=INK, linewidth=1.0,
                linestyle=(0, (4, 3)), zorder=1)

    def lab(x, y, text, ha="center", va="center"):
        ax.text(x, y, text, fontsize=9.5, color=INDIGO, ha=ha, va=va, fontweight="bold")

    if solid in ("rectangular_prism", "cube"):
        dash(_iso3(0, 0, 0), _iso3(l, 0, 0))
        dash(_iso3(0, 0, 0), _iso3(0, 0, w))
        dash(_iso3(0, 0, 0), _iso3(0, h, 0))
        face([_iso3(0, 0, w), _iso3(0, h, w), _iso3(l, h, w), _iso3(l, 0, w)], 0.16)
        face([_iso3(l, 0, w), _iso3(l, h, w), _iso3(l, h, 0), _iso3(l, 0, 0)], 0.28)
        face([_iso3(0, h, 0), _iso3(0, h, w), _iso3(l, h, w), _iso3(l, h, 0)], 0.10)
        if labels.get("l"):
            x, y = _iso3(l / 2, 0, w + 0.4)
            lab(x, y - 0.05, labels["l"], va="top")
        if labels.get("w"):
            x, y = _iso3(l + 0.4, 0, w / 2)
            lab(x + 0.05, y, labels["w"], ha="left")
        if labels.get("h"):
            x, y = _iso3(l + 0.4, h / 2, 0)
            lab(x + 0.05, y, labels["h"], ha="left")

    elif solid == "cylinder":
        r = l / 2.0
        ex, ey = r * 1.6, r * 0.62
        cxb, cyb = _iso3(0, 0, 0)
        cxt, cyt = _iso3(0, h, 0)
        ax.add_patch(mpatches.Ellipse((cxb, cyb), ex * 2, ey * 2, facecolor="none",
                                       edgecolor=INK, linewidth=1.0, linestyle=(0, (4, 3)), zorder=1))
        ax.add_patch(plt.Polygon([(cxb - ex, cyb), (cxb + ex, cyb), (cxt + ex, cyt), (cxt - ex, cyt)],
                                  closed=True, facecolor=INDIGO2, alpha=0.24,
                                  edgecolor=INDIGO2, linewidth=1.3, zorder=2))
        ax.add_patch(mpatches.Ellipse((cxt, cyt), ex * 2, ey * 2, facecolor=INDIGO2, alpha=0.30,
                                       edgecolor=INDIGO2, linewidth=1.3, zorder=3))
        pts = [(cxb - ex, cyb - ey), (cxb + ex, cyb - ey), (cxt - ex, cyt + ey), (cxt + ex, cyt + ey)]
        if labels.get("r"):
            ax.plot([cxt, cxt + ex], [cyt, cyt], color=INDIGO, linewidth=1.2,
                    linestyle=(0, (3, 2)), zorder=4)
            lab(cxt + ex / 2, cyt + 0.14, labels["r"], va="bottom")
        if labels.get("h"):
            lab(cxb + ex + 0.18, (cyb + cyt) / 2, labels["h"], ha="left")

    elif solid == "cone":
        r = l / 2.0
        ex, ey = r * 1.6, r * 0.62
        cxb, cyb = _iso3(0, 0, 0)
        apex = _iso3(0, h, 0)
        ax.add_patch(plt.Polygon([(cxb - ex, cyb), (cxb + ex, cyb), apex], closed=True,
                                  facecolor=INDIGO2, alpha=0.14, edgecolor="none", zorder=1))
        ax.add_patch(mpatches.Ellipse((cxb, cyb), ex * 2, ey * 2, facecolor=INDIGO2, alpha=0.20,
                                       edgecolor=INDIGO2, linewidth=1.3, zorder=2))
        ax.plot([cxb - ex, apex[0]], [cyb, apex[1]], color=INDIGO2, linewidth=1.5, zorder=3)
        ax.plot([cxb + ex, apex[0]], [cyb, apex[1]], color=INDIGO2, linewidth=1.5, zorder=3)
        pts = [(cxb - ex, cyb - ey), (cxb + ex, cyb - ey), apex]
        if labels.get("r"):
            ax.plot([cxb, cxb + ex], [cyb, cyb], color=INDIGO, linewidth=1.2,
                    linestyle=(0, (3, 2)), zorder=4)
            lab(cxb + ex / 2, cyb + 0.14, labels["r"], va="bottom")
        if labels.get("h"):
            lab(apex[0] + 0.18, (cyb + apex[1]) / 2, labels["h"], ha="left")

    elif solid == "square_pyramid":
        base_pts = [_iso3(0, 0, 0), _iso3(l, 0, 0), _iso3(l, 0, l), _iso3(0, 0, l)]
        apex = _iso3(l / 2, h, l / 2)
        dash(base_pts[0], base_pts[1])
        dash(base_pts[0], base_pts[3])
        alphas = [0.06, 0.24, 0.24, 0.06]
        for i in range(4):
            face([base_pts[i], base_pts[(i + 1) % 4], apex], alphas[i])
        if labels.get("base"):
            x, y = _iso3(l / 2, 0, l + 0.4)
            lab(x, y - 0.05, labels["base"], va="top")
        if labels.get("h"):
            mid = _iso3(l / 2, 0, l / 2)
            ax.plot([mid[0], apex[0]], [mid[1], apex[1]], color=INK, linewidth=1.0,
                    linestyle=(0, (4, 3)), zorder=1)
            lab(apex[0] + 0.18, apex[1], labels["h"], ha="left")

    elif solid == "sphere":
        r = min(l, w, h) / 2.0
        cx, cy = _iso3(0, r, 0)
        ax.add_patch(plt.Circle((cx, cy), r, facecolor=INDIGO2, alpha=0.22,
                                 edgecolor=INDIGO2, linewidth=1.5, zorder=2))
        ax.add_patch(mpatches.Ellipse((cx, cy), r * 2, r * 0.7, facecolor="none",
                                       edgecolor=INDIGO2, linewidth=1.0, linestyle=(0, (4, 3)), zorder=3))
        pts = [(cx - r, cy - r), (cx + r, cy + r)]
        if labels.get("r"):
            ax.plot([cx, cx + r * 0.7], [cy, cy + r * 0.5], color=INDIGO, linewidth=1.2, zorder=4)
            lab(cx + r * 0.78, cy + r * 0.55, labels["r"], ha="left")

    else:
        pts = [(-1, -1), (1, 1)]

    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    padx = (max(xs) - min(xs)) * 0.22 or 0.5
    pady = (max(ys) - min(ys)) * 0.22 or 0.5
    ax.set_xlim(min(xs) - padx, max(xs) + padx)
    ax.set_ylim(min(ys) - pady, max(ys) + pady)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def _draw_boxplot(ax, spec):
    """Render one or more horizontal boxplots from 5-number summaries."""
    groups = spec.get("groups")
    if not groups:
        groups = [{
            "label": spec.get("label", "Data"),
            "stats": spec.get("stats", [10, 20, 30, 40, 50]),
        }]
    lo = spec.get("min", min(g["stats"][0] for g in groups) - 5)
    hi = spec.get("max", max(g["stats"][4] for g in groups) + 5)
    n = len(groups)
    for idx, g in enumerate(groups):
        y = n - idx
        mn, q1, med, q3, mx = g["stats"]
        col = AMBER if idx == 1 else INDIGO2
        # whiskers
        ax.plot([mn, q1], [y, y], color=INK, linewidth=1.3, zorder=2)
        ax.plot([q3, mx], [y, y], color=INK, linewidth=1.3, zorder=2)
        ax.plot([mn, mn], [y - 0.16, y + 0.16], color=INK, linewidth=1.3, zorder=2)
        ax.plot([mx, mx], [y - 0.16, y + 0.16], color=INK, linewidth=1.3, zorder=2)
        # box
        rect = mpatches.Rectangle((q1, y - 0.24), q3 - q1, 0.48,
                                  facecolor=col, alpha=0.22, edgecolor=col,
                                  linewidth=1.5, zorder=3)
        ax.add_patch(rect)
        # median
        ax.plot([med, med], [y - 0.24, y + 0.24], color=INK, linewidth=2.0, zorder=4)
    ax.set_yticks([n - i for i in range(n)])
    ax.set_yticklabels([g.get("label", f"Set {i+1}") for i, g in enumerate(groups)],
                       fontsize=8.5, color=INK)
    ax.set_xlim(lo, hi)
    ax.set_ylim(0.35, n + 0.65)
    ax.tick_params(axis="x", labelsize=8, colors=INK)
    ax.tick_params(axis="y", length=0)
    ax.grid(axis="x", color=GRID, linewidth=0.6, zorder=0)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(INK)
    if spec.get("xlabel"):
        ax.set_xlabel(spec["xlabel"], fontsize=8.5, color=INK)


def _draw_slope_field(ax, spec):
    """Render a direction/slope field for dy/dx = f(x, y)."""
    xmin, xmax = spec.get("xmin", -3), spec.get("xmax", 3)
    ymin, ymax = spec.get("ymin", -3), spec.get("ymax", 3)
    expr = spec.get("expr", "x - y")
    xs = np.linspace(xmin, xmax, 9)
    ys = np.linspace(ymin, ymax, 9)
    seg_len = min(xmax - xmin, ymax - ymin) * 0.045
    eval_env = {"np": np, "sin": np.sin, "cos": np.cos, "exp": np.exp, "sqrt": np.sqrt}
    for xv in xs:
        for yv in ys:
            try:
                m = float(eval(expr, {"__builtins__": {}}, dict(eval_env, x=xv, y=yv)))
                if not np.isfinite(m):
                    continue
                ang = np.arctan(m)
                dx = seg_len * np.cos(ang)
                dy = seg_len * np.sin(ang)
                ax.plot([xv - dx, xv + dx], [yv - dy, yv + dy], color=INDIGO2, linewidth=1.2, zorder=3)
            except Exception:
                continue
    if spec.get("sol_fn"):
        x_curve = np.linspace(xmin, xmax, 400)
        with np.errstate(all="ignore"):
            y_curve = eval(spec["sol_fn"], {"__builtins__": {}}, dict(eval_env, x=x_curve))
        y_curve = np.broadcast_to(np.asarray(y_curve, dtype=float), x_curve.shape)
        y_curve = np.where((y_curve >= ymin - 0.5) & (y_curve <= ymax + 0.5), y_curve, np.nan)
        ax.plot(x_curve, y_curve, color=AMBER, linewidth=1.9, zorder=4)


def _draw_venn(ax, spec):
    """Render a 2-set Venn diagram inside a universal rectangle."""
    ax.add_patch(mpatches.Rectangle((-2.3, -1.45), 4.6, 2.9, fill=True,
                                    facecolor="#f8fafc", edgecolor=INDIGO, linewidth=1.4))
    ax.text(-2.1, 1.22, spec.get("u_label", "$U$"), fontsize=9.5, color=INK, fontweight="bold")
    c1 = mpatches.Circle((-0.65, -0.05), 1.05, facecolor=INDIGO2, alpha=0.16, edgecolor=INDIGO, linewidth=1.6)
    c2 = mpatches.Circle((0.65, -0.05), 1.05, facecolor=AMBER, alpha=0.18, edgecolor=AMBER_TEXT, linewidth=1.6)
    ax.add_patch(c1)
    ax.add_patch(c2)
    ax.text(-1.15, 0.85, spec.get("label_a", "$A$"), fontsize=9.5, color=INDIGO, fontweight="bold", ha="center")
    ax.text(1.15, 0.85, spec.get("label_b", "$B$"), fontsize=9.5, color=AMBER_TEXT, fontweight="bold", ha="center")
    ax.text(-1.05, -0.08, str(spec.get("only_a", "")), fontsize=10, color=INK, fontweight="bold", ha="center", va="center")
    ax.text(0.0, -0.08, str(spec.get("both", "")), fontsize=10, color=INK, fontweight="bold", ha="center", va="center")
    ax.text(1.05, -0.08, str(spec.get("only_b", "")), fontsize=10, color=INK, fontweight="bold", ha="center", va="center")
    if spec.get("neither") is not None:
        ax.text(1.85, -1.15, str(spec.get("neither")), fontsize=9.5, color=MUTED, fontweight="bold", ha="center", va="center")
    ax.set_xlim(-2.45, 2.45)
    ax.set_ylim(-1.6, 1.6)
    ax.set_aspect("equal")
    ax.axis("off")


def _draw_table(ax, spec):
    """Render a clean data table or two-way frequency table."""
    ax.axis("off")
    if spec.get("type") == "two_way_table" or spec.get("cells") is not None:
        col_h = [str(c) for c in spec.get("col_headers", [])]
        row_h = [str(r) for r in spec.get("row_headers", [])]
        cells = spec.get("cells", [])
        r_tot = spec.get("row_totals", [])
        c_tot = spec.get("col_totals", [])
        g_tot = spec.get("grand_total", "")
        headers = [""] + col_h + (["Total"] if r_tot else [])
        rows = []
        for i, rh in enumerate(row_h):
            row_vals = [str(x) for x in (cells[i] if i < len(cells) else [])]
            if r_tot and i < len(r_tot):
                row_vals.append(str(r_tot[i]))
            rows.append([rh] + row_vals)
        if c_tot:
            tot_row = ["Total"] + [str(x) for x in c_tot]
            if r_tot:
                tot_row.append(str(g_tot))
            rows.append(tot_row)
    else:
        headers = [str(h) for h in spec.get("headers", ["$x$", "$y$"])]
        rows = [[str(c) for c in r] for r in spec.get("rows", [])]

    if not rows:
        return
    if spec.get("title"):
        ax.set_title(str(spec["title"]), fontsize=9, fontweight="bold", color=INK, pad=6)
    tbl = ax.table(cellText=rows, colLabels=headers, loc="center", cellLoc="center")
    tbl.auto_set_font_size(False)
    tbl.set_fontsize(8.5)
    tbl.scale(1.0, 1.32)
    n_rows = len(rows)
    n_cols = len(headers)
    for (r, c), cell in tbl.get_celld().items():
        cell.set_edgecolor(BORDER)
        cell.set_linewidth(0.8)
        if r == 0:
            cell.set_facecolor("#eef2ff")
            cell.get_text().set_color(INDIGO)
            cell.get_text().set_weight("bold")
        elif c == 0 and (spec.get("type") == "two_way_table" or spec.get("cells") is not None):
            cell.set_facecolor("#f8fafc")
            cell.get_text().set_color(INK)
            cell.get_text().set_weight("bold")
        elif (spec.get("type") == "two_way_table" or spec.get("cells") is not None) and (r == n_rows or c == n_cols - 1):
            cell.set_facecolor("#f8fafc")
            cell.get_text().set_color(INK)
            cell.get_text().set_weight("bold")
        else:
            cell.set_facecolor("white")
            cell.get_text().set_color(INK)


def _draw_transversal(ax, spec):
    """Render two parallel lines cut by a transversal with labeled angles."""
    ax.plot([-2.4, 2.4], [0.85, 0.85], color=INDIGO, linewidth=1.8, zorder=3)
    ax.plot([-2.4, 2.4], [-0.85, -0.85], color=INDIGO, linewidth=1.8, zorder=3)
    # Parallel line markers
    ax.annotate("", xy=(1.75, 0.85), xytext=(1.45, 0.85),
                arrowprops=dict(arrowstyle="->", color=INDIGO, lw=1.4))
    ax.annotate("", xy=(1.75, -0.85), xytext=(1.45, -0.85),
                arrowprops=dict(arrowstyle="->", color=INDIGO, lw=1.4))
    ax.text(-2.25, 0.98, "$\\ell_1$", fontsize=9.5, color=INDIGO, fontweight="bold")
    ax.text(-2.25, -0.72, "$\\ell_2$", fontsize=9.5, color=INDIGO, fontweight="bold")
    # Transversal line passing through (-0.45, -0.85) and (0.45, 0.85)
    ax.plot([-0.85, 0.85], [-1.6, 1.6], color=INDIGO2, linewidth=1.7, zorder=4)
    ax.text(0.92, 1.48, "$t$", fontsize=9.5, color=INDIGO2, fontweight="bold")
    a1 = str(spec.get("angle1", ""))
    a2 = str(spec.get("angle2", ""))
    rel = spec.get("rel", "cointerior")
    # Upper intersection at (0.45, 0.85), lower intersection at (-0.45, -0.85)
    arc1 = mpatches.Arc((0.45, 0.85), 0.72, 0.72, angle=0, theta1=0, theta2=62, color=AMBER, linewidth=1.4, zorder=5)
    ax.add_patch(arc1)
    ax.text(1.08, 1.12, f"${a1}$" if a1 and "$" not in a1 else a1, fontsize=8.5, color=AMBER_TEXT, fontweight="bold", ha="left", va="center")
    if rel == "corresponding":
        arc2 = mpatches.Arc((-0.45, -0.85), 0.72, 0.72, angle=0, theta1=0, theta2=62, color=CURVE, linewidth=1.4, zorder=5)
        ax.add_patch(arc2)
        ax.text(0.22, -0.58, f"${a2}$" if a2 and "$" not in a2 else a2, fontsize=8.5, color=CURVE, fontweight="bold", ha="left", va="center")
    elif rel == "alternate":
        arc2 = mpatches.Arc((-0.45, -0.85), 0.72, 0.72, angle=0, theta1=180, theta2=242, color=CURVE, linewidth=1.4, zorder=5)
        ax.add_patch(arc2)
        ax.text(-1.08, -1.12, f"${a2}$" if a2 and "$" not in a2 else a2, fontsize=8.5, color=CURVE, fontweight="bold", ha="right", va="center")
    else:
        arc2 = mpatches.Arc((-0.45, -0.85), 0.72, 0.72, angle=0, theta1=0, theta2=62, color=CURVE, linewidth=1.4, zorder=5)
        ax.add_patch(arc2)
        ax.text(0.22, -0.58, f"${a2}$" if a2 and "$" not in a2 else a2, fontsize=8.5, color=CURVE, fontweight="bold", ha="left", va="center")
    ax.set_xlim(-2.6, 2.6)
    ax.set_ylim(-1.75, 1.75)
    ax.set_aspect("equal")
    ax.axis("off")


def _shape_if_ar(txt):
    s = str(txt)
    if re.search(r"[\u0600-\u06FF]", s) and "$" not in s and r"\(" not in s:
        return shape_ar(s)
    return s


def _py_expr(expr):
    s = str(expr or "0").strip()
    s = re.sub(r"\bMath\.PI\b", "pi", s)
    s = re.sub(r"\bMath\.E\b", "e", s)
    s = re.sub(r"\bMath\.", "", s)
    s = s.replace("^", "**")
    s = re.sub(r"\bln\s*\(", "log(", s)
    s = re.sub(r"(\d)([a-zA-Z(])", r"\1*\2", s)
    return s


def _normalize_fig_spec(raw):
    if not isinstance(raw, dict):
        return {}
    s = dict(raw)
    t = s.get("type", "plot")
    alias = {
        "fn": "plot", "function_graph": "plot", "axes": "plot", "graph": "plot",
        "functionGraph": "plot", "fn_graph": "plot",
        "bar": "bars", "bar_chart": "bars", "barChart": "bars",
        "box_plot": "boxplot", "boxPlot": "boxplot",
        "geometry_2d": "polygon", "geometry_3d": "solid", "geom3d": "solid",
        "number_line": "numberline", "numberLine": "numberline",
        "polarGraph": "polar_graph", "polar": "polar_graph",
        "groupedBar": "grouped_bar", "multiLine": "multi_line",
        "normalCurve": "normal_curve", "normal": "normal_curve",
        "dotPlot": "dot_plot", "scatter_plot": "scatter",
        "conic": "conic_section", "qudrat_shaded": "shaded_region",
        "twoWayTable": "two_way_table",
    }
    s["type"] = alias.get(t, t)
    if isinstance(s.get("xl"), (list, tuple)) and len(s["xl"]) == 2:
        s.setdefault("xmin", s["xl"][0])
        s.setdefault("xmax", s["xl"][1])
    elif isinstance(s.get("xrange"), (list, tuple)) and len(s["xrange"]) == 2:
        s.setdefault("xmin", s["xrange"][0])
        s.setdefault("xmax", s["xrange"][1])
    if isinstance(s.get("yl"), (list, tuple)) and len(s["yl"]) == 2:
        s.setdefault("ymin", s["yl"][0])
        s.setdefault("ymax", s["yl"][1])
    elif isinstance(s.get("yrange"), (list, tuple)) and len(s["yrange"]) == 2:
        s.setdefault("ymin", s["yrange"][0])
        s.setdefault("ymax", s["yrange"][1])
    if s["type"] == "plot":
        fns_norm = []
        for f in s.get("fns", []):
            if isinstance(f, dict):
                fns_norm.append(_py_expr(f.get("expr") or f.get("fn") or "x"))
            else:
                fns_norm.append(_py_expr(f))
        s["fns"] = fns_norm
        raw_pts = []
        if isinstance(s.get("points"), list):
            raw_pts.extend(s["points"])
        if isinstance(s.get("pts"), list):
            raw_pts.extend(s["pts"])
        pts_plain = []
        pt_lbls = list(s.get("point_labels") or [])
        for p in raw_pts:
            if isinstance(p, dict):
                px = float(p.get("x", 0))
                py = float(p.get("y", 0))
                if p.get("label"):
                    pt_lbls.append({"x": px, "y": py, "label": p["label"]})
                else:
                    pts_plain.append([px, py])
            elif isinstance(p, (list, tuple)) and len(p) >= 2:
                pts_plain.append([float(p[0]), float(p[1])])
        s["points"] = pts_plain
        s["point_labels"] = pt_lbls
        if isinstance(s.get("asymptotes"), list):
            vx, hy, sl = [], [], []
            for a in s["asymptotes"]:
                if isinstance(a, dict):
                    if a.get("type") == "h":
                        hy.append(a["v"])
                    elif a.get("type") == "s":
                        sl.append((a.get("m", 0), a.get("b", 0)))
                    else:
                        vx.append(a["v"])
            s["asymptotes"] = {"x": vx, "y": hy, "slant": sl}
    elif s["type"] == "triangle" and not s.get("vertices"):
        coords = s.get("coords")
        if not coords:
            coords = [[0, 0], [4, 0], [0, 3] if s.get("rightAngle") else [1.6, 3.2]]
        s["vertices"] = coords
        if s.get("verts") and not s.get("labels"):
            s["labels"] = s["verts"]
        if s.get("sides") and not s.get("side_labels"):
            s["side_labels"] = s["sides"]
        if s.get("rightAngle") and s.get("right_angle_at") is None:
            verts = s.get("labels") or ["A", "B", "C"]
            s["right_angle_at"] = verts.index(s["rightAngle"]) if s["rightAngle"] in verts else 0
    elif s["type"] == "circle":
        if s.get("r") is not None and s.get("radius") is None:
            s["radius"] = s["r"]
        if s.get("centerLabel") and not s.get("center_label"):
            s["center_label"] = s["centerLabel"]
        if s.get("radiusLabel") and not s.get("radius_label"):
            s["radius_label"] = s["radiusLabel"]
        if s.get("centralDeg") is not None and not s.get("sector"):
            s["sector"] = {"start_deg": 0, "end_deg": float(s["centralDeg"]), "label": s.get("angleLabel", "")}
    elif s["type"] == "bars":
        if s.get("labels") and not s.get("categories"):
            s["categories"] = s["labels"]
        if isinstance(s.get("data"), list):
            if s["data"] and isinstance(s["data"][0], dict):
                if not s.get("categories"):
                    s["categories"] = [str(d.get("label", "")) for d in s["data"]]
                if s.get("values") is None:
                    s["values"] = [float(d.get("val") if d.get("val") is not None else d.get("value", 0)) for d in s["data"]]
            elif s.get("values") is None:
                s["values"] = [
                    float(v) if isinstance(v, (int, float)) or str(v).replace(".", "", 1).lstrip("-").isdigit() else 0.0
                    for v in s["data"]
                ]
        if not s.get("categories") and isinstance(s.get("values"), list):
            s["categories"] = [f"C{i + 1}" for i in range(len(s["values"]))]
        if s.get("values") is None:
            s["values"] = [0.0 for _ in s.get("categories", [])]
    elif s["type"] == "boxplot" and s.get("boxes") and not s.get("groups"):
        s["groups"] = [
            {"label": b.get("label", ""), "stats": [b["min"], b["q1"], b["med"], b["q3"], b["max"]]}
            for b in s["boxes"]
        ]
    elif s["type"] == "solid" and s.get("shape") and not s.get("solid"):
        sh = s["shape"]
        s["solid"] = {"prism": "rectangular_prism", "pyramid": "square_pyramid"}.get(sh, sh)
        if not s.get("dims"):
            r = s.get("r")
            l = s.get("w") or ((2 * r) if r else 4)
            w = s.get("d") or l
            h = s.get("h") or l
            s["dims"] = [l, w, h]
    elif s["type"] in ("polygon", "rect"):
        if isinstance(s.get("sides"), int) and s["sides"] >= 3:
            n_sides = s.pop("sides")
            if not s.get("vertices"):
                s["vertices"] = [
                    [round(2.2 * float(np.cos(2 * np.pi * kk / n_sides + np.pi / 2)), 4),
                     round(2.2 * float(np.sin(2 * np.pi * kk / n_sides + np.pi / 2)), 4)]
                    for kk in range(n_sides)
                ]
            if not isinstance(s.get("side_labels"), list):
                s["side_labels"] = []
        elif not s.get("vertices"):
            w = float(s.get("w") or 5)
            h = float(s.get("h") or 3)
            s["vertices"] = [[0, 0], [w, 0], [w, h], [0, h]]
            if isinstance(s.get("sides"), list) and not s.get("side_labels"):
                s["side_labels"] = s["sides"]
    elif s["type"] == "slope_field" and s.get("dydx") and not s.get("expr"):
        s["expr"] = _py_expr(s["dydx"])
    return s


def _draw_polar_graph(ax, spec):
    rmax = float(spec.get("rMax") or 4)
    ax.set_xlim(-rmax * 1.18, rmax * 1.18)
    ax.set_ylim(-rmax * 1.18, rmax * 1.18)
    ax.set_aspect("equal")
    ax.axis("off")
    for r in range(1, max(2, int(round(rmax))) + 1):
        rr = rmax * r / max(2, int(round(rmax)))
        ax.add_patch(plt.Circle((0, 0), rr, fill=False, edgecolor=GRID, linewidth=0.8))
    for deg in range(0, 360, int(spec.get("thetaStepDeg") or 30)):
        rad = np.radians(deg)
        ax.plot([0, rmax * np.cos(rad)], [0, rmax * np.sin(rad)], color=GRID, linewidth=0.7)
    ax.plot([-rmax * 1.1, rmax * 1.1], [0, 0], color=INK, linewidth=1.1)
    ax.plot([0, 0], [-rmax * 1.1, rmax * 1.1], color=INK, linewidth=1.1)
    cols = [INDIGO2, AMBER, CURVE]
    curves = spec.get("curves") or [{"rExpr": spec.get("rExpr", "2")}]
    for i, cv in enumerate(curves):
        t0, t1 = float(cv.get("tMin", 0)), float(cv.get("tMax", 2 * np.pi))
        t = np.linspace(t0, t1, 360)
        expr = _py_expr(cv.get("rExpr") or cv.get("expr") or "2").replace("theta", "t")
        env = {"t": t, "np": np, "sin": np.sin, "cos": np.cos, "tan": np.tan, "sqrt": np.sqrt, "abs": np.abs, "pi": np.pi, "e": np.e}
        with np.errstate(all="ignore"):
            rv = np.broadcast_to(np.asarray(eval(expr, {"__builtins__": {}}, env), dtype=float), t.shape)
        ax.plot(rv * np.cos(t), rv * np.sin(t), color=cols[i % len(cols)], linewidth=1.8)


def _draw_normal_curve(ax, spec):
    mu = float(spec.get("mean", spec.get("mu", 0)))
    sd = max(1e-6, float(spec.get("sd", spec.get("sigma", 1))))
    xs = np.linspace(mu - 3.6 * sd, mu + 3.6 * sd, 320)
    ys = np.exp(-0.5 * ((xs - mu) / sd) ** 2) / (sd * np.sqrt(2 * np.pi))
    ax.plot(xs, ys, color=INDIGO, linewidth=1.8)
    sr = spec.get("shadeRange")
    if isinstance(sr, (list, tuple)) and len(sr) == 2:
        mask = (xs >= float(sr[0])) & (xs <= float(sr[1]))
        ax.fill_between(xs[mask], 0, ys[mask], color=AMBER, alpha=0.28)
    ax.set_yticks([])
    xticks = [mu + k * sd for k in (-3, -2, -1, 0, 1, 2, 3)]
    ax.set_xticks(xticks)
    ax.set_xticklabels([f"{v:g}" for v in xticks], fontsize=7.5, color=INK)
    for sp in ("top", "right", "left"):
        ax.spines[sp].set_visible(False)
    ax.spines["bottom"].set_color(INK)


def _draw_histogram(ax, spec):
    bins = spec.get("bins", [])
    labels = [_shape_if_ar(b.get("label", "")) for b in bins]
    counts = [float(b.get("count", 0)) for b in bins]
    xs = np.arange(len(labels))
    ax.bar(xs, counts, width=0.96, color=INDIGO2, alpha=0.82, edgecolor=INDIGO, linewidth=1.1, zorder=3)
    ax.set_xticks(xs)
    ax.set_xticklabels(labels, fontsize=8, color=INK)
    ax.grid(axis="y", color=GRID, linewidth=0.6, zorder=0)
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)


def _draw_dot_plot(ax, spec):
    counts = spec.get("counts", {})
    if not counts and isinstance(spec.get("data"), list):
        counts = {}
        for v in spec["data"]:
            counts[v] = counts.get(v, 0) + 1
    vals = sorted((float(k), int(v)) for k, v in counts.items())
    for xv, cnt in vals:
        for k in range(1, cnt + 1):
            ax.plot([xv], [k], "o", color=INDIGO2, markersize=6)
    ax.set_xticks([v[0] for v in vals])
    ax.set_yticks([])
    max_c = max([v[1] for v in vals] or [3])
    ax.set_ylim(0.2, max_c + 1.0)
    for sp in ("top", "right", "left"):
        ax.spines[sp].set_visible(False)


def _draw_scatter(ax, spec):
    pts = spec.get("pts", [])
    xs = [float(p[0]) for p in pts]
    ys = [float(p[1]) for p in pts]
    ax.scatter(xs, ys, color=INDIGO2, s=22, zorder=4)
    line = spec.get("line")
    if isinstance(line, dict) and line.get("m") is not None:
        x0, x1 = min(xs), max(xs)
        m, b = float(line["m"]), float(line.get("b", 0))
        ax.plot([x0, x1], [m * x0 + b, m * x1 + b], color=AMBER, linewidth=1.6, zorder=5)
    ax.grid(True, color=GRID, linewidth=0.6)
    if spec.get("xLabel"):
        ax.set_xlabel(_shape_if_ar(spec["xLabel"]), fontsize=8.5, color=INK)
    if spec.get("yLabel"):
        ax.set_ylabel(_shape_if_ar(spec["yLabel"]), fontsize=8.5, color=INK)


def _draw_pie(ax, spec):
    slices = spec.get("slices", [])
    vals = [max(0.0, float(sl.get("value", 0))) for sl in slices]
    lbls = [_shape_if_ar(sl.get("label", "")) for sl in slices]
    cols = [INDIGO2, AMBER, CURVE, "#6366f1", "#64748b"]
    ax.pie(vals, labels=lbls, autopct="%1.0f%%", colors=[cols[i % len(cols)] for i in range(len(vals))],
           textprops={"fontsize": 8, "color": INK}, startangle=90)
    ax.set_aspect("equal")


def _draw_grouped_bar(ax, spec):
    cats = [_shape_if_ar(c) for c in spec.get("categories", [])]
    series = spec.get("series", [])
    xs = np.arange(len(cats))
    cols = [INDIGO2, AMBER, CURVE]
    if spec.get("type") == "multi_line":
        for i, sr in enumerate(series):
            ax.plot(xs, sr.get("values", []), marker="o", color=cols[i % len(cols)], linewidth=1.8, label=_shape_if_ar(sr.get("name", "")))
    else:
        n = max(1, len(series))
        bw = 0.72 / n
        for i, sr in enumerate(series):
            offset = (i - (n - 1) / 2.0) * bw
            ax.bar(xs + offset, sr.get("values", []), width=bw * 0.92, color=cols[i % len(cols)], label=_shape_if_ar(sr.get("name", "")), zorder=3)
    ax.set_xticks(xs)
    ax.set_xticklabels(cats, fontsize=8, color=INK)
    ax.grid(axis="y", color=GRID, linewidth=0.6, zorder=0)
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    ax.legend(fontsize=7.5, frameon=False)


def _draw_sinusoid(ax, spec):
    A = float(spec.get("amp", 1))
    B = float(spec.get("freq", 1))
    C = float(spec.get("phase", 0))
    D = float(spec.get("midline", 0))
    xmin, xmax = spec.get("xmin", 0), spec.get("xmax", 2 * np.pi / max(abs(B), 1e-3))
    ymin = D - abs(A) * 1.4 - 0.5
    ymax = D + abs(A) * 1.4 + 0.5
    ax.set_xlim(xmin, xmax)
    ax.set_ylim(ymin, ymax)
    x = np.linspace(xmin, xmax, 360)
    y = D + A * (np.cos(B * (x - C)) if spec.get("fnType") == "cos" else np.sin(B * (x - C)))
    ax.plot(x, y, color=CURVE, linewidth=1.9)
    ax.axhline(D, color=AMBER, linewidth=1.0, linestyle="--")
    ax.axhline(0, color=INK, linewidth=0.9)
    ax.axvline(0, color=INK, linewidth=0.9)
    ax.grid(True, color=GRID, linewidth=0.6)


def _draw_conic_section(ax, spec):
    conic = spec.get("conic", "parabola")
    h, k = float(spec.get("h", 0)), float(spec.get("k", 0))
    a, b = float(spec.get("a", 3)), float(spec.get("b", 2))
    p = float(spec.get("p", 1))
    if conic == "ellipse":
        t = np.linspace(0, 2 * np.pi, 320)
        ax.plot(h + a * np.cos(t), k + b * np.sin(t), color=CURVE, linewidth=1.9)
    elif conic == "circle":
        t = np.linspace(0, 2 * np.pi, 320)
        ax.plot(h + a * np.cos(t), k + a * np.sin(t), color=CURVE, linewidth=1.9)
    elif conic == "hyperbola":
        t = np.linspace(-1.4, 1.4, 200)
        ax.plot(h + a * np.cosh(t), k + b * np.sinh(t), color=CURVE, linewidth=1.9)
        ax.plot(h - a * np.cosh(t), k + b * np.sinh(t), color=CURVE, linewidth=1.9)
    else:
        t = np.linspace(-3, 3, 240)
        if spec.get("orientation") == "horizontal":
            ax.plot(h + t ** 2 / (4 * p), k + t, color=CURVE, linewidth=1.9)
        else:
            ax.plot(h + t, k + t ** 2 / (4 * p), color=CURVE, linewidth=1.9)
    ax.axhline(0, color=INK, linewidth=0.9)
    ax.axvline(0, color=INK, linewidth=0.9)
    ax.grid(True, color=GRID, linewidth=0.6)
    ax.set_aspect("equal")


def _draw_unit_circle(ax, spec):
    t = np.linspace(0, 2 * np.pi, 300)
    ax.plot(np.cos(t), np.sin(t), color=INDIGO, linewidth=1.6)
    ax.axhline(0, color=INK, linewidth=0.9)
    ax.axvline(0, color=INK, linewidth=0.9)
    for ang in spec.get("angles", []):
        deg = float(ang.get("deg", 30)) if isinstance(ang, dict) else float(ang)
        rad = np.radians(deg)
        cx, cy = np.cos(rad), np.sin(rad)
        ax.plot([0, cx], [0, cy], color=AMBER, linewidth=1.6)
        ax.plot([cx], [cy], "o", color=AMBER, markersize=4.5)
    ax.set_xlim(-1.3, 1.3)
    ax.set_ylim(-1.3, 1.3)
    ax.set_aspect("equal")


def render_figure(raw_spec):
    """Render a figure spec to PNG; return (path, w_pt, h_pt)."""
    spec = _normalize_fig_spec(raw_spec)
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = hashlib.sha1(json.dumps(spec, sort_keys=True).encode()).hexdigest()[:16]
    path = os.path.join(CACHE_DIR, "fig_" + key + ".png")
    ftype = spec.get("type", "plot")
    if not os.path.exists(path):
        fig = None
        try:
            if ftype == "plot":
                fig, ax = _fig_axes(spec)
                colors = [CURVE, INDIGO2, AMBER]
                xmin, xmax = spec.get("xmin", -5), spec.get("xmax", 5)
                ymin, ymax = spec.get("ymin", -5), spec.get("ymax", 5)
                x = np.linspace(xmin, xmax, 600)
                eval_env = {"x": x, "np": np, "sin": np.sin, "cos": np.cos,
                            "tan": np.tan, "exp": np.exp, "log": np.log,
                            "sqrt": np.sqrt, "abs": np.abs, "pow": np.power,
                            "pi": np.pi, "e": np.e,
                            "a": 1.0, "b": 1.0, "c": 1.0, "C": 5.0, "k": 1.0, "m": 1.0}
                if spec.get("setup"):
                    for var_k, var_v in re.findall(r"\b([A-Za-z_]\w*)\s*=\s*(-?\d+(?:\.\d+)?)", str(spec["setup"])):
                        eval_env[var_k] = float(var_v)
                if spec.get("riemann"):
                    rm = spec["riemann"]
                    ra, rb, rn = float(rm.get("a", 0)), float(rm.get("b", 4)), max(1, int(rm.get("n", 4)))
                    dx = (rb - ra) / rn
                    rfn = _py_expr(rm.get("expr") or (spec.get("fns")[0] if spec.get("fns") else "0"))
                    rule = rm.get("rule", "left")
                    for ri in range(rn):
                        rx1, rx2 = ra + ri * dx, ra + (ri + 1) * dx
                        if rule == "trap":
                            y1 = float(eval(rfn, {"__builtins__": {}}, dict(eval_env, x=rx1)))
                            y2 = float(eval(rfn, {"__builtins__": {}}, dict(eval_env, x=rx2)))
                            ax.add_patch(plt.Polygon([(rx1, 0), (rx1, y1), (rx2, y2), (rx2, 0)], closed=True, facecolor=INDIGO2, alpha=0.18, edgecolor=INDIGO2, linewidth=1.1, zorder=2))
                        else:
                            xsamp = rx2 if rule == "right" else (0.5 * (rx1 + rx2) if rule == "midpoint" else rx1)
                            yh = float(eval(rfn, {"__builtins__": {}}, dict(eval_env, x=xsamp)))
                            ax.add_patch(mpatches.Rectangle((rx1, min(0, yh)), dx, abs(yh), facecolor=INDIGO2, alpha=0.18, edgecolor=INDIGO2, linewidth=1.1, zorder=2))
                for i, fn in enumerate(spec.get("fns", [])):
                    with np.errstate(all="ignore"):
                        y = eval(fn, {"__builtins__": {}}, eval_env)
                    y = np.broadcast_to(np.asarray(y, dtype=float), x.shape)
                    y = np.where((y > ymin - 2) & (y < ymax + 2), y, np.nan)
                    style = "--" if i >= 2 and spec.get("dashed_last") else "-"
                    ax.plot(x, y, color=colors[i % len(colors)], linewidth=1.8, linestyle=style)
                for seg in spec.get("segments", []):
                    ax.plot([seg["x1"], seg["x2"]], [seg["y1"], seg["y2"]],
                            color=seg.get("color", INDIGO2), linewidth=1.9,
                            linestyle="--" if seg.get("dash") else "-")
                for sc in spec.get("semicircles", []):
                    cx_sc, cy_sc, r_sc = float(sc["cx"]), float(sc["cy"]), float(sc["r"])
                    tx = np.linspace(cx_sc - r_sc, cx_sc + r_sc, 200)
                    dy_sc = np.sqrt(np.maximum(0.0, r_sc ** 2 - (tx - cx_sc) ** 2))
                    ty = cy_sc + dy_sc if sc.get("upper", True) else cy_sc - dy_sc
                    ax.plot(tx, ty, color=sc.get("color", INDIGO2), linewidth=1.9)
                    if sc.get("shade"):
                        ax.fill_between(tx, cy_sc, ty, color=sc.get("color", INDIGO2), alpha=0.14)
                if spec.get("shade"):
                    sh = spec["shade"]
                    xs = np.linspace(sh.get("x0", xmin), sh.get("x1", xmax), 300)
                    sh_env = dict(eval_env, x=xs)
                    with np.errstate(all="ignore"):
                        y1 = np.broadcast_to(np.asarray(eval(sh.get("fn1", "0"), {"__builtins__": {}}, sh_env), dtype=float), xs.shape)
                        y2 = np.broadcast_to(np.asarray(eval(sh.get("fn2", "0"), {"__builtins__": {}}, sh_env), dtype=float), xs.shape)
                    ax.fill_between(xs, y1, y2, color=CURVE, alpha=0.18, zorder=2)
                if spec.get("asymptotes"):
                    asym = spec["asymptotes"]
                    for vx in asym.get("x", []):
                        ax.axvline(vx, color=AMBER, linewidth=1.1, linestyle=(0, (4, 3)), zorder=2)
                    for hy in asym.get("y", []):
                        ax.axhline(hy, color=AMBER, linewidth=1.1, linestyle=(0, (4, 3)), zorder=2)
                    for mm, bb in asym.get("slant", []):
                        ax.plot([xmin, xmax], [mm * xmin + bb, mm * xmax + bb], color=AMBER, linewidth=1.1, linestyle=(0, (4, 3)), zorder=2)
                for pt in spec.get("scatter_pts", []):
                    sx, sy = (pt["x"], pt["y"]) if isinstance(pt, dict) else (pt[0], pt[1])
                    ax.plot([sx], [sy], "o", color=AMBER, markersize=4.2, alpha=0.88, zorder=4)
                for pt in spec.get("points", []):
                    px, py = (pt["x"], pt["y"]) if isinstance(pt, dict) else (pt[0], pt[1])
                    ax.plot([px], [py], "o", color=INDIGO, markersize=4.5, zorder=5)
                for pl in spec.get("point_labels", []):
                    px, py = pl["x"], pl["y"]
                    dx, dy = pl.get("dx", 0.25), pl.get("dy", 0.35)
                    ax.plot([px], [py], "o", color=INDIGO, markersize=4.5, zorder=5)
                    ax.text(px + dx, py + dy, pl["label"], fontsize=8, color=INK,
                            ha="left" if dx >= 0 else "right", va="bottom" if dy >= 0 else "top",
                            bbox=dict(boxstyle="round,pad=0.15", facecolor="white", edgecolor="none", alpha=0.8))
            elif ftype == "shaded_region":
                sh_spec = dict(spec)
                sh_spec["fns"] = [_py_expr(spec.get("upper", "x")), _py_expr(spec.get("lower", "0"))]
                fig, ax = _fig_axes(sh_spec)
                xmin, xmax = sh_spec.get("xmin", -1), sh_spec.get("xmax", 5)
                x = np.linspace(xmin, xmax, 400)
                env = {"x": x, "np": np, "sin": np.sin, "cos": np.cos, "exp": np.exp, "log": np.log, "sqrt": np.sqrt}
                y1 = np.broadcast_to(np.asarray(eval(sh_spec["fns"][0], {"__builtins__": {}}, env), dtype=float), x.shape)
                y2 = np.broadcast_to(np.asarray(eval(sh_spec["fns"][1], {"__builtins__": {}}, env), dtype=float), x.shape)
                ax.plot(x, y1, color=CURVE, linewidth=1.8)
                ax.plot(x, y2, color=INDIGO2, linewidth=1.6)
                mask = (x >= float(spec.get("a", 0))) & (x <= float(spec.get("b", 2)))
                ax.fill_between(x[mask], y1[mask], y2[mask], color=AMBER, alpha=0.22)
            elif ftype == "polar_graph":
                fig, ax = plt.subplots(figsize=(3.0, 3.0))
                _draw_polar_graph(ax, spec)
            elif ftype == "sinusoid":
                fig, ax = plt.subplots(figsize=(3.4, 2.3))
                _draw_sinusoid(ax, spec)
            elif ftype == "conic_section":
                fig, ax = plt.subplots(figsize=(3.0, 2.8))
                _draw_conic_section(ax, spec)
            elif ftype == "unit_circle":
                fig, ax = plt.subplots(figsize=(2.8, 2.8))
                _draw_unit_circle(ax, spec)
            elif ftype == "normal_curve":
                fig, ax = plt.subplots(figsize=(3.5, 2.1))
                _draw_normal_curve(ax, spec)
            elif ftype == "histogram":
                fig, ax = plt.subplots(figsize=(3.5, 2.4))
                _draw_histogram(ax, spec)
            elif ftype == "dot_plot":
                fig, ax = plt.subplots(figsize=(3.5, 1.9))
                _draw_dot_plot(ax, spec)
            elif ftype == "scatter":
                fig, ax = plt.subplots(figsize=(3.3, 2.4))
                _draw_scatter(ax, spec)
            elif ftype == "pie":
                fig, ax = plt.subplots(figsize=(3.0, 2.6))
                _draw_pie(ax, spec)
            elif ftype in ("grouped_bar", "multi_line"):
                fig, ax = plt.subplots(figsize=(3.6, 2.4))
                _draw_grouped_bar(ax, spec)
            elif ftype == "triangle":
                fig, ax = _geom_fig(spec["vertices"])
                _draw_triangle(ax, spec)
            elif ftype == "circle":
                r = spec.get("radius", 1)
                if isinstance(r, str):
                    nums = re.findall(r"\d+(?:\.\d+)?", r)
                    r = float(nums[0]) if nums else 1.0
                r = float(r) if float(r) > 0 else 1.0
                c_val = spec.get("center", [0, 0])
                cx, cy = (float(c_val[0]), float(c_val[1])) if isinstance(c_val, (list, tuple)) and len(c_val) == 2 else (0.0, 0.0)
                fig, ax = _geom_fig([(cx - r, cy - r), (cx + r, cy + r)], pad_frac=0.3)
                _draw_circle(ax, spec)
            elif ftype in ("polygon", "rect"):
                fig, ax = _geom_fig(spec["vertices"])
                _draw_polygon(ax, spec)
            elif ftype == "numberline":
                fig, ax = plt.subplots(figsize=(3.6, 0.95))
                _draw_numberline(ax, spec)
            elif ftype == "bars":
                fig, ax = plt.subplots(figsize=(3.5, 2.5))
                spec["categories"] = [_shape_if_ar(c) for c in spec.get("categories", [])]
                _draw_bars(ax, spec)
            elif ftype == "boxplot":
                n_g = len(spec.get("groups", [1]))
                fig, ax = plt.subplots(figsize=(3.6, 1.15 + 0.55 * n_g))
                _draw_boxplot(ax, spec)
            elif ftype == "solid":
                fig, ax = _draw_solid(spec)
            elif ftype == "slope_field":
                fig, ax = _fig_axes(spec)
                _draw_slope_field(ax, spec)
            elif ftype == "venn":
                fig, ax = plt.subplots(figsize=(3.2, 2.1))
                _draw_venn(ax, spec)
            elif ftype in ("table", "two_way_table"):
                norm_tbl = dict(spec)
                if ftype == "two_way_table" and isinstance(norm_tbl.get("data"), list) and isinstance(norm_tbl.get("rows"), list) and isinstance(norm_tbl.get("cols"), list):
                    norm_tbl["headers"] = [_shape_if_ar(norm_tbl.get("corner", ""))] + [_shape_if_ar(c) for c in norm_tbl["cols"]]
                    norm_tbl["rows"] = [[_shape_if_ar(norm_tbl["rows"][ri])] + [_shape_if_ar(v) for v in norm_tbl["data"][ri]] for ri in range(len(norm_tbl["rows"]))]
                    norm_tbl["type"] = "table"
                else:
                    if norm_tbl.get("headers"):
                        norm_tbl["headers"] = [_shape_if_ar(h) for h in norm_tbl["headers"]]
                    if norm_tbl.get("rows"):
                        norm_tbl["rows"] = [[_shape_if_ar(c) for c in r] for r in norm_tbl["rows"]]
                n_r = len(norm_tbl.get("rows", norm_tbl.get("row_headers", [1, 2, 3]))) + (2 if norm_tbl.get("col_totals") else 1)
                n_c = len(norm_tbl.get("headers", norm_tbl.get("col_headers", [1, 2]))) + (2 if norm_tbl.get("cells") is not None else 0)
                fig, ax = plt.subplots(figsize=(max(2.6, min(4.8, 0.95 * n_c)), max(1.3, 0.34 * n_r + 0.35)))
                _draw_table(ax, norm_tbl)
            elif ftype == "transversal":
                fig, ax = plt.subplots(figsize=(3.4, 2.15))
                _draw_transversal(ax, spec)
            else:
                fig, ax = _fig_axes(spec)
        except Exception as err:
            if fig is not None:
                plt.close(fig)
            raise RuntimeError(f"Figure rendering failed for type='{ftype}': {err}") from err
        tmp_fig = os.path.join(CACHE_DIR, f"fig_{key}.{os.getpid()}.png")
        fig.savefig(tmp_fig, dpi=200, bbox_inches="tight",
                    facecolor="white", pad_inches=0.05, format="png")
        plt.close(fig)
        os.replace(tmp_fig, path)
    from PIL import Image as PILImage
    with PILImage.open(path) as im:
        px_w, px_h = im.size
    is_wide = ftype in ("table", "two_way_table", "numberline")
    max_w = 245.0 if is_wide else 215.0
    max_h = 160.0
    disp_w = min(float(spec.get("width", 225.0 if is_wide else 205.0)), max_w)
    disp_h = disp_w * px_h / max(px_w, 1)
    if disp_h > max_h:
        disp_w = disp_w * (max_h / disp_h)
        disp_h = max_h
    return path, disp_w, disp_h


# ── Styles ───────────────────────────────────────────────────────────────────
S_TITLE = ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=15,
                         leading=19, textColor=HexColor(INK))
S_TAG = ParagraphStyle("tag", fontName="Helvetica-Bold", fontSize=8.5,
                       leading=11, textColor=HexColor(AMBER))
S_HEAD = ParagraphStyle("head", fontName="Helvetica-Bold", fontSize=12.5,
                        leading=16, textColor=HexColor(INK), spaceBefore=6)
S_BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=10, leading=18,
                        textColor=HexColor(INK), alignment=TA_LEFT)
S_QNUM = ParagraphStyle("qnum", fontName="Helvetica-Bold", fontSize=10,
                        leading=18, textColor=HexColor(INDIGO))
S_PART = ParagraphStyle("part", fontName="Helvetica", fontSize=10, leading=18,
                        textColor=HexColor(INK))

# ── Arabic (RTL) style variants — same visual system, NotoNaskhArabic + right alignment
S_TITLE_AR = ParagraphStyle("title_ar", fontName="NotoNaskhArabic", fontSize=17,
                            leading=22, textColor=HexColor(INK), alignment=TA_RIGHT)
S_TAG_AR = ParagraphStyle("tag_ar", fontName="NotoNaskhArabic", fontSize=10,
                          leading=13, textColor=HexColor(AMBER), alignment=TA_RIGHT)
S_HEAD_AR = ParagraphStyle("head_ar", fontName="NotoNaskhArabic", fontSize=14,
                           leading=18, textColor=HexColor(INK), spaceBefore=6,
                           alignment=TA_RIGHT)
S_BODY_AR = ParagraphStyle("body_ar", fontName="NotoNaskhArabic", fontSize=11.5,
                           leading=17, textColor=HexColor(INK), alignment=TA_RIGHT)
S_QNUM_AR = ParagraphStyle("qnum_ar", fontName="NotoNaskhArabic", fontSize=10,
                           leading=15, textColor=HexColor(INDIGO), alignment=TA_RIGHT)
S_PART_AR = ParagraphStyle("part_ar", fontName="NotoNaskhArabic", fontSize=11.5,
                           leading=17, textColor=HexColor(INK), alignment=TA_RIGHT)


_AR_LETTERS = "أبجدهوزحطي"  # standard Arabic exam lettering for parts (a), (b), (c)...


def part_letter(i, rtl=False):
    if rtl:
        return _AR_LETTERS[i] if i < len(_AR_LETTERS) else str(i + 1)
    return chr(ord("a") + i)


# ── Flowable builders ────────────────────────────────────────────────────────
def parts_table(parts, cols, content_w, answers=None, rtl=False):
    """Lay out lettered parts (optionally with answers) in n columns."""
    part_style = S_PART_AR if rtl else S_PART
    n = len(parts)
    cols = max(1, min(cols, n))
    rows = -(-n // cols)
    col_w = content_w / cols
    grid = [[None] * cols for _ in range(rows)]
    for i, p in enumerate(parts):
        r, c = divmod(i, cols)
        label = f'<font color="{INDIGO2}"><b>{part_letter(i, rtl=rtl)}</b></font>'
        body = rich(p, rtl=rtl)
        if rtl:
            text = f'{body}&nbsp;&nbsp;{label}'
        else:
            text = f'{label}&nbsp;&nbsp;{body}'
        if answers is not None:
            ans = rich(answers[i], rtl=rtl)
            text = f'{ans}&nbsp;&nbsp;{text}' if rtl else f'{text}&nbsp;&nbsp;{ans}'
        grid[r][c] = Paragraph(text, part_style)
    if rtl:
        for r in range(rows):
            grid[r] = grid[r][::-1]
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] is None:
                grid[r][c] = ""
    t = Table(grid, colWidths=[col_w] * cols)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return t


CORRECT_GREEN = "#2F6B4F"  # matches the site's --ok token


S_META = ParagraphStyle("meta", fontName="Helvetica-Bold", fontSize=8.0,
                        leading=11, textColor=HexColor(MUTED), spaceAfter=2)
S_SUB = ParagraphStyle("sub", fontName="Helvetica", fontSize=8.5,
                       leading=12, textColor=HexColor(MUTED))


def choices_block(choices, correct, content_w, answer_mode, rtl=False):
    """Render 4 MCQ choices as a lettered list (A/B/C/D, or the Arabic exam
    convention أ/ب/ج/د via part_letter's shared _AR_LETTERS).
    When all 4 choices are compact (<= 34 chars) and not in answer_mode, lays
    them out in a clean 2x2 grid so 25-MCQ sheets stay compact on screen and
    paper. In answer_mode the correct choice is bolded + a checkmark in the
    site's --ok green."""
    part_style = S_PART_AR if rtl else S_PART
    cells = []
    for i, c in enumerate(choices):
        is_correct = answer_mode and i == correct
        letter = part_letter(i, rtl=rtl)
        label_color = CORRECT_GREEN if is_correct else INDIGO2
        label = f'<font color="{label_color}"><b>{letter}.</b></font>'
        body = rich(c, rtl=rtl, color=(CORRECT_GREEN if is_correct else INK))
        if is_correct:
            body = f'<b>{body}</b> ✓'
        text = f'{body}&nbsp;&nbsp;{label}' if rtl else f'{label}&nbsp;&nbsp;{body}'
        cells.append(Paragraph(text, part_style))
    use_two_cols = (not rtl) and len(cells) == 4 and max(len(str(c)) for c in choices) <= 34
    if use_two_cols:
        rows = [[cells[0], cells[1]], [cells[2], cells[3]]]
        col_widths = [content_w / 2.0, content_w / 2.0]
    else:
        rows = [[cell] for cell in cells]
        col_widths = [content_w]
    t = Table(rows, colWidths=col_widths)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6 if use_two_cols else 0),
        # Generous padding so inline math images (e.g. stacked \dfrac{49}{32})
        # never overlap adjacent rows.
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t


def _meta_badge_line(q):
    """Build a compact HTML badge string for difficulty, lesson target, and
    cross-lesson synthesis tags when present on a question dict."""
    badges = []
    diff = q.get("difficulty")
    if diff:
        d_low = diff.lower()
        if "found" in d_low or "easy" in d_low:
            d_col = CURVE
        elif "chal" in d_low or "hard" in d_low:
            d_col = AMBER_TEXT
        else:
            d_col = INDIGO2
        badges.append(f'<font color="{d_col}"><b>[{html.escape(diff)}]</b></font>')
    qtype = q.get("qtype")
    if qtype:
        badges.append(f'<font color="{INDIGO}"><b>[{html.escape(qtype)}]</b></font>')
    target = q.get("target")
    if target:
        badges.append(f'<font color="{MUTED}">Target: {html.escape(target)}</font>')
    cross = q.get("cross_lesson")
    if cross:
        badges.append(f'<font color="{AMBER_TEXT}"><b>Cross-Lesson: {html.escape(cross)}</b></font>')
    return "&nbsp;&nbsp;•&nbsp;&nbsp;".join(badges)


def question_block(qnum, q, answer_mode, rtl=False):
    """Build the flowable block for one question (worksheet or answer key)."""
    body_style = S_BODY_AR if rtl else S_BODY
    qnum_style = S_QNUM_AR if rtl else S_QNUM
    num_w = 24
    content_w = BODY_W - num_w
    inner = []
    if not rtl:
        meta_html = _meta_badge_line(q)
        if meta_html:
            inner.append(Paragraph(meta_html, S_META))
    if q.get("q"):
        inner.append(Paragraph(rich(q["q"], rtl=rtl), body_style))
    if q.get("figure") and not answer_mode:
        path, w, h = render_figure(q["figure"])
        inner.append(Spacer(1, 6))
        img = Image(path, width=w, height=h)
        img.hAlign = "RIGHT" if rtl else "LEFT"
        inner.append(img)
    if q.get("parts"):
        inner.append(Spacer(1, 4))
        answers = q.get("answers") if answer_mode else None
        inner.append(parts_table(q["parts"], q.get("cols", 1), content_w, answers, rtl=rtl))
    if q.get("choices"):
        inner.append(Spacer(1, 5))
        inner.append(choices_block(q["choices"], q.get("correct"), content_w, answer_mode, rtl=rtl))
    if answer_mode and q.get("answer"):
        # 10pt, not a tight 2pt: a stacked \dfrac/\frac inline image in the
        # "q" paragraph can render taller than body_style's fixed `leading`,
        # and a too-small gap here lets its descender bleed into this next
        # paragraph's own text — see README's inline-math pipeline-quirk notes.
        ans_txt = str(q["answer"])
        if len(ans_txt) > 520:
            # Truncate cleanly outside any $...$ span so the row fits on one page
            cut = ans_txt[:520]
            if cut.count("$") % 2 == 1:
                cut = cut[: cut.rfind("$")].strip()
            ans_txt = cut.rstrip(" ,;:-") + "."
        inner.append(Spacer(1, 10))
        inner.append(Paragraph(rich(ans_txt, rtl=rtl), body_style))
    if answer_mode and q.get("working"):
        inner.append(Spacer(1, 10))
        inner.append(Paragraph(rich(q["working"], rtl=rtl), body_style))
    num_para = Paragraph(str(qnum), qnum_style)
    if rtl:
        rows = [[inner, num_para]]
        col_widths = [content_w, num_w]
        pad_cmds = [
            ("LEFTPADDING", (1, 0), (1, 0), 6),
            ("LEFTPADDING", (0, 0), (0, 0), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ]
    else:
        rows = [[num_para, inner]]
        col_widths = [num_w, content_w]
        pad_cmds = [
            ("RIGHTPADDING", (0, 0), (0, 0), 6),
            ("RIGHTPADDING", (1, 0), (1, 0), 0),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ]
    t = Table(rows, colWidths=col_widths)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        *pad_cmds,
    ]))
    return t


def build_story(topic, answer_mode):
    rtl = topic.get("lang") == "ar"
    title_style = S_TITLE_AR if rtl else S_TITLE
    tag_style = S_TAG_AR if rtl else S_TAG
    head_style = S_HEAD_AR if rtl else S_HEAD

    story = []
    # Header: title + brand subtitle + logo in dedicated column so logo NEVER overlaps content
    title = Paragraph(rich(topic["title"], rtl=rtl), title_style)
    header_bits = [title]
    if not rtl:
        sub_line = f"ClipSAT Printable Practice Suite (clipsat.org)  •  Topic {topic.get('num', '')}"
        if topic.get("sub"):
            sub_line += f"  •  {topic['sub']}"
        header_bits.append(Spacer(1, 2))
        header_bits.append(Paragraph(html.escape(sub_line), S_SUB))
    if answer_mode:
        tag_text = shape_ar("مفتاح الإجابات") if rtl else "ANSWER KEY — COMPLETE WORKED SOLUTIONS"
        header_bits.append(Spacer(1, 2))
        header_bits.append(Paragraph(html.escape(tag_text), tag_style))
    logo = Image(LOGO_PATH, width=28, height=28 * 240 / 212)
    if rtl:
        ht = Table([[logo, header_bits]], colWidths=[48, BODY_W - 48])
        align_cmd = ("ALIGN", (0, 0), (0, 0), "LEFT")
    else:
        ht = Table([[header_bits, logo]], colWidths=[BODY_W - 48, 48])
        align_cmd = ("ALIGN", (1, 0), (1, 0), "RIGHT")
    ht.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        align_cmd,
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(ht)
    story.append(HRFlowable(width="100%", thickness=1.0, color=HexColor(INDIGO)))
    story.append(Spacer(1, 10))

    qnum = 0
    for si, section in enumerate(topic["sections"]):
        if section.get("heading"):
            if si > 0:
                story.append(Spacer(1, 10))
                story.append(HRFlowable(width="100%", thickness=0.6,
                                        color=HexColor(BORDER)))
                story.append(Spacer(1, 8))
            story.append(Paragraph(rich(section["heading"], rtl=rtl), head_style))
            story.append(Spacer(1, 8))
        for q in section["questions"]:
            qnum += 1
            block = question_block(qnum, q, answer_mode, rtl=rtl)
            story.append(KeepTogether(block))
            story.append(Spacer(1, 15 if not answer_mode else 12))
    if story and isinstance(story[-1], Spacer):
        story.pop()
    return story


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(HexColor(BORDER))
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN_L, 0.58 * inch, PAGE_W - MARGIN_R, 0.58 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(HexColor(MUTED))
    canvas.drawString(MARGIN_L, 0.42 * inch, FOOTER_TEXT)
    canvas.drawRightString(PAGE_W - MARGIN_R, 0.42 * inch, f"clipsat.org  •  Page {doc.page}")
    canvas.restoreState()


def build_pdf(topic, out_path, answer_mode):
    doc = BaseDocTemplate(
        out_path, pagesize=letter,
        leftMargin=MARGIN_L, rightMargin=MARGIN_R,
        topMargin=MARGIN_T, bottomMargin=MARGIN_B,
        title=topic["title"], author="ClipSAT (clipsat.org)",
        subject="ClipSAT Printable Math Worksheet", creator="ClipSAT Worksheet Generator (clipsat.org)",
    )
    frame = Frame(MARGIN_L, MARGIN_B, BODY_W, PAGE_H - MARGIN_T - MARGIN_B,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])
    doc.build(build_story(topic, answer_mode))


def slugify(s):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s


def generate_topic(json_path, out_root, prerender_only=False):
    with open(json_path, encoding="utf-8") as f:
        topic = json.load(f)
    if prerender_only:
        build_story(topic, answer_mode=False)
        build_story(topic, answer_mode=True)
        print(f"  [prerendered] {topic['num']} {topic['title']}")
        return None
    track_dir = os.path.join(out_root, topic["track"])
    os.makedirs(track_dir, exist_ok=True)
    base_slug = re.sub(r"^[0-9]+\.[0-9]+-", "", os.path.basename(json_path)).replace("-ar.json", "").replace(".json", "")
    slug = topic.get("slug") or base_slug
    lang_suffix = f"-{topic['lang']}" if topic.get("lang") else ""
    ws = os.path.join(track_dir, f"{topic['num']}-{slug}{lang_suffix}-worksheet.pdf")
    ak = os.path.join(track_dir, f"{topic['num']}-{slug}{lang_suffix}-answerkey.pdf")
    build_pdf(topic, ws, answer_mode=False)
    build_pdf(topic, ak, answer_mode=True)
    print(f"  {topic['num']} {topic['title']}: worksheet + answer key")
    return {
        "unit": int(topic["num"].split(".")[0]),
        "num": topic["num"],
        "lang": topic.get("lang", "en"),
        "title": topic["title"],
        "sub": topic.get("sub"),
        "worksheet": os.path.basename(ws),
        "answerkey": os.path.basename(ak),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("topics", nargs="+", help="topic JSON files")
    ap.add_argument("--out", required=True, help="output root directory")
    ap.add_argument("--manifest", action="store_true",
                    help="also write/merge manifest.json per track")
    ap.add_argument("--prerender-only", action="store_true",
                    help="only pre-render math and figure PNGs into .mathcache")
    args = ap.parse_args()

    entries_by_track = {}
    for path in args.topics:
        entry = generate_topic(path, args.out, prerender_only=args.prerender_only)
        if entry is not None:
            with open(path, encoding="utf-8") as f:
                track = json.load(f)["track"]
            entries_by_track.setdefault(track, []).append(entry)

    if args.manifest:
        for track, entries in entries_by_track.items():
            mpath = os.path.join(args.out, track, "manifest.json")
            existing = []
            if os.path.exists(mpath):
                with open(mpath, encoding="utf-8") as f:
                    existing = json.load(f)
            merged = {(e["num"], e.get("lang", "en")): e for e in existing}
            for e in entries:
                merged[(e["num"], e.get("lang", "en"))] = e
            final = sorted(merged.values(), key=lambda e: (e["unit"], e["num"], e.get("lang", "en")))
            with open(mpath, "w", encoding="utf-8") as f:
                json.dump(final, f, ensure_ascii=False, indent=0,
                          separators=(",", ":"))
            print(f"  manifest: {track} ({len(final)} topics)")


if __name__ == "__main__":
    main()
