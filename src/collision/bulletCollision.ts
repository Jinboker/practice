import Collision from './collision';

export default class BulletCollision extends Collision {
  constructor() {
    super();
  }

  getCollisionInfo(): collisionInfo {
    return {
      isCollision: true,
      info: ['aaa']
    }
  }
}