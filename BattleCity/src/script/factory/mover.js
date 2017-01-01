import { positionAfterMove } from '../factoryCommFn/move';
import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';

class Mover {
  constructor (x, y, direction) {
    this.x = x + OFFSET_X;
    this.y = y + OFFSET_Y;
    this.direction = direction;
    this.moveAble = true;
    this.rank = 0;
    this.drawObjParam;
    this.speed;
  }

  isCollision (position) {

  }

  move () {
    if (!this.moveAble) { return; }

    let _position = positionAfterMove(this.x, this.y, this.direction, this.speed);

    !this.isCollision(..._position) && ([this.x, this.y] = _position);
  }

  drawObj () {
    CXT_ROLE.drawImage(...this.drawObjParam);
  }
}

export { Mover };