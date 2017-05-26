import { SCREEN_L } from '../global/const';

abstract class Collision {
  abstract getCollisionInfo(): collisionInfo;

  protected direction: string;
  protected distanceToCenter: number;
  protected next_x: number;
  protected next_y: number;
  protected checkBorder: isTouchBorder;

  constructor() {
    this.checkBorder = {
      W: () => (this.next_y <= 0),
      A: () => (this.next_x <= 0),
      S: () => (this.next_y >= SCREEN_L - (this.distanceToCenter << 1)),
      D: () => (this.next_x >= SCREEN_L - (this.distanceToCenter << 1))
    };
  }

  protected isTouchBorder() {
  }
}

export default Collision;