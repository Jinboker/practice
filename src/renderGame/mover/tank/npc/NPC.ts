import { Tank } from '../Tank'
import { tankCollision } from 'src/collision'
import { delayLoop } from 'src/utils'
import { ctx, DIRECTION, imgs, SCREEN } from 'src/global'
import { TankCollisionResult } from 'src/collision/tank'
import { MoverInfo } from '../../Mover'

const { enemy } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export class NPC extends Tank {
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

  testNextPositionAfterChangeDirection() {
    let direction

    do {
      direction = DIRECTION[Math.floor(Math.random() * 4)]
    } while (direction === this.info.direction)

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

      return
    }

    if (result === 'tank' || result === 'noPass') {
      this.changeDirectionDelay(
        this.testNextPositionAfterChangeDirection.bind(this)
      )
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
