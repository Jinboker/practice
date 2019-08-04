import { Tank } from '../Tank'
import { tankCollision } from 'src/collision'
import { ctx, DIRECTION, Direction, imgs, SCREEN } from 'src/global'

const { enemy } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export class NPC extends Tank {
  protected direction: Direction = 'down'

  constructor(
    protected x: number,
    protected y: number,
    protected speed: number,
    private npcType: number
  ) {
    super('npc')
  }

  renderTank(): void {
    const roleCtx = ctx.role!

    roleCtx.drawImage(
      enemy,
      this.npcType * 32,
      DIRECTION[this.direction] * 64 + this.wheel.picFlag * 32,
      32,
      32,
      this.x + xOffset,
      this.y + yOffset,
      32,
      32
    )
  }

  protected setNextCollisionPosition(direction: Direction) {
    // 写入碰撞信息
    const [x, y] = this.getNextPositionByCurrentDirection()

    tankCollision.setCollisionInfo({
      x, y, direction, id: this.id, type: 'npc'
    })
  }

  canDestroy() {
    // 确定需要销毁npc的时候，需要NpcQueue.currentNpcNum - 1
    return false
  }

  renderAfterBorn() {
    // 每次渲染之前，先去拿碰撞检测结果
    const collisionResult = tankCollision.getCollisionResult(this.id!)

    if (collisionResult && collisionResult.result === 'pass') {
      ['x', 'y', 'direction'].forEach(key => {
        this[key] = collisionResult[key]
      })
    }

    this.changeWheel()
    this.renderShield()
    this.renderTank()

    this.setNextCollisionPosition(this.direction)
  }
}
