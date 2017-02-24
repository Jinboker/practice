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
  if (count) {
    count--;
  } else {
    count = totalCount;
    fn();
  }

  return count;
}

let cxt = { CXT_ROLE, CXT_BG, CXT_MISC };

function cleanCxt(...type) {
  let typeArr = type[0] === 'all' ? ['role', 'bg', 'misc'] : type;

  typeArr.forEach((n) => {
    cxt[`CXT_${n.toUpperCase()}`].clearRect(0, 0, CXT_W, CXT_H);
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

function doAfterPressKey (operate) {
  if ( inputKey.hasPressed
    && typeof operate[inputKey.pressedKey] === "function"
  ) {
    inputKey.hasPressed = false;
    operate[inputKey.pressedKey]();
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
  cleanCxt,
  mix,
  doAfterPressKey
};