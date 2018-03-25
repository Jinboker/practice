import { keyNum, keyBoard } from '../var';

const handleKeyDown = (key: string) => {
  keyBoard[key] = false;
};

const handleKeyUp = (key: string) => {
  if (keyBoard[key]) { return; }

  key !== 'J' && key !== 'H'
    ? keyBoard.directKey = key
    : keyBoard.fnKey = key;

  keyBoard.isPressed = true;
  keyBoard.pressedKey = key;
  keyBoard[key] = true;
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
