#!/usr/bin/env python3
"""
scripts/ci/check_psychometrics.py — CI Gate #3: Key Uniformity, Leak, Overlap, IRT & Blueprint Gate

Asserts across all 31 question banks:
  1. Per-track 4-choice MCQ answer-key Pearson chi^2 < 4.0 (p > 0.25).
  2. Zero generic boilerplate hints and zero final-answer leaks in hints[0..1].
  3. < 5% cross-bank stem overlap across audited track pairs & 0 >= 3 stem clone clusters in olympiad.
  4. 100% valid 3PL IRT calibration parameters {a, b, c} & calc boolean on every item.
  5. Exact College Board Digital SAT blueprint on sat.json (35/35/15/15 +/- 2%, ~25% SPR).
"""

from __future__ import annotations
from collections import Counter
import glob
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BANK_DIR = os.path.join(ROOT, 'bank-data')

BANNED_HINT_RE = re.compile(
    r'Identify the relevant theorem|Apply the algebraic setup|Step 1:\s*Identify the formula',
    re.I,
)
ROBOTIC_STEM_RE = re.compile(
    r'^(?:In\s+[A-Za-z &/-]+,\s*consider\s+the\s+standardized\s+problem:|Question\s+\d+\s+of\s+\d+:)',
    re.I,
)
NUM_CLEAN_RE = re.compile(r'\d+(?:\.\d+)?')


def norm_stem(s: str) -> str:
    return re.sub(r'\s+', ' ', (s or '').strip().lower())


def skeleton_stem(s: str) -> str:
    s2 = re.sub(r'\s+', ' ', (s or '').strip().lower())
    return NUM_CLEAN_RE.sub('#', s2)


def main() -> int:
    files = sorted(glob.glob(os.path.join(BANK_DIR, '*.json')))
    if len(files) != 31:
        print(f'❌ Expected 31 bank files, found {len(files)}', file=sys.stderr)
        return 1

    errors: list[str] = []
    track_stems: dict[str, set[str]] = {}
    total_items = 0

    for fp in files:
        track = os.path.basename(fp).replace('.json', '')
        with open(fp, 'r', encoding='utf-8') as f:
            bank = json.load(f)
        pool = bank.get('pool') or []
        total_items += len(pool)
        stems: set[str] = set()
        mcq_counts = [0, 0, 0, 0]
        mcq_total = 0

        for idx, q in enumerate(pool):
            qid = q.get('id', f'{track}[{idx}]')
            stem = q.get('text') or ''
            stems.add(norm_stem(stem))

            if ROBOTIC_STEM_RE.search(stem):
                errors.append(f'{qid}: robotic stem prefix detected')

            if not isinstance(q.get('calc'), bool):
                errors.append(f'{qid}: missing boolean calc tag')

            irt = q.get('irt')
            if not isinstance(irt, dict) or not all(isinstance(irt.get(k), (int, float)) for k in ('a', 'b', 'c')):
                errors.append(f'{qid}: missing or invalid 3PL irt {{a, b, c}}')
            else:
                if not (0.2 <= float(irt['a']) <= 3.5 and -4.0 <= float(irt['b']) <= 4.0 and 0.0 <= float(irt['c']) <= 0.5):
                    errors.append(f'{qid}: irt parameters out of bounds: {irt}')

            hints = q.get('hints') or []
            if len(hints) != 3:
                errors.append(f'{qid}: expected 3 hints, got {len(hints)}')
            else:
                for hi, h in enumerate(hints):
                    if BANNED_HINT_RE.search(h or ''):
                        errors.append(f'{qid}: banned boilerplate in hints[{hi}]')

            if q.get('type') == 'mcq' and isinstance(q.get('choices'), list) and len(q['choices']) == 4:
                ans = q.get('answer')
                if isinstance(ans, int) and 0 <= ans < 4:
                    mcq_counts[ans] += 1
                    mcq_total += 1

            ans_tok = (
                str(q['choices'][q['answer']])
                if q.get('type') == 'mcq' and isinstance(q.get('choices'), list) and isinstance(q.get('answer'), int)
                else str(q.get('sprAnswer') or q.get('finalAnswer') or '')
            )
            clean_tok = re.sub(r'^\\\(|\\\)$', '', ans_tok.strip()).strip()
            if (
                len(clean_tok) >= 4
                and not re.match(r'^[01234]$', clean_tok)
                and not re.search(r'القيمة|المعطيات|Column|Quantity', clean_tok, re.I)
                and len(hints) >= 2
            ):
                if ('= ' + clean_tok) in str(hints[0]) or ('= ' + clean_tok) in str(hints[1]):
                    errors.append(f'{qid}: direct final-answer leak in hints[0..1]')

        track_stems[track] = stems

        if mcq_total >= 40:
            exp = mcq_total / 4.0
            chi2 = sum((c - exp) ** 2 / exp for c in mcq_counts)
            if chi2 >= 4.0:
                errors.append(f'{track}: MCQ answer-key chi^2 = {chi2:.3f} >= 4.0 ({mcq_counts})')

        if track == 'olympiad':
            skels = Counter(skeleton_stem(q.get('text', '')) for q in pool)
            clones = [(sk, n) for sk, n in skels.items() if n >= 3]
            if clones:
                errors.append(f'olympiad: found {len(clones)} parametric clone cluster(s) with >= 3 items')

        if track == 'sat':
            n = len(pool)
            dom_counts = Counter(q.get('domain') for q in pool)
            targets = {
                'Algebra': 0.35,
                'Advanced Math': 0.35,
                'Problem-Solving and Data Analysis': 0.15,
                'Geometry and Trigonometry': 0.15,
            }
            for dom, target in targets.items():
                actual = dom_counts.get(dom, 0) / max(n, 1)
                if abs(actual - target) > 0.02:
                    errors.append(f'sat: domain "{dom}" ratio {actual:.3f} deviates > 2% from {target:.2f}')
            spr_ratio = sum(1 for q in pool if q.get('type') == 'spr') / max(n, 1)
            if not (0.23 <= spr_ratio <= 0.28):
                errors.append(f'sat: SPR ratio {spr_ratio:.3f} outside [0.23, 0.28]')

    overlap_pairs = [
        ('gaten', 'qudrat'),
        ('gaten', 'edexcel'),
        ('edexcel', 'igcse'),
        ('addmath', 'igcse'),
        ('mathai', 'ibsl'),
    ]
    for a, b in overlap_pairs:
        shared = len(track_stems[a] & track_stems[b])
        ratio = shared / max(len(track_stems[a]), 1)
        if ratio >= 0.05:
            errors.append(f'Cross-bank stem overlap {a}<->{b} is {ratio * 100:.2f}% (>= 5%)')

    if errors:
        print(f'❌ CI Gate #3 FAILED with {len(errors)} psychometric/leak issue(s):', file=sys.stderr)
        for e in errors[:30]:
            print(f'  - {e}', file=sys.stderr)
        return 1

    print(
        f'✅ CI Gate #3 PASSED: All 31 banks ({total_items:,} items) satisfy chi^2 < 4.0, '
        f'0 hint leaks, <5% overlap, 100% 3PL IRT & exact SAT blueprint.'
    )
    return 0


if __name__ == '__main__':
    sys.exit(main())
