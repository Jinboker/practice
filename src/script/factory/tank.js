import { Mover } from './mover';
import { DIR, CXT_ROLE } from '../const';
import { res } from '../data';

let shieldImg = res.img.misc;

class Tank extends Mover {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.shieldLastNum;
    this.hasShield = false;
    this.shieldPic = 0;
    this.wheelPic = 0;
    this.drawObjParam = [
      this.rank * 32, DIR[direction] * 64 + this.wheelPic * 32, 32, 32,
      this.X, this.Y, 32, 32
    ];
  }

  shield() {
    if (!this.hasShield) { return; }

    CXT_ROLE.drawImage(
      shieldImg, 32 + this.shieldPic * 32, 0, 32, 32,
      this.X, this.Y, 32, 32
    );
  }

  resetPosition() {
    if (this.isChangeDirection()) {
      this.direction === 'D' || this.direction === 'A'
        ? this.y = Math.round(this.y / 16) * 16
        : this.x = Math.round(this.x / 16) * 16;
    }
  }

  doBeforeDrawObj() {
    this.shield();
  }
}

export { Tank };
