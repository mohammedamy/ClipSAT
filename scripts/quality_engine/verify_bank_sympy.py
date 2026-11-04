#!/usr/bin/env python3
"""
scripts/quality_engine/verify_bank_sympy.py — Deterministic SymPy & Schema v2 Verification Gate (WP-33 / CI Gate #2)

Verifies across all 31 bank-data/*.json files (or --track <slug>):
  1. Zero legacy shadow fields ('correct', 'ans', etc.) and zero duplicate item IDs.
  2. Mutually exclusive symbolic & string values across all MCQ choices (0 equal distractors).
  3. Zero rubber-stamped `sympy_verified: true` flags without an executable `sympy_cert`.
  4. 100% of active items carry either:
       - an executable `sympy_cert` whose `EXPECTED` value equals the keyed target symbolically via SymPy, OR
       - a valid SHA-256 `educator_review_hash` bound to the canonical item stem, answer/parts, and solution.
  5. Structured multi-part items (`type` in {'structured', 'proof'}) have consistent subpart mark totals and valid markScheme rubrics.
"""

from __future__ import annotations
import argparse
import glob
import hashlib
import json
import os
import re
import sys
import warnings

warnings.filterwarnings('ignore', category=SyntaxWarning)

import sympy as sp

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from latex_sympy import expressions_equal, latex_to_sympy, strip_delims

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BANK_DIR = os.path.join(ROOT, 'bank-data')

FORBIDDEN_SHADOW_KEYS = (
    'correct', 'ans', 'q', 'fig', 'solution', 'exp', 'expl', 'explanation', 'diff', 'ch', 'topic', 'letters'
)
SAFE_BUILTINS = {'sum': sum, 'range': range, 'min': min, 'max': max, 'abs': abs, 'len': len, 'int': int}


def norm_choice_str(s: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'\\[()[\]]', '', str(s or ''))).strip()


def compute_educator_hash(item: dict) -> str:
    target_sig = (
        json.dumps(item.get('parts'), ensure_ascii=False, sort_keys=True)
        if item.get('type') in ('structured', 'proof')
        else (
            item.get('sprAnswer')
            if item.get('type') == 'spr'
            else json.dumps([item.get('choices'), item.get('answer')], ensure_ascii=False)
        )
    )
    payload = f"clipsat-v2|{item['id']}|{item['type']}|{item['text']}|{target_sig}|{item['sol']}"
    return hashlib.sha256(payload.encode('utf-8')).hexdigest()


