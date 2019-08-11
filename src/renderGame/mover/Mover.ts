import { Renderer } from '../Renderer'
import { Direction } from 'src/global'

export type MoverInfo = {
  x: number,
  y: number,
  speed: number,
  direction: Direction
}

export abstract class Mover extends Renderer {
  protected abstract info: MoverInfo
  protected abstract nextPosition: Omit<MoverInfo, 'speed'>

  /**
   * 获取当前方向的下一个位置
   */
  protected getNextPositionByCurrentDirection() {
    const { x, y, speed, direction } = this.info

    const next = {
      up: [x, y - speed],
      down: [x, y + speed],
      right: [x + speed, y],
      left: [x - speed, y]
    }

    return next[direction]
  }
}
