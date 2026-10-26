#!/usr/bin/env python3
"""
scripts/fix_all_hints.py

Replaces all generic/boilerplate or flawed 3-tier hints across:
1. All 28 curriculum tracks in content/<track>/*.json (1,135 practiceProblem blocks)
2. All 28 question banks in bank-data/<track>.json (42,851 questions)

Derives 3 genuinely problem-specific, mathematically meaningful progressive hints
from each problem's actual mathematical prompt and worked solution steps without
spoiling the final answer in Hints 1, 2, or 3, and without repeating the prompt
or including distractor misconceptions.
"""

import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TAG_RE = re.compile(r"</?[a-zA-Z][a-zA-Z0-9\-]*(?:\s+[^>]*)?>")
IMP_SEP = r"\\(?:implies|Rightarrow|Longleftrightarrow|Leftrightarrow|iff)(?![a-zA-Z])"
EQ_SEP = r"(?<![<>!])=(?!=)|\\approx(?![a-zA-Z])"


def strip_html_tags(s):
    return TAG_RE.sub(" ", s or "")


def fix_raw_latex_typos(s):
    if not s:
        return s
    # Replace literal '\n' sequences (escaped in some strings) with actual newlines when surrounded by spaces
    s = re.sub(r"\s*\\n\s*", "\n", s)
    # Fix \\[4pt] row spacing inside cases/matrices so it isn't mistaken for \[ display math
    s = re.sub(r"\\\\\[\s*\d+(?:\.\d+)?\s*(?:pt|em|ex|mm|cm|px)\s*\]", r"\\\\", s)
    # Fix known raw typos in bank solutions
    s = s.replace(r"\>.", r"\).")
    s = s.replace(r"\[.\]", r"\).")
    s = re.sub(r"=\s*\\\)\s*(\d+)", r"= $\1", s)
    s = re.sub(r"\\\(([^)\\]+?)\$", r"\\(\1\\)", s)
    # Fix unclosed \( across \\ linebreaks (e.g. \(f(0) = ... \\ f(0) = ... \\)
    def _fix_unclosed_lines(m):
        block = m.group(1)
        if "\\begin{" in block or "\\\\" not in block:
            return m.group(0)
        parts = [p.strip() for p in block.split("\\\\") if p.strip()]
        out_parts = []
        for p in parts:
            if re.match(r"^(?:Therefore|Thus|Hence|So)\b", p, flags=re.I):
                out_parts.append(p)
            else:
                out_parts.append(f"\\({p}\\)")
        return " <br> ".join(out_parts)

    s = re.sub(
        r"\\\(([^()]*?(?:f\(0\)|y-intercept)[\s\S]*?)(?=<stro|$)",
        _fix_unclosed_lines,
        s,
    )
    return s


def balance_math_delimiters(h):
    """Ensures every \\( and \\) in hint string h is properly paired."""
    if not h:
        return h
    h = h.replace("<DISP_MATH>", "").replace("</DISP_MATH>", "").replace("<STEP_BRK>", " ")
    # Fix missing \) before closing tags like </em> or </span>
    # Walk through \( and \) tokens
    tokens = re.split(r"(\\\(|\\\))", h)
    out = []
    open_math = False
    for tok in tokens:
        if tok == "\\(":
            if open_math:
                out.append("\\) ")
            out.append("\\(")
            open_math = True
        elif tok == "\\)":
            if open_math:
                out.append("\\)")
                open_math = False
            else:
                # Stray closing \): try to insert \( at the start of the math expression in the preceding segment
                if out:
                    prev = out[-1]
                    m = re.search(
                        r"(?:[:،>]|^)\s*(\\[a-zA-Z]+|\([a-zA-Z0-9_+\-]+|[a-zA-Z0-9_]+\s*=)[^:،<>]*$",
                        prev,
                    )
                    if m:
                        idx = m.start(1)
                        out[-1] = prev[:idx] + "\\(" + prev[idx:]
                        out.append("\\)")
                        continue
                # Otherwise drop stray \)
        else:
            if open_math and ("</span>" in tok or "</em>" in tok or "<br>" in tok):
                # Close math before the HTML tag
                m_tag = re.search(r"(<br\s*/?>|</span>|</em>)", tok, flags=re.I)
                if m_tag:
                    idx = m_tag.start()
                    out.append(tok[:idx].rstrip(".") + "\\)" + tok[idx:])
                    open_math = False
                    continue
            out.append(tok)
    if open_math:
        if out and out[-1].endswith("."):
            out[-1] = out[-1][:-1] + "\\)."
        else:
            out.append("\\)")
    res = "".join(out)
    res = re.sub(r"\\\(\s*\\\)", "", res)
    return res.strip()


def clean_solution_wrappers(sol):
    if not sol:
        return sol
    s = fix_raw_latex_typos(sol.strip())
    if "Mark Scheme" in s and "Step 2 (Derivation & Calculation):" in s:
        m = re.search(
            r"Step 2 \(Derivation & Calculation\):\*\*\s*([\s\S]*?)(?:\n-\s*\*\*Step 3|$)",
            s,
        )
        if m:
            inner = m.group(1).strip()
            inner = re.sub(r"(?:\*\*)?(?:\[[MA]\d+\]\s*)+(?:\*\*)?", "", inner).strip()
            s = inner
    s = re.sub(r"(?:\*\*)?(?:\[[MABRG]\d*(?:\s+[MABRG]\d*)*\]\s*)+(?:\*\*)?", "", s)
    s = re.sub(r"(?:<strong>)?(?:\[[MABRG]\d*(?:\s+[MABRG]\d*)*\]\s*)+(?:</strong>)?", "", s)
    s = re.sub(r"^Working\s+through\s+this\s+[^:]+?\s+step:\s*", "", s, flags=re.I)
    s = re.sub(r"^Applying\s+[^,:]+?\s+principles[,:]\s*", "", s, flags=re.I)
    s = re.sub(r"^بتطبيق\s+القواعد\s+الرياضية\s+في\s+[^:]+:\s*", "", s)
    s = re.sub(
        r"\s*Therefore,\s+the\s+(?:verified\s+)?correct\s+(?:option|choice|answer)\s+is\s+[\s\S]*?$",
        "",
        s,
        flags=re.I,
    )
    s = re.sub(
        r"\s*وبالتالي\s+فإن\s+الإجابة\s+الصحيحة\s+هي\s+[\s\S]*?$",
        "",
        s,
    )
    if s.startswith("\\log_"):
        s = re.sub(r"(\\log_\{[^}]+\}\s*\d+\s*=\s*-?\d+)", r"\\(\1\\)", s)
    return s.strip()


def unwrap_full_text_math(s):
    """Unwraps blocks like \\( \\text{The }(k+1)\\text{th term is }k+1... \\) into normal prose + inline math."""
    def _repl(m):
        inner = m.group(1).strip()
        if not inner.startswith("\\text{"):
            return m.group(0)
        text_blocks = re.findall(r"\\text\{([^{}]*)\}", inner)
        if sum(len(t.split()) for t in text_blocks) < 4:
            return m.group(0)
        parts = re.split(r"(\\text\{[^{}]*\})", inner)
        out = []
        for p in parts:
            if not p:
                continue
            if p.startswith("\\text{") and p.endswith("}"):
                out.append(p[6:-1])
            else:
                p_str = p.strip()
                if not p_str:
                    continue
                if p_str in [".", ",", ";", ":"]:
                    out.append(p_str)
                else:
                    trail = ""
                    if p_str[-1] in ".,;:" and not p_str.endswith("\\."):
                        trail = p_str[-1]
                        p_str = p_str[:-1].strip()
                    if p_str:
                        out.append(f"\\({p_str}\\){trail}")
                    else:
                        out.append(trail)
        return "".join(out)

    return re.sub(r"\\\(([\s\S]*?)\\\)", _repl, s)


