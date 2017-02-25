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

function delay (count, totalCount, fn) {
  if (count) { return count - 1; }

  fn();
  return totalCount;
}

function cleanCxt(...type) {
  let typeArr = type[0] === 'all' ? ['role', 'bg', 'misc'] : type;
  let cxt = { CXT_ROLE, CXT_BG, CXT_MISC };

  typeArr.forEach((n) => {
    cxt[`CXT_${n.toUpperCase()}`].clearRect(0, 0, CXT_W, CXT_H);
  });
}

function doAfterPressKey (operate) {
  if ( inputKey.hasPressed
    && typeof operate[inputKey.pressedKey] === "function"
  ) {
    inputKey.hasPressed = false;
    operate[inputKey.pressedKey]();
  }
}

export {
  requestAnimFrame,
  delay,
  cleanCxt,
  doAfterPressKey
};
