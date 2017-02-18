import { Mover } from './mover';
import { res } from '../data';
import { delay } from '../comm';
import { CXT_ROLE, OFFSET_X, OFFSET_Y, WHEEL_CHANGE_FREQUENT, SHIELD_CHANGE_FREQUENT } from '../const';

const SHIELD_IMG = res.img.misc;

class Tank extends Mover {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.hasShield = true;
    this.shieldPic = 0;
    this.shieldDuration = 200;
    this.shieldDelayNum = SHIELD_CHANGE_FREQUENT;

    this.wheelPic = 0;
    this.wheelDelayNum = WHEEL_CHANGE_FREQUENT;
  }

  // barrierCollisionCoordinate(position, direction) {
  //   let baseCoordinate = [x / 16, y / 16];
  //   let collisionCoordinate = null;
  //
  //   switch(true) {
  //     case direction === 'W':
  //       collisionCoordinate = [x / 16 + 1, (y - 1) / 16];
  //       break;
  //     case direction === 'A':
  //       coordinate = [(x - 1) / 16, y / 16 + 1];
  //       break;
  //     case direction === 'S':
  //       coordinate = [x / 16 + 1, y / 16 + 2];
  //       break;
  //     case direction === 'D':
  //       coordinate = [x / 16 + 2, y / 16 + 1];
  //       break;
  //     default: break;
  //   };
  //
  //   return coordinate;
  // }

  shield() {
    if (!this.hasShield) { return; }

    if (this.shieldDuration > 0) {
      this.shieldDuration --;
      this.shieldDelayNum = delay(this.shieldDelayNum, SHIELD_CHANGE_FREQUENT, () => {
        this.shieldPic = +! this.shieldPic;
      });
      CXT_ROLE.drawImage(SHIELD_IMG, 32 + this.shieldPic * 32, 0, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
    } else {
      this.hasShield = false;
      this.shieldDuration = 200;
    }
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
    this.wheelDelayNum = delay(this.wheelDelayNum, WHEEL_CHANGE_FREQUENT, () => {
      this.wheelPic = +!this.wheelPic;
    });
  }
}

export { Tank };
