import CollisionDetection from './collisionDetection';
import { brickStatus, dirNum } from '../global/var';
import { roadMap } from "../map/affirmRoadMap";

export default class BulletCollision extends CollisionDetection {
  constructor() {
    super();

    this.distanceToCenter = 8;
  }

  // override
  isTouchBrick(row: number, col: number, index: number): boolean {
    const brickStatusIndex = (row * 28 + col);
    const brickStatusArr: number[][] = brickStatus[brickStatusIndex];

    // 如果brickStatusArr的值为undefined，那么表明砖块还是第一次被子弹撞到，直接返回true表明已经碰到砖块
    if (!brickStatusArr) return true;

    let indexInBrick;
    let isTouch = true;

    if (this.dirNum % 2) {
      // 根据方向对比子弹与砖块碰撞点的坐标之间的差值，确定子弹在砖块中的位置
      indexInBrick = (this.x + (+!(this.dirNum - 1)) * 8 - row << 4) >> 3;
      isTouch = Boolean(brickStatusArr[index][indexInBrick]);
    } else {
      indexInBrick = (this.y + (this.dirNum >> 1) * 8 - col << 4) >> 3;
      isTouch = Boolean(brickStatusArr[indexInBrick][index]);
    }

    return isTouch;
  }
}