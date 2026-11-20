#!/usr/bin/env python3
"""
scripts/quality_engine/wave6_reconcile_taxonomy_and_figs.py
Wave 6 (W6-A + W6-B):
  1. Reconciles subskill_id <-> topic_id across all 31 question banks (`bank-data/*.json`)
     so every item has a non-empty `subskill_id` starting with `{topic_id}-`.
  2. Upgrades safe explicit-equation `y = f(x)` fn figure labels to show the actual
     plotted equation while strictly preserving `y = f(x)` on slope/equation-finding or
     unknown-parameter problems (zero answer leakage).
"""

from __future__ import annotations
import glob
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BANK_DIR = os.path.join(ROOT, 'bank-data')

DIFF_SLOT = {'easy': '1', 'medium': '2', 'hard': '3'}

ASKS_EQ_RE = re.compile(
    r'slope|equation of|ميل المستقيم|معادلة المستقيم|which (?:function|equation)|'
    r'represents the graph|shown above is the graph of|matches the graph|'
    r'write an equation|find the (?:linear|quadratic) function|constants?\b|ثابت',
    re.I,
)
EXPLICIT_FN_RE = re.compile(r'(?:f|g|h|p|q)\(x\)\s*=|y\s*=\s*[^fghpq\s]')


def format_fn_label(fn_expr: str) -> str | None:
    """Format a normalized JS-style polynomial/function expression into `y = ...`."""
    if not fn_expr or not isinstance(fn_expr, str):
        return None
    s = fn_expr.strip()
    # Unwrap parenthesized signed numeric coefficients before *x: (-5)*x -> -5x, (1)*x -> 1x
    s = re.sub(r'\(\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*\*', r'\1*', s)
    # Remove explicit multiplication between coefficient and variable/paren
    s = re.sub(r'(\d)\s*\*\s*(?=[A-Za-z(])', r'\1', s)
    # Unwrap parenthesized signed numeric terms at term boundaries: + (-5) -> - 5, + (14) -> + 14
    s = re.sub(r'\+\s*\(\s*-(\d+(?:\.\d+)?)\s*\)', r'- \1', s)
    s = re.sub(r'\+\s*\(\s*\+?(\d+(?:\.\d+)?)\s*\)', r'+ \1', s)
    # Collapse double signs
    s = re.sub(r'\+\s*-\s*', '- ', s)
    s = re.sub(r'-\s*-\s*', '+ ', s)
    # Simplify unit coefficients 1x -> x, -1x -> -x (without breaking 21x)
    s = re.sub(r'(?<![0-9.])1(?=[A-Za-z(])', '', s)
    # Remove + 0 or - 0 trailing constants
    s = re.sub(r'\s*[+-]\s*0(?:\.0+)?\s*$', '', s)
    # Normalize spacing around binary + and - (preserving leading unary -)
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r'(?<=[A-Za-z0-9)])\s*([+-])\s*(?=[A-Za-z0-9(])', r' \1 ', s)
    s = re.sub(r'^\+\s*', '', s)
    s = re.sub(r'\s+', ' ', s).strip()

    if not s or '*' in s or '+-' in s or '-+' in s:
        return None
    if s.count('(') != s.count(')'):
        return None
    return f'y = {s}'


def main() -> int:
    files = sorted(glob.glob(os.path.join(BANK_DIR, '*.json')))
    reconciled_mismatch = 0
    reconciled_missing = 0
    figs_upgraded = 0
    figs_skipped_leak = 0
    total_items = 0

    for fp in files:
        with open(fp, 'r', encoding='utf-8') as f:
            bank = json.load(f)
        changed = False

        for q in bank.get('pool') or []:
            total_items += 1
            tid = q.get('topic_id')
            sid = q.get('subskill_id') or ''
            if tid and (not sid or not sid.startswith(f'{tid}-')):
                if not sid:
                    reconciled_missing += 1
                else:
                    reconciled_mismatch += 1
                qtype = q.get('type', 'mcq')
                if qtype in ('frq', 'structured', 'proof'):
                    q['subskill_id'] = f'{tid}-frq'
                else:
                    m_dig = re.search(r'-([1-9])$', sid)
                    slot = m_dig.group(1) if m_dig else DIFF_SLOT.get(q.get('difficulty', 'medium'), '2')
                    q['subskill_id'] = f'{tid}-{slot}'
                changed = True

            fig = q.get('figure')
            if (
                isinstance(fig, dict)
                and fig.get('type') == 'fn'
                and isinstance(fig.get('fns'), list)
                and len(fig['fns']) == 1
            ):
                fig_str = json.dumps(fig, ensure_ascii=False)
                if 'y = f(x)' in fig_str or 'y=f(x)' in fig_str:
                    stem = q.get('text', '')
                    if EXPLICIT_FN_RE.search(stem) and not ASKS_EQ_RE.search(stem):
                        fn_item = fig['fns'][0]
                        label = fn_item.get('label', '')
                        formatted = format_fn_label(fn_item.get('fn', ''))
                        if formatted and ('y = f(x)' in label or 'y=f(x)' in label):
                            fn_item['label'] = formatted
                            for tfld in ('title', 'title_ar'):
                                tval = fig.get(tfld)
                                if isinstance(tval, str) and ('y = f(x)' in tval or 'y=f(x)' in tval):
                                    fig[tfld] = re.sub(r'y\s*=\s*f\(x\)', formatted, tval)
                            figs_upgraded += 1
                            changed = True
                    else:
                        figs_skipped_leak += 1

        if changed:
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(bank, f, ensure_ascii=False, indent=2)
                f.write('\n')

    # Re-verify invariant across all 31 banks
    verify_mismatch = 0
    verify_missing = 0
    for fp in files:
        with open(fp, 'r', encoding='utf-8') as f:
            bank = json.load(f)
        for q in bank.get('pool') or []:
            tid = q.get('topic_id')
            sid = q.get('subskill_id') or ''
            if tid:
                if not sid:
                    verify_missing += 1
                elif not sid.startswith(f'{tid}-'):
                    verify_mismatch += 1

    print(
        f'Wave 6 Taxonomy & Figures: checked {total_items} items | '
        f'reconciled {reconciled_mismatch} mismatches + {reconciled_missing} missing subskill_ids '
        f'(post-check: {verify_mismatch} mismatches, {verify_missing} missing) | '
        f'upgraded {figs_upgraded} safe y=f(x) figures (kept {figs_skipped_leak} non-leaking generic).'
    )
    if verify_mismatch or verify_missing:
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
