import { Tank } from './Tank'
import { core } from 'src/core'
import { tankCollision } from 'src/collision'
import { ctx, Direction, SCREEN, DIRECTION, imgs } from 'src/global'

const { player } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export class Player extends Tank {
  protected x: number
  protected y: number
  protected speed: number = 2
  protected direction: Direction = 'up'
  protected operate = {
    B: this.handleFireOperate,
    up: this.moveOperate('up'),
    down: this.moveOperate('down'),
    right: this.moveOperate('right'),
    left: this.moveOperate('left')
  }

  private rank: number = 0

  constructor() {
    super('player')

    this.setInitial()
  }

  moveOperate(direction: Direction) {
    return () => {
      if (this.checkIsAborning()) {
        return true
      }

      // 玩家在运动的时候改变轮胎
      this.changeWheel()

      this.setNextCollisionPosition(
        direction,
        'player',
        this.direction === direction
      )

      return true
    }
  }

  // 判断坦克是否是正在走出生的动画中
  checkIsAborning() {
    return Boolean(this.bornAnimation.loopNum)
  }

  setInitial() {
    this.x = 128
    this.y = 384
    this.rank = 0
    this.direction = 'up'
  }

  /**
   * 处理开火的操作
   */
  handleFireOperate() {
    if (core.isStop) {
      return true
    }

    return true
  }

  canDestroy() {
    // todo 玩家只有在生命到底后才会去销毁渲染器
    return false
  }

  renderTank(): void {
    const roleCtx = ctx.role!

    roleCtx.drawImage(
      player,
      this.rank * 32,
      DIRECTION[this.direction] * 64 + this.wheel.picFlag * 32,
      32,
      32,
      this.x + xOffset,
      this.y + yOffset,
      32,
      32
    )
  }

  protected renderAfterBorn() {
    // 每次渲染之前，先去拿碰撞检测结果
    const collisionResult = tankCollision.getCollisionResult(this.id!)

    if (collisionResult && collisionResult.result === 'pass') {
      ['x', 'y', 'direction'].forEach(key => {
        this[key] = collisionResult[key]
      })
    }

    this.renderShield()
    this.renderTank()
  }
}
