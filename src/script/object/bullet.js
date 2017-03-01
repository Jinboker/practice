import { Mover } from './mover';
import { res } from '../data';
import { DIR, CXT_ROLE, OFFSET_X, OFFSET_Y } from '../variables';

const BULLET_IMG = res.img.misc;

class Bullet extends Mover {
  constructor (x, y, direction, type, grade) {
    super(x, y, direction, type);

    // 根据坦克的等级确定子弹的速度
    this.speed = grade ? 5 : 4;

    this.init();
  }

  init() {
    let resetDirection = {
      W: [this.x + 12, this.y],
      A: [this.x, this.y + 12],
      S: [this.x + 12, this.y + 24],
      D: [this.x + 24, this.y + 12]
    };

    [this.x, this.y] = resetDirection[this.direction];
  }

  draw() {
    this.move();
    CXT_ROLE.drawImage(BULLET_IMG, DIR[this.direction] * 8, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }

  moveState() {
    return [true, false];
  }
}

export { Bullet };