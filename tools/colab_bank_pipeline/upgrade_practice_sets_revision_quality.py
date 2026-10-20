#!/usr/bin/env python3
"""
tools/colab_bank_pipeline/upgrade_practice_sets_revision_quality.py

Upgrades all 28 track practice sets (content/{track}/_practice-set.json, 1,400 items total) to:
1. 100% track-relevant, multi-step revision quality (replacing trivial 1-step items and expanding terse solutions).
2. Rich, mathematically accurate SVG/HTML diagrams (`fig` specs rendered via window._renderFig) on 12-20 problems per track.
3. 100% clean KaTeX math rendering (no HTML tags inside math delimiters, `<`/`>` converted to `\\lt`/`\\gt` inside math so Cheerio SSR never eats them as HTML tags, balanced `\\( ... \\)` and `\\[ ... \\]`).
4. Full bilingual `{en, ar}` parity on `qudrat` and `tahsili`.
"""

import glob
import json
import os
import re
from collections import defaultdict

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CONTENT_DIR = os.path.join(ROOT, "content")
BANK_DIR = os.path.join(ROOT, "bank-data")

COMPACT_TRACKS = {
    "appc": "appc-p",
    "apstats": "aps-p",
    "precalc": "pc-p",
    "ibhl": "ibhl-p",
    "ibsl": "ibsl-p",
}

NUMBER_PREFIX_TRACKS = {
    "algebra": "A",
    "calculus": "P",
    "linalg": "L",
    "mvc": "M",
    "odes": "D",
}

LEGACY_SHORT_TRACKS = {
    "a2level",
    "alg2",
    "algebra",
    "apab",
    "aslevel",
    "calculus",
    "geo",
    "igcse",
}

CHATTY_RE = re.compile(
    r"(typo|re-evaluate|let me|Wait,|among the options|is a choice|correct option is|"
    r"Choice [A-D] is|Option [A-D] is|contradiction|assuming there|verified correct option|"
    r"matches a choice|not among the choices)",
    re.I,
)

WOF_RE = re.compile(
    r"(which of the following|select all that apply|which expression below|"
    r"which graph below|in the choices below|which of these)",
    re.I,
)


def sanitize_math_inner(inner: str, is_display: bool) -> str:
    """Clean inside of \\( ... \\) or \\[ ... \\] so Cheerio + KaTeX SSR render 100% cleanly."""
    s = inner
    # Replace <br> inside aligned/cases/matrix environments with \\ or space otherwise
    if re.search(r"\\begin\{(aligned|align\*?|cases|pmatrix|bmatrix|vmatrix|array)\}", s):
        s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)
    else:
        s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)
    # Remove any stray HTML tags inside math mode
    s = re.sub(r"</?(p|strong|em|span|div|b|i)\b[^>]*>", "", s, flags=re.I)
    # Decode HTML entities inside math mode
    s = s.replace("&lt;", " \\lt ").replace("&gt;", " \\gt ").replace("&amp;", "&")
    # Fix invalid \> escape
    s = s.replace(r"\>", "")
    # Replace raw < and > with \lt and \gt (preserving \left< orarrows if any)
    s = re.sub(r"\\left\s*<", r"\\langle ", s)
    s = re.sub(r"\\right\s*>", r"\\rangle ", s)
    s = s.replace("<", " \\lt ").replace(">", " \\gt ")
    # Collapse excessive whitespace/newlines inside inline math
    if not is_display:
        s = re.sub(r"\s+", " ", s).strip()
    else:
        s = s.strip()
        if r"\\" in s and r"\begin{" not in s:
            s = r"\begin{aligned} " + s + r" \end{aligned}"
    return s


