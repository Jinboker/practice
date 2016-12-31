import { W, S, H, CXT_BG, CXT_MISC, CXT_W, CXT_H, SCREEN_L, OFFSET_X, OFFSET_Y } from './const';
import { state, inputKey, game } from './var';
import { res } from './data';
import { delay, doPressKeyFn, initDrawParam, cleanCxt } from './comm';
import { stateCtr } from './stateControl';
import { drawMap } from './map';

const DELAY_TOTAL_COUNT = 8;

let delayNum = DELAY_TOTAL_COUNT;

/**************************** draw mode ***********************************/
const MIN_POINT_Y = 285;
const MAX_POINT_Y = 345;

let drawModeParam = {
  getToTop: false,
  frameY: CXT_H,
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
    : ['enterStage', 'changeAble'];

  stateCtr.receiveMessage(...mode);
};

function initDrawModeParam () {
  let keyArr = ['getToTop', 'frameY', 'pointY'];
  let valArr = [false, CXT_H, MIN_POINT_Y];

  initDrawParam(keyArr, valArr, drawModeParam);
}

function drawMode () {
  if (drawModeParam.getToTop) {
    delayNum = delay(delayNum, DELAY_TOTAL_COUNT, () => {
      drawModeParam.wheelPicX = (+!drawModeParam.wheelPicX) * 32;
    });

    CXT_BG.clearRect(140, 260, 32, 120);
    CXT_BG.drawImage(res.img.player, 0,  64 + drawModeParam.wheelPicX, 32, 32, 140, drawModeParam.pointY, 32, 32);

    doPressKeyFn(drawModeParam);
  } else {
    // if press key H, move to top
    inputKey[H] ? drawModeParam.frameY = 75 : drawModeParam.frameY -= 3;

    cleanCxt('bg');
    CXT_BG.save();
    CXT_BG.fillStyle = "white";
    CXT_BG.fillText("I-         00   HI-20000", 70, drawModeParam.frameY);
    CXT_BG.fillText("1 PLAYER", 190, drawModeParam.frameY + 220);
    CXT_BG.fillText("2 PLAYERS", 190, drawModeParam.frameY + 250);
    CXT_BG.fillText("CONSTRUCTION", 190, drawModeParam.frameY + 280);
    CXT_BG.drawImage(res.img.ui, 0, 0, 376, 160, 70, drawModeParam.frameY + 25, 376, 160);
    CXT_BG.restore();
  }

  if (drawModeParam.frameY <= 75) {
    drawModeParam.getToTop = true;
    inputKey.hasPressed = false;
  }
}

/**************************** draw stage ***********************************/
const HALF_CURTAIN = CXT_H / 2;

let drawStageParam = {
  process: 0,
  halfCurtain: 0,
  enterPlayDelay: 80,
  halfPlayScreen: 0
};

drawStageParam[W] = () => {
  game.stage = game.stage > 1 ? game.stage - 1 : game.maxStage;
};
drawStageParam[S] = () => {
  game.stage = game.stage < game.maxStage ? game.stage + 1 : 1;
};
drawStageParam[H] = () => {
  res.audio.start.play();
  drawStageParam.process = 2;
};

function initDrawStageParam () {
  let keyArr = ['getToTop', 'frameY', 'pointY'];
  let valArr = [false, CXT_H, MIN_POINT_Y];

  initDrawParam(keyArr, valArr, drawStageParam);
}

function doBeforeEnterPlay () {
  CXT_BG.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
  cleanCxt('misc');
  CXT_MISC.save();
  CXT_MISC.fillStyle = '#666';
  CXT_MISC.fillRect(0, 0, CXT_W, CXT_H);
  CXT_MISC.restore();
  drawMap(game.stage - 1);
}

function drawStage () {
  switch (drawStageParam.process) {
    case 0:
      CXT_BG.save();
      CXT_BG.fillStyle = '#666';
      CXT_BG.fillRect(0, 0, CXT_W, drawStageParam.halfCurtain);
      CXT_BG.fillRect(0, CXT_H - drawStageParam.halfCurtain, CXT_W, drawStageParam.halfCurtain);
      CXT_BG.restore();

      drawStageParam.halfCurtain <= HALF_CURTAIN
        ? drawStageParam.halfCurtain += 15
        : drawStageParam.process = 1;
      break;
    case 1:
      CXT_MISC.clearRect(180, 210, 220, 40);
      CXT_MISC.fillText(`STAGE  ${game.stage}`, 180, 218);

      if (state.changeStageAble) {
        doPressKeyFn(drawStageParam);
      } else {
        console.log(2);
      }
      break;
    case 2:
      drawStageParam.enterPlayDelay = delay(drawStageParam.enterPlayDelay, 80, () => {
        doBeforeEnterPlay();
        drawStageParam.process = 3;
      });
      break;
    case 3:
      CXT_MISC.clearRect(OFFSET_X + 208 - drawStageParam.halfPlayScreen, OFFSET_Y, 2 * drawStageParam.halfPlayScreen, SCREEN_L);

      if (drawStageParam.halfPlayScreen < 208) {
        drawStageParam.halfPlayScreen += 15;
      } else {
        stateCtr.receiveMessage('playGame', 'fight');
      }
      break;
    default: break;;
  }
}

/**************************** draw play ***********************************/
let drawPlayParam = {

};

let delayA = 100;

function drawPlay () {
  delayA = delay(delayA, 100, () => {
    stateCtr.receiveMessage('thisStageOver', 'nextStage');
  });
}

/**************************** draw over ***********************************/
let drawOverParam = {

};

function drawOver () {
  console.log(1);
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