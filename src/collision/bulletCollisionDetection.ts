import CollisionDetection from './collisionDetection';
import { brickStatus, dirNum } from '../global/var';
import { roadMap } from "../map/affirmRoadMap";

export default class BulletCollision extends CollisionDetection {
  distanceToCenter: number;
  direction: string;
  x: number;
  y: number;

  constructor() {
    super();

    this.distanceToCenter = 8;
  }

  getItemBlockCollisionInfo(row: number, col: number): [boolean, number] {
    const roadType = roadMap[row][col];
    // roadType的0， 1， 2分为代表空，冰，流，子弹可以直接通过
    if (roadType <= 2) return [true, 0];

    // roadType为3表示砖块
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    if (roadType === 3 && brickStatusArr) {

    }

    return [roadType < 3, roadType];
  }
}