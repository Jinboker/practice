import Tank from './tank';
import res from '../data/assets';
import { inputParam } from '../global/var';

const ATTACK_AUD = res.audio.attack;

export default class Player extends Tank {
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
  }

  affirmPosition() {
    // 确定是否需要移动或者改变方向
    const directionKey = inputParam.directionKey;
    // 通过比对当前方向与按下的方向，判断是否需要改变方向，如果需要改变，则优先改变方向
    if (this.direction !== directionKey) {
      this.direction = directionKey;
      this.resetPositionIfChangeDirection();
    } else {
      // 确定是否能够移动
      this.couldMove = inputParam[directionKey];
      if (this.couldMove) {
        this.changeWheelPic();
        this.setNextPosition();
      }
    }
  }
}