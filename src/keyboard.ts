import { inputParam, codeToKey } from './global/var';

interface keyboardEvent extends Event {
  keyCode: number
}

function keyDown(key: string) {
  if (inputParam[key]) return;

  key !== 'H' && key !== 'J'
    ? inputParam.directionKey = key
    : inputParam.functionKey = key;

  inputParam.isPressed = true;
  inputParam.pressedKey = key;
  inputParam[key] = true;
}

function keyUp(key: string) {
  inputParam[key] = false;
}

function keyBoardInit() {
  ['keydown', 'keyup'].forEach(eventType => {
    addEventListener(eventType, (ev: keyboardEvent) => {
      let key: string = codeToKey[ev.keyCode];

      if (typeof key === 'undefined') return;
      ev.type === 'keydown' ? keyDown(key) : keyUp(key);
    }, false);
  })
}

export default keyBoardInit;
