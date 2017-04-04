import {Tank} from './tank';
import {delayTimeout, firstUpperCase} from '../comm';

class Npc extends Tank {
  constructor(x, y, direction, type, index, grade = 0) {
    super(x, y, direction, type, index);

    this.grade = grade;
    this.speed = 1;
    this.shieldDuration = 0;

    this.changeDirectionDelayTimeout = 0;
    this.changeDirectionAble = false;
  }

  changeDirection() {
    let nextPositon = [this.x, this.y];

    this.changeDirectionDelayTimeout = delayTimeout(this.changeDirectionDelayTimeout, () => {
      this.changeDirectionAble = false;
      nextPositon = this.getPositionAfterChangeDirection();
    });

    return nextPositon;
  }

  hitBarrier() {
    this.changeDirectionDelayTimeout = 30;
  }

  doAfterCollision(collisionType) {
    this[`hit${firstUpperCase(collisionType)}`]();
  }

  confirmMoveState() {
    return [true, this.changeDirectionAble];
  }
}

export {Npc};
