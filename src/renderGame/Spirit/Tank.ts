import { Mover } from './Mover'
import { ctx, imgs, SCREEN } from 'src/global'
import { delayLoop } from 'src/utils'

const { bonus, misc } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export abstract class Tank extends Mover {
  // 出生动画相关
  private bornAnimation = {
    picFlag: 4,
    loopNum: 4,
    delay: delayLoop(4)
  }
  // 防护罩相关
  private shield = {
    // 当坦克为玩家的时候，一出生就拥有200个循环的护盾
    duration: this.tankType === 'player' ? 200 : 0,
    picPosition: 0,
    delay: delayLoop(4)
  }
  // 轮胎变化相关
  protected wheel = {
    picFlag: 0,
    delay: delayLoop(5)
  }

  protected constructor(
    protected tankType: 'player' | 'npc'
  ) {
    super()
  }

  /**
   * 渲染坦克的出生动画
   */
  private renderBornAnimation() {
    const otherCtx = ctx.other!
    const bornAnimation = this.bornAnimation
    const { picFlag, delay } = bornAnimation

    otherCtx.drawImage(bonus, picFlag << 5, 64, 32, 32, this.x + xOffset, this.y + yOffset, 32, 32)

    delay(() => {
      if (picFlag > 0) {
        bornAnimation.picFlag -= 1
      } else {
        bornAnimation.picFlag = 4
        bornAnimation.loopNum -= 1
      }
    })
  }

  /**
   * 渲染防护罩
   */
  private renderShield() {
    const shield = this.shield
    const { duration, delay, picPosition } = shield

    if (!duration) {
      return
    }

    shield.duration -= 1

    const otherCtx = ctx.other!

    otherCtx.drawImage(misc, 32 + picPosition, 0, 32, 32, this.x + xOffset, this.y + yOffset, 32, 32)

    delay(() => {
      shield.picPosition = (+!picPosition) << 5
    })
  }

  /**
   * 渲染坦克
   */
  protected abstract renderTank(): void

  render(): void {
    if (this.bornAnimation.loopNum) {
      this.renderBornAnimation()
    } else {
      const wheel = this.wheel
      
      this.renderTank()
      this.renderShield()

      wheel.delay(() => {
        wheel.picFlag = +!wheel.picFlag
      })
    }

    if (this.checkForDestroy()) {
      this.destroy()
    }
  }
}
