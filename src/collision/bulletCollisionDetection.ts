import CollisionDetection from './collisionDetection';
import res from '../data/assets';

const ATTACK_OVER_AUD = res.audio.attackOver;

export default class BulletCollision extends CollisionDetection {
  distanceToCenter: number;
  direction: string;
  x: number;
  y: number;

  constructor() {
    super();

    this.distanceToCenter = 8;
  }

  // 检查是否碰到边界
  borderCollision() {
    return {
      isCollision: this.isTouchBorder[this.direction]() && !ATTACK_OVER_AUD.play(),
      info: ['border']
    }
  }

  tankCollision() {
    return {
      isCollision: false,
      info: []
    }
  }

  barrierCollision() {
    return {
      isCollision: false,
      info: []
    }
  }

  getCollisionInfo(direction: string, x: number, y: number): collisionInfo {
    return {
      isCollision: true,
      info: ['aaa']
    }
  }
}