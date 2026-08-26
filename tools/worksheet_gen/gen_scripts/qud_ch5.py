# -*- coding: utf-8 -*-
"""50 new MCQs for Qudrat ch.5 — Quantitative Comparisons. The genre already
has a fixed 4-choice answer set (A greater / B greater / equal / cannot be
determined), so every item reuses that same choice set — the "own idea" is
in what's being compared, not the answer format. Distinct from the existing
42 free-response comparisons throughout (different values/setups)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=505)
LABELS = ["Column A is greater", "Column B is greater", "The two columns are equal",
          "The relationship cannot be determined from the given information"]


def qc(section, q, correct_i, answer, figure=None):
    correct = LABELS[correct_i]
    distractors = [l for j, l in enumerate(LABELS) if j != correct_i]
    b.mcq(section, q, correct, distractors, answer, figure=figure)


# --- Numeric comparisons (4) ---
qc("Numeric comparisons", r"Column A: $6\times7$. Column B: $5\times9-3$. Compare the two columns.",
   2, r"$42$ vs $45-3=42$: equal.")
qc("Numeric comparisons", r"Column A: $345+678$. Column B: $900+100$. Compare the two columns.",
   0, r"$1{,}023$ vs $1{,}000$: Column A is greater.")
qc("Numeric comparisons", r"Column A: $11^2$. Column B: $10^2+23$. Compare the two columns.",
   1, r"$121$ vs $123$: Column B is greater.")
qc("Numeric comparisons", r"Column A: $(-4)^2$. Column B: $-4^2$. Compare the two columns.",
   0, r"$16$ vs $-16$: Column A is greater.")

# --- Fraction and decimal comparisons (4) ---
qc("Fraction and decimal comparisons", r"Column A: $\dfrac{5}{8}$. Column B: $0.62$. Compare the two columns.",
   0, r"$\dfrac{5}{8}=0.625$, which is greater than $0.62$.")
qc("Fraction and decimal comparisons", r"Column A: $\dfrac{9}{16}$. Column B: $0.5625$. Compare the two columns.",
   2, r"$\dfrac{9}{16}=0.5625$ exactly: equal.")
qc("Fraction and decimal comparisons", r"Column A: $3\dfrac{1}{6}$. Column B: $\dfrac{19}{6}$. Compare the two columns.",
   2, r"$3\dfrac{1}{6}=\dfrac{19}{6}$: equal.")
qc("Fraction and decimal comparisons", r"Column A: $0.7$. Column B: $\dfrac{5}{7}$. Compare the two columns.",
   1, r"$\dfrac{5}{7}\approx0.714$, which is greater than $0.7$.")

# --- Percent comparisons (4) ---
qc("Percent comparisons", r"Column A: $20\%$ of $150$. Column B: $25\%$ of $120$. Compare the two columns.",
   2, r"$30$ vs $30$: equal.")
qc("Percent comparisons", r"Column A: $45\%$ of $80$. Column B: $40\%$ of $100$. Compare the two columns.",
   1, r"$36$ vs $40$: Column B is greater.")
qc("Percent comparisons",
   r"Column A: the result of decreasing $100$ by $20\%$, then increasing that result by $20\%$. Column B: $96$.",
   2, r"$100\times0.8\times1.2=96$: equal.")
qc("Percent comparisons", r"Column A: $18\%$ of $50$. Column B: $9\%$ of $90$. Compare the two columns.",
   0, r"$9$ vs $8.1$: Column A is greater.")

# --- Exponent and root comparisons (4) ---
qc("Exponent and root comparisons", r"Column A: $\sqrt{72}$. Column B: $8.5$. Compare the two columns.",
   1, r"$\sqrt{72}\approx8.49$, which is less than $8.5$.")
qc("Exponent and root comparisons", r"Column A: $3^5$. Column B: $5^3$. Compare the two columns.",
   0, r"$243$ vs $125$: Column A is greater.")
qc("Exponent and root comparisons", r"Column A: $\sqrt{0.16}$. Column B: $0.4$. Compare the two columns.",
   2, r"$\sqrt{0.16}=0.4$ exactly: equal.")
qc("Exponent and root comparisons", r"Column A: $2^6$. Column B: $6^2$. Compare the two columns.",
   0, r"$64$ vs $36$: Column A is greater.")

# --- Algebraic comparisons at a fixed value (4) ---
qc("Algebraic comparisons at a fixed value",
   r"Given $x=6$. Column A: $3x-4$. Column B: $x+10$. Compare the two columns.",
   1, r"$14$ vs $16$: Column B is greater.")
qc("Algebraic comparisons at a fixed value",
   r"Given $x=3$. Column A: $(x+1)^2$. Column B: $x^2+2x+1$. Compare the two columns.",
   2, r"Both equal $16$ (this is an identity, true for every $x$): equal.")
qc("Algebraic comparisons at a fixed value",
   r"Given $n=-3$. Column A: $n^2$. Column B: $n^3$. Compare the two columns.",
   0, r"$9$ vs $-27$: Column A is greater.")
qc("Algebraic comparisons at a fixed value",
   r"Given $x=2$. Column A: $4x+1$. Column B: $3(x+2)$. Compare the two columns.",
   1, r"$9$ vs $12$: Column B is greater.")

# --- Comparisons requiring testing values (6) ---
qc("Comparisons requiring testing values",
   r"For any real number $x$: Column A: $x^2$. Column B: $0$. Compare the two columns.",
   3, r"$x^2$ is always $\geq0$, but could equal $0$ (at $x=0$) or exceed it — not always the same relationship.")
qc("Comparisons requiring testing values",
   r"For any integer $n$: Column A: $n$. Column B: $-n$. Compare the two columns.",
   3, r"If $n>0$, A is greater; if $n<0$, B is greater; if $n=0$, they are equal — it varies.")
qc("Comparisons requiring testing values",
   r"For any real number $x$ with $x\neq0$: Column A: $x^2$. Column B: $0$. Compare the two columns.",
   0, r"Since $x\neq0$, $x^2$ is always strictly positive, so Column A is always greater.")
qc("Comparisons requiring testing values",
   r"For any real number $x$: Column A: $(x+2)^2$. Column B: $x^2+4x+4$. Compare the two columns.",
   2, r"$(x+2)^2=x^2+4x+4$ for every $x$: equal.")
qc("Comparisons requiring testing values",
   r"Given only that $m$ is a positive integer: Column A: $m$. Column B: $m^2$. Compare the two columns.",
   3, r"At $m=1$ they are equal; for $m>1$, Column B is greater — it varies.")
qc("Comparisons requiring testing values",
   r"For any real number $x$: Column A: $-x$. Column B: $x-1$. Compare the two columns.",
   3, r"$-x-(x-1)=1-2x$, whose sign depends on $x$ — it varies.")

# --- Geometry comparisons (5) ---
qc("Geometry comparisons",
   r"Column A: the circumference of the circle shown (use $\pi\approx3.14$). Column B: $32$.",
   1, r"$C=2(3.14)(5)=31.4$, which is less than $32$.",
   figure={"type": "circle", "radius": 5, "radius_label": "r = 5"})
qc("Geometry comparisons",
   r"Column A: the area of the rectangle shown. Column B: the perimeter of a square with side $7$.",
   0, r"Rectangle area $=9\times4=36$; square perimeter $=4\times7=28$. Column A is greater.",
   figure={"type": "rect", "vertices": [[0, 0], [9, 0], [9, 4], [0, 4]],
           "side_labels": ["9", "4", None, None]})
qc("Geometry comparisons",
   r"Column A: the sum of the interior angles of a hexagon. Column B: the sum of the interior angles of two triangles.",
   0, r"Hexagon $=720^{\circ}$; two triangles $=180+180=360^{\circ}$. Column A is greater.")
qc("Geometry comparisons",
   r"Column A: the hypotenuse of the right triangle shown. Column B: $16$.",
   1, r"$\sqrt{9^2+12^2}=\sqrt{225}=15$, which is less than $16$.",
   figure={"type": "triangle", "vertices": [[0, 0], [12, 0], [12, 9]],
           "right_angle_at": 1, "side_labels": ["12", "9", None]})
qc("Geometry comparisons",
   r"Column A: the volume of a cylinder with radius $3$ and height $7$ (use $\pi\approx3.14$). Column B: $200$.",
   1, r"$V=3.14\times9\times7=197.82$, which is less than $200$.")

# --- Ratio and proportion comparisons (4) ---
qc("Ratio and proportion comparisons",
   r"Column A: the value of $x$, if $x:15=2:5$. Column B: $7$.",
   1, r"$x=15\times\dfrac{2}{5}=6$, which is less than $7$.")
qc("Ratio and proportion comparisons",
   r"Two numbers are in the ratio $4:7$, and their sum is $99$. Column A: the smaller number. Column B: $40$.",
   1, r"Each part $=99\div11=9$; smaller $=4\times9=36$, which is less than $40$.")
qc("Ratio and proportion comparisons",
   r"Column A: the sum of the parts in the simplified form of the ratio $24:36$. Column B: $5$.",
   2, r"$24:36$ simplifies to $2:3$; $2+3=5$: equal.")
qc("Ratio and proportion comparisons",
   r"A recipe uses water and rice in the ratio $2:1$. Column A: the water needed for $300$ g of rice. Column B: $550$ g.",
   0, r"Water $=2\times300=600$ g, which is greater than $550$ g.")

# --- Data and probability comparisons (4) ---
qc("Data and probability comparisons",
   r"A data set is $5,8,8,10,14$. Column A: the mean. Column B: the median.",
   0, r"Mean $=\dfrac{45}{5}=9$; median $=8$. Column A is greater.")
qc("Data and probability comparisons",
   r"Column A: the range of the data set $6,11,19,25$. Column B: $19$.",
   2, r"Range $=25-6=19$: equal.")
qc("Data and probability comparisons",
   r"A bag contains 4 green balls and 9 yellow balls. Column A: the probability of drawing a green ball. Column B: $0.4$.",
   1, r"$P=\dfrac{4}{13}\approx0.31$, which is less than $0.4$: Column B is greater.")
qc("Data and probability comparisons",
   r"A data set is $2,4,4,4,6$. Column A: the mode. Column B: the mean.",
   2, r"Mode $=4$; mean $=\dfrac{20}{5}=4$: equal.")

# --- Word-problem comparisons (4) ---
qc("Word-problem comparisons",
   r"Column A: the total cost of 5 items at 20 riyals each, after a $15\%$ discount on the total. Column B: $90$.",
   1, r"$5\times20=100$; after discount $=100\times0.85=85$, which is less than $90$.")
qc("Word-problem comparisons",
   r"Layla's age is 4 years less than three times Huda's age. Huda is 9. Column A: Layla's age. Column B: $25$.",
   1, r"Layla $=3(9)-4=23$, which is less than $25$.")
qc("Word-problem comparisons",
   r"Column A: the simple interest on 3,000 riyals at $4\%$ per year for 2 years. Column B: $250$.",
   1, r"$I=3{,}000\times0.04\times2=240$, which is less than $250$.")
qc("Word-problem comparisons",
   r"A car travels 300 km using 25 liters of fuel. Column A: the distance travelled per liter. Column B: 12 km.",
   2, r"$300\div25=12$ km per liter: equal.")

# --- Comparisons with inequalities and ranges (4) ---
qc("Comparisons with inequalities and ranges",
   r"Given that $3<x<8$. Column A: $x$. Column B: $5$.",
   3, r"$x$ could be less than, equal to, or greater than $5$ within this range — it varies.")
qc("Comparisons with inequalities and ranges",
   r"Given that $x<-4$. Column A: $x$. Column B: $-4$.",
   1, r"Every value less than $-4$ is smaller than $-4$, so Column B is always greater.")
qc("Comparisons with inequalities and ranges",
   r"Given that $-3\leq x\leq2$. Column A: $x^2$. Column B: $9$.",
   3, r"At $x=-3$, $x^2=9$ (equal); at $x=0$, $x^2=0$ (Column B greater) — it varies.")
qc("Comparisons with inequalities and ranges",
   r"Given that $x\geq7$. Column A: $x^2$. Column B: $49$.",
   3, r"At $x=7$ they are equal; for $x>7$, Column A is greater — it varies.")

# --- More geometry comparisons (3) ---
qc("More geometry comparisons",
   r"Column A: the volume of the cube shown. Column B: the volume of a rectangular box $4\times5\times7$.",
   1, r"Cube $=5^3=125$; box $=4\times5\times7=140$. Column B is greater.",
   figure={"type": "solid", "solid": "cube", "dims": [5, 5, 5], "labels": {"l": "5 cm"}})
qc("More geometry comparisons",
   r"Column A: the circumference of a circle with radius $7$ cm (use $\pi=\dfrac{22}{7}$). Column B: the area of a square with side $11$ cm.",
   1, r"Circumference $=2\times\dfrac{22}{7}\times7=44$; square area $=121$. Column B is greater.")
qc("More geometry comparisons",
   r"Column A: the sum of the interior angles of the octagon shown. Column B: four times the sum of the interior angles of a triangle.",
   0, r"Octagon $=(8-2)\times180=1{,}080^{\circ}$; four triangles $=4\times180=720^{\circ}$. Column A is greater.",
   figure={"type": "polygon",
           "vertices": [[1, 0], [3, 0], [4, 1], [4, 3], [3, 4], [1, 4], [0, 3], [0, 1]]})

b.check(50)
