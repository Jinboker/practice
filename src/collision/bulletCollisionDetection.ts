import { brickStatus, spirit } from '../global/var';
import { getPositionInBrick } from '../util/fn';
import CollisionDetection from './collisionDetection';

const isBulletHitTank = {
  W: (x: number, y: number) => (y < 32 && y > 0 && x > -8 && x < 32),
  A: (x: number, y: number) => (x < 32 && x > 0 && y > -8 && y < 32),
  S: (x: number, y: number) => (y > -8 && y < 0 && x > -8 && x < 32),
  D: (x: number, y: number) => (x > -8 && x < 0 && y > -8 && y < 32)
};

export default class BulletCollision extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 4;
    this.collisionType = ['Border', 'Block', 'Tank', 'Bullet'];
  }

  // override
  protected isTouchBrick(row: number, col: number, index: number): boolean {
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
  private getTankCollisionInfo(): CollisionInfo {
    const tankArr = spirit.tankArr;
    const collisionTankArr = this.type === 'npc'
      ? tankArr.slice(0, 1)
      : tankArr.slice(1);

    const isCollision = collisionTankArr.some(ele => {
      if (!ele || ele.id === this.id) return false;

      const distanceX = Math.abs(this.x - ele.x);
      const distanceY = Math.abs(this.y - ele.y);

      return isBulletHitTank[this.direction](distanceX, distanceY);
    });

    return {
      isCollision,
      info: [{ collisionType: 'Tank' }]
    };
  }

  // 检测是否碰到子弹
  private getBulletCollisionInfo(): CollisionInfo {
    return {
      isCollision: false,
      info: [{ collisionType: 'Bullet' }]
    };
  }
}