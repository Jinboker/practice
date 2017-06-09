import CollisionDetection from './collisionDetection';
import { brickStatus } from '../global/var';

export default class TankCollisionDetection extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 16;
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
}