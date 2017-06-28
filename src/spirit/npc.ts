import Tank from './tank';
import { delayTimeout } from '../util/fn';
import { dirNum } from '../global/var';

export default class Npc extends Tank {
  private changeDirectionDelay: DelayOption;

  constructor(
    x: number,
    y: number,
    direction: string,
    rank: number
  ) {
    super(x, y, direction, rank);

    this.speed = 1;
    this.type = 'npc';
    this.couldMove = true;
    this.changeDirectionDelay = { count: 30, amount: 30 };
  }

  // override
  public produceBullet() {
    const fireAble = !(this.fireDelay && (this.fireDelay -= 1));

    if (fireAble && !this.bulletAlive) {
      this.bulletAlive = true;
      this.fireDelay = 25;
      this.newBullet();
    }
  }

  private getRandomDirection() {
    let direction = '';

    do {
      direction = dirNum[Math.floor(Math.random() * 4)];
    } while (direction === this.direction);

    this.direction = direction;
  }

  // 如果NPC碰到了障碍
  private touchBarrier() {
    delayTimeout(this.changeDirectionDelay, () => {
      this.couldMove = true;
      this.beChangeDirection = true;
    });
  }

  private getNextPosition() {
    const [x, y] = this.beChangeDirection
      ? this.getPositionAfterChangeDirection()
      : this.getNextPositionIfCouldMove();

    this.beChangeDirection && this.getRandomDirection();

    return [x, y];
  }

  // override
  protected affirmPosition() {
    this.changeWheelPic();

    if (this.couldMove) {
      // 确定下一个位置的值
      [this.next_x, this.next_y] = this.getNextPosition();
      // 检查当坦克移动到下个位置以后是否会产生碰撞
      this.collisionInfo = this.detectionCollision.getCollisionInfo(this.direction, this.next_x, this.next_y, this.type, this.id);
      this.couldMove = !this.collisionInfo.isCollision;
    }

    if (this.couldMove) {
      // 如果没有碰撞则确定位置
      [this.x, this.y] = [this.next_x, this.next_y];
    } else {
      this.touchBarrier();
    }
  }
}