#!/usr/bin/env python3
"""Build 4-page branded worksheets with rendered math for Qiyas Qudrat (8 Topics, AR + EN).

Ensures:
1. Rendered math via matplotlib mathtext with true baseline alignment.
2. Official ClipSAT logo and branding (clipsat-mark.png, indigo palette, header, copyright footer).
3. Strictly 4 pages in size for each worksheet and answer key.
4. Clean of repeated ideas: 4 distinct sections with 3 progressive questions per section (12 questions total per topic).
5. 100% alignment with official Qiyas (قياس) General Aptitude Test (القدرات العامة - القسم الكمي) standards.
"""
import os
import sys
import json
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(HERE))
TOPICS_DIR = os.path.join(HERE, "topics", "qudrat")
DOWNLOADS_DIR = os.path.join(SITE_ROOT, "public", "downloads")
GENERATE_PY = os.path.join(HERE, "generate.py")

os.environ["MPLCONFIGDIR"] = "/tmp/mpl"

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

# ==============================================================================
# QUDRAT TOPICS DEFINITIONS (8 TOPICS x 2 LANGUAGES = 16 TOPIC FILES)
# ==============================================================================

QUDRAT_TOPICS = [
    # --------------------------------------------------------------------------
    # 1.01: Arithmetic & Number Sense (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "1.01", "slug": "arithmetic-number-sense",
        "title": "Arithmetic & Number Sense",
        "sections": [
            {
                "heading": "Section 1: Operations, Order of Operations & Decimals",
                "questions": [
                    make_q(
                        "What is the value of $18 - 3 \\times (4 + 2) \\div 2$?",
                        ["$9$", "$12$", "$15$", "$6$"], 0,
                        "Order of operations: Parentheses first: $4 + 2 = 6$. Multiplication and division from left to right: $3 \\times 6 = 18$, then $18 \\div 2 = 9$. Finally subtraction: $18 - 9 = 9$."
                    ),
                    make_q(
                        "What is the value of $\\frac{1}{0.2} + \\frac{1}{0.5} + \\frac{1}{0.25}$?",
                        ["$11$", "$10$", "$9$", "$8$"], 0,
                        "Convert decimals to fractions: $\\frac{1}{0.2} = 5$, $\\frac{1}{0.5} = 2$, $\\frac{1}{0.25} = 4$. Summing gives $5 + 2 + 4 = 11$."
                    ),
                    make_q(
                        "Evaluate the sum: $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6}$.",
                        ["$1$", "$\\frac{5}{6}$", "$\\frac{7}{6}$", "$\\frac{4}{3}$"], 0,
                        "Find the common denominator $6$: $\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6} = \\frac{6}{6} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 2: Exponents, Radicals & Scientific Form",
                "questions": [
                    make_q(
                        "If $2^{x+3} = 64$, what is the value of $x$?",
                        ["$3$", "$4$", "$5$", "$6$"], 0,
                        "Since $64 = 2^6$, equating exponents yields $x + 3 = 6 \\Rightarrow x = 3$."
                    ),
                    make_q(
                        "Simplify the expression: $\\sqrt{48} + \\sqrt{27} - \\sqrt{12}$.",
                        ["$5\\sqrt{3}$", "$4\\sqrt{3}$", "$3\\sqrt{3}$", "$6\\sqrt{3}$"], 0,
                        "Simplify each radical: $\\sqrt{48} = 4\\sqrt{3}$, $\\sqrt{27} = 3\\sqrt{3}$, $\\sqrt{12} = 2\\sqrt{3}$. Combining yields $4\\sqrt{3} + 3\\sqrt{3} - 2\\sqrt{3} = 5\\sqrt{3}$."
                    ),
                    make_q(
                        "What is the value of $\\frac{2^{10} - 2^9}{2^8}$?",
                        ["$2$", "$4$", "$1$", "$8$"], 0,
                        "Factor out $2^9$ from the numerator: $\\frac{2^9(2 - 1)}{2^8} = \\frac{2^9(1)}{2^8} = 2^{9-8} = 2$."
                    )
                ]
            },
            {
                "heading": "Section 3: Divisibility Rules, Prime Factorization & Remainders",
                "questions": [
                    make_q(
                        "What is the units digit of $3^{42}$?",
                        ["$9$", "$3$", "$7$", "$1$"], 0,
                        "Powers of $3$ follow a $4$-cycle of units digits: $3^1 \\to 3, 3^2 \\to 9, 3^3 \\to 7, 3^4 \\to 1$. Dividing $42 \\div 4 = 10$ with remainder $2$. Thus, the units digit is that of $3^2 = 9$."
                    ),
                    make_q(
                        "The five-digit number $42a56$ is divisible by $9$. What is the value of the digit $a$?",
                        ["$1$", "$2$", "$0$", "$8$"], 0,
                        "A number is divisible by $9$ if the sum of its digits is a multiple of $9$. Sum $= 4 + 2 + a + 5 + 6 = 17 + a$. The next multiple of $9$ is $18$, so $a = 18 - 17 = 1$."
                    ),
                    make_q(
                        "What is the remainder when $4^{35}$ is divided by $5$?",
                        ["$4$", "$1$", "$2$", "$3$"], 0,
                        "Notice the pattern of remainders modulo $5$: $4^1 \\equiv 4$, $4^2 = 16 \\equiv 1$, $4^3 \\equiv 4$. Since $35$ is odd, the remainder is $4$."
                    )
                ]
            },
            {
                "heading": "Section 4: Consecutive Integers & Arithmetic Reasoning",
                "questions": [
                    make_q(
                        "If the average of five consecutive integers is $24$, what is the smallest integer?",
                        ["$22$", "$20$", "$21$", "$23$"], 0,
                        "For an odd count of consecutive integers, the average is the middle integer. Thus, the middle term is $24$, and the five integers are $22, 23, 24, 25, 26$. The smallest is $22$."
                    ),
                    make_q(
                        "The sum of three consecutive odd integers is $75$. What is the largest integer?",
                        ["$27$", "$25$", "$29$", "$31$"], 0,
                        "Let the integers be $n, n+2, n+4$. Then $3n + 6 = 75 \\Rightarrow 3n = 69 \\Rightarrow n = 23$. The largest integer is $23 + 4 = 27$."
                    ),
                    make_q(
                        "What is the greatest common divisor (GCD) of $48$ and $72$?",
                        ["$24$", "$12$", "$18$", "$36$"], 0,
                        "Prime factorizations: $48 = 2^4 \\times 3$ and $72 = 2^3 \\times 3^2$. The GCD takes the minimum powers: $2^3 \\times 3 = 8 \\times 3 = 24$."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "1.01", "lang": "ar", "slug": "arithmetic-number-sense",
        "title": "الحساب وفهم الأعداد",
        "sections": [
            {
                "heading": "القسم 1: العمليات الحسابية وترتيبها والأعداد العشرية",
                "questions": [
                    make_q(
                        "ما قيمة المقدار: $18 - 3 \\times (4 + 2) \\div 2$؟",
                        ["$9$", "$12$", "$15$", "$6$"], 0,
                        "ترتيب العمليات: الأقواس أولاً: $4 + 2 = 6$. ثم الضرب والقسمة من اليمين لليسار: $3 \\times 6 = 18$، ثم $18 \\div 2 = 9$. وأخيراً الطرح: $18 - 9 = 9$."
                    ),
                    make_q(
                        "ما قيمة المقدار: $\\frac{1}{0.2} + \\frac{1}{0.5} + \\frac{1}{0.25}$؟",
                        ["$11$", "$10$", "$9$", "$8$"], 0,
                        "تحويل الكسور العشرية: $\\frac{1}{0.2} = 5$، $\\frac{1}{0.5} = 2$، $\\frac{1}{0.25} = 4$. المجموع: $5 + 2 + 4 = 11$."
                    ),
                    make_q(
                        "ما ناتج جمع الكسور: $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6}$؟",
                        ["$1$", "$\\frac{5}{6}$", "$\\frac{7}{6}$", "$\\frac{4}{3}$"], 0,
                        "توحيد المقامات على $6$: $\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6} = \\frac{6}{6} = 1$."
                    )
                ]
            },
            {
                "heading": "القسم 2: الأسس والجذور وتبسيط المقادير",
                "questions": [
                    make_q(
                        "إذا كان $2^{x+3} = 64$، فما قيمة $x$؟",
                        ["$3$", "$4$", "$5$", "$6$"], 0,
                        "بما أن $64 = 2^6$، والأساسات متساوية، تتساوى الأسس: $x + 3 = 6 \\Rightarrow x = 3$."
                    ),
                    make_q(
                        "ما أبسط صورة للمقدار: $\\sqrt{48} + \\sqrt{27} - \\sqrt{12}$؟",
                        ["$5\\sqrt{3}$", "$4\\sqrt{3}$", "$3\\sqrt{3}$", "$6\\sqrt{3}$"], 0,
                        "تبسيط الجذور: $\\sqrt{48} = 4\\sqrt{3}$، $\\sqrt{27} = 3\\sqrt{3}$، $\\sqrt{12} = 2\\sqrt{3}$. إذن: $4\\sqrt{3} + 3\\sqrt{3} - 2\\sqrt{3} = 5\\sqrt{3}$."
                    ),
                    make_q(
                        "ما قيمة المقدار: $\\frac{2^{10} - 2^9}{2^8}$؟",
                        ["$2$", "$4$", "$1$", "$8$"], 0,
                        "بأخذ $2^9$ عاملاً مشتركاً من البسط: $\\frac{2^9(2 - 1)}{2^8} = \\frac{2^9(1)}{2^8} = 2^{9-8} = 2$."
                    )
                ]
            },
            {
                "heading": "القسم 3: قابلية القسمة والتحليل إلى عوامل وخانة الآحاد",
                "questions": [
                    make_q(
                        "ما خانة الآحاد للعدد $3^{42}$؟",
                        ["$9$", "$3$", "$7$", "$1$"], 0,
                        "دورة آحاد قوى العدد $3$ تتكرر كل $4$ مرات: $3, 9, 7, 1$. بقسمة الأس $42 \\div 4 = 10$ والباقي $2$. إذن آحاد العدد هي آحاد $3^2 = 9$."
                    ),
                    make_q(
                        "العدد المكون من خمس منازل $42a56$ يقبل القسمة على $9$. ما قيمة الرقم $a$؟",
                        ["$1$", "$2$", "$0$", "$8$"], 0,
                        "يقبل العدد القسمة على $9$ إذا كان مجموع أرقامه يقبل القسمة على $9$. المجموع $= 4 + 2 + a + 5 + 6 = 17 + a$. المضاعف التالي لـ $9$ هو $18$، إذن $a = 18 - 17 = 1$."
                    ),
                    make_q(
                        "ما باقي قسمة $4^{35}$ على $5$؟",
                        ["$4$", "$1$", "$2$", "$3$"], 0,
                        "بواقي قوى $4$ على $5$: $4^1 = 4 \\equiv 4$، $4^2 = 16 \\equiv 1$، $4^3 \\equiv 4$. بما أن الأس $35$ فردي، فإن الباقي هو $4$."
                    )
                ]
            },
            {
                "heading": "القسم 4: الأعداد المتتالية والتفكير الحسابي",
                "questions": [
                    make_q(
                        "إذا كان متوسط $5$ أعداد صحيحة متتالية هو $24$، فما هو أصغر هذه الأعداد؟",
                        ["$22$", "$20$", "$21$", "$23$"], 0,
                        "في الأعداد المتتالية الفردية العدد، المتوسط الحسابي هو العدد الأوسط تماماً. الأعداد هي $22, 23, 24, 25, 26$، وأصغرها هو $22$."
                    ),
                    make_q(
                        "مجموع ثلاثة أعداد فردية متتالية يساوي $75$. ما هو أكبر هذه الأعداد؟",
                        ["$27$", "$25$", "$29$", "$31$"], 0,
                        "نفرض الأعداد $n, n+2, n+4$. إذن $3n + 6 = 75 \\Rightarrow 3n = 69 \\Rightarrow n = 23$. والعدد الأكبر هو $23 + 4 = 27$."
                    ),
                    make_q(
                        "ما هو القاسم المشترك الأكبر (ق.م.أ) للعددين $48$ و $72$؟",
                        ["$24$", "$12$", "$18$", "$36$"], 0,
                        "تحليل العددين: $48 = 2^4 \\times 3$، و $72 = 2^3 \\times 3^2$. القاسم المشترك الأكبر بأخذ العوامل المشتركة بأصغر أس: $2^3 \\times 3 = 8 \\times 3 = 24$."
                    )
                ]
            }
        ]
    },

    # --------------------------------------------------------------------------
    # 2.01: Ratios, Proportions & Percentages (EN & AR)
    # --------------------------------------------------------------------------
    {
        "track": "qudrat", "num": "2.01", "slug": "ratios-proportion-percentages",
        "title": "Ratios, Proportions & Percentages",
        "sections": [
            {
                "heading": "Section 1: Direct & Inverse Proportions",
                "questions": [
                    make_q(
                        "If $6$ workers can paint a fence in $10$ hours, how many hours would it take $15$ workers working at the same rate?",
                        ["$4$ hours", "$5$ hours", "$6$ hours", "$8$ hours"], 0,
                        "This is an inverse proportion: $\\text{Workers} \\times \\text{Time} = \\text{Constant}$. Total worker-hours $= 6 \\times 10 = 60$. For $15$ workers: $\\text{Time} = \\frac{60}{15} = 4$ hours."
                    ),
                    make_q(
                        "A car travels $240\\text{ km}$ using $20$ liters of fuel. How many liters are required to travel $360\\text{ km}$ at the same rate?",
                        ["$30$ liters", "$28$ liters", "$32$ liters", "$35$ liters"], 0,
                        "Direct proportion: $\\frac{240}{20} = 12\\text{ km/L}$. For $360\\text{ km}$: $\\text{Fuel} = \\frac{360}{12} = 30$ liters."
                    ),
                    make_q(
                        "If $a : b = 2 : 3$ and $b : c = 4 : 5$, what is the ratio $a : c$?",
                        ["$8 : 15$", "$2 : 5$", "$6 : 15$", "$8 : 12$"], 0,
                        "Equate $b$ by multiplying: $a : b = 8 : 12$ and $b : c = 12 : 15$. Thus, $a : c = 8 : 15$."
                    )
                ]
            },
            {
                "heading": "Section 2: Percentages, Discounts & Markups",
                "questions": [
                    make_q(
                        "A jacket originally priced at $150$ SAR is discounted by $20\\%$. What is the sale price?",
                        ["$120$ SAR", "$110$ SAR", "$125$ SAR", "$130$ SAR"], 0,
                        "Discount $= 0.20 \\times 150 = 30$ SAR. Sale price $= 150 - 30 = 120$ SAR."
                    ),
                    make_q(
                        "The price of an item was increased by $20\\%$ and then decreased by $20\\%$. What is the net percentage change in price?",
                        ["$4\\%\\text{ decrease}$", "$0\\%$", "$2\\%\\text{ decrease}$", "$4\\%\\text{ increase}$"], 0,
                        "Net multiplier $= (1 + 0.20)(1 - 0.20) = 1.20 \\times 0.80 = 0.96$. A final factor of $0.96$ represents a $4\\%$ net decrease."
                    ),
                    make_q(
                        "If $25\\%$ of a number $x$ is $45$, what is $60\\%$ of $x$?",
                        ["$108$", "$90$", "$120$", "$135$"], 0,
                        "If $0.25x = 45$, then $x = \\frac{45}{0.25} = 180$. Then $60\\%$ of $180 = 0.60 \\times 180 = 108$."
                    )
                ]
            },
            {
                "heading": "Section 3: Speed, Distance & Average Velocity",
                "questions": [
                    make_q(
                        "A car travels from City A to City B at $60\\text{ km/h}$ and returns along the same route at $40\\text{ km/h}$. What is the average speed for the round trip?",
                        ["$48\\text{ km/h}$", "$50\\text{ km/h}$", "$45\\text{ km/h}$", "$52\\text{ km/h}$"], 0,
                        "Harmonic mean formula for equal distances: $v_{\\text{avg}} = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2(60)(40)}{60 + 40} = \\frac{4800}{100} = 48\\text{ km/h}$."
                    ),
                    make_q(
                        "Two trains leave the same station in opposite directions at speeds of $70\\text{ km/h}$ and $80\\text{ km/h}$. In how many hours will they be $450\\text{ km}$ apart?",
                        ["$3$ hours", "$2.5$ hours", "$3.5$ hours", "$4$ hours"], 0,
                        "Relative speed in opposite directions $= 70 + 80 = 150\\text{ km/h}$. Time $= \\frac{\\text{Distance}}{\\text{Relative Speed}} = \\frac{450}{150} = 3$ hours."
                    ),
                    make_q(
                        "A cyclist travels $15\\text{ km}$ in $45$ minutes. What is their speed in kilometers per hour?",
                        ["$20\\text{ km/h}$", "$18\\text{ km/h}$", "$25\\text{ km/h}$", "$15\\text{ km/h}$"], 0,
                        "$45$ minutes $= \\frac{45}{60} = \\frac{3}{4}$ hour. Speed $= \\frac{15}{3/4} = 15 \\times \\frac{4}{3} = 20\\text{ km/h}$."
                    )
                ]
            },
            {
                "heading": "Section 4: Work Rates & Shared Labor",
                "questions": [
                    make_q(
                        "Pipe A can fill a tank in $6$ hours, while Pipe B can fill it in $3$ hours. If both pipes are opened together, how long will it take to fill the tank?",
                        ["$2$ hours", "$2.5$ hours", "$1.5$ hours", "$3$ hours"], 0,
                        "Combined rate $= \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{6} + \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$ tank/hour. Time required $= 2$ hours."
                    ),
                    make_q(
                        "Ahmed can complete a job in $4$ days, and Khalid can complete it in $6$ days. If they work together, how many days will the job take?",
                        ["$2.4$ days", "$2.5$ days", "$3$ days", "$2$ days"], 0,
                        "Combined rate $= \\frac{1}{4} + \\frac{1}{6} = \\frac{3+2}{12} = \\frac{5}{12}$. Time $= \\frac{12}{5} = 2.4$ days."
                    ),
                    make_q(
                        "A tank has a leak that can empty it in $12$ hours. If an inlet pipe fills it in $4$ hours, how long will it take to fill the tank with the leak open?",
                        ["$6$ hours", "$5$ hours", "$8$ hours", "$4.5$ hours"], 0,
                        "Net rate $= \\frac{1}{4} - \\frac{1}{12} = \\frac{3 - 1}{12} = \\frac{2}{12} = \\frac{1}{6}$. Time required $= 6$ hours."
                    )
                ]
            }
        ]
    },
    {
        "track": "qudrat", "num": "2.01", "lang": "ar", "slug": "ratios-proportion-percentages",
        "title": "النسب والتناسب والمئويات",
        "sections": [
            {
                "heading": "القسم 1: التناسب الطردي والعكسي والنسب المركبة",
                "questions": [
                    make_q(
                        "إذا كان $6$ عمال يدهنون سياجاً في $10$ ساعات، فكم ساعة يحتاج $15$ عاملاً لدهان نفس السياج بنفس الكفاءة؟",
                        ["$4$ ساعات", "$5$ ساعات", "$6$ ساعات", "$8$ ساعات"], 0,
                        "تناسب عكسي: $\\text{عدد العمال} \\times \\text{الزمن} = \\text{ثابت}$. إجمالي ساعات العمل $= 6 \\times 10 = 60$. للـ $15$ عاملاً: $\\text{الزمن} = \\frac{60}{15} = 4$ ساعات."
                    ),
                    make_q(
                        "تسير سيارة مسافة $240\\text{ كم}$ مستهلكة $20$ لتراً من الوقود. كم لتراً تستهلك لقطع مسافة $360\\text{ كم}$ بنفس المعدل؟",
                        ["$30$ لتراً", "$28$ لتراً", "$32$ لتراً", "$35$ لتراً"], 0,
                        "تناسب طردي: معدل الاستهلاك $= \\frac{240}{20} = 12\\text{ كم/لتر}$. لقطع $360\\text{ كم}$: $\\text{الوقود} = \\frac{360}{12} = 30$ لتراً."
                    ),
                    make_q(
                        "إذا كانت النسبة بين $a : b = 2 : 3$، وكانت $b : c = 4 : 5$، فما النسبة $a : c$؟",
                        ["$8 : 15$", "$2 : 5$", "$6 : 15$", "$8 : 12$"], 0,
                        "بتوحيد $b$: ضرب النسبة الأولى في $4$ والثانية في $3$: $a : b = 8 : 12$، و $b : c = 12 : 15$. إذن $a : c = 8 : 15$."
                    )
                ]
            },
            {
                "heading": "القسم 2: النسب المئوية والخصم والزيادة المتتالية",
                "questions": [
                    make_q(
                        "معطف سعره الأصلي $150$ ريالاً، تم عمل خصم عليه قدره $20\\%$. ما سعره بعد الخصم؟",
                        ["$120$ ريالاً", "$110$ ريالات", "$125$ ريالاً", "$130$ ريالاً"], 0,
                        "قيمة الخصم $= 0.20 \\times 150 = 30$ ريالاً. السعر بعد الخصم $= 150 - 30 = 120$ ريالاً."
                    ),
                    make_q(
                        "زاد سعر سلعة بنسبة $20\\%$ ثم انخفض السعر الجديد بنسبة $20\\%$. ما هي النسبة المئوية للتغير النهائي في السعر؟",
                        ["نقصان $4\\%$", "$0\\%$ (لا تغيير)", "نقصان $2\\%$", "زيادة $4\\%$"], 0,
                        "معامل التغير النهائي $= (1 + 0.20)(1 - 0.20) = 1.20 \\times 0.80 = 0.96$. الناتج $0.96$ يعني نقصاناً صافياً بنسبة $4\\%$."
                    ),
                    make_q(
                        "إذا كان $25\\%$ من عدد يساوي $45$، فما قيمة $60\\%$ من نفس العدد؟",
                        ["$108$", "$90$", "$120$", "$135$"], 0,
                        "إذا كان $0.25x = 45$ فإن $x = \\frac{45}{0.25} = 180$. إذن $60\\%$ من $180 = 0.60 \\times 180 = 108$."
                    )
                ]
            },
            {
                "heading": "القسم 3: مسائل السرعة والمسافة والزمن والسرعة المتوسطة",
                "questions": [
                    make_q(
                        "ذهبت سيارة من المدينة أ إلى المدينة ب بسرعة $60\\text{ كم/س}$ وعادت على نفس الطريق بسرعة $40\\text{ كم/س}$. ما هي السرعة المتوسطة للرحلة كاملة؟",
                        ["$48\\text{ كم/س}$", "$50\\text{ كم/س}$", "$45\\text{ كم/س}$", "$52\\text{ كم/س}$"], 0,
                        "قانون السرعة المتوسطة لمسافتين متساويتين: $v = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2(60)(40)}{60 + 40} = \\frac{4800}{100} = 48\\text{ كم/س}$."
                    ),
                    make_q(
                        "انطلق قطاران من نفس المحطة في اتجاهين متعاكسين بسرعتي $70\\text{ كم/س}$ و $80\\text{ كم/س}$. بعد كم ساعة تصبح المسافة بينهما $450\\text{ كم}$؟",
                        ["$3$ ساعات", "$2.5$ ساعة", "$3.5$ ساعة", "$4$ ساعات"], 0,
                        "السرعة النسبية في الاتجاهين المتعاكسين $= 70 + 80 = 150\\text{ كم/س}$. الزمن $= \\frac{\\text{المسافة}}{\\text{السرعة النسبية}} = \\frac{450}{150} = 3$ ساعات."
                    ),
                    make_q(
                        "قطع دراج مسافة $15\\text{ كم}$ خلال $45$ دقيقة. ما هي سرعته بوحدة كم/ساعة؟",
                        ["$20\\text{ كم/س}$", "$18\\text{ كم/س}$", "$25\\text{ كم/س}$", "$15\\text{ كم/س}$"], 0,
                        "$45$ دقيقة $= \\frac{3}{4}$ ساعة. السرعة $= \\frac{15}{3/4} = 15 \\times \\frac{4}{3} = 20\\text{ كم/س}$."
                    )
                ]
            },
            {
                "heading": "القسم 4: مسائل العمل المشترك والصنابير",
                "questions": [
                    make_q(
                        "صنبور يملأ خزاناً في $6$ ساعات، وآخر يملأه في $3$ ساعات. إذا فُتح الصنبوران معاً، ففي كم ساعة يمتلئ الخزان؟",
                        ["$2$ ساعة", "$2.5$ ساعة", "$1.5$ ساعة", "$3$ ساعات"], 0,
                        "معدل العمل المشترك $= \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{6} + \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$. إذن يمتلئ الخزان في $2$ ساعة."
                    ),
                    make_q(
                        "يستطيع أحمد إنجاز عمل في $4$ أيام، وخالد في $6$ أيام. إذا عملا معاً، فكم يوماً يستغرق إنجاز العمل؟",
                        ["$2.4$ يوم", "$2.5$ يوم", "$3$ أيام", "$2$ يوم"], 0,
                        "معدل العمل المشترك $= \\frac{1}{4} + \\frac{1}{6} = \\frac{3+2}{12} = \\frac{5}{12}$. الزمن المطلوب $= \\frac{12}{5} = 2.4$ يوم."
                    ),
                    make_q(
                        "خزان به ثقب يفرغه في $12$ ساعة، وصنبور يملأه في $4$ ساعات. إذا فُتح الصنبور مع وجود الثقب، فكم ساعة يستغرق ملء الخزان؟",
                        ["$6$ ساعات", "$5$ ساعات", "$8$ ساعات", "$4.5$ ساعة"], 0,
                        "المعدل الصافي $= \\frac{1}{4} - \\frac{1}{12} = \\frac{3 - 1}{12} = \\frac{2}{12} = \\frac{1}{6}$. إذن يستغرق الملء $6$ ساعات."
                    )
                ]
            }
        ]
    }
]

# We will populate the remaining topics in a modular fashion to maintain clean code and structure!
def get_all_qudrat_topics():
    from qudrat_topics_data import MORE_QUDRAT_TOPICS
    return QUDRAT_TOPICS + MORE_QUDRAT_TOPICS

def main():
    topics = get_all_qudrat_topics()
    print(f"Loaded {len(topics)} Qudrat topics (AR + EN).")

    os.makedirs(TOPICS_DIR, exist_ok=True)
    os.makedirs(os.path.join(DOWNLOADS_DIR, "qudrat"), exist_ok=True)
    worksheet_data_dir = os.path.join(SITE_ROOT, "public", "worksheet-data", "qudrat")
    os.makedirs(worksheet_data_dir, exist_ok=True)

    manifest_entries = []

    for t in topics:
        is_ar = t.get("lang") == "ar"
        filename = f"{t['num']}-{t['slug']}{'-ar' if is_ar else ''}.json"
        target_path = os.path.join(TOPICS_DIR, filename)

        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(t, f, ensure_ascii=False, indent=2)
        print(f"Wrote topic: {target_path}")

        # Also sync to public/worksheet-data/qudrat/
        public_json_path = os.path.join(worksheet_data_dir, filename)
        with open(public_json_path, "w", encoding="utf-8") as f:
            json.dump(t, f, ensure_ascii=False, indent=2)

        # Run generate.py
        cmd = [
            os.path.join(SITE_ROOT, ".venv", "bin", "python3"),
            GENERATE_PY,
            target_path,
            "--out",
            DOWNLOADS_DIR
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error compiling {filename}:")
            print(res.stderr)
            sys.exit(1)
        print(f"Compiled {filename} -> PDF pair in downloads/qudrat/")

        manifest_entries.append({
            "num": t["num"],
            "slug": t["slug"],
            "title": t["title"],
            "lang": t.get("lang", "en"),
            "worksheet": f"{t['num']}-{t['slug']}{'-ar' if is_ar else ''}-worksheet.pdf",
            "answerkey": f"{t['num']}-{t['slug']}{'-ar' if is_ar else ''}-answerkey.pdf"
        })

    # Update manifest
    manifest_path = os.path.join(DOWNLOADS_DIR, "qudrat", "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_entries, f, ensure_ascii=False, indent=2)
    print(f"Updated manifest: {manifest_path}")

    # Verify strictly 4 pages for all PDFs
    print("\n--- Verifying Page Counts ---")
    import re
    all_passed = True
    for entry in manifest_entries:
        for key in ["worksheet", "answerkey"]:
            pdf_path = os.path.join(DOWNLOADS_DIR, "qudrat", entry[key])
            with open(pdf_path, "rb") as fp:
                c = fp.read()
            pages = len(re.findall(rb'/Type\s*/Page\b', c))
            status = "OK (4 pages)" if pages == 4 else f"WARNING ({pages} pages)"
            if pages != 4:
                all_passed = False
            print(f"  {entry[key]}: {pages} pages -> {status}")

    if all_passed:
        print("\nALL 32 QUDRAT PDFs ARE STRICTLY 4 PAGES! SUCCESS!")
    else:
        print("\nSOME PDFs DO NOT HAVE 4 PAGES! REVIEW SPACING!")

if __name__ == "__main__":
    main()
