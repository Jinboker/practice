import { brickStatus } from '../global/var';
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

    let positionInBrick;
    let isTouch = true;

    if (this.dirNum % 2) {
      positionInBrick = (this.x + (+!(this.dirNum - 1)) * 8 - col * 16) >> 3;
      isTouch = Boolean(brickStatusArr[index][positionInBrick]);
    } else {
      positionInBrick = (this.y + this.dirNum * 4 - row * 16) >> 3;
      isTouch = Boolean(brickStatusArr[positionInBrick][index]);
    }

    return isTouch;
  }
}