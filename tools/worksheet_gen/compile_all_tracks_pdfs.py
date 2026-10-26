#!/usr/bin/env python3
"""Compile printable PDF worksheets + answer keys for all 28 ClipSAT tracks,
processing 1 track at a time with parallel worker processes per topic.
"""
import argparse
import glob
import json
import os
import shutil
import subprocess
import sys
from concurrent.futures import ProcessPoolExecutor, as_completed

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
TOPICS_DIR = os.path.join(HERE, "topics")
DOWNLOADS_DIR = os.path.join(SITE_ROOT, "public", "downloads")
GENERATE_PY = os.path.join(HERE, "generate.py")

ALL_TRACKS = [
    "sat", "act", "act2", "act2l2", "est", "est2", "est2l2",
    "qudrat", "tahsili",
    "apab", "apbc", "appc", "apstats",
    "calculus", "precalc", "linalg", "mvc", "odes",
    "aslevel", "a2level", "addmath", "ibhl", "ibsl", "igcse", "mathai",
    "algebra", "alg2", "geo",
]


def _compile_topic_worker(json_path):
    env = dict(os.environ, MPLCONFIGDIR="/tmp/mpl")
    res = subprocess.run(
        [sys.executable, GENERATE_PY, json_path, "--out", DOWNLOADS_DIR],
        capture_output=True,
        text=True,
        env=env,
    )
    if res.returncode != 0:
        raise RuntimeError(f"Error compiling {json_path}:\n{res.stderr}")
    return os.path.basename(json_path)


def _write_manifest(track, topic_files):
    manifest = []
    for tf in sorted(topic_files):
        d = json.load(open(tf, encoding="utf-8"))
        num = d["num"]
        slug = d.get("slug") or os.path.basename(tf).split("-", 1)[1].replace("-ar.json", "").replace(".json", "")
        lang = d.get("lang", "ar" if tf.endswith("-ar.json") else "en")
        sfx = "-ar" if lang == "ar" else ""
        base = f"{num}-{slug}{sfx}"
        manifest.append({
            "unit": int(num.split(".")[0]),
            "num": num,
            "lang": lang,
            "title": d["title"],
            "sub": d.get("sub"),
            "worksheet": f"{base}-worksheet.pdf",
            "answerkey": f"{base}-answerkey.pdf",
        })
    manifest.sort(key=lambda r: (
        [int(x) for x in r["num"].split(".")],
        0 if r["lang"] == "en" else 1,
    ))
    mf_path = os.path.join(DOWNLOADS_DIR, track, "manifest.json")
    with open(mf_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    return len(manifest)


def compile_track(track, workers=8):
    topic_files = sorted(glob.glob(os.path.join(TOPICS_DIR, track, "*.json")))
    if not topic_files:
        print(f"No topic files for {track}")
        return 0
    track_dl = os.path.join(DOWNLOADS_DIR, track)
    os.makedirs(track_dl, exist_ok=True)
    for old_pdf in glob.glob(os.path.join(track_dl, "*.pdf")):
        os.remove(old_pdf)

    with ProcessPoolExecutor(max_workers=workers) as ex:
        futs = {ex.submit(_compile_topic_worker, tf): tf for tf in topic_files}
        for fut in as_completed(futs):
            fut.result()

    n_mf = _write_manifest(track, topic_files)
    pdfs = glob.glob(os.path.join(track_dl, "*.pdf"))
    print(f"✓ [{track:10s}] Compiled {len(pdfs):3d} PDFs ({n_mf:2d} topics) + manifest.json", flush=True)
    return len(pdfs)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--track", help="Compile a single track")
    ap.add_argument("--skip-done", action="store_true", help="Skip sat and act if already compiled")
    ap.add_argument("--workers", type=int, default=8)
    args = ap.parse_args()

    tracks = [args.track] if args.track else ALL_TRACKS
    tot_pdfs = 0
    already_done = {
        "sat",
    }
    for t in tracks:
        if args.skip_done and t in already_done:
            print(f"⏭️ [{t:10s}] Already compiled, skipping.", flush=True)
            tot_pdfs += len(glob.glob(os.path.join(DOWNLOADS_DIR, t, "*.pdf")))
            continue
        tot_pdfs += compile_track(t, workers=args.workers)
    print(f"\n🎉 Total printable PDFs ready across {len(tracks)} track(s): {tot_pdfs} PDFs!")


if __name__ == "__main__":
    main()
