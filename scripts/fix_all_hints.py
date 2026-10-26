#!/usr/bin/env python3
"""
scripts/fix_all_hints.py

Replaces all generic/boilerplate 3-tier hints across:
1. All 28 curriculum tracks in content/<track>/*.json (1,135 practiceProblem blocks)
2. All 28 question banks in bank-data/<track>.json (42,851 questions)

Derives 3 genuinely problem-specific, mathematically meaningful progressive hints
from each problem's actual mathematical prompt and worked solution steps without
spoiling the final answer in Hints 1, 2, or 3.
"""

import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def clean_solution_wrappers(sol):
    if not sol:
        return sol
    s = sol.strip()
    if "Mark Scheme" in s and "Step 2 (Derivation & Calculation):" in s:
        m = re.search(
            r"Step 2 \(Derivation & Calculation\):\*\*\s*([\s\S]*?)(?:\n-\s*\*\*Step 3|$)",
            s,
        )
        if m:
            inner = m.group(1).strip()
            inner = re.sub(r"(?:\*\*)?(?:\[[MA]\d+\]\s*)+(?:\*\*)?", "", inner).strip()
            s = inner
    s = re.sub(r"(?:\*\*)?(?:\[[MA]\d+\]\s*)+(?:\*\*)?", "", s)
    s = re.sub(r"(?:<strong>)?(?:\[[MA]\d+\]\s*)+(?:</strong>)?", "", s)
    s = re.sub(r"^Applying\s+[^,]+?\s+principles,\s*", "", s)
    s = re.sub(
        r"\s*Therefore,\s+the\s+verified\s+correct\s+option\s+is\s+[^.]+\.?$",
        "",
        s,
    )
    if s.startswith("\\log_"):
        s = re.sub(r"(\\log_\{[^}]+\}\s*\d+\s*=\s*-?\d+)", r"\\(\1\\)", s)
    return s


def split_top_level_math(expr, sep_pattern):
    parts = []
    cur = []
    depth = 0
    i = 0
    while i < len(expr):
        if expr[i] == "\\" and i + 1 < len(expr) and expr[i + 1] in "{}()[]":
            cur.extend([expr[i], expr[i + 1]])
            i += 2
            continue
        if expr[i] in "{([":
            depth += 1
        elif expr[i] in "})]":
            depth = max(0, depth - 1)
        if depth == 0:
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


def is_pure_final_value(rhs):
    """Returns True if rhs looks like an evaluated number, fraction, percentage, coordinate pair, or simple constant answer."""
    if re.search(r"\\text\{\s*(?:or|and)\s*\}", rhs):
        return False
    r = re.sub(
        r"\\(?:text|mathrm|mathbf|textbf|displaystyle|left|right)\s*(?:\{[^}]*\})?",
        "",
        rhs,
    )
    r = re.sub(r"\s+|\\,|\\;|\\quad|\\qquad|%|\^\\circ|°|\$", "", r).strip(".")
    if re.match(r"^[+\-]?\d+(?:\.\d+)?(?:/\d+)?(?:\\pi)?(?:\\dots|\.\.\.)?$", r):
        return True
    if re.match(r"^[+\-]?\\(?:d|t)?frac\{[+\-]?\d+\}\{\d+\}(?:\\pi)?$", r):
        return True
    if re.match(r"^\([+\-]?\d+(?:\.\d+)?,[+\-]?\d+(?:\.\d+)?\)$", r):
        return True
    return False


def is_multi_assignment(expr):
    """Returns True if expr is like 'x = 3/2 \\text{ or } x = -5' (multiple separate variable assignments, not a single chain)."""
    return (
        bool(re.search(r"\\text\{\s*(?:or|and)\s*\}|\b(?:or|and)\b", expr))
        and expr.count("=") >= 2
    )


def format_prefix_label(prefix, default_en, default_ar, is_ar=False):
    if not prefix:
        return default_ar if is_ar else default_en
    plain_p = re.sub(r"</?strong>", "", prefix).strip()
    if plain_p.endswith(":"):
        return prefix + " "
    return prefix + ": "


