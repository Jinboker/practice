import Collision from './collision';

export default class TankCollision extends Collision {
  constructor() {
    super();
  }

  getCollisionInfo(): collisionInfo {
    return {
      isCollision: false,
      info: ['aaa']
    }
  }
}