import { ctx, screen } from 'src/global'
import { clearCanvas, delayLoop } from 'src/utils'
import { ScreenRenderer } from './ScreenRenderer'

const { height, width, gameView } = screen
const { xOffset, yOffset, len } = gameView

const halfScreenHeight = height >> 1
const halfGameView = len >> 1

export class StageView extends ScreenRenderer {
  private slidingMaskWidth: number = 0
  private process: 'maskingScreen' | 'waitForSelect' | 'clearScreen' = 'maskingScreen'
  private delayClearMask = delayLoop(80)
  private startClearMask: boolean = false

  constructor(
    private couldSelectStage: boolean
  ) {
    super('stageView')
  }

  // 入场动画，蒙层上下运动遮住画布
  renderMaskingScreen() {
    const bgCtx = ctx.bg!

    bgCtx.save()
    bgCtx.fillStyle = '#666'
    bgCtx.fillRect(0, 0, screen.width, this.slidingMaskWidth)
    bgCtx.fillRect(0, screen.height - this.slidingMaskWidth, screen.width, this.slidingMaskWidth)
    bgCtx.restore()

    if (this.slidingMaskWidth <= halfScreenHeight) {
      this.slidingMaskWidth += 15
    } else {
      this.process = this.couldSelectStage ? 'waitForSelect' : 'clearScreen'
      this.process = 'clearScreen'
    }
  }

  /**
   * 等待选择关卡，如果不选择直接按A键，那么进入下一个步骤
   */
  waitForSelect() {
    //
  }

  clearScreenMask() {
    const bgCtx = ctx.bg!
    const otherCtx = ctx.other!

    if (!this.startClearMask) {
      this.delayClearMask(() => {
        bgCtx.clearRect(xOffset, yOffset, len, len)

        clearCanvas(['other'])

        otherCtx.save()
        otherCtx.fillStyle = '#666'
        otherCtx.fillRect(0, 0, width, height)
        otherCtx.restore()

        this.startClearMask = true
        this.slidingMaskWidth = 0
      })
    } else {
      otherCtx.clearRect(xOffset + halfGameView - this.slidingMaskWidth, yOffset, 2 * this.slidingMaskWidth, len)

      if (this.slidingMaskWidth < halfGameView) {
        this.slidingMaskWidth += 15
      } else {
        //
      }
    }
  }

  render() {
    const process = this.process

    switch (process) {
      case 'maskingScreen':
        this.renderMaskingScreen()
        break
      case 'waitForSelect':
        this.waitForSelect()
        break
      case 'clearScreen':
        this.clearScreenMask()
        break
      default: break
    }

    this.checkForDestroy()
  }
}
