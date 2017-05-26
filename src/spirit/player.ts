import Tank from './tank';
import res from '../data/assets';
import { inputParam } from '../global/var';
import TankCollision from '../collision/tankCollision';

const ATTACK_AUD = res.audio.attack;

export default class Player extends Tank {
  private a: TankCollision;

  constructor(
    x: number,
    y: number,
    direction: string,
    type: string,
    rank: number
  ) {
    super(x, y, direction, type, rank);

    this.speed = 2;
    this.couldMove = false;

    this.a = new TankCollision();
  }

  getNextPositionVal(): number[] {
    let x = 0, y = 0;

    // 确定是否需要移动或者改变方向
    const directionKey = inputParam.directionKey;
    // 通过比对当前方向与按下的方向，判断是否需要改变方向，如果需要改变，则优先改变方向
    this.beChangeDirection = (this.direction !== directionKey);
    if (this.beChangeDirection) {
      this.direction = directionKey;
      [this.next_x, this.next_y] = this.getPositionAfterChangeDirection();
    } else {
      // 确定是否能够移动
      this.couldMove = inputParam[directionKey];
      if (this.couldMove) {
        this.changeWheelPic();
        [this.next_x, this.next_y] = this.getNextPosition();
      }
    }

    return [x, y];
  }

  affirmPosition() {
    // 确定下一个位置的值
    [this.next_x, this.next_y] = this.getNextPositionVal();
    [this.x, this.y] = [this.next_x, this.next_y];
    this.a.getCollisionInfo.bind(this)();
  }
}