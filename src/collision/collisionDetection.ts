import { SCREEN_L } from '../global/const';
import { roadType, dirNum } from '../global/var';
import { roadMap } from "../map/affirmRoadMap";

const allCollisionType = ['Border', 'Block'];
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
  private spiritCenterCoordinate(): number[] {
    let distance = this.distanceToCenter;

    return [this.x + distance, this.y + distance];
  }

  // 获取当碰到砖块等障碍物的时候的碰撞点的坐标
  private getCollisionCoordinateGroupWidthBlock(): number[][] {
    let distance = this.distanceToCenter;
    let [x, y] = this.spiritCenterCoordinate();

    return getCollisionCoordinateGroup[this.direction](x, y, distance);
  }

  // 检查是否碰到边界
  private getBorderCollisionInfo() {
    return {
      isCollision: this.isTouchBorder[this.direction](),
      info: ['border']
    }
  }

  // 检查是否碰到坦克
  private getTankCollisionInfo() {
    return {
      isCollision: false,
      info: []
    }
  }

  // 此方法会被子类重写
  protected isTouchBrick(row: number, col: number, index: number): boolean { return true; }

  // 每次检测是否碰到砖块会检测两块砖，这是检测其中一次的代码
  private getItemBlockCollisionInfo(row: number, col: number, index: number): [boolean, number] {
    const roadType = roadMap[row][col];

    // roadType为3表示砖块，砖块因为存在子弹会打掉8*8大小的位置的问题，所以是否会碰到砖块导致不能移动需要特殊检查
    if (roadType === 3) return [this.isTouchBrick(row, col, index), 3];

    return [roadType > 1, roadType];
  }

  // 检测是否碰到砖块之类的障碍物
  private getBlockCollisionInfo() {
    const collisionCoordinateGroup = this.getCollisionCoordinateGroupWidthBlock();
    const collisionInfoArr = collisionCoordinateGroup.map(
      (ele, index) => this.getItemBlockCollisionInfo(ele[1] >> 4, ele[0] >> 4, index)
    );

    // 获取要返回到函数外的碰撞相关信息
    let _roadType = '';
    const isCollision = collisionInfoArr.some(ele => {
      let _isItemCollision = ele[0];
      // 根据得到的数字反向得出当前路的类型
      _isItemCollision && (_roadType = roadType[ele[1]]);

      return _isItemCollision;
    });

    return {
      isCollision: isCollision,
      info: ['block', _roadType]
    }
  }

  // 分别获取每个类型的碰撞最后的碰撞信息
  public getCollisionInfo(direction: string, x: number, y: number): collisionInfo {
    [this.direction, this.dirNum, this.x, this.y] = [direction, dirNum[direction], x, y];

    let collisionInfo = { isCollision: false };

    allCollisionType.every(ele => {
      // 获取碰撞信息，如碰撞，则保存相应的信息
      let _info = this[`get${ele}CollisionInfo`]();

      _info.isCollision && (collisionInfo = _info);
      return !_info.isCollision;
    });

    return collisionInfo;
  }
}
