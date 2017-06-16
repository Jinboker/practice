import { brickStatus } from '../global/var';
import { getPositionInBrick } from '../util/fn';
import CollisionDetection from './collisionDetection';

export default class BulletCollision extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 4;
  }

  // override
  isTouchBrick(row: number, col: number, index: number): boolean {
    const brickStatusIndex = (row * 28 + col);
    const brickStatusArr: number[][] = brickStatus[brickStatusIndex];

    // 如果brickStatusArr的值为undefined，那么表明砖块还是第一次被子弹撞到，直接返回true表明已经碰到砖块
    if (!brickStatusArr) return true;

    const positionInBrick = getPositionInBrick.bind(this)(row, col);
    const isTouch = Boolean(
      this.dirNum % 2
        ? brickStatusArr[index][positionInBrick]
        : brickStatusArr[positionInBrick][index]
    );

    return isTouch;
  }
}