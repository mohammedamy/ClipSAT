#!/usr/bin/env python3
"""
ClipSAT Digital SAT Question Bank Converter (ALL EASY, ALL MEDIUM, ALL HARD).

Converts the three official-format SAT Math question bank PDFs into:
  1. Virtualized CBT shard packs under `public/downloads/sat/bank-packs/cbt/`:
     - `{tier}-index.json` (metadata + answers + domain/skill index)
     - `{tier}-{00..NN}.json` (25-item shards with 2x Retina 16-color PNG crops)
  2. Six ClipSAT-branded vector PDFs under `public/downloads/sat/bank-packs/`:
     - `clipsat-sat-all-{easy|medium|hard}-practice.pdf` (spoiler-free student practice)
     - `clipsat-sat-all-{easy|medium|hard}-answerkey.pdf` (quick grid + full vector rationales)

Important: Must be run with `/usr/bin/python3` (has PyMuPDF `fitz` + Pillow `PIL`).
"""

import base64
import io
import json
import os
import re
import sys
import time

import fitz  # PyMuPDF
import numpy as np
from PIL import Image


# ── Paths & Brand Palette (matches tools/worksheet_gen/generate.py) ───────────
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = (
    "/Users/mohammedamy/Library/CloudStorage/GoogleDrive-mr.mohammed.abdallah@gmail.com/"
    "My Drive/Digital SAT Mr. Mohamed Abdallah/SAT BANK"
)
OUT_DIR = os.path.join(ROOT_DIR, "public", "downloads", "sat", "bank-packs")
CBT_DIR = os.path.join(OUT_DIR, "cbt")
LOGO_PATH = os.path.join(ROOT_DIR, "clipsat-mark.png")

TIERS = [
    {
        "tier": "easy",
        "filename": "ALL EASY.pdf",
        "label": "All Easy",
        "cbtTitle": "Digital SAT® Math Bank — ALL EASY",
        "pdfTitle": "Digital SAT Math — Practice Question Bank (All Easy)",
    },
    {
        "tier": "medium",
        "filename": "ALL MEDIUM.pdf",
        "label": "All Medium",
        "cbtTitle": "Digital SAT® Math Bank — ALL MEDIUM",
        "pdfTitle": "Digital SAT Math — Practice Question Bank (All Medium)",
    },
    {
        "tier": "hard",
        "filename": "ALL HARD.pdf",
        "label": "All Hard",
        "cbtTitle": "Digital SAT® Math Bank — ALL HARD",
        "pdfTitle": "Digital SAT Math — Practice Question Bank (All Hard)",
    },
]

DOMAINS = [
    "Algebra",
    "Advanced Math",
    "Problem-Solving and Data Analysis",
    "Geometry and Trigonometry",
]

DOMAIN_SHORT = {
    "Algebra": "Algebra",
    "Advanced Math": "Advanced Math",
    "Problem-Solving and Data Analysis": "Problem-Solving & Data Analysis",
    "Geometry and Trigonometry": "Geometry & Trigonometry",
}

SHARD_SIZE = 25

# Brand RGB tuples (0..1)
C_INK = (14 / 255.0, 23 / 255.0, 38 / 255.0)
C_INDIGO = (30 / 255.0, 58 / 255.0, 110 / 255.0)
C_INDIGO2 = (43 / 255.0, 91 / 255.0, 168 / 255.0)
C_AMBER = (200 / 255.0, 144 / 255.0, 42 / 255.0)
C_AMBER_TEXT = (138 / 255.0, 96 / 255.0, 23 / 255.0)
C_CURVE = (14 / 255.0, 159 / 255.0, 143 / 255.0)
C_GREEN = (47 / 255.0, 107 / 255.0, 79 / 255.0)
C_BORDER = (221 / 255.0, 228 / 255.0, 240 / 255.0)
C_BG_SOFT = (248 / 255.0, 250 / 255.0, 252 / 255.0)
C_BG_KEY = (240 / 255.0, 253 / 255.0, 244 / 255.0)
C_MUTED = (90 / 255.0, 101 / 255.0, 119 / 255.0)

PAGE_W = 612.0
PAGE_H = 792.0
MARGIN_L = 54.0
MARGIN_R = 54.0
BODY_W = PAGE_W - MARGIN_L - MARGIN_R  # 504pt
FOOTER_Y_RULE = 750.0
FOOTER_Y_TEXT = 762.0
FOOTER_TEXT = "© ClipSAT — clipsat.org | All Rights Reserved"

# Uniform vector embed scale so typography across all questions has consistent ~9.5-10pt size
VEC_X_CLIP_L = 16.0
VEC_X_CLIP_R = 596.0
VEC_W_CLIP = VEC_X_CLIP_R - VEC_X_CLIP_L  # 580pt
VEC_X_INDENT = 78.0
VEC_TARGET_W = PAGE_W - MARGIN_R - VEC_X_INDENT  # 480pt
VEC_SCALE = VEC_TARGET_W / VEC_W_CLIP  # ~0.8276


# ── Parsing Helpers ───────────────────────────────────────────────────────────
def normalize_domain(raw_dom):
    s = re.sub(r"\s+", " ", raw_dom or "").strip()
    low = s.lower()
    if "algebra" in low:
        return "Algebra"
    if "advanced" in low:
        return "Advanced Math"
    if "problem" in low or "data" in low:
        return "Problem-Solving and Data Analysis"
    if "geometry" in low or "trig" in low:
        return "Geometry and Trigonometry"
    return s


def parse_header_meta(page):
    words = page.get_text("words")
    dom_words = [
        w for w in words if 240.0 <= w[0] < 365.0 and 74.0 <= w[1] <= 116.0
    ]
    sk_words = [
        w for w in words if 365.0 <= w[0] < 482.0 and 74.0 <= w[1] <= 116.0
    ]
    dom_words.sort(key=lambda w: (round(w[1], 1), w[0]))
    sk_words.sort(key=lambda w: (round(w[1], 1), w[0]))
    domain = normalize_domain(" ".join(w[4] for w in dom_words))
    skill = re.sub(r"\s+", " ", " ".join(w[4] for w in sk_words)).strip()
    if domain not in DOMAINS:
        raise RuntimeError("Unexpected domain %r on page" % (domain,))
    if not skill:
        raise RuntimeError("Missing skill on page")
    return domain, skill


def _clean_spr_token(tok):
    s = tok.strip().strip(".,;:")
    if s.startswith(".") and len(s) > 1 and s[1].isdigit():
        return s
    return s


