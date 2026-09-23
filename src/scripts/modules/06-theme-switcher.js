(function(){
  /* a11y: every theme's --faint is small secondary text (worksheet numbers, captions), so it must
     reach 4.5:1 on both that theme's --paper and --paper-2. The original values sat at 2.3-3.6:1, and
     since applyTheme() writes them inline on :root, they silently overrode main.css's own fix
     (--faint:#5F6979). Each is the same hue, just darkened (lightened for Dark) until it passes. */
  var THEMES=[
    {
      id:'classic',
      label:'Classic',
      swatch:'#1E3A6E',
      vars:{
        '--paper':'#FCFDFE','--paper-2':'#EEF1F6','--panel':'#FFFFFF',
        '--ink':'#0E1726','--muted':'#566173','--faint':'#5F6979',
        '--line':'#DBE0E9','--grid':'#E9EDF3',
        '--indigo':'#1E3A6E','--indigo-2':'#2B5BA8','--indigo-soft':'rgba(30,58,110,.08)',
        '--amber':'#B8801F','--amber-2':'#C8902A','--amber-soft':'rgba(200,144,42,.14)',
        '--fg':'#0E1726'
      }
    },
    {
      id:'dark',
      label:'Dark',
      swatch:'#1e1e2e',
      vars:{
        '--paper':'#1e1e2e','--paper-2':'#181825','--panel':'#252535',
        '--ink':'#cdd6f4','--muted':'#a6adc8','--faint':'#84889C',
        '--line':'#313244','--grid':'#2a2a3d',
        '--indigo':'#89b4fa','--indigo-2':'#74c7ec','--indigo-soft':'rgba(137,180,250,.12)',
        '--amber':'#f9e2af','--amber-2':'#fab387','--amber-soft':'rgba(249,226,175,.12)',
        '--fg':'#cdd6f4'
      }
    },
    {
      id:'emerald',
      label:'Emerald',
      swatch:'#1a4731',
      vars:{
        '--paper':'#f5faf7','--paper-2':'#e8f4ed','--panel':'#ffffff',
        '--ink':'#0f2419','--muted':'#3d6b52','--faint':'#4A755C',
        '--line':'#c5dece','--grid':'#daeee2',
        '--indigo':'#1a4731','--indigo-2':'#2e7d55','--indigo-soft':'rgba(26,71,49,.08)',
        '--amber':'#b86b1f','--amber-2':'#d4822a','--amber-soft':'rgba(184,107,31,.13)',
        '--fg':'#0f2419'
      }
    },
    {
      id:'crimson',
      label:'Crimson',
      swatch:'#7b1d2e',
      vars:{
        '--paper':'#fdf5f6','--paper-2':'#f5e6e9','--panel':'#ffffff',
        '--ink':'#2a0a10','--muted':'#7b4652','--faint':'#895B64',
        '--line':'#e8cdd1','--grid':'#f0dde0',
        '--indigo':'#7b1d2e','--indigo-2':'#a32840','--indigo-soft':'rgba(123,29,46,.08)',
        '--amber':'#8a5e1a','--amber-2':'#a87425','--amber-soft':'rgba(138,94,26,.12)',
        '--fg':'#2a0a10'
      }
    },
    {
      id:'slate',
      label:'Slate',
      swatch:'#334155',
      vars:{
        '--paper':'#f8fafc','--paper-2':'#f1f5f9','--panel':'#ffffff',
        '--ink':'#0f172a','--muted':'#475569','--faint':'#5D708C',
        '--line':'#e2e8f0','--grid':'#e8edf4',
        '--indigo':'#334155','--indigo-2':'#4f6a8a','--indigo-soft':'rgba(51,65,85,.08)',
        '--amber':'#b45309','--amber-2':'#d97706','--amber-soft':'rgba(180,83,9,.12)',
        '--fg':'#0f172a'
      }
    }
  ];

  function applyTheme(id){
    var t=THEMES.find(function(x){return x.id===id;})||THEMES[0];
    var root=document.documentElement.style;
    Object.keys(t.vars).forEach(function(k){ root.setProperty(k,t.vars[k]); });
    // update swatch + label
    var sw=document.getElementById('themeSwatch');
    var lb=document.getElementById('themeLabel');
    if(sw) sw.style.background=t.swatch;
    if(lb) lb.textContent=t.label;
    // mark active
    document.querySelectorAll('.theme-option').forEach(function(el){
      el.classList.toggle('active',el.getAttribute('data-tid')===id);
    });
    localStorage.setItem('clip_theme',id);
  }

  function buildDropdown(){
    var dd=document.getElementById('themeDropdown');
    if(!dd) return;
    THEMES.forEach(function(t){
      var btn=document.createElement('button');
      btn.className='theme-option';
      btn.setAttribute('data-tid',t.id);
      btn.innerHTML='<span class="ts" style="background:'+t.swatch+'"></span>'+t.label;
      (function(id){ btn.addEventListener('click',function(){ applyThemeAndClose(id); }); })(t.id);
      dd.appendChild(btn);
    });
  }

  window.applyThemeAndClose=function(id){
    applyTheme(id);
    document.getElementById('themePicker').classList.remove('open');
  };

  // Close on outside click
  document.addEventListener('click',function(e){
    var p=document.getElementById('themePicker');
    if(p&&!p.contains(e.target)) p.classList.remove('open');
  });

  // Init
  buildDropdown();
  var saved=localStorage.getItem('clip_theme')||'classic';
  applyTheme(saved);
})();

/* ─────────────────────────────────────────────── */

// Category select handler
  
  /* ── Close mobile nav on outside click ── */
  