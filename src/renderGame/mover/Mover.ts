import { Renderer } from '../Renderer'
import { Direction } from 'src/global'

/**
 * todo
 * 每个移动对象都先存储一下下一个位置，下次render之前先把下一个位置拿出来做碰撞检查，检查通过后才允许将坐标写入
 */
export abstract class Mover extends Renderer {
  // 当前移动对象的坐标
  protected abstract x: number
  protected abstract y: number

  // 先计算出移动对象的下一个坐标，然后拿这个坐标进行碰撞检查，通过后会将这个坐标写入到x、y
  protected abstract nextX: number
  protected abstract nextY: number

  // 移动速度
  protected abstract speed: number
  // 当前方向
  protected abstract direction: Direction

  // 移动
  protected abstract move(): boolean

  /**
   * 获取当前方向的下一个位置
   */
  protected getNextPositionByCurrentDirection() {
    const { x, y, speed } = this

    const next = {
      up: [x, y - speed],
      down: [x, y + speed],
      right: [x + speed, y],
      left: [x - speed, y]
    }

    return next[this.direction]
  }
}
