import { SCREEN_L } from '../global/const';

const allCollisionType = ['border', 'barrier'];
const getCollisionCoordinateGroup = {
  W: (x: number, y: number, distance: number): number[][] => [[x - 16, y - distance], [x, y - distance]],
  A: (x: number, y: number, distance: number): number[][] => [[x - distance, y - 16], [x - distance, y]],
  S: (x: number, y: number, distance: number): number[][] => [[x - 16, y + distance], [x, y + distance]],
  D: (x: number, y: number, distance: number): number[][] => [[x + distance, y - 16], [x + distance, y]]
};

abstract class Collision {
  abstract direction: string;
  abstract distanceToCenter: number;
  abstract x: number;
  abstract y: number;

  abstract tankCollision(): collisionInfo;
  abstract getItemBarrierCollisionInfo(row: number, col: number): [boolean, string];

  protected isTouchBorder: isTouchBorder;

  constructor() {
    this.isTouchBorder = {
      W: () => (this.y < 0),
      A: () => (this.x < 0),
      S: () => (this.y > SCREEN_L - (this.distanceToCenter << 1)),
      D: () => (this.x > SCREEN_L - (this.distanceToCenter << 1))
    };
  }

  // 精灵的中心点坐标
  protected spiritCenterCoordinate(): number[] {
    let distance = this.distanceToCenter;

    return [this.x + distance, this.y + distance];
  }

  // 获取当碰到砖块等障碍物的时候的碰撞点的坐标
  protected getCollisionCoordinateGroupWidthBarrier(): number[][] {
    let distance = this.distanceToCenter;
    let [x, y] = this.spiritCenterCoordinate();

    return getCollisionCoordinateGroup[this.direction](x, y, distance);
  }

  // 检查是否碰到边界
  protected borderCollision() {
    return {
      isCollision: this.isTouchBorder[this.direction](),
      info: ['border']
    }
  }

  // 检测是否碰到砖块之类的障碍物
  protected barrierCollision() {
    const collisionCoordinateGroup = this.getCollisionCoordinateGroupWidthBarrier();
    const collisionInfoArr = collisionCoordinateGroup.map(
      ele => this.getItemBarrierCollisionInfo(ele[1] >> 4, ele[0] >> 4)
    );
    const isCollision = collisionInfoArr.some(ele => ele[0]);

    return {
      isCollision: isCollision,
      info: ['block']
    }
  }

  // 分别获取每个类型的碰撞最后的碰撞信息
  protected getCollisionInfo(direction: string, x: number, y: number): collisionInfo {
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

export default Collision;