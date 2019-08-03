/**
 * 每次渲染完成之后，记录下来所有坦克的下一个可能的位置坐标，然后在下一次渲染之前，对这些坐标进行碰撞检测，通过后该坐标才会成为下一个位置的坐标
 * 对于坦克的坐标，有如下可能：
 * 1、碰撞检测通过
 * 2、碰到了障碍物无法通过
 * 3、碰到了冰，需要直接滑行
 * 4、碰到了奖励
 * 5、todo 疯狂模式坦克碰到坦克就死？  坦克
 */
import { getArrItemById } from 'src/utils'
import { Direction } from '../global'
import { touchBorder } from './utils'

// 坦克进行碰撞检查需要的信息
export type TankCollisionInfo = {
  id: string,
  type: 'player' | 'npc',
  direction: Direction,
  x: number,
  y: number
}

export type TankCollisionResult = TankCollisionInfo & {
  result: keyof typeof tankCollisionStatus
}

export enum tankCollisionStatus {
  pass,
  doNotPass,
  ice,
  bonus,
  tank,
}

type CheckMethod = (info: TankCollisionInfo) => keyof typeof tankCollisionStatus

interface TankCollisionInterface {
  checkTouchBorder: CheckMethod,
  checkTouchOtherTank: CheckMethod,
  checkTouchBonus: CheckMethod,
  checkTouchBarrierInMap: CheckMethod
}

class TankCollision implements TankCollisionInterface {
  private collisionInfos: TankCollisionInfo[] = []
  private collisionResult: TankCollisionResult[] = []

  private checkMethod = {
    checkTouchBorder: this.checkTouchBorder,
    checkTouchOtherTank: this.checkTouchOtherTank,
    checkTouchBonus: this.checkTouchBonus,
    checkTouchBarrierInMap: this.checkTouchBarrierInMap
  }

  setCollisionInfo(info: TankCollisionInfo) {
    this.collisionInfos.push(info)
  }

  // 检查是否碰到了边界
  checkTouchBorder(info: TankCollisionInfo) {
    const { direction, x, y } = info

    if (touchBorder(x, y, 32, direction)) {
      return 'doNotPass' as 'doNotPass'
    }

    return 'pass' as 'pass'
  }

  // 检查是否碰到了其他坦克
  checkTouchOtherTank(info: TankCollisionInfo) {
    return 'pass' as 'pass'
  }

  // 检查是否碰到了奖励
  checkTouchBonus(info: TankCollisionInfo) {
    return 'pass' as 'pass'
  }

  // 检查是否碰到了地图上的障碍物
  checkTouchBarrierInMap(info: TankCollisionInfo) {
    return 'pass' as 'pass'
  }

  /**
   * 开始进行碰撞检测，对于坦克的碰撞主要检测下面几种：
   * 1、是否碰到边界
   * 2、是否碰到其他坦克
   * 3、是否碰到了奖励
   * 4、是否碰到了地图上的障碍物
   *
   * 只有当上面的检查全部通过以后，坦克才能运动到下一个坐标
   */
  checkCollision() {
    this.collisionResult = []

    this.collisionInfos.forEach((item, index) => {
      Object.values(this.checkMethod).every(checkMethod => {
        const result: ReturnType<CheckMethod> = checkMethod.call(this, item)
        const canPass = result === 'pass'

        if (!canPass) {
          this.collisionResult.push({ ...item, result })
        }

        return canPass
      })
    })

    this.collisionInfos = []
  }

  getCollisionResult(id: string) {
    return getArrItemById<TankCollisionResult>(this.collisionResult, id)
  }
}

export const tankCollision = new TankCollision()