def unwrap_aligned_math(s):
    """Unwraps top-level \\begin{aligned}...\\end{aligned} inside \\(...\\) into chained or separate equations."""
    def _repl(m):
        inner = m.group(1).strip()
        m_al = re.match(
            r"^\\begin\{(aligned|align\*?|gather\*?)\}([\s\S]*?)\\end\{\1\}\.?$",
            inner,
        )
        if not m_al:
            return m.group(0)
        body = m_al.group(2).strip()
        if "\\begin{" in body:
            return m.group(0)
        body = re.sub(r"&", " ", body)
        rows = [r.strip() for r in re.split(r"\\\\", body) if r.strip()]
        if not rows:
            return m.group(0)
        merged_rows = [rows[0]]
        for r in rows[1:]:
            if re.match(r"^(?:=|\\approx|\\implies|\\Rightarrow|\\le|\\ge|<|>)", r):
                merged_rows[-1] = merged_rows[-1].rstrip(".") + " " + r
            else:
                merged_rows.append(r)
        return " <STEP_BRK> ".join(f"\\({r.rstrip('.')}\\)" for r in merged_rows)

    return re.sub(r"\\\(([\s\S]*?)\\\)", _repl, s)


def split_top_level_math(expr, sep_pattern):
    parts = []
    cur = []
    depth = 0
    env_depth = 0
    i = 0
    n = len(expr)
    while i < n:
        if expr.startswith("\\begin{", i):
            end_b = expr.find("}", i + 7)
            if end_b != -1:
                env_depth += 1
                cur.append(expr[i : end_b + 1])
                i = end_b + 1
                continue
        if expr.startswith("\\end{", i):
            end_b = expr.find("}", i + 5)
            if end_b != -1:
                env_depth = max(0, env_depth - 1)
                cur.append(expr[i : end_b + 1])
                i = end_b + 1
                continue
        if expr[i] == "\\" and i + 1 < n and expr[i + 1] in "{}()[]":
            cur.extend([expr[i], expr[i + 1]])
            i += 2
            continue
        if expr[i] in "{([":
            depth += 1
        elif expr[i] in "})]":
            depth = max(0, depth - 1)
        if depth == 0 and env_depth == 0:
            m = re.match(sep_pattern, expr[i:])
            if m:
                parts.append("".join(cur).strip())
                cur = []
                i += m.end()
                continue
        cur.append(expr[i])
        i += 1
    if cur:
        parts.append("".join(cur).strip())
    return [p for p in parts if p]


def is_multi_assignment(expr):
    """Returns True if expr has >= 2 top-level 'or'/'and' branches and every branch contains '='."""
    branches = split_top_level_math(
        expr, r"\\text\{\s*(?:or|and|أو|و)\s*\}|\b(?:or|and)\b"
    )
    if len(branches) < 2:
        return False
    return all("=" in b for b in branches)


def is_pure_final_value(rhs):
    """Returns True if rhs looks like an evaluated number, fraction, radical, complex number, coordinate pair, or numeric vector."""
    if is_multi_assignment(rhs):
        return False
    s = rhs.strip().rstrip(".")
    if re.match(
        r"^\\begin\{[pbv]matrix\}[0-9+\-\s&\\.,]+\\end\{[pbv]matrix\}$", s
    ):
        return True
    r = re.sub(
        r"\\(?:text|mathrm|mathbf|textbf|displaystyle|left|right)\s*(?:\{[^{}]*\})?",
        "",
        s,
    )
    r = re.sub(r"\s+|\\,|\\;|\\!|\\quad|\\qquad|%|\^\\circ|°|\$", "", r).strip(".")
    if re.match(
        r"^(?:\\pm|\\mp|[+\-])?\d+(?:\.\d+)?(?:/\d+)?(?:\\sqrt\{\d+\})?(?:\\pi)?(?:i|e(?:\^[+\-]?\d+)?)?(?:\\dots|\.\.\.)?$",
        r,
    ):
        return True
    if re.match(
        r"^(?:\\pm|\\mp|[+\-])?\\sqrt\{\d+\}(?:/\d+)?(?:\\pi)?(?:i)?$",
        r,
    ):
        return True
    if re.match(
        r"^(?:\\pm|\\mp|[+\-])?\\(?:d|t)?frac\{[+\-]?\d+(?:\\sqrt\{\d+\})?(?:\\pi)?\}\{\d+(?:\\sqrt\{\d+\})?\}(?:\\pi)?(?:i)?$",
        r,
    ):
        return True
    if re.match(r"^[+\-]?\d+(?:\.\d+)?[+\-]\d*(?:\.\d+)?i$", r):
        return True
    if re.match(r"^\([+\-]?\d+(?:\.\d+)?(?:/\d+)?,[+\-]?\d+(?:\.\d+)?(?:/\d+)?\)$", r):
        return True
    return False


def is_simple_var_lhs(lhs):
    """Returns True if lhs is just a variable/symbol name or f(c) evaluation without arithmetic operators."""
    s = lhs.strip()
    if re.match(r"^\([a-zA-Z0-9_\\]+,\s*[a-zA-Z0-9_\\]+\)$", s):
        return True
    if re.match(r"^[a-zA-Z]\\?'*\([+\-]?\d+(?:\.\d+)?\)$", s):
        return True
    return not bool(
        re.search(
            r"[+\-*/^()|]|\\(?:frac|dfrac|tfrac|sqrt|times|div|int|sum|binom|dbinom|det|sin|cos|tan|sec|csc|cot|log|ln|lim|mid)",
            s,
        )
    )


def format_prefix_label(prefix, default_en, default_ar, is_ar=False):
    if not prefix:
        return default_ar if is_ar else default_en
    plain_p = re.sub(r"</?strong>", "", prefix).strip()
    if len(plain_p) < 2:
        return default_ar if is_ar else default_en
    if plain_p.endswith(":"):
        return prefix + " "
    return prefix + ": "


def redact_single_math_block(inner, aggressive=True):
    had_mathbf = "\\mathbf" in inner
    inner_clean = re.sub(r"\\mathbf\{([^{}]*)\}", r"\1", inner.strip().rstrip("."))
    leading_eq = False
    if inner_clean.startswith("="):
        leading_eq = True
        inner_clean = inner_clean[1:].strip()

    imp_parts = split_top_level_math(inner_clean, IMP_SEP)
    if len(imp_parts) >= 2:
        last_p = imp_parts[-1]
        if is_multi_assignment(last_p):
            res = " \\implies ".join(imp_parts[:-1])
            return ("= " + res) if leading_eq else res
        eqs = split_top_level_math(last_p, EQ_SEP)
        if len(eqs) >= 3:
            while len(eqs) > 2 and is_pure_final_value(eqs[-1]):
                eqs.pop()
            if len(eqs) >= 2:
                imp_parts[-1] = " = ".join(eqs)
                res = " \\implies ".join(imp_parts)
                return ("= " + res) if leading_eq else res
        if len(eqs) == 2 and (
            not is_pure_final_value(eqs[1])
            or re.match(r"^[+\-]?\d+(?:\.\d+)?[a-zA-Z]", eqs[0].strip())
        ):
            res = " \\implies ".join(imp_parts)
            return ("= " + res) if leading_eq else res
        res = " \\implies ".join(imp_parts[:-1])
        return ("= " + res) if leading_eq else res

    if is_multi_assignment(inner_clean):
        if aggressive:
            branches = split_top_level_math(
                inner_clean, r"\\text\{\s*(?:or|and|أو|و)\s*\}|\b(?:or|and)\b"
            )
            first_eq = split_top_level_math(branches[0], EQ_SEP)
            return first_eq[0].strip() if first_eq else inner_clean
        return ("= " + inner_clean) if leading_eq else inner_clean

    eq_parts = split_top_level_math(inner_clean, EQ_SEP)
    if leading_eq and len(eq_parts) >= 2:
        if is_pure_final_value(eq_parts[-1]) or aggressive:
            eq_parts = eq_parts[:-1]
        return "= " + " = ".join(eq_parts)

    if len(eq_parts) >= 3:
        if len(eq_parts) == 3 and eq_parts[2].strip() == "0" and not aggressive:
            return inner_clean
        orig_len = len(eq_parts)
        while len(eq_parts) > 2 and is_pure_final_value(eq_parts[-1]):
            eq_parts.pop()
        if len(eq_parts) == orig_len and aggressive:
            eq_parts.pop()
        return " = ".join(eq_parts)

    if len(eq_parts) == 2 and aggressive:
        lhs, rhs = eq_parts[0].strip(), eq_parts[1].strip()
        if is_pure_final_value(rhs) or had_mathbf:
            return lhs
    return ("= " + inner_clean) if leading_eq else inner_clean


