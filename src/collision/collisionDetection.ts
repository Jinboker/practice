import { SCREEN_L } from '../global/const';

abstract class Collision {
  abstract direction: string;
  abstract distanceToCenter: number;
  abstract x: number;
  abstract y: number;

  abstract getCollisionInfo(direction: string, x: number, y: number): collisionInfo;
  abstract borderCollision(): collisionInfo;
  abstract tankCollision(): collisionInfo;
  abstract barrierCollision(): collisionInfo;

  protected isTouchBorder: isTouchBorder;

  constructor() {
    this.isTouchBorder = {
      W: () => (this.y < 0),
      A: () => (this.x < 0),
      S: () => (this.y > SCREEN_L - (this.distanceToCenter << 1)),
      D: () => (this.x > SCREEN_L - (this.distanceToCenter << 1))
    };
  }
}

export default Collision;