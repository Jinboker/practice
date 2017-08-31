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

// 可以运动的坦克或者子弹
interface Mover {
  x: number,
  y: number,
  id: number,
  alive: boolean,
  bornAnimationNum?: number,
  bulletAlive?: boolean,
  renderSpirit: () => void
}

// 爆炸
interface Explode {
  alive: boolean,
  renderExplode: () => void
}

// 精灵集合
interface SpiritCollection {
  tankArr: Mover[],
  bulletArr: Mover[],
  explodeArr: Explode[]
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
  col?: number,
  id?: number
}

// 碰撞检测的参数
interface CollisionParams {
  direction: string,
  nextX: number,
  nextY: number,
  rank: number
}

// 子弹在砖块中的位置信息
interface PositionInBrickInfo {
  x: number,
  y: number,
  row: number,
  col: number,
  directionNum: number
}

// 子弹击中砖块后，清除对应砖块的图像时候需要的参数
interface ClearBrickParams {
  directionNum: number,
  nextX: number,
  nextY: number,
  rank: number,
  row: number,
  col: number
}

interface ClearSteelParams extends ClearBrickParams {
  identity: string;
}
