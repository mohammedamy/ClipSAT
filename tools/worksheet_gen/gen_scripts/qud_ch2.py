# -*- coding: utf-8 -*-
"""Qudrat Ch.2 Ratios, Proportion & Percentages — 50 new MCQs (EN)."""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank, fracstr, mixedstr, F

b = Bank(seed=202)
m = b.mcq

# ---- Simplifying & writing ratios (4) ----
m("Simplifying & writing ratios", r"Simplify the ratio $42:56$.", "$3:4$", ["$6:8$", "$7:8$", "$3:8$"],
  r"Divide both terms by their GCD, $14$: $42\div14:56\div14=3:4$.")
m("Simplifying & writing ratios", r"Simplify $18:45$.", "$2:5$", ["$3:5$", "$2:9$", "$6:15$"],
  r"GCD of $18$ and $45$ is $9$: $18\div9:45\div9=2:5$.")
m("Simplifying & writing ratios",
  r"A recipe uses $250$ g flour and $2$ eggs. Write the ratio of flour (in grams) to eggs in simplest form.",
  "$125:1$", ["$250:2$", "$1:125$", "$2:250$"],
  r"$250:2$ simplifies by dividing both by $2$: $125:1$.")
m("Simplifying & writing ratios", r"Express $0.75:2$ as a ratio of whole numbers in simplest form.",
  "$3:8$", ["$75:2$", "$3:4$", "$75:200$"],
  r"Multiply both terms by $4$ to clear the decimal: $3:8$.")

# ---- Sharing in a given ratio (5) ----
m("Sharing in a given ratio",
  r"The bar chart shows the ratio in which a total of $84$ is to be shared. Find the larger share.",
  48, [36, 63, 21],
  r"Total parts $=3+4=7$; each part $=84\div7=12$. Larger share $=4\times12=48$.",
  figure={"type":"bars","categories":["Part A","Part B"],"values":[3,4],"ylabel":"ratio parts","width":220})
m("Sharing in a given ratio", r"Share $260$ SAR in the ratio $2:3:5$. Find the smallest share.",
  "$52$ SAR", ["$78$ SAR", "$130$ SAR", "$65$ SAR"],
  r"Total parts $=2+3+5=10$; each part $=260\div10=26$. Smallest share $=2\times26=52$.")
m("Sharing in a given ratio",
  r"Two business partners share a profit of $18{,}000$ SAR in the ratio $5:7$. Find the larger share.",
  "$10{,}500$ SAR", ["$7{,}500$ SAR", "$9{,}000$ SAR", "$12{,}857$ SAR"],
  r"Each part $=18{,}000\div12=1{,}500$. Larger share $=7\times1{,}500=10{,}500$ SAR.")
m("Sharing in a given ratio",
  r"A line of length $36$ cm is divided in the ratio $4:5$. Find the length of the shorter piece.",
  16, [20, 4, 9],
  r"Total parts $=4+5=9$; each part $=36\div9=4$ cm. Shorter piece $=4\times4=16$ cm.")
m("Sharing in a given ratio",
  r"A class of $40$ students has boys and girls in the ratio $3:5$. How many boys are there?",
  15, [25, 24, 8],
  r"Total parts $=3+5=8$; each part $=40\div8=5$. Boys $=3\times5=15$.")

# ---- Equivalent ratios & scale (4) ----
m("Equivalent ratios & scale", r"If $a:b=3:5$ and $a=18$, find $b$.", 30, [10.8, 24, 15],
  r"Scale factor $=18\div3=6$. $b=5\times6=30$.")
m("Equivalent ratios & scale", r"A map has scale $1:50{,}000$. A distance of $3$ cm on the map represents how many km in reality?",
  "$1.5$ km", ["$150$ km", "$15$ km", "$0.15$ km"],
  r"$3\times50{,}000=150{,}000$ cm $=1{,}500$ m $=1.5$ km.")
m("Equivalent ratios & scale", r"Which ratio is equivalent to $4:9$?", "$20:45$", ["$16:37$", "$8:16$", "$9:4$"],
  r"$4:9$ scaled by $5$ gives $20:45$.")
