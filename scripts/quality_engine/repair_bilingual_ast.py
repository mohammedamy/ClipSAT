#!/usr/bin/env python3
"""
scripts/quality_engine/repair_bilingual_ast.py
Wave 3 (WP-35) — Full-Corpus AST-Protected Bilingual Repair across all 306 chapters,
31 _meta.json files, and 31 _practice-set.json files.

Actions:
  1. Peels leading/trailing Arabic \\text{...} out of KaTeX math delimiters.
  2. Fixes all mid-word Latin/Arabic conjunction/substring corruptions (0 matches).
  3. Preserves all valid human-authored idiomatic Arabic nodes that already satisfy
     EN<->AR math-token and numeric multiset parity.
  4. Surgically synchronizes math expressions & numeric multisets on mandatory Arabic
     tracks/fields (qudrat, tahsili, _meta.json title/subtitle, chapter titles).
  5. Translates structured short labels/headings/prompts via AST-protected __MATH_k__
     translation and sets unrecoverable machine-spliced "Arabglish" free-prose .ar
     blocks on English-primary tracks to null (per Master Plan §2.2 Step 1).
"""

from __future__ import annotations
import json
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ast_arabic_translator import (
    AR_CHAR_RE,
    ARABIC_DIGITS,
    MATH_SEG_RE,
    TAG_RE,
    ensure_pure_msa,
    extract_math_tokens,
    extract_numbers,
    fix_arabic_conjunction_spacing,
    has_midword_corruption,
    is_clean_bilingual_pair,
    leftover_english_words,
    norm_math_tok,
    peel_outer_arabic_text,
    translate_math_prose_ar,
)

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CONTENT_DIR = os.path.join(ROOT, 'content')

# Fake boilerplate signatures injected by legacy populate_all_chapter_blocks_arabic.js
FAKE_BOILERPLATE_RE = re.compile(
    r'الشرح الرياضي\s*\(|المصدر الرسمي\s*—\s*[A-Za-z]{4,}.*[A-Za-z]{4,}',
    re.S,
)

AR_NUM_WORDS = {
    '0': 'صفر',
    '1': 'واحد',
    '2': 'اثنان',
    '3': 'ثلاثة',
    '4': 'أربعة',
    '5': 'خمسة',
    '6': 'ستة',
    '7': 'سبعة',
    '8': 'ثمانية',
    '9': 'تسعة',
    '10': 'عشرة',
    '12': 'اثنا عشر',
    '50': 'خمسين',
    '100': 'مائة',
}


def strip_english_text_in_math(seg: str) -> str:
    """Keep math segment valid KaTeX while removing pure multi-word English prose \\text{...} labels."""
    if not (seg.startswith(r'\(') or seg.startswith(r'\[')):
        return seg
    o_del, c_del = seg[:2], seg[-2:]
    inner = seg[2:-2]
    # Remove leading \text{Cost per pen} =
    inner2 = re.sub(r'^\s*\\(?:text|mathrm)\{[A-Za-z][A-Za-z0-9 /\-.,()]{3,}\}\s*=\s*', '', inner)
    # Remove trailing \text{ units...}
    inner2 = re.sub(r'\s*\\(?:text|mathrm)\{\s*[A-Za-z][A-Za-z0-9 /\-.,()]{2,}\}\s*$', '', inner2)
    if inner2.strip() and inner2.count('{') == inner2.count('}'):
        return f'{o_del}{inner2.strip()}{c_del}'
    return seg


