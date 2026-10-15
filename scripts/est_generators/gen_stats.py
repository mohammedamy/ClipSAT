import random
from .common import make_est_mcq, shuffle_choices

def generate_stats_questions(count=110):
    questions = []

    # Template 1: Two-way table conditional probability
    for _ in range(count // 5):
        # Two categories: Grade 10, Grade 11; Activity: Debate, Robotics, Sports
        d10 = random.randint(15, 30)
        d11 = random.randint(15, 30)
        r10 = random.randint(18, 35)
        r11 = random.randint(18, 35)
        
        # Table of 4 cells: Grade 10/11 vs French/Spanish
        tot_10 = d10 + r10
        # What is the probability that a randomly chosen Grade 10 student studies Spanish (r10)?
        text = f"The table below shows the distribution of second-language elective courses chosen by 10th and 11th grade students at an international school:\n\n" \
               f"| Grade | French | Spanish | Total |\n" \
               f"| :--- | :--- | :--- | :--- |\n" \
               f"| 10th Grade | {d10} | {r10} | {tot_10} |\n" \
               f"| 11th Grade | {d11} | {r11} | {d11 + r11} |\n" \
               f"| Total | {d10 + d11} | {r10 + r11} | {tot_10 + d11 + r11} |\n\n" \
               f"If a student is chosen at random from the 10th grade, what is the probability that the student studies Spanish?"
        
        correct_frac = f"\\( \\frac{{{r10}}}{{{tot_10}}} \\)"
        distractors = [
            f"\\( \\frac{{{r10}}}{{{r10 + r11}}} \\)",
            f"\\( \\frac{{{d10}}}{{{tot_10}}} \\)",
            f"\\( \\frac{{{r10}}}{{{tot_10 + d11 + r11}}} \\)"
        ]
        opts, idx = shuffle_choices(correct_frac, distractors)
        sol = f"This is a conditional probability problem with the condition restricted to 10th grade students.\nThe total number of students in the 10th grade (the restricted sample space) is \\({d10} + {r10} = {tot_10}\\).\nThe number of 10th grade students enrolled in Spanish is \\({r10}\\).\nTherefore, the probability is \\( P(\\text{{Spanish}} \\mid \\text{{10th Grade}}) = \\frac{{{r10}}}{{{tot_10}}} \\)."
        questions.append(make_est_mcq("Statistics & Probability", text, opts, idx, sol, "medium"))

    # Template 2: Interquartile Range (IQR) calculation from ordered data
    for _ in range(count // 5):
        # 11 data points
        base = random.randint(10, 40)
        step = random.randint(2, 6)
        vals = sorted([base + i * step + random.randint(0, 2) for i in range(11)])
        # Q1 is 3rd element (index 2), Q2 is 6th (index 5), Q3 is 9th (index 8)
        q1 = vals[2]
        q3 = vals[8]
        iqr = q3 - q1
        vals_str = ", ".join(str(v) for v in vals)
        text = f"Consider the following set of 11 exam scores listed in ascending order:\n\\[ {vals_str} \\]\nWhat is the interquartile range (IQR) of this data set?"
        distractors = [
            f"\\({vals[-1] - vals[0]}\\)", # full range
            f"\\({vals[5]}\\)", # median
            f"\\({iqr + 3}\\)",
            f"\\({q1}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({iqr}\\)", distractors)
        sol = f"For 11 ordered data points, the median (\\(Q_2\\)) is the 6th value: \\({vals[5]}\\).\nThe lower half of the data consists of the first 5 values: \\({vals[:5]}\\), with lower quartile \\(Q_1 = {q1}\\) (the median of the lower half).\nThe upper half consists of the last 5 values: \\({vals[6:]}\\), with upper quartile \\(Q_3 = {q3}\\) (the median of the upper half).\nThe interquartile range (IQR) is:\n\\[ \\text{{IQR}} = Q_3 - Q_1 = {q3} - {q1} = {iqr} \\]."
        questions.append(make_est_mcq("Statistics & Probability", text, opts, idx, sol, "easy"))

    # Template 3: Margin of Error and Sample Size
    for _ in range(count // 5):
        pct = random.randint(42, 68)
        moe = random.randint(2, 4)
        n = random.choice([500, 800, 1000, 1200])
        text = f"A survey of {n} randomly selected voters found that {pct}% support a new public transit initiative, with an associated margin of error of {moe} percentage points at a 95% confidence level. Which of the following is the most plausible conclusion from this result?"
        correct_ans = f"It is plausible that the true proportion of voters in the entire population who support the initiative is between {pct - moe}% and {pct + moe}%."
        distractors = [
            f"Exactly {pct}% of all voters in the population definitely support the initiative.",
            f"Between {pct - 2*moe}% and {pct + 2*moe}% of the sample respondents supported the initiative.",
            f"If another survey of {n} voters is conducted, exactly {pct}% of them will support the initiative."
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"A sample estimate with a margin of error \\(\\pm m\\) creates a confidence interval \\([p - m, p + m]\\) for the true population parameter.\nHere, the interval is \\([{pct} - {moe}\\%, {pct} + {moe}\\%] = [{pct - moe}\\%, {pct + moe}\\%]\\).\nThis interval represents plausible values for the actual percentage of the entire target population, not just the sample."
        questions.append(make_est_mcq("Statistics & Probability", text, opts, idx, sol, "medium"))

    # Template 4: Standard Deviation comparison between two distributions
    for _ in range(count // 5):
        text = f"Data Set A has values clustered closely around its mean of 50, ranging from 48 to 52. Data Set B has the same mean of 50, but its values are widely dispersed, ranging from 20 to 80. Both sets have 100 observations. Which statement correctly compares their standard deviations, \\( s_A \\) and \\( s_B \\)?"
        correct_ans = "\\( s_A < s_B \\), because Data Set B has greater variability around the mean"
        distractors = [
            "\\( s_A = s_B \\), because both sets have identical means of 50",
            "\\( s_A > s_B \\), because Data Set A is more densely concentrated",
            "There is not enough information to compare the standard deviations without individual data values"
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"Standard deviation measures the typical distance or spread of data values from their arithmetic mean.\nData Set A is tightly clustered within \\([48, 52]\\), so deviations \\(|x - 50|\\) are small.\nData Set B has values spread out over \\([20, 80]\\), so deviations \\(|x - 50|\\) are much larger.\nTherefore, the standard deviation of Data Set A is strictly less than that of Data Set B: \\( s_A < s_B \\)."
        questions.append(make_est_mcq("Statistics & Probability", text, opts, idx, sol, "easy"))

    # Template 5: Residual calculation in regression y - y_hat
    for _ in range(count - len(questions)):
        m = round(random.uniform(1.5, 3.5), 1)
        b = random.randint(10, 25)
        x_pt = random.randint(4, 12)
        y_pred = m * x_pt + b
        # actual y differs by residual
        res = random.choice([-4, -3, -2, 2, 3, 4, 5])
        y_act = round(y_pred + res, 1)
        text = f"A line of best fit for a data set has equation \\( \\hat{{y}} = {m}x + {b} \\). One of the actual data points in the sample is \\( ({x_pt}, {y_act}) \\). What is the residual for this data point?"
        distractors = [
            f"\\({-res}\\)",
            f"\\({round(y_pred, 1)}\\)",
            f"\\({round(y_act + y_pred, 1)}\\)",
            f"\\({m}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({res}\\)", distractors)
        sol = f"A residual is defined as the difference between the observed (actual) \\(y\\)-value and the predicted \\(\\hat{{y}}\\) value:\n\\[ \\text{{Residual}} = y - \\hat{{y}} \\]\nCompute predicted value at \\(x = {x_pt}\\):\n\\[ \\hat{{y}} = {m}({x_pt}) + {b} = {m * x_pt} + {b} = {round(y_pred, 1)} \\]\nCompute residual:\n\\[ \\text{{Residual}} = {y_act} - {round(y_pred, 1)} = {res} \\]."
        questions.append(make_est_mcq("Statistics & Probability", text, opts, idx, sol, "medium"))

    return questions
