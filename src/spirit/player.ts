import Tank from './tank';
import res from '../data/assets';
import { inputParam } from '../global';

const ATTACK_AUD = res.audio.attack;

export default class Player extends Tank {
  protected shieldDuration: number;

  constructor(
    public x: number,
    public y: number,
    public direction: string,
    public rank: number
  ) {
    super(x, y, direction, rank);

    this.speed = 2;
    this.type = 'player';
    this.shieldDuration = 200;
  }

  /**
   * @override
   * 检查按键按下的情况，看是否需要产生子弹
   */
  protected whetherProduceBullet() {
    if (this.stop) return;

    const funcKey = inputParam.functionKey;
    let fireAble = !(this.fireDelay && (this.fireDelay -= 1));

    if (fireAble && inputParam[funcKey] && !this.bulletAlive) {
      ATTACK_AUD.play();
      this.bulletAlive = true;
      this.fireDelay = 25;
      this.produceNewBullet();
    }
  }

  /**
   * 判断按键按下的情况，确定坦克是否需要转弯和下一个的位置
   * @returns {[number,number]}
   */
  private getNextCoord(): [number, number] {
    let [x, y] = [this.x, this.y];

    // 通过比对当前方向与按下的方向，判断是否需要改变方向，如果需要改变，则优先改变方向
    const directionKey = inputParam.directionKey;
    this.beChangeDirection = (Boolean(directionKey) && this.direction !== directionKey);

    if (this.beChangeDirection) {
      [x, y] = this.getCoordAfterChangeDirection();
      this.direction = directionKey;
    } else {
      // 如果移动按键按下，则移动
      if (inputParam[directionKey]) {
        this.changeWheelPic();
        [x, y] = this.getCoordMoveTo();
      }
    }

    return [x, y];
  }

  /**
   * @override
   * 确定坦克在本次渲染循环结束后的最终位置
   */
  protected affirmFinalCoord() {
    if (this.stop) return;

    // 确定下一个坐标和是否转换方向
    [this.nextX, this.nextY] = this.getNextCoord();

    if (this.beChangeDirection) {
      [this.x, this.y] = [this.nextX, this.nextY];
    } else {
      // 对下一个坐标进行碰撞检测
      const { direction, nextX, nextY, rank } = this;
      const collisionParams = { direction, nextX, nextY, rank };
      // 获取碰撞信息
      const collisionInfoGroup = this.collisionCheck.getCollisionInfo(collisionParams);
      // 如果下一个可能运动到的位置不会产生碰撞，那么直接运动到下个位置
      const isCollision = collisionInfoGroup.some(ele => ele.isCollision);

      !isCollision && ([this.x, this.y] = [this.nextX, this.nextY]);
    }
  }
}
