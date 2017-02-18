import { inputKey } from '../var';

let movePosition = {
  W(speed) { return [0, -speed]; },
  D(speed) { return [speed, 0]; },
  S(speed) { return [0, speed]; },
  A(speed) { return [-speed, 0]; }
};

class Mover {
  constructor(x, y, direction, type) {
    this.coordinate;
    this.x = x * 32;
    this.y = y * 32;
    this.direction = direction;    // W A S D
    this.type = type;
    this.rank = 0;
  }

  isCollision(changeDirection, position) {
    return false;
    // return this.tankCollision() && this.barrierCollision(position);
  }

  tankCollision() {
    return false;
  }

  barrierCollision(position) {
    return false;
  }

  move() {
    let [moveAble, changeDirectionAble] = this.moveState();

    if (!moveAble) {return;}

    let position = changeDirectionAble
      ? this.resetPosition()
      : this.toNextPosition();

    if (!this.isCollision(changeDirectionAble, position)) {
      changeDirectionAble && (this.direction = inputKey.directionKey);
      [this.x, this.y] = position;
    }
  }

  toNextPosition() {
    let offsetArr = movePosition[`${this.direction}`](this.speed);

    return [this.x + offsetArr[0], this.y + offsetArr[1]];
  }
}

export { Mover };
