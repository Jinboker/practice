import { ctx } from 'src/global'

export class SelectStage {
  private process: 'spreadScreen' | 'waitForSelect' | 'foldScreen' = 'foldScreen'

  constructor(
    private couldSelectStage: boolean
  ) {}

  // 入场动画，展开屏幕
  renderSpreadScreen() {
    const bgCtx = ctx.bg!

    bgCtx.save()
    bgCtx.fillStyle = '#666'
    bgCtx.restore()
    console.log(this.couldSelectStage)
  }

  render() {
    const process = this.process

    switch (process) {
      case 'spreadScreen':
        this.renderSpreadScreen()
        break
      case 'waitForSelect':
        break
      case 'foldScreen':
        break
      default: break
    }
  }
}
