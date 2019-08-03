import { Tank } from './Tank'
import { core } from 'src/core'
import { ctx, Direction, SCREEN, DIRECTION } from 'src/global'
import { imgs } from 'src/global'
import { tankCollision } from 'src/collision'

const { player } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export class Player extends Tank {
  protected x: number
  protected y: number
  protected direction: Direction = 'up'
  private rank: number = 0
  protected speed: number = 2
  protected operate = {
    B: this.handleFireOperate,
    up: this.moveOperate('up'),
    down: this.moveOperate('down'),
    right: this.moveOperate('right'),
    left: this.moveOperate('left')
  }

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

      // 写入碰撞信息
      const [x, y] = direction !== this.direction
        ? this.getNextPositionAfterChangeDirection()
        : this.getNextPositionByCurrentDirection()

      tankCollision.setCollisionInfo({
        x, y, direction, id: this.id, type: 'player'
      })

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
    if (core.getIsStop()) {
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

  protected move(): boolean {
    return false
  }
}
