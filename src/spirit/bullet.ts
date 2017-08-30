import Mover from './mover';
import res from '../data/assets';
import eventBus from '../util/eventBus';
import BulletCollisionCheck from '../checkCollision/bulletCollisionCheck';
import { CXT_ROLE, OFFSET_X, OFFSET_Y, directionNum } from '../global';

const BULLET_IMG = res.img.misc;

export default class Bullet extends Mover {
  // override
  protected speed: number;
  protected nextX: number;
  protected nextY: number;
  protected distanceToCenter: number;

  // 碰撞检测
  private collisionCheck: BulletCollisionCheck;
  private directionNum: number;

  constructor(
    public x: number,
    public y: number,
    public direction: string,
    protected rank: number,
    protected type: string,
    public id: number
  ) {
    super();

    this.speed = this.rank ? 5 : 4;
    this.distanceToCenter = 4;
    this.directionNum = directionNum[direction];

    this.resetCoord();
    // 实例化坦克的碰撞检测
    this.collisionCheck = new BulletCollisionCheck(`${this.type}Bullet`, this.id);
  }

  /**
   * 子弹初始输入的坐标是坦克的坐标，因此需要重置一下
   */
  private resetCoord() {
    const reset = {
      W: [this.x + 12, this.y],
      A: [this.x, this.y + 12],
      S: [this.x + 12, this.y + 24],
      D: [this.x + 24, this.y + 12]
    };

    [this.x, this.y] = reset[this.direction];
  }

  /**
   * @override
   * 确定坦克在本次渲染循环结束后的最终位置
   */
  protected affirmFinalCoord() {
    [this.nextX, this.nextY] = this.getCoordMoveTo();

    // 对下一个坐标进行碰撞检测
    const { direction, nextX, nextY, rank } = this;
    // 获取子弹碰撞的相关信息
    const isCollision = this.collisionCheck
      .getCollisionInfo({ direction, nextX, nextY, rank })
      .some(ele => ele.isCollision);

    isCollision
      ? !(this.alive = false) && eventBus.dispatch('bullet-die', this.id)
      : [this.x, this.y] = [this.nextX, this.nextY];
  }

  // override
  public renderSpirit() {
    this.affirmFinalCoord();
    CXT_ROLE.drawImage(BULLET_IMG, directionNum[this.direction] << 3, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }
}
