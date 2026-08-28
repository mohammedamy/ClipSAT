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
    var mcqCount = questions.filter(function (q) { return q.type !== 'frq'; }).length;
    var note = '';
    if (source === 'genTest-legacy' || mcqCount === 0) {
      note = '<span class="cs-gform-note">These questions have no multiple-choice answers — the Form will use short-answer questions with no auto-grading.</span>';
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

  var FORMS_EXPLAIN = '<p>ClipSAT will ask Google for permission to create a Google Form in your account with these questions, and to save the rendered question images it generates to your Google Drive (only files ClipSAT itself creates — nothing else in your Drive is touched). ClipSAT never sees or stores your Google password, and everything happens directly from your browser — nothing passes through a ClipSAT server.</p>';

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
    var mcq = (entry.quizData.questions || []).some(function (q) { return q.type !== 'frq'; });
    var html = '<h3>✅ Form created</h3>'
      + '<p><strong>' + esc(entry.title) + '</strong></p>'
      + imageFailureNoteHtml(entry.failedImages, entry.totalImages)
      + (mcq ? mathNoteHtml() : '')
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
        if (mi && mi.needsImage(q.text)) mathCount++;
        if (q.type !== 'frq' && q.choices) {
          q.choices.forEach(function (c) { if (mi && mi.needsImage(c)) mathCount++; });
        }
      });
      openPanel('<h3>Creating your form…</h3><p class="cs-gform-note" id="cs-gform-progress">'
        + (mathCount ? ('Rendering ' + mathCount + ' math image' + (mathCount === 1 ? '' : 's') + ' — this can take a minute for longer quizzes.')
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
  window.ClipSATWorksheetForm = function (trackId, num, lang, title) {
    if (!configured()) return;
    openPanel('<h3>Checking worksheet…</h3>');
    var file = '/worksheet-data/' + trackId + '/' + num + (lang === 'ar' ? '-ar' : '') + '.json';
    fetch(file).then(function (r) {
      if (!r.ok) throw new Error('Worksheet data not found (HTTP ' + r.status + ').');
      return r.json();
    }).then(function (data) {
      var questions = [];
      (data.sections || []).forEach(function (sec) {
        (sec.questions || []).forEach(function (q) {
          if (q.choices && q.choices.length && typeof q.correct === 'number') {
            questions.push({ text: q.q || '', choices: q.choices, correctIndex: q.correct, type: 'mcq', points: 1 });
          }
        });
      });
      if (!questions.length) {
        openPanel('<h3>No multiple-choice questions</h3><p class="cs-gform-note">This worksheet doesn’t have multiple-choice questions available for Google Forms yet.</p><button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
        return;
      }
      window.closeGformPanel();
      beginCreateFlow({ title: title || (data.title || ('Worksheet ' + num)), trackId: trackId, source: 'worksheet', questions: questions });
    }).catch(function (err) {
      openPanel('<h3>Couldn’t load worksheet</h3><p class="cs-gform-note" style="color:#dc2626">' + esc(err.message) + '</p><button type="button" class="btn ghost" onclick="window.closeGformPanel()">Close</button>');
    });
  };

  // ══════════════════════════ Silent same-tab restore ══════════════════════════

  if (configured()) {
    var restore = function () {
      window.ClipSATGoogle.trySilentRestore(window.ClipSATForms.SCOPES);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restore);
    else restore();
  }
})();
