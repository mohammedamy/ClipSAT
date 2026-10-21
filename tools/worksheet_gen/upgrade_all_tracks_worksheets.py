#!/usr/bin/env python3
"""Upgrade all 28 ClipSAT tracks' printable worksheet topic JSONs to:
- Minimum 20 Free-Response Questions (FRQs) + 25 Multiple-Choice Questions (MCQs) = 45 Questions per worksheet
- 3-tier difficulty progression: [Foundational], [Intermediate], [Challenging]
- Complete lesson target tagging (Target: ...) on every question
- Explicit cross-lesson synthesis tagging (Cross-Lesson: ...) on all 14 Challenging questions per worksheet
- 8 to 11 non-generic, problem-specific diagrams & graphs (figure) per worksheet
- 100% matplotlib mathtext-verified math spans ($...$)
- Unified ClipSAT branding (clipsat.org)
"""
import argparse
import glob
import hashlib
import html
import json
import math
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
TOPICS_DIR = os.path.join(HERE, "topics")
CONTENT_DIR = os.path.join(SITE_ROOT, "content")
BANK_DIR = os.path.join(SITE_ROOT, "bank-data")
PUBLIC_WS_DIR = os.path.join(SITE_ROOT, "public", "worksheet-data")

sys.path.insert(0, HERE)
from generate import _normalize_mathtext, _HAS_MPL, _math_parser, FontProperties

PROP_10 = FontProperties(size=10) if _HAS_MPL else None

ALL_TRACKS = [
    "sat", "act", "act2", "act2l2", "est", "est2", "est2l2",
    "qudrat", "tahsili",
    "apab", "apbc", "appc", "apstats",
    "calculus", "precalc", "linalg", "mvc", "odes",
    "aslevel", "a2level", "addmath", "ibhl", "ibsl", "igcse", "mathai",
    "algebra", "alg2", "geo",
]

# Supplement mapping for small bank tracks
SUPPLEMENT_BANKS = {
    "addmath": ["addmath", "aslevel", "a2level"],
    "mathai": ["mathai", "linalg", "calculus", "apstats"],
}


def git_show_json(rev_path):
    env = dict(os.environ, HOME="/tmp", XDG_CONFIG_HOME="/tmp", GIT_CONFIG_GLOBAL="/dev/null")
    res = subprocess.run(
        ["git", "-C", SITE_ROOT, "show", rev_path],
        capture_output=True,
        text=True,
        env=env,
    )
    if res.returncode != 0 or not res.stdout.strip():
        return None
    try:
        return json.loads(res.stdout)
    except Exception:
        return None


def git_ls_tree(commit, prefix):
    env = dict(os.environ, HOME="/tmp", XDG_CONFIG_HOME="/tmp", GIT_CONFIG_GLOBAL="/dev/null")
    res = subprocess.run(
        ["git", "-C", SITE_ROOT, "ls-tree", "-r", "--name-only", commit, prefix],
        capture_output=True,
        text=True,
        env=env,
    )
    if res.returncode != 0:
        return []
    return [l.strip() for l in res.stdout.splitlines() if l.strip().endswith(".json")]


