import { Tank } from './Tank'
import { core } from 'src/core'
import { ctx, DIRECTION, SCREEN } from 'src/global'
import { imgs } from 'src/global'

const { player } = imgs
const { xOffset, yOffset } = SCREEN.gameView

export class Player extends Tank {
  private rank: number = 0
  protected speed: number = 2
  protected operate = {
    B: this.handleFireOperate
  }

  constructor(
    protected x: number,
    protected y: number,
    protected direction: DIRECTION
  ) {
    super('player')
  }

  /**
   * 处理开火的操作
   */
  handleFireOperate() {
    if (core.getIsStop()) {
      return
    }

    return true
  }

  protected checkForDestroy() {
    return false
  }

  protected renderTank(): void {
    const roleCtx = ctx.role!

    roleCtx.drawImage(
      player,
      this.rank * 32,
      // @ts-ignore
      DIRECTION[this.direction] * 64 + this.wheel.picFlag * 32,
      32,
      32,
      this.x + xOffset,
      this.y + yOffset,
      32,
      32
    )
  }
}
