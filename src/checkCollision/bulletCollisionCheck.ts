import CollisionCheck from './collisionCheck';
import { getPositionInBrick } from '../util/fn';
import { brickStatus, spiritCollection, directionNum } from '../global';

const isBulletHitTank = {
  W: (x: number, y: number) => (y < 32 && y > 0 && x > -8 && x < 32),
  A: (x: number, y: number) => (x < 32 && x > 0 && y > -8 && y < 32),
  S: (x: number, y: number) => (y > -8 && y < 0 && x > -8 && x < 32),
  D: (x: number, y: number) => (x > -8 && x < 0 && y > -8 && y < 32)
};

export default class BulletCollisionCheck extends CollisionCheck {
  constructor(
    protected type: string,
    protected id: number
  ) {
    super(type, id);

    this.distanceToCenter = 4;
    this.checkTypeCollection = ['Border', 'Tank', 'Barrier', 'Bullet'];
  }

  /**
   * @override
   * 检查是否碰到了砖块
   * @param 参数同getTouchItemBarrierCollisionInfo方法
   * @returns {boolean} 是否碰到了砖块
   */
  protected isTouchBrick(row: number, col: number, index: number): boolean {
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    // 如果brickStatusArr的值为undefined，那么表明砖块还是第一次被子弹撞到，直接返回true表明已经碰到砖块
    if (!brickStatusArr) return true;

    const { nextX, nextY, directionNum } = this;
    const positionInBrick = getPositionInBrick({ x: nextX, y: nextY, row, col, directionNum });

    return Boolean(
      this.directionNum % 2
        ? brickStatusArr[index][positionInBrick]
        : brickStatusArr[positionInBrick][index]
    );
  }

  protected checkTouchTank(): CollisionInfo[] {
    const collisionInfo = { isCollision: false, collisionType: 'Tank' };
    const tankArr = spiritCollection.tankArr;
    // 根据子弹的类型确定当前子弹需要对玩家还是NPC的坦克进行碰撞检测
    const collisionTankArr = this.type === 'npc'
      ? tankArr.slice(0, 1) : tankArr.slice(1);

    collisionInfo.isCollision = collisionTankArr.some(ele => {
      if (!ele || ele.id === this.id) return false;

      const { x, y } = ele;
      const distanceX = Math.abs(this.nextX - x);
      const distanceY = Math.abs(this.nextY - y);

      const _isCollision = isBulletHitTank[this.direction](distanceX, distanceY);

      if (_isCollision) {
        collisionInfo['id'] = ele.id;
        collisionInfo['tankCoord'] = [x, y];
      }
      // _isCollision && (collisionInfo['id'] = ele.id);

      return _isCollision;
    });

    return [collisionInfo];
  }

  /**
   * 检查玩家的子弹是否碰到了NPC的子弹
   * @returns {CollisionInfo[]}
   */
  protected checkTouchBullet(): CollisionInfo[] {
    let collisionInfo = { isCollision: false, collisionType: 'Bullet' };

    if (this.type === 'npc') return [collisionInfo];

    const bulletArr = spiritCollection.bulletArr.concat();
    let playerBulletIndex = bulletArr.findIndex(ele => (ele.id === this.id));

    if (~playerBulletIndex) {
      bulletArr.splice(playerBulletIndex, 1);
      collisionInfo.isCollision = bulletArr.some(ele => {
        if (!ele || !ele.alive) return false;

        const _isCollision = Math.abs(this.nextX - ele.x) <= 8 && Math.abs(this.nextY - ele.y) <= 8;

        _isCollision && (collisionInfo['id'] = ele.id);

        return _isCollision;
      });
    }

    return [collisionInfo];
  }
}
