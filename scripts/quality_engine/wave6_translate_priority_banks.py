#!/usr/bin/env python3
"""
scripts/quality_engine/wave6_translate_priority_banks.py
Wave 6 (W6-C): Phase 5 — AST-Verified Arabic Translation Rollout on Priority Non-MENA Tracks

Rules:
  - Uses ONLY `translate_math_prose_ar()` + strict AST validation (`extract_numbers`,
    `extract_math_tokens`, zero mid-word corruptions, zero leftover >=4-letter English prose words,
    zero Arabic inside LaTeX `\\text{...}`).
  - NEVER calls `synthesize_idiomatic_msa()` or `ensure_pure_msa()` (zero boilerplate!).
  - Never overwrites existing valid Arabic translations.
  - Supports `--no-hints-for track1,track2` if budget calibration needs to trim `hints_ar`.
"""

from __future__ import annotations
import argparse
import glob
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'quality_engine'))

import ast_arabic_translator as aat  # noqa: E402

BANK_DIR = os.path.join(ROOT, 'bank-data')
DEFAULT_TARGETS = [
    'olympiad', 'act', 'act2', 'act2l2', 'edexcel',
    'addmath', 'algebra', 'alg2', 'geo', 'precalc',
]

BOILERPLATE_AR_RE = re.compile(
    r'في مسألة رياضية ضمن|بتطبيق القوانين الرياضية المعتمدة|إرشاد منهجي|بالاعتماد على العلاقات الرياضية|القيمة المطابقة'
)
BARE_ENV_RE = re.compile(r'\\begin\{[A-Za-z*]+\}[\s\S]*?\\end\{[A-Za-z*]+\}')
AR_IN_TEXT_RE = re.compile(r'\\text\{[^{}]*[\u0600-\u06FF]')


def _is_pure_math_or_num(s: str) -> bool:
    plain = aat.TAG_RE.sub(' ', aat.MATH_SEG_RE.sub(' ', BARE_ENV_RE.sub(' ', s or '')))
    words = [w for w in re.findall(r'\b[A-Za-z]{2,}\b', plain) if w not in aat.ALLOWED_LATIN_TOKENS]
    return len(words) == 0


def _repair_bilingual_choice(c_en: str) -> str | None:
    if not isinstance(c_en, str) or not c_en.strip():
        return None
    # Strip embedded <span class="en-trans">...</span> when choice already begins with genuine Arabic
    stripped = re.sub(r'<span\s+class="en-trans"[^>]*>[\s\S]*?</span>', '', c_en).strip()
    if aat.AR_CHAR_RE.search(stripped) and not BOILERPLATE_AR_RE.search(stripped) and not aat.leftover_english_words(stripped):
        return aat.fix_arabic_conjunction_spacing(stripped)
    # Handle legacy bare LaTeX math choices like '( dfrac{sqrt{3}}{3} )'
    if '\\(' not in c_en and ('sqrt{' in c_en or 'dfrac{' in c_en or 'frac{' in c_en):
        inner = c_en.strip()
        if inner.startswith('(') and inner.endswith(')') and inner[1:-1].count('(') == inner[1:-1].count(')'):
            inner = inner[1:-1].strip()
        inner = re.sub(r'(?<![\\A-Za-z])(dfrac|frac|sqrt|pi|theta|sin|cos|tan)\b', r'\\\1', inner)
        return f'\\( {inner} \\)'
    return translate_clean(c_en, allow_pure_math=True)


