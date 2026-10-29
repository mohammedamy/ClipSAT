(function(){
  var _esc = (typeof escHtml === 'function') ? escHtml : function(s){ return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; };

  var WL_I18N = {
    en: {searchPh:'Search worksheets & full exams…', of:' of ', topics:' items', unit:'Unit ', ws:'Worksheet', ak:'Answer Key', exam:'Full Exam', examAk:'Answer Key & Solutions', cbt:'💻 Solve in CBT', none:'No worksheets or exams match "'},
    ar: {searchPh:'ابحث في أوراق العمل والاختبارات الكاملة…', of:' من ', topics:' عنصرًا', unit:'الوحدة ', ws:'ورقة العمل', ak:'مفتاح الإجابة', exam:'الاختبار الكامل', examAk:'مفتاح الإجابة والحلول', cbt:'💻 حل في المحاكي (CBT)', none:'لا توجد أوراق عمل أو اختبارات مطابقة لـ "'}
  };

  function renderLibrary(el, trackId, data){
    var hasAr = data.some(function(d){ return d.lang === 'ar'; });
    var curLang = 'en';
    el.innerHTML = (hasAr
        ? '<div class="fightoggle wl-langtoggle"><span class="seg">'
          + '<button type="button" class="on" data-lang="en">English</button>'
          + '<button type="button" data-lang="ar">العربية</button>'
          + '</span></div>'
        : '')
      + '<input type="search" class="wl-search" placeholder="Search worksheets & full exams…" aria-label="Search worksheets and full exams">'
      + '<div class="wl-count"></div><div class="wl-list"></div>';
    var listEl = el.querySelector('.wl-list');
    var countEl = el.querySelector('.wl-count');
    var searchEl = el.querySelector('.wl-search');
    var toggleEl = el.querySelector('.wl-langtoggle');

    function render(filter){
      var t = WL_I18N[curLang];
      var langData = data.filter(function(d){ return (d.lang || 'en') === curLang; });
      var f = (filter || '').trim().toLowerCase();
      var filtered = !f ? langData : langData.filter(function(d){
        return d.title.toLowerCase().indexOf(f) >= 0 || d.num.toLowerCase().indexOf(f) >= 0 || (d.sub||'').toLowerCase().indexOf(f) >= 0 || (d.unitTitle||'').toLowerCase().indexOf(f) >= 0;
      });
      countEl.textContent = filtered.length + t.of + langData.length + t.topics;
      listEl.setAttribute('dir', curLang === 'ar' ? 'rtl' : 'ltr');
      if(!filtered.length){
        listEl.innerHTML = '<div class="wl-empty">' + t.none + _esc(f) + '".</div>';
        return;
      }
      var groups = {}, order = [];
      filtered.forEach(function(d){
        var gKey = (d.sub||'') + '|' + (d.unitTitle || d.unit);
        if(!groups[gKey]){ groups[gKey] = {sub:d.sub, unit:d.unit, unitTitle:d.unitTitle, items:[]}; order.push(gKey); }
        groups[gKey].items.push(d);
      });
      var html = '', lastSub;
      order.forEach(function(gKey){
        var g = groups[gKey];
        if(g.sub && g.sub !== lastSub){
          html += '<div class="wl-sub-title">' + _esc(g.sub) + '</div>';
          lastSub = g.sub;
        }
        var uHeader = g.unitTitle ? _esc(g.unitTitle) : (t.unit + g.unit);
        html += '<div class="wl-unit"><div class="wl-unit-title">' + uHeader + '</div>';
        g.items.forEach(function(d){
          var base = '/downloads/' + trackId + '/';
          var isExam = Boolean(d.isFullExam);
          var wsLabel = d.wsLabel || (isExam ? t.exam : t.ws);
          var akLabel = d.akLabel || (isExam ? t.examAk : t.ak);
          var cbtBtn = isExam
            ? '<button type="button" class="wl-link cbt" onclick="window.openDownloadExamCBT&amp;&amp;window.openDownloadExamCBT(\'' + trackId + '\',\'' + _esc(d.worksheet) + '\',\'' + _esc(d.title).replace(/'/g,"\\'") + '\',\'' + (d.lang||'en') + '\')">' + _esc(t.cbt) + '</button>'
            : '';
          var gformBtn = '<button type="button" class="wl-link gform" onclick="window.ClipSATWorksheetForm&amp;&amp;window.ClipSATWorksheetForm(\'' + trackId + '\',\'' + _esc(d.num) + '\',\'' + (d.lang||'en') + '\',\'' + _esc(d.title).replace(/'/g,"\\'") + '\',\'' + _esc(d.worksheet || '') + '\')" style="' + (window.ClipSATGoogle&&window.ClipSATGoogle.configured?'':'display:none') + '">📝 Form</button>';
          html += '<div class="wl-row' + (isExam ? ' wl-row-exam' : '') + '"><span class="wl-num">' + _esc(d.num) + '</span><span class="wl-title">' + _esc(d.title) + '</span>'
            + '<span class="wl-links">' + cbtBtn + '<a class="wl-link ws" href="' + base + d.worksheet + '" target="_blank" rel="noopener">' + _esc(wsLabel) + '</a>'
            + '<a class="wl-link ak" href="' + base + d.answerkey + '" target="_blank" rel="noopener">' + _esc(akLabel) + '</a>'
            + gformBtn + '</span></div>';
        });
        html += '</div>';
      });
      listEl.innerHTML = html;
    }

    render('');
    searchEl.addEventListener('input', function(){ render(this.value); });
    if(toggleEl){
      toggleEl.addEventListener('click', function(e){
        var btn = e.target.closest('button[data-lang]');
        if(!btn || btn.classList.contains('on')) return;
        curLang = btn.getAttribute('data-lang');
        toggleEl.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b === btn); });
        searchEl.value = '';
        searchEl.placeholder = WL_I18N[curLang].searchPh;
        render('');
      });
    }
  }

  function initLibraries(){
    var containers = document.querySelectorAll('.worksheet-library');
    containers.forEach(function(el){
      if(el.dataset.wlLoaded) return;
      el.dataset.wlLoaded = '1';
      var trackId = el.getAttribute('data-track');
      fetch('/downloads/' + trackId + '/manifest.json')
        .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
        .then(function(data){ renderLibrary(el, trackId, data); })
        .catch(function(){ el.innerHTML = '<div class="wl-empty">Worksheet library failed to load. Please refresh the page.</div>'; });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(initLibraries, 400); });
  } else {
    setTimeout(initLibraries, 400);
  }
})();

