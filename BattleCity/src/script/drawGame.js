import { state } from './var';
import { res } from './data';
import { can, W, S, H, inputKey } from './var';
import { delay } from './comm';

const DELAY_TOTAL_COUNT = 8;

let cxt = can.cxt;
let delayNum = DELAY_TOTAL_COUNT;
let drawModeParam = {
  getToTop: false,
  frameY: cxt.h,
  pointY: 285,
  wheelPicX: 0
};

function drawMode () {
  if (drawModeParam.getToTop) {
    switch(true) {

    }

    delayNum = delay(delayNum, DELAY_TOTAL_COUNT, () => {
      drawModeParam.wheelPicX = (+!drawModeParam.wheelPicX) * 32;
    });
    cxt.bg.clearRect(140, 260, 32, 120);
    cxt.bg.drawImage(res.img.player, 0,  64 + drawModeParam.wheelPicX, 32, 32, 140, drawModeParam.pointY, 32, 32);
  } else {
    // if press key H, then frame change to top
    inputKey[H] ? drawModeParam.frameY = 75 : drawModeParam.frameY -= 3;

    cxt.bg.save();
    cxt.bg.fillStyle = "white";
    cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
    cxt.bg.fillText("I-         00   HI-20000", 70, drawModeParam.frameY);
    cxt.bg.fillText("1 PLAYER", 190, drawModeParam.frameY + 220);
    cxt.bg.fillText("2 PLAYERS", 190, drawModeParam.frameY + 250);
    cxt.bg.fillText("CONSTRUCTION", 190, drawModeParam.frameY + 280);
    cxt.bg.drawImage(res.img.ui, 0, 0, 376, 160, 70, drawModeParam.frameY + 25, 376, 160);
    cxt.bg.restore();
  }

  if (drawModeParam.frameY <= 75) {
    drawModeParam.getToTop = true;
  }
}

let drawStageParam = {

}

function drawStage () {

}

let drawPlayParam = {

};

function drawPlay () {

}

let drawOverParam = {

};

function drawOver () {

}

function drawGame () {
  switch (state.gameState) {
    case 'mode': drawMode(); break;
    case 'stage': drawStage(); break;
    case 'play': drawPlay(); break;
    case 'over': drawOver(); break;
    default: break;
  }
}

export { drawGame };