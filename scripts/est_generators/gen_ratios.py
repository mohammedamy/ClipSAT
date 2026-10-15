import random
from .common import make_est_mcq, shuffle_choices

def generate_ratios_questions(count=120):
    questions = []

    # Template 1: Successive discounts / percent change
    for _ in range(count // 5):
        orig_price = random.choice([80, 100, 120, 150, 200])
        disc1 = random.choice([10, 20, 25])
        disc2 = random.choice([10, 15, 20])
        # price after disc1
        p1 = orig_price * (100 - disc1) / 100.0
        # price after disc2
        final_p = round(p1 * (100 - disc2) / 100.0, 2)
        total_pct_off = round((orig_price - final_p) / orig_price * 100, 1)
        text = f"An item with an original price of \\${orig_price} is discounted by {disc1}%. A store loyalty member then receives an additional {disc2}% off the discounted price. What is the final price of the item?"
        c_ans = f"\\${final_p:.2f}"
        # Common wrong answer: adding percentages disc1 + disc2
        wrong_add = orig_price * (100 - (disc1 + disc2)) / 100.0
        distractors = [
            f"\\${wrong_add:.2f}",
            f"\\${final_p + 12:.2f}",
            f"\\${orig_price * (100 - disc1) / 100.0:.2f}"
        ]
        opts, idx = shuffle_choices(c_ans, distractors)
        sol = f"Successive percentage discounts must be applied sequentially, not added together:\n1) First discount of {disc1}%:\n\\[ P_1 = \\${orig_price} \\times (1 - {disc1/100}) = \\${orig_price} \\times {1 - disc1/100:.2f} = \\${p1:.2f} \\]\n2) Second discount of {disc2}% applied to \\${p1:.2f}:\n\\[ P_2 = \\${p1:.2f} \\times (1 - {disc2/100}) = \\${p1:.2f} \\times {1 - disc2/100:.2f} = \\${final_p:.2f} \\]."
        questions.append(make_est_mcq("Ratios, Rates & Data", text, opts, idx, sol, "easy"))

    # Template 2: Inverse Variation
    for _ in range(count // 5):
        # y = k / x => x1 * y1 = x2 * y2
        x1 = random.randint(3, 8)
        y1 = random.choice([12, 16, 20, 24, 30])
        k = x1 * y1
        x2 = random.choice([2, 4, 6, 10, 12])
        while k % x2 != 0 or x2 == x1:
            x2 = random.choice([2, 4, 6, 10, 12])
        y2 = k // x2
        text = f"The variables \\( x \\) and \\( y \\) vary inversely. When \\( x = {x1} \\), \\( y = {y1} \\). What is the value of \\( y \\) when \\( x = {x2} \\)?"
        distractors = [
            f"\\({(y1 * x2) // x1}\\)", # direct variation distractor
            f"\\({y2 + 4}\\)",
            f"\\({y2 - 3}\\)",
            f"\\({k}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({y2}\\)", distractors)
        sol = f"For inverse variation, the product of \\( x \\) and \\( y \\) is a constant \\( k \\):\n\\[ x \\times y = k \\]\nUsing the given initial values \\( x = {x1} \\) and \\( y = {y1} \\):\n\\[ k = {x1} \\times {y1} = {k} \\]\nWhen \\( x = {x2} \\):\n\\[ {x2} \\times y = {k} \\Rightarrow y = \\frac{{{k}}}{{{x2}}} = {y2} \\]."
        questions.append(make_est_mcq("Ratios, Rates & Data", text, opts, idx, sol, "easy"))

    # Template 3: Work-Rate problem
    for _ in range(count // 5):
        t1 = random.choice([3, 4, 6])
        t2 = random.choice([6, 12])
        # 1/t1 + 1/t2 = (t1 + t2)/(t1*t2) => t_together = (t1*t2)/(t1+t2)
        together = (t1 * t2) / (t1 + t2)
        if together == int(together):
            together_str = f"\\({int(together)}\\)"
        else:
            together_str = f"\\({together:.1f}\\)"
        text = f"Worker A can complete a landscaping project alone in {t1} hours, and Worker B can complete the same project alone in {t2} hours. Working together at their respective constant rates, how many hours will it take them to complete the project?"
        distractors = [
            f"\\({(t1 + t2) / 2}\\)", # average distractor
            f"\\({t1 + t2}\\)", # sum distractor
            f"\\({int(together) + 2 if together==int(together) else round(together+1.5, 1)}\\)"
        ]
        opts, idx = shuffle_choices(together_str, distractors)
        sol = f"Determine the hourly work rate of each worker:\n- Rate of Worker A = \\( \\frac{{1}}{{{t1}}} \\) project per hour\n- Rate of Worker B = \\( \\frac{{1}}{{{t2}}} \\) project per hour\nCombined rate when working together:\n\\[ \\text{{Rate}}_{{\\text{{total}}}} = \\frac{{1}}{{{t1}}} + \\frac{{1}}{{{t2}}} = \\frac{{{t2} + {t1}}}{{{t1 * t2}}} = \\frac{{{t1 + t2}}}{{{t1 * t2}}} \\]\nTime required \\( T = \\frac{{1}}{{\\text{{Rate}}_{{\\text{{total}}}}}} = \\frac{{{t1 * t2}}}{{{t1 + t2}}} = {together_str.replace('\\(', '').replace('\\)', '')} \\text{{ hours}} \\]."
        questions.append(make_est_mcq("Ratios, Rates & Data", text, opts, idx, sol, "medium"))

    # Template 4: Mixture concentration problem
    for _ in range(count // 5):
        v1 = random.choice([20, 30, 40])
        p1 = random.choice([10, 20])
        v2 = random.choice([20, 30, 40])
        p2 = random.choice([40, 50, 60])
        # (v1*p1 + v2*p2) / (v1 + v2)
        tot_solute = v1 * p1 + v2 * p2
        tot_vol = v1 + v2
        final_pct = round(tot_solute / tot_vol, 1)
        final_pct_str = f"{int(final_pct)}%" if final_pct == int(final_pct) else f"{final_pct}%"
        text = f"A chemist mixes {v1} mL of a {p1}% saline solution with {v2} mL of a {p2}% saline solution. What is the saline concentration percentage of the resulting mixture?"
        distractors = [
            f"{(p1 + p2) // 2}%", # simple unweighted average
            f"{int(final_pct) + 8}%",
            f"{p1 + 5}%"
        ]
        opts, idx = shuffle_choices(final_pct_str, distractors)
        sol = f"Calculate the total amount of pure saline solute:\n- From Solution 1: \\( {v1} \\times {p1/100} = {v1 * p1 / 100} \\text{{ mL}} \\)\n- From Solution 2: \\( {v2} \\times {p2/100} = {v2 * p2 / 100} \\text{{ mL}} \\)\nTotal solute = \\( {v1 * p1 / 100 + v2 * p2 / 100} \\text{{ mL}} \\).\nTotal volume = \\( {v1} + {v2} = {tot_vol} \\text{{ mL}} \\).\nConcentration percentage:\n\\[ \\text{{Concentration}} = \\frac{{{v1 * p1 / 100 + v2 * p2 / 100}}}{{{tot_vol}}} \\times 100\\% = {final_pct_str} \\]."
        questions.append(make_est_mcq("Ratios, Rates & Data", text, opts, idx, sol, "medium"))

    # Template 5: Speed, Distance, and Time Unit Conversion
    for _ in range(count - len(questions)):
        speed_mph = random.choice([45, 60, 75])
        hours = random.choice([2, 3, 4])
        # distance in miles
        dist_miles = speed_mph * hours
        text = f"A car travels at an average speed of {speed_mph} miles per hour for {hours} hours. How many miles does the car travel?"
        distractors = [
            f"\\({speed_mph * 2}\\)",
            f"\\({dist_miles + 25}\\)",
            f"\\({dist_miles - 15}\\)",
            f"\\({speed_mph // hours}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({dist_miles}\\)", distractors)
        sol = f"Using the distance formula \\( d = r \\times t \\), where \\( r \\) is speed and \\( t \\) is time:\n\\[ d = {speed_mph} \\text{{ mph}} \\times {hours} \\text{{ hours}} = {dist_miles} \\text{{ miles}} \\]."
        questions.append(make_est_mcq("Ratios, Rates & Data", text, opts, idx, sol, "easy"))

    return questions
