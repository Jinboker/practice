import { Mover } from './mover';
import { res } from '../data';
import { roadMap } from '../map';
import { DIR, CXT_ROLE, CXT_BG, OFFSET_X, OFFSET_Y } from '../variables';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;
const ROAD_TYPE = {
  3: 'brick',
  4: 'steel',
  5: 'home'
};

class Bullet extends Mover {
  constructor (x, y, direction, type, index, grade) {
    super(x, y, direction, type, index);

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

  clearBarrier(row, col) {
    roadMap[row][col] = 0;
    CXT_BG.clearRect(OFFSET_X + (col << 4), OFFSET_Y + (row << 4), 16, 16);
  }

  brick(row, col) {
    console.log('brick', row, col);
  }

  steel(row, col) {
    this.grade === 3 ? this.clearBarrier(row, col) : ATTACK_OVER_AUD.play();
  }

  home() {
    console.log('home');
  }

  hasBarrier(roadType, row, col) {
    if (roadType <= 2) {return true;}

    this[ROAD_TYPE[roadType]](row, col);
    return false;
  }

  draw() {
    this.move();
    CXT_ROLE.drawImage(BULLET_IMG, DIR[this.direction] << 3, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }

  moveState() {
    return [true, false];
  }
}

export { Bullet };