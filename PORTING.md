# Porting notes

Night of the Ninja was written in Khan Academy ProcessingJS in 2018. This
version runs the same program in a browser, on a plain HTML5 canvas, with no
libraries.

The important thing about this port is what it *doesn't* do: it doesn't
rewrite the game. Khan Academy's ProcessingJS is a JavaScript environment,
so the game logic is already browser code. What was missing was the
environment around it. That environment is `ka.js` and `runtime.js`; the
game itself is copied byte for byte apart from three edits, applied by
`tools/convert.js` rather than by hand.

---

## 1. Why not real Processing.js?

Khan Academy's ProcessingJS is a **fork**, and the differences are precisely
the ones that fail silently — the program still runs, it just draws the
wrong picture.

**Angles are degrees.** `rotate()`, `arc()`, `sin()`, `cos()`, `tan()` and
`atan2()` all take degrees on Khan Academy. Stock Processing.js uses
radians, like Processing proper. Under stock PJS every angle in the program
is wrong by a factor of 57.3, which turns a rotating shuriken into a jitter
and collapses every glow loop.

**The preprocessor rewrites `new`.** Processing.js parses the source and
transforms constructor calls, which is the entire reason this program
carries the `new__` helper:

```js
var new__ = (0 || function () {
  var obj = Object.create(this.prototype);
  this.apply(obj, arguments);
  return obj;
});
```

That is a workaround for the injector. Running the source through a real
Processing.js would put the injector back in the path it was written to
avoid.

**It is abandoned.** Processing.js was retired in 2018. Loading a large
dead dependency to emulate a fork of itself is worse than implementing the
sixty or so functions the program actually calls.

So `ka.js` implements the Khan Academy dialect directly against canvas 2D.
It is dependency-free, loads instantly, and — because it is written against
this specific dialect — it can be exact.

---

## 2. The semantics that matter

Four behaviours have to be reproduced or the artwork comes out wrong.

**Degrees everywhere**, as above.

**One `curveVertex()` converts the entire shape to a spline.** ProcessingJS
sets an internal `isCurve` flag and then calls `vertex()`, so a single
curved point turns every point in the shape into a Catmull-Rom control
point. The first and last become guides rather than drawn points, and fewer
than four points draw nothing at all.

**The transform applies at `endShape()`, not at `vertex()`.** Vertices are
buffered raw and transformed when the shape closes, so a `translate()`
issued in the middle of a shape moves the whole shape. Canvas 2D transforms
path segments as they are added, so `ka.js` buffers the vertex list and
emits the entire path inside `endShape()`.

**`endShape()` without `CLOSE` still fills as a closed path**, but strokes
the path open. Several shapes in the artwork rely on this.

Two smaller ones worth naming:

- **`background()` honours alpha.** `background(0, 0)` clears the frame to
  fully transparent, which is how the asset-baking functions hide their own
  work before grabbing it with `get()`.
- **`fill(someColor, undefined)`** happens in several places where an alpha
  argument is omitted. Treating the missing alpha as opaque, rather than
  letting `undefined` poison the colour, matches what players saw.

---

## 3. Perlin noise

`clouds()` builds its texture from `noise()`, so the cloud layer in every
forest backdrop depends on the noise implementation matching. Processing's
`noise()` is a specific algorithm — a 4096-entry table, four octaves, 0.5
amplitude falloff, cosine interpolation — not generic gradient noise.
`ka.js` reimplements it from the Processing source so the clouds come out
the same shape.

---

## 4. The three edits

`tools/convert.js` turns the original Khan Academy file into `game.js`.
Every edit must match exactly once, or the tool writes nothing and exits —
a silent partial conversion is not possible. It also parses the result
before writing it.

**1. The `DeKhan` block is removed.** It exists to defeat Khan Academy's
infinite-loop guard by rewriting its own source with regular expressions
and rebuilding functions through the `Function` constructor. There is no
guard to defeat outside Khan Academy, and the block is actively harmful
here — among other things it does this:

```js
var wasFrameCount = frameCount;
frameCount = function () { frameCount = wasFrameCount; return this; };
var globals = frameCount();
```

That reassigns `frameCount` to a function in order to capture the global
object. Left in place, every `frameCount % n` animation in the game breaks.

**2. `draw = DeKhan.loopDetect(function () {…})` becomes a plain function
assignment.**

**3. The `PJSCodeInjector.prototype.hasOrHadDrawLoop` line inside `draw()`
is removed**, since it reaches into Khan Academy's injector internals.

Deliberately left alone: `setKALoopTimeout` (harmless — `runtime.js`
provides `KAInfiniteLoopSetTimeout` as a no-op, so it runs and does
nothing), the `new__` helper (valid JavaScript exactly as written),
`size(600, 600, JAVA2D)`, and the `try`/`catch` in `draw()` including its
`infiniteLoopNodeType` check.

---

## 5. What the runtime provides

`runtime.js` reproduces the Khan Academy program lifecycle:

- **Global mode.** On Khan Academy every Processing function is already in
  scope and assigning `draw = …` registers the loop. The runtime installs
  the same environment on `window` before the game script loads, which is
  why the game source needs no module wrapper.
- **The key model.** Khan Academy exposes `keyCode` as a number and `key` as
  a character, and programs index their own array with both —
  `keys[keyCode] = keys[key] = true`. That is why the game can test
  `keys.d`, `keys.D` and `keys[RIGHT]` interchangeably.
- **`mouseClicked` fires on release**, which is what the game listens for.
- **Touch events** are mapped onto the mouse handlers, so the game is
  playable on a phone.

---

## 6. Verification

`tools/harness.js` runs the shim headlessly under `@napi-rs/canvas`, so
frames can be rendered and compared without a browser.
`tools/verify-art.js` holds artwork transcribed verbatim from the original,
chosen to exercise every awkward path in the shim: `beginShape` with
`bezierVertex` and `CLOSE`, rectangle corner radii, `rectMode(CENTER)`,
stroked ellipses, alpha-stacked glow loops, degrees-based `sin()` inside a
loop, `bezier()`, text rendering, `random()`, and `noise()`.

```bash
npm install
node tools/run-verify.js     # writes PNGs to /tmp/ninja
```