def _expand_spr_variants(tokens):
    out = []
    seen = set()

    def add_tok(val):
        v = str(val).strip()
        if not v or v in seen:
            return
        seen.add(v)
        out.append(v)

    for raw in tokens:
        t = _clean_spr_token(raw)
        if not t:
            continue
        add_tok(t)
        if "," in t and re.match(r"^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$", t):
            add_tok(t.replace(",", ""))
        if t.startswith(".") and len(t) > 1 and t[1].isdigit():
            add_tok("0" + t)
        elif t.startswith("0.") and len(t) > 2:
            add_tok(t[1:])
        elif t.startswith("-.") and len(t) > 2 and t[2].isdigit():
            add_tok("-0" + t[1:])
        elif t.startswith("-0.") and len(t) > 3:
            add_tok("-" + t[2:])
    return out


def _choose_primary_spr(variants):
    for v in variants:
        if re.match(r"^-?\d+$", v):
            return v
    for v in variants:
        if "/" in v:
            return v
    for v in variants:
        if "," not in v:
            return v
    return variants[0]


def parse_question_answer(full_text, qid, has_answer_heading):
    # Check Correct Answer line
    ca_m = re.search(r"(?:^|\n)Correct Answer:\s*([^\n]*)", full_text)
    ca_raw = ca_m.group(1).strip() if ca_m else ""
    if ca_raw in ("Rationale",):
        ca_raw = ""

    is_mcq = has_answer_heading or ca_raw in ("A", "B", "C", "D")
    if is_mcq:
        letter = ca_raw if ca_raw in ("A", "B", "C", "D") else ""
        if not letter:
            m_ch = re.search(r"Choice\s+([ABCD])\s+is\s+correct", full_text)
            if m_ch:
                letter = m_ch.group(1)
        if letter not in ("A", "B", "C", "D"):
            raise RuntimeError("Unresolved MCQ answer for %s (ca_raw=%r)" % (qid, ca_raw))
        return "mcq", {"answer": ord(letter) - ord("A")}

    # SPR extraction
    rat_idx = full_text.find("Rationale")
    rat_text = full_text[rat_idx:] if rat_idx != -1 else full_text

    tokens = []
    if ca_raw:
        tokens.extend([x.strip() for x in ca_raw.split(",") if x.strip()])

    # Pattern: "Note that 7/6, 1.166, and 1.167 are examples of ways to enter a correct answer."
    m_note = re.search(
        r"Note\s+that\s+(.+?)\s+are\s+examples?\s+of\s+ways\s+to\s+enter\s+a\s+correct\s+answer",
        rat_text,
        re.S,
    )
    if m_note:
        chunk = re.sub(r"\s+", " ", m_note.group(1)).strip()
        parts = re.split(r"\s*,\s*(?:and\s+)?|\s+and\s+", chunk)
        tokens.extend([p.strip() for p in parts if p.strip()])

    # Pattern: "The correct answer is either 7, 8, or 13."
    if not tokens:
        m_either = re.search(r"The\s+correct\s+answer\s+is\s+either\s+([^.\n]+)\.", rat_text)
        if m_either:
            chunk = re.sub(r"\s+", " ", m_either.group(1)).strip()
            parts = re.split(r"\s*,\s*(?:or\s+)?|\s+or\s+", chunk)
            tokens.extend([p.strip() for p in parts if p.strip()])

    # Pattern: "The correct answer is 3,540." or "The correct answer is -12/5."
    if not tokens:
        m_is = re.search(
            r"The\s+correct\s+answer\s+is\s+([+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:/\d+)?|[+-]?\.\d+)(?:\s*\.|\s*$|\s+is)",
            rat_text,
        )
        if m_is:
            tokens.append(m_is.group(1).strip())

    # Filter out any non-numeric prose artifacts
    valid_tokens = [
        t for t in tokens
        if re.match(r"^[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:/\d+)?$|^[+-]?\.\d+$", t.strip())
    ]
    variants = _expand_spr_variants(valid_tokens)
    if not variants:
        raise RuntimeError("Unresolved SPR answer for %s (ca_raw=%r)" % (qid, ca_raw))
    primary = _choose_primary_spr(variants)
    return "spr", {"sprAnswer": primary, "sprAnswers": variants}


def find_page_markers(page, is_first_page=True):
    """Locate left-aligned structural markers on a source PDF page."""
    words = page.get_text("words")
    words.sort(key=lambda w: (w[1], w[0]))
    min_y = 115.0 if is_first_page else 10.0
    out = {
        "question": None,
        "answer": None,
        "choices": {},
        "correct": None,
        "rationale": None,
    }
    for w in words:
        x0, y0, x1, y1, txt = w[0], w[1], w[2], w[3], w[4]
        if x0 >= 36.0 or y0 < min_y:
            continue
        if is_first_page and txt == "Question" and y0 > 105.0 and out["question"] is None:
            out["question"] = (x0, y0, x1, y1)
        elif txt == "Answer" and out["answer"] is None and out["rationale"] is None:
            out["answer"] = (x0, y0, x1, y1)
        elif txt in ("A.", "B.", "C.", "D.") and out["correct"] is None and out["rationale"] is None:
            if txt not in out["choices"]:
                out["choices"][txt] = (x0, y0, x1, y1)
        elif txt == "Correct" and out["correct"] is None:
            out["correct"] = (x0, y0, x1, y1)
        elif txt == "Rationale" and out["rationale"] is None:
            out["rationale"] = (x0, y0, x1, y1)
    return out


# ── Image Cropping & Quantization for CBT Shards ──────────────────────────────
def _pil_to_data_uri(im):
    # Quantize to crisp 16-level grayscale palette PNG (exact black/anti-aliased text, tiny bytes)
    pal = im.quantize(colors=16, method=Image.MEDIANCUT)
    buf = io.BytesIO()
    pal.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return "data:image/png;base64," + b64


def _trim_ink(arr, pad=6, keep_left=False):
    """Trim outer whitespace around dark ink (<248). Returns (cropped_ndarray, bbox) or None."""
    mask = arr < 248
    if not mask.any():
        return None
    ys, xs = np.where(mask)
    h, w = arr.shape
    y0 = max(0, int(ys.min()) - pad)
    y1 = min(h, int(ys.max()) + 1 + pad)
    x0 = 0 if keep_left else max(0, int(xs.min()) - pad)
    x1 = min(w, int(xs.max()) + 1 + pad)
    return arr[y0:y1, x0:x1], (x0, y0, x1, y1)