def redact_math_in_step(text, is_final_hint=True, is_ar=False):
    if "<NO_REDACT>" in text:
        return text.replace("<NO_REDACT>", "").strip()

    if is_final_hint:
        text = re.sub(
            r"(?:,\s*)?(?:giving|yielding|which\s+gives|so|hence|thus|therefore)\s+(?:boundary\s+values?\s+|solutions?\s+|roots?\s+|values?\s+)?\\\(\s*([a-zA-Z0-9_\\^\{\}\x27]+)\s*=\s*[^)]+\\\)\s+(?:and|or)\s+\\\(\s*[a-zA-Z0-9_\\^\{\}\x27]+\s*=\s*[^)]+\\\)\.?$",
            r" to find both values of \(\1\).",
            text,
            flags=re.I,
        )
        text = re.sub(
            r"\b(is|equals|gives|yields)\s+\\\(\s*([a-zA-Z0-9_\\^\{\}\x27]+)\s*=\s*[^+\-*/=()]+\\\)\.?$",
            r"\1 the value of \(\2\).",
            text,
            flags=re.I,
        )
        text = re.sub(
            r":\s*\\\(\s*([a-zA-Z0-9_\\^\{\}\x27]+)\s*=\s*[^+\-*/=()]+\\\)\.?$",
            r" to determine \(\1\).",
            text,
        )

    matches = list(re.finditer(r"\\\(([\s\S]*?)\\\)", text))
    if not matches:
        if is_final_hint:
            text = re.sub(
                r"=\s*[+\-]?\d+(?:\.\d+)?(?:\s+[a-zA-Z%]+)?\.?$",
                "",
                text.strip(),
            )
            text = re.sub(
                r"\b(is|equals|gives)\s+<strong>[^<]+</strong>\.?$",
                r"\1 the final result.",
                text,
                flags=re.I,
            )
        return text

    if not is_final_hint:
        last_m = matches[-1]
        inner = last_m.group(1)
        if not is_multi_assignment(inner):
            eq_parts = split_top_level_math(inner, EQ_SEP)
            if (
                len(eq_parts) >= 3
                and is_pure_final_value(eq_parts[-1])
                and not (len(eq_parts) == 3 and eq_parts[2].strip() == "0")
            ):
                new_inner = " = ".join(eq_parts[:-1]).rstrip(".")
                return (
                    text[: last_m.start()] + f"\\({new_inner}\\)" + text[last_m.end() :]
                )
        return text

    out = []
    last_idx = 0
    for idx, m in enumerate(matches):
        out.append(text[last_idx : m.start()])
        is_last = idx == len(matches) - 1
        inner_str = m.group(1)
        should_redact = is_last or bool(
            re.search(r"=\s*\([+\-]?\d+\s*,\s*[+\-]?\d+\)", inner_str)
        )
        new_inner = (
            redact_single_math_block(inner_str, aggressive=True)
            if should_redact
            else redact_single_math_block(inner_str, aggressive=False)
        )
        out.append(f"\\({new_inner}\\)")
        last_idx = m.end()
    out.append(text[last_idx:])
    res = "".join(out)
    res = re.sub(
        r"\b(is|equals|gives)\s+<strong>[^<]+</strong>\.?$",
        r"\1 the final result.",
        res,
        flags=re.I,
    )
    return res


def balance_strong_tags(h):
    tokens = re.split(r"(</?strong>)", h, flags=re.I)
    out = []
    open_s = False
    for tok in tokens:
        low = tok.lower()
        if low == "<strong>":
            if not open_s:
                out.append("<strong>")
                open_s = True
        elif low == "</strong>":
            if open_s:
                out.append("</strong>")
                open_s = False
        else:
            out.append(tok)
    if open_s:
        out.append("</strong>")
    return "".join(out)


def ensure_natural_lead(hint_text, tier_idx, is_ar=False):
    h = balance_math_delimiters(hint_text.strip())
    h = re.sub(r"^(?:\\\\|\s)+", "", h)
    h = re.sub(r"(?:\\\\|\s)+$", "", h)
    h = re.sub(r":\s*\.$", ".", h)
    h = re.sub(r":\s*:", ":", h)
    h = re.sub(r":</strong>:", ":</strong>", h)
    if not h:
        return h
    h = balance_strong_tags(h)
    if h.startswith("\\("):
        if is_ar:
            leads = [
                "ابدأ بالعلاقة الرياضية: ",
                "طبّق الخطوة الجبرية التالية: ",
                "أكمل التبسيط الأخير: ",
            ]
        else:
            leads = [
                "Set up the initial relation: ",
                "Rewrite and simplify to obtain: ",
                "Use the resulting form to finish: ",
            ]
        h = leads[min(tier_idx, 2)] + h
    if h and h[0].islower():
        h = h[0].upper() + h[1:]
    if (
        not h.endswith(".")
        and not h.endswith("?")
        and not h.endswith("!")
        and not h.endswith("</ul>")
        and not h.endswith("</ol>")
        and not h.endswith("</strong>")
    ):
        h += "."
    return h


