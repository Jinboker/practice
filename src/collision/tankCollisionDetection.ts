import { brickStatus } from '../global/var';
import SpiritCollect from '../spirit/spiritCollect';
import CollisionDetection from './collisionDetection';

export default class TankCollisionDetection extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 16;
    this.collisionType = ['Border', 'Block', 'Tank', 'Bonus'];
  }

  // override
  isTouchBrick(row: number, col: number, index?: number): boolean {
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
  private getBonusCollisionInfo(): collisionInfo {
    return {
      isCollision: false,
      info: [{ collisionType: 'Bonus' }]
    }
  }

  // 检测是否碰到坦克
  private getTankCollisionInfo(): collisionInfo {
    // 所有坦克的集合
    let allTank: tank[] = SpiritCollect.npcArr.map(ele => ele);
    allTank.unshift(SpiritCollect.player);

    SpiritCollect.npcArr.forEach(ele => {
      if (ele && ele.id !== this.id) {

      }
    });
    return {
      isCollision: false,
      info: [{ collisionType: 'Tank' }]
    }
  }
}
