import { SelectMode } from './SelectMode'

export type IScreenViewType = 'selectMode' | 'selectState'

class RenderScreen {
  private screenType: IScreenViewType = 'selectMode'
  private renderer: any = new SelectMode()

  setScreenType(type: IScreenViewType) {
    this.screenType = type

    this.setRenderType()
  }

  setRenderType() {
    const type = this.screenType

    if (type === 'selectMode') {
      this.renderer = new SelectMode()
    }
  }

  render() {
    this.renderer.render()
  }
}

export const renderScreen = new RenderScreen()
