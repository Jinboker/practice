import { CXT_ROLE, CXT_BG, CXT_MISC, CXT_W, CXT_H, SCREEN_L, OFFSET_X, OFFSET_Y, WHEEL_CHANGE_FREQUENT } from './const';
import { state, inputKey, game, obj } from './var';
import { res, npcData } from './data';
import { delay, doPressKeyFn, initDrawParam, cleanCxt } from './comm';
import { stateCtr } from './control';
import { drawMap } from './map';
import { objInit } from './init';

let drawType = {};

/**************************** draw mode ***********************************/
const MIN_POINT_Y = 285;
const MAX_POINT_Y = 345;

let delayNum = WHEEL_CHANGE_FREQUENT;
let drawStartParam = {
  getToTop: false,
  frameY: CXT_H,
  pointY: MIN_POINT_Y,
  wheelPicX: 0
};

drawStartParam.W = () => {
  drawStartParam.pointY > MIN_POINT_Y
    ? drawStartParam.pointY -= 30
    : drawStartParam.pointY = MAX_POINT_Y;
};
drawStartParam.S = () => {
  drawStartParam.pointY < MAX_POINT_Y
    ? drawStartParam.pointY += 30
    : drawStartParam.pointY = MIN_POINT_Y;
};
drawStartParam.H = () => {
  let mode = (drawStartParam.pointY - MIN_POINT_Y) / 30 === 2
    ? ['playGame', 'construct']
    : ['enterStage', 'changeAble'];

  stateCtr.receiveMessage(...mode);
};

function initDrawStartParam () {
  let keyArr = ['getToTop', 'frameY', 'pointY'];
  let valArr = [false, CXT_H, MIN_POINT_Y];

  initDrawParam(keyArr, valArr, drawStartParam);
}

drawType.start = () => {
  if (drawStartParam.getToTop) {
    delayNum = delay(delayNum, WHEEL_CHANGE_FREQUENT, () => {
      drawStartParam.wheelPicX = (+!drawStartParam.wheelPicX) * 32;
    });

    CXT_BG.clearRect(140, 260, 32, 120);
    CXT_BG.drawImage(res.img.player, 0,  64 + drawStartParam.wheelPicX, 32, 32, 140, drawStartParam.pointY, 32, 32);

    doPressKeyFn(drawStartParam);
  } else {
    // if press key H, move to top
    inputKey['H'] ? drawStartParam.frameY = 75 : drawStartParam.frameY -= 3;

    cleanCxt('bg');
    CXT_BG.save();
    CXT_BG.fillStyle = "white";
    CXT_BG.fillText("I-         00   HI-20000", 70, drawStartParam.frameY);
    CXT_BG.fillText("NORMAL MODE", 190, drawStartParam.frameY + 220);
    CXT_BG.fillText("CRAZY MODE", 190, drawStartParam.frameY + 250);
    CXT_BG.fillText("CONSTRUCTION", 190, drawStartParam.frameY + 280);
    CXT_BG.drawImage(res.img.ui, 0, 0, 376, 160, 70, drawStartParam.frameY + 25, 376, 160);
    CXT_BG.restore();
  }

  if (drawStartParam.frameY <= 75) {
    drawStartParam.getToTop = true;
    inputKey.hasPressed = false;
  }
}

/**************************** draw stage ***********************************/
const HALF_CURTAIN = CXT_H / 2;
const MAX_STAGE = npcData.length;

let drawStageParam = {
  process: 0,
  halfCurtain: 0,
  enterPlayDelay: 80,
  halfPlayScreen: 0
};

drawStageParam.W = () => {
  game.stage = game.stage > 1 ? game.stage - 1 : MAX_STAGE;
};
drawStageParam.S = () => {
  game.stage = game.stage < MAX_STAGE ? game.stage + 1 : 1;
};
drawStageParam.H = () => {
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

drawType.stage = () => {
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

      if (state.stageState === 'changeAble') {
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
        objInit();
      }
      break;
    default: break;;
  }
}

/**************************** draw play ***********************************/
let drawPlayParam = {

};

drawType.play = () => {
  CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
  obj.player.draw();
}

/**************************** draw over ***********************************/
let drawOverParam = {
};

drawType.over = () => {
  console.log(1);
  console.log(2);
}

/**************************** draw game ***********************************/
let drawGame = () => drawType[state.gameState]();

export { drawGame };