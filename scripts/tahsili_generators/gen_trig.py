"""
scripts/tahsili_generators/gen_trig.py
Tahsili Trigonometry generator:
- Angle conversions & Reference Angles
- Right-triangle & Unit Circle Definitions
- Fundamental Pythagorean Identities
- Sum/Difference & Double/Half Angle Formulas
- Laws of Sines & Cosines
- Inverse Trig Functions & Trig Graphs
"""

import sys
import os
sys.path.insert(0, os.path.abspath("."))
from scripts.tahsili_generators.common import make_q

def get_questions():
    d = "Trigonometry"
    qs = []

    # ================= EASY (20 items) =================
    easy_data = [
        (r"ما القياس بالراديان للزاوية \( 180^\circ \)؟<br><em>Radian measure of \( 180^\circ \)?</em>",
         [r"\( \pi \)", r"\( \dfrac{\pi}{2} \)", r"\( 2\pi \)", r"\( \dfrac{3\pi}{2} \)"], 0,
         r"\( 180^\circ \) تكافئ تماماً \( \pi \) بالراديان."),

        (r"ما القياس بالدرجات للزاوية \( \dfrac{\pi}{3} \) راديان؟<br><em>Degree measure of \( \pi/3 \) radians?</em>",
         ["60°", "30°", "45°", "90°"], 0,
         r"\( \dfrac{180^\circ}{3} = 60^\circ \)."),

        (r"ما قيمة \( \sin 30^\circ \)؟<br><em>What is \( \sin 30^\circ \)?</em>",
         [r"\( \dfrac{1}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{\sqrt{2}}{2} \)", "1"], 0,
         r"نسبة شهيرة: جيب الزاوية 30° يساوي \( \dfrac{1}{2} \)."),

        (r"ما قيمة \( \cos 60^\circ \)؟<br><em>What is \( \cos 60^\circ \)?</em>",
         [r"\( \dfrac{1}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{\sqrt{2}}{2} \)", "0"], 0,
         r"\( \cos 60^\circ = \sin 30^\circ = \dfrac{1}{2} \)."),

        (r"ما قيمة \( \tan 45^\circ \)؟<br><em>What is \( \tan 45^\circ \)?</em>",
         ["1", "0", r"\( \dfrac{1}{\sqrt{3}} \)", r"\( \sqrt{3} \)"], 0,
         r"ظل الزاوية 45° يساوي 1 لأن المقابل يساوي المجاور في المثلث متطابق الضلعين."),

        (r"ما هو مقلوب الدالة المثلثية \( \cos\theta \)؟<br><em>What is reciprocal of \( \cos\theta \)?</em>",
         [r"\( \sec\theta \)", r"\( \csc\theta \)", r"\( \cot\theta \)", r"\( \tan\theta \)"], 0,
         r"مقلوب جيب التمام هو القاطع: \( \sec\theta = \dfrac{1}{\cos\theta} \)."),

        (r"ما هو مقلوب الدالة المثلثية \( \sin\theta \)؟<br><em>What is reciprocal of \( \sin\theta \)?</em>",
         [r"\( \csc\theta \)", r"\( \sec\theta \)", r"\( \cot\theta \)", r"\( \cos\theta \)"], 0,
         r"مقلوب الجيب هو قاطع التمام: \( \csc\theta = \dfrac{1}{\sin\theta} \)."),

        (r"ما قيمة المتطابقة الشهيرة: \( \sin^2\theta + \cos^2\theta \) لأي زاوية \( \theta \)؟<br><em>Value of \( \sin^2\theta + \cos^2\theta \)?</em>",
         ["1", "0", "2", "-1"], 0,
         r"متطابقة فيثاغورس الأساسية في حساب المثلثات تساوي دائمًا 1."),

        (r"في أي ربع تكون كل من \( \sin\theta \) و \( \cos\theta \) سالبتين؟<br><em>In which quadrant are both sin and cos negative?</em>",
         ["الربع الثالث", "الربع الأول", "الربع الثاني", "الربع الرابع"], 0,
         r"في الربع الثالث (\( 180^\circ < \theta < 270^\circ \))، الإحداثيان السيني والصادي سالبان، فتكون \( \cos\theta < 0 \) و \( \sin\theta < 0 \) بينما \( \tan\theta > 0 \)."),

        (r"ما قيمة \( \sin 90^\circ \)؟<br><em>What is \( \sin 90^\circ \)?</em>",
         ["1", "0", "-1", r"\( \dfrac{1}{2} \)"], 0,
         r"على دائرة الوحدة، النقطة المقابلة لـ 90° هي \( (0, 1) \)، فالجيب هو الإحداثي الصادي \( y = 1 \)."),

        (r"ما قيمة \( \cos 90^\circ \)؟<br><em>What is \( \cos 90^\circ \)?</em>",
         ["0", "1", "-1", r"\( \dfrac{1}{2} \)"], 0,
         r"الإحداثي السيني للنقطة \( (0, 1) \) هو 0، لذا \( \cos 90^\circ = 0 \)."),

        (r"ما زاوية الإسناد (الزاوية المرجعية) للزاوية \( 150^\circ \)؟<br><em>Reference angle for \( 150^\circ \)?</em>",
         ["30°", "60°", "45°", "50°"], 0,
         r"في الربع الثاني: زاوية الإسناد \( \theta' = 180^\circ - 150^\circ = 30^\circ \)."),

        (r"ما سعة الدالة المثلثية \( y = 3\sin(2x) \)؟<br><em>Amplitude of \( y = 3\sin(2x) \)?</em>",
         ["3", "2", "6", r"\( \pi \)"], 0,
         r"السعة هي القيمة المطلقة للمعامل: \( |A| = |3| = 3 \)."),

        (r"ما طول دورة الدالة المثلثية \( y = \cos x \) بالدرجات؟<br><em>Period of \( y = \cos x \) in degrees?</em>",
         ["360°", "180°", "90°", "720°"], 0,
         r"دورة دالتي الجيب وجيب التمام الأساسيتين هي 360° (أو \( 2\pi \))."),

        (r"ما طول دورة الدالة \( y = \tan x \)؟<br><em>Period of \( y = \tan x \)?</em>",
         [r"\( \pi \) (أو 180°)", r"\( 2\pi \) (أو 360°)", r"\( \dfrac{\pi}{2} \) (أو 90°)", r"\( 4\pi \)"], 0,
         r"دورة دالة الظل هي 180° أو \( \pi \) راديان."),

        (r"إذا كان المثلث قائم الزاوية، والوتر طوله 10 سم، والمقابل للزاوية \( \theta \) طوله 6 سم، فما قيمة \( \sin\theta \)؟<br><em>Find \( \sin\theta \) with hyp=10, opp=6.</em>",
         ["0.6", "0.8", "0.75", "1.33"], 0,
         r"\( \sin\theta = \dfrac{\text{المقابل}}{\text{الوتر}} = \dfrac{6}{10} = 0.6 \)."),

        (r"ما قيمة \( \cos 0^\circ \)؟<br><em>What is \( \cos 0^\circ \)?</em>",
         ["1", "0", "-1", r"\( \dfrac{1}{2} \)"], 0,
         r"\( \cos 0^\circ = 1 \)."),

        (r"ما المتطابقة التي تكافئ \( 1 + \tan^2\theta \)؟<br><em>Identity equivalent to \( 1 + \tan^2\theta \)?</em>",
         [r"\( \sec^2\theta \)", r"\( \csc^2\theta \)", r"\( \cot^2\theta \)", r"\( \sin^2\theta \)"], 0,
         r"متطابقة فيثاغورس: \( 1 + \tan^2\theta = \sec^2\theta \)."),

        (r"ما قيمة \( \arcsin(1) \) بالدرجات في الفترة \( [-90^\circ, 90^\circ] \)؟<br><em>Value of \( \arcsin(1) \)?</em>",
         ["90°", "0°", "180°", "45°"], 0,
         r"الزاوية التي جيبها 1 في مجال دالة المعكوس هي 90° (أو \( \pi/2 \))."),

        (r"ما إشارة \( \cos 120^\circ \)؟<br><em>Sign of \( \cos 120^\circ \)?</em>",
         ["سالبة", "موجبة", "صفر", "غير معرّفة"], 0,
         r"الزاوية 120° تقع في الربع الثاني، حيث جيب التمام سالب.")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(d, "easy", text, ch, ans, sol))

    # ================= MEDIUM (30 items) =================
    med_data = [
        (r"ما قيمة \( \sin 120^\circ \) بدقة؟<br><em>Exact value of \( \sin 120^\circ \)?</em>",
         [r"\( \dfrac{\sqrt{3}}{2} \)", r"\( -\dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{1}{2} \)", r"\( -\dfrac{1}{2} \)"], 0,
         r"في الربع الثاني الجيب موجب وزاوية الإسناد 60°: \( \sin 120^\circ = \sin 60^\circ = \dfrac{\sqrt{3}}{2} \)."),

        (r"ما قيمة \( \cos 150^\circ \) بدقة؟<br><em>Exact value of \( \cos 150^\circ \)?</em>",
         [r"\( -\dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)", r"\( -\dfrac{1}{2} \)", r"\( \dfrac{1}{2} \)"], 0,
         r"في الربع الثاني جيب التمام سالب وزاوية الإسناد 30°: \( \cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2} \)."),

        (r"إذا كانت \( \sin\theta = \dfrac{3}{5} \) حيث \( \theta \) في الربع الأول، فما قيمة \( \cos\theta \)؟<br><em>Find \( \cos\theta \) if \( \sin\theta = 3/5 \) in quadrant I.</em>",
         [r"\( \dfrac{4}{5} \)", r"\( \dfrac{3}{4} \)", r"\( \dfrac{5}{4} \)", r"\( -\dfrac{4}{5} \)"], 0,
         r"\( \cos\theta = \sqrt{1 - \sin^2\theta} = \sqrt{1 - 9/25} = \sqrt{16/25} = \dfrac{4}{5} \)."),

        (r"ما قيمة \( \tan 135^\circ \)؟<br><em>What is \( \tan 135^\circ \)?</em>",
         ["-1", "1", "0", r"\( -\sqrt{3} \)"], 0,
         r"في الربع الثاني الظل سالب: \( \tan 135^\circ = -\tan 45^\circ = -1 \)."),

        (r"ما طول دورة الدالة \( y = \cos(4x) \) بالراديان؟<br><em>Period of \( y = \cos(4x) \) in radians?</em>",
         [r"\( \dfrac{\pi}{2} \)", r"\( \pi \)", r"\( 2\pi \)", r"\( \dfrac{\pi}{4} \)"], 0,
         r"طول الدورة \( = \dfrac{2\pi}{|B|} = \dfrac{2\pi}{4} = \dfrac{\pi}{2} \)."),

        ("ما مساحة المثلث الذي فيه طولا ضلعين 8 سم و 10 سم وقياس الزاوية المحصورة بينهما 30°؟<br><em>Triangle area with sides 8, 10 and included angle 30°?</em>",
         ["20 سم²", "40 سم²", "20√3 سم²", "10 سم²"], 0,
         r"\( \text{المساحة} = \dfrac{1}{2} a b \sin C = \dfrac{1}{2} (8)(10) \sin 30^\circ = 40 \times \dfrac{1}{2} = 20 \) سم²."),

        (r"ما متطابقة ضعف الزاوية لـ \( \sin 2\theta \)؟<br><em>Double angle identity for \( \sin 2\theta \)?</em>",
         [r"\( 2\sin\theta\cos\theta \)", r"\( \cos^2\theta - \sin^2\theta \)", r"\( 2\sin^2\theta \)", r"\( \sin\theta\cos\theta \)"], 0,
         r"متطابقة ضعف زاوية الجيب: \( \sin 2\theta = 2\sin\theta\cos\theta \)."),

        (r"ما قيمة \( \cos^2 15^\circ - \sin^2 15^\circ \)؟<br><em>Evaluate \( \cos^2 15^\circ - \sin^2 15^\circ \).</em>",
         [r"\( \dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{\sqrt{2}}{2} \)", "1"], 0,
         r"متطابقة ضعف الزاوية لجيب التمام: \( \cos(2 \times 15^\circ) = \cos 30^\circ = \dfrac{\sqrt{3}}{2} \)."),

        (r"ما قيمة المقدار \( 2\sin 15^\circ \cos 15^\circ \)؟<br><em>Evaluate \( 2\sin 15^\circ \cos 15^\circ \).</em>",
         [r"\( \dfrac{1}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{\sqrt{2}}{2} \)", "1"], 0,
         r"\( \sin(2 \times 15^\circ) = \sin 30^\circ = \dfrac{1}{2} \)."),

        (r"إذا كان \( \cos\theta = \dfrac{1}{3} \)، فما قيمة \( \cos 2\theta \)؟<br><em>Find \( \cos 2\theta \) if \( \cos\theta = 1/3 \).</em>",
         [r"\( -\dfrac{7}{9} \)", r"\( \dfrac{7}{9} \)", r"\( -\dfrac{1}{9} \)", r"\( \dfrac{2}{3} \)"], 0,
         r"\( \cos 2\theta = 2\cos^2\theta - 1 = 2(1/9) - 1 = \dfrac{2}{9} - 1 = -\dfrac{7}{9} \)."),

        (r"في مثلث ABC، إذا كان \( a = 6 \) و \( \sin A = \dfrac{1}{2} \) و \( \sin B = \dfrac{1}{3} \)، فما طول الضلع \( b \) حسب قانون الجيوب؟<br><em>Find side b using Law of Sines.</em>",
         ["4", "6", "8", "9"], 0,
         r"\( \dfrac{a}{\sin A} = \dfrac{b}{\sin B} \implies \dfrac{6}{1/2} = \dfrac{b}{1/3} \implies 12 = 3b \implies b = 4 \)."),

        (r"ما قيمة \( \cos 240^\circ \)؟<br><em>What is \( \cos 240^\circ \)?</em>",
         [r"\( -\dfrac{1}{2} \)", r"\( \dfrac{1}{2} \)", r"\( -\dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)"], 0,
         r"الزاوية في الربع الثالث وزاوية إسنادها 60°: \( \cos 240^\circ = -\cos 60^\circ = -\dfrac{1}{2} \)."),

        (r"ما زاوية الإسناد للزاوية \( 315^\circ \)؟<br><em>Reference angle for \( 315^\circ \)?</em>",
         ["45°", "30°", "60°", "15°"], 0,
         r"في الربع الرابع: \( \theta' = 360^\circ - 315^\circ = 45^\circ \)."),

        (r"ما قيمة \( \sin(-30^\circ) \)؟<br><em>Evaluate \( \sin(-30^\circ) \).</em>",
         [r"\( -\dfrac{1}{2} \)", r"\( \dfrac{1}{2} \)", r"\( -\dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)"], 0,
         r"دالة الجيب فردية: \( \sin(-\theta) = -\sin\theta \implies -\sin 30^\circ = -\dfrac{1}{2} \)."),

        (r"ما قيمة \( \cos(-60^\circ) \)؟<br><em>Evaluate \( \cos(-60^\circ) \).</em>",
         [r"\( \dfrac{1}{2} \)", r"\( -\dfrac{1}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)", r"\( -\dfrac{\sqrt{3}}{2} \)"], 0,
         r"دالة جيب التمام زوجية: \( \cos(-\theta) = \cos\theta \implies \cos 60^\circ = \dfrac{1}{2} \)."),

        (r"ما تبسيط المقدار \( \dfrac{\sin\theta}{\cos\theta} + \dfrac{\cos\theta}{\sin\theta} \)؟<br><em>Simplify \( \tan\theta + \cot\theta \).</em>",
         [r"\( \sec\theta\csc\theta \)", "1", r"\( 2\sin\theta \)", r"\( \sin\theta\cos\theta \)"], 0,
         r"\( \dfrac{\sin^2\theta + \cos^2\theta}{\sin\theta\cos\theta} = \dfrac{1}{\sin\theta\cos\theta} = \sec\theta\csc\theta \)."),

        (r"إذا كانت \( \tan\theta = \dfrac{4}{3} \) في الربع الثالث، فما قيمة \( \sin\theta \)؟<br><em>Find \( \sin\theta \) if \( \tan\theta = 4/3 \) in quadrant III.</em>",
         [r"\( -\dfrac{4}{5} \)", r"\( \dfrac{4}{5} \)", r"\( -\dfrac{3}{5} \)", r"\( \dfrac{3}{5} \)"], 0,
         r"في الربع الثالث الجيب سالب: المثلث 3-4-5 يعطي الوتر 5، إذن \( \sin\theta = -\dfrac{4}{5} \)."),

        (r"ما حل المعادلة المثلثية \( 2\sin\theta - 1 = 0 \) في الفترة \( [0^\circ, 90^\circ] \)؟<br><em>Solve \( 2\sin\theta - 1 = 0 \) for acute angle.</em>",
         ["30°", "45°", "60°", "90°"], 0,
         r"\( \sin\theta = \dfrac{1}{2} \implies \theta = 30^\circ \)."),

        (r"ما قيمة \( \arccos\left(\dfrac{\sqrt{3}}{2}\right) \) بالراديان؟<br><em>Value of \( \arccos(\sqrt{3}/2) \)?</em>",
         [r"\( \dfrac{\pi}{6} \)", r"\( \dfrac{\pi}{3} \)", r"\( \dfrac{\pi}{4} \)", r"\( \dfrac{\pi}{2} \)"], 0,
         r"الزاوية التي جيب تمامها \( \sqrt{3}/2 \) في الفترة \( [0, \pi] \) هي 30° أي \( \dfrac{\pi}{6} \)."),

        ("في مثلث، أطوال أضلاعه 5 سم و 6 سم و 7 سم. ما قيمة جيب تمام الزاوية المقابلة للضلع 7 سم؟<br><em>Cos of angle opposite to side 7 by Law of Cosines?</em>",
         [r"\( \dfrac{1}{5} \)", r"\( \dfrac{2}{5} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{3}{5} \)"], 0,
         r"قانون جيب التمام: \( 7^2 = 5^2 + 6^2 - 2(5)(6)\cos\theta \implies 49 = 25 + 36 - 60\cos\theta \implies 49 = 61 - 60\cos\theta \implies 60\cos\theta = 12 \implies \cos\theta = \dfrac{12}{60} = \dfrac{1}{5} \)."),

        (r"ما تبسيط العبارة: \( \sin(\pi - \theta) \)؟<br><em>Simplify \( \sin(\pi - \theta) \).</em>",
         [r"\( \sin\theta \)", r"\( -\sin\theta \)", r"\( \cos\theta \)", r"\( -\cos\theta \)"], 0,
         r"في الربع الثاني، الجيب موجب: \( \sin(\pi - \theta) = \sin\theta \)."),

        (r"ما تبسيط العبارة: \( \cos(\pi - \theta) \)؟<br><em>Simplify \( \cos(\pi - \theta) \).</em>",
         [r"\( -\cos\theta \)", r"\( \cos\theta \)", r"\( \sin\theta \)", r"\( -\sin\theta \)"], 0,
         r"في الربع الثاني، جيب التمام سالب: \( \cos(\pi - \theta) = -\cos\theta \)."),

        (r"ما طول القوس المقابل لزاوية مركزية قياسها \( \dfrac{\pi}{4} \) في دائرة نصف قطرها 8 سم؟<br><em>Arc length for central angle \( \pi/4 \) and radius 8?</em>",
         [r"\( 2\pi \) سم", r"\( 4\pi \) سم", r"\( \pi \) سم", r"\( 8\pi \) سم"], 0,
         r"طول القوس \( s = r \theta = 8 \times \dfrac{\pi}{4} = 2\pi \) سم."),

        (r"ما مساحة قطاع دائري زاويته المركزية \( \dfrac{\pi}{3} \) في دائرة نصف قطرها 6 سم؟<br><em>Sector area for angle \( \pi/3 \) and radius 6?</em>",
         [r"\( 6\pi \) سم²", r"\( 12\pi \) سم²", r"\( 3\pi \) سم²", r"\( 18\pi \) سم²"], 0,
         r"\( A = \dfrac{1}{2} r^2 \theta = \dfrac{1}{2} (36) \left(\dfrac{\pi}{3}\right) = 6\pi \) سم²."),

        (r"ما القيمة العظمى للدالة \( y = 4\cos(3x) - 1 \)؟<br><em>Maximum value of \( y = 4\cos(3x) - 1 \)?</em>",
         ["3", "4", "5", "2"], 0,
         r"القيمة العظمى لجيب التمام هي 1: \( 4(1) - 1 = 3 \)."),

        (r"ما القيمة الصغرى للدالة \( y = 4\cos(3x) - 1 \)؟<br><em>Minimum value of \( y = 4\cos(3x) - 1 \)?</em>",
         ["-5", "-3", "-4", "-1"], 0,
         r"القيمة الصغرى لجيب التمام هي -1: \( 4(-1) - 1 = -5 \)."),

        (r"ما حل المعادلة \( \cos\theta = 0 \) في الفترة \( [0, 2\pi) \)؟<br><em>Solve \( \cos\theta = 0 \) in \( [0, 2\pi) \).</em>",
         [r"\( \dfrac{\pi}{2}, \dfrac{3\pi}{2} \)", r"\( 0, \pi \)", r"\( \dfrac{\pi}{4}, \dfrac{3\pi}{4} \)", r"\( \pi, 2\pi \)"], 0,
         r"ينعدم جيب التمام عند الزوايا الربيعية الرأسية: 90° و 270° أي \( \pi/2 \) و \( 3\pi/2 \)."),

        (r"ما تبسيط المقدار \( (1 - \cos\theta)(1 + \cos\theta) \)؟<br><em>Simplify \( (1 - \cos\theta)(1 + \cos\theta) \).</em>",
         [r"\( \sin^2\theta \)", r"\( \cos^2\theta \)", r"\( \tan^2\theta \)", "1"], 0,
         r"فرق بين مربعين: \( 1 - \cos^2\theta = \sin^2\theta \)."),

        (r"ما قيمة \( \arctan(1) \) بالراديان؟<br><em>Value of \( \arctan(1) \) in radians?</em>",
         [r"\( \dfrac{\pi}{4} \)", r"\( \dfrac{\pi}{2} \)", r"\( \dfrac{\pi}{3} \)", r"\( \dfrac{\pi}{6} \)"], 0,
         r"الزاوية في الفترة \( (-\pi/2, \pi/2) \) التي ظلها 1 هي 45° أي \( \pi/4 \)."),

        (r"إذا كان \( \sin\theta = -\dfrac{1}{2} \) و \( \cos\theta > 0 \)، ففي أي ربع تقع الزاوية \( \theta \)؟<br><em>Which quadrant if \( \sin < 0 \) and \( \cos > 0 \)?</em>",
         ["الربع الرابع", "الربع الأول", "الربع الثاني", "الربع الثالث"], 0,
         r"الجيب سالب وجيب التمام موجب في الربع الرابع.")
    ]
    for text, ch, ans, sol in med_data:
        qs.append(make_q(d, "medium", text, ch, ans, sol))

    # ================= HARD (35 items) =================
    hard_data = [
        (r"ما القيمة الدقيقة لـ \( \sin 75^\circ \)؟<br><em>Exact value of \( \sin 75^\circ \)?</em>",
         [r"\( \dfrac{\sqrt{6} + \sqrt{2}}{4} \)", r"\( \dfrac{\sqrt{6} - \sqrt{2}}{4} \)", r"\( \dfrac{\sqrt{3} + 1}{2} \)", r"\( \dfrac{\sqrt{2} + 1}{2} \)"], 0,
         r"\( \sin(45^\circ + 30^\circ) = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ = \left(\dfrac{\sqrt{2}}{2}\right)\left(\dfrac{\sqrt{3}}{2}\right) + \left(\dfrac{\sqrt{2}}{2}\right)\left(\dfrac{1}{2}\right) = \dfrac{\sqrt{6} + \sqrt{2}}{4} \)."),

        (r"ما القيمة الدقيقة لـ \( \cos 15^\circ \)؟<br><em>Exact value of \( \cos 15^\circ \)?</em>",
         [r"\( \dfrac{\sqrt{6} + \sqrt{2}}{4} \)", r"\( \dfrac{\sqrt{6} - \sqrt{2}}{4} \)", r"\( \dfrac{\sqrt{3} - 1}{2} \)", r"\( \dfrac{1}{2} \)"], 0,
         r"\( \cos 15^\circ = \sin(90^\circ - 15^\circ) = \sin 75^\circ = \dfrac{\sqrt{6} + \sqrt{2}}{4} \)."),

        (r"ما القيمة الدقيقة لـ \( \sin 15^\circ \)؟<br><em>Exact value of \( \sin 15^\circ \)?</em>",
         [r"\( \dfrac{\sqrt{6} - \sqrt{2}}{4} \)", r"\( \dfrac{\sqrt{6} + \sqrt{2}}{4} \)", r"\( \dfrac{\sqrt{3} - 1}{4} \)", r"\( \dfrac{\sqrt{2}}{4} \)"], 0,
         r"\( \sin(45^\circ - 30^\circ) = \dfrac{\sqrt{6} - \sqrt{2}}{4} \)."),

        (r"ما تبسيط العبارة \( \dfrac{\sin 2\theta}{1 + \cos 2\theta} \)؟<br><em>Simplify \( \dfrac{\sin 2\theta}{1 + \cos 2\theta} \).</em>",
         [r"\( \tan\theta \)", r"\( \cot\theta \)", r"\( \sin\theta \)", r"\( \cos\theta \)"], 0,
         r"\( \dfrac{2\sin\theta\cos\theta}{1 + (2\cos^2\theta - 1)} = \dfrac{2\sin\theta\cos\theta}{2\cos^2\theta} = \dfrac{\sin\theta}{\cos\theta} = \tan\theta \)."),

        (r"ما تبسيط المقدار \( \dfrac{1 - \cos 2\theta}{\sin 2\theta} \)؟<br><em>Simplify \( \dfrac{1 - \cos 2\theta}{\sin 2\theta} \).</em>",
         [r"\( \tan\theta \)", r"\( \cot\theta \)", r"\( \sec\theta \)", r"\( \csc\theta \)"], 0,
         r"\( \dfrac{1 - (1 - 2\sin^2\theta)}{2\sin\theta\cos\theta} = \dfrac{2\sin^2\theta}{2\sin\theta\cos\theta} = \tan\theta \)."),

        (r"إذا كان \( \cos\theta = -\dfrac{3}{5} \) وكانت \( \theta \) في الربع الثاني، فما قيمة \( \sin 2\theta \)؟<br><em>Find \( \sin 2\theta \) if \( \cos\theta = -3/5 \) in quadrant II.</em>",
         [r"\( -\dfrac{24}{25} \)", r"\( \dfrac{24}{25} \)", r"\( -\dfrac{7}{25} \)", r"\( \dfrac{7}{25} \)"], 0,
         r"في الربع الثاني: \( \sin\theta = \dfrac{4}{5} \). إذن \( \sin 2\theta = 2\sin\theta\cos\theta = 2(4/5)(-3/5) = -\dfrac{24}{25} \)."),

        (r"إذا كان \( \cos\theta = -\dfrac{3}{5} \) في الربع الثاني، فما قيمة \( \cos 2\theta \)؟<br><em>Find \( \cos 2\theta \).</em>",
         [r"\( -\dfrac{7}{25} \)", r"\( \dfrac{7}{25} \)", r"\( -\dfrac{24}{25} \)", r"\( \dfrac{24}{25} \)"], 0,
         r"\( \cos 2\theta = 2\cos^2\theta - 1 = 2(9/25) - 1 = \dfrac{18}{25} - 1 = -\dfrac{7}{25} \)."),

        (r"ما عدد حلول المعادلة \( \sin 2x = 0 \) في الفترة المغلقة \( [0, 2\pi] \)؟<br><em>Number of solutions of \( \sin 2x = 0 \) in \( [0, 2\pi] \)?</em>",
         ["5", "4", "3", "2"], 0,
         r"\( 2x \in [0, 4\pi] \). \( 2x = 0, \pi, 2\pi, 3\pi, 4\pi \implies x = 0, \dfrac{\pi}{2}, \pi, \dfrac{3\pi}{2}, 2\pi \). عدد الحلول هو 5 حلول."),

        (r"ما قيمة \( \tan 75^\circ \)؟<br><em>Exact value of \( \tan 75^\circ \)?</em>",
         [r"\( 2 + \sqrt{3} \)", r"\( 2 - \sqrt{3} \)", r"\( \sqrt{3} + 1 \)", r"\( \sqrt{3} - 1 \)"], 0,
         r"\( \tan(45^\circ + 30^\circ) = \dfrac{1 + 1/\sqrt{3}}{1 - 1/\sqrt{3}} = \dfrac{\sqrt{3}+1}{\sqrt{3}-1} = \dfrac{(\sqrt{3}+1)^2}{2} = \dfrac{4+2\sqrt{3}}{2} = 2 + \sqrt{3} \)."),

        (r"ما قيمة المقدار \( \cos 70^\circ \cos 20^\circ - \sin 70^\circ \sin 20^\circ \)؟<br><em>Evaluate using sum identity.</em>",
         ["0", "1", r"\( \dfrac{1}{2} \)", r"\( \dfrac{\sqrt{3}}{2} \)"], 0,
         r"متطابقة جيب التمام لمجموع زاويتين: \( \cos(70^\circ + 20^\circ) = \cos 90^\circ = 0 \)."),

        (r"ما قيمة المقدار \( \sin 40^\circ \cos 20^\circ + \cos 40^\circ \sin 20^\circ \)؟<br><em>Evaluate using sum identity.</em>",
         [r"\( \dfrac{\sqrt{3}}{2} \)", r"\( \dfrac{1}{2} \)", "0", "1"], 0,
         r"متطابقة الجيب لمجموع زاويتين: \( \sin(40^\circ + 20^\circ) = \sin 60^\circ = \dfrac{\sqrt{3}}{2} \)."),

        (r"إذا كان \( \tan\theta = 2 \)، فما قيمة \( \tan 2\theta \)؟<br><em>Find \( \tan 2\theta \) if \( \tan\theta = 2 \).</em>",
         [r"\( -\dfrac{4}{3} \)", r"\( \dfrac{4}{3} \)", r"\( -\dfrac{3}{4} \)", "4"], 0,
         r"\( \tan 2\theta = \dfrac{2\tan\theta}{1 - \tan^2\theta} = \dfrac{2(2)}{1 - 4} = -\dfrac{4}{3} \)."),

        (r"ما قيمة المقدار \( \cos^4\theta - \sin^4\theta \)؟<br><em>Simplify \( \cos^4\theta - \sin^4\theta \).</em>",
         [r"\( \cos 2\theta \)", r"\( \sin 2\theta \)", "1", r"\( \cos^2\theta \)"], 0,
         r"فرق بين مربعين: \( (\cos^2\theta - \sin^2\theta)(\cos^2\theta + \sin^2\theta) = (\cos 2\theta)(1) = \cos 2\theta \)."),

        (r"في مثلث ABC، إذا كانت الزاوية C قائمة (\( 90^\circ \))، فما قيمة \( \cos(A + B) \)؟<br><em>Find \( \cos(A + B) \) in right triangle.</em>",
         ["0", "1", "-1", r"\( \dfrac{1}{2} \)"], 0,
         r"بما أن مجموع زوايا المثلث 180° و C = 90°، فإن \( A + B = 90^\circ \). إذن \( \cos(90^\circ) = 0 \)."),

        (r"في نفس المثلث السابق، ما قيمة \( \sin(A + B) \)؟<br><em>Find \( \sin(A + B) \).</em>",
         ["1", "0", "-1", r"\( \dfrac{1}{2} \)"], 0,
         r"\( \sin(90^\circ) = 1 \)."),

        (r"ما مجموعة حل المعادلة \( \sin^2 x - 1 = 0 \) في الفترة \( [0, 2\pi) \)؟<br><em>Solve \( \sin^2 x - 1 = 0 \) in \( [0, 2\pi) \).</em>",
         [r"\( \dfrac{\pi}{2}, \dfrac{3\pi}{2} \)", r"\( 0, \pi \)", r"\( \dfrac{\pi}{4}, \dfrac{5\pi}{4} \)", r"\( \pi \)"], 0,
         r"\( \sin^2 x = 1 \implies \sin x = \pm 1 \implies x = \dfrac{\pi}{2}, \dfrac{3\pi}{2} \)."),

        (r"ما تبسيط العبارة \( (\sec\theta - \tan\theta)(\sec\theta + \tan\theta) \)؟<br><em>Simplify \( (\sec\theta - \tan\theta)(\sec\theta + \tan\theta) \).</em>",
         ["1", "0", r"\( \sec^2\theta \)", r"\( 2\tan\theta \)"], 0,
         r"\( \sec^2\theta - \tan^2\theta = 1 \) متطابقة فيثاغورسية شهيرة."),

        (r"إذا كان \( \sin\theta + \cos\theta = 1 \)، فما قيمة \( \sin 2\theta \)؟<br><em>Find \( \sin 2\theta \) if \( \sin\theta + \cos\theta = 1 \).</em>",
         ["0", "1", r"\( \dfrac{1}{2} \)", "-1"], 0,
         r"بتربيع الطرفين: \( (\sin\theta+\cos\theta)^2 = 1^2 \implies \sin^2\theta + 2\sin\theta\cos\theta + \cos^2\theta = 1 \implies 1 + \sin 2\theta = 1 \implies \sin 2\theta = 0 \)."),

        (r"ما قيمة \( \sin\left(\arcsin\left(\dfrac{3}{5}\right) + \arccos\left(\dfrac{3}{5}\right)\right) \)؟<br><em>Evaluate expression with inverse functions.</em>",
         ["1", "0", r"\( \dfrac{3}{5} \)", r"\( \dfrac{4}{5} \)"], 0,
         r"لأي عدد \( x \in [-1, 1] \): \( \arcsin x + \arccos x = \dfrac{\pi}{2} \). إذن \( \sin(\pi/2) = 1 \)."),

        (r"ما القيمة العظمى للمقدار \( 3\sin x + 4\cos x \)؟<br><em>Maximum value of \( 3\sin x + 4\cos x \)?</em>",
         ["5", "7", "1", "25"], 0,
         r"القيمة العظمى للمقدار \( a\sin x + b\cos x \) هي \( \sqrt{a^2 + b^2} = \sqrt{3^2 + 4^2} = \sqrt{25} = 5 \)."),

        (r"ما القيمة الصغرى للمقدار \( 3\sin x + 4\cos x \)؟<br><em>Minimum value of \( 3\sin x + 4\cos x \)?</em>",
         ["-5", "-7", "0", "-1"], 0,
         r"القيمة الصغرى هي \( -\sqrt{a^2 + b^2} = -5 \)."),

        (r"إذا كان \( \sin\theta = \cos\theta \) وكانت \( \theta \) في الربع الثالث، فما قيمة \( \theta \) بالراديان؟<br><em>Find \( \theta \) in quadrant III such that \( \sin = \cos \).</em>",
         [r"\( \dfrac{5\pi}{4} \)", r"\( \dfrac{3\pi}{4} \)", r"\( \dfrac{7\pi}{4} \)", r"\( \dfrac{\pi}{4} \)"], 0,
         r"\( \tan\theta = 1 \). في الربع الثالث: \( \theta = 180^\circ + 45^\circ = 225^\circ = \dfrac{5\pi}{4} \)."),

        (r"ما تبسيط العبارة \( \cos\left(\dfrac{\pi}{2} - \theta\right) \)؟<br><em>Simplify co-function identity \( \cos(\pi/2 - \theta) \).</em>",
         [r"\( \sin\theta \)", r"\( -\sin\theta \)", r"\( \cos\theta \)", r"\( -\cos\theta \)"], 0,
         r"متطابقة الزوايا المتتامة: جيب تمام متممة الزاوية يساوي جيب الزاوية: \( \cos(\pi/2 - \theta) = \sin\theta \)."),

        (r"ما تبسيط العبارة \( \cot\left(\dfrac{\pi}{2} - \theta\right) \)؟<br><em>Simplify \( \cot(\pi/2 - \theta) \).</em>",
         [r"\( \tan\theta \)", r"\( \cot\theta \)", r"\( -\tan\theta \)", r"\( \sec\theta \)"], 0,
         r"متطابقة الدوال المتممة: \( \cot(\pi/2 - \theta) = \tan\theta \)."),

        ("إذا كان طولا ضلعين في مثلث هما 3 سم و 4 سم، وكانت مساحته 6 سم²، فما قياس الزاوية المحصورة بينهما؟<br><em>Angle between sides 3 and 4 if area is 6?</em>",
         ["90°", "30°", "45°", "60°"], 0,
         r"\( \text{المساحة} = \dfrac{1}{2}(3)(4)\sin\theta = 6\sin\theta = 6 \implies \sin\theta = 1 \implies \theta = 90^\circ \)."),

        (r"ما قيمة \( \tan(-45^\circ) \)؟<br><em>Evaluate \( \tan(-45^\circ) \).</em>",
         ["-1", "1", "0", "غير معرّف"], 0,
         r"دالة الظل فردية: \( \tan(-\theta) = -\tan\theta \implies -\tan 45^\circ = -1 \)."),

        (r"ما قيمة المقدار \( \cos^2 10^\circ + \cos^2 80^\circ \)؟<br><em>Evaluate using complementary angles.</em>",
         ["1", "0", "2", r"\( \dfrac{1}{2} \)"], 0,
         r"بما أن 80° متممة 10°، فإن \( \cos 80^\circ = \sin 10^\circ \). المقدار يصبح \( \cos^2 10^\circ + \sin^2 10^\circ = 1 \)."),

        (r"ما قيمة المقدار \( \sin^2 20^\circ + \sin^2 70^\circ \)؟<br><em>Evaluate \( \sin^2 20^\circ + \sin^2 70^\circ \).</em>",
         ["1", "0", "2", r"\( \dfrac{1}{2} \)"], 0,
         r"\( \sin 70^\circ = \cos 20^\circ \implies \sin^2 20^\circ + \cos^2 20^\circ = 1 \)."),

        (r"إذا كان \( \cos\theta = \dfrac{1}{2} \) و \( \theta \in [0, 2\pi) \)، فما هما الحلان الممكنان؟<br><em>Two solutions for \( \cos\theta = 1/2 \) in \( [0, 2\pi) \)?</em>",
         [r"\( \dfrac{\pi}{3}, \dfrac{5\pi}{3} \)", r"\( \dfrac{\pi}{6}, \dfrac{11\pi}{6} \)", r"\( \dfrac{\pi}{3}, \dfrac{2\pi}{3} \)", r"\( \dfrac{\pi}{6}, \dfrac{5\pi}{6} \)"], 0,
         r"جيب التمام موجب في الربعين الأول والرابع: 60° (\( \pi/3 \)) و 300° (\( 5\pi/3 \))."),

        (r"ما قيمة \( \cos 180^\circ \)؟<br><em>What is \( \cos 180^\circ \)?</em>",
         ["-1", "1", "0", "غير معرّف"], 0,
         r"على دائرة الوحدة، النقطة المقابلة لـ 180° هي \( (-1, 0) \)، لذا \( \cos 180^\circ = -1 \)."),

        (r"ما قيمة \( \sin 180^\circ \)؟<br><em>What is \( \sin 180^\circ \)?</em>",
         ["0", "1", "-1", r"\( \dfrac{1}{2} \)"], 0,
         r"الإحداثي الصادي عند 180° هو 0، لذا \( \sin 180^\circ = 0 \)."),

        (r"ما هو مجال دالة الظل \( y = \tan x \)؟<br><em>Domain of \( y = \tan x \)?</em>",
         [r"\( \mathbb{R} \setminus \left\{\dfrac{\pi}{2} + k\pi\right\} \)", r"\( \mathbb{R} \)", r"\( \mathbb{R} \setminus \{k\pi\} \)", r"\( [-1, 1] \)"], 0,
         r"دالة الظل غير معرّفة عند أصفار جيب التمام، وهي المضاعفات الفردية لـ \( \pi/2 \): \( x \neq \dfrac{\pi}{2} + k\pi \)."),

        (r"ما هو مدى دالة الجيب \( y = \sin x \)؟<br><em>Range of sine function?</em>",
         [r"\( [-1, 1] \)", r"\( (-\infty, \infty) \)", r"\( [0, 1] \)", r"\( (-1, 1) \)"], 0,
         r"قيم الجيب محصورة دائمًا بين \( -1 \) و \( 1 \): \( [-1, 1] \)."),

        (r"ما هو مدى دالة الظل \( y = \tan x \)؟<br><em>Range of tangent function?</em>",
         [r"\( (-\infty, \infty) \) (جميع الأعداد الحقيقية)", r"\( [-1, 1] \)", r"\( [0, \infty) \)", r"\( \mathbb{R} \setminus \{0\} \)"], 0,
         r"دالة الظل تمتد من \( -\infty \) إلى \( +\infty \)، فمداها هو كامل مجموعة الأعداد الحقيقية \( \mathbb{R} \)."),

        ("إذا كان محيط دائرة 24 سم، فما طول القوس المقابل لزاوية مركزية قياسها 60°؟<br><em>Arc length for central angle 60° in circle with circumference 24?</em>",
         ["4 سم", "6 سم", "8 سم", "12 سم"], 0,
         r"الزاوية 60° تمثل سدس الدورة الكاملة (\( 60/360 = 1/6 \)). طول القوس \( = \dfrac{1}{6} \times 24 = 4 \) سم.")
    ]
    for text, ch, ans, sol in hard_data:
        qs.append(make_q(d, "hard", text, ch, ans, sol))

    return qs

if __name__ == "__main__":
    qs = get_questions()
    from collections import Counter
    print("Trigonometry generated:", Counter(q['difficulty'] for q in qs))
