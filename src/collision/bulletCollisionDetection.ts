import { brickStatus } from '../global/var';
import { getPositionInBrick } from '../util/fn';
import CollisionDetection from './collisionDetection';

export default class BulletCollision extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 4;
    this.collisionType = ['Border', 'Block', 'Tank', 'Bullet'];
  }

  // override
  private isTouchBrick(row: number, col: number, index: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    // 如果brickStatusArr的值为undefined，那么表明砖块还是第一次被子弹撞到，直接返回true表明已经碰到砖块
    if (!brickStatusArr) return true;

    const positionInBrick = getPositionInBrick.bind(this)(this.x, this.y, row, col);
    const isTouch = Boolean(
      this.dirNum % 2
        ? brickStatusArr[index][positionInBrick]
        : brickStatusArr[positionInBrick][index]
    );

    return isTouch;
  }

  // 检查是否碰到坦克
  private getTankCollisionInfo(): collisionInfo {
    return {
      isCollision: false,
      info: [{ collisionType: 'Tank' }]
    };
  }

  // 检测是否碰到子弹
  private getBulletCollisionInfo(): collisionInfo {
    return {
      isCollision: false,
      info: [{ collisionType: 'Bullet' }]
    };
  }
}