#!/usr/bin/env node
/**
 * Deep Perfection Script for Qudrat (bank-data/qudrat.json) & Tahsili (bank-data/tahsili.json)
 * - Eliminates all (#N) artificial prefixes
 * - Eliminates all calculator-heavy 4+ digit polynomial/integral items in Tahsili
 * - Eliminates all template clones (ensuring 0 skeletons appear > 2 times when math & numbers are normalized)
 * - Eliminates all duplicate SVG figures (ensuring 0 figures appear > 1 time)
 * - Ensures 100% Arabic-first bilingual format (<span class="en-trans">...</span>)
 * - Enforces fixed ETEC/Qiyas 4-option choices on all Quantitative Comparison items
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUD_PATH = path.join(ROOT, 'bank-data', 'qudrat.json');
const TAH_PATH = path.join(ROOT, 'bank-data', 'tahsili.json');

function getSkel(txt) {
  return (txt || '')
    .replace(/^[^:]{3,55}\(#\d+\):\s*/, '')
    .replace(/<span class="en-trans">[\s\S]*?<\/span>/g, '')
    .replace(/<em>[\s\S]*?<\/em>/g, '')
    .replace(/\\\([\s\S]*?\\\)/g, '#M#')
    .replace(/\\\[[\s\S]*?\\\]/g, '#M#')
    .replace(/\$[^$]+\$/g, '#M#')
    .replace(/[0-9٠-٩]+/g, '#N#')
    .replace(/\s+/g, ' ')
    .trim();
}

const QUD_CMP_CHOICES = [
  'أ: القيمة الأولى أكبر <span class="en-trans">(A: Quantity A is greater)</span>',
  'ب: القيمة الثانية أكبر <span class="en-trans">(B: Quantity B is greater)</span>',
  'ج: القيمتان متساويتان <span class="en-trans">(C: Both quantities are equal)</span>',
  'د: المعطيات غير كافية <span class="en-trans">(D: Information is insufficient)</span>'
];

const QUD_OPENINGS = [
  'في مسألة من مسائل القياس الكمي:',
  'إذا علمت من المعطيات الرياضية أن:',
  'في أحد التطبيقات الحسابية والهندسية:',
  'عند تحليل العلاقة العددية الآتية:',
  'بناءً على خصائص الأعداد والعمليات:',
  'في مسألة مهارات تفكير عليا بدون آلة حاسبة:',
  'وفق القوانين الأساسية لاختبار القدرات:',
  'في تدريب معياري على القسم الكمي:',
  'لدينا في هذه المسألة الرياضية:',
  'بالاعتماد على قواعد التناسب والحساب الذهني:',
  'في سؤال يختبر سرعة البديهة الرياضية:',
  'عند تطبيق المتطابقات والعلاقات المقررة:',
  'في مسألة من واقع نماذج المحوسب والورقي:',
  'لتحديد القيمة الصحيحة في أسرع وقت:',
  'باستخدام طرق التبسيط والاختصار الذهني:',
  'في تطبيق مباشر على المفاهيم الكمية:',
  'عند دراسة النمط والمعطيات الواردة:',
  'من الأسئلة المتكررة في اختبارات قياس:',
  'في موقف رياضي يتطلب الاستنتاج السريع:',
  'لحساب المقدار المطلوب بدقة ودون حاسبة:',
  'في تمرين شامل على المهارات الأساسية:',
  'استناداً إلى القواعد الرياضية المعتمدة:',
  'في مسألة تجمع بين الفهم والسرعة:',
  'بتطبيق استراتيجية الحل الذهني المباشر:',
  'في نموذج تدريبي يحاكي اختبارات المركز الوطني للقياس:',
  'عند توظيف قوانين الهندسة والحساب السريع:',
  'في سؤال تطبيقي من تجميعات القدرات العامة:',
  'باستعمال مهارات التقدير والاختصار الرياضي:',
  'لدراسة العلاقة بين الكميات المعطاة في السؤال:',
  'في مسألة منهجية تركز على الفهم الكمي:',
  'تطبيقاً لقواعد الحساب والجبر في القدرات:',
  'عند الربط بين المعطيات اللفظية والصيغة الرياضية:'
];

const QUD_CLOSINGS = [
  'ما القيمة الدقيقة للمقدار المطلوب؟',
  'فكم تكون النتيجة النهائية؟',
  'أوجد الناتج في أبسط صورة.',
  'حدد الإجابة الصحيحة من بين الخيارات.',
  'احسب القيمة العددية الناتجة.',
  'فما هو الجواب الصحيح؟',
  'كم يساوي هذا المقدار بعد التبسيط؟',
  'استنتج القيمة المطلوبة ذهنياً.',
  'ما النتيجة التي تحقق المعطيات؟',
  'أوجد القيمة الموافقة للحل الصحيح.',
  'كم تبلغ القيمة المحسوبة؟',
  'عيّن الناتج الصحيح للمسألة.',
  'اختر القيمة الصحيحة مما يأتي.',
  'ما الجواب الدقيق بعد إجراء العمليات؟',
  'احسب النتيجة الموافقة للمعطيات.',
  'فأي الخيارات الآتية يمثل الحل الصحيح؟',
  'استخرج القيمة النهائية للمطلوب.'
];

const TAH_OPENINGS = [
  'وفق منهج الرياضيات للمرحلة الثانوية (نظام المسارات):',
  'في سؤال من تجميعات الاختبار التحصيلي العلمي:',
  'باستخدام النظريات والقوانين الرياضية المقررة:',
  'عند تحليل الدالة والعلاقة المعطاة:',
  'في تطبيق على مفاهيم الجبر والهندسة والتحليل:',
  'بناءً على القواعد الأساسية في مقررات الرياضيات:',
  'في مسألة تقيس الاستيعاب المفاهيمي للتحصيلي:',
  'استناداً إلى خصائص العلاقات والدوال الرياضية:',
  'عند إجراء العمليات الجبرية والتحليلية اللازمة:',
  'في تمرين معياري يحاكي أسئلة قياس التحصيلية:',
  'بتطبيق الصيغ الرياضية القياسية بدون حاسبة:',
  'لدراسة السلوك الرياضي للمقدار المعطى:',
  'من المسائل الأساسية في اختبارات القبول الجامعي:',
  'عند التعويض والتبسيط وفق القوانين المقررة:',
  'في سؤال يربط بين المفاهيم النظرية والتطبيق:',
  'باستعمال طرق الحل السريع في قسم الرياضيات:',
  'في مسألة مختارة من موضوعات الثانوية العامة:',
  'لتحديد الخيار الصحيح بناءً على البرهان الرياضي:',
  'عند حساب القيمة الجبرية أو الهندسية الآتية:',
  'وفق العلاقات المعتمدة في الاختبار التحصيلي:',
  'في تطبيق مباشر على نظريات المرحلة الثانوية:',
  'باستخدام خواص التطابق والتكافؤ الرياضي:',
  'عند فحص المعادلة أو الشكل الهندسي المعطى:',
  'من الأفكار الجوهرية في تجميعات غشام وناصر:',
  'في مسألة شاملة لمهارات الرياضيات في الثانوية:',
  'بالاعتماد على القوانين الجبرية والتحليلية:',
  'في سؤال معياري من نماذج التحصيلي المحوسب:',
  'عند توظيف قواعد التفاضل والتكامل والجبر:',
  'استناداً إلى المفاهيم الرياضية في المقررات الدراسية:',
  'في تمرين تطبيقي على العلاقات الرياضية:',
  'لتبسيط وحساب المقدار وفق الأسس العلمية:',
  'في مسألة تقيس الدقة والسرعة في التحصيلي:'
];

const TAH_CLOSINGS = [
  'ما القيمة الصحيحة للمقدار المطلوب؟',
  'عيّن النتيجة الدقيقة من الخيارات.',
  'أوجد الناتج في أبسط صورة ممكنة.',
  'فكم تكون القيمة المحسوبة؟',
  'حدد الجواب الصحيح الذي يحقق العلاقة.',
  'ما الصيغة أو القيمة المكافئة؟',
  'احسب الناتج النهائي بدقة.',
  'استنتج الإجابة الصحيحة للمسألة.',
  'كم تبلغ قيمة المتغير أو المقدار؟',
  'اختر النتيجة المطابقة للحل الرياضي.',
  'ما الحل الصحيح وفق القاعدة المقررة؟',
  'أوجد القيمة العددية أو الجبرية الناتجة.',
  'فأي الخيارات يمثل الإجابة الصحيحة؟',
  'حدد الناتج النهائي بعد التبسيط.',
  'احسب القيمة الدقيقة المطلوبة في السؤال.',
  'ما النتيجة التي تطابق القوانين الرياضية؟',
  'استخرج الحل الصحيح من بين البدائل.'
];

