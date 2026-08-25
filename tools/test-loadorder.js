/* Regression test: a Khan Academy program runs statements at the top level,
 * so every Processing global must exist before the game script is parsed. */
const { boot, save } = require("./harness");
const { P, canvas, g } = boot(600, 600);

// Exactly what the top of a KA program does, before any function is called.
const topLevel = `
  size(600, 600, JAVA2D);
  smooth();
  frameRate(60);
  textAlign(CENTER, CENTER);
  textFont(createFont("arial Bold"));
  var probeW = width, probeH = height;
  function Thing(x, y) { this.x = x; this.y = y; }
  var made = new__.call(Thing, width / 2, height / 6);
  // Defined by the game itself, exactly as in the original source.
  var setKALoopTimeout = function (ms) {
    var method_name = 'KAInfiniteLoopSetTimeout';
    if (method_name in this) { this[method_name](ms >>> 0); }
  };
  setKALoopTimeout(10000);
  draw = function () {
    background(20, 24, 40);
    fill(255, 200, 80);
    textSize(34);
    text("load order OK", width / 2, height / 2);
    fill(120, 200, 255);
    ellipse(width / 2, height / 2 + 70, 60 + sin(frameCount * 6) * 20, 60);
  };
`;
const new__ = (0 || function () {
  var o = Object.create(this.prototype); this.apply(o, arguments); return o;
});
g.new__ = new__;

try {
  (0, eval)(topLevel);
} catch (e) {
  console.error("FAIL at top level:", e.message);
  process.exit(1);
}
console.log("top-level statements OK  width=" + g.probeW + " height=" + g.probeH);
console.log("new__ instance:", JSON.stringify(g.made));
for (let i = 0; i < 5; i++) P.stepOnce();
console.log("frameCount:", g.frameCount, "| typeof:", typeof g.frameCount);
save(canvas, "loadorder.png");
console.log("PASS");
