abstract class Mover {
  abstract x: number;
  abstract next_x: number;
  abstract y: number;
  abstract next_y: number;
  abstract direction: string;
  abstract distanceToCenter: number;
  abstract spiritWidth: number;
  abstract rank: number;

  protected alive: boolean;

  constructor(public type: string) {
    this.alive = true;
  }

  abstract affirmNextPosition(): void;
  abstract doAfterCollision(): void;
  abstract move(): void;
  abstract draw(): void;

  // 精灵的中心点坐标
  spiritCenterCoord(): number[] {
    let distance = this.distanceToCenter;

    return [this.next_x + distance, this.next_y + distance];
  }
}

export default Mover;

