import CollisionDetection from './collisionDetection';
import { brickStatus, dirNum } from '../global/var';

export default class TankCollisionDetection extends CollisionDetection {
  distanceToCenter: number;
  direction: string;
  x: number;
  y: number;

  constructor() {
    super();

    this.distanceToCenter = 16;
  }

  // override
  getInfoIfTouchBrick(row: number, col: number, index?: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];
    const directionNum = dirNum[this.direction];

    let indexInBrick = 0;
    let passAble = false;

    if (directionNum % 2) {
      indexInBrick = (this.x + (+!(directionNum - 1) * 32) - (col << 4)) >> 3;
      passAble = brickStatusArr.some(ele => (ele[indexInBrick] === 0));
    } else {
      indexInBrick = (this.y + (directionNum >> 1) * 32 - (row << 4)) >> 3;
      passAble = brickStatusArr[indexInBrick].some(ele => (ele === 0));
    }

    return passAble;
  }

  // 检测是否碰到奖励
}
