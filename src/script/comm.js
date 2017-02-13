import { inputKey } from './var';
import * as CONST from './const';

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
  if (count) {
    count--;
  } else {
    count = totalCount;
    fn();
  }

  return count;
}

function doPressKeyFn (pressKeyObj) {
  if ( inputKey.hasPressed
    && typeof pressKeyObj[inputKey.pressedKey] === "function"
  ) {
    inputKey.hasPressed = false;
    pressKeyObj[inputKey.pressedKey]();
  }
}

function initDrawParam (arr_1, arr_2, paramObj) {
  arr_1.forEach((ele, index) => {
    paramObj[ele] = arr_2[index];
  });
}

function cleanCxt(...type) {
  let typeArr = type[0] === 'all' ? ['role', 'bg', 'misc'] : type;

  typeArr.forEach((n) => {
    CONST[`CXT_${n.toUpperCase()}`].clearRect(0, 0, CONST.CXT_W, CONST.CXT_H);
  });
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);

      Object.defineProperty(target, key, desc);
    }
  }
}

function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

export {
  requestAnimFrame,
  delay,
  doPressKeyFn,
  initDrawParam,
  cleanCxt,
  mix
};