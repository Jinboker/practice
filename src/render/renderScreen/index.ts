import { SelectMode } from './SelectMode'

export type IScreenViewType = 'selectMode' | 'selectStage' | 'playing' | 'over'

class RenderScreen {
  private renderer: any = new SelectMode()

  screenViewType: IScreenViewType = 'selectMode'

  setScreenViewType(type: 'selectMode' | 'playing' | 'over')
  setScreenViewType(type: 'selectStage', couldChangeState: boolean)
  setScreenViewType(type: IScreenViewType, payload?: boolean) {
    this.screenViewType = type

    if (type === 'selectMode') {
      this.renderer = new SelectMode()
    }

    if (type === 'selectStage') {
      //
    }
  }

  render() {
    this.renderer.render()
  }
}

export const renderScreen = new RenderScreen()
