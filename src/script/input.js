import { inputKey } from './var';
import { W, A, S, D, H, J } from './const';

let codeToKey = {
  [W]: 'W',
  [A]: 'A',
  [S]: 'S',
  [D]: 'D',
  [H]: 'H',
  [J]: 'J'
};

function keyDown (key) {
  if (!inputKey[key]) {
    inputKey.hasPressed = true;
    inputKey.pressedKey = codeToKey[key];
    inputKey[key] = true;
  }
}

function keyUp (key) {
  inputKey[key] = false;
}

// keyboard event
function keyBoardInit (isPc, ...eventArray) {
  eventArray.forEach((n) => {
    addEventListener(n, (ev) => {
      let key = ev.keyCode;

      if (typeof inputKey[key] === 'boolean') {
        (ev.type === 'keydown') ? keyDown(key) : keyUp(key);
      }
    }, false);
  });
}

export { keyBoardInit };