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
const allCollisionType = ['barrier', 'border', 'tank'];

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
    this.collisionType = '';
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

    return !(collisionDot
      .map(ele => this.hasBarrier(ele[1] >> 4, ele[0] >> 4))  // 传入row和col
      .every(ele => ele));
  }

  tankCollision() {
    return false;
  }

  borderCollision() {
    let isTouchBorder = this.checkBorder[this.direction]();

    isTouchBorder && (this.type === 'bullet') && ATTACK_OVER_AUD.play();
    
    return isTouchBorder;
  }

  // 检查相应的坦克，边界等条件有没有产生碰撞
  isCollision(type) {
    let isCollision = this[`${type}Collision`]();

    isCollision && (this.collisionType = type);

    return isCollision;
  }

  collisionInfo() {
    let isCollision = allCollisionType
      .map(ele => this.isCollision(ele))
      .some(ele => ele);

    return [isCollision, this.collisionType];
  }

  toNextPosition() {
    let offsetArr = movePosition[`${this.direction}`](this.speed);

    return [this.x + offsetArr[0], this.y + offsetArr[1]];
  }

  affirmNextPosion(isBullet) {
    let [isMoving, changeDirectionAble] = isBullet
      ? [true, false]
      : this.confirmMoveState();

    if (!isMoving) {return;}

    !isBullet && this.changeWheel();

    [this.next_x, this.next_y] = changeDirectionAble
      ? this.changeDirection()
      : this.toNextPosition();
  }

  doAfterCollisionDetection() {
    let [isCollision, collisionType] = this.collisionInfo();

    isCollision 
      ? this.doAfterCollision(collisionType) 
      : [this.x, this.y] = [this.next_x, this.next_y];
  }

  move() {
    let isBullet = (this.type === 'bullet');

    this.affirmNextPosion(isBullet);   
    this.doAfterCollisionDetection();
  }
}

export {Mover};

