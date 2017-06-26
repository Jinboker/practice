import { CXT_BG, CXT_MISC } from './global/const';
import { inputParam, codeToKey } from './global/var';
import controller from './ctrlCenter/ctrlCenter';

function keyDown(key: string) {
  if (inputParam[key]) { return; }

  key !== 'H' && key !== 'J'
    ? inputParam.directionKey = key
    : inputParam.functionKey = key;

  inputParam.isPressed = true;
  inputParam.pressedKey = key;
  inputParam[key] = true;
}

function keyUp(key: string) {
  inputParam[key] = false;
}

function keyBoardInit() {
  ['keydown', 'keyup'].forEach(eventType => {
    addEventListener(eventType, (ev: keyboardEvent) => {
      const key: string = codeToKey[ev.keyCode];

      if (typeof key === 'undefined') { return; }
      ev.type === 'keydown' ? keyDown(key) : keyUp(key);
    }, false);
  });
}

export default function init() {
  CXT_BG.font = '15px prstart';
  CXT_BG.fillStyle = '#000';
  CXT_BG.textBaseline = 'top';

  CXT_MISC.font = '20px prstart';
  CXT_MISC.fillStyle = '#000';
  CXT_MISC.textBaseline = 'top';

  // 控制中心开始准备渲染游戏界面
  controller.receiveMsg('newGame');
  keyBoardInit();
}