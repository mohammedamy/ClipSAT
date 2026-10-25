/**
 * ClipSAT Quiz → Google Forms UI  v1.1
 * ════════════════════════════════════════════════════════════════════════
 * Listens for the `clipsat:quiz-ready` event (fired by engine.js's quiz-
 * generation functions — genTest, genFullExam ×2 paths, genChapterQuiz —
 * right after each one builds its picked/shuffled question array) and
 * injects a small "Create Google Form" toolbar after the quiz output,
 * with zero changes to test-generator.njk's three template branches.
 *
 * detail shape: { source, title, trackId, questions: [{text, choices,
 *   correctIndex, type, points}], outEl }
 *
 * Also exposes window.ClipSATWorksheetForm(trackId, num, lang) for the
 * worksheet-library "Create Google Form" trigger (downloads-block.njk),
 * which has no live-generated .tg-out to hang a toolbar off of — it fetches
 * the worksheet's topic JSON directly and, if it contains any MCQ
 * questions, feeds them through the same creation flow.
 *
 * Deliberately Forms-only — no Google Classroom auto-posting. That would
 * need the classroom.coursework.students *restricted* scope, which
 * requires an annual paid third-party security assessment (CASA, ~$540+/yr
 * even via the cheapest assessor) once this ships beyond a handful of named
 * test users. Everything here only ever requests *sensitive* scopes
 * (forms.body, forms.responses.readonly, drive.file), which need standard
 * (free) verification only. A teacher on any LMS, Classroom included, uses
 * the "Copy shareable link" this produces and posts it themselves.
 *
 * No-ops entirely (renders no UI) until google-config.js is filled in —
 * this is the feature flag for the whole integration.
 */
