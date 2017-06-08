import CollisionDetection from './collisionDetection';

export default class BulletCollision extends CollisionDetection {
  distanceToCenter: number;
  direction: string;
  x: number;
  y: number;

  constructor() {
    super();

    this.distanceToCenter = 8;
  }

  getItemBlockCollisionInfo(row: number, col: number): [boolean, string] {
    return [true, 'block'];
  }
}