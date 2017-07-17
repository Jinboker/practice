import 'static/css.scss';
import RenderGame from './renderGame';
import controller from './ctrlCenter/ctrlCenter';
import { CXT_BG, CXT_MISC, inputParam, keyNum } from './global';

/**
 * 键盘按下的处理函数
 * @param key 按下的是哪个按键，比如'W'之类的
 */
function doAfterKeyDown(key: string) {
  if (inputParam[key]) return;

  key !== 'H' && key !== 'J'
    ? inputParam.directionKey = key
    : inputParam.functionKey = key;

  inputParam.isPressed = true;
  inputParam.pressedKey = key;
  inputParam[key] = true;
}

/**
 * 键盘松开的处理函数
 * @param key 松开的是哪个按键
 */
function doAfterKeyUp(key: string) {
  inputParam[key] = false;
}

/**
 * 事件绑定函数
 */
function initKeyboard() {
  ['keydown', 'keyup'].forEach(eventType => {
    addEventListener(eventType, (ev: KeyboardEvent) => {
      const key = keyNum[ev.keyCode];

      if (key === void 0) return;

      ev.type === 'keydown' ? doAfterKeyDown(key) : doAfterKeyUp(key);
    }, false);
  });
}

/**
 * 游戏的循环渲染函数
 */
function renderLoop() {
  RenderGame.render();
  window.requestAnimationFrame(renderLoop);
}

/**
 * 游戏开始及初始化
 */
window.onload = () => {
  CXT_BG.font = '15px prstart';
  CXT_BG.fillStyle = '#000';
  CXT_BG.textBaseline = 'top';

  CXT_MISC.font = '20px prstart';
  CXT_MISC.fillStyle = '#000';
  CXT_MISC.textBaseline = 'top';

  // 绑定键盘事件
  initKeyboard();
  // 控制中心开始准备渲染游戏界面
  controller.receiveMsg('newGame');
  // 开启循环渲染
  renderLoop();
};