m("Equivalent ratios & scale",
  r"In a photo, a model that is $1.8$ m tall appears $6$ cm high. Using the same scale, how tall (in m) is a building that appears $40$ cm high in the photo?",
  12, [7.2, 24, 4.8],
  r"Scale: $6$ cm represents $1.8$ m, so $1$ cm represents $0.3$ m. $40\times0.3=12$ m.")

# ---- Percent of a number (5) ----
m("Percent of a number", r"Find $35\%$ of $260$.", 91, [86, 95, 78],
  r"$0.35\times260=91$.")
m("Percent of a number", r"Find $12\%$ of $450$.", 54, [45, 62, 48],
  r"$0.12\times450=54$.")
m("Percent of a number", r"The bar chart shows four students' quiz scores out of $80$. Which score is exactly $75\%$?", "$60$",
  ["$56$", "$64$", "$68$"],
  r"$75\%$ of $80=0.75\times80=60$.",
  figure={"type":"bars","categories":["56","60","64","68"],"values":[56,60,64,68],"ylabel":"score /80","width":240})
m("Percent of a number",
  r"The bar chart shows monthly rent for four apartments. $8\%$ of which apartment's rent equals $200$ SAR?",
  "Apt. 3", ["Apt. 1", "Apt. 2", "Apt. 4"],
  r"$0.08\times2{,}500=200$ SAR, matching Apartment 3's rent of $2{,}500$ SAR.",
  figure={"type":"bars","categories":["Apt. 1","Apt. 2","Apt. 3","Apt. 4"],"values":[2000,2200,2500,2800],"ylabel":"rent (SAR)","width":240})
m("Percent of a number", r"$150\%$ of a number is $300$. Find the number.", 200, [450, 150, 250],
  r"$1.5\times x=300\Rightarrow x=300\div1.5=200$.")

# ---- Fraction/decimal/percent conversion (4) ----
m("Fraction, decimal & percent conversion", r"Write $\dfrac{7}{20}$ as a percent.", "$35\\%$", ["$7\\%$", "$70\\%$", "$3.5\\%$"],
  r"$\dfrac{7}{20}=\dfrac{35}{100}=35\%$.")
m("Fraction, decimal & percent conversion", r"Write $0.06$ as a percent.", "$6\\%$", ["$0.6\\%$", "$60\\%$", "$0.06\\%$"],
  r"Move the decimal point two places right: $0.06=6\%$.")
m("Fraction, decimal & percent conversion", r"Write $85\%$ as a fraction in simplest form.", r"$\dfrac{17}{20}$",
  [r"$\dfrac{85}{100}$", r"$\dfrac{8}{5}$", r"$\dfrac{17}{25}$"],
  r"$85\%=\dfrac{85}{100}$, which simplifies (divide by $5$) to $\dfrac{17}{20}$.")
m("Fraction, decimal & percent conversion", r"Which of these is largest: $\dfrac{3}{8}$, $0.4$, or $37\%$?",
  "$0.4$", [r"$\dfrac{3}{8}$", "$37\\%$", "They are all equal"],
  r"$\dfrac{3}{8}=0.375=37.5\%$, and $37\%=0.37$. So $0.4$ is the largest.")

# ---- Percentage increase and decrease (5) ----
m("Percentage increase & decrease", r"Increase $80$ by $25\%$.", 100, [95, 105, 20],
  r"$80\times1.25=100$.")
m("Percentage increase & decrease", r"Decrease $150$ by $12\%$.", 132, [138, 18, 128],
  r"$150\times0.88=132$.")
m("Percentage increase & decrease",
  r"The bar chart shows a salary before and after a raise. What percentage increase does it represent?",
  "$20\\%$", ["$15\\%$", "$25\\%$", "$500\\%$"],
  r"Increase $=6{,}000-5{,}000=1{,}000$. Percentage increase $=\dfrac{1{,}000}{5{,}000}\times100\%=20\%$.",
  figure={"type":"bars","categories":["Before","After"],"values":[5000,6000],"ylabel":"SAR","width":220})
m("Percentage increase & decrease", r"A shirt costs $120$ SAR after a $20\%$ discount. Find the original price.",
  "$150$ SAR", ["$144$ SAR", "$100$ SAR", "$140$ SAR"],
  r"$120=0.8\times\text{original}\Rightarrow\text{original}=120\div0.8=150$ SAR.")
