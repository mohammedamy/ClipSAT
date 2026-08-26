# -*- coding: utf-8 -*-
"""Qudrat Ch.1 Arithmetic & Number Sense — 50 new MCQs, EN+AR."""
import json, random, math
from fractions import Fraction as F

random.seed(101)

def shuffle4(correct, distractors, fmt):
    """correct + 3 distractors -> (choices[4], correct_index), fmt applied to each."""
    vals = [correct] + distractors
    assert len(set(map(str, vals))) == 4, f"duplicate choice: {vals}"
    order = [0,1,2,3]
    random.shuffle(order)
    choices = [fmt(vals[i]) for i in order]
    ci = order.index(0)
    return choices, ci

Q = []  # list of dicts: {section, q, choices, correct, answer, figure(optional)}

def add(section, q, choices, correct, answer, figure=None):
    d = {"section": section, "q": q, "choices": choices, "correct": correct, "answer": answer}
    if figure: d["figure"] = figure
    Q.append(d)

# ---------- Section 1: Order of operations (5) ----------
# Q1: 20 - 4*3 + 6/2
v = 20 - 4*3 + 6//2  # 20-12+3=11
c,ci = shuffle4(v, [17, 9, 27], lambda x: f"${x}$")
add("Order of operations", r"Evaluate $20-4\times3+6\div2$.", c, ci,
    r"Multiply/divide first: $4\times3=12$, $6\div2=3$. Then $20-12+3=11$.")

# Q2: (5+3)^2 - 2*7
v = (5+3)**2 - 2*7  # 64-14=50
c,ci = shuffle4(v, [78, 36, 46], lambda x: f"${x}$")
add("Order of operations", r"Evaluate $(5+3)^2-2\times7$.", c, ci,
    r"Brackets and power first: $(5+3)^2=8^2=64$. Then $2\times7=14$, so $64-14=50$.")

# Q3: 45 / (3+6) * 2
v = 45 // (3+6) * 2  # 45/9*2=10
c,ci = shuffle4(v, [15, 7.5, 90], lambda x: f"${x}$")
add("Order of operations", r"Evaluate $\dfrac{45}{3+6}\times2$.", c, ci,
    r"Brackets first: $3+6=9$. Then $45\div9=5$, and $5\times2=10$.")

# Q4: 3 + 2*(8-5)^2
v = 3 + 2*(8-5)**2  # 3+2*9=21
c,ci = shuffle4(v, [33, 45, 17], lambda x: f"${x}$")
add("Order of operations", r"Evaluate $3+2\times(8-5)^2$.", c, ci,
    r"Brackets, then power: $(8-5)^2=3^2=9$. Then $2\times9=18$, so $3+18=21$.")

# Q5: 100 - 3*(4+2*3)
v = 100 - 3*(4+2*3)  # 100-3*10=70
c,ci = shuffle4(v, [88, 64, 91], lambda x: f"${x}$")
add("Order of operations", r"Evaluate $100-3\times(4+2\times3)$.", c, ci,
    r"Inside the brackets, multiply first: $2\times3=6$, so $4+6=10$. Then $3\times10=30$, and $100-30=70$.")

# ---------- Section 2: Exponents and roots (5) ----------
v = 2**5  # 32
c,ci = shuffle4(v, [10, 16, 25], lambda x: f"${x}$")
add("Exponents and roots", r"Evaluate $2^5$.", c, ci, r"$2^5=2\times2\times2\times2\times2=32$.")

v = int(math.isqrt(196))  # 14
c,ci = shuffle4(v, [13, 15, 98], lambda x: f"${x}$")
add("Exponents and roots", r"Evaluate $\sqrt{196}$.", c, ci, r"$14\times14=196$, so $\sqrt{196}=14$.")

v = 3**2 * 3**4  # 3^6=729
c,ci = shuffle4(v, [81, 27, 243], lambda x: f"${x}$")
add("Exponents and roots", r"Use the laws of exponents to evaluate $3^2\times3^4$.", c, ci,
    r"$3^2\times3^4=3^{2+4}=3^6=729$.")

v = int(math.isqrt(225)) + int(math.isqrt(64))  # 15+8=23
c,ci = shuffle4(v, [17, 30, 19], lambda x: f"${x}$")
add("Exponents and roots", r"Evaluate $\sqrt{225}+\sqrt{64}$.", c, ci,
    r"$\sqrt{225}=15$ and $\sqrt{64}=8$, so the sum is $15+8=23$.")

