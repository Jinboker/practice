import CollisionCheck from './collisionCheck';
import { brickStatus, spiritCollection, directionNum } from '../global';

export default class TankCollisionCheck extends CollisionCheck {
  constructor() {
    super();

    this.distanceToCenter = 16;
    this.checkTypeCollection = ['Border', 'Barrier'];
  }

  /**
   * @override
   * 检查是否碰到了砖块
   * @param 参数同getTouchItemBarrierCollisionInfo方法
   * @returns {boolean} 是否碰到了砖块
   */
  protected isTouchBrick(row: number, col: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    if (!brickStatusArr) return true;

    let indexInBrick = 0;
    let passAble = false;
    let dirNum = directionNum[this.direction];

    if (dirNum % 2) {
      indexInBrick = (this.nextX + (+!(dirNum - 1) * 32) - (col << 4)) >> 3;
      passAble = brickStatusArr.some(ele => (ele[indexInBrick] === 0));
    } else {
      indexInBrick = (this.nextY + (dirNum >> 1) * 32 - (row << 4)) >> 3;
      passAble = brickStatusArr[indexInBrick].some(ele => (ele === 0));
    }

    return !passAble;
  }
}