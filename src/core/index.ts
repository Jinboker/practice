import { RenderMap } from 'src/renderGame/map'
import { Playing, SelectMode, StageView } from '../renderGame'

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
   * 已经出生过的npc的个数
   */
  public hasBornNpcNum: number = 0
  /**
   * todo 当出现game over字幕的时候，按下暂停按键需要处理
   */
  public isStop: boolean = false

  getStage() {
    return this.stage
  }

  setStage(stageNum: number) {
    this.stage = stageNum

    // 每次重置stage的时候跟着重置一些参数
    this.hasBornNpcNum = 0
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
        new Playing()
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
