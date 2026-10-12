#!/usr/bin/env python3
"""
scripts/rebuild_sat_bank.py
Rebuilds bank-data/sat.json to provide exactly 50 Easy, 50 Medium, and 50 Hard questions
for EVERY SINGLE LESSON (11 lessons x 150 questions = 1,650 questions total).

Aligns all domain names with the official Khan Academy / College Board lesson titles:
1. Digital SAT Format & Adaptive Testing Strategy
2. Linear Equations in One Variable & Systems of Equations
3. Linear Functions & Linear Inequalities
4. Equivalent Expressions & Quadratic Equations
5. Exponentials, Radicals, Polynomials & Rational Expressions
6. Nonlinear Functions & Function Notation
7. Ratios, Rates, Proportions, Percentages & Scatterplots
8. One-Variable Statistics, Distributions & Margin of Error
9. Probability, Conditional Probability & Two-Way Tables
10. Area, Volume, Triangles, Circles & Trigonometry
11. Desmos Graphing Calculator Tactics
"""

import json
import re
from collections import defaultdict
from sat_generators import gen_about

DOMAIN_MAP = {
    "Linear Equations & Systems": "Linear Equations in One Variable & Systems of Equations",
    "Linear Functions & Inequalities": "Linear Functions & Linear Inequalities",
    "Quadratics & Nonlinear Functions": "Equivalent Expressions & Quadratic Equations",
    "Exponentials, Polynomials & Rational Expressions": "Exponentials, Radicals, Polynomials & Rational Expressions",
    "Functions & Function Notation": "Nonlinear Functions & Function Notation",
    "Problem-Solving & Data Analysis": "Ratios, Rates, Proportions, Percentages & Scatterplots",
    "Statistics, Sampling & Margin of Error": "One-Variable Statistics, Distributions & Margin of Error",
    "Conditional Probability & Two-Way Tables": "Probability, Conditional Probability & Two-Way Tables",
    "Geometry & Trigonometry": "Area, Volume, Triangles, Circles & Trigonometry",
    "Calculator & Strategy": "Desmos Graphing Calculator Tactics"
}

