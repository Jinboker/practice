import { ctx, screen } from 'src/global'

const halfScreenHeight = screen.height >> 1

export class SelectStage {
  private slidingMaskWidth: number = 0
  private process: 'maskingScreen' | 'waitForSelect' | 'clearScreen' = 'maskingScreen'

  constructor(
    private couldSelectStage: boolean
  ) {}

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
    }
  }

  render() {
    const process = this.process

    switch (process) {
      case 'maskingScreen':
        this.renderMaskingScreen()
        break
      case 'waitForSelect':
        break
      case 'clearScreen':
        break
      default: break
    }
  }
}
