import { inputParam, codeToKey } from './global/var';

interface myEvent extends Event {
  keyCode: number
}

function keyDown(key: string) {
  if (inputParam[key]) return;

  inputParam[key] = true;
}

function keyUp(key: string) {
  inputParam[key] = false;
}

function keyBoardInit() {
  ['keydown', 'keyup'].forEach(eventType => {
    addEventListener(eventType, (ev: myEvent) => {
      let key:string = codeToKey[ev.keyCode];

      if (typeof key === 'undefined') return;
      ev.type === 'keydown' ? keyDown(key) : keyUp(key);
    }, false);
  })
}

export default keyBoardInit;
