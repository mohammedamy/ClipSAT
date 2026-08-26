# -*- coding: utf-8 -*-
"""Arabic overrides for tah_ch4.py's 50 questions, in the same order."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
import tah_ch4


def or_and(i):
    d = tah_ch4.b.Q[i]
    order = d["_order"]
    pre = [None] * 4
    for k, orig_idx in enumerate(order):
        pre[orig_idx] = d["choices"][k]
    return [c.replace(" or ", " أو ").replace(" only", " فقط") for c in pre]


SECTION_AR = {
    "Right-triangle trigonometric ratios": "النسب المثلثية في المثلث القائم",
    "Special angles": "الزوايا الخاصة",
    "Converting between radians and degrees": "التحويل بين الراديان والدرجات",
    "The Pythagorean identity": "متطابقة فيثاغورس",
    "Simplifying trigonometric expressions": "تبسيط المقادير المثلثية",
    "Graphs: amplitude and period": "الرسوم البيانية: السعة والدور",
    "Graphs: phase shift and vertical shift": "الرسوم البيانية: الإزاحة الطورية والرأسية",
    "Solving basic trigonometric equations": "حل المعادلات المثلثية الأساسية",
    "Reference angles in other quadrants": "الزوايا المرجعية في الأرباع الأخرى",
    "Complementary angle relationships": "علاقات الزوايا المتتامة",
    "The unit circle: coordinates of key points": "دائرة الوحدة: إحداثيات النقاط الرئيسية",
    "Word problems: angles of elevation": "مسائل لفظية: زوايا الارتفاع",
}

OV = [
  {"q_ar": r"في المثلث القائم المُبيَّن، للزاوية $\theta$ ضلع مقابل $8$ ووتر $17$. أوجد $\sin\theta$.",
   "answer_ar": r"$\sin\theta=\dfrac{\text{المقابل}}{\text{الوتر}}=\dfrac{8}{17}$."},
  {"q_ar": r"في مثلث قائم، للزاوية $\theta$ ضلع مقابل $9$ ووتر $41$. أوجد $\cos\theta$.",
   "answer_ar": r"المجاور $=\sqrt{41^2-9^2}=40$؛ $\cos\theta=\dfrac{40}{41}$."},
  {"q_ar": r"في مثلث قائم، للزاوية $\theta$ ضلع مجاور $20$ ووتر $29$. أوجد $\sin\theta$.",
   "answer_ar": r"المقابل $=\sqrt{29^2-20^2}=21$؛ $\sin\theta=\dfrac{21}{29}$."},
  {"q_ar": r"في المثلث القائم المُبيَّن، الضلعان $9$ و$40$، والوتر $41$. أوجد $\sin\theta$ و$\cos\theta$ (حيث $\theta$ مقابلة للضلع طوله $9$).",
   "answer_ar": r"المقابل $=9$، المجاور $=40$، الوتر $=41$."},
  {"q_ar": r"في مثلث قائم، للزاوية $\theta$ ضلع مقابل $7$ وضلع مجاور $24$. أوجد $\tan\theta$.",
   "answer_ar": r"$\tan\theta=\dfrac{\text{المقابل}}{\text{المجاور}}=\dfrac{7}{24}$."},

  {"q_ar": r"اذكر القيمة الدقيقة لـ$\cos(30^\circ)$.", "answer_ar": r"$\cos(30^\circ)=\dfrac{\sqrt{3}}{2}$."},
  {"q_ar": r"اذكر القيمة الدقيقة لـ$\sin(45^\circ)$.", "answer_ar": r"$\sin(45^\circ)=\dfrac{\sqrt{2}}{2}$."},
  {"q_ar": r"اذكر القيمة الدقيقة لـ$\tan(30^\circ)$.",
   "answer_ar": r"$\tan(30^\circ)=\dfrac{\sin(30^\circ)}{\cos(30^\circ)}=\dfrac{1/2}{\sqrt{3}/2}=\dfrac{1}{\sqrt{3}}=\dfrac{\sqrt{3}}{3}$."},
  {"q_ar": r"اذكر القيمتين الدقيقتين لـ$\cos(90^\circ)$ و$\sin(0^\circ)$.",
   "answer_ar": r"$\cos(90^\circ)=0$ و$\sin(0^\circ)=0$.",
   "choices_ar_pre": ["كلاهما يساوي $0$", "كلاهما يساوي $1$", r"$\cos(90^\circ)=1$، $\sin(0^\circ)=0$",
                       r"$\cos(90^\circ)=0$، $\sin(0^\circ)=1$"]},
  {"q_ar": r"اذكر القيمة الدقيقة لـ$\tan(45^\circ)$.", "answer_ar": r"$\tan(45^\circ)=\dfrac{\sin(45^\circ)}{\cos(45^\circ)}=1$.",
   "choices_ar_pre": ["$1$", "$0$", r"$\sqrt{2}$", "غير معرّف"]},

  {"q_ar": r"حوّل $360^\circ$ إلى راديان.", "answer_ar": r"$360\times\dfrac{\pi}{180}=2\pi$."},
  {"q_ar": r"حوّل $45^\circ$ إلى راديان.", "answer_ar": r"$45\times\dfrac{\pi}{180}=\dfrac{\pi}{4}$."},
  {"q_ar": r"حوّل $\dfrac{3\pi}{4}$ راديان إلى درجات.", "answer_ar": r"$\dfrac{3\pi}{4}\times\dfrac{180}{\pi}=135^\circ$."},
  {"q_ar": r"حوّل $210^\circ$ إلى راديان.", "answer_ar": r"$210\times\dfrac{\pi}{180}=\dfrac{7\pi}{6}$."},

  {"q_ar": r"بمعلومية $\sin\theta=\dfrac{4}{5}$ حيث $\theta$ حادة، أوجد $\cos\theta$.",
   "answer_ar": r"$\cos^2\theta=1-\dfrac{16}{25}=\dfrac{9}{25}\Rightarrow\cos\theta=\dfrac{3}{5}$."},
  {"q_ar": r"بمعلومية $\cos\theta=\dfrac{7}{25}$ حيث $\theta$ حادة، أوجد $\sin\theta$.",
   "answer_ar": r"$\sin^2\theta=1-\dfrac{49}{625}=\dfrac{576}{625}\Rightarrow\sin\theta=\dfrac{24}{25}$."},
  {"q_ar": r"بمعلومية $\sin\theta=0.8$، أوجد $\cos^2\theta$.", "answer_ar": r"$\cos^2\theta=1-0.8^2=1-0.64=0.36$."},
  {"q_ar": r"بمعلومية $\cos\theta=\dfrac{12}{13}$ حيث $\theta$ حادة، أوجد $\sin\theta$.",
   "answer_ar": r"$\sin^2\theta=1-\dfrac{144}{169}=\dfrac{25}{169}\Rightarrow\sin\theta=\dfrac{5}{13}$."},

  {"q_ar": r"بسّط $\sin^2\theta+\cos^2\theta-1$.",
   "answer_ar": r"حسب متطابقة فيثاغورس، $\sin^2\theta+\cos^2\theta=1$، إذن الناتج $0$."},
  {"q_ar": r"بسّط $\dfrac{1-\sin^2\theta}{\cos\theta}$ (حيث $\cos\theta\neq0$).",
   "answer_ar": r"$1-\sin^2\theta=\cos^2\theta$، إذن $\dfrac{\cos^2\theta}{\cos\theta}=\cos\theta$."},
  {"q_ar": r"بسّط $\dfrac{\sin\theta}{\tan\theta}$ (حيث $\tan\theta\neq0$).",
   "answer_ar": r"$\tan\theta=\dfrac{\sin\theta}{\cos\theta}$، إذن $\dfrac{\sin\theta}{\sin\theta/\cos\theta}=\cos\theta$."},
  {"q_ar": r"بسّط $2\sin^2\theta+2\cos^2\theta$.", "answer_ar": r"$2(\sin^2\theta+\cos^2\theta)=2(1)=2$."},

  {"q_ar": r"اذكر السعة والدور لـ$y=4\sin(x)$.",
   "answer_ar": r"لـ$y=A\sin(Bx)$ حيث $B=1$: السعة $=4$، الدور $=\dfrac{2\pi}{1}=2\pi$.",
   "choices_ar_pre": [r"السعة $2\pi$، الدور $4$", r"السعة $4$، الدور $2\pi$", r"السعة $1$، الدور $4$",
                       r"السعة $4$، الدور $\pi$"]},
  {"q_ar": r"اذكر السعة والدور لـ$y=2\cos(3x)$.", "answer_ar": r"السعة $=2$؛ الدور $=\dfrac{2\pi}{3}$.",
   "choices_ar_pre": [r"السعة $2$، الدور $\dfrac{2\pi}{3}$", r"السعة $3$، الدور $\dfrac{2\pi}{2}$",
                       r"السعة $6$، الدور $2\pi$", r"السعة $2$، الدور $6\pi$"]},
  {"q_ar": r"اذكر السعة والدور لـ$y=5\sin\left(\dfrac{x}{2}\right)$.",
   "answer_ar": r"$B=\dfrac{1}{2}$: الدور $=\dfrac{2\pi}{1/2}=4\pi$؛ السعة $=5$.",
   "choices_ar_pre": [r"السعة $5$، الدور $\pi$", r"السعة $5$، الدور $4\pi$", r"السعة $\dfrac{5}{2}$، الدور $2\pi$",
                       r"السعة $2$، الدور $4\pi$"]},
  {"q_ar": r"منحنى جيب تمام سعته $3$ ودوره $4\pi$. اكتب معادلته بالصورة $y=A\cos(Bx)$.",
   "answer_ar": r"$B=\dfrac{2\pi}{\text{الدور}}=\dfrac{2\pi}{4\pi}=\dfrac{1}{2}$."},
  {"q_ar": r"يوضح الرسم البياني $y=A\sin(x)$ لقيمة ما لـ$A$. أوجد $A$ بقراءة سعة الرسم البياني.",
   "answer_ar": r"أقصى ارتفاع للمنحنى (السعة) هو $2$."},

  {"q_ar": r"يُزاح الرسم البياني لـ$y=\cos(x)$ بمقدار $\dfrac{\pi}{4}$ لليمين و3 وحدات للأعلى. اكتب المعادلة الجديدة.",
   "answer_ar": r"الإزاحة لليمين: نستبدل $x$ بـ$x-\dfrac{\pi}{4}$؛ للأعلى $3$: نضيف $3$."},
  {"q_ar": r"اذكر الإزاحة الرأسية ومحور التماثل لـ$y=2\sin(x)-4$.",
   "answer_ar": r"طرح $4$ يُزيح للأسفل $4$؛ محور التماثل هو $y=-4$.",
   "choices_ar_pre": [r"للأسفل 4، محور التماثل $y=-4$", r"للأعلى 4، محور التماثل $y=4$",
                       r"للأسفل 4، محور التماثل $y=2$", r"للأسفل 2، محور التماثل $y=-4$"]},
  {"q_ar": r"يُزاح الرسم البياني لـ$y=\sin(x)$ بمقدار $\dfrac{\pi}{6}$ لليسار. اكتب المعادلة الجديدة.",
   "answer_ar": r"الإزاحة لليسار: نستبدل $x$ بـ$x+\dfrac{\pi}{6}$."},
  {"q_ar": r"يوضح الرسم البياني $y=\sin(x)$ بعد إزاحته رأسيًا. أوجد محور التماثل الجديد بقراءة الرسم البياني.",
   "answer_ar": r"يتذبذب المنحنى بالتساوي حول $y=2$."},

  {"q_ar": r"حل $2\sin\theta=\sqrt{2}$ لـ$0^\circ\leq\theta<360^\circ$.",
   "answer_ar": r"$\sin\theta=\dfrac{\sqrt{2}}{2}$: $\theta=45^\circ$ أو $135^\circ$.",
   "choices_ar_pre": or_and(31)},
  {"q_ar": r"حل $\sqrt{3}\tan\theta=3$ لـ$0^\circ\leq\theta<360^\circ$.",
   "answer_ar": r"$\tan\theta=\sqrt{3}$: $\theta=60^\circ$ أو $240^\circ$ (الظل موجب في الربعين الأول والثالث).",
   "choices_ar_pre": or_and(32)},
  {"q_ar": r"حل $2\cos\theta=1$ لـ$0^\circ\leq\theta<360^\circ$.",
   "answer_ar": r"$\cos\theta=0.5$: $\theta=60^\circ$ أو $300^\circ$.",
   "choices_ar_pre": or_and(33)},
  {"q_ar": r"حل $\tan\theta=1$ لـ$0^\circ\leq\theta<360^\circ$.",
   "answer_ar": r"الظل موجب في الربعين الأول والثالث: $\theta=45^\circ$ أو $225^\circ$.",
   "choices_ar_pre": or_and(34)},
  {"q_ar": r"حل $2\sin\theta+1=0$ لـ$0^\circ\leq\theta<360^\circ$.",
   "answer_ar": r"$\sin\theta=-0.5$: $\theta=210^\circ$ أو $330^\circ$.",
   "choices_ar_pre": or_and(35)},

  {"q_ar": r"أوجد $\sin(120^\circ)$ باستخدام الزاوية المرجعية.",
   "answer_ar": r"الزاوية المرجعية $60^\circ$؛ الجيب موجب في الربع الثاني: $\sin(120^\circ)=\sin(60^\circ)=\dfrac{\sqrt{3}}{2}$."},
  {"q_ar": r"أوجد $\cos(210^\circ)$ باستخدام الزاوية المرجعية.",
   "answer_ar": r"الزاوية المرجعية $30^\circ$؛ جيب التمام سالب في الربع الثالث: $\cos(210^\circ)=-\cos(30^\circ)=-\dfrac{\sqrt{3}}{2}$."},
  {"q_ar": r"أوجد $\tan(330^\circ)$ باستخدام الزاوية المرجعية.",
   "answer_ar": r"الزاوية المرجعية $30^\circ$؛ الظل سالب في الربع الرابع: $\tan(330^\circ)=-\tan(30^\circ)=-\dfrac{\sqrt{3}}{3}$."},
  {"q_ar": r"أوجد $\sin(315^\circ)$ باستخدام الزاوية المرجعية.",
   "answer_ar": r"الزاوية المرجعية $45^\circ$؛ الجيب سالب في الربع الرابع: $\sin(315^\circ)=-\sin(45^\circ)=-\dfrac{\sqrt{2}}{2}$."},

  {"q_ar": r"بمعلومية $\sin(25^\circ)\approx0.423$، استخدم العلاقة $\sin\theta=\cos(90^\circ-\theta)$ لإيجاد $\cos(65^\circ)$.",
   "answer_ar": r"$\cos(65^\circ)=\cos(90^\circ-25^\circ)=\sin(25^\circ)\approx0.423$."},
  {"q_ar": r"بمعلومية $\cos(40^\circ)\approx0.766$، أوجد $\sin(50^\circ)$.",
   "answer_ar": r"$\sin(50^\circ)=\sin(90^\circ-40^\circ)=\cos(40^\circ)\approx0.766$."},
  {"q_ar": r"بمعلومية $\sin(70^\circ)\approx0.940$، أوجد $\cos(20^\circ)$.",
   "answer_ar": r"$\cos(20^\circ)=\cos(90^\circ-70^\circ)=\sin(70^\circ)\approx0.940$."},

  {"q_ar": r"اذكر إحداثيات $(\cos\theta,\sin\theta)$ للنقطة على دائرة الوحدة عند $\theta=30^\circ$.",
   "answer_ar": r"$\cos(30^\circ)=\dfrac{\sqrt{3}}{2}$، $\sin(30^\circ)=\dfrac{1}{2}$."},
  {"q_ar": r"اذكر إحداثيات النقطة على دائرة الوحدة عند $\theta=90^\circ$.",
   "answer_ar": r"$\cos(90^\circ)=0$، $\sin(90^\circ)=1$."},
  {"q_ar": r"اذكر إحداثيات النقطة على دائرة الوحدة عند $\theta=225^\circ$.",
   "answer_ar": r"$225^\circ$ في الربع الثالث، الزاوية المرجعية $45^\circ$: كلا الإحداثيين سالب، $-\dfrac{\sqrt{2}}{2}$."},
  {"q_ar": r"دائرة الوحدة المُبيَّنة تحدد نقطة عند الزاوية $\theta=60^\circ$. ما إحداثياتها؟",
   "answer_ar": r"$\cos(60^\circ)=0.5$، $\sin(60^\circ)=\dfrac{\sqrt{3}}{2}$."},

  {"q_ar": r"تحوم طائرة مسيّرة مباشرة فوق معلَم. من نقطة تبعد 150 مترًا عن قاعدة المعلَم، زاوية ارتفاع الطائرة المسيّرة $40^\circ$. أوجد ارتفاع الطائرة، لأقرب متر.",
   "answer_ar": r"$h=150\tan(40^\circ)\approx126$ م."},
  {"q_ar": r"يستند سلم إلى حائط، مكوّنًا زاوية $70^\circ$ مع الأرض. إذا كان السلم المُبيَّن طوله 12 مترًا، أوجد الارتفاع الذي يصل إليه على الحائط، لأقرب متر.",
   "answer_ar": r"$h=12\sin(70^\circ)\approx11$ م."},
  {"q_ar": r"من أعلى منحدر ارتفاعه 80 م، زاوية الانخفاض إلى قارب $25^\circ$. أوجد المسافة الأفقية من قاعدة المنحدر إلى القارب، لأقرب متر.",
   "answer_ar": r"$\tan(25^\circ)=\dfrac{80}{d}\Rightarrow d=\dfrac{80}{\tan(25^\circ)}\approx172$ م."},
]

assert len(OV) == 50, f"expected 50 overrides, got {len(OV)}"
