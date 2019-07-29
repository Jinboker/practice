import { SelectMode } from './selectMode'

type Fn = () => void
type ScreenView = {
  type: 'selectMode' | 'selectStage' | 'playing' | 'over',
  renderSelectMode: Fn,
}

export const screenView: ScreenView = {
  type: 'selectMode',

  /**
   * 渲染选择模式的界面
   */
  renderSelectMode() {
    new SelectMode()

    screenView.type = 'selectMode'
  }
}
