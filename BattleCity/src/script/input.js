import { inputKey } from './var';

function keyDown (key) {
  if (!inputKey[key]) {
    inputKey.pressedKeyCode = key;
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