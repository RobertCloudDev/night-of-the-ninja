/* Art transcribed verbatim from the original program, used only to verify
 * the shim. Chosen to exercise every tricky path: beginShape+bezierVertex,
 * rect corner radii, rectMode(CENTER), stroked ellipses, alpha-stacked glow
 * loops, degrees-based sin/cos loops, text, and Perlin noise. */

function Shuriken(x, y, s, r) {
  pushMatrix();
  translate(x, y);
  scale(s / 300);
  rotate(r);
  translate(-200, -200);
  noStroke();

  fill(173, 173, 173);
  beginShape();
  vertex(181, 123);
  bezierVertex(181, 123, 193, 89, 201, 61);
  bezierVertex(208, 79, 216, 103, 222, 121);
  bezierVertex(200, 146, 228, 180, 254, 150);
  bezierVertex(254, 147, 255, 144, 255, 143);
  bezierVertex(278, 137, 305, 131, 319, 129);
  bezierVertex(317, 133, 295, 158, 275, 178);
  bezierVertex(232, 169, 240, 227, 275, 215);
  bezierVertex(302, 244, 314, 258, 319, 264);
  bezierVertex(286, 257, 259, 252, 255, 250);
  bezierVertex(232, 208, 199, 244, 222, 269);
  bezierVertex(214, 299, 206, 323, 202, 332);
  bezierVertex(189, 295, 184, 279, 181, 270);
  bezierVertex(206, 236, 164, 215, 150, 250);
  bezierVertex(102, 262, 91, 264, 85, 265);
  bezierVertex(100, 245, 122, 222, 129, 215);
  bezierVertex(152, 223, 181, 183, 128, 178);
  bezierVertex(108, 157, 90, 138, 84, 129);
  bezierVertex(102, 133, 138, 140, 149, 143);
  bezierVertex(169, 187, 205, 142, 183, 125);
  endShape(CLOSE);

  fill(161, 161, 161);
  beginShape();
  vertex(200, 178);
  bezierVertex(200, 178, 230, 180, 216, 208);
  bezierVertex(205, 219, 189, 217, 183, 198);
  bezierVertex(184, 184, 190, 182, 196, 179);
  endShape(CLOSE);

  fill(135, 135, 135);
  beginShape();
  vertex(201, 61); vertex(187, 104); vertex(181, 123); vertex(189, 126); vertex(202, 84);
  endShape(CLOSE);

  fill(201, 201, 201);
  beginShape();
  vertex(201, 62); vertex(222, 122); vertex(215, 128); vertex(202, 84);
  endShape(CLOSE);

  fill(196, 196, 196);
  beginShape();
  vertex(255, 142); vertex(319, 129); vertex(299, 141); vertex(255, 151);
  endShape(CLOSE);

  fill(105, 105, 105);
  beginShape();
  vertex(297, 142); vertex(268, 173); vertex(275, 178); vertex(319, 128);
  endShape(CLOSE);

  fill(191, 191, 191);
  beginShape();
  vertex(275, 215); vertex(318, 264); vertex(297, 252); vertex(268, 219);
  endShape(CLOSE);

  fill(102, 102, 102);
  beginShape();
  vertex(253, 242); vertex(296, 251); vertex(318, 264); vertex(253, 250);
  endShape(CLOSE);

  fill(99, 99, 99);
  beginShape();
  vertex(215, 265); vertex(201, 308); vertex(202, 331); vertex(223, 269);
  endShape(CLOSE);

  fill(207, 207, 207);
  beginShape();
  vertex(188, 264); vertex(201, 307); vertex(202, 332); vertex(181, 269);
  endShape(CLOSE);
  fill(120, 120, 120);

  beginShape();
  vertex(106, 252); vertex(149, 242); vertex(149, 251); vertex(85, 264);
  endShape(CLOSE);
  fill(207, 207, 207);

  beginShape();
  vertex(128, 215); vertex(85, 264); vertex(106, 251); vertex(136, 218);
  endShape(CLOSE);

  fill(128, 128, 128);
  beginShape();
  vertex(84, 130); vertex(107, 142); vertex(135, 172); vertex(128, 178);
  endShape(CLOSE);

  fill(204, 204, 204);
  beginShape();
  vertex(84, 130); vertex(107, 142); vertex(148, 150); vertex(149, 143);
  endShape(CLOSE);

  popMatrix();
}

function DaCoins() {
  pushMatrix();
  translate(40, 40);

  noStroke();
  for (var i = 0; i < 18; i += 2) {
    fill(255, 241, 194, 10);
    ellipse(0, 0, 55 + i, 54 + i);
  }

  stroke(255, 203, 48);
  fill(255, 190, 79);
  strokeWeight(6);
  ellipse(0, 0, 50, 50);

  fill(255, 224, 122);
  noStroke();
  rectMode(CENTER);
  rect(-10, 0, 5, 20, 10);
  rect(10, 0, 5, 20, 10);

  rect(0, -10, 8, 5, 10);
  rect(0, 10, 8, 5, 10);
  rect(0, 0, 21, 5, 10);

  for (var i = 0; i < 20; i++) {
    fill(255, 241, 194, 10);
    ellipse(0, 0, 35 + i, 34 + i);
  }

  rectMode(CORNER);
  popMatrix();
}

