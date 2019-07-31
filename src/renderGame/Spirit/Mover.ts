import { Renderer } from '../Renderer'
import { DIRECTION } from 'src/global'

export abstract class Mover extends Renderer {
  protected abstract x: number
  protected abstract y: number
  // 移动速度
  protected abstract speed: number
  // 当前方向
  protected abstract direction: DIRECTION

  // 检查是否需要被销毁
  protected abstract checkForDestroy(): boolean
}
