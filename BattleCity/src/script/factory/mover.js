import { positionAfterMove } from '../factoryCommFn/move';
import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';

class Mover {
  constructor (x, y, direction) {
    this.x = x * 32;
    this.y = y * 32;
    this.X = this.x + OFFSET_X;
    this.Y = this.y + OFFSET_Y;
    this.direction = direction;
    this.moveAble = true;
    this.rank = 0;
    this.drawObjParam;
    this.speed;
  }

  isCollision (position) {

  }

  move () {
    this.resetPosition();

    if (!this.moveAble) { return; }

    // let _position = positionAfterMove(this.X, this.Y, this.direction, this.speed);
    //
    // !this.isCollision(..._position) && ([this.X, this.Y] = _position);
  }

  draw () {
    this.move();
    this.doBeforeDrawObj();
    CXT_ROLE.drawImage(...this.drawObjParam);
  }
}

export { Mover };