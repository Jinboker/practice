import { Renderer } from '../Renderer'
import { Direction } from 'src/global'

export abstract class Mover extends Renderer {
  protected abstract x: number
  protected abstract y: number
  // 移动速度
  protected abstract speed: number
  // 当前方向
  protected abstract direction: Direction

  // 移动
  protected abstract move(): boolean
}
