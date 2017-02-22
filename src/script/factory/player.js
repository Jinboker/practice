import { Tank } from './tank';
import { res } from '../data';
import { inputKey } from '../var';



class Player extends Tank {
  constructor(x, y, direction, type, grade = 0) {
    super(x, y, direction, type);

    this.speed = 2;
    this.grade = grade;
  }

  moveState() {
    let pressedDirectionKey = inputKey.directionKey;
    let moveAble = false;
    let changDirectionAble = false;

    if (inputKey[pressedDirectionKey]) {
      moveAble = true;
      changDirectionAble = (this.direction !== pressedDirectionKey);
      this.changeWheels();
    }

    return [moveAble, changDirectionAble]
  }

  draw() {
    this.move();
    this.shield();
    this.drawTank();
  }
}

export { Player };
