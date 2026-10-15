#!/usr/bin/env python3
"""
scripts/clean_bank_figures.py
Cleans and audits figures across all question banks in bank-data/*.json:
1. Removes irrelevant / misleading figures from purely algebraic questions
   (e.g., sat.json #427 where a straight line was erroneously attached to a parabola question,
    or discriminant questions with squashed, cut-off parabolas).
2. Fixes incomplete two-curve figures (e.g., sat.json #922 and #980 where parabolas were missing).
3. Fixes out-of-range bounding boxes (e.g., sat.json #1013).
4. Cleans up ugly label syntax ('+ -' -> '- ', '1x' -> 'x').
5. Removes figures that leak answers to 'which equation' questions.
"""

import json
import glob
import re

def clean_label(lbl):
    if not isinstance(lbl, str):
        return lbl
    # Clean '+ -' -> '- '
    lbl = re.sub(r'\+\s*-\s*', '- ', lbl)
    # Clean 'y = 1x' -> 'y = x'
    lbl = re.sub(r'y\s*=\s*1x(?![0-9])', 'y = x', lbl)
    lbl = re.sub(r'y\s*=\s*-1x(?![0-9])', 'y = -x', lbl)
    lbl = re.sub(r'(?<=[\s=])1x(?![0-9])', 'x', lbl)
    return lbl

