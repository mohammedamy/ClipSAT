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

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib import mathtext
from matplotlib.font_manager import FontProperties
import numpy as np

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

import arabic_reshaper
from bidi.algorithm import get_display

# ── ClipSAT brand (mirrors index.html CSS tokens) ────────────────────────────
INK = "#0E1726"
INDIGO = "#1E3A6E"
INDIGO2 = "#2B5BA8"
AMBER = "#C8902A"
GRID = "#c9d4e8"
CURVE = "#0e9f8f"  # teal curve color, consistent with site explorers
AMBER_TEXT = "#8A6017"  # WCAG-AA amber for on-white text labels (matches site --amber-text)
FOOTER_TEXT = "© ClipSAT: By Mr. Mohamed Abdallah +966597688647"

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
LOGO_PATH = os.path.join(SITE_ROOT, "clipsat-mark.png")
CACHE_DIR = os.path.join(HERE, ".mathcache")

ARABIC_FONT_PATH = os.path.join(HERE, "fonts", "NotoNaskhArabic-Regular.ttf")
pdfmetrics.registerFont(TTFont("NotoNaskhArabic", ARABIC_FONT_PATH))

_ARABIC_RESHAPER = arabic_reshaper.ArabicReshaper({
    "delete_harakat": False,
    "support_ligatures": True,
})


def shape_ar(text):
    """Reshape Arabic letters to contextual joining forms and resolve the
    Unicode bidi algorithm to visual order. Non-Arabic runs (digits, Latin,
    symbols — i.e. anything that will end up inside a $...$ math span) are
    strong-LTR and pass through reshaping untouched, so this is safe to run
    on a whole sentence that embeds math notation."""
    return get_display(_ARABIC_RESHAPER.reshape(text))

PAGE_W, PAGE_H = letter
MARGIN_L = 0.9 * inch
MARGIN_R = 0.75 * inch
MARGIN_T = 0.7 * inch
MARGIN_B = 0.85 * inch
BODY_W = PAGE_W - MARGIN_L - MARGIN_R

MATH_DPI = 300
MATH_PROP = FontProperties(size=10)
_math_parser = mathtext.MathTextParser("path")


# ── Inline math rendering ────────────────────────────────────────────────────
def render_math(tex, color=INK, size=10):
    """Render a $...$ span to a PNG; return (path, w_pt, h_pt, depth_pt)."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = hashlib.sha1(f"{tex}|{color}|{size}".encode()).hexdigest()[:16]
    path = os.path.join(CACHE_DIR, key + ".png")
    prop = FontProperties(size=size)
    width, height, depth, _, _ = _math_parser.parse(tex, dpi=72, prop=prop)
    if not os.path.exists(path):
        mathtext.math_to_image(tex, path, prop=prop, dpi=MATH_DPI, color=color)
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

    def _stash(m):
        math_specs.append("$" + m.group(1) + "$")
        return chr(_PLACEHOLDER_BASE + len(math_specs) - 1)

    text = re.sub(r"\$([^$]+)\$", _stash, text)
    if rtl:
        text = shape_ar(text)
    out = []
    pos = 0
    for m in re.finditer(r"[-]", text):
        out.append(html.escape(text[pos:m.start()]))
        tex = math_specs[ord(m.group(0)) - _PLACEHOLDER_BASE]
        path, w, h, d = render_math(tex, color=color, size=size)
        out.append(
            f'<img src="{path}" width="{w:.2f}" height="{h:.2f}" valign="{-d:.2f}"/>'
        )
        pos = m.end()
    out.append(html.escape(text[pos:]))
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
    cx, cy = spec.get("center", [0, 0])
    sector = spec.get("sector")

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
        a1, a2 = spec["chord"]
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


def render_figure(spec):
    """Render a figure spec to PNG; return (path, w_pt, h_pt)."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = hashlib.sha1(json.dumps(spec, sort_keys=True).encode()).hexdigest()[:16]
    path = os.path.join(CACHE_DIR, "fig_" + key + ".png")
    ftype = spec.get("type", "plot")
    if not os.path.exists(path):
        if ftype == "plot":
            fig, ax = _fig_axes(spec)
            colors = [CURVE, INDIGO2, AMBER]
            xmin, xmax = spec.get("xmin", -5), spec.get("xmax", 5)
            ymin, ymax = spec.get("ymin", -5), spec.get("ymax", 5)
            x = np.linspace(xmin, xmax, 600)
            for i, fn in enumerate(spec.get("fns", [])):
                with np.errstate(all="ignore"):
                    y = eval(fn, {"__builtins__": {}},
                             {"x": x, "np": np, "sin": np.sin, "cos": np.cos,
                              "tan": np.tan, "exp": np.exp, "log": np.log,
                              "sqrt": np.sqrt, "abs": np.abs, "pi": np.pi,
                              "e": np.e})
                # a constant expression (e.g. a horizontal bounding line "2")
                # evaluates to a scalar — broadcast it to the x-array so
                # ax.plot gets matching shapes instead of raising.
                y = np.broadcast_to(np.asarray(y, dtype=float), x.shape)
                y = np.where((y > ymin - 2) & (y < ymax + 2), y, np.nan)
                ax.plot(x, y, color=colors[i % len(colors)], linewidth=1.8)
            for px, py in spec.get("points", []):
                ax.plot([px], [py], "o", color=INDIGO, markersize=4)
        elif ftype == "triangle":
            fig, ax = _geom_fig(spec["vertices"])
            _draw_triangle(ax, spec)
        elif ftype == "circle":
            r = spec.get("radius", 1)
            cx, cy = spec.get("center", [0, 0])
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
            _draw_bars(ax, spec)
        elif ftype == "solid":
            fig, ax = _draw_solid(spec)
        else:
            fig, ax = _fig_axes(spec)
        fig.savefig(path, dpi=200, bbox_inches="tight",
                    facecolor="white", pad_inches=0.05)
        plt.close(fig)
    from PIL import Image as PILImage
    with PILImage.open(path) as im:
        px_w, px_h = im.size
    disp_w = spec.get("width", 240)
    disp_h = disp_w * px_h / px_w
    return path, disp_w, disp_h