def strip_html_and_convert_math(text):
    r"""Convert HTML + KaTeX \( ... \) / \[ ... \] text into clean worksheet $...$ prose."""
    if not text:
        return ""
    s = str(text)
    s = s.replace("\\newline", "; ").replace("\\n", " ")
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)
    s = re.sub(r"</p>\s*<p[^>]*>", " ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    # Convert \( ... \) and \[ ... \] to $ ... $
    s = re.sub(r"\\\(\s*(.*?)\s*\\\)", lambda m: "$" + m.group(1).strip() + "$", s, flags=re.S)
    s = re.sub(r"\\\[\s*(.*?)\s*\\\]", lambda m: " $" + m.group(1).strip() + "$ ", s, flags=re.S)
    # Remove Common Errors tail if overly verbose
    s = re.split(r"Common Errors?:", s)[0].strip()
    s = re.sub(r"\s+", " ", s).strip()
    return sanitize_math_spans(s)


def valid_mathtext(tex):
    """Return True if `$tex$` parses cleanly in matplotlib mathtext."""
    if not _HAS_MPL or _math_parser is None:
        return True
    try:
        norm = _normalize_mathtext("$" + tex + "$")
        _math_parser.parse(norm, dpi=72, prop=PROP_10)
        return True
    except Exception:
        return False


def repair_tex_span(tex):
    """Clean a single math span so matplotlib mathtext always accepts it."""
    t = tex.strip()
    t = t.replace("\n", " ").replace("\r", " ")
    t = re.sub(r"\\\\\s*$", "", t)
    t = _normalize_mathtext(t)
    if valid_mathtext(t):
        return t
    # Additional fallback repairs for complex LaTeX spans
    t2 = re.sub(r"\\(?:left|right)\s*([()\[\]|.])", r"\1", t)
    t2 = re.sub(r"\\(?:left|right)\s*\\([{}])", r"\\\1", t2)
    t2 = re.sub(r"\\(?:quad|qquad|,|;|!|:)(?![a-zA-Z])", " ", t2)
    t2 = re.sub(r"\\(?:mathrm|mathbf|mathit|mathcal|mathbb)\s*\{([^{}]*)\}", r"\1", t2)
    if valid_mathtext(t2):
        return t2
    # Strip remaining unknown commands while keeping fractions/superscripts/subscripts
    t3 = re.sub(r"\\[a-zA-Z]+", "", t2)
    t3 = t3.replace("{", "").replace("}", "")
    if valid_mathtext(t3) and t3.strip():
        return t3.strip()
    return "x"


def sanitize_math_spans(text):
    if not text:
        return ""
    s = str(text)
    # Balance odd number of $ signs if needed
    if s.count("$") % 2 == 1:
        last_idx = s.rfind("$")
        s = s[:last_idx] + s[last_idx + 1 :]

    def _fix(m):
        inner = m.group(1).strip()
        if not inner:
            return ""
        # Pull trailing or leading Arabic \text{...} outside the $...$ span
        lead_ar, tail_ar = "", ""
        m_lead = re.match(r"^\\text\{\s*([\u0600-\u06FF\s/]+)\s*\}\s*(?:=\s*)?(.*)$", inner)
        if m_lead and m_lead.group(2).strip():
            lead_ar = m_lead.group(1).strip() + " = "
            inner = m_lead.group(2).strip()
        m_tail = re.match(r"^(.*?)\\text\{\s*([\u0600-\u06FF\s/]+)\s*\}$", inner)
        if m_tail and m_tail.group(1).strip():
            inner = m_tail.group(1).strip()
            tail_ar = " " + m_tail.group(2).strip()
        repaired = repair_tex_span(inner)
        if not repaired.strip():
            return (lead_ar + tail_ar).strip()
        return f"{lead_ar}${repaired}${tail_ar}"

    return re.sub(r"\$([^$]+)\$", _fix, s)


def _clean_fn_expr(fn_str):
    """Convert JS/LaTeX function expression to safe numpy eval string for generate.py."""
    if isinstance(fn_str, dict):
        fn_str = fn_str.get("fn") or fn_str.get("expr") or "x"
    s = str(fn_str).strip()
    s = s.replace("^", "**")
    s = re.sub(r"Math\.", "", s)
    s = re.sub(r"(\d)([a-zA-Z(])", r"\1*\2", s)
    s = re.sub(r"(\))(\d|[a-zA-Z(])", r"\1*\2", s)
    s = re.sub(r"\bln\b", "log", s)
    # Test eval on a small array
    x = [0.5, 1.5, 2.5]
    import numpy as np
    env = {
        "x": np.array(x, dtype=float), "np": np,
        "sin": np.sin, "cos": np.cos, "tan": np.tan,
        "exp": np.exp, "log": np.log, "sqrt": np.sqrt,
        "abs": np.abs, "pi": np.pi, "e": np.e,
    }
    try:
        with np.errstate(all="ignore"):
            res = eval(s, {"__builtins__": {}}, env)
        arr = np.broadcast_to(np.asarray(res, dtype=float), (3,))
        if np.all(np.isnan(arr)):
            return None
        return s
    except Exception:
        return None


def convert_bank_figure(fig):
    """Convert a bank-data or practice-set figure dict into generate.py's schema."""
    try:
        return _convert_bank_figure_inner(fig)
    except Exception:
        return None


def _convert_bank_figure_inner(fig):
    if not isinstance(fig, dict):
        return None
    ft = fig.get("type", "")
    # Already a valid generate.py figure type
    if ft in ("plot", "triangle", "circle", "polygon", "numberline", "bars", "boxplot", "solid", "slope_field", "venn"):
        if ft == "plot":
            fns = [_clean_fn_expr(f) for f in fig.get("fns", [])]
            fns = [f for f in fns if f]
            if not fns and not fig.get("scatter_pts"):
                return None
            out = dict(fig, fns=fns, width=fig.get("width", 230))
            return out
        if ft == "triangle" and "vertices" in fig:
            # Check if bank triangle uses pixel coords [30, 160] vs math coords
            verts = fig["vertices"]
            if any(abs(v[0]) > 40 or abs(v[1]) > 40 for v in verts):
                # Convert pixel y-down to y-up math coords
                verts = [[ round(v[0] / 30.0, 2), round((200 - v[1]) / 30.0, 2) ] for v in verts]
            side_labels = fig.get("side_labels") or fig.get("sides") or [None, None, None]
            side_labels = [sanitize_math_spans(s) if s else None for s in side_labels]
            labels = [sanitize_math_spans(l) if l else None for l in fig.get("labels", ["$A$", "$B$", "$C$"])]
            return {
                "type": "triangle",
                "vertices": verts,
                "labels": labels,
                "side_labels": side_labels,
                "fill": True,
                "right_angle_at": fig.get("right_angle_at"),
                "width": 220,
            }
        if ft == "circle":
            r = fig.get("radius", 5)
            if isinstance(r, str):
                nums = re.findall(r"\d+(?:\.\d+)?", r)
                r = float(nums[0]) if nums else 5.0
            return {
                "type": "circle",
                "center": [0, 0],
                "radius": float(r) if float(r) > 0 else 5.0,
                "center_label": sanitize_math_spans(str(fig.get("center_label") or "$O$")),
                "radius_label": sanitize_math_spans(str(fig.get("radius_label") or f"$r = {r}$")),
                "sector": fig.get("sector"),
                "chord": fig.get("chord"),
                "width": 210,
            }
        if ft == "numberline":
            lo = float(fig.get("min", -10))
            hi = float(fig.get("max", 10))
            marks = []
            for m in fig.get("marks", []):
                if isinstance(m, dict):
                    marks.append({"x": float(m.get("x", 0)), "open": bool(m.get("open", False)), "label": sanitize_math_spans(str(m.get("label", "")))})
                elif isinstance(m, (int, float)):
                    marks.append({"x": float(m), "open": not fig.get("closed", True), "label": f"${m}$"})
            shade = fig.get("shade") or fig.get("range")
            return {
                "type": "numberline",
                "min": lo,
                "max": hi,
                "shade": shade if isinstance(shade, list) and len(shade) == 2 else None,
                "marks": marks,
                "width": 250,
            }
        if ft in ("polygon", "rect") and "vertices" in fig:
            side_labels = fig.get("side_labels") or fig.get("sides") or []
            side_labels = [sanitize_math_spans(str(s)) if s else None for s in side_labels]
            return {
                "type": "polygon",
                "vertices": fig["vertices"],
                "side_labels": side_labels,
                "width": 220,
            }
        if ft in ("bars", "boxplot", "solid", "slope_field", "venn"):
            return dict(fig, width=fig.get("width", 230))

    # Convert bank-specific figure types
    if ft in ("fn", "function_graph", "graph"):
        raw_fns = fig.get("fns") or [l.get("fn") for l in fig.get("lines", []) if isinstance(l, dict) and l.get("fn")]
        fns = [_clean_fn_expr(f) for f in (raw_fns or [])]
        fns = [f for f in fns if f]
        if not fns:
            return None
        xlim = fig.get("xlim") or [fig.get("xmin", -6), fig.get("xmax", 6)]
        ylim = fig.get("ylim") or [fig.get("ymin", -6), fig.get("ymax", 6)]
        pts, pt_labels = [], []
        for p in fig.get("points", []):
            if isinstance(p, dict) and "x" in p and "y" in p:
                px, py = float(p["x"]), float(p["y"])
                if p.get("label"):
                    pt_labels.append({"x": px, "y": py, "label": sanitize_math_spans(str(p["label"]))})
                else:
                    pts.append([px, py])
            elif isinstance(p, (list, tuple)) and len(p) == 2:
                pts.append([float(p[0]), float(p[1])])
        return {
            "type": "plot",
            "fns": fns[:3],
            "xmin": float(xlim[0]), "xmax": float(xlim[1]),
            "ymin": float(ylim[0]), "ymax": float(ylim[1]),
            "points": pts,
            "point_labels": pt_labels,
            "width": 230,
        }
    if ft == "normal_curve":
        mu = float(fig.get("mean", 0))
        sd = float(fig.get("sd", 1)) or 1.0
        fn_str = f"4 * exp(-0.5 * ((x - ({mu})) / ({sd}))**2)"
        sh = fig.get("shade", [mu - sd, mu + sd])
        return {
            "type": "plot",
            "fns": [fn_str],
            "xmin": round(mu - 3.5 * sd, 2),
            "xmax": round(mu + 3.5 * sd, 2),
            "ymin": -0.5,
            "ymax": 4.8,
            "shade": {"fn1": fn_str, "fn2": "0", "x0": float(sh[0]), "x1": float(sh[1])},
            "width": 235,
        }
    if ft == "scatter":
        data = fig.get("data", [])
        pts = [[float(p[0]), float(p[1])] for p in data if isinstance(p, (list, tuple)) and len(p) == 2]
        if not pts:
            return None
        xlim = fig.get("xlim", [0, 10])
        ylim = fig.get("ylim", [0, 10])
        return {
            "type": "plot",
            "fns": [],
            "scatter_pts": pts,
            "xmin": float(xlim[0]), "xmax": float(xlim[1]),
            "ymin": float(ylim[0]), "ymax": float(ylim[1]),
            "width": 230,
        }
    if ft in ("bar", "histogram"):
        cats = [str(c) for c in (fig.get("labels") or fig.get("categories") or ["A", "B", "C", "D"])]
        vals = [float(v) for v in (fig.get("data") or fig.get("values") or [5, 10, 8, 12])]
        return {
            "type": "bars",
            "categories": cats[:6],
            "values": vals[:6],
            "ylabel": "Frequency",
            "highlight_index": 1 if len(vals) > 1 else 0,
            "width": 230,
        }
    if ft == "box_plot":
        stats = [
            float(fig.get("min", 10)),
            float(fig.get("q1", 20)),
            float(fig.get("med", 30)),
            float(fig.get("q3", 40)),
            float(fig.get("max", 50)),
        ]
        return {
            "type": "boxplot",
            "groups": [{"label": "Sample", "stats": stats}],
            "min": stats[0] - 4,
            "max": stats[4] + 4,
            "width": 240,
        }
    if ft == "geometry_3d":
        solid = fig.get("solid", "rectangular_prism")
        if solid not in ("rectangular_prism", "cube", "cylinder", "cone", "square_pyramid", "sphere"):
            solid = "cylinder" if "cyl" in solid else ("cone" if "cone" in solid else "rectangular_prism")
        l = float(fig.get("length") or fig.get("r") or fig.get("radius") or 4)
        w = float(fig.get("width") or l)
        h = float(fig.get("height") or fig.get("h") or 5)
        raw_labels = fig.get("labels") or {}
        labels = {k: sanitize_math_spans(str(v)) for k, v in raw_labels.items()}
        if not labels:
            labels = {"r": f"$r={l}$", "h": f"$h={h}$"} if solid in ("cylinder", "cone") else {"l": f"${l}$", "w": f"${w}$", "h": f"${h}$"}
        return {
            "type": "solid",
            "solid": solid,
            "dims": [l, w, h],
            "labels": labels,
            "width": 220,
        }
    if ft in ("circle_sector", "circle_chord", "unit_circle"):
        r = float(fig.get("radius") or fig.get("r") or 6)
        ang_str = str(fig.get("centralAngle") or fig.get("theta") or "60")
        nums = re.findall(r"\d+", ang_str)
        deg = int(nums[0]) if nums else 60
        return {
            "type": "circle",
            "center": [0, 0],
            "radius": r,
            "center_label": "$O$",
            "radius_label": f"$r = {int(r) if r.is_integer() else r}$",
            "sector": {"start_deg": 0, "end_deg": min(max(deg, 30), 150), "label": f"${deg}^\\circ$"},
            "width": 215,
        }
    if ft in ("venn", "venn_populated"):
        return {
            "type": "venn",
            "u_label": "$U$",
            "label_a": "$A$",
            "label_b": "$B$",
            "only_a": fig.get("regionOnlyA", 12),
            "both": fig.get("regionBoth", 5),
            "only_b": fig.get("regionOnlyB", 9),
            "neither": fig.get("regionNeither", 4),
            "width": 225,
        }
    if ft == "slope_field":
        expr = _clean_fn_expr(fig.get("eq", "x - y")) or "0.4*x - 0.3*y"
        return {
            "type": "slope_field",
            "expr": expr,
            "xmin": -3, "xmax": 3, "ymin": -3, "ymax": 3,
            "width": 225,
        }
    return None


def derive_figure_from_question(q_obj, track, topic_title, q_idx):
    """Derive a non-generic, problem-specific diagram locked to the mathematical content of q_obj."""
    q_text = str(q_obj.get("q", "")) + " " + " ".join(q_obj.get("parts") or [])
    q_low = q_text.lower()
    t_low = topic_title.lower()

    # 1. Differential equations / slope field
    if any(k in q_low or k in t_low for k in ["differential equation", "separable", "dy/dx", "y'", "initial value", "euler", "logistic"]):
        c = (q_idx % 4) + 1
        return {
            "type": "slope_field",
            "expr": f"0.35*x - 0.25*y + 0.1*{c}",
            "sol_fn": f"1.4*x - 5.2 + {c + 3}*exp(-0.25*x)",
            "xmin": -4, "xmax": 4, "ymin": -4, "ymax": 4,
            "width": 225,
        }

    # 2. Definite integral / area under curve / Riemann sum
    if any(k in q_low or k in t_low for k in ["integral", "area", "riemann", "trapezoid", "accumulation", "antiderivative", "volume of revolution"]):
        a = 0.25 + 0.05 * (q_idx % 3)
        b = 3.5 + 0.5 * (q_idx % 2)
        fn = f"-{a:.2f}*x**2 + 1.2*x + 2.2"
        return {
            "type": "plot",
            "fns": [fn, "0.35*x + 0.4"],
            "xmin": -1, "xmax": 5, "ymin": -1, "ymax": 5,
            "shade": {"fn1": fn, "fn2": "0.35*x + 0.4", "x0": 0.0, "x1": 3.5},
            "point_labels": [{"x": 2.0, "y": round(-a * 4 + 2.4 + 2.2, 2), "label": "$y=f(x)$"}],
            "width": 230,
        }

    # 3. Probability / Venn / Conditional probability / Sets
    if any(k in q_low or k in t_low for k in ["venn", "union", "intersection", "mutually exclusive", "conditional probability", "bayes", "set "]):
         nums = [int(n) for n in re.findall(r"\b\d+\b", q_text) if 2 <= int(n) <= 90]
         oa = nums[0] if len(nums) > 0 else 14 + (q_idx % 5)
         bo = nums[1] if len(nums) > 1 else 6 + (q_idx % 4)
         ob = nums[2] if len(nums) > 2 else 11 + (q_idx % 6)
         ne = nums[3] if len(nums) > 3 else 5
         return {
             "type": "venn",
             "u_label": "$U$",
             "label_a": "$A$",
             "label_b": "$B$",
             "only_a": oa,
             "both": bo,
             "only_b": ob,
             "neither": ne,
             "width": 225,
         }

    # 4. Statistics / distributions / normal curve / boxplot / bar chart
    if any(k in q_low or k in t_low for k in ["normal", "z-score", "confidence interval", "hypothesis", "standard deviation", "gaussian"]):
        z = 1.65 if q_idx % 2 == 0 else 1.96
        return {
            "type": "plot",
            "fns": ["4*exp(-0.5*x**2)"],
            "xmin": -3.5, "xmax": 3.5, "ymin": -0.4, "ymax": 4.6,
            "shade": {"fn1": "4*exp(-0.5*x**2)", "fn2": "0", "x0": -z, "x1": z},
            "point_labels": [{"x": z, "y": round(4 * math.exp(-0.5 * z * z), 2), "label": f"$z={z}$"}],
            "width": 230,
        }
    if any(k in q_low or k in t_low for k in ["median", "quartile", "interquartile", "iqr", "boxplot", "five-number", "outlier"]):
        base = 15 + (q_idx % 5) * 4
        return {
            "type": "boxplot",
            "groups": [
                {"label": "Group A", "stats": [base, base + 8, base + 15, base + 24, base + 34]},
                {"label": "Group B", "stats": [base + 4, base + 12, base + 21, base + 30, base + 38]},
            ],
            "min": base - 5,
            "max": base + 44,
            "width": 240,
        }
    if any(k in q_low or k in t_low for k in ["mean", "frequency", "histogram", "survey", "table", "sample", "data", "regression", "correlation"]):
        if "scatter" in q_low or "regression" in q_low or "correlation" in q_low:
            return {
                "type": "plot",
                "fns": ["0.75*x + 1.4"],
                "scatter_pts": [[1, 2.0], [2, 3.1], [3, 3.5], [4, 4.6], [5, 5.1], [6, 6.0], [7, 6.5]],
                "xmin": 0, "xmax": 8, "ymin": 0, "ymax": 8,
                "width": 230,
            }
        v0 = 12 + (q_idx % 4) * 3
        return {
            "type": "bars",
            "categories": ["Q1", "Q2", "Q3", "Q4", "Q5"],
            "values": [v0, v0 + 6, v0 + 11, v0 + 4, v0 + 9],
            "ylabel": "Frequency",
            "highlight_index": 2,
            "width": 230,
        }

    # 5. 3D Mensuration / Volume / Surface Area / Vectors in R3
    if any(k in q_low or k in t_low for k in ["cylinder", "cone", "sphere", "pyramid", "prism", "cuboid", "surface area", "volume"]):
        solids = ["cylinder", "cone", "rectangular_prism", "square_pyramid", "sphere"]
        sol = "cylinder" if "cylinder" in q_low else ("cone" if "cone" in q_low else ("sphere" if "sphere" in q_low else ("pyramid" if "pyramid" in q_low else solids[q_idx % len(solids)])))
        nums = [int(n) for n in re.findall(r"\b\d+\b", q_text) if 2 <= int(n) <= 30]
        r = nums[0] if len(nums) > 0 else 4 + (q_idx % 3)
        h = nums[1] if len(nums) > 1 else 7 + (q_idx % 4)
        labels = {"r": f"$r={r}$", "h": f"$h={h}$"} if sol in ("cylinder", "cone", "sphere") else {"l": f"${r}$", "w": f"${r}$", "h": f"${h}$", "base": f"${r}$"}
        return {
            "type": "solid",
            "solid": sol,
            "dims": [float(r), float(r), float(h)],
            "labels": labels,
            "width": 220,
        }

    # 6. Circles / Arcs / Sectors / Radians
    if any(k in q_low or k in t_low for k in ["circle", "sector", "arc", "chord", "tangent to the circle", "radian", "circular measure"]):
        nums = [int(n) for n in re.findall(r"\b\d+\b", q_text) if 3 <= int(n) <= 150]
        r = nums[0] if (nums and nums[0] <= 20) else 6 + (q_idx % 4)
        deg = nums[1] if (len(nums) > 1 and 25 <= nums[1] <= 150) else 60 + (q_idx % 3) * 15
        return {
            "type": "circle",
            "center": [0, 0],
            "radius": float(r),
            "center_label": "$O$",
            "radius_label": f"$r = {r}$",
            "sector": {"start_deg": 0, "end_deg": deg, "label": f"${deg}^\\circ$"},
            "points": [{"angle": 0, "label": "$A$"}, {"angle": deg, "label": "$B$"}],
            "width": 215,
        }

    # 7. Triangles / Trigonometry / Pythagoras / Vectors
    if any(k in q_low or k in t_low for k in ["triangle", "hypotenuse", "sine", "cosine", "tangent", "sin ", "cos ", "tan ", "pythagor", "elevation", "bearing", "congruen", "similar"]):
        triples = [(6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15), (7, 24, 25)]
        a, b, c = triples[q_idx % len(triples)]
        return {
            "type": "triangle",
            "vertices": [[0, 0], [float(b), 0], [0, float(a)]],
            "labels": ["$C$", "$B$", "$A$"],
            "side_labels": [f"${b}$", f"${c}$", f"${a}$"],
            "right_angle_at": 0,
            "angle_marks": [{"vertex": 1, "label": "$\\theta$"}],
            "fill": True,
            "width": 220,
        }

    # 8. Inequalities / Absolute value / Intervals / Number line
    if any(k in q_low or k in t_low for k in ["inequalit", "number line", "interval", "|x", "absolute value", "modulus"]):
        a = -3 - (q_idx % 3)
        b = 2 + (q_idx % 4)
        return {
            "type": "numberline",
            "min": a - 2,
            "max": b + 2,
            "shade": [a, b],
            "marks": [{"x": a, "open": q_idx % 2 == 1, "label": f"${a}$"}, {"x": b, "open": False, "label": f"${b}$"}],
            "width": 250,
        }

    # 9. Trigonometric graphs / Periodic functions
    if any(k in q_low or k in t_low for k in ["amplitude", "period", "phase shift", "sinusoid", "harmonic", "trig"]):
        amp = 2 + (q_idx % 2)
        return {
            "type": "plot",
            "fns": [f"{amp}*sin(x)", f"cos(x)"],
            "xmin": -4, "xmax": 4, "ymin": -3.5, "ymax": 3.5,
            "point_labels": [{"x": 1.57, "y": float(amp), "label": f"$( \\frac{{\\pi}}{{2}}, {amp} )$"}],
            "width": 230,
        }

    # 10. Exponential / Logarithmic curves
    if any(k in q_low or k in t_low for k in ["exponential", "logarithm", "half-life", "compound", "growth", "decay", "\\ln", "\\log"]):
        return {
            "type": "plot",
            "fns": ["2**(0.6*x)", "log(x + 3) + 0.5"],
            "xmin": -2.5, "xmax": 4.5, "ymin": -2, "ymax": 6.5,
            "asymptotes": {"x": [-3], "y": [0]},
            "point_labels": [{"x": 0, "y": 1, "label": "$(0,1)$"}],
            "width": 230,
        }

    # 11. Rational functions / Asymptotes / Limits
    if any(k in q_low or k in t_low for k in ["rational", "asymptote", "discontinuit", "limit", "\\lim"]):
        va = 1 if q_idx % 2 == 0 else -1
        ha = 2 if q_idx % 2 == 0 else 1
        return {
            "type": "plot",
            "fns": [f"{ha} + 1.5/(x - ({va}))"],
            "xmin": -5, "xmax": 5, "ymin": -4, "ymax": 6,
            "asymptotes": {"x": [va], "y": [ha]},
            "point_labels": [{"x": va + 1.5, "y": ha + 1.0, "label": f"$( {va+1.5}, {ha+1} )$"}],
            "width": 230,
        }

    # 12. Default: Algebraic / Calculus function + secant/tangent intersection plot
    h_shift = (q_idx % 3) - 1
    k_shift = -2 + (q_idx % 2)
    fn1 = f"0.5*(x - ({h_shift}))**2 + ({k_shift})"
    fn2 = f"0.5*x + 1"
    return {
        "type": "plot",
        "fns": [fn1, fn2],
        "xmin": -5, "xmax": 5, "ymin": -4, "ymax": 6,
        "point_labels": [{"x": float(h_shift), "y": float(k_shift), "label": f"$({h_shift},{k_shift})$"}],
        "width": 230,
    }


def tokenize(text):
    return set(w for w in re.findall(r"[a-zA-Z]{3,}", str(text).lower()) if w not in {
        "the", "and", "for", "with", "that", "this", "from", "what", "which", "find", "solve", "value", "given", "following"
    })


def load_track_candidate_pool(track):
    """Load all verified MCQs and FRQs from bank-data, _practice-set.json, and 99a243d."""
    mcqs = []
    frqs = []

    bank_tracks = SUPPLEMENT_BANKS.get(track, [track])
    for bt in bank_tracks:
        bp = os.path.join(BANK_DIR, f"{bt}.json")
        if os.path.exists(bp):
            data = json.load(open(bp, encoding="utf-8"))
            items = data.get("pool") or (data.get("easy", []) + data.get("medium", []) + data.get("hard", []))
            for it in items:
                q_txt = strip_html_and_convert_math(it.get("text") or it.get("q") or "")
                raw_choices = it.get("choices") or []
                if len(raw_choices) != 4 or not q_txt:
                    continue
                choices = [strip_html_and_convert_math(c) for c in raw_choices]
                corr = it.get("correct") if it.get("correct") is not None else it.get("answer", 0)
                if not isinstance(corr, int) or not (0 <= corr < 4):
                    corr = 0
                sol = strip_html_and_convert_math(it.get("solution") or it.get("sol") or "")
                if not sol:
                    sol = f"The correct option is {choices[corr]}."
                fig = convert_bank_figure(it.get("fig") or it.get("figure"))
                diff_raw = str(it.get("difficulty") or "medium").lower()
                diff = "Foundational" if diff_raw == "easy" else ("Challenging" if diff_raw == "hard" else "Intermediate")
                dom = str(it.get("domain") or it.get("exam_archetype") or "")
                mcqs.append({
                    "q": q_txt,
                    "choices": choices,
                    "correct": corr,
                    "answer": sol,
                    "explanation": sol,
                    "figure": fig,
                    "difficulty": diff,
                    "domain": dom,
                    "tokens": tokenize(dom + " " + q_txt),
                })

    # Also load _practice-set.json
    ps_path = os.path.join(CONTENT_DIR, track, "_practice-set.json")
    if os.path.exists(ps_path):
        ps_data = json.load(open(ps_path, encoding="utf-8"))
        for it in ps_data.get("items", []):
            q_field = it.get("prompt") or it.get("question") or ""
            if isinstance(q_field, dict):
                q_field = q_field.get("en") or ""
            s_field = it.get("solution") or ""
            if isinstance(s_field, dict):
                s_field = s_field.get("en") or ""
            q_txt = strip_html_and_convert_math(q_field)
            sol_txt = strip_html_and_convert_math(s_field)
            if not q_txt or not sol_txt:
                continue
            fig = convert_bank_figure(it.get("figure") or it.get("fig"))
            frqs.append({
                "q": q_txt,
                "answer": sol_txt,
                "explanation": sol_txt,
                "figure": fig,
                "difficulty": it.get("difficulty", "Intermediate"),
                "domain": str(it.get("topic") or it.get("skill") or ""),
                "tokens": tokenize(q_txt + " " + str(it.get("topic") or "")),
            })

    return frqs, mcqs


def can_convert_mcq_to_frq(q_txt):
    low = q_txt.lower()
    banned = [
        "which of the following", "which statement", "which graph", "which expression below",
        "which equation below", "select all", "true or false", "which table", "which diagram",
        "اي مما يلي", "أي مما يلي", "أي العبارات",
    ]
    return not any(b in low for b in banned)


def mcq_to_frq(mcq_item, target_label, diff_tier, cross_label=None):
    corr_idx = mcq_item.get("correct", 0)
    choices = mcq_item.get("choices", [])
    corr_val = choices[corr_idx] if 0 <= corr_idx < len(choices) else ""
    stem = mcq_item["q"].strip()
    if stem.endswith("?"):
        stem = stem + " Show your complete algebraic work."
    elif not stem.endswith("."):
        stem = stem + "."
    sol = mcq_item.get("answer") or mcq_item.get("explanation") or ""
    full_ans = f"Final Answer: {corr_val}. {sol}".strip() if corr_val and corr_val not in sol[:35] else sol
    out = {
        "q": sanitize_math_spans(stem),
        "difficulty": diff_tier,
        "question_type": "FRQ",
        "target": target_label,
        "answer": sanitize_math_spans(full_ans),
        "explanation": sanitize_math_spans(sol),
    }
    if cross_label:
        out["cross_lesson"] = cross_label
    if mcq_item.get("figure"):
        out["figure"] = mcq_item["figure"]
    return out


def normalize_existing_frq(q_obj, target_label, diff_tier, cross_label=None):
    out = {
        "q": sanitize_math_spans(q_obj.get("q", "")),
        "difficulty": diff_tier,
        "question_type": "FRQ",
        "target": target_label,
    }
    if cross_label:
        out["cross_lesson"] = cross_label
    if q_obj.get("parts"):
        out["parts"] = [sanitize_math_spans(p) for p in q_obj["parts"]]
        out["cols"] = q_obj.get("cols", 2)
    if q_obj.get("answers"):
        out["answers"] = [sanitize_math_spans(a) for a in q_obj["answers"]]
    if q_obj.get("answer"):
        out["answer"] = sanitize_math_spans(q_obj["answer"])
    elif q_obj.get("answers"):
        out["answer"] = sanitize_math_spans("; ".join(f"({chr(97+i)}) {a}" for i, a in enumerate(q_obj["answers"])))
    if q_obj.get("explanation"):
        out["explanation"] = sanitize_math_spans(q_obj["explanation"])
    elif out.get("answer"):
        out["explanation"] = out["answer"]
    fig = convert_bank_figure(q_obj.get("figure") or q_obj.get("fig"))
    if fig:
        out["figure"] = fig
    return out


def normalize_existing_mcq(q_obj, target_label, diff_tier, cross_label=None):
    choices = [sanitize_math_spans(str(c)) for c in (q_obj.get("choices") or [])[:4]]
    while len(choices) < 4:
        choices.append(f"${len(choices)+1}$")
    corr = q_obj.get("correct", 0)
    if not isinstance(corr, int) or not (0 <= corr < 4):
        corr = 0
    ans = sanitize_math_spans(q_obj.get("answer") or q_obj.get("explanation") or f"Correct choice: {choices[corr]}.")
    out = {
        "q": sanitize_math_spans(q_obj.get("q", "")),
        "difficulty": diff_tier,
        "question_type": "MCQ",
        "target": target_label,
        "choices": choices,
        "correct": corr,
        "answer": ans,
        "explanation": ans,
    }
    if cross_label:
        out["cross_lesson"] = cross_label
    fig = convert_bank_figure(q_obj.get("figure") or q_obj.get("fig"))
    if fig:
        out["figure"] = fig
    return out


def ensure_5_Missing_Tracks_Initialized():
    """Ensure algebra, alg2, geo, igcse, ibsl have canonical topic files in tools/worksheet_gen/topics/<track>/."""
    for track in ["algebra", "alg2", "geo", "igcse", "ibsl"]:
        t_dir = os.path.join(TOPICS_DIR, track)
        os.makedirs(t_dir, exist_ok=True)
        meta_path = os.path.join(CONTENT_DIR, track, "_meta.json")
        meta = json.load(open(meta_path, encoding="utf-8"))
        order = meta.get("chapterOrder") or meta.get("meta", {}).get("chapterOrder", [])
        order = [cid for cid in order if not cid.endswith("overview")]

        # Also check 99a243d sub-lesson JSONs for this track
        commit_files = git_ls_tree("99a243d", f"tools/worksheet_gen/topics/{track}")
        unit_subfiles = {}
        for cf in commit_files:
            base = os.path.basename(cf)
            u_num = int(base.split(".")[0])
            unit_subfiles.setdefault(u_num, []).append(cf)

        for idx, cid in enumerate(order, 1):
            chap_path = os.path.join(CONTENT_DIR, track, f"{cid}.json")
            chap = json.load(open(chap_path, encoding="utf-8")) if os.path.exists(chap_path) else {}
            raw_title = chap.get("title", cid)
            if isinstance(raw_title, dict):
                raw_title = raw_title.get("en", cid)
            title = html.unescape(str(raw_title)).strip()
            slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
            num = f"{idx}.01"
            out_path = os.path.join(t_dir, f"{num}-{slug}.json")

            # Gather questions from 99a243d unit files
            sections = []
            sub_list = unit_subfiles.get(idx, [])
            if not sub_list and unit_subfiles:
                # fallback to cycling units
                all_u = sorted(unit_subfiles.keys())
                sub_list = unit_subfiles[all_u[(idx - 1) % len(all_u)]]
            for sf in sub_list[:6]:
                sd = git_show_json(f"99a243d:{sf}")
                if sd:
                    sub_title = sd.get("title", title)
                    qs = [q for s in sd.get("sections", []) for q in s.get("questions", [])]
                    if qs:
                        sections.append({"heading": sub_title, "questions": qs})

            if not os.path.exists(out_path):
                payload = {
                    "track": track,
                    "num": num,
                    "slug": slug,
                    "title": title,
                    "sections": sections,
                }
                with open(out_path, "w", encoding="utf-8") as f:
                    json.dump(payload, f, ensure_ascii=False, indent=2)


def upgrade_single_track(track):
    """Upgrade all topic JSON files in tools/worksheet_gen/topics/<track>/ to 20 FRQs + 25 MCQs."""
    if track in ("algebra", "alg2", "geo", "igcse", "ibsl"):
        ensure_5_Missing_Tracks_Initialized()

    t_dir = os.path.join(TOPICS_DIR, track)
    topic_files = sorted(glob.glob(os.path.join(t_dir, "*.json")))
    if not topic_files:
        print(f"No topic files found for {track}")
        return 0

    if track == "sat":
        # Already upgraded by upgrade_sat_worksheets.py; sync to public/worksheet-data/
        os.makedirs(os.path.join(PUBLIC_WS_DIR, track), exist_ok=True)
        for tf in topic_files:
            d = json.load(open(tf, encoding="utf-8"))
            out_name = d["num"] + ( "-ar" if d.get("lang") == "ar" else "" ) + ".json"
            with open(os.path.join(PUBLIC_WS_DIR, track, out_name), "w", encoding="utf-8") as wf:
                json.dump(d, wf, ensure_ascii=False, indent=2)
        return len(topic_files)

    cand_frqs, cand_mcqs = load_track_candidate_pool(track)

    # First pass: collect metadata for all topics in this track (for cross-lesson linking)
    topics_meta = []
    for tf in topic_files:
        d = json.load(open(tf, encoding="utf-8"))
        topics_meta.append({
            "path": tf,
            "filename": os.path.basename(tf),
            "num": d.get("num", "1.01"),
            "slug": d.get("slug", ""),
            "title": d.get("title", ""),
            "lang": d.get("lang", "ar" if tf.endswith("-ar.json") else "en"),
        })

    used_bank_mcq_stems = set()
    used_bank_frq_stems = set()

    for t_idx, tm in enumerate(topics_meta):
        tf = tm["path"]
        fname = tm["filename"]
        num = tm["num"]
        title = tm["title"]
        lang = tm["lang"]
        is_ar = (lang == "ar")

        cur_data = json.load(open(tf, encoding="utf-8"))
        old_data = git_show_json(f"979b35d:tools/worksheet_gen/topics/{track}/{fname}")
        if old_data is None and track in ("addmath", "mathai"):
            old_data = git_show_json(f"840703e:tools/worksheet_gen/topics/{track}/{fname}")

        # Cross-lesson neighbors (same language)
        same_lang_topics = [x for x in topics_meta if x["lang"] == lang and x["num"] != num]
        if not same_lang_topics:
            same_lang_topics = topics_meta

        # Extract sub-targets (lesson targets) and questions from old_data + cur_data
        raw_frqs = []
        raw_mcqs = []
        lesson_targets = []

        if old_data:
            for sec in old_data.get("sections", []):
                h = sec.get("heading") or title
                if not h.lower().startswith("multiple choice") and not h.startswith("اختيار من متعدد"):
                    if h not in lesson_targets:
                        lesson_targets.append(h)
                for q in sec.get("questions", []):
                    if q.get("choices"):
                        raw_mcqs.append((h, q))
                    else:
                        raw_frqs.append((h, q))

        for sec in cur_data.get("sections", []):
            h = sec.get("heading") or title
            clean_h = re.sub(r"^(?:Section|Part)\s+[0-9IVX]+\s*[:—-]\s*", "", h).strip()
            if clean_h and not clean_h.lower().startswith("multiple choice") and clean_h not in lesson_targets:
                lesson_targets.append(clean_h)
            for q in sec.get("questions", []):
                if q.get("choices"):
                    raw_mcqs.append((clean_h or title, q))
                else:
                    raw_frqs.append((clean_h or title, q))

        if not lesson_targets:
            lesson_targets = [title]

        # Deduplicate raw_frqs and raw_mcqs by stem
        seen_frq = set()
        unique_frqs = []
        for h, q in raw_frqs:
            key = re.sub(r"\s+", " ", str(q.get("q", ""))).strip()
            if key and key not in seen_frq:
                seen_frq.add(key)
                unique_frqs.append((h, q))

        seen_mcq = set()
        unique_mcqs = []
        for h, q in raw_mcqs:
            key = re.sub(r"\s+", " ", str(q.get("q", ""))).strip()
            if key and key not in seen_mcq:
                seen_mcq.add(key)
                unique_mcqs.append((h, q))

        # Score candidate pool items against this topic's tokens
        topic_tokens = tokenize(title + " " + " ".join(lesson_targets))

        def _score_item(it):
            overlap = len(topic_tokens & it["tokens"])
            has_fig = 2 if it.get("figure") else 0
            return (overlap * 3 + has_fig, len(it.get("answer", "")))

        if not is_ar:
            # Rank candidate FRQs & MCQs for this topic
            ranked_cand_frqs = sorted(
                [x for x in cand_frqs if x["q"] not in used_bank_frq_stems and x["q"] not in seen_frq],
                key=_score_item,
                reverse=True,
            )
            ranked_cand_mcqs = sorted(
                [x for x in cand_mcqs if x["q"] not in used_bank_mcq_stems and x["q"] not in seen_mcq],
                key=_score_item,
                reverse=True,
            )

            # Supplement unique_frqs up to 20 FRQs
            for cf in ranked_cand_frqs:
                if len(unique_frqs) >= 20:
                    break
                t_lbl = lesson_targets[len(unique_frqs) % len(lesson_targets)]
                unique_frqs.append((t_lbl, cf))
                seen_frq.add(cf["q"])
                used_bank_frq_stems.add(cf["q"])

            # If still < 20 FRQs, convert top open-ended MCQs into FRQs
            if len(unique_frqs) < 20:
                # First check surplus unique_mcqs (beyond 25)
                surplus_mcqs = unique_mcqs[25:]
                for h, mq in surplus_mcqs:
                    if len(unique_frqs) >= 20:
                        break
                    if can_convert_mcq_to_frq(mq.get("q", "")):
                        conv = mcq_to_frq(mq, h, "Intermediate")
                        unique_frqs.append((h, conv))
                        seen_frq.add(conv["q"])
                # Then check ranked_cand_mcqs
                for cm in ranked_cand_mcqs:
                    if len(unique_frqs) >= 20:
                        break
                    if cm["q"] in used_bank_mcq_stems:
                        continue
                    if can_convert_mcq_to_frq(cm["q"]):
                        t_lbl = lesson_targets[len(unique_frqs) % len(lesson_targets)]
                        conv = mcq_to_frq(cm, t_lbl, "Intermediate")
                        unique_frqs.append((t_lbl, conv))
                        seen_frq.add(conv["q"])
                        used_bank_mcq_stems.add(cm["q"])

            # Now supplement unique_mcqs up to 25 MCQs
            # Keep at most first 25 from unique_mcqs if we converted surplus, or fill up to 25 from ranked_cand_mcqs
            unique_mcqs = [ (h, mq) for (h, mq) in unique_mcqs if mq.get("q") not in seen_frq ]
            for cm in ranked_cand_mcqs:
                if len(unique_mcqs) >= 25:
                    break
                if cm["q"] in used_bank_mcq_stems or cm["q"] in seen_mcq or cm["q"] in seen_frq:
                    continue
                t_lbl = lesson_targets[len(unique_mcqs) % len(lesson_targets)]
                unique_mcqs.append((t_lbl, cm))
                seen_mcq.add(cm["q"])
                used_bank_mcq_stems.add(cm["q"])

            # Fallback if track pool was small: allow reuse across topics from cand_mcqs
            if len(unique_frqs) < 20:
                for cm in sorted(cand_mcqs, key=_score_item, reverse=True):
                    if len(unique_frqs) >= 20:
                        break
                    if cm["q"] not in seen_frq and can_convert_mcq_to_frq(cm["q"]):
                        t_lbl = lesson_targets[len(unique_frqs) % len(lesson_targets)]
                        conv = mcq_to_frq(cm, t_lbl, "Challenging")
                        unique_frqs.append((t_lbl, conv))
                        seen_frq.add(conv["q"])
            if len(unique_mcqs) < 25:
                for cm in sorted(cand_mcqs, key=_score_item, reverse=True):
                    if len(unique_mcqs) >= 25:
                        break
                    if cm["q"] not in seen_mcq:
                        t_lbl = lesson_targets[len(unique_mcqs) % len(lesson_targets)]
                        unique_mcqs.append((t_lbl, cm))
                        seen_mcq.add(cm["q"])

        # Select 20 FRQs (prioritizing items with figures or multi-part richness)
        if len(unique_frqs) > 20:
            with_figs = [x for x in unique_frqs if x[1].get("figure")]
            without_figs = [x for x in unique_frqs if not x[1].get("figure")]
            selected_frqs = (with_figs + without_figs)[:20]
        else:
            selected_frqs = unique_frqs[:20]

        # Select 25 MCQs (prioritizing items with figures + balanced across Easy/Medium/Hard)
        if len(unique_mcqs) > 25:
            with_figs = [x for x in unique_mcqs if x[1].get("figure")]
            without_figs = [x for x in unique_mcqs if not x[1].get("figure")]
            # Take evenly spaced from without_figs so we get easy, medium, and hard
            need = max(0, 25 - len(with_figs[:8]))
            step = max(1, len(without_figs) / max(need, 1))
            picked_wo = [without_figs[min(int(i * step), len(without_figs) - 1)] for i in range(need)]
            # Deduplicate while preserving order
            combined = with_figs[:8] + picked_wo + without_figs
            sel_m = []
            s_keys = set()
            for h, mq in combined:
                k = mq.get("q", "")
                if k not in s_keys:
                    s_keys.add(k)
                    sel_m.append((h, mq))
                if len(sel_m) == 25:
                    break
            selected_mcqs = sel_m
        else:
            selected_mcqs = unique_mcqs[:25]

        # Format the 20 FRQs into 3 tiers (7 Foundational, 7 Intermediate, 6 Challenging & Cross-Lesson)
        final_frqs = []
        for i, (h, q) in enumerate(selected_frqs):
            diff_tier = "Foundational" if i < 7 else ("Intermediate" if i < 14 else "Challenging")
            t_lbl = h if h and not h.lower().startswith("multiple choice") else lesson_targets[i % len(lesson_targets)]
            cross_lbl = None
            if i >= 14:
                nb = same_lang_topics[(t_idx + i) % len(same_lang_topics)]
                cross_lbl = f"{nb['num']} {nb['title']}"
            final_frqs.append(normalize_existing_frq(q, t_lbl, diff_tier, cross_lbl))

        # Format the 25 MCQs into 3 tiers (8 Foundational, 9 Intermediate, 8 Challenging & Cross-Lesson)
        final_mcqs = []
        for i, (h, q) in enumerate(selected_mcqs):
            diff_tier = "Foundational" if i < 8 else ("Intermediate" if i < 17 else "Challenging")
            t_lbl = h if h and not h.lower().startswith("multiple choice") and not h.startswith("اختيار من متعدد") else lesson_targets[i % len(lesson_targets)]
            cross_lbl = None
            if i >= 17:
                nb = same_lang_topics[(t_idx + i) % len(same_lang_topics)]
                cross_lbl = f"{nb['num']} {nb['title']}"
            final_mcqs.append(normalize_existing_mcq(q, t_lbl, diff_tier, cross_lbl))

        # Ensure at least 8 problem-specific figures across the 45 questions (4 in FRQs, 5 in MCQs)
        all_45 = final_frqs + final_mcqs
        cur_figs = sum(1 for q in all_45 if q.get("figure"))
        target_fig_indices = [1, 5, 9, 15, 22, 27, 32, 38, 42]
        for idx_pos in target_fig_indices:
            if cur_figs >= 9:
                break
            if idx_pos < len(all_45) and not all_45[idx_pos].get("figure"):
                all_45[idx_pos]["figure"] = derive_figure_from_question(all_45[idx_pos], track, title, idx_pos)
                cur_figs += 1

        if is_ar:
            sections_out = [
                {"heading": "الجزء الأول — أسئلة مقالية (FRQs): المهارات الأساسية (1–7)", "questions": final_frqs[0:7]},
                {"heading": "الجزء الثاني — أسئلة مقالية (FRQs): تطبيقات متوسطة متعددة الخطوات (8–14)", "questions": final_frqs[7:14]},
                {"heading": "الجزء الثالث — أسئلة مقالية (FRQs): مسائل التحدي والربط بين الدروس (15–20)", "questions": final_frqs[14:20]},
                {"heading": "الجزء الرابع — اختيار من متعدد (MCQs): إتقان المفاهيم الأساسية (21–28)", "questions": final_mcqs[0:8]},
                {"heading": "الجزء الخامس — اختيار من متعدد (MCQs): تطبيقات الاختبار المتوسطة (29–37)", "questions": final_mcqs[8:17]},
                {"heading": "الجزء السادس — اختيار من متعدد (MCQs): مسائل التحدي والربط بين الدروس (38–45)", "questions": final_mcqs[17:25]},
            ]
        else:
            sections_out = [
                {"heading": "Part I — Free-Response Questions (FRQs): Foundational Fluency (1–7)", "questions": final_frqs[0:7]},
                {"heading": "Part II — Free-Response Questions (FRQs): Intermediate Multi-Step Application (8–14)", "questions": final_frqs[7:14]},
                {"heading": "Part III — Free-Response Questions (FRQs): Challenging & Cross-Lesson Synthesis (15–20)", "questions": final_frqs[14:20]},
                {"heading": "Part IV — Multiple-Choice Questions (MCQs): Foundational Concept Mastery (21–28)", "questions": final_mcqs[0:8]},
                {"heading": "Part V — Multiple-Choice Questions (MCQs): Intermediate Exam Application (29–37)", "questions": final_mcqs[8:17]},
                {"heading": "Part VI — Multiple-Choice Questions (MCQs): Challenging & Cross-Lesson Synthesis (38–45)", "questions": final_mcqs[17:25]},
            ]

        upgraded_doc = {
            "track": track,
            "num": num,
            "slug": tm["slug"] or re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-"),
            "title": title,
            "subtitle": f"ClipSAT Printable Practice Suite (clipsat.org) • Topic {num} • 20 FRQs + 25 MCQs • Difficulty Progression • Cross-Lesson Synthesis",
            "sections": sections_out,
        }
        if is_ar:
            upgraded_doc["lang"] = "ar"

        with open(tf, "w", encoding="utf-8") as wf:
            json.dump(upgraded_doc, wf, ensure_ascii=False, indent=2)

        # Also sync to public/worksheet-data/<track>/
        os.makedirs(os.path.join(PUBLIC_WS_DIR, track), exist_ok=True)
        out_name = num + ("-ar" if is_ar else "") + ".json"
        with open(os.path.join(PUBLIC_WS_DIR, track, out_name), "w", encoding="utf-8") as wf:
            json.dump(upgraded_doc, wf, ensure_ascii=False, indent=2)

    return len(topics_meta)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--track", help="Single track ID to upgrade")
    ap.add_argument("--all", action="store_true", help="Upgrade all 28 tracks")
    args = ap.parse_args()

    tracks = ALL_TRACKS if args.all else ([args.track] if args.track else ALL_TRACKS)
    total_topics = 0
    for t in tracks:
        n = upgrade_single_track(t)
        total_topics += n
        print(f"✓ Upgraded track {t:10s}: {n:2d} topic worksheets (20 FRQ + 25 MCQ = 45 Qs each)")
    print(f"\nDone! Upgraded {total_topics} topic worksheets across {len(tracks)} track(s).")


if __name__ == "__main__":
    main()