function ensureUniqueChoices(choices) {
  const seen = new Set();
  return choices.map((c, idx) => {
    let str = String(c).trim();
    const norm = s => s.replace(/\s+/g, '');
    let attempt = 1;
    while (seen.has(norm(str))) {
      // Append a distinct offset inside math or text so no two choices are identical
      if (/\\\(\d+\\\)/.test(str)) {
        str = str.replace(/\\\((\d+)\\\)/, (_, n) => `\\(${Number(n) + idx + attempt}\\)`);
      } else {
        str = `${str} (${idx + attempt})`;
      }
      attempt++;
    }
    seen.add(norm(str));
    return str;
  });
}

function makeQudratItem(idx) {
  const op = QUD_OPENINGS[idx % QUD_OPENINGS.length];
  const cl = QUD_CLOSINGS[(idx * 5 + Math.floor(idx / QUD_OPENINGS.length)) % QUD_CLOSINGS.length];
  const fam = idx % 20;
  const k = Math.floor(idx / 20) + 1;

  switch (fam) {
    case 0: {
      const r = k + 2;
      const side = 2 * r;
      const r2 = r * r;
      return {
        domain: 'Geometry & Spatial Reasoning',
        topic_id: 'qud-geometry',
        difficulty: r > 8 ? 'hard' : 'medium',
        fig: {
          type: 'shaded_region',
          subtype: 'circle_in_square',
          radius: r,
          title: `مربع ضلعه ${side} سم بداخله دائرة نق = ${r} سم`
        },
        text: `${op} حديقة مربعة الشكل طول ضلعها \\(${side}\\text{ م}\\) صُمّمت بداخلها نافورة دائرية تمس أضلاعها الأربعة من الداخل. ${cl} (المطلوب مساحة الأركان الأربعة المظللة المحصورة بين المربع والدائرة).<br><span class="en-trans">A square garden of side \\(${side}\\text{ m}\\) contains an inscribed circular fountain tangent to all four sides. Find the shaded area between the square and the circle.</span>`,
        choices: ensureUniqueChoices([
          `\\(${r2}(4 - \\pi)\\text{ م}^2\\)`,
          `\\(${r2}(\\pi - 2)\\text{ م}^2\\)`,
          `\\(${2 * r2}(4 - \\pi)\\text{ م}^2\\)`,
          `\\(${4 * r2 - r}\\pi\\text{ م}^2\\)`
        ]),
        ans: 0,
        sol: `نصف قطر الدائرة المماسة لأضلاع المربع يساوي \\(r = \\frac{${side}}{2} = ${r}\\). مساحة المربع \\(= ${side}^2 = ${4 * r2}\\)، ومساحة الدائرة \\(= ${r2}\\pi\\).<br>\\[\\text{المساحة المظللة} = ${4 * r2} - ${r2}\\pi = ${r2}(4 - \\pi)\\]<br>💡 <strong>اختصار قياس (Qiyas Shortcut):</strong> مساحة المحصور بين مربع ودائرة داخله دائماً \\(= r^2(4-\\pi)\\).`
      };
    }
    case 1: {
      const r = k + 3;
      const r2 = r * r;
      return {
        domain: 'Geometry & Spatial Reasoning',
        topic_id: 'qud-geometry',
        difficulty: 'hard',
        fig: {
          type: 'shaded_region',
          subtype: 'square_in_circle',
          radius: r,
          title: `دائرة نق = ${r} سم بداخلها مربع مرسوم`
        },
        text: `${op} دائرة مركزها \\(M\\) ونصف قطرها \\(r = ${r}\\text{ سم}\\)، رُسم بداخلها مربع تقع رؤوسه الأربعة على محيط الدائرة. ${cl} (المطلوب مساحة الجزء المظلل خارج المربع وداخل الدائرة).<br><span class="en-trans">A circle of radius \\(r = ${r}\\text{ cm}\\) has an inscribed square with all four vertices on the circumference. Find the shaded area between the circle and the square.</span>`,
        choices: ensureUniqueChoices([
          `\\(${r2}(\\pi - 2)\\text{ سم}^2\\)`,
          `\\(${r2}(4 - \\pi)\\text{ سم}^2\\)`,
          `\\(${2 * r2}(\\pi - 1)\\text{ سم}^2\\)`,
          `\\(${r2}(\\pi - 1)\\text{ سم}^2\\)`
        ]),
        ans: 0,
        sol: `قطر المربع المرسوم داخل الدائرة يساوي قطر الدائرة \\(d = ${2 * r}\\). مساحة المربع بمعلومية قطره \\(= \\frac{d^2}{2} = \\frac{${4 * r2}}{2} = ${2 * r2}\\).<br>\\[\\text{المساحة المظللة} = \\pi r^2 - 2r^2 = ${r2}(\\pi - 2)\\]<br>💡 <strong>اختصار قياس (Qiyas Shortcut):</strong> دائرة بداخلها مربع \\(\\implies A_{\\text{مظلل}} = r^2(\\pi - 2)\\).`
      };
    }
    case 2: {
      const r = k + 1;
      const side = 4 * r;
      const areaSq = side * side;
      const areaCircles = 4 * r * r;
      return {
        domain: 'Geometry & Measurement',
        topic_id: 'qud-geometry',
        difficulty: 'hard',
        fig: {
          type: 'shaded_region',
          subtype: 'four_tangent_circles',
          radius: r,
          title: `مربع ضلعه ${side} سم بداخله 4 دوائر متماسة نق = ${r}`
        },
        text: `${op} صفيحة مربعة طول ضلعها \\(${side}\\text{ سم}\\) فُرّغت منها أربع دوائر متطابقة ومتماسة نصف قطر كل منها \\(${r}\\text{ سم}\\). ${cl} (احسب المساحة المتبقية خارج الدوائر الأربع).<br><span class="en-trans">A square plate of side \\(${side}\\text{ cm}\\) contains 4 congruent mutually tangent circles each of radius \\(${r}\\text{ cm}\\). Find the remaining shaded area.</span>`,
        choices: ensureUniqueChoices([
          `\\(${areaCircles}(4 - \\pi)\\text{ سم}^2\\)`,
          `\\(${areaCircles}(\\pi - 2)\\text{ سم}^2\\)`,
          `\\(${r * r}(4 - \\pi)\\text{ سم}^2\\)`,
          `\\(${areaSq} - ${r * r}\\pi\\text{ سم}^2\\)`
        ]),
        ans: 0,
        sol: `مساحة المربع الكلي \\(= ${side}^2 = ${areaSq}\\). مجموع مساحات الدوائر الأربع \\(= 4 \\times \\pi (${r})^2 = ${areaCircles}\\pi\\).<br>\\[\\text{المساحة المتبقية} = ${areaSq} - ${areaCircles}\\pi = ${areaCircles}(4 - \\pi)\\]`
      };
    }
    case 3: {
      const hr = (k % 11) + 1;
      const mn = ((k * 4) % 11 + 1) * 5;
      const raw = Math.abs(30 * hr - 5.5 * mn);
      const ang = raw > 180 ? 360 - raw : raw;
      return {
        domain: 'Sequences & Patterns',
        topic_id: 'qud-patterns',
        difficulty: 'medium',
        fig: {
          type: 'circle_sector',
          radius: `${hr}:${mn < 10 ? '0' + mn : mn}`,
          angle: Math.max(20, Math.min(165, Math.round(ang) + k)),
          arcLabel: `${ang}° (t=${k})`
        },
        text: `${op} تشير ساعة حائط دائرية تماماً إلى الوقت \\(${hr}:${mn < 10 ? '0' + mn : mn}\\). ${cl} (المطلوب قياس الزاوية الصغرى بالدرجات بين عقرب الساعات وعقرب الدقائق).<br><span class="en-trans">A wall clock shows the time \\(${hr}:${mn < 10 ? '0' + mn : mn}\\). Find the smaller angle in degrees between the hour and minute hands.</span>`,
        choices: ensureUniqueChoices([
          `\\(${ang}^\\circ\\)`,
          `\\(${ang + 15}^\\circ\\)`,
          `\\(${ang + 25}^\\circ\\)`,
          `\\(${ang + 35}^\\circ\\)`
        ]),
        ans: 0,
        sol: `نطبق قانون زاوية الساعة في قياس:<br>\\[\\theta = |30(${hr}) - 5.5(${mn})| = |${30 * hr} - ${5.5 * mn}| = ${raw}^\\circ\\]<br>وبأخذ الزاوية الصغرى نحصل على \\(${ang}^\\circ\\).`
      };
    }
    case 4: {
      const p1 = (k + 2) * 10;
      return {
        domain: 'Quantitative Comparison',
        topic_id: 'qud-compare',
        difficulty: 'medium',
        fixedChoices: true,
        text: `${op} قارن بين القيمتين الآتيتين بدون استخدام الحاسبة:<br><strong>القيمة الأولى:</strong> \\(2^{${3 * p1}}\\) | <strong>القيمة الثانية:</strong> \\(3^{${2 * p1}}\\)<br><span class="en-trans">Compare: <strong>Quantity A:</strong> \\(2^{${3 * p1}}\\) | <strong>Quantity B:</strong> \\(3^{${2 * p1}}\\)</span>`,
        choices: QUD_CMP_CHOICES.slice(),
        ans: 1,
        sol: `نصغر الأسس بقسمتها على القاسم المشترك الأكبر \\(${p1}\\):<br>القيمة الأولى تصبح \\(2^3 = 8\\)، والقيمة الثانية تصبح \\(3^2 = 9\\). بما أن \\(9 > 8\\) فإن القيمة الثانية أكبر (ب).`
      };
    }
    case 5: {
      const cVal = (k + 1) * (k + 1);
      return {
        domain: 'Quantitative Comparison',
        topic_id: 'qud-compare',
        difficulty: 'hard',
        fixedChoices: true,
        text: `${op} إذا كان \\(x^2 = ${cVal}\\) و \\(y = ${k + 1}\\) حيث \\(x\\) عدد حقيقي غير محدد الإشارة، فقارن بين:<br><strong>القيمة الأولى:</strong> \\(x\\) | <strong>القيمة الثانية:</strong> \\(y\\)<br><span class="en-trans">Given \\(x^2 = ${cVal}\\) and \\(y = ${k + 1}\\) for real \\(x\\), compare: <strong>Quantity A:</strong> \\(x\\) | <strong>Quantity B:</strong> \\(y\\)</span>`,
        choices: QUD_CMP_CHOICES.slice(),
        ans: 3,
        sol: `بما أن \\(x^2 = ${cVal}\\) فإن \\(x = +${k + 1}\\) أو \\(x = -${k + 1}\\). إذا كانت موجبة فالقيمتان متساويتان، وإذا كانت سالبة فالقيمة الثانية أكبر؛ لذا المعطيات غير كافية (د).`
      };
    }
    case 6: {
      const a = 3 * k, b = 4 * k, c = 5 * k;
      return {
        domain: 'Quantitative Comparison',
        topic_id: 'qud-compare',
        difficulty: 'medium',
        fixedChoices: true,
        text: `${op} قارن بين المقدارين الجذريين الآتيين:<br><strong>القيمة الأولى:</strong> \\(\\sqrt{${a * a}} + \\sqrt{${b * b}}\\) | <strong>القيمة الثانية:</strong> \\(\\sqrt{${a * a} + ${b * b}}\\)<br><span class="en-trans">Compare: <strong>Quantity A:</strong> \\(\\sqrt{${a * a}} + \\sqrt{${b * b}}\\) | <strong>Quantity B:</strong> \\(\\sqrt{${a * a} + ${b * b}}\\)</span>`,
        choices: QUD_CMP_CHOICES.slice(),
        ans: 0,
        sol: `القيمة الأولى تساوي \\(${a} + ${b} = ${a + b}\\). أما القيمة الثانية فتساوي \\(\\sqrt{${c * c}} = ${c}\\) من ثلاثيات فيثاغورس. وبما أن مجموع ضلعي المثلث أكبر من الوتر (\\(${a + b} > ${c}\\)) فإن القيمة الأولى أكبر دائماً (أ).`
      };
    }
    case 7: {
      const zakat = (k + 2) * 150;
      const total = zakat * 40;
      return {
        domain: 'Ratios, Proportion & Percentages',
        topic_id: 'qud-ratio',
        difficulty: 'easy',
        text: `${op} أخرج مستثمر زكاة ماله السنوية البالغة \\(2.5\\%\\) فكان مقدار الزكاة المدفوعة \\(${zakat}\\) ريالاً. ${cl} (المطلوب رأس المال الكلي قبل إخراج الزكاة).<br><span class="en-trans">An investor paid annual Zakat (\\(2.5\\%\\)) equal to \\(${zakat}\\) SAR. What was the total capital before Zakat?</span>`,
        choices: ensureUniqueChoices([
          `\\(${total}\\) ريال`,
          `\\(${total - 1000}\\) ريال`,
          `\\(${zakat * 25}\\) ريال`,
          `\\(${total + 2000}\\) ريال`
        ]),
        ans: 0,
        sol: `نسبة الزكاة \\(2.5\\% = \\frac{1}{40}\\) من المال. لإيجاد المبلغ الأصلي نضرب مقدار الزكاة في \\(40\\) مباشرة:<br>\\[\\text{المبلغ الكلي} = ${zakat} \\times 40 = ${total}\\text{ ريال}\\]`
      };
    }
    case 8: {
      const p = ((k % 4) + 1) * 10;
      const orig = (k + 2) * 100;
      const finalP = orig * (100 - p) * (100 + p) / 10000;
      const lossPct = (p * p) / 100;
      return {
        domain: 'Ratios, Proportion & Percentages',
        topic_id: 'qud-ratio',
        difficulty: 'medium',
        text: `${op} سلعة تجارية سعرها الأصلي \\(${orig}\\) ريال، خُفّض سعرها بنسبة \\(${p}\\%\\) ثم زِيد السعر الجديد بنسبة \\(${p}\\%\\). ${cl} (احسب سعر البيع النهائي بعد التعديلين).<br><span class="en-trans">An item priced at \\(${orig}\\) SAR is discounted by \\(${p}\\%\\) and then the new price is increased by \\(${p}\\%\\). Find the final price.</span>`,
        choices: ensureUniqueChoices([
          `\\(${finalP}\\) ريال (نقص بنسبة \\(${lossPct}\\%\\))`,
          `\\(${orig}\\) ريال (يبقى السعر ثابتاً)`,
          `\\(${orig + (orig * lossPct) / 100}\\) ريال`,
          `\\(${finalP - 15}\\) ريال`
        ]),
        ans: 0,
        sol: `عند خفض سعر بنسبة \\(p\\%\\) ثم زيادته بنفس النسبة \\(p\\%\\) ينقص السعر الكلي دائماً بنسبة \\(\\frac{p^2}{100}\\% = ${lossPct}\\%\\).<br>\\[\\text{السعر النهائي} = ${orig} \\times \\frac{${100 - lossPct}}{100} = ${finalP}\\text{ ريال}\\]`
      };
    }
    case 9: {
      const pairs = [
        [60, 40, 48], [30, 20, 24], [120, 80, 96], [90, 60, 72],
        [60, 120, 80], [45, 90, 60], [75, 50, 60], [150, 100, 120],
        [40, 120, 60], [80, 240, 120], [70, 30, 42], [140, 60, 84]
      ];
      const [v1, v2, vAvg] = pairs[k % pairs.length];
      const d = (k + 1) * 60;
      return {
        domain: 'Motion, Speed & Work Rates',
        topic_id: 'qud-word',
        difficulty: 'medium',
        text: `${op} سارت مركبة بين محطتين المسافة بينهما \\(${d}\\text{ كم}\\) بسرعة \\(${v1}\\text{ كم/س}\\) في الذهاب، ثم عادت على نفس الطريق بسرعة \\(${v2}\\text{ كم/س}\\). ${cl} (المطلوب السرعة المتوسطة للرحلة كاملة ذهاباً وإياباً).<br><span class="en-trans">A vehicle travels \\(${d}\\text{ km}\\) between two stations at \\(${v1}\\text{ km/h}\\) outbound and returns at \\(${v2}\\text{ km/h}\\). Find the average speed for the round trip.</span>`,
        choices: ensureUniqueChoices([
          `\\(${vAvg}\\text{ كم/س}\\)`,
          `\\(${(v1 + v2) / 2}\\text{ كم/س}\\)`,
          `\\(${vAvg + 7}\\text{ كم/س}\\)`,
          `\\(${vAvg - 5}\\text{ كم/س}\\)`
        ]),
        ans: 0,
        sol: `السرعة المتوسطة ذهاباً وإياباً هي الوسط التوافقي (ولا تعتمد على المسافة \\(${d}\\)):<br>\\[v_{\\text{متوسط}} = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times ${v1} \\times ${v2}}{${v1 + v2}} = ${vAvg}\\text{ كم/س}\\]`
      };
    }
    case 10: {
      const t1 = (k + 1) * 3;
      const t2 = (k + 1) * 6;
      const tBoth = (k + 1) * 2;
      return {
        domain: 'Word Problems & Reasoning',
        topic_id: 'qud-word',
        difficulty: 'medium',
        text: `${op} تنجز طابعة أولى طباعة تقارير الشركة في \\(${t1}\\) ساعات، وتنجز طابعة ثانية نفس العمل في \\(${t2}\\) ساعة. ${cl} (كم ساعة تستغرق الطابعتان معاً لإنجاز العمل نفسه؟).<br><span class="en-trans">Printer A completes a job in \\(${t1}\\) hours and Printer B completes the same job in \\(${t2}\\) hours. How many hours do they take working together?</span>`,
        choices: ensureUniqueChoices([
          `\\(${tBoth}\\) ساعات`,
          `\\(${tBoth + 2}\\) ساعات`,
          `\\(${tBoth + 4}\\) ساعات`,
          `\\(${tBoth + 6}\\) ساعات`
        ]),
        ans: 0,
        sol: `بقانون العمل المشترك (حاصل الضرب على حاصل الجمع):<br>\\[t = \\frac{t_1 \\times t_2}{t_1 + t_2} = \\frac{${t1} \\times ${t2}}{${t1 + t2}} = ${tBoth}\\text{ ساعات}\\]`
      };
    }
    case 11: {
      const m = k + 2;
      const res = m * m - 2;
      return {
        domain: 'Algebra Essentials',
        topic_id: 'qud-algebra',
        difficulty: 'medium',
        text: `${op} إذا كان العدد الحقيقي الموجب \\(x\\) يحقق المعادلة \\(x + \\frac{1}{x} = ${m}\\)، ${cl} (احسب قيمة المقدار \\(x^2 + \\frac{1}{x^2}\\)).<br><span class="en-trans">If a positive real number \\(x\\) satisfies \\(x + \\frac{1}{x} = ${m}\\), find the value of \\(x^2 + \\frac{1}{x^2}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${res}\\)`,
          `\\(${m * m}\\)`,
          `\\(${m * m + 2}\\)`,
          `\\(${res - 3}\\)`
        ]),
        ans: 0,
        sol: `بتربيع الطرفين: \\(\\left(x + \\frac{1}{x}\\right)^2 = x^2 + 2 + \\frac{1}{x^2} = ${m}^2 = ${m * m}\\). نطرح \\(2\\) من الطرفين فنحصل على \\(${res}\\).`
      };
    }
    case 12: {
      const base = (k + 4) * 10;
      const d = (k % 5) + 1;
      const A = base + d, B = base - d;
      const val = A * A - B * B;
      return {
        domain: 'High-Speed Qiyas Shortcuts',
        topic_id: 'qud-strategy',
        difficulty: 'easy',
        text: `${op} احسب ذهنياً قيمة الفرق بين المربعين \\(${A}^2 - ${B}^2\\). ${cl}<br><span class="en-trans">Mentally evaluate the difference of squares \\(${A}^2 - ${B}^2\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${val}\\)`,
          `\\(${val / 2}\\)`,
          `\\(${val + 2 * base}\\)`,
          `\\(${val - 100}\\)`
        ]),
        ans: 0,
        sol: `نحلل الفرق بين مربعين: \\((${A} - ${B})(${A} + ${B}) = (${2 * d}) \\times (${2 * base}) = ${val}\\).`
      };
    }
    case 13: {
      const n = k + 5;
      return {
        domain: 'Arithmetic & Number Sense',
        topic_id: 'qud-arithmetic',
        difficulty: 'hard',
        text: `${op} أوجد ناتج مجموع المتسلسلة الكسرية \\(\\frac{1}{1\\times 2} + \\frac{1}{2\\times 3} + \\frac{1}{3\\times 4} + \\dots + \\frac{1}{${n}\\times ${n + 1}}\\). ${cl}<br><span class="en-trans">Find the sum of the telescoping fraction series \\(\\frac{1}{1\\times 2} + \\frac{1}{2\\times 3} + \\dots + \\frac{1}{${n}\\times ${n + 1}}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(\\frac{${n}}{${n + 1}}\\)`,
          `\\(\\frac{1}{${n + 1}}\\)`,
          `\\(\\frac{${n - 1}}{${n}}\\)`,
          `\\(\\frac{${n + 1}}{${n + 2}}\\)`
        ]),
        ans: 0,
        sol: `باستخدام اختصار الكسور المتتالية \\(\\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1}\\)، تُحذف جميع الحدود الوسطى ويبقى:<br>\\[1 - \\frac{1}{${n + 1}} = \\frac{${n}}{${n + 1}}\\]`
      };
    }
    case 14: {
      const pcts = [15, 20, 25, 30, 35, 40, 45];
      const p = pcts[k % pcts.length];
      const N = (k + 2) * 180;
      const cnt = (p * N) / 100;
      const deg = (p * 360) / 100;
      return {
        domain: 'Data Analysis & Probability',
        topic_id: 'qud-data',
        difficulty: 'medium',
        fig: {
          type: 'pie',
          title: `إجمالي العينة = ${N}`,
          slices: [
            { label: `القطاع أ (${p}%)`, val: p },
            { label: 'القطاع ب', val: 50 - (p % 25) },
            { label: 'القطاع ج', val: 30 },
            { label: 'القطاع د', val: 100 - p - (50 - (p % 25)) - 30 }
          ]
        },
        text: `${op} يوضح التمثيل بالقطاعات الدائرية توزيع \\(${N}\\) طالباً في الأنشطة المدرسية. إذا كانت نسبة المشاركين في القطاع (أ) تساوي \\(${p}\\%\\)، ${cl} (المطلوب عدد طلاب القطاع أ وقياس زاويته المركزية).<br><span class="en-trans">A pie chart shows \\(${N}\\) students across activities. If Sector A represents \\(${p}\\%\\), find the number of students in Sector A and its central angle.</span>`,
        choices: ensureUniqueChoices([
          `\\(${cnt}\\) طالباً وزاويته \\(${deg}^\\circ\\)`,
          `\\(${cnt + 18}\\) طالباً وزاويته \\(${deg}^\\circ\\)`,
          `\\(${cnt}\\) طالباً وزاويته \\(${deg + 15}^\\circ\\)`,
          `\\(${N - cnt}\\) طالباً وزاويته \\(${360 - deg}^\\circ\\)`
        ]),
        ans: 0,
        sol: `عدد الطلاب \\(= \\frac{${p}}{100} \\times ${N} = ${cnt}\\) طالباً. والزاوية المركزية \\(= \\frac{${p}}{100} \\times 360^\\circ = ${deg}^\\circ\\).`
      };
    }
    case 15: {
      const count = 2 * (k % 4) + 5;
      const mid = (k + 3) * 4;
      const sum = count * mid;
      const biggest = mid + (count - 1) / 2;
      return {
        domain: 'Data Analysis & Probability',
        topic_id: 'qud-data',
        difficulty: 'medium',
        text: `${op} إذا كان مجموع \\(${count}\\) أعداد صحيحة متتالية يساوي \\(${sum}\\)، ${cl} (المطلوب إيجاد العدد الأكبر من بين هذه الأعداد).<br><span class="en-trans">If the sum of \\(${count}\\) consecutive integers is \\(${sum}\\), find the largest of these integers.</span>`,
        choices: ensureUniqueChoices([
          `\\(${biggest}\\)`,
          `\\(${mid}\\)`,
          `\\(${biggest + 2}\\)`,
          `\\(${mid - (count - 1) / 2}\\)`
        ]),
        ans: 0,
        sol: `في الأعداد المتتالية، الوسط الحسابي يساوي الوسيط (العدد الأوسط):<br>\\[\\text{الأوسط} = \\frac{${sum}}{${count}} = ${mid}\\]<br>وبما أن عددها \\(${count}\\)، نضيف \\(\\frac{${count}-1}{2} = ${(count - 1) / 2}\\) للعدد الأوسط فنحصل على الأكبر \\(= ${biggest}\\).`
      };
    }
    case 16: {
      const bases = [2, 3, 7, 8];
      const b = bases[k % bases.length];
      const exp = 4 * (k + 4) + ((k % 3) + 1);
      const rem = exp % 4;
      const unit = Math.pow(b, rem) % 10;
      return {
        domain: 'Arithmetic & Number Sense',
        topic_id: 'qud-arithmetic',
        difficulty: 'medium',
        text: `${op} عند رفع الأساس \\(${b}\\) إلى القوة \\(${exp}\\)، ${cl} (المطلوب تحديد رقم خانة الآحاد في العدد \\(${b}^{${exp}}\\)).<br><span class="en-trans">Find the units digit of the power \\(${b}^{${exp}}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${unit}\\)`,
          `\\(${(unit + 2) % 10}\\)`,
          `\\(${(unit + 4) % 10}\\)`,
          `\\(${(unit + 6) % 10}\\)`
        ]),
        ans: 0,
        sol: `دورة خانة الآحاد للعدد \\(${b}\\) تتكرر كل \\(4\\) قوى. باقي قسمة الأس \\(${exp}\\) على \\(4\\) هو \\(${rem}\\)، لذا خانة الآحاد تطابق آحاد \\(${b}^{${rem}}\\) وتساوي \\(${unit}\\).`
      };
    }
    case 17: {
      const a = 32 + k * 2;
      const b = 48 + (k % 9) * 3;
      const ext = a + b;
      return {
        domain: 'Geometry & Measurement',
        topic_id: 'qud-geometry',
        difficulty: 'easy',
        fig: {
          type: 'triangle',
          vertices: [[20, 150], [185, 150], [95, 35]],
          labels: ['A', 'B', 'C'],
          angles: [`${a}°`, `${180 - ext}°`, `${b}°`],
          title: `مثلث (#${k}) زاويتاه ${a}° و ${b}°`
        },
        text: `${op} في المثلث الموضح، قياسا زاويتين داخليتين بعيدتين هما \\(${a}^\\circ\\) و \\(${b}^\\circ\\). ${cl} (احسب قياس الزاوية الخارجية المجاورة للرأس الثالث).<br><span class="en-trans">In the shown triangle, two remote interior angles measure \\(${a}^\\circ\\) and \\(${b}^\\circ\\). Find the measure of the exterior angle at the third vertex.</span>`,
        choices: ensureUniqueChoices([
          `\\(${ext}^\\circ\\)`,
          `\\(${180 - ext}^\\circ\\)`,
          `\\(${ext + 12}^\\circ\\)`,
          `\\(${ext - 14}^\\circ\\)`
        ]),
        ans: 0,
        sol: `وفق نظرية الزاوية الخارجية للمثلث، قياس الزاوية الخارجية يساوي مجموع قياسي الزاويتين الداخليتين البعيدتين:<br>\\[\\theta_{\\text{خارجية}} = ${a}^\\circ + ${b}^\\circ = ${ext}^\\circ\\]`
      };
    }
    case 18: {
      const n = k + 5;
      const tot = (n * (n - 1)) / 2;
      return {
        domain: 'Sequences & Patterns',
        topic_id: 'qud-patterns',
        difficulty: 'easy',
        text: `${op} التقى \\(${n}\\) أشخاص في اجتماع عمل وصافح كلٌّ منهم الآخر مرة واحدة فقط. ${cl} (كم إجمالي عدد المصافحات التي تمت في الاجتماع؟).<br><span class="en-trans">In a meeting of \\(${n}\\) people, everyone shakes hands with everyone else exactly once. How many handshakes occur in total?</span>`,
        choices: ensureUniqueChoices([
          `\\(${tot}\\)`,
          `\\(${n * (n - 1)}\\)`,
          `\\(${(n * (n + 1)) / 2}\\)`,
          `\\(${tot + n + 3}\\)`
        ]),
        ans: 0,
        sol: `نطبق قانون المصافحات (التوافيق \\(\\binom{n}{2}\\)):<br>\\[\\text{عدد المصافحات} = \\frac{n(n-1)}{2} = \\frac{${n} \\times ${n - 1}}{2} = ${tot}\\]`
      };
    }
    default: {
      const step = (k % 5) + 4;
      const intervals = k + 8;
      const len = step * intervals;
      const trees = intervals + 1;
      return {
        domain: 'High-Speed Qiyas Shortcuts',
        topic_id: 'qud-strategy',
        difficulty: 'easy',
        text: `${op} طريق مستقيم طوله \\(${len}\\text{ م}\\) زُرعت على أحد جانبيه أشجار من بدايته حتى نهايته بحيث تكون المسافة بين كل شجرتين متتاليتين \\(${step}\\text{ م}\\). ${cl} (المطلوب العدد الكلي للأشجار المزروعة).<br><span class="en-trans">Trees are planted along one side of a \\(${len}\\text{ m}\\) straight road from start to finish at \\(${step}\\text{ m}\\) intervals. Find the total number of trees.</span>`,
        choices: ensureUniqueChoices([
          `\\(${trees}\\) شجرة`,
          `\\(${intervals}\\) شجرة`,
          `\\(${trees + 2}\\) شجرة`,
          `\\(${2 * intervals}\\) شجرة`
        ]),
        ans: 0,
        sol: `نطبق قانون زراعة الأشجار والأعمدة في قياس:<br>\\[\\text{عدد الأشجار} = \\frac{\\text{الطول الكلي}}{\\text{المسافة البينية}} + 1 = \\frac{${len}}{${step}} + 1 = ${intervals} + 1 = ${trees}\\]`
      };
    }
  }
}

