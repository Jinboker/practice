import { SCREEN_L } from '../global/const';
import { roadType } from '../global/var';

const allCollisionType = ['Border', 'Block'];
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

  abstract getItemBlockCollisionInfo(row: number, col: number): [boolean, number];

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
  protected getCollisionCoordinateGroupWidthBlock(): number[][] {
    let distance = this.distanceToCenter;
    let [x, y] = this.spiritCenterCoordinate();

    return getCollisionCoordinateGroup[this.direction](x, y, distance);
  }

  // 检查是否碰到边界
  protected getBorderCollisionInfo() {
    return {
      isCollision: this.isTouchBorder[this.direction](),
      info: ['border']
    }
  }
  // 检查是否碰到坦克
  protected getTankCollisionInfo() {
    return {
      isCollision: false,
      info: []
    }
  }

  // 将由数字表示的道路转换成字符串表示
  private getRoadTypeNumToString() {

  }

  // 检测是否碰到砖块之类的障碍物
  protected getBlockCollisionInfo() {
    const collisionCoordinateGroup = this.getCollisionCoordinateGroupWidthBlock();
    const collisionInfoArr = collisionCoordinateGroup.map(
      ele => this.getItemBlockCollisionInfo(ele[1] >> 4, ele[0] >> 4)
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
    [this.direction, this.x, this.y] = [direction, x, y];

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

export default Collision;