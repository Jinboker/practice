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

export type TankCollisionResult = TankCollisionInfo & {
  result: keyof typeof tankCollisionStatus
}

export enum tankCollisionStatus {
  pass,
  noPass,
  ice,
  bonus,
  npc,
  player
}

class TankCollision {
  private collisionInfos: TankCollisionInfo[] = []
  private collisionResult: Record<string, TankCollisionResult> = {}

  static checkDifferenceBetweenTank(curInfo: TankCollisionInfo, nextInfo: TankCollisionInfo) {
    const xDifference = Math.abs(curInfo.x - nextInfo.x)
    const yDifference = Math.abs(curInfo.y - nextInfo.y)

    if (DIRECTION[curInfo.direction] % 2) {
      // return xDifference < 32 && xDifference > 26 && yDifference < 32
      return xDifference < 32 && yDifference < 32
    } else {
      // return yDifference < 32 && yDifference > 26 && xDifference < 32
      return yDifference < 32 && xDifference < 32
    }
  }

  setCollisionInfo(info: TankCollisionInfo) {
    this.collisionInfos.push(info)
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

    /**
     * 错误定位，x和y可能为负数
     */
    // 将加入的数据按照x y之和的大小进行排序，这样在检查坦克碰撞的时候，如果两个坦克之间的距离已经过大以后，后面的就不用继续检查了
    const collisionInfos = this.collisionInfos.sort((cur, prev) => cur.x + cur.y <= prev.x + prev.y ? 0 : 1)

    collisionInfos.forEach((info, index) => {
      const { direction, x, y, id } = info

      /**
       * 检查是否碰到了其他坦克(这个检查的优先级最高)
       *
       * 检查从当前坦克起后面所有距离在碰撞范围内的坦克
       */
      // for (let i = index + 1; i < collisionInfos.length; i++) {
      //   const nextInfo = collisionInfos[i]
      //
      //   // 如果没有下一个坦克去检查了，break掉
      //   if (!nextInfo) {
      //     break
      //   }
      //
      //   // 如果距离过长，后面的也不用继续检查了
      //   if (Math.abs(x - nextInfo.x) + Math.abs(y - nextInfo.y) >= 64) {
      //     break
      //   }
      //
      //   if (TankCollision.checkDifferenceBetweenTank(collisionInfos[index], nextInfo)) {
      //     /**
      //      * player记录的肯定是碰到npc的记录，但npc要优先记录碰到player的记录
      //      */
      //     const resultType = [type, nextInfo.type].includes('player') ? 'player' : 'npc'
      //
      //     ;
      //     [index, i].forEach(item => {
      //       const collisionInfo = collisionInfos[item]
      //       const _id = collisionInfo.id
      //
      //       if (this.collisionResult[_id]) {
      //         if (collisionInfo.type === 'npc' && resultType === 'player') {
      //           this.collisionResult[_id].result = 'player'
      //         }
      //       } else {
      //         this.collisionResult[_id] = { ...collisionInfo, result: resultType }
      //       }
      //     })
      //   }
      // }
      //
      // // 含有坦克碰撞结果
      // if (this.collisionResult[id]) {
      //   return
      // }
      // 检查是否碰到了其他坦克

      // 检查是否碰到了边界
      if (touchBorder(x, y, 32, direction)) {
        this.collisionResult[id] = { ...info, result: 'noPass' }
        return
      }

      // 检查是否碰到了奖励
      this.collisionResult[id] = { ...info, result: 'pass' }
    })

    this.collisionInfos = []
  }

  getCollisionResult(id: string) {
    return this.collisionResult[id]
  }
}

export const tankCollision = new TankCollision()
