# -*- coding: utf-8 -*-
"""Merge a Bank's 50 MCQs into an existing (EN, AR) worksheet topic JSON pair,
write both back, then invoke generate.py on them. Usage (from tools/worksheet_gen):
  .venv/bin/python3 gen_scripts/merge_build.py qud_ch1 qud_ch1_ar \
      topics/qudrat/1.01-arithmetic-number-sense.json \
      topics/qudrat/1.01-arithmetic-number-sense-ar.json
"""
import sys, os, json, importlib, subprocess

def main():
    en_mod_name, ar_mod_name, en_path, ar_path = sys.argv[1:5]
    sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
    en_mod = importlib.import_module(en_mod_name)
    ar_mod = importlib.import_module(ar_mod_name)
    b = en_mod.b
    b.apply_ar(ar_mod.OV, ar_mod.SECTION_AR)

    with open(en_path, encoding="utf-8") as f:
        en_topic = json.load(f)
    with open(ar_path, encoding="utf-8") as f:
        ar_topic = json.load(f)

    en_topic["sections"].extend(b.to_sections(ar=False, heading_prefix="MCQ — "))
    ar_topic["sections"].extend(b.to_sections(ar=True, heading_prefix="اختيار من متعدد — "))

    with open(en_path, "w", encoding="utf-8") as f:
        json.dump(en_topic, f, ensure_ascii=False, indent=2)
        f.write("\n")
    with open(ar_path, "w", encoding="utf-8") as f:
        json.dump(ar_topic, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Merged 50 MCQs into {en_path} and {ar_path}")

    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    py = os.path.join(here, ".venv", "bin", "python3")
    subprocess.run([py, os.path.join(here, "generate.py"), en_path, ar_path,
                     "--out", os.path.join(here, "..", "..", "public", "downloads"),
                     "--manifest"], check=True, cwd=here)

if __name__ == "__main__":
    main()
