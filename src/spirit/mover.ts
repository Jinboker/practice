import { OFFSET_X, OFFSET_Y } from '../global/const';

abstract class Mover {
  abstract x: number;
  abstract next_x: number;
  abstract y: number;
  abstract next_y: number;
  abstract direction: string;
  abstract rank: number;
  abstract distanceToCenter: number;
  abstract speed: number;

  protected alive: boolean;

  constructor(public type: string) {
    this.alive = true;
  }

  abstract hitBarrier(): void;
  abstract hitTank(): void;
  abstract hitBorder(): void;
  abstract doAfterCollision(): void;
  abstract affirmNextPosition(): void;
  abstract draw(): void;

  // 精灵的中心点坐标
  protected spiritCenterCoord(): number[] {
    let distance = this.distanceToCenter;

    return [this.next_x + distance, this.next_y + distance];
  }
}

export default Mover;

