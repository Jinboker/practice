import { CXT_BG, CXT_H, WHEEL_CHANGE_FREQUENT } from '../const';
import { stateCtr } from '../control';
import { delay, cleanCxt, doAfterPressKey } from '../comm';
import { res } from '../data';
import { inputKey } from '../var';


const MIN_Y = 285;
const MAX_Y = 345;

let toTop = false;
let frameY = CXT_H;
let pointY = MIN_Y;
let delayNum = WHEEL_CHANGE_FREQUENT;
let wheelPic = 0;
let playerImg = res.img.player;

let operate = {
  W() { pointY = pointY > MIN_Y ? pointY - 30 : MAX_Y; },
  S() { pointY = pointY < MAX_Y ? pointY + 30 : MIN_Y; },
  H() {
    let mode = (pointY - MIN_Y) / 30 === 2
      ? ['playGame', 'construct']
      : ['enterStage', 'changeAble'];

    stateCtr.receiveMessage(...mode);
  }
};

function init() {
  toTop = false;
  frameY = CXT_H;
  pointY = MIN_Y;
}

function chooseMode() {
  if (toTop) {
    delayNum = delay(delayNum, WHEEL_CHANGE_FREQUENT, () => {
      wheelPic = (+!wheelPic) * 32;
    });

    CXT_BG.clearRect(140, 260, 32, 120);
    CXT_BG.drawImage(playerImg, 0,  64 + wheelPic, 32, 32, 140, pointY, 32, 32);

    doAfterPressKey(operate);
  } else {
    inputKey['H'] ? frameY = 75 : frameY -= 3;

    cleanCxt('bg');
    CXT_BG.save();
    CXT_BG.fillStyle = "white";
    CXT_BG.fillText("I-         00   HI-20000", 70, frameY);
    CXT_BG.fillText("NORMAL MODE", 190, frameY + 220);
    CXT_BG.fillText("CRAZY MODE", 190, frameY + 250);
    CXT_BG.fillText("CONSTRUCTION", 190, frameY + 280);
    CXT_BG.drawImage(res.img.ui, 0, 0, 376, 160, 70, frameY + 25, 376, 160);
    CXT_BG.restore();
  }

  if (frameY <= 75) {
    toTop = true;
    inputKey.hasPressed = false;
  }
};

export {chooseMode};