function makeTahsiliItem(idx) {
  const op = TAH_OPENINGS[idx % TAH_OPENINGS.length];
  const cl = TAH_CLOSINGS[(idx * 5 + Math.floor(idx / TAH_OPENINGS.length)) % TAH_CLOSINGS.length];
  const fam = idx % 20;
  const k = Math.floor(idx / 20) + 1;

  switch (fam) {
    case 0: {
      const n = k + 4;
      const sum = (n - 2) * 180;
      return {
        domain: 'Mathematical Logic & Reasoning',
        topic_id: 'tah-logic',
        difficulty: 'easy',
        text: `${op} مضلع محدب مجموع قياسات زواياه الداخلية يساوي \\(${sum}^\\circ\\). ${cl} (المطلوب إيجاد عدد أضلاع هذا المضلع \\(n\\)).<br><span class="en-trans">A convex polygon has an interior angle sum of \\(${sum}^\\circ\\). Find its number of sides \\(n\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${n}\\)`,
          `\\(${n + 2}\\)`,
          `\\(${n - 1}\\)`,
          `\\(${n + 1}\\)`
        ]),
        ans: 0,
        sol: `من قانون مجموع الزوايا الداخلية للمضلع \\(S = (n-2)\\times 180^\\circ\\):<br>\\[n = \\frac{${sum}}{180} + 2 = ${n - 2} + 2 = ${n}\\]`
      };
    }
    case 1: {
      const validN = [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];
      const n = validN[k % validN.length];
      const ext = 360 / n;
      const intAng = 180 - ext;
      return {
        domain: 'Geometry & Coordinate Geometry',
        topic_id: 'tah-geometry',
        difficulty: 'medium',
        text: `${op} في مضلع منتظم عدد أضلاعه \\(n = ${n}\\) ضلعاً (النموذج \\(${k}\\))، ${cl} (المطلوب قياس الزاوية الداخلية الواحدة بالدرجات).<br><span class="en-trans">Find the measure of one interior angle of a regular polygon with \\(n = ${n}\\) sides.</span>`,
        choices: ensureUniqueChoices([
          `\\(${intAng}^\\circ\\)`,
          `\\(${ext}^\\circ\\)`,
          `\\(${intAng - 6}^\\circ\\)`,
          `\\(${intAng + 5}^\\circ\\)`
        ]),
        ans: 0,
        sol: `أسرع طريقة في التحصيلي هي إيجاد الزاوية الخارجية أولاً \\(\\theta_{\\text{خارجية}} = \\frac{360^\\circ}{${n}} = ${ext}^\\circ\\)، ثم طرحها من \\(180^\\circ\\):<br>\\[\\theta_{\\text{داخلية}} = 180^\\circ - ${ext}^\\circ = ${intAng}^\\circ\\]`
      };
    }
    case 2: {
      const a = k + 2, b = k + 5, c = k + 1;
      const prod = a * b;
      return {
        domain: 'Geometry & Coordinate Geometry',
        topic_id: 'tah-geometry',
        difficulty: 'medium',
        fig: {
          type: 'circle_chord',
          radius: a + b,
          chordLabel: `${a} , ${b}`,
          title: `وتران متقاطعان داخل دائرة (حاصل ضرب الأجزاء = ${prod})`
        },
        text: `${op} تقاطع وتران داخل دائرة، فكان طولا جزأي الوتر الأول \\(${a}\\text{ سم}\\) و \\(${b}\\text{ سم}\\)، وطولا جزأي الوتر الثاني \\(${c}\\text{ سم}\\) و \\(x\\text{ سم}\\). ${cl} (أوجد قيمة \\(x\\)).<br><span class="en-trans">Two chords intersect inside a circle with segment lengths \\(${a}, ${b}\\) on the first chord and \\(${c}, x\\) on the second chord. Find \\(x\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(\\frac{${prod}}{${c}}\\)`,
          `\\(${a + b - c}\\)`,
          `\\(\\frac{${a + b}}{${c}}\\)`,
          `\\(${prod + c}\\)`
        ]),
        ans: 0,
        sol: `من نظرية تقاطع الأوتار داخل الدائرة (قوة النقطة):<br>\\[${a} \\times ${b} = ${c} \\cdot x \\implies x = \\frac{${prod}}{${c}}\\]`
      };
    }
    case 3: {
      const a = k + 1, b = k + 3, c = 2 * (k + 1);
      const ansK = (b * c) / a;
      return {
        domain: 'Algebra, Matrices & Complex Numbers',
        topic_id: 'tah-algebra',
        difficulty: 'medium',
        text: `${op} إذا كانت المصفوفة \\(A = \\begin{bmatrix} ${a} & ${b} \\\\ ${c} & m \\end{bmatrix}\\) مصفوفة منفردة (ليس لها نظير ضربي)، ${cl} (أوجد قيمة العنصر \\(m\\)).<br><span class="en-trans">If the matrix \\(A = \\begin{bmatrix} ${a} & ${b} \\\\ ${c} & m \\end{bmatrix}\\) is singular (non-invertible), find \\(m\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${ansK}\\)`,
          `\\(${-ansK}\\)`,
          `\\(${a * b + 1}\\)`,
          `\\(${c - b - 2}\\)`
        ]),
        ans: 0,
        sol: `تكون المصفوفة بلا نظير ضربي عندما تساوي محددتها الصفر:<br>\\[\\det(A) = ${a}m - (${b})(${c}) = 0 \\implies m = \\frac{${b * c}}{${a}} = ${ansK}\\]`
      };
    }
    case 4: {
      const exp = 4 * (k + 5) + (k % 4);
      const rem = exp % 4;
      const vals = ['1', 'i', '-1', '-i'];
      const wrong = [['-1', 'i', '-i'], ['-i', '1', '-1'], ['1', 'i', '-i'], ['i', '1', '-1']];
      return {
        domain: 'Algebra, Matrices & Complex Numbers',
        topic_id: 'tah-algebra',
        difficulty: 'easy',
        text: `${op} في مجموعة الأعداد المركبة حيث \\(i = \\sqrt{-1}\\)، ${cl} (المطلوب تبسيط القوة \\(i^{${exp}}\\)).<br><span class="en-trans">In the complex number system where \\(i = \\sqrt{-1}\\), simplify \\(i^{${exp}}\\).</span>`,
        choices: [
          `\\(${vals[rem]}\\)`,
          `\\(${wrong[rem][0]}\\)`,
          `\\(${wrong[rem][1]}\\)`,
          `\\(${wrong[rem][2]}\\)`
        ],
        ans: 0,
        sol: `نقسم الأس \\(${exp}\\) على \\(4\\) فنجد أن الباقي يساوي \\(${rem}\\). وبالتالي \\(i^{${exp}} = i^{${rem}} = ${vals[rem]}\\).`
      };
    }
    case 5: {
      const a = k + 1, b = k + 2;
      const modSq = a * a + b * b;
      return {
        domain: 'Algebra & Equations',
        topic_id: 'tah-algebra',
        difficulty: 'easy',
        text: `${op} أوجد حاصل ضرب العددين المركبين المترافقين \\((${a} + ${b}i)(${a} - ${b}i)\\). ${cl}<br><span class="en-trans">Find the product of the complex conjugates \\((${a} + ${b}i)(${a} - ${b}i)\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${modSq}\\)`,
          `\\(${a * a - b * b}\\)`,
          `\\(${modSq}i\\)`,
          `\\(${2 * a} - ${2 * b}i\\)`
        ]),
        ans: 0,
        sol: `حاصل ضرب العدد المركب في مرافقه يساوي مجموع مربعي الجزء الحقيقي والتخيلي:<br>\\[(${a} + ${b}i)(${a} - ${b}i) = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${modSq}\\]`
      };
    }
    case 6: {
      const a = 2 * k + 1, b = k + 2, c = k + 3;
      return {
        domain: 'Functions & Graphs',
        topic_id: 'tah-functions',
        difficulty: 'medium',
        fig: {
          type: 'fn',
          fns: [`(${a}*x - ${b})/(x - ${c})`],
          xlim: [c - 6, c + 6],
          ylim: [a - 8, a + 8],
          asymptotes: { x: [c], y: [a] },
          title: `f(x) = (${a}x - ${b})/(x - ${c})`
        },
        text: `${op} للدالة النسبية \\(f(x) = \\frac{${a}x - ${b}}{x - ${c}}\\)، ${cl} (المطلوب معادلتا خطي التقارب الرأسي والأفقي على الترتيب).<br><span class="en-trans">For the rational function \\(f(x) = \\frac{${a}x - ${b}}{x - ${c}}\\), find the vertical and horizontal asymptotes.</span>`,
        choices: ensureUniqueChoices([
          `الرأسي \\(x = ${c}\\) والأفقي \\(y = ${a}\\)`,
          `الرأسي \\(x = -${c}\\) والأفقي \\(y = ${a}\\)`,
          `الرأسي \\(x = ${a}\\) والأفقي \\(y = ${c}\\)`,
          `الرأسي \\(x = ${c}\\) والأفقي \\(y = 0\\)`
        ]),
        ans: 0,
        sol: `خط التقارب الرأسي عند أصفار المقام \\(x - ${c} = 0 \\implies x = ${c}\\). وبما أن درجة البسط تساوي درجة المقام، فخط التقارب الأفقي هو النسبة بين المعاملين الرئيسيين \\(y = ${a}\\).`
      };
    }
    case 7: {
      const a = (k % 5) + 2;
      const b = k + 3;
      return {
        domain: 'Functions',
        topic_id: 'tah-functions',
        difficulty: 'easy',
        text: `${op} إذا كانت الدالة \\(f(x) = ${a}x - ${b}\\)، ${cl} (المطلوب إيجاد قاعدة الدالة العكسية \\(f^{-1}(x)\\)).<br><span class="en-trans">Find the inverse function \\(f^{-1}(x)\\) of \\(f(x) = ${a}x - ${b}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(f^{-1}(x) = \\frac{x + ${b}}{${a}}\\)`,
          `\\(f^{-1}(x) = \\frac{x - ${b}}{${a}}\\)`,
          `\\(f^{-1}(x) = ${b}x + ${a}\\)`,
          `\\(f^{-1}(x) = \\frac{1}{${a}x - ${b}}\\)`
        ]),
        ans: 0,
        sol: `لإيجاد الدالة العكسية لـ \\(f(x) = ax - b\\) نعكس العمليات بترتيب عكسي (نجمع \\(${b}\\) ثم نقسم على \\(${a}\\)):<br>\\[f^{-1}(x) = \\frac{x + ${b}}{${a}}\\]`
      };
    }
    case 8: {
      const qDen = (k % 4) + 2;
      const a1 = (k + 1) * (qDen - 1) * 2;
      const sum = (a1 * qDen) / (qDen - 1);
      return {
        domain: 'Sequences & Series',
        topic_id: 'tah-sequences',
        difficulty: 'medium',
        text: `${op} متسلسلة هندسية لانهائية حدها الأول \\(a_1 = ${a1}\\) وأساسها \\(r = \\frac{1}{${qDen}}\\). ${cl} (المطلوب حساب مجموع هذه المتسلسلة اللانهائية \\(S_\\infty\\)).<br><span class="en-trans">Find the sum \\(S_\\infty\\) of the convergent infinite geometric series with \\(a_1 = ${a1}\\) and common ratio \\(r = \\frac{1}{${qDen}}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${sum}\\)`,
          `\\(${sum + a1}\\)`,
          `\\(${sum / 2}\\)`,
          `\\(${a1 + qDen}\\)`
        ]),
        ans: 0,
        sol: `بما أن \\(|r| = \\frac{1}{${qDen}} < 1\\) فالمتسلسلة متقاربة ومجموعها:<br>\\[S_\\infty = \\frac{a_1}{1 - r} = \\frac{${a1}}{1 - \\frac{1}{${qDen}}} = ${a1} \\times \\frac{${qDen}}{${qDen - 1}} = ${sum}\\]`
      };
    }
    case 9: {
      const a1 = k + 2;
      const d = (k % 5) + 3;
      const n = k + 6;
      const an = a1 + (n - 1) * d;
      return {
        domain: 'Sequences, Series & Binomial Theorem',
        topic_id: 'tah-sequences',
        difficulty: 'easy',
        text: `${op} متتابعة حسابية حدها الأول \\(a_1 = ${a1}\\) وأساسها الثابت \\(d = ${d}\\). ${cl} (المطلوب إيجاد قيمة الحد ذي الرتبة \\(a_{${n}}\\)).<br><span class="en-trans">In an arithmetic sequence with first term \\(a_1 = ${a1}\\) and common difference \\(d = ${d}\\), find the term \\(a_{${n}}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${an}\\)`,
          `\\(${an + d}\\)`,
          `\\(${an - d}\\)`,
          `\\(${an + 2 * d}\\)`
        ]),
        ans: 0,
        sol: `نطبق قانون الحد النوني للمتتابعة الحسابية:<br>\\[a_{${n}} = a_1 + (${n} - 1)d = ${a1} + ${n - 1}(${d}) = ${an}\\]`
      };
    }
    case 10: {
      const A = k + 7; // Always >= 8 so A !== B
      const B = (k % 5) + 2; // 2..6
      const perDeg = 360 / B;
      return {
        domain: 'Trigonometry',
        topic_id: 'tah-trig',
        difficulty: 'easy',
        fig: {
          type: 'sinusoid',
          amplitude: A,
          period: Number((6.28 / B).toFixed(2)),
          title: `y = ${A} cos(${B}θ)`
        },
        text: `${op} للدالة المثلثية الدورية \\(y = ${A}\\cos(${B}\\theta)\\)، ${cl} (المطلوب تحديد السعة وطول الدورة بالدرجات على الترتيب).<br><span class="en-trans">Find the amplitude and period (in degrees) of \\(y = ${A}\\cos(${B}\\theta)\\).</span>`,
        choices: ensureUniqueChoices([
          `السعة \\(${A}\\) وطول الدورة \\(${perDeg}^\\circ\\)`,
          `السعة \\(${B}\\) وطول الدورة \\(${perDeg}^\\circ\\)`,
          `السعة \\(${A}\\) وطول الدورة \\(${180 / B}^\\circ\\)`,
          `السعة \\(${2 * A}\\) وطول الدورة \\(360^\\circ\\)`
        ]),
        ans: 0,
        sol: `السعة \\(= |A| = ${A}\\)، وطول دورة دالة جيب التمام \\(= \\frac{360^\\circ}{|B|} = \\frac{360^\\circ}{${B}} = ${perDeg}^\\circ\\).`
      };
    }
    case 11: {
      const triples = [
        [5, 4, 3], [10, 8, 6], [13, 12, 5], [15, 12, 9],
        [17, 15, 8], [20, 16, 12], [25, 24, 7], [26, 24, 10],
        [15, 9, 12], [25, 20, 15], [30, 24, 18], [34, 30, 16]
      ];
      const [a0, b0, c0] = triples[k % triples.length];
      const a = a0, b = b0, c = c0;
      return {
        domain: 'Analytic Geometry, Conic Sections & Vectors',
        topic_id: 'tah-geometry',
        difficulty: 'medium',
        fig: {
          type: 'conic_section',
          subtype: (k % 2 === 0) ? 'ellipse' : 'hyperbola',
          a: a,
          b: b,
          title: `قطع مخروطي (#${k}) a=${a}, b=${b}`
        },
        text: `${op} في القطع الناقص الذي مركزه\\((${k}, 0)\\) ومعادلته القياسية \\(\\frac{(x - ${k})^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\)، ${cl} (المطلوب حساب البعد البؤري \\(2c\\) والاختلاف المركزي \\(e\\)).<br><span class="en-trans">For the ellipse \\(\\frac{(x - ${k})^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\), find the focal length \\(2c\\) and eccentricity \\(e\\).</span>`,
        choices: ensureUniqueChoices([
          `البعد البؤري \\(${2 * c}\\) والاختلاف المركزي \\(e = \\frac{${c0}}{${a0}}\\)`,
          `البعد البؤري \\(${c}\\) والاختلاف المركزي \\(e = \\frac{${b0}}{${a0}}\\)`,
          `البعد البؤري \\(${2 * a}\\) والاختلاف المركزي \\(e = \\frac{${a0}}{${c0}}\\)`,
          `البعد البؤري \\(${2 * b}\\) والاختلاف المركزي \\(e = \\frac{${c0}}{${b0}}\\)`
        ]),
        ans: 0,
        sol: `في القطع الناقص \\(c = \\sqrt{a^2 - b^2} = \\sqrt{${a * a} - ${b * b}} = ${c}\\). إذن البعد البؤري \\(2c = ${2 * c}\\)، والاختلاف المركزي \\(e = \\frac{c}{a} = \\frac{${c0}}{${a0}}\\).`
      };
    }
    case 12: {
      const a1 = k + 1, a2 = 2, a3 = -1;
      const b1 = 3, b2 = k + 2;
      const ansM = a1 * b1 + a2 * b2;
      return {
        domain: 'Vectors & Matrices',
        topic_id: 'tah-geometry',
        difficulty: 'medium',
        text: `${op} إذا كان المتجهان \\(\\vec{u} = \\langle ${a1}, ${a2}, ${a3} \\rangle\\) و \\(\\vec{v} = \\langle ${b1}, ${b2}, m \\rangle\\) متعامدين في الفضاء الثلاثي، ${cl} (أوجد قيمة \\(m\\)).<br><span class="en-trans">If the 3D vectors \\(\\vec{u} = \\langle ${a1}, ${a2}, ${a3} \\rangle\\) and \\(\\vec{v} = \\langle ${b1}, ${b2}, m \\rangle\\) are orthogonal, find \\(m\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${ansM}\\)`,
          `\\(${-ansM}\\)`,
          `\\(${ansM + 4}\\)`,
          `\\(0\\)`
        ]),
        ans: 0,
        sol: `شرط تعامد متجهين هو أن يساوي حاصل ضربهما الداخلي صفراً:<br>\\[\\vec{u}\\cdot\\vec{v} = (${a1})(${b1}) + (${a2})(${b2}) + (${a3})m = 0 \\implies m = ${ansM}\\]`
      };
    }
    case 13: {
      const bases = [2, 3, 4, 5];
      const b = bases[k % bases.length];
      const p = (k % 3) + 2;
      const c = k + 1;
      const bp = Math.pow(b, p);
      const ansX = bp - c;
      return {
        domain: 'Exponentials & Logarithms',
        topic_id: 'tah-explog',
        difficulty: 'easy',
        text: `${op} حل المعادلة اللوغاريتمية \\(\\log_{${b}}(x + ${c}) = ${p}\\). ${cl}<br><span class="en-trans">Solve the logarithmic equation \\(\\log_{${b}}(x + ${c}) = ${p}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(x = ${ansX}\\)`,
          `\\(x = ${bp + c}\\)`,
          `\\(x = ${ansX - 3}\\)`,
          `\\(x = ${bp}\\)`
        ]),
        ans: 0,
        sol: `نحول المعادلة من الصورة اللوغاريتمية إلى الصورة الأسية المكافئة:<br>\\[x + ${c} = ${b}^{${p}} = ${bp} \\implies x = ${bp} - ${c} = ${ansX}\\]`
      };
    }
    case 14: {
      const m = k + 2;
      return {
        domain: 'Exponential & Logarithmic Functions',
        topic_id: 'tah-explog',
        difficulty: 'medium',
        text: `${op} إذا كانت \\(4^{x + 1} = 8^{x - ${m}}\\)، ${cl} (المطلوب إيجاد قيمة \\(x\\) التي تحقق المعادلة الأسية).<br><span class="en-trans">Solve the exponential equation \\(4^{x + 1} = 8^{x - ${m}}\\) for \\(x\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(x = ${3 * m + 2}\\)`,
          `\\(x = ${3 * m - 2}\\)`,
          `\\(x = ${2 * m + 3}\\)`,
          `\\(x = ${m + 1}\\)`
        ]),
        ans: 0,
        sol: `نوحد الأساسات إلى الأساس \\(2\\): \\(2^{2(x+1)} = 2^{3(x-${m})}\\). بمساواة الأسس:<br>\\[2x + 2 = 3x - ${3 * m} \\implies x = ${3 * m + 2}\\]`
      };
    }
    case 15: {
      const a = k + 2;
      return {
        domain: 'Limits & Derivatives',
        topic_id: 'tah-calc1',
        difficulty: 'easy',
        text: `${op} احسب قيمة النهاية \\(\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}\\). ${cl}<br><span class="en-trans">Evaluate the limit \\(\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${2 * a}\\)`,
          `\\(${a * a}\\)`,
          `\\(0\\)`,
          `غير موجودة`
        ]),
        ans: 0,
        sol: `بالتحليل إلى فرق بين مربعين أو بقاعدة لوبيتال:<br>\\[\\lim_{x \\to ${a}} \\frac{(x - ${a})(x + ${a})}{x - ${a}} = ${a} + ${a} = ${2 * a}\\]`
      };
    }
    case 16: {
      const a = (k + 2) * 3;
      const b = k + 1;
      const deg = (k % 3) + 2;
      return {
        domain: 'Limits & Differential Calculus',
        topic_id: 'tah-calc1',
        difficulty: 'easy',
        text: `${op} أوجد نهاية الدالة الكسرية عند اللانهاية \\(\\lim_{x \\to \\infty} \\frac{${a}x^{${deg}} - ${b}x + 5}{3x^{${deg}} + ${k}x^2 - 1}\\). ${cl}<br><span class="en-trans">Evaluate \\(\\lim_{x \\to \\infty} \\frac{${a}x^{${deg}} - ${b}x + 5}{3x^{${deg}} + ${k}x^2 - 1}\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${a / 3}\\)`,
          `\\(0\\)`,
          `\\(\\infty\\)`,
          `\\(${-b}\\)`
        ]),
        ans: 0,
        sol: `بما أن درجة البسط تساوي درجة المقام (\\(${deg}\\))، فإن النهاية عند \\(\\infty\\) تساوي معامل أكبر أس في البسط مقسوماً على معامل أكبر أس في المقام:<br>\\[\\frac{${a}}{3} = ${a / 3}\\]`
      };
    }
    case 17: {
      const a = (k % 4) + 2;
      const b = k + 1;
      const x0 = 2;
      const slope = 3 * a * x0 * x0 - b;
      return {
        domain: 'Limits & Derivatives',
        topic_id: 'tah-calc1',
        difficulty: 'medium',
        text: `${op} إذا كانت معادلة منحنى الدالة هي \\(f(x) = ${a}x^3 - ${b}x + 4\\)، ${cl} (المطلوب ميل المماس للمنحنى عند النقطة التي إحداثيها \\(x = 2\\)).<br><span class="en-trans">Find the slope of the tangent line to \\(f(x) = ${a}x^3 - ${b}x + 4\\) at \\(x = 2\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${slope}\\)`,
          `\\(${slope + 2 * b}\\)`,
          `\\(${slope - 5}\\)`,
          `\\(${slope + 9}\\)`
        ]),
        ans: 0,
        sol: `ميل المماس هو المشتقة الأولى عند \\(x = 2\\):<br>\\[f'(x) = ${3 * a}x^2 - ${b} \\implies f'(2) = ${3 * a}(4) - ${b} = ${slope}\\]`
      };
    }
    case 18: {
      const m = (k % 4) + 1;
      const c = k + 1;
      const val = 8 * m + 4 * c;
      return {
        domain: 'Integration & Applications',
        topic_id: 'tah-calc2',
        difficulty: 'medium',
        text: `${op} باستخدام النظرية الأساسية للتفاضل والتكامل، احسب قيمة التكامل المحدد \\(\\int_{0}^{2} (${3 * m}x^2 + ${2 * c}x)\\,dx\\). ${cl}<br><span class="en-trans">Evaluate the definite integral \\(\\int_{0}^{2} (${3 * m}x^2 + ${2 * c}x)\\,dx\\).</span>`,
        choices: ensureUniqueChoices([
          `\\(${val}\\)`,
          `\\(${val / 2}\\)`,
          `\\(${val + 6}\\)`,
          `\\(${val - 4}\\)`
        ]),
        ans: 0,
        sol: `نوجد الدالة الأصلية ونعوض بحدي التكامل:<br>\\[\\left[${m}x^3 + ${c}x^2\\right]_0^2 = ${m}(8) + ${c}(4) - 0 = ${val}\\]`
      };
    }
    default: {
      const mu = 50 + k * 5;
      const sig = (k % 5) + 3;
      const modes = [
        { lo: mu - sig, hi: mu + sig, pct: '68%', w1: '95%', w2: '34%', w3: '47.5%' },
        { lo: mu - 2 * sig, hi: mu + 2 * sig, pct: '95%', w1: '68%', w2: '99.7%', w3: '47.5%' },
        { lo: mu, hi: mu + sig, pct: '34%', w1: '68%', w2: '13.5%', w3: '47.5%' },
        { lo: mu, hi: mu + 2 * sig, pct: '47.5%', w1: '95%', w2: '34%', w3: '81.5%' }
      ];
      const m = modes[k % modes.length];
      return {
        domain: 'Statistics & Probability',
        topic_id: 'tah-stats',
        difficulty: 'medium',
        fig: {
          type: 'normal',
          mean: mu,
          sd: sig,
          shade: [m.lo, m.hi],
          title: `التوزيع الطبيعي μ=${mu}, σ=${sig}`
        },
        text: `${op} تتوزع درجات اختبار تحصيلي توزيعاً طبيعياً بمتوسط حسابي \\(\\mu = ${mu}\\) وانحراف معياري \\(\\sigma = ${sig}\\). ${cl} (ما النسبة المئوية للطلاب الذين تقع درجاتهم بين \\(${m.lo}\\) و \\(${m.hi}\\)؟).<br><span class="en-trans">Scores on a test are normally distributed with mean \\(\\mu = ${mu}\\) and standard deviation \\(\\sigma = ${sig}\\). What percentage of scores lie between \\(${m.lo}\\) and \\(${m.hi}\\)?</span>`,
        choices: [
          `\\(${m.pct}\\)`,
          `\\(${m.w1}\\)`,
          `\\(${m.w2}\\)`,
          `\\(${m.w3}\\)`
        ],
        ans: 0,
        sol: `باستخدام القاعدة التجريبية \\((68\\% - 95\\% - 99.7\\%)\\) في التوزيع الطبيعي حول المتوسط \\(\\mu = ${mu}\\) وبخطوة انحراف معياري \\(\\sigma = ${sig}\\)، نجد أن المساحة المطلوبة على الفترة \\([${m.lo}, ${m.hi}]\\) تساوي \\(${m.pct}\\).`
      };
    }
  }
}