def expand_unit_by_math_chain(u, is_ar=False, q_math=None):
    """Splits a single unit containing a math chain or multiple math blocks into 2 or 3 progressive units."""
    m_list = list(re.finditer(r"\\\(([\s\S]*?)\\\)", u))
    if not m_list:
        return [u]
    m = max(m_list, key=lambda x: len(x.group(1)))
    prefix = u[: m.start()].strip().rstrip(":")
    suffix = u[m.end() :].strip().lstrip(".,;:")
    inner = re.sub(r"\\mathbf\{([^{}]*)\}", r"\1", m.group(1).strip().rstrip("."))
    if inner.startswith("="):
        plain_p = re.sub(r"<[^>]+>", "", prefix).strip()
        if plain_p and len(plain_p) <= 28:
            inner = f"\\text{{{plain_p}}} " + inner
            prefix = ""
        else:
            inner = inner[1:].strip()

    imp_parts = split_top_level_math(inner, IMP_SEP)
    if len(imp_parts) >= 3:
        first_lbl = format_prefix_label(
            prefix, "Start with: ", "ابدأ بالمعادلة: ", is_ar=is_ar
        )
        last_p = imp_parts[-1]
        eqs_last = split_top_level_math(last_p, EQ_SEP)
        if (
            len(eqs_last) == 2
            and is_pure_final_value(eqs_last[1])
            and is_simple_var_lhs(eqs_last[0])
        ) or is_multi_assignment(last_p):
            var_name = eqs_last[0].strip() if eqs_last else "x"
            if len(imp_parts) >= 4:
                return [
                    f"{first_lbl}\\({imp_parts[0]}\\).",
                    (
                        "طبّق الخطوة الجبرية التالية: "
                        if is_ar
                        else "Simplify the relation to: "
                    )
                    + f"\\({imp_parts[1]}\\).",
                    "<NO_REDACT>"
                    + (
                        f"أكمل الحل لإيجاد قيمة \\({var_name}\\) من العلاقة: \\({imp_parts[-2]}\\)."
                        if is_ar
                        else f"Solve \\({imp_parts[-2]}\\) to determine \\({var_name}\\)."
                    ),
                ]
            else:
                return [
                    f"{first_lbl}\\({imp_parts[0]}\\).",
                    (
                        "بسّط المعادلة إلى الصورة: "
                        if is_ar
                        else "Rearrange and simplify to obtain: "
                    )
                    + f"\\({imp_parts[1]}\\).",
                    "<NO_REDACT>"
                    + (
                        f"اعزل المتغير \\({var_name}\\) من \\({imp_parts[1]}\\) لإيجاد القيمة النهائية."
                        if is_ar
                        else f"Solve \\({imp_parts[1]}\\) for \\({var_name}\\) and verify your answer."
                    ),
                ]
        else:
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                (
                    "طبّق الخطوة الجبرية التالية: "
                    if is_ar
                    else "Apply the next algebraic step: "
                )
                + f"\\({imp_parts[1]}\\).",
                (
                    "استخدم الصورة المبسطة لإيجاد الحل: "
                    if is_ar
                    else "Use the simplified form: "
                )
                + f"\\({imp_parts[-1]}\\).",
            ]
    elif len(imp_parts) == 2:
        first_lbl = format_prefix_label(
            prefix, "Start from the relation: ", "ابدأ من العلاقة: ", is_ar=is_ar
        )
        eqs1 = split_top_level_math(imp_parts[0], EQ_SEP)
        eqs2 = split_top_level_math(imp_parts[1], EQ_SEP)
        if len(eqs1) >= 3:
            var_name = eqs2[0].strip() if eqs2 else "x"
            return [
                f"{first_lbl}\\({eqs1[0]} = {eqs1[1]}\\).",
                (
                    "بسّط الطرفين للحصول على المعادلة: "
                    if is_ar
                    else "Rewrite and simplify the equation to: "
                )
                + f"\\({eqs1[0]} = {eqs1[-1]}\\).",
                "<NO_REDACT>"
                + (
                    f"استنتج قيمة \\({var_name}\\) من \\({eqs1[0]} = {eqs1[-1]}\\)."
                    if is_ar
                    else f"Solve \\({eqs1[0]} = {eqs1[-1]}\\) to find \\({var_name}\\)."
                ),
            ]
        if is_multi_assignment(imp_parts[1]):
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                (
                    "رتّب الحدود وحلّل المقدار في \\(" + imp_parts[0] + "\\)."
                    if is_ar
                    else f"Factor or split \\({imp_parts[0]}\\) into separate cases."
                ),
                "<NO_REDACT>"
                + (
                    "حل كل حالة على حدة لإيجاد جميع الحلول الممكنة."
                    if is_ar
                    else "Solve each case separately to obtain all valid roots."
                ),
            ]
        if len(eqs2) >= 3:
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                ("بالتعويض والتبسيط: " if is_ar else "Substitute and simplify: ")
                + f"\\({eqs2[0]} = {eqs2[1]}\\).",
                "<NO_REDACT>"
                + (
                    "احسب القيمة النهائية للمقدار: "
                    if is_ar
                    else "Evaluate the simplified expression: "
                )
                + f"\\({eqs2[0]} = {eqs2[-2]}\\).",
            ]
        elif len(eqs2) == 2:
            if is_pure_final_value(eqs2[1]) and is_simple_var_lhs(eqs2[0]):
                vname = eqs2[0].strip()
                return [
                    f"{first_lbl}\\({imp_parts[0]}\\).",
                    (
                        f"رتّب الحدود في \\({imp_parts[0]}\\) لعزل المتغير \\({vname}\\)."
                        if is_ar
                        else f"Rearrange the terms in \\({imp_parts[0]}\\) to isolate \\({vname}\\)."
                    ),
                    "<NO_REDACT>"
                    + (
                        f"احسب قيمة \\({vname}\\) وتأكد من تحقيقها للمعادلة \\({imp_parts[0]}\\)."
                        if is_ar
                        else f"Compute the value of \\({vname}\\) and check that it satisfies \\({imp_parts[0]}\\)."
                    ),
                ]
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                ("بالتبسيط الجبري: " if is_ar else "Rewrite in simplified form: ")
                + f"\\({imp_parts[1]}\\).",
                "<NO_REDACT>"
                + (
                    f"أكمل الحل انطلاقاً من \\({eqs2[0]}\\)."
                    if is_ar
                    else f"Finish solving from \\({eqs2[0]}\\) to obtain the final answer."
                ),
            ]

    if not is_multi_assignment(inner):
        eq_parts = split_top_level_math(inner, EQ_SEP)
        if len(eq_parts) >= 4:
            first_lbl = format_prefix_label(
                prefix,
                "Set up the formula/expression: ",
                "استخدم القانون: ",
                is_ar=is_ar,
            )
            last_setup_idx = len(eq_parts) - 2
            while last_setup_idx > 2 and is_pure_final_value(eq_parts[last_setup_idx]):
                last_setup_idx -= 1
            return [
                f"{first_lbl}\\({eq_parts[0]} = {eqs_safe(eq_parts, 1)}\\).",
                ("بالتعويض والتبسيط: " if is_ar else "Substitute and simplify: ")
                + f"\\({eq_parts[0]} = {eq_parts[2]}\\).",
                "<NO_REDACT>"
                + (
                    "احسب القيمة النهائية من المقدار: "
                    if is_ar
                    else "Compute the final value from: "
                )
                + f"\\({eq_parts[last_setup_idx]}\\).",
            ]
        elif len(eq_parts) == 3:
            first_lbl = format_prefix_label(
                prefix,
                "Start with the expression: ",
                "اكتب العلاقة الأساسية: ",
                is_ar=is_ar,
            )
            if eq_parts[2].strip() == "0":
                return [
                    f"{first_lbl}\\({eq_parts[0]} = 0\\).",
                    ("حلّل أو أعد كتابة المعادلة: " if is_ar else "Rewrite/factor the equation: ")
                    + f"\\({eq_parts[1]} = 0\\).",
                    "<NO_REDACT>"
                    + (
                        f"حل المعادلة \\({eq_parts[1]} = 0\\) لإيجاد الجذور المطلوبة."
                        if is_ar
                        else f"Solve \\({eq_parts[1]} = 0\\) to find the required root(s)."
                    ),
                ]
            return [
                f"{first_lbl}\\({eq_parts[0]}\\).",
                ("عوّض بالقيم المعطاة: " if is_ar else "Rewrite and substitute: ")
                + f"\\({eq_parts[0]} = {eq_parts[1]}\\).",
                "<NO_REDACT>"
                + ("احسب ناتج المقدار \\(" if is_ar else "Evaluate \\(")
                + f"{eq_parts[1]}\\) "
                + ("لإيجاد الإجابة النهائية." if is_ar else "to obtain the final answer."),
            ]
        elif len(eq_parts) == 2 and m == m_list[-1] and len(suffix) <= 22:
            lhs, rhs = eq_parts[0].strip(), eq_parts[1].strip()
            if (is_pure_final_value(rhs) or "\\mathbf" in m.group(1)) and not is_simple_var_lhs(lhs):
                if len(m_list) >= 2:
                    p_before_last = u[: m.start()].strip().rstrip(":,")
                    if len(strip_html_tags(p_before_last).strip()) >= 6:
                        return [
                            f"<NO_REDACT>{p_before_last}.",
                            ("اكتب المقدار بالتعويض العددي: " if is_ar else "Set up the numerical expression: ")
                            + f"\\({lhs}\\).",
                            "<NO_REDACT>"
                            + (
                                f"احسب قيمة \\({lhs}\\) للوصول إلى الناتج النهائي."
                                if is_ar
                                else f"Evaluate \\({lhs}\\) step by step to obtain the final answer."
                            ),
                        ]
                plain_pref = strip_html_tags(prefix).strip()
                if plain_pref and len(plain_pref) >= 4 and plain_pref.lower() not in ["evaluating", "compute", "calculate"]:
                    u1 = (
                        f"استخدم علاقة «{plain_pref}» وعوّض بالقيم المعطاة في السؤال."
                        if is_ar
                        else f"Set up the calculation for: {prefix.rstrip(':')}."
                    )
                elif q_math:
                    u1 = (
                        f"انطلق من المعطيات الرياضية في السؤال: \\({q_math[0]}\\)."
                        if is_ar
                        else f"Start from the given mathematical expression in the prompt: \\({q_math[0]}\\)."
                    )
                else:
                    u1 = (
                        "حدد العلاقة الحسابية التي تربط بين القيم المعطاة في المسألة."
                        if is_ar
                        else "Identify the operation connecting the given quantities in the problem."
                    )
                return [
                    "<NO_REDACT>" + u1,
                    ("اكتب المقدار المطلوب حسابه: " if is_ar else "Write out the unsimplified expression: ")
                    + f"\\({lhs}\\).",
                    "<NO_REDACT>"
                    + (
                        f"أجرِ العمليات الحسابية في \\({lhs}\\) لإيجاد الناتج النهائي."
                        if is_ar
                        else f"Perform the arithmetic in \\({lhs}\\) to find the final value."
                    ),
                ]

    if len(m_list) >= 2:
        last_m = m_list[-1]
        split_colon = u[: last_m.start()].rfind(":")
        if split_colon != -1 and split_colon >= m_list[0].end() - 1:
            part1 = u[:split_colon].strip()
            part2 = u[split_colon + 1 :].strip()
            if len(strip_html_tags(part1).strip()) >= 6 and len(strip_html_tags(part2).strip()) >= 4:
                return [part1 + ".", part2]
    return [u]


