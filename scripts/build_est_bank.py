#!/usr/bin/env python3
import json
import re
import os
import random
from est_generators.gen_algebra import generate_algebra_questions
from est_generators.gen_functions import generate_functions_questions
from est_generators.gen_quadratics import generate_quadratics_questions
from est_generators.gen_stats import generate_stats_questions
from est_generators.gen_geometry import generate_geometry_questions
from est_generators.gen_trig import generate_trig_questions
from est_generators.gen_exp_log import generate_exp_log_questions
from est_generators.gen_ratios import generate_ratios_questions

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BANK_PATH = os.path.join(ROOT_DIR, 'bank-data', 'est.json')

TARGET_PER_DOMAIN = 160

DOMAIN_GENERATORS = {
    "Heart of Algebra": generate_algebra_questions,
    "Functions & Graphs": generate_functions_questions,
    "Quadratics & Polynomials": generate_quadratics_questions,
    "Statistics & Probability": generate_stats_questions,
    "Geometry": generate_geometry_questions,
    "Trigonometry & Additional Topics": generate_trig_questions,
    "Exponentials & Logarithms": generate_exp_log_questions,
    "Ratios, Rates & Data": generate_ratios_questions,
}

def get_skeleton(text):
    return re.sub(r'\d+', 'N', text.strip())

def main():
    random.seed(42)
    with open(BANK_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    existing_pool = data.get('pool', [])
    print(f"Loaded existing EST bank with {len(existing_pool)} items.")

    # Group existing by domain, capping clones at max 2
    domain_items = {d: [] for d in DOMAIN_GENERATORS}
    skeleton_counts = {}

    for q in existing_pool:
        domain = q.get('domain')
        if domain not in domain_items:
            # Map legacy or unknown domain names if any
            continue
        stem = q.get('text', '')
        sk = get_skeleton(stem)
        cnt = skeleton_counts.get(sk, 0)
        if cnt < 2:
            skeleton_counts[sk] = cnt + 1
            domain_items[domain].append(q)

    final_pool = []
    for domain, gen_func in DOMAIN_GENERATORS.items():
        kept = domain_items[domain]
        needed = TARGET_PER_DOMAIN - len(kept)
        print(f"Domain '{domain}': Kept {len(kept)} existing questions. Generating {needed} new questions...")
        
        # Generate enough questions (with extra buffer)
        new_qs = gen_func(count=max(needed + 20, 50))
        
        # Filter new questions so their skeletons don't duplicate existing too much
        added = []
        for nq in new_qs:
            sk = get_skeleton(nq['text'])
            cnt = skeleton_counts.get(sk, 0)
            if cnt < 2:
                skeleton_counts[sk] = cnt + 1
                added.append(nq)
            if len(added) == needed:
                break
        
        # If still needed, just add
        if len(added) < needed:
            for nq in new_qs:
                if nq not in added:
                    added.append(nq)
                if len(added) == needed:
                    break

        domain_pool = kept + added[:needed]
        random.shuffle(domain_pool)
        final_pool.extend(domain_pool)
        
        # Check uniqueness
        sks = set(get_skeleton(q['text']) for q in domain_pool)
        print(f"Domain '{domain}': Assembled {len(domain_pool)} questions (Unique skeletons: {len(sks)})")

    # Final shuffle
    random.shuffle(final_pool)

    data['pool'] = final_pool

    with open(BANK_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Successfully updated bank-data/est.json with {len(final_pool)} diverse, syllabus-aligned items.")

if __name__ == '__main__':
    main()
