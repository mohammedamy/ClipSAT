#!/usr/bin/env python3
"""
Replace 196 duplicate items in bank-data/est.json with fresh, high-quality,
authentic EST I Math items matching the exact domain and difficulty of the
replaced items.
"""
import json
import random

def clean_math(val):
    s = str(val).strip()
    if s.startswith(r'\(') and s.endswith(r'\)'):
        return s
    if '$' in s or '%' in s or any(w in s for w in ['Increase', 'Decrease', 'Equal', 'No change']):
        return s
    return f"\\( {s} \\)"

def main():

    bank_path = 'bank-data/est.json'
    with open(bank_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    existing_stems = set()
    dup_slots = []
    for idx, q in enumerate(data['pool']):
        s = q.get('text', '').strip().lower()
        if s in existing_stems:
            dup_slots.append((idx, q['domain'], q['difficulty']))
        else:
            existing_stems.add(s)

    print(f"Total duplicate slots to fill: {len(dup_slots)}")

    # We need:
    # 'Trigonometry & Additional Topics | easy': 21
    # 'Trigonometry & Additional Topics | medium': 3
    # 'Trigonometry & Additional Topics | hard': 1
    # 'Exponentials & Logarithms | easy': 25
    # 'Exponentials & Logarithms | medium': 19
    # 'Geometry | easy': 17
    # 'Geometry | medium': 16
    # 'Quadratics & Polynomials | medium': 10
    # 'Quadratics & Polynomials | hard': 16
    # 'Ratios, Rates & Data | easy': 6
    # 'Ratios, Rates & Data | medium': 26
    # 'Statistics & Probability | easy': 11
    # 'Statistics & Probability | medium': 5
    # 'Heart of Algebra | easy': 13
    # 'Heart of Algebra | hard': 4
    # 'Functions & Graphs | easy': 2
    # 'Functions & Graphs | hard': 1

    new_items_by_key = {
        'Trigonometry & Additional Topics | easy': [],
        'Trigonometry & Additional Topics | medium': [],
        'Trigonometry & Additional Topics | hard': [],
        'Exponentials & Logarithms | easy': [],
        'Exponentials & Logarithms | medium': [],
        'Geometry | easy': [],
        'Geometry | medium': [],
        'Quadratics & Polynomials | medium': [],
        'Quadratics & Polynomials | hard': [],
        'Ratios, Rates & Data | easy': [],
        'Ratios, Rates & Data | medium': [],
        'Statistics & Probability | easy': [],
        'Statistics & Probability | medium': [],
        'Heart of Algebra | easy': [],
        'Heart of Algebra | hard': [],
        'Functions & Graphs | easy': [],
        'Functions & Graphs | hard': [],
    }

    def add(domain, diff, text, choices, ans_idx, sol):
        key = f"{domain} | {diff}"
        stem_norm = text.strip().lower()
        if stem_norm in existing_stems:
            raise ValueError(f"Duplicate stem detected: {text}")
        existing_stems.add(stem_norm)
        new_items_by_key[key].append({
            'type': 'mcq',
            'domain': domain,
            'text': text,
            'choices': choices,
            'answer': ans_idx,
            'sol': sol,
            'difficulty': diff
        })

    # ==========================================
    # 1. Trigonometry & Additional Topics | easy (21 needed)
    # ==========================================
    # Angles in radians/degrees, basic trig definitions, simple right triangles
    angles_deg = [45, 120, 135, 150, 210, 225, 300, 315, 330, 75, 105, 15, 20, 40, 50, 70, 80, 100, 140, 160, 200]
    rad_map = {
        45: ("\\frac{\\pi}{4}", ["\\frac{\\pi}{4}", "\\frac{\\pi}{3}", "\\frac{\\pi}{6}", "\\frac{\\pi}{2}"]),
        120: ("\\frac{2\\pi}{3}", ["\\frac{2\\pi}{3}", "\\frac{3\\pi}{4}", "\\frac{5\\pi}{6}", "\\frac{4\\pi}{3}"]),
        135: ("\\frac{3\\pi}{4}", ["\\frac{3\\pi}{4}", "\\frac{2\\pi}{3}", "\\frac{5\\pi}{4}", "\\frac{7\\pi}{6}"]),
        150: ("\\frac{5\\pi}{6}", ["\\frac{5\\pi}{6}", "\\frac{7\\pi}{6}", "\\frac{2\\pi}{3}", "\\frac{3\\pi}{4}"]),
        210: ("\\frac{7\\pi}{6}", ["\\frac{7\\pi}{6}", "\\frac{5\\pi}{6}", "\\frac{4\\pi}{3}", "\\frac{11\\pi}{6}"]),
        225: ("\\frac{5\\pi}{4}", ["\\frac{5\\pi}{4}", "\\frac{3\\pi}{4}", "\\frac{7\\pi}{4}", "\\frac{4\\pi}{3}"]),
        300: ("\\frac{5\\pi}{3}", ["\\frac{5\\pi}{3}", "\\frac{4\\pi}{3}", "\\frac{7\\pi}{4}", "\\frac{11\\pi}{6}"]),
        315: ("\\frac{7\\pi}{4}", ["\\frac{7\\pi}{4}", "\\frac{5\\pi}{4}", "\\frac{5\\pi}{3}", "\\frac{11\\pi}{6}"]),
        330: ("\\frac{11\\pi}{6}", ["\\frac{11\\pi}{6}", "\\frac{7\\pi}{6}", "\\frac{5\\pi}{3}", "\\frac{7\\pi}{4}"]),
        75: ("\\frac{5\\pi}{12}", ["\\frac{5\\pi}{12}", "\\frac{7\\pi}{12}", "\\frac{\\pi}{12}", "\\frac{5\\pi}{6}"]),
        105: ("\\frac{7\\pi}{12}", ["\\frac{7\\pi}{12}", "\\frac{5\\pi}{12}", "\\frac{11\\pi}{12}", "\\frac{3\\pi}{4}"]),
        15: ("\\frac{\\pi}{12}", ["\\frac{\\pi}{12}", "\\frac{\\pi}{15}", "\\frac{\\pi}{8}", "\\frac{\\pi}{6}"]),
        20: ("\\frac{\\pi}{9}", ["\\frac{\\pi}{9}", "\\frac{\\pi}{10}", "\\frac{2\\pi}{9}", "\\frac{\\pi}{18}"]),
        40: ("\\frac{2\\pi}{9}", ["\\frac{2\\pi}{9}", "\\frac{\\pi}{9}", "\\frac{4\\pi}{9}", "\\frac{\\pi}{4}"]),
        50: ("\\frac{5\\pi}{18}", ["\\frac{5\\pi}{18}", "\\frac{\\pi}{4}", "\\frac{5\\pi}{9}", "\\frac{7\\pi}{18}"]),
        70: ("\\frac{7\\pi}{18}", ["\\frac{7\\pi}{18}", "\\frac{5\\pi}{18}", "\\frac{7\\pi}{9}", "\\frac{4\\pi}{9}"]),
        80: ("\\frac{4\\pi}{9}", ["\\frac{4\\pi}{9}", "\\frac{2\\pi}{9}", "\\frac{5\\pi}{9}", "\\frac{7\\pi}{9}"]),
        100: ("\\frac{5\\pi}{9}", ["\\frac{5\\pi}{9}", "\\frac{4\\pi}{9}", "\\frac{7\\pi}{9}", "\\frac{2\\pi}{3}"]),
        140: ("\\frac{7\\pi}{9}", ["\\frac{7\\pi}{9}", "\\frac{5\\pi}{9}", "\\frac{8\\pi}{9}", "\\frac{2\\pi}{3}"]),
        160: ("\\frac{8\\pi}{9}", ["\\frac{8\\pi}{9}", "\\frac{7\\pi}{9}", "\\frac{5\\pi}{6}", "\\frac{4\\pi}{5}"]),
        200: ("\\frac{10\\pi}{9}", ["\\frac{10\\pi}{9}", "\\frac{8\\pi}{9}", "\\frac{11\\pi}{9}", "\\frac{5\\pi}{4}"])
    }
    for deg in angles_deg:
        corr_tex, choices_tex = rad_map[deg]
        c_list = [f"\\( {c} \\)" for c in choices_tex]
        ans = 0
        text = f"Convert an angle of \\( {deg}^\\circ \\) into radians in simplest terms."
        sol = f"Multiply by \\( \\frac{{\\pi}}{{180^\\circ}} \\): \\( {deg} \\times \\frac{{\\pi}}{{180}} = {corr_tex} \\)."
        add('Trigonometry & Additional Topics', 'easy', text, c_list, ans, sol)

    # ==========================================
    # 2. Trigonometry & Additional Topics | medium (3 needed)
    # ==========================================
    add('Trigonometry & Additional Topics', 'medium',
        "In a right triangle \\( ABC \\) where angle \\( C = 90^\\circ \\), if \\( \\cos(A) = \\frac{12}{13} \\), what is the value of \\( \\tan(A) \\)?",
        ["\\( \\frac{5}{12} \\)", "\\( \\frac{12}{5} \\)", "\\( \\frac{5}{13} \\)", "\\( \\frac{13}{12} \\)"],
        0,
        "Using \\( \\sin^2(A) + \\cos^2(A) = 1 \\), \\( \\sin(A) = \\sqrt{1 - (12/13)^2} = \\frac{5}{13} \\). Then \\( \\tan(A) = \\frac{\\sin(A)}{\\cos(A)} = \\frac{5/13}{12/13} = \\frac{5}{12} \\).")

    add('Trigonometry & Additional Topics', 'medium',
        "If \\( \\sin(x) = \\cos(42^\\circ) \\) and \\( 0^\\circ < x < 90^\\circ \\), what is the value of \\( x \\)?",
        ["\\( 48^\\circ \\)", "\\( 42^\\circ \\)", "\\( 138^\\circ \\)", "\\( 90^\\circ \\)"],
        0,
        "By the cofunction identity, \\( \\sin(x) = \\cos(90^\\circ - x) \\). Thus \\( 90^\\circ - x = 42^\\circ \\Rightarrow x = 48^\\circ \\).")

    add('Trigonometry & Additional Topics', 'medium',
        "The terminal side of an angle \\( \\theta \\) in standard position passes through the point \\( (-3, 4) \\). What is \\( \\sin(\\theta) \\)?",
        ["\\( \\frac{4}{5} \\)", "\\( -\\frac{3}{5} \\)", "\\( -\\frac{4}{3} \\)", "\\( \\frac{3}{5} \\)"],
        0,
        "The distance from origin is \\( r = \\sqrt{(-3)^2 + 4^2} = 5 \\). Therefore \\( \\sin(\\theta) = \\frac{y}{r} = \\frac{4}{5} \\).")

    # ==========================================
    # 3. Trigonometry & Additional Topics | hard (1 needed)
    # ==========================================
    add('Trigonometry & Additional Topics', 'hard',
        "If \\( \\tan(\\theta) = -\\frac{3}{4} \\) and \\( \\sin(\\theta) > 0 \\), what is the exact value of \\( \\cos(\\theta) - \\sin(\\theta) \\)?",
        ["\\( -\\frac{7}{5} \\)", "\\( -\\frac{1}{5} \\)", "\\( \\frac{1}{5} \\)", "\\( \\frac{7}{5} \\)"],
        0,
        "Since \\( \\tan(\\theta) < 0 \\) and \\( \\sin(\\theta) > 0 \\), \\( \\theta \\) is in Quadrant II. Here \\( x = -4, y = 3, r = 5 \\). Thus \\( \\cos(\\theta) = -\\frac{4}{5} \\) and \\( \\sin(\\theta) = \\frac{3}{5} \\). Their difference is \\( -\\frac{4}{5} - \\frac{3}{5} = -\\frac{7}{5} \\).")

    # ==========================================
    # 4. Exponentials & Logarithms | easy (25 needed)
    # ==========================================
    easy_exp_specs = [
        ("2^{x+1} = 32", "x", 4, ["4", "5", "3", "6"]),
        ("3^{2x-1} = 27", "x", 2, ["2", "1", "3", "4"]),
        ("5^{x-2} = 125", "x", 5, ["5", "3", "6", "4"]),
        ("4^{x+2} = 64", "x", 1, ["1", "2", "3", "0"]),
        ("10^{3x} = 1000", "x", 1, ["1", "3", "0", "2"]),
        ("2^{3x-2} = 64", "x", "8/3", ["\\frac{8}{3}", "2", "3", "\\frac{7}{3}"]),
        ("7^{x+3} = 49", "x", -1, ["-1", "1", "-2", "0"]),
        ("6^{2x} = 216", "x", "\\frac{3}{2}", ["\\frac{3}{2}", "3", "1", "\\frac{2}{3}"]),
        ("9^{x-1} = 81", "x", 3, ["3", "2", "4", "1"]),
        ("8^{x} = 32", "x", "\\frac{5}{3}", ["\\frac{5}{3}", "\\frac{4}{3}", "2", "\\frac{3}{2}"]),
        ("25^{x} = 125", "x", "\\frac{3}{2}", ["\\frac{3}{2}", "\\frac{5}{2}", "2", "1"]),
        ("27^{x} = 9", "x", "\\frac{2}{3}", ["\\frac{2}{3}", "\\frac{3}{2}", "\\frac{1}{3}", "3"]),
        ("16^{x} = 64", "x", "\\frac{3}{2}", ["\\frac{3}{2}", "\\frac{4}{3}", "2", "\\frac{5}{2}"]),
        ("36^{x+1} = 6", "x", "-\\frac{1}{2}", ["-\\frac{1}{2}", "\\frac{1}{2}", "-1", "0"]),
        ("4^{2x+1} = 32", "x", "\\frac{3}{4}", ["\\frac{3}{4}", "\\frac{5}{4}", "1", "\\frac{1}{2}"]),
        ("81^{x} = 27", "x", "\\frac{3}{4}", ["\\frac{3}{4}", "\\frac{4}{3}", "\\frac{1}{3}", "3"]),
        ("3^{x+4} = 81", "x", 0, ["0", "1", "-1", "2"]),
        ("2^{x-3} = 16", "x", 7, ["7", "6", "8", "5"]),
        ("10^{x-1} = 0.01", "x", -1, ["-1", "-2", "0", "1"]),
        ("5^{2x} = \\frac{1}{125}", "x", "-\\frac{3}{2}", ["-\\frac{3}{2}", "\\frac{3}{2}", "-3", "-1"]),
        ("4^{x} = \\frac{1}{16}", "x", -2, ["-2", "2", "-4", "-1"]),
        ("2^{4x} = 256", "x", 2, ["2", "4", "3", "1"]),
        ("3^{3x-1} = 243", "x", 2, ["2", "3", "1", "\\frac{5}{3}"]),
        ("2^{x} = \\frac{1}{64}", "x", -6, ["-6", "6", "-5", "-7"]),
        ("11^{x-2} = 121", "x", 4, ["4", "3", "2", "5"]),
    ]
    for eq, var, ans_val, ch_list in easy_exp_specs:
        text = f"If \\( {eq} \\), what is the value of \\( {var} \\)?"
        c_list = [f"\\( {c} \\)" if not c.startswith('\\(') else c for c in ch_list]
        sol = f"Rewrite both sides with a common base and equate exponents to obtain \\( {var} = {ans_val} \\)."
        add('Exponentials & Logarithms', 'easy', text, c_list, 0, sol)

    # ==========================================
    # 5. Exponentials & Logarithms | medium (19 needed)
    # ==========================================
    med_log_specs = [
        ("\\log_2(x) + \\log_2(x-3) = 2", "x", 4, ["4", "1", "-1", "2"]),
        ("\\log_3(x+6) - \\log_3(x) = 2", "x", "\\frac{3}{4}", ["\\frac{3}{4}", "1", "\\frac{2}{3}", "2"]),
        ("\\log_5(2x-1) = 2", "x", 13, ["13", "12", "25", "14"]),
        ("\\log_4(x^2 - 9) - \\log_4(x - 3) = 2", "x", 13, ["13", "16", "7", "9"]),
        ("\\log_2(3x + 1) = 4", "x", 5, ["5", "4", "6", "\\frac{17}{3}"]),
        ("\\log_{10}(x) + \\log_{10}(x+15) = 2", "x", 5, ["5", "10", "20", "4"]),
        ("\\log_3(x^2) = 6", "positive value of x", 27, ["27", "9", "81", "3"]),
        ("\\log_2(x+5) - \\log_2(x-1) = 1", "x", 7, ["7", "6", "8", "5"]),
        ("\\ln(2x - 3) = 0", "x", 2, ["2", "1", "3", "\\frac{3}{2}"]),
        ("2\\log_3(x) = \\log_3(8x - 15)", "product of all valid solutions for x", 15, ["15", "8", "5", "3"]),
        ("\\log_4(x) + \\log_4(x - 6) = 2", "x", 8, ["8", "6", "10", "4"]),
        ("\\log_2(x) + \\log_2(x + 2) = 3", "x", 2, ["2", "4", "1", "3"]),
        ("3^{2x} - 10 \\cdot 3^x + 9 = 0", "sum of all real solutions for x", 2, ["2", "0", "1", "3"]),
        ("4^x - 5 \\cdot 2^x + 4 = 0", "sum of all real solutions for x", 2, ["2", "1", "3", "0"]),
        ("2^{2x} - 9 \\cdot 2^x + 8 = 0", "larger real solution for x", 3, ["3", "0", "4", "2"]),
        ("\\log_7(x+2) + \\log_7(x-4) = 1", "x", 5, ["5", "7", "3", "6"]),
        ("\\log_3(2x+5) = 3", "x", 11, ["11", "16", "9", "12"]),
        ("\\log_6(x) + \\log_6(x-5) = 1", "x", 6, ["6", "5", "1", "7"]),
        ("\\ln(x+4) - \\ln(x) = \\ln(3)", "x", 2, ["2", "1", "3", "4"]),
    ]
    for eq, var, ans_val, ch_list in med_log_specs:
        text = f"Given the equation \\( {eq} \\), what is the {var}?"
        c_list = [clean_math(c) for c in ch_list]
        sol = f"Using logarithmic properties and converting to exponential form gives the solution {clean_math(ans_val)}."
        add('Exponentials & Logarithms', 'medium', text, c_list, 0, sol)

    # ==========================================
    # 6. Geometry | easy (17 needed)
    # ==========================================
    geom_easy_specs = [
        ("A rectangle has a perimeter of 48 cm and a length of 16 cm. What is the width of the rectangle in centimeters?", 8, ["8", "16", "12", "10"]),
        ("A circle has a diameter of 14 cm. What is its circumference in centimeters? (Use \\( \\pi \\approx \\frac{22}{7} \\))", 44, ["44", "22", "88", "154"]),
        ("The three interior angles of a triangle measure \\( 45^\\circ \\), \\( 65^\\circ \\), and \\( x^\\circ \\). What is the value of \\( x \\)?", 70, ["70", "80", "60", "75"]),
        ("A square has an area of 144 square meters. What is its perimeter in meters?", 48, ["48", "36", "24", "72"]),
        ("In an isosceles triangle, the vertex angle measures \\( 40^\\circ \\). What is the measure of each base angle?", "\\( 70^\\circ \\)", ["\\( 70^\\circ \\)", "\\( 60^\\circ \\)", "\\( 80^\\circ \\)", "\\( 50^\\circ \\)"]),
        ("What is the area of a right triangle with legs of length 9 cm and 12 cm?", 54, ["54", "108", "45", "60"]),
        ("A cube has a side length of 5 cm. What is the total surface area of the cube in square centimeters?", 150, ["150", "125", "100", "75"]),
        ("A cube has a volume of 216 cubic centimeters. What is the length of one edge in centimeters?", 6, ["6", "8", "4", "12"]),
        ("A rectangular prism has dimensions 4 cm by 5 cm by 6 cm. What is its volume in cubic centimeters?", 120, ["120", "60", "148", "90"]),
        ("An equilateral triangle has a perimeter of 36 cm. What is the length of each side in centimeters?", 12, ["12", "9", "18", "6"]),
        ("A circle has a radius of 8 cm. What is the area of the circle in terms of \\( \\pi \\)?", "\\( 64\\pi \\)", ["\\( 64\\pi \\)", "\\( 16\\pi \\)", "\\( 32\\pi \\)", "\\( 128\\pi \\)"]),
        ("In a right triangle, the hypotenuse has length 10 cm and one leg has length 6 cm. What is the length of the other leg in centimeters?", 8, ["8", "7", "9", "4"]),
        ("A parallelogram has a base of 15 cm and a height of 7 cm. What is its area in square centimeters?", 105, ["105", "44", "52.5", "110"]),
        ("A trapezoid has parallel bases of lengths 8 cm and 14 cm, and a height of 6 cm. What is its area in square centimeters?", 66, ["66", "132", "56", "72"]),
        ("What is the sum of the interior angles of a regular hexagon?", "\\( 720^\\circ \\)", ["\\( 720^\\circ \\)", "\\( 540^\\circ \\)", "\\( 360^\\circ \\)", "\\( 900^\\circ \\)"]),
        ("Each interior angle of a regular octagon has what degree measure?", "\\( 135^\\circ \\)", ["\\( 135^\\circ \\)", "\\( 120^\\circ \\)", "\\( 140^\\circ \\)", "\\( 108^\\circ \\)"]),
        ("A sector of a circle with radius 6 cm has a central angle of \\( 60^\\circ \\). What is the arc length of the sector in terms of \\( \\pi \\)?", "\\( 2\\pi \\)", ["\\( 2\\pi \\)", "\\( 3\\pi \\)", "\\( \\pi \\)", "\\( 4\\pi \\)"]),
    ]
    for text_item, ans_val, ch_list in geom_easy_specs:
        c_list = [clean_math(c) for c in ch_list]
        sol = f"Applying geometric definitions gives {clean_math(ans_val)}."
        add('Geometry', 'easy', text_item, c_list, 0, sol)

    # ==========================================
    # 7. Geometry | medium (16 needed)
    # ==========================================
    geom_med_specs = [
        ("A cylinder has a radius of 4 cm and a height of 9 cm. What is its total surface area in terms of \\( \\pi \\)?", "\\( 104\\pi \\)", ["\\( 104\\pi \\)", "\\( 72\\pi \\)", "\\( 144\\pi \\)", "\\( 96\\pi \\)"],
         "Total surface area = \\( 2\\pi r h + 2\\pi r^2 = 2\\pi(4)(9) + 2\\pi(16) = 72\\pi + 32\\pi = 104\\pi \\)."),
        ("A right circular cone has a base radius of 6 cm and a slant height of 10 cm. What is the volume of the cone in terms of \\( \\pi \\)?", "\\( 96\\pi \\)", ["\\( 96\\pi \\)", "\\( 120\\pi \\)", "\\( 288\\pi \\)", "\\( 60\\pi \\)"],
         "Height \\( h = \\sqrt{10^2 - 6^2} = 8 \\). Volume = \\( \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(36)(8) = 96\\pi \\)."),
        ("A sphere has a volume of \\( 288\\pi \\) cubic centimeters. What is its surface area in square centimeters?", "\\( 144\\pi \\)", ["\\( 144\\pi \\)", "\\( 72\\pi \\)", "\\( 288\\pi \\)", "\\( 216\\pi \\)"],
         "Volume \\( \\frac{4}{3}\\pi r^3 = 288\\pi \\Rightarrow r^3 = 216 \\Rightarrow r = 6 \\). Surface area = \\( 4\\pi r^2 = 4\\pi(36) = 144\\pi \\)."),
        ("A circle is defined by the equation \\( x^2 + y^2 - 6x + 8y = 0 \\). What is the radius of the circle?", 5, ["5", "25", "10", "7"],
         "Completing squares: \\( (x-3)^2 + (y+4)^2 = 9 + 16 = 25 \\). Radius \\( r = 5 \\)."),
        ("In triangle \\( ABC \\), \\( DE \\parallel BC \\) with \\( D \\) on \\( AB \\) and \\( E \\) on \\( AC \\). If \\( AD = 4 \\), \\( DB = 6 \\), and \\( DE = 8 \\), what is the length of \\( BC \\)?", 20, ["20", "12", "16", "24"],
         "By similar triangles, \\( \\frac{AD}{AB} = \\frac{DE}{BC} \\Rightarrow \\frac{4}{10} = \\frac{8}{BC} \\Rightarrow BC = 20 \\)."),
        ("A circle has center \\( (2, -3) \\) and passes through the point \\( (5, 1) \\). What is the area of the circle in terms of \\( \\pi \\)?", "\\( 25\\pi \\)", ["\\( 25\\pi \\)", "\\( 5\\pi \\)", "\\( 16\\pi \\)", "\\( 49\\pi \\)"],
         "Radius \\( r = \\sqrt{(5-2)^2 + (1 - (-3))^2} = \\sqrt{9 + 16} = 5 \\). Area = \\( \\pi r^2 = 25\\pi \\)."),
        ("A regular polygon has an exterior angle measuring \\( 24^\\circ \\). How many sides does this polygon have?", 15, ["15", "12", "18", "16"],
         "Number of sides \\( n = \\frac{360^\\circ}{24^\\circ} = 15 \\)."),
        ("In a circle, a chord of length 16 cm is 6 cm away from the center. What is the radius of the circle in centimeters?", 10, ["10", "12", "8", "\\( 2\\sqrt{7} \\)"],
         "The perpendicular bisects chord into segments of 8 cm. Radius \\( r = \\sqrt{6^2 + 8^2} = 10 \\)."),
        ("Two similar cylinders have heights in the ratio \\( 2 : 3 \\). If the volume of the smaller cylinder is 40 cubic centimeters, what is the volume of the larger cylinder in cubic centimeters?", 135, ["135", "90", "60", "120"],
         "Volume ratio is \\( (2/3)^3 = 8/27 \\). Volume = \\( 40 \\times \\frac{27}{8} = 135 \\)."),
        ("A line is tangent to the circle \\( x^2 + y^2 = 25 \\) at the point \\( (3, 4) \\). What is the slope of this tangent line?", "-\\frac{3}{4}", ["-\\frac{3}{4}", "\\frac{4}{3}", "\\frac{3}{4}", "-\\frac{4}{3}"],
         "The radius to \\( (3, 4) \\) has slope \\( 4/3 \\). Tangent line is perpendicular, so slope is \\( -3/4 \\)."),
        ("A sector of a circle with radius 12 cm has an area of \\( 48\\pi \\) square centimeters. What is the central angle of the sector in degrees?", "\\( 120^\\circ \\)", ["\\( 120^\\circ \\)", "\\( 60^\\circ \\)", "\\( 90^\\circ \\)", "\\( 150^\\circ \\)"],
         "Total area = \\( 144\\pi \\). Ratio = \\( 48\\pi / 144\\pi = 1/3 \\). Angle = \\( \\frac{1}{3} \\times 360^\\circ = 120^\\circ \\)."),
        ("An inscribed angle in a circle intercepts an arc measuring \\( 110^\\circ \\). What is the measure of the inscribed angle in degrees?", "\\( 55^\\circ \\)", ["\\( 55^\\circ \\)", "\\( 110^\\circ \\)", "\\( 70^\\circ \\)", "\\( 220^\\circ \\)"],
         "An inscribed angle is half its intercepted arc: \\( 110^\\circ / 2 = 55^\\circ \\)."),
        ("A square is inscribed in a circle of radius 6 cm. What is the area of the square in square centimeters?", 72, ["72", "36", "144", "48"],
         "Diagonal of the square = \\( 2r = 12 \\). Area = \\( d^2 / 2 = 144 / 2 = 72 \\)."),
        ("A right triangle has legs of length \\( 5\\sqrt{3} \\) and 5. What is the measure of the smallest angle in degrees?", "\\( 30^\\circ \\)", ["\\( 30^\\circ \\)", "\\( 45^\\circ \\)", "\\( 60^\\circ \\)", "\\( 15^\\circ \\)"],
         "Tangent of smallest angle = \\( 5 / (5\\sqrt{3}) = 1/\\sqrt{3} \\Rightarrow 30^\\circ \\)."),
        ("The line segment connecting \\( (-2, 5) \\) and \\( (4, -3) \\) has what length?", 10, ["10", "8", "\\( 2\\sqrt{7} \\)", "12"],
         "Distance \\( d = \\sqrt{(4 - (-2))^2 + (-3 - 5)^2} = \\sqrt{6^2 + (-8)^2} = 10 \\)."),
        ("What is the midpoint of the line segment connecting \\( (-5, 9) \\) and \\( (3, -1) \\)?", "\\( (-1, 4) \\)", ["\\( (-1, 4) \\)", "\\( (-2, 4) \\)", "\\( (-1, 5) \\)", "\\( (1, 4) \\)"],
         "Midpoint \\( ((-5+3)/2, (9-1)/2) = (-1, 4) \\)."),
    ]
    for text, ans_val, ch_list, sol in geom_med_specs:
        c_list = [f"\\( {c} \\)" if not str(c).startswith('\\(') else c for c in ch_list]
        add('Geometry', 'medium', text, c_list, 0, sol)

    # ==========================================
    # 8. Quadratics & Polynomials | medium (10 needed)
    # ==========================================
    quad_med_specs = [
        ("What is the sum of the solutions to the quadratic equation \\( 2x^2 - 8x + 5 = 0 \\)?", 4, ["4", "-4", "\\( \\frac{5}{2} \\)", "8"],
         "By Vieta's formulas, sum of roots = \\( -b/a = -(-8)/2 = 4 \\)."),
        ("What is the product of the solutions to the quadratic equation \\( 3x^2 + 11x - 12 = 0 \\)?", -4, ["-4", "4", "\\( -\\frac{11}{3} \\)", "-12"],
         "By Vieta's formulas, product of roots = \\( c/a = -12/3 = -4 \\)."),
        ("For what value of \\( k \\) does the equation \\( x^2 + 10x + k = 0 \\) have exactly one real solution?", 25, ["25", "10", "100", "5"],
         "For exactly one solution, discriminant \\( b^2 - 4ac = 0 \\Rightarrow 100 - 4k = 0 \\Rightarrow k = 25 \\)."),
        ("What is the vertex of the parabola defined by \\( y = 2x^2 - 12x + 11 \\)?", "\\( (3, -7) \\)", ["\\( (3, -7) \\)", "\\( (3, 11) \\)", "\\( (-3, -7) \\)", "\\( (6, -7) \\)"],
         "\\( h = -b/(2a) = 12/4 = 3 \\). \\( k = 2(9) - 12(3) + 11 = 18 - 36 + 11 = -7 \\). Vertex is \\( (3, -7) \\)."),
        ("If \\( f(x) = x^3 - 4x^2 + kx - 6 \\) has \\( (x - 2) \\) as a factor, what is the value of \\( k \\)?", 7, ["7", "6", "5", "8"],
         "By the Factor Theorem, \\( f(2) = 0 \\Rightarrow 8 - 16 + 2k - 6 = 0 \\Rightarrow 2k - 14 = 0 \\Rightarrow k = 7 \\)."),
        ("When polynomial \\( P(x) = 2x^3 - 3x^2 + 5x - 7 \\) is divided by \\( (x - 1) \\), what is the remainder?", -3, ["-3", "3", "-7", "0"],
         "By the Remainder Theorem, remainder = \\( P(1) = 2 - 3 + 5 - 7 = -3 \\)."),
        ("Which of the following is equivalent to \\( (3x - 2)(2x^2 + x - 4) \\)?", "\\( 6x^3 - x^2 - 14x + 8 \\)", ["\\( 6x^3 - x^2 - 14x + 8 \\)", "\\( 6x^3 + x^2 - 14x + 8 \\)", "\\( 6x^3 - x^2 + 14x - 8 \\)", "\\( 6x^3 - 7x^2 - 14x + 8 \\)"],
         "Expanding: \\( 3x(2x^2 + x - 4) - 2(2x^2 + x - 4) = 6x^3 + 3x^2 - 12x - 4x^2 - 2x + 8 = 6x^3 - x^2 - 14x + 8 \\)."),
        ("What are the roots of \\( x^2 - 6x + 13 = 0 \\)?", "\\( 3 \\pm 2i \\)", ["\\( 3 \\pm 2i \\)", "\\( -3 \\pm 2i \\)", "\\( 3 \\pm 4i \\)", "\\( 6 \\pm 2i \\)"],
         "\\( x = \\frac{6 \\pm \\sqrt{36 - 52}}{2} = \\frac{6 \\pm \\sqrt{-16}}{2} = 3 \\pm 2i \\)."),
        ("If \\( x^2 - y^2 = 48 \\) and \\( x - y = 4 \\), what is the value of \\( x + y \\)?", 12, ["12", "8", "16", "24"],
         "\\( x^2 - y^2 = (x - y)(x + y) \\Rightarrow 48 = 4(x + y) \\Rightarrow x + y = 12 \\)."),
        ("The equation \\( x^2 - kx + 36 = 0 \\) has a double root for positive \\( k \\). What is \\( k \\)?", 12, ["12", "6", "18", "36"],
         "Discriminant \\( k^2 - 144 = 0 \\Rightarrow k = 12 \\)."),
    ]
    for text, ans_val, ch_list, sol in quad_med_specs:
        c_list = [f"\\( {c} \\)" if not str(c).startswith('\\(') else c for c in ch_list]
        add('Quadratics & Polynomials', 'medium', text, c_list, 0, sol)

    # ==========================================
    # 9. Quadratics & Polynomials | hard (16 needed)
    # ==========================================
    quad_hard_specs = [
        ("If \\( a + b = 7 \\) and \\( ab = 10 \\), what is the value of \\( a^3 + b^3 \\)?", 133, ["133", "243", "343", "123"],
         "\\( a^3 + b^3 = (a + b)(a^2 - ab + b^2) = (a + b)((a + b)^2 - 3ab) = 7(49 - 30) = 7(19) = 133 \\)."),
        ("What is the minimum value attained by the quadratic function \\( f(x) = 3x^2 - 12x + 19 \\)?", 7, ["7", "19", "2", "3"],
         "Vertex \\( x = -(-12)/(6) = 2 \\). Minimum value = \\( f(2) = 3(4) - 24 + 19 = 7 \\)."),
        ("If \\( (x - 3) \\) and \\( (x + 2) \\) are factors of \\( 2x^3 - 3x^2 + ax + b \\), what is \\( a + b \\)?", -47, ["-47", "47", "-24", "12"],
         "Roots 3 and -2 satisfy polynomial. Substituting gives \\( 3a + b = -27 \\) and \\( -2a + b = 28 \\). Subtracting: \\( 5a = -55 \\Rightarrow a = -11, b = 6 \\). Sum \\( a + b = -5 \\). Let's verify: at 3: 54 - 27 + 3a + b = 0 => 3a + b = -27. At -2: -16 - 12 - 2a + b = 0 => -2a + b = 28. Then 5a = -55 => a = -11, b = 6. a+b = -5. Choices adjusted below."),
        ("For what value of \\( c \\) does the system \\( y = x^2 - 4x + c \\) and \\( y = 2x - 10 \\) have exactly one intersection point?", -1, ["-1", "1", "-5", "0"],
         "\\( x^2 - 4x + c = 2x - 10 \\Rightarrow x^2 - 6x + (c + 10) = 0 \\). For one solution, \\( \\Delta = 36 - 4(c + 10) = 0 \\Rightarrow 36 = 4c + 40 \\Rightarrow 4c = -4 \\Rightarrow c = -1 \\)."),
        ("If \\( \\alpha \\) and \\( \\beta \\) are the roots of \\( x^2 - 5x + 3 = 0 \\), what is the value of \\( \\frac{1}{\\alpha} + \\frac{1}{\\beta} \\)?", "\\( \\frac{5}{3} \\)", ["\\( \\frac{5}{3} \\)", "\\( \\frac{3}{5} \\)", "\\( -\\frac{5}{3} \\)", "5"],
         "\\( \\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{5}{3} \\)."),
        ("If \\( \\alpha \\) and \\( \\beta \\) are the roots of \\( 2x^2 - 6x + 1 = 0 \\), what is the value of \\( \\alpha^2 + \\beta^2 \\)?", 8, ["8", "9", "7", "\\( \\frac{17}{2} \\)"],
         "\\( \\alpha + \\beta = 3, \\alpha\\beta = 1/2 \\). \\( \\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 9 - 1 = 8 \\)."),
        ("Simplify the expression \\( \\frac{x^3 - 8}{x - 2} \\) for \\( x \\neq 2 \\).", "\\( x^2 + 2x + 4 \\)", ["\\( x^2 + 2x + 4 \\)", "\\( x^2 - 2x + 4 \\)", "\\( x^2 - 4 \\)", "\\( (x + 2)^2 \\)"],
         "Factoring the difference of cubes: \\( x^3 - 8 = (x - 2)(x^2 + 2x + 4) \\)."),
        ("If \\( \\frac{2x + 7}{(x - 1)(x + 2)} = \\frac{A}{x - 1} + \\frac{B}{x + 2} \\), what is the value of \\( A \\)?", 3, ["3", "-1", "2", "4"],
         "Multiply by \\( x - 1 \\) and set \\( x = 1 \\): \\( A = \\frac{2(1) + 7}{1 + 2} = \\frac{9}{3} = 3 \\)."),
        ("If \\( \\frac{5x - 2}{(x + 1)(x - 2)} = \\frac{A}{x + 1} + \\frac{B}{x - 2} \\), what is the value of \\( B \\)?", "\\( \\frac{8}{3} \\)", ["\\( \\frac{8}{3} \\)", "\\( \\frac{7}{3} \\)", "3", "2"],
         "Multiply by \\( x - 2 \\) and set \\( x = 2 \\): \\( B = \\frac{5(2) - 2}{2 + 1} = \\frac{8}{3} \\)."),
        ("What is the sum of the solutions to \\( |x^2 - 7| = 9 \\)?", 0, ["0", "8", "4", "16"],
         "\\( x^2 - 7 = 9 \\Rightarrow x^2 = 16 \\Rightarrow x = \\pm 4 \\). \\( x^2 - 7 = -9 \\Rightarrow x^2 = -2 \\) (no real roots). Sum is \\( 4 + (-4) = 0 \\)."),
        ("If the polynomial \\( x^4 + ax^2 + b \\) is divisible by \\( x^2 + 3x + 2 \\), what is \\( a + b \\)?", -1, ["-1", "1", "5", "-5"],
         "Factors are \\( x = -1 \\) and \\( x = -2 \\). At -1: \\( 1 + a + b = 0 \\Rightarrow a + b = -1 \\)."),
        ("If \\( x + \\frac{1}{x} = 5 \\), what is the value of \\( x^2 + \\frac{1}{x^2} \\)?", 23, ["23", "25", "27", "21"],
         "Square both sides: \\( (x + 1/x)^2 = x^2 + 2 + 1/x^2 = 25 \\Rightarrow x^2 + 1/x^2 = 23 \\)."),
        ("If \\( x + \\frac{1}{x} = 4 \\), what is the value of \\( x^3 + \\frac{1}{x^3} \\)?", 52, ["52", "64", "48", "60"],
         "\\( x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 64 - 12 = 52 \\)."),
        ("What is the value of \\( i^{2026} + i^{2024} \\), where \\( i = \\sqrt{-1} \\)?", 0, ["0", "2", "-2", "2i"],
         "\\( 2026 = 4(506) + 2 \\Rightarrow i^{2026} = i^2 = -1 \\). \\( 2024 = 4(506) \\Rightarrow i^{2024} = 1 \\). Sum = \\( -1 + 1 = 0 \\)."),
        ("Simplify \\( \\frac{3 + 4i}{1 - 2i} \\) into Cartesian form \\( a + bi \\).", "\\( -1 + 2i \\)", ["\\( -1 + 2i \\)", "\\( 1 + 2i \\)", "\\( -1 - 2i \\)", "\\( 2 + i \\)"],
         "Multiply numerator and denominator by \\( 1 + 2i \\): \\( \\frac{(3+4i)(1+2i)}{1 - (-4)} = \\frac{3 + 6i + 4i - 8}{5} = \\frac{-5 + 10i}{5} = -1 + 2i \\)."),
        ("Find the modulus of the complex number \\( z = \\frac{5 + 12i}{3 - 4i} \\).", "\\( \\frac{13}{5} \\)", ["\\( \\frac{13}{5} \\)", "\\( \\frac{12}{5} \\)", "\\( 13 \\)", "1"],
         "\\( |z| = \\frac{|5 + 12i|}{|3 - 4i|} = \\frac{13}{5} \\)."),
    ]
    # Update item 3 with clean values:
    quad_hard_specs[2] = ("If \\( (x - 3) \\) and \\( (x + 2) \\) are factors of \\( 2x^3 - 3x^2 + ax + b \\), what is the value of \\( a + b \\)?", -5, ["-5", "5", "-11", "6"],
         "Roots 3 and -2: \\( 3a + b = -27 \\) and \\( -2a + b = 28 \\). Solving gives \\( a = -11, b = 6 \\). Sum \\( a + b = -5 \\).")

    for text, ans_val, ch_list, sol in quad_hard_specs:
        c_list = [f"\\( {c} \\)" if not str(c).startswith('\\(') else c for c in ch_list]
        add('Quadratics & Polynomials', 'hard', text, c_list, 0, sol)

    # ==========================================
    # 10. Ratios, Rates & Data | easy (6 needed)
    # ==========================================
    rr_easy_specs = [
        ("A car travels 240 miles in 4 hours. At this constant rate, how many miles will it travel in 7 hours?", 420, ["420", "360", "480", "400"]),
        ("If 5 pens cost $7.50, how much do 12 pens cost at the same rate?", "$18.00", ["$18.00", "$15.00", "$20.00", "$16.50"]),
        ("A recipe calls for 3 cups of flour to make 24 cookies. How many cups of flour are needed to make 64 cookies?", 8, ["8", "6", "9", "10"]),
        ("A store discounts a $120 jacket by 25%. What is the sale price of the jacket?", "$90", ["$90", "$95", "$85", "$100"]),
        ("An item originally priced at $80 is marked up by 15%. What is the new price?", "$92", ["$92", "$95", "$90", "$88"]),
        ("A map scale indicates that 2 centimeters represents 50 kilometers. How many kilometers are represented by 7 centimeters?", 175, ["175", "150", "200", "160"]),
    ]
    for text_item, ans_val, ch_list in rr_easy_specs:
        c_list = [clean_math(c) for c in ch_list]
        sol = f"Using direct proportion gives {clean_math(ans_val)}."
        add('Ratios, Rates & Data', 'easy', text_item, c_list, 0, sol)

    # ==========================================
    # 11. Ratios, Rates & Data | medium (26 needed)
    # ==========================================
    rr_med_specs = [
        ("Pump A can fill a tank alone in 6 hours, and Pump B can fill the same tank alone in 3 hours. How many hours will it take both pumps working together to fill the tank?", 2, ["2", "4.5", "2.5", "1.5"]),
        ("Pipe X fills a pool in 8 hours, while Pipe Y empties it in 12 hours. If both pipes are open simultaneously, how many hours will it take to fill the empty pool?", 24, ["24", "20", "10", "16"]),
        ("A cyclist travels uphill at 12 mph for 2 hours and downhill along the same route at 24 mph. What is the cyclist's average speed for the entire round trip in miles per hour?", 16, ["16", "18", "15", "20"]),
        ("A chemist mixes 20 liters of a 30% acid solution with 30 liters of a 50% acid solution. What is the concentration of the resulting mixture?", "42%", ["42%", "40%", "45%", "38%"]),
        ("How many liters of pure water must be added to 40 liters of a 25% salt solution to dilute it to a 10% salt solution?", 60, ["60", "50", "40", "75"]),
        ("The population of a town increased by 20% in the first year and then decreased by 15% in the second year. What was the net percentage change over the two years?", "Increase of 2%", ["Increase of 2%", "Increase of 5%", "Decrease of 2%", "No change"]),
        ("A retailer increases the price of an item by 25% and then offers a 20% discount on the new price. How does the final price compare to the original price?", "Equal to original price", ["Equal to original price", "5% higher", "5% lower", "2% higher"]),
        ("If 8 workers can pave a road in 15 days, how many days would it take 12 workers working at the same rate to pave the same road?", 10, ["10", "12", "8", "14"]),
        ("A train travels at 72 kilometers per hour. What is its speed in meters per second?", 20, ["20", "25", "18", "15"]),
        ("A runner completes a 10,000-meter race in 40 minutes. What is the runner's average speed in kilometers per hour?", 15, ["15", "12", "16", "14"]),
        ("The ratio of copper to zinc in an alloy is \\( 7 : 3 \\). If the alloy weighs 150 grams, how many grams of copper are in the alloy?", 105, ["105", "45", "90", "120"]),
        ("In a school club, the ratio of freshmen to sophomores is \\( 3 : 4 \\), and the ratio of sophomores to juniors is \\( 2 : 5 \\). What is the ratio of freshmen to juniors?", "\\( 3 : 10 \\)", ["\\( 3 : 10 \\)", "\\( 6 : 20 \\)", "\\( 2 : 5 \\)", "\\( 3 : 5 \\)"]),
        ("A car's value depreciates by 10% each year. If its initial purchase price was $20,000, what is its value at the end of 2 years?", "$16,200", ["$16,200", "$16,000", "$18,000", "$15,800"]),
        ("An investment of $5,000 earns 6% annual simple interest. What is the total accumulated value after 4 years?", "$6,200", ["$6,200", "$6,000", "$6,500", "$5,800"]),
        ("A printer prints 45 pages in 3 minutes. How many seconds does it take to print 12 pages at this constant speed?", 48, ["48", "36", "60", "45"]),
        ("Machine A produces 200 bolts in 50 minutes, and Machine B produces 300 bolts in 60 minutes. Working simultaneously, how many bolts do both machines produce in 2 hours?", 1080, ["1080", "1000", "1200", "960"]),
        ("A distance of 150 miles is covered in 2 hours and 30 minutes. What was the average speed in miles per hour?", 60, ["60", "65", "55", "70"]),
        ("A solution of 60 liters contains 15% alcohol. How many liters of pure alcohol must be added to produce a 32% alcohol solution?", 15, ["15", "12", "18", "20"]),
        ("A store sells an item for $180, making a profit of 20% over its wholesale cost. What was the wholesale cost?", "$150", ["$150", "$144", "$160", "$140"]),
        ("If \\( y \\) varies directly as \\( x \\) and \\( y = 28 \\) when \\( x = 4 \\), what is \\( y \\) when \\( x = 9 \\)?", 63, ["63", "56", "72", "60"]),
        ("If \\( z \\) varies inversely as \\( w \\) and \\( z = 12 \\) when \\( w = 5 \\), what is \\( z \\) when \\( w = 15 \\)?", 4, ["4", "3", "6", "5"]),
        ("If \\( y \\) is jointly proportional to \\( x \\) and \\( z \\), and \\( y = 36 \\) when \\( x = 3 \\) and \\( z = 4 \\), what is \\( y \\) when \\( x = 5 \\) and \\( z = 2 \\)?", 30, ["30", "24", "36", "40"]),
        ("A tank is 40% full. After adding 36 gallons, it becomes 70% full. What is the total capacity of the tank in gallons?", 120, ["120", "100", "150", "110"]),
        ("The price of gasoline drops by 15% and then rises by 20%. What is the net overall percentage change?", "Increase of 2%", ["Increase of 2%", "Increase of 5%", "Decrease of 2%", "Increase of 1%"]),
        ("A worker is paid $18 per hour for the first 40 hours and 1.5 times the hourly rate for overtime. What is the gross pay for a 46-hour work week?", "$882", ["$882", "$864", "$900", "$850"]),
        ("A scale model of a building is built at a scale of \\( 1 : 200 \\). If the model is 65 cm tall, what is the actual height of the building in meters?", 130, ["130", "13", "1300", "65"]),
    ]
    for text_item, ans_val, ch_list in rr_med_specs:
        c_list = [clean_math(c) for c in ch_list]
        sol = f"Solving through rates and algebraic proportions yields {clean_math(ans_val)}."
        add('Ratios, Rates & Data', 'medium', text_item, c_list, 0, sol)

    # ==========================================
    # 12. Statistics & Probability | easy (11 needed)
    # ==========================================
    stat_easy_specs = [
        ("What is the median of the data set: 12, 18, 14, 25, 31, 16, 22?", 18, ["18", "16", "22", "19"]),
        ("What is the mean of the numbers: 15, 25, 35, 45, 55?", 35, ["35", "30", "40", "32"]),
        ("What is the range of the following data set: 4, 9, 15, 23, 41, 18?", 37, ["37", "41", "35", "39"]),
        ("A single fair 6-sided die is rolled. What is the probability of rolling a prime number?", "\\( \\frac{1}{2} \\)", ["\\( \\frac{1}{2} \\)", "\\( \\frac{1}{3} \\)", "\\( \\frac{2}{3} \\)", "\\( \\frac{1}{6} \\)"]),
        ("A bag contains 5 red, 7 blue, and 8 green marbles. If one marble is drawn at random, what is the probability that it is blue?", "\\( \\frac{7}{20} \\)", ["\\( \\frac{7}{20} \\)", "\\( \\frac{1}{4} \\)", "\\( \\frac{2}{5} \\)", "\\( \\frac{7}{13} \\)"]),
        ("The scores of 5 students on a quiz are 80, 85, 90, 95, and \\( x \\). If the mean score is 88, what is the value of \\( x \\)?", 90, ["90", "88", "92", "85"]),
        ("What is the mode of the data set: 7, 3, 9, 3, 5, 8, 3, 7, 6?", 3, ["3", "7", "6", "5"]),
        ("A standard 52-card deck is shuffled. What is the probability of drawing an Ace at random?", "\\( \\frac{1}{13} \\)", ["\\( \\frac{1}{13} \\)", "\\( \\frac{1}{4} \\)", "\\( \\frac{1}{52} \\)", "\\( \\frac{2}{13} \\)"]),
        ("A coin is flipped 3 times. What is the probability of getting exactly 2 heads?", "\\( \\frac{3}{8} \\)", ["\\( \\frac{3}{8} \\)", "\\( \\frac{1}{2} \\)", "\\( \\frac{1}{4} \\)", "\\( \\frac{5}{8} \\)"]),
        ("In a class of 30 students, 18 play soccer and 12 do not. If a student is chosen at random, what is the probability that the student does NOT play soccer?", "\\( \\frac{2}{5} \\)", ["\\( \\frac{2}{5} \\)", "\\( \\frac{3}{5} \\)", "\\( \\frac{1}{2} \\)", "\\( \\frac{1}{3} \\)"]),
        ("The average of 4 numbers is 20. If a fifth number 35 is added, what is the new average?", 23, ["23", "25", "22", "24"]),
    ]
    for text_item, ans_val, ch_list in stat_easy_specs:
        c_list = [clean_math(c) for c in ch_list]
        sol = f"Using statistical and probability formulas yields {clean_math(ans_val)}."
        add('Statistics & Probability', 'easy', text_item, c_list, 0, sol)

    # ==========================================
    # 13. Statistics & Probability | medium (5 needed)
    # ==========================================
    stat_med_specs = [
        ("Two fair standard 6-sided dice are rolled. What is the probability that the sum of the two numbers is equal to 8?", "\\( \\frac{5}{36} \\)", ["\\( \\frac{5}{36} \\)", "\\( \\frac{1}{6} \\)", "\\( \\frac{1}{9} \\)", "\\( \\frac{7}{36} \\)"],
         "Favorable pairs for sum = 8: (2,6), (3,5), (4,4), (5,3), (6,2). Total 5 pairs out of 36."),
        ("In a survey of 100 students, 60 like math, 50 like physics, and 30 like both. If a student is selected at random, what is the probability that the student likes math OR physics?", "\\( \\frac{4}{5} \\)", ["\\( \\frac{4}{5} \\)", "\\( \\frac{7}{10} \\)", "\\( \\frac{3}{10} \\)", "\\( \\frac{9}{10} \\)"],
         "\\( P(M \\cup P) = P(M) + P(P) - P(M \\cap P) = (60 + 50 - 30)/100 = 80/100 = 4/5 \\)."),
        ("A committee of 3 people is to be chosen from a group of 5 men and 4 women. What is the probability that the committee consists of 2 men and 1 woman?", "\\( \\frac{10}{21} \\)", ["\\( \\frac{10}{21} \\)", "\\( \\frac{5}{14} \\)", "\\( \\frac{1}{2} \\)", "\\( \\frac{2}{7} \\)"],
         "Total ways = \\( \\binom{9}{3} = 84 \\). Favorable = \\( \\binom{5}{2} \\times \\binom{4}{1} = 10 \\times 4 = 40 \\). Ratio = \\( 40/84 = 10/21 \\)."),
        ("Data Set X consists of 10 values with a mean of 50 and standard deviation 4. Data Set Y is created by multiplying each value in X by 3 and adding 5. What is the standard deviation of Data Set Y?", 12, ["12", "17", "4", "36"],
         "Linear transformation: multiplying by 3 scales standard deviation by 3, while adding a constant does not change spread. New standard deviation = \\( 4 \\times 3 = 12 \\)."),
        ("In a normal distribution with mean 70 and standard deviation 5, approximately what percentage of the data lies between 60 and 80?", "95%", ["95%", "68%", "99.7%", "90%"],
         "60 and 80 correspond to \\( \\mu \\pm 2\\sigma \\). By the empirical rule, approximately 95% of data falls within 2 standard deviations."),
    ]
    for text, ans_val, ch_list, sol in stat_med_specs:
        c_list = [f"\\( {c} \\)" if not str(c).startswith('\\(') and not '%' in str(c) else c for c in ch_list]
        add('Statistics & Probability', 'medium', text, c_list, 0, sol)

    # ==========================================
    # 14. Heart of Algebra | easy (13 needed)
    # ==========================================
    alg_easy_specs = [
        ("Solve for \\( x \\): \\( 3(2x - 5) = 4x + 7 \\).", 11, ["11", "9", "12", "8"]),
        ("If \\( 5x - 8 = 22 \\), what is the value of \\( 2x + 3 \\)?", 15, ["15", "12", "18", "6"]),
        ("What is the slope of the line given by the equation \\( 4x - 2y = 10 \\)?", 2, ["2", "-2", "4", "\\( \\frac{1}{2} \\)"]),
        ("What is the \\( y \\)-intercept of the line \\( 3x + 5y = 15 \\)?", "\\( (0, 3) \\)", ["\\( (0, 3) \\)", "\\( (0, 5) \\)", "\\( (5, 0) \\)", "\\( (0, -3) \\)"]),
        ("Solve the system of equations: \\( x + y = 14 \\) and \\( x - y = 6 \\). What is \\( x \\)?", 10, ["10", "4", "8", "12"]),
        ("Which value of \\( x \\) satisfies the inequality \\( 4 - 3x \\le 16 \\)?", "\\( x \\ge -4 \\)", ["\\( x \\ge -4 \\)", "\\( x \\le -4 \\)", "\\( x \\ge 4 \\)", "\\( x \\le 4 \\)"]),
        ("If \\( \\frac{2}{3}x - 4 = 6 \\), what is the value of \\( x \\)?", 15, ["15", "12", "18", "10"]),
        ("A line passes through the points \\( (2, 5) \\) and \\( (6, 13) \\). What is the slope of the line?", 2, ["2", "3", "\\( \\frac{1}{2} \\)", "4"]),
        ("If \\( 7x + 2y = 24 \\) and \\( y = 5 \\), what is the value of \\( x \\)?", 2, ["2", "3", "4", "1"]),
        ("What is the solution to the equation \\( 2(x + 4) = 5(x - 2) \\)?", 6, ["6", "4", "8", "5"]),
        ("If \\( |x - 4| = 9 \\), what is the sum of all possible values of \\( x \\)?", 8, ["8", "0", "18", "9"]),
        ("A taxi service charges a flat fee of $3.50 plus $2.25 per mile. Which equation represents total cost \\( C \\) for \\( m \\) miles?", "\\( C = 2.25m + 3.50 \\)", ["\\( C = 2.25m + 3.50 \\)", "\\( C = 3.50m + 2.25 \\)", "\\( C = 5.75m \\)", "\\( C = 2.25m - 3.50 \\)"]),
        ("If \\( 3a + 4b = 20 \\) and \\( b = 2 \\), what is the value of \\( a \\)?", 4, ["4", "3", "5", "6"]),
    ]
    for text_item, ans_val, ch_list in alg_easy_specs:
        c_list = [clean_math(c) for c in ch_list]
        sol = f"Solving algebraically gives {clean_math(ans_val)}."
        add('Heart of Algebra', 'easy', text_item, c_list, 0, sol)

    # ==========================================
    # 15. Heart of Algebra | hard (4 needed)
    # ==========================================
    alg_hard_specs = [
        ("For what value of constant \\( k \\) will the system of linear equations \\( 3x - 5y = 8 \\) and \\( 6x + ky = 16 \\) have infinitely many solutions?", -10, ["-10", "10", "-5", "6"],
         "For infinitely many solutions, coefficients must be proportional: \\( \\frac{3}{6} = \\frac{-5}{k} = \\frac{8}{16} \\Rightarrow \\frac{1}{2} = \\frac{-5}{k} \\Rightarrow k = -10 \\)."),
        ("For what value of \\( a \\) does the system \\( ax + 4y = 7 \\) and \\( 3x + 2y = 5 \\) have no solutions?", 6, ["6", "-6", "3", "4"],
         "Lines must be parallel: \\( \\frac{a}{3} = \\frac{4}{2} \\Rightarrow \\frac{a}{3} = 2 \\Rightarrow a = 6 \\)."),
        ("If \\( |3x - 5| = |x + 7| \\), what is the product of all real solutions for \\( x \\)?", -3, ["-3", "3", "-6", "6"],
         "Case 1: \\( 3x - 5 = x + 7 \\Rightarrow 2x = 12 \\Rightarrow x = 6 \\). Case 2: \\( 3x - 5 = -(x + 7) \\Rightarrow 4x = -2 \\Rightarrow x = -1/2 \\). Product = \\( 6 \\times (-1/2) = -3 \\)."),
        ("If the system \\( 2x - 3y \\le 6 \\) and \\( x + 2y \\le 8 \\) defines a feasible region in the first quadrant (\\( x \\ge 0, y \\ge 0 \\)), what is the maximum value of \\( P = 3x + 4y \\)?", 22, ["22", "18", "16", "24"],
         "Corner points: (0,0), (3,0), (0,4), and intersection of lines: \\( 2x - 3y = 6 \\) and \\( x + 2y = 8 \\Rightarrow x = 8 - 2y \\Rightarrow 2(8-2y) - 3y = 6 \\Rightarrow 16 - 7y = 6 \\Rightarrow y = 10/7, x = 36/7 \\). At (0,4): P = 16. At (3,0): P = 9. Wait, at (8,0)? But 2x - 3y <= 6 at (8,0) is 16 <= 6 False! So intersection is (36/7, 10/7): P = 3(36/7) + 4(10/7) = 148/7 = 21.14. Max on region is 16 at (0,4)? Let's replace with simpler vertex."),
    ]
    alg_hard_specs[3] = ("If the line \\( 2x + ky = 14 \\) is perpendicular to the line \\( 3x - 4y = 9 \\), what is the value of \\( k \\)?", "\\( \\frac{3}{2} \\)", ["\\( \\frac{3}{2} \\)", "-\\frac{3}{2}", "\\( \\frac{8}{3} \\)", "-\\frac{8}{3}"],
         "The slope of \\( 3x - 4y = 9 \\) is \\( 3/4 \\). A perpendicular line has slope \\( -4/3 \\). The slope of \\( 2x + ky = 14 \\) is \\( -2/k \\). Equating: \\( -2/k = -4/3 \\Rightarrow 4k = 6 \\Rightarrow k = 3/2 \\).")

    for text, ans_val, ch_list, sol in alg_hard_specs:
        c_list = [f"\\( {c} \\)" if not str(c).startswith('\\(') else c for c in ch_list]
        add('Heart of Algebra', 'hard', text, c_list, 0, sol)

    # ==========================================
    # 16. Functions & Graphs | easy (2 needed)
    # ==========================================
    add('Functions & Graphs', 'easy',
        "If \\( f(x) = 3x^2 - 5x + 4 \\), what is the value of \\( f(-2) \\)?",
        ["26", "6", "18", "22"],
        0,
        "\\( f(-2) = 3(-2)^2 - 5(-2) + 4 = 3(4) + 10 + 4 = 12 + 10 + 4 = 26 \\).")

    add('Functions & Graphs', 'easy',
        "If \\( g(x) = 2x - 7 \\) and \\( g(k) = 11 \\), what is the value of \\( k \\)?",
        ["9", "8", "10", "7"],
        0,
        "\\( 2k - 7 = 11 \\Rightarrow 2k = 18 \\Rightarrow k = 9 \\).")

    # ==========================================
    # 17. Functions & Graphs | hard (1 needed)
    # ==========================================
    add('Functions & Graphs', 'hard',
        "If \\( f(x) = \\frac{2x + 3}{x - 4} \\) for \\( x \\neq 4 \\), what is the inverse function \\( f^{-1}(x) \\)?",
        ["\\( \\frac{4x + 3}{x - 2} \\)", "\\( \\frac{x - 4}{2x + 3} \\)", "\\( \\frac{4x - 3}{x + 2} \\)", "\\( \\frac{2x - 3}{x + 4} \\)"],
        0,
        "Set \\( y = \\frac{2x + 3}{x - 4} \\Rightarrow y(x - 4) = 2x + 3 \\Rightarrow xy - 4y = 2x + 3 \\Rightarrow xy - 2x = 4y + 3 \\Rightarrow x(y - 2) = 4y + 3 \\Rightarrow x = \\frac{4y + 3}{y - 2} \\). Thus \\( f^{-1}(x) = \\frac{4x + 3}{x - 2} \\).")

    # Check that we generated the exact counts required:
    for key, items in new_items_by_key.items():
        needed = sum(1 for _, d, diff in dup_slots if f"{d} | {diff}" == key)
        print(f"Key: {key:<45} Needed: {needed:<3} Generated: {len(items)}")
        assert len(items) >= needed, f"Not enough items for {key}: needed {needed}, got {len(items)}"

    # Now replace the duplicates in data['pool']
    for idx, domain, diff in dup_slots:
        key = f"{domain} | {diff}"
        replacement = new_items_by_key[key].pop(0)
        data['pool'][idx] = replacement

    # Verify no duplicates remaining in data['pool']
    final_stems = set()
    final_dups = 0
    for q in data['pool']:
        s = q.get('text', '').strip().lower()
        if s in final_stems:
            final_dups += 1
        else:
            final_stems.add(s)

    print(f"\nFinal verification: remaining duplicates in est.json = {final_dups}")
    assert final_dups == 0, f"Error: {final_dups} duplicates still present in est.json"

    with open(bank_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("Successfully wrote updated est.json with 0 duplicates!")

if __name__ == '__main__':
    main()
