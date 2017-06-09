import Mover from './mover';
import res from '../data/assets';
import BulletCollision from '../collision/bulletCollisionDetection';
import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../global/const';
import { dirNum } from '../global/var';

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

  // override
  hitBarrier() {

  }

  // override
  hitTank() {

  }

  // override
  hitBorder() {

  }

  // override
  doAfterCollision() {

  }

  // override
  affirmPosition() {
    [this.next_x, this.next_y] = this.getNextPositionIfCouldMove();
    this.collisionInfo = this.detectionCollision.getCollisionInfo(this.direction, this.next_x, this.next_y);

    if (this.collisionInfo.isCollision) {

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