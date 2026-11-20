/**
 * ClipSAT Teacher/Parent View  v1.2
 * ════════════════════════════════════════════════════════════════════════
 * Simple class-code roster view on top of cloud-sync.js's Supabase backend
 * (see SUPABASE_SETUP.md + supabase/schema.sql's "classes"/"class_members"
 * tables, and the "teacher reads roster …" RLS policies). No separate
 * "teacher" role — creating a class makes you its owner for that class;
 * any signed-in user can own classes, join others, or both.
 *
 * Each roster row shows overall accuracy plus a "Last active" signal (from
 * chapter_visits) and an expandable "Weakest ▾" list of that student's
 * lowest-accuracy track/domain buckets (from accuracy, kept at track/domain
 * granularity instead of only summed) — the "see aggregate mastery" half of
 * Pillar 3's teacher/parent view.
 *
 * Assignments (supabase/schema.sql's "assignments"/"assignment_completions"
 * tables) cover the other half of that same roadmap line — "assign a
 * chapter/mock exam to a roster": a teacher picks a track + writes a free-
 * text label (e.g. "Chapter 3: Derivatives"), every member of the class
 * sees it under "Classes you've joined" and self-reports done/not done.
 * Completion is a self-report, not derived from accuracy/chapter_visits —
 * the bank/quiz engine has no way to tie one attempt to one assignment, so
 * a checkbox is honest about what it is instead of guessing.
 *
 * Privacy: joining is opt-in (a code the student was given, never
 * auto-shared), the display name shown to a teacher is per-class and
 * optional, and leaving a class immediately cuts off the teacher's read
 * access — enforced server-side by RLS, not by this file.
 *
 * This whole module stays inert (nav button hidden) until cloud-sync.js
 * is configured AND the user is signed in — same "no accounts, nothing
 * changes" guarantee as cloud-sync.js itself.
 *
 * Public API — window.TeacherView
 * ─────────────────────────────────
 *   .openModal() / .closeModal()
 * The individual actions (create/join/leave/delete) are wired directly
 * from the modal's onclick handlers — see the window.tv* functions below.
 */
