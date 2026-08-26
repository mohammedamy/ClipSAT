# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.9 — Statistics & Probability (the final
chapter of the 17-chapter MCQ expansion). Distinct from the existing 36
free-response questions (different data sets/values throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=909)
m = b.mcq

# --- Mean, median, and mode (5) ---
m("Mean, median, and mode", r"Find the mean of $5,9,7,11,8$.", "$8$", ["$9$", "$40$", "$7$"], r"Sum $=40$; mean $=40\div5=8$.")
m("Mean, median, and mode", r"Find the median of $4,10,6,2,8$.", "$6$", ["$4$", "$8$", "$5$"],
  r"Sorted: $2,4,6,8,10$; median $=6$.")
m("Mean, median, and mode", r"Find the mode of $3,5,5,7,9,5,3$.", "$5$", ["$3$", "$7$", "$4$"],
  r"$5$ appears $3$ times, more than any other value.")
m("Mean, median, and mode",
  r"A data set has values $9,13,11,16,11,15,12$. Find the mean, median, and mode.",
  "Mean $\\approx12.43$, median $=12$, mode $=11$",
  ["Mean $=12.43$, median $=11$, mode $=12$", "Mean $=13$, median $=12$, mode $=11$",
   "Mean $\\approx12.43$, median $=13$, mode $=11$"],
  r"Sum $=87$, mean $=87\div7\approx12.43$. Sorted: $9,11,11,12,13,15,16$; median $=12$; mode $=11$.")
m("Mean, median, and mode", r"Find the mean of $12,18,15,21,14$.", "$16$", ["$15$", "$80$", "$18$"],
  r"Sum $=80$; mean $=80\div5=16$.")

# --- Range and quartiles (4) ---
m("Range and quartiles", r"Find the range of $6,14,9,22,4$.", "$18$", ["$22$", "$16$", "$20$"], r"$22-4=18$.")
m("Range and quartiles", r"For the data set $3,5,6,8,9,10,13$, find $Q_1$ and $Q_3$.",
  "$Q_1=5$, $Q_3=10$", ["$Q_1=6$, $Q_3=9$", "$Q_1=3$, $Q_3=13$", "$Q_1=5$, $Q_3=9$"],
  r"Lower half $3,5,6$: $Q_1=5$; upper half $9,10,13$: $Q_3=10$.")
m("Range and quartiles", r"Find the interquartile range (IQR) for the same data set.",
  "$5$", ["$8$", "$10$", "$3$"], r"$IQR=Q_3-Q_1=10-5=5$.")
m("Range and quartiles", r"Find the range of $18,25,12,30,9$.", "$21$", ["$30$", "$18$", "$16$"], r"$30-9=21$.")

# --- Variance and standard deviation (4) ---
m("Variance and standard deviation",
  r"Find the variance of $3,5,7,9,11$, using $\sigma^2=\dfrac{\sum(x-\mu)^2}{n}$.",
  "$8$", ["$40$", "$2.83$", "$4$"], r"Mean $=7$; deviations squared sum to $40$; variance $=40\div5=8$.")
m("Variance and standard deviation", r"Find the standard deviation of the same data set, rounded to two decimal places.",
  "$2.83$", ["$8.00$", "$1.41$", "$4.00$"], r"$\sqrt{8}\approx2.83$.")
m("Variance and standard deviation", r"A data set has variance $36$. State its standard deviation.",
  "$6$", ["$18$", "$12$", "$1{,}296$"], r"$\sqrt{36}=6$.")
m("Variance and standard deviation", r"Find the variance of $4,8,12,16,20$, using $\sigma^2=\dfrac{\sum(x-\mu)^2}{n}$.",
  "$32$", ["$160$", "$5.66$", "$16$"], r"Mean $=12$; deviations squared sum to $160$; variance $=160\div5=32$.")

# --- Frequency tables (5) ---
m("Frequency tables",
  r"A frequency table shows value $1$ with frequency $4$, value $2$ with frequency $6$, and value $3$ with frequency $5$. Find the total number of data points.",
  "$15$", ["$6$", "$3$", "$10$"], r"$4+6+5=15$.")
m("Frequency tables", r"Using the same frequency table, find the mode.",
  "$2$", ["$1$", "$3$", "$6$"], r"Value $2$ has the highest frequency ($6$).")
m("Frequency tables", r"Using the same frequency table, find the median.",
  "$2$", ["$1$", "$3$", "$1.5$"], r"With $15$ values, the median is the $8$th, which falls in the value-$2$ group.")
m("Frequency tables", r"Using the same frequency table, find the mean.",
  r"$\approx2.07$", [r"$2.00$", r"$2.33$", r"$1.87$"], r"Sum $=1(4)+2(6)+3(5)=31$; mean $=31\div15\approx2.07$.")
m("Frequency tables", r"The bar chart shows a frequency table. Find the total number of data points.",
  "$15$", ["$6$", "$10$", "$3$"], r"$4+6+5=15$.",
  figure={"type": "bars", "categories": ["1", "2", "3"], "values": [4, 6, 5], "ylabel": "frequency"})