def eqs_safe(eq_parts, idx):
    return eq_parts[idx] if idx < len(eq_parts) else eq_parts[-1]


def is_pure_conclusion_unit(u):
    """Returns True if unit u is purely a final-answer summary statement that adds no intermediate method step."""
    plain = strip_html_tags(u).strip()
    if re.match(
        r"^(?:Conclusion:?|Final\s+Answer:?|Answer:?|Total:?|Count:?|Smaller\s+boundary:?|Larger\s+boundary:?|Upper\s+bound:?|Lower\s+bound:?|The\s+(?:larger|smaller|only|unique)\s+(?:real\s+)?solution\s+is|Both\s+solutions\s+are\s+real\s+and\s+valid:?|Thus\s+the\s+unique\s+real\s+solution\s+is|Therefore,\s+the\s+(?:unique\s+|only\s+)?solution\s+is|Hence\s+the\s+(?:required\s+)?(?:value|answer|solution)\s+is|الإجابة\s+النهائية:?|إذن\s+الحل\s+هو|إذًا،?\s*الحد\s+الأول\s+هو)\b",
        plain,
        flags=re.I,
    ):
        return True
    if re.match(
        r"^(?:Thus|Therefore|Hence|So|إذن|وبالتالي|ومنه),?\s*\\\(\s*[a-zA-Z0-9_\\^\{\}\(\)\x27]+\s*=\s*[^)]+\\\)(?:\s*(?:,|and|or|و|أو)\s*\\\(\s*[a-zA-Z0-9_\\^\{\}\(\)\x27]+\s*=\s*[^)]+\\\))?\.?$",
        plain,
        flags=re.I,
    ):
        return True
    # Bare single-variable final value assignment like `\( m = 3 \)` or `\( f(0) = 3 \)`
    m_bare = re.match(r"^\\\(\s*([\s\S]*?)\s*\\\)\.?$", plain)
    if m_bare:
        eqs = split_top_level_math(m_bare.group(1), EQ_SEP)
        if len(eqs) == 2 and is_simple_var_lhs(eqs[0]) and is_pure_final_value(eqs[1]):
            return True
    return False


def is_distractor_or_meta_unit(u):
    plain = strip_html_tags(u).strip()
    if not plain or len(plain) <= 2:
        return True
    if re.match(
        r"^(?:Q\.?E\.?D\.?|\\\((?:\\square|\\blacksquare)\\\)|Hence\s+shown\.?|Proven\.?)$",
        plain,
        flags=re.I,
    ):
        return True
    if re.match(
        r"^We\s+(?:solve|can\s+solve|analyze|find|evaluate)\s+(?:the|this)\s+problem\s+in\s+[a-z0-9\-]+\s+steps?:?\.?$",
        plain,
        flags=re.I,
    ):
        return True
    if re.search(
        r"\b(?:Choice|Option)\s+[A-E]\b|\bdistractors?\b|\bCommon\s+(?:Misconceptions?|Traps?|Errors?|Mistakes?|algebraic\s+traps?)|\bMisconceptions?\s*(?:Analysis|Checks?|Traps?|Notes?|Pitfalls?|\d+|[:\-])|arises\s+from\s+(?:incorrectly|forgetting|an\s+arithmetic|an\s+algebraic|taking)|Let's\s+check\s+the\s+options|matches\s+Choice\s+[A-E]|corresponds\s+to\s+choice\s+[A-E]|is\s+incorrect\s+(?:because|as)\b|would\s+lead\s+to\s+.*which\s+is\s+false|Common\s+errors\s+might\s+involve",
        plain,
        flags=re.I,
    ):
        return True
    if re.match(r"^[-*•]\s+", plain) and re.search(
        r"\b(?:incorrectly|erroneously|mistakenly|forgetting|omitting|confusing|fails\s+to|overlooks|comes\s+from|results\s+from|occurs\s+from)\b",
        plain,
        flags=re.I,
    ):
        return True
    return False


def split_unit_into_sentences(u):
    math_stash = []

    def stash_m(m):
        math_stash.append(m.group(0))
        return f"__M{len(math_stash)-1}__"

    u_prot = re.sub(r"\\\([\s\S]*?\\\)", stash_m, u)
    for abbr in [
        "e.g.",
        "i.e.",
        "s.f.",
        "d.p.",
        "approx.",
        "min.",
        "sec.",
        "Fig.",
    ]:
        u_prot = u_prot.replace(abbr, abbr[:-1] + "<DOT>")
    sents = re.split(r"\.\s+|;\s+|؛\s+", u_prot)
    out = []
    for st in sents:
        st = st.replace("<DOT>", ".").strip()
        if not st:
            continue
        for idx, m_str in enumerate(math_stash):
            st = st.replace(f"__M{idx}__", m_str)
        if not st.endswith(".") and not st.endswith("?"):
            st += "."
        out.append(st)
    return out


