import { Tank } from './tank';
import { inputKey } from '../variables';
import { delay } from '../comm';

class Player extends Tank {
  constructor(x, y, direction, type, index, grade = 0) {
    super(x, y, direction, type, index);

    this.speed = 2;
    this.grade = grade;
  }

  stopGame() {
    console.log('你按了H');
  }

  gameCtrl() {
    let pressedFuncKey = inputKey.funcKey;
    let fireAble = !(this.fireDelay && (this.fireDelay -= 1));

    if (inputKey[pressedFuncKey]) {
      pressedFuncKey === 'H' ? this.stopGame() : fireAble && this.newBullet();
    }

    let moveAble = false;
    let changDirectionAble = false;
    let pressedDirectionKey = inputKey.directionKey;

    if (inputKey[pressedDirectionKey]) {
      moveAble = true;
      changDirectionAble = (this.direction !== pressedDirectionKey);
      this.changeWheels();
    }

    return [moveAble, changDirectionAble];
  }

  moveState() {
    return this.gameCtrl();
  }

  draw() {
    this.move();
    this.shield();
    this.drawTank();
  }
}

export { Player };
