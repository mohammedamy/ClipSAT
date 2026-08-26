# -*- coding: utf-8 -*-
"""50 new MCQs for Qudrat ch.8 — Word Problems & Reasoning. Distinct from
the existing 37 free-response questions (different setups/values
throughout). No figures: this genre is pure algebraic/verbal reasoning,
and every plausible diagram here would directly show the computed answer
rather than just the given data — the chapter's figure share is
deliberately 0%, balanced by ch.4's 46%."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=808)
m = b.mcq

# --- Number and digit reasoning (6) ---
m("Number and digit reasoning", r"A number decreased by 12 equals 47. Find the number.",
  "$59$", ["$35$", "$47$", "$65$"], r"$x-12=47\Rightarrow x=59$.")
m("Number and digit reasoning", r"Four times a number, minus 9, equals 47. Find the number.",
  "$14$", ["$9.5$", "$56$", "$11$"], r"$4x-9=47\Rightarrow4x=56\Rightarrow x=14$.")
m("Number and digit reasoning",
  r"The sum of two numbers is 74. One number is 18 more than the other. Find the larger number.",
  "$46$", ["$28$", "$56$", "$37$"], r"$x+(x+18)=74\Rightarrow x=28$; larger $=46$.")
m("Number and digit reasoning",
  r"A two-digit number has digit sum 9. Reversing its digits gives a number 27 more than the original. Find the original number.",
  "$36$", ["$45$", "$63$", "$18$"], r"Digits $3,6$: original $=36$, reversed $=63=36+27$.")
m("Number and digit reasoning", r"A number is increased by $25\%$ to give $60$. Find the original number.",
  "$48$", ["$45$", "$75$", "$40$"], r"$1.25x=60\Rightarrow x=48$.")
m("Number and digit reasoning", r"A number plus twice itself equals $27$. Find the number.",
  "$9$", ["$13.5$", "$18$", "$27$"], r"$x+2x=27\Rightarrow3x=27\Rightarrow x=9$.")

# --- Age problems (6) ---
m("Age problems",
  r"A father is 5 times as old as his son. In 4 years, he will be 3 times as old as his son will be. Find the father's current age.",
  "$20$", ["$4$", "$24$", "$16$"], r"$5x+4=3(x+4)\Rightarrow2x=8\Rightarrow x=4$; father $=20$.")
m("Age problems",
  r"Huda is twice as old as her sister. In 8 years, the sum of their ages will be 46. Find Huda's current age.",
  "$20$", ["$10$", "$14$", "$18$"], r"$(x+8)+(2x+8)=46\Rightarrow x=10$; Huda $=20$.")
m("Age problems",
  r"Khalid is 6 years older than Faisal. Five years ago, Khalid was twice as old as Faisal. Find their current ages.",
  "Faisal $=11$, Khalid $=17$", ["Faisal $=17$, Khalid $=11$", "Faisal $=5$, Khalid $=11$",
   "Faisal $=11$, Khalid $=6$"],
  r"$(x+6-5)=2(x-5)\Rightarrow x+1=2x-10\Rightarrow x=11$; Khalid $=17$.")
m("Age problems",
  r"The sum of a mother's and son's ages is 54. The mother is 24 years older than the son. Find the son's age.",
  "$15$", ["$39$", "$27$", "$30$"], r"$x+(x+24)=54\Rightarrow2x=30\Rightarrow x=15$.")
m("Age problems", r"In 8 years, Mona will be twice as old as she was 4 years ago. Find her current age.",
  "$16$", ["$8$", "$20$", "$12$"], r"$x+8=2(x-4)\Rightarrow x+8=2x-8\Rightarrow x=16$.")
m("Age problems", r"Tariq is currently twice as old as his son. If Tariq is 40, find his son's age.",
  "$20$", ["$80$", "$18$", "$22$"], r"$40=2s\Rightarrow s=20$.")

# --- Distance, rate and time (5) ---
m("Distance, rate and time", r"A train travels 210 km in 3 hours. At the same speed, how far does it travel in 7 hours?",
  "$490$", ["$630$", "$70$", "$420$"], r"Speed $=70$ km/h; $70\times7=490$ km.")
m("Distance, rate and time",
  r"Two cities are 420 km apart. A car leaves one city for the other at 60 km/h. How long does the trip take?",
  "$7$ hours", ["$6$ hours", "$25{,}200$ hours", "$8$ hours"], r"$420\div60=7$ hours.")
m("Distance, rate and time",
  r"Two cyclists start at the same point and ride in opposite directions, at 12 km/h and 18 km/h. After 3 hours, how far apart are they?",
  "$90$", ["$54$", "$30$", "$36$"], r"Combined speed $=30$ km/h; $30\times3=90$ km.")
m("Distance, rate and time",
  r"A plane flies against a headwind at 400 km/h and covers 1,600 km. How many hours does the flight take?",
  "$4$", ["$4{,}000$", "$400$", "$5$"], r"$1{,}600\div400=4$ hours.")
m("Distance, rate and time", r"A car travels at 90 km/h for 2.5 hours. Find the distance covered.",
  "$225$", ["$36$", "$92.5$", "$180$"], r"$90\times2.5=225$ km.")

# --- Work-rate problems (5) ---
m("Work-rate problems",
  r"Worker A can paint a room in 8 hours; Worker B can paint the same room in 4 hours. Working together, how long will it take?",
  r"$\dfrac{8}{3}$ hours", [r"$6$ hours", r"$4$ hours", r"$12$ hours"],
  r"$\dfrac{1}{8}+\dfrac{1}{4}=\dfrac{3}{8}$ per hour; time $=\dfrac{8}{3}$ hours.")
m("Work-rate problems",
  r"A pipe fills a tank in 12 hours; a second pipe fills it in 6 hours. Working together, how long to fill the tank?",
  "$4$ hours", ["$9$ hours", "$18$ hours", "$3$ hours"],
  r"$\dfrac{1}{12}+\dfrac{1}{6}=\dfrac{1}{4}$ per hour; time $=4$ hours.")
m("Work-rate problems",
  r"8 workers can complete a job in 6 days. How many days would 12 workers take, at the same rate?",
  "$4$", ["$9$", "$6$", "$3$"], r"Total work $=48$ worker-days; $48\div12=4$ days.")
m("Work-rate problems",
  r"A pipe fills a tank in 10 hours, but a leak can empty a full tank in 20 hours. If both act at once, how long to fill the tank?",
  "$20$ hours", ["$15$ hours", "$10$ hours", "$30$ hours"],
  r"Net rate $=\dfrac{1}{10}-\dfrac{1}{20}=\dfrac{1}{20}$ per hour; time $=20$ hours.")
m("Work-rate problems",
  r"Worker C can complete a task in 9 hours. After working alone for 3 hours, what fraction of the task remains?",
  r"$\dfrac{2}{3}$", [r"$\dfrac{1}{3}$", r"$\dfrac{1}{9}$", r"$\dfrac{1}{6}$"],
  r"In $3$ hours, $\dfrac{3}{9}=\dfrac{1}{3}$ is done; remaining $=\dfrac{2}{3}$.")

# --- Mixture and money problems (5) ---
m("Mixture and money problems",
  r"A jeweler mixes gold worth 250 riyals/gram with silver worth 40 riyals/gram to make 12 grams of a mixture worth 145 riyals/gram. How many grams of gold are used?",
  "$6$", ["$8$", "$4$", "$9$"], r"$250g+40(12-g)=1{,}740\Rightarrow210g=1{,}260\Rightarrow g=6$.")
m("Mixture and money problems",
  r"A shopkeeper has 21 riyals in 1-riyal and 2-riyal coins, 15 coins in total. How many 2-riyal coins does he have?",
  "$6$", ["$9$", "$15$", "$3$"], r"$x+y=15$, $x+2y=21\Rightarrow y=6$.")
m("Mixture and money problems",
  r"A solution is $30\%$ acid. How many liters of pure water must be added to 15 liters of this solution to make it $20\%$ acid?",
  "$7.5$", ["$5$", "$10$", "$4.5$"], r"$\dfrac{4.5}{15+w}=0.2\Rightarrow15+w=22.5\Rightarrow w=7.5$.")
m("Mixture and money problems",
  r"Event tickets cost 25 riyals for adults and 15 riyals for children. 200 tickets were sold for 4,300 riyals. How many adult tickets were sold?",
  "$130$", ["$70$", "$100$", "$150$"], r"$25a+15(200-a)=4{,}300\Rightarrow10a=1{,}300\Rightarrow a=130$.")
m("Mixture and money problems",
  r"A syrup is $25\%$ sugar. How many kilograms of pure sugar must be added to 8 kg of this syrup to make it $40\%$ sugar?",
  "$2$", ["$1$", "$3.2$", "$4$"], r"$\dfrac{2+x}{8+x}=0.4\Rightarrow2+x=3.2+0.4x\Rightarrow x=2$.")

# --- Logical deduction (5) ---
m("Logical deduction",
  r"Omar, Bandar and Nasser have 44 books together. Omar has twice as many as Bandar, and Nasser has 8 more than Bandar. Find how many books Bandar has.",
  "$9$", ["$18$", "$17$", "$22$"], r"$b+2b+(b+8)=44\Rightarrow4b=36\Rightarrow b=9$.")
m("Logical deduction",
  r"A number between 80 and 100 is divisible by both 4 and 6, but not by 8. Find the number.",
  "$84$", ["$96$", "$88$", "$90$"], r"Multiples of $12$ in range: $84,96$. $84\div8=10.5$ (not divisible); $96\div8=12$ (excluded).")
m("Logical deduction",
  r"In a class, every student plays chess or checkers (or both). 20 play chess, 15 play checkers, and 8 play both. How many students are in the class?",
  "$27$", ["$35$", "$43$", "$12$"], r"$20+15-8=27$.")
m("Logical deduction", r"Four consecutive odd integers sum to 96. Find the largest one.",
  "$27$", ["$21$", "$24$", "$30$"], r"$4n+12=96\Rightarrow n=21$; largest $=n+6=27$.")
m("Logical deduction", r"Three consecutive integers sum to 72. Find the smallest one.",
  "$23$", ["$24$", "$22$", "$25$"], r"$3n+3=72\Rightarrow n=23$.")

# --- Working backward (5) ---
m("Working backward",
  r"After spending half his money on a book, then 15 riyals on lunch, Faisal has 25 riyals left. How much did he start with?",
  "$80$", ["$40$", "$65$", "$100$"], r"$\dfrac{x}{2}-15=25\Rightarrow\dfrac{x}{2}=40\Rightarrow x=80$.")
m("Working backward", r"A number is doubled, then 6 is subtracted, giving 20. Find the original number.",
  "$13$", ["$7$", "$26$", "$16$"], r"$2x-6=20\Rightarrow x=13$.")
m("Working backward", r"After a $20\%$ pay cut, an employee's salary is 3,200 riyals. Find the salary before the cut.",
  "$4{,}000$", ["$3{,}840$", "$3{,}600$", "$4{,}200$"], r"$0.8x=3{,}200\Rightarrow x=4{,}000$.")
m("Working backward",
  r"A water tank is $\dfrac{1}{3}$ full. After adding 80 liters, it becomes $\dfrac{3}{4}$ full. Find the tank's total capacity.",
  "$192$", ["$240$", "$120$", "$106.7$"], r"$\dfrac{C}{3}+80=\dfrac{3C}{4}\Rightarrow80=\dfrac{5C}{12}\Rightarrow C=192$.")
m("Working backward", r"A number is halved, then 10 is added, giving 34. Find the original number.",
  "$48$", ["$44$", "$88$", "$24$"], r"$\dfrac{x}{2}+10=34\Rightarrow\dfrac{x}{2}=24\Rightarrow x=48$.")

# --- Mixed word problems (7) ---
m("Mixed word problems",
  r"A rectangular field is twice as long as it is wide, and its perimeter is 108 m. Find its length and width.",
  "Length $=36$, width $=18$", ["Length $=18$, width $=36$", "Length $=54$, width $=27$",
   "Length $=36$, width $=36$"], r"$2(w+2w)=108\Rightarrow w=18$; length $=36$.")
m("Mixed word problems",
  r"Sarah buys 4 notebooks and 3 pens for 38 riyals. Khalid buys 2 notebooks and 5 pens for 40 riyals, at the same prices. Find the price of one notebook.",
  "$5$", ["$6$", "$4$", "$8$"], r"Solving the system: notebook $=5$ riyals, pen $=6$ riyals.")
m("Mixed word problems",
  r"A car rental costs 100 riyals per day plus 0.50 riyals per km driven. A 4-day rental cost 500 riyals. How many km were driven?",
  "$200$", ["$100$", "$250$", "$1{,}000$"], r"$100(4)=400$; remaining $=100$; km $=100\div0.5=200$.")
m("Mixed word problems", r"The sum of three consecutive even integers is 78. Find the largest one.",
  "$28$", ["$24$", "$26$", "$30$"], r"$3n+6=78\Rightarrow n=24$; largest $=n+4=28$.")
m("Mixed word problems",
  r"A shop sells pens for 4 riyals each, with a \"buy 4, get 1 free\" offer. Karim needs 25 pens. How much will he pay?",
  "$80$", ["$100$", "$96$", "$64$"], r"$25$ pens $=5$ groups of $5$ (pay for $4$, get $1$ free): $5\times4\times4=80$ riyals.")
m("Mixed word problems",
  r"A cyclist travels 60 km at a certain speed, then returns the same 60 km at half that speed, taking 9 hours total. Find the original speed.",
  "$20$", ["$10$", "$40$", "$15$"], r"$\dfrac{60}{v}+\dfrac{120}{v}=9\Rightarrow\dfrac{180}{v}=9\Rightarrow v=20$ km/h.")
m("Mixed word problems", r"Two numbers have a ratio of $3:5$ and a sum of 96. Find the larger number.",
  "$60$", ["$36$", "$48$", "$72$"], r"$8$ parts $=96$, each part $=12$; larger $=5\times12=60$.")

# --- More rate and proportion problems (6) ---
m("More rate and proportion problems", r"A photocopier prints 60 pages per minute. How many minutes does it take to print 900 pages?",
  "$15$", ["$54{,}000$", "$18$", "$12$"], r"$900\div60=15$ minutes.")
m("More rate and proportion problems",
  r"A recipe for 8 people uses 600 g of rice. How much rice is needed for 20 people, at the same rate per person?",
  "$1{,}500$", ["$1{,}200$", "$750$", "$1{,}800$"], r"Rate $=75$ g/person; $20\times75=1{,}500$ g.")
m("More rate and proportion problems",
  r"A factory produces 1,500 items in 6 hours. At the same rate, how many items would it produce in a 9-hour shift?",
  "$2{,}250$", ["$2{,}000$", "$1{,}875$", "$2{,}700$"], r"Rate $=250$/hr; $9\times250=2{,}250$.")
m("More rate and proportion problems",
  r"Three taps together fill a pool in 5 hours. Two of the taps alone would take 8 hours. How long would the third tap alone take?",
  r"$\dfrac{40}{3}$ hours", [r"$3$ hours", r"$13$ hours", r"$40$ hours"],
  r"Third tap's rate $=\dfrac{1}{5}-\dfrac{1}{8}=\dfrac{3}{40}$ per hour; time $=\dfrac{40}{3}$ hours.")
m("More rate and proportion problems",
  r"A car uses 8 liters of fuel to travel 96 km. At the same rate, how many liters are needed to travel 156 km?",
  "$13$", ["$12$", "$14.6$", "$19.5$"], r"Rate $=12$ km/liter; $156\div12=13$ liters.")
m("More rate and proportion problems",
  r"A map has a scale of $1:50{,}000$. If two towns are 6.4 cm apart on the map, find the actual distance in km.",
  "$3.2$", ["$32$", "$0.32$", "$320$"], r"$6.4\times50{,}000=320{,}000$ cm $=3{,}200$ m $=3.2$ km.")

b.check(50)
