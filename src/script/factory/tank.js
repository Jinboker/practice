import { Mover } from './mover';
import { res } from '../data';

let shieldImg = res.img.misc;

class Tank extends Mover {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.shieldLastNum;
    this.hasShield = false;
    this.shieldPic = 0;
    this.wheelPic = 0;
  }

  shield() {
    if (!this.hasShield) { return; }

    CXT_ROLE.drawImage(
      shieldImg, 32 + this.shieldPic * 32, 0, 32, 32,
      this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32
    );
  }

  // 坦克改变方向后需要重置位置
  resetPosition() {
    let x = this.x;
    let y = this.y;

    this.direction === 'D' || this.direction === 'A'
      ? x = Math.round(this.x / 16) * 16
      : y = Math.round(this.y / 16) * 16;

    return [x, y];
  }

  doBeforeDrawObj() {
    this.shield();
  }
}

export { Tank };
