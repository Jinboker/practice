import { img, ctx } from 'src/global'
import { screen } from 'src/constant'
import { clearCanvas, delayLoop } from 'src/utils'

const MIN_Y = 285

export class SelectMode {
  private touchTop: boolean = false
  private tankWheelFlag: number = 0
  private indicatorY: number = MIN_Y
  private topOffset: number = screen.height
  private delayChangeTankWheelFlag = delayLoop(5)

  renderAfterTouchTop() {
    this.delayChangeTankWheelFlag(() => {
      this.tankWheelFlag = +!this.tankWheelFlag
    })

    const bgCtx = ctx.bg!

    bgCtx.clearRect(140, 260, 32, 120)
    bgCtx.drawImage(
      img.player, 0, 64 + this.tankWheelFlag * 32, 32, 32, 140, this.indicatorY, 32, 32
    )
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
    bgCtx.drawImage(img.ui, 0, 0, 376, 160, 70, this.topOffset + 25, 376, 160)
    bgCtx.restore()

    this.topOffset -= 3

    if (this.topOffset <= 75) {
      this.touchTop = true
    }
  }

  render() {
    if (this.touchTop) {
      this.renderAfterTouchTop()
    } else {
      this.renderBeforeTouchTop()
    }
  }
}