m("Percentage increase & decrease", r"Find the percentage change from $40$ to $34$.", "$15\\%$ decrease",
  ["$6\\%$ decrease", "$17.6\\%$ decrease", "$15\\%$ increase"],
  r"Change $=34-40=-6$. Percentage change $=\dfrac{-6}{40}\times100\%=-15\%$, a $15\%$ decrease.")

# ---- Finding the original value (4) ----
m("Finding the original value", r"After a $15\%$ increase, a price is $92$ SAR. Find the original price.",
  "$80$ SAR", ["$78.20$ SAR", "$107$ SAR", "$88$ SAR"],
  r"$92=1.15\times\text{original}\Rightarrow\text{original}=92\div1.15=80$ SAR.")
m("Finding the original value", r"After a $30\%$ discount, an item costs $56$ SAR. Find the original price.",
  "$80$ SAR", ["$72.80$ SAR", "$74.67$ SAR", "$86$ SAR"],
  r"$56=0.7\times\text{original}\Rightarrow\text{original}=56\div0.7=80$ SAR.")
m("Finding the original value",
  r"A population grew by $8\%$ to reach $27{,}000$. Find the population before the growth.",
  "$25{,}000$", ["$24{,}840$", "$29{,}160$", "$26{,}000$"],
  r"$27{,}000=1.08\times\text{original}\Rightarrow\text{original}=27{,}000\div1.08=25{,}000$.")
m("Finding the original value",
  r"After including a $15\%$ service charge, a restaurant bill is $138$ SAR. Find the bill before the charge.",
  "$120$ SAR", ["$117.30$ SAR", "$158.70$ SAR", "$123$ SAR"],
  r"$138=1.15\times\text{original}\Rightarrow\text{original}=138\div1.15=120$ SAR.")

# ---- Successive percentage changes (3) ----
m("Successive percentage changes", r"A price of $200$ rises $10\%$, then rises another $10\%$. Find the final price.",
  "$242$", ["$240$", "$220$", "$244$"],
  r"$200\times1.1\times1.1=242$.")
m("Successive percentage changes", r"A price of $500$ falls $20\%$, then rises $20\%$. Find the final price.",
  "$480$", ["$500$", "$460$", "$520$"],
  r"$500\times0.8\times1.2=480$ — a rise then fall of the same percentage never returns to the start.")
m("Successive percentage changes",
  r"The bar chart shows a stock's value at the start and after rising $50\%$ in year one. It then falls $50\%$ in year two. Find its final value.",
  "$750$", ["$1{,}000$", "$500$", "$900$"],
  r"$1{,}000\times1.5\times0.5=750$.",
  figure={"type":"bars","categories":["Start","After year 1 (+50%)"],"values":[1000,1500],"ylabel":"value","width":220})

# ---- Direct proportion (4) ----
m("Direct proportion", r"If $5$ workers can build a wall in a task requiring $200$ worker-hours total, and pay is directly proportional to hours worked, how much does one worker earn (in SAR) for $8$ hours at a rate of $25$ SAR/hour?",
  200, [175, 225, 40],
  r"$8\times25=200$ SAR — direct proportion between hours worked and pay.")
m("Direct proportion", r"$12$ pens cost $30$ SAR. At the same rate, find the cost of $20$ pens.",
  "$50$ SAR", ["$45$ SAR", "$60$ SAR", "$40$ SAR"],
  r"Cost per pen $=30\div12=2.5$ SAR. $20$ pens cost $20\times2.5=50$ SAR.")
m("Direct proportion",
  r"The graph shows the direct proportion between the number of hours $x$ worked and pay $y$ in SAR, $y=15x$. How much is earned for $6$ hours?",
  90, [75, 105, 21],
  r"$y=15\times6=90$ SAR.",
  figure={"type":"plot","fns":["15*x"],"xmin":0,"xmax":8,"ymin":0,"ymax":120,"width":220})
m("Direct proportion", r"A car uses $8$ liters of fuel to travel $96$ km. At the same rate, how far can it travel on $20$ liters?",
  240, [200, 180, 260],
  r"Rate $=96\div8=12$ km per liter. $20\times12=240$ km.")

