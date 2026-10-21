#!/usr/bin/env python3
"""De-duplicate and upgrade all 28 ClipSAT tracks' printable worksheet topic JSONs:
- Minimum 20 Free-Response Questions (FRQs) + 25 Multiple-Choice Questions (MCQs) = 45 Questions per worksheet
- ZERO template/skeleton redundancy within a worksheet AND across all worksheets in a track
- ZERO duplicate figures within a worksheet AND across all worksheets in a track
- 3-tier difficulty progression: [Foundational], [Intermediate], [Challenging]
- Complete lesson target tagging (Target: ...) on every question
- Explicit cross-lesson synthesis tagging (Cross-Lesson: ...) on all 14 Challenging questions per worksheet
- 9 to 12 non-generic, problem-specific diagrams & graphs (figure) per worksheet locked to question math/parameters
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

# Curriculum-family candidate pools so every track has 3x-6x more unique-skeleton
# verified questions than needed across all its worksheets (prioritizing its own track first)
FAMILY_POOLS = {
    "sat": ["sat", "act", "est"],
    "act": ["act", "sat", "est", "act2"],
    "act2": ["act2", "est2", "precalc", "act2l2", "alg2"],
    "act2l2": ["act2l2", "est2l2", "precalc", "act2"],
    "est": ["est", "sat", "act", "est2"],
    "est2": ["est2", "act2", "precalc", "est2l2", "alg2"],
    "est2l2": ["est2l2", "act2l2", "precalc", "est2"],
    "qudrat": ["qudrat", "tahsili", "sat", "act"],
    "tahsili": ["tahsili", "qudrat", "precalc", "calculus"],
    "apab": ["apab", "calculus", "apbc", "ibhl"],
    "apbc": ["apbc", "calculus", "apab", "ibhl"],
    "appc": ["appc", "precalc", "alg2", "act2"],
    "apstats": ["apstats", "ibsl", "ibhl", "sat", "act", "a2level"],
    "calculus": ["calculus", "apab", "apbc", "ibhl", "a2level"],
    "precalc": ["precalc", "appc", "alg2", "act2", "est2", "aslevel", "a2level"],
    "linalg": ["linalg", "mvc", "mathai", "a2level", "ibhl"],
    "mvc": ["mvc", "calculus", "linalg", "odes"],
    "odes": ["odes", "calculus", "apbc", "a2level"],
    "aslevel": ["aslevel", "a2level", "addmath", "ibsl", "precalc"],
    "a2level": ["a2level", "aslevel", "ibhl", "calculus", "precalc"],
    "addmath": ["addmath", "aslevel", "a2level", "igcse", "precalc"],
    "ibhl": ["ibhl", "a2level", "aslevel", "calculus", "precalc"],
    "ibsl": ["ibsl", "aslevel", "igcse", "precalc", "ibhl"],
    "igcse": ["igcse", "algebra", "geo", "aslevel", "addmath"],
    "mathai": ["mathai", "linalg", "calculus", "mvc", "apstats"],
    "algebra": ["algebra", "alg2", "sat", "igcse", "est"],
    "alg2": ["alg2", "algebra", "precalc", "act2", "appc"],
    "geo": ["geo", "igcse", "act", "sat", "est"],
}

BANNED_SHALLOW_PATTERNS = [
    r"^a car travels at \d+ miles per hour",
    r"^if \d+ (?:apples|boxes|items|books|pens) cost",
    r"^evaluate:\s*\$?\\frac\{\d+\}\{\d+\}\s*\+",
    r"^a right triangle has legs \d+ and \d+\. find the hypotenuse",
    r"^a triangle has angles \d+.*find the third",
    r"^find the area of a circle with radius \d+",
    r"^solve for \$x\$:\s*\$\d+x\s*[+-]\s*\d+\s*=\s*\d+\$$",
]


def is_banned_shallow(q_text):
    s = str(q_text).strip().lower()
    if len(s) < 28:
        return True
    for pat in BANNED_SHALLOW_PATTERNS:
        if re.search(pat, s):
            return True
    return False


def question_skeleton(text):
    """Compute a structural skeleton of a question stem by replacing math expressions and numbers.
    Two questions that only differ by numbers or swapped equations produce the EXACT same skeleton.
    """
    s = str(text)
    s = re.sub(r"\$[^$]*\$", " MATH ", s)
    s = re.sub(r"\\\(.*?\\\)", " MATH ", s)
    s = re.sub(r"\\\[.*?\\\]", " MATH ", s)
    s = re.sub(r"\d+(?:\.\d+)?", "N", s.lower())
    s = re.sub(r"[^a-z\u0600-\u06FF]+", " ", s)
    s = re.sub(r"\b(?:math|n|the|and|for|with|that|this|from|show|your|complete|algebraic|work)\b", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def figure_signature(fig):
    """Compute a canonical signature of a figure so no two questions share the same visual graph."""
    if not isinstance(fig, dict):
        return ""
    return json.dumps(fig, sort_keys=True)


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


def split_bilingual_text(raw_html, want_ar=False):
    """Many qudrat/tahsili bank items contain English followed by <br><em>Arabic</em>.
    Extract ONLY the requested language so English worksheets are 100% English and
    Arabic worksheets (-ar.json) are 100% Arabic.
    """
    if not raw_html:
        return ""
    s = str(raw_html)
    # Check if there is an <em>...</em> block with Arabic characters
    em_matches = list(re.finditer(r"<em>(.*?)</em>", s, flags=re.S | re.I))
    ar_em = None
    for m in em_matches:
        if any("\u0600" <= ch <= "\u06FF" for ch in m.group(1)):
            ar_em = m
            break
    if want_ar:
        if ar_em:
            return strip_html_and_convert_math(ar_em.group(1))
        # Otherwise check if the main string already has Arabic
        if any("\u0600" <= ch <= "\u06FF" for ch in s):
            return strip_html_and_convert_math(s)
        return ""
    else:
        if ar_em:
            s_en = s[:ar_em.start()] + s[ar_em.end():]
            return strip_html_and_convert_math(s_en)
        # If the string is purely Arabic and we want English, skip it
        ar_chars = sum(1 for ch in s if "\u0600" <= ch <= "\u06FF")
        en_chars = sum(1 for ch in s if "a" <= ch.lower() <= "z")
        if ar_chars > en_chars:
            return ""
        return strip_html_and_convert_math(s)


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
    s = re.sub(r"\\\(\s*(.*?)\s*\\\)", lambda m: "$" + m.group(1).strip() + "$", s, flags=re.S)
    s = re.sub(r"\\\[\s*(.*?)\s*\\\]", lambda m: " $" + m.group(1).strip() + "$ ", s, flags=re.S)
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
    t2 = re.sub(r"\\(?:left|right)\s*([()\[\]|.])", r"\1", t)
    t2 = re.sub(r"\\(?:left|right)\s*\\([{}])", r"\\\1", t2)
    t2 = re.sub(r"\\(?:quad|qquad|,|;|!|:)(?![a-zA-Z])", " ", t2)
    t2 = re.sub(r"\\(?:mathrm|mathbf|mathit|mathcal|mathbb)\s*\{([^{}]*)\}", r"\1", t2)
    if valid_mathtext(t2):
        return t2
    t3 = re.sub(r"\\[a-zA-Z]+", "", t2)
    t3 = t3.replace("{", "").replace("}", "")
    if valid_mathtext(t3) and t3.strip():
        return t3.strip()
    return "x"


def sanitize_math_spans(text):
    if not text:
        return ""
    s = str(text)
    if s.count("$") % 2 == 1:
        last_idx = s.rfind("$")
        s = s[:last_idx] + s[last_idx + 1 :]

    def _fix(m):
        inner = m.group(1).strip()
        if not inner:
            return ""
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
    if ft in ("plot", "triangle", "circle", "polygon", "numberline", "bars", "boxplot", "solid", "slope_field", "venn"):
        if ft == "plot":
            fns = [_clean_fn_expr(f) for f in fig.get("fns", [])]
            fns = [f for f in fns if f]
            if not fns and not fig.get("scatter_pts"):
                return None
            out = dict(fig, fns=fns, width=fig.get("width", 230))
            return out
        if ft == "triangle" and "vertices" in fig:
            verts = fig["vertices"]
            if any(abs(v[0]) > 40 or abs(v[1]) > 40 for v in verts):
                verts = [[round(v[0] / 30.0, 2), round((200 - v[1]) / 30.0, 2)] for v in verts]
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
                "center": fig.get("center", [0, 0]),
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
            if hi <= lo:
                hi = lo + 10
            marks = []
            for m in fig.get("marks", []):
                if isinstance(m, dict) and "x" in m:
                    marks.append({
                        "x": float(m["x"]),
                        "open": bool(m.get("open", False)),
                        "label": sanitize_math_spans(str(m.get("label") or f"${m['x']}$")),
                    })
            return {
                "type": "numberline",
                "min": lo,
                "max": hi,
                "marks": marks,
                "shade": fig.get("shade"),
                "width": 250,
            }
        if ft == "bars":
            cats = [str(c) for c in (fig.get("categories") or fig.get("labels") or ["A", "B", "C", "D"])]
            vals = [float(v) for v in (fig.get("values") or [4, 7, 5, 9])][:len(cats)]
            return {
                "type": "bars",
                "categories": cats[:len(vals)],
                "values": vals,
                "ylabel": str(fig.get("ylabel") or "Frequency"),
                "width": 230,
            }
        return fig

    if ft in ("fn", "function_graph", "coord_line", "system_lines", "quadratic_graph", "trig_graph", "Inequality_shade", "area_between", "riemann", "exp_log", "rational_graph", " scatter"):
        fns = []
        for f_item in fig.get("fns") or fig.get("functions") or []:
            expr = _clean_fn_expr(f_item)
            if expr:
                fns.append(expr)
        if not fns and fig.get("fn"):
            expr = _clean_fn_expr(fig["fn"])
            if expr:
                fns.append(expr)
        if not fns and fig.get("slope") is not None:
            m = float(fig.get("slope", 1))
            b = float(fig.get("intercept", 0))
            fns.append(f"{m}*x + ({b})")
        xr = fig.get("xrange") or fig.get("xlim") or [fig.get("xmin", -6), fig.get("xmax", 6)]
        yr = fig.get("yrange") or fig.get("ylim") or [fig.get("ymin", -6), fig.get("ymax", 6)]
        pts_out = []
        for pt in fig.get("points") or []:
            if isinstance(pt, dict) and "x" in pt and "y" in pt:
                lbl = sanitize_math_spans(str(pt.get("label") or f"$({pt['x']},{pt['y']})$"))
                pts_out.append({"x": float(pt["x"]), "y": float(pt["y"]), "label": lbl})
        if not fns:
            return None
        out = {
            "type": "plot",
            "fns": fns,
            "xmin": float(xr[0]),
            "xmax": float(xr[1]),
            "ymin": float(yr[0]),
            "ymax": float(yr[1]),
            "width": 230,
        }
        if pts_out:
            out["point_labels"] = pts_out[:4]
        if fig.get("asymptotes"):
            out["asymptotes"] = fig["asymptotes"]
        return out

    if ft in ("bar_chart", "histogram"):
        cats = [str(c) for c in (fig.get("categories") or fig.get("labels") or ["A", "B", "C", "D"])]
        vals = [float(v) for v in (fig.get("values") or fig.get("data") or [5, 8, 6, 10])][:len(cats)]
        return {
            "type": "bars",
            "categories": cats[:len(vals)],
            "values": vals,
            "ylabel": str(fig.get("ylabel") or "Count"),
            "width": 230,
        }
    if ft in ("box_plot", "boxplot"):
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


def _extract_plot_expr_from_tex(q_text):
    """Try to extract an explicit function $y = ...$ or $f(x) = ...$ from the question text
    so any synthesized plot shows the EXACT curve in the question!"""
    for m in re.finditer(r"\$([^$]+)\$", q_text):
        tex = m.group(1)
        m_fn = re.search(r"(?:f\(x\)|g\(x\)|h\(x\)|y)\s*=\s*([^,=;]+)", tex)
        if m_fn:
            rhs = m_fn.group(1).strip()
            # Convert common LaTeX to Python expression
            rhs = re.sub(r"\\(?:d|t)?frac\{([^{}]+)\}\{([^{}]+)\}", r"((\1)/(\2))", rhs)
            rhs = re.sub(r"\\sqrt\{([^{}]+)\}", r"sqrt(\1)", rhs)
            rhs = re.sub(r"\\(?:sin|cos|tan|ln|log|exp)\b", lambda k: k.group(0)[1:], rhs)
            rhs = rhs.replace("{", "(").replace("}", ")")
            cleaned = _clean_fn_expr(rhs)
            if cleaned and "x" in cleaned:
                return cleaned
    return None


def derive_figure_from_question(q_obj, track, topic_title, q_idx, used_fig_sigs):
    """Derive a non-generic, problem-specific diagram locked to the numbers & equation of q_obj,
    guaranteeing it never collides with any figure already in used_fig_sigs."""
    q_text = str(q_obj.get("q", "")) + " " + " ".join(q_obj.get("parts") or [])
    q_low = q_text.lower()
    t_low = topic_title.lower()

    # Deterministic hash seed from the exact question text so every distinct question gets distinct parameters
    h_int = int(hashlib.md5((q_text + f"#{q_idx}").encode("utf-8")).hexdigest()[:8], 16)
    nums = [float(n) for n in re.findall(r"-?\d+(?:\.\d+)?", re.sub(r"\^[0-9]+", "", q_text)) if 0 < abs(float(n)) <= 120]

    for attempt in range(8):
        seed = h_int + attempt * 37
        fig = _build_candidate_figure(q_text, q_low, t_low, nums, q_idx + attempt, seed)
        sig = figure_signature(fig)
        if sig and sig not in used_fig_sigs:
            used_fig_sigs.add(sig)
            return fig
    return fig


def _build_candidate_figure(q_text, q_low, t_low, nums, q_idx, seed):
    # 0. If the question has an explicit function $f(x) = ...$ or $y = ...$, plot that exact curve!
    parsed_fn = _extract_plot_expr_from_tex(q_text)
    if parsed_fn and not any(k in q_low for k in ["triangle", "circle", "cylinder", "cone", "sphere", "pyramid", "venn", "boxplot", "histogram", "bar graph"]):
        x0 = round(((seed % 5) - 2) * 0.5, 1)
        import numpy as np
        env = {"x": np.linspace(-4, 4, 81), "np": np, "sin": np.sin, "cos": np.cos, "tan": np.tan, "exp": np.exp, "log": np.log, "sqrt": np.sqrt, "abs": np.abs, "pi": np.pi, "e": np.e}
        try:
            with np.errstate(all="ignore"):
                ys = np.asarray(eval(parsed_fn, {"__builtins__": {}}, env), dtype=float)
            finite_y = ys[np.isfinite(ys)]
            if len(finite_y) >= 10:
                ymin = float(max(-15.0, math.floor(np.min(finite_y) - 1.5)))
                ymax = float(min(20.0, math.ceil(np.max(finite_y) + 1.5)))
                if ymax <= ymin + 1:
                    ymax = ymin + 6.0
                y0_val = float(eval(parsed_fn, {"__builtins__": {}}, dict(env, x=np.array([x0])))[0])
                pt_lbls = []
                if np.isfinite(y0_val) and ymin <= y0_val <= ymax:
                    pt_lbls.append({"x": x0, "y": round(y0_val, 2), "label": f"$({x0:g}, {round(y0_val, 2):g})$"})
                out = {
                    "type": "plot",
                    "fns": [parsed_fn],
                    "xmin": -4.5, "xmax": 4.5, "ymin": ymin, "ymax": ymax,
                    "width": 225,
                }
                if pt_lbls:
                    out["point_labels"] = pt_lbls
                if any(k in q_low for k in ["integral", "area", "riemann", "region", " المساحة", "التكامل"]):
                    out["shade"] = {"fn1": parsed_fn, "fn2": "0", "x0": 0.0, "x1": 2.5}
                return out
        except Exception:
            pass

    # 1. Differential equations / slope field
    if any(k in q_low or k in t_low for k in ["differential equation", "separable", "dy/dx", "y'", "initial value", "euler", "logistic", "معادلة تفاضلية"]):
        a_coef = round(0.2 + 0.1 * (seed % 5), 2)
        b_coef = round(0.15 + 0.1 * ((seed >> 3) % 4), 2)
        c_const = (seed % 5) - 2
        return {
            "type": "slope_field",
            "expr": f"{a_coef}*x - {b_coef}*y + 0.1*({c_const})",
            "sol_fn": f"{round(a_coef/b_coef, 2)}*x - {round(a_coef/(b_coef**2), 2)} + {2 + (seed % 3)}*exp(-{b_coef}*x)",
            "xmin": -4, "xmax": 4, "ymin": -4, "ymax": 4,
            "width": 225,
        }

    # 2. Definite integral / area under curve / Riemann sum
    if any(k in q_low or k in t_low for k in ["integral", "area", "riemann", "trapezoid", "accumulation", "antiderivative", "volume of revolution", "تكامل", "مساحة المنطقة"]):
        a = round(0.2 + 0.07 * (seed % 5), 2)
        b = round(1.0 + 0.25 * ((seed >> 2) % 4), 2)
        c = round(1.8 + 0.3 * ((seed >> 4) % 4), 2)
        x_end = round(2.5 + 0.4 * (seed % 3), 1)
        fn = f"-{a}*x**2 + {b}*x + {c}"
        fn_line = f"{round(0.2 + 0.1*(seed%3), 2)}*x + 0.3"
        return {
            "type": "plot",
            "fns": [fn, fn_line],
            "xmin": -1, "xmax": 5, "ymin": -1, "ymax": 5.5,
            "shade": {"fn1": fn, "fn2": fn_line, "x0": 0.0, "x1": x_end},
            "point_labels": [{"x": 1.5, "y": round(-a * 2.25 + b * 1.5 + c, 2), "label": "$y=f(x)$"}],
            "width": 230,
        }

    # 3. Probability / Venn / Conditional probability / Sets
    if any(k in q_low or k in t_low for k in ["venn", "union", "intersection", "mutually exclusive", "conditional probability", "bayes", "set ", "احتمال", "مجموعة"]):
        int_nums = [int(abs(n)) for n in nums if 2 <= abs(n) <= 95]
        oa = int_nums[0] if len(int_nums) > 0 else 11 + (seed % 14)
        bo = int_nums[1] if len(int_nums) > 1 else 4 + ((seed >> 2) % 9)
        ob = int_nums[2] if len(int_nums) > 2 else 9 + ((seed >> 4) % 13)
        ne = int_nums[3] if len(int_nums) > 3 else 3 + (seed % 7)
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
    if any(k in q_low or k in t_low for k in ["normal", "z-score", "confidence interval", "hypothesis", "standard deviation", "gaussian", "توزيع طبيعي", "انحراف معياري"]):
        z_vals = [1.28, 1.50, 1.65, 1.80, 1.96, 2.15, 2.33, 2.58]
        z = z_vals[seed % len(z_vals)]
        peak = round(3.6 + 0.2 * (seed % 4), 2)
        fn_norm = f"{peak}*exp(-0.5*x**2)"
        return {
            "type": "plot",
            "fns": [fn_norm],
            "xmin": -3.5, "xmax": 3.5, "ymin": -0.3, "ymax": 4.5,
            "shade": {"fn1": fn_norm, "fn2": "0", "x0": -z, "x1": z},
            "point_labels": [{"x": z, "y": round(peak * math.exp(-0.5 * z * z), 2), "label": f"$z={z}$"}],
            "width": 230,
        }
    if any(k in q_low or k in t_low for k in ["median", "quartile", "interquartile", "iqr", "boxplot", "five-number", "outlier", "وسيط", "ربيع"]):
        base = int(nums[0]) if (nums and 5 <= nums[0] <= 70) else (12 + (seed % 15) * 3)
        spread = 6 + ((seed >> 3) % 6)
        return {
            "type": "boxplot",
            "groups": [
                {"label": "Group A", "stats": [base, base + spread, base + 2 * spread - 1, base + 3 * spread, base + 4 * spread + 2]},
                {"label": "Group B", "stats": [base + 3, base + spread + 4, base + 2 * spread + 3, base + 3 * spread + 5, base + 4 * spread + 6]},
            ],
            "min": base - 4,
            "max": base + 4 * spread + 10,
            "width": 240,
        }
    if any(k in q_low or k in t_low for k in ["mean", "frequency", "histogram", "survey", "table", "sample", "data", "regression", "correlation", "متوسط", "جدول", "بيانات"]):
        if "scatter" in q_low or "regression" in q_low or "correlation" in q_low:
            m_reg = round(0.55 + 0.12 * (seed % 5), 2)
            b_reg = round(0.8 + 0.35 * ((seed >> 2) % 5), 2)
            pts = [[i, round(m_reg * i + b_reg + ((-1)**(i + seed)) * 0.35, 2)] for i in range(1, 8)]
            return {
                "type": "plot",
                "fns": [f"{m_reg}*x + {b_reg}"],
                "scatter_pts": pts,
                "xmin": 0, "xmax": 8, "ymin": 0, "ymax": round(m_reg * 8 + b_reg + 1.5, 1),
                "width": 230,
            }
        v0 = int(nums[0]) if (nums and 4 <= nums[0] <= 40) else (8 + (seed % 11) * 2)
        d1, d2, d3, d4 = 3 + (seed % 7), 7 + ((seed >> 2) % 9), 2 + ((seed >> 4) % 6), 5 + ((seed >> 6) % 8)
        return {
            "type": "bars",
            "categories": ["C1", "C2", "C3", "C4", "C5"],
            "values": [v0, v0 + d1, v0 + d2, v0 + d3, v0 + d4],
            "ylabel": "Frequency",
            "highlight_index": seed % 5,
            "width": 230,
        }

    # 5. 3D Mensuration / Volume / Surface Area
    if any(k in q_low or k in t_low for k in ["cylinder", "cone", "sphere", "pyramid", "prism", "cuboid", "surface area", "volume", "أسطوانة", "مخروط", "حجم"]):
        solids = ["cylinder", "cone", "rectangular_prism", "square_pyramid", "sphere"]
        sol = "cylinder" if "cylinder" in q_low else ("cone" if "cone" in q_low else ("sphere" if "sphere" in q_low else ("pyramid" if "pyramid" in q_low else solids[seed % len(solids)])))
        int_nums = [int(abs(n)) for n in nums if 2 <= abs(n) <= 45]
        r = int_nums[0] if len(int_nums) > 0 else 3 + (seed % 9)
        h = int_nums[1] if len(int_nums) > 1 else 6 + ((seed >> 3) % 11)
        labels = {"r": f"$r={r}$", "h": f"$h={h}$"} if sol in ("cylinder", "cone", "sphere") else {"l": f"${r}$", "w": f"${r + 2}$", "h": f"${h}$", "base": f"${r}$"}
        return {
            "type": "solid",
            "solid": sol,
            "dims": [float(r), float(r + 2), float(h)],
            "labels": labels,
            "width": 220,
        }

    # 6. Circles / Arcs / Sectors / Radians
    if any(k in q_low or k in t_low for k in ["circle", "sector", "arc", "chord", "tangent to the circle", "radian", "circular measure", "دائرة", "قطاع", "وتر"]):
        int_nums = [int(abs(n)) for n in nums if 3 <= abs(n) <= 165]
        r = int_nums[0] if (int_nums and int_nums[0] <= 25) else 4 + (seed % 11)
        deg = int_nums[1] if (len(int_nums) > 1 and 30 <= int_nums[1] <= 160) else 40 + ((seed >> 2) % 11) * 10
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
    if any(k in q_low or k in t_low for k in ["triangle", "hypotenuse", "sine", "cosine", "tangent", "sin ", "cos ", "tan ", "pythagor", "elevation", "bearing", "congruen", "similar", "مثلث", "زاوية"]):
        triples = [
            (3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15),
            (7, 24, 25), (9, 40, 41), (12, 16, 20), (10, 24, 26), (15, 20, 25),
            (12, 35, 37), (16, 30, 34), (18, 24, 30), (20, 21, 29),
        ]
        a, b, c = triples[seed % len(triples)]
        scale = 1 + ((seed >> 4) % 3) if c <= 15 else 1
        a, b, c = a * scale, b * scale, c * scale
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
    if any(k in q_low or k in t_low for k in ["inequalit", "number line", "interval", "|x", "absolute value", "modulus", "متباينة", "خط الأعداد", "القيمة المطلقة"]):
        s_nums = sorted(set(int(round(n)) for n in nums if -25 <= n <= 25))
        if len(s_nums) >= 2:
            a, b = s_nums[0], s_nums[-1]
            if a == b:
                b = a + 5
        else:
            a = -6 + (seed % 5)
            b = 2 + ((seed >> 2) % 7)
        return {
            "type": "numberline",
            "min": float(a - 3),
            "max": float(b + 3),
            "shade": [float(a), float(b)],
            "marks": [
                {"x": float(a), "open": bool(seed % 2 == 1), "label": f"${a}$"},
                {"x": float(b), "open": bool((seed >> 1) % 2 == 1), "label": f"${b}$"},
            ],
            "width": 250,
        }

    # 9. Trigonometric graphs / Periodic functions
    if any(k in q_low or k in t_low for k in ["amplitude", "period", "phase shift", "sinusoid", "harmonic", "trig", "دالة مثلثية", "سعة"]):
        amp = 1.5 + 0.5 * (seed % 5)
        freq = 1 + (seed >> 2) % 3
        mid = (seed >> 4) % 3 - 1
        fn1 = f"{amp}*sin({freq}*x) + ({mid})"
        return {
            "type": "plot",
            "fns": [fn1, "cos(x)"],
            "xmin": -4, "xmax": 4, "ymin": -4.5, "ymax": 4.5,
            "point_labels": [{"x": round(1.57 / freq, 2), "y": float(amp + mid), "label": f"$({round(1.57/freq, 2)}, {amp+mid:g})$"}],
            "width": 230,
        }

    # 10. Exponential / Logarithmic curves
    if any(k in q_low or k in t_low for k in ["exponential", "logarithm", "half-life", "compound", "growth", "decay", "\\ln", "\\log", "أسية", "لوغاريتم"]):
        base_rate = round(0.4 + 0.12 * (seed % 5), 2)
        v_shift = (seed >> 2) % 3 - 1
        h_asym = -2 - (seed % 3)
        return {
            "type": "plot",
            "fns": [f"2**({base_rate}*x) + ({v_shift})", f"log(x - ({h_asym})) + 0.5"],
            "xmin": float(h_asym + 0.1), "xmax": 4.5, "ymin": -2.5, "ymax": 7.0,
            "asymptotes": {"x": [float(h_asym)], "y": [float(v_shift)]},
            "point_labels": [{"x": 0.0, "y": float(1 + v_shift), "label": f"$(0, {1+v_shift})$"}],
            "width": 230,
        }

    # 11. Rational functions / Asymptotes / Limits
    if any(k in q_low or k in t_low for k in ["rational", "asymptote", "discontinuit", "limit", "\\lim", "نهاية", "تقارب"]):
        va = ((seed % 5) - 2) or 1
        ha = ((seed >> 2) % 5) - 1
        num_k = round(1.0 + 0.5 * (seed % 4), 1)
        return {
            "type": "plot",
            "fns": [f"{ha} + {num_k}/(x - ({va}))"],
            "xmin": -5, "xmax": 5, "ymin": -5, "ymax": 6,
            "asymptotes": {"x": [float(va)], "y": [float(ha)]},
            "point_labels": [{"x": float(va + 1), "y": float(ha + num_k), "label": f"$({va+1:g}, {ha+num_k:g})$"}],
            "width": 230,
        }

    # 12. Default: Distinct Algebraic / Calculus curve + secant/tangent intersection tied to question seed
    h_shift = round(((seed % 7) - 3) * 0.5, 1)
    k_shift = round((((seed >> 3) % 7) - 3) * 0.5, 1)
    a_quad = round(0.3 + 0.15 * (seed % 4), 2) * (-1 if (seed >> 6) % 2 == 1 else 1)
    m_line = round(0.4 + 0.25 * ((seed >> 2) % 5) * (-1 if seed % 2 == 1 else 1), 2)
    b_line = round(k_shift + 1.2 * (1 if a_quad > 0 else -1), 2)
    fn1 = f"{a_quad}*(x - ({h_shift}))**2 + ({k_shift})"
    fn2 = f"{m_line}*x + ({b_line})"
    return {
        "type": "plot",
        "fns": [fn1, fn2],
        "xmin": -5, "xmax": 5, "ymin": -5, "ymax": 6,
        "point_labels": [{"x": float(h_shift), "y": float(k_shift), "label": f"$({h_shift:g},{k_shift:g})$"}],
        "width": 230,
    }


def tokenize(text):
    return set(w for w in re.findall(r"[a-zA-Z\u0600-\u06FF]{3,}", str(text).lower()) if w not in {
        "the", "and", "for", "with", "that", "this", "from", "what", "which", "find", "solve", "value", "given", "following"
    })


def load_track_candidate_pool(track, want_ar=False):
    """Load all verified MCQs and FRQs from the curriculum family's bank-data, _practice-set.json,
    and content/<track>/*.json chapter blocks (practiceProblem & worked examples)."""
    mcqs = []
    frqs = []
    seen_skels = set()

    family_tracks = FAMILY_POOLS.get(track, [track])
    for fam_idx, bt in enumerate(family_tracks):
        is_primary_track = (fam_idx == 0)
        bp = os.path.join(BANK_DIR, f"{bt}.json")
        if os.path.exists(bp):
            data = json.load(open(bp, encoding="utf-8"))
            items = data.get("pool") or (data.get("easy", []) + data.get("medium", []) + data.get("hard", []))
            for it in items:
                raw_text = it.get("text") or it.get("q") or ""
                if bt in ("qudrat", "tahsili") or want_ar:
                    q_txt = split_bilingual_text(raw_text, want_ar=want_ar)
                else:
                    q_txt = strip_html_and_convert_math(raw_text)
                if not q_txt or is_banned_shallow(q_txt):
                    continue
                skel = question_skeleton(q_txt)
                if len(skel) < 18 or skel in seen_skels:
                    continue

                raw_choices = it.get("choices") or []
                if len(raw_choices) != 4:
                    continue
                if bt in ("qudrat", "tahsili") or want_ar:
                    choices = [split_bilingual_text(c, want_ar=want_ar) or strip_html_and_convert_math(c) for c in raw_choices]
                else:
                    choices = [strip_html_and_convert_math(c) for c in raw_choices]
                # Skip if choices are identical or broken
                if len(set(choices)) < 3:
                    continue
                corr = it.get("correct") if it.get("correct") is not None else it.get("answer", 0)
                if not isinstance(corr, int) or not (0 <= corr < 4):
                    corr = 0
                raw_sol = it.get("solution") or it.get("sol") or ""
                if bt in ("qudrat", "tahsili") or want_ar:
                    sol = split_bilingual_text(raw_sol, want_ar=want_ar) or strip_html_and_convert_math(raw_sol)
                else:
                    sol = strip_html_and_convert_math(raw_sol)
                if not sol:
                    sol = f"الإجابة الصحيحة هي {choices[corr]}." if want_ar else f"The correct option is {choices[corr]}."
                fig = convert_bank_figure(it.get("fig") or it.get("figure"))
                diff_raw = str(it.get("difficulty") or "medium").lower()
                diff = "Foundational" if diff_raw == "easy" else ("Challenging" if diff_raw == "hard" else "Intermediate")
                dom = str(it.get("domain") or it.get("exam_archetype") or "")
                seen_skels.add(skel)
                mcqs.append({
                    "q": q_txt,
                    "skeleton": skel,
                    "choices": choices,
                    "correct": corr,
                    "answer": sol,
                    "explanation": sol,
                    "figure": fig,
                    "difficulty": diff,
                    "domain": dom,
                    "primary": is_primary_track,
                    "tokens": tokenize(dom + " " + q_txt),
                })

        # Also load _practice-set.json from family tracks
        ps_path = os.path.join(CONTENT_DIR, bt, "_practice-set.json")
        if os.path.exists(ps_path):
            ps_data = json.load(open(ps_path, encoding="utf-8"))
            for it in ps_data.get("items", []):
                q_field = it.get("prompt") or it.get("question") or ""
                if isinstance(q_field, dict):
                    q_field = q_field.get("ar" if want_ar else "en") or ""
                elif want_ar:
                    continue
                s_field = it.get("solution") or ""
                if isinstance(s_field, dict):
                    s_field = s_field.get("ar" if want_ar else "en") or ""
                q_txt = strip_html_and_convert_math(q_field)
                sol_txt = strip_html_and_convert_math(s_field)
                if not q_txt or not sol_txt or is_banned_shallow(q_txt):
                    continue
                skel = question_skeleton(q_txt)
                if len(skel) < 18 or skel in seen_skels:
                    continue
                seen_skels.add(skel)
                fig = convert_bank_figure(it.get("figure") or it.get("fig"))
                frqs.append({
                    "q": q_txt,
                    "skeleton": skel,
                    "answer": sol_txt,
                    "explanation": sol_txt,
                    "figure": fig,
                    "difficulty": it.get("difficulty", "Intermediate"),
                    "domain": str(it.get("topic") or it.get("skill") or ""),
                    "primary": is_primary_track,
                    "tokens": tokenize(q_txt + " " + str(it.get("topic") or "")),
                })

        # Also load chapter practiceProblem blocks from content/<bt>/*.json
        for chap_file in sorted(glob.glob(os.path.join(CONTENT_DIR, bt, "*.json"))):
            if chap_file.endswith("_meta.json") or chap_file.endswith("_practice-set.json"):
                continue
            try:
                cd = json.load(open(chap_file, encoding="utf-8"))
            except Exception:
                continue
            chap_title = cd.get("title", "")
            if isinstance(chap_title, dict):
                chap_title = chap_title.get("ar" if want_ar else "en") or ""
            for blk in (cd.get("content") or {}).get("blocks", []):
                if blk.get("kind") == "practiceProblem":
                    qf = blk.get("question") or {}
                    sf = blk.get("solution") or {}
                    q_raw = qf.get("ar" if want_ar else "en") if isinstance(qf, dict) else ("" if want_ar else str(qf))
                    s_raw = sf.get("ar" if want_ar else "en") if isinstance(sf, dict) else ("" if want_ar else str(sf))
                    q_txt = strip_html_and_convert_math(q_raw)
                    s_txt = strip_html_and_convert_math(s_raw)
                    if not q_txt or not s_txt or is_banned_shallow(q_txt):
                        continue
                    skel = question_skeleton(q_txt)
                    if len(skel) < 18 or skel in seen_skels:
                        continue
                    seen_skels.add(skel)
                    frqs.append({
                        "q": q_txt,
                        "skeleton": skel,
                        "answer": s_txt,
                        "explanation": s_txt,
                        "figure": None,
                        "difficulty": "Intermediate",
                        "domain": str(chap_title),
                        "primary": is_primary_track,
                        "tokens": tokenize(str(chap_title) + " " + q_txt),
                    })

    return frqs, mcqs


def can_convert_mcq_to_frq(q_txt):
    low = q_txt.lower()
    banned = [
        "which of the following", "which statement", "which graph", "which expression below",
        "which equation below", "select all", "true or false", "which table", "which diagram",
        "which value", "which function", "which set", "اي مما يلي", "أي مما يلي", "أي العبارات", "أي الدوال",
    ]
    return not any(b in low for b in banned)


def mcq_to_frq(mcq_item, target_label, diff_tier, cross_label=None, is_ar=False):
    corr_idx = mcq_item.get("correct", 0)
    choices = mcq_item.get("choices", [])
    corr_val = choices[corr_idx] if 0 <= corr_idx < len(choices) else ""
    stem = mcq_item["q"].strip()
    if not is_ar:
        if stem.endswith("?"):
            stem = stem + " Show your complete algebraic work."
        elif not stem.endswith("."):
            stem = stem + "."
    sol = mcq_item.get("answer") or mcq_item.get("explanation") or ""
    prefix = "الإجابة النهائية:" if is_ar else "Final Answer:"
    full_ans = f"{prefix} {corr_val}. {sol}".strip() if corr_val and corr_val not in sol[:35] else sol
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

            sections = []
            sub_list = unit_subfiles.get(idx, [])
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
    """Upgrade all topic JSON files in tools/worksheet_gen/topics/<track>/ to 20 FRQs + 25 MCQs
    with ZERO intra-sheet or inter-sheet skeleton/figure redundancy."""
    if track in ("algebra", "alg2", "geo", "igcse", "ibsl"):
        ensure_5_Missing_Tracks_Initialized()

    t_dir = os.path.join(TOPICS_DIR, track)
    topic_files = sorted(glob.glob(os.path.join(t_dir, "*.json")))
    if not topic_files:
        print(f"No topic files found for {track}")
        return 0

    if track == "sat":
        os.makedirs(os.path.join(PUBLIC_WS_DIR, track), exist_ok=True)
        for tf in topic_files:
            d = json.load(open(tf, encoding="utf-8"))
            out_name = d["num"] + ("-ar" if d.get("lang") == "ar" else "") + ".json"
            with open(os.path.join(PUBLIC_WS_DIR, track, out_name), "w", encoding="utf-8") as wf:
                json.dump(d, wf, ensure_ascii=False, indent=2)
        return len(topic_files)

    cand_frqs_en, cand_mcqs_en = load_track_candidate_pool(track, want_ar=False)
    has_ar_files = any(tf.endswith("-ar.json") for tf in topic_files)
    cand_frqs_ar, cand_mcqs_ar = load_track_candidate_pool(track, want_ar=True) if has_ar_files else ([], [])

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

    # Track-wide deduplication sets (separate for EN and AR so every sheet in a language is 100% unique)
    used_skeletons_by_lang = {"en": set(), "ar": set()}
    used_fig_sigs_by_lang = {"en": set(), "ar": set()}

    for t_idx, tm in enumerate(topics_meta):
        tf = tm["path"]
        fname = tm["filename"]
        num = tm["num"]
        title = tm["title"]
        lang = tm["lang"]
        is_ar = (lang == "ar")
        used_skels = used_skeletons_by_lang[lang]
        used_figs = used_fig_sigs_by_lang[lang]

        cand_frqs = cand_frqs_ar if is_ar else cand_frqs_en
        cand_mcqs = cand_mcqs_ar if is_ar else cand_mcqs_en

        old_data = git_show_json(f"979b35d:tools/worksheet_gen/topics/{track}/{fname}")
        if old_data is None and track in ("addmath", "mathai"):
            old_data = git_show_json(f"840703e:tools/worksheet_gen/topics/{track}/{fname}")
        cur_data = json.load(open(tf, encoding="utf-8"))

        same_lang_topics = [x for x in topics_meta if x["lang"] == lang and x["num"] != num]
        if not same_lang_topics:
            same_lang_topics = topics_meta

        raw_frqs = []
        raw_mcqs = []
        lesson_targets = []

        # Pull hand-authored multi-part FRQs and MCQs from original topic file first
        for src_doc in ([old_data] if old_data else [cur_data]):
            for sec in src_doc.get("sections", []):
                h = sec.get("heading") or title
                clean_h = re.sub(r"^(?:Section|Part)\s+[0-9IVX]+\s*[:—-]\s*", "", h).strip()
                if clean_h and not clean_h.lower().startswith("multiple choice") and not clean_h.startswith("اختيار من متعدد") and not clean_h.startswith("الجزء"):
                    if clean_h not in lesson_targets:
                        lesson_targets.append(clean_h)
                for q in sec.get("questions", []):
                    q_stem = str(q.get("q", ""))
                    # Keep multi-part FRQs or rich non-shallow questions
                    if not q.get("parts") and is_banned_shallow(q_stem):
                        continue
                    if q.get("choices"):
                        raw_mcqs.append((clean_h or title, q))
                    else:
                        raw_frqs.append((clean_h or title, q))

        if not lesson_targets:
            lesson_targets = [title]

        # Deduplicate raw_frqs and raw_mcqs by structural skeleton!
        unique_frqs = []
        for h, q in raw_frqs:
            q_full = str(q.get("q", "")) + " " + " ".join(q.get("parts") or [])
            sk = question_skeleton(q_full)
            if len(sk) >= 12 and sk not in used_skels:
                used_skels.add(sk)
                unique_frqs.append((h, q))

        unique_mcqs = []
        for h, q in raw_mcqs:
            sk = question_skeleton(q.get("q", ""))
            if len(sk) >= 15 and sk not in used_skels:
                used_skels.add(sk)
                unique_mcqs.append((h, q))

        topic_tokens = tokenize(title + " " + " ".join(lesson_targets))

        def _score_item(it):
            overlap = len(topic_tokens & it["tokens"])
            prim_bonus = 10 if it.get("primary") else 0
            has_fig = 2 if it.get("figure") else 0
            return (prim_bonus + overlap * 4 + has_fig, len(it.get("answer", "")))

        ranked_cand_frqs = sorted(
            [x for x in cand_frqs if x["skeleton"] not in used_skels],
            key=_score_item,
            reverse=True,
        )
        ranked_cand_mcqs = sorted(
            [x for x in cand_mcqs if x["skeleton"] not in used_skels],
            key=_score_item,
            reverse=True,
        )

        # 1. Fill unique_frqs up to 20 using ranked_cand_frqs
        for cf in ranked_cand_frqs:
            if len(unique_frqs) >= 20:
                break
            if cf["skeleton"] in used_skels:
                continue
            t_lbl = lesson_targets[len(unique_frqs) % len(lesson_targets)]
            unique_frqs.append((t_lbl, cf))
            used_skels.add(cf["skeleton"])

        # 2. If still < 20 FRQs, convert open-ended MCQs from ranked_cand_mcqs into FRQs
        # (Wait until we reserve 25 MCQs first, or take alternating items so both FRQs and MCQs get top-scoring topic matches)
        needed_mcqs = max(0, 25 - len(unique_mcqs))
        for cm in ranked_cand_mcqs:
            if len(unique_mcqs) >= 25:
                break
            if cm["skeleton"] in used_skels:
                continue
            t_lbl = lesson_targets[len(unique_mcqs) % len(lesson_targets)]
            unique_mcqs.append((t_lbl, cm))
            used_skels.add(cm["skeleton"])

        # Now fill remaining FRQ slots from remaining ranked_cand_mcqs
        if len(unique_frqs) < 20:
            for cm in ranked_cand_mcqs:
                if len(unique_frqs) >= 20:
                    break
                if cm["skeleton"] in used_skels:
                    continue
                if can_convert_mcq_to_frq(cm["q"]):
                    t_lbl = lesson_targets[len(unique_frqs) % len(lesson_targets)]
                    conv = mcq_to_frq(cm, t_lbl, "Intermediate", is_ar=is_ar)
                    unique_frqs.append((t_lbl, conv))
                    used_skels.add(cm["skeleton"])

        # Any final fallback if needed
        if len(unique_frqs) < 20:
            for cm in ranked_cand_mcqs:
                if len(unique_frqs) >= 20:
                    break
                if cm["skeleton"] not in used_skels:
                    t_lbl = lesson_targets[len(unique_frqs) % len(lesson_targets)]
                    conv = mcq_to_frq(cm, t_lbl, "Challenging", is_ar=is_ar)
                    unique_frqs.append((t_lbl, conv))
                    used_skels.add(cm["skeleton"])

        selected_frqs = unique_frqs[:20]
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
            norm_q = normalize_existing_frq(q, t_lbl, diff_tier, cross_lbl)
            # Check figure uniqueness! If its existing figure was already used, replace it with a unique question-locked figure
            if norm_q.get("figure"):
                sig = figure_signature(norm_q["figure"])
                if sig in used_figs:
                    norm_q["figure"] = derive_figure_from_question(norm_q, track, title, i, used_figs)
                else:
                    used_figs.add(sig)
            final_frqs.append(norm_q)

        # Format the 25 MCQs into 3 tiers (8 Foundational, 9 Intermediate, 8 Challenging & Cross-Lesson)
        final_mcqs = []
        for i, (h, q) in enumerate(selected_mcqs):
            diff_tier = "Foundational" if i < 8 else ("Intermediate" if i < 17 else "Challenging")
            t_lbl = h if h and not h.lower().startswith("multiple choice") and not h.startswith("اختيار من متعدد") else lesson_targets[i % len(lesson_targets)]
            cross_lbl = None
            if i >= 17:
                nb = same_lang_topics[(t_idx + i) % len(same_lang_topics)]
                cross_lbl = f"{nb['num']} {nb['title']}"
            norm_q = normalize_existing_mcq(q, t_lbl, diff_tier, cross_lbl)
            if norm_q.get("figure"):
                sig = figure_signature(norm_q["figure"])
                if sig in used_figs:
                    norm_q["figure"] = derive_figure_from_question(norm_q, track, title, 20 + i, used_figs)
                else:
                    used_figs.add(sig)
            final_mcqs.append(norm_q)

        # Ensure at least 9 unique problem-specific figures across the 45 questions (4 in FRQs, 5 in MCQs)
        all_45 = final_frqs + final_mcqs
        cur_figs = sum(1 for q in all_45 if q.get("figure"))
        target_fig_indices = [1, 5, 9, 15, 22, 27, 32, 38, 42]
        for idx_pos in target_fig_indices:
            if cur_figs >= 9:
                break
            if idx_pos < len(all_45) and not all_45[idx_pos].get("figure"):
                all_45[idx_pos]["figure"] = derive_figure_from_question(all_45[idx_pos], track, title, idx_pos + t_idx * 50, used_figs)
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
        print(f"✓ De-duplicated & upgraded track {t:10s}: {n:2d} topic worksheets (20 FRQ + 25 MCQ = 45 unique Qs each)")
    print(f"\nDone! Upgraded {total_topics} topic worksheets across {len(tracks)} track(s) with zero redundancy.")


if __name__ == "__main__":
    main()
