# -*- coding: utf-8 -*-
"""Arabic overrides for tah_ch1.py's 50 questions, in the same order."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
import tah_ch1


def or_and(i):
    """Reconstruct pre-shuffle choice order for question i, then translate
    the bare English connectors ' or '/' and ' (outside any $...$ span) to
    Arabic, so choices_ar_pre can reuse the already-correct math instead of
    re-typing every fraction/root by hand."""
    d = tah_ch1.b.Q[i]
    order = d["_order"]
    pre = [None] * 4
    for k, orig_idx in enumerate(order):
        pre[orig_idx] = d["choices"][k]
    return [c.replace(" or ", " أو ").replace(" and ", " و ") for c in pre]


SECTION_AR = {
    "Solving linear equations": "حل المعادلات الخطية",
    "Expanding and simplifying expressions": "فك وتبسيط المقادير",
    "Factoring quadratic expressions": "تحليل المقادير التربيعية",
    "Solving quadratic equations by factoring": "حل المعادلات التربيعية بالتحليل",
    "The quadratic formula and the discriminant": "القانون العام والمميز",
    "Absolute value equations": "معادلات القيمة المطلقة",
    "Linear inequalities": "المتباينات الخطية",
    "Systems of linear equations": "أنظمة المعادلات الخطية",
    "Rational equations": "المعادلات النسبية",
    "Solving for a variable in a formula": "إيجاد متغير من صيغة",
    "Linear-quadratic systems": "أنظمة خطية-تربيعية",
    "Word problems: setting up and solving equations": "مسائل لفظية: صياغة المعادلات وحلها",
}

OV = [
  {"q_ar": r"حل $4x-9=15$.", "answer_ar": r"$4x=24\Rightarrow x=6$."},
  {"q_ar": r"حل $6(x-3)=2x+10$.", "answer_ar": r"$6x-18=2x+10\Rightarrow4x=28\Rightarrow x=7$."},
  {"q_ar": r"حل $\dfrac{2x-1}{3}=x-2$.", "answer_ar": r"$2x-1=3x-6\Rightarrow x=5$."},
  {"q_ar": r"حل $3(x+4)-7=2(x-1)$.", "answer_ar": r"$3x+5=2x-2\Rightarrow x=-7$."},
  {"q_ar": r"حل $5x+3=2x-9$.", "answer_ar": r"$3x=-12\Rightarrow x=-4$."},

  {"q_ar": r"افك وبسّط $4(3x-2)-3(x-5)$.", "answer_ar": r"$12x-8-3x+15=9x+7$."},
  {"q_ar": r"افك $(x+7)(x-3)$.", "answer_ar": r"$(x+7)(x-3)=x^2+4x-21$."},
  {"q_ar": r"افك $(3x-1)^2$.", "answer_ar": r"$(3x-1)^2=9x^2-6x+1$."},
  {"q_ar": r"بسّط $\dfrac{8x^2-12x}{4x}$ (حيث $x\neq0$).", "answer_ar": r"$\dfrac{4x(2x-3)}{4x}=2x-3$."},

  {"q_ar": r"حلّل $x^2+9x+14$ إلى عوامل.", "answer_ar": r"نحتاج عددين حاصل ضربهما $14$ ومجموعهما $9$: $2,7$."},
  {"q_ar": r"حلّل $x^2-3x-18$ إلى عوامل.", "answer_ar": r"نحتاج عددين حاصل ضربهما $-18$ ومجموعهما $-3$: $-6,3$."},
  {"q_ar": r"حلّل $3x^2+7x+2$ إلى عوامل.", "answer_ar": r"$(3x+1)(x+2)=3x^2+6x+x+2=3x^2+7x+2$."},
  {"q_ar": r"حلّل $x^2-81$ إلى عوامل باستخدام فرق مربعين.", "answer_ar": r"$x^2-9^2=(x-9)(x+9)$."},
  {"q_ar": r"حلّل $2x^2-x-6$ إلى عوامل.", "answer_ar": r"$(2x+3)(x-2)=2x^2-4x+3x-6=2x^2-x-6$."},

  {"q_ar": r"حل $x^2-7x+10=0$.", "answer_ar": r"$(x-2)(x-5)=0\Rightarrow x=2$ أو $x=5$.",
   "choices_ar_pre": or_and(14)},
  {"q_ar": r"حل $x^2+3x-10=0$.", "answer_ar": r"$(x+5)(x-2)=0\Rightarrow x=-5$ أو $x=2$.",
   "choices_ar_pre": or_and(15)},
  {"q_ar": r"حل $3x^2-11x-4=0$.", "answer_ar": r"$(3x+1)(x-4)=0\Rightarrow x=-\dfrac{1}{3}$ أو $x=4$.",
   "choices_ar_pre": or_and(16)},
  {"q_ar": r"حل $x^2-11x+24=0$.", "answer_ar": r"$(x-3)(x-8)=0\Rightarrow x=3$ أو $x=8$.",
   "choices_ar_pre": or_and(17)},

  {"q_ar": r"استخدم القانون العام لحل $x^2+5x+2=0$، وترك الإجابة بصورة جذرية.",
   "answer_ar": r"المميز $=25-8=17$؛ $x=\dfrac{-5\pm\sqrt{17}}{2}$."},
  {"q_ar": r"أوجد مميز $3x^2-6x+5=0$ وحدد عدد جذوره الحقيقية.",
   "answer_ar": r"$(-6)^2-4(3)(5)=36-60=-24<0$: لا توجد جذور حقيقية.",
   "choices_ar_pre": ["$-24$؛ لا توجد جذور حقيقية", "$96$؛ جذران حقيقيان",
                       "$-24$؛ جذر حقيقي واحد", "$24$؛ جذران حقيقيان"]},
  {"q_ar": r"أوجد مميز $x^2-8x+16=0$ وحدد عدد جذوره الحقيقية.",
   "answer_ar": r"$(-8)^2-4(1)(16)=64-64=0$: جذر حقيقي واحد مكرر.",
   "choices_ar_pre": ["$0$؛ جذر حقيقي واحد", "$64$؛ جذران حقيقيان", "$0$؛ جذران حقيقيان",
                       "$-64$؛ لا توجد جذور حقيقية"]},
  {"q_ar": r"استخدم القانون العام لحل $2x^2+3x-2=0$.",
   "answer_ar": r"المميز $=9+16=25$؛ $x=\dfrac{-3\pm5}{4}$: $x=0.5$ أو $x=-2$.",
   "choices_ar_pre": or_and(21)},

  {"q_ar": r"حل $|x-6|=11$.", "answer_ar": r"$x-6=11$ أو $x-6=-11$: $x=17$ أو $x=-5$.",
   "choices_ar_pre": or_and(22)},
  {"q_ar": r"حل $|3x+2|=13$.", "answer_ar": r"$3x+2=13\Rightarrow x=\dfrac{11}{3}$؛ $3x+2=-13\Rightarrow x=-5$.",
   "choices_ar_pre": or_and(23)},
  {"q_ar": r"حل $4|x-2|=20$.", "answer_ar": r"$|x-2|=5\Rightarrow x-2=5$ أو $x-2=-5$: $x=7$ أو $x=-3$.",
   "choices_ar_pre": or_and(24)},
  {"q_ar": r"حل $|2x-5|=9$.", "answer_ar": r"$2x-5=9\Rightarrow x=7$؛ $2x-5=-9\Rightarrow x=-2$.",
   "choices_ar_pre": or_and(25)},
  {"q_ar": r"يوضح الرسم البياني $y=|x-3|$. عند أي قيمة لـ$x$ يبلغ الرسم أدنى قيمة له؟",
   "answer_ar": r"رأس الشكل على هيئة حرف $V$ (أدنى نقطة) عند $x=3$."},

  {"q_ar": r"حل $3x-7<14$، وحدد الرسم البياني لمجموعة الحل.", "answer_ar": r"$3x<21\Rightarrow x<7$."},
  {"q_ar": r"حل $-4x+6\geq-10$، وحدد الرسم البياني لمجموعة الحل.",
   "answer_ar": r"$-4x\geq-16$؛ بالقسمة على $-4$ ينعكس اتجاه المتباينة: $x\leq4$."},
  {"q_ar": r"حل المتباينة المركبة $7<3x+1\leq19$.", "answer_ar": r"$6<3x\leq18\Rightarrow2<x\leq6$."},
  {"q_ar": r"حل $2x+5>-3$ و$x-1<6$ معًا (يجب تحقق الشرطين). أوجد مجموعة الحل المشتركة.",
   "answer_ar": r"$2x+5>-3\Rightarrow x>-4$؛ $x-1<6\Rightarrow x<7$. معًا: $-4<x<7$."},

  {"q_ar": r"حل النظام $x+y=14$، $x-y=4$.", "answer_ar": r"بالجمع: $2x=18\Rightarrow x=9$؛ ثم $y=5$."},
  {"q_ar": r"حل النظام $4x+3y=26$، $x-y=3$.",
   "answer_ar": r"$x=y+3\Rightarrow4(y+3)+3y=26\Rightarrow7y=14\Rightarrow y=2$؛ $x=5$."},
  {"q_ar": r"مجموع عددين يساوي 22 والفرق بينهما 6. أوجد العددين.",
   "answer_ar": r"$x+y=22$، $x-y=6\Rightarrow x=14$، $y=8$.",
   "choices_ar_pre": or_and(33)},
  {"q_ar": r"حل النظام $2x-y=7$، $3x+2y=21$.",
   "answer_ar": r"$y=2x-7\Rightarrow3x+2(2x-7)=21\Rightarrow7x=35\Rightarrow x=5$؛ $y=3$."},

  {"q_ar": r"حل $\dfrac{x}{x-3}=4$.", "answer_ar": r"$x=4(x-3)=4x-12\Rightarrow-3x=-12\Rightarrow x=4$."},
  {"q_ar": r"حل $\dfrac{3}{x+2}=\dfrac{1}{4}$.", "answer_ar": r"بضرب الطرفين تبادليًا: $12=x+2\Rightarrow x=10$."},
  {"q_ar": r"حل $\dfrac{x+2}{x-2}=3$.", "answer_ar": r"$x+2=3(x-2)=3x-6\Rightarrow8=2x\Rightarrow x=4$."},
  {"q_ar": r"حل $\dfrac{4}{x-1}=\dfrac{2}{x+2}$.",
   "answer_ar": r"بضرب الطرفين تبادليًا: $4(x+2)=2(x-1)\Rightarrow4x+8=2x-2\Rightarrow x=-5$."},
  {"q_ar": r"حل $\dfrac{6}{x}=\dfrac{2}{x-4}$.",
   "answer_ar": r"بضرب الطرفين تبادليًا: $6(x-4)=2x\Rightarrow6x-24=2x\Rightarrow x=6$."},

  {"q_ar": r"محيط مستطيل هو $P=2l+2w$. أوجد $l$.",
   "answer_ar": r"$P-2w=2l\Rightarrow l=\dfrac{P-2w}{2}$ (أو بصورة مكافئة $\dfrac{P}{2}-w$)."},
  {"q_ar": r"صيغة الفائدة البسيطة هي $I=Prt$. أوجد $r$.",
   "answer_ar": r"بقسمة الطرفين على $Pt$: $r=\dfrac{I}{Pt}$."},
  {"q_ar": r"صيغة $F=\dfrac{9}{5}C+32$ تحوّل درجة مئوية إلى فهرنهايت. أوجد $C$.",
   "answer_ar": r"$F-32=\dfrac{9}{5}C\Rightarrow C=\dfrac{5(F-32)}{9}$."},
  {"q_ar": r"حجم أسطوانة هو $V=\pi r^2h$. أوجد $h$.",
   "answer_ar": r"بقسمة الطرفين على $\pi r^2$: $h=\dfrac{V}{\pi r^2}$."},

  {"q_ar": r"حل النظام $y=x^2-4$، $y=3x$.",
   "answer_ar": r"$x^2-4=3x\Rightarrow x^2-3x-4=0\Rightarrow(x-4)(x+1)=0$: $x=4,y=12$ أو $x=-1,y=-3$.",
   "choices_ar_pre": or_and(44)},
  {"q_ar": r"حل النظام $y=x^2$، $y=2x+3$.",
   "answer_ar": r"$x^2-2x-3=0\Rightarrow(x-3)(x+1)=0$: $x=3,y=9$ أو $x=-1,y=1$.",
   "choices_ar_pre": or_and(45)},
  {"q_ar": r"يوضح الرسم البياني النظام $y=x^2-4$، $y=3x$. ما نقطتا التقاطع؟",
   "answer_ar": r"يتقاطع المنحنى والخط عند $(-1,-3)$ و$(4,12)$.",
   "choices_ar_pre": or_and(46)},
  {"q_ar": r"يوضح الرسم البياني النظام $y=x^2$، $y=2x+3$. ما نقطتا التقاطع؟",
   "answer_ar": r"يتقاطع المنحنى والخط عند $(-1,1)$ و$(3,9)$.",
   "choices_ar_pre": or_and(47)},

  {"q_ar": r"حديقة مستطيلة طولها أكبر من عرضها بمقدار 5 أمتار، ومساحتها 84 مترًا مربعًا. أوجد العرض.",
   "answer_ar": r"$w(w+5)=84\Rightarrow(w+12)(w-7)=0$؛ الجذر الموجب هو $w=7$."},
  {"q_ar": r"تفرض خطة بيانات جوال رسمًا شهريًا ثابتًا قدره 40 ريالًا زائد 2 ريال لكل غيغابايت مستخدم. إذا كانت فاتورة مستخدم 68 ريالًا، كم غيغابايت استخدم؟",
   "answer_ar": r"$40+2g=68\Rightarrow2g=28\Rightarrow g=14$."},
]

assert len(OV) == 50, f"expected 50 overrides, got {len(OV)}"
