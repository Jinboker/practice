import {SCREEN_L} from '../variables';
import {res} from '../data';

const ATTACK_OVER_AUD = res.audio.attackOver;
const movePosition = {
  W: speed => [0, -speed],
  D: speed => [speed, 0],
  S: speed => [0, speed],
  A: speed => [-speed, 0]
};
const collisionPoint = {
  W: (x, y, distance) => [[x - 16, y - distance], [x, y - distance]],
  A: (x, y, distance) => [[x - distance, y - 16], [x - distance, y]],
  S: (x, y, distance) => [[x - 16, y + distance], [x, y + distance]],
  D: (x, y, distance) => [[x + distance, y - 16], [x + distance, y]]
};

class Mover {
  constructor(x, y, direction, type, index) {
    this.x = x;
    this.y = y;
    this.next_x = null;
    this.next_y = null;
    this.direction = direction;    // W A S D
    this.type = type;
    this.index = index;
    this.alive = true;
    this.distanceToCenter = type !== 'bullet' ? 16 : 4;
    this.changeDirectionAble = false;
    this.checkBorder = {
      W: () => (this.next_y <= 0),
      A: () => (this.next_x <= 0), 
      S: () => (this.next_y >= SCREEN_L - (this.distanceToCenter << 1)),
      D: () => (this.next_x >= SCREEN_L - (this.distanceToCenter << 1)) 
    };
  }

  confirmCollisionPoint() {
    let distance = this.distanceToCenter;

    // 传入中心点坐标，再通过中心点和边长去寻找碰撞点的坐标
    return collisionPoint[this.direction](this.next_x + distance, this.next_y + distance, distance);
  }

  barrierCollision() {
    let collisionDot = this.confirmCollisionPoint();

    return collisionDot
      .map(ele => this.hasBarrier(ele[1] >> 4, ele[0] >> 4))  // 传入row和col
      .every(ele => ele);
  }

  borderCollision() {
    let isTouchBorder = this.checkBorder[this.direction]();

    isTouchBorder && (this.type === 'bullet') && ATTACK_OVER_AUD.play();
    
    return isTouchBorder;
  }

  isCollision() {
    return this.borderCollision()
        || !this.barrierCollision()
        || this.tankCollision();
  }

  tankCollision() {
    return false;
  }

  toNextPosition() {
    let offsetArr = movePosition[`${this.direction}`](this.speed);

    return [this.x + offsetArr[0], this.y + offsetArr[1]];
  }

  confirmIsMoving() {

  }

  move() {
    if (this.type !== 'bullet' && !this.beMoving()) {return;}

    // 只有当type为player或者npc的时候，changeDirectionAble才可能为true
    [this.next_x, this.next_y] = this.changeDirectionAble
      ? this.changeDirection()
      : this.toNextPosition();
    
    this.isCollision() 
      ? this.doAfterCollision() 
      : [this.x, this.y] = [this.next_x, this.next_y];
  }
}

export {Mover};
