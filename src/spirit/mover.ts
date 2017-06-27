const getNextPosition = {
  W: (x: number, y: number, speed: number): number[] => [x, y - speed],
  A: (x: number, y: number, speed: number): number[] => [x - speed, y],
  S: (x: number, y: number, speed: number): number[] => [x, y + speed],
  D: (x: number, y: number, speed: number): number[] => [x + speed, y]
};

abstract class Mover {
  protected abstract x: number;
  protected abstract next_x: number;
  protected abstract y: number;
  protected abstract next_y: number;
  protected abstract direction: string;
  protected abstract rank: number;
  protected abstract distanceToCenter: number;
  protected abstract speed: number;
  protected abstract type: string;

  protected collisionInfo: collisionInfo;

  public alive: boolean;
  public id: number;

  constructor() {
    this.alive = true;
    this.collisionInfo = {
      isCollision: false,
      info: []
    };
  }

  protected abstract doAfterCollision(collisionInfo: collisionInfoItem[]): void;
  protected abstract affirmPosition(): void;
  protected abstract draw(): void;

  // 根据当前速度确定下个位置的坐标
  protected getNextPositionIfCouldMove(): number[] {
    return getNextPosition[this.direction](this.x, this.y, this.speed);
  }
}

export default Mover;
