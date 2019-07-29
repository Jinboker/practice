import { imgs, ctx, keyStatus, screen } from 'src/global'
import { clearCanvas, delayLoop, tuple } from 'src/utils'
import { Renderer } from '../Renderer'

const minTopOffset = 75
const baseIndicatorPosition = 285
const modes = tuple('single', 'double', 'construct')

type SelectedMode = typeof modes[number]

export class SelectMode extends Renderer {
  private tankWheelFlag: number = 0
  /**
   * 选择模式的指示器的位置
   */
  private indicatorY: number = baseIndicatorPosition
  /**
   * 动画距离canvas顶部的距离
   */
  private topOffset: number = screen.height
  private selectedMode: SelectedMode = 'single'
  private delayChangeTankWheelFlag = delayLoop(5)

  constructor() {
    super()
  }

  operateListener() {
    const _len = modes.length
    const pressedKey = keyStatus.pressedKey

    if (!pressedKey) {
      return
    }

    let modeIndex = modes.indexOf(this.selectedMode)

    if (pressedKey === 'up') {
      modeIndex = !modeIndex ? _len - 1 : modeIndex - 1
    }

    if (pressedKey === 'down') {
      modeIndex = modeIndex === _len - 1 ? 0 : modeIndex + 1
    }

    if (pressedKey === 'A') {
      // renderer.setScreenViewType('selectStage', true)
    }

    keyStatus[pressedKey] = false
    keyStatus.pressedKey = void 0
    this.selectedMode = modes[modeIndex]
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

    this.operateListener()
  }

  renderBeforeTouchTop() {
    // 如果按下了A键，那么直接运动到顶部
    if (keyStatus.A) {
      this.topOffset = minTopOffset
      keyStatus.A = false
      keyStatus.pressedKey = void 0
    } else {
      this.topOffset -= 3
    }

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
  }

  render() {
    if (this.topOffset <= minTopOffset) {
      this.renderAfterTouchTop()
    } else {
      this.renderBeforeTouchTop()
    }
  }
}
