#!/usr/bin/env python3
import os
import re

target = os.path.join(os.path.dirname(__file__), "..", "..", "tools", "worksheet_gen", "build_sat_4page_worksheets.py")
target = os.path.abspath(target)

with open(target, "r", encoding="utf-8") as f:
    s = f.read()

# Replace any $\...dollars$ or \dollars patterns
s = s.replace(r"$\12 dollars$", "12 dollars")
s = s.replace(r"$\8 dollars$", "8 dollars")
s = s.replace(r"$\1,560 dollars$", "1,560 dollars")
s = s.replace(r"$\65 dollars$", "65 dollars")
s = s.replace(r"$\45 dollars$", "45 dollars")
s = s.replace(r"$\290 dollars$", "290 dollars")
s = s.replace(r"$\30 dollars$", "30 dollars")
s = s.replace(r"$\0.08 dollars$", "0.08 dollars")
s = s.replace(r"$\54 dollars$", "54 dollars")
s = s.replace(r"$\1,500 dollars$", "1,500 dollars")
s = s.replace(r"$\8 dollars0$", "$80$")
s = s.replace(r"$\8 dollars4$", "$84$")
s = s.replace(r"$\2.40 dollars$", "2.40 dollars")
s = s.replace(r"\25 dollars", "25 dollars")
s = s.replace(r"$\15 dollars$", "$15$")
s = s.replace(r"$\20 dollars$", "$20$")
s = s.replace(r"$\25 dollars$", "$25$")
s = s.replace(r"$\30 dollars$", "$30$")

# Generic cleanup of any remaining \numbers dollars
s = re.sub(r'\$\\[0-9.,]+ dollars\$', lambda m: m.group(0).replace('$\\', '').replace('$', ''), s)

with open(target, "w", encoding="utf-8") as f:
    f.write(s)

print("✓ Successfully cleaned currency patterns in build_sat_4page_worksheets.py")
