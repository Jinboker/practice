import { imgs, ctx, SCREEN } from 'src/global'
import { clearCanvas, delayLoop, tuple } from 'src/utils'
import { ScreenRenderer } from './ScreenRenderer'
import { core } from 'src/core'
import { Operate } from 'src/renderGame/Renderer'

const minTopOffset = 75
const baseIndicatorPosition = 285
const modes = tuple('single', 'double', 'construct')
const _len = modes.length

type SelectedMode = typeof modes[number]

export class SelectMode extends ScreenRenderer {
  private isTouchTop: boolean = false
  private tankWheelFlag: number = 0
  /**
   * 选择模式的指示器的位置
   */
  private indicatorY: number = baseIndicatorPosition
  /**
   * 动画距离canvas顶部的距离
   */
  private topOffset: number = SCREEN.height
  private selectedMode: SelectedMode = 'single'
  private delayChangeTankWheelFlag = delayLoop(5)

  protected operate: Operate = {
    // 初始默认监听A键
    A() {
      this.topOffset = minTopOffset
    }
  }

  constructor() {
    super('selectMode')
  }

  renderAfterTouchTop() {
    this.delayChangeTankWheelFlag(() => {
      this.tankWheelFlag = +!this.tankWheelFlag
    })

    const modeIndex = modes.indexOf(this.selectedMode)
    const bgCtx = ctx.bg!

    bgCtx.clearRect(140, 260, 32, 120)
    bgCtx.drawImage(
      imgs.player, 0, 64 + this.tankWheelFlag * 32, 32, 32, 140, this.indicatorY + modeIndex * 30, 32, 32
    )

    /**
     * 初始化操作函数
     */
    if (Object.keys(this.operate).length === 1) {
      this.operate = {
        up() {
          let index = modes.indexOf(this.selectedMode)

          index = !index ? _len - 1 : index - 1

          this.selectedMode = modes[index]
        },
        down() {
          let index = modes.indexOf(this.selectedMode)

          index = index === _len - 1 ? 0 : index + 1

          this.selectedMode = modes[index]
        },
        A() {
          /**
           * 进入渲染关卡的界面
           */
          core.renderScreen('stageView', true)
        }
      }
    }
  }

  renderBeforeTouchTop() {
    clearCanvas(['bg'])

    const bgCtx = ctx.bg!

    bgCtx.save()
    bgCtx.fillStyle = 'white'
    bgCtx.fillText('I-         00   HI-20000', 70, this.topOffset)
    bgCtx.fillText('NORMAL MODE', 190, this.topOffset + 220)
    bgCtx.fillText('CRAZY MODE', 190, this.topOffset + 250)
    bgCtx.fillText('CONSTRUCTION', 190, this.topOffset + 280)
    bgCtx.drawImage(imgs.ui, 0, 0, 376, 160, 70, this.topOffset + 25, 376, 160)
    bgCtx.restore()

    if (this.topOffset <= minTopOffset) {
      this.isTouchTop = true
    } else {
      this.topOffset -= 3
    }
  }

  render() {
    this.isTouchTop ? this.renderAfterTouchTop() : this.renderBeforeTouchTop()

    this.checkForDestroy()
  }
}
