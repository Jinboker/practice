import { CXT_ROLE, CXT_BG, CXT_MISC, CXT_W, CXT_H, inputKey } from './variables';

const requestAnimFrame = (() => {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

function delay(delayObj, fn) {
  let count = delayObj.currentCount;

  (count === void 0) && (count = delayObj.count);
  
  count ? count -= 1 : (count = delayObj.count) && fn();

  delayObj.currentCount = count;
}

/**
 * 延时函数
 * @param [number] time 需要延时的时间
 * @param [function] fn 延时到时后需要执行的函数，如果需要循环，那么fn应该返回一个需要延时的时间，否则返回一个undefined
 * return [number] 延迟的时间，每次执行该函数后减1
 */
function delayTimeout(time, fn) {
  if (typeof time !== 'number') {return void 0;}

  return (time = time ? time - 1 : fn());
}

function cleanCxt(...type) {
  let typeArr = type[0] === 'all' ? ['role', 'bg', 'misc'] : type;
  let cxt = { CXT_ROLE, CXT_BG, CXT_MISC };

  typeArr.forEach((n) => {
    cxt[`CXT_${n.toUpperCase()}`].clearRect(0, 0, CXT_W, CXT_H);
  });
}

function doAfterPressKey(operate) {
  if (inputKey.hasPressed && typeof operate[inputKey.pressedKey] === 'function') {
    inputKey.hasPressed = false;
    operate[inputKey.pressedKey]();
  }
}

export {
  requestAnimFrame,
  delay,
  delayTimeout,
  cleanCxt,
  doAfterPressKey
};
