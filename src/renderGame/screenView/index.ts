import { SelectMode } from './selectMode'

type Fn = () => void
export type ScreenViewType = 'selectMode' | 'selectStage' | 'playing' | 'over'
export type ScreenView = {
  type: ScreenViewType,
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
