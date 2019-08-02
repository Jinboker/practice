/**
 * 渲染器的抽象类，每个渲染器都必须继承该抽象类
 * 当子类实例化的时候，会自动将实例注册到渲染总线上，随后每次渲染循环中就会自动调用实例上的render方法
 * 当不需要渲染后，需要手动销毁掉该渲染器
 */
import { tuple, uniqueId } from 'src/utils'
import { core } from 'src/core'
import { Key, pressedKey } from 'src/global'
import { renderingBus } from 'src/renderingBus'

/**
 * 操作执行的函数，
 * 如果不返回值，默认该操作在按键下次被按下之前，只会执行一次
 * 如果返回TRUE，那么除非松开按键，或者按下另外一个同类型的按键，那么该操作会一直执行下去
 */
export type Operate = {
  [K in Key]?: () => boolean | void
}

export abstract class Renderer {
  private readonly id: string
  protected operate: Operate

  /**
   * 获取当前屏幕的渲染模式
   */
  static getScreenType() {
    return core.getScreenViewType()
  }

  protected constructor() {
    this.id = uniqueId()

    /**
     * 将当前渲染器的render函数注册到渲染总线上
     */
    renderingBus.registerRenderer(this.id, this.renderer.bind(this))
  }

  destroy() {
    renderingBus.removeRenderer(this.id)
  }

  executeOperate() {
    if (!this.operate || !Object.keys(this.operate).length) {
      return
    }

    Object.entries(this.operate).forEach(([key, fn]) => {
      // 检查时功能键还是方向键，不同类型处理方式不同
      tuple('direction', 'func').forEach(name => {
        const currentKey = pressedKey[name]

        // 如果当前该类型的按键没有被按下，或者与需要执行操作的key不相等，直接返回
        if (!currentKey || currentKey !== key) {
          return
        }

        const result = fn!.call(this)

        if (!result) {
          pressedKey[name] = ''
        }
      })
    })
  }

  /**
   * 渲染器
   */
  renderer() {
    this.render()
    this.executeOperate()

    if (this.canDestroy()) {
      this.destroy()
    }
  }

  abstract canDestroy(): boolean

  /**
   * 每个渲染器的渲染函数
   */
  abstract render(): void
}
