import { keyNum, keyBoardState } from '../var';

const handleKeyDown = (key: string) => {
  keyBoardState[key] = false;
};

const handleKeyUp = (key: string) => {
  if (keyBoardState[key]) { return; }

  key !== 'J' && key !== 'H'
    ? keyBoardState.directKey = key
    : keyBoardState.fnKey = key;

  keyBoardState.isPressed = true;
  keyBoardState.pressedKey = key;
  keyBoardState[key] = true;
};

export default function () {
  ['keydown', 'keyup'].forEach(eventType => {
    addEventListener(
      eventType,
      (ev: KeyboardEvent) => {
        const key = keyNum[ev.keyCode];

        if (key === void 0) { return; }

        ev.type === 'keydown' ? handleKeyDown(key) : handleKeyUp(key);
      },
      false
    );
  });
}
