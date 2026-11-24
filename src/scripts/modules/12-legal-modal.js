(function(){
  var _esc = function(s){
    return s != null && s !== ''
      ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
      : '';
  };
  var _safeSlug = function(s){ return String(s || '').replace(/[^a-zA-Z0-9._/-]/g, ''); };

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
          var safeTrack = _safeSlug(trackId);
          var safeWs = _safeSlug(d.worksheet);
          var safeAk = _safeSlug(d.answerkey);
          var safeLang = (d.lang === 'ar') ? 'ar' : 'en';
          var cdnPrefix = String(window.CLIPSAT_CDN_BASE || '').replace(/\/+$/, '');
          var isProdNoCdn = !cdnPrefix && typeof location !== 'undefined' && /(?:^|\.)clipsat\.org$/i.test(location.hostname || '');
          var base = isProdNoCdn
            ? ('https://raw.githubusercontent.com/mohammedamy/ClipSAT/main/public/downloads/' + safeTrack + '/')
            : (cdnPrefix + '/downloads/' + safeTrack + '/');
          var isExam = Boolean(d.isFullExam);
          var wsLabel = d.wsLabel || (isExam ? t.exam : t.ws);
          var akLabel = d.akLabel || (isExam ? t.examAk : t.ak);
          var cbtBtn = isExam
            ? '<button type="button" class="wl-link cbt" data-track="' + _esc(safeTrack) + '" data-ws="' + _esc(safeWs) + '" data-title="' + _esc(d.title) + '" data-lang="' + safeLang + '" onclick="window.openDownloadExamCBT&amp;&amp;window.openDownloadExamCBT(this.dataset.track,this.dataset.ws,this.dataset.title,this.dataset.lang)">' + _esc(t.cbt) + '</button>'
            : '';
          var gformBtn = isExam ? '' : '<button type="button" class="wl-link gform" data-track="' + _esc(safeTrack) + '" data-num="' + _esc(d.num) + '" data-lang="' + safeLang + '" data-title="' + _esc(d.title) + '" data-ws="' + _esc(safeWs) + '" onclick="window.ClipSATWorksheetForm&amp;&amp;window.ClipSATWorksheetForm(this.dataset.track,this.dataset.num,this.dataset.lang,this.dataset.title,this.dataset.ws)" style="' + (window.ClipSATGoogle&&window.ClipSATGoogle.configured?'':'display:none') + '">📝 Form</button>';
          var wsOpenClick = ' data-dl-title="' + _esc(d.title + ' — ' + wsLabel) + '" onclick="return window._openDownloadInBrowser(event,this.href,this.dataset.dlTitle)"';
          var akOpenClick = ' data-dl-title="' + _esc(d.title + ' — ' + akLabel) + '" onclick="return window._openDownloadInBrowser(event,this.href,this.dataset.dlTitle)"';
          html += '<div class="wl-row' + (isExam ? ' wl-row-exam' : '') + '"><span class="wl-num">' + _esc(d.num) + '</span><span class="wl-title">' + _esc(d.title) + '</span>'
            + '<span class="wl-links">' + cbtBtn + '<a class="wl-link ws" href="' + _esc(base + safeWs) + '" target="_blank" rel="noopener"' + wsOpenClick + '>' + _esc(wsLabel) + '</a>'
            + '<a class="wl-link ak" href="' + _esc(base + safeAk) + '" target="_blank" rel="noopener"' + akOpenClick + '>' + _esc(akLabel) + '</a>'
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

  window._openDownloadInBrowser = function(ev, rawUrl, docTitle){
    if(ev && ev.altKey) return true;
    if(ev) ev.preventDefault();
    var isPdf = /\.pdf(?:$|[?#])/i.test(rawUrl || '');
    var win = window.open('', '_blank');
    if(win){
      win.document.open();
      win.document.write('<!doctype html><html><head><meta charset="utf-8"><title>' + _esc(docTitle || (isPdf ? 'Loading PDF…' : 'Loading Exam…')) + '</title></head><body style="font-family:system-ui,sans-serif;padding:40px;text-align:center;color:#334155"><p>' + (isPdf ? 'Loading PDF in browser…' : 'Loading printable exam…') + '</p></body></html>');
      win.document.close();
    }
    var m = String(rawUrl || '').match(/\/downloads\/([^?#]+)$/i);
    var rel = m ? m[1] : '';
    var rawGh = rel ? ('https://raw.githubusercontent.com/mohammedamy/ClipSAT/main/public/downloads/' + rel) : rawUrl;
    var urls = (rawUrl.indexOf('raw.githubusercontent.com') !== -1 || rawGh === rawUrl) ? [rawUrl] : [rawUrl, rawGh];
    function fetchFirst(idx){
      return fetch(urls[idx]).then(function(r){
        if(!r.ok) throw new Error('HTTP ' + r.status);
        return r;
      }).catch(function(err){
        if(idx + 1 < urls.length) return fetchFirst(idx + 1);
        throw err;
      });
    }
    fetchFirst(0).then(function(r){
      if(isPdf){
        return r.arrayBuffer().then(function(buf){
          var blob = new Blob([buf], { type: 'application/pdf' });
          var ownerUrl = (win && !win.closed && win.URL && win.URL.createObjectURL) ? win.URL : URL;
          var blobUrl = ownerUrl.createObjectURL(blob);
          var fileName = (rel ? rel.split('/').pop() : 'clipsat-worksheet.pdf').replace(/[^a-zA-Z0-9._-]/g, '');
          var isMob = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');
          if(!win || win.closed){ window.open(blobUrl, '_blank'); return; }
          if(isMob){ win.location.replace(blobUrl); return; }
          var tSafe = _esc(docTitle || fileName);
          var barCss = '*{box-sizing:border-box}html,body{margin:0;padding:0;height:100%;overflow:hidden;background:#334155;font-family:system-ui,-apple-system,sans-serif}.b{height:38px;padding:0 12px;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px}.t{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.a{display:flex;gap:8px;flex-shrink:0}.btn{display:inline-flex;align-items:center;padding:4px 10px;border-radius:6px;border:1px solid #334155;background:#1e293b;color:#f8fafc;text-decoration:none;font-size:12px;font-weight:600;cursor:pointer}.p{background:#2563eb;border-color:#2563eb}#cs-pdf-frame{width:100%;height:calc(100vh - 38px);border:0;display:block;background:#525659}';
          var shell = '<!doctype html><html><head><meta charset="utf-8"><title>' + tSafe + ' — ClipSAT PDF</title><style>' + barCss + '</style></head><body>'
            + '<div class="b"><span class="t">' + tSafe + '</span><div class="a">'
            + '<button type="button" class="btn" onclick="var f=document.getElementById(\'cs-pdf-frame\');try{f.contentWindow.focus();f.contentWindow.print()}catch(_){window.open(f.src,\'_blank\')}">🖨 Print</button>'
            + '<a class="btn" href="' + blobUrl + '" target="_blank" rel="noopener">↗ Open Tab</a>'
            + '<a class="btn p" href="' + blobUrl + '" download="' + _esc(fileName) + '">⬇ Download PDF</a>'
            + '</div></div>'
            + '<iframe id="cs-pdf-frame" src="' + blobUrl + '" title="' + tSafe + '"></iframe></body></html>';
          win.document.open();
          win.document.write(shell);
          win.document.close();
          try{ win.addEventListener('beforeunload', function(){ try{ ownerUrl.revokeObjectURL(blobUrl); }catch(_){} }); }catch(_){}
        });
      }
      return r.text().then(function(html){
        var origin = (typeof location !== 'undefined' && location.origin) ? location.origin : 'https://clipsat.org';
        var patched = html
          .replace(/((?:href|src)=["'])\/(?!\/)/gi, '$1' + origin + '/')
          .replace(/<head([^>]*)>/i, '<head$1><base href="' + origin + '/">');
        var blob = new Blob([patched], { type: 'text/html;charset=utf-8' });
        var blobUrl = URL.createObjectURL(blob);
        if(win && !win.closed) win.location.replace(blobUrl);
        else window.open(blobUrl, '_blank');
        setTimeout(function(){ try { URL.revokeObjectURL(blobUrl); } catch(_){} }, 120000);
      });
    }).catch(function(){
      if(win && !win.closed) win.location.href = rawGh;
      else window.open(rawGh, '_blank', 'noopener');
    });
    return false;
  };
  window._openRawHtmlExam = window._openDownloadInBrowser;

  function initLibraries(){
    var containers = document.querySelectorAll('.worksheet-library');
    containers.forEach(function(el){
      if(el.dataset.wlLoaded) return;
      el.dataset.wlLoaded = '1';
      var trackId = el.getAttribute('data-track');
      var cdnPrefix = String(window.CLIPSAT_CDN_BASE || '').replace(/\/+$/, '');
      fetch(cdnPrefix + '/downloads/' + trackId + '/manifest.json')
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
  var targetBox = (which === 'terms') ? terms : priv;
  var lazyBody = targetBox && targetBox.querySelector('.legal-lazy-body');
  if(lazyBody && !lazyBody.dataset.loaded){
    lazyBody.innerHTML = '<p style="opacity:.7">Loading…</p>';
    var url = (which === 'terms') ? '/terms/' : '/privacy/';
    fetch(url).then(function(r){ return r.ok ? r.text() : ''; }).then(function(html){
      if(!html) return;
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var main = doc.querySelector('main');
      if(main){
        main.querySelectorAll('script').forEach(function(s){ s.remove(); });
        lazyBody.innerHTML = main.innerHTML;
        lazyBody.dataset.loaded = '1';
      }
    }).catch(function(){});
  }
  ov.inert = false;
  ov.removeAttribute('inert');
  ov.classList.add('show');
}
function closeLegal(){
  var ov=document.getElementById('legal-overlay');
  if(ov){
    ov.classList.remove('show');
    ov.inert = true;
    ov.setAttribute('inert', '');
  }
}

/* ── Cookie & Advertising Consent Management ───────────────────────── */
var CONSENT_KEY = 'clipsat_cookie_consent';

window.getCookieConsent = function(){
  try { return localStorage.getItem(CONSENT_KEY); } catch(e){ return null; }
};

window.setCookieConsent = function(choice){
  try { localStorage.setItem(CONSENT_KEY, choice); } catch(e){}
  var banner = document.getElementById('cookieConsentBanner');
  if(banner) banner.style.display = 'none';
  if(document.body) document.body.classList.remove('cookie-banner-open');
  if(choice === 'accepted'){
    window.loadConsentedScripts && window.loadConsentedScripts();
  }
  document.dispatchEvent(new CustomEvent('clipsat:consent-changed', { detail: { consent: choice } }));
};

window.openCookieConsent = function(){
  var banner = document.getElementById('cookieConsentBanner');
  if(banner){
    banner.style.display = 'block';
    if(document.body) document.body.classList.add('cookie-banner-open');
    var acceptBtn = document.getElementById('cookieAcceptAll');
    if(acceptBtn) acceptBtn.focus();
  }
};

window.loadConsentedScripts = function(){
  if(window.getCookieConsent() !== 'accepted') return;
  if(window._adSenseClientId && !document.getElementById('google-adsense-script')){
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.requestNonPersonalizedAds = 1;
    var s = document.createElement('script');
    s.id = 'google-adsense-script';
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(window._adSenseClientId);
    s.setAttribute('data-tag-for-child-directed-treatment', '1');
    s.setAttribute('data-npa', '1');
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
    if(banner){
      banner.style.display = 'block';
      if(document.body) document.body.classList.add('cookie-banner-open');
    }
  } else if(consent === 'accepted'){
    window.loadConsentedScripts();
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}