# ── Styles ───────────────────────────────────────────────────────────────────
S_TITLE = ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=15,
                         leading=19, textColor=HexColor(INK))
S_TAG = ParagraphStyle("tag", fontName="Helvetica-Bold", fontSize=8.5,
                       leading=11, textColor=HexColor(AMBER))
S_HEAD = ParagraphStyle("head", fontName="Helvetica-Bold", fontSize=12.5,
                        leading=16, textColor=HexColor(INK), spaceBefore=6)
S_BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=10, leading=15,
                        textColor=HexColor(INK), alignment=TA_LEFT)
S_QNUM = ParagraphStyle("qnum", fontName="Helvetica-Bold", fontSize=10,
                        leading=15, textColor=HexColor(INDIGO))
S_PART = ParagraphStyle("part", fontName="Helvetica", fontSize=10, leading=15,
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
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def question_block(qnum, q, answer_mode, rtl=False):
    """Build the flowable block for one question (worksheet or answer key)."""
    body_style = S_BODY_AR if rtl else S_BODY
    qnum_style = S_QNUM_AR if rtl else S_QNUM
    num_w = 24
    content_w = BODY_W - num_w
    inner = []
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
    if answer_mode and q.get("answer"):
        inner.append(Spacer(1, 2))
        inner.append(Paragraph(rich(q["answer"], rtl=rtl), body_style))
    if answer_mode and q.get("working"):
        inner.append(Spacer(1, 2))
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
    # Header: title + logo, mirrored for RTL (logo on the left, title on the right)
    title = Paragraph(rich(topic["title"], rtl=rtl), title_style)
    header_bits = [title]
    if answer_mode:
        tag_text = shape_ar("مفتاح الإجابات") if rtl else "ANSWER KEY"
        header_bits.append(Paragraph(html.escape(tag_text), tag_style))
    logo = Image(LOGO_PATH, width=26, height=26 * 240 / 212)
    if rtl:
        ht = Table([[logo, header_bits]], colWidths=[40, BODY_W - 40])
        align_cmd = ("ALIGN", (0, 0), (0, 0), "LEFT")
    else:
        ht = Table([[header_bits, logo]], colWidths=[BODY_W - 40, 40])
        align_cmd = ("ALIGN", (1, 0), (1, 0), "RIGHT")
    ht.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        align_cmd,
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(ht)
    story.append(Spacer(1, 14))

    qnum = 0
    for si, section in enumerate(topic["sections"]):
        if section.get("heading"):
            if si > 0:
                story.append(Spacer(1, 10))
                story.append(HRFlowable(width="100%", thickness=0.6,
                                        color=HexColor("#dde4f0")))
                story.append(Spacer(1, 8))
            story.append(Paragraph(rich(section["heading"], rtl=rtl), head_style))
            story.append(Spacer(1, 8))
        for q in section["questions"]:
            qnum += 1
            block = question_block(qnum, q, answer_mode, rtl=rtl)
            story.append(KeepTogether(block))
            story.append(Spacer(1, 16 if not answer_mode else 12))
    if story and isinstance(story[-1], Spacer):
        story.pop()
    return story


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(HexColor("#5a6577"))
    canvas.drawCentredString(PAGE_W / 2, 0.45 * inch, FOOTER_TEXT)
    canvas.restoreState()


def build_pdf(topic, out_path, answer_mode):
    doc = BaseDocTemplate(
        out_path, pagesize=letter,
        leftMargin=MARGIN_L, rightMargin=MARGIN_R,
        topMargin=MARGIN_T, bottomMargin=MARGIN_B,
        title=topic["title"], author="ClipSAT — Mr. Mohamed Abdallah",
        subject="ClipSAT worksheet", creator="ClipSAT worksheet generator",
    )
    frame = Frame(MARGIN_L, MARGIN_B, BODY_W, PAGE_H - MARGIN_T - MARGIN_B,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])
    doc.build(build_story(topic, answer_mode))


def slugify(s):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s


def generate_topic(json_path, out_root):
    with open(json_path, encoding="utf-8") as f:
        topic = json.load(f)
    track_dir = os.path.join(out_root, topic["track"])
    os.makedirs(track_dir, exist_ok=True)
    slug = topic.get("slug") or slugify(topic["title"])
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
    args = ap.parse_args()

    entries_by_track = {}
    for path in args.topics:
        entry = generate_topic(path, args.out)
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
