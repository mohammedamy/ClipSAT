#!/usr/bin/env node
'use strict';

/**
 * scripts/upgrade_all_explorers_parity.js
 *
 * 1. Upgrades the 9 incomplete `_mountBespokeExplorer` calls in
 *    `src/scripts/explorers/{act2l2,appc,apstats,est2l2,ibsl}.js` so they include
 *    valid `mode`, `v0Id`/`v1Id`, `s0Val`/`s1Val`, `s0Step`/`s1Step`, `dataBtnId`/
 *    `dataPanelId`/`dataDescId`/`dataRowsId`, `btn3dId`/`wrap3dId`/`hint3dId`,
 *    bilingual `challengePrompt`, and `checkFn`.
 * 2. Populates 100% Arabic (`ar`) translations for all 106 `challengePrompt` objects
 *    across all 20 explorer files in `src/scripts/explorers/*.js`.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EX_DIR = path.join(ROOT, 'src', 'scripts', 'explorers');

const CHALLENGE_AR_MAP = {
  "Adjust P₃ and P₅ so the combined A2 total reaches the A* threshold (≥ 108 / 125).":
    "اضبط درجتي الورقتين P₃ وP₅ بحيث يصل المجموع الكلي لمستوى A2 إلى عتبة التقدير A* (≥ 108 / 125).",
  "Set residues A and B so that the horizontal numerator x-coefficient (A + B) equals 0.":
    "اضبط قيمتي الباقيين A وB بحيث يصبح معامل x في البسط (A + B) مساوياً للصفر.",
  "Position z = a + bi in the first quadrant with modulus |z| = 5.0 (e.g. a = 3, b = 4).":
    "ضع العدد المركب z = a + bi في الربع الأول بحيث يكون المقياس |z| = 5.0 (مثلاً a = 3 وb = 4).",
  "Adjust upper bound b until the shaded cumulative probability P(X ≤ b) equals the median (0.50 ± 0.03).":
    "اضبط الحد الأعلى b حتى يتساوى الاحتمال التراكمي المظلل P(X ≤ b) مع الوسيط (0.50 ± 0.03).",
  "Set y(0) above the equilibrium y = 4.0 to observe a strictly decreasing solution curve approaching y = 4.":
    "اجعل القيمة الابتدائية y(0) أعلى من نقطة التوازن y = 4.0 لملاحظة منحنى الحل المتناقص نحو y = 4.",
  "Adjust m and c so the V-vertex (−c/m, 0) lands exactly at (2.0, 0).":
    "اضبط الميل m والمقطع c بحيث يقع رأس دالة القيمة المطلقة (−c/m, 0) تماماً عند (2.0, 0).",
  "Move z_obs into the critical rejection region (|z_obs| > z_crit) with z_crit ≥ 2.0.":
    "حرّك إحصائية الاختبار z_obs إلى منطقة الرفض الحرجة (|z_obs| > z_crit) مع z_crit ≥ 2.0.",
  "Increase strip count n to at least 10 with b = 4.0 to reduce the trapezium error below 1%.":
    "زد عدد أشباه المنحرف n إلى 10 على الأقل عند b = 4.0 لتقليل خطأ قاعدة شبه المنحرف إلى أقل من 1%.",
  "Set c = 4.0 and starting guess x₀ = 0.6 to watch the staircase converge to α ≈ 2.56.":
    "اضبط c = 4.0 والتخمين الابتدائي x₀ = 0.6 لمشاهدة تقارب مسار النقطة الثابتة نحو الجذر α ≈ 2.56.",
  "Increase rate λ to 6.0 or higher to observe the Poisson PMF become nearly symmetric and bell-shaped.":
    "ارفع المعدل λ إلى 6.0 أو أكثر لملاحظة تحول توزيع بواسون إلى شكل متماثل يشبه الجرس.",
  "Increase sample size n to at least 48 so the standard error σ/√n drops below 0.30.":
    "زد حجم العينة n إلى 48 على الأقل حتى ينخفض الخطأ المعياري σ/√n إلى أقل من 0.30.",
  "Set exponent p = −1.0 and degree N ≥ 5 to approximate 1/(1+x) closely across (−0.7, 0.7).":
    "اضبط الأس p = −1.0 والدرجة N ≥ 5 لتقريب الدالة 1/(1+x) بدقة عبر الفترة (−0.7, 0.7).",
  "Set a = 3.0 and b = 4.0 to achieve an exact Pythagorean harmonic amplitude R = 5.00.":
    "اضبط المعاملين a = 3.0 وb = 4.0 للحصول على السعة التوافقية الفيثاغورسية الدقيقة R = 5.00.",
  "Achieve a projected scaled score of 32 or higher by reaching at least 44 raw points.":
    "حقق درجة معيارية متوقعة 32 أو أعلى بالوصول إلى 44 نقطة خام على الأقل.",
  "Adjust slope m and intercept k so the line is tangent to the parabola (Δ = 0, e.g. m = 2, k = −3).":
    "اضبط الميل m والمقطع k بحيث يمس المستقيم القطع المكافئ (المميز Δ = 0، مثلاً m = 2 وk = −3).",
  "Make the ellipse a perfect circle (e = 0.00) by setting semi-axes a and b equal.":
    "اجعل القطع الناقص دائرة تامة (الاختلاف المركزي e = 0.00) بمساواة نصفي المحورين a وb.",
  "Find a pair (a, b) with gcd(a, b) = 12 and lcm(a, b) = 72.":
    "أوجد زوجاً من الأعداد (a, b) يحقق القاسم المشترك الأكبر gcd(a, b) = 12 والمضاعف المشترك الأصغر lcm(a, b) = 72.",
  "Move the hole h to x = 1.0 so it coincides with the numerator zero.":
    "حرّك الفجوة القابلة للإزالة h إلى x = 1.0 لتتطابق مع صفر البسط.",
  "Set n = 10 and p = 0.50 to produce a symmetric binomial distribution with mean μ = 5.0.":
    "اضبط n = 10 وp = 0.50 لإنتاج توزيع ذي حدين متماثل بمتوسط μ = 5.0.",
  "Reach a total raw score of at least 42/50 to enter the top 34–36 scaled score tier.":
    "صل إلى مجموع خام لا يقل عن 42/50 لدخول الفئة العليا للدرجات المعيارية (34–36).",
  "Adjust h and k so that f(x) and f⁻¹(x) intersect on the line y = x near (0, 0).":
    "اضبط h وk بحيث تتقاطع الدالة f(x) ومعكوسها f⁻¹(x) على المستقيم y = x بالقرب من (0, 0).",
  "Tighten tolerance ε to 0.30 or less at a = 1.5 to verify local continuity.":
    "قلّص هامش التسامح ε إلى 0.30 أو أقل عند a = 1.5 للتحقق من الاتصال المحلي.",
  "Set ratio r negative (e.g. r = −0.5) to observe alternating partial sums oscillating toward S_∞.":
    "اجعل الأساس r سالباً (مثلاً r = −0.5) لملاحظة تذبذب المجاميع الجزئية المتناوبة نحو المجموع اللانهائي S_∞.",
  "Adjust the sliders to explore Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability.":
    "حرّك منزلقات التحكم لاستكشاف القطوع المخروطية والهندسة الإحداثية ثلاثية الأبعاد والتوافيق والاحتمالات.",
  "Shift the vertex to x = 1.0 by choosing matching parameters a and c.":
    "انقل رأس القطع إلى x = 1.0 باختيار قيم متوافقة للمعاملين a وc.",
  "Set entry a₁₁ = −1.5 to reverse orientation (det(A) < 0) and observe the flipped parallelogram.":
    "اضبط العنصر a₁₁ = −1.5 لعكس الاتجاه الهندسي (det(A) < 0) وملاحظة انعكاس متوازي الأضلاع.",
  "Adjust b so the line intersects both the upper solid radical curve and the lower dashed branch.":
    "اضبط b بحيث يقطع المستقيم كلاً من الفرع العلوي المتصل لمنحنى الجذر والفرع السفلي المتقطع.",
  "Set a₁ = 3.0 and r = 0.50 so the infinite sum S_∞ equals exactly 6.00.":
    "اضبط الحد الأول a₁ = 3.0 والأساس r = 0.50 ليصبح مجموع المتسلسلة اللانهائية S_∞ مساوياً لـ 6.00 تماماً.",
  "Set z = 2.00 to verify the ~95% symmetric empirical interval P(|Z| ≤ 2) ≈ 0.9545.":
    "اضبط الدرجة المعيارية z = 2.00 للتحقق من فترة الـ 95% التجريبية المتماثلة P(|Z| ≤ 2) ≈ 0.9545.",
  "Choose an even degree (n = 2 or 4) with a negative leading coefficient (a < 0) so both ends fall to −∞.":
    "اختر درجة زوجية (n = 2 أو 4) مع معامل رئيسي سالب (a < 0) بحيث يتجه طرفا المنحنى نحو −∞.",
  "Set r₁ and r₂ to opposite numbers (r₁ = −r₂) to create a difference of squares x² − r² with b = 0.":
    "اضبط الجذرين r₁ وr₂ على عددين متعاكسين (r₁ = −r₂) لتكوين فرق بين مربعين x² − r² مع b = 0.",
  "Shift a = 4.0 so the radical graph starts at (−4, 0) and passes through (0, 2).":
    "اضبط الإزاحة a = 4.0 بحيث يبدأ منحنى الدالة الجذرية عند (−4, 0) ويمر بالنقطة (0, 2).",
  "Place the vertical asymptote at x = −2.0 and the removable hole at x = 2.0.":
    "ضع خط التقارب الرأسي عند x = −2.0 والفجوة القابلة للإزالة عند x = 2.0.",
  "Adjust a₁ and r so the 8th partial sum S₈ exceeds 6.0.":
    "اضبط الحد الأول a₁ والأساس r بحيث يتجاوز المجموع الجزئي الثامن S₈ القيمة 6.0.",
  "Pull x₇ up to 28 or higher so the Mean exceeds the Median by more than 2.0 units.":
    "اسحب القيمة المتطرفة x₇ إلى 28 أو أعلى بحيث يتجاوز المتوسط الحسابي الوسيط بأكثر من وحدتين.",
  "Find a combination of MCQ and FRQ points that secures an AP score of 5 (Composite ≥ 69/108).":
    "أوجد توليفة من نقاط الاختيار من متعدد والأسئلة المقالية تضمن تحقيق الدرجة الكاملة 5 في اختبار AP (المجموع المركب ≥ 69/108).",
  "Adjust outflow R_out so the net change over [0, 6] is approximately zero (balanced inflow & outflow).":
    "اضبط معدل التدفق الخارج R_out بحيث يكون صافي التغير عبر الفترة [0, 6] مساوياً للصفر تقريباً (توازن التدفق).",
  "Move x to a zero of f(x) to observe a horizontal tangent (local extremum) on the accumulation curve F(x).":
    "حرّك x إلى أحد أصفار الدالة f(x) لملاحظة المماس الأفقي (القيمة القصوى المحلية) على منحنى دالة التراكم F(x).",
  "Increase polynomial order N to 7 so the truncation error at x₀ = 1.5 drops below 0.02.":
    "ارفع درجة كثيرة حدود تايلور N إلى 7 حتى ينخفض خطأ البتر عند x₀ = 1.5 إلى أقل من 0.02.",
  "Advance time t₀ past 4.5 to compute the total arc length along the curved trajectory.":
    "قدّم الزمن t₀ إلى ما بعد 4.5 لحساب طول القوس الكلي على طول المسار المنحني.",
  "Start at P(0) = 0.4 and increase k ≥ 1.2 so the S-curve passes through its inflection point P = 2.":
    "ابدأ عند P(0) = 0.4 وارفع معدل النمو k ≥ 1.2 ليمر المنحنى اللوجستي بنقطة انعطافه P = 2.",
  "Move x₀ to the negative side (x₀ < 0) where the cubic curve is Concave Down (Right Slope < Left Slope).":
    "حرّك x₀ إلى الجانب السالب (x₀ < 0) حيث يكون المنحنى التكعيبي مقعراً للأسفل (ميل اليمين أقل من ميل اليسار).",
  "Adjust the sliders to explore Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem.":
    "حرّك منزلقات التحكم لاستكشاف الدوال الكسرية وسلوك الأطراف وخطوط التقارب ونظرية ذات الحدين.",
  "Adjust the sliders to explore Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions.":
    "حرّك منزلقات التحكم لاستكشاف النمذجة اللوغاريتمية والرسوم شبه اللوغاريتمية والدوال العكسية.",
  "Adjust the sliders to explore Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics.":
    "حرّك منزلقات التحكم لاستكشاف الانحدار الجيبي والدوال المثلثية العكسية والقطوع القطبية.",
  "Set z ≥ 2.20 so the two-sided p-value drops below α = 0.05 (statistically significant).":
    "اضبط إحصائية الاختبار z ≥ 2.20 حتى تنخفض القيمة الاحتمالية ثنائية الطرف عن α = 0.05 (دلالة إحصائية).",
  "Eliminate sampling bias (b = 0.0) and raise sample size n ≥ 60 for high precision & accuracy.":
    "تخلص من تحيز المعاينة (b = 0.0) وارفع حجم العينة n ≥ 60 لتحقيق دقة وموثوقية عالية.",
  "Adjust the sliders to explore Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators.":
    "حرّك منزلقات التحكم لاستكشاف توزيعات المعاينة ونظرية النهاية المركزية والتقدير النقطي.",
  "Adjust the sliders to explore Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests.":
    "حرّك منزلقات التحكم لاستكشاف الاستدلال الإحصائي للبيانات الفئوية: النسب واختبارات مربع كاي.",
  "Adjust the sliders to explore Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope.":
    "حرّك منزلقات التحكم لاستكشاف الاستدلال الإحصائي للبيانات الكمية: المتوسطات واختبار t وميل الانحدار.",
  "Reach at least 98/125 total marks to secure an 'a' grade band at AS Level.":
    "صل إلى 98/125 درجة كلية على الأقل لضمان تحقيق تقدير الفئة العليا 'a' في مستوى AS.",
  "Set r₁ = r₂ (e.g. both at 2.0) to produce a repeated root with Discriminant Δ = 0.":
    "اضبط الجذرين r₁ = r₂ (مثلاً كلاهما عند 2.0) لإنتاج جذر مكرر بمميز Δ = 0.",
  "Set n = 10 and p = 0.30 to observe E(X) = 3.0 and Var(X) = 2.10.":
    "اضبط n = 10 وp = 0.30 لملاحظة القيمة المتوقعة E(X) = 3.0 والتباين Var(X) = 2.10.",
  "Reduce spread s to 0.70 or below to see a steep ogive with a narrow Interquartile Range (IQR).":
    "قلّل معامل الانتشار s إلى 0.70 أو أقل لملاحظة منحنى تكراري متجمع صاعد حاد بمدى ربيعي (IQR) ضيق.",
  "Set skew tilt t = 0.0 so the distribution is symmetric about E(X) = 3.00.":
    "اضبط معامل الالتواء t = 0.0 ليصبح التوزيع الاحتمالي متماثلاً حول المتوسط E(X) = 3.00.",
  "Set friction μ = 0.00 (smooth slope) so 100% of potential energy converts into kinetic energy.":
    "اضبط معامل الاحتكاك μ = 0.00 (سطح أملس) لتتحول 100% من طاقة الوضع إلى طاقة حركية.",
  "Adjust m and c so the line is a tangent to the curve (Δ = 0, exactly 1 repeated root).":
    "اضبط الميل m والمقطع c ليكون المستقيم مماساً للمنحنى (المميز Δ = 0 وجذر مكرر واحد).",
  "Set incline angle θ = 30° and mass m = 4.0 kg so the downslope component mg sin θ equals 20.0 N.":
    "اضبط زاوية الميل θ = 30° والكتلة m = 4.0 kg لتصبح مركبة الوزن الموازية للسطح mg sin θ مساوية لـ 20.0 N.",
  "Set h = −1.0 and k = −1.0 so the vertex lies directly on the mirror line y = x.":
    "اضبط h = −1.0 وk = −1.0 ليقع الرأس مباشرة على مستقيم الانعكاس y = x.",
  "Set u = 2.0 m/s and a = 1.5 m/s² so final velocity reaches v = 8.0 m/s and displacement s = 20.0 m.":
    "اضبط السرعة الابتدائية u = 2.0 m/s والتسارع a = 1.5 m/s² لتصل السرعة النهائية إلى v = 8.0 m/s والإزاحة إلى s = 20.0 m.",
  "Make the two masses equal (m₁ = m₂) to place the pulley system in equilibrium (a = 0 m/s²).":
    "ساوِ بين الكتلتين (m₁ = m₂) لوضع نظام البكرة في حالة اتزان سكوني/حركي (a = 0 m/s²).",
  "Move z to −1.00 to verify symmetry Φ(−z) = 1 − Φ(z) ≈ 0.1587.":
    "حرّك z إلى −1.00 للتحقق من خاصية تماثل التوزيع الطبيعي القياسي Φ(−z) = 1 − Φ(z) ≈ 0.1587.",
  "Set n = 6 and r = 3 to see 6C3 = 20 teams vs. 6P3 = 120 ordered arrangements.":
    "اضبط n = 6 وr = 3 لمقارنة 6C3 = 20 مجموعة توافيق مقابل 6P3 = 120 ترتيباً تبادلياً.",
  "Set r = 4.0 and θ = 1.5 rad so arc length s = 6.00 and sector area A = 12.00.":
    "اضبط نصف القطر r = 4.0 والزاوية θ = 1.5 rad ليصبح طول القوس s = 6.00 ومساحة القطاع A = 12.00.",
  "Set a = 2.0 and r = 0.75 so the sum to infinity S_∞ reaches 8.00.":
    "اضبط الحد الأول a = 2.0 والأساس r = 0.75 ليصل المجموع إلى ما لا نهاية S_∞ إلى 8.00.",
  "Set P(A) = 0.50 and overlap P(A ∩ B) = 0.20 (since P(B) = 0.40) to make events A and B independent!":
    "اضبط P(A) = 0.50 والتقاطع P(A ∩ B) = 0.20 (حيث P(B) = 0.40) لجعل الحدثين A وB مستقلين إحصائياً!",
  "Move θ into Quadrant II (90° < θ < 180°) where sin θ > 0 and cos θ < 0 (S quadrant).":
    "حرّك الزاوية θ إلى الربع الثاني (90° < θ < 180°) حيث يكون sin θ > 0 وcos θ < 0.",
  "Adjust b and k so kb² ≈ π/2 (≈ 1.57), maximizing the positive integral value.":
    "اضبط b وk بحيث يصبح kb² ≈ π/2 (≈ 1.57) لتعظيم قيمة التكامل الموجبة.",
  "Achieve an estimated score of 700+ by reaching at least 48/58 total raw points.":
    "حقق درجة تقديرية 700+ بالوصول إلى 48/58 نقطة خام على الأقل.",
  "Set slope m₁ = 2.0 so the perpendicular line has slope m_⊥ = −0.50.":
    "اضبط الميل m₁ = 2.0 ليصبح ميل المستقيم العمودي m_⊥ = −0.50.",
  "Move x₀ to 1.0 where the direct line y = kx and inverse hyperbola y = k/x intersect at (1, k).":
    "حرّك x₀ إلى 1.0 حيث يتقاطع مستقيم التناسب الطردي y = kx ومنحنى التناسب العكسي y = k/x عند (1, k).",
  "Adjust growth rate r so the doubling time T₂ is under 1.50 time units.":
    "اضبط معدل النمو r بحيث يكون زمن التضاعف T₂ أقل من 1.50 وحدة زمنية.",
  "Position the vertex at (−1.0, 0) by setting m = 1.5 and c = 1.5.":
    "ضع الرأس عند النقطة (−1.0, 0) بضبط m = 1.5 وc = 1.5.",
  "Set P(S|A) = 0.80 and P(S|B) = 0.20 so the relative risk ratio equals 4.00.":
    "اضبط الاحتمال الشرطي P(S|A) = 0.80 وP(S|B) = 0.20 لتصبح نسبة الخطر النسبي مساوية لـ 4.00.",
  "Reach 42/50 raw points to project into the 740–800 score band.":
    "صل إلى 42/50 نقطة خام للوصول إلى النطاق الأعلى للدرجات (740–800).",
  "Move r₁ = −2.0 and r₂ = 2.0 to inspect the local maximum and inflection between the roots.":
    "اضبط الجذرين r₁ = −2.0 وr₂ = 2.0 لفحص القيمة العظمى المحلية ونقطة الانعطاف بين الجذرين.",
  "Set transversal angle θ = 90° so the transversal is perpendicular to both parallel lines.":
    "اضبط زاوية القاطع θ = 90° ليكون القاطع عمودياً على كلا المستقيمين المتوازيين.",
  "Set r = 1.00 and θ = 90° to trace the 4-cycle of powers of i: 1, i, −1, −i!":
    "اضبط r = 1.00 وθ = 90° لتتبع الدورة الرباعية لقوى الوحدة التخيلية i: ‏1، i، −1، −i!",
  "Set linear scale factor k = 2.00 to verify that surface area quadruples (4×) while volume octuples (8×).":
    "اضبط معامل القياس الخطي k = 2.00 للتحقق من تضاعف المساحة السطحية 4 مرات وتضاعف الحجم 8 مرات.",
  "Set multiplier a = 2.0 and shift b = −2.0 to see σ_Y double while the mean shifts.":
    "اضبط معامل الضرب a = 2.0 والإزاحة b = −2.0 لملاحظة تضاعف الانحراف المعياري σ_Y مع إزاحة المتوسط.",
  "Reach 43/50 raw points to enter the 780–800 score ceiling.":
    "صل إلى 43/50 نقطة خام لدخول سقف الدرجات الأعلى (780–800).",
  "Set θ = 60° and n = 3 so z³ lands on the negative real axis at angle 3θ = 180°.":
    "اضبط الزاوية θ = 60° والأس n = 3 ليقع العدد المركب z³ على المحور الحقيقي السالب عند الزاوية 3θ = 180°.",
  "Set success probability p = 0.50 to see P(X = 1) = 0.50, P(X = 2) = 0.25, and E(X) = 2.00 trials.":
    "اضبط احتمال النجاح p = 0.50 لملاحظة P(X = 1) = 0.50 وP(X = 2) = 0.25 والمتوسط المتوقع E(X) = 2.00 محاولات.",
  "Set a₁ = 2.0 and r = 0.60 so the infinite series sum equals 5.00.":
    "اضبط الحد الأول a₁ = 2.0 والأساس r = 0.60 ليصبح مجموع المتسلسلة الهندسية اللانهائية مساوياً لـ 5.00.",
  "Adjust the sliders to explore Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry.":
    "حرّك منزلقات التحكم لاستكشاف حساب المثلثات والإحداثيات القطبية والقطوع المخروطية والهندسة ثلاثية الأبعاد.",
  "Set ray angle θ = 45° so its complement is 45° and its supplement is 135°.":
    "اضبط زاوية الشعاع θ = 45° لتكون متممتها 45° ومكملتها 135°.",
  "Make the circle inscribed tangent to the square (r = R = 4.0) so P = π/4 ≈ 0.7854.":
    "اجعل الدائرة مرسومة داخل المربع وملامسة لأضلاعه (r = R = 4.0) ليصبح الاحتمال الهندسي P = π/4 ≈ 0.7854.",
  "Set n = 6 (regular hexagon) to verify each interior angle is 120° and each exterior angle is 60°.":
    "اضبط عدد الأضلاع n = 6 (سداسي منتظم) للتحقق من أن كل زاوية داخلية 120° وكل زاوية خارجية 60°.",
  "Set k = 0.50 (the Triangle Midsegment Theorem) so DE = ½BC and Area(ΔADE) = ¼Area(ΔABC).":
    "اضبط معامل التشابه k = 0.50 (نظرية القطعة المنصفة في المثلث) ليكون DE = ½BC ومساحة (ΔADE) = ¼ مساحة (ΔABC).",
  "Set height h = 2r (e.g. r = 2.0, h = 4.0) to verify Archimedes' famous 3 : 1 : 2 volume ratio!":
    "اضبط الارتفاع h = 2r (مثلاً r = 2.0 وh = 4.0) للتحقق من نسبة أرخميدس الشهيرة للحجوم 3 : 1 : 2!",
  "Adjust the sliders to explore AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus.":
    "حرّك منزلقات التحكم لاستكشاف نظرية ذات الحدين والبرهان وحساب المثلثات بالراديان والتفاضل والتكامل التحليلي.",
  "Set r₁ = −3.0 and r₂ = 1.0 so the turning point minimum lies at (−1.0, −4.0).":
    "اضبط الجذرين r₁ = −3.0 وr₂ = 1.0 لتقع نقطة التحول الصغرى عند (−1.0, −4.0).",
  "Place Point B at (2.0, 2.0) to form a 3-4-5 right triangle with length |AB| = 5.00!":
    "ضع النقطة B عند (2.0, 2.0) لتكوين مثلث قائم بأضلاع 3-4-5 وطول وتر |AB| = 5.00!",
  "Set m = 2.0 and c = 0.0 so f(g(1)) and g(f(1)) differ clearly at x = 1.":
    "اضبط m = 2.0 وc = 0.0 لملاحظة الفرق الواضح بين تركيب الدالتين f(g(1)) وg(f(1)) عند x = 1.",
  "Increase radius r to 4.0 and angle θ to 2.0 rad to exceed a sector area of 15.0.":
    "زد نصف القطر r إلى 4.0 والزاوية θ إلى 2.0 rad لتتجاوز مساحة القطاع الدائري 15.0.",
  "Increase rounding unit Δ to 1.0 to see the gap between Upper Bound Area and Lower Bound Area widen.":
    "زد وحدة التقريب Δ إلى 1.0 لملاحظة اتساع الفجوة بين الحد الأعلى والحد الأدنى للمساحة.",
  "Adjust n(A)/N and n(A ∩ B)/N so exactly 30 students lie in (A ∪ B)' outside both circles.":
    "اضبط النسبتين n(A)/N وn(A ∩ B)/N بحيث يقع 30 طالباً تماماً في المتممة (A ∪ B)' خارج الدائرتين.",
  "Set Wide-Class Frequency F₃ (width 2) to twice Narrow-Class Frequency F₂ (width 1) so both bars have equal Frequency Density height!":
    "اجعل تكرار الفئة العريضة F₃ (عرضها 2) ضعف تكرار الفئة الضيقة F₂ (عرضها 1) ليتساوى ارتفاع كثافة التكرار في العمودين!",
  "Adjust a₁₂ so det(A) = 0 (singular transformation collapsing the 2D grid onto a 1D line) or det(A) = 3.0.":
    "اضبط العنصر a₁₂ ليصبح المحدد det(A) = 0 (تحويل منفرد يطوي الشبكة على خط أحادي البعد) أو det(A) = 3.0.",
  "Set radius R = 2.0 and shear ω = 1.5 so total circulation ∮ F·dr = 12π ≈ 37.70.":
    "اضبط نصف القطر R = 2.0 والقص الدوراني ω = 1.5 ليصبح الدوران الكلي ∮ F·dr = 12π ≈ 37.70.",
  "Switch div F to a negative value (div F < 0) to turn the field into an inward sink with negative outward flux.":
    "اجعل التباعد سالباً (div F < 0) لتحويل الحقل المتجهي إلى مصب داخلي بتدفق خارجي سالب.",
  "Open cone angle φ₀ to 90° (upper hemisphere) to verify V = ⅔πρ₀³.":
    "افتح زاوية المخروط φ₀ إلى 90° (نصف الكرة العلوي) للتحقق من الحجم V = ⅔πρ₀³.",
  "Set switch-on time a = 1.5 and low damping ζ = 0.15 to observe pronounced underdamped ringing after t = 1.5.":
    "اضبط زمن التشغيل a = 1.5 ونسبة التخميد المنخفضة ζ = 0.15 لملاحظة التذبذب واضح الرنين بعد t = 1.5.",
  "Increase series degree N to at least 8 so the power series matches the oscillatory curve past x = 2.2.":
    "ارفع درجة متسلسلة القوى N إلى 8 على الأقل لتتطابق المتسلسلة مع المنحنى المتذبذب بعد x = 2.2.",
  "Tune driving frequency ω to match natural frequency ω₀ (|ω − ω₀| < 0.05) to trigger pure secular resonance!":
    "اضبط تردد القوة الدافعة ω ليطابق التردد الطبيعي ω₀ (|ω − ω₀| < 0.05) لتوليد حالة الرنين التام!",
  "Set ω = 2.0 so Wronskian W = 2.00 and Green's kernel amplitude is 1/ω = 0.50.":
    "اضبط التردد ω = 2.0 ليصبح محدد رونسكيان W = 2.00 وسعة نواة غرين 1/ω = 0.50."
};

const BESPOKE_FIXES = {
  'act2l2.js': [
    [
      `_mountBespokeExplorer({"canvasId":"act2l2conics3dstatsCanvas","s0Id":"act2l2conics3dstatsS0","s1Id":"act2l2conics3dstatsS1","s0ValId":"act2l2conics3dstatsS0Val","s1ValId":"act2l2conics3dstatsS1Val","r0Id":"act2l2conics3dstatsR0","r1Id":"act2l2conics3dstatsR1","r2Id":"act2l2conics3dstatsR2","resetId":"act2l2conics3dstatsReset","mode":"conic","d0":4,"d1":3,"challenge":{"en":"Adjust the sliders to explore Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "act2l2conics3dstatsCanvas", "mode": "conic", "square": true, "title": "Conic Sections Eccentricity & 3D Coordinate Sphere Lab", "s0Id": "act2l2conics3dstatsS0", "s1Id": "act2l2conics3dstatsS1", "v0Id": "act2l2conics3dstatsS0Val", "v1Id": "act2l2conics3dstatsS1Val", "s0Val": 4, "s1Val": 3, "s0Step": 0.5, "s1Step": 0.5, "r0Id": "act2l2conics3dstatsR0", "r1Id": "act2l2conics3dstatsR1", "r2Id": "act2l2conics3dstatsR2", "dataBtnId": "act2l2conics3dstatsCanvas_dataBtn", "dataPanelId": "act2l2conics3dstatsCanvas_dataPanel", "dataDescId": "act2l2conics3dstatsCanvas_dataDesc", "dataRowsId": "act2l2conics3dstatsCanvas_dataRows", "btn3dId": "act2l2conics3dstatsCanvas_3dBtn", "wrap3dId": "act2l2conics3dstatsCanvas_3dWrap", "hint3dId": "act2l2conics3dstatsCanvas_3dHint", "btn3dLabel": "🧊 View Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore Conic Sections, 3D Coordinate Geometry, Combinatorics & Probability.", "ar": null}, "checkFn": function(a, b){ return Math.abs(a - b) < 0.15; }});`
    ]
  ],
  'appc.js': [
    [
      `_mountBespokeExplorer({"canvasId":"appcu1bCanvas","s0Id":"appcu1bS0","s1Id":"appcu1bS1","s0ValId":"appcu1bS0Val","s1ValId":"appcu1bS1Val","r0Id":"appcu1bR0","r1Id":"appcu1bR1","r2Id":"appcu1bR2","resetId":"appcu1bReset","mode":"quadratic","d0":1,"d1":-2,"challenge":{"en":"Adjust the sliders to explore Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "appcu1bCanvas", "mode": "rational_hole", "square": false, "title": "Rational Asymptote, Quotient Polynomial & Discontinuity Lab", "s0Id": "appcu1bS0", "s1Id": "appcu1bS1", "v0Id": "appcu1bS0Val", "v1Id": "appcu1bS1Val", "s0Val": 1, "s1Val": -2, "s0Step": 0.5, "s1Step": 0.5, "r0Id": "appcu1bR0", "r1Id": "appcu1bR1", "r2Id": "appcu1bR2", "dataBtnId": "appcu1bCanvas_dataBtn", "dataPanelId": "appcu1bCanvas_dataPanel", "dataDescId": "appcu1bCanvas_dataDesc", "dataRowsId": "appcu1bCanvas_dataRows", "btn3dId": "appcu1bCanvas_3dBtn", "wrap3dId": "appcu1bCanvas_3dWrap", "hint3dId": "appcu1bCanvas_3dHint", "btn3dLabel": "🧊 View Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore Unit 1B · Rational Functions, End Behavior, Asymptotes & Binomial Theorem.", "ar": null}, "checkFn": function(a, b){ return Math.abs(a - b) > 1.5; }});`
    ],
    [
      `_mountBespokeExplorer({"canvasId":"appcu2bCanvas","s0Id":"appcu2bS0","s1Id":"appcu2bS1","s0ValId":"appcu2bS0Val","s1ValId":"appcu2bS1Val","r0Id":"appcu2bR0","r1Id":"appcu2bR1","r2Id":"appcu2bR2","resetId":"appcu2bReset","mode":"exp_doubling","d0":2,"d1":1.5,"challenge":{"en":"Adjust the sliders to explore Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "appcu2bCanvas", "mode": "exp_doubling", "square": false, "title": "Exponential vs. Logarithmic Inverse & Semi-Log Linearization Lab", "s0Id": "appcu2bS0", "s1Id": "appcu2bS1", "v0Id": "appcu2bS0Val", "v1Id": "appcu2bS1Val", "s0Val": 2, "s1Val": 1.5, "s0Step": 0.5, "s1Step": 0.25, "r0Id": "appcu2bR0", "r1Id": "appcu2bR1", "r2Id": "appcu2bR2", "dataBtnId": "appcu2bCanvas_dataBtn", "dataPanelId": "appcu2bCanvas_dataPanel", "dataDescId": "appcu2bCanvas_dataDesc", "dataRowsId": "appcu2bCanvas_dataRows", "btn3dId": "", "wrap3dId": "", "hint3dId": "", "btn3dLabel": "", "mode3d": "solid", "challengePrompt": {"en": "Adjust the sliders to explore Unit 2B · Logarithmic Modeling, Semi-Log Plots, Inverse & Competing Functions.", "ar": null}, "checkFn": function(a, b){ return b >= 1.5; }});`
    ],
    [
      `_mountBespokeExplorer({"canvasId":"appcu3bCanvas","s0Id":"appcu3bS0","s1Id":"appcu3bS1","s0ValId":"appcu3bS0Val","s1ValId":"appcu3bS1Val","r0Id":"appcu3bR0","r1Id":"appcu3bR1","r2Id":"appcu3bR2","resetId":"appcu3bReset","mode":"harmonic_synth","d0":2,"d1":2,"challenge":{"en":"Adjust the sliders to explore Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "appcu3bCanvas", "mode": "harmonic", "square": false, "title": "Sinusoidal Regression, Phase Shift & Polar Rose Explorer", "s0Id": "appcu3bS0", "s1Id": "appcu3bS1", "v0Id": "appcu3bS0Val", "v1Id": "appcu3bS1Val", "s0Val": 2, "s1Val": 2, "s0Step": 0.5, "s1Step": 0.5, "r0Id": "appcu3bR0", "r1Id": "appcu3bR1", "r2Id": "appcu3bR2", "dataBtnId": "appcu3bCanvas_dataBtn", "dataPanelId": "appcu3bCanvas_dataPanel", "dataDescId": "appcu3bCanvas_dataDesc", "dataRowsId": "appcu3bCanvas_dataRows", "btn3dId": "appcu3bCanvas_3dBtn", "wrap3dId": "appcu3bCanvas_3dWrap", "hint3dId": "appcu3bCanvas_3dHint", "btn3dLabel": "🧊 View Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore Unit 3B · Sinusoidal Regression, Inverse Trig, Tangent & Polar Conics.", "ar": null}, "checkFn": function(a, b){ return Math.hypot(a, b) >= 3.5; }});`
    ]
  ],
  'apstats.js': [
    [
      `_mountBespokeExplorer({"canvasId":"apsu5Canvas","s0Id":"apsu5S0","s1Id":"apsu5S1","s0ValId":"apsu5S0Val","s1ValId":"apsu5S1Val","r0Id":"apsu5R0","r1Id":"apsu5R1","r2Id":"apsu5R2","resetId":"apsu5Reset","mode":"binomial","d0":25,"d1":0.4,"challenge":{"en":"Adjust the sliders to explore Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "apsu5Canvas", "mode": "binomial", "square": false, "title": "Sampling Distribution & Central Limit Theorem Convergence Lab", "s0Id": "apsu5S0", "s1Id": "apsu5S1", "v0Id": "apsu5S0Val", "v1Id": "apsu5S1Val", "s0Val": 25, "s1Val": 0.4, "s0Step": 5, "s1Step": 0.1, "r0Id": "apsu5R0", "r1Id": "apsu5R1", "r2Id": "apsu5R2", "dataBtnId": "apsu5Canvas_dataBtn", "dataPanelId": "apsu5Canvas_dataPanel", "dataDescId": "apsu5Canvas_dataDesc", "dataRowsId": "apsu5Canvas_dataRows", "btn3dId": "apsu5Canvas_3dBtn", "wrap3dId": "apsu5Canvas_3dWrap", "hint3dId": "apsu5Canvas_3dHint", "btn3dLabel": "🧊 View Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore Unit 5 · Sampling Distributions, Central Limit Theorem & Point Estimators.", "ar": null}, "checkFn": function(a, b){ return a >= 30; }});`
    ],
    [
      `_mountBespokeExplorer({"canvasId":"apsu6Canvas","s0Id":"apsu6S0","s1Id":"apsu6S1","s0ValId":"apsu6S0Val","s1ValId":"apsu6S1Val","r0Id":"apsu6R0","r1Id":"apsu6R1","r2Id":"apsu6R2","resetId":"apsu6Reset","mode":"binomial","d0":30,"d1":0.5,"challenge":{"en":"Adjust the sliders to explore Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "apsu6Canvas", "mode": "binomial", "square": false, "title": "Z-Interval Margin of Error, Power & Chi-Square Goodness-of-Fit Lab", "s0Id": "apsu6S0", "s1Id": "apsu6S1", "v0Id": "apsu6S0Val", "v1Id": "apsu6S1Val", "s0Val": 30, "s1Val": 0.5, "s0Step": 5, "s1Step": 0.1, "r0Id": "apsu6R0", "r1Id": "apsu6R1", "r2Id": "apsu6R2", "dataBtnId": "apsu6Canvas_dataBtn", "dataPanelId": "apsu6Canvas_dataPanel", "dataDescId": "apsu6Canvas_dataDesc", "dataRowsId": "apsu6Canvas_dataRows", "btn3dId": "", "wrap3dId": "", "hint3dId": "", "btn3dLabel": "", "mode3d": "solid", "challengePrompt": {"en": "Adjust the sliders to explore Unit 6 · Inference for Categorical Data: Proportions & Chi-Square Tests.", "ar": null}, "checkFn": function(a, b){ return a >= 40; }});`
    ],
    [
      `_mountBespokeExplorer({"canvasId":"apsu7Canvas","s0Id":"apsu7S0","s1Id":"apsu7S1","s0ValId":"apsu7S0Val","s1ValId":"apsu7S1Val","r0Id":"apsu7R0","r1Id":"apsu7R1","r2Id":"apsu7R2","resetId":"apsu7Reset","mode":"ols_residual","d0":1.5,"d1":0.5,"challenge":{"en":"Adjust the sliders to explore Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "apsu7Canvas", "mode": "ols_reg", "square": false, "title": "Student's t-Distribution & Linear Regression Slope Inference Lab", "s0Id": "apsu7S0", "s1Id": "apsu7S1", "v0Id": "apsu7S0Val", "v1Id": "apsu7S1Val", "s0Val": 1.5, "s1Val": 0.5, "s0Step": 0.25, "s1Step": 0.5, "r0Id": "apsu7R0", "r1Id": "apsu7R1", "r2Id": "apsu7R2", "dataBtnId": "apsu7Canvas_dataBtn", "dataPanelId": "apsu7Canvas_dataPanel", "dataDescId": "apsu7Canvas_dataDesc", "dataRowsId": "apsu7Canvas_dataRows", "btn3dId": "apsu7Canvas_3dBtn", "wrap3dId": "apsu7Canvas_3dWrap", "hint3dId": "apsu7Canvas_3dHint", "btn3dLabel": "🧊 View Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore Unit 7 · Inference for Quantitative Data: Means, Paired t & Regression Slope.", "ar": null}, "checkFn": function(a, b){ return Math.abs(a - 1.0) < 0.3; }});`
    ]
  ],
  'est2l2.js': [
    [
      `_mountBespokeExplorer({"canvasId":"est2l2trigpolarconicsCanvas","s0Id":"est2l2trigpolarconicsS0","s1Id":"est2l2trigpolarconicsS1","s0ValId":"est2l2trigpolarconicsS0Val","s1ValId":"est2l2trigpolarconicsS1Val","r0Id":"est2l2trigpolarconicsR0","r1Id":"est2l2trigpolarconicsR1","r2Id":"est2l2trigpolarconicsR2","resetId":"est2l2trigpolarconicsReset","mode":"conic","d0":4,"d1":2.5,"challenge":{"en":"Adjust the sliders to explore Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "est2l2trigpolarconicsCanvas", "mode": "conic", "square": true, "title": "Polar-Cartesian Conics & 3D Solid of Revolution Explorer", "s0Id": "est2l2trigpolarconicsS0", "s1Id": "est2l2trigpolarconicsS1", "v0Id": "est2l2trigpolarconicsS0Val", "v1Id": "est2l2trigpolarconicsS1Val", "s0Val": 4, "s1Val": 2.5, "s0Step": 0.5, "s1Step": 0.5, "r0Id": "est2l2trigpolarconicsR0", "r1Id": "est2l2trigpolarconicsR1", "r2Id": "est2l2trigpolarconicsR2", "dataBtnId": "est2l2trigpolarconicsCanvas_dataBtn", "dataPanelId": "est2l2trigpolarconicsCanvas_dataPanel", "dataDescId": "est2l2trigpolarconicsCanvas_dataDesc", "dataRowsId": "est2l2trigpolarconicsCanvas_dataRows", "btn3dId": "est2l2trigpolarconicsCanvas_3dBtn", "wrap3dId": "est2l2trigpolarconicsCanvas_3dWrap", "hint3dId": "est2l2trigpolarconicsCanvas_3dHint", "btn3dLabel": "🧊 View Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore Trigonometry, Polar Coordinates, Conic Sections & 3D Geometry.", "ar": null}, "checkFn": function(a, b){ return Math.abs(a - b) < 0.15; }});`
    ]
  ],
  'ibsl.js': [
    [
      `_mountBespokeExplorer({"canvasId":"ibslaaCanvas","s0Id":"ibslaaS0","s1Id":"ibslaaS1","s0ValId":"ibslaaS0Val","s1ValId":"ibslaaS1Val","r0Id":"ibslaaR0","r1Id":"ibslaaR1","r2Id":"ibslaaR2","resetId":"ibslaaReset","mode":"ftc_triple","d0":2,"d1":1,"challenge":{"en":"Adjust the sliders to explore AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus.","ar":null}});`,
      `_mountBespokeExplorer({"canvasId": "ibslaaCanvas", "mode": "ftc_triple", "square": false, "title": "IB AA SL Non-Calculator Analytical Calculus & Area Accumulation Lab", "s0Id": "ibslaaS0", "s1Id": "ibslaaS1", "v0Id": "ibslaaS0Val", "v1Id": "ibslaaS1Val", "s0Val": 2, "s1Val": 1, "s0Step": 0.5, "s1Step": 0.5, "r0Id": "ibslaaR0", "r1Id": "ibslaaR1", "r2Id": "ibslaaR2", "dataBtnId": "ibslaaCanvas_dataBtn", "dataPanelId": "ibslaaCanvas_dataPanel", "dataDescId": "ibslaaCanvas_dataDesc", "dataRowsId": "ibslaaCanvas_dataRows", "btn3dId": "ibslaaCanvas_3dBtn", "wrap3dId": "ibslaaCanvas_3dWrap", "hint3dId": "ibslaaCanvas_3dHint", "btn3dLabel": "🧊 View AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus in 3D", "mode3d": "surf", "challengePrompt": {"en": "Adjust the sliders to explore AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus.", "ar": null}, "checkFn": function(a, b){ return Math.abs(0.5*a*a - 1.0 + b) < 0.25; }});`
    ]
  ]
};

let fixedBespokeCalls = 0;
let populatedChallengeAr = 0;

for (const f of fs.readdirSync(EX_DIR).filter(n => n.endsWith('.js')).sort()) {
  const fullPath = path.join(EX_DIR, f);
  let code = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  if (BESPOKE_FIXES[f]) {
    for (const [target, replacement] of BESPOKE_FIXES[f]) {
      if (code.includes(target)) {
        code = code.replace(target, replacement);
        fixedBespokeCalls++;
        changed = true;
      }
    }
  }

  code = code.replace(/"challengePrompt"\s*:\s*\{\s*"en"\s*:\s*"([^"]+)"\s*,\s*"ar"\s*:\s*null\s*\}/g, (match, enStr) => {
    const arStr = CHALLENGE_AR_MAP[enStr] || `تحدي المستكشف التفاعلي: ${enStr}`;
    populatedChallengeAr++;
    changed = true;
    return `"challengePrompt": {"en": ${JSON.stringify(enStr)}, "ar": ${JSON.stringify(arStr)}}`;
  });

  if (changed) {
    fs.writeFileSync(fullPath, code, 'utf8');
  }
}

console.log(`Fixed ${fixedBespokeCalls} bespoke explorer configurations and populated ${populatedChallengeAr} Arabic challengePrompts.`);
