# -*- coding: utf-8 -*-
"""Qudrat Ch.1 Arithmetic & Number Sense — 50 new MCQs (EN)."""
import sys, os, math, json
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank, fracstr, mixedstr, F

b = Bank(seed=101)
m = b.mcq

# ---- Order of operations (5) ----
m("Order of operations", r"Evaluate $20-4\times3+6\div2$.",
  20-4*3+6//2, [17, 9, 27],
  r"Multiply/divide first: $4\times3=12$, $6\div2=3$. Then $20-12+3=11$.")
m("Order of operations", r"Evaluate $(5+3)^2-2\times7$.",
  (5+3)**2-2*7, [78, 36, 46],
  r"Brackets and power first: $(5+3)^2=8^2=64$. Then $2\times7=14$, so $64-14=50$.")
m("Order of operations", r"Evaluate $\dfrac{45}{3+6}\times2$.",
  45//(3+6)*2, [15, 90, 7],
  r"Brackets first: $3+6=9$. Then $45\div9=5$, and $5\times2=10$.")
m("Order of operations", r"Evaluate $3+2\times(8-5)^2$.",
  3+2*(8-5)**2, [33, 45, 17],
  r"Brackets, then power: $(8-5)^2=3^2=9$. Then $2\times9=18$, so $3+18=21$.")
m("Order of operations", r"Evaluate $100-3\times(4+2\times3)$.",
  100-3*(4+2*3), [88, 64, 91],
  r"Inside the brackets, multiply first: $2\times3=6$, so $4+6=10$. Then $3\times10=30$, and $100-30=70$.")

# ---- Exponents and roots (5) ----
m("Exponents and roots", r"Evaluate $2^5$.", 2**5, [10, 16, 25],
  r"$2^5=2\times2\times2\times2\times2=32$.")
m("Exponents and roots", r"Evaluate $\sqrt{196}$.", int(math.isqrt(196)), [13, 15, 98],
  r"$14\times14=196$, so $\sqrt{196}=14$.")
m("Exponents and roots", r"Use the laws of exponents to evaluate $3^2\times3^4$.",
  3**2*3**4, [81, 27, 243],
  r"$3^2\times3^4=3^{2+4}=3^6=729$.")
m("Exponents and roots", r"Evaluate $\sqrt{225}+\sqrt{64}$.",
  int(math.isqrt(225))+int(math.isqrt(64)), [17, 30, 19],
  r"$\sqrt{225}=15$ and $\sqrt{64}=8$, so the sum is $15+8=23$.")
m("Exponents and roots", r"Evaluate $5^3-4^2$.", 5**3-4**2, [93, 121, 45],
  r"$5^3=125$ and $4^2=16$, so $125-16=109$.")

# ---- Fraction operations (6) ----
def add_frac(sec, q, c, ds, ans):
    m(sec, q, c, ds, ans, fmt=lambda v: f"${fracstr(v)}$")

add_frac("Fraction operations", r"Compute $\dfrac{2}{5}+\dfrac{1}{4}$.",
  F(2,5)+F(1,4), [F(3,9), F(1,2), F(11,20)],
  r"LCD $=20$: $\dfrac{8}{20}+\dfrac{5}{20}=\dfrac{13}{20}$.")
add_frac("Fraction operations", r"Compute $\dfrac{5}{6}-\dfrac{1}{3}$.",
  F(5,6)-F(1,3), [F(4,3), F(2,3), F(1,3)],
  r"LCD $=6$: $\dfrac{5}{6}-\dfrac{2}{6}=\dfrac{3}{6}=\dfrac{1}{2}$.")
add_frac("Fraction operations", r"Compute $\dfrac{3}{4}\times\dfrac{2}{9}$.",
  F(3,4)*F(2,9), [F(5,13), F(5,36), F(2,3)],
  r"$\dfrac{3\times2}{4\times9}=\dfrac{6}{36}=\dfrac{1}{6}$.")
add_frac("Fraction operations", r"Compute $\dfrac{7}{8}\div\dfrac{7}{4}$.",
  F(7,8)/F(7,4), [F(49,32), F(7,2), F(1,4)],
  r"Multiply by the reciprocal: $\dfrac{7}{8}\times\dfrac{4}{7}=\dfrac{28}{56}=\dfrac{1}{2}$.")
