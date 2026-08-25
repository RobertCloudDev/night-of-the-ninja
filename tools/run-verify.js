const { boot, save, createCanvas } = require("./harness");
const path = require("path");
const { P, canvas, g } = boot(600, 600);

// verify-art.js uses bare Processing globals, so eval it in global scope.
const fs = require("fs");
const src = fs.readFileSync(path.join(__dirname, "verify-art.js"), "utf8")
  .replace(/module\.exports[\s\S]*$/, "");
(0, eval)(src);

function shot(name, w, h, fn) {
  const cv = createCanvas(w, h);
  const c = cv.getContext("2d");
  P.__setContext(c, cv);
  P.__resetState();
  P.width = w; P.height = h; g.width = w; g.height = h;
  c.clearRect(0, 0, w, h);
  fn(c);
  save(cv, name);
  return cv;
}

shot("shuriken.png", 200, 200, () => { background(40,60,90); Shuriken(100,100,180,0); });
shot("coins.png",    80,  80,  () => { background(0,0); DaCoins(); });
shot("key.png",     120, 160,  () => { background(30,30,40); DaKey(60,80,0.35); });
shot("meat.png",    120, 160,  () => { background(30,30,40); DaMeat(60,80,1); });
shot("star.png",    120, 120,  () => { background(60,40,20); Star(60,60,0.5, color(255,196,0)); });
shot("castle.png",  200, 200,  () => { background(0,0); CastleBlock(true); });
shot("button.png",  160,  90,  () => { background(0,18,79); Button(10,10,0,"New Game"); });
shot("clouds.png",  600, 120,  () => { background(0,29,156); clouds(98, color(0,22,74)); });

console.log("rendered 8 verification images");
