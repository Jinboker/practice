import { Tank } from './Tank'
import { core } from 'src/core'
import { tankCollision } from 'src/collision'
import { ctx, Direction, SCREEN, DIRECTION, imgs } from 'src/global'
import { MoverInfo } from '../Mover'

const { player } = imgs
const { xOffset, yOffset } = SCREEN.gameView

const defaultInfo = {
  x: 128,
  y: 384,
  direction: 'up' as 'up',
  speed: 2
}

export class Player extends Tank {
  protected info: MoverInfo
  protected nextPosition: Omit<MoverInfo, 'speed'>

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

    this.info = defaultInfo
    this.nextPosition = defaultInfo
  }

  moveOperate(direction: Direction) {
    return () => {
      if (this.checkIsAborning()) {
        return true
      }

      // 玩家在运动的时候改变轮胎
      this.changeWheel()

      const [x, y] = this.getNextPosition(direction)

      this.nextPosition = { x, y, direction }

      return true
    }
  }

  // 判断坦克是否是正在走出生的动画中
  checkIsAborning() {
    return Boolean(this.bornAnimation.loopNum)
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
    const info = this.info
    const roleCtx = ctx.role!

    roleCtx.drawImage(
      player,
      this.rank * 32,
      DIRECTION[info.direction] * 64 + this.wheel.picFlag * 32,
      32,
      32,
      info.x + xOffset,
      info.y + yOffset,
      32,
      32
    )
  }

  render() {
    if (this.bornAnimation.loopNum) {
      this.renderBornAnimation()
    } else {
      // 每次渲染之前，先去拿上一次循环的设置的碰撞检测的结果
      const collisionResult = tankCollision.getCollisionResult(this.id!)

      if (collisionResult && collisionResult.result === 'pass') {
        ['x', 'y', 'direction'].forEach(key => {
          this.info[key] = collisionResult[key]
        })
      }

      this.renderShield()
      this.renderTank()
    }
  }
}
