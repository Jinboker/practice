import { inputKey } from './var';

let codeToKey = {
  87: 'W',
  65: 'A',
  83: 'S',
  68: 'D',
  72: 'H',
  74: 'J'
};

function keyDown (key) {
  if (!inputKey[key]) {
    key !== 'H' && key !== 'J'
      ? inputKey.directionKey = key
      : inputKey.funcKey = key;

    inputKey.hasPressed = true;
    inputKey.pressedKey = key;
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
      let key = codeToKey[ev.keyCode];

      if (typeof key !== 'undefined') {
        ev.type === 'keydown' ? keyDown(key) : keyUp(key);
      }
    }, false);
  });
}

export { keyBoardInit };
