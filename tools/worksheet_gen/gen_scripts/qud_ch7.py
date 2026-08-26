# -*- coding: utf-8 -*-
"""50 new MCQs for Qudrat ch.7 — Data Analysis & Probability. Distinct from
the existing 33 free-response questions (different data sets/values
throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=707)
m = b.mcq

# --- Mean, median, mode and range (7) ---
m("Mean, median, mode and range", r"Find the mean of $8,11,14,17,20$.",
  "$14$", ["$17$", "$70$", "$12$"], r"Sum $=70$; mean $=70\div5=14$.")
m("Mean, median, mode and range",
  r"Ages of 6 students: $12,14,12,15,13,12$. Find the mean, median, and mode.",
  "Mean $=13$, median $=12.5$, mode $=12$", ["Mean $=13$, median $=12$, mode $=12.5$",
   "Mean $=12.5$, median $=13$, mode $=12$", "Mean $=13$, median $=12.5$, mode $=13$"],
  r"Sum $=78$, mean $=13$. Sorted: $12,12,12,13,14,15$; median $=\dfrac{12+13}{2}=12.5$; mode $=12$ (appears $3$ times).")
m("Mean, median, mode and range", r"Find the range and mode of the data set $5,9,5,18,5,27,9$.",
  "Range $=22$, mode $=5$", ["Range $=27$, mode $=5$", "Range $=22$, mode $=9$", "Range $=13$, mode $=5$"],
  r"Range $=27-5=22$; mode $=5$ (appears $3$ times).")
m("Mean, median, mode and range", r"A data set has mean $24$ and $8$ values. Find the sum of the values.",
  "$192$", ["$32$", "$3$", "$96$"], r"Sum $=$ mean $\times$ count $=24\times8=192$.")
m("Mean, median, mode and range",
  r"The data set $14,16,15,17,60$ contains an outlier. Find the mean before and after removing $60$.",
  "Before $=24.4$, after $=15.5$", ["Before $=15.5$, after $=24.4$", "Before $=24.4$, after $=62$",
   "Before $=122$, after $=15.5$"],
  r"Before: sum $=122$, mean $=24.4$. After removing $60$: sum $=62$ over $4$ values, mean $=15.5$.")
m("Mean, median, mode and range",
  r"A data set of 6 values has mean $25$. Five of the values are $20,22,28,30,32$. Find the sixth value.",
  "$18$", ["$28$", "$150$", "$8$"], r"Total needed $=6\times25=150$; sum of five $=132$; sixth $=150-132=18$.")
m("Mean, median, mode and range",
  r"The bar chart shows quiz scores. Find the total number of students, and the modal score.",
  "$20$ students; mode $=8$", ["$20$ students; mode $=6$", "$18$ students; mode $=8$",
   "$20$ students; mode $=9$"],
  r"Total $=2+4+6+5+3=20$; the score $8$ has the highest frequency ($6$ students).",
  figure={"type": "bars", "categories": ["6", "7", "8", "9", "10"], "values": [2, 4, 6, 5, 3],
          "ylabel": "students"})

# --- Reading tables (6) ---
m("Reading tables",
  r"A survey of 60 people's favorite drink: Tea 18, Coffee 22, Juice 12, Water 8. What fraction of people chose coffee?",
  r"$\dfrac{11}{30}$", [r"$\dfrac{22}{60}$", r"$\dfrac{18}{60}$", r"$\dfrac{11}{60}$"],
  r"$\dfrac{22}{60}$ simplifies (divide by $2$) to $\dfrac{11}{30}$.")
m("Reading tables",
  r"Using the same survey (Tea 18, Coffee 22, Juice 12, Water 8, out of 60), what percent chose either tea or water, to the nearest percent?",
  "$43\\%$", ["$30\\%$", "$26\\%$", "$50\\%$"], r"$(18+8)\div60=26\div60\approx43\%$.")
m("Reading tables",
  r"A table shows test scores: score $60$ (4 students), $70$ (7), $80$ (9), $90$ (6), $100$ (4). Find the total number of students.",
  "$30$", ["$26$", "$34$", "$25$"], r"$4+7+9+6+4=30$.")
m("Reading tables", r"Using the same test data, find the mean score to two decimal places.",
  "$79.67$", ["$80.00$", "$76.33$", "$79.00$"],
  r"Sum $=240+490+720+540+400=2{,}390$; mean $=2{,}390\div30\approx79.67$.")
m("Reading tables",
  r"A table shows the number of pets owned by 25 families: $0$ pets (6 families), $1$ pet (10), $2$ pets (7), $3$ pets (2). Find the median number of pets.",
  "$1$", ["$2$", "$1.2$", "$0$"],
  r"With $25$ values sorted, the median is the $13$th value, which falls in the '$1$ pet' group.")
m("Reading tables", r"Using the same pet data, find the mean number of pets per family, to two decimal places.",
  "$1.20$", ["$1.00$", "$1.50$", "$30$"], r"Sum $=0(6)+1(10)+2(7)+3(2)=30$; mean $=30\div25=1.20$.")

# --- Reading bar charts (7) ---
m("Reading bar charts",
  r"The bar chart shows books sold by genre in one week. Find the total books sold, and the modal genre.",
  "$120$; Fiction", ["$120$; Mystery", "$100$; Fiction", "$120$; Romance"],
  r"Total $=45+30+25+20=120$; Fiction had the most sales ($45$).",
  figure={"type": "bars", "categories": ["Fiction", "Mystery", "Sci-Fi", "Romance"],
          "values": [45, 30, 25, 20], "ylabel": "books sold"})
m("Reading bar charts",
  r"Using the same book-sales data, what percent of total books sold were mystery novels, to the nearest percent?",
  "$25\\%$", ["$30\\%$", "$38\\%$", "$20\\%$"], r"$30\div120=25\%$.")
m("Reading bar charts",
  r"The bar chart shows monthly rainfall in mm. Find the mean monthly rainfall.",
  "$56.25$", ["$55$", "$65$", "$225$"], r"Mean $=\dfrac{50+70+40+65}{4}=\dfrac{225}{4}=56.25$ mm.",
  figure={"type": "bars", "categories": ["Jan", "Feb", "Mar", "Apr"], "values": [50, 70, 40, 65],
          "ylabel": "rainfall (mm)"})
m("Reading bar charts",
  r"Using the same rainfall data (Jan 50, Feb 70, Mar 40, Apr 65 mm), find the percent decrease from Feb to Mar, to the nearest percent.",
  "$43\\%$", ["$30\\%$", "$75\\%$", "$40\\%$"], r"Decrease $=70-40=30$; $30\div70\approx43\%$.")
m("Reading bar charts",
  r"The bar chart shows quarterly sales for four stores, in thousands of riyals. Find the range, and which store had the highest sales.",
  "$55$; Store D", ["$140$; Store D", "$55$; Store B", "$35$; Store D"],
  r"Range $=140-85=55$; Store D had the highest sales ($140$).",
  figure={"type": "bars", "categories": ["Store A", "Store B", "Store C", "Store D"],
          "values": [85, 120, 95, 140], "ylabel": "sales (000 SAR)"})
m("Reading bar charts",
  r"The bar chart shows hours studied each weekday. Find the total hours, and the mean hours per day.",
  "$12$; $2.4$", ["$10$; $2$", "$12$; $2$", "$12$; $3$"],
  r"Total $=2+3+1+4+2=12$; mean $=12\div5=2.4$.",
  figure={"type": "bars", "categories": ["Mon", "Tue", "Wed", "Thu", "Fri"], "values": [2, 3, 1, 4, 2],
          "ylabel": "hours"})
m("Reading bar charts",
  r"The bar chart shows the number of defective items found for four products in a quality check. Find the total defects, and the range.",
  "$40$; $10$", ["$40$; $15$", "$35$; $10$", "$40$; $7$"],
  r"Total $=12+8+15+5=40$; range $=15-5=10$.",
  figure={"type": "bars", "categories": ["Product A", "Product B", "Product C", "Product D"],
          "values": [12, 8, 15, 5], "ylabel": "defects"})

# --- Basic probability (6) ---
m("Basic probability", r"A bag holds 5 red and 7 blue marbles. Find $P(\text{red})$.",
  r"$\dfrac{5}{12}$", [r"$\dfrac{7}{12}$", r"$\dfrac{5}{7}$", r"$\dfrac{1}{12}$"], r"$5$ red out of $12$ total.")
m("Basic probability", r"A fair six-sided die is rolled. Find $P(\text{a number less than }3)$.",
  r"$\dfrac{1}{3}$", [r"$\dfrac{1}{2}$", r"$\dfrac{1}{6}$", r"$\dfrac{2}{3}$"],
  r"Favorable outcomes $\{1,2\}$: $\dfrac{2}{6}=\dfrac{1}{3}$.")
m("Basic probability", r"A card is drawn from a standard deck of 52 cards. Find $P(\text{a king})$.",
  r"$\dfrac{1}{13}$", [r"$\dfrac{1}{4}$", r"$\dfrac{4}{13}$", r"$\dfrac{1}{52}$"],
  r"$4$ kings out of $52$: $\dfrac{4}{52}=\dfrac{1}{13}$.")
m("Basic probability", r"A spinner has 10 equal sections numbered 1 to 10. Find $P(\text{a multiple of }3)$.",
  r"$\dfrac{3}{10}$", [r"$\dfrac{1}{3}$", r"$\dfrac{4}{10}$", r"$\dfrac{1}{10}$"],
  r"Multiples of $3$ from $1$–$10$: $\{3,6,9\}$, so $\dfrac{3}{10}$.")
m("Basic probability", r"A bag holds 6 yellow and 9 green balls. Find $P(\text{yellow})$.",
  r"$\dfrac{2}{5}$", [r"$\dfrac{3}{5}$", r"$\dfrac{6}{9}$", r"$\dfrac{1}{5}$"],
  r"$6$ out of $15$ simplifies to $\dfrac{2}{5}$.")
m("Basic probability", r"A fair six-sided die is rolled. Find $P(\text{an odd number})$.",
  r"$\dfrac{1}{2}$", [r"$\dfrac{1}{3}$", r"$\dfrac{2}{3}$", r"$\dfrac{1}{6}$"],
  r"Odd outcomes $\{1,3,5\}$: $\dfrac{3}{6}=\dfrac{1}{2}$.")

# --- Combined and complementary events (6) ---
m("Combined and complementary events",
  r"A bag holds 4 red, 6 blue and 5 green marbles. Find $P(\text{not blue})$.",
  r"$\dfrac{3}{5}$", [r"$\dfrac{6}{15}$", r"$\dfrac{2}{5}$", r"$\dfrac{9}{6}$"],
  r"Not blue $=4+5=9$ out of $15$: $\dfrac{9}{15}=\dfrac{3}{5}$.")
m("Combined and complementary events", r"Two fair coins are tossed. Find $P(\text{at least one tail})$.",
  r"$\dfrac{3}{4}$", [r"$\dfrac{1}{4}$", r"$\dfrac{1}{2}$", r"$\dfrac{1}{3}$"],
  r"$P(\text{no tails})=\dfrac{1}{4}$, so $P(\text{at least one})=1-\dfrac{1}{4}=\dfrac{3}{4}$.")
m("Combined and complementary events", r"A die is rolled twice. Find $P(\text{both rolls show an even number})$.",
  r"$\dfrac{1}{4}$", [r"$\dfrac{1}{2}$", r"$\dfrac{1}{3}$", r"$\dfrac{1}{6}$"],
  r"Each roll: $P(\text{even})=\dfrac{1}{2}$; both: $\dfrac{1}{2}\times\dfrac{1}{2}=\dfrac{1}{4}$.")
m("Combined and complementary events",
  r"A bag holds 5 white and 7 black balls. One ball is drawn and not replaced, then a second is drawn. Find $P(\text{both black})$.",
  r"$\dfrac{7}{22}$", [r"$\dfrac{49}{144}$", r"$\dfrac{7}{12}$", r"$\dfrac{6}{11}$"],
  r"$\dfrac{7}{12}\times\dfrac{6}{11}=\dfrac{42}{132}=\dfrac{7}{22}$.")
m("Combined and complementary events",
  r"A card is drawn, replaced, then a second card is drawn from a standard deck. Find $P(\text{both hearts})$.",
  r"$\dfrac{1}{16}$", [r"$\dfrac{1}{4}$", r"$\dfrac{1}{8}$", r"$\dfrac{1}{2}$"],
  r"$\left(\dfrac{13}{52}\right)^2=\left(\dfrac{1}{4}\right)^2=\dfrac{1}{16}$.")
m("Combined and complementary events",
  r"A bag holds 3 red and 4 blue marbles. Two are drawn without replacement. Find $P(\text{both red})$.",
  r"$\dfrac{1}{7}$", [r"$\dfrac{3}{7}$", r"$\dfrac{9}{49}$", r"$\dfrac{2}{7}$"],
  r"$\dfrac{3}{7}\times\dfrac{2}{6}=\dfrac{6}{42}=\dfrac{1}{7}$.")

# --- Weighted averages (6) ---
m("Weighted averages",
  r"A class of 12 students has an average score of $78$. A 13th student joins with a score of $91$. Find the new average.",
  "$79.00$", ["$78.00$", "$84.50$", "$91.00$"],
  r"New total $=12(78)+91=1{,}027$; new average $=1{,}027\div13=79.00$.")
m("Weighted averages",
  r"Class A has 25 students with mean score $70$; Class B has 15 students with mean score $90$. Find the combined mean.",
  "$77.5$", ["$80$", "$75$", "$160$"], r"$\dfrac{25(70)+15(90)}{40}=\dfrac{3{,}100}{40}=77.5$.")
m("Weighted averages",
  r"A student's final grade is $30\%$ homework average (score $85$) and $70\%$ exam average (score $75$). Find the final grade.",
  "$78$", ["$80$", "$82$", "$75.5$"], r"$0.3(85)+0.7(75)=25.5+52.5=78$.")
m("Weighted averages",
  r"A survey combines two groups: 20 people with average age $30$, and 30 people with average age $40$. Find the combined average age.",
  "$36$", ["$35$", "$34$", "$70$"], r"$\dfrac{20(30)+30(40)}{50}=\dfrac{1{,}800}{50}=36$.")
m("Weighted averages",
  r"A class of 8 students has an average score of $65$. A 9th student joins, changing the new average to $68$. Find the 9th student's score.",
  "$92$", ["$71$", "$88$", "$65$"],
  r"New total $=9(68)=612$; old total $=8(65)=520$; 9th score $=612-520=92$.")
m("Weighted averages",
  r"Two classes combine: Class A (10 students, mean $60$) and Class B ($n$ students, mean $90$), giving a combined mean of $78$ for all students. Find $n$.",
  "$15$", ["$10$", "$20$", "$12$"],
  r"$\dfrac{600+90n}{10+n}=78\Rightarrow600+90n=780+78n\Rightarrow12n=180\Rightarrow n=15$.")

# --- Comparing data sets (5) ---
m("Comparing data sets",
  r"Data set A: $12,14,16,18,20$. Data set B: $8,15,17,19,21$. Both have the same mean. Which has the greater range?",
  "Data set B", ["Data set A", "They are equal", "Cannot be determined"],
  r"Both have mean $16$. Range A $=8$; range B $=13$. B has the greater range.")
m("Comparing data sets",
  r"Team X scored $18,22,25,23$ points in 4 games. Team Y scored $15,15,32,26$. Both teams have the same mean. Which team is more consistent (smaller range)?",
  "Team X", ["Team Y", "They are equally consistent", "Cannot be determined"],
  r"Both have mean $22$. Range X $=7$; range Y $=17$. Team X is more consistent.")
m("Comparing data sets",
  r"Class 1 has 16 students with mean score $70$; Class 2 has 24 students with mean score $80$. Find the combined mean of both classes.",
  "$76$", ["$75$", "$77$", "$150$"], r"$\dfrac{16(70)+24(80)}{40}=\dfrac{3{,}040}{40}=76$.")
m("Comparing data sets",
  r"Data set A: $5,10,15,20,25$. Data set B: $13,14,15,16,17$. Both have mean $15$. Which has the smaller range, and what is it?",
  "Data set B; $4$", ["Data set A; $20$", "Data set B; $20$", "Data set A; $4$"],
  r"Range A $=20$; range B $=4$. Data set B is smaller.")
m("Comparing data sets",
  r"Two data sets both have median $20$. Set P: $10,15,20,25,30$. Set Q: $18,19,20,21,22$. Which set is more spread out?",
  "Set P", ["Set Q", "They are equally spread out", "Cannot be determined"],
  r"Range P $=20$; range Q $=4$. Set P is more spread out.")

# --- Word problems (7) ---
m("Word problems",
  r"A teacher records the number of siblings for 12 students: $2,1,0,2,3,1,2,0,1,2,3,1$. Find the mean, to two decimal places.",
  "$1.50$", ["$1.33$", "$1.60$", "$2.00$"], r"Sum $=18$; mean $=18\div12=1.50$.")
m("Word problems",
  r"A company's weekly sales (in thousands of riyals) over 6 weeks: $45,60,38,72,55,50$. Find the mean weekly sales.",
  "$53.33$", ["$55.00$", "$50.00$", "$320$"], r"Sum $=320$; mean $=320\div6\approx53.33$.")
m("Word problems",
  r"A jar contains 6 red, 4 blue and 2 yellow candies. A candy is picked and eaten, then another is picked. Find $P(\text{both red})$.",
  r"$\dfrac{5}{22}$", [r"$\dfrac{1}{4}$", r"$\dfrac{3}{11}$", r"$\dfrac{6}{12}$"],
  r"$\dfrac{6}{12}\times\dfrac{5}{11}=\dfrac{30}{132}=\dfrac{5}{22}$.")
m("Word problems",
  r"In a survey of 300 students, 180 prefer math and the rest prefer science. Find the probability, as a percent, that a randomly chosen student prefers science.",
  "$40\\%$", ["$60\\%$", "$18\\%$", "$120\\%$"], r"Science $=120$ out of $300$: $40\%$.")
m("Word problems",
  r"The bar chart shows a company's quarterly sales, in thousands of riyals. Find the total annual sales, and the mean quarterly sales.",
  "$1{,}560$; $390$", ["$1{,}560$; $450$", "$1{,}200$; $390$", "$1{,}560$; $400$"],
  r"Total $=320+410+380+450=1{,}560$; mean $=1{,}560\div4=390$.",
  figure={"type": "bars", "categories": ["Q1", "Q2", "Q3", "Q4"], "values": [320, 410, 380, 450],
          "ylabel": "sales (000 SAR)"})
m("Word problems",
  r"A survey of 150 shoppers found 90 prefer online shopping and the rest prefer in-store. Find the probability, as a fraction in simplest form, that a randomly chosen shopper prefers in-store.",
  r"$\dfrac{2}{5}$", [r"$\dfrac{3}{5}$", r"$\dfrac{90}{150}$", r"$\dfrac{3}{50}$"],
  r"In-store $=60$ out of $150$, which simplifies to $\dfrac{2}{5}$.")
m("Word problems",
  r"A basketball player makes 18 out of 25 free throws attempted. Find the probability, as a decimal, that the next free throw is missed (based on this rate).",
  "$0.28$", ["$0.72$", "$0.18$", "$0.25$"], r"Missed rate $=\dfrac{25-18}{25}=\dfrac{7}{25}=0.28$.")

b.check(50)
