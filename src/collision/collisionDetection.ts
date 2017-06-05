import { SCREEN_L } from '../global/const';

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

  abstract getCollisionInfo(direction: string, x: number, y: number): collisionInfo;
  abstract borderCollision(): collisionInfo;
  abstract tankCollision(): collisionInfo;
  abstract barrierCollision(): collisionInfo;

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
}

export default Collision;