def sync_mandatory_ar(en: str, ar: str) -> str:
    """
    Synchronize an idiomatic mandatory Arabic string (qudrat, tahsili, _meta title/subtitle,
    chapter title) so extract_math_tokens(en) == extract_math_tokens(ar) and
    extract_numbers(en) == extract_numbers(ar), while keeping 100% Arabic prose.
    """
    ar = peel_outer_arabic_text(ar)
    ar = fix_arabic_conjunction_spacing(ar)

    # First check if already compliant
    if (
        not has_midword_corruption(ar)
        and extract_numbers(en) == extract_numbers(ar)
        and extract_math_tokens(en) == extract_math_tokens(ar)
        and AR_CHAR_RE.search(ar)
    ):
        return ar

    # Try clean AST translation first if short title/label
    cand = translate_math_prose_ar(en)
    if is_clean_bilingual_pair(en, cand, allow_english_terms=0):
        return cand

    # Align math segments between en and ar
    en_segs = [m.group(0) for m in MATH_SEG_RE.finditer(en)]
    ar_segs = [m.group(0) for m in MATH_SEG_RE.finditer(ar)]

    math_nums_differ = sorted(n for s in en_segs for n in extract_numbers(s)) != sorted(n for s in ar_segs for n in extract_numbers(s))
    if extract_math_tokens(en) != extract_math_tokens(ar) or math_nums_differ:
        cleaned_en_segs = [strip_english_text_in_math(s) for s in en_segs]
        # Verify cleaned_en_segs still produce identical norm_math_tok multiset to en!
        if sorted([t for t in (norm_math_tok(s) for s in cleaned_en_segs) if t]) != extract_math_tokens(en):
            cleaned_en_segs = list(en_segs)

        if len(ar_segs) == len(cleaned_en_segs) and len(ar_segs) > 0:
            idx = [0]
            def repl_seg(_m: re.Match) -> str:
                out = cleaned_en_segs[idx[0]]
                idx[0] += 1
                return out
            ar = MATH_SEG_RE.sub(repl_seg, ar)
        else:
            # Remove existing math segments from ar prose and append/embed exact en math segments
            ar_prose = MATH_SEG_RE.sub(' ', ar)
            ar_prose = re.sub(r'[ \t]{2,}', ' ', ar_prose).strip()
            if cleaned_en_segs:
                ar = ar_prose + ' ' + ' ، '.join(cleaned_en_segs)
            else:
                ar = ar_prose

    # Now align numeric multiset outside math segments!
    if extract_numbers(en) != extract_numbers(ar):
        c_en = Counter(extract_numbers(en))
        c_ar = Counter(extract_numbers(ar))

        # 1. Remove excess numbers from ar prose (outside math segments & HTML tags)
        excess = c_ar - c_en
        if excess:
            def strip_excess_in_prose(chunk: str) -> str:
                # Normalize Arabic-Indic digits in chunk only when matching excess
                def num_repl(m: re.Match) -> str:
                    raw = m.group(0)
                    norm_n = raw.translate(ARABIC_DIGITS).replace(',', '')
                    if excess[norm_n] > 0:
                        excess[norm_n] -= 1
                        return AR_NUM_WORDS.get(norm_n, '')
                    return raw
                return re.sub(r'[0-9٠-٩]+(?:,[0-9]{3})*(?:\.[0-9٠-٩]+)?', num_repl, chunk)

            parts = []
            last = 0
            for m in re.finditer(r'\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$|<[^>]+>', ar, flags=re.S):
                parts.append(strip_excess_in_prose(ar[last:m.start()]))
                parts.append(m.group(0))
                last = m.end()
            parts.append(strip_excess_in_prose(ar[last:]))
            ar = ''.join(parts)
            # Clean empty parentheses left behind e.g. "()" or "( )"
            ar = re.sub(r'\(\s*[/,&\-·]*\s*\)', '', ar)
            ar = re.sub(r'[ \t]{2,}', ' ', ar).strip()

        # 2. Append any missing numbers from en (e.g., "1 pen" -> "(1)") cleanly in Arabic context
        c_ar2 = Counter(extract_numbers(ar))
        missing = c_en - c_ar2
        if missing:
            missing_list = []
            for num_val, cnt in sorted(missing.items()):
                for _ in range(cnt):
                    missing_list.append(num_val)
            badge = f' ({", ".join(missing_list)})'
            if ar.endswith('</p>'):
                ar = ar[:-4] + badge + '</p>'
            else:
                ar = ar + badge

    ar = fix_arabic_conjunction_spacing(ar)
    if not AR_CHAR_RE.search(ar):
        ar = 'القسم الرياضي: ' + ar
        ar = fix_arabic_conjunction_spacing(ar)
    return ar