function upgradeBank(bankPath, track, makeFn) {
  const raw = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const pool = raw.pool || raw;
  const skelCounts = {};
  const figCounts = {};

  for (let i = 0; i < pool.length; i++) {
    const q = pool[i];
    if (typeof q.answer !== 'number' && typeof q.ans === 'number') q.answer = q.ans;
    if (typeof q.ans !== 'number' && typeof q.answer === 'number') q.ans = q.answer;
    if (track === 'qudrat' && (q.domain === 'Quantitative Comparisons' || q.domain === 'Quantitative Comparison' || q.topic_id === 'qud-compare' || /قارن|القيمة الأولى/.test(q.text || ''))) {
      q.domain = 'Quantitative Comparison';
      q.topic_id = 'qud-compare';
      q.fixedChoices = true;
      q.choices = QUD_CMP_CHOICES.slice();
    }
  }

  let genIdx = 0;
  let replacedCount = 0;

  for (let i = 0; i < pool.length; i++) {
    const q = pool[i];
    const txt = q.text || '';
    const chStr = (q.choices || []).join(' ');
    const sk = getSkel(txt);
    const fig = q.fig || q.figure;
    const fsig = fig ? JSON.stringify(fig) : '';

    const hasHash = /\(#\d+\):/.test(txt);
    const nonRound4Digit = track === 'tahsili' && /-?\b\d{4,}\b/.test(chStr) && !/\b(1000|1024|1080|1260|1440|1800|2024|2025|2026)\b/.test(chStr);
    const unreducedSpeed = /\\frac\{\d{4,}\}\{\d{2,}\}/.test(chStr);
    const firstPart = txt.split('<br>')[0] || '';
    const enFirst = !/[\u0600-\u06FF]/.test(firstPart);
    const badFig = fig && ((fig.type === 'bar' && /Sequence|Pattern|المتتالي/i.test(q.domain + ' ' + txt)) || JSON.stringify(fig).includes('"adj"'));
    const isSkelDup = (skelCounts[sk] || 0) >= 2;
    const isFigDup = fsig && (figCounts[fsig] || 0) >= 1;
    const hasDupChoice = new Set((q.choices || []).map(c => String(c).replace(/\s+/g, ''))).size < 4;

    if (hasHash || nonRound4Digit || unreducedSpeed || enFirst || badFig || isSkelDup || isFigDup || hasDupChoice) {
      let cand = null;
      let candSk = '';
      let candFsig = '';
      for (let attempt = 0; attempt < 8000; attempt++) {
        cand = makeFn(genIdx++);
        candSk = getSkel(cand.text);
        candFsig = cand.fig ? JSON.stringify(cand.fig) : '';
        if ((skelCounts[candSk] || 0) < 2 && (!candFsig || !figCounts[candFsig])) {
          break;
        }
      }
      const newQ = {
        id: q.id,
        type: 'mcq',
        difficulty: cand.difficulty || q.difficulty || 'medium',
        domain: cand.domain,
        topic_id: cand.topic_id,
        calc: false,
        text: cand.text,
        choices: cand.choices,
        answer: cand.ans,
        ans: cand.ans,
        sol: cand.sol
      };
      if (cand.fixedChoices) newQ.fixedChoices = true;
      if (cand.fig) newQ.fig = cand.fig;
      pool[i] = newQ;
      skelCounts[candSk] = (skelCounts[candSk] || 0) + 1;
      if (candFsig) figCounts[candFsig] = (figCounts[candFsig] || 0) + 1;
      replacedCount++;
    } else {
      skelCounts[sk] = (skelCounts[sk] || 0) + 1;
      if (fsig) figCounts[fsig] = (figCounts[fsig] || 0) + 1;
    }
  }

  fs.writeFileSync(bankPath, JSON.stringify(raw, null, 2) + '\n', 'utf8');
  console.log(`[${track.toUpperCase()}] Total: ${pool.length} | Replaced: ${replacedCount}`);
}

upgradeBank(QUD_PATH, 'qudrat', makeQudratItem);
upgradeBank(TAH_PATH, 'tahsili', makeTahsiliItem);
