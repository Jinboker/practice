import { Tank } from './tank';
import { inputKey } from '../variables';

class Player extends Tank {
  constructor(x, y, direction, type, index, grade = 0) {
    super(x, y, direction, type, index);

    this.speed = 2;
    this.grade = grade;
    this.shieldDuration = 200;
  }

  stopGame() {}

  pressFuncKey() {
    let pressedFuncKey = inputKey.funcKey;
    let fireAble = !(this.fireDelay && (this.fireDelay -= 1));

    if (inputKey[pressedFuncKey]) {
      pressedFuncKey === 'H' ? this.stopGame() : fireAble && this.newBullet();
    }
  }

  pressDirectionKey() {
    let pressedDirectionKey = inputKey.directionKey;
    let couldMove = inputKey[pressedDirectionKey];
    let changeDirectionAble = false;

    if (couldMove) {
      changeDirectionAble = (this.direction !== pressedDirectionKey);
    }

    return [couldMove, changeDirectionAble];
  }

  confirmMoveState() {
    this.pressFuncKey();

    let moveState = this.pressDirectionKey();

    return moveState;
  }

  doAfterCollision() {
    // TODO
    // 玩家碰到奖励
  }

  changeDirection() {
    let nextPostion = this.getPositionAfterChangeDirection();

    this.direction = inputKey.directionKey;

    return nextPostion;
  }
}

export { Player };