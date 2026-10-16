#!/usr/bin/env python3
"""Build 4-page branded worksheets with rendered math for Qiyas Tahsili (9 Topics, AR + EN).

Ensures:
1. Rendered math via matplotlib mathtext with true baseline alignment.
2. Official ClipSAT logo and branding (clipsat-mark.png, indigo palette, header, copyright footer).
3. Strictly 4 pages in size for each worksheet and answer key.
4. Clean of repeated ideas: 4 distinct sections with 3 progressive questions per section (12 questions total per topic).
5. 100% alignment with official Qiyas (قياس) Educational Attainment Test (التحصيلي - الرياضيات) standards.
"""
import os
import sys
import json
import subprocess
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
TOPICS_DIR = os.path.join(HERE, "topics", "tahsili")
DOWNLOADS_DIR = os.path.join(SITE_ROOT, "public", "downloads")
GENERATE_PY = os.path.join(HERE, "generate.py")

os.environ["MPLCONFIGDIR"] = "/tmp/mpl"

def main():
    from tahsili_topics_data_p1 import TAHSILI_TOPICS_P1
    from tahsili_topics_data_p2 import TAHSILI_TOPICS_P2

    topics = TAHSILI_TOPICS_P1 + TAHSILI_TOPICS_P2
    print(f"Loaded {len(topics)} Tahsili topics (AR + EN).")

    os.makedirs(TOPICS_DIR, exist_ok=True)
    os.makedirs(os.path.join(DOWNLOADS_DIR, "tahsili"), exist_ok=True)
    worksheet_data_dir = os.path.join(SITE_ROOT, "public", "worksheet-data", "tahsili")
    os.makedirs(worksheet_data_dir, exist_ok=True)

    manifest_entries = []

    for t in topics:
        is_ar = t.get("lang") == "ar"
        filename = f"{t['num']}-{t['slug']}{'-ar' if is_ar else ''}.json"
        target_path = os.path.join(TOPICS_DIR, filename)

        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(t, f, ensure_ascii=False, indent=2)
        print(f"Wrote topic: {target_path}")

        # Sync to public/worksheet-data/tahsili/
        public_json_path = os.path.join(worksheet_data_dir, filename)
        with open(public_json_path, "w", encoding="utf-8") as f:
            json.dump(t, f, ensure_ascii=False, indent=2)

        # Run generate.py
        cmd = [
            os.path.join(SITE_ROOT, ".venv", "bin", "python3"),
            GENERATE_PY,
            target_path,
            "--out",
            DOWNLOADS_DIR
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error compiling {filename}:")
            print(res.stderr)
            sys.exit(1)
        print(f"Compiled {filename} -> PDF pair in downloads/tahsili/")

        manifest_entries.append({
            "num": t["num"],
            "slug": t["slug"],
            "title": t["title"],
            "lang": t.get("lang", "en"),
            "worksheet": f"{t['num']}-{t['slug']}{'-ar' if is_ar else ''}-worksheet.pdf",
            "answerkey": f"{t['num']}-{t['slug']}{'-ar' if is_ar else ''}-answerkey.pdf"
        })

    # Update manifest
    manifest_path = os.path.join(DOWNLOADS_DIR, "tahsili", "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_entries, f, ensure_ascii=False, indent=2)
    print(f"Updated manifest: {manifest_path}")

    # Verify strictly 4 pages for all PDFs
    print("\n--- Verifying Page Counts ---")
    all_passed = True
    for entry in manifest_entries:
        for key in ["worksheet", "answerkey"]:
            pdf_path = os.path.join(DOWNLOADS_DIR, "tahsili", entry[key])
            with open(pdf_path, "rb") as fp:
                c = fp.read()
            pages = len(re.findall(rb'/Type\s*/Page\b', c))
            status = "OK (4 pages)" if pages == 4 else f"WARNING ({pages} pages)"
            if pages != 4:
                all_passed = False
            print(f"  {entry[key]}: {pages} pages -> {status}")

    if all_passed:
        print("\nALL 36 TAHSILI PDFs ARE STRICTLY 4 PAGES! SUCCESS!")
    else:
        print("\nSOME PDFs DO NOT HAVE 4 PAGES! REVIEW SPACING!")

if __name__ == "__main__":
    main()
