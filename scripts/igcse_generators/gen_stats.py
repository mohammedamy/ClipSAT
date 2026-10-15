"""
scripts/igcse_generators/gen_stats.py
Generates diverse, authentic Cambridge IGCSE 0580 questions for the Probability & Statistics domain.
Covers: Histograms (Frequency Density), Cumulative Frequency, Box Plots, Tree Diagrams.
"""

from .common import make_q

def get_stats_questions():
    qs = []
    dom = "Probability & Statistics"

    # ==================== EASY ====================
    qs.append(make_q(dom, "easy",
        r"On a histogram, what does the area of each bar represent?",
        ["The class width", "The frequency", "The frequency density", "The cumulative frequency"],
        1,
        r"In a histogram, the area of each rectangular bar is proportional to (or equal to) the frequency of that class: \( \text{Frequency} = \text{Frequency density} \times \text{Class width} \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"In a grouped frequency table, a class interval is \( 20 \le x < 35 \) with a frequency of 30. What is the frequency density of this bar on a histogram?",
        ["1.5", "2.0", "0.5", "15"],
        1,
        r"Class width = \( 35 - 20 = 15 \). Frequency density = \( \dfrac{\text{Frequency}}{\text{Class width}} = \dfrac{30}{15} = 2.0 \). [M1 for freq/width, A1 for 2.0]"))
    qs.append(make_q(dom, "easy",
        r"A cumulative frequency diagram is plotted for 80 students. At what cumulative frequency value do you read the median score?",
        ["20", "40", "60", "80"],
        1,
        r"The median of 80 data values is located at the 50% position: \( \dfrac{80}{2} = 40 \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"From a cumulative frequency graph, the lower quartile \( Q_1 \) is 28 and the upper quartile \( Q_3 \) is 54. Calculate the interquartile range (IQR).",
        ["26", "28", "41", "82"],
        0,
        r"Interquartile range = \( Q_3 - Q_1 = 54 - 28 = 26 \). [B1]"))

    # ==================== MEDIUM ====================
    qs.append(make_q(dom, "medium",
        r"A bag contains 5 red counters and 3 blue counters. A counter is chosen at random, its colour recorded, and it is NOT replaced. A second counter is then chosen. What is the probability that both counters are red?",
        [r"\( \dfrac{5}{14} \)", r"\( \dfrac{25}{64} \)", r"\( \dfrac{5}{8} \)", r"\( \dfrac{15}{56} \)"],
        0,
        r"First draw: \( P(\text{Red}) = \dfrac{5}{8} \). Second draw without replacement: \( P(\text{Red}) = \dfrac{4}{7} \). Combined probability = \( \dfrac{5}{8} \times \dfrac{4}{7} = \dfrac{20}{56} = \dfrac{5}{14} \). [M1 for 5/8 * 4/7, A1 for 5/14]"))
    qs.append(make_q(dom, "medium",
        r"A bag contains 6 white balls and 4 black balls. Two balls are drawn at random without replacement. What is the probability of drawing one ball of each colour?",
        [r"\( \dfrac{8}{15} \)", r"\( \dfrac{4}{15} \)", r"\( \dfrac{12}{25} \)", r"\( \dfrac{2}{5} \)"],
        0,
        r"Two mutually exclusive sequences yield one of each colour: (White then Black) or (Black then White). \( P(W \text{ then } B) = \dfrac{6}{10} \times \dfrac{4}{9} = \dfrac{24}{90} = \dfrac{4}{15} \). \( P(B \text{ then } W) = \dfrac{4}{10} \times \dfrac{6}{9} = \dfrac{24}{90} = \dfrac{4}{15} \). Total probability = \( \dfrac{4}{15} + \dfrac{4}{15} = \dfrac{8}{15} \). [M1 for each path, A1 for 8/15]"))
    qs.append(make_q(dom, "medium",
        r"The probability that it rains on Monday is 0.3. If it rains on Monday, the probability it rains on Tuesday is 0.6. If it does not rain on Monday, the probability it rains on Tuesday is 0.2. What is the probability that it rains on at least one of the two days?",
        ["0.44", "0.56", "0.50", "0.62"],
        0,
        r"Calculate the complement \( P(\text{no rain on either day}) \): \( P(\text{no rain Mon}) = 1 - 0.3 = 0.7 \). \( P(\text{no rain Tue} \mid \text{no rain Mon}) = 1 - 0.2 = 0.8 \). \( P(\text{no rain either day}) = 0.7 \times 0.8 = 0.56 \). Therefore, \( P(\text{rain at least once}) = 1 - 0.56 = 0.44 \). [M1 for 0.7 * 0.8 = 0.56, A1 for 1 - 0.56 = 0.44]"))
    qs.append(make_q(dom, "medium",
        r"On a histogram, the class \( 0 \le w < 10 \) has a height of 1.4 cm and represents a frequency of 28. What frequency is represented by a bar for class \( 10 \le w < 25 \) with a height of 2.0 cm?",
        ["40", "60", "50", "75"],
        1,
        r"Class 1 width = 10, height = 1.4 cm \( \implies \) Area 1 = \( 10 \times 1.4 = 14 \text{ cm}^2 \) represents 28 items, so \( 1 \text{ cm}^2 \) represents \( \dfrac{28}{14} = 2 \) items. Class 2 width = \( 25 - 10 = 15 \), height = 2.0 cm \( \implies \) Area 2 = \( 15 \times 2.0 = 30 \text{ cm}^2 \). Frequency = \( 30 \times 2 = 60 \). [M1 for scale factor 2 items/cm^2, A1 for 60]"))

    # ==================== HARD ====================
    qs.append(make_q(dom, "hard",
        r"A cumulative frequency graph for 120 marathon runners shows that the 90th percentile finish time is 3 hours 45 minutes. How many runners finished in a time faster than 3 hours 45 minutes?",
        ["12 runners", "90 runners", "108 runners", "100 runners"],
        2,
        r"The 90th percentile corresponds to \( 90\% \) of 120 runners: \( 0.90 \times 120 = 108 \) runners. These 108 runners finished at or below this time (faster). [M1 for 0.90*120, A1 for 108]"))
    qs.append(make_q(dom, "hard",
        r"A bag contains \( n \) marbles, of which 4 are green. Two marbles are taken at random without replacement. If the probability that both are green is \( \dfrac{2}{15} \), find the total number of marbles \( n \).",
        ["6", "8", "10", "12"],
        2,
        r"\( P(\text{both green}) = \dfrac{4}{n} \times \dfrac{3}{n - 1} = \dfrac{12}{n(n - 1)} \). Set equal to \( \dfrac{2}{15} \): \( \dfrac{12}{n(n - 1)} = \dfrac{2}{15} \implies 2n(n - 1) = 180 \implies n(n - 1) = 90 \implies n^2 - n - 90 = 0 \implies (n - 10)(n + 9) = 0 \). Since \( n > 0 \), \( n = 10 \). [M1 for setting up probability equation, M1 for quadratic n(n-1)=90, A1 for 10]"))

    return qs
