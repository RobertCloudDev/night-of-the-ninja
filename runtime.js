/* =========================================================================
 * runtime.js — binds the ka.js shim to a canvas and reproduces the Khan
 * Academy program lifecycle: implicit globals, the draw loop, and KA's
 * input model.
 *
 * On Khan Academy a program runs in "global mode": every Processing function
 * is already in scope, and assigning `draw = function () {…}` is what
 * registers the animation loop. This installs the same environment onto
 * window before the game script loads, so the game source needs no changes.
 * ========================================================================= */
(function (global) {
  "use strict";

  var P = global.KAProcessing;
  if (!P) throw new Error("ka.js must load before runtime.js");

  var canvas, ctx, running = false, rafId = null;
  var lastFrame = 0;

  P.width = 600;
  P.height = 600;
  P.__targetFps = 60;
  P.__looping = true;
  P.__cursor = "default";
  P.__start = Date.now();

  /* Off-screen surfaces for get(), mask() and filter(). Overridden in Node. */
  P.__newCanvas = function (w, h) {
    var c = global.document.createElement("canvas");
    c.width = w; c.height = h;
    return c;
  };

  P.__resize = function (w, h) {
    P.width = w;
    P.height = h;
    if (canvas) { canvas.width = w; canvas.height = h; }
    global.width = w;
    global.height = h;
    if (ctx) P.__setContext(ctx, canvas);
  };

  /* ------------------------------------------------------------- installing */
  function installGlobals(target) {
    var api = P.API;
    for (var k in api) {
      if (api.hasOwnProperty(k)) target[k] = api[k];
    }
    /* Live values the sketch reads every frame. */
    target.width = P.width;
    target.height = P.height;
    target.frameCount = 0;
    target.mouseX = 0;
    target.mouseY = 0;
    target.pmouseX = 0;
    target.pmouseY = 0;
    target.mouseIsPressed = false;
    target.mousePressed = false;
    target.keyIsPressed = false;
    target.key = "";
    target.keyCode = 0;
    target.CODED = 0xffff;
    target.focused = true;
    /* KA exposes these as no-ops that programs sometimes call. */
    target.KAInfiniteLoopSetTimeout = function () {};
    target.KAInfiniteLoopProtect = function () {};
  }

  /* ------------------------------------------------------------------ input */
  function bindInput(el, target) {
    function pos(e) {
      var r = el.getBoundingClientRect();
      var sx = el.width / r.width, sy = el.height / r.height;
      var cx = (e.touches ? e.touches[0].clientX : e.clientX);
      var cy = (e.touches ? e.touches[0].clientY : e.clientY);
      target.pmouseX = target.mouseX;
      target.pmouseY = target.mouseY;
      target.mouseX = (cx - r.left) * sx;
      target.mouseY = (cy - r.top) * sy;
    }

    el.addEventListener("mousemove", function (e) {
      pos(e);
      if (typeof target.mouseMoved === "function") target.mouseMoved();
      if (target.mouseIsPressed && typeof target.mouseDragged === "function") {
        target.mouseDragged();
      }
    });

    el.addEventListener("mousedown", function (e) {
      pos(e);
      target.mouseIsPressed = true;
      target.mouseButton = e.button === 2 ? "RIGHT" : (e.button === 1 ? "CENTER" : "LEFT");
      if (typeof target.mousePressed === "function") target.mousePressed();
      e.preventDefault();
    });

    /* KA fires mouseClicked on release, which is what the game listens for. */
    el.addEventListener("mouseup", function (e) {
      pos(e);
      target.mouseIsPressed = false;
      if (typeof target.mouseReleased === "function") target.mouseReleased();
      if (typeof target.mouseClicked === "function") target.mouseClicked();
    });

    el.addEventListener("mouseout", function () {
      target.mouseIsPressed = false;
      if (typeof target.mouseOut === "function") target.mouseOut();
    });

    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    /* Touch: map to the same handlers so the game works on a phone. */
    el.addEventListener("touchstart", function (e) {
      pos(e);
      target.mouseIsPressed = true;
      if (typeof target.mousePressed === "function") target.mousePressed();
      e.preventDefault();
    }, { passive: false });
    el.addEventListener("touchmove", function (e) {
      pos(e);
      e.preventDefault();
    }, { passive: false });
    el.addEventListener("touchend", function (e) {
      target.mouseIsPressed = false;
      if (typeof target.mouseClicked === "function") target.mouseClicked();
      e.preventDefault();
    }, { passive: false });

    /* KA's key model: `keyCode` is numeric, `key` is the character, and a
       program is expected to index its own array with BOTH. */
    function isPrintable(e) { return e.key && e.key.length === 1; }

    global.addEventListener("keydown", function (e) {
      target.keyIsPressed = true;
      target.keyCode = e.keyCode;
      target.key = isPrintable(e) ? e.key : target.CODED;
      if (typeof target.keyPressed === "function") target.keyPressed();
      /* Stop the page scrolling out from under the game. */
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault();
    });

    global.addEventListener("keyup", function (e) {
      target.keyIsPressed = false;
      target.keyCode = e.keyCode;
      target.key = isPrintable(e) ? e.key : target.CODED;
      if (typeof target.keyReleased === "function") target.keyReleased();
    });

    global.addEventListener("blur", function () {
      target.keyIsPressed = false;
      target.mouseIsPressed = false;
    });
  }

  /* ------------------------------------------------------------------- loop */
  function frame(now) {
    if (!running) return;
    rafId = global.requestAnimationFrame(frame);

    var interval = 1000 / (P.__targetFps || 60);
    if (now - lastFrame < interval - 0.5) return;
    lastFrame = now;

    step();
  }

  function step() {
    var target = global;
    if (!P.__looping) return;

    P.__cursor = "default";
    try {
      if (typeof target.draw === "function") target.draw();
    } catch (err) {
      running = false;
      P.API.println("Error: " + (err && err.message ? err.message : err));
      if (err && err.stack) console.error(err.stack);
      if (P.onError) P.onError(err);
      return;
    }
    target.frameCount++;
    if (canvas && canvas.style) canvas.style.cursor = P.__cursor;
  }

  /* ------------------------------------------------------------------ public */
  P.attach = function (el) {
    canvas = el;
    ctx = el.getContext("2d");
    P.width = el.width;
    P.height = el.height;
    P.__setContext(ctx, el);
    installGlobals(global);
    if (el.addEventListener) bindInput(el, global);
    return P;
  };

  P.start = function () {
    if (running) return;
    running = true;
    lastFrame = 0;
    if (typeof global.setup === "function") global.setup();
    rafId = global.requestAnimationFrame(frame);
  };

  P.stop = function () {
    running = false;
    if (rafId !== null) global.cancelAnimationFrame(rafId);
  };

  /* Used by the headless test harness to advance deterministically. */
  P.stepOnce = step;

})(typeof window !== "undefined" ? window : globalThis);
