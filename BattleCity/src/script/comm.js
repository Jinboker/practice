import { inputKey } from './var';

const requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

function delay (count, totalCount, fn) {
  if (count) {
    count--;
  } else {
    count = totalCount;
    fn();
  }

  return count;
}

function doPressKeyFn (pressKeyObj) {
  if (inputKey.hasPressed && typeof pressKeyObj[inputKey.pressedKeyCode] === "function") {
    inputKey.hasPressed = false;
    pressKeyObj[inputKey.pressedKeyCode]();
  }
}

function resetObj (arr_1, arr_2, obj) {
  arr_1.forEach((n) => {
    obj[n] = arr_2[n];
  });
  return obj;
}

export { requestAnimFrame, delay, doPressKeyFn, resetObj };