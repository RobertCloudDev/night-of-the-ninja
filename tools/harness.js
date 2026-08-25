/* Headless harness: runs ka.js + a sketch under @napi-rs/canvas so frames
 * can be rendered and inspected without a browser. */
const fs = require("fs");
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

const ROOT = path.join(__dirname, "..");

function boot(w = 600, h = 600) {
  const g = globalThis;

  // Minimal DOM surface the runtime expects.
  g.window = g;
  g.document = {
    createElement(tag) {
      if (tag !== "canvas") throw new Error("only canvas is stubbed");
      return createCanvas(1, 1);
    }
  };
  g.requestAnimationFrame = () => 0;
  g.cancelAnimationFrame = () => {};
  g.addEventListener = () => {};

  require(path.join(ROOT, "ka.js"));
  require(path.join(ROOT, "runtime.js"));

  const canvas = createCanvas(w, h);
  canvas.addEventListener = undefined;      // skip DOM input binding
  canvas.style = {};

  const P = g.KAProcessing;
  P.__newCanvas = (cw, ch) => createCanvas(Math.max(1, cw | 0), Math.max(1, ch | 0));
  P.attach(canvas);

  const logs = [];
  P.onPrintln = (line) => logs.push(line);

  return { P, canvas, g, logs };
}

function save(canvas, name) {
  const out = path.join("/tmp/ninja", name);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return out;
}

function grid(canvases, cols, cell, bg = "#202028") {
  const rows = Math.ceil(canvases.length / cols);
  const out = createCanvas(cols * cell, rows * cell);
  const c = out.getContext("2d");
  c.fillStyle = bg;
  c.fillRect(0, 0, out.width, out.height);
  canvases.forEach((cv, i) => {
    const x = (i % cols) * cell, y = Math.floor(i / cols) * cell;
    const s = Math.min(cell / cv.width, cell / cv.height);
    c.drawImage(cv, x + (cell - cv.width * s) / 2, y + (cell - cv.height * s) / 2,
                cv.width * s, cv.height * s);
  });
  return out;
}

module.exports = { boot, save, grid, createCanvas };
