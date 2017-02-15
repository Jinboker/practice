import { Mover } from './mover';
import { res } from '../data';
import { delay } from '../comm';
import { CXT_ROLE, OFFSET_X, OFFSET_Y, WHEELE_CHANGE_FREQUENT } from '../const';

const SHIELD_IMG = res.img.misc;

let wheelDelayNum = WHEELE_CHANGE_FREQUENT;

class Tank extends Mover {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.hasShield = false;
    this.shieldPic = 0;
    this.wheelPic = 0;
  }

  shield() {
    if (!this.hasShield) { return; }

    CXT_ROLE.drawImage(
      SHIELD_IMG, 32 + this.shieldPic * 32, 0, 32, 32,
      this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32
    );
  }

  // 坦克改变方向后需要重置位置
  resetPosition() {
    let x = this.x;
    let y = this.y;

    this.direction === 'W' || this.direction === 'S'
      ? x = Math.round(this.x / 16) * 16
      : y = Math.round(this.y / 16) * 16;

    return [x, y];
  }

  changeWheels() {
    wheelDelayNum = delay(wheelDelayNum, WHEELE_CHANGE_FREQUENT, () => {
      this.wheelPic = +!this.wheelPic;
    });
  }
}

export { Tank };
