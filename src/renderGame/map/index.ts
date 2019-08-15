/**
 * 渲染地图，
 */
import { stageMap } from 'src/config'
import { Renderer } from '../Renderer'
import { delayLoop } from 'src/utils'
import { ctx, imgs, SCREEN } from 'src/global'
import { core } from 'src/core'
import { roadMapItemMapper } from './roadMapItemMapper'

const { brick } = imgs
const { yOffset, xOffset } = SCREEN.gameView

type RiverAreaList = Array<{
  row: number;
  col: number;
}>

const arrayFactory = (num: number, fill: any = 0) => {
  return new Array(num).fill(fill)
}
const arr13 = arrayFactory(13, null)

export class RenderMap extends Renderer {
  /**
   * 配置好的map只能表明一个 16 * 16的格子
   * 不过在游戏中，比如一个砖块，当玩家的子弹是最低级的时候，一次最多只能清空一个 8 * 16 区域，且比如草丛，除了视图上以外没有任何区别
   * 因此，地图数据无法直接用于判断坦克或者子弹能否通过，需要进行二次解析生成对应的roadMap
   */
  private roadMap = arrayFactory(26).map(() => arrayFactory(26))
  /**
   * 当前河流的地图坐标，河流需要在固定的循环后改变图片
   */
  private riverAreaList: RiverAreaList = []
  private changeRiverDelay = delayLoop(40)
  private riverImgFlag: number = 0

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
    const bgCtx = ctx.bg!
    const mapConfig = stageMap[this.stage - 1]

    arr13.forEach((_, row) => {
      arr13.forEach((__, col) => {
        const mapItemType = mapConfig[row][col]

        let type
        /**
         * 如果mapItemType为13或者14，表明是河流，那么全部处理成13位置的图，保持显示效果一致
         * 还需要将这个位置推入河流的坐标list，在固定次数的循环后将13 和 14 位置的图进行对调更换
         */
        if (mapItemType === 13 || mapItemType === 14) {
          type = 13

          this.riverAreaList.push({ row, col })
        } else {
          type = mapItemType
        }

        /**
         * 渲染地图，顺便将地图数据进行解析，获取对应格子的坦克和子弹的路径地图
         */
        if (mapItemType) {
          bgCtx.drawImage(brick, 32 * type, 0, 32, 32, xOffset + 32 * col, yOffset + 32 * row, 32, 32)

          arr13.slice(0, 4).forEach((___, index) => {
            this.roadMap[2 * row + (+(index > 1))][2 * col + index % 2] = roadMapItemMapper[mapItemType][index]
          })
        }
      })
    })

    console.log(this.roadMap)
  }

  /**
   * 渲染河流
   */
  renderRiver() {
    const riverAreaList = this.riverAreaList

    if (!riverAreaList.length) {
      return
    }

    const bgCtx = ctx.bg!

    this.changeRiverDelay(() => {
      riverAreaList.forEach(item => {
        const { row, col } = item

        bgCtx.drawImage(
          brick, 32 * (13 + this.riverImgFlag), 0, 32, 32, xOffset + 32 * col, yOffset + 32 * row, 32, 32
        )
      })

      this.riverImgFlag = +!this.riverImgFlag
    })
  }

  canDestroy() {
    return core.getScreenViewType() !== 'playing'
  }

  render(): void {
    this.renderRiver()

    const screenType = Renderer.getScreenType()

    if (screenType !== 'stageView' && screenType !== 'playing') {
      this.destroy()
    }
  }
}
