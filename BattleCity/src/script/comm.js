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

function initDrawParam (arr_1, arr_2, paramObj) {
  arr_1.forEach((ele, index) => {
    paramObj[ele] = arr_2[index];
  });
}

export { requestAnimFrame, delay, doPressKeyFn, initDrawParam };