function DaKey(x, y, s) {
  pushMatrix();
  translate(x, y);
  scale(s);
  translate(-200, -200);

  stroke(0, 0, 0);
  strokeWeight(1);

  rect(198, 82, 12, 140, 10);

  noStroke();
  for (var i = 0; i < 8; i++) {
    var A = sin(i) * 40;

    fill(0, 0, 0);
    rect(179 + A, 87 + i * 6, 19, 6);

    fill(255, 192, 82);
    rect(180 + A, 87 + i * 6, 17, 6);
  }

  stroke(0, 0, 0);
  rect(198, 82, 12, 140, 10);

  ellipse(205, 219, 18, 5);
  ellipse(205, 241, 20, 20);
  ellipse(205, 227, 18, 18);

  noFill();
  strokeWeight(10);
  stroke(0, 0, 0);
  ellipse(205, 270, 50, 50);
  ellipse(205, 270, 45, 45);
  stroke(255, 192, 82);
  ellipse(205, 270, 47, 47);

  for (var i = 0; i < 23; i++) {
    noStroke();
    fill(255, 160, 64, 5);
    rect(198 - i / 4, 82, 12 + i / 2, 133 + i, 10);
    stroke(255, 160, 64, 5);
    noFill();
    ellipse(205, 269, 38 + i, 41 + i);
  }

  popMatrix();
}

function DaMeat(x, y, s) {
  pushMatrix();
  translate(x, y);
  scale(s);
  noStroke();
  fill(255, 236, 201);
  rect(-5, 44, 10, 35);
  ellipse(-5, 78, 15, 15);
  ellipse(4, 78, 15, 15);

  fill(242, 29, 65);
  rect(-31, -11, 62, 68, 30);

  fill(255, 92, 119);
  ellipse(0, 0, 50, 25);

  fill(255, 255, 255, 60);
  ellipse(-19, 37, 10, 10);
  ellipse(-3, 37, 10, 10);
  ellipse(-10, 47, 10, 10);

  fill(255, 236, 201);
  rect(-5, -35, 10, 35);
  ellipse(-5, -36, 15, 15);
  ellipse(4, -36, 15, 15);

  fill(255, 92, 119);
  ellipse(-3, 1, 12, 9);
  ellipse(5, -3, 12, 9);
  popMatrix();
}

function Star(x, y, s, color) {
  pushMatrix();
  translate(x, y);
  scale(s);
  fill(color);
  noStroke();
  translate(-200, -200);
  beginShape();
  vertex(199, 130);
  vertex(176, 178);
  vertex(124, 179);
  vertex(124, 179);
  vertex(162, 215);
  vertex(154, 270);
  vertex(201, 245);
  vertex(201, 245);
  vertex(248, 268);
  vertex(239, 214);
  vertex(275, 179);
  vertex(224, 179);
  endShape();
  popMatrix();
}

function CastleBlock(Stone) {
  pushMatrix();
  scale(2);
  noStroke();
  fill(79, 79, 79);
  rect(0, 0, 100, 100);

  fill(66, 66, 66);
  rect(18, 24, 30, 30, 10);
  rect(53, 24, 30, 30, 10);
  rect(87, 24, 30, 30, 10);
  rect(32, 59, 30, 30, 10);
  rect(76, 59, 30, 30, 10);
  rect(-15, 59, 30, 30, 10);
  rect(-17, 24, 30, 30, 10);
  rect(4, -9, 30, 30, 10);
  rect(39, -9, 30, 30, 10);
  rect(73, -9, 30, 30, 10);

  rect(4, 92, 30, 30, 10);
  rect(39, 92, 30, 30, 10);
  rect(73, 92, 30, 30, 10);
  if (Stone) {
    fill(135, 16, 16);
    for (var i = 0; i < 20; i++) {
      rect(i * 5, 0, 5, round(random(18, 35)), 9);
    }
    rect(0, 0, 5, 20, 17);
    rect(95, 0, 5, 20, 17);

    fill(105, 0, 0);
    for (var i = 0; i < 49; i++) {
      rect(i * 2 - 1, 0, 5, round(random(3, 27)), 5);
    }
  }
  popMatrix();
}

function fullText(txt, x, y, s, r, s1, Glow, col1, col2, weight) {
  pushMatrix();
  translate(x, y);
  textAlign(CENTER, CENTER);
  scale(1, s1);
  rotate(r);
  textSize(s);
  if (Glow) {
    for (var i = 0; i < 360; i += 4) {
      fill(col2);
      text(txt, 0 + sin(i) * weight, 0 + cos(i) * weight);
    }
  }
  fill(col1);
  text(txt, 0, 0);
  popMatrix();
}

function Button(x, y, offSet, txt) {
  noStroke();

  fill(110, 67, 22);
  rect(x, y + 32, 130, 25, 10);

  pushMatrix();
  translate(x, y + offSet);

  fill(173, 110, 52);
  rect(0, 0, 130, 50, 10);

  stroke(108, 70, 41);
  noFill();
  strokeWeight(2);
  bezier(1, 38, 123, 28, 38, 43, 128, 31);
  bezier(1, 19, 57, 28, 66, 3, 129, 14);
  bezier(1, 9, 72, 22, 38, -6, 129, 10);
  bezier(1, 38, 123, 56, 38, 43, 129, 41);
  bezier(1, 28, 123, 28, 38, 43, 129, 19);

  fullText(txt, 65, 25, 40 - txt.length * 2, 0, 1, true, color(20, 20, 20), color(108, 70, 41), 1);

  popMatrix();
}

var clouds = function (height, colors) {
  for (var i = 0; i <= width; i += 2) {
    for (var b = 0; b < height; b += 2) {
      noStroke();
      fill(colors, noise(i / 37, b / 25, 1) * 240 - b / (height / 167));
      rect(i, b, 4, 4, 20);
    }
  }
};

module.exports = { Shuriken, DaCoins, DaKey, DaMeat, Star, CastleBlock, fullText, Button, clouds };
