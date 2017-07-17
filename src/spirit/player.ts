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
    this.couldMove = false;
    this.shieldDuration = 200;
  }

  /**
   * @override
   * 检查按键按下的情况，看是否需要产生子弹
   */
  protected whetherProduceBullet() {
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
   * 判断按键按下的情况，确定坦克在移动，转弯及不移动的情况下，下一个的坐标
   * @returns {[number,number]} 坐标
   */
  private getNextCoord() {
    let [x, y] = [this.x, this.y];

    // 通过比对当前方向与按下的方向，判断是否需要改变方向，如果需要改变，则优先改变方向
    const directionKey = inputParam.directionKey;
    this.beChangeDirection = (Boolean(directionKey) && this.direction !== directionKey);

    if (this.beChangeDirection) {
      [x, y] = this.getCoordAfterChangeDirection();
      this.direction = directionKey;
    } else {
      // 确定是否能够移动
      this.couldMove = inputParam[directionKey];
      if (this.couldMove) {
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
    // 确定下一个坐标
    [this.nextX, this.nextY] = this.getNextCoord();

    // 对下一个坐标进行碰撞检测
    const { direction, nextX, nextY, type, id } = this;
    const collisionParams = { direction, nextX, nextY, type, id };
    // 获取碰撞信息
    const collisionInfoGroup = this.collisionCheck.getCollisionInfo(collisionParams);
    // 如果下一个可能运动到的位置不会产生碰撞，那么直接运动到下个位置
    const isCollision = collisionInfoGroup.some(ele => ele.isCollision);

    !isCollision && ([this.x, this.y] = [this.nextX, this.nextY]);
  }
}