def redact_single_math_block(inner, aggressive=True):
    had_mathbf = "\\mathbf" in inner
    inner_clean = re.sub(r"\\mathbf\{([^{}]*)\}", r"\1", inner.strip().rstrip("."))
    imp_parts = split_top_level_math(
        inner_clean, r"\\(?:implies|Rightarrow|Longleftrightarrow|iff)\b"
    )
    if len(imp_parts) >= 2:
        last_p = imp_parts[-1]
        if is_multi_assignment(last_p):
            return " \\implies ".join(imp_parts[:-1])
        eqs = split_top_level_math(last_p, r"(?<![<>!])=(?!=)|\\approx\b")
        if len(eqs) >= 3:
            while len(eqs) > 2 and is_pure_final_value(eqs[-1]):
                eqs.pop()
            if len(eqs) >= 2:
                imp_parts[-1] = " = ".join(eqs)
                return " \\implies ".join(imp_parts)
        if len(eqs) == 2 and (
            not is_pure_final_value(eqs[1])
            or re.match(r"^[+\-]?\d+(?:\.\d+)?[a-zA-Z]", eqs[0].strip())
        ):
            # e.g., (2x - 3)(x + 5) = 0 or 4m = 36 -> keep it!
            return " \\implies ".join(imp_parts)
        return " \\implies ".join(imp_parts[:-1])

    if is_multi_assignment(inner_clean):
        if aggressive:
            var_m = re.match(r"^([a-zA-Z0-9_\\]+)\s*=", inner_clean)
            v = var_m.group(1) if var_m else "x"
            return f"{v} = \\text{{?}}"
        return inner_clean

    eq_parts = split_top_level_math(inner_clean, r"(?<![<>!])=(?!=)|\\approx\b")
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
            if re.search(
                r"[+\-*/^()]|\\(?:frac|dfrac|tfrac|sqrt|times|div|int|sum|binom|dbinom|det|sin|cos|tan|log|ln|mid)",
                lhs,
            ) and not re.match(r"^\([a-zA-Z]\s*,\s*[a-zA-Z]\)$", lhs):
                return lhs
            else:
                return f"{lhs} = \\text{{?}}"
    if len(eq_parts) == 1 and aggressive and had_mathbf:
        return "\\text{?}"
    return inner_clean


