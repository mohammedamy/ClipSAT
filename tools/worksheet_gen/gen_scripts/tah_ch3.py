# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.3 — Sequences & Series. Distinct from the
existing 37 free-response questions (different sequences/values
throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=303)
m = b.mcq

# --- Arithmetic sequences: finding terms (5) ---
m("Arithmetic sequences: finding terms", r"Find the 14th term of the arithmetic sequence with $a=6$, $d=4$.",
  "$58$", ["$62$", "$54$", "$50$"], r"$T_{14}=6+13(4)=58$.")
m("Arithmetic sequences: finding terms", r"Find the 18th term of the arithmetic sequence with $a=-7$, $d=3$.",
  "$44$", ["$41$", "$47$", "$50$"], r"$T_{18}=-7+17(3)=44$.")
m("Arithmetic sequences: finding terms", r"Find the 12th term of the arithmetic sequence with $a=80$, $d=-5$.",
  "$25$", ["$30$", "$20$", "$-25$"], r"$T_{12}=80+11(-5)=25$.")
m("Arithmetic sequences: finding terms",
  r"Write the first four terms of the arithmetic sequence with $a=9$, $d=-3$.",
  "$9,6,3,0$", ["$9,12,15,18$", "$9,3,0,-3$", "$9,-3,-15,-27$"], r"Each term subtracts $3$: $9,6,3,0$.")
m("Arithmetic sequences: finding terms", r"Find the 25th term of the arithmetic sequence with $a=2$, $d=7$.",
  "$170$", ["$177$", "$163$", "$175$"], r"$T_{25}=2+24(7)=170$.")

# --- Arithmetic sequences: finding a and d (4) ---
m("Arithmetic sequences: finding a and d",
  r"The 5th term of an arithmetic sequence is $19$ and the 10th term is $44$. Find the first term $a$ and common difference $d$.",
  "$a=-1$, $d=5$", ["$a=-1$, $d=4$", "$a=4$, $d=5$", "$a=-5$, $d=5$"],
  r"$d=\dfrac{44-19}{5}=5$; $a=19-4(5)=-1$.")
m("Arithmetic sequences: finding a and d", r"An arithmetic sequence has $a_1=8$ and $a_7=32$. Find the common difference $d$.",
  "$d=4$", ["$d=3$", "$d=24$", "$d=4.8$"], r"$d=\dfrac{32-8}{6}=4$.")
m("Arithmetic sequences: finding a and d", r"An arithmetic sequence has $a_2=9$ and $a_6=29$. Find the common difference $d$.",
  "$d=5$", ["$d=4$", "$d=20$", "$d=5.5$"], r"$d=\dfrac{29-9}{4}=5$.")
m("Arithmetic sequences: finding a and d",
  r"The 3rd term of an arithmetic sequence is $15$ and the 8th term is $45$. Find the first term $a$ and common difference $d$.",
  "$a=3$, $d=6$", ["$a=3$, $d=5$", "$a=9$, $d=6$", "$a=6$, $d=3$"],
  r"$d=\dfrac{45-15}{5}=6$; $a=15-2(6)=3$.")

# --- Arithmetic series: the sum formula (5) ---
m("Arithmetic series: the sum formula",
  r"Find the sum of the first 25 terms of the arithmetic sequence with $a=4$, $d=3$, using $S_n=\dfrac{n}{2}(2a+(n-1)d)$.",
  "$1{,}000$", ["$925$", "$1{,}075$", "$960$"], r"$S_{25}=\dfrac{25}{2}(8+24(3))=12.5(80)=1{,}000$.")
m("Arithmetic series: the sum formula",
  r"Find the sum of the first 18 terms of the arithmetic sequence with $a=60$, $d=-4$.",
  "$468$", ["$480$", "$456$", "$540$"], r"$S_{18}=\dfrac{18}{2}(120+17(-4))=9(52)=468$.")
m("Arithmetic series: the sum formula", r"Find the sum of the arithmetic series $3+7+11+\cdots+59$.",
  "$465$", ["$450$", "$480$", "$434$"], r"$n=15$ terms; $S_{15}=\dfrac{15}{2}(6+14(4))=7.5(62)=465$.")