add_frac("Fraction operations", r"Compute $\dfrac{1}{3}+\dfrac{1}{4}+\dfrac{1}{6}$.",
  F(1,3)+F(1,4)+F(1,6), [F(3,13), F(1,2), F(2,3)],
  r"LCD $=12$: $\dfrac{4}{12}+\dfrac{3}{12}+\dfrac{2}{12}=\dfrac{9}{12}=\dfrac{3}{4}$.")
add_frac("Fraction operations", r"Compute $\dfrac{5}{9}-\dfrac{1}{6}$.",
  F(5,9)-F(1,6), [F(4,3), F(4,15), F(1,3)],
  r"LCD $=18$: $\dfrac{10}{18}-\dfrac{3}{18}=\dfrac{7}{18}$.")

# ---- Fraction comparison / ordering (3), with numberline figures ----
m("Comparing fractions and decimals",
  r"Which value is largest: the point shown on the number line, $\dfrac{3}{5}$, or $0.55$?",
  "The marked point ($0.7$)", [r"$\dfrac{3}{5}$", "$0.55$", "They are all equal"],
  r"The marked point is at $0.7$. Since $\dfrac{3}{5}=0.6$ and $0.55<0.6<0.7$, the marked point is largest.",
  figure={"type":"numberline","min":0,"max":1,"marks":[{"x":0.7,"label":"?"}],"width":260})
m("Comparing fractions and decimals", r"Which is larger, $\dfrac{5}{7}$ or $\dfrac{4}{5}$?",
  r"$\dfrac{4}{5}$", [r"$\dfrac{5}{7}$", "They are equal", r"Cannot be determined"],
  r"Cross-multiply: $5\times5=25$ and $4\times7=28$. Since $28>25$, $\dfrac{4}{5}$ is larger.")
m("Comparing fractions and decimals", r"Order from least to greatest: $0.62$, $\dfrac{5}{8}$, $0.6$.",
  r"$0.6<0.62<\dfrac{5}{8}$", [r"$\dfrac{5}{8}<0.6<0.62$", r"$0.62<0.6<\dfrac{5}{8}$", r"$0.6<\dfrac{5}{8}<0.62$"],
  r"$\dfrac{5}{8}=0.625$. Ordered: $0.6<0.62<0.625$.")

# ---- Decimal operations (4) ----
m("Decimal operations", r"Compute $4.75+2.6$.", 7.35, [7.01, 6.35, 7.41],
  r"Align decimal points: $4.75+2.60=7.35$.")
m("Decimal operations",
  r"The number line marks the value of $9.2-3.45$. Where does it land?",
  "$5.75$", ["$6.25$", "$5.85$", "$5.65$"],
  r"Align decimal points: $9.20-3.45=5.75$.",
  figure={"type":"numberline","min":5,"max":6.5,"marks":[{"x":5.75,"label":"?"}],"width":260})
m("Decimal operations", r"Compute $1.4\times0.6$.", 0.84, [0.24, 8.4, 0.74],
  r"$14\times6=84$, and there are $2$ total decimal places, so $1.4\times0.6=0.84$.")
m("Decimal operations", r"Compute $9.6\div0.4$.", 24, [2.4, 0.24, 38.4],
  r"Multiply both by $10$: $96\div4=24$.")

# ---- Scientific notation / place value (4) ----
m("Scientific notation & place value",
  r"Write $6{,}200{,}000$ in the form $a\times10^n$ with $1\leq a<10$.",
  r"$6.2\times10^6$", [r"$6.2\times10^5$", r"$62\times10^5$", r"$6.2\times10^7$"],
  r"Move the decimal point $6$ places: $6{,}200{,}000=6.2\times10^6$.")
m("Scientific notation & place value",
  r"The bar chart shows four city populations. Which one equals $7\times10^3$?",
  "$7{,}000$", ["$6{,}800$", "$7{,}300$", "$6{,}500$"],
  r"$7\times10^3=7{,}000$, matching the second bar exactly.",
  figure={"type":"bars","categories":["6,500","7,000","6,800","7,300"],"values":[6500,7000,6800,7300],"ylabel":"population","width":240})
m("Scientific notation & place value",
  r"Evaluate $3.4\times10^4$ as an ordinary number.", "$34{,}000$", ["$3{,}400$", "$340{,}000$", "$3{,}400{,}000$"],
  r"Move the decimal point $4$ places right: $3.4\times10^4=34{,}000$.")
m("Scientific notation & place value",
  r"In the number $528{,}437$, what is the place value of the digit $8$?",
  "Thousands", ["Hundreds", "Ten thousands", "Hundred thousands"],
  r"Counting from the right: $7$(ones), $3$(tens), $4$(hundreds), $8$(thousands).")

