/**
 * 每次渲染完成之后，记录下来所有坦克的下一个可能的位置坐标，然后在下一次渲染之前，对这些坐标进行碰撞检测，通过后该坐标才会成为下一个位置的坐标
 * 对于坦克的坐标，有如下可能：
 * 1、碰撞检测通过
 * 2、碰到了障碍物无法通过
 * 3、碰到了冰，需要直接滑行
 * 4、碰到了奖励
 * 5、todo 疯狂模式坦克碰到坦克就死？  坦克
 */
import { DIRECTION, Direction } from '../global'
import { touchBorder } from './utils'

// 坦克进行碰撞检查需要的信息
export type TankCollisionInfo = {
  id: string,
  type: 'player' | 'npc',
  direction: Direction,
  x: number,
  y: number,
  // 到原点的距离
  distanceToOrigin?: number,
}

type Result = keyof typeof tankCollisionStatus
export type TankCollisionResult = TankCollisionInfo & {
  result: Result
}

export enum tankCollisionStatus {
  pass,
  noPass,
  ice,
  bonus,
  tank,
  // 碰撞结果为npc只给玩家使用，在困难模式下，玩家只要检查与npc碰撞，那么玩家死亡
  npc,
}

class TankCollision {
  private collisionInfos: Record<string, TankCollisionInfo> = {}
  private collisionResult: Record<string, TankCollisionResult> = {}

  static detectTankOverlap(curInfo: TankCollisionInfo, nextInfo: TankCollisionInfo) {
    const xDifference = Math.abs(curInfo.x - nextInfo.x)
    const yDifference = Math.abs(curInfo.y - nextInfo.y)

    if (DIRECTION[curInfo.direction] % 2) {
      return xDifference < 32 && xDifference > 26 && yDifference < 32
    } else {
      return yDifference < 32 && yDifference > 26 && xDifference < 32
    }
  }

  setCollisionInfo(info: TankCollisionInfo) {
    this.collisionInfos[info.id] = info
  }

  setCollisionResult(id: string, result: Result) {
    if (this.collisionResult[id]) {
      this.collisionResult[id].result = result
    } else {
      this.collisionResult[id] = {
        ...this.collisionInfos[id], result
      }
    }
  }

  /**
   * 每次渲染总线中的渲染函数跑完以后，开始对下一次的坐标进行碰撞检查，对于坦克的碰撞主要检测下面几种：
   * 1、是否碰到边界
   * 2、是否碰到其他坦克
   * 3、是否碰到了奖励
   * 4、是否碰到了地图上的障碍物
   *
   * 只有当上面的检查全部通过以后，坦克才能运动到下一个坐标
   */
  checkCollision() {
    this.collisionResult = {}

    const collisionInfos = Object.values(this.collisionInfos)

    collisionInfos.forEach((info, index) => {
      const { direction, x, y, id } = info

      // 检查是否碰到了边界
      if (touchBorder(x, y, 32, direction)) {
        this.setCollisionResult(id, 'noPass')
        return
      }

      // 检查是否有坦克碰撞
      if (
        collisionInfos.some(item => {
          if (item.id === id) {
            return false
          }

          return TankCollision.detectTankOverlap(info, item)
        })
      ) {
        this.setCollisionResult(id, 'tank')
        return
      }

      // 检查是否碰到了奖励

      this.setCollisionResult(id, 'pass')
    })

    this.collisionInfos = {}
  }

  getCollisionResult(id: string) {
    return this.collisionResult[id]
  }
}

export const tankCollision = new TankCollision()
