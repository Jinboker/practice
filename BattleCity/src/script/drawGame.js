import { state } from './var';
import { res } from './data';
import { can, inputKey, game } from './var';
import { delay, doPressKeyFn, initDrawParam } from './comm';
import { stateCtr } from './stateControl';
import { drawMap } from './map';

const W = 87;
const S = 83;
const H = 72;
const DELAY_TOTAL_COUNT = 8;

let cxt = can.cxt;
let delayNum = DELAY_TOTAL_COUNT;

/**************************** draw mode ***********************************/
const MIN_POINT_Y = 285;
const MAX_POINT_Y = 345;

let drawModeParam = {
  getToTop: false,
  frameY: cxt.h,
  pointY: MIN_POINT_Y,
  wheelPicX: 0
};

drawModeParam[W] = () => {
  drawModeParam.pointY > MIN_POINT_Y
    ? drawModeParam.pointY -= 30
    : drawModeParam.pointY = MAX_POINT_Y;
};
drawModeParam[S] = () => {
  drawModeParam.pointY < MAX_POINT_Y
    ? drawModeParam.pointY += 30
    : drawModeParam.pointY = MIN_POINT_Y;
};
drawModeParam[H] = () => {
  let mode = (drawModeParam.pointY - MIN_POINT_Y) / 30 === 2
    ? ['playGame', 'construct']
    : ['enterStage', true];

  stateCtr.ReceiveMessage(...mode);
};

function initDrawModeParam () {
  let keyArr = ['getToTop', 'frameY', 'pointY'];
  let valArr = [false, cxt.h, MIN_POINT_Y];

  initDrawParam(keyArr, valArr, drawModeParam);
}

function drawMode () {
  if (drawModeParam.getToTop) {
    doPressKeyFn(drawModeParam);

    delayNum = delay(delayNum, DELAY_TOTAL_COUNT, () => {
      drawModeParam.wheelPicX = (+!drawModeParam.wheelPicX) * 32;
    });

    cxt.bg.clearRect(140, 260, 32, 120);
    cxt.bg.drawImage(res.img.player, 0,  64 + drawModeParam.wheelPicX, 32, 32, 140, drawModeParam.pointY, 32, 32);
  } else {
    // if press key H, move to top
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
    inputKey.hasPressed = false;
  }
}

/**************************** draw stage ***********************************/
const HALF_CURTAIN = cxt.h / 2;

let drawStageParam = {
  process: 0,
  halfCurtain: 0
};

drawStageParam[W] = () => {
  game.stage = game.stage > 1 ? game.stage-- : game.maxStage;
};
drawStageParam[S] = () => {
  game.stage = game.stage < game.maxStage ? game.stage++ : 1;
};
drawStageParam[H] = () => {
  drawStageParam.process = 2;
};

function initDrawStageParam () {
  drawStageParam = {
  };
}

function drawStage () {
  switch (drawStageParam.process) {
    case 0:
      cxt.bg.save();
      cxt.bg.fillStyle = '#666';
      cxt.bg.fillRect(0, 0, cxt.w, drawStageParam.halfCurtain);
      cxt.bg.fillRect(0, cxt.h - drawStageParam.halfCurtain, cxt.w, drawStageParam.halfCurtain);
      cxt.bg.restore();

      drawStageParam.halfCurtain <= HALF_CURTAIN
        ? drawStageParam.halfCurtain += 15
        : drawStageParam.process = 1;
      break;
    case 1:
      cxt.misc.save();
      cxt.misc.clearRect(0, 0, cxt.w, cxt.h);
      cxt.misc.fillText(`STAGE  ${game.stage}`, 180, 218);
      cxt.misc.restore();

      state.changeStageAble && doPressKeyFn(drawStageParam);
      break;
    case 2:
      drawMap(game.stage - 1);
      break;
    default: break;;
  }
}

/**************************** draw play ***********************************/
let drawPlayParam = {

};

function drawPlay () {
  console.log(2);
}

/**************************** draw over ***********************************/
let drawOverParam = {

};

function drawOver () {

}

/**************************** draw game ***********************************/
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