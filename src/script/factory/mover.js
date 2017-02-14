import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';

let movePosition = {
  W(speed) { return [0, -speed]; },
  D(speed) { return [speed, 0]; },
  S(speed) { return [0, speed]; },
  A(speed) { return [-speed, 0]; }
};

class Mover {
  constructor(x, y, direction, type) {
    this.x = x * 32;
    this.y = y * 32;
    this.X = this.x + OFFSET_X;
    this.Y = this.y + OFFSET_Y;
    this.direction = direction;    // W A S D
    this.type = type;
    this.rank = 0;
    this.drawObjParam;
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
      [this.X, this.Y] = position;
    }
  }

  toNextPosition() {
    let offsetArr = movePosition[`${this.direction}`](this.speed);

    return [this.X + offsetArr[0], this.Y + offsetArr[1]];
  }

  draw() {
    this.move();
    // this.doBeforeDrawObj();
    // console.log(this.drawObjParam);
    CXT_ROLE.drawImage(...this.drawObjParam);
  }
}

export { Mover };
