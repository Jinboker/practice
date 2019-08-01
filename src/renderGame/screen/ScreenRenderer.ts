/**
 * 添加一个检查是否需要销毁当前渲染器的判断方法，只适用于屏幕的渲染器
 */
import { Renderer } from '../Renderer'
import { ScreenViewType } from 'src/core'

export abstract class ScreenRenderer extends Renderer {
  protected constructor(private readonly type: ScreenViewType) {
    super()
  }

  canDestroy() {
    const screenType = Renderer.getScreenType()

    return screenType !== this.type
  }
}
