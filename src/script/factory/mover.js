import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';

let moveIncrement = {
  W(speed) {
    return [speed, 0];
  },
  D(speed) {
    return [speed, 0];
  },
  S(speed) {
    return [0, speed];
  },
  A(speed) {
    return [-speed, 0];
  }
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
    this.speed;
  }

  isCollision(position) {
    return false;
  }

  move() {
    let [moveAble, changeDirectionAble] = this.moveState();

    if (!moveAble) {return;}

    let _nextPosition = changeDirectionAble
      ? this.resetPosition()
      : this.nextPosition(this.X, this.Y, this.direction, this.speed);

    !this.isCollision(..._nextPosition) && ([this.X, this.Y] = _nextPosition);
  }

  nextPosition(x, y, direction, speed) {
    let offsetArr = moveIncrement[`${direction}_key`](speed);

    return [x + offsetArr[0], y + offsetArr[1]];
  }

  draw() {
    this.move();
    this.doBeforeDrawObj();
    CXT_ROLE.drawImage(...this.drawObjParam);
  }
}

export { Mover };