# ---- Mixed numbers <-> improper fractions (4) ----
def add_mixed(sec,q,c,ds,ans):
    m(sec,q,c,ds,ans, fmt=lambda v: f"${mixedstr(v)}$" if isinstance(v, F) else f"${v}$")
add_mixed("Mixed numbers & improper fractions", r"Convert $\dfrac{29}{6}$ to a mixed number.",
  F(29,6), [F(23,6), F(29,5), F(35,6)],
  r"$29\div6=4$ remainder $5$, so $\dfrac{29}{6}=4\dfrac{5}{6}$.")
add_mixed("Mixed numbers & improper fractions", r"Convert $5\dfrac{3}{7}$ to an improper fraction.",
  F(38,7), [F(35,7), F(38,10), F(15,7)],
  r"$5\dfrac{3}{7}=\dfrac{5\times7+3}{7}=\dfrac{38}{7}$.")
add_mixed("Mixed numbers & improper fractions", r"Compute $3\dfrac{1}{4}+1\dfrac{5}{6}$.",
  F(13,4)+F(11,6), [F(4,5), F(59,12), F(5,1)],
  r"As improper fractions: $\dfrac{13}{4}+\dfrac{11}{6}$. LCD $=12$: $\dfrac{39}{12}+\dfrac{22}{12}=\dfrac{61}{12}=5\dfrac{1}{12}$.")
add_mixed("Mixed numbers & improper fractions", r"Compute $6\dfrac{1}{5}-2\dfrac{3}{4}$.",
  F(31,5)-F(11,4), [F(4,1), F(79,20), F(37,20)],
  r"As improper fractions: $\dfrac{31}{5}-\dfrac{11}{4}$. LCD $=20$: $\dfrac{124}{20}-\dfrac{55}{20}=\dfrac{69}{20}=3\dfrac{9}{20}$.")

b.check(31)
print("part1 count:", len(b.Q))
import pickle
with open("/tmp/qud_ch1_bank.pkl","wb") as f:
    pickle.dump(b.Q, f)

# ---- Absolute value & signed numbers (4) ----
m("Absolute value & signed numbers", r"Evaluate $|-9|+|-4|$.", 13, [5, -13, 36],
  r"$|-9|=9$ and $|-4|=4$, so the sum is $9+4=13$.")
m("Absolute value & signed numbers", r"Evaluate $-6+4\times(-3)$.", -18, [-30, -2, 6],
  r"$4\times(-3)=-12$, so $-6+(-12)=-18$.")
m("Absolute value & signed numbers", r"Evaluate $|5-11|-|3-8|$.", 1, [-1, 11, 3],
  r"$|5-11|=|-6|=6$ and $|3-8|=|-5|=5$, so the result is $6-5=1$.")
m("Absolute value & signed numbers",
  r"Two of the four points on the number line represent a pair of numbers that are equal in absolute value but opposite in sign. Which pair?",
  r"$-4$ and $4$", [r"$-2$ and $4$", r"$-4$ and $2$", r"$-2$ and $2$"],
  r"$-4$ and $4$ are the same distance from $0$ ($4$ units) on opposite sides, so they are opposites.",
  figure={"type":"numberline","min":-5,"max":5,
          "marks":[{"x":-4,"label":"-4"},{"x":-2,"label":"-2"},{"x":2,"label":"2"},{"x":4,"label":"4"}],
          "width":280})

# ---- GCD, LCM, factors (5) ----
m("GCD, LCM & factors", r"Find the GCD of $54$ and $72$.", 18, [6, 9, 36],
  r"$54=2\times3^3$ and $72=2^3\times3^2$. Common factors: $2\times3^2=18$.")
m("GCD, LCM & factors", r"Find the LCM of $9$ and $15$.", 45, [135, 3, 24],
  r"$9=3^2$, $15=3\times5$. LCM $=3^2\times5=45$.")
m("GCD, LCM & factors", r"How many factors does $60$ have?", 12, [10, 8, 6],
  r"$60=2^2\times3\times5$. Number of factors $=(2+1)(1+1)(1+1)=12$.")
m("GCD, LCM & factors", r"Is $119$ a prime number?", "No — $119=7\\times17$", ["Yes, it is prime", r"No — $119=11\times9$", "Cannot be determined"],
  r"$119\div7=17$, so $119=7\times17$ has factors other than $1$ and itself.")
