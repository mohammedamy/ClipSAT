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
from matplotlib import mathtext
from matplotlib.font_manager import FontProperties
import numpy as np

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table,
    TableStyle, Image, KeepTogether, HRFlowable,
)

# ── ClipSAT brand (mirrors index.html CSS tokens) ────────────────────────────
INK = "#0E1726"
INDIGO = "#1E3A6E"
INDIGO2 = "#2B5BA8"
AMBER = "#C8902A"
GRID = "#c9d4e8"
CURVE = "#0e9f8f"  # teal curve color, consistent with site explorers
FOOTER_TEXT = "© ClipSAT: By Mr. Mohamed Abdallah +966597688647"

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
LOGO_PATH = os.path.join(SITE_ROOT, "clipsat-mark.png")
CACHE_DIR = os.path.join(HERE, ".mathcache")

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


def rich(text, color=INK, size=10):
    """Convert text with $...$ math spans into reportlab paragraph markup."""
    out = []
    pos = 0
    for m in re.finditer(r"\$([^$]+)\$", text):
        out.append(html.escape(text[pos:m.start()]))
        tex = "$" + m.group(1) + "$"
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
    ax.axhline(0, color=INK, linewidth=0.9)
    ax.axvline(0, color=INK, linewidth=0.9)
    ax.text(xmax + (xmax - xmin) * 0.04, 0, "$x$", fontsize=9, color=INK,
            va="center", ha="left", clip_on=False)
    ax.text(0, ymax + (ymax - ymin) * 0.04, "$y$", fontsize=9, color=INK,
            va="bottom", ha="center", clip_on=False)
    return fig, ax


def render_figure(spec):
    """Render a figure spec to PNG; return (path, w_pt, h_pt)."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = hashlib.sha1(json.dumps(spec, sort_keys=True).encode()).hexdigest()[:16]
    path = os.path.join(CACHE_DIR, "fig_" + key + ".png")
    if not os.path.exists(path):
        fig, ax = _fig_axes(spec)
        colors = [CURVE, INDIGO2, AMBER]
        if spec.get("type") == "plot":
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
                y = np.where((y > ymin - 2) & (y < ymax + 2), y, np.nan)
                ax.plot(x, y, color=colors[i % len(colors)], linewidth=1.8)
        for px, py in spec.get("points", []):
            ax.plot([px], [py], "o", color=INDIGO, markersize=4)
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


def part_letter(i):
    return chr(ord("a") + i)


# ── Flowable builders ────────────────────────────────────────────────────────
def parts_table(parts, cols, content_w, answers=None):
    """Lay out lettered parts (optionally with answers) in n columns."""
    cells, styles_cmds = [], []
    n = len(parts)
    cols = max(1, min(cols, n))
    rows = -(-n // cols)
    col_w = content_w / cols
    grid = [[None] * cols for _ in range(rows)]
    for i, p in enumerate(parts):
        r, c = divmod(i, cols)
        text = f'<font color="{INDIGO2}"><b>{part_letter(i)}</b></font>&nbsp;&nbsp;{rich(p)}'
        if answers is not None:
            text += f"&nbsp;&nbsp;{rich(answers[i])}"
        grid[r][c] = Paragraph(text, S_PART)
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


def question_block(qnum, q, answer_mode):
    """Build the flowable block for one question (worksheet or answer key)."""
    num_w = 24
    content_w = BODY_W - num_w
    inner = []
    if q.get("q"):
        inner.append(Paragraph(rich(q["q"]), S_BODY))
    if q.get("figure") and not answer_mode:
        path, w, h = render_figure(q["figure"])
        inner.append(Spacer(1, 6))
        img = Image(path, width=w, height=h)
        img.hAlign = "LEFT"
        inner.append(img)
    if q.get("parts"):
        inner.append(Spacer(1, 4))
        answers = q.get("answers") if answer_mode else None
        inner.append(parts_table(q["parts"], q.get("cols", 1), content_w, answers))
    if answer_mode and q.get("answer"):
        inner.append(Spacer(1, 2))
        inner.append(Paragraph(rich(q["answer"]), S_BODY))
    if answer_mode and q.get("working"):
        inner.append(Spacer(1, 2))
        inner.append(Paragraph(rich(q["working"]), S_BODY))
    rows = [[Paragraph(str(qnum), S_QNUM), inner]]
    t = Table(rows, colWidths=[num_w, content_w])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 6),
        ("RIGHTPADDING", (1, 0), (1, 0), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def build_story(topic, answer_mode):
    story = []
    # Header: title left, logo right
    title = Paragraph(html.escape(topic["title"]), S_TITLE)
    header_bits = [title]
    if answer_mode:
        header_bits.append(Paragraph("ANSWER KEY", S_TAG))
    logo = Image(LOGO_PATH, width=26, height=26 * 240 / 212)
    ht = Table([[header_bits, logo]], colWidths=[BODY_W - 40, 40])
    ht.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
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
            story.append(Paragraph(html.escape(section["heading"]), S_HEAD))
            story.append(Spacer(1, 8))
        for q in section["questions"]:
            qnum += 1
            block = question_block(qnum, q, answer_mode)
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
    slug = slugify(topic["title"])
    ws = os.path.join(track_dir, f"{topic['num']}-{slug}-worksheet.pdf")
    ak = os.path.join(track_dir, f"{topic['num']}-{slug}-answerkey.pdf")
    build_pdf(topic, ws, answer_mode=False)
    build_pdf(topic, ak, answer_mode=True)
    print(f"  {topic['num']} {topic['title']}: worksheet + answer key")
    return {
        "unit": int(topic["num"].split(".")[0]),
        "num": topic["num"],
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
            merged = {e["num"]: e for e in existing}
            for e in entries:
                merged[e["num"]] = e
            final = sorted(merged.values(), key=lambda e: (e["unit"], e["num"]))
            with open(mpath, "w", encoding="utf-8") as f:
                json.dump(final, f, ensure_ascii=False, indent=0,
                          separators=(",", ":"))
            print(f"  manifest: {track} ({len(final)} topics)")


if __name__ == "__main__":
    main()
