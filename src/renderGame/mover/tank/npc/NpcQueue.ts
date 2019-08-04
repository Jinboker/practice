/**
 * npc的渲染队列
 */
import { npcMap } from 'src/config'
import { delayLoop } from 'src/utils'
import { core } from 'src/core'
import { NPC } from './NPC'
import { Renderer } from 'src/renderGame/Renderer'

export class NpcQueue extends Renderer {
  /**
   * 当前正在活动的npc的数量
   */
  static aliveNpcNum: number = 0
  private bornDelay = delayLoop(30)

  constructor() {
    super()
  }

  bornNpc(hasBornNpcNum: number, curNpcMap: number[]) {
    console.log(hasBornNpcNum, NpcQueue.aliveNpcNum, 'm')
    const x = (hasBornNpcNum % 3) * 192

    new NPC(x, 0, 1, curNpcMap[hasBornNpcNum])

    NpcQueue.aliveNpcNum++
    core.hasBornNpcNum++
  }

  canDestroy() {
    const screenType = Renderer.getScreenType()

    return screenType !== 'playing'
  }

  render() {
    const hasBornNpcNum = core.hasBornNpcNum
    const curNpcMap = npcMap[core.getStage() - 1]

    // 当前存在的坦克数目小于三个且已经出生过的坦克总数小于当前关卡npc的总数
    if (NpcQueue.aliveNpcNum < 3 && hasBornNpcNum <= curNpcMap.length) {
      this.bornDelay(() => {
        this.bornNpc(hasBornNpcNum, curNpcMap)
      })
    }
  }
}
