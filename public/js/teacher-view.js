/**
 * ClipSAT Teacher/Parent View  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * Simple class-code roster view on top of cloud-sync.js's Supabase backend
 * (see SUPABASE_SETUP.md + supabase/schema.sql's "classes"/"class_members"
 * tables, and the "teacher reads roster …" RLS policies). No separate
 * "teacher" role — creating a class makes you its owner for that class;
 * any signed-in user can own classes, join others, or both.
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

  function escT(s) { return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''; }

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

  // ── Modal open/close ───────────────────────────────────────────────
  window.openTeacherView = function () {
    var m = document.getElementById('teacher-view-modal');
    if (!m) return;
    m.classList.add('show');
    refreshAll();
  };
  window.closeTeacherView = function () {
    var m = document.getElementById('teacher-view-modal');
    if (m) m.classList.remove('show');
  };

  // ── Create a class (retries once on a code collision — astronomically
  //    unlikely at this scale, but cheap to guard against) ──────────────
  window.tvCreateClass = function () {
    var sb = getClient();
    var input = document.getElementById('tv-create-name');
    var name = input && input.value.trim();
    if (!sb || !name) { setStatus('tv-create-status', 'Enter a class name first.', true); return; }
    setStatus('tv-create-status', 'Creating…');
    var uid = window.ClipSATCloud.currentUserId();
    var attempt = function (triesLeft) {
      var code = randomCode();
      sb.from('classes').insert({ owner_id: uid, name: name, code: code }).select().single()
        .then(function (r) {
          if (r.error) {
            if (triesLeft > 0 && /duplicate|unique/i.test(r.error.message || '')) { attempt(triesLeft - 1); return; }
            setStatus('tv-create-status', r.error.message, true);
            return;
          }
          if (input) input.value = '';
          setStatus('tv-create-status', 'Created — share code: ' + code);
          refreshMyClasses();
        });
    };
    attempt(2);
  };

  // ── Join a class by code ───────────────────────────────────────────
  window.tvJoinClass = function () {
    var sb = getClient();
    var codeInput = document.getElementById('tv-join-code');
    var nameInput = document.getElementById('tv-join-name');
    var code = codeInput && codeInput.value.trim();
    if (!sb || !code) { setStatus('tv-join-status', 'Enter a class code first.', true); return; }
    setStatus('tv-join-status', 'Joining…');
    sb.rpc('join_class_by_code', { p_code: code, p_display_name: nameInput ? nameInput.value.trim() : null })
      .then(function (r) {
        if (r.error) { setStatus('tv-join-status', r.error.message, true); return; }
        var row = r.data && r.data[0];
        setStatus('tv-join-status', row ? ('Joined: ' + row.class_name) : 'Joined!');
        if (codeInput) codeInput.value = '';
        refreshMyMemberships();
      });
  };

  // ── Leave (as a student) / delete (as the owner) ───────────────────
  window.tvLeaveClass = function (classId) {
    var sb = getClient();
    if (!sb || !window.confirm('Leave this class? The teacher will no longer see your progress.')) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('class_members').delete().eq('class_id', classId).eq('student_id', uid)
      .then(function () { refreshMyMemberships(); });
  };
  window.tvDeleteClass = function (classId) {
    var sb = getClient();
    if (!sb || !window.confirm('Delete this class? Students will lose access to it (their own progress is unaffected).')) return;
    sb.from('classes').delete().eq('id', classId)
      .then(function () { refreshMyClasses(); });
  };

  // ── Rendering: classes I own, each with its roster + aggregate accuracy ─
  function refreshMyClasses() {
    var sb = getClient(), out = document.getElementById('tv-my-classes');
    if (!sb || !out) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('classes').select('*').eq('owner_id', uid).order('created_at', { ascending: false })
      .then(function (r) {
        if (r.error || !r.data) { out.innerHTML = ''; return; }
        if (!r.data.length) { out.innerHTML = '<p class="tv-empty">You don’t own any classes yet — create one above.</p>'; return; }
        out.innerHTML = r.data.map(function (c) {
          return '<div class="tv-class-card">'
            + '<div class="tv-class-head"><b>' + escT(c.name) + '</b>'
            + '<span class="tv-code" title="Share this code with students">' + escT(c.code) + '</span>'
            + '<button class="tv-delete" onclick="window.tvDeleteClass(\'' + c.id + '\')" title="Delete class" aria-label="Delete class">🗑</button></div>'
            + '<div class="tv-roster" id="tv-roster-' + c.id + '">Loading roster…</div>'
            + '</div>';
        }).join('');
        r.data.forEach(function (c) { loadRoster(c.id); });
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
        if (!members.length) { el.innerHTML = '<p class="tv-empty">No students yet — share the code above.</p>'; return; }
        var ids = members.map(function (m) { return m.student_id; });
        sb.from('accuracy').select('user_id,correct,total').in('user_id', ids)
          .then(function (ar) {
            var byUser = {};
            (ar.data || []).forEach(function (row) {
              var b = byUser[row.user_id] || { c: 0, t: 0 };
              b.c += row.correct || 0; b.t += row.total || 0;
              byUser[row.user_id] = b;
            });
            el.innerHTML = '<table class="tv-roster-table"><thead><tr><th>Student</th><th>Accuracy</th></tr></thead><tbody>'
              + members.map(function (m, i) {
                  var agg = byUser[m.student_id] || { c: 0, t: 0 };
                  var pct = agg.t ? Math.round(agg.c / agg.t * 100) : null;
                  var label = m.display_name ? escT(m.display_name) : ('Student ' + (i + 1) + ' <span class="tv-anon">(no name shared)</span>');
                  var pctStr = pct === null ? '<span class="tv-nodata">no data yet</span>' : (pct + '% <span class="tv-frac">(' + agg.c + '/' + agg.t + ')</span>');
                  var color = pct === null ? '' : (pct >= 80 ? '#16a34a' : (pct >= 50 ? '#d97706' : '#dc2626'));
                  return '<tr><td>' + label + '</td><td' + (color ? ' style="color:' + color + ';font-weight:700"' : '') + '>' + pctStr + '</td></tr>';
                }).join('')
              + '</tbody></table>';
          });
      });
  }

  // ── Rendering: classes I've joined as a student ──────────────────────
  function refreshMyMemberships() {
    var sb = getClient(), out = document.getElementById('tv-my-memberships');
    if (!sb || !out) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('class_members').select('class_id,classes(name)').eq('student_id', uid)
      .then(function (r) {
        if (r.error || !r.data || !r.data.length) { out.innerHTML = ''; return; }
        out.innerHTML = '<div class="tv-joined-label">Classes you’ve joined</div>' + r.data.map(function (m) {
          var cname = m.classes ? m.classes.name : 'Class';
          return '<div class="tv-joined-row"><span>' + escT(cname) + '</span>'
            + '<button class="tv-leave" onclick="window.tvLeaveClass(\'' + m.class_id + '\')">Leave</button></div>';
        }).join('');
      });
  }

  function refreshAll() {
    refreshMyClasses();
    refreshMyMemberships();
  }

  // ── Reveal the nav button once cloud-sync is configured + signed in.
  //    Polls briefly rather than hooking cloud-sync.js's internals — the
  //    typical sign-in flow (magic link) reloads the page anyway, so this
  //    just needs to catch the already-signed-in case on page load. ──
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    var btn = document.getElementById('teacherViewBtn');
    if (isReady()) {
      if (btn) btn.style.display = '';
      clearInterval(poll);
    } else if (tries > 40) { // ~10s ceiling — stay hidden (not configured, or signed out)
      clearInterval(poll);
    }
  }, 250);

  window.TeacherView = {
    openModal: window.openTeacherView,
    closeModal: window.closeTeacherView
  };
})();
