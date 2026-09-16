(function(){
  var _esc = (typeof escHtml === 'function') ? escHtml : function(s){ return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; };

  var WL_I18N = {
    en: {searchPh:'Search worksheets…', of:' of ', topics:' worksheet topics', unit:'Unit ', ws:'Worksheet', ak:'Answer Key', none:'No worksheets match "'},
    ar: {searchPh:'ابحث في أوراق العمل…', of:' من ', topics:' موضوعًا', unit:'الوحدة ', ws:'ورقة العمل', ak:'مفتاح الإجابة', none:'لا توجد أوراق عمل مطابقة لـ "'}
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
      + '<input type="search" class="wl-search" placeholder="Search worksheets…" aria-label="Search worksheets">'
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
        return d.title.toLowerCase().indexOf(f) >= 0 || d.num.indexOf(f) >= 0 || (d.sub||'').toLowerCase().indexOf(f) >= 0;
      });
      countEl.textContent = filtered.length + t.of + langData.length + t.topics;
      listEl.setAttribute('dir', curLang === 'ar' ? 'rtl' : 'ltr');
      if(!filtered.length){
        listEl.innerHTML = '<div class="wl-empty">' + t.none + _esc(f) + '".</div>';
        return;
      }
      var groups = {}, order = [];
      filtered.forEach(function(d){
        var gKey = (d.sub||'') + '|' + d.unit;
        if(!groups[gKey]){ groups[gKey] = {sub:d.sub, unit:d.unit, items:[]}; order.push(gKey); }
        groups[gKey].items.push(d);
      });
      var html = '', lastSub;
      order.forEach(function(gKey){
        var g = groups[gKey];
        if(g.sub && g.sub !== lastSub){
          html += '<div class="wl-sub-title">' + _esc(g.sub) + '</div>';
          lastSub = g.sub;
        }
        html += '<div class="wl-unit"><div class="wl-unit-title">' + t.unit + g.unit + '</div>';
        g.items.forEach(function(d){
          var base = '/downloads/' + trackId + '/';
          /* "Create Google Form" trigger — no-ops until google-config.js is
             configured (window.ClipSATWorksheetForm only exists then, see
             public/js/quiz-capture-ui.js). Most worksheets are free-response
             only; the click itself checks for real MCQ data and says so
             plainly if there isn't any, rather than pretending every
             worksheet supports this. A <button>, not an <a href="javascript:
             void(0)"> — this is a JS-only action with no real destination to
             navigate to, and Lighthouse's SEO crawlable-anchors audit
             correctly flags a fake-link like that (button.wl-link.gform in
             main.css resets browser button chrome to render identically). */
          var gformBtn = '<button type="button" class="wl-link gform" onclick="window.ClipSATWorksheetForm&amp;&amp;window.ClipSATWorksheetForm(\'' + trackId + '\',\'' + _esc(d.num) + '\',\'' + (d.lang||'en') + '\',\'' + _esc(d.title).replace(/'/g,"\\'") + '\')" style="' + (window.ClipSATGoogle&&window.ClipSATGoogle.configured?'':'display:none') + '">📝 Form</button>';
          html += '<div class="wl-row"><span class="wl-num">' + _esc(d.num) + '</span><span class="wl-title">' + _esc(d.title) + '</span>'
            + '<span class="wl-links"><a class="wl-link ws" href="' + base + d.worksheet + '" target="_blank" rel="noopener">' + t.ws + '</a>'
            + '<a class="wl-link ak" href="' + base + d.answerkey + '" target="_blank" rel="noopener">' + t.ak + '</a>'
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
