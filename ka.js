/* =========================================================================
 * ka.js — a Khan Academy ProcessingJS compatibility layer for canvas 2D.
 *
 * Khan Academy's ProcessingJS is a *fork*, not stock Processing.js, and the
 * differences are exactly the ones that break artwork silently:
 *
 *   - angles are DEGREES, not radians (rotate, arc, sin, cos, tan, atan2…)
 *   - one curveVertex() converts the WHOLE shape to a Catmull-Rom spline,
 *     with the first and last points as guides; under four points draws
 *     nothing at all
 *   - the transform is applied when endShape() runs, not as each vertex()
 *     is recorded, so a translate() issued mid-shape moves the whole shape
 *   - endShape() without CLOSE still FILLS as a closed path, but STROKES
 *     the path open
 *   - background() honours alpha, so background(0, 0) clears to transparent
 *   - get() returns a PImage that carries .mask()
 *
 * Everything here targets the plain 2D context, so it runs in any browser
 * with no library to download.
 * ========================================================================= */
(function (global) {
  "use strict";

  var ctx = null, canvasEl = null;
  var P = {};

  /* ---------------------------------------------------------------- consts */
  var CORNER = "CORNER", CORNERS = "CORNERS", CENTER = "CENTER",
      RADIUS = "RADIUS", CLOSE = "CLOSE",
      LEFT = "LEFT", RIGHT_A = "RIGHT", TOP = "TOP", BOTTOM = "BOTTOM",
      BASELINE = "BASELINE", ROUND = "ROUND", SQUARE = "SQUARE",
      PROJECT = "PROJECT", MITER = "MITER", BEVEL = "BEVEL",
      BLUR = "BLUR", OPAQUE = "OPAQUE", INVERT = "INVERT", GRAY = "GRAY",
      JAVA2D = "JAVA2D", P2D = "P2D", HAND = "pointer", ARROW = "default",
      CROSS = "crosshair", MOVE = "move", TEXT = "text", WAIT = "wait",
      PIE = "PIE", OPEN = "OPEN", CHORD = "CHORD";

  /* Arrow keys etc. use the same numeric keyCodes KA exposed. */
  var UP = 38, DOWN = 40, LEFT_K = 37, RIGHT_K = 39,
      BACKSPACE = 8, TAB = 9, ENTER = 10, RETURN = 13, ESC = 27, DELETE = 127,
      SHIFT = 16, CONTROL = 17, ALT = 18;

  var PI = Math.PI, TWO_PI = PI * 2, HALF_PI = PI / 2, QUARTER_PI = PI / 4;

  /* ------------------------------------------------------------ style state */
  function State() {
    this.fill = "#ffffff";
    this.doFill = true;
    this.stroke = "#000000";
    this.doStroke = true;
    this.weight = 1;
    this.rectMode = CORNER;
    this.ellipseMode = CENTER;
    this.imageMode = CORNER;
    this.textAlignX = LEFT;
    this.textAlignY = BASELINE;
    this.textSize = 12;
    /* %SIZE% is substituted at draw time so textSize() and textFont() can be
       set independently, the way Processing treats them. */
    this.textFont = "%SIZE%px sans-serif";
    this.cap = ROUND;
    this.join = MITER;
    this.tint = null;
  }
  State.prototype.clone = function () {
    var s = new State();
    for (var k in this) if (this.hasOwnProperty(k)) s[k] = this[k];
    return s;
  };

  var st = new State();
  var styleStack = [];

  /* ------------------------------------------------------------------ color */
  /* Processing packs colours into a single int; the game stores them in
     variables and passes them straight back into fill(). */
  function packRGBA(r, g, b, a) {
    /* Processing CLAMPS out-of-range channels; it does not wrap them.
       color(400, 200, 20) is orange, not green. Masking with & 0xff turns
       400 into 144 and silently changes the hue. */
    return ((clampByte(a) << 24) | (clampByte(r) << 16) |
            (clampByte(g) << 8) | clampByte(b));
  }
  function isPacked(v) { return typeof v === "number" && (v < 0 || v > 255); }

  function unpack(v) {
    return {
      r: (v >> 16) & 0xff,
      g: (v >> 8) & 0xff,
      b: v & 0xff,
      a: (v >>> 24) & 0xff
    };
  }

  function color(a, b, c, d) {
    if (a instanceof Object && a.__col) return a;
    if (arguments.length === 1) {
      if (isPacked(a)) return a;
      return packRGBA(a, a, a, 255);                 // grey
    }
    if (arguments.length === 2) {
      if (isPacked(a)) { var u = unpack(a); return packRGBA(u.r, u.g, u.b, b); }
      return packRGBA(a, a, a, b);                   // grey + alpha
    }
    if (arguments.length === 3) return packRGBA(a, b, c, 255);
    return packRGBA(a, b, c, d);
  }

  /* Turn any Processing colour-ish argument list into a css string. */
  function css(args) {
    var r, g, b, a = 255, v;
    if (args.length === 1) {
      v = args[0];
      if (isPacked(v)) { var u = unpack(v); r = u.r; g = u.g; b = u.b; a = u.a; }
      else { r = g = b = v; }
    } else if (args.length === 2) {
      v = args[0];
      if (isPacked(v)) { var u2 = unpack(v); r = u2.r; g = u2.g; b = u2.b; }
      else { r = g = b = v; }
      a = args[1];
      /* KA passes `undefined` as alpha in several places; treat it as opaque
         rather than letting it poison the whole colour. */
      if (a === undefined || a !== a) a = 255;
    } else if (args.length === 3) {
      r = args[0]; g = args[1]; b = args[2];
    } else {
      r = args[0]; g = args[1]; b = args[2]; a = args[3];
      if (a === undefined || a !== a) a = 255;
    }
    r = clampByte(r); g = clampByte(g); b = clampByte(b);
    a = Math.max(0, Math.min(255, a || 0)) / 255;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  function clampByte(v) {
    v = Math.round(v || 0);
    return v < 0 ? 0 : (v > 255 ? 255 : v);
  }

  function red(c)   { return isPacked(c) ? unpack(c).r : c; }
  function green(c) { return isPacked(c) ? unpack(c).g : c; }
  function blue(c)  { return isPacked(c) ? unpack(c).b : c; }
  function alpha(c) { return isPacked(c) ? unpack(c).a : 255; }

  function lerpColor(c1, c2, amt) {
    var a = unpack(color(c1)), b = unpack(color(c2));
    return packRGBA(
      a.r + (b.r - a.r) * amt,
      a.g + (b.g - a.g) * amt,
      a.b + (b.b - a.b) * amt,
      a.a + (b.a - a.a) * amt
    );
  }

  /* ------------------------------------------------------------------- trig */
  /* THE headline difference from stock Processing.js. */
  var D2R = PI / 180, R2D = 180 / PI;
  function sin(a) { return Math.sin(a * D2R); }
  function cos(a) { return Math.cos(a * D2R); }
  function tan(a) { return Math.tan(a * D2R); }
  function asin(a) { return Math.asin(a) * R2D; }
  function acos(a) { return Math.acos(a) * R2D; }
  function atan(a) { return Math.atan(a) * R2D; }
  function atan2(y, x) { return Math.atan2(y, x) * R2D; }
  function degrees(r) { return r * R2D; }
  function radians(d) { return d * D2R; }

  /* ------------------------------------------------------------------ maths */
  function constrain(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
  function dist(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mag(x, y) { return Math.sqrt(x * x + y * y); }
  function sq(x) { return x * x; }
  function norm(v, a, b) { return (v - a) / (b - a); }
  function map(v, a1, b1, a2, b2) { return a2 + (b2 - a2) * ((v - a1) / (b1 - a1)); }

  function random(a, b) {
    if (a === undefined) return Math.random();
    if (b === undefined) { b = a; a = 0; }
    return a + Math.random() * (b - a);   /* works with a > b, as KA's does */
  }

  /* Processing's round(): halves go up, unlike JS's round for negatives. */
  function pRound(v) { return Math.floor(v + 0.5); }

  /* ------------------------------------------------------- Processing noise */
  /* Reimplemented from PApplet so cloud textures match exactly. */
  var PERLIN_YWRAPB = 4, PERLIN_YWRAP = 1 << PERLIN_YWRAPB,
      PERLIN_ZWRAPB = 8, PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB,
      PERLIN_SIZE = 4095;
  var perlin_octaves = 4, perlin_amp_falloff = 0.5, perlin = null;

  function scaled_cosine(i) { return 0.5 * (1.0 - Math.cos(i * PI)); }

  function noise(x, y, z) {
    y = y || 0; z = z || 0;
    if (perlin === null) {
      perlin = new Float32Array(PERLIN_SIZE + 1);
      for (var i = 0; i < PERLIN_SIZE + 1; i++) perlin[i] = Math.random();
    }
    if (x < 0) x = -x;
    if (y < 0) y = -y;
    if (z < 0) z = -z;

    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    var xf = x - xi, yf = y - yi, zf = z - zi;
    var rxf, ryf, r = 0, ampl = 0.5, n1, n2, n3;

    for (var o = 0; o < perlin_octaves; o++) {
      var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
      rxf = scaled_cosine(xf);
      ryf = scaled_cosine(yf);

      n1 = perlin[of & PERLIN_SIZE];
      n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
      n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);

      of += PERLIN_ZWRAP;
      n2 = perlin[of & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
      n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);

      n1 += scaled_cosine(zf) * (n2 - n1);
      r += n1 * ampl;
      ampl *= perlin_amp_falloff;
      xi <<= 1; xf *= 2;
      yi <<= 1; yf *= 2;
      zi <<= 1; zf *= 2;

      if (xf >= 1.0) { xi++; xf--; }
      if (yf >= 1.0) { yi++; yf--; }
      if (zf >= 1.0) { zi++; zf--; }
    }
    return r;
  }
  function noiseSeed(seed) {
    var s = seed >>> 0;
    function rnd() {   /* small deterministic LCG, only used when seeded */
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    }
    perlin = new Float32Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) perlin[i] = rnd();
  }
  function noiseDetail(o, f) {
    if (o > 0) perlin_octaves = o;
    if (f > 0) perlin_amp_falloff = f;
  }

  /* -------------------------------------------------------------- transform */
  function pushMatrix() { ctx.save(); }
  function popMatrix() { ctx.restore(); }
  function translate(x, y) { ctx.translate(x, y); }
  function rotate(a) { ctx.rotate(a * D2R); }
  function scale(x, y) { ctx.scale(x, y === undefined ? x : y); }
  function resetMatrix() { ctx.setTransform(1, 0, 0, 1, 0, 0); }

  function pushStyle() { styleStack.push(st.clone()); }
  function popStyle() { if (styleStack.length) { st = styleStack.pop(); applyStyle(); } }

  function applyStyle() {
    ctx.lineWidth = st.weight;
    ctx.lineCap = st.cap === ROUND ? "round" : (st.cap === PROJECT ? "square" : "butt");
    ctx.lineJoin = st.join === ROUND ? "round" : (st.join === BEVEL ? "bevel" : "miter");
  }

  /* ------------------------------------------------------------ style setters */
  function fill() { st.fill = css(arguments); st.doFill = true; }
  function noFill() { st.doFill = false; }
  function stroke() { st.stroke = css(arguments); st.doStroke = true; }
  function noStroke() { st.doStroke = false; }
  function strokeWeight(w) { st.weight = w; ctx.lineWidth = w; }
  function strokeCap(c) { st.cap = c; applyStyle(); }
  function strokeJoin(j) { st.join = j; applyStyle(); }
  function rectMode(m) { st.rectMode = m; }
  function ellipseMode(m) { st.ellipseMode = m; }
  function imageMode(m) { st.imageMode = m; }
  function smooth() { if (ctx) ctx.imageSmoothingEnabled = true; }
  function noSmooth() { if (ctx) ctx.imageSmoothingEnabled = false; }

  function paint(closed) {
    if (st.doFill) { ctx.fillStyle = st.fill; ctx.fill(); }
    if (st.doStroke && st.weight > 0) {
      ctx.strokeStyle = st.stroke;
      ctx.lineWidth = st.weight;
      applyStyle();
      ctx.stroke();
    }
  }

  /* ------------------------------------------------------------ basic shapes */
  function normRect(x, y, w, h) {
    if (st.rectMode === CENTER) return [x - w / 2, y - h / 2, w, h];
    if (st.rectMode === CORNERS) return [x, y, w - x, h - y];
    if (st.rectMode === RADIUS) return [x - w, y - h, w * 2, h * 2];
    return [x, y, w, h];
  }

  function roundRectPath(x, y, w, h, r) {
    /* Processing clamps the radius to half the shorter side. */
    var neg = false;
    if (w < 0) { x += w; w = -w; }
    if (h < 0) { y += h; h = -h; }
    r = Math.min(r, Math.min(w, h) / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function rect(x, y, w, h, r) {
    var n = normRect(x, y, w, h);
    if (r) roundRectPath(n[0], n[1], n[2], n[3], r);
    else { ctx.beginPath(); ctx.rect(n[0], n[1], n[2], n[3]); }
    paint(true);
  }

  function ellipsePath(x, y, w, h) {
    var cx, cy, rx, ry;
    if (st.ellipseMode === CORNER) { cx = x + w / 2; cy = y + h / 2; }
    else if (st.ellipseMode === CORNERS) { cx = (x + w) / 2; cy = (y + h) / 2; w = w - x; h = h - y; cx = x + w / 2; cy = y + h / 2; }
    else if (st.ellipseMode === RADIUS) { cx = x; cy = y; w *= 2; h *= 2; }
    else { cx = x; cy = y; }
    rx = Math.abs(w / 2); ry = Math.abs(h / 2);
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, TWO_PI);
  }
  function ellipse(x, y, w, h) { ellipsePath(x, y, w, h); paint(true); }

  /* Processing's arc: fills as a pie wedge, strokes as an open arc. */
  function arc(x, y, w, h, start, stop) {
    var cx, cy;
    if (st.ellipseMode === CORNER) { cx = x + w / 2; cy = y + h / 2; }
    else if (st.ellipseMode === RADIUS) { cx = x; cy = y; w *= 2; h *= 2; }
    else { cx = x; cy = y; }
    var rx = Math.abs(w / 2), ry = Math.abs(h / 2);
    var a0 = start * D2R, a1 = stop * D2R;

    if (st.doFill) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.ellipse(cx, cy, rx, ry, 0, a0, a1, a1 < a0);
      ctx.closePath();
      ctx.fillStyle = st.fill;
      ctx.fill();
    }
    if (st.doStroke && st.weight > 0) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, a0, a1, a1 < a0);
      ctx.strokeStyle = st.stroke;
      ctx.lineWidth = st.weight;
      applyStyle();
      ctx.stroke();
    }
  }

  function line(x1, y1, x2, y2) {
    if (!st.doStroke || st.weight <= 0) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = st.stroke;
    ctx.lineWidth = st.weight;
    applyStyle();
    ctx.stroke();
  }

  function point(x, y) {
    if (!st.doStroke) return;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(st.weight, 1) / 2, 0, TWO_PI);
    ctx.fillStyle = st.stroke;
    ctx.fill();
  }

  function triangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
    ctx.closePath();
    paint(true);
  }
  function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.lineTo(x4, y4);
    ctx.closePath();
    paint(true);
  }
  function bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    if (st.doFill) { ctx.fillStyle = st.fill; ctx.fill(); }
    if (st.doStroke && st.weight > 0) {
      ctx.strokeStyle = st.stroke; ctx.lineWidth = st.weight; applyStyle(); ctx.stroke();
    }
  }

  /* ------------------------------------------------------------- shape mode */
  /* Vertices are buffered raw and only emitted at endShape(), which is what
     makes a mid-shape translate() move the entire shape. */
  var shapeOps = null, hasCurve = false;

  function beginShape() { shapeOps = []; hasCurve = false; }
  function vertex(x, y) { if (shapeOps) shapeOps.push(["v", x, y]); }
  function bezierVertex(cx1, cy1, cx2, cy2, x, y) {
    if (shapeOps) shapeOps.push(["b", cx1, cy1, cx2, cy2, x, y]);
  }
  function curveVertex(x, y) {
    if (shapeOps) { shapeOps.push(["c", x, y]); hasCurve = true; }
  }

  function endShape(mode) {
    if (!shapeOps) return;
    var ops = shapeOps, closed = (mode === CLOSE);
    shapeOps = null;

    if (hasCurve) { curveShape(ops, closed); return; }
    if (!ops.length) return;

    ctx.beginPath();
    var started = false;
    for (var i = 0; i < ops.length; i++) {
      var o = ops[i];
      if (o[0] === "v") {
        if (!started) { ctx.moveTo(o[1], o[2]); started = true; }
        else ctx.lineTo(o[1], o[2]);
      } else {
        if (!started) { ctx.moveTo(o[5], o[6]); started = true; }
        else ctx.bezierCurveTo(o[1], o[2], o[3], o[4], o[5], o[6]);
      }
    }

    /* endShape() without CLOSE still fills closed but strokes open. */
    if (st.doFill) {
      ctx.fillStyle = st.fill;
      ctx.fill();
    }
    if (st.doStroke && st.weight > 0) {
      if (closed) ctx.closePath();
      ctx.strokeStyle = st.stroke;
      ctx.lineWidth = st.weight;
      applyStyle();
      ctx.stroke();
    }
  }

  /* One curveVertex turns every point into a Catmull-Rom control point. */
  function curveShape(ops, closed) {
    var pts = [];
    for (var i = 0; i < ops.length; i++) {
      var o = ops[i];
      if (o[0] === "b") pts.push([o[5], o[6]]);
      else pts.push([o[1], o[2]]);
    }
    if (pts.length < 4) return;    /* fewer than four points draws nothing */

    ctx.beginPath();
    ctx.moveTo(pts[1][0], pts[1][1]);
    for (var j = 1; j < pts.length - 2; j++) {
      var p0 = pts[j - 1], p1 = pts[j], p2 = pts[j + 1], p3 = pts[j + 2];
      ctx.bezierCurveTo(
        p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
        p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6,
        p2[0], p2[1]
      );
    }
    if (st.doFill) { ctx.fillStyle = st.fill; ctx.fill(); }
    if (st.doStroke && st.weight > 0) {
      if (closed) ctx.closePath();
      ctx.strokeStyle = st.stroke; ctx.lineWidth = st.weight; applyStyle(); ctx.stroke();
    }
  }

  /* ------------------------------------------------------------------- text */
  function createFont(name, size) {
    /* KA accepts things like "arial Bold Italic"; pull the styling words out
       and treat the remainder as the family. */
    var raw = String(name || "sans-serif");
    var bold = /bold/i.test(raw), italic = /italic/i.test(raw);
    var fam = raw.replace(/\b(bold|italic|black)\b/ig, "").trim();
    if (/black/i.test(raw) && /arial/i.test(raw)) fam = "Arial Black";
    if (!fam) fam = "sans-serif";
    return { __font: true, family: fam, bold: bold, italic: italic, size: size };
  }
  function textFont(f, size) {
    if (f && f.__font) {
      st.textFont = (f.italic ? "italic " : "") + (f.bold ? "bold " : "") +
                    "%SIZE%px " + quoteFamily(f.family);
      if (size !== undefined) st.textSize = size;
      else if (f.size !== undefined) st.textSize = f.size;
    } else if (typeof f === "string") {
      st.textFont = "%SIZE%px " + quoteFamily(f);
      if (size !== undefined) st.textSize = size;
    }
  }
  function quoteFamily(fam) {
    var stack = '"' + fam + '"';
    if (/arial black/i.test(fam)) stack += ',"Arial Black",Impact';
    stack += ',Arial,Helvetica,sans-serif';
    return stack;
  }
  function textSize(s) { st.textSize = s; }
  function textAlign(x, y) {
    /* CORNER is not a legal text alignment; KA fell back to left. */
    st.textAlignX = (x === CENTER || x === RIGHT_A) ? x : LEFT;
    st.textAlignY = y || BASELINE;
  }
  function fontString() {
    return st.textFont.replace("%SIZE%", st.textSize);
  }
  function textWidth(s) {
    ctx.font = fontString();
    return ctx.measureText(String(s)).width;
  }

  function text(str, x, y) {
    if (str === undefined || str === null) str = "";
    str = String(str);
    ctx.font = fontString();
    ctx.textAlign = st.textAlignX === CENTER ? "center"
                  : (st.textAlignX === RIGHT_A ? "right" : "left");
    ctx.fillStyle = st.fill;

    var lines = str.split("\n");
    var lead = st.textSize * 1.2;
    /* Processing's CENTER vertical alignment centres the whole block. */
    var y0 = y;
    if (st.textAlignY === CENTER) {
      ctx.textBaseline = "middle";
      y0 = y - (lines.length - 1) * lead / 2;
    } else if (st.textAlignY === TOP) {
      ctx.textBaseline = "top";
    } else if (st.textAlignY === BOTTOM) {
      ctx.textBaseline = "bottom";
      y0 = y - (lines.length - 1) * lead;
    } else {
      ctx.textBaseline = "alphabetic";
      y0 = y - (lines.length - 1) * lead;
    }
    /* Processing draws text with the FILL colour only -- stroke settings do
       not apply to text. Stroking here puts an outline on every string that
       happens to be drawn while a stroke is active, which is most of them. */
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y0 + i * lead);
    }
  }

  /* ----------------------------------------------------------------- images */
  function PImage(cv) {
    this.__img = true;
    this.canvas = cv;
    this.width = cv.width;
    this.height = cv.height;
  }
  /* PImage.mask(): use the other image's alpha as this image's alpha. */
  PImage.prototype.mask = function (other) {
    var src = other && other.canvas ? other.canvas : other;
    if (!src) return this;
    var c2 = P.__newCanvas(this.width, this.height);
    var g = c2.getContext("2d");
    g.drawImage(this.canvas, 0, 0);
    g.globalCompositeOperation = "destination-in";
    g.drawImage(src, 0, 0, this.width, this.height);
    g.globalCompositeOperation = "source-over";
    this.canvas = c2;
    return this;
  };
  PImage.prototype.get = function () { return this; };

  function get(x, y, w, h) {
    if (arguments.length === 0) { x = 0; y = 0; w = P.width; h = P.height; }
    if (arguments.length === 2) {
      var d = ctx.getImageData(x, y, 1, 1).data;
      return packRGBA(d[0], d[1], d[2], d[3]);
    }
    w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
    var cv = P.__newCanvas(w, h);
    cv.getContext("2d").drawImage(canvasEl, Math.round(x), Math.round(y), w, h, 0, 0, w, h);
    return new PImage(cv);
  }

  function image(im, x, y, w, h) {
    if (!im) return;
    var src = im.canvas || im;
    if (!src.width) return;
    /* Processing.js sizes a blit with `w || img.width`, so a width or height
       of 0 -- or NaN, or null -- falls through to the image's natural size
       rather than drawing nothing. The logo intro depends on this: its tiles
       carry `offs: 0` and are blitted as image(tile, x, y, offs, offs), which
       on Khan Academy draws them full size. Treating 0 literally makes the
       whole assembly invisible. */
    w = w || src.width;
    h = h || src.height;
    if (!(w > 0) || !(h > 0)) return;
    var dx = x, dy = y;
    if (st.imageMode === CENTER) { dx = x - w / 2; dy = y - h / 2; }
    ctx.drawImage(src, dx, dy, w, h);
  }

  function loadImage() { return null; }

  /* ------------------------------------------------------------- background */
  function background() {
    var c = css(arguments);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    /* background() honours alpha here, so background(0, 0) clears the frame
       to fully transparent — which is how the asset baking hides itself. */
    ctx.clearRect(0, 0, P.width, P.height);
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, P.width, P.height);
    ctx.restore();
  }

  /* ----------------------------------------------------------------- filter */
  function filter(kind, param) {
    if (kind === BLUR) {
      var r = param || 1;
      var cv = P.__newCanvas(P.width, P.height);
      var g = cv.getContext("2d");
      g.filter = "blur(" + r + "px)";
      g.drawImage(canvasEl, 0, 0);
      g.filter = "none";
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, P.width, P.height);
      ctx.drawImage(cv, 0, 0);
      ctx.restore();
    } else if (kind === INVERT || kind === GRAY) {
      var d = ctx.getImageData(0, 0, P.width, P.height);
      var px = d.data;
      for (var i = 0; i < px.length; i += 4) {
        if (kind === INVERT) {
          px[i] = 255 - px[i]; px[i + 1] = 255 - px[i + 1]; px[i + 2] = 255 - px[i + 2];
        } else {
          var v = (px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11) | 0;
          px[i] = px[i + 1] = px[i + 2] = v;
        }
      }
      ctx.putImageData(d, 0, 0);
    }
  }

  /* ------------------------------------------------------------------ misc */
  function println() {
    var parts = [];
    for (var i = 0; i < arguments.length; i++) parts.push(arguments[i]);
    var line = parts.join(" ");
    if (P.onPrintln) P.onPrintln(line); else console.log(line);
  }
  var print = println;

  function cursor(kind) {
    P.__cursor = (kind === undefined) ? "default" : kind;
  }
  function noCursor() { P.__cursor = "none"; }
  function frameRate(f) { P.__targetFps = f; }
  function noLoop() { P.__looping = false; }
  function loop() { P.__looping = true; }
  function size(w, h) { P.__resize(w, h); }
  function redraw() { }
  function millis() { return Date.now() - P.__start; }
  function year() { return new Date().getFullYear(); }
  function month() { return new Date().getMonth() + 1; }
  function day() { return new Date().getDate(); }
  function hour() { return new Date().getHours(); }
  function minute() { return new Date().getMinutes(); }
  function second() { return new Date().getSeconds(); }

  /* ------------------------------------------------------------------ export */
  var API = {
    /* constants */
    CORNER: CORNER, CORNERS: CORNERS, CENTER: CENTER, RADIUS: RADIUS,
    CLOSE: CLOSE, LEFT: LEFT_K, RIGHT: RIGHT_K, UP: UP, DOWN: DOWN,
    TOP: TOP, BOTTOM: BOTTOM, BASELINE: BASELINE,
    ROUND: ROUND, SQUARE: SQUARE, PROJECT: PROJECT, MITER: MITER, BEVEL: BEVEL,
    BLUR: BLUR, OPAQUE: OPAQUE, INVERT: INVERT, GRAY: GRAY,
    JAVA2D: JAVA2D, P2D: P2D, HAND: HAND, ARROW: ARROW, CROSS: CROSS,
    MOVE: MOVE, TEXT: TEXT, WAIT: WAIT, PIE: PIE, OPEN: OPEN, CHORD: CHORD,
    BACKSPACE: BACKSPACE, TAB: TAB, ENTER: ENTER, RETURN: RETURN,
    ESC: ESC, DELETE: DELETE, SHIFT: SHIFT, CONTROL: CONTROL, ALT: ALT,
    PI: PI, TWO_PI: TWO_PI, HALF_PI: HALF_PI, QUARTER_PI: QUARTER_PI,

    /* colour */
    color: color, red: red, green: green, blue: blue, alpha: alpha,
    lerpColor: lerpColor,

    /* trig + maths */
    sin: sin, cos: cos, tan: tan, asin: asin, acos: acos, atan: atan,
    atan2: atan2, degrees: degrees, radians: radians,
    abs: Math.abs, ceil: Math.ceil, floor: Math.floor, round: pRound,
    sqrt: Math.sqrt, pow: Math.pow, exp: Math.exp, log: Math.log,
    min: Math.min, max: Math.max,
    constrain: constrain, dist: dist, lerp: lerp, mag: mag, sq: sq,
    norm: norm, map: map, random: random,
    noise: noise, noiseSeed: noiseSeed, noiseDetail: noiseDetail,

    /* transform + style */
    pushMatrix: pushMatrix, popMatrix: popMatrix, translate: translate,
    rotate: rotate, scale: scale, resetMatrix: resetMatrix,
    pushStyle: pushStyle, popStyle: popStyle,
    fill: fill, noFill: noFill, stroke: stroke, noStroke: noStroke,
    strokeWeight: strokeWeight, strokeCap: strokeCap, strokeJoin: strokeJoin,
    rectMode: rectMode, ellipseMode: ellipseMode, imageMode: imageMode,
    smooth: smooth, noSmooth: noSmooth,

    /* shapes */
    rect: rect, ellipse: ellipse, arc: arc, line: line, point: point,
    triangle: triangle, quad: quad, bezier: bezier,
    beginShape: beginShape, vertex: vertex, bezierVertex: bezierVertex,
    curveVertex: curveVertex, endShape: endShape,

    /* text */
    createFont: createFont, textFont: textFont, textSize: textSize,
    textAlign: textAlign, text: text, textWidth: textWidth,

    /* images + frame */
    get: get, image: image, loadImage: loadImage, background: background,
    filter: filter, PImage: PImage,

    /* misc */
    println: println, print: print, cursor: cursor, noCursor: noCursor,
    frameRate: frameRate, noLoop: noLoop, loop: loop, size: size,
    redraw: redraw, millis: millis,
    year: year, month: month, day: day, hour: hour, minute: minute, second: second
  };

  P.API = API;
  P.__setContext = function (c, el) { ctx = c; canvasEl = el; applyStyle(); };
  P.__state = function () { return st; };
  P.__resetState = function () { st = new State(); styleStack = []; applyStyle(); };
  global.KAProcessing = P;

})(typeof window !== "undefined" ? window : globalThis);