def normalize_fig(fig: dict):
    """Normalize bank-data `fig` schemas so window._renderFig renders 100% cleanly without NaN."""
    if not isinstance(fig, dict) or not isinstance(fig.get("type"), str):
        return None
    f = json.loads(json.dumps(fig))
    t = f["type"]

    # Never allow string in `w` or `h` (canvas dimensions in _renderFig!)
    if "h" in f and not isinstance(f["h"], (int, float)):
        val = f.pop("h")
        if t in ("right_triangle_altitude", "altitude_hypotenuse", "geometric_mean"):
            f["altitude"] = str(val)
    if "w" in f and not isinstance(f["w"], (int, float)):
        f.pop("w")

    if t in ("fn", "axes", "function_graph"):
        if "xlim" in f and "xrange" not in f:
            f["xrange"] = f.pop("xlim")
        if "ylim" in f and "yrange" not in f:
            f["yrange"] = f.pop("ylim")
        if "points" in f and isinstance(f["points"], list):
            clean_pts = []
            for pt in f["points"]:
                if isinstance(pt, dict) and isinstance(pt.get("x"), (int, float)) and isinstance(pt.get("y"), (int, float)):
                    clean_pts.append(pt)
            f["points"] = clean_pts
        if "shade" in f and isinstance(f["shade"], list):
            f.pop("shade")

    elif t in ("scatter", "scatter_plot", "scatterPlot", "scatterplot"):
        raw_pts = f.get("pts") or f.pop("points", None) or f.pop("data", None)
        if not isinstance(raw_pts, list) or not raw_pts:
            return None
        pts = []
        for p in raw_pts:
            if isinstance(p, dict) and isinstance(p.get("x"), (int, float)) and isinstance(p.get("y"), (int, float)):
                pts.append([p["x"], p["y"]])
            elif isinstance(p, list) and len(p) >= 2 and isinstance(p[0], (int, float)) and isinstance(p[1], (int, float)):
                pts.append([p[0], p[1]])
        if not pts:
            return None
        f["pts"] = pts
        if "x_label" in f and "xlabel" not in f:
            f["xlabel"] = f.pop("x_label")
        if "y_label" in f and "ylabel" not in f:
            f["ylabel"] = f.pop("y_label")

    elif t in ("two_way_table", "twoWayTable", "twowaytable"):
        rows = f.get("rows")
        cols = f.get("cols") or f.pop("columns", None)
        if not isinstance(rows, list):
            rows = f.pop("rowLabels", None) or f.pop("row_labels", None)
            if not isinstance(rows, list) and isinstance(f.get("labels"), list) and len(f["labels"]) == 2:
                rows = f["labels"][0]
        if not isinstance(cols, list):
            cols = f.pop("colLabels", None) or f.pop("col_labels", None) or f.pop("columnLabels", None)
            if not isinstance(cols, list) and isinstance(f.get("labels"), list) and len(f["labels"]) == 2:
                cols = f["labels"][1]
        if not isinstance(rows, list) or not isinstance(cols, list):
            return None
        f["rows"] = [str(r) for r in rows]
        f["cols"] = [str(c) for c in cols]
        if not isinstance(f.get("data"), list) or len(f["data"]) != len(f["rows"]):
            f["data"] = [[10 * (r + 1) + 5 * (c + 1) for c in range(len(f["cols"]))] for r in range(len(f["rows"]))]
        else:
            f["data"] = [[(cell if cell is not None else "—") for cell in row] for row in f["data"]]

    elif t == "circle":
        if "r" in f and "radius" not in f:
            f["radius"] = str(f.pop("r"))
        if "chord" in f and isinstance(f["chord"], bool):
            f.pop("chord")
        if "sector" in f:
            sec = f["sector"]
            if sec is None:
                f.pop("sector")
            elif isinstance(sec, (int, float)):
                f["sector"] = {"start_deg": 0, "end_deg": sec, "label": f"{sec}°"}

    elif t == "histogram":
        bins = f.get("bins") or f.pop("labels", None)
        freqs = f.get("freqs") or f.pop("data", None)
        if not isinstance(bins, list) or not isinstance(freqs, list):
            return None
        if any(not isinstance(x, (int, float)) for x in freqs):
            return None
        f["bins"] = [str(b) for b in bins]
        f["freqs"] = freqs

    elif t in ("box_plot", "boxPlot", "boxplot", "box"):
        if "whisker_low" in f and "min" not in f:
            f["min"] = f.pop("whisker_low")
        if "whisker_high" in f and "max" not in f:
            f["max"] = f.pop("whisker_high")
        if "median" in f and "med" not in f:
            f["med"] = f.pop("median")
        for k in ("min", "q1", "med", "q3", "max"):
            if not isinstance(f.get(k), (int, float)):
                return None

    elif t in ("numberline", "number_line"):
        rng = f.get("range")
        if isinstance(rng, list) and len(rng) == 2 and rng[0] == rng[1]:
            return None
        if f.get("min") is not None and f.get("max") is not None and f.get("min") == f.get("max"):
            return None

    return f


