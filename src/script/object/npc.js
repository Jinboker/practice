import {Tank} from './tank';
import {delayTimeout} from '../comm';

class Npc extends Tank {
  constructor(x, y, direction, type, index, grade = 0) {
    super(x, y, direction, type, index);

    this.grade = grade;
    this.speed = 1;
    this.shieldDuration = 0;

    this.changeDirectionDelayTimeout = 30;
  }

  changeDirection() {
    this.changeDirectionDelayTimeout = delayTimeout(this.changeDirectionDelayTimeout, () => {
      this.changeDirectionAble = false;
      
    });
  }

  doAfterCollision() {
    this.changeDirectionAble = true;
  }

  beMoving() {
    this.changeWheels();
    return true;
  }
}

export {Npc};
