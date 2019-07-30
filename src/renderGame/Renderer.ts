/**
 * 渲染器的抽象类，每个渲染器都必须继承该抽象类
 * 当子类实例化的时候，会自动将实例注册到渲染总线上，随后每次渲染循环中就会自动调用实例上的render方法
 * 当不需要渲染后，需要手动销毁掉该渲染器
 */
import { uniqueId } from 'src/utils'
import { core } from 'src/core'
import { renderingBus } from 'src/renderingBus'

export abstract class Renderer {
  private readonly id: string

  /**
   * 获取当前屏幕的渲染模式
   */
  static getScreenType() {
    return core.getScreenViewType()
  }

  protected constructor(type?: string) {
    this.id = uniqueId(type || '')

    /**
     * 将当前渲染器的render函数注册到渲染总线上
     */
    renderingBus.registerRenderer(this.id, this.render.bind(this))
  }

  destroy() {
    renderingBus.removeRenderer(this.id)
  }

  /**
   * 每个渲染器的渲染函数
   */
  abstract render(): void
}
