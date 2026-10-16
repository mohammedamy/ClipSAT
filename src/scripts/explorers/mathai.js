/* Canvas explorers for Math for AI & Data Science (mathai).
   build.js minifies this file to public/js/ex/mathai.js, loaded on the mathai track page. */
(function(K){
  "use strict";
  if(!K) return;
  var fmt=K.fmt, Plot=K.Plot, redrawAll=K.redrawAll, wireDataToggle=K.wireDataToggle, renderDataRows=K.renderDataRows;
  var INK, INDIGO, INDIGO2, AMBER, AMBER2, LINE, GRID, MUTED, PAPER, WHITE, AXIS, FONT;
  function _colors(){ var c=K.colors(); INK=c.INK; INDIGO=c.INDIGO; INDIGO2=c.INDIGO2; AMBER=c.AMBER; AMBER2=c.AMBER2; LINE=c.LINE; GRID=c.GRID; MUTED=c.MUTED; PAPER=c.PAPER; WHITE=c.WHITE; AXIS=c.AXIS; FONT=c.FONT; }
  _colors();
  function register(canvas, drawFn){ K.register(canvas, function(){ _colors(); return drawFn.apply(this, arguments); }); }

  /* ===================== MATHAI · VECTOR COSINE SIMILARITY ===================== */
  (function(){
    var canvas = document.getElementById('aiCosineCanvas'); if(!canvas) return;
    var uAngle = 0.4, vAngle = 1.2;
    var su = document.getElementById('aiVecU'), sv = document.getElementById('aiVecV');
    var view = { xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5 };

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, { l: 20, r: 20, t: 20, b: 20 });
      P.clear(); P.grid();
      // Unit circle in faint guide
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 1;
      var cx = P.x(0), cy = P.y(0);
      var radius = P.x(1) - cx;
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();

      // Vector u (Unit vector in Indigo)
      var ux = Math.cos(uAngle), uy = Math.sin(uAngle);
      P.arrow(0, 0, ux, uy, INDIGO, 3);
      P.dot(ux, uy, INDIGO, 5);
      P.text('u', ux + 0.1, uy + 0.1, { color: INDIGO, size: 13, bold: true });

      // Vector v (Unit vector in Amber)
      var vx = Math.cos(vAngle), vy = Math.sin(vAngle);
      P.arrow(0, 0, vx, vy, AMBER2, 3);
      P.dot(vx, vy, AMBER2, 5);
      P.text('v', vx + 0.1, vy + 0.1, { color: AMBER2, size: 13, bold: true });

      // Cosine similarity
      var diffAngle = Math.abs(uAngle - vAngle);
      var cosSim = Math.cos(diffAngle);
      P.text('Cosine Sim: ' + fmt(cosSim, 3), 0, -1.2, { color: INK, size: 13, bold: true, align: 'center' });
      P.text('Angle θ: ' + fmt(diffAngle * 180 / Math.PI, 1) + '°', 0, -1.38, { color: MUTED, size: 11, align: 'center' });
    }

    function upd(){
      if(su) uAngle = parseFloat(su.value);
      if(sv) vAngle = parseFloat(sv.value);
      redrawAll();
    }
    register(canvas, draw);
    if(su) su.addEventListener('input', upd);
    if(sv) sv.addEventListener('input', upd);
  })();

  /* ===================== MATHAI · GRADIENT DESCENT LOSS MINIMIZATION ===================== */
  (function(){
    var canvas = document.getElementById('aiLossCanvas'); if(!canvas) return;
    var wCurrent = 4.5, eta = 0.2;
    var sw = document.getElementById('aiWeightInit'), se = document.getElementById('aiEta');
    var view = { xmin: -1, xmax: 6, ymin: 0, ymax: 12 };

    // Loss function L(w) = (w - 2)^2 + 1
    function L(w){ return (w - 2) * (w - 2) + 1; }
    function dL(w){ return 2 * (w - 2); }

    function draw(ctx, w, h){
      var P = new Plot(ctx, w, h, view, { l: 24, r: 16, t: 16, b: 24 });
      P.clear(); P.grid();
      // Parabolic loss surface
      P.curve(L, INDIGO, 2.5);
      // Minimum mark at w* = 2, L = 1
      P.dot(2, 1, AMBER2, 5);
      P.text('Minimum (2, 1)', 2, 0.4, { color: AMBER2, size: 11, align: 'center' });
      // Current weight position
      var lossVal = L(wCurrent);
      P.dot(wCurrent, lossVal, '#EF4444', 6);
      var grad = dL(wCurrent);
      P.text('w = ' + fmt(wCurrent, 2) + ', L = ' + fmt(lossVal, 2), wCurrent, lossVal + 0.8, { color: INK, size: 11, bold: true, align: 'center' });
      P.text('∇L = ' + fmt(grad, 2), wCurrent, lossVal + 0.4, { color: '#EF4444', size: 10, align: 'center' });
    }

    function upd(){
      if(sw) wCurrent = parseFloat(sw.value);
      if(se) eta = parseFloat(se.value);
      redrawAll();
    }
    register(canvas, draw);
    if(sw) sw.addEventListener('input', upd);
    if(se) se.addEventListener('input', upd);
  })();
})(window.CSExplorerKit);
