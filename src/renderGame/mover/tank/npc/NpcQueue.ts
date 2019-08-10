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

  canDestroy() {
    const screenType = Renderer.getScreenType()

    return screenType !== 'playing'
  }

  render() {
    const curNpcMap = npcMap[core.getStage() - 1]
    const hasBornNpcNum = core.hasBornNpcNum

    // 当前存在的坦克数目小于三个且已经出生过的坦克总数小于当前关卡npc的总数
    if (NpcQueue.aliveNpcNum < 8 && hasBornNpcNum <= curNpcMap.length) {
    // if (NpcQueue.aliveNpcNum === 0 && hasBornNpcNum <= curNpcMap.length) {
      this.bornDelay(() => {
        const x = (hasBornNpcNum % 3) * 192

        new NPC(x, 0, 4, curNpcMap[hasBornNpcNum])

        NpcQueue.aliveNpcNum++
        core.hasBornNpcNum++

        // 第一个npc默认是延时30个循环后出生，后面所有的npc都是延时150个循环后出生
        if (hasBornNpcNum === 1) {
          this.bornDelay = delayLoop(150)
        }
      })
    }
  }
}
