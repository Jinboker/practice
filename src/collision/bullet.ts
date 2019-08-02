/**
 * 每次渲染完成之后，记录下来所有子弹的下一个可能的位置坐标，然后在下一次渲染之前，对这些坐标进行碰撞检测，通过后该坐标才会成为下一个位置的坐标
 * 对于子弹坐标的碰撞检查，有如下可能：
 * 1、碰撞检测通过
 * 2、碰到了砖块
 * 3、碰到了钢铁
 * 4、碰到了老家
 * 5、碰到了边界
 * 6、碰到了子弹
 * 7、碰到了坦克
 */

// 子弹进行碰撞检查需要的信息
export type BulletCollisionInfo = {
  id: string,
  type: 'player' | 'npc',
  vertex: {
    min: [number, number],
    max: [number, number]
  }
}

export enum bulletCollisionStatus {
  pass,
  brick,
  steel,
  home,
  border,
  bullet,
  tank,
}
