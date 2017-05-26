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
  abstract affirmPosition(): void;

  // 精灵的中心点坐标
  protected spiritCenterCoord(): number[] {
    let distance = this.distanceToCenter;

    return [this.next_x + distance, this.next_y + distance];
  }

  // 根据当前速度确定下个位置的坐标
  protected getNextPosition(): number[] {
    const speed = this.speed;
    let [x, y] = [this.x, this.y];

    switch(this.direction) {
      case 'W': y = y - speed; break;
      case 'A': x = x - speed; break;
      case 'S': y = y + speed; break;
      case 'D': x = x + speed; break;
      default: break;
    }

    return [x, y];
  }
}

export default Mover;

