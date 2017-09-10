import Tank from './tank';
import { directionNum } from '../global';
import { delayTimeout } from '../util/fn';

export default class Npc extends Tank {
  // 当碰到障碍物后延迟多长时间去改变方向
  private changeDirectionDelay: DelayOption;
  // npc是否可以继续向前移动
  private couldMoveForward: boolean;

  constructor(
    x: number,
    y: number,
    direction: string,
    rank: number
  ) {
    super(x, y, direction, rank);

    this.speed = 1;
    this.type = 'npc';
    this.couldMoveForward = true;
    this.changeDirectionDelay = { count: 30, amount: 30 };
  }

  /**
   * @override
   * 如果NPC之前发出的子弹挂了，产生新的子弹
   */
  protected whetherProduceBullet() {
    if (this.stop) return;

    const fireAble = !(this.fireDelay && (this.fireDelay -= 1));

    if (fireAble && !this.bulletAlive) {
      this.bulletAlive = true;
      this.fireDelay = 25;
      this.produceNewBullet();
    }
  }

  /**
   * 当NPC坦克撞到障碍物以后，会随机一个非当前方向的新方向出来
   */
  private getRandomDirection() {
    let direction = '';

    do {
      direction = directionNum[Math.floor(Math.random() * 4)];
    } while (direction === this.direction);

    this.direction = direction;
  }

  // 如果NPC碰到了障碍
  private delayToChangeDirection() {
    delayTimeout(this.changeDirectionDelay, () => {
      this.couldMoveForward = true;
      this.beChangeDirection = true;
    });
  }

  /**
   * 判断按键按下的情况，确定坦克在移动，转弯及不移动的情况下，下一个的坐标
   * @returns {[number,number]}
   */
  private getNextCoord() {
    let x, y;
    if (this.beChangeDirection) {
      [x, y] = this.getCoordAfterChangeDirection();
      this.getRandomDirection();
    } else {
      [x, y] = this.getCoordMoveTo();
    }

    return [x, y];
  }

  /**
   * @override
   * 确定坦克在本次渲染循环结束后的最终位置
   */
  protected affirmFinalCoord() {
    if (this.stop) return;

    this.changeWheelPic();

    // 如果不能继续向前移动，那么等待一定时间后改变方向
    if (!this.couldMoveForward) {
      this.delayToChangeDirection();
      return;
    }

    // 确定下一个位置的值
    [this.nextX, this.nextY] = this.getNextCoord();

    if (this.beChangeDirection) {
      this.beChangeDirection = false;
      [this.x, this.y] = [this.nextX, this.nextY];
    } else {
      const { direction, nextX, nextY, rank } = this;
      const collisionParams = { direction, nextX, nextY, rank };
      // 获取碰撞信息
      const collisionInfoGroup = this.collisionCheck.getCollisionInfo(collisionParams);
      // 如果下一个可能运动到的位置不会产生碰撞，那么直接运动到下个位置
      const isCollision = collisionInfoGroup.some(ele => ele.isCollision);

      !isCollision && ([this.x, this.y] = [this.nextX, this.nextY]);
      this.couldMoveForward = !isCollision;
    }
  }
}
