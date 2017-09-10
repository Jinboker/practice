import DoAfterBulletCollision from '../doAfterCollision/doAfterBulletCollision';
import { roadMap } from '../map/affirmRoadMap';
import { roadType, directionNum, SCREEN_L } from '../global';

// 根据方向判断当前坐标是否已经碰到了游戏的边框
const isTouchBorder = {
  W: (x: number, y: number, distance: number) => (y <= 0),
  A: (x: number, y: number, distance: number) => (x <= 0),
  S: (x: number, y: number, distance: number) => (y >= SCREEN_L - (distance << 1)),
  D: (x: number, y: number, distance: number) => (x >= SCREEN_L - (distance << 1))
};
// 根据精灵中心的坐标，算出精灵(32*32的格子)在roadMap(表示16*16格子的坐标数组)数据中需要去计算的碰撞坐标
const collisionCoordGroup = {
  W: (x: number, y: number, distance: number): number[][] => [[x - 16, y - distance], [x, y - distance]],
  A: (x: number, y: number, distance: number): number[][] => [[x - distance, y - 16], [x - distance, y]],
  S: (x: number, y: number, distance: number): number[][] => [[x - 16, y + distance], [x, y + distance]],
  D: (x: number, y: number, distance: number): number[][] => [[x + distance, y - 16], [x + distance, y]]
};

export default class CollisionCheck {
  protected direction: string;
  protected nextX: number;
  protected nextY: number;
  protected rank: number;
  protected distanceToCenter: number;
  protected directionNum: number;
  // 需要检查的碰撞的类型的数组集合
  protected checkTypeCollection: string[];
  protected isBullet: boolean;

  constructor(
    protected identity: string,
    protected id: number
  ) {
    this.isBullet = Boolean(~this.identity.indexOf('Bullet'));
  }

  /**
   * 根据精灵中心的坐标，算出精灵(32*32的格子)在roadMap(表示16*16格子的坐标数组)数据中需要去计算的碰撞坐标
   * @returns {number[][]}
   */
  private getCollisionCoordGroupWidthBarrier(): number[][] {
    const distance = this.distanceToCenter;
    // 获取精灵中心点的坐标
    const [x, y] = [this.nextX + distance, this.nextY + distance];

    return collisionCoordGroup[this.direction](x, y, distance);
  }

  /**
   * 检查是否碰到了砖块（该方法会被子类重写）
   * @param 参数同getTouchItemBarrierCollisionInfo方法
   */
  protected isTouchBrick(row: number, col: number, index?: number): boolean { return false; }

  /**
   * 检查当前碰到的一个16*16的区域是否可以通过
   * @param row 当前碰撞坐标对应在roadMap中是哪一行
   * @param col 当前碰撞坐标对应在roadMap中是哪一列
   * @param index 这次检查的次序，需要通过这个值去判断具体检查的是哪个坐标(子弹的碰撞检测中需要)
   * @returns {{ isCollision: boolean, collisionType: string, row: number, col: number }}
   */
  private getTouchItemBarrierCollisionInfo(row: number, col: number, index: number): CollisionInfo {
    const roadTypeNum = roadMap[row][col];
    const _roadType = roadType[roadTypeNum];
    let isCollision = roadTypeNum > 1;

    // roadType为3表示砖块，砖块因为存在子弹会打掉8*8大小的位置的问题，所以是否会碰到砖块导致不能移动需要特殊检查
    (roadTypeNum === 3) && (isCollision = this.isTouchBrick(row, col, index));

    if (isCollision) {
      if (~this.identity.indexOf('Bullet')) {
        const { rank, nextX, nextY, directionNum, identity } = this;
        const clearBlockParams = { rank, nextX, nextY, directionNum, row, col };
        const b = { rank, nextX, nextY, directionNum, row, col, identity };

        if (_roadType === 'Steel') {
          DoAfterBulletCollision.hitSteel(b);
          !index && DoAfterBulletCollision.produceExplode([this.nextX, this.nextY], 'small');
        }

        if (_roadType === 'Brick') {
          DoAfterBulletCollision.hitBrick(clearBlockParams);
          !index && DoAfterBulletCollision.produceExplode([this.nextX, this.nextY], 'small');
        }

        if (_roadType === 'Home') {
          DoAfterBulletCollision.hitHome();
        }
      }
    }

    return { isCollision, collisionType: _roadType, row, col };
  }

  /**
   * 检查是否碰到砖块或者钢筋之类的障碍物
   * @returns {[{isCollision: boolean, collisionType: string}]}
   */
  private checkTouchBarrier(): CollisionInfo[] {
    let a =
      this.getCollisionCoordGroupWidthBarrier()
        .map((ele, index) => this.getTouchItemBarrierCollisionInfo(ele[1] >> 4, ele[0] >> 4, index));

    const isCollision = a.some(ele => ele.isCollision);

    // if (isCollision && this.isBullet) {
    //   DoAfterBulletCollision.produceExplode([this.nextX, this.nextY], 'small');
    // }
    return [{ isCollision }];
  }

  /**
   * 检查是否碰到边界
   * @returns {[{isCollision: boolean, collisionType: string}]}
   */
  private checkTouchBorder(): CollisionInfo[] {
    const isCollision = isTouchBorder[this.direction](this.nextX, this.nextY, this.distanceToCenter);
    const info = { isCollision, collisionType: 'Border' };

    if (isCollision) {
      // 如果子弹碰到了边界，那么执行相应的操作
      if (this.isBullet) {
        DoAfterBulletCollision.hitBorder([this.nextX, this.nextY], this.identity);
      }
    }

    return [info];
  }

  /**
   * 会被子类重写
   * 检查是否碰到坦克
   * @returns {[{isCollision: boolean}]}
   */
  protected checkTouchTank(): CollisionInfo[] { return [{ isCollision: false }]; }

  /**
   * 获取最后的碰撞信息
   * @param params
   * @returns {CollisionInfo[]} 返回一个数组，之所以这里需要返回数组是因为检查barrier的时候，可能出现一边碰到钢筋一边碰到砖块这种类似的情况
   * 因此需要返回两组信息
   */
  public getCollisionInfo(params: CollisionParams): CollisionInfo[] {
    // 将传入的参数赋值绑定到class相应的实例属性上
    Object.keys(params).forEach(ele => (this[ele] = params[ele]));
    this.directionNum = directionNum[this.direction];

    let collisionInfoArr: CollisionInfo[] = [{ isCollision: false }];

    this.checkTypeCollection.some(ele => {
      // 分别检查每一个碰撞类型，如果返回的碰撞信息里面的isCollision为真，那么直接输出相应的数据
      collisionInfoArr = this[`checkTouch${ele}`]();

      return collisionInfoArr.some(ele => ele.isCollision);
    });

    return collisionInfoArr;
  }
}