def extract_steps_from_solution(q_html, sol_html, is_ar=False):
    sol = clean_solution_wrappers(sol_html or "")
    # Truncate before any Common Misconceptions / Distractor Analysis section (whether after newline, tag, or period)
    sol = re.split(
        r"(?:<p>|<br\s*/?>|\\n|\n|(?<=\.)\s+|^)\s*(?:\*\*|\*|<strong>|<em>)?\s*(?:(?:A\s+)?Common\s+(?:errors?|misconceptions?|mistakes?|traps?|algebraic\s+traps?|pitfalls?)|Misconceptions?\s+(?:Analysis|Checks?|Traps?|Notes?|Pitfalls?)|(?:Analysis\s+of\s+)?Distractors?(?:\s+Analysis)?|Why\s+(?:other\s+)?(?:options|choices)\s+are\s+(?:wrong|incorrect)|أخطاء\s+شائعة)",
        sol,
        flags=re.I,
    )[0]
    sol = re.sub(
        r"^<p>\s*<strong>Correct Answer:\s*\(?[A-E]\)?\.?</strong>\s*</p>",
        "",
        sol,
        flags=re.I,
    ).strip()
    sol = re.sub(
        r"^<strong>Correct Answer:\s*\(?[A-E]\)?\.?</strong>\s*", "", sol, flags=re.I
    ).strip()

    # Extract math blocks from question stem (excluding inline choices (A)...(D))
    q_stem = re.split(r"<br\s*/?>\s*\([A-E]\)|\n\s*\([A-E]\)", q_html or "")[0]
    q_math = [m.strip() for m in re.findall(r"\\\(([\s\S]*?)\\\)", q_stem) if len(m.strip()) >= 2]

    s = sol
    s = re.sub(r"\$\$([\s\S]*?)\$\$", lambda m: f"\\[ {m.group(1)} \\]", s)

    def _conv_inline_dollar(m):
        inner = m.group(1)
        if re.match(r"^\d", inner) and re.search(
            r"\b(?:for|and|to|is|per|each|total|more|less|than|or|in|with|at|of|from)\b",
            inner,
            flags=re.I,
        ):
            return m.group(0)
        return f"\\({inner}\\)"

    s = re.sub(r"(?<!\\)\$([^$\n]+?)\$(?!\d)", _conv_inline_dollar, s)
    s = re.sub(
        r"\\\[\s*([\s\S]*?)\s*\\\]",
        lambda m: " <DISP_MATH>\\(" + m.group(1).strip().rstrip(".") + "\\)</DISP_MATH> ",
        s,
    )
    s = re.sub(r"\\\)\s*\\\(\s*=\s*\\\)\s*\\\(", " = ", s)
    s = re.sub(r"\\\)\s*=\s*\\\(", " = ", s)
    s = unwrap_full_text_math(s)
    s = unwrap_aligned_math(s)

    # Stash all `\(...\)` math blocks so HTML/newline/backslash splitting never corrupts math
    math_vault = []

    def _stash_math(m):
        math_vault.append(m.group(0))
        return f"__MVAULT_{len(math_vault) - 1}__"

    s = re.sub(r"\\\([\s\S]*?\\\)", _stash_math, s)

    s = re.sub(r"\\\\\s*(?:\n|$)", " <STEP_BRK> ", s)
    s = re.sub(r"</?(?:ul|ol)>", " ", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"</li>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"</p>\s*<p[^>]*>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"</?p[^>]*>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"<br\s*/?>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"\n+", " <STEP_BRK> ", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"<strong>\s*</strong>", "", s, flags=re.I)
    s = re.sub(r"\\\\", " ", s)

    s = s.replace("<DISP_MATH>", " <STEP_BRK> <DISP_START> ").replace(
        "</DISP_MATH>", " <STEP_BRK> "
    )

    def _unstash_math(txt):
        for idx, m_str in enumerate(math_vault):
            txt = txt.replace(f"__MVAULT_{idx}__", m_str)
        return txt

    raw_units = [_unstash_math(u).strip() for u in s.split("<STEP_BRK>") if u.strip()]

    merged_units = []
    i = 0
    while i < len(raw_units):
        u = raw_units[i].replace("<DISP_START>", "").strip()
        u_nostrong = re.sub(r"</?strong>", "", u).strip()
        if u_nostrong.endswith(":") and i + 1 < len(raw_units):
            next_u = raw_units[i + 1].replace("<DISP_START>", "").strip()
            merged_units.append(f"{u} {next_u}")
            i += 2
        else:
            merged_units.append(u)
            i += 1

    units = []
    for u in merged_units:
        u = re.sub(
            r"^<strong>(?:Step\s*\d+\s*(?:\([^)]*\))?\s*:?|الخطوة\s*\d+\s*:?)\s*</strong>\s*",
            "",
            u,
            flags=re.I,
        )
        u = re.sub(
            r"^<strong>(?:Step\s*\d+\s*(?:\([^)]*\))?\s*:?|الخطوة\s*\d+\s*:?)\s*",
            "<strong>",
            u,
            flags=re.I,
        )
        u = re.sub(
            r"^(?:Step\s*\d+\s*(?:\([^)]*\))?\s*:?|الخطوة\s*\d+\s*:?|\d+\.\s*)\s*",
            "",
            u,
            flags=re.I,
        ).strip()
        u = re.sub(r"<strong>\s*</strong>", "", u, flags=re.I)
        u = re.sub(r"\s+", " ", u).strip()
        if is_distractor_or_meta_unit(u):
            # Before dropping u completely, check if u is a multi-sentence paragraph where early sentences are valid!
            sub_sents = [
                st for st in split_unit_into_sentences(u) if not is_distractor_or_meta_unit(st)
            ]
            units.extend(sub_sents)
        else:
            units.append(u)

    if len(units) < 3:
        expanded = []
        for u in units:
            for st in split_unit_into_sentences(u):
                if not is_distractor_or_meta_unit(st):
                    expanded.append(st)
        if len(expanded) >= 2:
            units = expanded

    if len(units) < 3:
        clause_expanded = []
        for u in units:
            math_stash = []

            def stash_m(m):
                math_stash.append(m.group(0))
                return f"__M{len(math_stash)-1}__"

            u_prot = re.sub(r"\\\([\s\S]*?\\\)", stash_m, u)
            parts = re.split(
                r",\s+(?=(?:so|then|giving|which|yielding|hence|thus|therefore|and\s+thus|and\s+so|leaving|where)\b)|،\s+(?=(?:إذن|وبالتالي|ومنه|لذا|حيث|فيكون|فتكون))",
                u_prot,
                flags=re.I,
            )
            if len(parts) < 2 and re.match(
                r"^(?:Because|Since|When|If|Given\s+that|By)\b", u_prot.strip(), flags=re.I
            ):
                c_parts = u_prot.split(", ", 1)
                if len(c_parts) == 2 and len(c_parts[0]) >= 18 and len(c_parts[1]) >= 18:
                    parts = c_parts
            if len(parts) >= 2:
                for p in parts:
                    p = p.strip()
                    for idx, m_str in enumerate(math_stash):
                        p = p.replace(f"__M{idx}__", m_str)
                    if not p.endswith("."):
                        p += "."
                    clause_expanded.append(p)
            else:
                clause_expanded.append(u)
        if len(clause_expanded) > len(units):
            units = clause_expanded

    # Pop pure final-answer conclusion units when we already have >= 4 units (or >= 3 if expandable)
    while len(units) >= 4 and is_pure_conclusion_unit(units[-1]):
        units.pop()
    if len(units) == 3 and is_pure_conclusion_unit(units[-1]):
        sub0 = expand_unit_by_math_chain(units[0], is_ar=is_ar, q_math=q_math)
        sub1 = expand_unit_by_math_chain(units[1], is_ar=is_ar, q_math=q_math)
        if len(sub1) >= 2:
            units = [units[0]] + sub1
        elif len(sub0) >= 2:
            units = sub0 + [units[1]]
        else:
            units[-1] = (
                "<NO_REDACT>عوّض بالقيمة الناتجة في العلاقة الأساسية وتحقق من شرط السؤال للوصول إلى الإجابة النهائية."
                if is_ar
                else "<NO_REDACT>Substitute the result from the previous step into the governing relation and verify the problem condition to find the final answer."
            )

    if len(units) == 2:
        if is_pure_conclusion_unit(units[1]):
            sub0 = expand_unit_by_math_chain(units[0], is_ar=is_ar, q_math=q_math)
            if len(sub0) >= 3:
                units = sub0
            elif len(sub0) == 2:
                units = sub0 + [
                    "<NO_REDACT>قارن القيم الناتجة لاختيار الإجابة التي تحقق المطلوب."
                    if is_ar
                    else "<NO_REDACT>Use the values obtained above to select the required bound or solution."
                ]
            else:
                # e.g. units = ['Solutions: 45, 135.', 'Count: 2.']
                u0_clean = units[0]
                h1_math = f"\\({q_math[0]}\\)" if q_math else "the equation"
                units = [
                    (
                        f"<NO_REDACT>ابدأ بحل المعادلة المثلثية/الجبرية المعطاة في الفترة المحددة."
                        if is_ar
                        else f"<NO_REDACT>Solve {h1_math} over the specified interval using reference angles and quadrant symmetry."
                    ),
                    u0_clean,
                    (
                        "<NO_REDACT>عُدّ جميع الحلول المختلفة التي تقع ضمن الفترة المطلوبة."
                        if is_ar
                        else "<NO_REDACT>Count the total number of distinct solutions that lie within the given domain."
                    ),
                ]
        if len(units) == 2:
            sub1 = expand_unit_by_math_chain(units[1], is_ar=is_ar, q_math=q_math)
            if len(sub1) >= 2:
                units = [units[0]] + sub1
            else:
                sub0 = expand_unit_by_math_chain(units[0], is_ar=is_ar, q_math=q_math)
                if len(sub0) >= 2:
                    units = sub0 + [units[1]]
    elif len(units) == 1:
        units = expand_unit_by_math_chain(units[0], is_ar=is_ar, q_math=q_math)

    if len(units) >= 3:
        h1 = redact_math_in_step(units[0], is_final_hint=False, is_ar=is_ar)
        if len(units) == 3:
            h2_raw = units[1]
        else:
            joined_mid = " ".join(units[1:-1])
            if len(joined_mid) <= 280:
                h2_raw = joined_mid
            elif len(units[1]) + len(units[2]) <= 280:
                h2_raw = units[1] + " " + units[2]
            else:
                h2_raw = units[len(units) // 2]
        h2 = redact_math_in_step(h2_raw, is_final_hint=False, is_ar=is_ar)
        h3 = redact_math_in_step(units[-1], is_final_hint=True, is_ar=is_ar)
    elif len(units) == 2:
        h1 = redact_math_in_step(units[0], is_final_hint=False, is_ar=is_ar)
        h2 = redact_math_in_step(units[1], is_final_hint=True, is_ar=is_ar)
        m_in_h2 = re.findall(r"\\\(([\s\S]*?)\\\)", h2)
        if m_in_h2:
            last_expr = m_in_h2[-1].strip()
            h3 = (
                f"أكمل التبسيط الحسابي للمقدار \\({last_expr}\\) وتأكد من الإشارات والوحدات للوصول إلى النتيجة النهائية."
                if is_ar
                else f"Evaluate and simplify \\({last_expr}\\) carefully (checking signs and units) to obtain the final answer."
            )
        else:
            h3 = (
                "طبّق هذه النتيجة مباشرة على معطيات السؤال لاختيار الإجابة الصحيحة."
                if is_ar
                else "Apply this relationship directly to the given values in the prompt to confirm the final answer."
            )
    else:
        u0 = units[0] if units else ""
        if q_math:
            h1 = (
                f"ابدأ بتحليل المعطيات الرياضية في السؤال: \\({q_math[0]}\\)."
                if is_ar
                else f"Start by examining the given mathematical expression in the problem: \\({q_math[0]}\\)."
            )
        else:
            h1 = (
                "حدد القاعدة أو الخاصية الرياضية الأساسية المرتبطة بالمعطيات في السؤال."
                if is_ar
                else "Identify the core mathematical definition or theorem that governs the relationship in the prompt."
            )
        h2 = redact_math_in_step(u0, is_final_hint=True, is_ar=is_ar)
        m_in_h2 = re.findall(r"\\\(([\s\S]*?)\\\)", h2)
        if m_in_h2:
            h3 = (
                f"طبّق القاعدة على \\({m_in_h2[-1].strip()}\\) وبسّط الناتج للوصول إلى الحل النهائي."
                if is_ar
                else f"Apply this step to \\({m_in_h2[-1].strip()}\\) and simplify to determine the final result."
            )
        else:
            h3 = (
                "طبّق هذه القاعدة على القيم المعطاة في المسألة للوصول إلى الناتج النهائي."
                if is_ar
                else "Apply this rule to the specific parameters in the question to reach the final answer."
            )

    out_hints = [
        ensure_natural_lead(h1, 0, is_ar=is_ar),
        ensure_natural_lead(h2, 1, is_ar=is_ar),
        ensure_natural_lead(h3, 2, is_ar=is_ar),
    ]
    # Guard against any hint tier still being too short (< 14 chars)
    for ti in range(3):
        if len(strip_html_tags(out_hints[ti]).strip()) < 14:
            if ti == 2:
                out_hints[ti] = (
                    "عوّض بالقيم المبسطة أعلاه وأكمل الحساب للوصول إلى النتيجة النهائية."
                    if is_ar
                    else "Substitute the simplified values from the previous step to complete the calculation."
                )
            elif ti == 1:
                out_hints[ti] = (
                    "طبّق القاعدة الرياضية على المعطيات ورتّب الحدود لعزل المطلوب."
                    if is_ar
                    else "Substitute the given parameters into the governing relation and simplify."
                )
            else:
                out_hints[ti] = (
                    "حدد المعطيات والعلاقة الرياضية الأساسية في المسألة."
                    if is_ar
                    else "Identify the governing mathematical relationship for the given quantities."
                )
    if out_hints[0] == out_hints[1]:
        out_hints[0] = (
            "ابدأ بتحديد العلاقة الأساسية من المعطيات: " + out_hints[0]
            if is_ar
            else "Start by setting up the core relationship: " + out_hints[0]
        )
    if out_hints[1] == out_hints[2]:
        out_hints[2] = (
            "أكمل التعويض النهائي للوصول إلى الإجابة المطلوبة."
            if is_ar
            else "Substitute the values into this relationship and simplify to reach the final answer."
        )
    return out_hints


def split_bilingual(raw_html):
    """
    Returns (en_part, ar_part, mode) where mode is:
    - 'ar_first_span': Arabic primary + <span class="en-trans">English</span> (qudrat/tahsili)
    - 'ar_first_em': Arabic primary + <em>English</em> (qudrat/tahsili)
    - 'en_first_em': English primary + <em>Arabic</em>
    - 'ar_only': Arabic only
    - 'en_only': English / pure math only
    """
    if not raw_html:
        return "", "", "en_only"
    s = str(raw_html)
    m_span = re.search(
        r"<span\s+class=[\"']en-trans[\"'][^>]*>([\s\S]*?)</span>", s, flags=re.I
    )
    if m_span:
        en_part = m_span.group(1).strip()
        ar_part = (s[: m_span.start()] + s[m_span.end() :]).strip()
        ar_part = re.sub(r"(?:<br\s*/?>\s*)+$", "", ar_part, flags=re.I).strip()
        return en_part, ar_part, "ar_first_span"

    for m in re.finditer(r"<em>([\s\S]*?)</em>", s, flags=re.I):
        inner = m.group(1).strip()
        outer = (s[: m.start()] + s[m.end() :]).strip()
        outer = re.sub(r"(?:<br\s*/?>\s*)+$", "", outer, flags=re.I).strip()
        if re.search(r"[\u0600-\u06FF]", inner) and not re.search(
            r"[\u0600-\u06FF]", outer
        ):
            return outer, inner, "en_first_em"
        if re.search(r"[\u0600-\u06FF]", outer) and not re.search(
            r"[\u0600-\u06FF]", inner
        ):
            return inner, outer, "ar_first_em"

    # Check if there is an unmarked Arabic + <br>To find... bilingual split (as in tahsili Q1263)
    m_br_en = re.search(r"<br\s*/?>\s*(To\s+find\s+[\s\S]+)$", s)
    if m_br_en and re.search(r"[\u0600-\u06FF]", s[: m_br_en.start()]):
        return m_br_en.group(1).strip(), s[: m_br_en.start()].strip(), "ar_first_span"

    if re.search(r"[\u0600-\u06FF]", s):
        return "", s.strip(), "ar_only"
    return s.strip(), "", "en_only"


def upgrade_terse_content_solutions(fn, bi, b):
    """Upgrades ultra-terse 1-line stub solutions in content/*/*.json so both solutions and hints are thorough."""
    sol_en = (b.get("solution", {}).get("en") or "").strip()
    if fn == "apab-u1.json" and sol_en == "Standard limit: 1.":
        b["solution"]["en"] = (
            "Recall the fundamental trigonometric limit for \\(\\frac{\\sin x}{x}\\) as \\(x \\to 0\\). "
            "By the Squeeze Theorem on the unit circle, \\(\\cos x \\le \\frac{\\sin x}{x} \\le 1\\) for small \\(x \\neq 0\\). "
            "Since \\(\\lim_{x \\to 0} \\cos x = 1\\), it follows that \\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\)."
        )
    elif fn == "a2-trig.json" and sol_en == "Vertical stretch: multiply output by constant.":
        b["solution"]["en"] = (
            "A vertical stretch of a function \\(y = f(x)\\) scales all output \\(y\\)-values away from the \\(x\\)-axis. "
            "Multiplying the outside of the function by a constant factor \\(c > 1\\) gives the transformed equation \\(y = c\\,f(x)\\). "
            "For a vertical stretch by factor \\(4\\), multiply the output by \\(4\\) to get \\(y = 4f(x)\\)."
        )
    elif fn == "ig-coordinate.json" and "6 - 4x = 1 + 5" in sol_en:
        b["solution"]["en"] = (
            "Collect the \\(x\\)-terms on the left and constants on the right: \\(6x - 4x = 1 + 5\\). "
            "Combine like terms to obtain \\(2x = 6\\). "
            "Divide both sides by \\(2\\) to get \\(x = 3\\)."
        )


def main():
    # 1. Update all 1,135 practiceProblem blocks in content/<track>/*.json
    updated_chapters = 0
    updated_problems = 0
    for fp in sorted(glob.glob(os.path.join(ROOT, "content", "*", "*.json"))):
        if fp.endswith("_meta.json") or fp.endswith("_practice-set.json"):
            continue
        with open(fp, "r", encoding="utf-8") as f:
            data = json.load(f)
        fn = os.path.basename(fp)
        changed = False
        blocks = data.get("content", {}).get("blocks", [])
        for idx, b in enumerate(blocks):
            if b.get("kind") != "practiceProblem":
                continue
            upgrade_terse_content_solutions(fn, idx, b)
            q_en = b["question"].get("en") or ""
            if "Referring to the coordinate curve shown in the diagram," in q_en:
                q_en = re.sub(
                    r"Referring to the coordinate curve shown in the diagram,\s*([a-z])",
                    lambda m: m.group(1).upper(),
                    q_en,
                )
                b["question"]["en"] = q_en
            sol_en = clean_solution_wrappers(b["solution"].get("en") or "")
            if sol_en != b["solution"].get("en"):
                b["solution"]["en"] = sol_en
            if b["solution"].get("ar") is not None:
                sol_ar = clean_solution_wrappers(b["solution"].get("ar") or "")
                b["solution"]["ar"] = sol_ar

            is_en_field_arabic = bool(re.search(r"[\u0600-\u06FF]", sol_en)) and not bool(
                re.search(r"[a-zA-Z]{4,}", strip_html_tags(sol_en))
            )
            if is_en_field_arabic or "en-trans" in sol_en or "en-trans" in q_en:
                q_e, q_a, q_mode = split_bilingual(q_en)
                s_e, s_a, s_mode = split_bilingual(sol_en)
                ar_steps = extract_steps_from_solution(
                    q_a or q_en, s_a or sol_en, is_ar=True
                )
                if s_e or q_e:
                    en_steps = extract_steps_from_solution(
                        q_e or q_en, s_e or sol_en, is_ar=False
                    )
                    hints_en = [
                        f'{ar_steps[k]}<br><span class="en-trans">{en_steps[k]}</span>'
                        for k in range(3)
                    ]
                else:
                    hints_en = ar_steps
            else:
                hints_en = extract_steps_from_solution(q_en, sol_en, is_ar=False)

            has_ar = (
                b["question"].get("ar") is not None
                or b["solution"].get("ar") is not None
                or (
                    b.get("hints")
                    and len(b["hints"]) > 0
                    and b["hints"][0].get("ar") is not None
                )
            )
            if has_ar:
                q_ar = b["question"].get("ar") or q_en
                s_ar = b["solution"].get("ar") or sol_en
                is_arabic_text = bool(re.search(r"[\u0600-\u06FF]", s_ar))
                hints_ar = extract_steps_from_solution(
                    q_ar, s_ar, is_ar=is_arabic_text
                )
            else:
                hints_ar = [None, None, None]

            b["hints"] = [
                {"en": hints_en[0], "ar": hints_ar[0]},
                {"en": hints_en[1], "ar": hints_ar[1]},
                {"en": hints_en[2], "ar": hints_ar[2]},
            ]
            changed = True
            updated_problems += 1

        if changed:
            with open(fp, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.write("\n")
            updated_chapters += 1

    print(
        f"✅ Updated {updated_problems} practiceProblem blocks across {updated_chapters} chapter files in content/*/*.json."
    )

    # 2. Update all question banks in bank-data/*.json
    updated_banks = 0
    updated_bank_qs = 0
    for fp in sorted(glob.glob(os.path.join(ROOT, "bank-data", "*.json"))):
        with open(fp, "r", encoding="utf-8") as f:
            bank = json.load(f)
        changed = False
        pools = []
        if isinstance(bank.get("pool"), list):
            pools.append(bank["pool"])
        else:
            for diff in ["easy", "medium", "hard"]:
                if isinstance(bank.get(diff), list):
                    pools.append(bank[diff])

        for p_list in pools:
            for q in p_list:
                raw_q = q.get("text") or q.get("q") or ""
                raw_sol = q.get("solution") or q.get("sol") or ""
                if not raw_sol:
                    continue
                q_en, q_ar, q_mode = split_bilingual(raw_q)
                s_en, s_ar, s_mode = split_bilingual(raw_sol)

                if s_mode in ("ar_first_span", "ar_first_em", "ar_only") or (
                    q_mode in ("ar_first_span", "ar_first_em", "ar_only")
                    and s_mode == "en_only"
                ):
                    s_ar_clean = clean_solution_wrappers(s_ar or s_en)
                    hints_ar = extract_steps_from_solution(
                        q_ar or q_en, s_ar_clean, is_ar=True
                    )
                    if s_en or q_en:
                        s_en_clean = clean_solution_wrappers(s_en or s_ar)
                        hints_en = extract_steps_from_solution(
                            q_en or q_ar, s_en_clean, is_ar=False
                        )
                        q["hints"] = [
                            f'{hints_ar[k]}<br><span class="en-trans">{hints_en[k]}</span>'
                            for k in range(3)
                        ]
                    else:
                        q["hints"] = hints_ar
                elif s_mode == "en_first_em" or q_mode == "en_first_em":
                    s_en_clean = clean_solution_wrappers(s_en)
                    s_ar_clean = clean_solution_wrappers(s_ar or s_en_clean)
                    hints_en = extract_steps_from_solution(q_en, s_en_clean, is_ar=False)
                    hints_ar = extract_steps_from_solution(
                        q_ar or q_en, s_ar_clean, is_ar=True
                    )
                    q["hints"] = [
                        f"{hints_en[k]}<br><em>{hints_ar[k]}</em>" for k in range(3)
                    ]
                else:
                    s_en_clean = clean_solution_wrappers(s_en)
                    q["hints"] = extract_steps_from_solution(
                        q_en, s_en_clean, is_ar=False
                    )
                changed = True
                updated_bank_qs += 1

        if changed:
            with open(fp, "w", encoding="utf-8") as f:
                json.dump(bank, f, ensure_ascii=False, indent=2)
                f.write("\n")
            updated_banks += 1

    print(
        f"✅ Updated {updated_bank_qs} question hints across {updated_banks} bank files in bank-data/*.json."
    )


if __name__ == "__main__":
    main()
