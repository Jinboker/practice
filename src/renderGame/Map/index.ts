/**
 * 渲染地图，
 */
import { stageMap } from 'src/config'
import { Renderer } from '../Renderer'
import { ctx, imgs, screen } from 'src/global'

const bgCtx = ctx.bg!
const { brick } = imgs
const { yOffset, xOffset } = screen.gameView

export class RenderMap extends Renderer {
  /**
   * 配置好的map只能表明一个 16 * 16的格子
   * 不过在游戏中，比如一个砖块，当玩家的子弹是最低级的时候，一次最多只能清空一个 8 * 16 区域，且比如草丛，除了视图上以外没有任何区别
   * 因此，地图数据无法直接用于判断坦克或者子弹能否通过，需要进行二次解析生成对应的roadMap
   *
   * ??? 为什么是 28 * 28 的格子来着？忘了
   */
  private roadMap = new Array(28).fill(0).map(() => new Array(28).fill(0))

  /**
   * 根据坐标擦除地图
   */
  static clearMap() {
    //
  }

  constructor(
    private stage: number
  ) {
    super()

    this.initialMap()
  }

  /**
   * 渲染初始化地图，地图后面大部分只会被擦掉，因此不用进行重复渲染
   */
  initialMap() {
    const mapConfig = stageMap[this.stage]

    new Array(13).fill(null).forEach((_, row) => {
      new Array(13).fill(null).forEach((__, col) => {
        const mapItemType = mapConfig[row][col]

        /**
         * 渲染地图，顺便将地图数据进行解析，获取对应格子的坦克和子弹的路径地图
         */
        if (mapItemType) {
          bgCtx.drawImage(brick, 32 * mapItemType, 0, 32, 32, xOffset + 32 * col, yOffset + 32 * row, 32, 32)

          console.log(this.roadMap)
        }
      })
    })
  }

  /**
   * 渲染河流
   */
  renderRiver() {
    //
  }

  render(): void {
    const screenType = Renderer.getScreenType()

    if (screenType !== 'stageView' && screenType !== 'playing') {
      this.destroy()
    }
  }
}
