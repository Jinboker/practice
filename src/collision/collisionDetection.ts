import { SCREEN_L } from '../global/const';
import { roadType, dirNum } from '../global/var';
import { roadMap } from '../map/affirmRoadMap';

const getCollisionCoordinateGroup = {
  W: (x: number, y: number, distance: number): number[][] => [[x - 16, y - distance], [x, y - distance]],
  A: (x: number, y: number, distance: number): number[][] => [[x - distance, y - 16], [x - distance, y]],
  S: (x: number, y: number, distance: number): number[][] => [[x - 16, y + distance], [x, y + distance]],
  D: (x: number, y: number, distance: number): number[][] => [[x + distance, y - 16], [x + distance, y]]
};

export default class Collision {
  protected direction: string;
  protected distanceToCenter: number;
  protected x: number;
  protected y: number;
  protected dirNum: number;
  protected type: string;
  protected isTouchBorder: IsTouchBorder;
  protected collisionType: string[];
  protected id: number;

  constructor() {
    this.isTouchBorder = {
      W: () => (this.y <= 0),
      A: () => (this.x <= 0),
      S: () => (this.y >= SCREEN_L - (this.distanceToCenter << 1)),
      D: () => (this.x >= SCREEN_L - (this.distanceToCenter << 1))
    };
  }

  // 精灵的中心点坐标
  private spiritCenterCoordinate(): number[] {
    const distance = this.distanceToCenter;

    return [this.x + distance, this.y + distance];
  }

  // 获取当碰到砖块等障碍物的时候的碰撞点的坐标
  private getCollisionCoordinateGroupWidthBlock(): number[][] {
    const distance = this.distanceToCenter;
    const [x, y] = this.spiritCenterCoordinate();

    return getCollisionCoordinateGroup[this.direction](x, y, distance);
  }

  // 检查是否碰到边界
  private getBorderCollisionInfo(): CollisionInfo {
    return {
      isCollision: this.isTouchBorder[this.direction](),
      info: [{ collisionType: 'Border' }]
    };
  }

  // 此方法会被子类重写
  protected isTouchBrick(row: number, col: number, index: number): boolean { return true; }

  // 每次检测是否碰到砖块会检测两块砖，这是检测其中一次的代码
  private getItemBlockCollisionInfo(row: number, col: number, index: number): CollisionInfoItem {
    const roadTypeNum = roadMap[row][col];

    // roadType为3表示砖块，砖块因为存在子弹会打掉8*8大小的位置的问题，所以是否会碰到砖块导致不能移动需要特殊检查
    if (roadTypeNum === 3) {
      const isCollision = this.isTouchBrick(row, col, index);
      return { isCollision, collisionType: roadType[roadTypeNum], row, col };
    }

    return { isCollision: roadTypeNum > 1, collisionType: roadType[roadTypeNum], row, col };
  }

  // 检测是否碰到砖块之类的障碍物
  private getBlockCollisionInfo(): CollisionInfo {
    const collisionCoordinateGroup = this.getCollisionCoordinateGroupWidthBlock();
    const collisionInfoGroup = collisionCoordinateGroup.map(
      (ele, index) => this.getItemBlockCollisionInfo(ele[1] >> 4, ele[0] >> 4, index));

    // 获取要返回到函数外的碰撞相关信息
    let isCollision = false;
    const info: CollisionInfoItem[] = [];

    collisionInfoGroup.forEach(ele => {
      isCollision = isCollision || Boolean(ele.isCollision);
      info.push(ele);
    });

    return { isCollision, info };
  }

  // 分别获取每个类型的碰撞最后的碰撞信息
  public getCollisionInfo(direction: string, x: number, y: number, type: string, id: number): CollisionInfo {
    [
      this.direction, this.dirNum, this.x, this.y, this.type, this.id
    ] = [
      direction, dirNum[direction], x, y, type, id
    ];

    let collisionInfo = { isCollision: false, info: [] };

    this.collisionType.every(ele => {
      // 获取碰撞信息，如碰撞，则保存相应的信息
      const _collisionInfo = this[`get${ele}CollisionInfo`]();

      _collisionInfo.isCollision && (collisionInfo = _collisionInfo);
      return !_collisionInfo.isCollision;
    });

    return collisionInfo;
  }
}