(function () {
  'use strict';

  var _sb = null;

  function getClient() {
    if (_sb) return _sb;
    if (window.ClipSATCloud && window.ClipSATCloud.getClient) _sb = window.ClipSATCloud.getClient();
    return _sb;
  }

  function isReady() {
    return !!(window.ClipSATCloud && window.ClipSATCloud.configured && window.ClipSATCloud.isSignedIn() && getClient());
  }

  function escT(s) {
    return s != null && s !== ''
      ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
      : '';
  }

  function safeId(id) {
    return String(id == null ? '' : id).replace(/[^a-zA-Z0-9_-]/g, '');
  }

  function safeCsvCell(cell) {
    var s = String(cell == null ? '' : cell);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  }

  function setStatus(id, msg, isError) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg || '';
    el.style.color = isError ? '#dc2626' : '';
  }

  function randomCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I — avoids ambiguity when read aloud/handwritten
    var out = '';
    for (var i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
  }

  function isAr() {
    return (typeof window !== 'undefined' && window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar') ||
           (typeof document !== 'undefined' && document.documentElement && (document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl'));
  }

  function tvT(en, ar) {
    return isAr() ? ar : en;
  }

  function timeAgo(ms) {
    var diff = Date.now() - ms;
    if (diff < 0) diff = 0;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return tvT('just now', 'الآن');
    if (mins < 60) return tvT(mins + 'm ago', 'منذ ' + mins + ' د');
    var hrs = Math.floor(mins / 60);
    if (hrs < 24) return tvT(hrs + 'h ago', 'منذ ' + hrs + ' س');
    var days = Math.floor(hrs / 24);
    if (days < 30) return tvT(days + 'd ago', 'منذ ' + days + ' ي');
    var months = Math.floor(days / 30);
    if (months < 12) return tvT(months + 'mo ago', 'منذ ' + months + ' ش');
    var yrs = Math.floor(months / 12);
    return tvT(yrs + 'y ago', 'منذ ' + yrs + ' سنة');
  }

  // Weakest track/domain buckets for one student, worst-accuracy first —
  // same "weakest first" idea as the student's own AccuracyLog.chapterMastery
  // (src/scripts/engine.js), just spanning every track instead of one.
  // Buckets under MIN_ATTEMPTS are dropped so a single lucky/unlucky
  // question doesn't misrepresent a student as mastering or failing a topic.
  function weakestBuckets(bucketMap) {
    if (!bucketMap) return [];
    var MIN_ATTEMPTS = 3;
    return Object.keys(bucketMap).map(function (k) { return bucketMap[k]; })
      .filter(function (b) { return b.t >= MIN_ATTEMPTS; })
      .sort(function (a, b) { return (a.c / a.t) - (b.c / b.t); })
      .slice(0, 3);
  }

  // Track id -> display label, for the "assign to this class" track picker.
  // Synchronized with all 31 curriculum tracks in content/*/_meta.json.
  var TRACK_LABELS = {
    a2level: 'A2 Level Mathematics',
    act: 'ACT Math',
    act2: 'ACT Math Level 1',
    act2l2: 'ACT Math Level 2',
    addmath: 'IGCSE Additional Mathematics (0606)',
    alg2: 'Algebra 2',
    algebra: 'Algebra 1',
    apab: 'AP Calculus AB',
    apbc: 'AP Calculus BC',
    appc: 'AP Precalculus',
    apstats: 'AP Statistics',
    aslevel: 'AS Level Mathematics',
    calculus: 'Calculus',
    edexcel: 'Edexcel International GCSE (4MA1)',
    est: 'EST I Literacy & Math',
    est2: 'EST II Math Level 1',
    est2l2: 'EST II Math Level 2',
    gaten: 'GAT Quantitative (English)',
    geo: 'Geometry',
    ibhl: 'IB Math HL (AA/AI)',
    ibsl: 'IB Math SL (AA/AI)',
    igcse: 'Cambridge IGCSE (0580)',
    linalg: 'Linear Algebra',
    mathai: 'Mathematics for AI & Machine Learning',
    mvc: 'Multivariable Calculus',
    odes: 'Differential Equations',
    olympiad: 'Math Olympiad & Competition Math',
    precalc: 'Pre-Calculus',
    qudrat: 'GAT Qudrat (قدرات)',
    sat: 'Digital SAT Math',
    tahsili: 'SAAT Tahsili (تحصيلي)'
  };

  function trackOptionsHtml() {
    return Object.keys(TRACK_LABELS).sort(function (a, b) {
      return TRACK_LABELS[a].localeCompare(TRACK_LABELS[b]);
    }).map(function (k) {
      return '<option value="' + k + '">' + escT(TRACK_LABELS[k]) + '</option>';
    }).join('');
  }

  function syncModalLocale() {
    var box = document.getElementById('teacher-view-box');
    if (!box) return;
    var ar = isAr();
    box.setAttribute('dir', ar ? 'rtl' : 'ltr');
    var h3 = box.querySelector('h3');
    if (h3) h3.textContent = ar ? '🏫 الفصول الدراسية' : '🏫 Classes';
    var intro = box.querySelector(':scope > p');
    if (intro) intro.textContent = ar
      ? 'أنشئ فصلاً لتحصل على رمز مشاركة لطلابك، أو انضم إلى فصل باستخدام الرمز الذي أعطاك إياه معلمك.'
      : 'Create a class to get a code you can share with students, or join one with a code your teacher gave you. You can do both.';
    var secs = box.querySelectorAll('.tv-section');
    if (secs[0]) {
      var h40 = secs[0].querySelector('h4'); if (h40) h40.textContent = ar ? 'انضم إلى فصل' : 'Join a class';
      var jc = document.getElementById('tv-join-code'); if (jc) jc.placeholder = ar ? 'رمز الفصل، مثل MATH7F' : 'Class code, e.g. MATH7F';
      var jn = document.getElementById('tv-join-name'); if (jn) jn.placeholder = ar ? 'اسمك (اختياري — يظهر للمعلم)' : 'Your name (optional — shown to the teacher)';
      var jcs = secs[0].querySelector('label[for="tv-join-consent"] span');
      if (jcs) jcs.textContent = ar
        ? 'أوافق على مشاركة دقة إجاباتي ودرجات واجباتي في مسار هذا الفصل فقط مع المعلم (المسارات الأخرى تبقى خاصة ويمكن سحب الموافقة بالمغادرة في أي وقت).'
        : 'I consent to sharing my class-scoped accuracy & assignment scores with this teacher (other tracks stay private; revocable anytime by leaving).';
      var jb = secs[0].querySelector('button.cloud-auth-send'); if (jb) jb.textContent = ar ? 'انضم للفصل' : 'Join class';
    }
    if (secs[1]) {
      var h41 = secs[1].querySelector('h4'); if (h41) h41.textContent = ar ? 'إنشاء فصل جديد' : 'Create a class';
      var cn = document.getElementById('tv-create-name'); if (cn) cn.placeholder = ar ? 'اسم الفصل، مثل: قدرات الشعبة 3' : 'Class name, e.g. Period 3 Calculus';
      var ct0 = box.querySelector('#tv-create-track option[value=""]');
      if (ct0) ct0.textContent = ar ? 'اختر المسار الأساسي للفصل (يحدد خصوصية الطالب)' : 'Select primary class track (scopes student privacy)';
      var cb = secs[1].querySelector('button.cloud-auth-send'); if (cb) cb.textContent = ar ? 'إنشاء الفصل' : 'Create class';
    }
    if (secs[2]) {
      var h42 = secs[2].querySelector('h4'); if (h42) h42.textContent = ar ? '🔐 التحقق من شهادة الواجب' : '🔐 Verify Assignment Certificate';
      var vc = document.getElementById('tv-verify-code'); if (vc) vc.placeholder = ar ? 'رمز CS-VERIFIED-… أو CLIP-…' : 'CS-VERIFIED-… or CLIP-…';
      var vb = secs[2].querySelector('button.cloud-auth-send'); if (vb) vb.textContent = ar ? 'تحقق' : 'Verify';
    }
  }

  // ── Modal open/close ───────────────────────────────────────────────
  window.openTeacherView = function () {
    var m = document.getElementById('teacher-view-modal');
    if (!m) return;
    if (m.removeAttribute) m.removeAttribute('inert');
    syncModalLocale();
    var trSel = document.getElementById('tv-create-track');
    if (trSel && trSel.options && trSel.options.length <= 1) {
      trSel.insertAdjacentHTML('beforeend', trackOptionsHtml());
      if (window.CLIPSAT_TRACK && TRACK_LABELS[window.CLIPSAT_TRACK]) {
        trSel.value = window.CLIPSAT_TRACK;
      }
    }
    m.classList.add('show');
    refreshAll();
  };
  window.closeTeacherView = function () {
    var m = document.getElementById('teacher-view-modal');
    if (m) {
      m.classList.remove('show');
      if (m.setAttribute) m.setAttribute('inert', '');
    }
  };
  window.tvOpenCustomCart = function () {
    window.closeTeacherView();
    if (window.CSCustomCart && typeof window.CSCustomCart.open === 'function') {
      window.CSCustomCart.open();
      return;
    }
    if (typeof window._ensureTeacherMode === 'function') {
      window._ensureTeacherMode().then(function () {
        if (window.CSCustomCart && typeof window.CSCustomCart.open === 'function') {
          window.CSCustomCart.open();
        }
      }, function () {});
    }
  };

  // ── Create a class (retries once on a code collision — astronomically
  //    unlikely at this scale, but cheap to guard against) ──────────────
  window.tvCreateClass = function () {
    var sb = getClient();
    var input = document.getElementById('tv-create-name');
    var trSel = document.getElementById('tv-create-track');
    var name = input && input.value.trim();
    var trackVal = (trSel && trSel.value && TRACK_LABELS[trSel.value]) ? trSel.value : null;
    if (!sb || !name) { setStatus('tv-create-status', tvT('Enter a class name first.', 'أدخل اسم الفصل أولاً.'), true); return; }
    setStatus('tv-create-status', tvT('Creating…', 'جاري الإنشاء…'));
    var uid = window.ClipSATCloud.currentUserId();
    var attempt = function (triesLeft, omitTrackCol) {
      var code = randomCode();
      var rowPayload = { owner_id: uid, name: name, code: code };
      if (trackVal && !omitTrackCol) rowPayload.track = trackVal;
      sb.from('classes').insert(rowPayload).select().single()
        .then(function (r) {
          if (r.error) {
            if (!omitTrackCol && trackVal && /track|column/i.test(r.error.message || '')) {
              attempt(triesLeft, true);
              return;
            }
            if (triesLeft > 0 && /duplicate|unique/i.test(r.error.message || '')) { attempt(triesLeft - 1, omitTrackCol); return; }
            setStatus('tv-create-status', r.error.message, true);
            return;
          }
          if (input) input.value = '';
          setStatus('tv-create-status', tvT('Created — share code: ', 'تم الإنشاء — رمز المشاركة: ') + code);
          refreshMyClasses();
        });
    };
    attempt(2, false);
  };

  // ── Join a class by code (requires explicit student consent + server rate limit) ──
  window.tvJoinClass = function () {
    var sb = getClient();
    var codeInput = document.getElementById('tv-join-code');
    var nameInput = document.getElementById('tv-join-name');
    var consentBox = document.getElementById('tv-join-consent');
    var code = codeInput && codeInput.value.trim();
    if (!sb || !code) { setStatus('tv-join-status', tvT('Enter a class code first.', 'أدخل رمز الفصل أولاً.'), true); return; }
    if (consentBox && !consentBox.checked) {
      setStatus('tv-join-status', tvT('Please confirm data-sharing consent before joining this class.', 'يرجى تأكيد الموافقة على مشاركة التقدم قبل الانضمام.'), true);
      return;
    }
    setStatus('tv-join-status', tvT('Joining…', 'جاري الانضمام…'));
    var disp = nameInput ? nameInput.value.trim() : null;
    sb.rpc('join_class_by_code', { p_code: code, p_display_name: disp, p_consent: true })
      .then(function (r) {
        if (r.error && /p_consent|function public\.join_class_by_code/i.test(r.error.message || '')) {
          return sb.rpc('join_class_by_code', { p_code: code, p_display_name: disp });
        }
        return r;
      })
      .then(function (r) {
        if (r.error) { setStatus('tv-join-status', r.error.message, true); return; }
        var row = r.data && r.data[0];
        setStatus('tv-join-status', row ? (tvT('Joined: ', 'تم الانضمام: ') + row.class_name) : tvT('Joined!', 'تم الانضمام!'));
        if (codeInput) codeInput.value = '';
        refreshMyMemberships();
      });
  };

  // ── Verify server HMAC assignment certificate (or flag offline self-report) ──
  window.tvVerifyAssignmentCode = function () {
    var sb = getClient();
    var inp = document.getElementById('tv-verify-code');
    var raw = inp && inp.value ? inp.value.trim() : '';
    if (!raw) { setStatus('tv-verify-status', tvT('Paste a CS-VERIFIED-… certificate code first.', 'ألصق رمز شهادة CS-VERIFIED-… أولاً.'), true); return; }
    var srvMatch = /^CS-VERIFIED-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})-([0-9a-f]{16,64})$/i.exec(raw);
    if (srvMatch) {
      if (!sb) { setStatus('tv-verify-status', tvT('Sign in to verify server HMAC certificates.', 'سجّل الدخول للتحقق من شهادات الخادم المشفرة.'), true); return; }
      setStatus('tv-verify-status', tvT('Verifying cryptographic HMAC signature…', 'جاري التحقق من التوقيع التشفيري…'));
      sb.rpc('verify_assignment_certificate', {
        p_submission_id: srvMatch[1].toLowerCase(),
        p_sig_prefix: srvMatch[2].toLowerCase()
      }).then(function (r) {
        if (r.error) { setStatus('tv-verify-status', r.error.message, true); return; }
        var row = Array.isArray(r.data) ? r.data[0] : r.data;
        if (row && row.valid) {
          var pct = row.total ? Math.round((row.score / row.total) * 100) : 0;
          setStatus('tv-verify-status', tvT('✅ Authentic Server HMAC Certificate · Track: ', '✅ شهادة خادم موثقة · المسار: ') + (TRACK_LABELS[row.track] || row.track) + tvT(' · Score: ', ' · الدرجة: ') + row.score + '/' + row.total + ' (' + pct + '%)', false);
        } else {
          setStatus('tv-verify-status', tvT('❌ Invalid or tampered certificate signature.', '❌ توقيع شهادة غير صالح أو تم التلاعب به.'), true);
        }
      });
      return;
    }
    if (typeof window.CSVerifyCertCode === 'function') {
      var legacy = window.CSVerifyCertCode(raw);
      if (legacy && legacy.valid) {
        setStatus('tv-verify-status', tvT('⚠️ Offline guest code (', '⚠️ رمز زائر غير متصل (') + legacy.score + '/' + legacy.total + ', ' + legacy.pct + tvT('%). Ask student to sign in for an unforgeable CS-VERIFIED certificate.', '%). اطلب من الطالب تسجيل الدخول لإصدار شهادة CS-VERIFIED موثقة.'), false);
        return;
      }
    }
    setStatus('tv-verify-status', tvT('❌ Invalid or forged verification code.', '❌ رمز تحقق غير صالح.'), true);
  };

  // ── Leave (as a student) / delete (as the owner) ───────────────────
  window.tvLeaveClass = function (classId) {
    var sb = getClient();
    if (!sb || !window.confirm(tvT('Leave this class? The teacher will no longer see your progress.', 'مغادرة هذا الفصل؟ لن يرى المعلم تقدمك بعد الآن.'))) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('class_members').delete().eq('class_id', classId).eq('student_id', uid)
      .then(function () { refreshMyMemberships(); });
  };
  window.tvDeleteClass = function (classId) {
    var sb = getClient();
    if (!sb || !window.confirm(tvT('Delete this class? Students will lose access to it (their own progress is unaffected).', 'حذف هذا الفصل؟ لن يؤثر هذا على تقدم الطلاب الخاص.'))) return;
    sb.from('classes').delete().eq('id', classId)
      .then(function () { refreshMyClasses(); });
  };

  var _classesById = {};
  var _rostersById = {};

  // ── Rendering: classes I own, each with its roster + aggregate accuracy ─
  function refreshMyClasses() {
    var sb = getClient(), out = document.getElementById('tv-my-classes');
    if (!sb || !out) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('classes').select('*').eq('owner_id', uid).order('created_at', { ascending: false })
      .then(function (r) {
        if (r.error || !r.data) { out.innerHTML = ''; return; }
        if (!r.data.length) { out.innerHTML = '<p class="tv-empty">' + tvT('You don’t own any classes yet — create one above.', 'لا تملك أي فصول بعد — أنشئ فصلاً من الأعلى.') + '</p>'; return; }
        (r.data || []).forEach(function (c) { _classesById[c.id] = c; });
        out.innerHTML = r.data.map(function (c) {
          var cid = safeId(c.id);
          return '<div class="tv-class-card">'
            + '<div class="tv-class-head"><b>' + escT(c.name) + '</b>'
            + '<span class="tv-code" title="' + tvT('Share this code with students', 'شارك هذا الرمز مع طلابك') + '">' + escT(c.code) + '</span>'
            + '<div class="tv-class-actions">'
            + '<button type="button" class="tv-export-btn" onclick="window.tvExportCSV(\'' + cid + '\')" title="' + tvT('Export roster to CSV', 'تصدير السجل بصيغة CSV') + '" aria-label="Export CSV">📄 CSV</button>'
            + '<button type="button" class="tv-export-btn" onclick="window.tvExportExcel(\'' + cid + '\')" title="' + tvT('Export roster to Excel', 'تصدير السجل بصيغة Excel') + '" aria-label="Export Excel">📊 Excel</button>'
            + '<button class="tv-delete" onclick="window.tvDeleteClass(\'' + cid + '\')" title="' + tvT('Delete class', 'حذف الفصل') + '" aria-label="Delete class">🗑</button>'
            + '</div></div>'
            + '<div class="tv-roster" id="tv-roster-' + cid + '">' + tvT('Loading roster…', 'جاري تحميل قائمة الطلاب…') + '</div>'
            + '<div class="tv-assign-section"><h5>' + tvT('Assignments', 'الواجبات والاختبارات') + '</h5>'
            + '<div id="tv-assign-' + cid + '">' + tvT('Loading…', 'جاري التحميل…') + '</div>'
            + '<div class="tv-assign-form">'
            + '<select id="tv-assign-track-' + cid + '">' + trackOptionsHtml() + '</select>'
            + '<input type="text" id="tv-assign-label-' + cid + '" placeholder="' + tvT('e.g. Chapter 3: Derivatives', 'مثال: الفصل 3: المشتقات') + '">'
            + '<input type="url" id="tv-assign-url-' + cid + '" placeholder="' + tvT('Optional ?assign=… link (from Custom Test Cart)', 'رابط ?assign=… اختياري (من مصمم أوراق العمل)') + '">'
            + '<input type="date" id="tv-assign-due-' + cid + '" title="' + tvT('Due date (optional)', 'تاريخ التسليم (اختياري)') + '">'
            + '<button type="button" class="tv-assign-btn" onclick="window.tvCreateAssignment(\'' + cid + '\')">' + tvT('Assign', 'إرسال الواجب') + '</button>'
            + '<button type="button" class="tv-export-btn" onclick="window.tvOpenCustomCart()" title="' + tvT('Build custom ?assign=… link in Custom Cart', 'إنشاء رابط ?assign=… في مصمم أوراق العمل') + '">🧰 ' + tvT('Custom Cart', 'مصمم الأوراق') + '</button>'
            + '</div></div>'
            + '</div>';
        }).join('');
        r.data.forEach(function (c) {
          var sel = document.getElementById('tv-assign-track-' + safeId(c.id));
          if (sel && c.track) sel.value = c.track;
          loadAssignmentsForTeacher(c.id).then(function () { loadRoster(c.id); });
        });
      });
  }

  function loadRoster(classId) {
    var sb = getClient();
    var el = document.getElementById('tv-roster-' + classId);
    if (!sb || !el) return;
    sb.from('class_members').select('student_id,display_name').eq('class_id', classId)
      .then(function (r) {
        if (r.error) { el.innerHTML = '<p class="tv-empty">' + escT(r.error.message) + '</p>'; return; }
        var members = r.data || [];
        if (!members.length) { el.innerHTML = '<p class="tv-empty">' + tvT('No students yet — share the code above.', 'لا يوجد طلاب بعد — شارك الرمز أعلاه.') + '</p>'; return; }
        var ids = members.map(function (m) { return m.student_id; });
        // Aggregate mastery & diagnostic metrics: overall accuracy, track/domain
        // breakdowns, chapter visits for "last active" & studied topics, recent mistakes, and mock attempts.
        Promise.all([
          sb.from('accuracy').select('user_id,track,domain,correct,total').in('user_id', ids),
          sb.from('chapter_visits').select('user_id,track,count,updated_at').in('user_id', ids),
          sb.from('mistakes').select('user_id,id,view_id,q,wrong,correct,domain,ts').is('deleted_at', null).in('user_id', ids).order('ts', { ascending: false }).limit(Math.max(200, ids.length * 12)),
          sb.from('mock_exam_attempts').select('user_id,track,paper,score,total,pct,scaled,attempt_ts').in('user_id', ids).order('attempt_ts', { ascending: false }).limit(Math.max(100, ids.length * 5)).then(function (r4) { return r4; }, function () { return { data: [] }; })
        ]).then(function (results) {
          var ar = results[0], vr = results[1], mr = results[2], mockr = results[3] || { data: [] };
          // Scope roster client-side to class track + assigned tracks (matches RLS policy)
          var cObj = _classesById[classId] || {};
          var allowedTracks = {};
          var hasTrackScope = false;
          if (cObj.track) { allowedTracks[cObj.track] = true; hasTrackScope = true; }
          if (Array.isArray(cObj._assignedTracks)) {
            cObj._assignedTracks.forEach(function (t) { if (t) { allowedTracks[t] = true; hasTrackScope = true; } });
          }
          var byUser = {};        // uid -> {c,t} overall
          var bucketsByUser = {}; // uid -> { "track::domain" -> {track,domain,c,t} }
          (ar.data || []).forEach(function (row) {
            if (hasTrackScope && row.track && !allowedTracks[row.track]) return;
            var agg = byUser[row.user_id] || { c: 0, t: 0 };
            agg.c += row.correct || 0; agg.t += row.total || 0;
            byUser[row.user_id] = agg;
            var buckets = bucketsByUser[row.user_id] || (bucketsByUser[row.user_id] = {});
            var key = row.track + '::' + row.domain;
            var b = buckets[key] || { track: row.track, domain: row.domain, c: 0, t: 0 };
            b.c += row.correct || 0; b.t += row.total || 0;
            buckets[key] = b;
          });
          var lastActiveByUser = {};
          var visitsByUser = {};
          (vr.data || []).forEach(function (row) {
            if (hasTrackScope && row.track && !allowedTracks[row.track]) return;
            var t = row.updated_at ? Date.parse(row.updated_at) : 0;
            if (!lastActiveByUser[row.user_id] || t > lastActiveByUser[row.user_id]) lastActiveByUser[row.user_id] = t;
            var vlist = visitsByUser[row.user_id] || (visitsByUser[row.user_id] = []);
            vlist.push({ track: row.track, count: row.count || 1, updated_at: row.updated_at });
          });
          var mistakesByUser = {};
          (mr.data || []).forEach(function (row) {
            if (hasTrackScope && row.view_id && !allowedTracks[row.view_id]) return;
            var mlist = mistakesByUser[row.user_id] || (mistakesByUser[row.user_id] = []);
            if (mlist.length < 6) {
              mlist.push({ id: row.id, q: row.q, wrong: row.wrong, correct: row.correct, domain: row.domain, ts: row.ts });
            }
          });
          var mocksByUser = {};
          (mockr.data || []).forEach(function (row) {
            if (hasTrackScope && row.track && !allowedTracks[row.track]) return;
            var mkl = mocksByUser[row.user_id] || (mocksByUser[row.user_id] = []);
            if (mkl.length < 4) {
              mkl.push({
                track: row.track,
                paper: row.paper || row.track.toUpperCase(),
                score: row.score,
                total: row.total,
                pct: row.pct,
                scaled: row.scaled || '',
                ts: row.attempt_ts
              });
            }
          });

          // Cache for export
          _rostersById[classId] = {
            members: members,
            byUser: byUser,
            bucketsByUser: bucketsByUser,
            lastActiveByUser: lastActiveByUser,
            visitsByUser: visitsByUser,
            mistakesByUser: mistakesByUser,
            mocksByUser: mocksByUser
          };

          el.innerHTML = '<table class="tv-roster-table"><thead><tr><th>' + tvT('Student', 'الطالب') + '</th><th>' + tvT('Accuracy', 'الدقة') + '</th><th>' + tvT('Last active', 'آخر نشاط') + '</th><th></th></tr></thead><tbody>'
            + members.map(function (m, i) {
                var agg = byUser[m.student_id] || { c: 0, t: 0 };
                var pct = agg.t ? Math.round(agg.c / agg.t * 100) : null;
                var label = m.display_name ? escT(m.display_name) : (tvT('Student ', 'طالب ') + (i + 1) + ' <span class="tv-anon">' + tvT('(no name shared)', '(بدون اسم)') + '</span>');
                var pctStr = pct === null ? '<span class="tv-nodata">' + tvT('no data yet', 'لا توجد بيانات بعد') + '</span>' : (pct + '% <span class="tv-frac">(' + agg.c + '/' + agg.t + ')</span>');
                var color = pct === null ? '' : (pct >= 80 ? '#16a34a' : (pct >= 50 ? '#d97706' : '#dc2626'));
                var lastMs = lastActiveByUser[m.student_id];
                var lastStr = lastMs ? timeAgo(lastMs) : '<span class="tv-nodata">—</span>';
                var weak = weakestBuckets(bucketsByUser[m.student_id]);
                var vlist = visitsByUser[m.student_id] || [];
                var mlist = mistakesByUser[m.student_id] || [];
                var mklist = mocksByUser[m.student_id] || [];
                var rowId = 'tv-detail-' + classId + '-' + i;
                var hasDetails = weak.length || vlist.length || mlist.length || mklist.length;
                var toggle = hasDetails
                  ? '<button type="button" class="tv-detail-toggle" onclick="document.getElementById(\'' + rowId + '\').classList.toggle(\'tv-show\')">' + tvT('Details ▾', 'التفاصيل ▾') + '</button>'
                  : '';

                var weakHtml = weak.length
                  ? '<ul class="tv-weak-list">' + weak.map(function (b) {
                      var wp = b.t ? Math.round(b.c / b.t * 100) : 0;
                      return '<li><span class="tv-weak-track">' + escT(TRACK_LABELS[b.track] || b.track) + '</span> — ' + escT(b.domain) + ': <b>' + wp + '%</b> <span class="tv-frac">(' + b.c + '/' + b.t + ')</span></li>';
                    }).join('') + '</ul>'
                  : '<p class="tv-nodata">' + tvT('No weak domains identified yet.', 'لم تُحدد نقاط ضعف بعد.') + '</p>';

                var visitedHtml = vlist.length
                  ? '<ul class="tv-track-list">' + vlist.slice(0, 5).map(function (v) {
                      return '<li><span class="tv-weak-track">' + escT(TRACK_LABELS[v.track] || v.track) + '</span>: ' + v.count + ' ' + tvT('visits', 'زيارات') + '</li>';
                    }).join('') + '</ul>'
                  : '<p class="tv-nodata">' + tvT('No tracks visited yet.', 'لا توجد زيارات بعد.') + '</p>';

                var mocksHtml = mklist.length
                  ? '<ul class="tv-track-list">' + mklist.map(function (mk) {
                      var sc = mk.scaled ? (' · <b>' + escT(mk.scaled) + '</b>') : '';
                      return '<li><span class="tv-weak-track">' + escT(mk.paper) + '</span>: <b>' + mk.pct + '%</b> (' + mk.score + '/' + mk.total + ')' + sc + (mk.ts ? ' <span class="tv-frac">(' + timeAgo(mk.ts) + ')</span>' : '') + '</li>';
                    }).join('') + '</ul>'
                  : '<p class="tv-nodata">' + tvT('No mock exams logged yet.', 'لا توجد محاكاة مسجلة بعد.') + '</p>';

                var mistakesHtml = mlist.length
                  ? '<div class="tv-mistakes-list">' + mlist.slice(0, 4).map(function (mk) {
                      var rawQ = String(mk.q || 'Question');
                      if (rawQ.length > 140) rawQ = rawQ.substring(0, 140) + '…';
                      var cleanQ = typeof window.CSRenderMathString === 'function' ? window.CSRenderMathString(escT(rawQ)) : escT(rawQ);
                      var cleanWrong = typeof window.CSRenderMathString === 'function' ? window.CSRenderMathString(escT(mk.wrong || 'Incorrect')) : escT(mk.wrong || 'Incorrect');
                      var cleanRight = typeof window.CSRenderMathString === 'function' ? window.CSRenderMathString(escT(mk.correct || 'Correct')) : escT(mk.correct || 'Correct');
                      var tAgo = mk.ts ? timeAgo(mk.ts) : '';
                      return '<div class="tv-mistake-card">'
                        + '<span class="tv-mistake-q">' + cleanQ + '</span>'
                        + '<div class="tv-mistake-answers">'
                        + '<span class="tv-mistake-wrong">❌ ' + cleanWrong + '</span> '
                        + '<span class="tv-mistake-right">✅ ' + cleanRight + '</span>'
                        + (tAgo ? ' <span class="tv-frac">(' + tAgo + ')</span>' : '')
                        + '</div></div>';
                    }).join('') + '</div>'
                  : '<p class="tv-nodata">' + tvT('No recent mistakes logged.', 'لا توجد أخطاء حديثة.') + '</p>';

                var detailRow = '<tr class="tv-detail-row" id="' + rowId + '"><td colspan="4">'
                  + '<div class="tv-detail-grid">'
                  + '<div class="tv-detail-col"><div class="tv-detail-title">' + tvT('Weakest Skills', 'أضعف المهارات') + '</div>' + weakHtml + '</div>'
                  + '<div class="tv-detail-col"><div class="tv-detail-title">' + tvT('Topics Studied', 'المواضيع المدروسة') + '</div>' + visitedHtml + '</div>'
                  + '<div class="tv-detail-col"><div class="tv-detail-title">' + tvT('Mock Exams', 'اختبارات المحاكاة') + '</div>' + mocksHtml + '</div>'
                  + '<div class="tv-detail-col"><div class="tv-detail-title">' + tvT('Recent Mistakes', 'أحدث الأخطاء') + '</div>' + mistakesHtml + '</div>'
                  + '</div>'
                  + '</td></tr>';
                return '<tr><td>' + label + '</td><td' + (color ? ' style="color:' + color + ';font-weight:700"' : '') + '>' + pctStr + '</td><td>' + lastStr + '</td><td>' + toggle + '</td></tr>' + detailRow;
              }).join('')
            + '</tbody></table>';
        });
      });
  }

  // ── CSV & Excel Roster Export ───────────────────────────────────────
  window.tvExportCSV = function (classId) {
    var c = _classesById[classId] || { name: 'Class' };
    var roster = _rostersById[classId];
    if (!roster || !roster.members || !roster.members.length) {
      window.alert(tvT('No roster data to export yet. Please wait for the roster to load.', 'لا توجد بيانات طلاب للتصدير بعد.'));
      return;
    }
    var rows = [
      ['Student Name', 'Overall Accuracy (%)', 'Correct Answers', 'Total Attempted', 'Last Active', 'Tracks Studied', 'Weakest Topics', 'Latest Mock Score', 'Recent Mistakes Count']
    ];
    roster.members.forEach(function (m, i) {
      var agg = roster.byUser[m.student_id] || { c: 0, t: 0 };
      var pct = agg.t ? Math.round(agg.c / agg.t * 100) : 'N/A';
      var label = m.display_name || ('Student ' + (i + 1));
      var lastMs = roster.lastActiveByUser[m.student_id];
      var lastStr = lastMs ? new Date(lastMs).toISOString().split('T')[0] : 'N/A';
      var visited = (roster.visitsByUser[m.student_id] || []).map(function (v) {
        return (TRACK_LABELS[v.track] || v.track) + ' (' + v.count + ')';
      }).join('; ');
      var weak = weakestBuckets(roster.bucketsByUser[m.student_id]).map(function (b) {
        var wp = b.t ? Math.round(b.c / b.t * 100) : 0;
        return (TRACK_LABELS[b.track] || b.track) + ': ' + b.domain + ' (' + wp + '%)';
      }).join('; ');
      var latestMock = (roster.mocksByUser && roster.mocksByUser[m.student_id] && roster.mocksByUser[m.student_id][0]) || null;
      var latestMockStr = latestMock ? (latestMock.paper + ': ' + latestMock.pct + '%' + (latestMock.scaled ? ' [' + latestMock.scaled + ']' : '')) : 'None';
      var mistakesCount = (roster.mistakesByUser[m.student_id] || []).length;

      rows.push([
        label,
        pct,
        agg.c,
        agg.t,
        lastStr,
        visited || 'None',
        weak || 'None',
        latestMockStr,
        mistakesCount
      ]);
    });

    var csvContent = rows.map(function (row) {
      return row.map(safeCsvCell).join(',');
    }).join('\r\n');

    var blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (c.name || 'class').toLowerCase().replace(/[^a-z0-9_-]/g, '_') + '-roster.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.ClipSATAnalytics) {
      window.ClipSATAnalytics.track('export_download', { format: 'csv', class_id: classId });
    }
  };

  window.tvExportExcel = function (classId) {
    var c = _classesById[classId] || { name: 'Class' };
    var roster = _rostersById[classId];
    if (!roster || !roster.members || !roster.members.length) {
      window.alert(tvT('No roster data to export yet. Please wait for the roster to load.', 'لا توجد بيانات طلاب للتصدير بعد.'));
      return;
    }

    var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
      + '<head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
      + '<x:Name>ClipSAT Roster</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
      + '<style>'
      + 'table{border-collapse:collapse;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:12px;}'
      + 'th{background:#4f46e5;color:#ffffff;font-weight:bold;padding:8px 12px;border:1px solid #c7d2fe;text-align:left;}'
      + 'td{padding:6px 12px;border:1px solid #e2e8f0;}'
      + '.high{color:#15803d;font-weight:bold;}'
      + '.med{color:#b45309;font-weight:bold;}'
      + '.low{color:#b91c1c;font-weight:bold;}'
      + '</style></head><body>'
      + '<h2>ClipSAT — Class Roster: ' + escT(c.name) + ' (' + escT(c.code) + ')</h2>'
      + '<p>Exported: ' + new Date().toLocaleDateString() + '</p>'
      + '<table><thead><tr>'
      + '<th>Student Name</th><th>Accuracy</th><th>Correct</th><th>Total</th><th>Last Active</th><th>Tracks Studied</th><th>Weakest Topics</th><th>Latest Mock Score</th><th>Logged Mistakes</th>'
      + '</tr></thead><tbody>';

    roster.members.forEach(function (m, i) {
      var agg = roster.byUser[m.student_id] || { c: 0, t: 0 };
      var pct = agg.t ? Math.round(agg.c / agg.t * 100) : null;
      var rawName = m.display_name ? String(m.display_name) : '';
      if (/^[=+\-@\t\r]/.test(rawName)) rawName = "'" + rawName;
      var label = rawName ? escT(rawName) : ('Student ' + (i + 1));
      var lastMs = roster.lastActiveByUser[m.student_id];
      var lastStr = lastMs ? timeAgo(lastMs) : '—';
      var visited = (roster.visitsByUser[m.student_id] || []).map(function (v) {
        return escT(TRACK_LABELS[v.track] || v.track) + ' (' + v.count + ')';
      }).join('<br>');
      var weak = weakestBuckets(roster.bucketsByUser[m.student_id]).map(function (b) {
        var wp = b.t ? Math.round(b.c / b.t * 100) : 0;
        return escT(TRACK_LABELS[b.track] || b.track) + ': ' + escT(b.domain) + ' (' + wp + '%)';
      }).join('<br>');
      var latestMock = (roster.mocksByUser && roster.mocksByUser[m.student_id] && roster.mocksByUser[m.student_id][0]) || null;
      var latestMockStr = latestMock ? (escT(latestMock.paper) + ': ' + latestMock.pct + '%' + (latestMock.scaled ? ' [' + escT(latestMock.scaled) + ']' : '')) : '—';
      var mistakesCount = (roster.mistakesByUser[m.student_id] || []).length;
      var pctClass = pct === null ? '' : (pct >= 80 ? 'high' : (pct >= 50 ? 'med' : 'low'));
      var pctText = pct === null ? '—' : (pct + '%');

      html += '<tr>'
        + '<td><b>' + label + '</b></td>'
        + '<td class="' + pctClass + '">' + pctText + '</td>'
        + '<td>' + agg.c + '</td>'
        + '<td>' + agg.t + '</td>'
        + '<td>' + lastStr + '</td>'
        + '<td>' + (visited || '—') + '</td>'
        + '<td>' + (weak || '—') + '</td>'
        + '<td>' + latestMockStr + '</td>'
        + '<td>' + mistakesCount + '</td>'
        + '</tr>';
    });

    html += '</tbody></table></body></html>';

    var blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (c.name || 'class').toLowerCase().replace(/[^a-z0-9_-]/g, '_') + '-roster.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.ClipSATAnalytics) {
      window.ClipSATAnalytics.track('export_download', { format: 'excel', class_id: classId });
    }
  };

  function _splitAssignLabel(raw) {
    var s = String(raw || '');
    var idx = s.indexOf(' || ');
    if (idx === -1) return { text: s, url: '' };
    var url = s.slice(idx + 4).trim();
    if (!/^(https:\/\/|\/|\?assign=)/i.test(url)) return { text: s, url: '' };
    return { text: s.slice(0, idx).trim(), url: url };
  }

  // ── Assignments: "assign a chapter/mock exam to a roster" ────────────
  function loadAssignmentsForTeacher(classId) {
    var sb = getClient();
    var el = document.getElementById('tv-assign-' + classId);
    if (!sb || !el) return Promise.resolve();
    return Promise.all([
      sb.from('assignments').select('id,track,label,due_date').eq('class_id', classId).order('created_at', { ascending: false }),
      sb.from('class_members').select('student_id').eq('class_id', classId)
    ]).then(function (results) {
      var ar = results[0], mr = results[1];
      var assignments = ar.data || [];
      if (_classesById[classId]) {
        _classesById[classId]._assignedTracks = assignments.map(function (a) { return a.track; });
      }
      var total = (mr.data || []).length;
      if (!assignments.length) { el.innerHTML = '<p class="tv-empty">' + tvT('No assignments yet.', 'لا توجد واجبات بعد.') + '</p>'; return; }
      var ids = assignments.map(function (a) { return a.id; });
      return Promise.all([
        sb.from('assignment_completions').select('assignment_id').in('assignment_id', ids),
        sb.from('assignment_submissions').select('assignment_id,score,total').in('assignment_id', ids).then(function (sr) { return sr; }, function () { return { data: [] }; })
      ]).then(function (subResults) {
          var cr = subResults[0], sr = subResults[1] || { data: [] };
          var doneCount = {};
          (cr.data || []).forEach(function (row) { doneCount[row.assignment_id] = (doneCount[row.assignment_id] || 0) + 1; });
          var verStats = {};
          (sr.data || []).forEach(function (row) {
            if (!row.assignment_id) return;
            var st = verStats[row.assignment_id] || (verStats[row.assignment_id] = { count: 0, pctSum: 0 });
            st.count += 1;
            st.pctSum += row.total ? Math.round((row.score / row.total) * 100) : 0;
          });
          var cid = safeId(classId);
          el.innerHTML = '<ul class="tv-assign-list">' + assignments.map(function (a) {
            var aid = safeId(a.id);
            var parsed = _splitAssignLabel(a.label);
            var n = doneCount[a.id] || 0;
            var vst = verStats[a.id];
            var verBadge = vst && vst.count
              ? ' <span class="tv-frac" style="color:#15803d;font-weight:700">· 🔐 ' + vst.count + tvT(' verified (', ' موثّق (') + Math.round(vst.pctSum / vst.count) + tvT('% avg)', '% متوسط)') + '</span>'
              : '';
            var due = a.due_date ? ' <span class="tv-frac">(' + tvT('due ', 'الموعد: ') + escT(a.due_date) + ')</span>' : '';
            var linkHtml = parsed.url ? ' <a href="' + escT(parsed.url) + '" target="_blank" rel="noopener" class="tv-frac" style="color:var(--indigo);font-weight:700;text-decoration:underline">' + tvT('↗ Open', '↗ فتح') + '</a>' : '';
            return '<li><span class="tv-weak-track">' + escT(TRACK_LABELS[a.track] || a.track) + '</span> — '
              + escT(parsed.text) + linkHtml + due + ' <span class="tv-frac">(' + n + '/' + total + ' ' + tvT('done', 'أتم') + ')</span>' + verBadge
              + '<button type="button" class="tv-delete" onclick="window.tvDeleteAssignment(\'' + aid + '\',\'' + cid + '\')" title="' + tvT('Delete assignment', 'حذف الواجب') + '" aria-label="Delete assignment">🗑</button></li>';
          }).join('') + '</ul>';
        });
    });
  }

  window.tvCreateAssignment = function (classId) {
    var sb = getClient();
    var trackSel = document.getElementById('tv-assign-track-' + classId);
    var labelInput = document.getElementById('tv-assign-label-' + classId);
    var urlInput = document.getElementById('tv-assign-url-' + classId);
    var dueInput = document.getElementById('tv-assign-due-' + classId);
    var track = trackSel && trackSel.value;
    var label = labelInput && labelInput.value.trim();
    var rawUrl = urlInput && urlInput.value.trim();
    if (!sb || !track || !label) return;
    var storedLabel = label;
    if (rawUrl && /^(https:\/\/|\/|\?assign=)/i.test(rawUrl)) {
      storedLabel = label + ' || ' + rawUrl;
    }
    sb.from('assignments').insert({ class_id: classId, track: track, label: storedLabel, due_date: (dueInput && dueInput.value) || null })
      .then(function (r) {
        if (r.error) { window.alert(r.error.message); return; }
        if (labelInput) labelInput.value = '';
        if (urlInput) urlInput.value = '';
        if (dueInput) dueInput.value = '';
        loadAssignmentsForTeacher(classId).then(function () { loadRoster(classId); });
      });
  };

  window.tvDeleteAssignment = function (assignmentId, classId) {
    var sb = getClient();
    if (!sb || !window.confirm(tvT('Delete this assignment? Students will no longer see it.', 'حذف هذا الواجب؟ لن يظهر للطلاب بعد الآن.'))) return;
    sb.from('assignments').delete().eq('id', assignmentId)
      .then(function () { loadAssignmentsForTeacher(classId); });
  };

  // ── Rendering: classes I've joined as a student ──────────────────────
  function refreshMyMemberships() {
    var sb = getClient(), out = document.getElementById('tv-my-memberships');
    if (!sb || !out) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('class_members').select('class_id,classes(name,assignments(id,track,label,due_date))').eq('student_id', uid)
      .then(function (r) {
        if (r.error || !r.data || !r.data.length) { out.innerHTML = ''; return; }
        var allAssignmentIds = [];
        r.data.forEach(function (m) {
          ((m.classes && m.classes.assignments) || []).forEach(function (a) { allAssignmentIds.push(a.id); });
        });
        var donePromise = allAssignmentIds.length
          ? sb.from('assignment_completions').select('assignment_id').eq('student_id', uid).in('assignment_id', allAssignmentIds)
          : Promise.resolve({ data: [] });
        donePromise.then(function (dr) {
          var doneSet = {};
          (dr.data || []).forEach(function (row) { doneSet[row.assignment_id] = true; });
          out.innerHTML = '<div class="tv-joined-label">' + tvT('Classes you’ve joined', 'الفصول المنضم إليها') + '</div>' + r.data.map(function (m) {
            var cname = m.classes ? m.classes.name : tvT('Class', 'فصل');
            var assigns = (m.classes && m.classes.assignments) || [];
            var assignHtml = assigns.length
              ? '<ul class="tv-assign-list">' + assigns.map(function (a) {
                  var aid = safeId(a.id);
                  var parsed = _splitAssignLabel(a.label);
                  var trk = encodeURIComponent(a.track || 'sat');
                  var targetHref = parsed.url || ((isAr() ? '/ar/' : '/') + trk + '/');
                  var done = !!doneSet[a.id];
                  var due = a.due_date ? ' <span class="tv-frac">(' + tvT('due ', 'الموعد: ') + escT(a.due_date) + ')</span>' : '';
                  return '<li><span class="tv-weak-track">' + escT(TRACK_LABELS[a.track] || a.track) + '</span> — '
                    + escT(parsed.text) + due
                    + ' <a href="' + escT(targetHref) + '" class="tv-done" style="text-decoration:none;margin-inline-end:6px">' + tvT('▶ Open', '▶ فتح') + '</a>'
                    + '<button type="button" class="' + (done ? 'tv-done tv-done-yes' : 'tv-done') + '" onclick="window.tvToggleCompletion(\'' + aid + '\',' + (!done) + ',this)">' + (done ? tvT('✓ Done', '✓ مكتمل') : tvT('Mark done', 'تم الإنجاز')) + '</button></li>';
                }).join('') + '</ul>'
              : '';
            return '<div class="tv-joined-row"><span>' + escT(cname) + '</span>'
              + '<button class="tv-leave" onclick="window.tvLeaveClass(\'' + safeId(m.class_id) + '\')">' + tvT('Leave', 'مغادرة') + '</button></div>' + assignHtml;
          }).join('');
        });
      });
  }

  // Toggle one assignment's completion for the current student. `markDone`
  // is the state to move TO (the button's onclick is rewritten in place so
  // the next click flips it again, without a full re-render/re-query).
  window.tvToggleCompletion = function (assignmentId, markDone, btn) {
    var sb = getClient();
    if (!sb) return;
    var uid = window.ClipSATCloud.currentUserId();
    var action = markDone
      ? sb.from('assignment_completions').upsert({ assignment_id: assignmentId, student_id: uid })
      : sb.from('assignment_completions').delete().eq('assignment_id', assignmentId).eq('student_id', uid);
    action.then(function (r) {
      if (r.error || !btn) return;
      btn.textContent = markDone ? tvT('✓ Done', '✓ مكتمل') : tvT('Mark done', 'تم الإنجاز');
      btn.className = markDone ? 'tv-done tv-done-yes' : 'tv-done';
      btn.setAttribute('onclick', "window.tvToggleCompletion('" + assignmentId + "'," + (!markDone) + ",this)");
    });
  };

  function refreshAll() {
    refreshMyClasses();
    refreshMyMemberships();
  }

  function syncTeacherBtnVisibility() {
    var btn = document.getElementById('teacherViewBtn');
    if (btn) btn.style.display = isReady() ? '' : 'none';
  }
  document.addEventListener('clipsat:auth-changed', function () {
    syncTeacherBtnVisibility();
    var m = document.getElementById('teacher-view-modal');
    if (m && m.classList.contains('show') && isReady()) refreshAll();
  });
  document.addEventListener('clipsat:locale-changed', function () {
    syncModalLocale();
    var m = document.getElementById('teacher-view-modal');
    if (m && m.classList.contains('show') && isReady()) refreshAll();
  });
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    if (isReady()) {
      syncTeacherBtnVisibility();
      clearInterval(poll);
    } else if (tries > 20) {
      clearInterval(poll);
    }
  }, 250);
  if (window.ClipSATCloud && window.ClipSATCloud.ready && typeof window.ClipSATCloud.ready.then === 'function') {
    window.ClipSATCloud.ready.then(function () {
      syncTeacherBtnVisibility();
      var client = getClient();
      if (client && client.auth && typeof client.auth.onAuthStateChange === 'function') {
        client.auth.onAuthStateChange(function () {
          setTimeout(syncTeacherBtnVisibility, 50);
        });
      }
    });
  }

  window.TeacherView = {
    openModal: window.openTeacherView,
    closeModal: window.closeTeacherView
  };
})();