m("Arithmetic series: the sum formula", r"Find the sum of the first 12 positive multiples of 7.",
  "$546$", ["$504$", "$588$", "$462$"], r"$7(1+2+\cdots+12)=7(78)=546$.")
m("Arithmetic series: the sum formula",
  r"Find the sum of the first 30 terms of the arithmetic sequence with $a=1$, $d=2$ (the odd numbers).",
  "$900$", ["$870$", "$930$", "$960$"], r"$S_{30}=\dfrac{30}{2}(2+29(2))=15(60)=900$.")

# --- Geometric sequences: finding terms (4) ---
m("Geometric sequences: finding terms", r"Find the 7th term of the geometric sequence with $a=2$, $r=3$.",
  "$1{,}458$", ["$486$", "$4{,}374$", "$729$"], r"$T_7=2(3^6)=1{,}458$.")
m("Geometric sequences: finding terms", r"Find the 6th term of the geometric sequence with $a=200$, $r=0.5$.",
  "$6.25$", ["$3.125$", "$12.5$", "$25$"], r"$T_6=200(0.5)^5=6.25$.")
m("Geometric sequences: finding terms", r"Find the 5th term of the geometric sequence with $a=3$, $r=-2$.",
  "$48$", ["$-48$", "$24$", "$-24$"], r"$T_5=3(-2)^4=3(16)=48$.")
m("Geometric sequences: finding terms", r"Write the first four terms of the geometric sequence with $a=4$, $r=2$.",
  "$4,8,16,32$", ["$4,6,8,10$", "$4,8,12,16$", "$4,16,32,64$"], r"Each term doubles: $4,8,16,32$.")

# --- Geometric sequences: finding a and r (5) ---
m("Geometric sequences: finding a and r",
  r"The 2nd term of a geometric sequence is $8$ and the 5th term is $64$. Find $r$ and $a$.",
  "$r=2$, $a=4$", ["$r=2$, $a=8$", "$r=4$, $a=2$", "$r=8$, $a=1$"],
  r"$r^3=64\div8=8\Rightarrow r=2$; $a=8\div r=4$.")
m("Geometric sequences: finding a and r", r"A geometric sequence has $a_1=5$ and $a_4=135$. Find $r$.",
  "$r=3$", ["$r=27$", "$r=9$", "$r=2$"], r"$r^3=135\div5=27\Rightarrow r=3$.")
m("Geometric sequences: finding a and r",
  r"A geometric sequence has 3rd term $18$ and 6th term $486$. Find $a$ and $r$.",
  "$a=2$, $r=3$", ["$a=2$, $r=9$", "$a=6$, $r=3$", "$a=18$, $r=3$"],
  r"$r^3=486\div18=27\Rightarrow r=3$; $a=18\div r^2=2$.")
m("Geometric sequences: finding a and r",
  r"A geometric sequence has 2nd term $4$ and 5th term $-108$. Find $r$.",
  "$r=-3$", ["$r=3$", "$r=-27$", "$r=-9$"], r"$r^3=-108\div4=-27\Rightarrow r=-3$.")
m("Geometric sequences: finding a and r", r"A geometric sequence has $a_1=6$ and $a_4=-162$. Find $r$.",
  "$r=-3$", ["$r=3$", "$r=-27$", "$r=-9$"], r"$r^3=-162\div6=-27\Rightarrow r=-3$.")

# --- Geometric series: the finite sum (4) ---
m("Geometric series: the finite sum",
  r"Find the sum of the first 7 terms of the geometric series with $a=2$, $r=2$, using $S_n=\dfrac{a(r^n-1)}{r-1}$.",
  "$254$", ["$256$", "$127$", "$508$"], r"$S_7=\dfrac{2(2^7-1)}{1}=2(127)=254$.")
m("Geometric series: the finite sum", r"Find the sum of the first 6 terms of the geometric series with $a=200$, $r=0.5$.",
  "$393.75$", ["$396.875$", "$196.875$", "$400$"], r"$S_6=\dfrac{200(1-0.5^6)}{0.5}=393.75$.")