v = 5**3 - 4**2  # 125-16=109
c,ci = shuffle4(v, [93, 121, 45], lambda x: f"${x}$")
add("Exponents and roots", r"Evaluate $5^3-4^2$.", c, ci, r"$5^3=125$ and $4^2=16$, so $125-16=109$.")

# ---------- Section 3: Fraction operations (6) ----------
v = F(2,5) + F(1,4)  # 13/20
c,ci = shuffle4(str(v), [str(F(3,9)), str(F(1,2)), str(F(11,20))], lambda x: f"$\\dfrac{{{F(x).numerator if isinstance(x,str) else x}}}{{{F(x).denominator if isinstance(x,str) else 1}}}$" if False else None)
# simpler: build fraction latex directly
def fracstr(fr):
    fr = F(fr)
    return rf"\dfrac{{{fr.numerator}}}{{{fr.denominator}}}"
correct = F(2,5)+F(1,4)
distr = [F(3,9), F(1,2), F(11,20)]
vals = [correct]+distr
order=[0,1,2,3]; random.shuffle(order)
choices=[f"${fracstr(vals[i])}$" for i in order]; ci=order.index(0)
add("Fraction operations", r"Compute $\dfrac{2}{5}+\dfrac{1}{4}$.", choices, ci,
    r"LCD $=20$: $\dfrac{8}{20}+\dfrac{5}{20}=\dfrac{13}{20}$.")

correct = F(5,6)-F(1,3)
distr = [F(4,3), F(1,2), F(2,3)]
vals=[correct]+distr; order=[0,1,2,3]; random.shuffle(order)
choices=[f"${fracstr(vals[i])}$" for i in order]; ci=order.index(0)
add("Fraction operations", r"Compute $\dfrac{5}{6}-\dfrac{1}{3}$.", choices, ci,
    r"LCD $=6$: $\dfrac{5}{6}-\dfrac{2}{6}=\dfrac{3}{6}=\dfrac{1}{2}$.")

correct = F(3,4)*F(2,9)
distr = [F(5,13), F(6,36), F(2,3)]
vals=[correct]+distr; order=[0,1,2,3]; random.shuffle(order)
choices=[f"${fracstr(vals[i])}$" for i in order]; ci=order.index(0)
add("Fraction operations", r"Compute $\dfrac{3}{4}\times\dfrac{2}{9}$.", choices, ci,
    r"$\dfrac{3\times2}{4\times9}=\dfrac{6}{36}=\dfrac{1}{6}$.")

correct = F(7,8)/F(7,4)
distr = [F(49,32), F(1,2), F(7,2)]
vals=[correct]+distr; order=[0,1,2,3]; random.shuffle(order)
choices=[f"${fracstr(vals[i])}$" for i in order]; ci=order.index(0)
add("Fraction operations", r"Compute $\dfrac{7}{8}\div\dfrac{7}{4}$.", choices, ci,
    r"Multiply by the reciprocal: $\dfrac{7}{8}\times\dfrac{4}{7}=\dfrac{28}{56}=\dfrac{1}{2}$.")

correct = F(1,3)+F(1,4)+F(1,6)
distr = [F(3,13), F(1,2), F(2,3)]
vals=[correct]+distr; order=[0,1,2,3]; random.shuffle(order)
choices=[f"${fracstr(vals[i])}$" for i in order]; ci=order.index(0)
add("Fraction operations", r"Compute $\dfrac{1}{3}+\dfrac{1}{4}+\dfrac{1}{6}$.", choices, ci,
    r"LCD $=12$: $\dfrac{4}{12}+\dfrac{3}{12}+\dfrac{2}{12}=\dfrac{9}{12}=\dfrac{3}{4}$.")

correct = F(5,9) - F(1,6)
distr = [F(4,3), F(7,18), F(4,15)]
vals=[correct]+distr; order=[0,1,2,3]; random.shuffle(order)
choices=[f"${fracstr(vals[i])}$" for i in order]; ci=order.index(0)
add("Fraction operations", r"Compute $\dfrac{5}{9}-\dfrac{1}{6}$.", choices, ci,
    r"LCD $=18$: $\dfrac{10}{18}-\dfrac{3}{18}=\dfrac{7}{18}$.")

print(f"Built {len(Q)} so far (target: sections 1-3 = 16)")

import pickle
with open('/tmp/qud_ch1_part1.pkl','wb') as f:
    pickle.dump(Q, f)
