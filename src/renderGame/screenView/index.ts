import { SelectMode } from './selectMode'
import { SelectStage } from './selectStage'

type Fn = () => void
export type ScreenViewType = 'selectMode' | 'selectStage' | 'playing' | 'over'
export type ScreenView = {
  type: ScreenViewType,
  renderSelectMode: Fn,
  renderSelectStage: (couldSelectStage: boolean) => void
}

export const screenView: ScreenView = {
  type: 'selectMode',

  /**
   * 渲染选择模式的界面
   */
  renderSelectMode() {
    new SelectMode()

    screenView.type = 'selectMode'
  },

  /**
   * 进入关卡界面
   * @param couldSelectStage 是否可以选择关卡，在游戏一开始初始进入第一关的时候(非自定义第一关的模式)，可以手动调整关卡
   */
  renderSelectStage(couldSelectStage: boolean) {
    new SelectStage(couldSelectStage)

    screenView.type = 'selectStage'
  }
}