m("Geometric series: the finite sum", r"Find the sum of the first 5 terms of the geometric series with $a=3$, $r=-2$.",
  "$33$", ["$-33$", "$93$", "$63$"], r"$S_5=\dfrac{3((-2)^5-1)}{-2-1}=\dfrac{3(-33)}{-3}=33$.")
m("Geometric series: the finite sum", r"Find the sum of the first 8 terms of the geometric series with $a=1$, $r=2$.",
  "$255$", ["$256$", "$254$", "$128$"], r"$S_8=\dfrac{1(2^8-1)}{1}=255$.")

# --- Infinite geometric series (5) ---
m("Infinite geometric series", r"Find the sum of the infinite geometric series with $a=6$, $r=\dfrac{1}{3}$.",
  "$9$", ["$8$", "$18$", "$6.75$"], r"$S=\dfrac{6}{1-\frac{1}{3}}=\dfrac{6}{2/3}=9$.")
m("Infinite geometric series", r"Find the sum of the infinite geometric series with $a=12$, $r=\dfrac{1}{4}$.",
  "$16$", ["$15$", "$48$", "$14$"], r"$S=\dfrac{12}{1-\frac{1}{4}}=\dfrac{12}{3/4}=16$.")
m("Infinite geometric series", r"Find the sum of the infinite geometric series $9-3+1-\dfrac{1}{3}+\cdots$.",
  "$6.75$", ["$6$", "$9$", "$4.5$"], r"$a=9$, $r=-\dfrac{1}{3}$: $S=\dfrac{9}{1+\frac{1}{3}}=\dfrac{9}{4/3}=6.75$.")
m("Infinite geometric series",
  r"Express the repeating decimal $0.777\ldots$ as a fraction using an infinite geometric series with $a=0.7$, $r=0.1$.",
  r"$\dfrac{7}{9}$", [r"$\dfrac{7}{10}$", r"$\dfrac{7}{90}$", r"$\dfrac{77}{100}$"],
  r"$S=\dfrac{0.7}{1-0.1}=\dfrac{0.7}{0.9}=\dfrac{7}{9}$.")
m("Infinite geometric series", r"Find the sum of the infinite geometric series with $a=10$, $r=\dfrac{2}{5}$.",
  r"$\dfrac{50}{3}$", [r"$\dfrac{25}{3}$", "$25$", "$14$"], r"$S=\dfrac{10}{1-\frac{2}{5}}=\dfrac{10}{3/5}=\dfrac{50}{3}$.")

# --- Sigma notation (4) ---
m("Sigma notation", r"Evaluate $\sum_{k=1}^{6}(3k-1)$.", "$57$", ["$54$", "$63$", "$51$"],
  r"$2+5+8+11+14+17=57$.")
m("Sigma notation", r"Evaluate $\sum_{k=1}^{5}2^k$.", "$62$", ["$63$", "$60$", "$32$"], r"$2+4+8+16+32=62$.")
m("Sigma notation", r"Use $\sum_{k=1}^{n}k=\dfrac{n(n+1)}{2}$ to evaluate $\sum_{k=1}^{15}k$.",
  "$120$", ["$105$", "$136$", "$110$"], r"$\dfrac{15(16)}{2}=120$.")
m("Sigma notation", r"Evaluate $\sum_{k=2}^{5}k^2$.", "$54$", ["$30$", "$55$", "$50$"], r"$4+9+16+25=54$.")

# --- Recursive sequences (4) ---
m("Recursive sequences", r"A sequence satisfies $a_1=3$ and $a_{n+1}=a_n+7$. Find $a_5$.",
  "$31$", ["$24$", "$38$", "$28$"], r"$3,10,17,24,31$: $a_5=31$.")
m("Recursive sequences", r"A sequence satisfies $a_1=4$ and $a_{n+1}=3a_n-2$. Find $a_4$.",
  "$82$", ["$28$", "$10$", "$244$"], r"$4,10,28,82$: $a_4=82$.")