# Detailed replacement solutions for questions with short explanations (<25 chars)
SOLUTION_FIXES = {
    "Sarah earns \\$15/hour working \\( h \\) hours plus a \\$50 weekly bonus. Which expression is her weekly earnings?":
        "The base earnings for \\( h \\) hours at \\( \\$15 \\) per hour is \\( 15h \\). Adding the fixed bonus of \\( \\$50 \\) yields total weekly earnings of \\( 15h + 50 \\).",
    "\\( (2x^2+3x-1)-(x^2-2x+4) \\) simplifies to":
        "Distribute the negative sign: \\( 2x^2 + 3x - 1 - x^2 + 2x - 4 = (2x^2 - x^2) + (3x + 2x) + (-1 - 4) = x^2 + 5x - 5 \\).",
    "If \\( 4^x=64 \\), what is \\( x \\)?":
        "Express 64 as a power with base 4: \\( 64 = 4^3 \\). Equating exponents in \\( 4^x = 4^3 \\) gives \\( x = 3 \\).",
    "A line of best fit relating hours studied ( \\(x\\) ) to test score ( \\(\\hat y\\) ) is \\( \\hat y = 10x+27 \\). Using this model, what is the predicted score for a student who studies \\( 4 \\) hours?":
        "Substitute \\( x = 4 \\) into the regression equation: \\( \\hat y = 10(4) + 27 = 40 + 27 = 67 \\).",
    "If \\( f(x) = 2x^2 - 3 \\), what is \\( f(-2) \\)?":
        "Substitute \\( x = -2 \\) into the function: \\( f(-2) = 2(-2)^2 - 3 = 2(4) - 3 = 8 - 3 = 5 \\).",
    "If \\( f(6) = 10 \\), and \\( g(x) = f(x)-1 \\), what is \\( g(6) \\)?":
        "Substitute \\( x = 6 \\) into \\( g(x) \\): \\( g(6) = f(6) - 1 = 10 - 1 = 9 \\).",
    "In a survey, 40% of 200 students prefer math. How many students prefer math?":
        "Multiply the percentage by the total number of students: \\( 0.40 \\times 200 = 80 \\) students.",
    "The range of the data set {3, 7, 2, 9, 5, 8} is":
        "The range is the maximum value minus the minimum value: \\( \\text{Maximum} = 9 \\), \\( \\text{Minimum} = 2 \\), so \\( \\text{Range} = 9 - 2 = 7 \\).",
    "What is the range of the set: \\( 5, 5, 5, 5, 5 \\)?":
        "Because all elements in the set are identical, the maximum is 5 and the minimum is 5. Thus the range is \\( 5 - 5 = 0 \\).",
    "What is the probability that a randomly chosen vehicle is an SUV?":
        "The number of SUVs is 35 and the total number of vehicles is 100. Thus \\( P(\\text{SUV}) = \\dfrac{35}{100} = 0.35 \\).",
    "What is the probability that a donor chosen at random has blood type AB?":
        "The number of donors with blood type AB is 5 out of a total of 100 donors. Thus \\( P(\\text{AB}) = \\dfrac{5}{100} = 0.05 \\).",
    "A pair of standard dice is rolled. How many total outcomes are possible?":
        "Each 6-sided die has 6 possible outcomes. By the fundamental counting principle, rolling two dice yields \\( 6 \\times 6 = 36 \\) total outcomes.",
    "A spinner has 5 equal regions colored Red, Blue, Green, Yellow, and Purple. What is the probability of landing on Red or Blue?":
        "There are 2 favorable outcomes (Red or Blue) out of 5 equally likely regions. Thus \\( P = \\dfrac{2}{5} = 0.40 \\).",
    "If \\( P(E) = 0.82 \\), what is \\( P(E') \\)?":
        "By the complement rule of probability, \\( P(E') = 1 - P(E) = 1 - 0.82 = 0.18 \\).",
    "A drawer contains 6 black socks and 4 brown socks. One sock is chosen at random. What is the probability it is black?":
        "The total number of socks is \\( 6 + 4 = 10 \\). The probability of choosing a black sock is \\( \\dfrac{6}{10} = 0.60 \\).",
    "A test consists of 3 true/false questions. If a student guesses on all 3, what is the probability of getting all 3 correct?":
        "The probability of guessing correctly on each question is \\( 1/2 \\). For 3 independent questions, the probability is \\( (1/2)^3 = 1/8 = 0.125 \\)."
}

# Fresh replacements for duplicate questions 748 and 749 in Ratios/Percentages
REPLACEMENT_748 = {
    "type": "mcq",
    "domain": "Ratios, Rates, Proportions, Percentages & Scatterplots",
    "text": "A boutique hotel's weekend room rate is 40% higher than its weekday room rate. If a guest stays 3 weekday nights and 2 weekend nights for a total cost of \\( \\$870 \\), what is the cost of one weekday night?",
    "choices": [
        "\\( \\$120 \\)",
        "\\( \\$150 \\)",
        "\\( \\$175 \\)",
        "\\( \\$210 \\)"
    ],
    "answer": 1,
    "sol": "Let \\( d \\) be the weekday rate. The weekend rate is \\( 1.40d \\). Total cost: \\( 3d + 2(1.40d) = 870 \\implies 3d + 2.80d = 870 \\implies 5.80d = 870 \\implies d = \\$150 \\).",
    "difficulty": "hard"
}

REPLACEMENT_749 = {
    "type": "mcq",
    "domain": "Ratios, Rates, Proportions, Percentages & Scatterplots",
    "text": "A commuter travels from City A to City B at an average speed of 60 miles per hour and returns along the same route at an average speed of 40 miles per hour. What is the commuter's average speed, in miles per hour, for the entire round trip?",
    "choices": [
        "48",
        "50",
        "52",
        "54"
    ],
    "answer": 0,
    "sol": "Average speed is total distance divided by total time. Let the one-way distance be \\( d \\). Time going is \\( d/60 \\) and time returning is \\( d/40 \\). Total time: \\( d/60 + d/40 = 5d/120 = d/24 \\). Average speed: \\( \\dfrac{2d}{d/24} = 2 \\times 24 = 48 \\text{ mph} \\).",
    "difficulty": "hard"
}

