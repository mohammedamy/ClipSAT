"""
scripts/tahsili_generators/gen_stats.py
Tahsili Statistics & Probability generator:
- Measures of central tendency (Mean, Median, Mode) and dispersion (Range, Variance, Standard Deviation)
- Best measure of central tendency based on presence of outliers or data type
- Fundamental counting principle, Permutations (linear, circular, with repetition), Combinations
- Basic, geometric, compound (mutually exclusive / independent), and conditional probability
- Discrete probability distributions, Expected value E(X)
- Binomial distribution: formulas for P(X=k), mean mu = np, variance sigma^2 = npq
- Normal distribution: Empirical rule (68-95-99.7%), z-scores, skewness (positive, negative, symmetric)
"""

import sys
import os
sys.path.insert(0, os.path.abspath("."))
from scripts.tahsili_generators.common import make_q

def get_questions():
    d = "Statistics & Probability"
    qs = []

    # ================= EASY (35 items) =================
    easy_data = [
        # 1. Mean of 5 numbers
        (r"ما المتوسط الحسابي للبيانات التالية: \( 4, 8, 12, 16, 20 \)؟<br><em>Find the arithmetic mean of the dataset.</em>",
         ["12", "10", "14", "16"], 0,
         r"المتوسط الحسابي = مجموع القيم مقسومًا على عددها: \( \dfrac{4 + 8 + 12 + 16 + 20}{5} = \dfrac{60}{5} = 12 \)."),

        # 2. Median of odd count
        (r"ما وسيط البيانات التالية: \( 3, 7, 9, 12, 15 \)؟<br><em>Find the median of the dataset.</em>",
         ["9", "7", "12", "9.2"], 0,
         r"البيانات مرتبة تصاعديًا وعددها فردي (5 قيم)، فالوسيط هو القيمة الوسطى وهي 9."),

        # 3. Median of even count
        (r"ما وسيط القيم التالية: \( 2, 5, 8, 10, 14, 18 \)؟<br><em>Find the median of an even number of values.</em>",
         ["9", "8", "10", "8.5"], 0,
         r"القيم مرتبة وعددها زوجي (6 قيم)، الوسيط هو متوسط القيمتين الوسطيين (8 و 10): \( \dfrac{8 + 10}{2} = 9 \)."),

        # 4. Mode of dataset
        (r"ما المنوال لمجموعة القيم: \( 5, 8, 3, 8, 2, 8, 5 \)؟<br><em>Find the mode of the values.</em>",
         ["8", "5", "3", "لا يوجد منوال"], 0,
         r"المنوال هو القيمة الأكثر تكرارًا، والقيمة 8 تكررت 3 مرات، فالمنوال هو 8."),

        # 5. Range of dataset
        (r"ما المدى للبيانات التالية: \( 15, 3, 28, 9, 42, 11 \)؟<br><em>Find the range of the dataset.</em>",
         ["39", "42", "37", "45"], 0,
         r"المدى = أكبر قيمة - أصغر قيمة = \( 42 - 3 = 39 \)."),

        # 6. Best measure with outlier
        (r"أي مقاييس النزعة المركزية التالية هو الأفضل لوصف بيانات تحتوي على قيم متطرفة؟<br><em>Best measure of central tendency with outliers?</em>",
         ["الوسيط", "المتوسط الحسابي", "المنوال", "الانحراف المعياري"], 0,
         r"الوسيط لا يتأثر بالقيم المتطرفة، لذا فهو المقياس الأنسب عندما تحتوي البيانات على قيم متطرفة."),

        # 7. Best measure for categorical data
        (r"أي مقاييس النزعة المركزية هو الأنسب للبيانات الوصفية (غير العددية مثل لون العيون المفضل)؟<br><em>Best measure for qualitative/categorical data?</em>",
         ["المنوال", "المتوسط الحسابي", "الوسيط", "المدى"], 0,
         r"المنوال هو المقياس الوحيد الذي يمكن حسابه للبيانات الوصفية لأنه يعتمد على التكرار."),

        # 8. Standard deviation from variance
        (r"إذا كان التباين لمجموعة من البيانات يساوي 49، فما قيمة الانحراف المعياري؟<br><em>Standard deviation if variance is 49?</em>",
         ["7", "24.5", "14", "49"], 0,
         r"الانحراف المعياري هو الجذر التربيعي الموجب للتباين: \( \sigma = \sqrt{49} = 7 \)."),

        # 9. Probability of rolling a 4 on a fair die
        (r"عند إلقاء مكعب أرقام منتظم مرة واحدة، ما احتمال ظهور العدد 4؟<br><em>Probability of rolling a 4 on a standard die?</em>",
         [r"\( \dfrac{1}{6} \)", r"\( \dfrac{4}{6} \)", r"\( \dfrac{1}{4} \)", r"\( \dfrac{1}{2} \)"], 0,
         r"فضاء العينة يحتوي على 6 نواتج متساوية الإمكانية \( \{1, 2, 3, 4, 5, 6\} \)، وظهور العدد 4 يمثل ناتجًا واحدًا، فالاحتمال هو \( \dfrac{1}{6} \)."),

        # 10. Probability of rolling an even number
        (r"عند إلقاء مكعب أرقام منتظم، ما احتمال ظهور عدد زوجي؟<br><em>Probability of rolling an even number?</em>",
         [r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{6} \)", r"\( \dfrac{2}{3} \)"], 0,
         r"الأعداد الزوجية هي \( \{2, 4, 6\} \) وعددها 3. الاحتمال: \( \dfrac{3}{6} = \dfrac{1}{2} \)."),

        # 11. Complementary probability
        (r"إذا كان احتمال هطول المطر غدًا هو \( 0.35 \)، فما احتمال عدم هطوله؟<br><em>Probability of rain not falling if P(rain) = 0.35?</em>",
         ["0.65", "0.75", "0.35", "0.50"], 0,
         r"احتمال الحادثة المتممة: \( P(A') = 1 - P(A) = 1 - 0.35 = 0.65 \)."),

        # 12. Fundamental counting principle 3 shirts and 4 pants
        (r"لدى أحمد 3 قمصان و 4 بناطيل. كم مظهرًا مختلفًا يمكنه تكوينه؟<br><em>Number of outfit combinations from 3 shirts and 4 pants?</em>",
         ["12", "7", "24", "10"], 0,
         r"وفق المبدأ الأساسي للعد: حاصل ضرب عدد الاختيارات = \( 3 \times 4 = 12 \)."),

        # 13. Tossing two coins
        (r"عند إلقاء قطعتي نقد متمايزتين مرة واحدة، ما عدد النواتج الممكنة في فضاء العينة؟<br><em>Total outcomes when tossing 2 coins?</em>",
         ["4", "2", "6", "8"], 0,
         r"كل قطعة لها ناتجان (شعار، كتابة)، لذا عدد النواتج الكلي: \( 2 \times 2 = 4 \)."),

        # 14. Value of 4!
        (r"ما قيمة مضروب العدد 4 (\( 4! \))؟<br><em>What is the value of 4! ?</em>",
         ["24", "16", "12", "20"], 0,
         r"\( 4! = 4 \times 3 \times 2 \times 1 = 24 \)."),

        # 15. Value of 0!
        (r"ما قيمة \( 0! \) اصطلاحًا؟<br><em>What is 0! by definition?</em>",
         ["1", "0", "غير معرف", "-1"], 0,
         r"اصطلاحًا ورياضيًا، \( 0! = 1 \)."),

        # 16. Value of 5P1
        (r"ما قيمة التباديل \( _5P_1 \)؟<br><em>Value of 5P1?</em>",
         ["5", "1", "10", "4"], 0,
         r"\( _n P_1 = n \)، إذن \( _5 P_1 = 5 \)."),

        # 17. Value of 5C1
        (r"ما قيمة التوافيق \( _5C_1 \)؟<br><em>Value of 5C1?</em>",
         ["5", "1", "10", "2.5"], 0,
         r"\( _n C_1 = n \)، إذن \( _5 C_1 = 5 \)."),

        # 18. Value of nCn
        (r"ما قيمة \( _n C_n \) لأي عدد صحيح موجب \( n \)؟<br><em>Value of nCn for positive integer n?</em>",
         ["1", "n", "0", "n!"], 0,
         r"عدد طرق اختيار جميع العناصر دون ترتيب هي طريقة واحدة فقط: \( _n C_n = 1 \)."),

        # 19. Bag with 3 red and 5 blue marbles
        (r"كيس به 3 كرات حمراء و 5 كرات زرقاء. إذا سُحبت كرة واحدة عشوائيًا، فما احتمال أن تكون حمراء؟<br><em>Probability of drawing a red marble?</em>",
         [r"\( \dfrac{3}{8} \)", r"\( \dfrac{5}{8} \)", r"\( \dfrac{3}{5} \)", r"\( \dfrac{1}{8} \)"], 0,
         r"العدد الكلي للكرات = \( 3 + 5 = 8 \). عدد الكرات الحمراء = 3. الاحتمال: \( \dfrac{3}{8} \)."),

        # 20. Impossible event probability
        (r"احتمال الحادثة المستحيلة يساوي:<br><em>Probability of an impossible event equals:</em>",
         ["0", "1", "-1", "0.5"], 0,
         r"احتمال الحادثة المستحيلة يساوي دائمًا 0."),

        # 21. Certain event probability
        (r"احتمال الحادثة المؤكدة يساوي:<br><em>Probability of a certain event equals:</em>",
         ["1", "0", "100", "0.5"], 0,
         r"احتمال الحادثة المؤكدة يساوي دائمًا 1."),

        # 22. Sum of probabilities in a distribution
        (r"مجموع احتمالات جميع النواتج في التوزيع الاحتمالي المنفصل يساوي دائمًا:<br><em>Sum of probabilities in a discrete probability distribution?</em>",
         ["1", "0", "100", "0.5"], 0,
         r"من شروط التوزيع الاحتمالي: \( \sum P(X) = 1 \)."),

        # 23. Mutually exclusive definition
        (r"إذا كانت الحادثتان \( A \) و \( B \) متنافيتين، فإن \( P(A \cap B) \) يساوي:<br><em>If A and B are mutually exclusive, P(A and B) = ?</em>",
         ["0", "1", r"\( P(A) \cdot P(B) \)", r"\( P(A) + P(B) \)"], 0,
         r"الحادثتان المتنافيتان لا يمكن وقوعهما معًا في نفس الوقت، لذا احتمال تقاطعهما يساوي 0."),

        # 24. Independent events product rule
        (r"إذا كانت الحادثتان \( A \) و \( B \) مستقلتين، فإن \( P(A \cap B) \) يساوي:<br><em>If A and B are independent, P(A and B) = ?</em>",
         [r"\( P(A) \cdot P(B) \)", r"\( P(A) + P(B) \)", "0", r"\( \dfrac{P(A)}{P(B)} \)"], 0,
         r"حسب قانون ضرب الاحتمالات للحوادث المستقلة: \( P(A \cap B) = P(A) \cdot P(B) \)."),

        # 25. Empirical rule 68%
        (r"في التوزيع الطبيعي، ما النسبة المئوية التقريبية للبيانات التي تقع ضمن انحراف معياري واحد من المتوسط (\( \mu \pm \sigma \))؟<br><em>Percentage of data within 1 standard deviation of mean?</em>",
         ["68%", "95%", "99.7%", "50%"], 0,
         r"حسب القاعدة التجريبية للتوزيع الطبيعي: يقع حوالي 68% من البيانات ضمن \( \mu \pm \sigma \)."),

        # 26. Empirical rule 95%
        (r"في التوزيع الطبيعي، ما النسبة المئوية التقريبية للبيانات الواقعة ضمن انحرافين معياريين من المتوسط (\( \mu \pm 2\sigma \))؟<br><em>Percentage within 2 standard deviations?</em>",
         ["95%", "68%", "99.7%", "90%"], 0,
         r"حسب القاعدة التجريبية: يقع حوالي 95% من البيانات ضمن \( \mu \pm 2\sigma \)."),

        # 27. Empirical rule 99.7%
        (r"في التوزيع الطبيعي، ما النسبة المئوية للبيانات الواقعة ضمن ثلاثة انحرافات معيارية من المتوسط (\( \mu \pm 3\sigma \))؟<br><em>Percentage within 3 standard deviations?</em>",
         ["99.7%", "95%", "68%", "100%"], 0,
         r"حسب القاعدة التجريبية: يقع حوالي 99.7% من البيانات ضمن \( \mu \pm 3\sigma \)."),

        # 28. Standard normal distribution mean and variance
        (r"التوزيع الطبيعي المعياري له متوسط حسابي \( \mu \) وانحراف معياري \( \sigma \) يساويان على الترتيب:<br><em>Mean and std dev of standard normal distribution?</em>",
         [r"\( \mu = 0, \sigma = 1 \)", r"\( \mu = 1, \sigma = 0 \)", r"\( \mu = 0, \sigma = 0 \)", r"\( \mu = 1, \sigma = 1 \)"], 0,
         r"التوزيع الطبيعي المعياري يعرّف دائمًا بمتوسط \( \mu = 0 \) وانحراف معياري \( \sigma = 1 \)."),

        # 29. Positive skewness
        (r"التوزيع التكراري الذي يمتد ذيله جهة اليمين يسمى توزيعًا:<br><em>Distribution with tail stretching to the right is:</em>",
         ["ملتويًا لليمين (إيجابي الالتواء)", "ملتويًا لليسار (سلبي الالتواء)", "متماثلاً", "منتظمًا"], 0,
         r"عندما يمتد الذيل إلى اليمين وتكون معظم البيانات متركزة في اليسار، يسمى التوزيع ملتويًا إلى اليمين."),

        # 30. Symmetric distribution relationship
        (r"في التوزيع المتماثل تمامًا (مثل التوزيع الطبيعي)، تكون العلاقة بين مقاييس النزعة المركزية هي:<br><em>Relationship between mean, median, mode in symmetric distribution?</em>",
         ["المتوسط = الوسيط = المنوال", "المتوسط > الوسيط > المنوال", "المتوسط < الوسيط < المنوال", "الوسيط > المتوسط = المنوال"], 0,
         r"في التوزيع المتماثل تتطابق مقاييس النزعة المركزية الثلاثة في المنتصف: المتوسط = الوسيط = المنوال."),

        # 31. Geometric probability segment length
        (r"اختيرت نقطة \( X \) عشوائيًا على قطعة مستقيمة \( \overline{AD} \) طولها 12 cm. إذا كانت \( \overline{BC} \) قطعة مستقيمة عليها طولها 3 cm، فما احتمال وقوع \( X \) على \( \overline{BC} \)؟<br><em>Geometric probability on a line segment?</em>",
         [r"\( \dfrac{1}{4} \)", r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{6} \)"], 0,
         r"الاحتمال الهندسي = طول القطعة المرغوبة ÷ طول القطعة الكلية = \( \dfrac{3}{12} = \dfrac{1}{4} \)."),

        # 32. Spinner angle probability
        (r"مؤشر قرص دوار، فما احتمال استقراره على قطاع زاويته المركزية \( 90^\circ \)؟<br><em>Probability of landing on a 90-degree sector?</em>",
         [r"\( \dfrac{1}{4} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{6} \)"], 0,
         r"الاحتمال = زاوية القطاع ÷ زاوية الدائرة الكاملة = \( \dfrac{90^\circ}{360^\circ} = \dfrac{1}{4} \)."),

        # 33. Mean of binomial distribution
        (r"المتوسط الحسابي \( \mu \) لتوزيع ذي حدين عدد محاولاته \( n \) واحتمال النجاح في المحاولة الواحدة \( p \) يعطى بالصيغة:<br><em>Mean of binomial distribution?</em>",
         [r"\( \mu = np \)", r"\( \mu = npq \)", r"\( \mu = \sqrt{npq} \)", r"\( \mu = \dfrac{p}{n} \)"], 0,
         r"المتوسط الحسابي في تجربة ذات الحدين يساوي حاصل ضرب عدد المحاولات في احتمال النجاح: \( \mu = np \)."),

        # 34. Variance of binomial distribution
        (r"التباين \( \sigma^2 \) لتوزيع ذي حدين حيث \( q = 1 - p \) يعطى بالصيغة:<br><em>Variance of binomial distribution?</em>",
         [r"\( \sigma^2 = npq \)", r"\( \sigma^2 = np \)", r"\( \sigma^2 = \sqrt{npq} \)", r"\( \sigma^2 = n^2 p \)"], 0,
         r"تباين توزيع ذات الحدين هو: \( \sigma^2 = npq \)."),

        # 35. Sample space for coin and die
        (r"ما عدد النواتج الممكنة لتجربة إلقاء قطعة نقد ومكعب أرقام معًا؟<br><em>Number of outcomes when tossing a coin and rolling a die?</em>",
         ["12", "8", "36", "7"], 0,
         r"قطعة النقد لها ناتجان ومكعب الأرقام له 6 نواتج. حسب المبدأ الأساسي للعد: \( 2 \times 6 = 12 \).")
    ]

    for item in easy_data:
        qs.append(make_q(d, "easy", item[0], item[1], item[2], item[3]))

    # ================= MEDIUM (40 items) =================
    med_data = [
        # 1. 5P2 calculation
        (r"ما قيمة التباديل \( _5P_2 \)؟<br><em>Evaluate 5P2.</em>",
         ["20", "10", "25", "60"], 0,
         r"\( _5 P_2 = 5 \times 4 = 20 \)."),

        # 2. 6C2 calculation
        (r"ما قيمة التوافيق \( _6C_2 \)؟<br><em>Evaluate 6C2.</em>",
         ["15", "30", "12", "20"], 0,
         r"\( _6 C_2 = \dfrac{6 \times 5}{2 \times 1} = \dfrac{30}{2} = 15 \)."),

        # 3. Permutation circular without fixed point (5 people at round table)
        (r"بكم طريقة يمكن لـ 5 أشخاص الجلوس حول طاولة دائرية دون نقطة مرجع محددة؟<br><em>Ways for 5 people to sit around a circular table?</em>",
         ["24", "120", "60", "20"], 0,
         r"التباديل الدائرية دون نقطة مرجع ثابتة: \( (n-1)! = (5-1)! = 4! = 24 \)."),

        # 4. Circular permutation with fixed reference point
        (r"جلس 4 أشخاص حول طاولة دائرية، بحيث يجلس أحدهم بجوار النافذة تمامًا. ما عدد الطرق الممكنة لجلوسهم؟<br><em>Ways to sit around round table with a fixed seat near window?</em>",
         ["24", "6", "12", "120"], 0,
         r"بما أن هناك نقطة مرجع ثابتة (بجوار النافذة)، فإن التباديل تعامل كتباديل خطية عادية: \( n! = 4! = 24 \)."),

        # 5. Permutation with repetition: letters of 'DAMMAM' (د م ا م)
        (r"كم عدد التباديل المختلفة لأحرف كلمة تتكون من 5 أحرف منها حرف مكرر 3 مرات؟<br><em>Permutations of 5 letters with one letter repeated 3 times?</em>",
         ["20", "120", "60", "10"], 0,
         r"قانون التباديل مع التكرار: \( \dfrac{n!}{k!} = \dfrac{5!}{3!} = \dfrac{120}{6} = 20 \)."),

        # 6. Choosing president and vice president (order matters -> P)
        (r"يراد اختيار رئيس ونائب رئيس من بين لجنة مكونة من 8 أعضاء. كم طريقة يمكن بها هذا الاختيار؟<br><em>Ways to select president and vice president from 8 members?</em>",
         ["56", "28", "64", "16"], 0,
         r"الترتيب مهم لأن المناصب محددة (رئيس، نائب)، فنستخدم التباديل: \( _8 P_2 = 8 \times 7 = 56 \)."),

        # 7. Choosing 3 members for a delegation (order does not matter -> C)
        (r"بكم طريقة يمكن اختيار وفد مكون من 3 طلاب من بين 10 طلاب؟<br><em>Ways to choose a committee of 3 from 10 students?</em>",
         ["120", "720", "30", "60"], 0,
         r"الترتيب غير مهم لأنهم أعضاء وفد متساوون، فنستخدم التوافيق: \( _{10} C_3 = \dfrac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120 \)."),

        # 8. Mutually exclusive probability: rolling die getting 2 or 5
        (r"عند رمي مكعب أرقام منتظم، ما احتمال ظهور العدد 2 أو العدد 5؟<br><em>Probability of rolling a 2 or 5?</em>",
         [r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{6} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{2}{5} \)"], 0,
         r"الحادثتان متنافيتان: \( P(2 \cup 5) = P(2) + P(5) = \dfrac{1}{6} + \dfrac{1}{6} = \dfrac{2}{6} = \dfrac{1}{3} \)."),

        # 9. Non-mutually exclusive probability: rolling die getting even or > 4
        (r"عند رمي مكعب أرقام منتظم، ما احتمال الحصول على عدد زوجي أو عدد أكبر من 4؟<br><em>Probability of rolling even or > 4?</em>",
         [r"\( \dfrac{2}{3} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{5}{6} \)", r"\( \dfrac{1}{3} \)"], 0,
         r"الأعداد الزوجية \( A = \{2, 4, 6\} \) (3 عناصر)، الأعداد أكبر من 4 هي \( B = \{5, 6\} \) (عنصران)، التقاطع \( A \cap B = \{6\} \) (عنصر واحد). إذن: \( P(A \cup B) = \dfrac{3}{6} + \dfrac{2}{6} - \dfrac{1}{6} = \dfrac{4}{6} = \dfrac{2}{3} \)."),

        # 10. Independent events: two dice showing double 6
        (r"عند إلقاء مكعبي أرقام متمايزين، ما احتمال ظهور العدد 6 على كليهما؟<br><em>Probability of rolling double 6 on two dice?</em>",
         [r"\( \dfrac{1}{36} \)", r"\( \dfrac{1}{6} \)", r"\( \dfrac{1}{12} \)", r"\( \dfrac{1}{18} \)"], 0,
         r"الحادثتان مستقلتان: \( P(6 \text{ and } 6) = \dfrac{1}{6} \times \dfrac{1}{6} = \dfrac{1}{36} \)."),

        # 11. Dependent events: drawing 2 red marbles without replacement
        (r"صندوق به 4 كرات حمراء و 6 كرات خضراء. سُحبت كرتان على التوالي دون إرجاع، ما احتمال أن تكون الكرتان حمراوين؟<br><em>Probability of drawing 2 red marbles without replacement?</em>",
         [r"\( \dfrac{2}{15} \)", r"\( \dfrac{4}{25} \)", r"\( \dfrac{1}{5} \)", r"\( \dfrac{2}{9} \)"], 0,
         r"الاحتمال الأول: \( \dfrac{4}{10} \). الاحتمال الثاني (بقي 3 حمراء من أصل 9): \( \dfrac{3}{9} \). الاحتمال المشترك: \( \dfrac{4}{10} \times \dfrac{3}{9} = \dfrac{2}{5} \times \dfrac{1}{3} = \dfrac{2}{15} \)."),

        # 12. Conditional probability P(B|A)
        (r"إذا كان \( P(A) = 0.5 \) و \( P(A \cap B) = 0.2 \)، فما قيمة الاحتمال المشروط \( P(B|A) \)؟<br><em>Find conditional probability P(B|A).</em>",
         ["0.4", "0.25", "0.7", "0.1"], 0,
         r"قانون الاحتمال المشروط: \( P(B|A) = \dfrac{P(A \cap B)}{P(A)} = \dfrac{0.2}{0.5} = 0.4 \)."),

        # 13. Conditional probability from die roll: P(even | > 3)
        (r"رمي مكعب أرقام وظهر عدد أكبر من 3. ما احتمال أن يكون هذا العدد زوجيًا؟<br><em>Probability that a rolled number is even given it is > 3?</em>",
         [r"\( \dfrac{2}{3} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{3} \)", r"\( \dfrac{3}{4} \)"], 0,
         r"الأعداد الأكبر من 3 هي \( \{4, 5, 6\} \) (3 نواتج). الأعداد الزوجية بينها هي \( \{4, 6\} \) (ناتجان). الاحتمال المشروط: \( \dfrac{2}{3} \)."),

        # 14. Missing probability in distribution
        (r"في جدول التوزيع الاحتمالي التالي للمتغير العشوائي \( X \): إذا كانت احتمالات القيم 1, 2, 3 هي على الترتيب \( 0.2, 0.5, k \)، فما قيمة \( k \)؟<br><em>Find missing probability k in discrete distribution.</em>",
         ["0.3", "0.2", "0.7", "0.5"], 0,
         r"مجموع الاحتمالات يجب أن يساوي 1: \( 0.2 + 0.5 + k = 1 \implies 0.7 + k = 1 \implies k = 0.3 \)."),

        # 15. Expected value calculation
        (r"يبين الجدول التوزيع الاحتمالي للمتغير \( X \): القيم هي \( 1, 2 \) واحتمالاتها هي \( 0.4, 0.6 \) على التوالي. ما القيمة المتوقعة \( E(X) \)؟<br><em>Find expected value E(X).</em>",
         ["1.6", "1.5", "1.4", "2.0"], 0,
         r"\( E(X) = \sum x \cdot P(x) = (1)(0.4) + (2)(0.6) = 0.4 + 1.2 = 1.6 \)."),

        # 16. Binomial mean with n=50, p=0.4
        (r"في تجربة ذات حدين أُجريت 50 محاولة وكان احتمال النجاح في المحاولة الواحدة \( p = 0.4 \)، ما المتوسط الحسابي \( \mu \)؟<br><em>Find mean of binomial distribution with n=50, p=0.4.</em>",
         ["20", "25", "12", "30"], 0,
         r"\( \mu = np = 50 \times 0.4 = 20 \)."),

        # 17. Binomial variance with n=100, p=0.2
        (r"في تجربة ذات حدين تتكون من 100 محاولة، واحتمال النجاح \( p = 0.2 \)، ما التباين \( \sigma^2 \)؟<br><em>Find variance of binomial with n=100, p=0.2.</em>",
         ["16", "20", "4", "80"], 0,
         r"احتمال الفشل \( q = 1 - 0.2 = 0.8 \). التباين: \( \sigma^2 = npq = 100 \times 0.2 \times 0.8 = 16 \)."),

        # 18. Binomial standard deviation with n=64, p=0.5
        (r"في دراسة ذات حدين مع \( n = 64 \) و \( p = 0.5 \)، ما الانحراف المعياري؟<br><em>Standard deviation of binomial with n=64, p=0.5?</em>",
         ["4", "16", "8", "2"], 0,
         r"\( \sigma = \sqrt{npq} = \sqrt{64 \times 0.5 \times 0.5} = \sqrt{16} = 4 \)."),

        # 19. Normal distribution area between mu and mu + sigma
        (r"في التوزيع الطبيعي، ما النسبة المئوية للمساحة الواقعة بين المتوسط \( \mu \) و \( \mu + \sigma \)؟<br><em>Percentage of area between mean and mean + 1 std dev?</em>",
         ["34%", "68%", "13.5%", "50%"], 0,
         r"المساحة بين \( \mu - \sigma \) و \( \mu + \sigma \) هي 68%، وبسبب التماثل فإن نصفها بين \( \mu \) و \( \mu + \sigma \) يساوي \( \dfrac{68\%}{2} = 34\% \)."),

        # 20. Normal distribution area between mu + sigma and mu + 2 sigma
        (r"في التوزيع الطبيعي، ما النسبة المئوية للبيانات التي تقع بين \( \mu + \sigma \) و \( \mu + 2\sigma \)؟<br><em>Percentage of data between 1 and 2 standard deviations above mean?</em>",
         ["13.5%", "34%", "2%", "68%"], 0,
         r"بين \( \mu \) و \( \mu + 2\sigma \) النسبة هي \( \dfrac{95\%}{2} = 47.5\% \). نطرح 34%: \( 47.5\% - 34\% = 13.5\% \)."),

        # 21. Normal distribution z-score calculation
        (r"إذا كان درجات الطلاب تتبع توزيعًا طبيعيًا بمتوسط \( \mu = 75 \) وانحراف معياري \( \sigma = 5 \)، فما الدرجة المعيارية \( z \) لطالب حصل على 85؟<br><em>Calculate z-score for x=85 with mean=75 and std=5.</em>",
         ["2", "1", "2.5", "-2"], 0,
         r"الدرجة المعيارية: \( z = \dfrac{x - \mu}{\sigma} = \dfrac{85 - 75}{5} = \dfrac{10}{5} = 2 \)."),

        # 22. Normal distribution value from z-score
        (r"في توزيع طبيعي متوسطه \( \mu = 50 \) وانحرافه المعياري \( \sigma = 8 \)، ما القيمة التي تقابل درجة معيارية \( z = -1.5 \)؟<br><em>Find raw value x for z = -1.5.</em>",
         ["38", "42", "62", "35"], 0,
         r"\( x = \mu + z\sigma = 50 + (-1.5)(8) = 50 - 12 = 38 \)."),

        # 23. Percentage greater than mu in normal dist
        (r"في توزيع طبيعي لأطوال 1000 طالب، كم طالبًا تقريبًا يزيد طوله عن المتوسط الحسابي؟<br><em>How many students have height above the mean?</em>",
         ["500", "680", "950", "340"], 0,
         r"التوزيع الطبيعي متماثل حول المتوسط، لذا يقع 50% من البيانات فوق المتوسط: \( 0.50 \times 1000 = 500 \) طالب."),

        # 24. Geometric probability in dartboard (concentric circles)
        (r"لوحة هدف دائرية نصف قطرها 6 cm، بداخلها دائرة صغيرة متحدة المركز نصف قطرها 3 cm. ما احتمال سقوط سهم عشوائيًا داخل الدائرة الصغيرة؟<br><em>Probability of hitting inner circle of radius 3 inside circle of radius 6?</em>",
         [r"\( \dfrac{1}{4} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{8} \)"], 0,
         r"الاحتمال = نسبة مساحة الدائرة الصغرى إلى مساحة الدائرة الكبرى: \( \dfrac{\pi (3^2)}{\pi (6^2)} = \dfrac{9}{36} = \dfrac{1}{4} \)."),

        # 25. Choosing 2 questions out of 5
        (r"في اختبار يحتوي على 5 أسئلة، يجب على الطالب اختيار سؤالين للإجابة عنهما. كم طريقة متاحة أمامه؟<br><em>Ways to choose 2 questions out of 5?</em>",
         ["10", "20", "5", "25"], 0,
         r"الترتيب غير مهم: \( _5 C_2 = \dfrac{5 \times 4}{2 \times 1} = 10 \)."),

        # 26. 4-digit PIN code with repetition allowed
        (r"كم رمزًا سريًا مختلفًا مكونًا من 4 أرقام يمكن تكوينه باستخدام الأرقام من 0 إلى 9 مع السماح بالتكرار؟<br><em>Number of 4-digit PIN codes with repetition allowed?</em>",
         ["10000", "5040", "9000", "6561"], 0,
         r"كل خانة من الخانات الأربع يمكن ملؤها بـ 10 طرق: \( 10 \times 10 \times 10 \times 10 = 10^4 = 10000 \)."),

        # 27. 4-digit PIN without repetition
        (r"كم رمزًا سريًا مكونًا من 4 أرقام مختلفة (دون تكرار) يمكن تكوينه من الأرقام من 0 إلى 9؟<br><em>Number of 4-digit PIN codes without repetition?</em>",
         ["5040", "10000", "4536", "720"], 0,
         r"باستخدام التباديل: \( _{10} P_4 = 10 \times 9 \times 8 \times 7 = 5040 \)."),

        # 28. P(A or B) when independent
        (r"إذا كان \( P(A) = 0.4 \) و \( P(B) = 0.5 \) وكانت الحادثتان مستقلتين، فما قيمة \( P(A \cup B) \)؟<br><em>Find P(A or B) for independent events.</em>",
         ["0.7", "0.9", "0.2", "0.6"], 0,
         r"بما أنهما مستقلتان: \( P(A \cap B) = P(A) \cdot P(B) = 0.4 \times 0.5 = 0.2 \). إذن: \( P(A \cup B) = P(A) + P(B) - P(A \cap B) = 0.4 + 0.5 - 0.2 = 0.7 \)."),

        # 29. Skewness from mean and median
        (r"إذا كان المتوسط الحسابي لمجموعة بيانات يساوي 65 والوسيط يساوي 50، فإن هذا التوزيع يكون غالبًا:<br><em>If mean = 65 and median = 50, skewness is:</em>",
         ["ملتويًا لليمين", "ملتويًا لليسار", "متماثلاً", "منتظمًا"], 0,
         r"عندما يكون المتوسط أكبر من الوسيط (\( \text{Mean} > \text{Median} \))، يكون التوزيع موجب الالتواء (ملتويًا لليمين)."),

        # 30. Negative skewness relationship
        (r"إذا كان المتوسط الحسابي أصغر من الوسيط (\( \text{Mean} < \text{Median} \))، فإن التوزيع يكون:<br><em>If mean < median, distribution is:</em>",
         ["ملتويًا لليسار", "ملتويًا لليمين", "متماثلاً", "طبيعيًا"], 0,
         r"المتوسط ينسحب باتجاه الذيل؛ وبما أنه أصغر من الوسيط، فالذيل يمتد إلى اليسار (ملتوي لليسار)."),

        # 31. Variance of constant added to data
        (r"إذا كان الانحراف المعياري لدرجات طلاب هو 4، ثم أضيفت 5 درجات لكل طالب، فما الانحراف المعياري الجديد؟<br><em>New std dev if 5 is added to all scores (original std = 4)?</em>",
         ["4", "9", "20", "1"], 0,
         r"إضافة أو طرح قيمة ثابتة لجميع البيانات لا يغير مقاييس التشتت (المدى، التباين، الانحراف المعياري)، فيبقى 4."),

        # 32. Variance when data multiplied by constant
        (r"إذا كان التباين لمجموعة بيانات هو 9، وضُربت كل قيمة في 2، فما التباين الجديد؟<br><em>New variance if all values multiplied by 2 (original var = 9)?</em>",
         ["36", "18", "9", "81"], 0,
         r"عند ضرب البيانات في ثابت \( c \)، يتضاعف التباين بمعامل \( c^2 \). هنا \( 2^2 \times 9 = 4 \times 9 = 36 \)."),

        # 33. Sum of squared deviations property
        (r"مجموع انحرافات القيم عن متوسطها الحسابي (\( \sum (x - \bar{x}) \)) يساوي دائمًا:<br><em>Sum of deviations of values from their mean?</em>",
         ["0", "1", "المتوسط الحسابي", "التباين"], 0,
         r"من الخواص الأساسية للمتوسط الحسابي أن مجموع انحرافات القيم عنه يساوي صفرًا دائمًا."),

        # 34. Probability of at least one head in 3 flips
        (r"عند إلقاء قطعة نقد 3 مرات، ما احتمال الحصول على شعار واحد على الأقل؟<br><em>Probability of getting at least one head in 3 coin tosses?</em>",
         [r"\( \dfrac{7}{8} \)", r"\( \dfrac{1}{8} \)", r"\( \dfrac{3}{8} \)", r"\( \dfrac{1}{2} \)"], 0,
         r"الحدث المتمم هو عدم ظهور أي شعار (كلها كتابة)، واحتماله \( \left(\dfrac{1}{2}\right)^3 = \dfrac{1}{8} \). الاحتمال المطلوب: \( 1 - \dfrac{1}{8} = \dfrac{7}{8} \)."),

        # 35. 7C5 using symmetry 7C2
        (r"ما قيمة \( _7C_5 \)؟<br><em>Evaluate 7C5.</em>",
         ["21", "42", "35", "15"], 0,
         r"بخاصية التماثل: \( _7 C_5 = _7 C_2 = \dfrac{7 \times 6}{2 \times 1} = 21 \)."),

        # 36. Solving n in nP2 = 30
        (r"إذا كان \( _n P_2 = 30 \)، فما قيمة \( n \)؟<br><em>Find n if nP2 = 30.</em>",
         ["6", "5", "7", "10"], 0,
         r"\( n(n-1) = 30 \implies n^2 - n - 30 = 0 \implies (n-6)(n+5) = 0 \implies n = 6 \)."),

        # 37. Solving n in nC2 = 15
        (r"إذا كان \( _n C_2 = 15 \)، فما قيمة \( n \)؟<br><em>Find n if nC2 = 15.</em>",
         ["6", "5", "8", "7"], 0,
         r"\( \dfrac{n(n-1)}{2} = 15 \implies n(n-1) = 30 \implies n = 6 \)."),

        # 38. Normal dist between 60 and 80 with mu=70, sigma=10
        (r"توزيع طبيعي بمتوسط \( \mu = 70 \) وانحراف معياري \( \sigma = 10 \). ما النسبة المئوية للمساحة بين 60 و 80؟<br><em>Percentage of area between 60 and 80?</em>",
         ["68%", "95%", "34%", "47.5%"], 0,
         r"القيمتان 60 و 80 تقابلان \( \mu - \sigma \) و \( \mu + \sigma \). إذن حسب القاعدة التجريبية تمثلان 68%."),

        # 39. Expected value of a fair die
        (r"ما القيمة المتوقعة لعدد النقاط الظاهرة عند إلقاء مكعب أرقام منتظم مرة واحدة؟<br><em>Expected value of rolling a fair 6-sided die?</em>",
         ["3.5", "3.0", "4.0", "3.6"], 0,
         r"\( E(X) = \dfrac{1+2+3+4+5+6}{6} = \dfrac{21}{6} = 3.5 \)."),

        # 40. Probability of sum = 7 on two dice
        (r"عند رمي مكعبي أرقام متمايزين، ما احتمال أن يكون مجموع العددين الظاهرين 7؟<br><em>Probability that the sum of two rolled dice is 7?</em>",
         [r"\( \dfrac{1}{6} \)", r"\( \dfrac{7}{36} \)", r"\( \dfrac{5}{36} \)", r"\( \dfrac{1}{12} \)"], 0,
         r"الأزواج التي مجموعها 7 هي: \( (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \) وعددها 6 من أصل 36 ناتجًا. الاحتمال: \( \dfrac{6}{36} = \dfrac{1}{6} \).")
    ]

    for item in med_data:
        qs.append(make_q(d, "medium", item[0], item[1], item[2], item[3]))

    # ================= HARD (35 items) =================
    hard_data = [
        # 1. Binomial exact probability P(X=2) for n=4, p=1/2
        (r"أُلقيت قطعة نقد 4 مرات. ما احتمال ظهور الشعار مرتين بالضبط؟<br><em>Probability of getting exactly 2 heads in 4 tosses?</em>",
         [r"\( \dfrac{3}{8} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{4} \)", r"\( \dfrac{5}{16} \)"], 0,
         r"توزيع ذو حدين مع \( n=4, p=0.5, k=2 \): \( P(X=2) = _4C_2 (0.5)^2 (0.5)^2 = 6 \times \dfrac{1}{16} = \dfrac{6}{16} = \dfrac{3}{8} \)."),

        # 2. Binomial P(X=3) for n=5, p=1/3
        (r"في تجربة ذات حدين مع \( n = 5 \) واحتمال النجاح \( p = \dfrac{1}{3} \)، ما احتمال النجاح 3 مرات بالضبط؟<br><em>Binomial probability P(X=3) with n=5, p=1/3?</em>",
         [r"\( \dfrac{40}{243} \)", r"\( \dfrac{10}{243} \)", r"\( \dfrac{80}{243} \)", r"\( \dfrac{20}{81} \)"], 0,
         r"\( P(X=3) = _5C_3 \left(\dfrac{1}{3}\right)^3 \left(\dfrac{2}{3}\right)^2 = 10 \times \dfrac{1}{27} \times \dfrac{4}{9} = \dfrac{40}{243} \)."),

        # 3. Probability of sum >= 10 on two dice
        (r"عند إلقاء مكعبي أرقام متمايزين، ما احتمال أن يكون مجموع الوجهين الظاهرين 10 على الأقل؟<br><em>Probability that sum of two dice is at least 10?</em>",
         [r"\( \dfrac{1}{6} \)", r"\( \dfrac{1}{12} \)", r"\( \dfrac{5}{36} \)", r"\( \dfrac{1}{9} \)"], 0,
         r"المجموع 10: \( (4,6), (5,5), (6,4) \) (3 طرق). المجموع 11: \( (5,6), (6,5) \) (طريقتان). المجموع 12: \( (6,6) \) (طريقة واحدة). المجموع الكلي للحالات = \( 3 + 2 + 1 = 6 \). الاحتمال: \( \dfrac{6}{36} = \dfrac{1}{6} \)."),

        # 4. Committee formation with boys and girls: 2 boys from 4, 2 girls from 5
        (r"يراد تشكيل لجنة مكونة من طالبين وطالبتين من بين 4 طلاب و 5 طالبات. كم لجنة مختلفة يمكن تشكيلها؟<br><em>Ways to choose 2 boys from 4 and 2 girls from 5?</em>",
         ["60", "20", "120", "40"], 0,
         r"طرق اختيار الطالبين: \( _4 C_2 = 6 \). طرق اختيار الطالبتين: \( _5 C_2 = 10 \). حسب مبدأ العد: \( 6 \times 10 = 60 \)."),

        # 5. Normal dist: percentage exceeding mu + 2 sigma
        (r"إذا كانت درجات اختبار تتبع توزيعًا طبيعيًا بمتوسط 80 وانحراف معياري 6، فما النسبة المئوية للطلاب الذين تزيد درجاتهم عن 92؟<br><em>Percentage of scores above 92 (mean=80, std=6)?</em>",
         ["2.5%", "5%", "13.5%", "0.5%"], 0,
         r"\( z = \dfrac{92 - 80}{6} = 2 \). المساحة خارج \( \mu \pm 2\sigma \) هي \( 100\% - 95\% = 5\% \). ولأن التوزيع متماثل، فإن النسبة التي تزيد عن \( \mu + 2\sigma \) هي \( \dfrac{5\%}{2} = 2.5\% \)."),

        # 6. Normal dist: count of students with score < 68 (mu=80, sigma=6)
        (r"في نفس الاختبار الذي تقدم له 2000 طالب، كم طالبًا يتوقع أن تكون درجاتهم أقل من 68؟<br><em>Expected number of students scoring below 68 out of 2000?</em>",
         ["50", "100", "25", "10"], 0,
         r"\( z = \dfrac{68 - 80}{6} = -2 \). النسبة الأقل من انحرافين معياريين هي 2.5%. عدد الطلاب: \( 0.025 \times 2000 = 50 \) طالبًا."),

        # 7. Permutations with identical letters: MISSISSIPPI style (word: 'SALAM' س ل ا م)
        (r"ما عدد التباديل المختلفة لأحرف كلمة 'سلسبيل' المكونة من 6 أحرف وفيها حرف السين مكرر مرتين وحرف اللام مكرر مرتين؟<br><em>Distinct permutations of a 6-letter word with two letters repeated twice each?</em>",
         ["180", "360", "720", "90"], 0,
         r"\( \dfrac{n!}{k_1! k_2!} = \dfrac{6!}{2! 2!} = \dfrac{720}{4} = 180 \)."),

        # 8. Conditional probability with cards
        (r"سُحبت بطاقة عشوائيًا من مجموعة بطاقات مرقمة من 1 إلى 20. إذا عُلم أن العدد المسحوب فردي، فما احتمال أن يكون أوليًا؟<br><em>Probability of prime given odd from 1 to 20?</em>",
         [r"\( \dfrac{7}{10} \)", r"\( \dfrac{8}{10} \)", r"\( \dfrac{2}{5} \)", r"\( \dfrac{3}{5} \)"], 0,
         r"الأعداد الفردية من 1 إلى 20 هي 10 أعداد: \( \{1, 3, 5, 7, 9, 11, 13, 15, 17, 19\} \). الأعداد الأولية بينها هي: \( \{3, 5, 7, 11, 13, 17, 19\} \) وعددها 7 أعداد (العدد 1 ليس أوليًا). الاحتمال: \( \dfrac{7}{10} \)."),

        # 9. Geometric probability: square inscribed in circle
        (r"رُسم مربع داخل دائرة بحيث تقع رؤوسه على محيطها. إذا اختيرت نقطة عشوائيًا داخل الدائرة، فما احتمال أن تقع داخل المربع؟<br><em>Probability of landing inside a square inscribed in a circle?</em>",
         [r"\( \dfrac{2}{\pi} \)", r"\( \dfrac{1}{\pi} \)", r"\( \dfrac{\pi}{4} \)", r"\( \dfrac{4}{\pi} \)"], 0,
         r"نصف قطر الدائرة \( r \)، قطر المربع \( 2r \). مساحة المربع = \( \dfrac{d^2}{2} = \dfrac{4r^2}{2} = 2r^2 \). مساحة الدائرة = \( \pi r^2 \). الاحتمال = \( \dfrac{2r^2}{\pi r^2} = \dfrac{2}{\pi} \)."),

        # 10. Geometric probability: circle inscribed in square
        (r"رُسمت دائرة تمس أضلاع مربع من الداخل. إذا اختيرت نقطة عشوائيًا داخل المربع، فما احتمال أن تقع داخل الدائرة؟<br><em>Probability of landing in circle inscribed in square?</em>",
         [r"\( \dfrac{\pi}{4} \)", r"\( \dfrac{2}{\pi} \)", r"\( \dfrac{\pi}{2} \)", r"\( \dfrac{1}{4} \)"], 0,
         r"طول ضلع المربع \( 2r \)، مساحته \( 4r^2 \). مساحة الدائرة \( \pi r^2 \). الاحتمال: \( \dfrac{\pi r^2}{4r^2} = \dfrac{\pi}{4} \)."),

        # 11. Expected value of lottery/game
        (r"في لعبة حظ، يدفع اللاعب 5 ريالات، وله احتمال \( 0.1 \) لربح 30 ريالاً (صافي ربح 25)، واحتمال \( 0.9 \) لخسارة الـ 5 ريالات (-5). ما القيمة المتوقعة لصافي ربح اللاعب؟<br><em>Expected net payoff of the game?</em>",
         ["-2 ريال", "-1 ريال", "0 ريال", "+2 ريال"], 0,
         r"\( E(X) = (25)(0.1) + (-5)(0.9) = 2.5 - 4.5 = -2 \) ريال."),

        # 12. Solving equation nC(n-2) = 21
        (r"إذا كان \( _n C_{n-2} = 21 \)، فما قيمة \( n \)، حيث \( n \ge 2 \)؟<br><em>Solve nC(n-2) = 21.</em>",
         ["7", "6", "8", "9"], 0,
         r"\( _n C_{n-2} = _n C_2 = \dfrac{n(n-1)}{2} = 21 \implies n(n-1) = 42 \implies n = 7 \)."),

        # 13. System with combinations: nCr = 10 and nPr = 20
        (r"إذا كان \( _n C_r = 10 \) و \( _n P_r = 20 \)، فما قيمة \( r \)؟<br><em>Find r if nCr = 10 and nPr = 20.</em>",
         ["2", "3", "4", "1"], 0,
         r"العلاقة بين التباديل والتوافيق: \( _n P_r = r! \cdot _n C_r \implies 20 = r! \times 10 \implies r! = 2 \implies r = 2 \)."),

        # 14. Find n when nC2 = 10 and r=2
        (r"بالاعتماد على السؤال السابق حيث \( _n C_2 = 10 \)، ما قيمة \( n \)؟<br><em>Find n if nC2 = 10.</em>",
         ["5", "4", "6", "7"], 0,
         r"\( \dfrac{n(n-1)}{2} = 10 \implies n(n-1) = 20 \implies n = 5 \)."),

        # 15. Probability of at least one success: 1 - (1-p)^n
        (r"إذا كان احتمال إصابة هدف من رمية واحدة هو \( 0.6 \)، فما احتمال إصابة الهدف مرة واحدة على الأقل في 3 رميات مستقلة؟<br><em>Probability of hitting target at least once in 3 trials?</em>",
         ["0.936", "0.216", "0.064", "0.850"], 0,
         r"احتمال عدم إصابة الهدف في أي رمية (فشل مستمر): \( (1 - 0.6)^3 = (0.4)^3 = 0.064 \). احتمال إصابته مرة على الأقل: \( 1 - 0.064 = 0.936 \)."),

        # 16. Standard deviation formula calculation
        (r"ما الانحراف المعياري للقيم: \( 2, 4, 6, 8, 10 \) كعينة؟<br><em>Sample standard deviation of {2, 4, 6, 8, 10}?</em>",
         [r"\( \sqrt{10} \)", r"\( \sqrt{8} \)", "3", r"\( \sqrt{5} \)"], 0,
         r"المتوسط \( \bar{x} = 6 \). مربعات الانحرافات: \( (2-6)^2 + (4-6)^2 + (6-6)^2 + (8-6)^2 + (10-6)^2 = 16 + 4 + 0 + 4 + 16 = 40 \). تباين العينة: \( s^2 = \dfrac{40}{5-1} = \dfrac{40}{4} = 10 \implies s = \sqrt{10} \)."),

        # 17. Binomial probability P(X >= 1) with n=3, p=1/4
        (r"في تجربة ذات حدين تتكون من 3 محاولات واحتمال النجاح \( p = \dfrac{1}{4} \)، ما احتمال النجاح مرة واحدة على الأقل؟<br><em>Binomial P(X >= 1) with n=3, p=1/4?</em>",
         [r"\( \dfrac{37}{64} \)", r"\( \dfrac{27}{64} \)", r"\( \dfrac{1}{64} \)", r"\( \dfrac{3}{4} \)"], 0,
         r"الحدث المتمم هو الفشل في جميع المحاولات \( X = 0 \): \( P(X=0) = \left(\dfrac{3}{4}\right)^3 = \dfrac{27}{64} \). الاحتمال: \( 1 - \dfrac{27}{64} = \dfrac{37}{64} \)."),

        # 18. Normal dist: score corresponding to top 16%
        (r"في توزيع طبيعي بمتوسط \( \mu = 500 \) وانحراف معياري \( \sigma = 100 \)، ما القيمة التقريبية التي تفصل بين أعلى 16% من البيانات والبقية؟<br><em>Score separating top 16% in normal dist (mean=500, std=100)?</em>",
         ["600", "700", "550", "650"], 0,
         r"المساحة فوق \( \mu + \sigma \) تساوي \( \dfrac{100\% - 68\%}{2} = 16\% \). إذن القيمة هي \( \mu + \sigma = 500 + 100 = 600 \)."),

        # 19. Normal dist: score separating bottom 2.5%
        (r"في نفس التوزيع الطبيعي (\( \mu = 500, \sigma = 100 \))، ما القيمة التي يقل عنها 2.5% من البيانات فقط؟<br><em>Score below which only 2.5% of data lies?</em>",
         ["300", "400", "200", "350"], 0,
         r"المساحة أقل من \( \mu - 2\sigma \) تمثل 2.5%. إذن القيمة: \( \mu - 2\sigma = 500 - 2(100) = 300 \)."),

        # 20. Total subsets of a set of 5 elements
        (r"ما عدد المجموعات الجزئية الكلي لمجموعة تحتوي على 5 عناصر؟<br><em>Total number of subsets of a 5-element set?</em>",
         ["32", "25", "10", "120"], 0,
         r"عدد المجموعات الجزئية لمجموعة بها \( n \) من العناصر هو \( 2^n = 2^5 = 32 \) (بما فيها المجموعة الخالية والمجموعة نفسها)."),

        # 21. Handshakes between 8 people
        (r"حضر 8 أشخاص اجتماعًا، وتصافح كل منهم مع الآخر مرة واحدة فقط. كم عدد المصافحات الإجمالي؟<br><em>Total handshakes among 8 people?</em>",
         ["28", "56", "64", "16"], 0,
         r"المصافحة تحدث بين شخصين دون اعتبار للترتيب: \( _8 C_2 = \dfrac{8 \times 7}{2} = 28 \)."),

        # 22. Diagonals of an octagon (8-sided polygon)
        (r"كم قطرًا يمكن رسمه في مضلع ثماني منتظم؟<br><em>Number of diagonals in an octagon?</em>",
         ["20", "28", "24", "16"], 0,
         r"عدد الأقطار لمضلع عدد أضلاعه \( n \) يعطى بالقانون: \( \dfrac{n(n-3)}{2} = \dfrac{8(5)}{2} = 20 \)."),

        # 23. Probability of no matching birthdays approx for 3 people
        (r"بافتراض أن السنة 365 يومًا، ما التعبير الرياضي الذي يمثل احتمال أن يكون لـ 3 أشخاص تواريخ ميلاد مختلفة تمامًا؟<br><em>Probability that 3 people have distinct birthdays?</em>",
         [r"\( \dfrac{365}{365} \times \dfrac{364}{365} \times \dfrac{363}{365} \)", r"\( \left(\dfrac{364}{365}\right)^3 \)", r"\( \dfrac{3}{365} \)", r"\( 1 - \dfrac{3}{365} \)"], 0,
         r"الشخص الأول له 365 يومًا، والثاني 364، والثالث 363، مقسومًا على \( 365^3 \)."),

        # 24. Arranging letters of 'MATHEMATICS' or word with 4 letters where all unique
        (r"بكم طريقة يمكن ترتيب 5 كتب مختلفة على رف بحيث يبقى كتاب معين دائمًا في المنتصف؟<br><em>Arrangements of 5 books with one fixed in the middle?</em>",
         ["24", "120", "60", "12"], 0,
         r"الكتاب الأوسط ثابت في مكانه (طريقة واحدة)، وتبقى 4 كتب يتم ترتيبها في 4 أماكن: \( 4! = 24 \)."),

        # 25. Conditional probability with two coins
        (r"أُلقيت قطعتَا نقد. إذا عُلم أن إحداهما على الأقل أظهرت شعارًا، فما احتمال أن تظهر كلتاهما شعارًا؟<br><em>Probability of both heads given at least one head?</em>",
         [r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{4} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{2}{3} \)"], 0,
         r"فضاء العينة المشروط (ظهور شعار واحد على الأقل): \( \{HH, HT, TH\} \) (3 نواتج). الحادثة المطلوبة \( \{HH\} \) تمثل ناتجًا واحدًا. إذن الاحتمال: \( \dfrac{1}{3} \)."),

        # 26. Expected value with table having negative values
        (r"متغير عشوائي \( X \) يأخذ القيم \( -2, 0, 4 \) باحتمالات \( 0.3, 0.5, 0.2 \) على الترتيب. ما القيمة المتوقعة؟<br><em>Find E(X) with negative values.</em>",
         ["0.2", "0.0", "-0.6", "0.8"], 0,
         r"\( E(X) = (-2)(0.3) + (0)(0.5) + (4)(0.2) = -0.6 + 0 + 0.8 = 0.2 \)."),

        # 27. Normal distribution percentile 84th
        (r"في توزيع طبيعي، ما المئين التقريبي للدرجة التي تعادل \( z = 1 \)؟<br><em>Percentile corresponding to z = 1 in normal distribution?</em>",
         ["84", "68", "95", "50"], 0,
         r"النسبة الأقل من المتوسط هي 50%، ونضيف المساحة بين 0 و 1 انحراف معياري وهي 34%: \( 50\% + 34\% = 84\% \)، إذن المئين هو 84."),

        # 28. Normal distribution percentile 16th
        (r"في توزيع طبيعي، ما المئين المقابل للدرجة المعيارية \( z = -1 \)؟<br><em>Percentile for z = -1?</em>",
         ["16", "32", "5", "2.5"], 0,
         r"المساحة الأقل من \( z = -1 \) هي \( 50\% - 34\% = 16\% \)، إذن المئين هو 16."),

        # 29. Probability of drawing same color from 3 red and 3 green
        (r"صندوق به 3 كرات حمراء و 3 كرات خضراء. سُحبت كرتان معًا عشوائيًا، ما احتمال أن تكونا من نفس اللون؟<br><em>Probability of drawing two marbles of the same color?</em>",
         [r"\( \dfrac{2}{5} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{3}{5} \)", r"\( \dfrac{1}{5} \)"], 0,
         r"عدد طرق سحب كرتين من 6: \( _6 C_2 = 15 \). طرق سحب كرتين حمراوين: \( _3 C_2 = 3 \). طرق سحب كرتين خضراوين: \( _3 C_2 = 3 \). المجموع = \( 3 + 3 = 6 \). الاحتمال: \( \dfrac{6}{15} = \dfrac{2}{5} \)."),

        # 30. Probability of different colors from 3 red and 3 green
        (r"في نفس الصندوق (3 حمراء و 3 خضراء)، ما احتمال أن تكون الكرتان المسحوبتان مختلفتي اللون؟<br><em>Probability of drawing marbles of different colors?</em>",
         [r"\( \dfrac{3}{5} \)", r"\( \dfrac{2}{5} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{4}{5} \)"], 0,
         r"الحدث المتمم لتماثل اللونين: \( 1 - \dfrac{2}{5} = \dfrac{3}{5} \) (أو \( \dfrac{3 \times 3}{15} = \dfrac{9}{15} = \dfrac{3}{5} \))."),

        # 31. Pascal's identity nCr + nC(r-1)
        (r"المقدار \( _n C_r + _n C_{r-1} \) يكافئ وفق متطابقة باسكال:<br><em>Pascal's identity nCr + nC(r-1) = ?</em>",
         [r"\( _{n+1} C_r \)", r"\( _{n+1} C_{r+1} \)", r"\( _n C_{r+1} \)", r"\( 2 \cdot _n C_r \)"], 0,
         r"متطابقة باسكال الأساسية تنص على: \( _n C_r + _n C_{r-1} = _{n+1} C_r \)."),

        # 32. Total terms in binomial expansion (a + b)^n
        (r"عدد الحدود في مفكوك ذات الحدين \( (a + b)^8 \) هو:<br><em>Number of terms in binomial expansion of (a+b)^8?</em>",
         ["9", "8", "7", "16"], 0,
         r"عدد حدود مفكوك \( (a + b)^n \) هو دائمًا \( n + 1 \)، إذن \( 8 + 1 = 9 \)."),

        # 33. Middle term in (x + y)^6
        (r"الحد الأوسط في مفكوك \( (x + y)^6 \) هو الحد:<br><em>Which term is the middle term in (x+y)^6?</em>",
         ["الرابع", "الثالث", "الخامس", "السادس"], 0,
         r"المفكوك يحتوي على \( 6 + 1 = 7 \) حدود، فالحد الأوسط هو الحد الرابع (\( T_4 \))."),

        # 34. Coefficient of x^2 y in (x + 2y)^3
        (r"معامل الحد \( x^2 y \) في مفكوك \( (x + 2y)^3 \) يساوي:<br><em>Coefficient of x^2 y in expansion of (x + 2y)^3?</em>",
         ["6", "3", "12", "8"], 0,
         r"الحد الذي يحتوي على \( x^2 y \) هو: \( _3 C_1 x^2 (2y)^1 = 3 x^2 (2y) = 6 x^2 y \). المعامل هو 6."),

        # 35. Coefficient of x^3 in (x - 1)^5
        (r"معامل الحد \( x^3 \) في مفكوك \( (x - 1)^5 \) يساوي:<br><em>Coefficient of x^3 in expansion of (x - 1)^5?</em>",
         ["10", "-10", "5", "-5"], 0,
         r"الحد العام: \( T_{r+1} = _5 C_r x^{5-r} (-1)^r \). للحصول على \( x^3 \)، نضع \( 5 - r = 3 \implies r = 2 \). إذن الحد: \( _5 C_2 x^3 (-1)^2 = 10 x^3 (1) = 10 x^3 \). المعامل هو 10.")
    ]

    for item in hard_data:
        qs.append(make_q(d, "hard", item[0], item[1], item[2], item[3]))

    return qs

if __name__ == "__main__":
    questions = get_questions()
    easy_cnt = sum(1 for q in questions if q["difficulty"] == "easy")
    med_cnt = sum(1 for q in questions if q["difficulty"] == "medium")
    hard_cnt = sum(1 for q in questions if q["difficulty"] == "hard")
    print(f"gen_stats.py: Total = {len(questions)} (Easy: {easy_cnt}, Medium: {med_cnt}, Hard: {hard_cnt})")
