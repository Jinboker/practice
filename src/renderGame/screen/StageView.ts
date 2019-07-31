import { ctx, screen, audios } from 'src/global'
import { clearCanvas, delayLoop } from 'src/utils'
import { ScreenRenderer } from './ScreenRenderer'
import { core } from 'src/core'
import { stageMap } from 'src/config'
import { Operate } from '../Renderer'

const { height, width, gameView } = screen
const { xOffset, yOffset, len } = gameView

const halfScreenHeight = height >> 1
const halfGameView = len >> 1
const maxStage = stageMap.length

export class StageView extends ScreenRenderer {
  private slidingMaskWidth: number = 0
  private process: 'maskingScreen' | 'waitForSelect' | 'clearScreen' = 'maskingScreen'
  private delayClearMask = delayLoop(80)
  private startClearMask: boolean = false
  protected operate: Operate = {}

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
      this.process = 'waitForSelect'
    }
  }

  enterClearScreenMode() {
    this.process = 'clearScreen'

    audios.start.play()
  }

  /**
   * 等待选择关卡，如果不选择直接按A键，那么进入下一个步骤
   */
  waitForSelect() {
    const otherCtx = ctx.other!

    otherCtx.clearRect(180, 210, 220, 40)
    otherCtx.fillText(`STAGE  ${core.getStage()}`, 180, 218)

    if (this.couldSelectStage) {
      if (!Object.keys(this.operate).length) {
        this.operate = {
          up() {
            let stageNum = core.getStage()

            stageNum = stageNum > 1 ? stageNum  - 1 : maxStage

            core.setStage(stageNum)
          },
          down() {
            let stageNum = core.getStage()

            stageNum = stageNum < maxStage ? stageNum + 1 : 1

            core.setStage(stageNum)
          },
          A() {
            this.enterClearScreenMode()
          }
        }
      }
    } else {
      this.enterClearScreenMode()
    }
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

        /**
         * 开始渲染地图
         */
        core.renderMap()

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
