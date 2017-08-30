import Mover from './mover';
import res from '../data/assets';
import eventBus from '../util/eventBus';
import controller from '../ctrlCenter/ctrlCenter';
import BulletCollisionCheck from '../checkCollision/bulletCollisionCheck';
import { roadMap } from '../map/affirmRoadMap';
import { getPositionInBrick } from '../util/fn';
import { CXT_ROLE, CXT_BG, OFFSET_X, OFFSET_Y, directionNum, spiritCollection, brickStatus } from '../global';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;

export default class Bullet extends Mover {
  // override
  protected distanceToCenter: number;
  protected speed: number;
  protected nextX: number;
  protected nextY: number;

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
    this.collisionCheck = new BulletCollisionCheck(this.type, this.id);
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
   * 清除一小块的砖块
   * @param row
   * @param col
   */
  private clearSmallBrick(row: number, col: number) {
    const { nextX, nextY, directionNum } = this;
    const indexInBrick = getPositionInBrick({ x: nextX, y: nextY, row, col, directionNum });
    const brickStatusArr = brickStatus[row * 28 + col];

    let x, y, rangeX, rangeY;

    if (this.directionNum % 2) {
      [x, y, rangeX, rangeY] = [col * 16 + 8 * indexInBrick, row * 16, 8, 16];
      [0, 1].forEach(ele => (brickStatusArr[ele][indexInBrick] = 0));
    } else {
      [x, y, rangeX, rangeY] = [col * 16, row * 16 + 8 * indexInBrick, 16, 8];
      brickStatusArr[indexInBrick] = [0, 0];
    }

    CXT_BG.clearRect(OFFSET_X + x, OFFSET_Y + y, rangeX, rangeY);
  }

  /**
   * 清除一大块的障碍物
   * @param row
   * @param col
   */
  private clearBigBlock(row: number, col: number) {
    roadMap[row][col] = 0;
    CXT_BG.clearRect(OFFSET_X + col * 16, OFFSET_Y + row * 16, 16, 16);
  }

  /**
   * 子弹击中砖块后的操作
   * @param {number} collisionRow 击中的坐标的行
   * @param {number} collisionCol 击中的坐标的列
   */
  private hitBrick(collisionRow: number, collisionCol: number) {
    if (this.rank <= 1) {
      // 子弹等级<= 1时击中砖块后清除砖块
      const index = collisionRow * 28 + collisionCol;

      !brickStatus[index] && (brickStatus[index] = [[1, 1], [1, 1]]);
      this.clearSmallBrick(collisionRow, collisionCol);
    } else {
      this.clearBigBlock(collisionRow, collisionCol);
    }
  }

  /**
   * 子弹击中钢筋后的操作
   * @param {number} collisionRow 击中的坐标的行
   * @param {number} collisionCol 击中的坐标的列
   */
  private hitSteel(collisionRow: number, collisionCol: number) {
    this.rank === 3
      ? this.clearBigBlock(collisionRow, collisionCol)
      : (this.type === 'player') && ATTACK_OVER_AUD.play();
  }

  private hitHome() {
  }

  // 子弹击中坦克
  private hitTank(tankId: number, tankCoord: number[]) {
    let dieTankIndex = spiritCollection.tankArr.findIndex(ele => (ele.id === tankId));

    if (!~dieTankIndex) return;

    // 事件响应在drawTank.ts
    eventBus.dispatch('tank-die', dieTankIndex);
    // 事件响应在drawExplode.ts
    eventBus.dispatch('new-explode', tankCoord);
  }

  /**
   * 子弹击中边界后的操作
   */
  private hitBorder() {
    (this.type === 'player') && ATTACK_OVER_AUD.play();
  }

  // 子弹击中其他子弹
  private hitBullet(bulletId: number) {
    controller.receiveMsg('bullet-die', bulletId);
    // NPC的子弹挂掉
    spiritCollection.bulletArr.find(ele =>
      (ele.id === bulletId && Boolean(ele.alive = false)));
  }

  private doAfterCollision(collisionInfo: CollisionInfo[]) {
    collisionInfo.forEach(ele => {
      let collisionType = ele.collisionType;

      if (typeof this[`hit${collisionType}`] !== 'function') return;

      // 如果是撞到了砖块或者钢筋
      if (collisionType === 'Brick' || collisionType === 'Steel') {
        this[`hit${collisionType}`](ele.row, ele.col);
      } else if (collisionType === 'Tank') {
        this[`hit${collisionType}`](ele.id, ele.tankCoord);
      } else if (collisionType === 'Bullet') {
        this[`hit${collisionType}`](ele.id);
      } else {
        this[`hit${collisionType}`]();
      }
    });
  }

  /**
   * @override
   * 确定坦克在本次渲染循环结束后的最终位置
   */
  protected affirmFinalCoord() {
    [this.nextX, this.nextY] = this.getCoordMoveTo();

    // 对下一个坐标进行碰撞检测
    const { direction, nextX, nextY } = this;
    const collisionParams = { direction, nextX, nextY };
    // 获取子弹碰撞的相关信息
    const collisionInfoGroup = this.collisionCheck.getCollisionInfo(collisionParams);
    const isCollision = collisionInfoGroup.some(ele => ele.isCollision);

    if (isCollision) {
      this.alive = false;
      controller.receiveMsg('bullet-die', this.id);
      this.doAfterCollision(collisionInfoGroup);
    } else {
      [this.x, this.y] = [this.nextX, this.nextY];
    }
  }

  // override
  public renderSpirit() {
    this.affirmFinalCoord();
    CXT_ROLE.drawImage(BULLET_IMG, directionNum[this.direction] << 3, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }
}
