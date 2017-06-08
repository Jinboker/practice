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

  // override
  getInfoIfTouchBrick(row: number, col: number, index: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];
    const directionNum = dirNum[this.direction];
    
    let passAble = false;

    return passAble;
  }
}