import { Tank } from './tank';
import { inputKey } from '../variables';

class Player extends Tank {
  constructor(x, y, direction, type, index, grade = 0) {
    super(x, y, direction, type, index);

    this.speed = 2;
    this.grade = grade;
    this.shieldDuration = 200;
  }

  stopGame() {
  }

  pressFuncKey() {
    let pressedFuncKey = inputKey.funcKey;
    let fireAble = !(this.fireDelay && (this.fireDelay -= 1));

    if (inputKey[pressedFuncKey]) {
      pressedFuncKey === 'H' ? this.stopGame() : fireAble && this.newBullet();
    }
  }

  pressDirectionKey() {
    let pressedDirectionKey = inputKey.directionKey;
    let couldMove = inputKey[pressedDirectionKey];

    if (couldMove) {
      this.changeDirectionAble = (this.direction !== pressedDirectionKey);
      this.changeWheels();
    }

    return couldMove;
  }

  beMoving() {
    this.pressFuncKey();
    return this.pressDirectionKey();
  }

  changeDirectionAble() {
    this.resetPosition();
  }
}

export {Player};