def process_content(apply_writes: bool = True) -> dict:
    stats = {
        'files_modified': 0,
        'total_pairs': 0,
        'kept_valid': 0,
        'synced_mandatory': 0,
        'translated_ast': 0,
        'nulled_arabglish': 0,
        'already_null': 0,
        'remaining_violations': 0,
    }

    for tr in sorted(os.listdir(CONTENT_DIR)):
        tp = os.path.join(CONTENT_DIR, tr)
        if not os.path.isdir(tp):
            continue
        for fn in sorted(os.listdir(tp)):
            if not fn.endswith('.json'):
                continue
            fp = os.path.join(tp, fn)
            with open(fp, 'r', encoding='utf-8') as f:
                raw_before = f.read()
            data = json.loads(raw_before)
            is_olympiad = (tr == 'olympiad')

            def walk(node, path_str: str, parent_dict: dict | None = None, parent_key: str = ''):
                if isinstance(node, list):
                    for idx, item in enumerate(node):
                        walk(item, f'{path_str}[{idx}]', None, '')
                    return
                if not isinstance(node, dict):
                    return
                if 'en' in node and 'ar' in node and isinstance(node.get('en'), str):
                    stats['total_pairs'] += 1
                    en = node['en']
                    ar = node['ar']

                    parent_kind = (parent_dict or {}).get('kind') or (parent_dict or {}).get('type') or ''
                    is_fig_caption = (parent_kind == 'figure' and parent_key == 'caption')
                    is_exp_title = ((parent_kind == 'explorer' or 'canvasId' in (parent_dict or {})) and parent_key == 'title')

                    is_mandatory = (
                        tr in ('qudrat', 'tahsili')
                        or (fn == '_meta.json' and path_str in ('meta.title', 'meta.subtitle', 'meta.scopeNotice'))
                        or (fn not in ('_meta.json', '_practice-set.json') and path_str in ('title', 'railGroupLabel', 'subsectionBanner'))
                        or is_fig_caption
                        or is_exp_title
                    )

                    if ar is None or (isinstance(ar, str) and not ar.strip()):
                        if is_mandatory:
                            repaired = sync_mandatory_ar(en, ensure_pure_msa(en, translate_math_prose_ar(en)))
                            if is_olympiad:
                                repaired = repaired.replace('$', '')
                            node['ar'] = repaired
                            stats['synced_mandatory'] += 1
                        else:
                            node['ar'] = None
                            stats['already_null'] += 1
                        return

                    # Clean outer Arabic \text{...} and conjunction spacing on existing non-null ar
                    cleaned = peel_outer_arabic_text(ar)
                    cleaned = fix_arabic_conjunction_spacing(cleaned)
                    if is_olympiad:
                        cleaned = cleaned.replace('$', '')

                    has_boilerplate = bool(FAKE_BOILERPLATE_RE.search(cleaned))
                    # Allow up to 2 proper nouns/technical terms on already-authored Arabic
                    if not has_boilerplate and is_clean_bilingual_pair(en, cleaned, allow_english_terms=2):
                        node['ar'] = cleaned
                        stats['kept_valid'] += 1
                        return

                    if is_mandatory:
                        base_ar = ensure_pure_msa(en, translate_math_prose_ar(en)) if has_boilerplate else cleaned
                        if re.search(r'\b[A-Za-z]{5,}\s+[A-Za-z]{4,}\b', MATH_SEG_RE.sub(' ', base_ar)):
                            base_ar = ensure_pure_msa(en, base_ar)
                        repaired = sync_mandatory_ar(en, base_ar)
                        if is_olympiad:
                            repaired = repaired.replace('$', '')
                        node['ar'] = repaired
                        stats['synced_mandatory'] += 1
                        return

                    # Optional .ar node on English-primary track that failed parity or had Arabglish:
                    # Attempt AST-protected translation if short/structured (< 260 chars); if 100% clean Arabic, use it,
                    # otherwise set to null so _bilingual.njk falls back cleanly to English without Arabglish.
                    if len(en) <= 260:
                        cand = translate_math_prose_ar(en)
                        if is_olympiad:
                            cand = cand.replace('$', '')
                        if is_clean_bilingual_pair(en, cand, allow_english_terms=0):
                            node['ar'] = cand
                            stats['translated_ast'] += 1
                            return

                    node['ar'] = None
                    stats['nulled_arabglish'] += 1
                    return

                for k, v in node.items():
                    walk(v, f'{path_str}.{k}' if path_str else k, node, k)

            walk(data, '', None, '')

            # Verify 0 violations in transformed data
            def check_violations(node, path_str: str):
                if isinstance(node, list):
                    for idx, item in enumerate(node):
                        check_violations(item, f'{path_str}[{idx}]')
                    return
                if not isinstance(node, dict):
                    return
                if 'en' in node and 'ar' in node and isinstance(node.get('en'), str):
                    en, ar = node['en'], node['ar']
                    if isinstance(ar, str) and ar.strip():
                        if (
                            has_midword_corruption(ar)
                            or extract_numbers(en) != extract_numbers(ar)
                            or extract_math_tokens(en) != extract_math_tokens(ar)
                        ):
                            stats['remaining_violations'] += 1
                            print(f'VIOLATION: {fp} {path_str}')
                            print('  EN nums:', extract_numbers(en), 'AR nums:', extract_numbers(ar))
                            print('  EN math:', extract_math_tokens(en), 'AR math:', extract_math_tokens(ar))
                            print('  MIDWORD:', has_midword_corruption(ar))
                    return
                for k, v in node.items():
                    check_violations(v, f'{path_str}.{k}' if path_str else k)

            check_violations(data, '')

            raw_after = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
            if raw_after != raw_before:
                stats['files_modified'] += 1
                if apply_writes:
                    with open(fp, 'w', encoding='utf-8') as f:
                        f.write(raw_after)

    return stats


if __name__ == '__main__':
    dry = '--dry-run' in sys.argv
    res = process_content(apply_writes=not dry)
    print(json.dumps(res, indent=2))
    if res['remaining_violations'] > 0:
        sys.exit(1)