def translate_clean(en_str: str, allow_pure_math: bool = False) -> str | None:
    if not isinstance(en_str, str) or not en_str.strip():
        return None
    if allow_pure_math and _is_pure_math_or_num(en_str):
        return aat.fix_arabic_conjunction_spacing(aat.peel_outer_arabic_text(en_str.strip()))

    tr = aat.translate_math_prose_ar(en_str)
    tr = aat.peel_outer_arabic_text(tr)
    if not tr or not tr.strip():
        return None
    if BOILERPLATE_AR_RE.search(tr):
        return None
    if not aat.AR_CHAR_RE.search(tr):
        return None

    tr_chk = BARE_ENV_RE.sub(' ', tr)
    if aat.has_midword_corruption(tr_chk):
        return None
    if aat.extract_numbers(en_str) != aat.extract_numbers(tr):
        return None
    if aat.extract_math_tokens(en_str) != aat.extract_math_tokens(tr):
        return None
    if aat.leftover_english_words(tr_chk):
        return None
    if AR_IN_TEXT_RE.search(tr):
        return None
    return tr


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--tracks', default=','.join(DEFAULT_TARGETS))
    parser.add_argument('--no-hints-for', default='')
    parser.add_argument('--repair-boilerplate-choices', action='store_true')
    args = parser.parse_args()

    repaired_boil_choices = 0
    if args.repair_boilerplate_choices:
        for fp in sorted(glob.glob(os.path.join(BANK_DIR, '*.json'))):
            with open(fp, 'r', encoding='utf-8') as f:
                bank = json.load(f)
            changed = False
            for q in bank.get('pool') or []:
                ch = q.get('choices')
                ch_ar = q.get('choices_ar')
                if isinstance(ch, list) and isinstance(ch_ar, list) and len(ch) == len(ch_ar):
                    for ci, (c_en, c_ar) in enumerate(zip(ch, ch_ar)):
                        if c_ar and BOILERPLATE_AR_RE.search(c_ar):
                            fixed = _repair_bilingual_choice(c_en)
                            if fixed and not BOILERPLATE_AR_RE.search(fixed):
                                ch_ar[ci] = fixed
                                repaired_boil_choices += 1
                                changed = True
            if changed:
                with open(fp, 'w', encoding='utf-8') as f:
                    json.dump(bank, f, ensure_ascii=False, indent=2)
                    f.write('\n')
        print(f'Repaired {repaired_boil_choices} legacy boilerplate choices_ar string(s).')
        return 0

    targets = [t.strip() for t in args.tracks.split(',') if t.strip()]
    no_hints_tracks = {t.strip() for t in args.no_hints_for.split(',') if t.strip()}

    total_stems = 0
    total_sols = 0
    total_choices = 0
    total_hints = 0

    for track in targets:
        fp = os.path.join(BANK_DIR, f'{track}.json')
        if not os.path.exists(fp):
            print(f'  ! skipping missing {fp}')
            continue
        with open(fp, 'r', encoding='utf-8') as f:
            bank = json.load(f)

        t_stems = t_sols = t_choices = t_hints = 0
        changed = False

        for q in bank.get('pool') or []:
            if not (q.get('text_ar') or '').strip():
                tr_text = translate_clean(q.get('text', ''), allow_pure_math=False)
                if not tr_text:
                    continue
                q['text_ar'] = tr_text
                t_stems += 1
                changed = True

            # Populate sol_ar, choices_ar, hints_ar only if text_ar exists & field is missing
            if (q.get('text_ar') or '').strip():
                if not (q.get('sol_ar') or '').strip() and (q.get('sol') or '').strip():
                    tr_sol = translate_clean(q['sol'], allow_pure_math=False)
                    if tr_sol:
                        q['sol_ar'] = tr_sol
                        t_sols += 1
                        changed = True

                ch = q.get('choices')
                ch_ar = q.get('choices_ar')
                if isinstance(ch, list) and ch and (not isinstance(ch_ar, list) or len(ch_ar) != len(ch)):
                    translated_ch = [translate_clean(c, allow_pure_math=True) for c in ch]
                    if all(c is not None for c in translated_ch):
                        q['choices_ar'] = translated_ch
                        t_choices += 1
                        changed = True

                hints = q.get('hints')
                hints_ar = q.get('hints_ar')
                if track not in no_hints_tracks:
                    if isinstance(hints, list) and hints and (not isinstance(hints_ar, list) or len(hints_ar) != len(hints)):
                        translated_h = [translate_clean(h, allow_pure_math=False) for h in hints]
                        if all(h is not None for h in translated_h):
                            q['hints_ar'] = translated_h
                            t_hints += 1
                            changed = True
                elif 'hints_ar' in q and len(q.get('text_ar') or '') > 0 and track in no_hints_tracks:
                    # Only trim newly added hints if explicit budget flag passed on non-MENA track
                    pass

        if changed:
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(bank, f, ensure_ascii=False, indent=2)
                f.write('\n')

        total_stems += t_stems
        total_sols += t_sols
        total_choices += t_choices
        total_hints += t_hints
        print(
            f'  {track:10s}: +{t_stems:4d} text_ar, +{t_choices:4d} choices_ar, '
            f'+{t_sols:4d} sol_ar, +{t_hints:4d} hints_ar'
        )

    # Global sanity summary across all 31 banks
    bilingual_total = 0
    grand_total = 0
    for fp in sorted(glob.glob(os.path.join(BANK_DIR, '*.json'))):
        pool = json.load(open(fp, 'r', encoding='utf-8')).get('pool') or []
        grand_total += len(pool)
        bilingual_total += sum(1 for q in pool if (q.get('text_ar') or '').strip())
    print(
        f'Wave 6 Priority Arabic Rollout complete: +{total_stems} text_ar, +{total_choices} choices_ar, '
        f'+{total_sols} sol_ar, +{total_hints} hints_ar | '
        f'Global bilingual items: {bilingual_total:,}/{grand_total:,} ({100.0 * bilingual_total / max(1, grand_total):.1f}%)'
    )
    return 0


if __name__ == '__main__':
    sys.exit(main())
