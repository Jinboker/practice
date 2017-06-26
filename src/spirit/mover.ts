const getNextPosition = {
  W: (x: number, y: number, speed: number): number[] => [x, y - speed],
  A: (x: number, y: number, speed: number): number[] => [x - speed, y],
  S: (x: number, y: number, speed: number): number[] => [x, y + speed],
  D: (x: number, y: number, speed: number): number[] => [x + speed, y]
};

abstract class Mover {
  abstract x: number;
  abstract next_x: number;
  abstract y: number;
  abstract next_y: number;
  abstract direction: string;
  abstract rank: number;
  abstract distanceToCenter: number;
  abstract speed: number;
  abstract type: string;

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

  abstract doAfterCollision(collisionInfo: collisionInfoItem[]): void;
  abstract affirmPosition(): void;
  abstract draw(): void;

  // 根据当前速度确定下个位置的坐标
  protected getNextPositionIfCouldMove(): number[] {
    return getNextPosition[this.direction](this.x, this.y, this.speed);
  }
}

export default Mover;