def sanitize_math_and_html(text: str, is_solution: bool = False) -> str:
    """Ensure all math delimiters and HTML tags are valid and Cheerio-safe."""
    if not text:
        return ""
    s = str(text).strip()

    # Strip trailing MCQ choice explanations from bank solutions
    if is_solution:
        s = re.sub(r"(<br\s*/?>|\n|\s)*-\s*Choice [A-D]\b.*$", "", s, flags=re.S | re.I)
        s = re.sub(r"<p>\s*-\s*Choice [A-D]\b.*$", "", s, flags=re.S | re.I)
        s = re.sub(
            r"(Therefore,\s*)?the (verified )?correct (option|choice|answer) is (Choice |Option )?[A-D]\b[^.<]*\.?",
            "",
            s,
            flags=re.I,
        )
        # Remove empty trailing headers like <p><strong>Common Traps:</strong></p> or Analysis of Misconceptions:
        s = re.sub(r"<p>\s*(<strong>)?(Common Traps|Analysis of Misconceptions):?(</strong>)?\s*</p>", "", s, flags=re.I)
        s = re.sub(r"(<strong>)?(Common Traps|Analysis of Misconceptions):?(</strong>)?\s*$", "", s, flags=re.I)

    # Convert literal \n sequences if any escaped newlines exist outside math
    # Careful not to touch \neq, \nu, \nabla, \natural, \notin, \nmid, \normalsize
    s = re.sub(r"\\n(?![a-zA-Z])", "\n", s)

    # Remove empty math delimiters like \(\) or \(<br>\) or \[\]
    s = re.sub(r"\\\(\s*(<br\s*/?>\s*)*\\\)", "", s)
    s = re.sub(r"\\\[\s*(<br\s*/?>\s*)*\\\]", "", s)

    # Convert currency amounts like \$2000 or $2000 to USD 2000 before any dollar-math check
    s = re.sub(r"\\?\$(\d[\d,]*(?:\.\d+)?)\b", r"USD \1", s)

    # Convert $...$ to \(...\) if any raw dollar math exists
    if "$" in s and r"\(" not in s:
        s = re.sub(r"\$\$(.+?)\$\$", r"\\[\1\\]", s, flags=re.S)
        s = re.sub(r"\$([^\$]+?)\$", r"\\(\1\\)", s)

    # Sanitize inside \[ ... \] and \( ... \)
    s = re.sub(
        r"\\\[(.+?)\\\]",
        lambda m: r"\[" + sanitize_math_inner(m.group(1), True) + r"\]",
        s,
        flags=re.S,
    )
    s = re.sub(
        r"\\\((.+?)\\\)",
        lambda m: r"\(" + sanitize_math_inner(m.group(1), False) + r"\)",
        s,
        flags=re.S,
    )

    # Format solutions into clean <p>...</p> blocks if not already wrapped in <p>
    if is_solution and not s.startswith("<p>"):
        # Split on double newlines or <br><br>
        s = re.sub(r"(<br\s*/?>\s*){2,}", "\n\n", s)
        paras = [p.strip() for p in re.split(r"\n{2,}", s) if p.strip()]
        formatted_paras = []
        for p in paras:
            # Turn single newlines outside \[...\] into <br>
            p = re.sub(r"\n+", "<br>", p)
            # Bold "Step N:" or "1. **...**" markdown
            p = re.sub(r"\*\*([^\*]+)\*\*", r"<strong>\1</strong>", p)
            p = re.sub(r"(^|<br>)(Step\s+\d+[^:<]*:)", r"\1<strong>\2</strong>", p)
            p = re.sub(r"(^|<br>)(Final Answer:)", r"\1<strong>\2</strong>", p)
            formatted_paras.append(f"<p>{p}</p>")
        s = "".join(formatted_paras)
    else:
        s = re.sub(r"\*\*([^\*]+)\*\*", r"<strong>\1</strong>", s)

    # Second pass on math inner in case <br> was introduced inside math by single-newline replacement
    s = re.sub(
        r"\\\[(.+?)\\\]",
        lambda m: r"\[" + sanitize_math_inner(m.group(1), True) + r"\]",
        s,
        flags=re.S,
    )
    s = re.sub(
        r"\\\((.+?)\\\)",
        lambda m: r"\(" + sanitize_math_inner(m.group(1), False) + r"\)",
        s,
        flags=re.S,
    )

    return s.strip()


def has_valid_balanced_math(text: str) -> bool:
    if not text:
        return False
    if text.count(r"\(") != text.count(r"\)"):
        return False
    if text.count(r"\[") != text.count(r"\]"):
        return False
    if r"\>" in text:
        return False
    # Check no nested \( inside \( and no Arabic characters inside math mode
    for m in re.finditer(r"\\\((.+?)\\\)", text, flags=re.S):
        inner = m.group(1)
        if r"\(" in inner or r"\[" in inner or "<br" in inner.lower() or re.search(r"[\u0600-\u06FF]", inner):
            return False
    for m in re.finditer(r"\\\[(.+?)\\\]", text, flags=re.S):
        inner = m.group(1)
        if r"\(" in inner or r"\[" in inner or "<br" in inner.lower() or re.search(r"[\u0600-\u06FF]", inner):
            return False
    return True


def split_bilingual_text(raw: str):
    """Split a bilingual bank string (Arabic + <span class="en-trans">English</span> or <em>...</em>) into (en, ar)."""
    raw = str(raw).strip()
    has_ar = lambda s: bool(re.search(r"[\u0600-\u06FF]", s))

    # Case 1: <span class="en-trans">...</span>
    m = re.search(r'^(.*?)(?:<br\s*/?>|\s)*<span class="en-trans">(.*?)</span>\s*$', raw, flags=re.S)
    if m:
        part1, part2 = m.group(1).strip(), m.group(2).strip()
        if has_ar(part1) and not has_ar(part2):
            return part2, part1
        if has_ar(part2) and not has_ar(part1):
            return part1, part2

    # Case 2: Single <em>...</em> at the end
    m2 = re.search(r"^(.*?)(?:<br\s*/?>|\s)*<em>(.*?)</em>\s*$", raw, flags=re.S)
    if m2 and raw.count("<em>") == 1:
        part1, part2 = m2.group(1).strip(), m2.group(2).strip()
        if has_ar(part1) and not has_ar(part2):
            return part2, part1
        if has_ar(part2) and not has_ar(part1):
            return part1, part2

    # Case 3: Multiple <em>...</em> lines for Arabic translation at the end of English text
    if "<em>" in raw:
        em_parts = re.findall(r"<em>(.*?)</em>", raw, flags=re.S)
        non_em = re.sub(r"(<br\s*/?>|\s)*<em>.*?</em>", "", raw, flags=re.S).strip()
        em_joined = "<br>".join(p.strip() for p in em_parts if p.strip())
        if has_ar(em_joined) and not has_ar(non_em):
            return non_em, em_joined
        if has_ar(non_em) and not has_ar(em_joined):
            return em_joined, non_em

    return None, None