def redact_math_in_step(text, is_final_hint=True, is_ar=False):
    if "<NO_REDACT>" in text:
        return text.replace("<NO_REDACT>", "").strip()
    matches = list(re.finditer(r"\\\(([\s\S]*?)\\\)", text))
    if not matches:
        if is_final_hint:
            text = re.sub(
                r"=\s*[+\-]?\d+(?:\.\d+)?(?:\s+[a-zA-Z%]+)?\.?$",
                "= ?",
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
            eq_parts = split_top_level_math(inner, r"(?<![<>!])=(?!=)|\\approx\b")
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
    res = re.sub(r":\s*(?:</strong>)?\s*\\\(\\text\{\?\}\\\)\.?$", ".", res)
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
    h = hint_text.strip()
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


def expand_unit_by_math_chain(u, is_ar=False):
    """Attempts to split a single unit containing a multi-step math chain into 2 or 3 units."""
    m_list = list(re.finditer(r"\\\(([\s\S]*?)\\\)", u))
    if not m_list:
        return [u]
    m = max(m_list, key=lambda x: len(x.group(1)))
    prefix = u[: m.start()].strip().rstrip(":")
    inner = re.sub(r"\\mathbf\{([^{}]*)\}", r"\1", m.group(1).strip().rstrip("."))

    imp_parts = split_top_level_math(
        inner, r"\\(?:implies|Rightarrow|Longleftrightarrow|iff)\b"
    )
    if len(imp_parts) >= 3:
        first_lbl = format_prefix_label(
            prefix, "Start with: ", "ابدأ بالمعادلة: ", is_ar=is_ar
        )
        last_p = imp_parts[-1]
        eqs_last = split_top_level_math(last_p, r"(?<![<>!])=(?!=)|\\approx\b")
        if (
            len(eqs_last) == 2
            and is_pure_final_value(eqs_last[1])
            and re.match(r"^[a-zA-Z0-9_\\]+$", eqs_last[0].strip())
        ) or is_multi_assignment(last_p):
            if len(imp_parts) >= 4:
                return [
                    f"{first_lbl}\\({imp_parts[0]}\\).",
                    (
                        "طبّق الخطوة الجبرية التالية: "
                        if is_ar
                        else "Simplify the equation to: "
                    )
                    + f"\\({imp_parts[1]}\\).",
                    "<NO_REDACT>" + (
                        "أكمل الخطوة الأخيرة لإيجاد المطلوب من: "
                        if is_ar
                        else "Solve for the target value from: "
                    )
                    + f"\\({imp_parts[-2]}\\).",
                ]
            else:
                return [
                    f"{first_lbl}\\({imp_parts[0]}\\).",
                    "<NO_REDACT>" + (
                        "أكمل الخطوة الأخيرة لإيجاد المطلوب من: "
                        if is_ar
                        else "Simplify and solve for the target variable from: "
                    )
                    + f"\\({imp_parts[1]}\\).",
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
                    else "Use the factored/simplified form: "
                )
                + f"\\({imp_parts[-1]}\\).",
            ]
    elif len(imp_parts) == 2:
        first_lbl = format_prefix_label(
            prefix, "Start from the relation: ", "ابدأ من العلاقة: ", is_ar=is_ar
        )
        if is_multi_assignment(imp_parts[1]):
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                (
                    "حل كل عامل على حدة لإيجاد الجذور الممكنة."
                    if is_ar
                    else "Set each factor equal to zero and solve for the roots."
                ),
            ]
        eqs2 = split_top_level_math(imp_parts[1], r"(?<![<>!])=(?!=)|\\approx\b")
        if len(eqs2) >= 3:
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                ("بالتعويض والتبسيط: " if is_ar else "Substitute and simplify: ")
                + f"\\({eqs2[0]} = {eqs2[1]}\\).",
                (
                    "احسب القيمة النهائية للمقدار: "
                    if is_ar
                    else "Evaluate the simplified expression: "
                )
                + f"\\({eqs2[0]} = {eqs2[-2]}\\).",
            ]
        elif len(eqs2) == 2:
            if is_pure_final_value(eqs2[1]) and re.match(
                r"^[a-zA-Z0-9_\\]+$", eqs2[0].strip()
            ):
                return [
                    f"{first_lbl}\\({imp_parts[0]}\\).",
                    (
                        "اعزل المتغير المطلوب وأوجد قيمته من المعادلة السابقة."
                        if is_ar
                        else f"Isolate \\({eqs2[0].strip()}\\) from \\({imp_parts[0]}\\) to find its value."
                    ),
                ]
            return [
                f"{first_lbl}\\({imp_parts[0]}\\).",
                ("بالتبسيط الجبري: " if is_ar else "Rewrite in standard form: ")
                + f"\\({imp_parts[1]}\\).",
            ]

    if not is_multi_assignment(inner):
        eq_parts = split_top_level_math(inner, r"(?<![<>!])=(?!=)|\\approx\b")
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
                f"{first_lbl}\\({eq_parts[0]} = {eq_parts[1]}\\).",
                ("بالتعويض والتبسيط: " if is_ar else "Substitute and simplify: ")
                + f"\\({eq_parts[0]} = {eq_parts[2]}\\).",
                (
                    "احسب القيمة النهائية من المقدار: "
                    if is_ar
                    else "Compute the final value from: "
                )
                + f"\\({eq_parts[last_setup_idx]}\\).",
            ]
        elif len(eq_parts) == 3 and not (eq_parts[2].strip() == "0"):
            first_lbl = format_prefix_label(
                prefix,
                "Start with the expression: ",
                "اكتب العلاقة الأساسية: ",
                is_ar=is_ar,
            )
            return [
                f"{first_lbl}\\({eq_parts[0]}\\).",
                ("عوّض بالقيم المعطاة: " if is_ar else "Rewrite and substitute: ")
                + f"\\({eq_parts[0]} = {eq_parts[1]}\\).",
                ("احسب ناتج المقدار \\(" if is_ar else "Evaluate \\(")
                + f"{eq_parts[1]}\\) "
                + ("لإيجاد الإجابة النهائية." if is_ar else "to obtain the final answer."),
            ]
    return [u]


