import { Mover } from './mover';
import { res } from '../data';
import { DIR, CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';

const BULLET_IMG = res.img.misc;

class Bullet extends Mover {
  constructor (x, y, direction, type, grade) {
    super(x, y, direction, type);

    // 根据坦克的等级确定子弹的速度
    this.speed = grade ? 5 : 4;
  }

  draw() {
    CXT_ROLE.drawImage(BULLET_IMG, DIR[this.direction] * 8, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }
}

export { Bullet };