def verify_item(item: dict) -> list[str]:
    errs: list[str] = []
    qid = item.get('id', '<missing-id>')
    qtype = item.get('type')

    # 1. Forbid legacy shadow keys
    for forbidden in FORBIDDEN_SHADOW_KEYS:
        if forbidden in item:
            errs.append(f"{qid}: legacy shadow key '{forbidden}' present")

    # 2. Enforce mutually exclusive symbolic & string values across MCQ choices
    if qtype == 'mcq':
        choices = item.get('choices') or []
        ans_idx = item.get('answer')
        if not isinstance(ans_idx, int) or ans_idx < 0 or ans_idx >= len(choices):
            errs.append(f"{qid}: invalid MCQ answer index {ans_idx!r} for {len(choices)} choices")
        seen_norm: dict[str, int] = {}
        vals: list[tuple[int, sp.Expr]] = []
        for idx, ch in enumerate(choices):
            nc = norm_choice_str(ch)
            if nc in seen_norm:
                errs.append(f"{qid}: whitespace/delimiter-identical choices[{seen_norm[nc]}] == choices[{idx}] ({ch!r})")
            else:
                seen_norm[nc] = idx
            expr = latex_to_sympy(ch)
            if expr is not None:
                vals.append((idx, expr))
        for i in range(len(vals)):
            for j in range(i + 1, len(vals)):
                if expressions_equal(vals[i][1], vals[j][1]):
                    errs.append(
                        f"{qid}: algebraically equal distractors choices[{vals[i][0]}] == choices[{vals[j][0]}] ({vals[i][1]})"
                    )

    # 3. Validate structured / proof multi-part mark totals
    if qtype in ('structured', 'proof'):
        parts = item.get('parts')
        if not isinstance(parts, list) or len(parts) == 0:
            errs.append(f"{qid}: structured/proof item missing non-empty parts[]")
        else:
            part_marks = sum(int(pt.get('marks', 0)) for pt in parts)
            if item.get('marks') is not None and int(item['marks']) != part_marks:
                errs.append(f"{qid}: item.marks={item.get('marks')} != sum(parts.marks)={part_marks}")
            for pt in parts:
                ms = pt.get('markScheme') or []
                ms_sum = sum(int(m.get('marks', 0)) for m in ms)
                if ms and ms_sum != int(pt.get('marks', 0)):
                    errs.append(f"{qid} {pt.get('label')}: part.marks={pt.get('marks')} != sum(markScheme)={ms_sum}")

    # 4. Forbid rubber-stamped sympy_verified without executable sympy_cert
    if item.get('sympy_verified') and not item.get('sympy_cert'):
        errs.append(f"{qid}: sympy_verified=True without executable sympy_cert")

    # 5. Execute stored SymPy certificate OR verify signed SHA-256 educator_review_hash
    has_cert = bool(item.get('sympy_cert'))
    has_hash = bool(item.get('educator_review_hash'))
    if not has_cert and not has_hash:
        errs.append(f"{qid}: missing both sympy_cert and educator_review_hash")
        return errs

    if has_cert:
        try:
            ns: dict = {'sp': sp}
            exec(compile(item['sympy_cert'], qid, 'exec'), {'__builtins__': SAFE_BUILTINS}, ns)
            if 'EXPECTED' not in ns:
                errs.append(f"{qid}: sympy_cert did not assign EXPECTED")
            else:
                expected = sp.sympify(ns['EXPECTED'])
                keyed_raw = (
                    item.get('sprAnswer')
                    if qtype == 'spr'
                    else (item['choices'][item['answer']] if qtype == 'mcq' else None)
                )
                keyed_expr = latex_to_sympy(keyed_raw) if keyed_raw is not None else None
                if keyed_expr is None:
                    errs.append(f"{qid}: unable to parse keyed answer {keyed_raw!r} for sympy_cert check")
                elif not expressions_equal(expected, keyed_expr):
                    errs.append(f"{qid}: SymPy EXPECTED={expected} != keyed={keyed_raw!r} ({keyed_expr})")
        except Exception as exc:
            errs.append(f"{qid}: sympy_cert execution error: {exc}")

    if has_hash:
        expected_hash = compute_educator_hash(item)
        if item['educator_review_hash'] != expected_hash:
            errs.append(f"{qid}: educator_review_hash mismatch (item modified without re-verification)")

    return errs


def main() -> int:
    parser = argparse.ArgumentParser(description='ClipSAT Deterministic SymPy & Schema v2 Bank Verifier')
    parser.add_argument('--all', action='store_true', help='Verify all 31 question banks')
    parser.add_argument('--track', type=str, default=None, help='Verify a single track slug (e.g. sat, apbc)')
    args = parser.parse_args()

    if args.track:
        files = [os.path.join(BANK_DIR, f'{args.track}.json')]
    else:
        files = sorted(glob.glob(os.path.join(BANK_DIR, '*.json')))

    if not files:
        print('No bank files matched.', file=sys.stderr)
        return 1

    all_errors: list[str] = []
    seen_ids: set[str] = set()
    total_items = 0
    cert_items = 0
    hash_items = 0

    for fp in files:
        if not os.path.exists(fp):
            all_errors.append(f'Missing bank file: {fp}')
            continue
        with open(fp, 'r', encoding='utf-8') as f:
            bank = json.load(f)
        if bank.get('quarantined') is True:
            continue
        pool = bank.get('pool') or []
        for item in pool:
            total_items += 1
            qid = item.get('id')
            if not qid or qid in seen_ids:
                all_errors.append(f'{os.path.basename(fp)}: duplicate or missing item id {qid!r}')
            else:
                seen_ids.add(qid)
            if item.get('sympy_cert'):
                cert_items += 1
            elif item.get('educator_review_hash'):
                hash_items += 1
            errs = verify_item(item)
            if errs:
                all_errors.extend(errs)

    if all_errors:
        print(f'❌ SymPy verification failed with {len(all_errors)} error(s):', file=sys.stderr)
        for e in all_errors[:40]:
            print(f'  - {e}', file=sys.stderr)
        if len(all_errors) > 40:
            print(f'  ... and {len(all_errors) - 40} more.', file=sys.stderr)
        return 1

    print(
        f'✅ SymPy Symbolic Math Gate PASSED: {total_items:,} active items verified '
        f'({cert_items:,} executable sympy_cert + {hash_items:,} signed educator_review_hash; 0 equal distractors, 0 shadow keys).'
    )
    return 0


if __name__ == '__main__':
    sys.exit(main())