# --- Basic probability (5) ---
m("Basic probability", r"A fair six-sided die is rolled. Find $P(\text{number}<3)$.",
  r"$\dfrac{1}{3}$", [r"$\dfrac{1}{2}$", r"$\dfrac{1}{6}$", r"$\dfrac{2}{3}$"], r"$\{1,2\}$: $\dfrac{2}{6}=\dfrac{1}{3}$.")
m("Basic probability", r"A bag contains $7$ red and $4$ blue marbles. Find $P(\text{red})$.",
  r"$\dfrac{7}{11}$", [r"$\dfrac{4}{11}$", r"$\dfrac{7}{4}$", r"$\dfrac{1}{11}$"], r"$7$ out of $11$ total.")
m("Basic probability", r"A card is drawn from a standard 52-card deck. Find $P(\text{queen})$.",
  r"$\dfrac{1}{13}$", [r"$\dfrac{1}{4}$", r"$\dfrac{4}{13}$", r"$\dfrac{1}{52}$"], r"$4$ queens out of $52$: $\dfrac{1}{13}$.")
m("Basic probability", r"Two fair coins are flipped. Find $P(\text{at least one tail})$.",
  r"$\dfrac{3}{4}$", [r"$\dfrac{1}{4}$", r"$\dfrac{1}{2}$", r"$\dfrac{1}{3}$"],
  r"$P(\text{no tails})=\dfrac{1}{4}$, so $P(\text{at least one})=\dfrac{3}{4}$.")
m("Basic probability", r"A fair six-sided die is rolled. Find $P(\text{multiple of }3)$.",
  r"$\dfrac{1}{3}$", [r"$\dfrac{1}{6}$", r"$\dfrac{1}{2}$", r"$\dfrac{2}{5}$"], r"$\{3,6\}$: $\dfrac{2}{6}=\dfrac{1}{3}$.")

# --- Complementary and mutually exclusive events (4) ---
m("Complementary and mutually exclusive events", r"If $P(A)=0.28$, find $P(\text{not }A)$.",
  "$0.72$", ["$0.28$", "$1.28$", "$0.5$"], r"$1-0.28=0.72$.")
m("Complementary and mutually exclusive events",
  r"A die is rolled. Events $A=\{\text{odd}\}$ and $B=\{\text{rolling a }4\}$. Are $A$ and $B$ mutually exclusive?",
  "Yes", ["No", "Only sometimes", "Cannot be determined"], r"$A=\{1,3,5\}$ and $B=\{4\}$ share no outcomes: yes.")
m("Complementary and mutually exclusive events",
  r"If $P(A)=0.3$ and $P(B)=0.45$, and $A,B$ are mutually exclusive, find $P(A\text{ or }B)$.",
  "$0.75$", ["$0.135$", "$0.15$", "$1.05$"], r"$0.3+0.45=0.75$.")
m("Complementary and mutually exclusive events", r"If $P(A)=0.6$, find $P(\text{not }A)$.",
  "$0.4$", ["$0.6$", "$1.6$", "$0.5$"], r"$1-0.6=0.4$.")

# --- Independent events (4) ---
m("Independent events", r"Two independent events have $P(A)=0.7$ and $P(B)=0.4$. Find $P(A\text{ and }B)$.",
  "$0.28$", ["$1.1$", "$0.3$", "$0.175$"], r"$0.7\times0.4=0.28$.")
m("Independent events", r"A fair coin is flipped twice. Find $P(\text{both heads})$.",
  r"$\dfrac{1}{4}$", [r"$\dfrac{1}{2}$", r"$\dfrac{1}{3}$", "$1$"], r"$\dfrac{1}{2}\times\dfrac{1}{2}=\dfrac{1}{4}$.")
m("Independent events",
  r"A card is drawn from a deck, replaced, then a second card is drawn. Find $P(\text{both are kings})$.",
  r"$\dfrac{1}{169}$", [r"$\dfrac{1}{13}$", r"$\dfrac{1}{26}$", r"$\dfrac{2}{13}$"], r"$\left(\dfrac{4}{52}\right)^2=\dfrac{1}{169}$.")
m("Independent events", r"Two independent events have $P(A)=0.5$ and $P(B)=0.8$. Find $P(A\text{ and }B)$.",
  "$0.4$", ["$1.3$", "$0.3$", "$0.65$"], r"$0.5\times0.8=0.4$.")

# --- Conditional probability (4) ---
m("Conditional probability",
  r"In a class, $P(\text{science})=0.65$ and $P(\text{math and science})=0.3$. Find $P(\text{math}\mid\text{science})$.",
  r"$\approx0.46$", [r"$0.195$", r"$0.65$", r"$0.3$"], r"$\dfrac{0.3}{0.65}\approx0.46$.")
m("Conditional probability",
  r"A box has $12$ balls: $7$ red and $5$ blue. Two balls are drawn without replacement. Given the first is blue, find $P(\text{second is blue})$.",
  r"$\dfrac{4}{11}$", [r"$\dfrac{5}{11}$", r"$\dfrac{5}{12}$", r"$\dfrac{4}{12}$"],
  r"After removing one blue, $4$ blue remain out of $11$ total.")