function openLegal(which){
  var ov=document.getElementById('legal-overlay'); if(!ov) return;
  var priv=document.getElementById('legal-privacy'), terms=document.getElementById('legal-terms');
  if(priv) priv.style.display = which==='privacy' ? '' : 'none';
  if(terms) terms.style.display = which==='terms' ? '' : 'none';
  ov.classList.add('show');
}
function closeLegal(){ var ov=document.getElementById('legal-overlay'); if(ov) ov.classList.remove('show'); }

/* ── Cookie & Advertising Consent Management ───────────────────────── */
var CONSENT_KEY = 'clipsat_cookie_consent';

window.getCookieConsent = function(){
  try { return localStorage.getItem(CONSENT_KEY); } catch(e){ return null; }
};

window.setCookieConsent = function(choice){
  try { localStorage.setItem(CONSENT_KEY, choice); } catch(e){}
  var banner = document.getElementById('cookieConsentBanner');
  if(banner) banner.style.display = 'none';
  if(choice === 'accepted'){
    window.loadConsentedScripts && window.loadConsentedScripts();
  }
  document.dispatchEvent(new CustomEvent('clipsat:consent-changed', { detail: { consent: choice } }));
};

window.openCookieConsent = function(){
  var banner = document.getElementById('cookieConsentBanner');
  if(banner){
    banner.style.display = 'block';
    var acceptBtn = document.getElementById('cookieAcceptAll');
    if(acceptBtn) acceptBtn.focus();
  }
};

window.loadConsentedScripts = function(){
  if(window.getCookieConsent() !== 'accepted') return;
  if(window._adSenseClientId && !document.getElementById('google-adsense-script')){
    var s = document.createElement('script');
    s.id = 'google-adsense-script';
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(window._adSenseClientId);
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }
  if(window._initAnalytics && typeof window._initAnalytics === 'function'){
    window._initAnalytics();
  }
};

function initCookieConsent(){
  var consent = window.getCookieConsent();
  if(!consent){
    var banner = document.getElementById('cookieConsentBanner');
    if(banner) banner.style.display = 'block';
  } else if(consent === 'accepted'){
    window.loadConsentedScripts();
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}