def extract_steps_from_solution(q_html, sol_html, is_ar=False):
    sol = clean_solution_wrappers(sol_html or "")
    sol = re.split(
        r"(?:<p>|\\n|\n)\s*(?:<strong>)?(?:Common\s+(?:errors?|misconceptions?|mistakes?)|أخطاء\s+شائعة)",
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

    s = sol
    s = re.sub(r"\$\$([\s\S]*?)\$\$", lambda m: f"\\[ {m.group(1)} \\]", s)
    s = re.sub(r"(?<!\\)\$([^$\n]+?)\$", lambda m: f"\\({m.group(1)}\\)", s)
    s = re.sub(
        r"\\\[\s*([\s\S]*?)\s*\\\]",
        lambda m: " <DISP_MATH>\\(" + m.group(1).strip().rstrip(".") + "\\)</DISP_MATH> ",
        s,
    )
    s = re.sub(r"\\\\\s*(?:\n|$)", " <STEP_BRK> ", s)
    s = re.sub(r"</?(?:ul|ol)>", " ", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"</li>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"</p>\s*<p[^>]*>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"</?p[^>]*>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"<br\s*/?>", " <STEP_BRK> ", s, flags=re.I)
    s = re.sub(r"\n\s*\n", " <STEP_BRK> ", s)
    s = re.sub(
        r"\n(?=\s*(?:-\s+|\d+\.\s+|Step\s+\d+|الخطوة\s+\d+))", " <STEP_BRK> ", s
    )
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"<strong>\s*</strong>", "", s, flags=re.I)

    s = s.replace("<DISP_MATH>", " <STEP_BRK> <DISP_START> ").replace(
        "</DISP_MATH>", " <STEP_BRK> "
    )
    raw_units = [u.strip() for u in s.split("<STEP_BRK>") if u.strip()]

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
        u = re.sub(r"\\\\", " ", u)
        u = re.sub(r"<strong>\s*</strong>", "", u, flags=re.I)
        u = re.sub(r"\s+", " ", u).strip()
        if re.match(
            r"^(?:Q\.?E\.?D\.?|\\\((?:\\square|\\blacksquare)\\\)|Hence\s+shown\.?|Proven\.?)$",
            u,
            flags=re.I,
        ):
            continue
        plain_u = re.sub(r"<[^>]+>", "", u).strip()
        if plain_u and len(plain_u) > 2:
            units.append(u)

    if len(units) < 3:
        expanded = []
        for u in units:
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
            sents = re.split(r"\.\s+|;\s+", u_prot)
            for st in sents:
                st = st.replace("<DOT>", ".").strip()
                if not st:
                    continue
                for idx, m_str in enumerate(math_stash):
                    st = st.replace(f"__M{idx}__", m_str)
                if re.match(r"^(?:Q\.?E\.?D\.?|Hence\s+shown\.?)$", st, flags=re.I):
                    continue
                plain_st = re.sub(r"<[^>]+>", "", st).strip(" .")
                if not plain_st:
                    continue
                if not st.endswith(".") and not st.endswith("?"):
                    st += "."
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
                r",\s+(?=(?:so|then|giving|which|yielding|hence|thus|therefore)\b)",
                u_prot,
                flags=re.I,
            )
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

    if len(units) == 2:
        sub1 = expand_unit_by_math_chain(units[1], is_ar=is_ar)
        if len(sub1) >= 2:
            units = [units[0]] + sub1
        else:
            sub0 = expand_unit_by_math_chain(units[0], is_ar=is_ar)
            if len(sub0) >= 2:
                units = sub0 + [units[1]]
    elif len(units) == 1:
        units = expand_unit_by_math_chain(units[0], is_ar=is_ar)

    if len(units) >= 3:
        h1 = redact_math_in_step(units[0], is_final_hint=False, is_ar=is_ar)
        h2_raw = units[1] if len(units) == 3 else " ".join(units[1:-1])
        if len(h2_raw) > 260:
            h2_raw = units[1]
        h2 = redact_math_in_step(h2_raw, is_final_hint=False, is_ar=is_ar)
        h3 = redact_math_in_step(units[-1], is_final_hint=True, is_ar=is_ar)
    elif len(units) == 2:
        h1 = redact_math_in_step(units[0], is_final_hint=False, is_ar=is_ar)
        h2 = redact_math_in_step(units[1], is_final_hint=True, is_ar=is_ar)
        q_clean = re.sub(r"<[^>]+>", " ", q_html or "")
        q_clean = re.sub(r"\s+", " ", q_clean).strip()
        q_sents = [s.strip() for s in re.split(r"(?<=[.?])\s+", q_clean) if s.strip()]
        target_sent = q_sents[-1] if q_sents else ""
        if is_ar:
            h3 = "استخدم النتيجة السابقة للإجابة عن المطلوب في السؤال والتأكد من صيغة الناتج النهائي."
        else:
            if target_sent and len(target_sent) < 160:
                h3 = f"Combine the steps above to directly answer: {target_sent}"
            else:
                h3 = "Combine these two steps to complete the calculation and verify that your result satisfies the problem conditions."
    else:
        u0 = units[0] if units else ""
        q_clean = re.sub(r"<[^>]+>", " ", q_html or "")
        q_clean = re.sub(r"\s+", " ", q_clean).strip()
        q_sents = [s.strip() for s in re.split(r"(?<=[.?])\s+", q_clean) if s.strip()]
        target_sent = q_sents[-1] if q_sents else ""
        h1 = (
            f"حدد المعطيات والمطلوب في المسألة: {target_sent}"
            if is_ar
            else f"Focus on what the question asks you to determine: {target_sent}"
        )
        h2 = redact_math_in_step(u0, is_final_hint=True, is_ar=is_ar)
        h3 = (
            "أكمل التبسيط الحسابي وتأكد من مطابقة الناتج للمطلوب."
            if is_ar
            else "Complete the calculation from the relation above to obtain the final answer."
        )

    out_hints = [
        ensure_natural_lead(h1, 0, is_ar=is_ar),
        ensure_natural_lead(h2, 1, is_ar=is_ar),
        ensure_natural_lead(h3, 2, is_ar=is_ar),
    ]
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
    """Returns (en_part, ar_part_or_empty) for bank items where Arabic is wrapped in <em>...</em>."""
    if not raw_html:
        return "", ""
    s = str(raw_html)
    for m in re.finditer(r"<em>([\s\S]*?)</em>", s, flags=re.I):
        if re.search(r"[\u0600-\u06FF]", m.group(1)):
            ar_part = m.group(1).strip()
            en_part = (s[: m.start()] + s[m.end() :]).strip()
            en_part = re.sub(r"<br\s*/?>\s*$", "", en_part, flags=re.I).strip()
            return en_part, ar_part
    return s.strip(), ""


