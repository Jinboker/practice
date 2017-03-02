import { Tank } from './tank';
import { inputKey } from '../variables';

class Player extends Tank {
  constructor(x, y, direction, type, index, grade = 0) {
    super(x, y, direction, type, index);

    this.speed = 2;
    this.grade = grade;
  }

  stopGame() {
    console.log(1);
  }

  gameCtrl() {
    let pressedFuncKey = inputKey.funcKey;

    if (inputKey[pressedFuncKey]) {
      pressedFuncKey === 'H' ? this.stopGame() : this.newBullet();
    }

    let moveAble = false;
    let changDirectionAble = false;
    let pressedDirectionKey = inputKey.directionKey;

    if (inputKey[pressedDirectionKey]) {
      moveAble = true;
      changDirectionAble = (this.direction !== pressedDirectionKey);
      console.log(changDirectionAble);
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
