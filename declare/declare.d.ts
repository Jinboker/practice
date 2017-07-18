// old
interface Operate {
  W?: () => void,
  A?: () => void,
  S?: () => void,
  D?: () => void,
  H?: () => void,
  J?: () => void
}

// new
declare module '*.json' {
  const value: any;
  export default value;
}

// 渲染界面
interface Render {
  draw: () => void
}

// 延迟函数的参数
interface DelayOption {
  count: number,
  amount: number
}

// 精灵
interface Spirit {
  x: number,
  y: number,
  id: number,
  alive: boolean,
  bulletAlive?: boolean,
  renderSpirit: () => void
}

// 精灵集合
interface SpiritCollection {
  tankArr: Spirit[],
  bulletArr: Spirit[]
}

// 新产生子弹的时候需要传递给子弹类的相关信息
interface BulletInfo {
  x: number,
  y: number,
  direction: string,
  type: string,
  rank: number,
  id: number
}

// 碰撞的信息
interface CollisionInfo {
  isCollision: boolean,
  collisionType?: string,
  row?: number,
  col?: number
}

// 碰撞检测的参数
interface CollisionParams {
  direction: string,
  nextX: number,
  nextY: number
}