def main():
    # 1. Update all 1,135 practiceProblem blocks in content/<track>/*.json
    updated_chapters = 0
    updated_problems = 0
    for fp in sorted(glob.glob(os.path.join(ROOT, "content", "*", "*.json"))):
        if fp.endswith("_meta.json") or fp.endswith("_practice-set.json"):
            continue
        with open(fp, "r", encoding="utf-8") as f:
            data = json.load(f)
        changed = False
        blocks = data.get("content", {}).get("blocks", [])
        for idx, b in enumerate(blocks):
            if b.get("kind") != "practiceProblem":
                continue
            q_en = b["question"].get("en") or ""
            # Check if q_en has dangling "Referring to the coordinate curve shown in the diagram, "
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
                q_en, q_ar = split_bilingual(raw_q)
                s_en, s_ar = split_bilingual(raw_sol)
                s_en_clean = clean_solution_wrappers(s_en)
                hints_en = extract_steps_from_solution(q_en, s_en_clean, is_ar=False)
                if q_ar or s_ar:
                    s_ar_clean = clean_solution_wrappers(s_ar or s_en_clean)
                    is_ar_flag = bool(re.search(r"[\u0600-\u06FF]", s_ar_clean))
                    hints_ar = extract_steps_from_solution(
                        q_ar or q_en, s_ar_clean, is_ar=is_ar_flag
                    )
                    q["hints"] = [
                        f"{hints_en[0]}<br><em>{hints_ar[0]}</em>",
                        f"{hints_en[1]}<br><em>{hints_ar[1]}</em>",
                        f"{hints_en[2]}<br><em>{hints_ar[2]}</em>",
                    ]
                else:
                    q["hints"] = hints_en
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
