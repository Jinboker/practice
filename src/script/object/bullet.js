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
      W: [this.x + 16, this.y + 4],
      A: [this.x + 4, this.y + 16],
      S: [this.x + 16, this.y + 28],
      D: [this.x + 28, this.y + 16]
      // W() {return [this.x + 16, this.y + 4];},
      // A() {return [this.x + 4, this.y + 16];},
      // S() {return [this.x + 16, this.y + 28];},
      // D() {return [this.x + 28, this.y + 16];}
    };

    [this.x, this.y] = resetDirection[this.direction];
    console.log(this.x, this.y);
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