#!/usr/bin/env python3
"""
Fix unescaped TeX backslashes in bank-data JSON files.
Ensures that all TeX commands like \\begin, \\times, \\theta, \\right, \\frac, \\arccos, etc.
are stored with valid JSON escaping (double backslash on disk) so client-side JSON.parse
produces valid TeX commands without control characters (\\b, \\t, \\r, \\f, \\a).
"""

import json
import re
import os

COMMANDS = [
    "begin", "end", "binom", "bar", "beta",
    "frac", "dfrac", "tfrac",
    "right", "rangle", "rho",
    "times", "theta", "tan", "to", "triangle", "tau", "text",
    "arccos", "arcsin", "arctan", "approx", "alpha", "acute", "angle",
    "neq", "le", "ge", "pm", "mp", "cdot", "div", "quad", "sqrt",
    "mathbf", "mathit", "mathrm", "sum", "int", "lim", "infty",
    "sin", "cos", "cot", "sec", "csc", "log", "ln", "exp",
    "vert", "Vert", "left"
]

def fix_bank_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    orig_len = len(text)
    
    # 1. Fix bell character before arc functions: \u0007rc -> \\arc
    text = text.replace(r"\u0007rc", r"\\arc")
    
    # 2. Fix unescaped TeX commands in raw JSON:
    # Match a single backslash not preceded by a backslash, followed by known TeX command
    for cmd in COMMANDS:
        # (?<!\\)\\(cmd)(?![a-zA-Z]) -> \\\\cmd
        pattern = re.compile(r"(?<!\\)\\" + cmd + r"(?![a-zA-Z])")
        text = pattern.sub(r"\\\\" + cmd, text)

    # 3. Inside matrix environments, ensure row breaks are \\\\ in JSON (\\ in parsed TeX)
    # E.g. \\begin{pmatrix} 2 & 1 \\ 0 & 3 \\end{pmatrix} -> \\\\ inside matrix
    def fix_matrix_rows(m):
        env = m.group(0)
        # replace any single \\ followed by whitespace and numbers/letters with \\\\
        return re.sub(r"(?<!\\)\\\\(?!\\)(?=\s*[-0-9a-zA-Z\\&])", r"\\\\\\\\", env)

    text = re.sub(r"\\\\begin\{(?:pmatrix|vmatrix|bmatrix|matrix)\}.*?\\\\end\{(?:pmatrix|vmatrix|bmatrix|matrix)\}", fix_matrix_rows, text)

    # 4. Verify by parsing with json.loads
    data = json.loads(text)
    
    # 5. Check parsed strings for any illegal control characters
    bad = []
    for idx, q in enumerate(data.get("pool", [])):
        for fld in ["text", "sol", "choices"]:
            val = q.get(fld)
            if isinstance(val, list):
                val = " ".join(val)
            if not val:
                continue
            for ch, name in [("\x08", r"\b"), ("\x0c", r"\f"), ("\x07", r"\a"), ("\x0b", r"\v"), ("\r", r"\r"), ("\t", r"\t")]:
                if ch in val:
                    bad.append((idx, fld, name, repr(val[:50])))
                    
    if bad:
        print(f"ERROR: {filepath} still has control chars: {bad[:5]}")
        return False
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(text)
        
    print(f"SUCCESS: {filepath} fixed cleanly! Size: {orig_len} -> {len(text)} bytes, 0 control char issues.")
    return True

if __name__ == "__main__":
    tahsili_ok = fix_bank_file("bank-data/tahsili.json")
    qudrat_ok = fix_bank_file("bank-data/qudrat.json")
    if not (tahsili_ok and qudrat_ok):
        exit(1)
