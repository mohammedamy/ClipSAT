# -*- coding: utf-8 -*-
"""50 new MCQs for Qudrat ch.6 — Sequences & Patterns. Distinct from the
existing 45 free-response questions (different sequences/values throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=606)
m = b.mcq

# --- Arithmetic sequences (6) ---
m("Arithmetic sequences", r"Find the 12th term of the sequence $4,9,14,19,\ldots$",
  "$59$", ["$64$", "$54$", "$49$"], r"$a_1=4$, $d=5$: $T_{12}=4+11(5)=59$.")
m("Arithmetic sequences", r"Find the 18th term of the sequence $6,13,20,27,\ldots$",
  "$125$", ["$132$", "$118$", "$120$"], r"$a_1=6$, $d=7$: $T_{18}=6+17(7)=125$.")
m("Arithmetic sequences",
  r"An arithmetic sequence has first term $9$ and common difference $4$. Find the 25th term.",
  "$105$", ["$109$", "$100$", "$96$"], r"$T_{25}=9+24(4)=105$.")
m("Arithmetic sequences",
  r"The 6th term of an arithmetic sequence is $41$, and the first term is $6$. Find the common difference.",
  "$7$", ["$35$", "$6$", "$8$"], r"$41=6+5d\Rightarrow5d=35\Rightarrow d=7$.")
m("Arithmetic sequences",
  r"An arithmetic sequence has first term $10$ and common difference $6$. Which term equals $100$?",
  "$16$th", ["$15$th", "$90$th", "$17$th"], r"$100=10+(n-1)(6)\Rightarrow n-1=15\Rightarrow n=16$.")
m("Arithmetic sequences",
  r"The 10th term of an arithmetic sequence is $52$, and the common difference is $5$. Find the first term.",
  "$7$", ["$2$", "$45$", "$12$"], r"$52=a_1+9(5)\Rightarrow a_1=52-45=7$.")

# --- Geometric sequences (6) ---
m("Geometric sequences", r"Find the next term of the sequence $3,6,12,24,\ldots$",
  "$48$", ["$36$", "$30$", "$27$"], r"Common ratio $2$: $24\times2=48$.")
m("Geometric sequences", r"Find the 7th term of the sequence $2,6,18,54,\ldots$",
  "$1{,}458$", ["$486$", "$4{,}374$", "$729$"], r"$a_1=2$, $r=3$: $T_7=2(3^6)=1{,}458$.")
m("Geometric sequences",
  r"A geometric sequence has first term $4$ and common ratio $2$. Find the 6th term.",
  "$128$", ["$64$", "$256$", "$32$"], r"$T_6=4(2^5)=128$.")
m("Geometric sequences",
  r"The 5th term of a geometric sequence is $162$, and the first term is $2$. Find the common ratio.",
  "$3$", ["$9$", "$4$", "$2$"], r"$162=2r^4\Rightarrow r^4=81\Rightarrow r=3$.")
m("Geometric sequences",
  r"A geometric sequence has 3rd term $20$ and 4th term $40$. Find the first term and the common ratio.",
  r"$a_1=5$, $r=2$", [r"$a_1=10$, $r=2$", r"$a_1=5$, $r=4$", r"$a_1=20$, $r=2$"],
  r"$r=40\div20=2$; $a_1=20\div r^2=20\div4=5$.")
m("Geometric sequences",
  r"A geometric sequence has first term $7$ and common ratio $2$. Find the 8th term.",
  "$896$", ["$448$", "$1{,}792$", "$112$"], r"$T_8=7(2^7)=896$.")

# --- Identifying the type of sequence (4) ---
TYPES = ["Arithmetic", "Geometric", "Neither", "Both arithmetic and geometric"]
def typeq(q, correct_i, answer):
    correct = TYPES[correct_i]
    distractors = [t for j, t in enumerate(TYPES) if j != correct_i]
    m("Identifying the type of sequence", q, correct, distractors, answer)

typeq(r"Is $7,14,28,56,\ldots$ arithmetic, geometric, or neither?", 1,
      r"Each term is double the last (ratio $2$): geometric.")
typeq(r"Is $8,13,18,23,\ldots$ arithmetic, geometric, or neither?", 0,
      r"Each term adds $5$ (constant difference): arithmetic.")
typeq(r"Is $2,5,10,17,\ldots$ arithmetic, geometric, or neither?", 2,
      r"Differences are $3,5,7$ (not constant) and ratios are not constant either: neither (it's $n^2+1$).")
typeq(r"Is $200,180,162,145.8,\ldots$ arithmetic, geometric, or neither?", 1,
      r"Each ratio is $0.9$ (constant): geometric.")

# --- Finding missing terms (6) ---
m("Finding missing terms", r"Find the missing term: $6,\ \_\_,\ 16,\ 21$ (arithmetic).",
  "$11$", ["$13$", "$10$", "$9$"], r"$d=5$ (from $16$ to $21$): missing $=16-5=11$.")
m("Finding missing terms", r"Find the missing term: $5,\ \_\_,\ 80$ (geometric, all terms positive).",
  "$20$", ["$40$", "$42.5$", "$16$"], r"$r^2=80\div5=16\Rightarrow r=4$; missing $=5\times4=20$.")
m("Finding missing terms",
  r"Insert two arithmetic means between $8$ and $29$, forming the four-term sequence $8,\_\_,\_\_,29$.",
  "$15, 22$", ["$14, 21$", "$12.5, 20.5$", "$15, 21$"], r"$d=\dfrac{29-8}{3}=7$: terms are $15$ and $22$.")
m("Finding missing terms", r"The sequence $2x,\ 3x+4,\ 5x+2$ is arithmetic. Find $x$.",
  "$6$", ["$4$", "$2$", "$8$"], r"$(3x+4)-2x=(5x+2)-(3x+4)\Rightarrow x+4=2x-2\Rightarrow x=6$.")
m("Finding missing terms",
  r"Find the two missing terms of the geometric sequence $3,\ \_\_,\ \_\_,\ 81$.",
  "$9, 27$", ["$27, 9$", "$12, 27$", "$9, 30$"], r"$r^3=81\div3=27\Rightarrow r=3$: terms are $9$ and $27$.")
m("Finding missing terms", r"Find the missing term: $\_\_,\ 12,\ 19,\ 26$ (arithmetic).",
  "$5$", ["$7$", "$4$", "$9$"], r"$d=7$: missing $=12-7=5$.")

# --- Sum of an arithmetic series (6) ---
m("Sum of an arithmetic series", r"Find the sum of the first 12 terms of the sequence $3,7,11,15,\ldots$",
  "$300$", ["$264$", "$282$", "$312$"],
  r"$S_{12}=\dfrac{12}{2}(2(3)+11(4))=6(50)=300$.")
m("Sum of an arithmetic series", r"Find the sum of the first 30 positive integers.",
  "$465$", ["$435$", "$900$", "$450$"], r"$S=\dfrac{30(31)}{2}=465$.")
m("Sum of an arithmetic series", r"Find the sum of the first 15 terms of the sequence $12,9,6,3,\ldots$",
  "$-135$", ["$135$", "$-108$", "$-153$"],
  r"$S_{15}=\dfrac{15}{2}(2(12)+14(-3))=7.5(-18)=-135$.")
m("Sum of an arithmetic series",
  r"An arithmetic sequence has first term $5$ and common difference $3$. Find the sum of its first 20 terms.",
  "$670$", ["$625$", "$685$", "$640$"], r"$S_{20}=\dfrac{20}{2}(2(5)+19(3))=10(67)=670$.")
m("Sum of an arithmetic series", r"Find the sum of the first 30 positive even integers ($2,4,\ldots,60$).",
  "$930$", ["$900$", "$960$", "$465$"], r"$S=30(31)=930$.")
m("Sum of an arithmetic series", r"Find the sum of the first 10 terms of the sequence $20,15,10,5,\ldots$",
  "$-25$", ["$25$", "$-50$", "$5$"], r"$S_{10}=\dfrac{10}{2}(2(20)+9(-5))=5(-5)=-25$.")

# --- Sum of a geometric series (4) ---
m("Sum of a geometric series", r"Find the sum of the first 6 terms of the sequence $2,4,8,16,\ldots$",
  "$126$", ["$124$", "$128$", "$62$"], r"$S_6=\dfrac{2(2^6-1)}{2-1}=2(63)=126$.")
m("Sum of a geometric series",
  r"A geometric sequence has first term $5$ and common ratio $3$. Find the sum of its first 5 terms.",
  "$605$", ["$605.5$", "$363$", "$1{,}210$"], r"$S_5=\dfrac{5(3^5-1)}{3-1}=\dfrac{5(242)}{2}=605$.")
m("Sum of a geometric series", r"Find the sum of the first 4 terms of the sequence $1,3,9,27,\ldots$",
  "$40$", ["$81$", "$27$", "$39$"], r"$1+3+9+27=40$.")
m("Sum of a geometric series",
  r"A geometric sequence has first term $6$ and common ratio $2$. Find the sum of its first 7 terms.",
  "$762$", ["$768$", "$381$", "$384$"], r"$S_7=\dfrac{6(2^7-1)}{2-1}=6(127)=762$.")

# --- Special sequences (4) ---
m("Special sequences", r"The sequence $1,4,9,16,25,\ldots$ consists of perfect squares. Find the 10th term.",
  "$100$", ["$81$", "$121$", "$90$"], r"$10^2=100$.")
m("Special sequences", r"Find the 7th triangular number, from the sequence $1,3,6,10,15,21,\ldots$",
  "$28$", ["$21$", "$36$", "$25$"], r"$T_7=\dfrac{7(8)}{2}=28$.")
m("Special sequences",
  r"A sequence starts $3,5,8,13,21,\ldots$, where each term is the sum of the two terms before it. Find the 8th term.",
  "$89$", ["$55$", "$76$", "$144$"], r"Continuing: $3,5,8,13,21,34,55,89$: the 8th term is $89$.")
m("Special sequences", r"Find the 8th term of the sequence of powers of 3: $1,3,9,27,81,\ldots$",
  "$2{,}187$", ["$729$", "$6{,}561$", "$2{,}184$"], r"$T_8=3^7=2{,}187$.")

# --- Visual and growing patterns (4) ---
m("Visual and growing patterns",
  r"The bar chart shows the number of tiles used to build patterns 1 through 4. Predict the number of tiles in pattern 8.",
  "$33$", ["$37$", "$29$", "$40$"],
  r"$d=4$, $a_1=5$: $T_8=5+7(4)=33$.",
  figure={"type": "bars", "categories": ["Pattern 1", "Pattern 2", "Pattern 3", "Pattern 4"],
          "values": [5, 9, 13, 17], "ylabel": "tiles"})
m("Visual and growing patterns",
  r"A pattern of dots grows as $2,6,10,14,\ldots$ (each stage adds 4 dots). Find the number of dots in stage 10.",
  "$38$", ["$42$", "$34$", "$40$"], r"$a_1=2$, $d=4$: $T_{10}=2+9(4)=38$.")
m("Visual and growing patterns",
  r"The bar chart shows the number of matchsticks used to build squares in a row, for 1 through 4 squares. Find the number needed for 12 squares.",
  "$37$", ["$40$", "$34$", "$43$"], r"$d=3$, $a_1=4$: $T_{12}=4+11(3)=37$.",
  figure={"type": "bars", "categories": ["1 square", "2 squares", "3 squares", "4 squares"],
          "values": [4, 7, 10, 13], "ylabel": "matchsticks"})
m("Visual and growing patterns",
  r"The bar chart shows the number of matchsticks used to build hexagons in a row, for 1 through 4 hexagons. Find the number needed for 9 hexagons.",
  "$46$", ["$51$", "$41$", "$50$"], r"$d=5$, $a_1=6$: $T_9=6+8(5)=46$.",
  figure={"type": "bars", "categories": ["1 hex.", "2 hex.", "3 hex.", "4 hex."],
          "values": [6, 11, 16, 21], "ylabel": "matchsticks"})

# --- Word problems (4) ---
m("Word problems",
  r"A theater has 18 seats in the first row, and each following row has 4 more seats than the row before. How many seats are in row 15?",
  "$74$", ["$70$", "$78$", "$56$"], r"$a_1=18$, $d=4$: $T_{15}=18+14(4)=74$.")
m("Word problems",
  r"A ball is dropped and after each bounce rises to half its previous height. If it first rises to 120 cm after the first bounce, how high does it rise after the 5th bounce?",
  "$7.5$", ["$3.75$", "$15$", "$60$"], r"$a_1=120$, $r=0.5$: $T_5=120(0.5)^4=7.5$ cm.")
m("Word problems",
  r"A savings plan deposits 80 riyals in week 1, then increases the deposit by 15 riyals each following week. Find the deposit in week 10.",
  "$215$", ["$200$", "$230$", "$935$"], r"$a_1=80$, $d=15$: $T_{10}=80+9(15)=215$ riyals.")
m("Word problems",
  r"A bacteria culture starts with 40 bacteria and triples every hour. How many bacteria are there after 4 hours?",
  "$3{,}240$", ["$1{,}080$", "$9{,}720$", "$480$"], r"$40\times3^4=40\times81=3{,}240$.")

# --- Pattern reasoning (6) ---
m("Pattern reasoning",
  r"A sequence of tile patterns is built so that stage $n$ uses $2n^2+1$ tiles. How many tiles are needed for stage 5?",
  "$51$", ["$50$", "$26$", "$41$"], r"$2(25)+1=51$.")
m("Pattern reasoning",
  r"The number of diagonals in a polygon with $n$ sides is $\dfrac{n(n-3)}{2}$. Find the number of diagonals in a polygon with 9 sides.",
  "$27$", ["$54$", "$21$", "$36$"], r"$\dfrac{9(6)}{2}=27$.")
m("Pattern reasoning",
  r"A sequence follows the rule \"triple and subtract 2\", starting at $4$ as the 1st term. Find the 4th term.",
  "$82$", ["$28$", "$250$", "$34$"], r"$4\to10\to28\to82$: the 4th term is $82$.")
m("Pattern reasoning",
  r"The number of handshakes when $n$ people each shake hands with every other person once is $\dfrac{n(n-1)}{2}$. Find the number of handshakes among 12 people.",
  "$66$", ["$132$", "$78$", "$56$"], r"$\dfrac{12(11)}{2}=66$.")
m("Pattern reasoning",
  r"The $n$th term of a sequence is $T_n=4n-3$. Find the 15th term, and state whether the sequence is arithmetic or geometric.",
  "$57$, arithmetic", ["$57$, geometric", "$53$, arithmetic", "$60$, arithmetic"],
  r"$T_{15}=4(15)-3=57$; since $T_n$ is linear in $n$, it's arithmetic.")
m("Pattern reasoning",
  r"The $n$th term of a sequence is $T_n=5(2)^{n-1}$. Find the 6th term, and state whether the sequence is arithmetic or geometric.",
  "$160$, geometric", ["$160$, arithmetic", "$80$, geometric", "$320$, geometric"],
  r"$T_6=5(2^5)=160$; since $T_n$ involves a constant raised to the $n$th power, it's geometric.")

b.check(50)
