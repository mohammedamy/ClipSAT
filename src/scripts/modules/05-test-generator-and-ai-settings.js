(function(){
'use strict';

/* ── helpers ───────────────────────────────────────────────────── */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── AI Settings ────────────────────────────────────────────────────
   Both this exam generator and the Ask Mr. Mohamed chat tutor call
   window._openrouterChatMessages() (defined earlier in this file). By
   default that routes through a signed-in-only Supabase proxy (see the
   "SHARED AI PROVIDER" block above); the only thing a visitor can
   configure here is an optional personal Groq key, which skips signing
   in entirely and calls Groq directly with their own key instead. */
window.openAISettings=function(){
  document.getElementById('aiKey').value=localStorage.getItem('clip_or_key')||'';
  document.getElementById('aiStatus').className='ai-status';
  document.getElementById('aiModal').classList.add('show');
};
window.closeAISettings=function(){ document.getElementById('aiModal').classList.remove('show'); };
window.saveAISettings=function(){
  var k=document.getElementById('aiKey').value.trim();
  if(k){
    localStorage.setItem('clip_or_key',k);
    showAIStatus('Saved! Using your own Groq key.','ok');
  } else {
    localStorage.removeItem('clip_or_key');
    showAIStatus('Cleared — back to the shared AI (requires sign-in).','ok');
  }
  setTimeout(window.closeAISettings,1200);
};
function showAIStatus(msg,cls){
  var el=document.getElementById('aiStatus');
  el.textContent=msg; el.className='ai-status '+cls;
}
window.aiEnabled=function(){ return window._openrouterEnabled?window._openrouterEnabled():false; };

/* AI generates the test when AI is available, unless the visitor picks
   "Question bank" in the .tg-source select (test-generator.njk). Every AI
   question is reviewed (05b-ai-question-verifier.js) before it is shown. */
function aiSourceChosen(btn){
  var box=btn&&btn.closest('.testgen');
  var sel=box&&box.querySelector('.tg-source');
  if(sel&&sel.value==='bank') return false;
  return window.aiEnabled();
}
/* The AI exam pipeline — AI tests and papers (05a), review (05b), blueprints (05c),
   assembler (05d) — ships as
   public/js/ai-exam.js and loads the first time an AI test or paper is generated
   (Plan 5 Phase 5.015, ADR 0037). Touching a test generator warms the load. */
var _aiExamPromise=null;
window._ensureAIExam=function(){
  if(window.CSAITest&&window.ClipSATAssembler&&window.ClipSATBlueprints&&window.ClipSATVerifyAI) return Promise.resolve();
  if(_aiExamPromise) return _aiExamPromise;
  _aiExamPromise=new Promise(function(resolve,reject){
    var s=document.createElement('script');
    s.src='/js/ai-exam.js';
    s.onload=function(){ (window.ClipSATAssembler&&window.CSAITest)?resolve():reject(new Error('ai-exam.js did not register')); };
    s.onerror=function(){ _aiExamPromise=null; reject(new Error('The exam generator could not load. Check your connection and try again.')); };
    document.head.appendChild(s);
  });
  return _aiExamPromise;
};
['pointerdown','focusin'].forEach(function(ev){
  document.addEventListener(ev,function(e){
    if(!window.ClipSATAssembler&&e.target&&e.target.closest&&e.target.closest('.testgen')&&window.aiEnabled&&window.aiEnabled())
      window._ensureAIExam().catch(function(){});
  },true);
});
/* ── SVG Figure Renderer ────────────────────────────────────────── */
function evalFn(expr,x){
  try{
    var e=expr.replace(/\*\*/g,'___POW___');
    e=e.replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/abs\(/g,'Math.abs(').replace(/ln\(/g,'Math.log(')
      .replace(/log10\(/g,'Math.log10(').replace(/log\(/g,'Math.log10(').replace(/exp\(/g,'Math.exp(')
      .replace(/pi/g,'Math.PI').replace(/e(?![0-9a-zA-Z_])/g,'Math.E')
      .replace(/___POW___/g,'**');
    /* eslint-disable no-new-func */
    return (new Function('x','return ('+e+')'))(x);
  }catch(err){return NaN;}
}

function renderMathFigure(spec){
  if(!spec||!spec.type) return '';
  switch(spec.type){
    case 'function_graph': return renderFnGraph(spec);
    case 'geometry_2d':    return renderGeom2D(spec);
    case 'geometry_3d':    return renderGeom3D(spec);
    case 'bar_chart':      return renderBarChart(spec);
    case 'scatter':        return renderScatter(spec);
    case 'pie':            return renderPie(spec);
    case 'number_line':    return renderNumberLine(spec);
    default: return '';
  }
}
window.renderMathFigure = renderMathFigure; // expose to _renderFig, which lives in a separate scope

/* ── Function Graph ─────────────────────────────────── */
function renderFnGraph(s){
  var W=320,H=230,ml=42,mr=20,mt=18,mb=32;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xmin=s.xmin!=null?s.xmin:-5, xmax=s.xmax!=null?s.xmax:5;
  var ymin=s.ymin!=null?s.ymin:-4, ymax=s.ymax!=null?s.ymax:6;
  function sx(mx){return ml+(mx-xmin)/(xmax-xmin)*pw;}
  function sy(my){return mt+ph-(my-ymin)/(ymax-ymin)*ph;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Grid
  var xi,yi;
  for(xi=Math.ceil(xmin);xi<=Math.floor(xmax);xi++){
    svg+='<line x1="'+sx(xi).toFixed(1)+'" y1="'+mt+'" x2="'+sx(xi).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
  }
  for(yi=Math.ceil(ymin);yi<=Math.floor(ymax);yi++){
    svg+='<line x1="'+ml+'" y1="'+sy(yi).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy(yi).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
  }
  // Axes
  var ax0=Math.max(ml,Math.min(ml+pw,sx(0)));
  var ay0=Math.max(mt,Math.min(mt+ph,sy(0)));
  svg+='<line x1="'+ml+'" y1="'+ay0.toFixed(1)+'" x2="'+(ml+pw+8)+'" y2="'+ay0.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg+='<polygon points="'+(ml+pw+8)+','+ay0+' '+(ml+pw+2)+','+(ay0-3)+' '+(ml+pw+2)+','+(ay0+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<line x1="'+ax0.toFixed(1)+'" y1="'+(mt+ph+8)+'" x2="'+ax0.toFixed(1)+'" y2="'+(mt-8)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg+='<polygon points="'+ax0+','+(mt-8)+' '+(ax0-3)+','+(mt-2)+' '+(ax0+3)+','+(mt-2)+'" fill="'+FIG_INK+'"/>';
  // Axis labels
  svg+='<text x="'+(ml+pw+10)+'" y="'+(ay0+4)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">x</text>';
  svg+='<text x="'+(ax0+6)+'" y="'+(mt-10)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">y</text>';
  // Ticks
  for(xi=Math.ceil(xmin);xi<=Math.floor(xmax);xi++){
    if(xi===0) continue;
    var txs=sx(xi);
    svg+='<line x1="'+txs.toFixed(1)+'" y1="'+(ay0-3)+'" x2="'+txs.toFixed(1)+'" y2="'+(ay0+3)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    if(Math.abs(xi)<=10) svg+='<text x="'+txs.toFixed(1)+'" y="'+(ay0+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+xi+'</text>';
  }
  for(yi=Math.ceil(ymin);yi<=Math.floor(ymax);yi++){
    if(yi===0) continue;
    var tys=sy(yi);
    svg+='<line x1="'+(ax0-3)+'" y1="'+tys.toFixed(1)+'" x2="'+(ax0+3)+'" y2="'+tys.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    if(Math.abs(yi)<=10) svg+='<text x="'+(ax0-6)+'" y="'+(tys+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+yi+'</text>';
  }
  // Shade region
  if(s.shade){
    var sh=s.shade, a_=sh.a!=null?sh.a:xmin, b_=sh.b!=null?sh.b:xmax;
    var shPts=[],N=200;
    for(var si=0;si<=N;si++){
      var sx_=a_+(b_-a_)*si/N;
      var sy1=sh.from==='fn0'&&s.fns&&s.fns[0]?evalFn(s.fns[0],sx_):0;
      var sy2=sh.to==='fn1'&&s.fns&&s.fns[1]?evalFn(s.fns[1],sx_):(sh.to==='x_axis'?0:0);
      shPts.push([sx(sx_),sy(sy1),sy(sy2)]);
    }
    var shd='M'+shPts[0][0].toFixed(1)+','+shPts[0][2].toFixed(1);
    shd+=shPts.map(function(p){return 'L'+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('');
    shd+=shPts.slice().reverse().map(function(p){return 'L'+p[0].toFixed(1)+','+p[2].toFixed(1);}).join('');
    shd+='Z';
    svg+='<path d="'+shd+'" fill="'+FIG_AMBER_FILL+'" stroke="none"/>';
  }
  // Functions
  var colors=FIG_SERIES;
  (s.fns||[]).forEach(function(fnStr,fi){
    var col=colors[fi%colors.length];
    var seg=[],N=400;
    for(var i=0;i<=N;i++){
      var mx=xmin+(xmax-xmin)*i/N;
      var my=evalFn(fnStr,mx);
      var inRange=isFinite(my)&&my>=ymin-(ymax-ymin)&&my<=ymax+(ymax-ymin);
      if(inRange){seg.push([sx(mx),sy(my)]);}
      else{
        if(seg.length>1){
          svg+='<path d="'+seg.map(function(p,k){return (k===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
        }
        seg=[];
      }
    }
    if(seg.length>1){
      svg+='<path d="'+seg.map(function(p,k){return (k===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  });
  // Key points
  (s.points||[]).forEach(function(pt){
    var px=sx(pt.x||0),py=sy(pt.y!=null?pt.y:0);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+FIG_AMBER+'" stroke="#fff" stroke-width="1.5"/>';
    if(pt.label) svg+='<text x="'+(px+7)+'" y="'+(py-5)+'" font-size="9.5" fill="'+FIG_INK+'">'+esc(pt.label)+'</text>';
  });
  // Legend
  var labs=s.labels||[];
  if(labs.length){
    var legX=W-8,legY=mt+6;
    labs.forEach(function(lb,li){
      var col=colors[li%colors.length];
      svg+='<rect x="'+(legX-70)+'" y="'+(legY+li*16-6)+'" width="60" height="15" fill="white" fill-opacity="0.85" rx="3"/>';
      svg+='<line x1="'+(legX-68)+'" y1="'+(legY+li*16)+'" x2="'+(legX-55)+'" y2="'+(legY+li*16)+'" stroke="'+col+'" stroke-width="2"/>';
      svg+='<text x="'+(legX-52)+'" y="'+(legY+li*16+4)+'" font-size="8.5" fill="'+FIG_INK+'">'+esc(lb)+'</text>';
    });
  }
  svg+='</svg>';
  return svg;
}

/* ── 2D Geometry ───────────────────────────────────────── */
function renderGeom2D(s){
  var W=300,H=230,mg=38;
  var shapes=s.shapes||[];
  // Collect all points for auto-scaling
  var allx=[],ally=[];
  shapes.forEach(function(sh){
    (sh.pts||[]).forEach(function(p){allx.push(p[0]);ally.push(p[1]);});
    if(sh.cx!=null){allx.push(sh.cx-sh.r,sh.cx+sh.r);ally.push(sh.cy-sh.r,sh.cy+sh.r);}
  });
  if(!allx.length){allx=[0,4];ally=[0,3];}
  var mxmin=Math.min.apply(null,allx),mxmax=Math.max.apply(null,allx);
  var mymin=Math.min.apply(null,ally),mymax=Math.max.apply(null,ally);
  var dx=mxmax-mxmin||1,dy=mymax-mymin||1;
  mxmin-=dx*0.18;mxmax+=dx*0.18;mymin-=dy*0.18;mymax+=dy*0.18;
  function sx(mx){return mg+(mx-mxmin)/(mxmax-mxmin)*(W-2*mg);}
  function sy(my){return (H-mg)-(my-mymin)/(mymax-mymin)*(H-2*mg);}
  function norm2(v){var l=Math.sqrt(v[0]*v[0]+v[1]*v[1])||1;return [v[0]/l,v[1]/l];}

  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  shapes.forEach(function(sh){
    // POLYGON / TRIANGLE
    if(sh.shape==='triangle'||sh.shape==='polygon'){
      var pts=sh.pts.map(function(p){return [sx(p[0]),sy(p[1])];});
      var pstr=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');
      svg+='<polygon points="'+pstr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      // Right angle mark
      if(sh.right_angle!=null){
        var ri=sh.right_angle%pts.length;
        var rp=pts[ri];
        var p1=pts[(ri+1)%pts.length];
        var p2=pts[(ri+pts.length-1)%pts.length];
        var d1=norm2([p1[0]-rp[0],p1[1]-rp[1]]);
        var d2=norm2([p2[0]-rp[0],p2[1]-rp[1]]);
        var s2=12;
        var q1=[rp[0]+d1[0]*s2,rp[1]+d1[1]*s2];
        var q2=[rp[0]+d1[0]*s2+d2[0]*s2,rp[1]+d1[1]*s2+d2[1]*s2];
        var q3=[rp[0]+d2[0]*s2,rp[1]+d2[1]*s2];
        svg+='<path d="M'+q1[0].toFixed(1)+','+q1[1].toFixed(1)+' L'+q2[0].toFixed(1)+','+q2[1].toFixed(1)+' L'+q3[0].toFixed(1)+','+q3[1].toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      }
      // Angle arcs (non-right angles)
      if(sh.angle_marks){
        sh.angle_marks.forEach(function(ai){
          var ap=pts[ai%pts.length];
          var pp=pts[(ai+pts.length-1)%pts.length];
          var np=pts[(ai+1)%pts.length];
          var d3=norm2([pp[0]-ap[0],pp[1]-ap[1]]);
          var d4=norm2([np[0]-ap[0],np[1]-ap[1]]);
          var r3=14;
          var x1=ap[0]+d3[0]*r3,y1=ap[1]+d3[1]*r3;
          var x2=ap[0]+d4[0]*r3,y2=ap[1]+d4[1]*r3;
          svg+='<path d="M'+x1.toFixed(1)+','+y1.toFixed(1)+' Q'+ap[0]+','+ap[1]+' '+x2.toFixed(1)+','+y2.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.4"/>';
        });
      }
      // Side tick marks (equal sides)
      if(sh.equal_sides){
        sh.equal_sides.forEach(function(pair){
          [pair].flat().forEach(function(si){
            var i0=si%pts.length, i1=(si+1)%pts.length;
            var mx=(pts[i0][0]+pts[i1][0])/2,my=(pts[i0][1]+pts[i1][1])/2;
            var ang=Math.atan2(pts[i1][1]-pts[i0][1],pts[i1][0]-pts[i0][0]);
            var perp=ang+Math.PI/2;
            var t=5;
            svg+='<line x1="'+(mx+Math.cos(perp)*t).toFixed(1)+'" y1="'+(my+Math.sin(perp)*t).toFixed(1)+'" x2="'+(mx-Math.cos(perp)*t).toFixed(1)+'" y2="'+(my-Math.sin(perp)*t).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
          });
        });
      }
      // Side labels
      var sides=sh.sides||[];
      sides.forEach(function(lbl,si){
        if(!lbl) return;
        var i0=si%pts.length, i1=(si+1)%pts.length;
        var mx=(pts[i0][0]+pts[i1][0])/2,my2=(pts[i0][1]+pts[i1][1])/2;
        var dx2=pts[i1][0]-pts[i0][0],dy2=pts[i1][1]-pts[i0][1];
        var len=Math.sqrt(dx2*dx2+dy2*dy2)||1;
        var off=14;
        var lx=mx+(-dy2/len)*off, ly=my2+(dx2/len)*off;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="11.5" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
      // Vertex labels
      var labels=sh.labels||[];
      var cx3=pts.reduce(function(a,p){return a+p[0];},0)/pts.length;
      var cy3=pts.reduce(function(a,p){return a+p[1];},0)/pts.length;
      labels.forEach(function(lbl,li){
        if(li>=pts.length||!lbl) return;
        var lx=pts[li][0],ly=pts[li][1];
        var ox=lx-cx3,oy=ly-cy3,ol=Math.sqrt(ox*ox+oy*oy)||1;
        lx+=ox/ol*16; ly+=oy/ol*16;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
    }
    // CIRCLE
    if(sh.shape==='circle'){
      var cxp=sx(sh.cx||0),cyp=sy(sh.cy||0);
      var rp=(sh.r||1)/(mxmax-mxmin)*(W-2*mg);
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="'+rp.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
      if(sh.center_label) svg+='<text x="'+(cxp+6)+'" y="'+(cyp-6)+'" font-size="11.5" fill="'+FIG_INK+'" font-weight="700">'+esc(sh.center_label)+'</text>';
      if(sh.radius_angle!=null){
        var ra=sh.radius_angle*Math.PI/180;
        var rx=cxp+rp*Math.cos(ra),ry=cyp-rp*Math.sin(ra);
        svg+='<line x1="'+cxp.toFixed(1)+'" y1="'+cyp.toFixed(1)+'" x2="'+rx.toFixed(1)+'" y2="'+ry.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
        if(sh.radius_label){
          var mlx=(cxp+rx)/2+8,mly=(cyp+ry)/2;
          svg+='<text x="'+mlx.toFixed(1)+'" y="'+mly.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(sh.radius_label)+'</text>';
        }
      }
      if(sh.chord&&sh.chord.length===2){
        svg+='<line x1="'+sx(sh.chord[0][0]).toFixed(1)+'" y1="'+sy(sh.chord[0][1]).toFixed(1)+'" x2="'+sx(sh.chord[1][0]).toFixed(1)+'" y2="'+sy(sh.chord[1][1]).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      }
      if(sh.tangent){
        var ta=sh.tangent*Math.PI/180;
        var tx=cxp+rp*Math.cos(ta),ty=cyp-rp*Math.sin(ta);
        var tpx=-Math.sin(ta)*25,tpy=-Math.cos(ta)*25;
        svg+='<line x1="'+(tx-tpx).toFixed(1)+'" y1="'+(ty-tpy).toFixed(1)+'" x2="'+(tx+tpx).toFixed(1)+'" y2="'+(ty+tpy).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8"/>';
      }
    }
    // RECTANGLE
    if(sh.shape==='rectangle'){
      var rx2=sx(sh.x||0),ry2=sy((sh.y||0)+(sh.h||0));
      var rw=(sh.w||4)/(mxmax-mxmin)*(W-2*mg);
      var rh=(sh.h||3)/(mymax-mymin)*(H-2*mg);
      svg+='<rect x="'+rx2.toFixed(1)+'" y="'+ry2.toFixed(1)+'" width="'+rw.toFixed(1)+'" height="'+rh.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      // dimension labels
      if(sh.width_label){var wlx=rx2+rw/2,wly=ry2+rh+14;svg+='<text x="'+wlx+'" y="'+wly+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(sh.width_label)+'</text>';}
      if(sh.height_label){var hlx=rx2+rw+12,hly=ry2+rh/2;svg+='<text x="'+hlx+'" y="'+hly+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" dominant-baseline="middle" font-weight="600">'+esc(sh.height_label)+'</text>';}
    }
  });

  if(s.title) svg+='<text x="'+W/2+'" y="12" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── 3D Geometry (isometric projection) ─────────────── */
function renderGeom3D(s){
  var W=300,H=220,cx=W/2,cy=H*0.55;
  var solid=s.solid||'rectangular_prism';
  var dims=s.dims||[4,3,2];
  var lw=dims[0]||4, dw=dims[1]||3, ht=dims[2]||2;
  var sc=Math.min(50,Math.min(W/(lw+dw+2),H/(ht+dw+2))*0.9);
  function iso(ix,iy,iz){
    return{x:cx+(ix-iz)*sc*0.866,y:cy-iy*sc+(ix+iz)*sc*0.5};
  }
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  function pt(ix,iy,iz){var p=iso(ix,iy,iz);return p.x.toFixed(1)+','+p.y.toFixed(1);}
  function line3(x1,y1,z1,x2,y2,z2,col,dash){
    var a=iso(x1,y1,z1),b=iso(x2,y2,z2);
    return '<line x1="'+a.x.toFixed(1)+'" y1="'+a.y.toFixed(1)+'" x2="'+b.x.toFixed(1)+'" y2="'+b.y.toFixed(1)+'" stroke="'+(col||FIG_INK)+'" stroke-width="1.8"'+(dash?' stroke-dasharray="5 3"':'')+'/>';
  }
  function face(pts4, fill){
    return '<polygon points="'+pts4.join(' ')+'" fill="'+fill+'" stroke="'+FIG_INDIGO+'" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  /* three-tone face shading (front/right/top), consistent across every solid so the same
     light source reads correctly no matter which shape is drawn */
  var FACE_FRONT=FIG_INDIGO_FILL2, FACE_SIDE='rgba(43,91,168,0.28)', FACE_TOP='rgba(43,91,168,0.10)';

  if(solid==='rectangular_prism'||solid==='cube'){
    var l=lw,w=dw,h=ht;
    // Hidden edges (dashed)
    svg+=line3(0,0,0,l,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w,FIG_INK,true);
    svg+=line3(0,0,0,0,h,0,FIG_INK,true);
    // Front face (left face in isometric)
    svg+=face([pt(0,0,w),pt(0,h,w),pt(l,h,w),pt(l,0,w)],FACE_FRONT);
    // Right face
    svg+=face([pt(l,0,w),pt(l,h,w),pt(l,h,0),pt(l,0,0)],FACE_SIDE);
    // Top face
    svg+=face([pt(0,h,0),pt(0,h,w),pt(l,h,w),pt(l,h,0)],FACE_TOP);
    // Dimension labels
    var lbs=s.labels||{};
    if(lbs.l){var ml2=iso(l/2,0,w+0.3);svg+='<text x="'+ml2.x.toFixed(1)+'" y="'+(ml2.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs.l)+'</text>';}
    if(lbs.w){var mw2=iso(l+0.3,0,w/2);svg+='<text x="'+(mw2.x+5)+'" y="'+(mw2.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs.w)+'</text>';}
    if(lbs.h){var mh2=iso(l+0.3,h/2,0);svg+='<text x="'+(mh2.x+5)+'" y="'+(mh2.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs.h)+'</text>';}
  }

  /* Cylinder and cone are drawn upright (not isometric), to scale: radius and height keep the
     question's proportions, the base's hidden back half is dashed, and labels sit clear of the
     outline — a radius line on the top face, a height dimension line with end ticks. */
  function upright(rad,hgt){
    var k=Math.min(80/rad,150/hgt), rx=Math.max(28,rad*k), hp=Math.max(40,hgt*k), ry=Math.max(10,rx*0.28);
    var top=(H-hp)/2+ry/2, x0=W/2-22;
    return {cx:x0,top:top,bot:top+hp,rx:rx,ry:ry};
  }
  function arc(f,y,sweep){ return 'M'+(f.cx-f.rx).toFixed(1)+','+y.toFixed(1)+' A'+f.rx.toFixed(1)+' '+f.ry.toFixed(1)+' 0 0 '+sweep+' '+(f.cx+f.rx).toFixed(1)+','+y.toFixed(1); }
  function lbl(x,y,t,anchor){ return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" font-size="12" fill="'+FIG_INDIGO+'" text-anchor="'+(anchor||'middle')+'" dominant-baseline="middle" font-weight="600">'+esc(t)+'</text>'; }
  function dimLine(x,y1,y2,t){
    return '<line x1="'+x.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      '<line x1="'+(x-4).toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+(x+4).toFixed(1)+'" y2="'+y1.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      '<line x1="'+(x-4).toFixed(1)+'" y1="'+y2.toFixed(1)+'" x2="'+(x+4).toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      (t?lbl(x+8,(y1+y2)/2,t,'start'):'');
  }
  function radiusLine(f,y,t,above){
    return '<circle cx="'+f.cx.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="2" fill="'+FIG_INDIGO+'"/>'+
      '<line x1="'+f.cx.toFixed(1)+'" y1="'+y.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/>'+
      (t?lbl(f.cx+f.rx/2,above?(f.ry>=16?y-7:y-f.ry-8):(y+f.ry+12),t):'');
  }
  var L3=s.labels||{};

  if(solid==='cylinder'){
    var cr=+s.radius||lw/2, ch=+s.height||ht, f=upright(cr,ch);
    svg+='<path d="M'+(f.cx-f.rx).toFixed(1)+','+f.top.toFixed(1)+' L'+(f.cx-f.rx).toFixed(1)+','+f.bot.toFixed(1)+' '+arc(f,f.bot,0).replace(/^M[^A]*/,'')+' L'+(f.cx+f.rx).toFixed(1)+','+f.top.toFixed(1)+' Z" fill="'+FACE_SIDE+'" stroke="none"/>';
    svg+='<path d="'+arc(f,f.bot,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    svg+='<path d="'+arc(f,f.bot,0)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(f.cx-f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx-f.rx).toFixed(1)+'" y2="'+f.bot.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(f.cx+f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+f.bot.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<ellipse cx="'+f.cx.toFixed(1)+'" cy="'+f.top.toFixed(1)+'" rx="'+f.rx.toFixed(1)+'" ry="'+f.ry.toFixed(1)+'" fill="#eef2fa" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    if(L3.r) svg+=radiusLine(f,f.top,L3.r,true);
    else if(L3.d) svg+='<line x1="'+(f.cx-f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+f.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/>'+lbl(f.cx,f.top-f.ry-8,L3.d);
    if(L3.h) svg+=dimLine(f.cx+f.rx+14,f.top,f.bot,L3.h);
  }

  if(solid==='cone'){
    var kr=+s.radius||lw/2, kh=+s.height||ht, g=upright(kr,kh);
    svg+='<path d="M'+(g.cx-g.rx).toFixed(1)+','+g.bot.toFixed(1)+' L'+g.cx.toFixed(1)+','+g.top.toFixed(1)+' L'+(g.cx+g.rx).toFixed(1)+','+g.bot.toFixed(1)+' A'+g.rx.toFixed(1)+' '+g.ry.toFixed(1)+' 0 0 1 '+(g.cx-g.rx).toFixed(1)+','+g.bot.toFixed(1)+' Z" fill="'+FACE_FRONT+'" stroke="none"/>';
    svg+='<path d="'+arc(g,g.bot,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    svg+='<path d="'+arc(g,g.bot,0)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(g.cx-g.rx).toFixed(1)+'" y1="'+g.bot.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(g.cx+g.rx).toFixed(1)+'" y1="'+g.bot.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    if(L3.r) svg+=radiusLine(g,g.bot,'',false)+lbl(g.cx+g.rx+8,g.bot,L3.r,'start');
    if(L3.h){
      svg+='<line x1="'+g.cx.toFixed(1)+'" y1="'+g.top.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.bot.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/>';
      svg+='<polyline points="'+g.cx.toFixed(1)+','+(g.bot-7).toFixed(1)+' '+(g.cx-7).toFixed(1)+','+(g.bot-7).toFixed(1)+' '+(g.cx-7).toFixed(1)+','+g.bot.toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
      svg+=lbl(g.cx-8,(g.top+g.bot)/2,L3.h,'end');
    }
    if(L3.l) svg+=lbl(g.cx+g.rx/2+10,(g.top+g.bot)/2,L3.l,'start');
  }

  if(solid==='square_pyramid'){
    /* Honors dims[1] as the base depth, so a rectangular base (e.g. a 2x12
       pyramid) draws truthfully instead of silently squaring off and
       contradicting its own "2 x 12" label. dims[0]===dims[1] still gives the
       square pyramid the name implies. */
    var l4=lw,d4=dw,h4=ht;
    var apex4=iso(l4/2,h4,d4/2);
    var bases=[[0,0,0],[l4,0,0],[l4,0,d4],[0,0,d4]];
    var faceColors=[FACE_FRONT,FACE_SIDE,FACE_FRONT,FACE_SIDE];
    for(var fi=0;fi<4;fi++){
      var b1=bases[fi],b2=bases[(fi+1)%4];
      svg+=face([pt(b1[0],b1[1],b1[2]),pt(b2[0],b2[1],b2[2]),apex4.x.toFixed(1)+','+apex4.y.toFixed(1)],faceColors[fi]);
    }
    var lbs4=s.labels||{};
    if(lbs4.base){var mb=iso(l4/2,0,d4+0.5);svg+='<text x="'+mb.x+'" y="'+(mb.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs4.base)+'</text>';}
    if(lbs4.h){svg+='<line x1="'+iso(l4/2,0,d4/2).x+'" y1="'+iso(l4/2,0,d4/2).y+'" x2="'+apex4.x+'" y2="'+apex4.y+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/><text x="'+(apex4.x+12)+'" y="'+(apex4.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs4.h)+'</text>';}
  }

  if(solid==='triangular_prism'){
    // base triangle in the x-z plane, extruded along y (height ht)
    var l6=lw,d6=dw,h6=ht;
    var baseTri=[[0,0,0],[l6,0,0],[l6/2,0,d6]];
    var topTri=baseTri.map(function(p){return [p[0],h6,p[2]];});
    // hidden bottom edges (dashed)
    svg+=line3(baseTri[0][0],0,baseTri[0][2],baseTri[1][0],0,baseTri[1][2],FIG_INK,true);
    svg+=line3(baseTri[1][0],0,baseTri[1][2],baseTri[2][0],0,baseTri[2][2],FIG_INK,true);
    svg+=line3(baseTri[2][0],0,baseTri[2][2],baseTri[0][0],0,baseTri[0][2],FIG_INK,true);
    // two visible rectangular side faces + one visible triangular end face
    svg+=face([pt(baseTri[0][0],0,baseTri[0][2]),pt(baseTri[1][0],0,baseTri[1][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[0][0],h6,topTri[0][2])],FACE_FRONT);
    svg+=face([pt(baseTri[1][0],0,baseTri[1][2]),pt(baseTri[2][0],0,baseTri[2][2]),pt(topTri[2][0],h6,topTri[2][2]),pt(topTri[1][0],h6,topTri[1][2])],FACE_SIDE);
    svg+=face([pt(topTri[0][0],h6,topTri[0][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[2][0],h6,topTri[2][2])],FACE_TOP);
    var lbs6=s.labels||{};
    if(lbs6.base){var mb6=iso((baseTri[0][0]+baseTri[1][0])/2,0,baseTri[0][2]-0.4);svg+='<text x="'+mb6.x.toFixed(1)+'" y="'+(mb6.y+10).toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs6.base)+'</text>';}
    if(lbs6.h){var mh6=iso(l6+0.3,h6/2,0);svg+='<text x="'+(mh6.x+6).toFixed(1)+'" y="'+mh6.y.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs6.h)+'</text>';}
  }

  if(solid==='sphere'){
    var r5=Math.min(lw,dw,ht)/2;
    var c5=iso(0,r5,0);
    var rp5=r5*sc;
    svg+='<circle cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" r="'+rp5.toFixed(1)+'" fill="url(#sphereGrad)" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<defs><radialGradient id="sphereGrad" cx="38%" cy="35%"><stop offset="0%" stop-color="#eef2fb"/><stop offset="100%" stop-color="'+FIG_INDIGO2+'" stop-opacity="0.55"/></radialGradient></defs>';
    svg+='<ellipse cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" rx="'+rp5.toFixed(1)+'" ry="'+(rp5*0.35).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1" stroke-dasharray="5 3"/>';
    var lbs5=s.labels||{};
    if(lbs5.r) svg+='<text x="'+(c5.x+rp5/1.4)+'" y="'+(c5.y-rp5/1.4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs5.r)+'</text>';
  }

  if(solid==='cross_section'){
    // a rectangular prism sliced by a horizontal plane at a given fractional height,
    // showing the cut face — used for volume/cross-section questions (Calc, Geometry)
    var l7=lw,w7=dw,h7=ht,cutFrac=s.cut!=null?s.cut:0.5,ch=h7*cutFrac;
    svg+=line3(0,0,0,l7,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w7,FIG_INK,true);
    svg+=line3(0,0,0,0,ch,0,FIG_INK,true);
    svg+=face([pt(0,0,w7),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,0,w7)],FACE_FRONT);
    svg+=face([pt(l7,0,w7),pt(l7,ch,w7),pt(l7,ch,0),pt(l7,0,0)],FACE_SIDE);
    // cut face at the top of the visible slice — amber, to draw the eye to what's being measured
    svg+=face([pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)],FIG_AMBER_FILL);
    // ghost outline of the full solid above the cut, dashed, so students see what was removed
    svg+='<polygon points="'+[pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)].join(' ')+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
    svg+=line3(0,ch,0,0,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,0,l7,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,w7,l7,h7,w7,FIG_MUTED,true);
    svg+=line3(0,ch,w7,0,h7,w7,FIG_MUTED,true);
    var lbs7=s.labels||{};
    if(lbs7.l){var ml7=iso(l7/2,0,w7+0.3);svg+='<text x="'+ml7.x.toFixed(1)+'" y="'+(ml7.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs7.l)+'</text>';}
    if(lbs7.w){var mw7=iso(l7+0.3,0,w7/2);svg+='<text x="'+(mw7.x+5)+'" y="'+(mw7.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs7.w)+'</text>';}
    if(lbs7.h){var mh7=iso(l7+0.3,ch/2,0);svg+='<text x="'+(mh7.x+5)+'" y="'+(mh7.y+4)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="start" font-weight="600">'+esc(lbs7.h)+'</text>';}
  }

  if(s.title) svg+='<text x="'+W/2+'" y="12" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── Bar Chart ──────────────────────────────────────── */
function renderBarChart(s){
  var bars=s.bars||[];
  if(!bars.length) return '';
  var W=320,H=210,ml=44,mr=14,mt=22,mb=38;
  var pw=W-ml-mr,ph=H-mt-mb;
  var maxVal=Math.max.apply(null,bars.map(function(b){return b.val||0;}))||1;
  var yScale=Math.ceil(maxVal/5)*5; // round up to nice number
  var bw=Math.min(40,(pw/bars.length)*0.65);
  var gap=(pw-bw*bars.length)/(bars.length+1);
  var colors=FIG_SERIES;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Title
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  // Y axis grid
  for(var g=0;g<=5;g++){
    var gv=yScale*g/5, gy=mt+ph-(gv/yScale)*ph;
    svg+='<line x1="'+ml+'" y1="'+gy.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+gy.toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(gy+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+Math.round(gv)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  // Axis labels
  if(s.ylabel) svg+='<text x="12" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,12,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-4)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  // Bars
  bars.forEach(function(b,i){
    var bx=ml+gap+i*(bw+gap);
    var bh=(b.val/yScale)*ph;
    var by=mt+ph-bh;
    var col=colors[i%colors.length];
    svg+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+col+'" rx="3"/>';
    // Value label on top
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(by-4).toFixed(1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle" font-weight="600">'+b.val+'</text>';
    // Category label
    var lbl=b.label||'';
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(mt+ph+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+esc(lbl)+'</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Scatter Plot ───────────────────────────────────── */
function renderScatter(s){
  var pts=s.pts||[];
  if(!pts.length) return '';
  var W=310,H=210,ml=42,mr=18,mt=20,mb=34;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xs=pts.map(function(p){return p[0];}),ys=pts.map(function(p){return p[1];});
  var xmin2=Math.min.apply(null,xs),xmax2=Math.max.apply(null,xs);
  var ymin2=Math.min.apply(null,ys),ymax2=Math.max.apply(null,ys);
  var xpad=(xmax2-xmin2)*0.12||1, ypad=(ymax2-ymin2)*0.15||1;
  xmin2-=xpad;xmax2+=xpad;ymin2-=ypad;ymax2+=ypad;
  function sx2(x){return ml+(x-xmin2)/(xmax2-xmin2)*pw;}
  function sy2(y){return mt+ph-(y-ymin2)/(ymax2-ymin2)*ph;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+='<text x="'+W/2+'" y="13" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  // Grid
  var nxg=5,nyg=5;
  for(var gi=0;gi<=nxg;gi++){
    var gx=(xmin2+(xmax2-xmin2)*gi/nxg);
    svg+='<line x1="'+sx2(gx).toFixed(1)+'" y1="'+mt+'" x2="'+sx2(gx).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+sx2(gx).toFixed(1)+'" y="'+(mt+ph+12)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="middle">'+gx.toFixed(0)+'</text>';
  }
  for(var gi2=0;gi2<=nyg;gi2++){
    var gy2=(ymin2+(ymax2-ymin2)*gi2/nyg);
    svg+='<line x1="'+ml+'" y1="'+sy2(gy2).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy2(gy2).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(sy2(gy2)+3)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="end">'+gy2.toFixed(0)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-3)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  if(s.ylabel) svg+='<text x="11" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,11,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  // Trend line
  if(s.trendline&&pts.length>1){
    var n=pts.length;
    var sumx=0,sumy=0,sumxy=0,sumx2=0;
    pts.forEach(function(p){sumx+=p[0];sumy+=p[1];sumxy+=p[0]*p[1];sumx2+=p[0]*p[0];});
    var m2=(n*sumxy-sumx*sumy)/(n*sumx2-sumx*sumx);
    var b2=(sumy-m2*sumx)/n;
    var tx1=xmin2+xpad*0.5,tx2=xmax2-xpad*0.5;
    svg+='<line x1="'+sx2(tx1).toFixed(1)+'" y1="'+sy2(m2*tx1+b2).toFixed(1)+'" x2="'+sx2(tx2).toFixed(1)+'" y2="'+sy2(m2*tx2+b2).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="6 3"/>';
  }
  // Points
  pts.forEach(function(p){
    svg+='<circle cx="'+sx2(p[0]).toFixed(1)+'" cy="'+sy2(p[1]).toFixed(1)+'" r="4.5" fill="'+FIG_INDIGO2+'" fill-opacity="0.85" stroke="#fff" stroke-width="1.2"/>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Pie Chart ──────────────────────────────────────── */
function renderPie(s){
  var slices=s.slices||[];
  if(!slices.length) return '';
  var W=300,H=210,cx4=110,cy4=H/2,r6=78;
  var total=slices.reduce(function(a,sl){return a+sl.val;},0)||1;
  var colors=FIG_SERIES;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  var ang=-Math.PI/2;
  slices.forEach(function(sl,si){
    var sweep=2*Math.PI*sl.val/total;
    var x1=cx4+r6*Math.cos(ang),y1=cy4+r6*Math.sin(ang);
    var x2=cx4+r6*Math.cos(ang+sweep),y2=cy4+r6*Math.sin(ang+sweep);
    var large=sweep>Math.PI?1:0;
    var col=colors[si%colors.length];
    svg+='<path d="M'+cx4+','+cy4+' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+r6+','+r6+' 0 '+large+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z" fill="'+col+'" stroke="#fff" stroke-width="1.5"/>';
    ang+=sweep;
  });
  // Legend (right side)
  var legX=210,legY=H/2-slices.length*9;
  slices.forEach(function(sl,si){
    var col=colors[si%colors.length];
    var pct=Math.round(sl.val/total*100);
    svg+='<rect x="'+legX+'" y="'+(legY+si*20)+'" width="12" height="12" fill="'+col+'" rx="2"/>';
    svg+='<text x="'+(legX+16)+'" y="'+(legY+si*20+10)+'" font-size="10" fill="'+FIG_INK+'">'+esc(sl.label)+' ('+pct+'%)</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Number Line ────────────────────────────────────── */
function renderNumberLine(s){
  var W=310,H=90,my=50,ml=28,mr=28;
  var pw=W-ml-mr;
  var mn=s.min!=null?s.min:-5, mx=s.max!=null?s.max:5;
  function sx3(v){return ml+(v-mn)/(mx-mn)*pw;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Line
  svg+='<line x1="'+ml+'" y1="'+my+'" x2="'+(W-mr)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  svg+='<polygon points="'+(W-mr)+','+my+' '+(W-mr-7)+','+(my-3)+' '+(W-mr-7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<polygon points="'+ml+','+my+' '+(ml+7)+','+(my-3)+' '+(ml+7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  // Ticks
  for(var tv=Math.ceil(mn);tv<=Math.floor(mx);tv++){
    var tx4=sx3(tv);
    svg+='<line x1="'+tx4.toFixed(1)+'" y1="'+(my-5)+'" x2="'+tx4.toFixed(1)+'" y2="'+(my+5)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    svg+='<text x="'+tx4.toFixed(1)+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+tv+'</text>';
  }
  // Shaded regions
  (s.regions||[]).forEach(function(rg){
    var rx1=sx3(rg.from),rx2=sx3(rg.to);
    svg+='<rect x="'+rx1.toFixed(1)+'" y="'+(my-4)+'" width="'+(rx2-rx1).toFixed(1)+'" height="8" fill="'+FIG_INDIGO2+'" fill-opacity="0.28"/>';
    // Endpoints
    svg+='<circle cx="'+rx1.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_left?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
    svg+='<circle cx="'+rx2.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_right?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
  });
  // Points
  (s.points||[]).forEach(function(pt){
    var px=sx3(pt.x);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+my+'" r="5.5" fill="'+(pt.open?FIG_BG:FIG_AMBER)+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
    if(pt.label) svg+='<text x="'+px.toFixed(1)+'" y="'+(my-12)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(pt.label)+'</text>';
  });
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── genTest: the question bank here; the AI path lives in 05a-ai-test.js, which ships
   inside public/js/ai-exam.js and loads the first time an AI test is generated (ADR 0041). ── */
function _runAI(btn,run){
  var out=btn.closest('.testgen')&&btn.closest('.testgen').querySelector('.tg-out');
  if(out&&!window.CSAITest) out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>Loading the exam generator…</p></div>';
  return window._ensureAIExam().then(run).catch(function(err){
    if(out) out.innerHTML='<p class="tg-empty" style="color:#dc2626">Error: '+esc(err.message)+'</p>';
  });
}
window.genTest=function(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  if(!aiSourceChosen(btn)) return _genTestOriginal(btn);
  return _runAI(btn,function(){ return window.CSAITest.genTest(btn); });
};

// Keep original as fallback
function _genTestOriginal(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  var view=btn.closest('main[id^="view-"]'); if(!view) return;
  var practice=view.querySelector('section[id$="-practice"]'); if(!practice) return;
  var pool=Array.prototype.slice.call(practice.querySelectorAll('.problem'));
  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value;
  var filtered=(lvl==='all')?pool.slice():pool.filter(function(p){var L=p.querySelector('.lvl');return L&&L.textContent.trim().toLowerCase()===lvl.toLowerCase();});
  if(!filtered.length) filtered=pool.slice();
  // shuffle
  for(var i=filtered.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=filtered[i];filtered[i]=filtered[j];filtered[j]=t;}
  var pick=filtered.slice(0,Math.min(n,filtered.length));
  var out=box.querySelector('.tg-out'); out.innerHTML='';
  var head=document.createElement('div'); head.className='tg-head';
  var lvlLabel=(lvl==='all'?'all levels':lvl);
  head.innerHTML='<span class="tg-title">Generated test</span><span class="tg-meta">'+pick.length+' question'+(pick.length===1?'':'s')+' · '+lvlLabel+'</span>';
  out.appendChild(head);
  if(!pick.length){var e=document.createElement('p');e.className='tg-empty';e.textContent='No questions match that filter.';out.appendChild(e);return;}
  var _csCaptureQ=[];
  pick.forEach(function(p,idx){
    var c=p.cloneNode(true);c.classList.remove('open');
    var pn=c.querySelector('.pn');if(pn) pn.textContent=(idx+1);
    var st=c.querySelector('.sol-toggle');
    if(st){var tw=st.querySelector('.tw');if(tw) tw.textContent='▸';if(st.childNodes[1]) st.childNodes[1].textContent=' Show solution';}
    out.appendChild(c);
    /* Google Forms/Classroom capture — this legacy path never has MCQ
       choices/answers, only a free-text prompt + worked solution, so every
       question is captured as ungraded FRQ. See public/js/quiz-capture-ui.js
       for the honest "short-answer, no auto-grading" fallback this enables. */
    var pq=c.querySelector('.pq');
    _csCaptureQ.push({text:pq?pq.textContent:'',choices:[],correctIndex:null,type:'frq',points:1});
  });
  var ans=box.querySelector('.tg-ans');if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
  if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]);
  out.scrollIntoView({behavior:'smooth',block:'nearest'});
  if(pick.length) document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-legacy',title:'Generated test',trackId:(view&&view.id.replace('view-',''))||'',questions:_csCaptureQ,outEl:out}}));
}

/* ── tgReveal override (works with AI questions too) ── */
window.tgReveal=function(btn){
  var box=btn.closest('.testgen');
  var out=box.querySelector('.tg-out');
  var show=btn.getAttribute('data-state')!=='shown';
  // Standard problems
  out.querySelectorAll('.problem').forEach(function(p){
    p.classList.toggle('open',show);
    var st=p.querySelector('.sol-toggle');if(st&&st.childNodes[1]) st.childNodes[1].textContent=' '+(show?'Hide solution':'Show solution');
  });
  // AI questions
  out.querySelectorAll('.aiq-solution').forEach(function(sol){
    sol.classList.toggle('open',show);
    var tb=sol.previousElementSibling;
    if(tb&&tb.classList.contains('aiq-sol-toggle')) tb.textContent=show?'▾ Hide solution':'▸ Show solution';
  });
  btn.setAttribute('data-state',show?'shown':'hidden');
  btn.textContent=show?'Hide all answers':'Show all answers';
  if(show&&window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
};

/* ── genFullExam: the question bank in 02; the AI path in 05a-ai-test.js ───────────────────────── */
var _origGenFullExam=window.genFullExam;
window.genFullExam=function(btn,examName,viewId,sectionTitles,qPerSection){
  if(!aiSourceChosen(btn)) return _origGenFullExam&&_origGenFullExam(btn,examName,viewId,sectionTitles,qPerSection);
  return _runAI(btn,function(){ return window.CSAITest.genFullExam(btn,examName,viewId,sectionTitles,qPerSection); });
};

/* ── Show AI badge in nav when enabled ───────────────── */
(function(){
  var btn=document.querySelector('.ai-settings-btn');
  if(!btn) return;
  btn.textContent='⚙ AI ✓';
  btn.style.background='linear-gradient(135deg,#16a34a,#0891b2)';
})();

})(); // end IIFE

/* ─────────────────────────────────────────────── */

