import { positionAfterMove } from '../objectFn/move';
import { CXT_ROLE } from '../const';

class Mover {
  constructor() {
    this.x;
    this.y;
    this.direction;
    this.speed;
    this.position = [this.x, this.y];
  }

  collision(position) {

  }

  move() {
    this.position = positionAfterMove(this.x, this.y, this.direction, this.speed);

    return this.collision(this.position);
  }

  draw() {
    !this.move() && (this.position = [this.x, this.y]);
    CXT_ROLE.drawImage();
  }
}

export { Mover };