(function () {
  'use strict';

  function configured() { return !!(window.ClipSATGoogle && window.ClipSATGoogle.configured); }

  function log(msg) { if (window.CLIPSAT_GOOGLE_DEBUG) { try { console.log('[ClipSATQuizUI]', msg); } catch (e) {} } }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // ── Quiz store: keeps the structured question data for each toolbar,
  // keyed by a small incrementing id (too big/volatile to stash in the DOM). ──
  var _quizzes = {};
  var _quizSeq = 0;

  // ── Created-forms list: metadata + the originating quizData (so the
  // results dashboard can compute correctness without re-deriving answers
  // from the Form itself), persisted per-tab via sessionStorage. ──
  var CREATED_KEY = 'clipsat_created_forms';
  function getCreatedForms() {
    try { return JSON.parse(sessionStorage.getItem(CREATED_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveCreatedForm(entry) {
    var list = getCreatedForms();
    list.unshift(entry);
    if (list.length > 20) list = list.slice(0, 20);
    try { sessionStorage.setItem(CREATED_KEY, JSON.stringify(list)); } catch (e) {}
  }

  // ══════════════════════════ Toolbar injection ══════════════════════════

  function toolbarHtmlFor(quizId, source, questions) {
    var frqCount = questions.filter(function (q) { return q.type === 'frq' || q.type === 'spr'; }).length;
    var note = '';
    if (frqCount > 0) {
      note = '<span class="cs-gform-note">Includes ' + frqCount + ' free-response / short-answer question' + (frqCount === 1 ? '' : 's') + ' with full math diagrams &amp; answer key feedback.</span>';
    }
    return '<div class="cs-gform-toolbar" data-quiz-id="' + quizId + '">'
      + '<button type="button" class="btn cs-gform-btn" onclick="window.ClipSATQuizUI.openCreateForm(this)">📝 Create Google Form</button>'
      + note
      + '</div>';
  }

  function handleQuizReady(e) {
    if (!configured()) return;
    var d = e.detail || {};
    if (!d.outEl || !d.questions || !d.questions.length) return;
    var quizId = 'q' + (++_quizSeq);
    _quizzes[quizId] = { title: d.title || 'ClipSAT Quiz', trackId: d.trackId, source: d.source, questions: d.questions };

    var existing = d.outEl.nextElementSibling;
    if (existing && existing.classList && existing.classList.contains('cs-gform-toolbar')) {
      existing.outerHTML = toolbarHtmlFor(quizId, d.source, d.questions);
    } else {
      d.outEl.insertAdjacentHTML('afterend', toolbarHtmlFor(quizId, d.source, d.questions));
    }
  }

  document.addEventListener('clipsat:quiz-ready', handleQuizReady);

  // ══════════════════════════ google-auth-modal ══════════════════════════

  var _pendingConnect = null; // {scopes, onDone}

  window.openGoogleAuthModal = function (explainHtml, scopes, onDone) {
    var m = document.getElementById('google-auth-modal');
    if (!m) return;
    var body = document.getElementById('google-auth-explain');
    if (body) body.innerHTML = explainHtml;
    var status = document.getElementById('google-auth-status');
    if (status) status.textContent = '';
    _pendingConnect = { scopes: scopes, onDone: onDone };
    m.classList.add('show');
  };
  window.closeGoogleAuthModal = function () {
    var m = document.getElementById('google-auth-modal');
    if (m) m.classList.remove('show');
    _pendingConnect = null;
  };
  window.googleAuthContinue = function () {
    if (!_pendingConnect) return;
    var consentCheck = document.getElementById('cs-gform-consent-check');
    window.ClipSATGoogleFormsConsent = consentCheck ? consentCheck.checked : false;
    var status = document.getElementById('google-auth-status');
    if (status) status.textContent = 'Opening Google sign-in…';
    var pending = _pendingConnect;
    window.ClipSATGoogle.ensureScopes(pending.scopes).then(function () {
      window.closeGoogleAuthModal();
      pending.onDone();
    }).catch(function (err) {
      if (status) status.textContent = err.message || 'Sign-in failed. Please try again.';
    });
  };

  var FORMS_EXPLAIN = '<p>ClipSAT will ask Google for permission to create a Google Form in your account with these questions, and to save the rendered question images it generates to your Google Drive (only files ClipSAT itself creates — nothing else in your Drive is touched). ClipSAT never sees or stores your Google password, and everything happens directly from your browser — nothing passes through a ClipSAT server.</p>'
    + '<div style="margin-top:14px; padding:12px; background:var(--panel, #f8fafc); border:1px solid var(--line, #e2e8f0); border-radius:8px;">'
    + '<label style="display:flex; align-items:flex-start; gap:8px; font-size:0.86rem; cursor:pointer; user-select:none; line-height:1.4;">'
    + '<input type="checkbox" id="cs-gform-consent-check" style="margin-top:2px" checked>'
    + '<span><strong>Image Visibility Consent:</strong> Google Forms requires math diagrams stored in your Drive to be link-viewable so Google Forms can display them to students. Check this to allow setting generated math images to link-viewable. If unchecked, files remain strictly private/restricted to your account (forms may not display diagrams to students).</span>'
    + '</label></div>';

  // ══════════════════════════ gform-panel-modal ══════════════════════════

  function openPanel(innerHtml) {
    var m = document.getElementById('gform-panel-modal');
    var body = document.getElementById('gform-panel-body');
    if (!m || !body) return;
    body.innerHTML = innerHtml;
    m.classList.add('show');
  }
  window.closeGformPanel = function () {
    var m = document.getElementById('gform-panel-modal');
    if (m) m.classList.remove('show');
  };

  function mathNoteHtml() {
    return '<p class="cs-gform-mathnote">Note: Google Forms can’t render math at all, so any question or answer choice with fractions, roots, integrals, and similar got an actual rendered image attached (saved to your Google Drive); simpler math (like <code>x²</code> or <code>2x+3</code>) reads fine as plain text, so those were left as text to keep things fast.</p>';
  }

  function imageFailureNoteHtml(failedImages, totalImages) {
    if (!failedImages) return '';
    return '<p class="cs-gform-mathnote" style="border-color:#dc2626;color:#991b1b">⚠ ' + failedImages + ' of ' + totalImages
      + ' rendered image' + (totalImages === 1 ? '' : 's') + ' failed to upload and fell back to plain text — that question/choice'
      + (failedImages === 1 ? ' still works, it' : 's still work, they') + ' just show as text instead of a picture. '
      + 'Open your browser console for the specific reason (usually a Drive quota or a transient network error) — regenerating the form often fixes it.</p>';
  }

  function renderCreatedView(entry) {
    var hasQuestions = (entry.quizData.questions || []).length > 0;
    var html = '<h3>✅ Form created</h3>'
      + '<p><strong>' + esc(entry.title) + '</strong></p>'
      + imageFailureNoteHtml(entry.failedImages, entry.totalImages)
      + (hasQuestions ? mathNoteHtml() : '')
      + '<label class="cs-gform-linklabel">Shareable link — works with any LMS (Canvas, Moodle, Schoology, etc.)</label>'
      + '<div class="cs-gform-linkrow"><input type="text" readonly value="' + esc(entry.responderUri) + '" id="cs-gform-link-input" onclick="this.select()">'
      + '<button type="button" class="btn ghost" onclick="window.ClipSATQuizUI.copyLink()">Copy</button></div>'
      + '<div class="cs-gform-actions">'
      + '<button type="button" class="btn ghost" onclick="window.ClipSATQuizUI.openResults(\'' + entry.formId + '\')">View results</button>'
      + '<a class="btn ghost" href="' + esc(entry.editUri) + '" target="_blank" rel="noopener">Open in Google Forms</a>'
      + '</div>';
    openPanel(html);
  }

  function findEntry(formId) {
    var list = getCreatedForms();
    for (var i = 0; i < list.length; i++) if (list[i].formId === formId) return list[i];
    return null;
  }

  // ── Create-form flow (shared by the toolbar path and the worksheet path) ──

  function beginCreateFlow(quizData) {
    function proceed() {
      // Mirrors forms-api.js's own job list (stem + every choice, each
      // independently checked) so this estimate matches the real progress
      // count that createFromQuiz's onProgress callback reports below.
      var mi = window.ClipSATMathImage;
      var mathCount = 0;
      (quizData.questions || []).forEach(function (q) {
        var fig = q.figure || q.fig || q.table || null;
        var fHtml = q.figureHtml || null;
        if (mi && mi.needsImage(q.text, fig, fHtml)) mathCount++;
        if (q.choices && q.choices.length) {
          q.choices.forEach(function (c, ci) {
            var cFig = (typeof c === 'object' && c !== null) ? (c.figure || c.fig || (c.type ? c : null)) : ((q.choiceFigures && q.choiceFigures[ci]) || null);
            var cHtml = (typeof c === 'string' && c.indexOf('<svg') !== -1) ? c : ((typeof c === 'object' && c && (c.figureHtml || c.svg)) ? (c.figureHtml || c.svg) : null);
            var cRaw = (typeof c === 'object' && c !== null) ? (c.text || c.label || '') : String(c != null ? c : '');
            if (cFig || cHtml) mathCount++;
            else if (mi && (mi.needsChoiceImage ? mi.needsChoiceImage(cRaw) : mi.needsImage(cRaw))) mathCount++;
          });
        }
      });
      openPanel('<h3>Creating your form…</h3><p class="cs-gform-note" id="cs-gform-progress">'
        + (mathCount ? ('Rendering ' + mathCount + ' question image' + (mathCount === 1 ? '' : 's') + ' — this can take a minute for longer quizzes.')
                     : 'This usually takes a few seconds.') + '</p>');
      window.ClipSATForms.createFromQuiz(quizData, function (done, total) {
        var p = document.getElementById('cs-gform-progress');
        if (p && total) p.textContent = 'Rendering question images… ' + done + ' / ' + total;
      }).then(function (res) {
        var entry = {
          formId: res.formId, responderUri: res.responderUri, editUri: res.editUri,
          title: quizData.title, createdAt: Date.now(), quizData: quizData,
          failedImages: res.failedImages || 0, totalImages: res.totalImages || 0
        };
        saveCreatedForm(entry);
        renderCreatedView(entry);
      }).catch(function (err) {
        openPanel('<h3>Something went wrong</h3><p class="cs-gform-note" style="color:#dc2626">' + esc(err.message) + '</p>'
          + '<button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
      });
    }
    if (window.ClipSATGoogle.isSignedIn()) { proceed(); return; }
    window.openGoogleAuthModal(FORMS_EXPLAIN, window.ClipSATForms.SCOPES, proceed);
  }

  window.ClipSATQuizUI = {
    openCreateForm: function (btn) {
      var wrap = btn.closest('.cs-gform-toolbar');
      var quizId = wrap && wrap.getAttribute('data-quiz-id');
      var quiz = quizId && _quizzes[quizId];
      if (!quiz) return;
      beginCreateFlow(quiz);
    },

    copyLink: function () {
      var input = document.getElementById('cs-gform-link-input');
      if (!input) return;
      input.select();
      try {
        navigator.clipboard.writeText(input.value);
      } catch (e) {
        document.execCommand('copy');
      }
    },

    openResults: function (formId) {
      var entry = findEntry(formId);
      if (!entry) return;
      openPanel('<h3>Loading results…</h3>');
      window.ClipSATForms.getResponses(entry.formId).then(function (responses) {
        renderResultsView(entry, responses);
      }).catch(function (err) {
        openPanel('<h3>Couldn’t load results</h3><p class="cs-gform-note" style="color:#dc2626">' + esc(err.message) + '</p>');
      });
    }
  };

  function renderResultsView(entry, responses) {
    var questions = entry.quizData.questions || [];
    var gradable = questions.filter(function (q) { return q.type !== 'frq' && q.correctIndex != null; });
    var maxPoints = gradable.reduce(function (s, q) { return s + (q.points || 1); }, 0);

    // Per-question tally: index questions by their (plain-text) title, since
    // that's how the Forms API keys answers back to us.
    var titleToQ = {};
    questions.forEach(function (q) { titleToQ[window.ClipSATForms.mathToPlainText(q.text)] = q; });

    var rows = responses.map(function (r) {
      var score = 0;
      if (r.totalScore != null) score = r.totalScore;
      var when = r.lastSubmittedTime ? new Date(r.lastSubmittedTime).toLocaleString() : '';
      var who = r.respondentEmail || 'Anonymous';
      return { who: who, score: score, when: when };
    });
    var avg = rows.length ? (rows.reduce(function (s, r) { return s + r.score; }, 0) / rows.length) : 0;

    var tableRows = rows.sort(function (a, b) { return b.score - a.score; }).map(function (r) {
      return '<tr><td>' + esc(r.who) + '</td><td>' + r.score + (maxPoints ? ' / ' + maxPoints : '') + '</td><td>' + esc(r.when) + '</td></tr>';
    }).join('');

    var html = '<h3>Results — ' + esc(entry.title) + '</h3>'
      + '<div class="cs-gform-stats"><span>' + responses.length + ' response' + (responses.length === 1 ? '' : 's') + '</span>'
      + (maxPoints ? '<span>Average: ' + avg.toFixed(1) + ' / ' + maxPoints + '</span>' : '')
      + '</div>'
      + (responses.length
        ? '<table class="cs-gform-table"><thead><tr><th>Respondent</th><th>Score</th><th>Submitted</th></tr></thead><tbody>' + tableRows + '</tbody></table>'
        : '<p class="cs-gform-note">No responses yet.</p>')
      + '<p class="cs-gform-note">This view is separate from your Classroom gradebook. Use Classroom’s <strong>Import grades</strong> button to record these scores there.</p>'
      + '<button type="button" class="btn ghost" onclick="window.ClipSATQuizUI.openResults(\'' + entry.formId + '\')">Refresh</button> '
      + '<button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>';
    openPanel(html);
  }

  // ══════════════════════════ Worksheet fast-follow ══════════════════════════

  // Called from the worksheet-library "Create Google Form" trigger
  // (renderLibrary() in engine.js). Fetches the worksheet's topic JSON and
  // filters to questions that actually carry an MCQ choices/correct pair —
  // most worksheets are free-response only, and this deliberately does NOT
  // fabricate MCQs for those; it tells the teacher plainly instead.
  window.ClipSATWorksheetForm = function (trackId, num, lang, title, worksheetFile) {
    if (!configured()) return;
    var isFullExam = (worksheetFile && /-exam(?:-ar)?\.html$/i.test(worksheetFile)) || /^EX\.\d+/i.test(String(num || ''));
    if (isFullExam) {
      openPanel('<h3>Loading full practice exam…</h3>');
      var examIdx = parseInt(String(num || '1').replace(/^EX\./i, ''), 10) || 1;
      var padIdx = String(examIdx).padStart(2, '0');
      var examFile = worksheetFile || (trackId + '-full-exam-' + padIdx + (lang === 'ar' ? '-ar' : '') + '-exam.html');
      var examUrl = '/downloads/' + encodeURIComponent(trackId) + '/' + encodeURIComponent(examFile);
      fetch(examUrl).then(function (r) {
        if (!r.ok) throw new Error('Full exam file not found (HTTP ' + r.status + ').');
        return r.text();
      }).then(function (htmlText) {
        var doc = new DOMParser().parseFromString(htmlText, 'text/html');
        var payloadEl = doc.getElementById('clipsat-cbt-payload');
        var payload = payloadEl ? JSON.parse(payloadEl.textContent) : null;
        var questions = [];
        if (payload && Array.isArray(payload.questions)) {
          payload.questions.forEach(function (meta) {
            var qEl = doc.getElementById('fep-q-' + meta.n);
            var solEl = doc.getElementById('fep-sol-' + meta.n);
            var figEl = qEl ? qEl.querySelector('.fep-figure') : null;
            var qBodyEl = qEl ? qEl.querySelector('.fep-qbody') : null;
            var choiceEls = qEl ? qEl.querySelectorAll('.fep-choice .fep-ctext') : [];
            var solBodyEl = solEl ? solEl.querySelector('.fep-sol-body') : null;
            var isMcq = meta.type === 'mcq' && choiceEls.length > 0;
            var choices = isMcq ? Array.prototype.slice.call(choiceEls).map(function (el) { return el.innerHTML; }) : [];
            var correctIdx = isMcq
              ? (typeof meta.correctIndex === 'number' && meta.correctIndex >= 0
                  ? meta.correctIndex
                  : ['A', 'B', 'C', 'D', 'E'].indexOf(String(meta.ans || '').trim().toUpperCase()))
              : null;
            questions.push({
              text: qBodyEl ? qBodyEl.innerHTML : '',
              choices: choices,
              correctIndex: correctIdx,
              type: isMcq ? 'mcq' : (meta.type === 'spr' ? 'spr' : 'frq'),
              points: Number(meta.marks) || 1,
              ans: !isMcq ? String(meta.ans || '') : '',
              sol: solBodyEl ? solBodyEl.innerHTML : '',
              figure: null,
              figureHtml: figEl ? figEl.innerHTML : null
            });
          });
        } else {
          var items = doc.querySelectorAll('.fep-item');
          Array.prototype.slice.call(items).forEach(function (qEl, idx) {
            var figEl = qEl.querySelector('.fep-figure');
            var qBodyEl = qEl.querySelector('.fep-qbody');
            var choiceEls = qEl.querySelectorAll('.fep-choice .fep-ctext');
            var isMcq = choiceEls.length > 0;
            questions.push({
              text: qBodyEl ? qBodyEl.innerHTML : ('Question ' + (idx + 1)),
              choices: isMcq ? Array.prototype.slice.call(choiceEls).map(function (el) { return el.innerHTML; }) : [],
              correctIndex: isMcq ? 0 : null,
              type: isMcq ? 'mcq' : 'frq',
              points: 1,
              ans: '',
              sol: '',
              figure: null,
              figureHtml: figEl ? figEl.innerHTML : null
            });
          });
        }
        if (!questions.length) {
          openPanel('<h3>No questions found</h3><p class="cs-gform-note">Could not extract questions from this exam paper.</p><button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
          return;
        }
        window.closeGformPanel();
        beginCreateFlow({ title: title || (payload && payload.examTitle) || ('Full Exam ' + num), trackId: trackId, source: 'full-exam', questions: questions });
      }).catch(function (err) {
        openPanel('<h3>Couldn’t load exam</h3><p class="cs-gform-note" style="color:#dc2626">' + esc(err.message) + '</p><button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
      });
      return;
    }

    openPanel('<h3>Checking worksheet…</h3>');
    var file = '/worksheet-data/' + trackId + '/' + num + (lang === 'ar' ? '-ar' : '') + '.json';
    fetch(file).then(function (r) {
      if (!r.ok) throw new Error('Worksheet data not found (HTTP ' + r.status + ').');
      return r.json();
    }).then(function (data) {
      var questions = [];
      (data.sections || []).forEach(function (sec) {
        (sec.questions || []).forEach(function (q) {
          var isMcq = Array.isArray(q.choices) && q.choices.length > 0 && typeof q.correct === 'number' && q.qtype !== 'FRQ' && q.question_type !== 'FRQ';
          if (isMcq) {
            questions.push({
              text: q.q || q.text || '',
              choices: q.choices.slice(),
              correctIndex: q.correct,
              type: 'mcq',
              points: Number(q.marks || q.points) || 1,
              sol: q.explanation || q.answer || '',
              figure: q.figure || q.fig || null,
              figureHtml: q.figureHtml || null
            });
          } else {
            var stem = String(q.q || q.text || '');
            if (Array.isArray(q.parts) && q.parts.length && stem.indexOf('(a)') === -1) {
              stem += '\n' + q.parts.join('\n');
            }
            var rawAns = q.answer != null ? String(q.answer) : (Array.isArray(q.answers) && q.answers.length ? q.answers.join(' | ') : '');
            var rawSol = q.explanation != null ? String(q.explanation) : rawAns;
            questions.push({
              text: stem,
              parts: q.parts || null,
              choices: [],
              correctIndex: null,
              type: 'frq',
              points: Number(q.marks || q.points) || 1,
              ans: rawAns,
              sol: rawSol,
              figure: q.figure || q.fig || null,
              figureHtml: q.figureHtml || null
            });
          }
        });
      });
      if (!questions.length) {
        openPanel('<h3>No questions found</h3><p class="cs-gform-note">This worksheet has no questions available for Google Forms.</p><button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
        return;
      }
      window.closeGformPanel();
      beginCreateFlow({ title: title || (data.title || ('Worksheet ' + num)), trackId: trackId, source: 'worksheet', questions: questions });
    }).catch(function (err) {
      openPanel('<h3>Couldn’t load worksheet</h3><p class="cs-gform-note" style="color:#dc2626">' + esc(err.message) + '</p><button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
    });
  };

  // Google Forms auth is strictly on-demand: when a teacher clicks "Create Google Form",
  // beginCreateFlow() checks window.ClipSATGoogle.isSignedIn(), and if not, opens the
  // explanation modal where the user explicitly clicks "Continue with Google".
  // Never trigger any automatic auth or silent restore on page load or track navigation.
})();
