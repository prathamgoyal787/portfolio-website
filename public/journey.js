(function(){
'use strict';
var $ = function(id){ return document.getElementById(id); };
var clamp = function(v,a,b){ return Math.max(a, Math.min(b, v)); };
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Make it yours: fill these in and they appear on the page.
   books:   titles on the shelf spines in the Reading scene (first 9)
   reading: the book you're reading right now
   songs:   lines like "Song name, Artist" in the Music scene
   ai:      short notes like "Tried a new model, loved how it handled X"
   also:    anything else, like "Travel", "Chess", "Cooking" (shows a small "Also into" row) */
var PERSONAL = { books: [], reading: "", songs: [], ai: [], also: [] };

/* ---------- personal content ---------- */
(function(){
  var sp = document.querySelectorAll('#shelf .spine span');
  PERSONAL.books.slice(0,9).forEach(function(t,i){ sp[i].textContent = t; sp[i].parentNode.title = t; });
  function fill(id, items, max){
    var ul = $(id);
    items.slice(0,max).forEach(function(t){ var li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
  }
  fill('songs', PERSONAL.songs, 5);
  fill('ainotes', PERSONAL.ai, 4);
  if (PERSONAL.reading){ $('nowTitle').textContent = PERSONAL.reading; $('nowReading').classList.add('on'); }
  if (PERSONAL.also.length){ fill('alsoList', PERSONAL.also, 8); $('also').classList.add('on'); }
})();

/* ---------- headline letters and role rotator ---------- */
(function(){
  var n = 0;
  document.querySelectorAll('[data-split]').forEach(function(el){
    var t = el.textContent; el.textContent = '';
    t.split('').forEach(function(c){
      var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', n++);
      s.setAttribute('aria-hidden','true'); el.appendChild(s);
    });
  });
  var roles = $('roles'), items = Array.prototype.slice.call(roles.children), k = 0;
  if (REDUCED){
    roles.innerHTML = '';
    var s = document.createElement('span'); s.className = 'on'; s.style.opacity = 1; s.style.transform = 'none'; s.style.whiteSpace = 'normal';
    s.textContent = 'backend engineer, reader, music lover, AI explorer and badminton player';
    roles.appendChild(s);
  } else {
    setInterval(function(){
      items[k].classList.remove('on'); k = (k + 1) % items.length; items[k].classList.add('on');
    }, 2200);
  }
})();

/* ---------- section visibility ---------- */
var vis = {};
['top','work','badminton','reading','music','ai','contact'].forEach(function(id){
  new IntersectionObserver(function(en){ vis[id] = en[0].isIntersecting; }, {rootMargin:'120px'}).observe($(id));
});

/* ---------- stars ---------- */
var stars = (function(){
  var c = $('stars'), x = c.getContext('2d'), W = 0, H = 0, dpr = 1, S = [], mx = -999, my = -999;
  function init(){
    S = [];
    var n = Math.round(W * H / 5200);
    for (var i = 0; i < n; i++) S.push({x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.3+.3, vx:(Math.random()-.5)*.1, vy:(Math.random()-.5)*.1, tw:Math.random()*6});
  }
  function size(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    var r = c.getBoundingClientRect(); W = r.width; H = r.height;
    c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr,0,0,dpr,0,0); init(); draw(0);
  }
  window.addEventListener('resize', size);
  c.parentNode.addEventListener('pointermove', function(e){ var r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  c.parentNode.addEventListener('pointerleave', function(){ mx = -999; my = -999; });
  function draw(t){
    x.clearRect(0,0,W,H);
    var near = [];
    for (var i = 0; i < S.length; i++){
      var s = S[i];
      if (!REDUCED){
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0; if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      }
      var a = REDUCED ? .8 : .5 + .5 * Math.sin(t / 900 + s.tw);
      x.fillStyle = 'rgba(244,241,255,' + a.toFixed(2) + ')';
      x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.283); x.fill();
      var dx = s.x - mx, dy = s.y - my;
      if (dx*dx + dy*dy < 22000) near.push(s);
    }
    x.lineWidth = 1;
    for (var a1 = 0; a1 < near.length; a1++){
      for (var b1 = a1 + 1; b1 < near.length; b1++){
        var ddx = near[a1].x - near[b1].x, ddy = near[a1].y - near[b1].y, d = ddx*ddx + ddy*ddy;
        if (d < 9000){
          x.strokeStyle = 'rgba(124,242,212,' + (0.55 * (1 - d / 9000)).toFixed(2) + ')';
          x.beginPath(); x.moveTo(near[a1].x, near[a1].y); x.lineTo(near[b1].x, near[b1].y); x.stroke();
        }
      }
    }
  }
  size();
  return {draw:draw, size:size};
})();

/* ---------- badminton: one shuttle, one quiet arc ---------- */
var rally = (function(){
  var trail = $('trail'), shuttle = $('shuttle'), len = trail.getTotalLength(), FLY = 2600, CYCLE = 4600;
  trail.style.strokeDasharray = len;
  function place(f){
    var at = f * len, p = trail.getPointAtLength(at), q = trail.getPointAtLength(Math.min(len, at + 2)), r = trail.getPointAtLength(Math.max(0, at - 2));
    var ang = Math.atan2(q.y - r.y, q.x - r.x) * 180 / Math.PI;
    shuttle.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')');
    trail.style.strokeDashoffset = len * (1 - f);
  }
  function draw(t){
    var k = t % CYCLE, f = clamp(k / FLY, 0, 1);
    var e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;   /* slow at the top, quick on the way down */
    place(.82 * f + .18 * e);
    var fade = k > FLY ? clamp(1 - (k - FLY) / 900, 0, 1) : 1;
    trail.style.opacity = (.85 * fade).toFixed(2);
    shuttle.style.opacity = k > FLY + 500 ? 0 : 1;
  }
  if (REDUCED){ place(.5); trail.style.opacity = .6; }
  return {draw:draw};
})();

/* ---------- reading: words light up as you scroll ---------- */
var reader = (function(){
  var p = $('readText'), words = p.textContent.trim().split(/\s+/), spans = [];
  p.textContent = '';
  words.forEach(function(w){
    var sp = document.createElement('span'); sp.className = 'wd'; sp.textContent = w; p.appendChild(sp); p.appendChild(document.createTextNode(' ')); spans.push(sp);
  });
  function update(){
    var vh = window.innerHeight;
    spans.forEach(function(sp){
      var r = sp.getBoundingClientRect();
      sp.style.opacity = (0.2 + 0.8 * clamp((vh * 0.8 - r.top) / (vh * 0.28), 0, 1)).toFixed(2);
    });
  }
  return {update:update, on:!REDUCED};
})();

/* ---------- music: sound ribbons ---------- */
var waves = (function(){
  var c = $('waves'), x = c.getContext('2d'), sec = $('music'), W = 0, H = 0, dpr = 1;
  var px = -999, py = 0, active = 0, boost = 0, lastX = null, lastY = null, ripples = [];
  var R = [
    {b:.64, a:26, f:1.1, sp:.7,  ph:0,   col:'124,242,212', w:3},
    {b:.71, a:34, f:1.5, sp:-.55, ph:1.4, col:'255,95,162',  w:3},
    {b:.78, a:22, f:2.1, sp:.9,  ph:2.6, col:'244,241,255', w:2},
    {b:.85, a:30, f:.9,  sp:-.4, ph:3.8, col:'124,242,212', w:2},
    {b:.92, a:20, f:1.8, sp:.6,  ph:5.0, col:'255,95,162',  w:2}
  ];
  function size(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    var r = sec.getBoundingClientRect(); W = r.width; H = r.height;
    c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr,0,0,dpr,0,0); draw(0);
  }
  window.addEventListener('resize', size);
  sec.addEventListener('pointermove', function(e){
    var r = sec.getBoundingClientRect(), nx = e.clientX - r.left, ny = e.clientY - r.top;
    if (lastX !== null) boost = Math.min(70, boost + Math.hypot(nx - lastX, ny - lastY) * 0.25);
    lastX = nx; lastY = ny; px = nx; py = ny; active = 1;
  });
  sec.addEventListener('pointerleave', function(){ active = 0; lastX = null; });
  sec.addEventListener('pointerdown', function(e){
    if (e.target.closest('a,button')) return;
    var r = sec.getBoundingClientRect();
    ripples.push({x:e.clientX - r.left, y:e.clientY - r.top, r:0, a:.8}); boost = Math.min(90, boost + 40);
  });
  var act = 0;
  function draw(t){
    x.clearRect(0, 0, W, H);
    act += (active - act) * .06; boost *= .95;
    var time = t / 1000, step = Math.max(4, Math.round(W / 220));
    R.forEach(function(w){
      x.beginPath();
      var k = Math.PI * 2 / (W / (w.f + .6));
      for (var i = 0; i <= W; i += step){
        var y = H * w.b + w.a * (1 + boost / 45) * (Math.sin(i * k + time * w.sp * 2 + w.ph) + .5 * Math.sin(i * k * 2.1 - time * w.sp * 2.6));
        var d = (i - px) / 190;
        y += Math.exp(-d * d) * (py - H * w.b) * .28 * act;
        if (i === 0) x.moveTo(i, y); else x.lineTo(i, y);
      }
      x.strokeStyle = 'rgba(' + w.col + ',.85)'; x.lineWidth = w.w; x.stroke();
    });
    for (var j = ripples.length - 1; j >= 0; j--){
      var p = ripples[j]; p.r += 5; p.a *= .96;
      x.strokeStyle = 'rgba(124,242,212,' + p.a.toFixed(2) + ')'; x.lineWidth = 2;
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.stroke();
      if (p.a < .03) ripples.splice(j, 1);
    }
  }
  size();
  return {draw:draw, size:size};
})();

/* ---------- AI: particles that spell out new things ---------- */
var ai = (function(){
  var c = $('words'), x = c.getContext('2d'), box = $('wordsBox');
  var W = 0, H = 0, dpr = 1, P = [], WORDS = ['new models','new ideas','new tools','new things'], wi = 0, last = 0, mx = -999, my = -999, ready = false;
  var N = 1500;
  function sample(text){
    var off = document.createElement('canvas'); off.width = Math.max(1, Math.round(W)); off.height = Math.max(1, Math.round(H));
    var o = off.getContext('2d'), fs = 200, fam = '800 ' + fs + 'px Manrope, "Helvetica Neue", Arial, sans-serif';
    o.font = fam; var m = o.measureText(text).width;
    fs = Math.min(fs * (W * .94) / m, H * .62);
    o.font = '800 ' + fs + 'px Manrope, "Helvetica Neue", Arial, sans-serif'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillStyle = '#fff';
    o.fillText(text, W / 2, H / 2);
    var d = o.getImageData(0, 0, off.width, off.height).data, pts = [], gap = Math.max(3, Math.round(W / 230));
    for (var yy = 0; yy < off.height; yy += gap) for (var xx = 0; xx < off.width; xx += gap) if (d[(yy * off.width + xx) * 4 + 3] > 128) pts.push([xx, yy]);
    return pts;
  }
  function assign(scatter){
    var pts = sample(WORDS[wi]);
    for (var i = pts.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = pts[i]; pts[i] = pts[j]; pts[j] = t; }
    if (!pts.length) return;
    for (var k = 0; k < P.length; k++){
      var tp = pts[k % pts.length]; P[k].tx = tp[0] + (Math.random() - .5) * 3; P[k].ty = tp[1] + (Math.random() - .5) * 3;
      if (scatter){ P[k].vx += (Math.random() - .5) * 18; P[k].vy += (Math.random() - .5) * 18; }
    }
    if (REDUCED) for (var q = 0; q < P.length; q++){ P[q].x = P[q].tx; P[q].y = P[q].ty; }
  }
  function size(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    var r = box.getBoundingClientRect(); W = r.width; H = r.height;
    c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr,0,0,dpr,0,0);
    if (!P.length){
      N = W < 600 ? 1300 : 2800;
      for (var i = 0; i < N; i++) P.push({x:Math.random()*W, y:Math.random()*H, vx:0, vy:0, tx:W/2, ty:H/2, w:Math.random() < .12});
    }
    if (ready) assign(false);
    draw(0);
  }
  window.addEventListener('resize', size);
  box.addEventListener('pointermove', function(e){ var r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  box.addEventListener('pointerleave', function(){ mx = -999; my = -999; });
  function next(){ wi = (wi + 1) % WORDS.length; assign(true); last = performance.now(); }
  box.addEventListener('click', next);
  function draw(now){
    x.clearRect(0, 0, W, H);
    if (!REDUCED && ready && now - last > 3600) next();
    var rad = Math.max(70, W / 12);
    for (var i = 0; i < P.length; i++){
      var p = P[i];
      if (!REDUCED){
        p.vx += (p.tx - p.x) * .05; p.vy += (p.ty - p.y) * .05;
        var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < rad * rad){ var d = Math.sqrt(d2) || 1, f = (1 - d / rad) * 5; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx *= .84; p.vy *= .84; p.x += p.vx; p.y += p.vy;
      }
      x.fillStyle = p.w ? '#ffffff' : '#7CF2D4';
      x.fillRect(p.x, p.y, 2.2, 2.2);
    }
  }
  size();
  function start(){ ready = true; assign(false); last = performance.now(); }
  var done = false, go = function(){ if (!done){ done = true; start(); } };
  if (document.fonts && document.fonts.load) document.fonts.load('800 100px Manrope').then(go, go);
  setTimeout(go, 1500);
  return {draw:draw, size:size};
})();

/* ---------- headings, route, scroll effects ---------- */
var heads = [];
if (!REDUCED){
  heads = Array.prototype.slice.call(document.querySelectorAll('h2'));
  heads.forEach(function(h){
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.textContent = '';
    words.forEach(function(w,i){
      var a = document.createElement('span'); a.className = 'rw'; a.setAttribute('aria-hidden','true');
      var b = document.createElement('span'); b.textContent = w; b.style.setProperty('--i', i);
      a.appendChild(b); h.appendChild(a);
      if (i < words.length - 1) h.appendChild(document.createTextNode(' '));
    });
  });
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.4});
  heads.forEach(function(h){ io.observe(h); });
}

var routeLinks = Array.prototype.slice.call(document.querySelectorAll('.route a'));
var brand = document.querySelector('.brand');
var scenes = ['top','work','badminton','reading','music','ai','contact'].map(function(id){ return $(id); });
var ridges = Array.prototype.slice.call(document.querySelectorAll('.ridge'));
var sunEl = $('sun'), sunrise = $('sunrise'), moon = $('moon'), workEl = $('work'), helloEl = $('contact');

/* copy email */
$('copy').addEventListener('click', function(){
  var b = $('copy'), addr = 'prathamg2003@gmail.com';
  var done = function(){ b.textContent = 'Copied'; setTimeout(function(){ b.textContent = 'Copy email'; }, 1800); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr).then(done, function(){ location.href = 'mailto:' + addr; });
  else location.href = 'mailto:' + addr;
});

/* start the journey: rush past the hero, then cruise down until the visitor clicks, scrolls or presses a key */
if (!REDUCED) $('startJourney').addEventListener('click', function(e){
  e.preventDefault();
  var pos = window.scrollY, speed = 0, last = performance.now(), running = true;
  var STOPS = ['pointerdown','wheel','touchstart','keydown'];
  function stop(){
    running = false;
    STOPS.forEach(function(t){ window.removeEventListener(t, stop); });
  }
  STOPS.forEach(function(t){ window.addEventListener(t, stop, {passive:true}); });
  function step(now){
    if (!running) return;
    var vh = window.innerHeight, dt = Math.min(250, now - last) / 1000; last = now;
    var target = pos < workEl.offsetTop ? vh * 3 : vh * 0.6;   /* px per second: fast through the hero, steady after */
    speed += (target - speed) * Math.min(1, dt * 6);
    var max = document.documentElement.scrollHeight - vh;
    pos = Math.min(max, pos + speed * dt);
    window.scrollTo({top:pos, behavior:'instant'});
    if (pos >= max) stop(); else requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});

function frame(t){
  var vh = window.innerHeight, y = window.scrollY;

  /* route highlight */
  var cur = 0;
  scenes.forEach(function(el, i){ var r = el.getBoundingClientRect(); if (r.top < vh * 0.5) cur = i; });
  routeLinks.forEach(function(a, i){ a.classList.toggle('on', i === cur); });
  brand.classList.toggle('on', cur > 0);

  if (!REDUCED){
    /* landscape ridges drift slowly */
    ridges.forEach(function(r){
      var b = r.getBoundingClientRect();
      r.style.setProperty('--ry', clamp((b.top - vh * 0.5) * 0.05, -16, 16).toFixed(1) + 'px');
    });
    if (y < vh * 1.3) moon.style.transform = 'translateY(' + (y * 0.25).toFixed(1) + 'px)';
    if (vis.work){
      var wr = workEl.getBoundingClientRect(), p = clamp((vh - wr.top) / (vh + wr.height * 0.6), 0, 1);
      sunEl.style.transform = 'translateY(' + ((1 - p) * 260 - 40).toFixed(1) + 'px)';
    }
    if (vis.contact){
      var hr = helloEl.getBoundingClientRect(), q = clamp((vh - hr.top) / (hr.height * 0.9), 0, 1);
      sunrise.style.transform = 'translateY(' + ((1 - q) * 70 + 22).toFixed(1) + '%)';
    }
    if (vis.reading) reader.update();
  }
  if (vis.top) stars.draw(t);
  if (vis.badminton) rally.draw(t);
  if (vis.music) waves.draw(t);
  if (vis.ai) ai.draw(t);
  requestAnimationFrame(frame);
}
if (!REDUCED){ requestAnimationFrame(frame); }
else {
  /* reduced motion: static drawings, interactive toy still responds */
  stars.draw(0); waves.draw(0); ai.draw(0);
  (function loop(t){
    var cur = 0, vh = window.innerHeight;
    scenes.forEach(function(el, i){ if (el.getBoundingClientRect().top < vh * 0.5) cur = i; });
    routeLinks.forEach(function(a, i){ a.classList.toggle('on', i === cur); });
    brand.classList.toggle('on', cur > 0);
    requestAnimationFrame(loop); })(0);
}
})();