def clean_bank_figures():
    banks = sorted(glob.glob('bank-data/*.json'))
    total_modified = 0

    for b in banks:
        with open(b, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        pool = data.get('pool', [])
        b_modified = 0
        
        for idx, q in enumerate(pool):
            if 'figure' not in q or not q['figure']:
                continue
            
            fig = q['figure']
            text = q.get('text', '')
            t_low = text.lower()
            changed = False
            
            # ─────────────────────────────────────────────────────────────
            # SPECIFIC FIXES FOR SAT.JSON
            # ─────────────────────────────────────────────────────────────
            if 'sat.json' in b:
                # Question 427: The exact screenshot question! Parabola with bogus linear line y = 3x + 3
                if idx == 427:
                    del q['figure']
                    b_modified += 1
                    continue
                
                # Question 443: Line intersects parabola at P and Q, find midpoint x-coord (pure algebraic Vieta)
                if idx == 443:
                    del q['figure']
                    b_modified += 1
                    continue
                
                # Question 922: System y = x^2 - 4x + 3 and y = 2x - 6. Complete figure by adding parabola!
                if idx == 922 and isinstance(fig, dict):
                    fig['fns'] = [
                        {'fn': 'x*x - 4*x + 3', 'label': 'y = x^2 - 4x + 3', 'color': '#C8902A'},
                        {'fn': '2*x - 6', 'label': 'y = 2x - 6', 'color': '#1E3A6E'}
                    ]
                    fig['points'] = [{'x': 3, 'y': 0, 'label': '(3,0)', 'color': '#16A34A'}]
                    fig['xrange'] = [-1, 6]
                    fig['yrange'] = [-4, 6]
                    b_modified += 1
                    continue

                # Question 980: Student graphs line y = x + 3 and parabola y = x^2 - 3. Complete figure!
                if idx == 980 and isinstance(fig, dict):
                    fig['fns'] = [
                        {'fn': 'x*x - 3', 'label': 'y = x^2 - 3', 'color': '#C8902A'},
                        {'fn': 'x + 3', 'label': 'y = x + 3', 'color': '#1E3A6E'}
                    ]
                    fig['points'] = [
                        {'x': -2, 'y': 1, 'label': '(-2,1)', 'color': '#16A34A'},
                        {'x': 3, 'y': 6, 'label': '(3,6)', 'color': '#16A34A'}
                    ]
                    fig['xrange'] = [-4, 5]
                    fig['yrange'] = [-4, 8]
                    b_modified += 1
                    continue

                # Question 1013: Point (7, 0) was out of bounds [-4, 6]
                if idx == 1013 and isinstance(fig, dict):
                    fig['xrange'] = [-4, 9]
                    b_modified += 1
                    continue

                # Question 138: Label leaked 'y = 2x + 1'
                if idx == 138 and isinstance(fig, dict):
                    for fn_obj in fig.get('fns', []):
                        if 'label' in fn_obj:
                            fn_obj['label'] = 'Line l'
                            b_modified += 1

            # ─────────────────────────────────────────────────────────────
            # ALGEBRA.JSON SPECIFIC FIXES
            # ─────────────────────────────────────────────────────────────
            if 'algebra.json' in b:
                # Question 3: Which equation represents a line parallel to y = 4x - 1? (leaking figure)
                if idx == 3:
                    del q['figure']
                    b_modified += 1
                    continue

            # ─────────────────────────────────────────────────────────────
            # DISCRIMINANT QUESTIONS: REMOVE SQUASHED / CUT-OFF PARABOLAS
            # (e.g. tahsili, aslevel, act, est2, algebra)
            # ─────────────────────────────────────────────────────────────
            if ('discriminant' in t_low or 'مميّز' in text) and 'figure' in q:
                del q['figure']
                b_modified += 1
                continue

            # ─────────────────────────────────────────────────────────────
            # A2LEVEL.JSON: EVALUATE INTEGRAL WITH BOGUS 2x TRIANGLE
            # ─────────────────────────────────────────────────────────────
            if 'a2level.json' in b and 'Evaluate' in text and '\\int' in text and isinstance(fig, dict):
                fns = fig.get('fns', [])
                if fns and fns[0].get('fn') == '2*x':
                    del q['figure']
                    b_modified += 1
                    continue

            # ─────────────────────────────────────────────────────────────
            # ACT2 & EST2: LINE-PARABOLA INTERSECTIONS WITH LINE-ONLY FIGURE
            # ─────────────────────────────────────────────────────────────
            if ('act2.json' in b or 'est2.json' in b) and 'intersects the parabola' in text and isinstance(fig, dict):
                fns = fig.get('fns', [])
                if len(fns) == 1 and 'x^2' not in str(fns[0].get('fn', '')):
                    del q['figure']
                    b_modified += 1
                    continue

            # ─────────────────────────────────────────────────────────────
            # PRECALC.JSON: VERTEX QUESTIONS WITH ANSWER-LEAKING LABELS
            # ─────────────────────────────────────────────────────────────
            if 'precalc.json' in b and 'vertex of the parabola' in t_low and 'figure' in q:
                del q['figure']
                b_modified += 1
                continue

            # ─────────────────────────────────────────────────────────────
            # QUADRATIC FORMULA / ROOTS-LEAKING FIGURES
            # ─────────────────────────────────────────────────────────────
            if ('quadratic formula' in t_low or 'quadratic equation' in t_low) and 'figure' in q:
                del q['figure']
                b_modified += 1
                continue

            # ─────────────────────────────────────────────────────────────
            # ALG2 #1156: INCOMPLETE PARABOLA INTERSECTION
            # ─────────────────────────────────────────────────────────────
            if 'alg2.json' in b and 'intersection of the parabola' in t_low and 'figure' in q:
                del q['figure']
                b_modified += 1
                continue

            # ─────────────────────────────────────────────────────────────
            # CLEAN UGLY SYNTAX IN LABELS ACROSS ALL BANKS (+ - or 1x)
            # ─────────────────────────────────────────────────────────────
            if isinstance(fig, dict) and fig.get('type') == 'fn':
                fns = fig.get('fns', [])
                for fn_obj in fns:
                    orig_lbl = fn_obj.get('label', '')
                    cleaned = clean_label(orig_lbl)
                    if cleaned != orig_lbl:
                        fn_obj['label'] = cleaned
                        changed = True
                
                # Also clean points labels
                for pt in fig.get('points', []):
                    orig_lbl = pt.get('label', '')
                    cleaned = clean_label(orig_lbl)
                    if cleaned != orig_lbl:
                        pt['label'] = cleaned
                        changed = True
                
                if changed:
                    b_modified += 1

        if b_modified > 0:
            print(f'✓ {b}: cleaned {b_modified} question figures')
            with open(b, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            total_modified += b_modified

    print(f'\nTotal figures cleaned across all banks: {total_modified}')

if __name__ == '__main__':
    clean_bank_figures()
