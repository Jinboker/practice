import { Tank } from '../Tank'
import { tankCollision } from 'src/collision'
import { delayLoop } from 'src/utils'
import { ctx, DIRECTION, imgs, SCREEN, Direction } from 'src/global'
import { TankCollisionResult } from 'src/collision/tank'
import { MoverInfo } from '../../Mover'

const { enemy } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export class NPC extends Tank {
  /**
   * npc切换方向是随机的，有可能切换以后的方向还是无法通过碰撞检测，但此时因为检测未通过，不会将新的方向
   * 设置过去，在游戏界面上看起来就是坦克碰撞后可能会花费更多的时间才能找到下一个可以通过的位置，因此这里
   * 将已经测试过的位置进行一个记录，当有记录的时候，切换方向的函数执行就不进行延时
   */
  private hasChangedDirection: Direction[] = []
  private changeDirectionDelay = delayLoop(30)

  protected nextPosition: Omit<MoverInfo, 'speed'>

  constructor(
    protected info: MoverInfo,
    private npcType: number
  ) {
    super('npc')

    this.nextPosition = info
  }

  renderTank(): void {
    const info = this.info
    const roleCtx = ctx.role!

    roleCtx.drawImage(
      enemy,
      this.npcType * 32,
      DIRECTION[this.info.direction] * 64 + this.wheel.picFlag * 32,
      32,
      32,
      info.x + xOffset,
      info.y + yOffset,
      32,
      32
    )
  }

  canDestroy() {
    // 确定需要销毁npc的时候，需要NpcQueue.currentNpcNum - 1
    return false
  }

  setHasChangedDirection(direction: Direction) {
    if (!this.hasChangedDirection.includes(direction)) {
      this.hasChangedDirection.push(direction);
    }
  }

  testNextPositionAfterChangeDirection() {
    let direction

    // 所有的方向都测试过了，都无法通过，那么直接写死成当前方向的反方向，毕竟反方向是确定可以通过的，目前只是可能是被其他坦克堵住路了
    if (this.hasChangedDirection.length === 3) {
      const directionNum = DIRECTION[this.info.direction]
      const reverseDirectionNum = directionNum % 2 ? (+!directionNum) * 2 : (+!(directionNum - 1)) * 2 + 1

      direction = DIRECTION[reverseDirectionNum]
    } else {
      do {
        direction = DIRECTION[Math.floor(Math.random() * 4)]
        // 如果随机出来的方向跟当前方向一致或者已经确定无法通过，那么继续随机
      } while (direction === this.info.direction || this.hasChangedDirection.includes(direction))
    }

    this.setHasChangedDirection(direction)

    const [x, y] = this.getNextPosition(direction)

    this.nextPosition = { x, y, direction }
  }

  handleCollisionResult(collisionResult: TankCollisionResult | undefined) {
    if (!collisionResult) {
      return
    }

    const { result } = collisionResult

    // 允许通过
    if (result === 'pass') {
      ['x', 'y', 'direction'].forEach(key => {
        this.info[key] = collisionResult[key]
      })

      const direction = this.info.direction
      const [x, y] = this.getNextPosition(direction)

      this.nextPosition = { x, y, direction }
      this.hasChangedDirection = []

      return
    }

    if (result === 'tank' || result === 'noPass') {
      // 如果是第一次开始改变方向，那么需要进行30次的延时
      // 如果this.hasChangedDirection.length > 0，那么证明已经测试过一个方向无法通过了，因此不进行延时继续获取下一个方向
      if (!this.hasChangedDirection.length) {
        this.changeDirectionDelay(
          this.testNextPositionAfterChangeDirection.bind(this)
        )
      } else {
        this.testNextPositionAfterChangeDirection()
      }
    }
  }

  render() {
    if (this.bornAnimation.loopNum) {
      this.renderBornAnimation()
    } else {
      const collisionResult = tankCollision.getCollisionResult(this.id!)

      this.handleCollisionResult(collisionResult)

      this.changeWheel()
      this.renderShield()
      this.renderTank()
    }
  }
}
