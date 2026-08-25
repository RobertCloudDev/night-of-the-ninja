var LagHandler = 200;/**Lower if you are experiencing lag.  Dont Lower it less than 10 **/

/** 
 * PLEASE READ: Hey, I know the khan community is pretty much dead, but I would greatly appreciate comments! Tell me about bugs, or how much you liked or disliked the game. Anything. I would greatly appreciate your support.
 * 
 * CoC's Firefists Present:
 _       _________ _______          _________    
( (    /|\__   __/(  ____ \|\     /|\__   __/    
|  \  ( |   ) (   | (    \/| )   ( |   ) (       
|   \ | |   | |   | |      | (___) |   | |       
| (\ \) |   | |   | | ____ |  ___  |   | |       
| | \   |   | |   | | \_  )| (   ) |   | |       
| )  \  |___) (___| (___) || )   ( |   | |       
|/    )_)\_______/(_______)|/     \|   )_(       
                                                 
 _______  _______   _________          _______   
(  ___  )(  ____ \  \__   __/|\     /|(  ____ \  
| (   ) || (    \/     ) (   | )   ( || (    \/  
| |   | || (__         | |   | (___) || (__      
| |   | ||  __)        | |   |  ___  ||  __)     
| |   | || (           | |   | (   ) || (        
| (___) || )           | |   | )   ( || (____/\  
(_______)|/            )_(   |/     \|(_______/  
                                                 
 _       _________ _       _________ _______     
( (    /|\__   __/( (    /|\__    _/(  ___  )    
|  \  ( |   ) (   |  \  ( |   )  (  | (   ) |    
|   \ | |   | |   |   \ | |   |  |  | (___) |    
| (\ \) |   | |   | (\ \) |   |  |  |  ___  |    
| | \   |   | |   | | \   |   |  |  | (   ) |    
| )  \  |___) (___| )  \  ||\_)  )  | )   ( |    
|/    )_)\_______/|/    )_)(____/   |/     \|    
                                                 


If the game crashes during loading, just press restart, and it should load fine. 


FOR THE JUDGES:
* Lots of commented code. Over 90 % of this project has been commented. The art of course isnt as commented, because its just art and no game mechanisms.
* Lots of game mechanics: Featuring buttons, keys, meat, enemys, Lots and lots and lots of game Juicing(particle and shake effects)
* Fully Working save code. 
* Achievements

**/

/************************************************
-----------------Topic Index--------------------
0-6000..................................All the code lol


************************************************/


//hack this if you will, its fine with me :)
var Save = {
levels:0,
unlocked:0,
achievements:[
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
],
MaxWeapons:3,
money:0,
PowerAmnt:300,
throwSpd:14,
MaxCooldown:1.1,
stat : {
monster:0,
doors:0,
upgrade:0,
bird:0,
happy:0,
death:0,
healthLoss:false,
},
};



/** Credit to KWC for this **/
var new__ = (0 || function () {
  var obj = Object.create(this.prototype);
  this.apply(obj, arguments);
  return obj;
});




//{
size(600, 600, JAVA2D);
var delagVersion = true; //TURN TO FALSE FOR EPICNESS
var Mydebug = false;
/** @created_by MKaelin368 (KWC) (c) 2018 */
var setKALoopTimeout = function (ms) {
var method_name = 'KAInfiniteLoopSetTimeout';
if (method_name in this) {
this[method_name](ms >>> 0);
}
};

// -- sets background to wait 10 seconds --
setKALoopTimeout(10000);


var DeKhan = (function() {
    /* Regular expressions derived from Element118 delag() function. */
    var plusPlusExp = new RegExp("__env__\\.KAInfiniteLoopCount\\+\\+;\\n", "g");
    var ifClauseExp = new RegExp("\\n\\s*if \\(__env__\\.KAInfiniteLoopCount > 1000\\) {[\\s]+__env__\\.KAInfiniteLoopProtect\\('[^']*'\\);[^}]+}", "g");
    var newExp = new RegExp("__env__\\.PJSCodeInjector\\.applyInstance\\((\\S+), '\\S+'\\)", "g");
    var envExp = new RegExp("__env__\\.", "g");
    var noBreakSpace = "\u00a0";  /* primenumbers7532@gmail.com */
    var lineBreak = String.fromCharCode(10);  /* Larry Serflaten for IE Windows */
    var spaceExp = new RegExp(" ", "g");
    var newlineExp = new RegExp("\\n", "g");
    var wasFrameCount = frameCount;
    frameCount = function() {
        frameCount = wasFrameCount;
        return this;
    };
    var globals = frameCount();
    var F = Object.constructor;  /* Javascript Function (capital F) constructor */
    var metIpseMecum = (0 || arguments).callee;
    
    /* Given source code, return a function in the global scope. */
    var conjureFunctionFrom = function (source) {
        /* Copied from Element118, delag() function. */
        return F('return (function(__env__) {return ' + source + ';});')()(globals);
    };
    
    return {
        /* Return a function like f without any loop detection. */
        loopDetect: function(f) {
            var source = f.toString();
            source = source.replace(plusPlusExp, "");
            source = source.replace(ifClauseExp, "");
            return conjureFunctionFrom(source);
        },
        
        /* Return a function like f where the caller supplies the filter. */
        applyRegExp: function(f, rExp, replacement) {
            var source = f.toString();
            source = source.replace(rExp, replacement);
            return conjureFunctionFrom(source);
        },
        
        /* Return a function like f that uses the keyword "new" again. */
        renew: function(f) {
            return this.applyRegExp(f, newExp, "new $1");
        },
        
        /*
         * Print completely deKhanified function f source out via println.
         * All arguments are optional.
         */
        print: function(f, prefix, suffix) {
            f = f || metIpseMecum;
            prefix = prefix || "";
            suffix = suffix || "";
            f = this.loopDetect(f);
            f = this.renew(f);
            var source = f.toString();
            source = source.replace(envExp, "");
            source = prefix + source + suffix;
            this.printText(source);
        },
        
        /* Print source line(s) out via println. */
        printText: function(source) {
            source = source || " "; /* blank line if nothing else... */
            source = source.replace(spaceExp, noBreakSpace);
            source = source.replace(newlineExp, lineBreak);
            println(source);
        },
    };
})();

smooth();
frameRate(60);

//} Delagging (not created by us)


//{

var tower = function(x, y, s) {
    pushMatrix();
    translate(x, y);
    scale(s);
    
    fill(0, 0, 0);
    //noFill();
    //stroke(0, 0, 0);
    noStroke();
    
    beginShape();
    vertex(269, 600);
    vertex(400, 600);
    vertex(400, 330);
    vertex(410, 310);
    vertex(415, 310);
    vertex(415, 290);
    vertex(410, 290);
    vertex(410, 280);
    vertex(415, 280);
    vertex(415, 260);
    vertex(405, 235);
    vertex(395, 231);
    vertex(395, 265);
    vertex(380, 255);
    vertex(380, 235);
    vertex(370, 230);
    vertex(370, 255);
    vertex(355, 265);
    vertex(340, 255);
    vertex(340, 235);
    vertex(330, 230);
    vertex(330, 255);
    vertex(315, 265);
    vertex(300, 255);
    vertex(300, 235);
    vertex(290, 230);
    vertex(290, 255);
    vertex(275, 265);
    vertex(275, 230);
    vertex(265, 235);
    vertex(255, 260);
    vertex(255, 280);
    vertex(260, 280);
    vertex(260, 290);
    vertex(255, 290);
    vertex(255, 309);
    vertex(260, 309);
    vertex(270, 330);
    vertex(270, 599);
    endShape();
    
    popMatrix();
}; //Link
var wall = function(x, y, s) {
    pushMatrix();
    translate(x, y);
    scale(s);
    
    fill(0, 0, 0);
    //noFill();
    stroke(0, 0, 0);
    noStroke();
    
    beginShape();
    vertex(460, 600);
    vertex(155, 600);
    vertex(155, 450);
    vertex(170, 440);
    vertex(185, 450);
    vertex(185, 425);
    vertex(195, 425);
    vertex(195, 445);
    vertex(200, 445);
    vertex(210, 440);
    vertex(220, 445);
    vertex(225, 445);
    vertex(225, 425);
    vertex(235, 425);
    vertex(235, 445);
    vertex(250, 440);
    vertex(260, 445);
    vertex(260, 425);
    vertex(270, 425);
    vertex(270, 445);
    vertex(285, 440);
    vertex(295, 445);
    vertex(295, 425);
    vertex(305, 425);
    vertex(305, 445);
    vertex(320, 440);
    vertex(330, 445);
    vertex(330, 425);
    vertex(340, 425);
    vertex(340, 445);
    vertex(355, 440);
    vertex(370, 445);
    vertex(370, 425);
    vertex(380, 425);
    vertex(380, 445);
    vertex(395, 440);
    vertex(410, 445);
    vertex(410, 425);
    vertex(420, 425);
    vertex(420, 450);
    vertex(435, 440);
    vertex(450, 450);
    endShape();
    
    popMatrix();
};//Link

var caveBackground = function() {
    background(79, 111, 143);
    noStroke();
    
    //3rd layer
    fill(32, 62, 92);

    
    beginShape();
    vertex(172, 254);
    vertex(206, 220);
    vertex(217, 234);
    vertex(236, 220);
    vertex(265, 334);
    vertex(254, 374);
    vertex(246, 350);
    vertex(239, 385);
    vertex(239, 426);
    vertex(183, 382);
    vertex(165, 389);
    vertex(165, 486);
    vertex(438, 499);
    vertex(438, 355);
    vertex(423, 368);
    vertex(410, 355);
    vertex(401, 370);
    vertex(393, 347);
    vertex(383, 372);
    vertex(368, 339);
    vertex(359, 347);
    vertex(359, 370);
    vertex(345, 353);
    vertex(343, 375);
    vertex(328, 342);
    vertex(328, 366);
    vertex(309, 347);
    vertex(303, 320);
    vertex(303, 293);
    vertex(313, 275);
    vertex(317, 254);
    vertex(336, 277);
    vertex(339, 265);
    vertex(344, 248);
    vertex(346, 275);
    vertex(358, 244);
    vertex(370, 264);
    vertex(378, 236);
    vertex(390, 251);
    vertex(403, 223);
    vertex(408, 237);
    vertex(433, 204);
    vertex(433, 57);
    vertex(172, 57);
    endShape();
    
    
    
    noStroke();
    fill(32, 62, 92);
    //side deatail
    pushMatrix();
    translate(0, 0);
    beginShape();
    vertex(66, 410);
    vertex(56, 416);
    vertex(48, 395);
    vertex(39, 400);
    vertex(35, 416);
    vertex(28, 403);
    vertex(25, 419);
    vertex(17, 419);
    vertex(13, 405);
    vertex(5, 399);
    vertex(-2, 421);
    vertex(-2, 485);
    vertex(99, 485);
    endShape();
    popMatrix();
    
    //2
    pushMatrix();
    translate(622, 3);
    scale(-1, 1);
    beginShape();
    vertex(66, 410);
    vertex(56, 416);
    vertex(48, 395);
    vertex(39, 400);
    vertex(35, 416);
    vertex(28, 403);
    vertex(25, 419);
    vertex(17, 419);
    vertex(13, 405);
    vertex(5, 399);
    vertex(-2, 421);
    vertex(-2, 485);
    vertex(99, 485);
    endShape();
    popMatrix();
    
    //3
    pushMatrix();
    translate(537, 603);
    scale(1, -1.0);
    beginShape();
    vertex(66, 410);
    vertex(56, 416);
    vertex(48, 395);
    vertex(39, 400);
    vertex(35, 416);
    vertex(28, 403);
    vertex(25, 419);
    vertex(17, 419);
    vertex(13, 405);
    vertex(5, 399);
    vertex(-2, 421);
    vertex(-2, 485);
    vertex(99, 485);
    endShape();
    popMatrix();
    
    //4
    pushMatrix();
    translate(63, 594);
    scale(-1, -1.0);
    beginShape();
    vertex(66, 410);
    vertex(56, 416);
    vertex(48, 395);
    vertex(39, 400);
    vertex(35, 416);
    vertex(28, 403);
    vertex(25, 419);
    vertex(17, 419);
    vertex(13, 405);
    vertex(5, 399);
    vertex(-2, 421);
    vertex(-2, 485);
    vertex(99, 485);
    endShape();
    popMatrix();
    
    
    
    
    fill(22, 42, 61);
    
    
    //1
    noStroke();
    pushMatrix();
    translate(7, 25);
    beginShape();
    vertex(10, 70);
    vertex(10, 116);
    vertex(32, 148);
    vertex(37, 275);
    vertex(35, 289);
    vertex(50, 303);
    vertex(46, 342);
    vertex(59, 385);
    vertex(40, 411);
    vertex(25, 411);
    vertex(25, 432);
    vertex(19, 428);
    vertex(17, 404);
    vertex(15, 435);
    vertex(12, 436);
    vertex(8, 421);
    vertex(6, 445);
    vertex(4, 445);
    vertex(2, 433);
    vertex(0, 451);
    vertex(-7, 459);
    vertex(-36, 461);
    vertex(-36, 493);
    vertex(265, 468);
    vertex(261, 426);
    vertex(215, 416);
    vertex(208, 410);
    vertex(205, 390);
    vertex(204, 407);
    vertex(200, 404);
    vertex(198, 382);
    vertex(197, 402);
    vertex(190, 394);
    vertex(186, 350);
    vertex(180, 385);
    vertex(175, 380);
    vertex(174, 368);
    vertex(172, 380);
    vertex(160, 368);
    vertex(145, 310);
    vertex(155, 250);
    vertex(166, 228);
    vertex(166, 200);
    vertex(175, 200);
    vertex(176, 212);
    vertex(178, 200);
    vertex(181, 200);
    vertex(185, 229);
    vertex(188, 200);
    vertex(190, 200);
    vertex(190, 175);
    vertex(195, 175);
    vertex(197, 190);
    vertex(199, 175);
    vertex(202, 175);
    vertex(202, 149);
    vertex(211, 142);
    vertex(243, 68);
    endShape();
    
    popMatrix();
    
    //just remember Link made this whole function lol
    
    //2
    pushMatrix();
    translate(598, 615);
    scale(-1, -1.1);
    beginShape();
    vertex(10, 70);
    vertex(10, 116);
    vertex(32, 148);
    vertex(37, 275);
    vertex(35, 289);
    vertex(50, 303);
    vertex(46, 342);
    vertex(59, 385);
    vertex(40, 411);
    vertex(25, 411);
    vertex(25, 432);
    vertex(19, 428);
    vertex(17, 404);
    vertex(15, 435);
    vertex(12, 436);
    vertex(8, 421);
    vertex(6, 445);
    vertex(4, 445);
    vertex(2, 433);
    vertex(0, 451);
    vertex(-7, 459);
    vertex(-36, 461);
    vertex(-36, 493);
    vertex(265, 468);
    vertex(261, 426);
    vertex(215, 416);
    vertex(208, 410);
    vertex(205, 390);
    vertex(204, 407);
    vertex(200, 404);
    vertex(198, 382);
    vertex(197, 402);
    vertex(190, 394);
    vertex(186, 350);
    vertex(180, 385);
    vertex(175, 380);
    vertex(174, 368);
    vertex(172, 380);
    vertex(160, 368);
    vertex(145, 310);
    vertex(155, 250);
    vertex(166, 228);
    vertex(166, 200);
    vertex(175, 200);
    vertex(176, 212);
    vertex(178, 200);
    vertex(181, 200);
    vertex(185, 229);
    vertex(188, 200);
    vertex(190, 200);
    vertex(190, 175);
    vertex(195, 175);
    vertex(197, 190);
    vertex(199, 175);
    vertex(202, 175);
    vertex(202, 149);
    vertex(211, 142);
    vertex(243, 68);
    endShape();
    
    popMatrix();
    

    //top
    fill(0, 0, 0);
    beginShape();
    vertex(0, 500);
    vertex(30, 490);
    vertex(65, 510);
    vertex(107, 485);
    vertex(207, 485);
    vertex(222, 496);
    vertex(257, 475);
    vertex(268, 440);
    vertex(285, 422);
    vertex(297, 455);
    vertex(322, 495);
    vertex(345, 450);
    vertex(370, 460);
    vertex(379, 500);
    vertex(425, 485);
    vertex(477, 485);
    vertex(497, 500);
    vertex(511, 485);
    vertex(511, 460);
    vertex(526, 446);
    vertex(538, 472);
    vertex(551, 492);
    vertex(607, 484);
    vertex(607, 600);
    vertex(0, 600);
    endShape();
    
    
    
    //bottom
    pushMatrix();
    translate(600, 600);
    scale(-1, -1.0);
        beginShape();
    vertex(0, 500);
    vertex(30, 490);
    vertex(65, 510);
    vertex(107, 485);
    vertex(207, 485);
    vertex(222, 496);
    vertex(257, 475);
    vertex(268, 440);
    vertex(285, 422);
    vertex(297, 455);
    vertex(322, 495);
    vertex(345, 450);
    vertex(370, 460);
    vertex(379, 500);
    vertex(425, 485);
    vertex(477, 485);
    vertex(497, 500);
    vertex(511, 485);
    vertex(511, 460);
    vertex(526, 446);
    vertex(538, 472);
    vertex(551, 492);
    vertex(607, 484);
    vertex(607, 600);
    vertex(0, 600);
    endShape();
    
    
    
    
    popMatrix();
    
    
    fill(32, 49, 66);
    //noFill();
    //stroke(0, 0, 0);
  
}; //Link



//Pre-Graphic Functions
function FireFists(x, y, s) {
    fill(255, 255, 255);
    pushMatrix();
    translate(x, y);
    scale(s);
    noStroke();
    translate(-200, -200);
    beginShape();
    vertex(155, 198);
    bezierVertex(147, 203, 130, 208, 104, 219);
    bezierVertex(110, 217, 136, 212, 157, 205);
    endShape(CLOSE);
    beginShape();
    vertex(193, 188);
    bezierVertex(201, 183, 219, 171, 232, 158);
    bezierVertex(227, 121, 240, 127, 253, 119);
    bezierVertex(261, 122, 268, 125, 274, 130);
    bezierVertex(269, 128, 265, 127, 260, 124);
    bezierVertex(258, 126, 255, 128, 253, 131);
    bezierVertex(252, 128, 252, 125, 253, 124);
    bezierVertex(246, 126, 236, 132, 239, 134);
    bezierVertex(236, 145, 235, 156, 235, 163);
    bezierVertex(216, 181, 211, 185, 206, 187);
    endShape();
    
    
    beginShape();
    vertex(223, 191);
    bezierVertex(223, 191, 236, 180, 241, 175);
    bezierVertex(243, 177, 240, 180, 227, 193);
    endShape(CLOSE);
    
    
    beginShape();
    vertex(256, 145);
    bezierVertex(256, 145, 260, 151, 261, 155);
    bezierVertex(259, 154, 258, 153, 258, 156);
    bezierVertex(260, 158, 259, 161, 260, 162);
    bezierVertex(262, 162, 266, 158, 261, 149);
    endShape(CLOSE);
    
    
    beginShape();
    vertex(263, 130);
    bezierVertex(263, 130, 266, 129, 268, 131);
    bezierVertex(268, 133, 268, 135, 267, 136);
    bezierVertex(270, 135, 271, 133, 271, 131);
    bezierVertex(270, 129, 266, 127, 263, 127);
    endShape(CLOSE);
    
    beginShape();
    vertex(259, 119);
    bezierVertex(259, 119, 261, 120, 263, 122);
    bezierVertex(268, 120, 276, 115, 268, 123);
    bezierVertex(272, 121, 274, 119, 277, 124);
    bezierVertex(279, 124, 277, 121, 277, 120);
    bezierVertex(279, 122, 280, 123, 281, 125);
    bezierVertex(282, 120, 278, 116, 277, 115);
    bezierVertex(272, 114, 267, 115, 261, 117);
    endShape(CLOSE);
    
    beginShape();
    vertex(274, 136);
    bezierVertex(274, 136, 276, 138, 278, 141);
    bezierVertex(279, 139, 278, 136, 279, 134);
    bezierVertex(282, 131, 285, 128, 286, 133);
    bezierVertex(286, 134, 287, 136, 288, 136);
    bezierVertex(288, 133, 288, 132, 287, 129);
    bezierVertex(288, 130, 290, 133, 291, 137);
    bezierVertex(292, 134, 294, 126, 284, 124);
    bezierVertex(282, 125, 281, 132, 274, 133);
    endShape();
    
    beginShape();
    vertex(269, 150);
    bezierVertex(269, 150, 286, 143, 293, 137);
    bezierVertex(296, 139, 300, 141, 297, 150);
    bezierVertex(297, 146, 295, 144, 295, 142);
    bezierVertex(295, 146, 295, 147, 293, 145);
    bezierVertex(292, 144, 291, 143, 285, 147);
    bezierVertex(285, 150, 287, 152, 286, 155);
    bezierVertex(284, 153, 283, 150, 282, 148);
    bezierVertex(277, 150, 274, 152, 270, 151);
    endShape(CLOSE);
    
    beginShape();
    vertex(278, 161);
    bezierVertex(278, 161, 287, 157, 297, 150);
    bezierVertex(301, 151, 305, 155, 299, 163);
    bezierVertex(299, 159, 299, 157, 299, 154);
    bezierVertex(297, 158, 297, 159, 297, 158);
    bezierVertex(296, 155, 295, 156, 290, 159);
    bezierVertex(291, 160, 291, 163, 291, 164);
    bezierVertex(289, 162, 288, 160, 287, 159);
    bezierVertex(283, 160, 282, 161, 280, 161);
    endShape();
    
    beginShape();
    vertex(190, 244);
    bezierVertex(190, 244, 169, 268, 133, 284);
    bezierVertex(147, 288, 187, 254, 193, 248);
    endShape();
    
    beginShape();
    vertex(251, 133);
    bezierVertex(251, 133, 258, 138, 265, 138);
    bezierVertex(270, 140, 275, 130, 273, 137);
    bezierVertex(270, 140, 265, 145, 251, 135);
    endShape();
    
    beginShape();
    vertex(240, 139);
    bezierVertex(240, 139, 246, 141, 254, 140);
    bezierVertex(251, 142, 248, 147, 238, 143);
    endShape();
    
    beginShape();
    vertex(262, 142);
    bezierVertex(262, 142, 264, 146, 266, 147);
    bezierVertex(272, 147, 276, 145, 280, 145);
    bezierVertex(276, 147, 270, 151, 265, 149);
    bezierVertex(262, 147, 261, 145, 260, 144);
    endShape(CLOSE);
    
    beginShape();
    vertex(238, 164);
    bezierVertex(238, 164, 252, 175, 261, 164);
    bezierVertex(263, 167, 248, 180, 238, 166);
    endShape();
    
    beginShape();
    vertex(246, 174);
    bezierVertex(246, 174, 256, 183, 266, 184);
    bezierVertex(272, 183, 274, 181, 276, 178);
    bezierVertex(278, 179, 284, 178, 295, 168);
    bezierVertex(289, 175, 279, 182, 270, 187);
    bezierVertex(265, 187, 263, 187, 254, 194);
    bezierVertex(249, 198, 247, 199, 242, 197);
    bezierVertex(247, 193, 253, 188, 256, 185);
    bezierVertex(250, 180, 249, 179, 248, 177);
    endShape();
    
    beginShape();
    vertex(268, 163);
    bezierVertex(268, 163, 263, 169, 269, 179);
    bezierVertex(268, 164, 266, 170, 268, 172);
    endShape();
    
    
    beginShape();
    vertex(246, 181);
    bezierVertex(246, 181, 236, 191, 231, 194);
    bezierVertex(233, 195, 236, 196, 249, 183);
    endShape();
    
    beginShape();
    vertex(292, 166);
    bezierVertex(292, 166, 288, 167, 284, 168);
    bezierVertex(281, 167, 277, 166, 276, 163);
    bezierVertex(275, 164, 276, 167, 279, 170);
    bezierVertex(281, 170, 285, 170, 291, 167);
    endShape(CLOSE);
    beginShape();
    vertex(283, 156);
    bezierVertex(283, 156, 278, 158, 274, 158);
    bezierVertex(270, 157, 269, 154, 268, 154);
    bezierVertex(268, 157, 269, 160, 275, 160);
    bezierVertex(278, 159, 281, 159, 282, 157);
    endShape();
    
    beginShape();
    vertex(291, 219);
    bezierVertex(291, 219, 231, 208, 206, 197);
    bezierVertex(178, 184, 168, 168, 161, 164);
    bezierVertex(161, 145, 158, 131, 153, 124);
    bezierVertex(159, 127, 164, 135, 165, 160);
    bezierVertex(189, 181, 205, 191, 224, 196);
    bezierVertex(254, 206, 274, 212, 285, 216);
    endShape();
    
    
    beginShape();
    vertex(159, 139);
    bezierVertex(159, 139, 142, 101, 126, 124);
    bezierVertex(130, 118, 147, 119, 156, 138);
    endShape(CLOSE);
    
    beginShape();
    vertex(118, 124);
    bezierVertex(118, 124, 125, 114, 134, 119);
    bezierVertex(145, 117, 129, 112, 123, 115);
    bezierVertex(120, 117, 118, 119, 118, 122);
    endShape(CLOSE);
    
    beginShape();
    vertex(111, 139);
    bezierVertex(111, 139, 111, 132, 117, 129);
    bezierVertex(115, 131, 115, 134, 115, 136);
    bezierVertex(117, 132, 119, 131, 123, 129);
    bezierVertex(121, 127, 119, 126, 118, 125);
    bezierVertex(112, 126, 108, 131, 109, 139);
    endShape(CLOSE);
    
    //   fill(207, 124, 0);
    beginShape();
    vertex(103, 151);
    bezierVertex(103, 151, 106, 146, 108, 143);
    bezierVertex(108, 145, 106, 147, 107, 149);
    bezierVertex(108, 147, 111, 144, 112, 144);
    bezierVertex(111, 141, 108, 140, 104, 143);
    bezierVertex(103, 146, 102, 148, 103, 152);
    bezierVertex(104, 152, 102, 152, 99, 153);
    bezierVertex(98, 156, 98, 160, 99, 165);
    bezierVertex(100, 164, 100, 160, 101, 156);
    bezierVertex(101, 158, 102, 159, 103, 157);
    bezierVertex(103, 156, 105, 155, 105, 154);
    endShape(CLOSE);
    
    
    
    beginShape();
    vertex(102, 164);
    bezierVertex(102, 164, 104, 174, 130, 180);
    bezierVertex(124, 180, 127, 182, 134, 184);
    bezierVertex(149, 193, 165, 206, 188, 228);
    bezierVertex(224, 259, 248, 277, 263, 284);
    bezierVertex(260, 285, 245, 283, 216, 260);
    bezierVertex(159, 208, 149, 198, 135, 190);
    bezierVertex(109, 181, 103, 171, 102, 167);
    endShape();
    
    beginShape();
    vertex(126, 126);
    bezierVertex(126, 126, 126, 131, 132, 132);
    bezierVertex(129, 128, 128, 126, 129, 125);
    endShape();
    
    beginShape();
    vertex(115, 137);
    bezierVertex(115, 137, 114, 141, 119, 143);
    bezierVertex(119, 140, 117, 138, 116, 136);
    endShape();
    
    beginShape();
    vertex(107, 149);
    bezierVertex(107, 149, 107, 153, 111, 154);
    bezierVertex(110, 152, 109, 151, 108, 150);
    endShape();
    popMatrix();
}

