import { SelectMode } from './SelectMode'
import { SelectStage } from './SelectStage'

export type IScreenViewType = 'selectMode' | 'selectStage' | 'playing' | 'over'

class Renderer {
  stageNum: number = 1
  renderer: any = new SelectMode()
  screenViewType: IScreenViewType = 'selectMode'

  setScreenViewType(type: 'selectMode' | 'playing' | 'over')
  setScreenViewType(type: 'selectStage', couldChangeState: boolean)
  setScreenViewType(type: IScreenViewType, payload?: boolean) {
    this.screenViewType = type

    if (type === 'selectMode') {
      this.renderer = new SelectMode()
    }

    if (type === 'selectStage') {
      this.renderer = new SelectStage(payload!)
    }
  }

  render() {
    this.renderer.render()
  }
}

export const renderer = new Renderer()
