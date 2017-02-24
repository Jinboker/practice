import { Tank } from './tank';

class Npc extends Tank {
  constructor (x, y, direction, grade = 0) {
    super(x, y, direction);

    this.grade = grade;
  }

  draw() {
    this.move();
    this.drawTank();
  }
}

export { Npc };