function Logos(x, y, s, s1, rot, color) {
    //Regulates size, position, color and all that stuff
    pushMatrix();
        translate(width / 2 + x, height / 2 + y);
        scale(width / 530 + s, height / 530 + s1);
        rotate(rot);
        FireFists(0, 0, 1);
    popMatrix();
} //drawing of the logo   

var pointsGrabbed = []; //What I have Grabbed for the Logo (image wise). 


//A shuriken is a throwing object used by ninjas
function Shuriken(x,y,s,r){
    pushMatrix();
        translate(x,y);
        scale(s/300);
        rotate(r);
        translate(-200,-200);
        noStroke();
        
        //Middle part
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
        
        //Circle in center
        fill(161, 161, 161);
        beginShape();
            vertex(200, 178);
            bezierVertex(200, 178, 230, 180, 216, 208);
            bezierVertex(205, 219, 189, 217, 183, 198);
            bezierVertex(184, 184, 190, 182, 196, 179);
        endShape(CLOSE);
        
        //Shadows
        fill(135, 135, 135);
        beginShape();
            vertex(201, 61);vertex(187, 104);vertex(181, 123);vertex(189, 126);vertex(202, 84);
        endShape(CLOSE);
        
        fill(201, 201, 201);
        beginShape();
            vertex(201, 62);vertex(222, 122);vertex(215, 128);vertex(202, 84);
        endShape(CLOSE);
        
        fill(196, 196, 196);
        beginShape();
            vertex(255, 142);vertex(319, 129);vertex(299, 141);vertex(255, 151);
        endShape(CLOSE);
        
        fill(105, 105, 105);
        beginShape();
            vertex(297, 142);vertex(268, 173);vertex(275, 178);vertex(319, 128);
        endShape(CLOSE);
        
        fill(191, 191, 191);
        beginShape();
            vertex(275, 215);vertex(318, 264);vertex(297, 252);vertex(268, 219);
        endShape(CLOSE);
        
        fill(102, 102, 102);
        beginShape();
            vertex(253, 242);vertex(296, 251);vertex(318, 264);vertex(253, 250);
        endShape(CLOSE);
        
        fill(99, 99, 99);
        beginShape();
            vertex(215, 265);vertex(201, 308);vertex(202, 331);vertex(223, 269);
        endShape(CLOSE);
        
        fill(207, 207, 207);
        beginShape();
            vertex(188, 264);vertex(201, 307);vertex(202, 332);vertex(181, 269);
        endShape(CLOSE);
        fill(120, 120, 120);
        
        beginShape();
            vertex(106, 252);vertex(149, 242);vertex(149, 251);vertex(85, 264);
        endShape(CLOSE);
        fill(207, 207, 207);
        
        beginShape();
            vertex(128, 215);vertex(85, 264);vertex(106, 251);vertex(136, 218);
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

//beautiful Coins
function DaCoins(){
    
    pushMatrix();
        translate(40,40);
        
                noStroke();
                //Glowin on the behind side
                for( var i = 0;i<18;i+=2){
                    fill(255, 241, 194,10);
                    ellipse(0,0,55+i,54+i);
                }
                
                //Coin
                stroke(255, 203, 48);
                fill(255, 190, 79);
                strokeWeight(6);
                ellipse(0,0,50,50);
                
                //Symbols
                fill(255, 224, 122);
                noStroke();
                rectMode(CENTER);
                rect(-10,0,5,20,10);
                rect(10,0,5,20,10);
                
                rect(0,-10,8,5,10);
                rect(0,10,8,5,10);
                rect(0,0,21,5,10);
                
                for( var i = 0;i<20;i++){
                    fill(255, 241, 194,10);
                    ellipse(0,0,35+i,34+i);
                }//Glowin on the fron side
                
                rectMode(CORNER);        
        
    popMatrix();
}

function DaKey(x,y,s){
    pushMatrix();
        translate(x,y);  
        scale(s);
        translate(-200,-200);
                    
        stroke(0, 0, 0);
        strokeWeight(1);
        
        rect(198,82,12,140,10);
                    
        noStroke();
        for(var i = 0;i<8;i++){
            var A = sin(i)*40;
                        
                fill(0, 0, 0);
                        
                rect(179+A,87+i*6,19,6); 
                
                fill(255, 192, 82);
                rect(180+A,87+i*6,17,6); 
        }
                    
        stroke(0, 0, 0);
        rect(198,82,12,140,10);
                
        ellipse(205,219,18,5);
        ellipse(205,241,20,20);
        ellipse(205,227,18,18);
            
                
        noFill();
        strokeWeight(10);
        stroke(0, 0, 0);
        ellipse(205,270,50,50);
        ellipse(205,270,45,45);
        stroke(255, 192, 82);
        ellipse(205,270,47,47);
                    
        for(var i = 0;i<23;i++){
            noStroke();
            fill(255, 160, 64,5);
            rect(198-i/4,82,12+i/2,133+i,10);
            stroke(255, 160, 64,5);
            noFill();
            ellipse(205,269,38+i,41+i);
        }    
    
    
    popMatrix();
}

function DaMeat(x,y,s){
    pushMatrix();
        translate(x,y);
        scale(s);
        noStroke();
        fill(255, 236, 201);
        rect(-5,44,10,35);
        ellipse(-5,78,15,15);
        ellipse(4,78,15,15);
        
        fill(242, 29, 65);
        rect(-31,-11,62,68,30);  
        
        fill(255, 92, 119);
        ellipse(0,0,50,25);
        
        fill(255, 255, 255,60);
        ellipse(-19,37,10,10);
        ellipse(-3,37,10,10);
        ellipse(-10,47,10,10);
        
        fill(255, 236, 201);
        rect(-5,-35,10,35);
        ellipse(-5,-36,15,15);
        ellipse(4,-36,15,15);
            
        fill(255, 92, 119);
        ellipse(-3,1,12,9);
        ellipse(5,-3,12,9);  
    popMatrix();
}

//This is supposed to be pixel art but without bitmaps (will be changed later)
function DirtBlock(grass,amnt){
    pushMatrix();
        scale(2);
    noStroke();
    fill(33, 14, 0);
    rect(0,0,100,100);

    fill(20, 8, 0);
    ellipse(19,39,30,30);
    ellipse(51,75,30,30);
    ellipse(19,74,10,10);
    ellipse(69,39,20,20);
    ellipse(88,63,20,20);
    
    if(grass){   
        fill(0, 0, 0,60);
        pushMatrix();
            translate(0,5);
            beginShape();
                vertex(-6, 17);
                bezierVertex(-6, 17, 5, 30, 15, 29);
                bezierVertex(19, 26, 20, 29, 24, 34);
                bezierVertex(33, 24, 33, 25, 34, 29);
                bezierVertex(44, 18, 45, 33, 50, 29);
                bezierVertex(59, 27, 59, 32, 66, 23);
                bezierVertex(66, 24, 67, 31, 71, 24);
                bezierVertex(74, 18, 74, 26, 79, 20);
                bezierVertex(82, 22, 84, 24, 86, 26);
                bezierVertex(94, 15, 95, 21, 107, 13);
                bezierVertex(109, -3, 107, -22, 105, -23);
                bezierVertex(21, -23, 17, -19, -20, -15);
                bezierVertex(-20, -11, -22, 2, -23, 4);
            endShape();
        popMatrix();
    
        fill(0, 31, 4);
        beginShape();
            vertex(-6, 17);
            bezierVertex(-6, 17, 5, 30, 15, 29);
            bezierVertex(19, 26, 20, 29, 24, 34);
            bezierVertex(33, 24, 33, 25, 34, 29);
            bezierVertex(44, 18, 45, 33, 50, 29);
            bezierVertex(59, 27, 59, 32, 66, 23);
            bezierVertex(66, 24, 67, 31, 71, 24);
            bezierVertex(74, 18, 74, 26, 79, 20);
            bezierVertex(82, 22, 84, 24, 86, 26);
            bezierVertex(94, 15, 95, 21, 107, 13);
            bezierVertex(109, -3, 107, -22, 105, -23);
            bezierVertex(21, -23, 17, -19, -20, -15);
            bezierVertex(-20, -11, -22, 2, -23, 4);
        endShape();
    }
    popMatrix();
}

function CaveBlock(Stone){
    pushMatrix();
        scale(2);
    noStroke();
    fill(13, 13, 13);
    rect(0,0,100,100);

    fill(23, 23, 23);
    rect(6,24,30,30);
    rect(51,63,30,30);
    rect(22,82,10,10);
    rect(60,22,20,20);
    rect(90,63,20,20);
    rect(-10,63,20,20);
    
    rect(90,27,10,10);
    rect(0,27,10,10);
    if(Stone){   
        fill(0, 0, 0);
        for(var i = 0;i<20;i++){
            rect(i*5,0,5,round(random(10,40)));
        }
        rect(0,0,5,40);
        rect(95,0,5,40);
    }
    popMatrix();
}

function CastleBlock(Stone){
    pushMatrix();
        scale(2);
    noStroke();
    fill(79, 79, 79);
    rect(0,0,100,100);

    fill(66, 66, 66);
    rect(18,24,30,30,10);
    rect(53,24,30,30,10);
    rect(87,24,30,30,10);
    rect(32,59,30,30,10);
    rect(76,59,30,30,10);
    rect(-15,59,30,30,10);
    rect(-17,24,30,30,10);
    rect(4,-9,30,30,10);
    rect(39,-9,30,30,10);
    rect(73,-9,30,30,10);
    
    rect(4,92,30,30,10);
    rect(39,92,30,30,10);
    rect(73,92,30,30,10);
    if(Stone){   
        fill(135, 16, 16);
        for(var i = 0;i<20;i++){
            rect(i*5,0,5,round(random(18,35)),9);
        }
        rect(0,0,5,20,17);
        rect(95,0,5,20,17);
        
        fill(105, 0, 0);
        for(var i = 0;i<49;i++){
            rect(i*2-1,0,5,round(random(3,27)),5);
        }
    }
    popMatrix();
}

function tree_landscape(x,y,s1,s2,r){
    pushMatrix();
        translate(x,y);
        rotate(r);
        scale(s1,s2);
        translate(-300,-300);//Shift -300 to make Center of object the point of scaling
        //Tree vv
        beginShape();
            vertex(291, 487);
            bezierVertex(291, 487, 293, 478, 295, 467);
            bezierVertex(292, 463, 288, 465, 286, 470);
            bezierVertex(283, 473, 283, 471, 282, 468);
            bezierVertex(280, 475, 277, 477, 274, 476);
            bezierVertex(272, 478, 270, 481, 264, 480);
            bezierVertex(262, 478, 260, 477, 257, 481);
            bezierVertex(250, 477, 248, 479, 246, 481);
            bezierVertex(241, 478, 235, 472, 241, 469);
            bezierVertex(233, 467, 231, 462, 225, 463);
            bezierVertex(218, 463, 219, 458, 214, 458);
            bezierVertex(211, 460, 215, 455, 218, 452);
            bezierVertex(214, 452, 219, 449, 222, 447);
            bezierVertex(228, 446, 238, 446, 245, 443);
            bezierVertex(244, 440, 241, 440, 237, 442);
            bezierVertex(233, 440, 230, 442, 223, 438);
            bezierVertex(218, 433, 215, 433, 211, 430);
            bezierVertex(220, 428, 217, 425, 228, 424);
            bezierVertex(236, 424, 241, 425, 236, 421);
            bezierVertex(230, 420, 231, 415, 225, 415);
            bezierVertex(221, 412, 226, 409, 233, 408);
            bezierVertex(232, 402, 225, 401, 223, 403);
            bezierVertex(219, 397, 220, 393, 217, 390);
            bezierVertex(210, 388, 212, 386, 221, 384);
            bezierVertex(221, 385, 225, 385, 232, 384);
            bezierVertex(241, 383, 248, 383, 255, 378);
            bezierVertex(251, 375, 246, 373, 235, 370);
            bezierVertex(231, 365, 233, 363, 226, 361);
            bezierVertex(227, 359, 233, 358, 240, 359);
            bezierVertex(243, 358, 246, 358, 254, 358);
            bezierVertex(260, 357, 268, 353, 264, 352);
            bezierVertex(252, 348, 242, 345, 237, 344);
            bezierVertex(239, 342, 229, 340, 232, 337);
            bezierVertex(227, 334, 226, 331, 234, 330);
            bezierVertex(248, 331, 260, 329, 264, 327);
            bezierVertex(249, 324, 263, 321, 271, 319);
            bezierVertex(274, 317, 274, 314, 268, 314);
            bezierVertex(267, 317, 260, 318, 255, 317);
            bezierVertex(253, 316, 250, 317, 248, 315);
            bezierVertex(242, 317, 243, 313, 237, 311);
            bezierVertex(234, 307, 237, 304, 243, 303);
            bezierVertex(253, 299, 262, 296, 264, 291);
            bezierVertex(268, 289, 268, 286, 260, 288);
            bezierVertex(258, 291, 250, 286, 249, 283);
            bezierVertex(242, 288, 241, 281, 244, 278);
            bezierVertex(248, 278, 253, 277, 258, 278);
            bezierVertex(262, 276, 255, 270, 251, 269);
            bezierVertex(247, 266, 246, 261, 254, 260);
            bezierVertex(259, 260, 265, 259, 269, 259);
            bezierVertex(273, 258, 264, 247, 260, 246);
            bezierVertex(254, 244, 251, 245, 243, 234);
            bezierVertex(251, 236, 253, 235, 252, 231);
            bezierVertex(257, 229, 256, 241, 259, 228);
            bezierVertex(280, 227, 259, 227, 257, 218);
            bezierVertex(257, 213, 256, 213, 261, 212);
            bezierVertex(265, 207, 272, 216, 270, 207);
            bezierVertex(279, 217, 287, 208, 283, 203);
            bezierVertex(278, 205, 277, 206, 275, 201);
            bezierVertex(280, 199, 270, 203, 268, 203);
            bezierVertex(266, 202, 262, 199, 262, 197);
            bezierVertex(263, 196, 260, 196, 253, 192);
            bezierVertex(254, 190, 260, 187, 262, 184);
            bezierVertex(273, 190, 277, 191, 284, 191);
            bezierVertex(295, 192, 295, 189, 294, 187);
            bezierVertex(291, 189, 286, 189, 280, 185);
            bezierVertex(287, 183, 274, 181, 270, 182);
            bezierVertex(269, 179, 275, 175, 272, 172);
            bezierVertex(267, 169, 272, 168, 268, 163);
            bezierVertex(269, 160, 275, 161, 278, 164);
            bezierVertex(282, 164, 286, 164, 283, 161);
            bezierVertex(282, 159, 285, 158, 286, 159);
            bezierVertex(287, 157, 287, 154, 284, 154);
            bezierVertex(279, 153, 280, 150, 283, 148);
            bezierVertex(280, 143, 280, 138, 284, 143);
            bezierVertex(286, 141, 288, 139, 289, 142);
            bezierVertex(290, 147, 291, 150, 293, 150);
            bezierVertex(292, 146, 292, 140, 286, 132);
            bezierVertex(288, 129, 291, 132, 293, 134);
            bezierVertex(294, 129, 294, 122, 295, 121);
            bezierVertex(297, 123, 297, 128, 298, 131);
            bezierVertex(300, 130, 302, 128, 305, 128);
            bezierVertex(302, 133, 299, 138, 297, 142);
            bezierVertex(297, 146, 299, 147, 301, 142);
            bezierVertex(304, 139, 308, 142, 311, 137);
            bezierVertex(313, 138, 310, 141, 311, 145);
            bezierVertex(314, 146, 310, 148, 305, 148);
            bezierVertex(308, 151, 307, 154, 300, 155);
            bezierVertex(300, 157, 304, 161, 310, 158);
            bezierVertex(315, 157, 317, 154, 320, 154);
            bezierVertex(319, 158, 317, 161, 324, 162);
            bezierVertex(322, 165, 319, 167, 323, 171);
            bezierVertex(324, 174, 318, 177, 313, 176);
            bezierVertex(315, 180, 320, 181, 317, 184);
            bezierVertex(313, 189, 317, 190, 320, 188);
            bezierVertex(323, 193, 330, 197, 333, 199);
            bezierVertex(328, 202, 323, 201, 323, 204);
            bezierVertex(318, 202, 316, 200, 311, 200);
            bezierVertex(312, 204, 314, 206, 321, 206);
            bezierVertex(325, 209, 329, 210, 330, 213);
            bezierVertex(335, 212, 341, 212, 345, 215);
            bezierVertex(341, 218, 339, 222, 337, 224);
            bezierVertex(334, 222, 330, 223, 332, 228);
            bezierVertex(326, 223, 323, 228, 319, 229);
            bezierVertex(315, 225, 309, 226, 312, 230);
            bezierVertex(316, 232, 325, 236, 331, 234);
            bezierVertex(335, 230, 337, 234, 343, 234);
            bezierVertex(347, 234, 350, 235, 344, 238);
            bezierVertex(344, 243, 339, 239, 338, 242);
            bezierVertex(336, 248, 333, 248, 332, 251);
            bezierVertex(326, 249, 324, 251, 320, 249);
            bezierVertex(313, 249, 309, 250, 314, 254);
            bezierVertex(322, 259, 330, 259, 335, 257);
            bezierVertex(338, 258, 336, 261, 346, 260);
            bezierVertex(351, 261, 354, 265, 349, 271);
            bezierVertex(346, 279, 340, 280, 337, 282);
            bezierVertex(327, 279, 322, 280, 320, 281);
            bezierVertex(324, 286, 330, 287, 343, 286);
            bezierVertex(346, 286, 347, 288, 345, 291);
            bezierVertex(352, 289, 359, 290, 361, 294);
            bezierVertex(357, 300, 351, 303, 345, 304);
            bezierVertex(348, 308, 346, 311, 340, 311);
            bezierVertex(337, 310, 334, 311, 333, 313);
            bezierVertex(338, 314, 348, 315, 358, 315);
            bezierVertex(358, 320, 355, 320, 352, 320);
            bezierVertex(357, 325, 359, 327, 350, 324);
            bezierVertex(351, 329, 359, 331, 369, 327);
            bezierVertex(373, 327, 367, 333, 368, 337);
            bezierVertex(366, 340, 361, 338, 359, 342);
            bezierVertex(352, 341, 349, 343, 358, 346);
            bezierVertex(366, 346, 374, 348, 379, 346);
            bezierVertex(385, 347, 379, 352, 370, 356);
            bezierVertex(377, 359, 371, 361, 367, 362);
            bezierVertex(362, 363, 357, 364, 368, 367);
            bezierVertex(377, 369, 377, 373, 391, 371);
            bezierVertex(393, 371, 387, 376, 390, 381);
            bezierVertex(384, 383, 376, 387, 368, 389);
            bezierVertex(359, 392, 351, 390, 343, 390);
            bezierVertex(349, 398, 363, 401, 374, 402);
            bezierVertex(381, 403, 389, 404, 385, 404);
            bezierVertex(395, 398, 387, 409, 380, 409);
            bezierVertex(388, 414, 383, 414, 371, 415);
            bezierVertex(371, 423, 367, 423, 366, 418);
            bezierVertex(361, 422, 355, 424, 348, 420);
            bezierVertex(343, 421, 346, 427, 359, 431);
            bezierVertex(372, 433, 379, 429, 384, 427);
            bezierVertex(381, 434, 387, 433, 395, 431);
            bezierVertex(387, 436, 380, 439, 388, 441);
            bezierVertex(383, 441, 390, 449, 382, 446);
            bezierVertex(382, 450, 378, 452, 384, 458);
            bezierVertex(376, 455, 377, 461, 370, 457);
            bezierVertex(376, 464, 383, 465, 390, 467);
            bezierVertex(385, 470, 382, 470, 385, 475);
            bezierVertex(376, 470, 378, 475, 375, 476);
            bezierVertex(370, 476, 365, 477, 359, 470);
            bezierVertex(360, 478, 356, 478, 353, 476);
            bezierVertex(348, 478, 346, 474, 341, 476);
            bezierVertex(340, 480, 336, 481, 322, 480);
            bezierVertex(317, 477, 315, 474, 311, 471);
            bezierVertex(309, 473, 310, 482, 311, 488);
        endShape(CLOSE);
    popMatrix();    
}//For backdrop

function Temple(x,y,s1,s2,r){
    pushMatrix();
        
        translate(x,y);
        rotate(r);
        scale(s1,s2);
        translate(-200,-200);//Shift in position so that
        beginShape();
            vertex(200, 9);
            bezierVertex(200, 9, 199, 17, 198, 24);
            bezierVertex(197, 26, 197, 31, 197, 35);
            bezierVertex(196, 39, 195, 45, 195, 51);
            bezierVertex(165, 77, 160, 79, 155, 83);
            bezierVertex(160, 88, 164, 90, 165, 91);
            bezierVertex(165, 98, 164, 104, 165, 110);
            bezierVertex(152, 116, 140, 120, 121, 109);
            bezierVertex(132, 121, 140, 127, 163, 131);
            bezierVertex(157, 131, 152, 131, 146, 131);
            bezierVertex(150, 136, 152, 137, 155, 140);
            bezierVertex(156, 147, 156, 159, 155, 166);
            bezierVertex(140, 171, 123, 170, 105, 163);
            bezierVertex(112, 173, 126, 184, 147, 188);
            bezierVertex(145, 189, 140, 189, 137, 189);
            bezierVertex(141, 193, 144, 196, 146, 196);
            bezierVertex(146, 212, 146, 223, 146, 230);
            bezierVertex(126, 239, 106, 233, 92, 226);
            bezierVertex(102, 243, 124, 249, 135, 253);
            bezierVertex(131, 254, 128, 254, 127, 254);
            bezierVertex(130, 258, 134, 260, 137, 263);
            bezierVertex(136, 270, 137, 295, 137, 301);
            bezierVertex(121, 304, 104, 305, 86, 295);
            bezierVertex(90, 304, 105, 315, 130, 323);
            bezierVertex(127, 323, 122, 324, 117, 323);
            bezierVertex(120, 326, 123, 329, 127, 332);
            bezierVertex(127, 369, 127, 378, 127, 391);
            bezierVertex(199, 391, 246, 391, 273, 391);
            bezierVertex(273, 362, 273, 336, 273, 332);
            bezierVertex(277, 328, 279, 327, 282, 323);
            bezierVertex(277, 323, 274, 323, 269, 323);
            bezierVertex(294, 317, 305, 304, 315, 295);
            bezierVertex(296, 302, 283, 307, 263, 301);
            bezierVertex(263, 287, 263, 267, 263, 263);
            bezierVertex(265, 260, 268, 258, 272, 254);
            bezierVertex(269, 254, 266, 253, 264, 253);
            bezierVertex(273, 251, 295, 245, 307, 227);
            bezierVertex(286, 236, 275, 236, 254, 230);
            bezierVertex(254, 204, 254, 200, 254, 197);
            bezierVertex(256, 195, 259, 193, 263, 189);
            bezierVertex(259, 189, 256, 189, 252, 189);
            bezierVertex(270, 185, 284, 176, 295, 164);
            bezierVertex(270, 174, 256, 172, 245, 165);
            bezierVertex(245, 146, 245, 143, 245, 140);
            bezierVertex(249, 137, 251, 135, 255, 131);
            bezierVertex(251, 130, 245, 132, 236, 131);
            bezierVertex(259, 128, 267, 122, 279, 110);
            bezierVertex(258, 119, 243, 113, 236, 110);
            bezierVertex(235, 97, 235, 93, 235, 91);
            bezierVertex(239, 88, 241, 86, 245, 83);
            bezierVertex(225, 68, 211, 56, 205, 52);
            bezierVertex(205, 46, 203, 41, 204, 39);
            bezierVertex(203, 34, 203, 30, 203, 28);
            bezierVertex(203, 24, 202, 21, 201, 13);
        endShape(CLOSE);
    popMatrix();
} //For Backdrop

var clouds = function(height,colors){
    for(var i = 0;i<=width;i+=2){
        for(var b = 0;b<height;b+=2){
            noStroke();
            fill(colors,noise(i/37,b/25,1)*240 - b/(height/167));//The noise basically randomizes the fade in a algorithmic way
            rect(i,b,4,4,20);
        }
    }

}; //For backdrop

//backdrop with customizable colors
var backdrop = function(col1,col2,col3,col4,col5,col6) {
    
    //Gradient Background
    var c1 = col1;
    var c2 = col2;
    for(var i = 0; i < height; i +=6) {
        noStroke();
        fill(lerpColor(c1, c2, i/width));
        rect(0 , i, width, 6);
    }  
    
    //Moon
    fill(col3);
    ellipse(width/2,129,250,250); 
    
    //Glowy Moon
    for(var i = 0; i < 57;i+=2){
        fill(113, 0, 125,3);
        ellipse(width/2,129,250+i,250+i);     
    }
    
    //Clouds
    clouds(98,color(col6));

    
    //Trees
    for(var i = 0;i<width/7;i+=3){
        fill(col4+15);
        tree_landscape(i*random(30,31),367+random(-40,40),random(0.8,1),1,0);
    }
    for(var i = 0;i<width/7;i+=4){
        fill(col4);
        tree_landscape(i*random(30,31),520+random(-140,60),random(0.8,1),1,0);
    }
    for(var i = 0;i<width/7;i+=4){
        fill(col5);
        tree_landscape(i*random(23,53),592+random(-251,-124),random(0.5,1),1,0);
    }


    fill(3, 0, 87);
    //Temples
    Temple(width/5,height/1.7,2,1.5);
    Temple(width/1.3,height/2,1,1);
    
    //Ground
    fill(0, 5, 23);
    ellipse(0,height,width*2,300);
    ellipse(width,height,width*2,300);
    
    fill(0, 2, 41);
    //Temples
    Temple(width/5,height/1.7,2,1.5);
    Temple(width/1.3,height/2,1,1);
    
    //Ground
    fill(0, 5, 23);
    ellipse(0,height+50,width*2,300);
    ellipse(width,height+50,width*2,300);
    
};

function fullText(txt,x,y,s,r,s1,Glow,col1,col2,weight){
    pushMatrix();
            translate(x,y);
            textAlign(CENTER,CENTER);
            scale(1,s1);
            rotate(r);
            textSize(s);
            if(Glow){
                for (var i = 0; i < 360; i += 4) {
                    fill(col2);
                    text(txt, 0+sin(i)*weight, 0+cos(i)*weight);
                }
            }
            fill(col1);
            text(txt,0,0);
    popMatrix();
} //Basically for more functionality

function Cube(txt,x,y,s,txtS,overlay){
    
    var size =47;//Size of cube
    
    pushMatrix();
        translate(x,y);
        scale(s);
        translate(-8,-45);//Offsetting to allow center scaling
        
        //Square blocks
        fill(173, 109, 45);
        stroke(115, 69, 27);  
        quad(0,0,-size,size,0,size*2,size,size);
        quad(size+0,size,0,size*2,0,size*3,size,size*2);
        quad(-size,size,0,size*2,0,size*3,-size,size*2);
    

        //Texts
        fill(41, 15, 0);
        fullText(txt,6,54,22-txtS,-44,1,false,color(41, 15, 0));
        fullText(txt,26,100,10,-33,1.8,false,color(41, 15, 0));
        fullText(txt,-24,103,10,28,1.8,false,color(41, 15, 0));

        //Blocks that cause each side to have a darker color
        fill(0, 0, 0,60);
        noStroke();
        quad(size+0,size,0,size*2,0,size*3,size,size*2);
        fill(0, 0, 0,140);
        quad(-size,size,0,size*2,0,size*3,-size,size*2);   
        
        //Shadow over box when hovered over
        fill(0, 0, 0,overlay);
        quad(0,0,-size,size,0,size*2,size,size);
        quad(size+0,size,0,size*2,0,size*3,size,size*2);
        quad(-size,size,0,size*2,0,size*3,-size,size*2);

    popMatrix();
}//2.5D cube? U dunno. I was going to use it, but i guess i decided not too..

//Wooden box title for the menu
function BoxTitle(x,y,showText,size,size2){
    //The TextFont for the board letters
    textFont(createFont("Arial Bold"));
    textAlign(CENTER,CENTER);
    
    //Color palette
    var color1 = color(108,70,41);
    var color2 = color(173, 110, 52);
    var color3 = color(108,70,41);
    var color4 = color(225,139,57);
    
    
    pushMatrix();
        translate(x,y);
        scale(size,size2);
        translate(-width/2,-height/3);
        rectMode(CENTER);
        
        //Wood
        stroke(color1);
        strokeWeight(10);
        fill(color2);
        rect(width/2,height/3,width/1.2,height/2,20);
    
    
        //The 3 lines going across the wood
        fill(color3);
        for(var i = -width/5;i<width/4;i+=height/5){
            rect(width/2,height/3+i,width/1.24,height/435);
        }
        

        //Lines on wood
        strokeWeight(2);
        noFill();
        bezier(550, 201, 284, 158, 136, 212, 49, 161);
        bezier(550, 141, 284, 158, 136, 212, 49, 109);
        bezier(550, 255, 284, 218, 136, 212, 49, 237);
        bezier(550, 300, 284, 261, 237, 212, 50, 276);
        bezier(550, 316, 223, 266, 136, 285, 49, 314);
        bezier(550, 126, 284, 175, 136, 90, 49, 85);
        bezier(550, 122, 378, 65, 136, 104, 49, 85);
        
        //Star things on the 4 corners
        fill(18, 18, 18);
        Shuriken(88,113,60);
        Shuriken(511,113,60);
        Shuriken(511,286,60);
        Shuriken(88,285,60);
    
        
        
        if(showText){
            textSize(100);
            
            //text
            fill(18, 18, 18);
            fullText("Night",234,128,100,10,1,true,color(18,18,18),color1,3);
            fullText("of the",248,229,47,-6,1,true,color(18,18,18),color1,3);
            fullText("Ninja",367,284,100,-11,1,true,color(18,18,18),color1,3);
        }
    popMatrix();

    rectMode(CORNER);
}

function Star(x,y,s,color){
    pushMatrix();
        translate(x,y);
        scale(s);
        fill(color);
        noStroke();
        translate(-200,-200);
        //Its a star, not much else to say
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

function Button(x,y,offSet,txt){
    noStroke();
    
    fill(110, 67, 22);
    rect(x,y+32,130,25,10);//Shadow (disconected from other stuff to keep it from moving when you hover over it)
    
    pushMatrix();
        translate(x,y+offSet); //Offset is for when you hover over the button, it moves
        
        fill(173, 110, 52);
        rect(0,0,130,50,10);
        
        stroke(108,70,41);
        noFill();
        strokeWeight(2);
        bezier(1,38,123,28,38,43,128,31);
        bezier(1,19,57,28,66,3,129,14);
        bezier(1,9,72,22,38,-6,129,10);
        bezier(1,38,123,56,38,43,129,41);
        bezier(1,28,123,28,38,43,129,19);   
        
        fullText(txt,65,25,40-txt.length*2,0,1,true,color(20, 20, 20),color(108,70,41),1);
        
    popMatrix();
}


//} Art


//{

textAlign(CENTER,CENTER);
textFont(createFont("arial Bold"));

var clicked = false; // Have you clicked
var keys = []; //If you have pressed any keys
var scene = "load"; //load, menu, new,resume,achieve,shop,book,help,levels

var GetRidOfTheAwesomeness = false; //This turns off most of the particles and screen shaking

var cam = {
    x:0, //X position
    y:0, //Yposition
    mx:0, //Random ScreenShake Position
    my:0, //Random ScreenShake Position
    shake:0, //Screen Shaking
    design: "forest",
};
//} Global Variables


//{
function DrawPause(){
    this.x = 550;
    this.y = 20;
    this.s = 40;
    
    this.gameImg = 0; //Image for when you pause the game, just too keep things from looking wonky
    this.YVel = 0; //Y velocity of everything. gets set to 600 when you press the pause button, and then shifts to zero to add a nice effect
    this.ShowPause = false; //If we should show the pause or not
    
    this.glow = 0; //Glowiness of the pause button
    
    this.achievements = 0; //how many achivements you have earned out of 23
    
    this.MeasureAchieve = false; //If we should calculate the number of achievements
}
var dpause = new__.call(DrawPause); //New pause object


function AItems(x,y,type,distance){
    this.distance = distance;
    this.x = x;
    this.y = y;
    this.type = type; //Type of Item: Coin or Object etc..
    this.rot = 0; //Rotation for when you collect them, they spin
    this.s =0.1;//Scaling as well when you collect, they shrink
    this.die = false;//
    this.PushBtn = 0;
    this.AblePartic = false; //if your able to shoot particles
    this.timing = 1;
    this.collecting = false; //CHANGED: latches once collection begins
}
var items = [];

function Transition(scenes){
    //moving variables
    this.x1 = 0;
    this.y1 = 0;
    this.move = 0;
    this.xvel = 0;
    
    this.scene = scenes;//What scene we are going to switch to
    this.die = false;//When everythings done this turns true and then it splices
    this.sceneSwitch = false;
}
var tr = [];

function ButtonCube(x,y,scenes){
    this.x = x;
    this.y = y;
    
    this.scene = scenes;//What scene we are going to pass to the transition so that it can switch
    this.s = 110; //What size it is going to be
    this.expandS = 0;//when hovered over, this increases
} //Button Cube for the buttons on the menu

//Creating the button objects
var NewGame = new__.call(ButtonCube,292,495,"new");
var Book = new__.call(ButtonCube,92,495,"book");
var Achieve = new__.call(ButtonCube,492,496,"achieve");
var Resume = new__.call(ButtonCube,92,395,"resume");
var ResumeGame = new__.call(ButtonCube,width/2,height/6,"resumeGame");
var Shop = new__.call(ButtonCube,width/2,height/2.5,"Shop");
var Thelevels = new__.call(ButtonCube,width/2,height/1.5,"book");
var Help = new__.call(ButtonCube,492,396,"help");
var themenu = new__.call(ButtonCube,292,545,"menu");
var shopResume = new__.call(ButtonCube,292,545,"resume");
var PrintCode = new__.call(ButtonCube,292,395,"print");
var Block = function(x, y, w, h, t){
    this.Py = y;
    this.x = x; //X position
    this.y = y; //Y position
    
    this.px = x; //X position
    this.py = y; //Y position
    
    this.w = w; //Width
    this.h = h; //Height
    this.t = t; //Type
    
    this.die = false;
    this.cageDraw = 0;
    
    this.Chooser = round(random(1,3));
    
};
var Blck = [];//Block array


function Player(x,y){
    this.canMove = false;
    
    this.x = x;
    this.y = y;
    this.r = 0;//Regular Rotation
    this.s = 60;//For collision purposes
    this.w = 60;//For collision purposes
    this.h = 60;//For collision purposes
    this.scale = 1;//Flip flop purposes
    this.scaleY = 1;//Flip flop purposes
    
    this.rot = 0;//Rotation when falling or jumping 
    this.rotSpeed = 14;
    
    this.shootR = 0;//Rotation when shooting
    
    this.HurtTiming = 0; //When you get hurt, red thing will appear in overlay
    
    this.spd = 10; //Max speed that you can reach
    this.jumpAmnt = 20; //Jump pressure
    this.xvel = 0;
    this.yvel = 0;
    this.grav = 0.7;
    
    this.directX = "left";
    this.directY = "up";
    
    this.canJump = false;
    
    this.CoolDown = 0;
    
    this.PowerAmnt = 300;//How far you can dash too
    this.finalPower = 300;//What you actually did before you bumped into something
    this.throwSpd = 14; //How high you can throw your object
    
    this.rightC = false;//If you are colliding on the right
    this.leftC = false;//If you are colliding on the Left
    
    this.WeaponAmnt = 0;// How many weapons you have in stock
    this.MaxWeapons = 0;// MaxWeapons in stock
    this.keys = 0;
    this.bones = 0;
    this.money = 0;
    this.ablePower = false;
    this.SUperSpeed = false;
    this.MaxCooldown = 1.1;
    
    
    this.overlayY = 0;
    
    this.health = 100;
    
    
    this.stat = {
        monster: 0,
        doors: 0,
        upgrade:0,
        bird:0,
        happy:0,
        death:0,
        healthLoss: false,
    };
    
}
var Pro = new__.call(Player,100,-500); //New Player Object


function Dust(x,y,spd,s,type){
    
    this.x = x;
    this.y = y;
    this.s = s;
    
    this.py = y; //Original Y position
    this.px = x; //Original X position
    
    this.rand = random(50,200);
    this.rand2 = random(-50,50);
    
    this.spd = spd; //How fast the dust will fly
    this.fade = 0; //Fading out
    this.type = type; 
}
var Dusts= [];


function Slash(ovx,ovy,x,y,x2,y2,speed1,speed2){
    this.ovx = ovx;
    this.ovy = ovy;
    
    this.x = x;
    this.y = y;
    
    this.x2=  x2;
    this.y2=  y2;
    
    this.px2 = x; //Previous X pos 
    this.py2 = y;   //Previous Y pos 
    
    this.speed1 = speed1;
    this.speed2 = speed2;
    
    this.part2 = false; //True when its time to fade out
    
    this.fade = 255;
} //The slash when you dash and when an enemy explodes
var slashes= [];
var slashes2= [];


function ThrowIt(x,y,angle,spd){
    this.timeout =2;
    this.x = x;
    this.y = y;
    
    this.w = 10;
    this.h = 10;
    
    this.r = 0;
    this.rSpd = random(10,20);
    
    
    this.s = random(20,40);
    this.spd = spd;
    
    this.angle = angle;//Angle of throw
    
    this.grav = 0.3; //Amount of gravity applied to object
    
    this.ySpd = sin(this.angle) * this.spd;//Where it will be thrown based on angle
    
    this.die = false;
}
var shurik = [];


function Poof(x,y,Fadespd,size,xvel,yvel,gravity,fade,colors,sspeed,showGlow,objtype,damage){
    this.damage = damage;
    this.x = x;
    this.y = y;
    this.s = 0;
    this.futS = size;
    this.fade = fade;
    
    this.Color = color(71, 105, 255);
    this.EyeColor = color(71, 105, 255);
    this.OtherColor = color(71, 105, 255);//Nice colors :P    
    
    this.spd = Fadespd;
    this.xvel = xvel;
    this.yvel = yvel;
    this.grav = gravity;
    this.color = colors;
    this.sspeed = sspeed;
    this.showGlow = showGlow;
    this.die = false;

    this.SpawnMore = false;
    
    this.objtype = objtype;

} //Literally every particle
var poofs= [];


function Birdy(x,y,type){
    this.x = x;
    this.y = y;
    
    this.type = type; //Type of bird, easy medium and hard
    
    this.Color = color(71, 105, 255);
    this.EyeColor = color(71, 105, 255);
    this.OtherColor = color(71, 105, 255);//Nice colors :P
    
    this.s = 60; //COllision size
    
    this.grav = random(0.1,0.5); //Random amount of gravity
    this.spd = random(2,6);//Random amount of Move Speed
    this.Bounce = random(10,15);//Random amount of Bounce Speed
    
    this.yvel = 20;
    this.xvel = 0;
    
    this.bounceTime = 0; //When its less than zero it will drop an egg
    
    this.scaleX = 1;
    this.scaling = 0.2;
    
    this.health = 100;
    this.die = false;
    this.prepBird = false;
}
var bird = [];


function Smasher(x,y,types){
    
    this.prep = false; //Prepping it with health 
    this.health = 100; //Amount of health (will change based on enemy)
    
    this.die = false; //Dead yet?
    
    //x and y position
    this.x = x;
    this.y= y;
    
    //Type of creature
    this.type = types;
    
    //Collsions
    this.w = random(70,100);
    this.h = this.w+30;
    
    //Its scale whenever it faces the player its either -1 or 1
    this.scaleX = 0;
    
    //
    this.Smashpart = 0; 
    this.armSmashY = 0;//bang boom bong up and down this goes
    
    this.smashR = 0;//rotation of arms when jumping
    this.jumArms = [0,0];    //His arms when jumping
    
    this.timer = 0; 
    
    this.jumpTime = 0; //When it hits 0 it will jump
    
    this.move = 0; //
    this.canJump = false;

    this.xvel = 0;
    this.yvel = 0;
    this.screenShke = 0;//Amount of screenshake it will give off
    
    //Qualities of enemy
    this.grav =random(0.4,0.8);
    this.jumpAmnt = random(10,20);
    this.spd = random(1,4);
    
    this.colliding = false;// if your colliding with player
    
    //Green enemy shooting variables
    this.shootR = 29; 
    this.shootTme = 0; 
    this.shootPart = 0;
    this.shotX = 0;
    
    //hAppy Enemy
    this.turnedHappy = false;
} //The enemys
var smashy = [];

//} Pre Defined Functions with Arrays


//{
//Notification Code here: Just Copy the whole thing{

textFont(createFont("Calibri Bold"));//curly
function Notification(text,existTime){
    this.x = -5;
    this.y = -80;
    this.speed = 5; //Speed of notification when it starts
    
    this.existTime = existTime; //How long it should exist for
    this.existing = 0; //How long it has existed
    this.text = text; //What the notification should say
    
    this.colorScheme = color(94, 94, 94);
    this.textColor = color(255, 255, 255);
    this.colorOpacity = 0; //Fade of the box and text
    
}
Notification.prototype.style = function(){
    
    fill(this.colorScheme,this.colorOpacity);
    stroke(0,0,0,this.colorOpacity/8);
    strokeWeight(4);
    rect(this.x,this.y,width+10,80); //Text Box
    
    textAlign(CENTER,CENTER);
    textSize(30);
    textFont(createFont("arial Bold Italic"));
    
    
    fill(this.textColor,this.colorOpacity);
    text(this.text,width/2,this.y+55);
};
Notification.prototype.reset = function(){
    this.colorOpacity = 255;
    this.y = -80; //Resetting everything to its origional configuration.
    this.existing = 0;
    this.speed = 5;
};
Notification.prototype.update = function(){
    this.y+=this.speed; // The Y moves with the speed
    this.speed*=0.9;//Shrinking the speed to zero
    
    this.existing+=0.02; //Adding how long its existed. 0.02 is pretty equivilant to 1 second
    
    
    if(this.existing>=this.existTime){
        this.colorOpacity-=12; //Making it fade out when its time is up
    }    
};
var not = new__.call(Notification,"New Achievement Unlocked!",5);
//}
    
    
//}Notification


//{

var img = {
    
    Mists: function(){
        background(0, 0, 0, 0); //makes it transparent
            noStroke();
            
        for(var i = 0; i < 200; i += 1) {
            fill(255, 0, 0, 40);
            ellipse(random(0, 600), random(450, 600), random(3, 31), random(2, 21));
        }
        
            
        for(var i = 0; i < 100; i += 1) {
            fill(130, 130, 130, 40);
            ellipse(random(125, 408), random(185, 240), random(3, 31), random(2, 21));
        }
        
        for(var i = 0; i < 100; i += 1) {
            fill(130, 130, 130, 40);
            ellipse(random(250, 521), random(41, 88), random(3, 31), random(2, 21));
        }
        filter(BLUR,5);
        
        return get(0,0,600,600);
    },
    CastleBackground: function(){
        var c1 = color(74, 0, 0);
        var c2 = color(176, 77, 77);
        for(var i = 0; i < height; i +=6) {
            noStroke();
            fill(lerpColor(c1, c2, i/width));
            rect(0 , i, width, 6);
        }      
        
        tower(-245, 0);
        tower(175, 0);
        
        wall(-2, -75);
        wall(-423, -75);
        wall(418, -75);
        
            wall(-2, 0);
        wall(-423, -0);
        wall(418, 0);
        
        
    
        fill(145, 145, 145);
        ellipse(width/2, 129, 250, 250); 
        
        for(var i = 0; i < 57;i += 1) {
            fill(255, 0, 0, 3);
            ellipse(width/2, 129, 250 + i, 250 + i);     
        }
        
        image(img.Mists,0,0);
        return get(0,0,600,600);
        
    },
    caveBck: function(){
        caveBackground();
        return get(0,0,600,600);
    },
    
    CaveBlck1: function(){
        CaveBlock(true);
        return get(0,0,200,200);
    },
    CaveBlck2: function(){
        CaveBlock(true);
        return get(0,0,200,200);
    },
    CaveBlck3: function(){
        CaveBlock(true);
        return get(0,0,200,200);
    },
    CaveBlck4: function(){
        CaveBlock(false);
        return get(0,0,200,200);
    },
    
    CastleBlock1: function(){
        CastleBlock(true);
        return get(0,0,200,200);
    },
    CastleBlock2: function(){
        CastleBlock(true);
        return get(0,0,200,200);
    },
    CastleBlock3: function(){
        CastleBlock(true);
        return get(0,0,200,200);
    },
    CastleBlock4: function(){
        CastleBlock(false);
        return get(0,0,200,200);
    },
    
    
    
    BCKimg: function() {
        background(0);
        noStroke();
        pushMatrix(); //keep constant stuff outside (esp if we're dealing with a super big loop)
        translate(240, 239);
        fill(36, 34, 36, 4);
        for (var i = 0; i < width * 14; i++) {
            rotate(random(360));
            ellipse(0, random(-width, width), 700, 2);
        }
        popMatrix();
        return get(); //= get(0, 0, width, height)
    },
    texts: function() {
        background(0, 0);
        fill(255, 255, 255);
        noStroke();
        Logos(1, 1, 0, 0, 1, 1, 1, 1);
        
        textAlign(CENTER, CENTER);
        textFont(createFont("Arial Bold Italic"), width / 10);
        fill(255, 255, 255);
        text("Fire Fist Studios", width / 2, height / 1.1);
        return get();
    },
    textures: function() {
        background(255, 196, 33);
        noStroke();
        pushMatrix();
        translate(240, 239);
        fill(255, 115, 0, 43);
        for (var i = 0; i < width * 4; i++) {
            rotate(random(360));
            ellipse(0, random(-width, width), 700, 2);
        }
        popMatrix();
        return get();
    },
    GrabStuff: function() {
        img.textures.mask(img.texts);
        background(255, 255, 255, 0);
        image(img.textures, 0, 0);
        var inc = delagVersion ? 30 : 10;
        for (var x = 0; x <= width; x += inc) {
            for (var y = height / 4; y <= height; y += inc) {
                pointsGrabbed.push({
                    grb: get(x, y, inc, inc),
                    x: x,
                    y: y,
                    offy: x + random(-width * 2, width * 2),
                    offx: y + random(-height * 2, height * 2),
                    offs: 0,
                });
            }
        }
        return get();
    }, 
    dirt: function(){
        DirtBlock(false);//Without Grass
        return get(0,0,200,200);
    },
    grass: function(){
        DirtBlock(true);//With Grass
        return get(0,0,200,200);
    },
    backdrops: function(){
        //Customizable backdrop colors
       backdrop(color(0, 29, 156),color(0, 56, 102),color(0, 48, 181),color(0, 8, 36),color(0, 15, 36),color(0, 22, 74));
        return get(0,0,width,height);
    },
    woodBackground: function(){
        //Drawing the wood backdrop for the menu screens
        background(181, 122, 58);
        noFill();
        stroke(117, 64, 26);
        for(var i = 0; i < 600; i += 20){//Wood Lines
            strokeWeight(2);
            rect(0, i, 600, 40);
            line(300 + sin(i*10)*250, i, 300+ sin(i*10)*250, i + 37);
            strokeWeight(4);
            point(310 + sin(i*10)*250, i + 10);
            point(310 + sin(i*10)*250, i + 30);
        }
        noFill();
        strokeWeight(1);
        stroke(28, 5, 28, 20);
        for(var i = 0; i < 600; i += 8){
            line(0, i, 600, i);
        }
        return get(0,0,width,height);
    },
    coins: function(){
        background(0,0);
        DaCoins();
        return get(0,0,80,80);
    },
};

var load = (function() {
    var t = 0; //timer
    var q = Object.keys(img), l = q.length;
    return function() {
        if (q.length) {
            var cur = q.shift(); //cut out first el
            img[cur] = img[cur]();
        } else { t += 0.03; }
        if (t > 1) { 
            if(Mydebug){
                scene = "menu";
            }
            else{
                scene = "Logo";
            }
        }
        
        //probably should change this to something ninjaish:
        background(0, 0, 0);
        fill(237);
        textSize(width / 10);
        text("Loading", width / 2, height / 2);
        textSize(width / 30);
        text((l-q.length) +"/"+ l, width / 2, height / 1.1);
        
        noStroke();
        rectMode(CORNER);
        fill(232, 60);
        rect(width / 2 - width / 3 - 5, height / 1.2 - 12, width / 1.5 + 10, 24, 10);
        fill(227);
        rect(width / 2 - width / 3, height / 1.2 - 8, ((l-q.length)/l) * width / 1.5, 16, 10);
        
    };
})();

//} Grabbing Images / Loading


//{
var col = function(obj1, obj2){
    return obj1.x + obj1.w > obj2.x && obj1.x < obj2.x + obj2.w && obj1.y + obj1.h > obj2.y && obj1.y < obj2.y + obj2.h;
};//Rectangle to Rectangle Collision

function ctorect(cx, cy, cr, rx, ry, rw, rh) {
    
    var TsX = cx;
    var TsY = cy;

    if (cx < rx) {
        TsX = rx;
    } else
    if (cx > rx + rw) {
        TsX = rx + rw;
    }
    if (cy < ry) {
        TsY = ry;
    } else
    if (cy > ry + rh) {
        TsY = ry + rh;
    }

    var distX = cx - TsX;
    var distY = cy - TsY;
    var distance = sqrt((distX * distX) + (distY * distY));

    return (distance <= cr / 2);//Returns the result either true or false

} //Circle to Rectange Collision
//} Collisions


//{
mouseClicked = function(){
    clicked = true; //Making the Clicking true. (clicking will turn false because in draw function, click is set to false)
};
keyPressed = function() {
    keys[keyCode] = keys[key] = true;//Making whatever key you have pressed equal to true
};
keyReleased = function() {
    keys[keyCode] = keys[key] = false;//Making whatever key you have released equal to false
};
//} Clicking and Key Pressing


//{
Dust.prototype.draw = function(){
    //What my dust looks like
    pushMatrix();
        translate(this.x,this.y);
        fill(105, 105, 105,this.fade);
        noStroke();
        ellipse(0,0,this.s,this.s);
    popMatrix();
};//Dust For the player when he moves, jumps and lands, same with enemies landing
Dust.prototype.update = function(){
    //Different types of dust movement
    switch(this.type){
        case 1:
            this.s -= this.spd; //Shrinking its size
            this.fade = lerp(this.fade,40,0.1); //Fading it out
            this.y-=this.spd*3; //moving the Y position            
        break;
        case 2:
            this.s -= this.spd*5; //Changing the size
            this.fade = lerp(this.fade,35,0.1); //Changing the fade
            this.y=lerp(this.y,this.py+this.rand,0.2); //Lerping the x and Y positions to their set end positions
            this.x = lerp(this.x,this.px+this.rand2,0.2);        
        break;
        case 3:
            this.s -= this.spd*2; //Shrinking the Size
            this.fade = lerp(this.fade,25,0.1);       //Fading it out 
        break;
    }
};

function DrawDust(){
    for(var i = Dusts.length-1;i>=0;i--){
        Dusts[i].draw();//Drawing the dust
        Dusts[i].update(); //Updating the dust
        
        //Destroying the dust
        if(Dusts[i].s<=0||Dusts.length>LagHandler){
            Dusts.splice(i,1);
        }
    }
        
}//Generating the dust


Poof.prototype.draw = function(){
      pushMatrix();
        translate(this.x,this.y);
        
        //If Glowy is on then have a nice big glow for loop
        if(this.showGlow){
            fill(this.color,this.fade/10);
            //Looping it to look glowy
            for(var i=0;i<this.s;i+=2){
                noStroke();
                ellipse(0,0,this.s+i,this.s+i);
            }
        }
        
        //Regular non glowy poof circle
        fill(this.color,this.fade);
        noStroke();
        if(this.objtype ==="rect"){
            rectMode(CENTER);
            rect(0,0,this.s,this.s);
            rectMode(CORNER);
        }
        ellipse(0,0,this.s,this.s);
        
      popMatrix();
};  
Poof.prototype.update = function(){
    this.fade -= this.spd;//Decrease the fade by the fade speed
    
    this.s = lerp(this.s,this.futS,0.5);//Increase the size of the circle
    
    this.futS-=this.sspeed;//Decrease the Size of the circle by the circle speed
    
    this.x +=this.xvel;//speeeed
    this.y +=this.yvel;//more speed
    
    this.yvel+=this.grav; // increasing the gravity
    this.yvel = constrain(this.yvel,-30,30);
};
function DrawPoof(){
    
    for(var i = poofs.length-1;i>=0;i--){
        poofs[i].draw();//Drawing it
        poofs[i].update(); //Updating it1

        //Colliding into the dirt blocks
        for(var j = Blck.length-1;j>=0;j--){
            //if the circle is colliding with the dirt block, then destroy the circle
            if(ctorect(poofs[i].x,poofs[i].y,poofs[i].s,Blck[j].x,Blck[j].y,Blck[j].w,Blck[j].h)&&poofs[i].objtype!=="rect"){
                poofs[i].die = true;
                //If the show glow is false, then set spawn more to true
                if(!poofs[i].showGlow&&poofs[i].s>13){
                    poofs[i].SpawnMore = true;
                }
            }
            if(ctorect(poofs[i].x,poofs[i].y,poofs[i].s,Blck[j].x,Blck[j].y,Blck[j].w,Blck[j].h)&&poofs[i].objtype==="rect"){
                poofs[i].xvel = -poofs[i].xvel/2;
                poofs[i].yvel = -poofs[i].yvel/1.5;
            }
            
        }    
        
        //If the particle is colliding with the player and 
        if(ctorect(poofs[i].x,poofs[i].y,poofs[i].s,Pro.x,Pro.y,Pro.w,Pro.h)&&poofs[i].s>13&&poofs[i].objtype!=="rect"){
            poofs[i].die = true;//kill the original particle
            
            //If the damage is greater than 2 then Have it hurt the player
            if(poofs[i].damage>2){
                Pro.health-=poofs[i].damage;
                Pro.HurtTiming=poofs[i].damage*2;
                Pro.stat.healthLoss = true;
            }
            //If the show glow is false, then set spawn more to true
            if(!poofs[i].showGlow){
                poofs[i].SpawnMore = true;
            }
        }        
        if(poofs.length>LagHandler){
             poofs[i].die = true;
        }
        //Spawning more particles once this ones life is over
        if(poofs[i].fade<0||poofs[i].s<0||poofs[i].die){
            //If spawnmore is true and the originals size is still greater than 13 then create more and splice the original particle
            if(poofs[i].SpawnMore&&poofs[i].s>13&&poofs[i].objtype!=="rect"){
                for(var k = 0;k<poofs[i].s;k++){
                    poofs.push(new__.call(Poof,poofs[i].x,poofs[i].y,0,random(4,poofs[i].s/2),random(-2,2),random(-5,5),0.1,255,poofs[i].color,0.3,false));
                }
            }
            poofs.splice(i,1);
        }

    }    
}//Generating the Particles

Slash.prototype.draw = function(){
      pushMatrix();
        translate(this.ovx,this.ovy);
        stroke(255,255,255,(this.fade/20));
        
        //Glowing the slash up
        for(var i = 0;i<24;i+=2){
            strokeWeight(i);
            line(this.px2,this.py2,this.x,this.y);
        }
        
        
        fill(255,255,255,this.fade);//Triangle line that streaks across
        noStroke();
        triangle(this.px2,this.py2-5,this.px2-3,this.py2+5,this.x,this.y);
      popMatrix();
   
};
Slash.prototype.update = function(){
    this.fade-=20; //Fading it out
    
    //If part 2 isnt true, then lerp x to its future xpoint and y to its future y point
    if(!this.part2){
        this.x = lerp(this.x,this.x2,0.7);
        this.y = lerp(this.y,this.y2,0.7);
        if( dist(this.x,this.y,this.x2,this.y2)<1){
            this.part2 = true;
        }
    }
    //otherwise, lerp x2 and y2 to the same position 
    if(this.part2){
        this.px2 = lerp(this.px2,this.x2,0.3);
        this.py2 = lerp(this.py2,this.y2,0.3);
    }
    
};
function DrawSlash(){
    for(var i = slashes.length-1;i>=0;i--){
        slashes[i].draw();
        slashes[i].update();
        
        
        if(slashes[i].fade<0){
            slashes.splice(i,1);//If fade hits 0, then destroy
        }
    }
    
    for(var i = slashes2.length-1;i>=0;i--){
        slashes2[i].draw();
        slashes2[i].update();
        
        
        if(slashes2[i].fade<0){
            slashes2.splice(i,1);//If fade hits 0, then destroy
        }
    }
}//Generating the Slashes

//} Particles


//{

ThrowIt.prototype.draw = function(types){
    //Changing out the looks of the objects
    if(types === "shuriken"){
        Shuriken(this.x,this.y,this.s,this.r);
    }
    if(types === "knife"){
        Shuriken(this.x,this.y,this.s,this.r);
    }
};
ThrowIt.prototype.update = function(types){
    
    this.timeout -=0.02;
    
    //Rotating it
    this.r += this.rSpd;
    //Applying force to the xpos and ypos
    this.x+= cos(this.angle) * this.spd;
    this.y+= this.ySpd;
    //applying gravity to yspd
    this.ySpd += this.grav;
    
    //If awsesomeness is not turned off, draw the slashes
    if(!GetRidOfTheAwesomeness){
        slashes2.push(new__.call(Slash,this.x,this.y,0,0, -cos(this.angle) * 60, -this.ySpd*5+random(-20,20)));
    }
    
    //If it hits a block, it will destroy itself
    for(var i = Blck.length-1;i>=0;i--){
        if(col(this,Blck[i])){
            this.die = true;
        }
    }
};



Player.prototype.draw = function(){

    //Rotation for Shooting
    this.r = atan2(mouseY - (height/2+this.s/2), mouseX - (width/2+this.s/2));
    
    
    pushMatrix();
        translate(this.x+this.s/2,this.y+this.s/2);
        
        //Cool Rotation effects
        if(!GetRidOfTheAwesomeness){
            rotate(this.rot+this.shootR);
            scale(this.scale,this.scaleY);
        }
        //making the rotation point to its center
        translate(-this.s/2,-this.s/2);
        
        //His skins will be interchangable. We might not have time for that though
        noStroke();
        fill(5, 5, 5);
        rect(0,0,60,60,10);
    
        fill(255, 194, 133);
        rect(17,15,38,11,10);
        rect(22,15,38,11);

        fill(0, 0, 0);
        arc(52,20,10,7,-51,151);
        arc(37,20,10,7,0,227);
    
        pushMatrix();
            translate(+8,10);
            rotate(sin(frameCount*-3)*10);
            fill(3, 3, 3);
            rect(-30,0,38,11);
        popMatrix();
        
        pushMatrix();
            translate(0,17);
            rotate(-44+sin(frameCount*2)*10);
            rect(-24,0,38,11);
        popMatrix();      
        
    popMatrix();  
    
};
Player.prototype.move = function(){

    this.shootR = lerp(this.shootR,0,0.2); //Lerping the  shoot rotation back to zero
    
    //Changing the X Scaling making the ninja feel papery and cool
    if(this.directX === "left"){
        this.scale = lerp(this.scale,-1,0.2);
   //     rect(this.x,this.y,this.PowerAmnt,60);
        
    }
    else{
        this.scale = lerp(this.scale,1,0.2);
      //  rect(this.x-this.PowerAmnt+this.s,this.y,this.PowerAmnt,60);
    }
    
    //Changing the Y Scaling making the ninja feel papery and cool
    if(this.directY === "up"){
        this.scaleY = lerp(this.scaleY,-1,0.3);
    }
    else{
        this.scaleY = lerp(this.scaleY,1,0.4);
    }
    
    
    this.CoolDown -=0.02; //Cooldown for
    
    
    //If the player is flying, make dust
    if(!this.canJump&&!GetRidOfTheAwesomeness){
        Dusts.push(new__.call(Dust,this.x+random(0,this.s),this.y+random(0,this.s),random(0.1,0.4),random(10,40),3 ));
        Dusts.push(new__.call(Dust,this.x+random(0,this.s),this.y+random(0,this.s),random(0.1,0.4),random(10,40),3 ));
    }
    
    //Going left dust
    if(this.xvel<-1&&this.canJump&&!GetRidOfTheAwesomeness){
        Dusts.push(new__.call(Dust,this.x+this.s+random(-10,10),this.y+this.s,random(0.1,0.4),random(10,40),1 ));
    }
    
    //Going right dust
    if(this.xvel>1&&this.canJump&&!GetRidOfTheAwesomeness){
        Dusts.push(new__.call(Dust,this.x,this.y+this.s,random(0.1,0.4),random(10,40),1 ));
    }
    

    //Dashing to the right on a one man open mask
    if(this.CoolDown<0&&keys[32]&&this.directX === "right"){
            this.xvel = 0;
            if(!GetRidOfTheAwesomeness){
                cam.shake = 10; //Shake the camera because its cool 
                
                slashes.push(new__.call(Slash,this.x,this.y+10,0,0,this.PowerAmnt, 0)); //Drawing the slashes because they are sharp
                slashes.push(new__.call(Slash,this.x,this.y+this.s-10,0,0,this.PowerAmnt, 0));
                
                //Adding epic poofyness to the situation
                for(var i = 0;i<this.PowerAmnt;i+=10){
                    poofs.push(new__.call(Poof,this.x+i+this.s/2,this.y+random(0,this.s),15,random(10,30),0,0,0,255,color(255,255,255),0,true));       
                    this.SUperSpeed= true;//Setting super speed to true (used for bumping into blocks)
                }
                
            
            this.x =lerp(this.x,this.x+this.PowerAmnt,0.6);//Changing the Xposition to its future xpos
            
            this.CoolDown = this.MaxCooldown;//Setting the cooldown
            
            this.SUperSpeed= true;//Setting super speed to true (used for bumping into blocks)
        }
    }
    
    //Otherwise dashing to the left
    else
    if(this.CoolDown<0&&keys[32]&&this.directX === "left" ){
        this.xvel = 0;
        this.SUperSpeed= true;//Setting super speed to true (used for bumping into blocks)
        
        if(!GetRidOfTheAwesomeness){//If awesomeness is false, none of the epicness will happen :(
            
            cam.shake = 10; //Camera shaking 
            
            //Drawin the slashes
            slashes.push(new__.call(Slash,this.x,this.y+10,0,0,-this.PowerAmnt, 0));
            slashes.push(new__.call(Slash,this.x,this.y+this.s-10,0,0,-this.PowerAmnt, 0));
            
            for(var i = 0;i<this.PowerAmnt;i+=10){
                poofs.push(new__.call(Poof,this.x-i+this.s/2,this.y+random(0,this.s),15,random(10,30),0,0,0,255,color(255,255,255),0,true));
            }
        }
        this.x =lerp(this.x,this.x-this.PowerAmnt,0.6);//Lerping the Xpos to its future position
        
        this.CoolDown = this.MaxCooldown; //Setting the cooldown back
    }
    else{
        this.SUperSpeed= false; //Setting super speed to false once everything is done
    }

    //If im jumping rotate the player and set canJump to false
    if(this.yvel<-0.1){
        this.rot += this.rotSpeed;  
        this.canJump = false;
    }
    //And if its greater than 0.1 rotate the player
    else if(this.yvel>0.1){
        this.rot += this.rotSpeed;  
    }  
    

};
Player.prototype.moveX = function(){
    this.x+=this.xvel;//Moving x with its xvelocity
    if(! this.SUperSpeed){
    //If i am pressing certain keys, then lerp xvel to to the speed
    if(keys.d ||keys.D||keys[RIGHT]){
        this.xvel = lerp(this.xvel,this.spd,0.4);
        this.directX = "right";
    }
    else
    //If i am pressing other certain keys, then lerp xvel to to the negative speed
    if(keys.a ||keys.A||keys[LEFT]){
        this.xvel = lerp(this.xvel,-this.spd,0.4);
        this.directX = "left";
    }
    //Otherwise set xvel to 0
    else{
        this.xvel = lerp(this.xvel,0,0.1);
    }    
    
    }
};
Player.prototype.moveY = function(){
    if(keys.w ||keys.W||keys[UP]){
        if(this.canJump){
            this.yvel = -this.jumpAmnt; //Setting the Yvelocity to the negative of the set jump height
            this.directY = "up"; //What direction you are going
            cam.shake = 5; //A nice shake to indicate you affected the earth when you jumped
        }
    }    
    this.y+=this.yvel; //Affecting the Y by the Yvelocity
    this.yvel+=this.grav; //Having the gravity get added to the yvelocity
    //Basically, if you go off an edge and you fall, usually people just allow you to jump at any time, but this stops that and keeps you from being able to jump after you have fallen a certain amount
    if(this.yvel>7){
        this.canJump = false;
    }
};
Player.prototype.update = function(){
    //Throwing the weapon. If you have reached the max length of weapons, you wont be able to throw more
    if(clicked&&shurik.length<this.MaxWeapons){
        
        shurik.push(new__.call(ThrowIt,this.x+this.s/2,this.y+this.s/2, this.r,this.throwSpd)); //Push the weapon
        
        //Changing the players direction when you click past certain areas
        if(mouseX>width/2){
            this.directX = "right";
        }
        else{
            this.directX = "left";
        }
        
        
        if(!GetRidOfTheAwesomeness){
            cam.shake = 10;//Shaking the camera when you shoot
        }
        //Setting your shoot rotation to 400. Dont ask why that number, it just seemed like a good one
        this.shootR = 400;
    }
    //Defining how many weapons you actually have (used in the overlay function)
    this.WeaponAmnt = this.MaxWeapons-shurik.length;
};
Player.prototype.Awards = function(){
    
    if(this.health<100){
        this.stat.healthLoss = true;
    }
    
    if(!Save.achievements[1]&&Save.levels>0){
        not.reset();
        Save.achievements[1] = true;
    }  
    
    if(!Save.achievements[13]&&Save.levels>5){
        not.reset();
        Save.achievements[13] = true;
    }  
    
    if(!Save.achievements[3]&&Save.levels>20){
        not.reset();
        Save.achievements[3] = true;
    } 
    
    if(!Save.achievements[5]&&this.money>=50){
        not.reset();
        Save.achievements[5] = true;
    }
    
    if(!Save.achievements[6]&&this.money>=200){
        not.reset();
        Save.achievements[6] = true;
    }
    
    if(!Save.achievements[8]&&this.money>=500){
        not.reset();
        Save.achievements[8] = true;
    }


  //Monster Defeat
  if(!Save.achievements[2]&&this.stat.monster>0){
        not.reset();
        Save.achievements[2] = true;      
  }
  if(!Save.achievements[7]&&this.stat.monster>=5){
        not.reset();
        Save.achievements[7] = true;      
  }
  if(!Save.achievements[21]&&this.stat.monster>=20){
        not.reset();
        Save.achievements[21] = true;      
  }   
  
  //Unlock doors
  if(!Save.achievements[22]&&this.stat.doors>=10){
        not.reset();
        Save.achievements[22] = true;      
  }  
  
  //Defeat birds
  if(!Save.achievements[12]&&this.stat.bird>0){
        not.reset();
        Save.achievements[12] = true;      
  }  
  
  if(!Save.achievements[17]&&this.stat.bird>=10){
        not.reset();
        Save.achievements[17] = true;      
  }  
    
    
  if(!Save.achievements[16]&&this.stat.upgrade>=10){
        not.reset();
        Save.achievements[16] = true;      
  }      

  if(!Save.achievements[4]&&this.stat.happy>0){
        not.reset();
        Save.achievements[4] = true;      
  }      
    
  if(!Save.achievements[14]&&this.stat.happy>=10){
        not.reset();
        Save.achievements[14] = true;      
  }  
  
  
    
};
Player.prototype.overlay = function(){

    if(keys.e||keys.E){
        this.overlayY = lerp(this.overlayY,300,0.2);
    }
    else{
        this.overlayY = lerp(this.overlayY,0,0.1);
    }
    
   pushMatrix();
        translate(0,-300+this.overlayY);
        textAlign(CENTER,CENTER);
        fill(0, 0, 0);
        textSize(30);
        text(this.WeaponAmnt,width/8-2,height/20+3); //Showing how many weapons you have in stock. Once a weapon is destroyed it will be added
        
        textAlign(CORNER,CENTER);
        text(this.money,width/8-11,145+3);
        
        textAlign(CENTER,CENTER);
        text(this.keys,width/8-2,height/7+3);
        
        fill(158, 158, 158);
        textSize(30);
        text(this.WeaponAmnt,width/8,height/20);   
        fill(255, 174, 0);
        text(this.keys,width/8,height/7);
        
        fill(255, 206, 107);
        textAlign(CORNER,CENTER);
        text(this.money,width/8-10,145);
        
        textAlign(CENTER,CENTER);
        fill(247, 64, 64);
        text(this.bones,width/8,203);
        
        if(Mydebug){
            fill(163, 163, 163);
            text(round(this.x),width/1.1,height/20);   
            text(round(this.y),width/1.1,height/10);  
        }
        
        Shuriken(width/20,height/20,60,cos(frameCount*1)*360); //Eventually this will be whatever weapon you have equipped
        DaKey(width/20,height/7,0.2);
        image(img.coins,6,height/5,50,50);
        DaMeat(30,196,0.4);
    popMatrix();
    
    pushMatrix();
        translate(0,300-this.overlayY);
     
        rectMode(CENTER);
        noStroke();
        fill(0,0,0);
        rect(width/2,height-60,100*3+10,50,10);
        
        var HealthColor = color(255-(this.health*2), this.health*1.2, this.health/2);
        
        fill(HealthColor);
        
        //fill(255, 153, 0);
        rect(width/2,height-60,this.health*3,40,10);     
      //  fullText(this.health + " / 100",width/2,height-60,20,0,1,true,color(HealthColor),color(171, 255, 171,5),3);
        
    popMatrix();
    noFill();
    stroke(199, 0, 0,20);
    strokeWeight(40);

    this.HurtTiming = lerp(this.HurtTiming,0,0.05);
    for(var i = 0;i<this.HurtTiming;i++){
        rect(width/2,height/2,width+50-i*10,height+50-i*10);
    }
    rectMode(CORNER);
    
};
//} Player


//{
function PrintSaveCode(){
    println("var Save = {");
    println("levels:"+Save.levels+",");
    println("unlocked:"+Save.unlocked+",");
    println("achievements:[");
    for(var i = 0;i<24;i++){
        println(Save.achievements[i]+",");
    }
    println("],");
    println("MaxWeapons:"+Pro.MaxWeapons+",");
    println("money:"+Pro.money+",");
    println("PowerAmnt:"+Pro.PowerAmnt+",");
    println("throwSpd:"+Pro.throwSpd+",");
    println("MaxCooldown:"+Pro.MaxCooldown+",");
      
    println("stat : {");
    println("monster:"+Pro.stat.monster +",");
    println("doors:"+Pro.stat.doors +",");
    println("upgrade:"+Pro.stat.upgrade +",");
    println("bird:"+Pro.stat.bird +",");
    println("happy:"+Pro.stat.happy +",");
    println("death:"+Pro.stat.death +",");
    println("healthLoss:"+Pro.stat.healthLoss +",");
    println("},");
    println("};");
            

}
//} SAVE Code Printing


//{
var maxLevel = 30; //How many levels there are. When you have reached the max, it will go to the win scene
var levels = [

    
        
    {
        design: "forest",
        Map: [
        "gggg         gggg",
        "dddd         dddd",
        "dddd   $$$   dddd",
        "ddddP$$$$$$$@dddd",
        "ddddgggggggggdddd",
        "ddddddddddddddddd",
        ]

    }, //Intro level Just coins and portal

    {
        design: "forest",
        Map: [
        "$$$$         $$$$",
        "gggg         gggg",
        "dddd         dddd",
        "dddd$$ ggg1  dddd",
        "ddddP$$$$$$$@dddd",
        "ddddgggggggggdddd",
        "ddddddddddddddddd",
        ]

    }, //Introducing the smasher enemy

    {
        design: "forest",
        Map: [
        "gggg         gggg",
        "dddd         dddd",
        "ddddk$     $kdddd",
        "ddddgg  $  ggdddd",
        "dddd   $ $$  dddd",
        "dddd   ggg  $dddd",
        "dddd       $$dddd",
        "dddd      $ggdddd",
        "dddd $$$  $ $dddd",
        "dddd   ggggggdddd",
        "ddddP$$L $$L @ddd",
        "ddddgggggggggdddd",
        "ddddddddddddddddd",
        ]

    }, //Introducing the Keys
    
    {
        design: "forest",
        Map: [
        "                                      $",
        "                 $$$                 $$$",
        "                 $gg$$              $$$$$",
        "   $$            $dd                ggggg",
        "    $       $ $$ 2dd$$$$$    $$$gg",
        " b$$$     P$ $  $$dd     $$$$  @dd  ",
        "ggggg  gggggggggggddggggggggggggdd",
        "ddddd  ddddddddddddddddddddddddddd",
        "ddddd  ddddddddddddddddddddddddddd",
        "ddddd  ddddddddddddddddddddddddddd",
        ]

    }, //Introducing the friendly enemy
    
    {
        design: "forest",
        Map: [
            " ggggg",
            " dddddggggggggggggggggggggggggggggggggggggggggggggg   ",
            " dd$$$ddddddddddddddddddddddddddddddddddddddddddddd",
            " dd P s$$c $$k   L $ k $ L $ k   L $ s c $ k  L$$$@ ",
            " ddgggggggggggggggggggggggggggggggggggggggggggggggg",
            " dddddddddddddddddddddddddddddddddddddddddddddddddd",
            " dddddddddddddddddddddddddddddddddddddddddddddddddd",
            " ddddddddddddddddddddddddddddddddddddddddddddddddd",
            " dddddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //Introducing buttons
    
    {
        design: "forest",
        Map: [
        "dd         d     d     d    dd",
        "dd   7     d  6  d  8  d  6 dd",
        "dd$$$   $  d$$$$$d     d    dd",
        "dd    $$$$ d     d     d    dd",
        "ddP     $  d  $$ d$ $$ d$$$$dd",
        "ddgggggggggdgggggdgggggdggg$dd",
        "dd@$$  $$$ d$$$$ d$$$$$d  $$dd",
        "ddgggggggggdgggggdgggggdggggdd",
        ]
    }, //Introducing Fazing through walls 
    
    {
        design: "forest",
        Map: [
        "d6767d                6                             ",
        "d    d            $$     $$                        @ ",
        "d  P d          $$   $$$                  6      ggg",
        "dddddd    7        ggggggg $$            $$$      d ",
        "dddd    $$$$$ $$    ddddd    $$77$$  $$ ggggg       ",
        "dd     ggggggg       ddd      $$$$ $$    ddd        ",
        "d       ddddd                gggggg       d         ",
        "d        ddd                  dddd                  ",
        "d                              dd                   ",
        ]
    }, //Bird Food
    
    {
        design: "forest",
        Map: [                                            
        
        
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "              d d d             d d d  ",
        "        6     ddddd             ddddd  ",
        "    6          ddd  d d d d d d  dddd   ",
        "               dddddddddddddddddddddd   ",
        "        7      ddd $$$$          dkdd   ",
        "               ddd     gg   g   ddddd   ",
        "           $$$ dddd      $$$     dddd   ",
        "$$$$$$     $$$$$c   $$$   1   $$$ L   @",
        "  P        gggggggggggggggggggggggggggg",
        " ggg         $$$sdddddddddddddddddddd   ",
        "  d        dddddddddddddddddddddddd    ",
        "                 ddddddddddddddd       ",
        "                                       ",
        
        ]
    }, //Floating Fortress
    
    {
        design: "forest",
        Map: [                                            
        
        
        "                                  @   ",
        "                                 ggg  ",
        "                                  d   ",
        "                      $$$$  g          ",
        "       $$$$ 3  $$$$$                 ",
        "       gggggggggggggg $$              ",
        "   $$ggddddddddddddddgg               ",
        "   ggdddddddddddddddddd         6     ",
        "     $$$$$$  L  $$$$$$                ",
        "   gggggggggggggggggggg               ",
        "     dddddddddddddddd      $          ",
        "        ddddddddddd       ggg $$      ",
        "                           ddg   $    ",
        "                                ggg   ",
        "     7                   $  $$ gdd   ",
        "                    $$$ ggg           ",
        "               $$$     gdd            ",
        "              ggg1                    ",
        "           $$gdddggg             7     ",
        "           ggddddddd                  ",
        "             $$$$c   $$$$  $          ",
        " $k$  $$$$ ggggggggg      $s$         ",
        "d$d$d       ddddddd       ggg$$       ",
        "ddddd         ddd          d     $$ $ ",
        " ddd                             $ ggg",
        " ddd                           $ $  d ",
        " ddd                          ggg     ",
        " ddd                   $$$ $$  d      ",
        " ddd          $$  $$  ggggg           ",
        " ddd   P  $$  gggg      ddd           ",
        " dddggggg     dd        d             ",
        
        ]
    }, //level 9 Island hop
    
    {
        design: "forest",
        Map: [                                              
        
        "                                      k   ",
        "                     $$$       1    gggg  ",
        "            $        ggg       gggggddddgg",
        "           ggg        d        ddddddddddd",
        "      $     d                 dddddddddddd",
        "     ggg                      ddddddddddddd",
        "      d      $          3     ddddddddddddd",
        "            ggg       $       ddddddddddddd",
        "             d       ggg      ddddddddddddd",
        "                      d      dddddddddddddd",
        "                           dddddddddddddddd",
        "                          ddddddddddddddddd",
        "                   4      dddddddddddddddddd",
        "                        dddddddddddddddddd",
        "                        ddddddddddddddddddd",
        "                       dddddddddddddddddddd",
        "                      $dddddddddddddddddddd",
        "                      ddddddddddddddddddddd",
        "               5     $dddddddddddddddddddddd",
        "                    ddddddddddddddddddddddd",    
        "                    ddddddddddddddddddddddd",
        "                  $dddddddddddddddddddddddd",
        "                 $ddddddddddddddddddddddddd",
        "                  ddddddddddddddddddddddddd",
        "                $dddddddddddddddddddddddddd",    
        "                ddddddddddddddddddddddddddd",
        "               dddddddddddddddddddddddddddd",
        "              ddddddddddddddddddddddddddddd",
        "              ddddddddddddddddddddddddddddd", 
        "             dddddddddddddddddddddddddddddd",
        "            ddddddddddddddddddddddddddddddd",
        "  P         L  1 @ddddddddddddddddddddddddd",
        " ggg    ggggddddddddddddddddddddddddddddddd",
        "  d",
        ]
    }, //Into the Mountain
    
    
    

    
    {
        design: "cave",
        Map: [
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",  
        "ddd   ddddddddddddddddddddddddddddddddddddddddddd",  
        "dd  P  $          ddddddd               ddddddddd",
        "ddddddd            ddddd                 dddddddd",
        "dd                 ddd                   dddddddd",
        "dd          $      dd                     ddddddd",
        "dd                  d                      dddddd",
        "dd                  d              5        ddddd",
        "dd                                           d$dd",  
        "ddd                         $                dddd",
        "ddkd           $            d               ddddd",
        "ddddd                      $dd$            dddddd",  
        "dddddd   6                $ddd$           ddddddd",   
        "dddddd                    ddddd          dddddddd",
        "ddddddd         $$$$   1 ddddddd  $$$  1 L @ddddd",
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //cave level 1 start of the Cave world
    
    {
        design: "cave",
        Map: [
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",  
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",  
        "dddd  $$d    6         6       d             dddd",
        "dddd  $kd                      d             dddd", 
        "dddd gggd                      d             dddd",  
        "dddd                           d             dddd",
        "ddddd                          d     3   3  @dddd",
        "dddddd                 ggggggggggggggggggggggdddd", 
        "dddddddd                       db$$$$$$$$$$$ dddd",  
        "dddddddddd                      dd$$$$$$$$$$ dddd",
        "ddb$3$$$L          2              dddddddddd dddd",
        "ddddggggggggggggggggggg               6      dddd",
        "dddd           d                             dddd", 
        "dddd           d                             dddd",  
        "dddd           d                             dddd",
        "dddd  P  $$$$$ d $$$$$   2         1        2dbdd",
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //cave level 2 Minecraft™ err Mineshaft
    
    {
        design: "cave",
        Map: [
        "ddddddddddddddddddddddddddddddddddddddddddddd",
        "ddd              dddddddddddd          $$$@ddd",
        "ddd                dddddddd               ddd", 
        "ddd                 ddddd       7    $$$   ddd",
        "ddd                   ddd             d    ddd",
        "ddd      7            ddd                  ddd",  
        "ddd                $$$L d $$$$            dddd",
        "ddd                  dddd    $$$   $$$$    ddd",
        "ddd                d$$ddd     d     dd     ddd", 
        "ddd           7    dd $ddd                dddd",
        "ddd $$$$$           dd$ddd                ddd",
        "ddd                  dkddd             1 ddd",  
        "ddd  P    $$$$$$$$  ddddddd     1        ddd",
        "ddddddddddddddddddddddddddddddddddddddddddddd",
        
        ]

    }, //Castle level 3 The Unfinished Tunnel
    
    {
        design: "cave",
        Map: [
    
        "ddddddddddddddddddddddddddddddddddddddddddddd",
        "dddddd  $$    6 5 6 6 7 6 5 6 6            dd",
        "dd@ L   $$    6 6 7 6 6 6 7 6 5            dd",  
        "ddddddddddd    $$$     dddddd              dd",
        "dd             ddd                         dd",
        "dd                                         dd", 
        "dd            6 7 6 6 5 6 7 6 6            dd",
        "dd            5 6 6 7 6 6 5 6 7$$$         dd",
        "dd      $     d     d    $     $2$         dd",
        "dd      d                d   dddddd        dd",
        "dd  $$                         ddd         ddddd",
        "dd  dd       $$                            d  dd",
        "dd    d     dddd     $$$$$      $$$$$$     d kdd",
        "dd           dd     dddddd    dddddddddd   ddddd",
        "dd                   dddd      dddddddd    dd",
        "dd                                        dddddddd",
        "dd P    dddd         4   1   4             d   bdd",
        "dddddddddddddddddddddddddddddddddddddddddddddddddd",
        
        ]

    }, //cave level 4 Bat Run
    
    {
        design: "cave",
        Map: [
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",  
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",  
        "dddddddddddddddddddddddddddddddddddddddddddddddddd",  
        "dddd    ddddddddddddddddddddddddddddddddd    dddd",
        "dddd $$$ $$ dddddddddddddddddddddddddd 3     dddd",
        "ddkd $$$$$$$$$  $$$$  3   3      $$$$$       dddd",   
        "dddd $$ P $ dddddddddddddddddddddddddd 3 $$$ dddd",
        "dddd $$ ddddddddddddddddddddddddddddddddd $$ dddd",
        "dddddddddddddddddddddddddddddddddddddddddddd dddd",  
        "dddd  ddddddddddddddddddddddddddddddddddddd$$dddd",
        "dddd        $$dd$$$     $$dd$$$       $$$$dd$dddd",
        "dddd    3$dd$$   $3$$dd$$3$$$$$dd$$$$$$$$$dd$dddd",  
        "dddd ddddddddddddddddddddddddddddddddd$$kdd$$dddd",
        "dddd $$ dddddddd$$$ dddddddd   $$$$ dddddd   dddd", 
        "ddbd $$$   L   $$$   $$$$   $$$        $$$  2dddd",  
        "dddd dddddddddddddddddddddddddddddddddddddddddddd",
        "dddd  L   d  333 $$ d  33 $$d   3      d    @dddd",
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",
        "ddddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //Level 5 Tight Spot
    
    {
        design: "cave",
        Map: [                                            
        "dddddddddddddddddddddddddddddddddddddddd",   
        "dd               ddd                  dd",  
        "dd               ddd                  dd",  
        "dd        6     dddd        7         dd",  
        "dd              ddddd                 dd",  
        "dd $$$$$$      ddddddd                dd",  
        "dd     $$$$    ddddddd        $$$     dd",  
        "dd  P       $$ ddddddd   $$$     $$  @dd",  
        "ddgggggggggg   dddddddL ggggggggggggggdd",  
        "ddddddddddddd   ddddd $$ ddddddddddddddd",  
        "dddddddddddd    dddddd $$$  dddddddddddd",
        "ddddddddddd $$$  ddddd      dddddddddddd",
        "ddddddd        ddddddddd $$ dddddddddddd",
        "dd  d   $$$$  dddddddd    dddddddddddddd",
        "dd$ddd      dddddddd $$  ddddddddddddddd",
        "dd$ddddd  $$ dd dd $$ dddddddd     dbkdd",
        "dd$dddddd   $$$$    ddddddddd      $dddd",
        "dd$ddddddddddddddddddddddddd       $dddd",
        "dd$dddddddddddddddddddddddd       $ddddd",
        "dd2$$$$$$$    $$$$$$$      $$$$$$$dddddd",
        "dddddddddddddddddddddddddddddddddddddddd",
        
        
        ]
    }, //Underneath Level 6

    {
        design: "cave",
        Map: [
        "gggggggggggggggggggggggggggggggggggggggg",
        "dddddddddddddddddddddddddddddddddddddddd", 
        "dddddddddddddddddddddddddddddddddddddddd", 
        "d       $       d  ddd  $          ddddd",    
        "d      $$$     gd  ddd $g$      $$$c@ddd",    
        "d   g   $      dd  ddd $d$  $$1 sggggddd",
        "d   dg     g   dd  ddd $d$$$$ggggddddddd",
        "d  gd        ggdd$$ddd  dggggddddddddddd",
        "db dd        dddd  ddd$              ddd",
        "dggdd       gd  s  ddd$              ddd",
        "ddddd        d  gggddd               ddd",
        "dddddg      $      ddd2   $$$        ddd",
        "ddddd    g $$$       dggggggggggg    ddd",
        "ddddd3      $       P c  s$$$$$      ddd",
        "ddddgggggggggggggggggggggggggggggggggddd",
        "dddddddddddddddddddddddddddddddddddddddd",
        ]
    }, //Cave level 7 dunno what the name is   
    
    {
        design: "cave",
        Map: [
         
        "dddddddddddddddddddddddddddddddddddddddd", 
        "dddddddddddddddddddddddddddddddddddddddd", 
        "ddd @ 4444444444444444444444444444444ddd",
        "ddddddddd                            ddd",
        "ddd         ddddd            ddddd   ddd",  
        "ddd                 dddddd           ddd",
        "ddd                                  ddd",
        "ddd    44444444444444444444444444444 ddd",
        "ddd   444444444444444444444444444444 ddd",
        "ddd   444444444444444444444444444442 ddd",
        "dddL ddddddddddddddddddddddddddddddddddd",
        "ddd     44444444444444444444444444444ddd",
        "dddd    44444444b444444444k4444444444ddd",
        "ddd    P44444444444444444444444444444ddd",
        "dddddddddddddddddddddddddddddddddddddddd", 
        "dddddddddddddddddddddddddddddddddddddddd",
        ]
    }, //Cave level 8 gobblins den   
    
    {
        design: "cave",
        Map: [
         
        "ddddddddddddddddddddddddddddddddddddddddd", 
        "ddddddddddddddddddddddddddddddddddddddddd", 
        "ddd@L          dd                     ddd",
        "dddddd         dd                     ddd",
        "ddd      dd    L                      ddd", 
        "ddd            ddd    dd              ddd",
        "ddd           dddd         dd         ddd",
        "dddL ddddddddddddd              dd    ddd",
        "ddd      ddddddddd              dd    ddd",
        "dddd     dd$$$$$$d             kdd  b ddd",
        "ddd     sc $$$$$kd             ddd    ddd",
        "dddL ddddddddddddd              dd    ddd",
        "ddd      dd$$$$$$d              dd    dkd",
        "dddd P  sc $$$$$kd             sc43321ddd",
        "ddddddddddddddddddddddddddddddddddddddddd", 
        "ddddddddddddddddddddddddddddddddddddddddd",
        ]
    }, //Cave level 9 in and out 
    
    {
        design: "cave",
        Map: [
        "ddd       dddd  d    d  dddd          ddd",
        "ddd       d     d    d  d   d         ddd",
        "ddd       dddd  d    d  dddd          ddd",
        "ddd          d  d    d  d   d      dddddd",
        "ddd       dddd  dddddd  dddd       L @ddd",
        "dddd  ddddddddddddddddddddddddddddddddddd",
        "ddd                                   ddd",
        "dddd          ddd  dddd             6 ddd",
        "ddd ggggggg    d   d  d       6       ddd",
        "ddd            d   d  d               ddd",
        "ddd          3 d 2 dddd 3             ddd",
        "ddd          dddddddddddd             ddd",
        "ddd                                6  ddd",
        "ddd       dddd  d    d  dddd          ddd",
        "ddd       d     d    d  d             ddd",
        "ddd       dddd  d k  d  dddd          ddd",
        "ddd          d  d    d     d          ddd",
        "ddd     1 dddd  dddddd  dddd  1       ddd",
        "ddd     gggggggggggggggggggggg        ddd",
        "dddd                                  ddd",
        "ddd P              4    4            bddd",
        "ddddddddddddddddddddddddddddddddddddddddd", 
        "ddddddddddddddddddddddddddddddddddddddddd",
        ]
    }, //Cave level 10 exit path 



    {
        design: "castle",
        Map: [
        " @           $5$       ",
        " g$$         ggg    $$6",
        "     7$$ $$          gg",
        "     gg          $$   ",
        "                 gg   ",
        "         8$$          ",
        "        ggg           ",
        "              $$$$$$  ",
        "                 ggg  ",
        "          $$$         ",
        "  P  $$$  ggg         ",
        " ggg                  ",

        ]

    }, //Castle level 1 PArKoUr   
    
    {
        design: "castle",
        Map: [
            
            
        
        "        d        7           6        ",
        "        d $$   $$      $$$   $$$  $$ ",
        "        d d d d   $$$     $$ d dkd d",
        "        ddddddd d3d d d d3d d ddddddd",
        "         ddddddddddddddddddddddddddd ",
        "         ddddd        d $$     ddddd ",
        "         ddddd$$$$$dd d   $$$  ddddd ",
        "         ddddd  $$ dd d  $$$$$ ddddd ",
        " $$$$$   dddddd    dd d   $$$  ddddd ",
        "  2  P $ L sc $$ 1 dd@d  $$    ddddd ",
        " gggggggggggggggggggggddddddddddddddd",
        "$$$           $$$                    ",
        "ggg          $$b$$                   ",
        "   $$$$$    ggggggg                  ",
        "   gggggg                         ",
        
        ]

    }, //Castle level 2 into the castle
    
    {
        design: "castle",
        Map: [
            
            
        "ddddddddddddddddddddddddddddddddddddddddddd",
        "dd       ddd                  $$$    d$$$dd",
        "dd      sddd                  $k$    d$k$dd",
        "dd$     dddd     d     dd     ddd    d$$$dd",
        "ddd       ddd                        dddddd",
        "dd$       dd                         dd",
        "ddd   6   ddd                       gdd",
        "dd$       dd                        Ldd",
        "ddd   $$$ ddd                     1dLdd",
        "dd  P  $$ c   $$$$ 4       4     dgd dd",
        "ddddddddddddgggggggggggggggggggggddd dd",
        "dddddddddddddddddddddddddddddddddddd dd",
        "dddddddddddddddddddddddddddddddddddd dd",
        "ddd      $$$    $$$    $$$    $$$    dd",
        "ddd  dddddddddddddddddddddddddddddddddd",
        "ddd  $$$    $$$      3      3   kdddddd",
        "dddddddddddddddd  ddddddddddddddddddddd",
        "dddddddddddddddd$$ddddddddddddddddddddd",
        "dddddddddddddddd  ddddddddddddddddddddd",
        "dddddd        L   L            @ddddddd",
        "dddddd dddddddddddddddddddddddddddddddd",
        
        ]

    }, //Castle level 3 The Throne room
    
    {
        design: "castle",
        Map: [
        "gggggggg   gggg         $$$$$",
        "dddddddd $$dckd$$               g$g   g$g",
        "dddddddd   dddd    $$      gg   dgd   dgd$4  $$",
        "ddd$$s $$3     3       ggggddgggddd   dddgggggg",
        "gggggggggggggggggggggggdddddddddddd   ddddddddd",
        "ddddddddddddddddddddddddddddddddddd   ddd @L L $      ",
        "dd$ 4s  bdd$  1 kdd    s c $$$$ $s   2dddggggggg",
        "dd$ggggggdd$ ggggdd  gggggggggggggggggdddddddddd",
        "dd $c  s  1  $$P   $$$$$ ddd       ",
        "ddgggggggggggggggggggggggddd",
        ]

    }, //Castle level 4
    
    {
        design: "castle",
        Map: [
        "dddddddd                                 ",    
        "dd     d                                 ",    
        "dd                      @                ",
        "dd  ddddddddddddddddddddddddddddddddddddd",
        "dd   L                         L      dd ",
        "ddddddddddddddddddddddddddddddddddddd dd ",
        "dd                   L                dd ",
        "dd                ddddddddddddddddddddddd",
        "dd  $ ddddd   dd  dddddddddddddddddddddd ", 
        "dd  $ d$kdd        ddddddddddddddddddddd ",
        "dd  $ dk$dd 2   1          3  4    b dkd ",
        "dd  $ dddddggggggggggggggggggggggggggddd ",
        "dd  $ dbdddddddddddddddddddddddddddddddd ",    
        "dd  $ dddddddddddddddddddddddddddddddddd ",
        "dd  2     c  s                        dd ",
        "dddddddddddddd     $$$ $$ dddddddd    dd ",
        "dddddddddddddd $$$       $ddddddddd   dd ",
        "dddddddddddddd2    b    4 ddddddddd   dd ",
        "ddddddddddddddggggggggggggdddddddddd  dd",
        "dd     $$$         7       $$$ $$     dd ",  
        "dd  P      $$$     $$7 7      b    $$2dd ",
        "dddddddddddddddddddddddddddddddddddddddd ",
        
        ]

    }, //Castle level 5 The Sewers 
    
    {
        design: "castle",
        Map: [
        "ddddddddddddddddddddddddddddddddddddddddddddd",
        "dd @         $$$$$$    $$$$$$              dd",
        "ddddddddddddddddddddddddddddddddddddddddd  dd",  
        "dd          dd         d    dd          d  dd",
        "dd          dd         d    dd          d  dd",
        "dd         sc   3 3 3  d   sc   4  4  4 d 2dd",  
        "dd  ddddddddddddddddddddddddddddddddddddddddd",
        "dd           d        dd    d          dd  dd",
        "dd     bb    d        dd    d          dd  dd",  
        "dd2    bbb   d2 2 2   c s   d 1 1 1    c s dd",
        "dddddddddddddddddddddddddddddddddddddddddd dd",
        "dd                     b                   dd",  
        "dd P        $$$$$$  $$$$$$  $$$$$$        2dd",
        "ddddddddddddddddddddddddddddddddddddddddddddd",
        
        ]

    }, //Castle level 6 Castle Prison
    
    {
        design: "castle",
        Map: [
        "                                              ggg",  
        "                              d    $$$$       ddd",  
        "                              d    $$$$       ddd",  
        "                              d33  $  $      kddd",    
        "     gg       gg              ggggggggggggggggggg",
        "     dd$     $dd        ggggggddddddddddddddddddd", 
        "     ds$$   $$$d      ggddddddddddddddddddddddddd",
        "     ddgg   ggdd      dd",    
        "     ddddg$gdddd    dddd",
        "ggg$$   dd$dd       dddd                  $$$  @",
        "dcb$$   dd$dd   $$ bdddd           $$     gggggg",
        "dgggg   dd$dd   gg  dddd             $$   dddddd",               
        "ddddd   dd$dd   dd gdddd   $$$ $   ggg    dddddd",              
        "ddddd 1 dd$ddg  dd  dddd       $   ddd 1  dddddd",    
        "dd$$$     2    P $$$  L      ggg   ddd 1 1dddddd",
        "gggggggggggggggggggggggggggggdddgggdddggggdddddd",
        "dddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //Castle level 7
    
    {
        design: "castle",
        Map: [
        "               s  $$$$              ",
        "$$$P$$$    $$ggggggggg$ ggg    ",    
        "ggggggg      ddddddddd $ddd       ggg",  
        "dddddddgg $$    $bb$    $c      $$ddd      $$    ggg      ggg",  
        "dddddddddgggg  $$$$    gggg$$$    ddd $$    $$   dkd$    $dkd$ ", 
        "dddddddddddddggggggggggddddggggg$$ddd       gg  gdgdg    gdgdg",
        "dddddddddddddddddddddddddddddddd  ddd1  $$  dd   ddd      ddd",
        "dddddddddddddddddddddddddddddddd$$dddg      dd   ddd      ddd   ggggggggggggg",
        "dddddddddddddddddddddddddddddddd  ddd 1 4   dd   ddd      ddd  $ L$$L$$L$$@dd     ",
        "ddddddddddd        ddddddddd $$   dddggggg  dd   ddd      ddd  ggggggggggggdd                ",
        "ddk   $$$$   gggg               22     $$$  dd   ddd      ddd",
        "ddgggggggggggddddgggggggggggggggggggggggggggdd   ddd      ddd",
        ]

    }, //Castle level 8 The three keys
    
    {
        design: "castle",
        Map: [
        "gggggggggggggggggggggggggggggggggggggggggggggggggg",  
        "$$   dd          dd            dd       dd$$$L @dd" ,   
        "k$$  dd          dd            dd       dd$$ggggdd" ,   
        "g    dd          dd        1  bdd       dd$     dd" ,   
        "   $$dd  3       dd    1     ggdd 4     dd      dd" ,   
        "   ggdd     33   ddgg    $$    dd 44  $4dd    $$dd" ,    
        "     dd   $$$    dd 1gg    1   dd $$  $$dd$$$   dd",    
        " P s$c  $$33  s  c $$$$$   s   c $$$ s  c   2   dd",    
        "ggggggggggggggggggggggggggggggggggggggggggggggggdd",    
        "dddddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //Castle level 9 
    
    {
        design: "castle",
        Map: [
        "                                                       $$     $$            $@",
        "                                $$$$$             $$$                       ggg",
        "                                 $$$              ggg  $$ $$$     $$$       ddd",
        "gP g                   g        d$$$d  $$$$       ddd     ggg     ggg       ddd",
        "dggd$$$           $$$  d$       dgggd$     $      ddd     ddd     ddd$      ddd",
        "dddd$ $$$     $     3 gd$  1    d b d  4  4$$$                    ddd$      ddd",
        "dddd$       $$ 1   gggdd$     3 dgggd$$gggggggL g                 ddd4     $$$d",
        "dddd     $1   gggggddddd$$$    gddddd$$dddddddL d                 ddd2     $$$d",
        "ddk$$ 1   ggggddddddk $3   3  $$d$b$dg$$$   $$ 2                  dddgg     ggd",
        "ddddggggggddddddddddggggggggggggdgggddgggggggggggg",    
        "dddddddddddddddddddddddddddddddddddddddddddddddddd",
        ]

    }, //Castle level 10 
    
    {
        design: "castle",
        Map: [
        "  @                   ",
        "                      ",
        "  P            ",
        " ggg                  ",

        ]

    }, //Extra Level thingy
];


function StartLevel(){
    
    //Resetting the Level objects
    Blck = [];
    smashy = [];
    items = [];
    poofs = [];
    Dusts = [];
    slashes = [];
    bird = [];
    
    Save.levels = constrain(Save.levels,0,maxLevel);
    
    cam.design = levels[Save.levels].design;
    

    //This is a box formula, that cycles through the whole bitmap    
    for(var y = 0; y < levels[Save.levels].Map.length; y++){
        for(var x = 0; x < levels[Save.levels].Map[y].length; x++){
            //Searching for definable letters and then pushing objects into the scene
            switch(levels[Save.levels].Map[y][x]){
                case "g":
                    Blck.push(new__.call(Block,x*100,y*100,100,100,"g") );//Grass
                break;
                case "L":
                    Blck.push(new__.call(Block,x*100,y*100,200,100,"L") );//Door
                break;
                case "P":
                    Pro.x = x*100;
                    Pro.y = y*100-50;
                break;
                case "c":
                    Blck.push(new__.call(Block,x*100,y*100,200,100,"c") );//Dirt
                break;
                case "d":
                    Blck.push(new__.call(Block,x*100,y*100,100,100,"d") );//Dirt
                break;
                case "1":
                    smashy.push(new__.call(Smasher,x*100,-100+y*100,"smasher" ));//Smasher
                break;
                case "2":
                    smashy.push(new__.call(Smasher,x*100,-100+y*100,"Friend" ));//Smasher
                break;
                case "3":
                    smashy.push(new__.call(Smasher,x*100,-100+y*100,"squishy" ));//Smasher
                break;
                case "4":
                    smashy.push(new__.call(Smasher,x*100,-100+y*100,"throwit" ));//Smasher
                break;
                case "5":
                    bird.push(new__.call(Birdy,x*100,-100+y*100,3));
                break;
                case "6":
                    bird.push(new__.call(Birdy,x*100,-100+y*100,2));
                break;
                case "7":
                    bird.push(new__.call(Birdy,x*100,-100+y*100,1));
                break;
                case "@":
                    items.push(new__.call(AItems,x*100,y*100,"@",120) );//Portal to the next Level
                break;
                
                case "k":
                    items.push(new__.call(AItems,x*100+50,y*100+50,"k",120) );//Key for the door
                break;
                case "b":
                    items.push(new__.call(AItems,x*100+50,y*100+50,"b",120) );//Meat
                break;
                case "s":
                    items.push(new__.call(AItems,x*100,y*100,"s",120) );//Button to step on
                break;
                case "$":
                    items.push(new__.call(AItems,x*100+50,y*100+50,"$",120) );//Coins
                break;
                
                }
            }
        }
           
    
}

//} LEVELS RIGHT HERE


//{
Block.prototype.draw = function() {
    if(dist(this.x,this.y,Pro.x,Pro.y)<900){
    //Switching the different block types
    switch (this.t){
        case "g":
            if(cam.design === "forest"){
                fill(0, 0, 0,200);
                noStroke();
                rect(this.x+2, this.y+4, this.w, this.h); //Shadow to the blocks
                pushMatrix();
                    translate(this.x,this.y);
                    scale(100/200); //Scaling the image down
                        image(img.grass,0,0); //Grass image
                popMatrix();
            }
            if(cam.design ==="cave"){
                pushMatrix();
                    translate(this.x,this.y);
                    scale(100/200); //Scaling the image down
                switch( this.Chooser){
                    case 1:
                        image(img.CaveBlck1,0,0);
                    break;
                    case 2:
                        image(img.CaveBlck2,0,0);
                    break;
                    case 3:
                        image(img.CaveBlck3,0,0);
                    break;
                }
                popMatrix();
            }
            if(cam.design ==="castle"){
                pushMatrix();
                    translate(this.x,this.y);
                    scale(100/200); //Scaling the image down
                switch( this.Chooser){
                    case 1:
                        image(img.CastleBlock1,0,0);
                    break;
                    case 2:
                        image(img.CastleBlock2,0,0);
                    break;
                    case 3:
                        image(img.CastleBlock3,0,0);
                    break;
                }
                popMatrix();
            }
        break;
        case "d":
            if(cam.design === "forest"){
                fill(0, 0, 0,200);
                noStroke();
                rect(this.x+2, this.y+4, this.w, this.h);//Another shadow, same type
                    pushMatrix();
                        translate(this.x,this.y);
                        scale(100/200);
                        image(img.dirt,0,0); //Dirt Image
                popMatrix();
            }
            if(cam.design ==="cave"){
                pushMatrix();
                    translate(this.x,this.y);
                    scale(100/200); //Scaling the image down
                    image(img.CaveBlck4,0,0);
                popMatrix();
            }
            if(cam.design ==="castle"){
                pushMatrix();
                    translate(this.x,this.y);
                    scale(100/200); //Scaling the image down
                    image(img.CastleBlock4,0,0);
                popMatrix();
            }
        break;
        case "L":
            pushMatrix();
                translate(this.x,this.y);
                noStroke();
                fill(166, 166, 166);
                rect(0,0,200,100,6);
                rectMode(CENTER);
                
                fill(64, 64, 64);
                rect(100,50,200,100,6);
                
                fill(107, 107, 107);
                rect(100,50,180,80);
                
                
                fill(82, 82, 82);
                rect(100,50,170,70);
                
                fill(107, 107, 107);
                rect(100,50,160,60);
                
                fill(69, 69, 69);
                ellipse(150,60,20,20);
                rect(150,48,12,34,26);
                
                ellipse(50,60,20,20);
                rect(50,48,12,34,26);
                rectMode(CORNER);
            popMatrix();
        break;
        case "c":
            this.cageDraw-=0.02;
            pushMatrix();
                translate(this.x,this.y);
            
            noStroke();
            for(var i = 0;i<6;i++){
                fill(92, 92, 92);
              //  rect(i*19,this.cageDraw,5,100-this.cageDraw,6);
                fill(74, 74, 74);
                rect(2,i*15+10,200,5,6);
            }
            
            for(var i = 0;i<11;i++){
                rect(i*19+4,0,5,100);
            }
            this.PushBtn = 0;

            if(this.y>this.py&&this.cageDraw<=0.1){
                this.y-=0.5;
            }
            popMatrix();
           /** for(var i = items.length-1;i>=0;i--){
                if(items[i].type === "g"&&this.PushBtn>10){
                    Blck[i].y = lerp(Blck[i].y,Blck[i].py+101,0.3);
                    Blck[i].cageDraw = 1;
                }
            }
            **/
        break;
      
    }
    
        
        
    }
};
Block.prototype.collideX = function(obj1,stpe){
    //Different types of collisions depending on what the item is
    switch (stpe) {
        case "player":
            
            obj1.rightC = false;//Setting the players left and right collision indicators to false
            obj1.leftC = false;
            
            if (col(this, obj1)){
                
                if(this.t === "L"&&Pro.keys>0){
                    for(var i = 0;i<50;i++){
                        var a = random(15,60);
                        poofs.push(new__.call(Poof,this.x+random(0,180),this.y+random(50,100),0,random(5,50),random(-3,3),random(-6,1),0.1,255,color(a),random(0.2,0.6),false,"rect"));
                    }
                    this.die = true;
                    Pro.keys--; 
                    Pro.stat.doors ++;
                }
               if(obj1.SUperSpeed&&obj1.directX === "left"){
                   obj1.x = this.x + this.w*24; //If you are dashing, then Have extra preventions to keep you from dashing through blocks that are more than 1 lenght long
               }
               else if(obj1.SUperSpeed&&obj1.directX === "right"){
                   obj1.x = this.x - obj1.w*24;//Same with this one here
               }
               //Regular collisions
                if (obj1.x < this.x+this.w/2) {
                    obj1.x = this.x - obj1.w; //keeping the player from walking inside the block
                    obj1.rightC = true; //Setting collision indicators to true
                } 
                else if (obj1.x>this.x){
                    obj1.x = this.x + this.w;
                    obj1.leftC = true; //Collision indicators to true
                }
                
            }
        break;
        case "enemy":
            //Simple collisions for the enemys
            if (col(this, obj1)){
                if (obj1.x < this.x) {
                    obj1.x = this.x - obj1.w;//If they have collided and if their body is less than the blocks X then set their postion accordingly
                } 
                else if (obj1.x>this.x+this.w/2){
                        obj1.x = this.x + this.w;
                }
                        
            }
        break;
    }
        
};
Block.prototype.collideY = function(obj1,stpe){
    if (col(this, obj1)) {
        //If the type of the collision is the player then do that
        if(stpe === "player"){        
            if(this.t === "L"&&Pro.keys>0){
                    for(var i = 0;i<50;i++){
                        var a = random(15,60);
                        poofs.push(new__.call(Poof,this.x+random(0,180),this.y+random(50,100),0,random(5,50),random(-3,3),random(-6,1),0.1,255,color(a),random(0.2,0.6),false,"rect"));
                    }
                    this.die = true;
                    Pro.keys--; 
                    Pro.stat.doors ++;
                }
            
        if (obj1.y < this.y) {
            
            if(obj1.yvel>2&&!GetRidOfTheAwesomeness){
                cam.shake = 8; //Shaking the camera when you land. because you want to make the player feel apart of the environment
                for(var i = 0;i<50;i++){//Making lots of dust for nice juicing effects
                    Dusts.push(new__.call(Dust,obj1.x+obj1.s/2,obj1.y,random(0.1,0.4),random(10,40),2 ));
                    Dusts.push(new__.call(Dust,obj1.x+obj1.s/2,obj1.y,random(0.1,0.4),random(10,40),2 ));
                } 
            Pro.yvel = 0; //Setting the players Yvelocity to 0
            }
            
            obj1.canJump = true; //now the player can jump again
            obj1.y = this.y - obj1.h; //Keepin the player above ground
            obj1.yvel = 0;//Keeping its velocity at zero so that the player wont falling super fast when he leaves
            Pro.directY = "down"; //Setting the y direction
            Pro.rot = 0 ; //Resetting the rotation
        } 
        else if (obj1.y > this.y){
            obj1.y = this.y + this.h; //Keeping the player below ground
            obj1.canJump = false;//Setting his ability to jump to false. just in case it wasnt already
            obj1.yvel *= -0.1; // Setting the players Yvelocity to something greater than 0 
        }
            
        }
        
        //otherwise, if it is of the enemy, do differently
        if(stpe === "enemy"){          
            
        if (obj1.y < this.y) {
            if(obj1.yvel>0&&obj1.canJump===false){
                cam.shake = obj1.screenShke*1.2;
                
                if(obj1.colliding&&obj1.type === "smasher" ){
                    Pro.HurtTiming = 20;
                    Pro.health -= 30; //hurting the player
                    Pro.xvel = random(-40,40);
                    Pro.yvel = -40; //making the player go WHeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                }
                
                if(obj1.type === "smasher"||obj1.type === "Friend"){
                    for(var i = 0;i<50;i++){
                        Dusts.push(new__.call(Dust,obj1.x+obj1.w/2,obj1.y+obj1.h/2,random(0.1,0.4),random(10,40),2 ));
                        Dusts.push(new__.call(Dust,obj1.x+obj1.w/2,obj1.y+obj1.h/2,random(0.1,0.4),random(10,40),2 ));
                    }   
                }
                
                if(!obj1.turnedHappy&&obj1.type === "Friend"&&obj1.colliding){
                    Pro.xvel = random(-30,30);
                    Pro.yvel = -20;
                }
                else if(obj1.turnedHappy&&obj1.type === "Friend"&&obj1.colliding){
                    Pro.xvel = random(-40,40);
                    Pro.yvel = -40;
                }
                
                if(obj1.type=== "squishy"){
                    for(var i = 0;i<20;i++){
                poofs.push(new__.call(Poof,obj1.x+obj1.w/2+random(-50,50),obj1.y+obj1.h/2,0,random(5,15),random(-2,2),random(-10,-4),0.1,255,color(255, 122, 231),0.1,false));
                }
                }
        }
            obj1.canJump = true;
            obj1.yvel = 0;
            obj1.y = this.y - obj1.h;
        } 
        else if (obj1.y > this.y){
            obj1.y = this.y + this.h;
            obj1.canJump = false;
            obj1.yvel *= -0.1;
        }
            
        }
    }
            
              

};


//} Blocks


//{
AItems.prototype.DetermineArea = function(){
    //If the player is within the distance defined, then the item can start glowing particles, otherwise: it wont partical
    if(dist(this.x,this.y,Pro.x,Pro.y)<600){
        this.AblePartic = true; // Setting to true
    }
    else{
        this.AblePartic = false; //Setting to false
    }
};
AItems.prototype.Collect = function(){
    var Cdist = dist(this.x,this.y,Pro.x,Pro.y);
    this.timing-=0.03;
    
    //CHANGED: latch the pickup. The original re-tested the radius every
    //frame, so dashing past an item started the collect and then cancelled
    //it the instant you left the radius. Now it runs to completion.
    if(Cdist<this.distance&&this.timing<=0){
        this.collecting = true;
    }
    
    if(this.collecting){
        if(this.rot<590){
            this.rot+=20;//Making the items spinnnnn
        }
        
        var px = this.x, py = this.y; //where it was before the ease
        
        if(Cdist>120){            
            this.x = lerp(this.x,Pro.x+30,0.05);
            this.y = lerp(this.y,Pro.y+35,0.05);
            this.s = lerp(this.s,0,0.05);
        }
        else if(Cdist<=120&&Cdist>50){
            this.x = lerp(this.x,Pro.x+30,0.1);
            this.y = lerp(this.y,Pro.y+35,0.2);
            this.s = lerp(this.s,0,0.08);
        }
        else if(Cdist<=50){
            this.x = lerp(this.x+Pro.xvel,Pro.x+30,0.2);
            this.y = lerp(this.y,Pro.y+35,0.3);
            this.s = lerp(this.s,-0.2,0.09);
        }
        
        //CHANGED: floor on the closing speed. The lerp moves 0.05*distance
        //a frame, which a running ninja (10 px a frame) outpaces, so the
        //item would shrink away in mid-air instead of reaching him. This
        //only tops up frames that moved less than MINPULL, so the original
        //easing is untouched up close. Set MINPULL to 0 for pure easing.
        var MINPULL = 12;
        var moved = dist(px,py,this.x,this.y);
        if(moved<MINPULL){
            var dx = (Pro.x+30)-this.x, dy = (Pro.y+35)-this.y;
            var d = sqrt(dx*dx+dy*dy);
            if(d>0.001){
                var step = min(MINPULL-moved,d);
                this.x += dx/d*step;
                this.y += dy/d*step;
            }
        }
    }    
    else{
        this.s = lerp(this.s,1,0.06);
        this.rot = 0;
    }
};
AItems.prototype.draw = function(){
    
    this.DetermineArea(); //Drawin the partical determinizer
    
    pushMatrix();
        translate(this.x,this.y); //Overall Size and position control
        scale(this.s);
        rotate(this.rot);
        
        switch(this.type){
            case "@":
                this.s = lerp(this.s,1,0.06); //Shrinking the size of the item 
                this.rot = 0;
                pushMatrix();
                    translate(50,60);
                    scale(0.7);
                    scale(sin(frameCount*5)*1,1);
                    
                    noStroke();
                    fill(64, 195, 255);
                    quad(0,-40,-20,0,0,40,20,0);
                    
                    for(var i = 0;i<10;i++){
                        pushMatrix();
                            scale(i/-6); //Glowy quadrolateral 
                            fill(168, 229, 255,60);
                            quad(0,-40,-20,0,0,40,20,0);
                        popMatrix();
                        
                        ellipse(-66,cos(frameCount*6)*77,20,20);
                        ellipse(66,cos(frameCount*5)*44,20,20);
                        ellipse(-66,sin(frameCount*5)*56,20,20);    
                        ellipse(66,sin(frameCount*4)*87,20,20); 
                    }
                    
                    //Wonderful portal particles
                    if(frameCount%5===0&&this.AblePartic){
                            poofs.push(new__.call(Poof,this.x+50,this.y+50,2,random(4,6),random(-1,1),random(-2,2),0,155,color(153, 204, 255),0.0,false));
                           
                        }
                popMatrix();
               
                //if The player is within the x and y Radius
                if(dist(this.x,this.y,Pro.x,Pro.y)<100){
                    dpause.MeasureAchieve = false;
                    dpause.achievements=0;
                    Pro.x = lerp(Pro.x,this.x+20,0.2);//Lerp the player to the portal
                    Pro.y = lerp(Pro.y,this.y+38,0.1);
                    Pro.scale = lerp(Pro.scale,0,0.1); //Shrink the player super small
                    Pro.scaleY = lerp(Pro.scaleY,0,0.1);
                    Pro.canMove = false;

                    if(Pro.scaleY<0.5&&tr.length<1){
                           tr.push(new__.call(Transition,"advanceLevel") );
                           
                    }
                }
                else{
                Pro.canMove = true;
                }
            break;
            case "k":
        
                scale(0.2);
                
                DaKey(0,0,1);
                
                this.Collect();
                if(frameCount%5===0&&this.AblePartic){
                            poofs.push(new__.call(Poof,this.x+random(-20,20),this.y+random(-20,50),2,0,random(-1,1),random(-2,0),0,155,color(255, 189, 46),-0.2,false));
                           
                }
                if(this.s<0.1){
                    this.die = true;
                    Pro.keys++;
                    if(!Save.achievements[9]){
                        not.reset();
                        Save.achievements[9] = true;      
                    }  
                }
            break;
            
            case "b":
                rotate(24);
                scale(0.4);
                DaMeat();
                this.Collect();
                if(frameCount%5===0&&this.AblePartic){
                            poofs.push(new__.call(Poof,this.x+random(-20,20),this.y+random(-20,50),2,0,random(-1,1),random(-2,0),0,155,color(255, 0, 9),-0.1,false));
                           
                }
                if(this.s<0.1){
                    this.die = true;
                    Pro.bones++;
                    if(!Save.achievements[10]){
                        not.reset();
                        Save.achievements[10] = true;      
                    }    
                }
            break;
            case "s":
                this.s = lerp(this.s,1,0.3); //Shrinking the size of the item 
                this.rot = 0;
                fill(107, 107, 107);
                rect(10,70+this.PushBtn,80,30-this.PushBtn);
                for(var i = 0;i<10;i++){
                    fill(0, 0, 0,50-i*10);
                    rect(10+i*10,70+this.PushBtn,10,30-this.PushBtn); 
                    rect(80-i*10,70+this.PushBtn,10,30-this.PushBtn); 
                }
                fill(59, 59, 59);
                rect(0,90,100,10,3);  
                if(ctorect(Pro.x+Pro.s/2,Pro.y+Pro.s/2,60,this.x,this.y+60,100,30)){
                    this.PushBtn = lerp(this.PushBtn,20,0.2);
                    if(!Save.achievements[20]){
                        not.reset();
                        Save.achievements[20] = true;      
                    }
                }
                else{
                    this.PushBtn = lerp(this.PushBtn,0,0.2);
                }
                
                for(var i = Blck.length-1;i>=0;i--){
                    if(Blck[i].t === "c"&&this.PushBtn>10){
                        Blck[i].y = lerp(Blck[i].y,Blck[i].py+101,0.3);
                        Blck[i].cageDraw = 1;
                    }
                }
                
            break;

            case "$":
                scale(0.7);
                scale(cos(frameCount*5)*1,1);
                image(img.coins,-40,-40);
                if(frameCount%10===0&&this.AblePartic){
                            poofs.push(new__.call(Poof,this.x+random(-20,20),this.y+random(-20,50),2,0,random(-1,1),random(-2,0),0,155,color(255, 205, 97),-0.1,false));
                           
                }
                this.Collect();
                if(this.s<0.1){
                    this.die = true;
                    Pro.money++;
                }
            break;
        }
    popMatrix();
};
//} Items


//{

Birdy.prototype.draw = function(){
  

    this.EyeColor = lerpColor(this.EyeColor,color(255, 255, 255),0.1);//Lerping the  Color
    this.OtherColor = lerpColor(this.OtherColor,color(0, 0, 0),0.1);//Lerping the  Color
    

    switch(this.type){
        case 1:
            this.s = 60; //Setting sizes. Pretty sure i didnt use this
            this.Color = lerpColor(this.Color,color(70, 0, 87),0.1);//Lerping the  Color
            if(!this.prepBird){
                this.health= 50; //Setting health
            }
        break;
        case 2:
            this.s = 70;
            this.Color = lerpColor(this.Color,color(0, 0, 0),0.1);
            if(!this.prepBird){
                this.health= 50;//Setting health
            }
        break;
        case 3:
            this.s = 80;
            this.Color = lerpColor(this.Color,color(98, 140, 98),0.1);//Lerping the  Color
            if(!this.prepBird){
                this.health= 50;//Setting health
            }
        break;
    }
    
    this.prepBird = true; //Done prepping the bird

 pushMatrix();
        translate(this.x,this.y);
        scale(-this.scaleX,1);
        
        //Wingssssssssssssssssssssssss
        fill(this.Color);
        strokeCap(ROUND);
        noStroke();
        pushMatrix();
            translate(10,-13);
            rotate(10+cos(frameCount*32)*20);
            translate(-200,-200);
            beginShape();
                vertex(197, 189);
                bezierVertex(197, 189, 187, 175, 178, 172);
                bezierVertex(171, 170, 162, 159, 155, 150);
                bezierVertex(151, 164, 163, 180, 184, 186);
                bezierVertex(146, 169, 140, 178, 170, 192);
                bezierVertex(113, 196, 171, 203, 178, 200);
            endShape();
        popMatrix();


        //Boring body
        strokeCap(SQUARE);
        stroke(20,20,20);
        strokeWeight(3);  
        noStroke();
 //       fill(255, 183, 0);
        fill(0, 0, 0);
        triangle(0,2,19,23,54,16);

        beginShape();
            vertex(33, 87-100);
            bezierVertex(33, 87-96, 48, 79-100, 60, -6);
            bezierVertex(62, 0, 61, 0, 61, 01);
            bezierVertex(40, -6, 61, 3, 14, -1);
        endShape();
            
        strokeWeight(5);  
        noFill();
        stroke(20,20,20);
        strokeWeight(8);
        arc(-21,31,24,8,-44,97);
        arc(0,22,23,37,-42,102);
        noStroke();
        strokeWeight(5);
        fill(this.Color);
        rectMode(CENTER);
       // ellipse(0,0,70,60);
       rect(0,0,70,50,6);
        rectMode(CORNER);
    
    
        //more WHingggsssssssssssssssssssssssssssss
        strokeCap(ROUND);
        strokeWeight(3);
        pushMatrix();
            translate(0,0);
            rotate(cos(frameCount*30)*20);
            translate(-200,-200);
            beginShape();
                vertex(197, 189);
                bezierVertex(197, 189, 187, 175, 178, 172);
                bezierVertex(171, 170, 162, 159, 155, 150);
                bezierVertex(151, 164, 163, 180, 184, 186);
                bezierVertex(146, 169, 140, 178, 170, 192);
                bezierVertex(113, 196, 171, 203, 178, 200);
            endShape();
        popMatrix();
        
        
        //Boring eyes
        fill(this.OtherColor);
        stroke(0, 0, 0);
        ellipse(26,0,20,20);
    
        noStroke();
        fill(0, 0, 0,70);

        //Eyes
        fill(this.EyeColor);
        ellipse(28,-1,10,10);
        fill(this.OtherColor);
        fill(20,20,20);
        quad(14,-23,35,-7,39,0,0,-16);
        fill(this.EyeColor);
        ellipse(29,-2,4,4);    
    

    popMatrix();
    
    
  //  rect(this.x,this.y,100,100);
   
};

Birdy.prototype.update = function(){
    this.y = constrain(this.y,-900,4000); //Keeping the bird from going too high
    
    if(Pro.x>this.x+this.s*2){
        this.xvel = lerp(this.xvel,this.spd,0.06);
        this.scaleX = lerp(this.scaleX,-1,0.3);
    }
    else if(Pro.x<this.x-this.s*2){
       this.xvel = lerp(this.xvel,-this.spd,0.06); 
       this.scaleX = lerp(this.scaleX,1,0.3);
    }

      if(this.xvel>0){
          this.scaleX = lerp(this.scaleX,-1,0.3);
      }
      else{
          this.scaleX = lerp(this.scaleX,1,0.3);
      }   
    
    
    if(this.health<0){
        this.die = true;
        for(var i = 0;i<random(10,30);i++){
                items.push(new__.call(AItems,this.x+random(-this.s/2,this.s+this.s/2),this.y+random(-this.s/2,this.s),"$",300) );//Coins
        }
        
        for(var i = 0;i<50;i++){
            poofs.push(new__.call(Poof,this.x+random(-60,60),this.y+random(-60,60),0,random(5,50),random(-3,3),random(-6,1),0.3,255,this.Color,random(0.2,0.6),false,"rect"));
        }
        for(var i = 0;i<5;i++){
            poofs.push(new__.call(Poof,this.x+random(-60,60),this.y+random(-60,60),0,random(5,50),random(-3,3),random(-6,1),0.3,255,this.OtherColor,random(0.2,0.6),false,"rect"));
            poofs.push(new__.call(Poof,this.x+random(-60,60),this.y+random(-60,60),0,random(5,50),random(-3,3),random(-6,1),0.3,255,this.EyeColor,random(0.2,0.6),false,"rect"));
        }
        Pro.stat.bird ++;
    }
    if( this.bounceTime <0||this.y>Pro.y-80||this.yvel>30){
            this.yvel = -this.Bounce;
        
        
        if(this.bounceTime <0){
            this.bounceTime = random(1,3);
            if(dist(this.x,this.y,Pro.x,Pro.y)<1500){
                poofs.push(new__.call(Poof,this.x,this.y,0,30,0,random(-6,-3),0.8,255,color(255, 255, 255),0,false,"",10));
            }
        }
    }
    this.bounceTime-=0.02;
    
    for(var i = shurik.length-1;i>=0;i--){
        if(dist(shurik[i].x,shurik[i].y,this.x,this.y)<this.s/2+shurik[i].s){
            this.health-= 10;
            shurik[i].die = true;
        }
    }    
    
};
Birdy.prototype.MoveX = function(){
    this.x +=this.xvel;
};
Birdy.prototype.MoveY = function(){
    this.y +=this.yvel;
    
    if(this.yvel>=0){
        this.yvel+=this.grav/2;
    }
    if(this.yvel<0){
        this.yvel+=this.grav*2;
    }
    
};

function DrawBirdy(){
    for(var i = bird.length-1;i>=0;i--){
        bird[i].draw();
        bird[i].update();
        bird[i].MoveX();
        bird[i].MoveY();
        if(bird[i].die){
            
            bird.splice(i,1);
        }
    }    
}

Smasher.prototype.draw = function(){
    fill(255, 0, 255);
    rectMode(CORNER);
  //d  rect(this.x,this.y,this.w,this.h);
    switch(this.type){
        case "smasher":
            this.Color = color(0, 4, 18);
            this.EyeColor = color(255, 255, 255);
            this.OtherColor = color(37, 0, 38);//Nice colors :P    
            var colors = [
                color(5, 5, 5),//Body
                color(255, 255, 255),//outline
                color(0, 0, 0),//Arm1
                color(10, 10, 10),//Arm1
                color(0,0,0),
                ];
            fill(colors[0]);
            rect(this.x,this.y,this.w,this.h,10);
            
            pushMatrix();
                translate(this.x+this.w/2,this.y+this.h/2);
                scale(this.scaleX,1);
                        scale(this.w/90,this.h/120);
                translate(-this.w/2,-this.h/2);
                noStroke();
        
                fill(colors[2]);
                pushMatrix();
                    translate(this.jumArms[0],this.armSmashY);
                    rotate(this.smashR);
                    rect(-38,0,107,25,4);  
                    rect(-54,0,107,10,4);    
                    rect(-50,2,107,14,4);     
                    rect(-53,16,107,6,4);    
                    rect(-48,18,107,6,4);
                    rect(-58,19,107,6,4);
                popMatrix();
                fill(colors[0]);
                rect(0,0,this.w,this.h,10);
                
                fill(colors[1]);
                rect(12,25,13,23,4);
                rect(0,69,42,23);     
                rect(21,69,42,23,20);  
        
        
                fill(colors[0]);
                rect(4,61,17,23,4);     
                rect(27,58,17,23,4);
                rect(10,86,17,23,4);     
                rect(48,52,17,23,4);        
                rect(46,85,17,23,4);          
        
                fill(colors[0]);
                rect(11,31,9,14,4);
                pushMatrix();
                    translate(this.jumArms[1],-this.armSmashY);   
                    rotate(this.smashR);
                    fill(colors[3]);
                    rect(-38,85+10,107,25,4);        
                    rect(-54,85+10,107,10,4);    
                    rect(-50,91+10,107,14,4);     
                    rect(-53,102+10,107,6,4);    
                    rect(-48,104+10,107,6,4);
                    rect(-58,96+10,107,6,4);
                popMatrix();
            popMatrix();
        break;
        case "Friend":
            this.Color = color(196, 98, 28);
            this.EyeColor = color(255, 255, 255);
            this.OtherColor = color(0, 0, 0);//Nice colors :P    
            this.h = 100;
            this.w = 80;
           // this.turnedHappy = true;
            pushMatrix();
                translate(this.x,this.y);
                noStroke();
                fill(189, 112, 11);
                rect(0,0,80,100,5);


                if(this.turnedHappy){
                    fill(0, 0, 0);
                    arc(39,58,51,47,0,180);
                    fill(0, 0, 0,50);
                    rect(40,0,40,100,5);
                }
                else{
                    fill(0, 0, 0);
                    arc(39,78,51,47,-180,0);
                    fill(0, 0, 0,50);
                    rect(0,0,40,100,5);
                }
                
                
                for(var i = 0;i<66;i+=38){
                    fill(0, 0, 0);
                    ellipse(22+i,26,26,33);
                    
                    fill(255, 255, 255);
                    ellipse(18+i,32,13,15);
                    ellipse(27+i,18,6,7);
                    ellipse(31+i,28,4,3);
                }
            popMatrix();
            
            
        break;
        case "squishy":
            this.Color = color(255, 94, 215);
            this.EyeColor = color(255, 255, 255);
            this.OtherColor = color(0, 0, 0);//Nice colors :P    
            this.h = 20;
            this.w = 95;
            this.jumpAmnt = constrain(this.jumpAmnt,8,13);
                pushMatrix();
                    translate(this.x+this.w/2,this.y);
                    scale(this.scaleX,1);
                    translate(-this.w/2,-this.h/10);
                    noStroke();
                    fill(255, 120, 248);
                 //   rect(0,0,this.w,this.h,10);
                    for(var i = 0;i<this.w/14;i++){
                        arc(8+i*13,this.h-4+sin(frameCount*i*2)*3,16,26,-59,304);      
                        arc(8+i*13,this.h/4-4+sin(frameCount*i*2)*3,16,26,-59,304);      
                    }
                    pushMatrix();
                        translate(this.w/4,this.h/3);
                        fill(0, 0, 0);
                        ellipse(0,0,20,20);
                        ellipse(this.w/2,0,20,20);    
                        arc(this.w/4,this.h/4,6,-18,-189,32);    
                
                        fill(255, 255, 255);
                        ellipse(0,5,6,6);
                        ellipse(3,-5,3,3);    
                        ellipse(-6,1,3,3);   
                        ellipse(this.w/2,6,6,6);
                        ellipse(this.w/2+5,-4,3,3);    
                        ellipse(this.w/2+-5,1,3,3);  
                    popMatrix();
            
                    
                popMatrix();            
        break;
        case "throwit":
            this.Color = color(14, 71, 21);
            this.EyeColor = color(255, 255, 255);
            this.OtherColor = color(0, 0, 0);//Nice colors :P   
            var w = this.w;
            var h = this.h;
            this.h = 107;
            this.w = 70;
           // this.shootR = 20+cos(frameCount*10)*20;

            
            pushMatrix();
                
                translate(this.x+w/2,this.y+h/2);
                scale(this.scaleX,1);
                
                strokeWeight(10);
                stroke(23, 54, 0);
                noFill();
                arc(0,35,36,65,-190+sin(frameCount*-20)*10,-90);
                arc(30,35,36,65,-201+sin(frameCount*20)*10,-141);
                translate(this.shotX,0);
                rotate(this.shootR);
                translate(-w/2,-h/2);
                noFill();
                strokeWeight(10);
                stroke(23, 54, 0);
                arc(-28,44,70,65,10,47+sin(frameCount*-15)*20);
                
                noStroke();
                fill(29, 69, 0);
                rect(0,0,this.w,80,10);
                
                noFill();
                stroke(23, 54, 0);
                arc(11,55,70,65,10,47+sin(frameCount*15)*20);
                
                noStroke();
                fill(0, 0, 0);
                rect(0,26,30,40);
                rect(10,26,30,40,40);
                rect(15,7,16,12,40);
                fill(255, 255, 255);
                rect(15,10,8,7,40);
                
                fill(255, 255, 255);
                rect(4,26,11,8);
                rect(20,26,11,11);

                rect(4,56,11,10);
                rect(20,60,11,6);

            popMatrix();
        break;
    }
};
Smasher.prototype.collideHuman= function(){
    return (Pro.x+Pro.s > this.x && Pro.y+Pro.s > this.y && Pro.x < this.x + this.w && Pro.y < this.y + this.h);
};
Smasher.prototype.punchPlayer = function(){
    if(this.colliding&&this.canJump){
        Pro.health-=5;
        Pro.HurtTiming+=14;
        if(this.scaleX>0){
            Pro.xvel = random(-5,-50);     
        }
        else{
            Pro.xvel = random(5,50);  
        }
        Pro.yvel = random(-5,-20); 
    }    
};
Smasher.prototype.MoveX = function(){
    if(this.type!== "Friend"){
        this.x +=this.xvel;
    }
    if(Pro.x>this.x+this.w){
        this.xvel = lerp(this.xvel,this.spd,0.06);
        this.scaleX = lerp(this.scaleX,-1,0.3);
    }
    
    else if(Pro.x<this.x){
       this.xvel = lerp(this.xvel,-this.spd,0.06); 
       this.scaleX = lerp(this.scaleX,1,0.3);
    }
    
    
};
Smasher.prototype.MoveY = function(){
    this.yvel+=this.grav;
    this.y +=this.yvel;
    if(this.yvel>1&&this.canJump){
        this.jumpTime = random(0,1);
        this.yvel = -this.jumpAmnt;
        this.canJump = false;
        this.jumpTime = random(0,5); 
    }
};
Smasher.prototype.KillIt = function(coinrand){
    
    for(var i = 0;i<coinrand;i++){
        items.push(new__.call(AItems,this.x+random(-this.w/2,this.w+this.w/2),this.y+random(-this.h/2,this.h),"$",300) );//Coins
    }
    for(var i = 0;i<20;i++){
    //    translate(this.x+this.w/2,this.y+this.h/2);
        poofs.push(new__.call(Poof,this.x+random(0,this.w),this.y+random(0,this.h),0,random(5,this.w/2),random(-3,3),random(-13,1),0.3,255,this.Color,random(0.2,0.6),false,"rect"));
        
    }
    for(var i = 0;i<5;i++){
        
        poofs.push(new__.call(Poof,this.x+random(0,this.w),this.y+random(0,this.h),0,random(5,this.w/2),random(-3,3),random(-6,1),0.3,255,this.OtherColor,random(0.2,0.6),false,"rect"));
        
        poofs.push(new__.call(Poof,this.x+random(0,this.w),this.y+random(0,this.h),0,random(5,this.w/2),random(-3,3),random(-6,1),0.3,255,this.EyeColor,random(0.2,0.6),false,"rect"));
        
    }
};

Smasher.prototype.update = function(){
    
    //If prep is false, then go ahead and set all the healths
    if(!this.prep){
        if(this.type === "smasher"){
            this.health = 200;
        }
        if(this.type === "Friend"){
            this.health = 50;
        }
        if(this.type === "squishy"){
            this.health = 50;
        }
         if(this.type === "throwit"){
             this.health = 100;
         }
         this.prep = true;
    }
    
    if(this.type === "smasher"){
        this.screenShke = 1000/dist(this.x,this.y,Pro.x,Pro.y);
        if(this.canJump){
        switch(this.Smashpart){
            case 0:
                this.armSmashY = lerp(this.armSmashY,100,0.3);
                if(this.armSmashY>98){
                    //ScreennShake here
                    cam.shake = this.screenShke;
                    this.Smashpart = 1; 
                    this.punchPlayer();
                }
            break;
            case 1:
                this.timer+=0.02;
                if(this.timer>0.5){
                    this.Smashpart = 2; 
                }
            break;
            case 2:
                this.armSmashY = lerp(this.armSmashY,-5,0.3);
                if(this.armSmashY<-3){
                    //ScreennShake here
                    cam.shake = this.screenShke;
                    this.Smashpart = 3; 
                    this.timer = 0;
                    this.punchPlayer();
                }
            break;
            case 3:
                this.timer+=0.02;
                if(this.timer>0.5){
                    this.Smashpart = 0; 
                    this.timer = 0;
                }
            break;
            
        }
        }
        if(!this.canJump&&this.jumpTime>0){
            this.smashR = lerp(this.smashR,70,0.4);
            this.jumArms[0]= lerp(this.jumArms[0],13,0.4);
            this.jumArms[1]= lerp(this.jumArms[1],110,0.4);
            this.armSmashY = lerp(this.armSmashY,0,0.3);
        }
        else{
            this.smashR = lerp(this.smashR,0,0.4);
            this.jumArms[0]= lerp(this.jumArms[0],0,0.4);
            this.jumArms[1]= lerp(this.jumArms[1],0,0.4);        
        }
    }
    
    if(this.type === "Friend"&&this.colliding&&Pro.bones>0&&!this.turnedHappy){
        Pro.bones--;
        this.turnedHappy = true;
        
        Pro.stat.happy++;
    }
    
    if(this.type === "squishy"){
        this.screenShke = 100/dist(this.x,this.y,Pro.x,Pro.y);
        if(this.colliding){
            Pro.HurtTiming+=0.5;
            if(frameCount%20===0){
                Pro.health-=1;
            }
            this.x = lerp(this.x,Pro.x,0.2);
            this.jumpTime=0.02;
            if(frameCount%20===0&&dist(Pro.x,Pro.y,this.x,this.y)<500){
                
            for(var i = 0;i<30;i++){
                poofs.push(new__.call(Poof,this.x+this.w/2+random(-50,50),this.y,0,random(3,15),random(-2,2),random(-3,1),0.1,255,color(255, 122, 231),0.1,false));
            }
            }
        }
        
        
    }
    
    if(this.type === "throwit"){
        this.screenShke = 50/dist(this.x,this.y,Pro.x,Pro.y);
        this.shootTme-=0.02;
        if(this.shootTme<=0&&this.shootPart===0){
            this.shootR = lerp(this.shootR,40,0.2);
            this.shotX = lerp(this.shotX,0,0.4);
            if(dist(this.shootR,0,40,0)<2){
                this.shootPart+=1;
            }
        }
        if(this.shootPart === 2){
            this.shootR = lerp(this.shootR,-10,0.2);
            this.shotX = lerp(this.shotX,5,0.4);
            if(frameCount%4===0&&dist(this.x,this.y,Pro.x,Pro.y)<700){
                if(this.scaleX>0){
                    poofs.push(new__.call(Poof,this.x+this.w/2,this.y+this.h/2,0,random(12,25),random(-3,-14),random(-3,2),0.3,255,color(29, 115, 0),0.1,false,"",4));
                }
                if(this.scaleX<0){
                    poofs.push(new__.call(Poof,this.x+this.w/2,this.y+this.h/2,0,random(12,25),random(3,14),random(-3,2),0.3,255,color(26, 102, 0),0.1,false,"",4));
                }
                
            }
            if(dist(this.shootR,0,-10,0)<0.1){
                this.shootPart=0;
                this.shootTme = random(1,3);
                
            }
        }
        if(this.shootPart === 1){
            if(frameCount%20===0){}
            this.shootR = lerp(this.shootR,-30,0.4);
            this.shotX = lerp(this.shotX,-20,0.4);
            if(dist(this.shootR,0,-30,0)<2){
                this.shootPart=2;
            }
        }
    }
    
   
    for(var i = shurik.length-1;i>=0;i--){
        if(ctorect(shurik[i].x,shurik[i].y,shurik[i].s,this.x,this.y,this.w,this.h)){
            this.health-= 10;
            shurik[i].die = true;
        }
    }   
    
    if(this.canJump&&this.jumpTime<=0){
        this.jumpTime = random(0,1);
        this.yvel = -this.jumpAmnt;
        this.canJump = false;
        this.jumpTime = random(0,5);
    }
    
    this.jumpTime-=0.02;
    
    if(this.xvel>0){
        this.scaleX = lerp(this.scaleX,-1,0.3);
    }
    else{
        this.scaleX = lerp(this.scaleX,1,0.3);
      }
      
      
    if(this.collideHuman()){
        this.colliding = true;

    }
    else{
        this.colliding = false;
    }
    
    
    if(this.health<0){
        this.KillIt(random(10,40));
        this.die = true;
        Pro.stat.monster ++;
    }
    
};


//} Enemies


//{
function Wisp(x, y, s, fistmode, rand) { // Wisp
    this.x = x; // Wisp x
    this.y = y; // Wisp y
    this.s = s;
    this.departRate = (width + height) / 200;
    this.die = false;
    this.fade = 0;
    this.direction = random(-2, 2);
    this.r = 0;
    this.fistmode = fistmode;
    
    this.col1 = 0;
    this.rand = rand;
    
    this.rx = x + random(-width * 2, width * 2); // Wisp x
    this.ry = y + random(-height * 2, height * 2); // Wisp y
}
Wisp.prototype.display = function() { // display Wisp
    if (!this.fistmode) {
        pushMatrix(); // push matrix
        translate(this.x, this.y); // translate
        rotate(225 + this.r); // rotate
        
        noStroke(); // no stroke
        fill(this.col1, this.fade); // fill orange
        rect(0, 0, this.s, this.s); // orange rect
        popMatrix(); // pop matrix
        
        this.col1 = color(this.s * 20, this.s * 10, 20);
        this.r += this.direction / 2;
        this.x += this.direction;
        
        this.y -= this.departRate / 4;
        if (!delagVersion) {
            this.s -= this.departRate / 20;
        } else {
            this.s -= this.departRate / 8;
        }
        this.fade = lerp(this.fade, 150, 0.2);
        
    } else {
        pushMatrix(); // push matrix
        translate(this.rx, this.ry); // translate
        rotate(225 + this.r); // rotate
        
        noStroke(); // no stroke
        fill(this.col1, this.fade); // fill orange
        rect(-this.s / 2, -this.s / 2, this.s, this.s, 0); // orange rect
        popMatrix(); // pop matrix
        
        this.col1 = color(this.rand * 20, this.rand * 10, 30);
        
        this.r += this.direction / 2;
        
        this.fade = lerp(this.fade, 100, 0.05);
        this.rx = lerp(this.rx, this.x, 0.05);
        this.ry = lerp(this.ry, this.y, 0.05);
    }
    
    if (this.s < 2) {
        this.die = true;
    }
};

var wisps = [];
function Transit() {
    this.shrink = 100;
    this.shake = 0;
    this.explode = false;
    this.getIt = false;
    this.allStuff = [];
    
    this.part2 = false;
    
    this.transWaitTime = 0;
}
Transit.prototype.grabStuff = function() {
    if (!this.getIt) {
        var inc = delagVersion ? 50 : 40;
        for (var x = 0; x <= width; x += inc) {
            for (var y = 0; y <= height; y += inc) {
                this.allStuff.push({
                    img: get(x, y, inc, inc),
                    x: x,
                    y: y,
                    grav: 1,
                    force: random(5, 22),
                    explode: random(-25, 25),
                });
            }
        }
        this.getIt = true;
    }
};
Transit.prototype.Shrink = function() {
    if (!this.explode) {
        this.grabStuff();
        if (this.shrink > 250) {
            this.part2 = true;
        }
        if (this.part2) {
            this.transWaitTime += 0.05;
            if (this.transWaitTime > 1) {
                this.shrink = lerp(this.shrink, 0, 0.08);
                if (this.shrink <= 71) {
                    this.explode = true;
                }
            }
        } else {
            this.shrink+=1.5;
            this.shake = 1;
        }
    } else {
        scene = "menu";
        wisps = [];
        for (var i = this.allStuff.length; i--;) {
            var aY = this.allStuff[i];
            image(this.allStuff[i].img, this.allStuff[i].x, this.allStuff[i].y);
            aY.y -= aY.force;
            aY.force -= aY.grav;
            aY.x += aY.explode;
        }
    }
};
var Transaa = new__.call(Transit);    

function Logo() {
    this.CircleRad = 50;
    this.CircleRad2 = (width + height) / 4;
    this.CircleY = height + this.CircleRad;
    this.CircleColor = color(245, 245, 245);
    this.setRound = 0;
    this.glow = 0;
    
    this.getFist = false;
    this.fistComplete = false;
    
    this.timer = 0;
}
Logo.prototype.Part1 = function() {
    this.CircleY = lerp(this.CircleY, height / 2, 1.5);
    if (this.CircleY <= height / 2 + 0.1) {
        if (frameCount % 2 === 0) {
            wisps.push(new__.call(Wisp,width / 2 + random(-4, 15) + sin(frameCount * 2) * this.CircleRad / 2, height / 2 + cos(frameCount * 2) * this.CircleRad / 2 + this.CircleRad / 15, 20));
            wisps.push(new__.call(Wisp, width / 2 + random(-4, 15) - sin(frameCount * 2) * this.CircleRad / 2, height / 2 + cos(frameCount * 2) * this.CircleRad / 2 + this.CircleRad / 15, 20));
        }
        
        if (this.setRound < 360) { this.setRound += 1; }
        if (this.setRound > 260) {
            if (frameCount % 2 === 0) {
                wisps.push(new__.call(Wisp, width / 2 + random(-40, 40), height / 2 + random(-30, 65), 20));
            }
            for (var i = pointsGrabbed.length - 1, b = false; i--;) {
                if (this.fistComplete) { break; }
                if (dist(pointsGrabbed[i].offx, pointsGrabbed[i].offy, pointsGrabbed[i].x, pointsGrabbed[i].y) > 1) { b = true; }
                image(pointsGrabbed[i].grb, pointsGrabbed[i].offx, pointsGrabbed[i].offy, pointsGrabbed[i].offs, pointsGrabbed[i].offs);
                pointsGrabbed[i].offx = lerp(pointsGrabbed[i].offx, pointsGrabbed[i].x, 0.05);
                pointsGrabbed[i].offy = lerp(pointsGrabbed[i].offy, pointsGrabbed[i].y, 0.05);
            }
            if (!b) {
                image(img.GrabStuff, 0, 0);
                this.fistComplete = true;
            }
        }
        
        if (frameCount % 10 === 0) {
            for (var i = 0; i < this.setRound; i += 4) {
                wisps.push(new__.call(Wisp, width / 2 + random(-4, 15) - sin(i * 2) * this.CircleRad / 2, height / 2 + cos(i * 2) * this.CircleRad / 2 + this.CircleRad / 33, 10, false));
            }
        }
    }
    
    this.timer += 0.02;
    
    
};
Logo.prototype.Draw = function() {
    this.Part1();
    this.CircleRad = lerp(this.CircleRad, this.CircleRad2, 0.01);
    
    noFill();
    stroke(this.CircleColor);
    strokeWeight(this.CircleRad / 15);
    if (this.setRound > 0) {
        stroke(255, 157, 0);
        arc(width / 2, this.CircleY, this.CircleRad, this.CircleRad, -90, this.setRound * 2 - 90);
        arc(width / 2, this.CircleY, this.CircleRad, this.CircleRad, -this.setRound * 2 - 90, -90);
        if (this.glow < 20) {
            this.glow += 0.3;
        }
        for (var i = 0; i < this.glow; i += 3) {
            stroke(255, 227, 176, 5);
            arc(width / 2, this.CircleY, this.CircleRad + i, this.CircleRad + i, -90, this.setRound * 2 - 90);
            arc(width / 2, this.CircleY, this.CircleRad + i, this.CircleRad + i, -this.setRound * 2 - 90, -90);
        }
    }
    for (var i = wisps.length; i--;) {
        wisps[i].display();
        if (wisps[i].die) {
            wisps.splice(i, 1);
        }
    }
};

var Logo = new__.call(Logo);

function LogoScene() {
    image(img.BCKimg, 0, 0);
    pushMatrix();
    translate(width / 2 + random(-Transaa.shake, Transaa.shake), width / 2 + random(-Transaa.shake, Transaa.shake));
    scale(100 / Transaa.shrink);
    translate(-width / 2, -width / 2);
    
    Logo.Draw();
    
    popMatrix();
    
    if (Logo.timer > 9) {
        Transaa.Shrink();
    }
}  

//} Logo


//{

DrawPause.prototype.Button = function(){
    pushMatrix();
        translate(this.x,this.y);
        noStroke();
        
        
        fill(112, 112, 112);
      //  rect(0,0,this.s,this.s,5);    
     
        for(var i = 0;i<this.glow;i++){
            fill(255, 255, 255,30);
            rect(8-i/2,0,5+i,this.s,5);
            rect(this.s-15-i/2,0,5+i,this.s,5);
        }

        fill(255, 255, 255);
        noStroke();
        rect(8,0,5,this.s,5);
        rect(this.s-15,0,5,this.s,5);
        
        
    popMatrix();
    
    if(ctorect(mouseX,mouseY,2,this.x,this.y,this.s,this.s)){
        cursor(HAND);
        this.glow = lerp(this.glow,10,0.3);
        if(clicked){
            this.ShowPause = true;
            this.gameImg = get(0,0,600,600);
            this.YVel = 600;
        }
    }
    else{
        this.glow = lerp(this.glow,0,0.1);
    }
    
};
DrawPause.prototype.LevelBtn = function(x,y,level){
    pushMatrix();
        translate(x,y);
        noFill();
        strokeWeight(5);
        stroke(255, 255, 255);
        ellipse(0,0,60,60);
        if(Save.unlocked<=level){
            fill(0,0,0,30);
            ellipse(0,0,60,60);
            fill(255, 255, 255);
            rectMode(CENTER);
            rect(0,7,21,18);
            rectMode(CORNER);
            noFill();
            stroke(255,2555,255);
            strokeWeight(5);
            arc(0,0,16,26,-180,0);
        }
        else{
            fill(255, 255, 255);
            textSize(20);
            text(level+1,0,0);
        }
        noFill();
        noStroke();
    popMatrix();
    
    if(dist(mouseX,mouseY,x,y)<30&&Save.unlocked>level){
        stroke(255, 255, 255,50);
        strokeWeight(5);
        
        for(var i = 0;i<this.glow;i++){
            ellipse(x,y,60+i*2,60+i*2);
        }
        cursor(HAND);
        this.glow = lerp(this.glow,20,0.6);
        if(clicked&&tr.length<1){
            Save.levels = level;
            tr.push(new__.call(Transition,"resume") );
            dpause.ShowPause = false;
        }
     //   println( Save.levels );
    }
    else{
        this.glow = lerp(this.glow,0,0.02);
    }
    
};
DrawPause.prototype.Shop = function(x,y,type,say,cost){

    


    pushMatrix();
        translate(x,y);
        
        noFill();
        strokeWeight(5);
        stroke(255, 192, 31); 
        rect(0,0,130,70);
    popMatrix();
    
    if(ctorect(mouseX,mouseY,2,x,y,130,70)){
        cursor(HAND);
    
        fill(255, 255, 255,70); 
        rect(x,y,130,70);
        
        fill(255, 216, 89,20); 
        for(var i = 0;i<29;i++){
            textSize(29+i);
            text(cost,x+65,y+35);
        }
        
        fill(255, 196, 0); 
        textSize(45);
        text(cost,x+65,y+35);
        if(clicked&&Pro.money>=cost){
            
            
            switch(type){
                case "weapon":
                    Pro.money-=cost;
                    Save.MaxWeapons ++;
                    Save.stat.upgrade++;
                break;
                case "dash":
                    if(Save.PowerAmnt<400){
                        Pro.money-=cost;
                        Save.PowerAmnt +=25;
                        Save.stat.upgrade++;
                    }
                    else{
                        textSize(25);
                        fill(140, 0, 0); 
                        text("Maxed\n Out",x+65,y+35);  
                    }
                break;
                case "cool":
                    if(Save.MaxCooldown>0.5){
                        Pro.money-=cost;
                        Save.MaxCooldown-=0.1;
                        Save.stat.upgrade++;
                    }
                    else{
                        textSize(25);
                        fill(140, 0, 0); 
                        text("Maxed\n Out",x+65,y+35);    
                    }
                break;
                case "throw":
                    Pro.money-=cost;
                    Save.throwSpd+=2;
                    Save.stat.upgrade++;
                break;
                case "heal":
                    Pro.money-=cost;
                    Pro.health=100;
                break;
                case "clear":
                    Pro.money-=cost;
                    bird = [];
                break;
            }
        }
    }
    else{
        textAlign(CENTER,CENTER);
        fill(255, 201, 84);
        textSize(19);
        text(say,x+65,y+35);
    }
    
};
DrawPause.prototype.draw = function(){
    image(this.gameImg,0,0);
    //image(img.woodBackground,0,this.YVel);
    fill(0,0,0,100);
    rect(0,this.YVel,width,height);
    
    Shop.draw(this.YVel);
    ResumeGame.draw(-this.YVel);
    Thelevels.draw(-this.YVel);
    
    themenu.draw(this.YVel);
    
    this.YVel = lerp(this.YVel,0,0.2);
};
DrawPause.prototype.CheckAchieve = function(){
    if(!this.MeasureAchieve){
        for(var i = 0;i<=Save.achievements.length;i++){
            if(Save.achievements[i]){
                this.achievements++;
                
            }
         //   println(i);
        }
        this.MeasureAchieve = true;
    }
     
};
DrawPause.prototype.GameWon = function(){
   // println(Save.achievements.length);

    image(img.woodBackground,0,0);
    //image(img.woodBackground,0,this.YVel);
    fill(0,0,0,100);
    rect(0,0,width,height);
    
    fullText("Congratulations!",300,53,54,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    
    fullText("you beat the game!",300,115,32,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    
    
    fullText("Game Statistics",300,218,49,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    fullText("Achievements:"+this.achievements+"/23",300,272,25,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    fullText("Money: "+ Pro.money,300,307,25,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    fullText("Enemies Killed: "+ (Pro.stat.monster+Pro.stat.bird),300,349,25,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    fullText("Upgrades Done: "+ Pro.stat.upgrade,300,392,25,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    fullText("Weapons to be thrown: "+ Pro.MaxWeapons,300,432,25,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    fullText("Death Tolls: "+ Pro.stat.death,300,474,25,0,1,true,color(255, 255, 255),color(0, 0, 0),2);
    themenu.draw(this.YVel);
    
    this.YVel = lerp(this.YVel,0,0.2);
     if(!Save.achievements[15]){
        Save.achievements[15] = true;
        not.reset();
     }
    if(!Save.achievements[11]&&Pro.stat.death<=0&&!Pro.stat.healthLoss){
        Save.achievements[11] = true;
        not.reset();
    }

};


//}Pause Menu


//{

Transition.prototype.animate = function(){
   
    //Drawing the White block. 
    rectMode(CENTER);
    fill(255,255,255);
    noStroke();
    rect(width/2+this.move,height/2,this.x1,this.y1);
    rectMode(CORNER);

    
    //Take the xsize and expand it to get to the end of the screen
    this.x1 = lerp(this.x1, width, 0.2);
    
    //if it hasnt gotten to the end of the screen lerp the ysize to 10
    if(this.x1<width-0.2){
        this.y1 = lerp(this.y1, 10, 0.2); 
    }
    //Otherwise lerp the ysize to the end of the screen
    else{
       this.y1 = lerp(this.y1, height, 0.2);  
    //   a = Save.levels;
    }
    //If the ysize is at the end of the screen then move the transition off the screen
    if(this.y1>599.9){
        if(this.scene === "advanceLevel"){
            
        }
        
        if(!this.sceneSwitch){
            if(this.scene!=="advanceLevel"){
                scene = this.scene;
                dpause.MeasureAchieve = false;
                dpause.achievements = 0;
            }
            else{
                Save.levels++;
                StartLevel();
            }
            this.sceneSwitch = true;
        }
        this.move+=this.xvel;
        this.xvel+=0.5;//Increasing the xvelocity
    }
    
    //If its off the screen then destroy it
    if(this.move>width){
        this.die = true;
    }
    
}; //Transition function for

ButtonCube.prototype.draw = function(offX){
    //Different cubes for different scenes
    
    //load, menu, new,resume,achieve,shop,book,help,levels
    switch(this.scene){
        case "new":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"New Game");
        break;
        case "resume":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Resume");
        break;
        case "book":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Levels");
        break;
        case "achieve":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Awards");
        break;
        case "help":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Help");
        break;
        case "menu":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Menu");
        break;
        case "resumeGame":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Resume");
        break;
        case "Shop":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Shop");
        break;
        case "Levels":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"levels");
        break;
        case "print":
            Button(this.x-130/2+offX,this.y-25,this.expandS/10,"Save Game");
        break;
    }
    
    
    //If mouse is colliding with block, expand and turn cursor into hand
    if(ctorect(mouseX,mouseY,2,this.x-130/2,this.y-25,130,50)){
        
        this.expandS = lerp(this.expandS,50,0.2); //Expanding the blocks size
        
        cursor(HAND); //Cursor is now a hand
        
        //If you clicked, then activate transition
        if(this.scene === "resumeGame"&&clicked){
            dpause.ShowPause = false;
        }
        else if(this.scene === "print"&&clicked){
            PrintSaveCode();
        }
        else
        if(clicked&&tr.length<1){
            tr.push(new Transition(this.scene) );
        }
    }

    else{
        //otherwise put its size back to normal
        this.expandS = lerp(this.expandS,1,0.3);
    }
};

function Menu(){
    background(0, 0, 0);
    image(img.CastleBackground,0,0);
    image(img.Mists,0,0);
    fill(0,0,0,150);
    rect(0,0,width,height);
    BoxTitle(300,height/3-37,true,1);
    NewGame.draw(0);
    Resume.draw(0);
    Book.draw(0);
    Achieve.draw(0);
    Help.draw(0);
    PrintCode.draw(0);
    if (Logo.timer > 9) {
        Transaa.Shrink();
    }
}
function DrawHelp(){
    background(0, 18, 79);
    image(img.woodBackground,0,0);
    BoxTitle(150,85,false,0.5);
    BoxTitle(450,85,false,0.5);
    BoxTitle(450,255,false,0.5);
    BoxTitle(150,255,false,0.5);
    BoxTitle(450,430,false,0.5);
    BoxTitle(150,430,false,0.5);
    fill(255, 255, 255);


    fullText("WASD",147,53,54,0,1,true,color(255, 255, 255),color(31, 14, 0),2);
    fullText("SPACE",450,55,54,0,1,true,color(255, 255, 255),color(31, 14, 0),2);
    fullText("CLICK",147,225,54,0,1,true,color(255, 255, 255),color(31, 14, 0),2);
    fullText("Press E",450,225,54,0,1,true,color(255, 255, 255),color(31, 14, 0),2);
    fullText("DON'T",450,399,54,0,1,true,color(255, 255, 255),color(31, 14, 0),2);
    fullText("HAVE",150,398,54,0,1,true,color(255, 255, 255),color(31, 14, 0),2);
    
    fullText("to move around",147,105,22,0,1,true,color(255, 255, 255),color(31, 14, 0),1);
    fullText("to dash into\n or through objects",449,111,20,0,1,true,color(255, 255, 255),color(31, 14, 0),1);

    fullText("to use weapons",149,278,20,0,1,true,color(255, 255, 255),color(31, 14, 0),1);
    fullText("to Reveal your stats",447,282,22,0,1,true,color(255, 255, 255),color(31, 14, 0),1);

    fullText("fun =D",149,459,20,0,1,true,color(255, 255, 255),color(31, 14, 0),1);
    fullText("die",447,462,22,0,1,true,color(255, 255, 255),color(31, 14, 0),1);    
    themenu.draw(0);
    
}
function DrawLevels(){
    background(0, 18, 79);
    image(img.woodBackground,0,0);
    if(Save.unlocked<=Save.levels){
        Save.unlocked++;
    }
  //  Resume.draw(0);
    for(var i = 0;i<6;i++){
        dpause.LevelBtn(i*100+50,50,i);
        dpause.LevelBtn(i*100+50,150,i+6);
        dpause.LevelBtn(i*100+50,250,i+12);
        dpause.LevelBtn(i*100+50,350,i+18);
        dpause.LevelBtn(i*100+50,450,i+24);
    }
    
    themenu.draw(0);
    
}
function DrawShop(){
    background(0, 18, 79);
    image(img.woodBackground,0,0);
    
    dpause.Shop(30,200,"weapon","Increase\nWeapons",100);
    dpause.Shop(230,200,"dash","Increase\nDash Speed",80);
    dpause.Shop(430,200,"cool","Decrease\nDash Cool",60);
    dpause.Shop(230,350,"throw","Increase\nThrow Speed",30);
    dpause.Shop(30,350,"heal","Restore\nHealth",10);
    dpause.Shop(430,350,"clear","Clear all\nBirds",300);
    fill(255, 211, 36); 
    textSize(29);
    text(Pro.money,124,41);    
    image(img.coins,3,1);
    shopResume.draw(0);  
    Save.money = Pro.money;
}


var achievements = [
"Play the game",
"Complete the first level",
"kill your first Monster",
"complete 20 levels",
"make a monster happy",
"collect your first 50 coins",

"collect 200 coins",
"defeat 5 monsters",
"collect 500 coins",
"collect a key",
"collect a piece of meat",
"Finish the game without taking any Damage",


"defeat a bird",
"survive 5 levels",
"make 10 monsters happy",
"finish the game",
"upgrade your ninja 10 times",
"defeat 10 birds",


"Die",
"Fall off a cliff",
"Step on a button",
"defeat 20 monsters",
"open 10 locked doors",
"Complete All Achievements",
];

function AchieveBox(ach,x,y,ach1,number){
        pushMatrix();
            translate(x*94,y);
            BoxTitle(33,31,false,0.13,0.2);
            if(!ach){
               Star(33,31,0.3,color(0,0,0,90)); 
            }
            if(ach){
               Star(33,31,0.3,color(255, 196, 0)); 
            }     
            if(dist(mouseX,mouseY,(x*94)+30+33,y+31 )<39){
                fill(0,0,0,70);
                rect(0,0,66,63);
            }
        popMatrix();   
        
        if(dist(mouseX,mouseY,(x*94)+30+33,y+31 )<39){
            cursor(HAND);
            fill(0,0,0,70);
            rect(-30,0,width,50);
            fullText(ach1,width/2-30,25,20,0,1,true,color(255, 255, 255),color(0,0,0),2);
        }
}

function DrawAchieve(){
    background(0, 18, 79);
    image(img.woodBackground,0,0);
    themenu.draw(0);
    pushMatrix();
        translate(30,0);
    for(var i =0;i<6;i++){
        AchieveBox(Save.achievements[i],i,100,achievements[i],i);
        AchieveBox(Save.achievements[i+6],i,200,achievements[i+6],i+6);
        AchieveBox(Save.achievements[i+12],i,300,achievements[i+12],i+12);
        AchieveBox(Save.achievements[i+18],i,400,achievements[i+18],i+18);
    }



    popMatrix();
}

//} Menu


//{

function ShowText(message,x,y,size){
    if(dist(Pro.x,Pro.y,x,y)<200){
    fullText(message,width/2,height-20,size,0,1,true,color(255, 255, 255,200+cos(frameCount*5)*100),color(255, 255, 255,4+cos(frameCount*5)*2),3);
    }
}


function ManageGameplay(){
    if(scene === "new"){
        Save.levels = 0;//Amount of levels unlocked
        Save.MaxWeapons = 3;
        Save.money=0; //your money
        Save.PowerAmnt = 300;//How far you can dash too
        Save.throwSpd = 14; //How high you can throw your object   
        Save.MaxCooldown = 1.1;
        StartLevel(); 
        Save.stat.monster= 0;
        Save.stat.doors= 0;
        Save.stat.upgrade= 0;
        Save.stat.bird= 0;
        Save.stat.happy= 0;
        Save.stat.healthLoss= false;
        Save.stat.death = 0;

    }

    
    
    //Setting the players objects to the save code. If you didnt click new, it will load the save code you inputted
    Pro.MaxWeapons = Save.MaxWeapons;
    Pro.money = Save.money;
    Pro.PowerAmnt = Save.PowerAmnt;
    Pro.throwSpd = Save.throwSpd; 
    Pro.MaxCooldown = Save.MaxCooldown;    
    Pro.stat.death = Save.stat.death;

    Pro.stat.monster= Save.stat.monster;
    Pro.stat.doors=   Save.stat.doors;
    Pro.stat.upgrade= Save.stat.upgrade;
    Pro.stat.bird=    Save.stat.bird;
    Pro.stat.happy=   Save.stat.happy;
    Pro.stat.healthLoss= Save.stat.healthLoss;
    
    if(!dpause.ShowPause){
        StartLevel(); 
    }
    dpause.ShowPause = false;
    scene = "game";
}


function ManageCamera(){
    //Camera shaking on the x and Y
    cam.mx = random(-cam.shake,cam.shake);
    cam.my = random(-cam.shake,cam.shake);
    
    //Putting the shaking back to 0
    cam.shake = lerp(cam.shake,0,0.15);
    
    //Lerping the camera to the players x and Y    
    cam.x = lerp(cam.x,-round(Pro.x+Pro.s/2)+width/2,0.2);
    cam.y = lerp(cam.y,-round(Pro.y+Pro.s/2)+height/2,0.2);    
}


function HelpLevelText(){
    switch(Save.levels){
        case 0:
            ShowText("Welcome Brave Ninja. Get to the portal of crystals to continue",591,340,20);
        break;
        case 1:
            if(smashy.length>0){
                ShowText("Click to shoot the enemy. Shoot him until he dies!",709,340,20);
            }
            else{
               ShowText("Good Job!",709,340,20); 
            }
        break;
        
        case 2:
            if(Pro.keys<=0){
                ShowText("You need a key for this door. Go and find one",581,1040,20);
            }
            else{
              ShowText("Good job! Now get to the portal",781,1040,20);  
            }
        break;
        
        case 3:
         
            ShowText("This monster is sad. Go find him a piece of meat.",1581,540,20);
        
        break;
        
        
        case 4:
         
            ShowText("Press this button to Open cages",666,340,20);
        
        break;
        
        case 5:
            ShowText("Press The Spacebar to dash through walls.",1040,440,20);
        
        break;
        
    }
}


function drawGame(){
    Save.MaxWeapons = Pro.MaxWeapons;
    Save.money = Pro.money;
    Save.PowerAmnt = Pro.PowerAmnt;
    Save.throwSpd = Pro.throwSpd; 
    Save.MaxCooldown = Pro.MaxCooldown;    
    Save.stat.death = Pro.stat.death;

    Save.stat.monster= Pro.stat.monster;
    Save.stat.doors=   Pro.stat.doors;
    Save.stat.upgrade= Pro.stat.upgrade;
    Save.stat.bird=    Pro.stat.bird;
    Save.stat.happy=   Pro.stat.happy;
    Save.stat.healthLoss= Pro.stat.healthLoss;

    //If you have not fallen off a cliff, then give you achievement
    if(!Save.achievements[19]&&Pro.y>4800){
        not.reset();
        Save.achievements[19] = true;      
    }    
    
   if(Pro.y>5000 || Pro.health <=0){
       //Resetting the player
       Pro.health = 100;
       Pro.HurtTiming = 120;
       Pro.y = 0;
       Pro.yvel = 0;
       Pro.keys = 0;
       Pro.bones = 0;
       Pro.stat.death++;
       Pro.stat.healthLoss = true;
       StartLevel();
       

        //If you have not died, then give you the achievement
        if(!Save.achievements[18]){
            not.reset();
            Save.achievements[18] = true;      
        } 
       
   }
   
    //This will change the backdrop to the level you are on
    
    switch(cam.design){
        case "forest":
            image(img.backdrops,cam.mx,cam.my);
        break;
        case "cave":
            image(img.caveBck,cam.mx,cam.my);
        break;
        case "castle":
            image(img.CastleBackground,cam.mx,cam.my);
        break;
    }
    
    
    
    //Drawing the camera management
    ManageCamera();
        
    
    pushMatrix();
        translate(cam.x+cam.mx,cam.y+cam.my);
        
        Pro.draw();//Drawing the character
        if(Pro.canMove){
            Pro.move();
            Pro.moveX(); 
        }
        Pro.update();
    
        //Drawing the smasher, the squishy and the throw guy and its x move positions
        for(var i = smashy.length-1;i>=0;i--){
            smashy[i].draw();
            smashy[i].update();
            smashy[i].MoveX();
            if(smashy[i].die){
                
                smashy.splice(i,1);
            }
        }

        DrawPoof();
        DrawSlash();

        for (var i = 0;i<Blck.length;i++){
            Blck[i].draw();
            Blck[i].collideX(Pro,"player");
            for(var j = smashy.length-1;j>=0;j--){
                Blck[i].collideX(smashy[j],"enemy");
            }
        }
    
        DrawBirdy();
        
        if(Pro.canMove){
            Pro.moveY();
        }
        
        //Drawing the smasher, the squishy and the throw guys y move positions    
        for(var i = smashy.length-1;i>=0;i--){
            smashy[i].MoveY();
        }
            
        for (var i = 0;i<Blck.length;i++){
            Blck[i].collideY(Pro,"player");
            for(var j = smashy.length-1;j>=0;j--){
                Blck[i].collideY(smashy[j],"enemy");
            }
            if(Blck[i].die){
                Blck.splice(i,1);
            }
        }
        
        for (var i = 0;i<items.length;i++){
            items[i].draw();
            if(items[i].die){
                items.splice(i,1);
            }
            
        }
    
        for(var i = shurik.length-1;i>=0;i--){
            shurik[i].draw();
            shurik[i].update();
            if(shurik[i].die||shurik[i].timeout<0){
                shurik.splice(i,1);
            }
        }

        DrawDust();

    popMatrix();
    
    Pro.overlay();
    HelpLevelText();
    dpause.Button();
    
    
    fill(255);
  //  text(this.__frameRate,200,200);
    
}

//}Game




draw = DeKhan.loopDetect(function() {
    try{
      //  println(poofs.length);
        cursor();//Reseting the cursor (this must be put at the beginning of the draw)
        
        //Reduces lag - Vexcess
        this.PJSCodeInjector.prototype.hasOrHadDrawLoop = function() {
            return !(this.enableLoopProtect = false);
        };
        
        //First Achievement: play the game
        if(!Save.achievements[0]){
            not.reset();
            Save.achievements[0] = true;
        }
        
        if(!Save.achievements[23]&&dpause.achievements>=23){
            not.reset();
            Save.achievements[23] = true;
        }
        
        
        dpause.CheckAchieve();
        Pro.Awards();
        
        switch(scene){
            case "load":
                load();
            break;
            case "game":
                if(Save.levels>=maxLevel){
                    dpause.GameWon();
                }
                else if(dpause.ShowPause){
                    dpause.draw();
                }
                else{
                   drawGame(); 
                }
            break;
            case "menu":
                Menu();
            break;
            case "help":
                DrawHelp();
            break;
            case "achieve":
                DrawAchieve();
            break;
            case "book":
                DrawLevels();
            break;
            case "new" :
                ManageGameplay();
            break;
            case "resume" :
                ManageGameplay();
            break;
            case "Logo":
                LogoScene();
            break;
            case "Shop":
                DrawShop();
            break;
            
        }//Switching all the scenes
        
        
        // I neeed to make a button for this. Its the save code
        if(scene!=="load"&&scene!=="Logo"){
            not.style();
            not.update();
            

            
        }
        
        //Transition Drawing
        for(var i = tr.length-1;i>=0;i--){
            tr[i].animate();
            
            //killing it 
            if(tr[i].die){
                tr.splice(i,1);
            }
        }
        
        
        clicked = false;  //Reseting the clicking   (this must be put at the end of the draw)     
    }
    
    catch(e){
        if (!e.infiniteLoopNodeType) {
            println(e.stack.slice(0, e.stack.indexOf("at Processing")));
            noLoop();
        }      
    }
    
});


