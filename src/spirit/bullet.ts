import { dirNum } from '../global/var';
import { brickStatus } from '../global/var';
import { roadMap } from '../map/affirmRoadMap';
import { CXT_BG, CXT_ROLE, OFFSET_X, OFFSET_Y } from '../global/const';
import Mover from './mover';
import res from '../data/assets';
import eventBus from '../util/eventBus';
import BulletCollision from '../collision/bulletCollisionDetection';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;

export default class Bullet extends Mover {
  // override
  public distanceToCenter: number;
  public speed: number;
  public next_x: number;
  public next_y: number;
  public type: string;

  private detectionCollision: BulletCollision;
  private dirNum: number;

  constructor(
    public x: number,
    public y: number,
    public direction: string,
    public bulletType: string,
    public rank: number,
    public id: number
  ) {
    super();

    this.speed = this.rank ? 5 : 4;
    this.distanceToCenter = 8;
    this.detectionCollision = new BulletCollision();
    this.dirNum = dirNum[direction];

    this.resetPosition();
  }

  // 子弹初始输入的坐标是坦克的坐标，因此需要重置一下
  resetPosition() {
    let reset = {
      W: [this.x + 12, this.y],
      A: [this.x, this.y + 12],
      S: [this.x + 12, this.y + 24],
      D: [this.x + 24, this.y + 12]
    };

    [this.x, this.y] = reset[this.direction];
  }

  // 清除一小块的障碍物
  clearSmallBlock(row: number, col: number, indexInBrick: number) {
    // console.log(row, col, indexInBrick);
    let [x, y, range_x, range_y] = this.dirNum % 2
      ? [row + 8 * indexInBrick, col, 8, 16]
      : [row, col + 8 * indexInBrick, 16, 8];

    // TODO
    // console.log(OFFSET_X + x, OFFSET_Y + y, range_x, range_y);
    CXT_BG.clearRect(OFFSET_X + x, OFFSET_Y + y, range_x, range_y);
  }

  // 清除一大块的障碍物
  clearBigBlock(row: number, col: number) {
    roadMap[row][col] = 0;
    CXT_BG.clearRect(OFFSET_X + col * 32, OFFSET_Y + row * 32, 16, 16);
  }

  // 子弹等级<= 1时击中砖块后清除砖块
  toClearBrick(row: number, col: number, brickStatusIndex: number) {
    let indexInBrick;

    if (this.dirNum % 2) {
    } else {
    }
  }

  // 子弹击中砖块
  touchBrick(collisionBlockRow: number, collisionBlockCol: number, orderIndex: number) {
    if (this.rank <= 1) {
      const brickStatusIndex = collisionBlockRow * 28 + collisionBlockCol;

      brickStatus[brickStatusIndex]
        ? this.toClearBrick(collisionBlockRow, collisionBlockCol, brickStatusIndex)
        : (
          brickStatus[brickStatusIndex] = [1, 1, 1, 1],
          this.toClearBrick(collisionBlockRow, collisionBlockCol, brickStatusIndex)
        );
    } else {
      this.clearBigBlock(collisionBlockRow, collisionBlockCol);
    }
  }

  // 子弹击中钢筋
  touchSteel(collisionBlockRow: number, collisionBlockCol: number) {
    this.rank === 3
      ? this.clearBigBlock(collisionBlockRow, collisionBlockCol)
      : (this.bulletType === 'player') && ATTACK_OVER_AUD.play();
  }

  // 子弹击中老家
  touchHome() {

  }

  // 子弹击中坦克
  touchTank() {
  }

  // 子弹击中边界
  touchBorder() {
    (this.bulletType === 'player') && ATTACK_OVER_AUD.play();
  }

  // override
  doAfterCollision(collisionInfo: collisionInfoItem[]) {
    collisionInfo.forEach((ele, index) => {
      if (typeof this[`touch${ele.collisionType}`] === 'function') {
        ele.row
          ? this[`touch${ele.collisionType}`](ele.row, ele.col, index)
          : this[`touch${ele.collisionType}`]();
      }
    });
  }

  // override
  affirmPosition() {
    [this.next_x, this.next_y] = this.getNextPositionIfCouldMove();
    this.collisionInfo = this.detectionCollision.getCollisionInfo(this.direction, this.next_x, this.next_y);

    if (this.collisionInfo.isCollision) {
      this.doAfterCollision(this.collisionInfo.info);
      // 事件注册在drawTank
      eventBus.dispatch('bullet-die', this.id, this.bulletType);
      this.alive = false;
    } else {
      // 如果没有碰撞则确定位置
      [this.x, this.y] = [this.next_x, this.next_y];
    }
  }

  // override
  draw() {
    this.affirmPosition();
    CXT_ROLE.drawImage(BULLET_IMG, dirNum[this.direction] << 3, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }
}