m("Recursive sequences",
  r"A sequence satisfies $a_1=1$, $a_2=2$, and $a_n=a_{n-1}+a_{n-2}$ for $n\geq3$. Find $a_7$.",
  "$21$", ["$13$", "$34$", "$8$"], r"$1,2,3,5,8,13,21$: $a_7=21$.")
m("Recursive sequences", r"A sequence satisfies $a_1=2$ and $a_{n+1}=2a_n+1$. Find $a_4$.",
  "$23$", ["$11$", "$47$", "$5$"], r"$2,5,11,23$: $a_4=23$.")

# --- Identifying arithmetic and geometric sequences (4) ---
m("Identifying arithmetic and geometric sequences",
  r"State whether $6,11,16,21,\ldots$ is arithmetic or geometric, and give the common difference or ratio.",
  "Arithmetic, $d=5$", ["Geometric, $r=5$", "Arithmetic, $d=6$", "Geometric, $r=\\dfrac{11}{6}$"],
  r"Each term adds $5$: arithmetic, $d=5$.")
m("Identifying arithmetic and geometric sequences",
  r"State whether $3,9,27,81,\ldots$ is arithmetic or geometric, and give the common difference or ratio.",
  "Geometric, $r=3$", ["Arithmetic, $d=6$", "Arithmetic, $d=3$", "Geometric, $r=6$"],
  r"Each term is tripled: geometric, $r=3$.")
m("Identifying arithmetic and geometric sequences",
  r"State whether $90,80,70,60,\ldots$ is arithmetic or geometric, and find its 12th term.",
  "Arithmetic, $-20$", ["Geometric, $-20$", "Arithmetic, $-10$", "Arithmetic, $30$"],
  r"$d=-10$: $T_{12}=90+11(-10)=-20$.")
m("Identifying arithmetic and geometric sequences",
  r"State whether $5,10,20,40,\ldots$ is arithmetic or geometric, and give the common difference or ratio.",
  "Geometric, $r=2$", ["Arithmetic, $d=5$", "Arithmetic, $d=2$", "Geometric, $r=5$"],
  r"Each term is doubled: geometric, $r=2$.")

# --- Reading a sequence from its terms (3) ---
_SEQ_BARS = {"type": "bars", "categories": ["1", "2", "3", "4", "5"], "values": [4, 9, 14, 19, 24],
             "ylabel": "term value"}
m("Reading a sequence from its terms",
  r"The bar chart shows the first five terms of a sequence. Find the common difference.",
  "$5$", ["$4$", "$9$", "$6$"], r"Each term increases by $5$.", figure=_SEQ_BARS)
m("Reading a sequence from its terms", r"Using the same bar chart, predict the 8th term.",
  "$39$", ["$44$", "$34$", "$29$"], r"$d=5$, $a=4$: $T_8=4+7(5)=39$.", figure=_SEQ_BARS)
m("Reading a sequence from its terms", r"Using the same bar chart, find the sum of the first five terms shown.",
  "$70$", ["$66$", "$75$", "$24$"], r"$4+9+14+19+24=70$.", figure=_SEQ_BARS)

# --- Word problems: sequences in context (3) ---
m("Word problems: sequences in context",
  r"An employee's starting monthly salary is 3,500 dollars, and it increases by 150 dollars each year. Find the salary in year 6.",
  "$4{,}250$ dollars", ["$4{,}100$ dollars", "$4{,}400$ dollars", "$3{,}950$ dollars"],
  r"$a=3{,}500$, $d=150$: $T_6=3{,}500+5(150)=4{,}250$.")
m("Word problems: sequences in context",
  r"A bacteria culture starts with 300 cells and doubles every hour. Find the number of cells after 5 hours.",
  "$9{,}600$", ["$4{,}800$", "$19{,}200$", "$1{,}500$"], r"$300\times2^5=300\times32=9{,}600$.")
m("Word problems: sequences in context",
  r"A theater's ticket sales grow according to a geometric sequence: 200 tickets sold on day 1, with a common ratio of 1.5. Find the number of tickets sold on day 4.",
  "$675$", ["$450$", "$900$", "$300$"], r"$T_4=200(1.5)^3=200(3.375)=675$.")

b.check(50)
