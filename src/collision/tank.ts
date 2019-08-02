/**
 * 每次渲染完成之后，记录下来所有坦克的下一个可能的位置坐标，然后在下一次渲染之前，对这些坐标进行碰撞检测，通过后该坐标才会成为下一个位置的坐标
 * 对于坦克的坐标，有如下可能：
 * 1、碰撞检测通过
 * 2、碰到了障碍物无法通过
 * 3、碰到了冰，需要直接滑行
 * 4、碰到了奖励
 * 5、todo 疯狂模式坦克碰到坦克就死？  坦克
 */

// 坦克进行碰撞检查需要的信息
export type TankCollisionInfo = {
  id: string,
  type: 'player' | 'npc',
  x: number,
  y: number,
}

export enum tankCollisionStatus {
  pass,
  notPass,
  ice,
  bonus,
  tank,
}
