import {Tank} from './tank';

class Npc extends Tank {
  constructor(x, y, direction, grade = 0) {
    super(x, y, direction);

    this.grade = grade;
    this.speed = 1;
    this.shieldDuration = 0;
  }

  moveState() {
    this.changeWheels();
    return [true, false];
  }
}

export {Npc};