def escape_raw_dollars(text):
    if not isinstance(text, str):
        return text
    return re.sub(r'(?<!\\)\$', r'\$', text)

def main():
    with open('bank-data/sat.json', 'r') as f:
        sat = json.load(f)

    old_pool = sat['pool']
    print(f"Loaded existing pool of {len(old_pool)} questions.")

    # 1. Generate 150 questions for Lesson 1: Digital SAT Format & Adaptive Testing Strategy
    about_questions = gen_about.get_new_questions()
    assert len(about_questions) == 150, f"Expected 150 about questions, got {len(about_questions)}"
    easy_about = [q for q in about_questions if q['difficulty'] == 'easy']
    med_about = [q for q in about_questions if q['difficulty'] == 'medium']
    hard_about = [q for q in about_questions if q['difficulty'] == 'hard']
    assert len(easy_about) == 50 and len(med_about) == 50 and len(hard_about) == 50
    print("Lesson 1 (Digital SAT Format & Adaptive Testing Strategy): generated 150 questions (50 E, 50 M, 50 H).")

    # 2. Process and rename the existing 10 domains
    rebuilt_pool = list(about_questions)

    # Replace duplicate questions 748 and 749 in old_pool
    old_pool[748] = REPLACEMENT_748
    old_pool[749] = REPLACEMENT_749

    domain_counts = defaultdict(lambda: {'easy': 0, 'medium': 0, 'hard': 0})
    for q in about_questions:
        domain_counts[q['domain']][q['difficulty']] += 1

    for idx, q in enumerate(old_pool):
        # Update domain name
        old_dom = q.get('domain')
        if old_dom in DOMAIN_MAP:
            q['domain'] = DOMAIN_MAP[old_dom]

        # Fix short solutions if present
        text_key = q.get('text', '')
        for k, fixed_sol in SOLUTION_FIXES.items():
            if k in text_key:
                q['sol'] = fixed_sol
                break

        # Standardize question type
        if q.get('type') == 'data':
            q['type'] = 'mcq'

        # Ensure dollars are escaped
        q['text'] = escape_raw_dollars(q['text'])
        q['sol'] = escape_raw_dollars(q['sol'])
        if 'choices' in q and isinstance(q['choices'], list):
            q['choices'] = [escape_raw_dollars(c) for c in q['choices']]

        diff = q.get('difficulty')
        dom = q.get('domain')
        domain_counts[dom][diff] += 1
        rebuilt_pool.append(q)

    print("\nRebuilt Question Counts by Lesson Domain:")
    print("=" * 80)
    for dom, counts in sorted(domain_counts.items()):
        total = counts['easy'] + counts['medium'] + counts['hard']
        print(f"{dom[:50]:<50} | E: {counts['easy']:2d} | M: {counts['medium']:2d} | H: {counts['hard']:2d} | Total: {total:3d}")
        assert counts['easy'] == 50, f"Domain {dom} easy != 50 ({counts['easy']})"
        assert counts['medium'] == 50, f"Domain {dom} medium != 50 ({counts['medium']})"
        assert counts['hard'] == 50, f"Domain {dom} hard != 50 ({counts['hard']})"
        assert total == 150, f"Domain {dom} total != 150 ({total})"

    assert len(rebuilt_pool) == 1650, f"Expected 1,650 questions, got {len(rebuilt_pool)}"
    print("=" * 80)
    print(f"Total: {len(domain_counts)} lessons x 150 questions = {len(rebuilt_pool)} questions total.")

    sat['pool'] = rebuilt_pool
    with open('bank-data/sat.json', 'w') as f:
        json.dump(sat, f, indent=2)

    print("Successfully wrote updated bank-data/sat.json!")

if __name__ == '__main__':
    main()
