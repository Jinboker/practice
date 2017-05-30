import CollisionDetection from './collisionDetection';

// const allCollisionType = ['border', 'barrier', 'tank'];
const allCollisionType = ['border'];

export default class TankCollisionDetection extends CollisionDetection {
  direction: string;
  x: number;
  y: number;

  constructor(public distanceToCenter: number) {
    super();
  }

  // 检查是否碰到边界
  borderCollision() {
    return {
      isCollision: this.isTouchBorder[this.direction](),
      info: ['border']
    }
  }

  // 检测是否碰到砖块之类的障碍物
  barrierCollision() {
    return {
      isCollision: false,
      info: []
    }
  }

  // 检测是否碰到其他坦克
  tankCollision() {
    return {
      isCollision: false,
      info: []
    }
  }

  // 检测是否碰到奖励

  getCollisionInfo(direction: string, x: number, y: number): collisionInfo {
    [this.direction, this.x, this.y] = [direction, x, y];

    let collisionInfo = { isCollision: false };

    allCollisionType.every(ele => {
      // 获取碰撞信息，如碰撞，则保存相应的信息
      let _info = this[`${ele}Collision`]();

      _info.isCollision && (collisionInfo = _info);
      return !_info.isCollision;
    });

    return collisionInfo;
  }
}