m("Conditional probability", r"Given $P(A)=0.6$, $P(B)=0.4$, $P(A\text{ and }B)=0.2$, find $P(A\mid B)$.",
  "$0.5$", ["$0.3$", "$0.33$", "$0.8$"], r"$\dfrac{0.2}{0.4}=0.5$.")
m("Conditional probability", r"Given $P(A)=0.45$, $P(B)=0.5$, $P(A\text{ and }B)=0.2$, find $P(B\mid A)$.",
  r"$\approx0.44$", [r"$0.09$", r"$0.5$", r"$0.4$"], r"$\dfrac{0.2}{0.45}\approx0.44$.")

# --- Counting: permutations and combinations (4) ---
m("Counting: permutations and combinations", r"In how many ways can $5$ books be arranged on a shelf?",
  "$120$", ["$25$", "$20$", "$60$"], r"$5!=120$.")
m("Counting: permutations and combinations",
  r"How many ways can a committee of $4$ be chosen from $9$ people (order doesn't matter)?",
  "$126$", ["$3{,}024$", "$36$", "$362{,}880$"], r"$\binom{9}{4}=126$.")
m("Counting: permutations and combinations",
  r"A code uses $4$ distinct digits from $0$–$9$, where order matters. How many possible codes are there?",
  r"$5{,}040$", [r"$210$", r"$10{,}000$", r"$40$"], r"$10\times9\times8\times7=5{,}040$.")
m("Counting: permutations and combinations", r"In how many ways can $6$ people be arranged in a line?",
  "$720$", ["$36$", "$120$", "$6$"], r"$6!=720$.")

# --- The five-number summary (4) ---
m("The five-number summary",
  r"For the data set $5,9,13,17,21,25,29$, find the five-number summary (minimum, $Q_1$, median, $Q_3$, maximum).",
  "$5,9,17,25,29$", ["$5,13,17,21,29$", "$5,9,13,25,29$", "$9,13,17,21,25$"],
  r"Min $=5$; $Q_1=9$; median $=17$; $Q_3=25$; max $=29$.")
m("The five-number summary", r"Find the IQR for the same data set.",
  "$16$", ["$24$", "$20$", "$8$"], r"$IQR=Q_3-Q_1=25-9=16$.")
m("The five-number summary",
  r"Outlier boundaries are $Q_1-1.5\times IQR$ and $Q_3+1.5\times IQR$. Find both boundaries for the same data set.",
  "$-15$ and $49$", ["$-24$ and $40$", "$9$ and $25$", "$-15$ and $40$"],
  r"$9-1.5(16)=-15$; $25+1.5(16)=49$.")
m("The five-number summary", r"For the data set $10,15,20,25,30,35,40$, find the median.",
  "$25$", ["$20$", "$30$", "$27.5$"], r"With $7$ values sorted, the median is the $4$th: $25$.")

# --- Reading data from a bar chart (4) ---
_BOOKS_BARS = {"type": "bars", "categories": ["Mon", "Tue", "Wed", "Thu", "Fri"],
               "values": [12, 18, 15, 22, 20], "ylabel": "books sold"}
m("Reading data from a bar chart",
  r"The bar chart shows the number of books sold each day at a bookstore over five days. Find the total books sold.",
  "$87$", ["$77$", "$97$", "$22$"], r"$12+18+15+22+20=87$.", figure=_BOOKS_BARS)
m("Reading data from a bar chart", r"Using the same bar chart, find the mean number of books sold per day.",
  "$17.4$", ["$18$", "$15$", "$20$"], r"$87\div5=17.4$.", figure=_BOOKS_BARS)
m("Reading data from a bar chart", r"Using the same bar chart, find the range of books sold.",
  "$10$", ["$22$", "$12$", "$8$"], r"$22-12=10$.", figure=_BOOKS_BARS)
m("Reading data from a bar chart", r"Using the same bar chart, on which day were the most books sold?",
  "Thursday", ["Friday", "Wednesday", "Tuesday"], r"Thursday shows the tallest bar, $22$ books.", figure=_BOOKS_BARS)

# --- Word problems: statistics and probability in context (3) ---
m("Word problems: statistics and probability in context",
  r"A survey of $250$ students found that $150$ like math and $100$ like science, with $40$ liking both. Find the probability that a randomly selected student likes math or science.",
  "$0.84$", ["$1.0$", "$0.6$", "$0.16$"], r"$\dfrac{150+100-40}{250}=\dfrac{210}{250}=0.84$.")
m("Word problems: statistics and probability in context",
  r"A quality-control inspector finds that $3\%$ of items from a production line are defective. If $500$ items are inspected, how many are expected to be defective?",
  "$15$", ["$3$", "$30$", "$150$"], r"$0.03\times500=15$.")
m("Word problems: statistics and probability in context",
  r"In a survey of $180$ people, $108$ prefer coffee over tea. Find the probability, as a percent, that a randomly selected person prefers coffee.",
  "$60\\%$", ["$40\\%$", "$108\\%$", "$50\\%$"], r"$\dfrac{108}{180}=60\%$.")

b.check(50)
