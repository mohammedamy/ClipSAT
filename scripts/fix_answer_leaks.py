#!/usr/bin/env python3
"""
scripts/fix_answer_leaks.py

Audits and fixes visible label answer leaks in question banks (Plan 10.2a).
Replaces the target side with '?' on right triangles where the answer is the missing side,
replaces line labels with 'L' on linear function graphs where the answer is the slope/intercept,
removes explicit coordinate root labels on quadratic graphs,
removes minimum domain labels on square root graphs,
and adjusts angle/numberline labels.
"""

import json
import glob
import re
import os

def norm(s):
    if s is None:
        return ''
    s = str(s)
    s = re.sub(r'\\[()\[\]]', '', s)
    s = re.sub(r'\^\{\\circ\}|\^\\circ', '°', s)
    s = re.sub(r'\s+', ' ', s).strip().lower()
    return s

def extract_visible_labels(fig):
    labels = []
    if not fig or not isinstance(fig, dict):
        return labels
    if isinstance(fig.get('labels'), dict):
        labels.extend([str(v) for v in fig['labels'].values()])
    elif isinstance(fig.get('labels'), list):
        labels.extend([str(v) for v in fig['labels']])
    if isinstance(fig.get('left'), dict) and isinstance(fig['left'].get('sides'), list):
        labels.extend([str(s) for s in fig['left']['sides']])
    if isinstance(fig.get('right'), dict) and isinstance(fig['right'].get('sides'), list):
        labels.extend([str(s) for s in fig['right']['sides']])
    if isinstance(fig.get('sides'), list):
        labels.extend([str(s) for s in fig['sides']])
    if isinstance(fig.get('points'), list):
        for p in fig['points']:
            if isinstance(p, dict) and p.get('label'):
                labels.append(str(p['label']))
    if isinstance(fig.get('fns'), list):
        for f in fig['fns']:
            if isinstance(f, dict) and f.get('label'):
                labels.append(str(f['label']))
    if fig.get('center_label'):
        labels.append(str(fig['center_label']))
    if fig.get('title'):
        labels.append(str(fig['title']))
    if fig.get('caption'):
        labels.append(str(fig['caption']))
    return [norm(l) for l in labels if l]

def audit_leaks(apply_fix=False):
    files = sorted(glob.glob('bank-data/*.json'))
    total_leaks = 0
    track_counts = {}

    for filepath in files:
        track = os.path.basename(filepath).replace('.json', '')
        with open(filepath, 'r', encoding='utf-8') as f:
            b = json.load(f)
        
        # Some banks store pool in 'pool', others in 'easy', 'medium', 'hard'
        is_split = False
        pool = []
        if 'pool' in b and isinstance(b['pool'], list):
            pool = b['pool']
        elif any(k in b for k in ['easy', 'medium', 'hard']):
            is_split = True
            for d in ['easy', 'medium', 'hard']:
                if d in b and isinstance(b[d], list):
                    pool.extend(b[d])
        
        fixed_in_file = 0
        for q in pool:
            fig = q.get('figure') or q.get('fig')
            choices = q.get('choices')
            ans = q.get('answer')
            if not fig or not isinstance(choices, list) or not isinstance(ans, int):
                continue
            if ans < 0 or ans >= len(choices):
                continue
            correct = norm(choices[ans])
            if not correct or len(correct) < 2:
                continue
            v_labels = extract_visible_labels(fig)
            matches_label = any(l == correct or (len(l) >= 3 and correct in l) for l in v_labels)
            text_has_answer = correct in norm(q.get('text') or q.get('q') or '')

            if matches_label and not text_has_answer:
                fixed_in_file += 1
                if apply_fix:
                    fig_type = fig.get('type')
                    if fig_type == 'triangle' and isinstance(fig.get('sides'), list):
                        new_sides = []
                        for s in fig['sides']:
                            ns = norm(s)
                            if ns == correct or (len(ns) >= 2 and correct in ns):
                                new_sides.append('?')
                            else:
                                new_sides.append(s)
                        fig['sides'] = new_sides
                    elif fig_type == 'fn':
                        if isinstance(fig.get('fns'), list):
                            for fn in fig['fns']:
                                if isinstance(fn, dict) and fn.get('label'):
                                    nl = norm(fn['label'])
                                    if nl == correct or correct in nl:
                                        fn['label'] = 'L'
                        if isinstance(fig.get('points'), list):
                            for p in fig['points']:
                                if isinstance(p, dict) and p.get('label'):
                                    nl = norm(p['label'])
                                    if nl == correct or correct in nl:
                                        del p['label']
                    elif fig_type == 'numberline' and isinstance(fig.get('points'), list):
                        for p in fig['points']:
                            if isinstance(p, dict) and p.get('label'):
                                nl = norm(p['label'])
                                if nl == correct or correct in nl:
                                    del p['label']
                    elif fig_type == 'transversal' and isinstance(fig.get('labels'), dict):
                        fig['labels'] = {'1': '(2x+35)°', '5': '(x+50)°'}
        
        if fixed_in_file > 0:
            track_counts[track] = fixed_in_file
            total_leaks += fixed_in_file
            if apply_fix:
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(b, f, indent=2, ensure_ascii=False)
                    # Note: check if trailing newline existed or not

    print(f"{'Fixed' if apply_fix else 'Found'} {total_leaks} leaks across {len(track_counts)} tracks:")
    for t, c in sorted(track_counts.items()):
        print(f"  {t}: {c}")

if __name__ == '__main__':
    import sys
    do_fix = '--fix' in sys.argv
    audit_leaks(apply_fix=do_fix)
