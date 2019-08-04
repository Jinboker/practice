/**
 * npc的渲染队列
 */
import { npcMap } from 'src/config'
import { delayLoop } from 'src/utils'
import { core } from 'src/core'
import { NPC } from './NPC'
import { Renderer } from 'src/renderGame/Renderer'

const getCurNpcMap = () => {
  return npcMap[core.getStage() - 1]
}

export class NpcQueue extends Renderer {
  /**
   * 当前正在活动的npc的数量
   */
  static aliveNpcNum: number = 0
  private bornDelay = delayLoop(30)

  constructor() {
    super()
  }

  bornNpc() {
    const curNpcMap = getCurNpcMap()
    const x = (core.hasBornNpcNum % 3) * 192

    new NPC(x, 0, 1, curNpcMap[core.hasBornNpcNum])

    NpcQueue.aliveNpcNum++
    core.hasBornNpcNum++
  }

  canDestroy() {
    const screenType = Renderer.getScreenType()

    return screenType !== 'playing'
  }

  render() {
    const curNpcMap = getCurNpcMap()

    // 当前存在的坦克数目小于三个且已经出生过的坦克总数小于当前关卡npc的总数
    if (NpcQueue.aliveNpcNum < 3 && core.hasBornNpcNum <= curNpcMap.length) {
      this.bornDelay(() => {
        this.bornNpc()

        // 第一个npc默认是延时30个循环后出生，后面所有的npc都是延时150个循环后出生
        if (core.hasBornNpcNum === 1) {
          this.bornDelay = delayLoop(150)
        }
      })
    }
  }
}
