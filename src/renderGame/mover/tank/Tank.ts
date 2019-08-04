import { Mover } from '../Mover'
import { ctx, imgs, SCREEN, DIRECTION } from 'src/global'
import { delayLoop } from 'src/utils'

const { bonus, misc } = imgs
const { xOffset, yOffset } = SCREEN.gameView
export const initialBornAnimation = {
  picFlag: 4,
  loopNum: 4,
  delay: delayLoop(4)
}

export abstract class Tank extends Mover {
  // 防护罩相关
  private shield = {
    // 当坦克为玩家的时候，一出生就拥有200个循环的护盾
    duration: this.tankType === 'player' ? 200 : 0,
    picPosition: 0,
    delay: delayLoop(4)
  }
  // 出生动画相关
  protected bornAnimation = initialBornAnimation
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

  protected abstract renderAfterBorn(): void

  /**
   * 获取坦克转换方向后的位置
   * 注：坦克转换方向后需要对位置手动进行调整，防止因为位置不准导致无法通过通道之类的问题
   */
  protected getNextPositionAfterChangeDirection() {
    let { x, y } = this

    // 此处必须使用math.round进行四舍五入才能避免坦克转弯时候位置变动过大
    return DIRECTION[this.direction] % 2
      ? [Math.round(x / 16) << 4, y]
      : [x, Math.round(y / 16) << 4]
  }

  /**
   * 渲染坦克的出生动画
   */
  protected renderBornAnimation() {
    const roleCtx = ctx.role!
    const bornAnimation = this.bornAnimation
    const { picFlag, delay } = bornAnimation

    roleCtx.drawImage(bonus, picFlag << 5, 64, 32, 32, this.x + xOffset, this.y + yOffset, 32, 32)

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
  protected renderShield() {
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

  protected changeWheel() {
    const wheel = this.wheel

    wheel.delay(() => {
      wheel.picFlag = +!wheel.picFlag
    })
  }

  render() {
    if (this.bornAnimation.loopNum) {
      this.renderBornAnimation()
    } else {
      this.renderAfterBorn()
    }
  }
}