# ---- Inverse proportion (3) ----
m("Inverse proportion", r"$6$ workers can finish a job in $10$ days. How many days would $4$ workers take (same rate each)?",
  15, [12, 6.67, 24],
  r"Total worker-days $=6\times10=60$. With $4$ workers: $60\div4=15$ days.")
m("Inverse proportion", r"If $y$ is inversely proportional to $x$ and $y=8$ when $x=3$, find $y$ when $x=12$.",
  2, [32, 4, 0.5],
  r"$xy=3\times8=24$ (constant). When $x=12$: $y=24\div12=2$.")
m("Inverse proportion",
  r"A tank is filled by $5$ identical pumps in $12$ hours. How long would $3$ of the same pumps take?",
  20, [7.2, 15, 4],
  r"Total pump-hours $=5\times12=60$. With $3$ pumps: $60\div3=20$ hours.")

# ---- Best value & unit price (4) ----
m("Best value & unit price",
  r"The bar chart shows the price per 100 g for three brands of coffee. Which brand offers the best value?",
  "Brand B", ["Brand A", "Brand C", "All are equal"],
  r"The lowest price per 100 g is the best value — Brand B at 9 SAR/100g beats Brand A (12) and Brand C (11).",
  figure={"type":"bars","categories":["Brand A","Brand B","Brand C"],"values":[12,9,11],"ylabel":"SAR /100g","width":220})
m("Best value & unit price",
  r"The bar chart shows the total price of two cereal boxes of different sizes: 400 g and 600 g. Which has the lower price per 100 g?",
  "The 600 g box", ["The 400 g box", "They are equal", "Cannot be determined"],
  r"400 g: $12\div4=3$ SAR/100g. 600 g: $16.50\div6=2.75$ SAR/100g. The 600 g box is cheaper per 100 g.",
  figure={"type":"bars","categories":["400 g box","600 g box"],"values":[12,16.5],"ylabel":"total price (SAR)","width":220})
m("Best value & unit price", r"Find the unit price (per kg) if $3.5$ kg of rice costs $28$ SAR.",
  "$8$ SAR/kg", ["$9.80$ SAR/kg", "$7$ SAR/kg", "$3.5$ SAR/kg"],
  r"$28\div3.5=8$ SAR per kg.")
m("Best value & unit price",
  r"A 2 L bottle of juice costs $18$ SAR. Find the price per 100 mL.",
  "$0.90$ SAR", ["$9$ SAR", "$1.80$ SAR", "$0.18$ SAR"],
  r"$2$ L $=2{,}000$ mL. $18\div2{,}000\times100=0.90$ SAR per 100 mL.")

# ---- Word problems (5) ----
m("Word problems", r"A car travels 240 km using 20 L of fuel. Find its fuel economy in km per liter.",
  12, [10, 14, 20],
  r"$240\div20=12$ km/L.")
m("Word problems",
  r"The bar chart shows subject preference percentages from a survey of $250$ students. How many students prefer math?",
  100, [90, 110, 60],
  r"$0.40\times250=100$ students.",
  figure={"type":"bars","categories":["Math","Science","Art"],"values":[40,35,25],"ylabel":"% of students","width":220})
m("Word problems",
  r"A recipe for $4$ people needs $2.5$ cups of rice. How many cups are needed for $10$ people?",
  "$6.25$ cups", ["$5$ cups", "$6$ cups", "$25$ cups"],
  r"Rice per person $=2.5\div4=0.625$. For $10$ people: $10\times0.625=6.25$ cups.")
m("Word problems",
  r"A company's revenue rose from $2.4$ million to $3.0$ million SAR. Find the percentage increase.",
  "$25\\%$", ["$20\\%$", "$60\\%$", "$30\\%$"],
  r"Increase $=3.0-2.4=0.6$ million. Percentage $=\dfrac{0.6}{2.4}\times100\%=25\%$.")
m("Word problems",
  r"A map scale is $1:200{,}000$. Two cities are $8.5$ cm apart on the map. Find the real distance in km.",
  17, [8.5, 34, 1.7],
  r"$8.5\times200{,}000=1{,}700{,}000$ cm $=17{,}000$ m $=17$ km.")

b.check(50)
print("Final: 50 questions built")
