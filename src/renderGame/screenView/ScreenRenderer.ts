/**
 * 添加一个检查是否需要销毁当前渲染器的判断方法，只适用于屏幕的渲染器
 */
import { Renderer } from '../Renderer'
import { screenView, ScreenViewType } from '.'

export abstract class ScreenRenderer extends Renderer {
  protected constructor(private readonly type: ScreenViewType) {
    super()
  }

  /**
   * 每次render的时候需要调用这个函数，用来检查当前屏幕内容是否需要被销毁
   */
  checkForDestroy() {
    const { type } = screenView

    if (type !== this.type) {
      this.remove()
    }
  }
}
