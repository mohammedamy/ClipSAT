/* ═══════════════════════════════════════════════════════════════════════════
   02-core-app.js — Core Router, View/Chapter Navigation & Explorer Runtime
   Modularized in Pillar 5: Plot/Canvas engine → 02a-plot-canvas-engine.js,
   Exam Language & Print → 02d-exam-print-and-lang.js,
   Question Bank & Syllabus Map → 02e-question-bank-and-syllabus.js.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  var K = window.CSExplorerKit;
  var Plot = K.Plot, fmt = K.fmt, integrate = K.integrate, register = K.register,
      redrawAll = K.redrawAll, wireDataToggle = K.wireDataToggle,
      renderDataRows = K.renderDataRows, reduceMotion = K.reduceMotion;

  /* ===================== A2 · EXPONENTIAL e^{kx} ===================== */
  (function(){
    var canvas=document.getElementById('a2ExpCanvas'); if(!canvas) return;
    var k=0.5, s=document.getElementById('a2ExpK');
    var view={xmin:-3,xmax:3,ymin:-1,ymax:10};
    var dataBtn=document.getElementById('a2ExpDataBtn'), dataPanel=document.getElementById('a2ExpDataPanel'),
        dataDesc=document.getElementById('a2ExpDataDesc'), dataRows=document.getElementById('a2ExpDataRows');
    wireDataToggle(dataBtn,dataPanel);
    function updateDataView(f){
      if(!dataDesc) return;
      var type=(k>0.001?'growth':(k<-0.001?'decay':'constant'));
      dataDesc.textContent='y = e^('+fmt(k,1)+'x) ('+type+'). At x = 1, y = '+Math.exp(k).toFixed(3)+'.';
      var N=9, rows=[];
      for(var i=0;i<N;i++){ var x=view.xmin+(view.xmax-view.xmin)*i/(N-1); rows.push([fmt(x),fmt(f(x))]); }
      renderDataRows(dataRows,rows);
    }
    function draw(ctx,w,ht){
      var C=K.colors();
      var P=new Plot(ctx,w,ht,view,{l:26,r:12,t:12,b:20}); P.clear(); P.grid();
      var f=function(x){return Math.exp(k*x);};
      P.curve(f, C.INDIGO, 2.6); P.dot(0,1,C.AMBER2,5);
      document.getElementById('a2ExpType').textContent=(k>0.001?'growth':(k<-0.001?'decay':'constant'));
      document.getElementById('a2ExpVal').textContent=Math.exp(k).toFixed(3);
      updateDataView(f);
    }
    register(canvas,draw);
    if(s) s.addEventListener('input',function(){ k=parseFloat(s.value); document.getElementById('a2ExpKV').textContent=k.toFixed(1); redrawAll(); });
  })();

  /* ===================== ROUTING / UI ===================== */
  var currentView=null;

  window.showView=function(name){
    var changed=(name!==currentView); currentView=name;
    if(window.CS_loadTrackBank) window.CS_loadTrackBank(name);
    document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
    var el=document.getElementById('view-'+name); if(el) el.classList.add('active');
    var sel=document.getElementById('navSelect');
    if(sel && sel.value!==name){
      var found=false;
      for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===name){sel.selectedIndex=i;found=true;break;}}
      if(!found) sel.value='home';
    }
    var _nl=document.getElementById('navlinks'),_mb=document.getElementById('menuBtn');
    if(_nl){_nl.classList.remove('open');}
    if(_mb){_mb.setAttribute('aria-expanded','false');_mb.innerHTML='&#9776; Menu';}
    if(history.replaceState && (location.hash||'').indexOf('access_token=')===-1) history.replaceState(null,'','#view/'+name);
    if(changed) window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});
    if(changed && el){
      var chs=el.querySelectorAll('.chapter');
      var hasActive=el.querySelector('.chapter.ch-active');
      if(!hasActive && chs.length){ chs[0].classList.add('ch-active'); }
      if(!hasActive){
        var rl=el.querySelectorAll('.rail a');
        if(rl.length){ rl.forEach(function(a){a.classList.remove('active');}); rl[0].classList.add('active'); }
      }
    }
    setTimeout(redrawAll,60); setTimeout(redrawAll,420);
    if(el){ setTimeout(function(){ if(window.MathJax && MathJax.typesetPromise){ var _active=el.querySelector('.chapter.ch-active')||el; MathJax.typesetPromise([_active]).catch(function(){}); } },80); }
  };

  window.goChapter=function(id, view){
    var vn=view;
    if(!vn){
      var _av=document.querySelector('.view.active');
      vn=_av?_av.id.replace(/^view-/,''):'calculus';
    }
    if(!document.getElementById('view-'+vn)){
      var dest='/'+(vn==='home'?'':vn+'/');
      window.location.href = id ? dest+'?ch='+encodeURIComponent(id) : dest;
      return;
    }
    window.showView(vn);
    var av=document.querySelector('.view.active');
    if(av){
      av.querySelectorAll('.chapter').forEach(function(c){ c.classList.remove('ch-active'); });
      var t=document.getElementById(id);
      if(t){ t.classList.add('ch-active'); window.scrollTo(0,0); }
      av.querySelectorAll('.rail a').forEach(function(a){
        a.classList.toggle('active', a.getAttribute('data-target')===id);
      });
      if(history.replaceState) history.replaceState(null,'','#view/'+vn+'/'+id);
      _wireAutoExplorers();
      redrawAll();
      setTimeout(redrawAll, 60);
    }
  };

  window.goCatalog=function(){
    window.showView('home');
    setTimeout(function(){
      var t=document.getElementById('catalog');
      if(t) t.scrollIntoView({behavior:reduceMotion?'auto':'smooth', block:'start'});
    },80);
  };

  window.toggleSol=function(btn){
    var p=btn.closest('.problem'); var open=p.classList.toggle('open');
    btn.childNodes[1].textContent=' '+(open?'Hide solution':'Show solution');
    if(open && window.MathJax && MathJax.typesetPromise){ MathJax.typesetPromise([p.querySelector('.solution')]); }
  };

  /* Bubble sheet interactivity — click to fill, click filled to clear */
  document.addEventListener('click',function(e){
    var b=e.target.closest('.fep-bubble');
    if(!b) return;
    var row=b.closest('.fep-bubble-row');
    row.querySelectorAll('.fep-bubble').forEach(function(x){ x.classList.remove('filled'); });
    if(!b.classList.contains('filled-prev')){b.classList.add('filled');}
    row.querySelectorAll('.fep-bubble').forEach(function(x){ x.classList.remove('filled-prev'); });
    if(b.classList.contains('filled')) b.classList.add('filled-prev');
  });

  /* Full-exam MCQ choice highlight */
  document.addEventListener('click',function(e){
    var ch=e.target.closest('.fep-choice');
    if(!ch) return;
    var choices=ch.closest('.fep-choices');
    choices.querySelectorAll('.fep-choice').forEach(function(c){c.style.background=''; c.style.borderColor='transparent';});
    ch.style.background='#e8eeff'; ch.style.borderColor='#3b4fc8';
  });

  /* ---------- universal 2D square-lattice & 3D ClipSAT3D auto-explorer binder ---------- */
  function _wireAutoExplorers(){
    var C=K.colors();
    var INDIGO=C.INDIGO, AMBER2=C.AMBER2, INK=C.INK;
    var canvases=document.querySelectorAll('canvas[id^="exAuto_"]');
    for(var i=0;i<canvases.length;i++){
      (function(canvas){
        if(canvas._autoWired) return;
        canvas._autoWired=true;
        var parts=canvas.id.split('_'), mode=parts[1]||'quad';
        var ex=canvas.closest('.explorer'); if(!ex) return;
        var sliders=ex.querySelectorAll('input[type="range"]');
        var s0=sliders[0], s1=sliders[1];
        var vSpans=ex.querySelectorAll('.ctrl label .mono');
        var rVals=ex.querySelectorAll('.readrow .v');
        var dBtn=ex.querySelector('.ex-data-btn'), dPanel=ex.querySelector('.ex-data-panel'),
            dDesc=dPanel?dPanel.querySelector('p'):null, dRows=dPanel?dPanel.querySelector('tbody'):null;
        wireDataToggle(dBtn,dPanel);
        var view={xmin:-6,xmax:6,ymin:-5,ymax:5,square:true,step:1};
        if(mode==='stats') view={xmin:0,xmax:8,ymin:0,ymax:32,square:false,step:1};
        function draw(ctx,w,h){
          var P=new Plot(ctx,w,h,view,{l:28,r:14,t:12,b:22}); P.clear(); P.grid();
          var a=s0?parseFloat(s0.value):2, b=s1?parseFloat(s1.value):1;
          if(vSpans[0]) vSpans[0].textContent=fmt(a,1);
          if(vSpans[1]) vSpans[1].textContent=fmt(b,1);
          var rows=[];
          if(mode==='trig'){
            var fT=function(x){return a*Math.sin(b*x);};
            P.curve(fT,INDIGO,2.5);
            P.hline(a,AMBER2,[4,4]); P.hline(-a,AMBER2,[4,4]);
            var pk=Math.abs(b)>1e-6?Math.PI/(2*b):0;
            P.dot(pk,a,AMBER2,5);
            if(rVals[0]) rVals[0].textContent=fmt(Math.abs(a),2);
            if(rVals[1]) rVals[1].textContent=(Math.abs(b)>1e-6?fmt(2*Math.PI/Math.abs(b),2):'∞');
            for(var k=-4;k<=4;k+=2) rows.push([fmt(k,1),fmt(fT(k),2)]);
          } else if(mode==='calc'){
            var fC=function(x){return 0.25*x*x*x - 0.75*x + 0.5*b;};
            var x0=Math.max(-3.5,Math.min(3.5,a*0.6)), y0=fC(x0), m=0.75*x0*x0-0.75;
            P.shadedArea(fC,0,x0,'rgba(30,58,110,0.16)');
            P.curve(fC,INDIGO,2.5);
            P.curve(function(x){return y0+m*(x-x0);},AMBER2,2.1);
            P.dot(x0,y0,AMBER2,5.5);
            if(rVals[0]) rVals[0].textContent='f\'('+fmt(x0,1)+') = '+fmt(m,2);
            if(rVals[1]) rVals[1].textContent='∫₀ˣ f(t)dt = '+fmt(integrate(fC,0,x0,60),2);
            for(var kc=-3;kc<=3;kc+=1.5) rows.push([fmt(kc,1),fmt(fC(kc),2)]);
          } else if(mode==='geo'){
            var rG=Math.max(1,Math.min(4.5,Math.abs(a)||3)), ang=Math.max(30,Math.min(160,Math.abs(b)*30||90)), rad=ang*Math.PI/180;
            P.parametric(function(t){return rG*Math.cos(t);},function(t){return rG*Math.sin(t);},0,2*Math.PI,INDIGO,2.3);
            P.segment(0,0,rG,0,AMBER2,2.2);
            P.segment(0,0,rG*Math.cos(rad),rG*Math.sin(rad),AMBER2,2.2);
            P.segment(rG,0,rG*Math.cos(rad),rG*Math.sin(rad),'#0E9F8F',2.1);
            P.dot(0,0,INK,4); P.dot(rG,0,AMBER2,4.5); P.dot(rG*Math.cos(rad),rG*Math.sin(rad),AMBER2,4.5);
            if(rVals[0]) rVals[0].textContent=fmt(rG*rad,2);
            if(rVals[1]) rVals[1].textContent=fmt(0.5*rG*rG*rad,2);
            rows.push(['Radius r',fmt(rG,2)],['Arc s = rθ',fmt(rG*rad,2)],['Sector Area',fmt(0.5*rG*rG*rad,2)]);
          } else if(mode==='vec'){
            P.segment(0,0,a,b,INDIGO,2.6); P.dot(a,b,INDIGO,5);
            P.segment(0,0,-b,a,AMBER2,2.4); P.dot(-b,a,AMBER2,5);
            P.segment(0,0,a-b,a+b,'#0E9F8F',2.0,[4,3]); P.dot(a-b,a+b,'#0E9F8F',4.5);
            var mag=Math.sqrt(a*a+b*b);
            if(rVals[0]) rVals[0].textContent=fmt(mag,2);
            if(rVals[1]) rVals[1].textContent='⟨'+fmt(-b,1)+', '+fmt(a,1)+'⟩';
            rows.push(['u = ⟨a, b⟩','⟨'+fmt(a,1)+', '+fmt(b,1)+'⟩'],['|u|',fmt(mag,2)],['⊥ vector v','⟨'+fmt(-b,1)+', '+fmt(a,1)+'⟩']);
          } else if(mode==='stats'){
            var vals=[8,11,13,14,16,Math.max(4,Math.min(30,10+a*3)),Math.max(4,Math.min(30,14+b*3))].sort(function(x,y){return x-y;});
            var sum=0;
            for(var si=0;si<vals.length;si++){ sum+=vals[si]; P.segment(si+1,0,si+1,vals[si],si===6?AMBER2:INDIGO,14); rows.push(['x'+(si+1),fmt(vals[si],1)]); }
            var mn=sum/vals.length, md=vals[3];
            P.hline(mn,AMBER2,[4,4]); P.hline(md,'#0E9F8F',[2,2]);
            if(rVals[0]) rVals[0].textContent=fmt(mn,2);
            if(rVals[1]) rVals[1].textContent=fmt(md,1);
          } else if(mode==='exp'){
            var baseE=Math.max(1.3,Math.min(3.0,1.5+0.25*a));
            var fE=function(x){return Math.pow(baseE,x)+b*0.5-1;};
            var fI=function(x){ var arg=x-b*0.5+1; return arg>0.02?Math.log(arg)/Math.log(baseE):NaN; };
            P.curve(function(x){return x;},'#94A3B8',1.5,[4,4]);
            P.curve(fE,INDIGO,2.5);
            P.curve(fI,AMBER2,2.3);
            P.dot(0,fE(0),INDIGO,5); P.dot(fE(0),0,AMBER2,5);
            if(rVals[0]) rVals[0].textContent='b = '+fmt(baseE,2);
            if(rVals[1]) rVals[1].textContent='(0, '+fmt(fE(0),2)+')';
            for(var ke=-2;ke<=3;ke++) rows.push([fmt(ke,0),fmt(fE(ke),2)]);
          } else {
            var fQ=function(x){return 0.5*(x-a*0.5)*(x-a*0.5)+b-2;};
            var fL=function(x){return 0.5*x+0.5;};
            P.curve(fQ,INDIGO,2.5); P.curve(fL,AMBER2,2.1);
            P.vline(a*0.5,'#C2CCDA',[4,4]); P.dot(a*0.5,b-2,AMBER2,5.5);
            if(rVals[0]) rVals[0].textContent='('+fmt(a*0.5,1)+', '+fmt(b-2,1)+')';
            if(rVals[1]) rVals[1].textContent='x = '+fmt(a*0.5,1);
            for(var kq=-4;kq<=4;kq+=2) rows.push([fmt(kq,1),fmt(fQ(kq),2)]);
          }
          if(dDesc) dDesc.textContent='Interactive parameter table updated for current slider positions.';
          if(dRows) renderDataRows(dRows,rows);
        }
        register(canvas,draw);
        for(var j=0;j<sliders.length;j++){
          sliders[j].addEventListener('input',redrawAll);
          sliders[j].addEventListener('change',redrawAll);
        }
      })(canvases[i]);
    }

    var btns3d=document.querySelectorAll('button.ex-3d-btn[id^="exAuto3dBtn_"]');
    for(var bIdx=0;bIdx<btns3d.length;bIdx++){
      (function(btn){
        if(btn._auto3dWired) return;
        btn._auto3dWired=true;
        var parts=btn.id.split('_'), mode3d=parts[1]||'solid';
        var ex=btn.closest('.explorer'); if(!ex) return;
        var wrap=ex.querySelector('.ex-3d-wrap'), hint=ex.querySelector('.ex-3d-hint');
        var sliders=ex.querySelectorAll('input[type="range"]');
        var s0=sliders[0], s1=sliders[1];
        var built=false, H=null, m1=null, m2=null, m3=null;
        function build(mods){
          var T=mods.THREE, COLOR=window.ClipSAT3D.COLOR;
          H=window.ClipSAT3D.setup(wrap, mods, {az:0.8, el:0.45, dist:10.5, target:new T.Vector3(0,1.6,0),
            axisSegs:[[[-5,0,0],[5,0,0]],[[0,0,0],[0,5,0]],[[0,0,-5],[0,0,5]]]});
          if(mode3d==='surf'){
            var geom=new T.PlaneGeometry(5,5,28,28);
            geom.rotateX(-Math.PI/2);
            var pos=geom.attributes.position;
            for(var vi=0;vi<pos.count;vi++){
              var vx=pos.getX(vi), vz=pos.getZ(vi);
              pos.setY(vi, 0.18*(vx*vx+vz*vz));
            }
            geom.computeVertexNormals();
            m1=new T.Mesh(geom, new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.65, side:T.DoubleSide}));
            m2=new T.Mesh(geom, new T.MeshBasicMaterial({color:COLOR.INK, wireframe:true, transparent:true, opacity:0.22}));
            var plGeo=new T.PlaneGeometry(3.2,3.2); plGeo.rotateX(-Math.PI/2);
            m3=new T.Mesh(plGeo, new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.55, side:T.DoubleSide}));
            H.scene.add(m1); H.scene.add(m2); H.scene.add(m3);
          } else if(mode3d==='vec3'){
            var boxGeo=new T.BoxGeometry(2.4,1.8,2.0);
            m1=new T.Mesh(boxGeo, new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.35}));
            m2=new T.Mesh(boxGeo, new T.MeshBasicMaterial({color:COLOR.AMBER, wireframe:true}));
            m1.position.set(1.2,0.9,1.0); m2.position.set(1.2,0.9,1.0);
            H.scene.add(m1); H.scene.add(m2);
          } else {
            var cylGeo=new T.CylinderGeometry(1,1,1,36,1,true);
            m1=new T.Mesh(cylGeo, new T.MeshLambertMaterial({color:COLOR.INDIGO, transparent:true, opacity:0.30, side:T.DoubleSide}));
            var coneGeo=new T.ConeGeometry(1,1,36);
            m2=new T.Mesh(coneGeo, new T.MeshLambertMaterial({color:COLOR.AMBER, transparent:true, opacity:0.68, side:T.DoubleSide}));
            m3=new T.Mesh(coneGeo, new T.MeshBasicMaterial({color:COLOR.INK, wireframe:true, transparent:true, opacity:0.22}));
            H.scene.add(m1); H.scene.add(m2); H.scene.add(m3);
          }
          update3d();
        }
        function update3d(){
          if(!H) return;
          var v0=s0?Math.max(1,Math.min(4.5,Math.abs(parseFloat(s0.value))||2.5)):2.5;
          var v1=s1?Math.max(1.5,Math.min(5.0,Math.abs(parseFloat(s1.value))||3.5)):3.5;
          if(mode3d==='surf' && m3){
            m3.position.set(0, v0*0.45, 0);
          } else if(mode3d==='vec3' && m1 && m2){
            m1.scale.set(v0*0.45, v1*0.45, 1); m1.position.set(v0*0.5, v1*0.4, 1);
            m2.scale.copy(m1.scale); m2.position.copy(m1.position);
          } else if(m1 && m2 && m3){
            m1.scale.set(v0*0.65, v1*0.75, v0*0.65); m1.position.set(0, v1*0.375, 0);
            m2.scale.set(v0*0.65, v1*0.75, v0*0.65); m2.position.set(0, v1*0.375, 0);
            m3.scale.set(v0*0.65, v1*0.75, v0*0.65); m3.position.set(0, v1*0.375, 0);
          }
          H.render();
        }
        btn.addEventListener('click',function(){
          if(!wrap.hidden){
            wrap.hidden=true; if(hint) hint.hidden=true;
            btn.setAttribute('aria-expanded','false');
            btn.textContent='🧊 View Interactive 3D Model';
            return;
          }
          wrap.hidden=false; if(hint) hint.hidden=false;
          btn.setAttribute('aria-expanded','true');
          if(built){ update3d(); return; }
          built=true; btn.disabled=true; btn.textContent='Loading 3D…';
          window.ClipSAT3D.load().then(function(mods){
            btn.disabled=false; btn.textContent='🧊 Hide 3D View';
            build(mods);
          });
        });
        for(var k=0;k<sliders.length;k++) sliders[k].addEventListener('input',update3d);
      })(btns3d[bIdx]);
    }
  }

  /* ---------- init ---------- */
  function init(){
    var _rawHash=(location.hash||'').replace(/^#/,'');
    var _VIEWS=['home','calculus','algebra','alg2','apab','apbc','igcse','geo','qudrat','tahsili','sat','act','aslevel','a2level','est','est2','act2','act2l2','est2l2','appc','apstats','precalc','linalg','mvc','odes','ibsl','ibhl','addmath','mathai','ibslaa','ibhlaa','ibslai','ibhlai'];
    (function(){
      var parts=_rawHash.split('/');
      var viewId=(window.CLIPSAT_TRACK&&window.CLIPSAT_TRACK!=='home')?window.CLIPSAT_TRACK:'home', chapId='';
      if(parts[0]==='view' && parts[1]){
        viewId=parts[1]; chapId=parts[2]||'';
      } else if(_VIEWS.indexOf(_rawHash)!==-1){
        viewId=_rawHash;
      }
      window.showView(viewId);
      if(chapId){
        setTimeout(function(){ window.goChapter(chapId, viewId); },120);
      }
    }());
    var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
    _wireAutoExplorers();
    redrawAll();
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
  window.addEventListener('load',function(){ setTimeout(redrawAll,200); });
})();

/* ─────────────────────────────────────────────── */
