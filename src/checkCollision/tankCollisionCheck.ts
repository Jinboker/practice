import CollisionCheck from './collisionCheck';
import { brickStatus, spiritCollection, directionNum } from '../global';

export default class TankCollisionCheck extends CollisionCheck {
  constructor(
    protected type: string,
    protected id: number
  ) {
    super(type, id);

    this.distanceToCenter = 16;
    this.checkTypeCollection = ['Border', 'Barrier', 'Tank'];
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

  /**
   * @override
   * 检查是否碰到坦克
   * @returns {[{isCollision: boolean}]}
   */
  protected checkTouchTank(): CollisionInfo[] {
    const isCollision = spiritCollection.tankArr.some(ele => {
      if (!ele || ele.id === this.id) return false;

      const distanceX = Math.abs(this.nextX - ele.x);
      const distanceY = Math.abs(this.nextY - ele.y);

      return directionNum[this.direction] % 2
        ? distanceX < 32 && distanceX > 26 && distanceY < 32
        : distanceY < 32 && distanceY > 26 && distanceX < 32;
    });

    return [{ isCollision }];
  }
}
