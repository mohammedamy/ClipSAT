'use strict';

function bi(en, ar) {
  return { en, ar };
}

function makeExplorerBlock(spec) {
  return {
    kind: 'explorer',
    title: bi(spec.titleEn, spec.titleAr),
    canvasId: spec.canvasId,
    ariaLabel: bi(spec.ariaEn, spec.ariaAr),
    dataPanel: {
      btnId: spec.canvasId + '_dataBtn',
      panelId: spec.canvasId + '_dataPanel',
      descId: spec.canvasId + '_dataDesc',
      rowsId: spec.canvasId + '_dataRows',
      caption: bi(spec.captionEn, spec.captionAr),
      columns: [
        bi('Parameter / Invariant', 'المتغير / الثابت الأولمبي'),
        bi('Computed Value', 'القيمة المحسوبة')
      ]
    },
    controls: [
      {
        id: spec.canvasId + '_s0',
        label: bi(spec.s0LabelEn, spec.s0LabelAr),
        min: spec.s0Min,
        max: spec.s0Max,
        value: spec.s0Val,
        step: spec.s0Step,
        valueDisplayId: spec.canvasId + '_v0',
        ariaLabel: bi(spec.s0AriaEn, spec.s0AriaAr)
      },
      {
        id: spec.canvasId + '_s1',
        label: bi(spec.s1LabelEn, spec.s1LabelAr),
        min: spec.s1Min,
        max: spec.s1Max,
        value: spec.s1Val,
        step: spec.s1Step,
        valueDisplayId: spec.canvasId + '_v1',
        ariaLabel: bi(spec.s1AriaEn, spec.s1AriaAr)
      }
    ],
    readouts: [
      {
        id: spec.canvasId + '_r0',
        label: bi(spec.r0LabelEn, spec.r0LabelAr),
        colorClass: 'indigo',
        value: spec.r0Init
      },
      {
        id: spec.canvasId + '_r1',
        label: bi(spec.r1LabelEn, spec.r1LabelAr),
        colorClass: 'amber',
        value: spec.r1Init
      },
      {
        id: spec.canvasId + '_r2',
        label: bi(spec.r2LabelEn, spec.r2LabelAr),
        colorClass: 'teal',
        value: spec.r2Init
      }
    ],
    note: bi(spec.noteEn, spec.noteAr)
  };
}

function makePractice(tagEn, tagAr, qEn, qAr, h1En, h1Ar, h2En, h2Ar, h3En, h3Ar, solEn, solAr) {
  return {
    kind: 'practiceProblem',
    question: bi(`<strong>[${tagEn}]</strong> ${qEn}`, `<strong>[${tagAr}]</strong> ${qAr}`),
    hints: [
      bi(h1En, h1Ar),
      bi(h2En, h2Ar),
      bi(h3En, h3Ar)
    ],
    solution: bi(solEn, solAr)
  };
}

module.exports = { bi, makeExplorerBlock, makePractice };
