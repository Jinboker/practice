import { nextPosition } from '../factoryCommFn/move';
import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';

class Mover {
  constructor (x, y, direction, type) {
    this.x = x * 32;
    this.y = y * 32;
    this.X = this.x + OFFSET_X;
    this.Y = this.y + OFFSET_Y;
    this.direction = direction;    // W A S D
    this.type = type;
    this.rank = 0;
    this.isMove;
    this.drawObjParam;
    this.speed;
  }

  isCollision (position) {
    return false;
  }

  moving () {
    if (!this.moveCtr()) {
      let _nextPosition = nextPosition(this.X, this.Y, this.direction, this.speed);

      !this.isCollision(..._nextPosition) && ([this.X, this.Y] = _nextPosition);
    }
  }

  draw () {
    this.moving();
    this.doBeforeDrawObj();
    CXT_ROLE.drawImage(...this.drawObjParam);
  }
}

export { Mover };