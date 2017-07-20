import CollisionCheck from './collisionCheck';
import { getPositionInBrick } from '../util/fn';
import { brickStatus, spiritCollection, directionNum } from '../global';

const isBulletHitTank = {
  W: (x: number, y: number) => (y < 32 && y > 0 && x > -8 && x < 32),
  A: (x: number, y: number) => (x < 32 && x > 0 && y > -8 && y < 32),
  S: (x: number, y: number) => (y > -8 && y < 0 && x > -8 && x < 32),
  D: (x: number, y: number) => (x > -8 && x < 0 && y > -8 && y < 32)
};

export default class BulletCollisionCheck extends CollisionCheck {
  constructor(
    protected type: string,
    protected id: number
  ) {
    super(type, id);

    this.distanceToCenter = 4;
    this.checkTypeCollection = ['Border', 'Barrier'];
  }

  protected isTouchBrick(row: number, col: number, index: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    // 如果brickStatusArr的值为undefined，那么表明砖块还是第一次被子弹撞到，直接返回true表明已经碰到砖块
    if (!brickStatusArr) return true;

    const { nextX, nextY, directionNum } = this;
    const positionInBrick = getPositionInBrick({ x: nextX, y: nextY, row, col, directionNum });

    return Boolean(
      this.directionNum % 2
        ? brickStatusArr[index][positionInBrick]
        : brickStatusArr[positionInBrick][index]
    );
  }
}