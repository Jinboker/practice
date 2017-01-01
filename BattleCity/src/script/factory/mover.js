import { positionAfterMove } from '../factoryCommFn/move';
import { CXT_ROLE } from '../const';

class Mover {
  constructor (x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.moveAble = true;
    this.speed;
  }

  isCollision (position) {

  }

  move () {
    let _position = positionAfterMove(this.x, this.y, this.direction, this.speed);

    !this.isCollision(..._position) && ([this.x, this.y] = _position);
  }

  draw () {
    this.moveAble && this.move();
    CXT_ROLE.drawImage(...this.drawImgParam);
  }
}

export { Mover };