def _find_split_y(arr, y_low, y_high):
    """Find cleanest white horizontal row between y_low and y_high."""
    h = arr.shape[0]
    lo = max(0, min(h - 1, int(y_low)))
    hi = max(lo + 1, min(h, int(y_high)))
    band = arr[lo:hi, :]
    row_mins = band.min(axis=1)
    white_rows = np.where(row_mins >= 250)[0]
    if len(white_rows) > 0:
        # Pick midpoint of the largest contiguous white gap or median white row
        return lo + int(white_rows[len(white_rows) // 2])
    # Fallback: brightest row
    return lo + int(np.argmax(band.mean(axis=1)))


def extract_cbt_images(doc, q_meta):
    """Render stitched 2x Retina crops for stem, choices (if MCQ), and rationale."""
    pages = q_meta["pages"]
    scale = 2.0  # 144 DPI -> cssW = pxW / 2
    strips = []
    y_offset = 0.0
    stitched_markers = {
        "question_bot": 0.0,
        "answer_top": None,
        "choices": {},  # 'A.' -> (x0, y0, x1, y1) in stitched px
        "correct_top": None,
        "rationale_bot": None,
    }

    for idx_in_q, pno in enumerate(pages):
        page = doc[pno]
        mk = find_page_markers(page, is_first_page=(idx_in_q == 0))
        if idx_in_q == 0:
            clip_top = (mk["question"][3] + 1.0) if mk["question"] else 135.0
        else:
            clip_top = 18.0
        clip_bot = 776.0
        clip = fitz.Rect(14.0, clip_top, 598.0, clip_bot)
        pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip, alpha=False)
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("L")
        arr = np.array(im)

        def to_stitched(rect_tuple):
            return (
                (rect_tuple[0] - 14.0) * scale,
                y_offset + (rect_tuple[1] - clip_top) * scale,
                (rect_tuple[2] - 14.0) * scale,
                y_offset + (rect_tuple[3] - clip_top) * scale,
            )

        if idx_in_q == 0 and mk["question"]:
            stitched_markers["question_bot"] = y_offset
        if mk["answer"] and stitched_markers["answer_top"] is None:
            stitched_markers["answer_top"] = to_stitched(mk["answer"])[1]
            stitched_markers["answer_bot"] = to_stitched(mk["answer"])[3]
        for lbl, r in mk["choices"].items():
            if lbl not in stitched_markers["choices"]:
                stitched_markers["choices"][lbl] = to_stitched(r)
        if mk["correct"] and stitched_markers["correct_top"] is None:
            stitched_markers["correct_top"] = to_stitched(mk["correct"])[1]
        if mk["rationale"] and stitched_markers["rationale_bot"] is None:
            stitched_markers["rationale_bot"] = to_stitched(mk["rationale"])[3]

        strips.append(arr)
        y_offset += arr.shape[0]

    # Normalize strip widths (all 584*2 = 1168px) and concatenate vertically
    max_w = max(s.shape[1] for s in strips)
    norm_strips = []
    for s in strips:
        if s.shape[1] < max_w:
            pad_arr = np.full((s.shape[0], max_w), 255, dtype=np.uint8)
            pad_arr[:, : s.shape[1]] = s
            norm_strips.append(pad_arr)
        else:
            norm_strips.append(s)
    canvas = np.vstack(norm_strips) if len(norm_strips) > 1 else norm_strips[0]
    total_h = canvas.shape[0]

    # 1. Stem crop
    stem_candidates = [
        v
        for v in (
            stitched_markers["answer_top"],
            stitched_markers["correct_top"],
            stitched_markers["rationale_bot"],
        )
        if v is not None
    ]
    if stitched_markers["answer_top"] is not None:
        stem_end = int(max(4, stitched_markers["answer_top"] - 4))
    elif stitched_markers["correct_top"] is not None:
        stem_end = int(max(4, stitched_markers["correct_top"] - 4))
    elif stitched_markers["rationale_bot"] is not None:
        # Step back before Rationale heading (~18px at 2x)
        stem_end = int(max(4, stitched_markers["rationale_bot"] - 22))
    else:
        stem_end = total_h

    stem_slice = canvas[0:stem_end, :]
    # Trim top/bottom tightly; keep left margin only if leftmost ink is indented (> 25px from left edge = centered math/fig)
    stem_trim = _trim_ink(stem_slice, pad=6, keep_left=False)
    if stem_trim is None:
        raise RuntimeError("Empty stem crop for %s" % (q_meta["id"],))
    stem_arr, stem_bb = stem_trim
    # If stem starts with centered equation/figure (x0 > 40px from left ink edge 8px), preserve left padding up to 30px
    if stem_bb[0] > 50:
        left_x = max(0, stem_bb[0] - 24)
        stem_arr = stem_slice[stem_bb[1] : stem_bb[3], left_x : stem_bb[2]]
    stem_obj = {
        "src": _pil_to_data_uri(Image.fromarray(stem_arr)),
        "w": int(round(stem_arr.shape[1] / scale)),
        "h": int(round(stem_arr.shape[0] / scale)),
    }

    # 2. Choices crops (MCQ)
    choices_out = None
    if q_meta["type"] == "mcq":
        ch_map = stitched_markers["choices"]
        if len(ch_map) != 4:
            raise RuntimeError("Missing 4 choice markers for %s" % (q_meta["id"],))
        labels = ["A.", "B.", "C.", "D."]
        rects = [ch_map[l] for l in labels]
        end_choices = (
            int(stitched_markers["correct_top"] - 6)
            if stitched_markers["correct_top"] is not None
            else (
                int(stitched_markers["rationale_bot"] - 24)
                if stitched_markers["rationale_bot"] is not None
                else total_h
            )
        )
        # Detect bottom-aligned figure choices (e.g. graphs above A./B./C./D. with blank right of label)
        a_band = canvas[
            max(0, int(rects[0][1] - 6)) : min(total_h, int(rects[0][3] + 6)),
            min(canvas.shape[1] - 1, int(rects[0][2] + 8)) :,
        ]
        a_has_inline_ink = (a_band.size > 0) and bool((a_band < 248).any())
        ans_bot = stitched_markers.get("answer_bot") or (
            stitched_markers["answer_top"] + 16 if stitched_markers["answer_top"] is not None else 0
        )
        is_fig_above = (not a_has_inline_ink) and (rects[0][1] - ans_bot > 40)

        if is_fig_above:
            y0_a = max(0, int(ans_bot + 4))
            y_a_end = min(total_h, int(rects[0][3] + 8))
            y_b_end = min(total_h, int(rects[1][3] + 8))
            y_c_end = min(total_h, int(rects[2][3] + 8))
            y_d_end = min(total_h, int(rects[3][3] + 8))
            bounds = [(y0_a, y_a_end), (y_a_end, y_b_end), (y_b_end, y_c_end), (y_c_end, y_d_end)]
        else:
            # Split y boundaries cleanly between A->B, B->C, C->D
            y_top_a = max(0, int(rects[0][1] - 8))
            y_ab = _find_split_y(canvas, rects[0][3] - 2, rects[1][1] + 2)
            y_bc = _find_split_y(canvas, rects[1][3] - 2, rects[2][1] + 2)
            y_cd = _find_split_y(canvas, rects[2][3] - 2, rects[3][1] + 2)
            y_bot_d = min(total_h, max(int(rects[3][3] + 10), end_choices))
            bounds = [(y_top_a, y_ab), (y_ab, y_bc), (y_bc, y_cd), (y_cd, y_bot_d)]

        choices_out = []
        for idx_c, (cy0, cy1) in enumerate(bounds):
            lbl_rect = rects[idx_c]
            row_arr = canvas[cy0:cy1, :].copy()
            # White out the "A." / "B." / "C." / "D." prefix box so ClipSAT's native choice letters render cleanly
            mask_x1 = min(row_arr.shape[1], int(lbl_rect[2] + 4))
            lbl_y_rel0 = max(0, int(lbl_rect[1] - cy0 - 6))
            lbl_y_rel1 = min(row_arr.shape[0], int(lbl_rect[3] - cy0 + 6))
            if lbl_y_rel1 > lbl_y_rel0:
                row_arr[lbl_y_rel0:lbl_y_rel1, :mask_x1] = 255
            c_trim = _trim_ink(row_arr, pad=4, keep_left=False)
            if c_trim is None:
                raise RuntimeError(
                    "Empty choice %s crop for %s" % (labels[idx_c], q_meta["id"])
                )
            c_arr, _ = c_trim
            choices_out.append(
                {
                    "src": _pil_to_data_uri(Image.fromarray(c_arr)),
                    "w": int(round(c_arr.shape[1] / scale)),
                    "h": int(round(c_arr.shape[0] / scale)),
                }
            )

    # 3. Rationale crop
    if stitched_markers["rationale_bot"] is not None:
        rat_start = int(min(total_h - 4, stitched_markers["rationale_bot"] + 2))
    elif stitched_markers["correct_top"] is not None:
        rat_start = int(min(total_h - 4, stitched_markers["correct_top"] + 16))
    else:
        rat_start = stem_end
    rat_slice = canvas[rat_start:total_h, :]
    rat_trim = _trim_ink(rat_slice, pad=6, keep_left=False)
    if rat_trim is None:
        # Fallback: include from correct_top if rationale was empty
        fallback_start = int(stitched_markers["correct_top"] or stem_end)
        rat_trim = _trim_ink(canvas[fallback_start:total_h, :], pad=6, keep_left=False)
    if rat_trim is None:
        raise RuntimeError("Empty rationale crop for %s" % (q_meta["id"],))
    rat_arr, _ = rat_trim
    sol_obj = {
        "src": _pil_to_data_uri(Image.fromarray(rat_arr)),
        "w": int(round(rat_arr.shape[1] / scale)),
        "h": int(round(rat_arr.shape[0] / scale)),
    }

    return {"stem": stem_obj, "choices": choices_out, "sol": sol_obj}


# ── ClipSAT Branded PDF Builder (Vector Redaction + show_pdf_page) ────────────
def _draw_footer(page, page_num):
    page.draw_line(
        fitz.Point(MARGIN_L, FOOTER_Y_RULE),
        fitz.Point(PAGE_W - MARGIN_R, FOOTER_Y_RULE),
        color=C_BORDER,
        width=0.6,
    )
    page.insert_text(
        fitz.Point(MARGIN_L, FOOTER_Y_TEXT),
        FOOTER_TEXT,
        fontsize=7.5,
        fontname="helv",
        color=C_MUTED,
    )
    right_txt = "clipsat.org  •  Page %d" % page_num
    tw = fitz.get_text_length(right_txt, fontname="helv", fontsize=7.5)
    page.insert_text(
        fitz.Point(PAGE_W - MARGIN_R - tw, FOOTER_Y_TEXT),
        right_txt,
        fontsize=7.5,
        fontname="helv",
        color=C_MUTED,
    )


def _draw_running_header(page, tier_label, is_answer_key):
    lbl = "ClipSAT Digital SAT Math Practice Bank — %s" % tier_label
    if is_answer_key:
        lbl += " (Answer Key & Solutions)"
    page.insert_text(
        fitz.Point(MARGIN_L, 30.0),
        lbl,
        fontsize=7.5,
        fontname="helv",
        color=C_MUTED,
    )
    right = "clipsat.org"
    rw = fitz.get_text_length(right, fontname="helv", fontsize=7.5)
    page.insert_text(
        fitz.Point(PAGE_W - MARGIN_R - rw, 30.0),
        right,
        fontsize=7.5,
        fontname="helv",
        color=C_MUTED,
    )
    page.draw_line(
        fitz.Point(MARGIN_L, 36.0),
        fitz.Point(PAGE_W - MARGIN_R, 36.0),
        color=C_BORDER,
        width=0.5,
    )


def _draw_page1_header(page, title_text, sub_text, is_answer_key):
    y = 48.0
    page.insert_text(
        fitz.Point(MARGIN_L, y),
        title_text,
        fontsize=15.0,
        fontname="hebo",
        color=C_INK,
    )
    y += 15.0
    page.insert_text(
        fitz.Point(MARGIN_L, y),
        sub_text,
        fontsize=8.5,
        fontname="helv",
        color=C_MUTED,
    )
    if is_answer_key:
        y += 13.0
        page.insert_text(
            fitz.Point(MARGIN_L, y),
            "ANSWER KEY — QUICK REFERENCE GRID & COMPLETE WORKED SOLUTIONS",
            fontsize=8.5,
            fontname="hebo",
            color=C_AMBER,
        )
    if os.path.exists(LOGO_PATH):
        logo_w = 28.0
        logo_h = logo_w * 240.0 / 212.0
        logo_rect = fitz.Rect(
            PAGE_W - MARGIN_R - logo_w, 34.0, PAGE_W - MARGIN_R, 34.0 + logo_h
        )
        page.insert_image(logo_rect, filename=LOGO_PATH)

    rule_y = y + 12.0
    page.draw_line(
        fitz.Point(MARGIN_L, rule_y),
        fitz.Point(PAGE_W - MARGIN_R, rule_y),
        color=C_INDIGO,
        width=1.1,
    )
    return rule_y + 16.0


def _compute_content_bbox(page):
    rects = []
    for b in page.get_text("blocks"):
        # b = (x0, y0, x1, y1, text, block_no, block_type)
        if b[6] == 0 and str(b[4]).strip():
            rects.append(fitz.Rect(b[0], b[1], b[2], b[3]))
    for d in page.get_drawings():
        r = d.get("rect")
        if r and r.width > 0.2 and r.height > 0.2:
            # Ignore huge full-page background/frame artifacts if any
            if r.width < 595.0 or r.height < 760.0:
                rects.append(r)
    if not rects:
        return None
    u = fitz.Rect(rects[0])
    for r in rects[1:]:
        u |= r
    return u


def _redact_practice_slice(sub_doc, sub_pno, idx_in_q, mk, stop_reached):
    """Redact header table, Answer heading, and Correct Answer / Rationale from a single page.
    Returns (keep_page: bool, stop_reached_after: bool)."""
    if stop_reached:
        return False, True
    p = sub_doc[sub_pno]
    redacted_any = False

    # Top cut: above Question on first page, or top margin on continuation page
    if idx_in_q == 0:
        y_top = (mk["question"][3] + 1.0) if mk["question"] else 135.0
        p.add_redact_annot(fitz.Rect(0, 0, PAGE_W, y_top))
        redacted_any = True

    # Remove the redundant "Answer" sub-heading word (we already tag [MCQ] in ClipSAT meta)
    if mk["answer"]:
        ax0, ay0, ax1, ay1 = mk["answer"]
        p.add_redact_annot(fitz.Rect(14.0, ay0 - 1.5, 65.0, ay1 + 1.5))
        redacted_any = True

    # Bottom cut: Correct Answer or Rationale
    y_stop = None
    if mk["correct"] is not None:
        y_stop = mk["correct"][1] - 2.0
    elif mk["rationale"] is not None:
        y_stop = mk["rationale"][1] - 2.0

    new_stop = stop_reached
    if y_stop is not None:
        p.add_redact_annot(fitz.Rect(0, y_stop, PAGE_W, PAGE_H))
        redacted_any = True
        new_stop = True

    if redacted_any:
        p.apply_redactions(images=2, graphics=1)

    bbox = _compute_content_bbox(p)
    return (bbox is not None and bbox.height > 2.0), new_stop


def _redact_rationale_slice(sub_doc, sub_pno, idx_in_q, mk, started):
    """Redact everything BEFORE Rationale's body (keep only Rationale steps).
    Returns (keep_page: bool, started_after: bool)."""
    p = sub_doc[sub_pno]
    if not started:
        if mk["rationale"] is not None:
            y_cut = mk["rationale"][3] + 1.0
            p.add_redact_annot(fitz.Rect(0, 0, PAGE_W, y_cut))
            p.apply_redactions(images=2, graphics=1)
            bbox = _compute_content_bbox(p)
            return (bbox is not None and bbox.height > 2.0), True
        elif mk["correct"] is not None:
            y_cut = mk["correct"][3] + 1.0
            p.add_redact_annot(fitz.Rect(0, 0, PAGE_W, y_cut))
            p.apply_redactions(images=2, graphics=1)
            bbox = _compute_content_bbox(p)
            return (bbox is not None and bbox.height > 2.0), True
        return False, False
    else:
        bbox = _compute_content_bbox(p)
        return (bbox is not None and bbox.height > 2.0), True


def _format_answer_badge(q):
    if q["type"] == "mcq":
        return chr(ord("A") + q["answer"])
    return str(q["sprAnswer"])


def _draw_question_badge_header(page, cy, qnum, q, tier_label, show_correct=False):
    # Number in ClipSAT Indigo on left column (x = MARGIN_L = 54)
    page.insert_text(
        fitz.Point(MARGIN_L, cy + 10.0),
        str(qnum),
        fontsize=10.0,
        fontname="hebo",
        color=C_INDIGO,
    )
    # Tier + Type + Domain/Skill metadata line at x = VEC_X_INDENT (78)
    x = VEC_X_INDENT
    t_col = C_CURVE if q["difficulty"] == "easy" else (C_AMBER_TEXT if q["difficulty"] == "hard" else C_INDIGO2)
    diff_tag = "[%s]" % tier_label
    page.insert_text(fitz.Point(x, cy + 9.0), diff_tag, fontsize=8.0, fontname="hebo", color=t_col)
    x += fitz.get_text_length(diff_tag, fontname="hebo", fontsize=8.0)

    sep = "  •  "
    page.insert_text(fitz.Point(x, cy + 9.0), sep, fontsize=8.0, fontname="helv", color=C_MUTED)
    x += fitz.get_text_length(sep, fontname="helv", fontsize=8.0)

    qtype_tag = "[%s]" % q["type"].upper()
    page.insert_text(fitz.Point(x, cy + 9.0), qtype_tag, fontsize=8.0, fontname="hebo", color=C_INDIGO)
    x += fitz.get_text_length(qtype_tag, fontname="hebo", fontsize=8.0)

    dom_skill = "  •  %s — %s" % (DOMAIN_SHORT.get(q["domain"], q["domain"]), q["skill"])
    # Truncate gracefully if very long when show_correct is enabled
    max_x = (PAGE_W - MARGIN_R - 115.0) if show_correct else (PAGE_W - MARGIN_R)
    while len(dom_skill) > 12 and x + fitz.get_text_length(dom_skill, fontname="helv", fontsize=8.0) > max_x:
        dom_skill = dom_skill[:-4] + "…"
    page.insert_text(fitz.Point(x, cy + 9.0), dom_skill, fontsize=8.0, fontname="helv", color=C_MUTED)

    if show_correct:
        ans_lbl = "Correct Answer: %s" % _format_answer_badge(q)
        aw = fitz.get_text_length(ans_lbl, fontname="hebo", fontsize=8.5)
        bx1 = PAGE_W - MARGIN_R
        bx0 = bx1 - aw - 12.0
        box_rect = fitz.Rect(bx0, cy - 1.0, bx1, cy + 13.0)
        page.draw_rect(box_rect, color=C_GREEN, fill=C_BG_KEY, width=0.7)
        page.insert_text(
            fitz.Point(bx0 + 6.0, cy + 9.0),
            ans_lbl,
            fontsize=8.5,
            fontname="hebo",
            color=C_GREEN,
        )


def _draw_section_banner(page, cy, part_num_roman, domain_name, q_count):
    page.draw_line(
        fitz.Point(MARGIN_L, cy),
        fitz.Point(PAGE_W - MARGIN_R, cy),
        color=C_BORDER,
        width=0.7,
    )
    cy += 16.0
    heading = "Part %s — %s (%d Questions)" % (
        part_num_roman,
        DOMAIN_SHORT.get(domain_name, domain_name),
        q_count,
    )
    page.insert_text(
        fitz.Point(MARGIN_L, cy),
        heading,
        fontsize=12.0,
        fontname="hebo",
        color=C_INK,
    )
    return cy + 16.0


def build_branded_pdfs_for_tier(src_doc, tier_cfg, ordered_questions):
    tier = tier_cfg["tier"]
    tier_label = tier_cfg["label"]
    total_q = len(ordered_questions)
    mcq_n = sum(1 for q in ordered_questions if q["type"] == "mcq")
    spr_n = total_q - mcq_n

    romans = ["I", "II", "III", "IV"]
    domain_counts = {d: sum(1 for q in ordered_questions if q["domain"] == d) for d in DOMAINS}

    # Process redactions in batches of 80 questions so memory stays low while preserving vector resources
    BATCH_Q = 80
    prac_path = os.path.join(OUT_DIR, "clipsat-sat-all-%s-practice.pdf" % tier)
    ak_path = os.path.join(OUT_DIR, "clipsat-sat-all-%s-answerkey.pdf" % tier)

    prac_out = fitz.open()
    ak_out = fitz.open()

    # ── Page 1 Setup for Practice PDF ─────────────────────────────────────────
    p_page = prac_out.new_page(width=PAGE_W, height=PAGE_H)
    p_cy = _draw_page1_header(
        p_page,
        tier_cfg["pdfTitle"],
        "ClipSAT Printable Practice Suite (clipsat.org)  •  %d Questions (%d MCQs + %d SPRs)  •  Calculator Permitted"
        % (total_q, mcq_n, spr_n),
        is_answer_key=False,
    )

    # ── Page 1 Setup + Quick Answer Reference Grid for Answer Key PDF ─────────
    a_page = ak_out.new_page(width=PAGE_W, height=PAGE_H)
    a_cy = _draw_page1_header(
        a_page,
        tier_cfg["pdfTitle"],
        "ClipSAT Printable Practice Suite (clipsat.org)  •  %d Questions (%d MCQs + %d SPRs)  •  4 SAT Domains"
        % (total_q, mcq_n, spr_n),
        is_answer_key=True,
    )

    # Quick Answer Key Grid (5 columns across BODY_W)
    a_page.insert_text(
        fitz.Point(MARGIN_L, a_cy),
        "Quick Reference Answer Key (Questions 1-%d)" % total_q,
        fontsize=11.0,
        fontname="hebo",
        color=C_INDIGO,
    )
    a_cy += 14.0

    cols = 5
    col_w = BODY_W / cols
    row_h = 13.5
    per_col = (total_q + cols - 1) // cols
    # Lay out cleanly row-by-row across 5 columns so page breaks work naturally
    rows_needed = per_col
    for r_idx in range(rows_needed):
        if a_cy + row_h > 736.0:
            _draw_footer(a_page, len(ak_out))
            a_page = ak_out.new_page(width=PAGE_W, height=PAGE_H)
            _draw_running_header(a_page, tier_label, True)
            a_cy = 52.0
        if r_idx % 2 == 0:
            a_page.draw_rect(
                fitz.Rect(MARGIN_L, a_cy - 9.5, PAGE_W - MARGIN_R, a_cy + 3.5),
                color=None,
                fill=C_BG_SOFT,
            )
        for c_idx in range(cols):
            q_idx = r_idx * cols + c_idx
            if q_idx >= total_q:
                break
            q_obj = ordered_questions[q_idx]
            ans_str = _format_answer_badge(q_obj)
            if len(ans_str) > 10:
                ans_str = ans_str[:9] + "…"
            cx = MARGIN_L + c_idx * col_w + 4.0
            q_lbl = "%d." % (q_idx + 1)
            a_page.insert_text(fitz.Point(cx, a_cy), q_lbl, fontsize=8.0, fontname="hebo", color=C_INDIGO)
            a_page.insert_text(
                fitz.Point(cx + 24.0, a_cy),
                ans_str,
                fontsize=8.0,
                fontname="hebo",
                color=C_GREEN,
            )
        a_cy += row_h

    # Start Worked Solutions on fresh page in Answer Key
    _draw_footer(a_page, len(ak_out))
    a_page = ak_out.new_page(width=PAGE_W, height=PAGE_H)
    _draw_running_header(a_page, tier_label, True)
    a_cy = 54.0

    # ── Render Questions & Worked Solutions in Domain Order ───────────────────
    p_cur_dom = None
    a_cur_dom = None

    for b_start in range(0, total_q, BATCH_Q):
        batch = ordered_questions[b_start : b_start + BATCH_Q]

        # Build two sub-docs for this batch: one for practice redactions, one for answer-key rationales
        p_sub = fitz.open()
        a_sub = fitz.open()
        p_page_map = []  # (sub_pno, idx_in_q, page_markers)
        a_page_map = []

        for q in batch:
            for idx_in_q, src_pno in enumerate(q["pages"]):
                mk = find_page_markers(src_doc[src_pno], is_first_page=(idx_in_q == 0))
                p_sub.insert_pdf(src_doc, from_page=src_pno, to_page=src_pno)
                p_page_map.append((len(p_sub) - 1, idx_in_q, mk))
                a_sub.insert_pdf(src_doc, from_page=src_pno, to_page=src_pno)
                a_page_map.append((len(a_sub) - 1, idx_in_q, mk))

        # Apply redactions per question inside batch sub-docs, then collect clips after clean xref reload
        p_cursor = 0
        a_cursor = 0
        q_slice_specs = []
        for q in batch:
            n_pages = len(q["pages"])

            # Practice slices
            p_kept_pages = []
            stop_reached = False
            for _ in range(n_pages):
                sub_pno, idx_in_q, mk = p_page_map[p_cursor]
                p_cursor += 1
                keep, stop_reached = _redact_practice_slice(
                    p_sub, sub_pno, idx_in_q, mk, stop_reached
                )
                if keep:
                    bbox = _compute_content_bbox(p_sub[sub_pno])
                    if bbox is not None:
                        clip = fitz.Rect(
                            VEC_X_CLIP_L,
                            max(0.0, bbox.y0 - 2.0),
                            VEC_X_CLIP_R,
                            min(PAGE_H, bbox.y1 + 2.0),
                        )
                        p_kept_pages.append((sub_pno, clip))

            # Answer key rationale slices
            a_kept_pages = []
            started = False
            for _ in range(n_pages):
                sub_pno, idx_in_q, mk = a_page_map[a_cursor]
                a_cursor += 1
                keep, started = _redact_rationale_slice(
                    a_sub, sub_pno, idx_in_q, mk, started
                )
                if keep:
                    bbox = _compute_content_bbox(a_sub[sub_pno])
                    if bbox is not None:
                        clip = fitz.Rect(
                            VEC_X_CLIP_L,
                            max(0.0, bbox.y0 - 2.0),
                            VEC_X_CLIP_R,
                            min(PAGE_H, bbox.y1 + 2.0),
                        )
                        a_kept_pages.append((sub_pno, clip))

            q_slice_specs.append((q, p_kept_pages, a_kept_pages))

        # Reload redacted batch documents to sanitize xref tables before show_pdf_page grafting
        p_sub_clean = fitz.open("pdf", p_sub.tobytes(garbage=3, deflate=True))
        a_sub_clean = fitz.open("pdf", a_sub.tobytes(garbage=3, deflate=True))
        p_sub.close()
        a_sub.close()

        for q, p_slices, a_slices in q_slice_specs:
            qnum = q["idx"] + 1

            # ── Emit into Practice PDF ────────────────────────────────────────
            if q["domain"] != p_cur_dom:
                p_cur_dom = q["domain"]
                if p_cy + 90.0 > 735.0:
                    _draw_footer(p_page, len(prac_out))
                    p_page = prac_out.new_page(width=PAGE_W, height=PAGE_H)
                    _draw_running_header(p_page, tier_label, False)
                    p_cy = 52.0
                dom_idx = DOMAINS.index(p_cur_dom)
                p_cy = _draw_section_banner(
                    p_page, p_cy, romans[dom_idx], p_cur_dom, domain_counts[p_cur_dom]
                )

            spr_box_h = 26.0 if q["type"] == "spr" else 0.0
            first_slice_h = (
                p_slices[0][1].height * VEC_SCALE if p_slices else 20.0
            )
            needed_first = 16.0 + min(first_slice_h, 640.0) + (
                spr_box_h if len(p_slices) <= 1 else 0.0
            )
            if p_cy + needed_first > 736.0:
                _draw_footer(p_page, len(prac_out))
                p_page = prac_out.new_page(width=PAGE_W, height=PAGE_H)
                _draw_running_header(p_page, tier_label, False)
                p_cy = 52.0

            _draw_question_badge_header(p_page, p_cy, qnum, q, tier_label, show_correct=False)
            p_cy += 15.0

            for s_idx, (spno, clip) in enumerate(p_slices):
                sc = VEC_SCALE
                h = clip.height * sc
                if h > 665.0:
                    sc = VEC_SCALE * (665.0 / h)
                    h = 665.0
                if p_cy + h > 736.0:
                    _draw_footer(p_page, len(prac_out))
                    p_page = prac_out.new_page(width=PAGE_W, height=PAGE_H)
                    _draw_running_header(p_page, tier_label, False)
                    p_cy = 52.0
                w_draw = clip.width * sc
                target = fitz.Rect(VEC_X_INDENT, p_cy, VEC_X_INDENT + w_draw, p_cy + h)
                p_page.show_pdf_page(target, p_sub_clean, spno, clip=clip)
                p_cy += h + 4.0

            if q["type"] == "spr":
                if p_cy + 26.0 > 736.0:
                    _draw_footer(p_page, len(prac_out))
                    p_page = prac_out.new_page(width=PAGE_W, height=PAGE_H)
                    _draw_running_header(p_page, tier_label, False)
                    p_cy = 52.0
                box_r = fitz.Rect(VEC_X_INDENT, p_cy + 2.0, VEC_X_INDENT + 240.0, p_cy + 22.0)
                p_page.draw_rect(box_r, color=C_BORDER, fill=C_BG_SOFT, width=0.8)
                p_page.insert_text(
                    fitz.Point(VEC_X_INDENT + 8.0, p_cy + 14.5),
                    "Student-Produced Response:  ___________________",
                    fontsize=8.0,
                    fontname="helv",
                    color=C_MUTED,
                )
                p_cy += 26.0

            p_cy += 11.0

            # ── Emit into Answer Key PDF ──────────────────────────────────────
            if q["domain"] != a_cur_dom:
                a_cur_dom = q["domain"]
                if a_cy + 90.0 > 735.0:
                    _draw_footer(a_page, len(ak_out))
                    a_page = ak_out.new_page(width=PAGE_W, height=PAGE_H)
                    _draw_running_header(a_page, tier_label, True)
                    a_cy = 52.0
                dom_idx = DOMAINS.index(a_cur_dom)
                a_cy = _draw_section_banner(
                    a_page, a_cy, romans[dom_idx], a_cur_dom, domain_counts[a_cur_dom]
                )

            a_first_h = a_slices[0][1].height * VEC_SCALE if a_slices else 14.0
            if a_cy + 16.0 + min(a_first_h, 640.0) > 736.0:
                _draw_footer(a_page, len(ak_out))
                a_page = ak_out.new_page(width=PAGE_W, height=PAGE_H)
                _draw_running_header(a_page, tier_label, True)
                a_cy = 52.0

            _draw_question_badge_header(a_page, a_cy, qnum, q, tier_label, show_correct=True)
            a_cy += 16.0

            for spno, clip in a_slices:
                sc = VEC_SCALE
                h = clip.height * sc
                if h > 665.0:
                    sc = VEC_SCALE * (665.0 / h)
                    h = 665.0
                if a_cy + h > 736.0:
                    _draw_footer(a_page, len(ak_out))
                    a_page = ak_out.new_page(width=PAGE_W, height=PAGE_H)
                    _draw_running_header(a_page, tier_label, True)
                    a_cy = 52.0
                w_draw = clip.width * sc
                target = fitz.Rect(VEC_X_INDENT, a_cy, VEC_X_INDENT + w_draw, a_cy + h)
                a_page.show_pdf_page(target, a_sub_clean, spno, clip=clip)
                a_cy += h + 4.0

            a_cy += 10.0

        p_sub_clean.close()
        a_sub_clean.close()

    _draw_footer(p_page, len(prac_out))
    _draw_footer(a_page, len(ak_out))

    prac_out.set_metadata(
        {
            "title": tier_cfg["pdfTitle"],
            "author": "ClipSAT (clipsat.org)",
            "subject": "ClipSAT Digital SAT Math Practice Bank",
            "creator": "ClipSAT Practice Bank Generator (clipsat.org)",
        }
    )
    ak_out.set_metadata(
        {
            "title": tier_cfg["pdfTitle"] + " — Answer Key & Worked Solutions",
            "author": "ClipSAT (clipsat.org)",
            "subject": "ClipSAT Digital SAT Math Answer Key & Worked Solutions",
            "creator": "ClipSAT Practice Bank Generator (clipsat.org)",
        }
    )

    prac_out.save(prac_path, garbage=4, deflate=True)
    ak_out.save(ak_path, garbage=4, deflate=True)
    p_pages = len(prac_out)
    a_pages = len(ak_out)
    prac_out.close()
    ak_out.close()

    return prac_path, p_pages, ak_path, a_pages


def process_tier(tier_cfg):
    t0 = time.time()
    tier = tier_cfg["tier"]
    src_path = os.path.join(SOURCE_DIR, tier_cfg["filename"])
    if not os.path.exists(src_path):
        raise FileNotFoundError("Missing source PDF: %s" % src_path)

    print("\n=== Processing %s (%s) ===" % (tier_cfg["label"], tier_cfg["filename"]))
    src_doc = fitz.open(src_path)

    # 1. Group pages by Question ID
    raw_questions = []
    cur = None
    for pno in range(len(src_doc)):
        txt = src_doc[pno].get_text("text")
        m = re.search(r"Question ID:\s*([0-9a-fA-F]+)", txt)
        if m:
            if cur:
                raw_questions.append(cur)
            domain, skill = parse_header_meta(src_doc[pno])
            mk0 = find_page_markers(src_doc[pno])
            cur = {
                "id": m.group(1),
                "pages": [pno],
                "text": txt,
                "domain": domain,
                "skill": skill,
                "difficulty": tier,
                "has_ans_head": mk0["answer"] is not None,
            }
        else:
            if cur is None:
                raise RuntimeError("Orphan page %d in %s" % (pno, tier_cfg["filename"]))
            cur["pages"].append(pno)
            cur["text"] += "\n" + txt
            mk_next = find_page_markers(src_doc[pno])
            if mk_next["answer"] is not None:
                cur["has_ans_head"] = True
    if cur:
        raw_questions.append(cur)

    # Resolve answers
    for q in raw_questions:
        qtype, ans_data = parse_question_answer(q["text"], q["id"], q["has_ans_head"])
        q["type"] = qtype
        q.update(ans_data)

    # Order cleanly by canonical SAT Domain while preserving source order within each domain
    ordered = []
    for d in DOMAINS:
        ordered.extend([q for q in raw_questions if q["domain"] == d])
    for idx, q in enumerate(ordered):
        q["idx"] = idx

    mcq_n = sum(1 for q in ordered if q["type"] == "mcq")
    spr_n = len(ordered) - mcq_n
    print("  Parsed %d questions (%d MCQ, %d SPR) across 4 domains." % (len(ordered), mcq_n, spr_n))

    # 2. Extract CBT PNG crops & emit shards + index JSON
    index_items = []
    shard_map = {}  # shard_id -> dict(str(idx) -> asset)
    for q in ordered:
        crops = extract_cbt_images(src_doc, q)
        item_meta = {
            "idx": q["idx"],
            "id": q["id"],
            "domain": q["domain"],
            "skill": q["skill"],
            "difficulty": q["difficulty"],
            "type": q["type"],
        }
        if q["type"] == "mcq":
            item_meta["answer"] = q["answer"]
        else:
            item_meta["sprAnswer"] = q["sprAnswer"]
            item_meta["sprAnswers"] = q["sprAnswers"]
        index_items.append(item_meta)

        sh_id = q["idx"] // SHARD_SIZE
        shard_map.setdefault(sh_id, {})[str(q["idx"])] = crops

    index_path = os.path.join(CBT_DIR, "%s-index.json" % tier)
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "tier": tier,
                "title": tier_cfg["cbtTitle"],
                "total": len(ordered),
                "mcqCount": mcq_n,
                "sprCount": spr_n,
                "shardSize": SHARD_SIZE,
                "items": index_items,
            },
            f,
            ensure_ascii=False,
            separators=(",", ":"),
        )

    for sh_id, sh_items in sorted(shard_map.items()):
        sh_path = os.path.join(CBT_DIR, "%s-%02d.json" % (tier, sh_id))
        with open(sh_path, "w", encoding="utf-8") as f:
            json.dump(
                {"tier": tier, "shard": sh_id, "items": sh_items},
                f,
                ensure_ascii=False,
                separators=(",", ":"),
            )
    print("  Wrote CBT index + %d shards to %s" % (len(shard_map), CBT_DIR))

    # 3. Generate ClipSAT-branded Practice + Answer Key PDFs
    prac_path, p_pages, ak_path, a_pages = build_branded_pdfs_for_tier(
        src_doc, tier_cfg, ordered
    )
    src_doc.close()

    p_mb = os.path.getsize(prac_path) / (1024.0 * 1024.0)
    a_mb = os.path.getsize(ak_path) / (1024.0 * 1024.0)
    print(
        "  Wrote %s (%d pages, %.2f MB) & %s (%d pages, %.2f MB) in %.1fs"
        % (
            os.path.basename(prac_path),
            p_pages,
            p_mb,
            os.path.basename(ak_path),
            a_pages,
            a_mb,
            time.time() - t0,
        )
    )


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(CBT_DIR, exist_ok=True)
    selected = set(sys.argv[1:]) if len(sys.argv) > 1 else {"easy", "medium", "hard"}
    for cfg in TIERS:
        if cfg["tier"] in selected:
            process_tier(cfg)


if __name__ == "__main__":
    main()
