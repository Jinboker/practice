import { brickStatus, spirit, dirNum } from '../global/var';
import CollisionDetection from './collisionDetection';

export default class TankCollisionDetection extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 16;
    this.collisionType = ['Border', 'Block', 'Tank', 'Bonus'];
  }

  // override
  public isTouchBrick(row: number, col: number, index?: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    if (!brickStatusArr) return true;

    let indexInBrick = 0;
    let passAble = false;

    if (this.dirNum % 2) {
      indexInBrick = (this.x + (+!(this.dirNum - 1) * 32) - (col << 4)) >> 3;
      passAble = brickStatusArr.some(ele => (ele[indexInBrick] === 0));
    } else {
      indexInBrick = (this.y + (this.dirNum >> 1) * 32 - (row << 4)) >> 3;
      passAble = brickStatusArr[indexInBrick].some(ele => (ele === 0));
    }

    return !passAble;
  }

  // 检测是否碰到奖励
  private getBonusCollisionInfo(): CollisionInfo {
    return {
      isCollision: false,
      info: [{ collisionType: 'Bonus' }]
    };
  }

  // 检测是否碰到坦克
  private getTankCollisionInfo(): CollisionInfo {
    let _dirNum = dirNum[this.direction];

    const isCollision = spirit.tankArr.some(ele => {
      if (!ele || ele.id === this.id) return false;

      const distanceX = Math.abs(this.x - ele.x);
      const distanceY = Math.abs(this.y - ele.y);

      return _dirNum % 2
        ? distanceX < 32 && distanceX > 26 && distanceY < 32
        : distanceY < 32 && distanceY > 26 && distanceX < 32;
    });

    return {
      isCollision,
      info: [{ collisionType: 'Tank' }]
    };
  }
}
