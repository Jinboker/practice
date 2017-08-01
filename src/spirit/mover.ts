const nextCoord = {
  W: (x: number, y: number, speed: number): number[] => [x, y - speed],
  A: (x: number, y: number, speed: number): number[] => [x - speed, y],
  S: (x: number, y: number, speed: number): number[] => [x, y + speed],
  D: (x: number, y: number, speed: number): number[] => [x + speed, y]
};

abstract class Mover {
  public abstract x: number;
  public abstract y: number;
  public abstract id: number;
  protected abstract nextX: number;
  protected abstract nextY: number;
  protected abstract direction: string;
  protected abstract rank: number;
  protected abstract distanceToCenter: number;
  protected abstract speed: number;
  protected abstract type: string;

  public alive: boolean;
  // 确定最终的坐标
  protected abstract affirmFinalCoord(): void;
  // 渲染精灵
  public abstract renderSpirit(): void;

  constructor() {
    this.alive = true;
  }

  // 如果可以移动，那么根据速度确定下一个移动到的坐标点
  protected getCoordMoveTo(): number[] {
    return nextCoord[this.direction](this.x, this.y, this.speed);
  }
}

export default Mover;
