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

  // 坦克改变方向后需要重置位置
  resetPosition() {
    let x = this.x;
    let y = this.y;

    this.direction === 'D' || this.direction === 'A'
      ? y = Math.round(this.y / 16) * 16
      : x = Math.round(this.x / 16) * 16;

    return [x, y];
  }

  doBeforeDrawObj() {
    this.shield();
  }
}

export { Tank };
