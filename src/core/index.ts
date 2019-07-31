/**
 * 游戏核心控制器
 */
import {
  SelectMode,
  StageView,
  RenderMap,
} from 'src/renderGame'

export type ScreenViewType = 'selectMode' | 'stageView' | 'playing' | 'summary'

class Core {
  /**
   * 当前关卡
   */
  private stage: number = 1
  /**
   * 当前屏幕的渲染模式
   * 1、selectMode 选择游戏模式
   * 2、stageView 展示第几关
   * 3、playing 游戏中
   * 4、summary 游戏结束的结算界面
   */
  private screenViewType: ScreenViewType
  /**
   * todo 当出现game over字幕的时候，按下暂停按键需要处理
   */
  private isStop: boolean = false

  getIsStop() {
    return this.isStop
  }

  setIsStop(isStop: boolean) {
    this.isStop = isStop
  }

  getStage() {
    return this.stage
  }

  setStage(stage: number) {
    this.stage = stage
  }

  getScreenViewType() {
    return this.screenViewType
  }

  /**
   * 渲染选择模式的界面
   */
  renderScreen(type: 'selectMode' | 'playing' | 'summary')
  /**
   * 进入关卡界面
   * @param type
   * @param couldChangeState 是否可以选择关卡，在游戏一开始初始进入第一关的时候(非自定义第一关的模式)，可以手动调整关卡
   */
  renderScreen(type: 'stageView', couldChangeState: boolean)
  renderScreen(type: ScreenViewType, payload?: boolean) {
    this.screenViewType = type

    switch (type) {
      case 'selectMode':
        new SelectMode()
        break
      case 'stageView':
        new StageView(payload!)
        break
      case 'playing':
        break
      case 'summary':
        break
      default: break
    }
  }

  /**
   * 渲染地图
   */
  renderMap() {
    new RenderMap(this.stage)
  }
}

export const core = new Core()