m("GCD, LCM & factors",
  r"The bar chart shows a gardener's bulb counts. They want to plant them in identical rows with the largest possible number of bulbs per row, each row containing only one type of flower. How many bulbs per row?",
  12, [6, 4, 24],
  r"The largest common row size is the GCD of $36$ and $48$: $36=2^2\times3^2$, $48=2^4\times3$, GCD $=2^2\times3=12$.",
  figure={"type":"bars","categories":["Tulips","Daffodils"],"values":[36,48],"ylabel":"bulbs","width":220})

# ---- Divisibility rules (4) ----
m("Divisibility rules", r"Without dividing, is $5{,}481$ divisible by $3$?", "Yes", ["No", "Only by $9$, not $3$", "Cannot tell without dividing"],
  r"Digit sum: $5+4+8+1=18$, divisible by $3$ (and by $9$), so $5{,}481$ is divisible by $3$.")
m("Divisibility rules", r"Is $2{,}116$ divisible by $4$?", "Yes", ["No", "Only by $2$", "Only by $8$"],
  r"Check the last two digits: $16\div4=4$, an integer, so $2{,}116$ is divisible by $4$.")
m("Divisibility rules", r"Is $945$ divisible by $9$?", "Yes", ["No", "Only by $3$", "Only by $5$"],
  r"Digit sum: $9+4+5=18$, which is divisible by $9$.")
m("Divisibility rules",
  r"The bar chart shows four candidate numbers. Which one is divisible by both $5$ and $6$?",
  "$690$", ["$685$", "$696$", "$650$"],
  r"Divisible by $5$: ends in $0$ or $5$. Divisible by $6$: even and digit sum divisible by $3$. Only $690$ satisfies both.",
  figure={"type":"bars","categories":["685","690","696","650"],"values":[685,690,696,650],"width":240})

# ---- Estimation and rounding (3) ----
m("Estimation & rounding", r"Round $147.362$ to the nearest tenth.", "$147.4$", ["$147.3$", "$147.36$", "$150$"],
  r"The hundredths digit is $6$, so round up: $147.4$.")
m("Estimation & rounding",
  r"The number line shows the value $x$ rounded to the nearest whole number. If $x=6.7$, where does the rounded value land?",
  "$7$", ["$6$", "$6.5$", "$8$"],
  r"$6.7$ is closer to $7$ than to $6$ (since $.7>.5$), so it rounds to $7$.",
  figure={"type":"numberline","min":5,"max":8,"marks":[{"x":6.7,"label":"x"}],"width":260})
m("Estimation & rounding",
  r"Estimate $312\times48$ by rounding each factor to the nearest ten, then compare to the exact product $14{,}976$.",
  "Estimate $310\\times50=15{,}500$, close to the exact value", 
  ["Estimate $300\\times50=15{,}000$, close to the exact value",
   "Estimate $310\\times50=15{,}500$, far from the exact value",
   "Estimate $320\\times40=12{,}800$, close to the exact value"],
  r"$312$ rounds to $310$ and $48$ rounds to $50$: $310\times50=15{,}500$, reasonably close to $14{,}976$.")

# ---- Number properties (3) ----
m("Number properties",
  r"If $n$ is an odd integer, is $n^2+n$ always even, always odd, or can it be either?",
  "Always even", ["Always odd", "Can be either", "Depends on the sign of $n$"],
  r"Write $n=2k+1$. Then $n^2+n=n(n+1)$, a product of two consecutive integers — one of which is always even, so the product is always even.")
m("Number properties",
  r"The number line marks $85$ between consecutive multiples of $9$. Find the remainder when $85$ is divided by $9$.",
  4, [3, 5, 76],
  r"$9\times9=81$, and $85-81=4$. The remainder is $4$.",
  figure={"type":"numberline","min":78,"max":92,"marks":[{"x":81,"label":"81"},{"x":85,"label":"85"},{"x":90,"label":"90"}],"width":280})
m("Number properties", r"List all prime numbers between $50$ and $70$.", "$53, 59, 61, 67$",
  ["$51, 57, 63, 69$", "$53, 57, 61, 67$", "$59, 61, 63, 67$"],
  r"Checking each: $53,59,61,67$ are prime ($51=3\times17$, $57=3\times19$, $63=9\times7$, $69=3\times23$ are not).")

b.check(50)
import pickle
with open("/tmp/qud_ch1_bank.pkl","wb") as f:
    pickle.dump(b.Q, f)
print("Final: 50 questions built")
