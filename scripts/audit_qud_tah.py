#!/usr/bin/env python3
import json
import re
from collections import defaultdict, Counter

def audit_bank(track):
    print(f"\n{'='*20} {track.upper()} AUDIT {'='*20}")
    with open(f"bank-data/{track}.json") as f:
        data = json.load(f)
    pool = data.get('pool', [])
    print(f"Total pool size: {len(pool)}")
    
    # 1. Structural and Error checks
    errors = []
    unescaped_dollars = []
    delim_errors = []
    duplicate_choices = []
    invalid_ans = []
    has_fig = []
    
    for i, q in enumerate(pool):
        # text & sol
        t = q.get('text', '')
        s = q.get('sol', '')
        if not t.strip():
            errors.append((i, 'empty text'))
        if not s.strip():
            errors.append((i, 'empty sol'))
        
        # choices & answer
        ch = q.get('choices')
        if not isinstance(ch, list) or len(ch) != 4:
            errors.append((i, f"choices length is {len(ch) if isinstance(ch, list) else None}"))
        else:
            if len(set(str(c).strip() for c in ch)) < 4:
                duplicate_choices.append((i, ch))
        
        ans = q.get('answer')
        if not isinstance(ans, int) or ans < 0 or ans > 3:
            invalid_ans.append((i, ans))
            
        # delimiters
        for fld, val in [('text', t), ('sol', s)]:
            if val.count(r'\(') != val.count(r'\)'):
                delim_errors.append((i, fld, 'inline math unbalance'))
            if val.count(r'\[') != val.count(r'\]'):
                delim_errors.append((i, fld, 'display math unbalance'))
            if re.findall(r'(?<!\\)\$', val):
                unescaped_dollars.append((i, fld, val[:60]))
        for c in (ch or []):
            if re.findall(r'(?<!\\)\$', str(c)):
                unescaped_dollars.append((i, 'choice', str(c)))

        if 'fig' in q:
            has_fig.append((i, q['fig']))

    print(f"General structural errors: {len(errors)}")
    if errors:
        for e in errors[:5]:
            print("  ", e)
    print(f"Duplicate choices: {len(duplicate_choices)}")
    if duplicate_choices:
        for dc in duplicate_choices[:5]:
            print("  ", dc)
    print(f"Invalid answer indices: {len(invalid_ans)}")
    if invalid_ans:
        for ia in invalid_ans[:5]:
            print("  ", ia)
    print(f"Delimiter errors: {len(delim_errors)}")
    if delim_errors:
        for de in delim_errors[:5]:
            print("  ", de)
    print(f"Unescaped raw dollars: {len(unescaped_dollars)}")
    if unescaped_dollars:
        for ud in unescaped_dollars[:5]:
            print("  ", ud)
    print(f"Questions with figures/diagrams: {len(has_fig)}")
    if has_fig:
        for hf in has_fig[:5]:
            print("  ", hf[0], hf[1].get('type'), hf[1])

    # 2. Domain & Difficulty counts
    dom_diff = defaultdict(Counter)
    for q in pool:
        dom = q.get('domain', 'Unknown')
        diff = q.get('difficulty', 'Unknown')
        dom_diff[dom][diff] += 1

    print("\nDomain and Difficulty Breakdown:")
    for dom in sorted(dom_diff.keys()):
        print(f"  {dom}: {dict(dom_diff[dom])} (total: {sum(dom_diff[dom].values())})")

    # 3. Template repetition check
    def get_skel(s):
        s = re.sub(r'\d+', '#', s)
        s = re.sub(r'\s+', ' ', s).strip()
        return s

    dom_skels = defaultdict(Counter)
    for q in pool:
        dom_skels[q.get('domain', 'Unknown')][get_skel(q.get('text', ''))] += 1
    
    total_repeats = 0
    top_repeats = []
    for d, counts in dom_skels.items():
        for sk, cnt in counts.items():
            if cnt > 2:
                total_repeats += (cnt - 2)
                top_repeats.append((d, cnt, sk[:80]))
    
    top_repeats.sort(key=lambda x: x[1], reverse=True)
    print(f"\nTotal excess repeated template clones (>2): {total_repeats}")
    print(f"Distinct over-repeated templates: {len(top_repeats)}")
    for r in top_repeats[:10]:
        print(f"  [{r[0]}] {r[1]}x: {r[2]}")

if __name__ == '__main__':
    audit_bank('qudrat')
    audit_bank('tahsili')
