#!/usr/bin/env python3
"""Build 4-Page Standardized Branded Worksheets for ACT, ACT 2, and ACT 2 Level 2 (22 Topics / 44 PDFs).

Ensures:
1. Rendered math via matplotlib mathtext with true baseline alignment.
2. Official ClipSAT logo and branding (clipsat-mark.png, indigo palette, header, copyright footer).
3. Strictly 4 pages in size for each worksheet and answer key.
4. Clean of repeated ideas: 4 distinct sections with 3 progressive questions per section (12 questions total per topic).
5. 100% alignment with official ACT and ACT Subject Test specifications.
6. Synchronized with public/worksheet-data/ for Google Forms export.
"""
import os
import sys
import json
import re
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
TOPICS_DIR = os.path.join(HERE, "topics")
DOWNLOADS_DIR = os.path.join(SITE_ROOT, "public", "downloads")
PUBLIC_WS_DATA_DIR = os.path.join(SITE_ROOT, "public", "worksheet-data")
GENERATE_PY = os.path.join(HERE, "generate.py")

os.environ["MPLCONFIGDIR"] = "/tmp/mpl"

from act_topics_data import ACT_TOPICS
from act2_act2l2_topics_data import ACT2_TOPICS, ACT2L2_TOPICS

ALL_ACT_TOPICS = ACT_TOPICS + ACT2_TOPICS + ACT2L2_TOPICS

def get_pdf_pages(pdf_path):
    if not os.path.exists(pdf_path):
        return 0
    with open(pdf_path, "rb") as f:
        data = f.read()
    return len(re.findall(rb"/Type\s*/Page\b", data))

def main():
    print("=" * 75)
    print(f"ClipSAT: Compiling {len(ALL_ACT_TOPICS)} ACT Suite 4-Page Worksheets (44 PDFs)")
    print("=" * 75)

    all_pass = True
    manifests_by_track = {"act": [], "act2": [], "act2l2": []}

    for topic in ALL_ACT_TOPICS:
        track = topic["track"]
        num = topic["num"]
        slug = topic["slug"]
        title = topic["title"]
        unit = int(num.split('.')[0])

        # 1. Save JSON to tools/worksheet_gen/topics/<track>/
        track_topics_dir = os.path.join(TOPICS_DIR, track)
        os.makedirs(track_topics_dir, exist_ok=True)
        json_filename = f"{num}-{slug}.json"
        json_path = os.path.join(track_topics_dir, json_filename)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(topic, f, ensure_ascii=False, indent=2)

        # 2. Compile via generate.py
        track_downloads_dir = os.path.join(DOWNLOADS_DIR, track)
        os.makedirs(track_downloads_dir, exist_ok=True)

        cmd = [
            "./.venv/bin/python3",
            GENERATE_PY,
            json_path,
            "--out", DOWNLOADS_DIR
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, env=dict(os.environ, MPLCONFIGDIR="/tmp/mpl"))
        if res.returncode != 0:
            print(f"❌ Error compiling {track} {num} ({title}):")
            print(res.stderr)
            all_pass = False
            continue

        # 3. Check page counts
        ws_pdf = os.path.join(track_downloads_dir, f"{num}-{slug}-worksheet.pdf")
        ak_pdf = os.path.join(track_downloads_dir, f"{num}-{slug}-answerkey.pdf")

        ws_pages = get_pdf_pages(ws_pdf)
        ak_pages = get_pdf_pages(ak_pdf)

        status_icon = "✓" if (ws_pages == 4 and ak_pages == 4) else "⚠"
        print(f"  {status_icon} [{track.upper()}] {num} {title[:32]:32} -> WS: {ws_pages} pages, AK: {ak_pages} pages")
        if ws_pages != 4 or ak_pages != 4:
            print(f"    WARNING: {track} {num} page count is WS={ws_pages}, AK={ak_pages} (expected 4 each)!")
            all_pass = False

        # 4. Sync clean JSON to public/worksheet-data/<track>/<num>.json
        public_track_dir = os.path.join(PUBLIC_WS_DATA_DIR, track)
        os.makedirs(public_track_dir, exist_ok=True)
        public_json_path = os.path.join(public_track_dir, f"{num}.json")
        with open(public_json_path, "w", encoding="utf-8") as f:
            json.dump(topic, f, ensure_ascii=False, indent=2)

        # 5. Add to manifest
        manifests_by_track[track].append({
            "unit": unit,
            "num": num,
            "lang": "en",
            "title": title,
            "sub": None,
            "worksheet": f"{num}-{slug}-worksheet.pdf",
            "answerkey": f"{num}-{slug}-answerkey.pdf"
        })

    # Save manifests
    for track, manifest in manifests_by_track.items():
        mf_path = os.path.join(DOWNLOADS_DIR, track, "manifest.json")
        with open(mf_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)
        print(f"✓ Updated {mf_path} ({len(manifest)} topics)")

    print("=" * 75)
    if all_pass:
        print("🏆 SUCCESS: All 22 ACT suite worksheets compiled with exactly 4 pages each!")
    else:
        print("Note: Review any non-4 page warnings above.")
    print("=" * 75)

if __name__ == "__main__":
    main()