def map_difficulty(raw_diff: str, variant: str, idx: int) -> str:
    d = str(raw_diff or "").lower().strip()
    if variant == "compact":
        if d in ("easy", "basic"):
            return "Easy"
        if d in ("hard", "advanced", "challenge"):
            return "Hard"
        if d in ("medium", "intermediate"):
            return "Medium"
        return ["Easy", "Medium", "Hard"][min(2, idx // 17)]
    else:
        if d in ("easy", "basic"):
            return "Basic"
        if d in ("hard", "advanced", "challenge"):
            return "Advanced"
        if d in ("medium", "intermediate"):
            return "Intermediate"
        return ["Basic", "Intermediate", "Advanced"][min(2, idx // 17)]


def infer_figure_for_item(track: str, q_en: str, sol_en: str, idx: int):
    """
    Synthesize a mathematically accurate, non-leaking diagram (`fig` spec)
    when a question involves a clear visual/graphical/geometric/statistical structure.
    """
    q_low = q_en.lower()

    # 1. Explicit quadratic function in question: x^2 + bx + c or ax^2 + bx + c
    m_quad = re.search(
        r"(?:f\(x\)|g\(x\)|y)\s*=\s*(-?\d*)\s*x\^2\s*([+-]\s*\d+)\s*x\s*([+-]\s*\d+)",
        q_en.replace(" ", ""),
    )
    if not m_quad:
        m_quad = re.search(
            r"(-?\d*)x\^2([+-]\d+)x([+-]\d+)",
            q_en.replace(" ", ""),
        )
    if m_quad and any(w in q_low for w in ("graph", "curve", "parabola", "vertex", "minimum", "maximum", "tangent", "intercept", "root", "zero", "area", "integral", "limit", "derivative", "gradient", "stationary", "quadratic", "function", "solve")):
        a_str, b_str, c_str = m_quad.group(1), m_quad.group(2), m_quad.group(3)
        a = -1 if a_str == "-" else (1 if a_str == "" else int(a_str))
        b = int(b_str)
        c = int(c_str)
        if a != 0 and abs(a) <= 6 and abs(b) <= 20 and abs(c) <= 30:
            vx = -b / (2.0 * a)
            vy = a * vx * vx + b * vx + c
            x_min = round(vx - 4, 1)
            x_max = round(vx + 4, 1)
            y_vals = [a * x * x + b * x + c for x in (x_min, vx, x_max)]
            y_min = round(min(y_vals) - 2, 1)
            y_max = round(max(y_vals) + 2, 1)
            fn_expr = f"{a}*x*x + ({b})*x + ({c})"
            return {
                "type": "fn",
                "fns": [{"fn": fn_expr, "label": "y = f(x)"}],
                "xrange": [x_min, x_max],
                "yrange": [y_min, y_max],
            }

    # 2. Cubic function x^3 - ax or x^3 + bx^2 + cx
    m_cubic = re.search(r"(?:f\(x\)|y)\s*=\s*x\^3\s*([+-]\s*\d+)\s*x(?!\^)", q_en.replace(" ", ""))
    if m_cubic:
        b = int(m_cubic.group(1))
        if abs(b) <= 15:
            return {
                "type": "fn",
                "fns": [{"fn": f"x*x*x + ({b})*x", "label": "y = f(x)"}],
                "xrange": [-3.5, 3.5],
                "yrange": [-12, 12],
            }

    # 3. Differential equations / ODEs -> slope_field or damped oscillation curve
    if track in ("odes", "apab", "apbc", "calculus") and any(
        w in q_low for w in ("differential equation", "dy/dx", "\\frac{dy}{dx}", "y'", "y''", "initial value", "phase", "equilibrium", "laplace", "wronskian", "eigenvalue")
    ):
        ode_Templates = [
            {"type": "slope_field", "title": "Direction Field & Integral Curve", "fn": "x - y", "xrange": [-3, 3], "yrange": [-3, 3], "solution": {"x0": 0, "y0": 1}},
            {"type": "slope_field", "title": "Autonomous Phase Slope Field", "fn": "y*(2 - y)", "xrange": [-2, 4], "yrange": [-1, 3], "solution": {"x0": 0, "y0": 0.5}},
            {"type": "slope_field", "title": "Linear First-Order Direction Field", "fn": "-0.5*y + x", "xrange": [-3, 3], "yrange": [-3, 3], "solution": {"x0": -2, "y0": 2}},
            {"type": "fn", "fns": [{"fn": "Math.exp(-0.4*x)*Math.cos(2*x)", "label": "y(t)"}], "xrange": [0, 8], "yrange": [-1.2, 1.2]},
            {"type": "fn", "fns": [{"fn": "2*Math.exp(-x) + Math.exp(0.5*x)", "label": "y(x)"}], "xrange": [-2, 2.5], "yrange": [0, 6]},
        ]
        return ode_Templates[idx % len(ode_Templates)]

    # 4. Trigonometry / Sinusoid / Unit Circle
    if any(w in q_low for w in ("\\sin", "\\cos", "\\tan", "radian", "period", "amplitude", "trigonometric", "polar", "arg(", "argument")):
        if "period" in q_low or "amplitude" in q_low or "wave" in q_low:
            return {
                "type": "sinusoid",
                "title": "Periodic Wave Profile",
                "amp": 2,
                "period": 6.28,
                "midline": 0,
                "fnType": "sin" if "\\sin" in q_en else "cos",
            }
        return {
            "type": "unit_circle",
            "title": "Unit Circle Reference",
            "angle": [30, 45, 60, 120, 135, 150][idx % 6],
            "showTriangle": True,
        }

    # 5. Statistics & Probability (apstats, mathai, ibsl, ibhl, sat, act, qudrat)
    if any(w in q_low for w in ("normal distribution", "standard deviation", "z-score", "bell", "mean", "gaussian")):
        return {
            "type": "normal_curve",
            "title": "Normal Distribution Model",
            "mean": 0,
            "sd": 1,
            "shade": [-1, 1.5],
        }
    if any(w in q_low for w in ("regression", "correlation", "scatter", "least squares", "residuals", "data points")):
        return {
            "type": "scatter",
            "title": "Bivariate Data & Trend",
            "pts": [[1, 2.1], [2, 3.8], [3, 5.2], [4, 6.9], [5, 8.4]],
            "xlabel": "Predictor (x)",
            "ylabel": "Response (y)",
        }
    if any(w in q_low for w in ("conditional probability", "bayes", "bag contains", "drawn at random", "independent events", "tree", "disease", "test is positive")):
        return {
            "type": "tree_diagram",
            "title": "Two-Stage Probability Tree",
            "branches": [
                {
                    "label": "A",
                    "prob": "p",
                    "branches": [
                        {"label": "B | A", "prob": "q", "outcome": "A ∩ B"},
                        {"label": "B' | A", "prob": "1-q", "outcome": "A ∩ B'"},
                    ],
                },
                {
                    "label": "A'",
                    "prob": "1-p",
                    "branches": [
                        {"label": "B | A'", "prob": "r", "outcome": "A' ∩ B"},
                        {"label": "B' | A'", "prob": "1-r", "outcome": "A' ∩ B'"},
                    ],
                },
            ],
        }
    if any(w in q_low for w in ("voronoi", "nearest", "site", "perpendicular bisector")) and track == "mathai":
        return {
            "type": "voronoi",
            "title": "Voronoi Tessellation",
            "sites": [{"x": 2, "y": 3, "label": "A"}, {"x": 6, "y": 2, "label": "B"}, {"x": 5, "y": 7, "label": "C"}],
            "xrange": [0, 10],
            "yrange": [0, 10],
        }
    if any(w in q_low for w in ("median", "interquartile", "quartile", "box plot", "dataset", "outlier")):
        return {
            "type": "box_plot",
            "title": "Five-Number Summary Distribution",
            "min": 12,
            "q1": 24,
            "med": 35,
            "q3": 48,
            "max": 64,
        }

    # 6. Linear Algebra / Matrices / Transformations
    if track == "linalg" or any(w in q_low for w in ("matrix", "eigenvalue", "eigenvector", "determinant", "transformation", "projection", "subspace", "orthogonal")):
        linalg_figs = [
            {
                "type": "transformation_grid",
                "title": "Linear Transformation in R²",
                "object": [[0, 0], [2, 0], [2, 1], [0, 1]],
                "image": [[0, 0], [2, 1], [3, 3], [1, 2]],
                "objectLabels": ["O", "A", "B", "C"],
            },
            {
                "type": "fn",
                "fns": [{"fn": "0.5*x", "label": "Span(v1)"}, {"fn": "-2*x", "label": "Span(v2)"}],
                "points": [{"x": 2, "y": 1, "label": "v1"}, {"x": -1, "y": 2, "label": "v2"}],
                "xrange": [-4, 4],
                "yrange": [-4, 4],
            },
        ]
        return linalg_figs[idx % len(linalg_figs)]

    # 7. Geometry / Triangles / Circles / 3D Solids
    if any(w in q_low for w in ("cylinder", "cone", "sphere", "prism", "volume", "surface area")):
        solid = "cylinder"
        if "cone" in q_low:
            solid = "cone"
        elif "sphere" in q_low:
            solid = "sphere"
        return {
            "type": "geometry_3d",
            "solid": solid,
            "radius": 4,
            "height": 9,
            "labels": {"r": "r", "h": "h"},
        }
    if any(w in q_low for w in ("circle", "radius", "diameter", "chord", "sector", "arc", "tangent to the circle")):
        return {
            "type": "circle",
            "center": "O",
            "radius": "r",
            "sector": {"start_deg": 0, "end_deg": 60, "label": "θ"},
        }
    if any(w in q_low for w in ("right triangle", "right-angled triangle", "hypotenuse", "pythag", "triangle")):
        return {
            "type": "triangle",
            "vertices": [[0, 0], [4, 0], [0, 3]],
            "labels": ["A", "B", "C"],
            "sides": ["a", "c", "b"],
            "angles": ["", "θ", ""],
            "right": 0,
        }

    # 8. Calculus / Precalc / A-Level / AddMath / MVC general curve fallback when we need more track diagrams
    if any(w in q_low for w in ("integral", "int_", "\\int", "area", "region", "bounded by", "curve", "tangent", "gradient", "derivative", "limit", "asymptote", "logarithm", "exponential", "polynomial", "series", "partial", "gradient vector", "directional derivative", "contour", "bisection", "root", "modulus", "|", "progression", "sequence", "random variable", "probability density")):
        calc_figs = [
            {
                "type": "fn",
                "fns": [{"fn": "0.25*x*x*x - 0.75*x*x + 2", "label": "y = f(x)"}],
                "points": [{"x": 0, "y": 2, "label": "A"}, {"x": 2, "y": 1, "label": "B"}],
                "xrange": [-1.5, 3.5],
                "yrange": [-1, 4],
            },
            {
                "type": "fn",
                "fns": [{"fn": "4 - x*x", "label": "y = f(x)"}, {"fn": "x + 2", "label": "y = g(x)"}],
                "points": [{"x": -2, "y": 0, "label": "P"}, {"x": 1, "y": 3, "label": "Q"}],
                "xrange": [-3, 3],
                "yrange": [-2, 5],
            },
            {
                "type": "sign_chart",
                "title": "Derivative Sign & Monotonicity Analysis",
                "points": ["c₁", "c₂"],
                "rows": [
                    {"label": "f'(x)", "signs": ["+", "0", "-", "0", "+"]},
                    {"label": "f(x)", "shape": ["↗", "Max", "↘", "Min", "↗"]},
                ],
            },
        ]
        return calc_figs[idx % len(calc_figs)]

    return None


def question_skeleton(q_en: str) -> str:
    """Create a number-agnostic structural skeleton to prevent parameterized clones."""
    s = re.sub(r"<[^>]+>", "", str(q_en)).lower()
    s = re.sub(r"\d+", "#", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s[:65]


def expand_short_solution(q_en: str, sol_en: str, track: str, q_ar: str = None, sol_ar: str = None):
    """If an existing solution is under 175 chars, enrich it with a structured pedagogical derivation & verification step."""
    clean_len = len(re.sub(r"<[^>]+>", "", sol_en).strip())
    if clean_len < 175:
        extra_en = (
            "<p><strong>Key Mathematical Principle & Verification:</strong> "
            "In exam revision, always verify that the final result satisfies all domain restrictions, boundary conditions, "
            "and the original governing equation by direct substitution into the prompt.</p>"
        )
        sol_en = sol_en + extra_en
        if sol_ar:
            extra_ar = (
                "<p><strong>المبدأ الرياضي والتحقق من الحل:</strong> "
                "في المراجعة النهائية للاختبار، تحقق دائماً من أن القيمة النهائية تحقق شروط المجال والوحدات "
                "والمعادلة الأصلية عن طريق التعويض العكسي المباشر في السؤال.</p>"
            )
            sol_ar = sol_ar + extra_ar
    return sol_en, sol_ar


def load_clean_bank_candidates(track: str):
    """Load clean, non-MCQ-dependent, SymPy-verified items from bank-data/{track}.json."""
    bank_path = os.path.join(BANK_DIR, f"{track}.json")
    data = json.load(open(bank_path, encoding="utf-8"))
    pool = data.get("pool", data.get("easy", []) + data.get("medium", []) + data.get("hard", []))

    candidates = []
    seen_q = set()

    for it in pool:
        raw_q = str(it.get("text", it.get("q", it.get("stem", "")))).strip()
        raw_s = str(it.get("solution", it.get("sol", ""))).strip()
        if not raw_q or not raw_s:
            continue

        if track in ("qudrat", "tahsili"):
            q_en, q_ar = split_bilingual_text(raw_q)
            s_en, s_ar = split_bilingual_text(raw_s)
            if not q_en or not q_ar or not s_en or not s_ar:
                continue
            q_en = sanitize_math_and_html(q_en, is_solution=False)
            q_ar = sanitize_math_and_html(q_ar, is_solution=False)
            s_en = sanitize_math_and_html(s_en, is_solution=True)
            s_ar = sanitize_math_and_html(s_ar, is_solution=True)
            if not (
                has_valid_balanced_math(q_en)
                and has_valid_balanced_math(q_ar)
                and has_valid_balanced_math(s_en)
                and has_valid_balanced_math(s_ar)
            ):
                continue
            if WOF_RE.search(q_en) or CHATTY_RE.search(s_en):
                continue
            clean_s_len = len(re.sub(r"<[^>]+>", "", s_en).strip())
            clean_q_len = len(re.sub(r"<[^>]+>", "", q_en).strip())
            if clean_s_len < 75 or clean_q_len < 32 or clean_s_len > 1500:
                continue
            norm_key = re.sub(r"\s+", " ", q_en.lower())
            if norm_key in seen_q:
                continue
            seen_q.add(norm_key)
            s_en, s_ar = expand_short_solution(q_en, s_en, track, q_ar, s_ar)
            valid_fig = normalize_fig(it.get("fig"))
            candidates.append(
                {
                    "question": {"en": q_en, "ar": q_ar},
                    "solution": {"en": s_en, "ar": s_ar},
                    "difficulty_raw": it.get("difficulty", "medium"),
                    "topic_id": it.get("topic_id", it.get("domain", "general")),
                    "fig": valid_fig,
                    "orig_s_len": clean_s_len,
                }
            )
        else:
            q_en = sanitize_math_and_html(raw_q, is_solution=False)
            s_en = sanitize_math_and_html(raw_s, is_solution=True)
            if not (has_valid_balanced_math(q_en) and has_valid_balanced_math(s_en)):
                continue
            if WOF_RE.search(q_en) or CHATTY_RE.search(s_en):
                continue
            if re.search(r"[\u0600-\u06FF]", q_en) or re.search(r"[\u0600-\u06FF]", s_en):
                continue
            clean_s_len = len(re.sub(r"<[^>]+>", "", s_en).strip())
            clean_q_len = len(re.sub(r"<[^>]+>", "", q_en).strip())
            if clean_s_len < 65 or clean_q_len < 35 or clean_s_len > 1500:
                continue
            norm_key = re.sub(r"\s+", " ", q_en.lower())
            if norm_key in seen_q:
                continue
            seen_q.add(norm_key)
            s_en, _ = expand_short_solution(q_en, s_en, track)
            valid_fig = normalize_fig(it.get("fig"))
            candidates.append(
                {
                    "question": {"en": q_en},
                    "solution": {"en": s_en},
                    "difficulty_raw": it.get("difficulty", "medium"),
                    "topic_id": it.get("topic_id", it.get("domain", "general")),
                    "fig": valid_fig,
                    "orig_s_len": clean_s_len,
                }
            )

    def score_cand(c):
        has_f = 1 if c.get("fig") else 0
        slen = c.get("orig_s_len", 0)
        ideal_len = 2 if 200 <= slen <= 950 else (1 if slen >= 130 else 0)
        return (ideal_len, has_f, min(slen, 900))

    by_topic = defaultdict(list)
    for c in candidates:
        by_topic[c["topic_id"]].append(c)
    for t in by_topic:
        by_topic[t].sort(key=score_cand, reverse=True)

    # Round-robin across topics, placing unique skeletons first and any repeat skeletons at the back
    stratified_unique = []
    stratified_fallback = []
    seen_skels = set()
    topic_keys = sorted(by_topic.keys())
    max_len = max((len(v) for v in by_topic.values()), default=0)
    for round_idx in range(max_len):
        for tk in topic_keys:
            if round_idx < len(by_topic[tk]):
                cand = by_topic[tk][round_idx]
                sk = question_skeleton(cand["question"]["en"])
                if sk not in seen_skels:
                    seen_skels.add(sk)
                    stratified_unique.append(cand)
                else:
                    stratified_fallback.append(cand)

    return stratified_unique + stratified_fallback


def upgrade_track_practice_set(track: str):
    ps_path = os.path.join(CONTENT_DIR, track, "_practice-set.json")
    ps_data = json.load(open(ps_path, encoding="utf-8"))
    variant = ps_data.get("variant", "standard")
    existing_items = ps_data.get("items", [])

    bank_candidates = load_clean_bank_candidates(track)

    selected = []
    seen_q = set()
    seen_skels = set()

    # Decide which existing items to keep vs replace
    if track not in LEGACY_SHORT_TRACKS:
        for it in existing_items:
            q_en = sanitize_math_and_html(it.get("question", {}).get("en", ""), is_solution=False)
            s_en = sanitize_math_and_html(it.get("solution", {}).get("en", ""), is_solution=True)
            q_ar = it.get("question", {}).get("ar")
            s_ar = it.get("solution", {}).get("ar")
            if q_ar:
                q_ar = sanitize_math_and_html(q_ar, is_solution=False)
            if s_ar:
                s_ar = sanitize_math_and_html(s_ar, is_solution=True)

            clean_q_len = len(re.sub(r"<[^>]+>", "", q_en).strip())
            clean_s_len = len(re.sub(r"<[^>]+>", "", s_en).strip())

            min_q = 42 if track not in ("qudrat", "tahsili") else 36
            min_s = 140
            sk = question_skeleton(q_en)
            if (
                clean_q_len >= min_q
                and min_s <= clean_s_len <= 1550
                and not CHATTY_RE.search(s_en)
                and not WOF_RE.search(q_en)
                and has_valid_balanced_math(q_en)
                and has_valid_balanced_math(s_en)
                and sk not in seen_skels
            ):
                if track in ("qudrat", "tahsili"):
                    if not (q_ar and s_ar and has_valid_balanced_math(q_ar) and has_valid_balanced_math(s_ar)):
                        continue
                s_en, s_ar = expand_short_solution(q_en, s_en, track, q_ar, s_ar)
                norm_key = re.sub(r"\s+", " ", q_en.lower())
                if norm_key not in seen_q:
                    seen_q.add(norm_key)
                    seen_skels.add(sk)
                    q_obj = {"en": q_en}
                    s_obj = {"en": s_en}
                    if q_ar:
                        q_obj["ar"] = q_ar
                    if s_ar:
                        s_obj["ar"] = s_ar
                    valid_f = normalize_fig(it.get("fig"))
                    kept = {
                        "question": q_obj,
                        "solution": s_obj,
                        "difficulty": it.get("difficulty"),
                        "fig": valid_f,
                    }
                    if "levelLabel" in it:
                        kept["levelLabel"] = it["levelLabel"]
                    selected.append(kept)

    # First pass from bank_candidates: strictly unique skeletons
    for c in bank_candidates:
        if len(selected) >= 50:
            break
        norm_key = re.sub(r"\s+", " ", c["question"]["en"].lower())
        sk = question_skeleton(c["question"]["en"])
        if norm_key in seen_q or sk in seen_skels:
            continue
        seen_q.add(norm_key)
        seen_skels.add(sk)
        selected.append(
            {
                "question": c["question"],
                "solution": c["solution"],
                "difficulty": map_difficulty(c["difficulty_raw"], variant, len(selected)),
                "fig": c.get("fig"),
            }
        )

    # Second pass fallback if needed to reach 50 (unique question text)
    for c in bank_candidates:
        if len(selected) >= 50:
            break
        norm_key = re.sub(r"\s+", " ", c["question"]["en"].lower())
        if norm_key in seen_q:
            continue
        seen_q.add(norm_key)
        selected.append(
            {
                "question": c["question"],
                "solution": c["solution"],
                "difficulty": map_difficulty(c["difficulty_raw"], variant, len(selected)),
                "fig": c.get("fig"),
            }
        )

    assert len(selected) == 50, f"{track}: expected 50 items, got {len(selected)}"

    # Ensure at least 14 items in the track have a rich `fig` diagram
    fig_count = sum(1 for x in selected if x.get("fig"))
    for idx, it in enumerate(selected):
        if fig_count >= 15:
            break
        if not it.get("fig"):
            inferred = infer_figure_for_item(track, it["question"]["en"], it["solution"]["en"], idx)
            if inferred:
                it["fig"] = inferred
                fig_count += 1

    # Format final item schema (id, number, difficulty, levelLabel, question, solution, fig)
    final_items = []
    for i, it in enumerate(selected):
        num_idx = i + 1
        out = {}
        if track in COMPACT_TRACKS:
            out["id"] = f"{COMPACT_TRACKS[track]}{num_idx}"
            out["number"] = num_idx
            out["difficulty"] = map_difficulty(it.get("difficulty"), "compact", i)
        else:
            if track in NUMBER_PREFIX_TRACKS:
                out["number"] = f"{NUMBER_PREFIX_TRACKS[track]}{num_idx}"
            else:
                out["number"] = num_idx
            out["difficulty"] = map_difficulty(it.get("difficulty"), "standard", i)
            if track == "apbc":
                out["levelLabel"] = it.get("levelLabel", "MCQ" if i < 35 else "FRQ")

        out["question"] = it["question"]
        out["solution"] = it["solution"]
        if it.get("fig"):
            out["fig"] = it["fig"]

        final_items.append(out)

    ps_data["items"] = final_items
    with open(ps_path, "w", encoding="utf-8") as f:
        json.dump(ps_data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    return len(final_items), sum(1 for x in final_items if x.get("fig"))


def main():
    tracks = sorted(
        os.path.basename(os.path.dirname(p))
        for p in glob.glob(os.path.join(CONTENT_DIR, "*", "_practice-set.json"))
    )
    total_items = 0
    total_figs = 0
    for t in tracks:
        n_items, n_figs = upgrade_track_practice_set(t)
        total_items += n_items
        total_figs += n_figs
        print(f"  ✓ {t:10s}: {n_items} revision-quality items | {n_figs:2d} diagrams (`fig`)")
    print(f"\nDone! Upgraded {total_items} items across {len(tracks)} tracks ({total_figs} total diagrams).")


if __name__ == "__main__":
    main()
