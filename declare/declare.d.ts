declare module '*.json' {
  const value: any;
  export default value;
}

interface DelayOption {
  count: number,
  amount: number
}

interface CollisionInfo {
  isCollision: boolean,
  info: CollisionInfoItem[]
}

interface CollisionInfoItem {
  collisionType: string,
  isCollision?: boolean,
  row?: number,
  col?: number
}

interface Operate {
  W?: () => void,
  A?: () => void,
  S?: () => void,
  D?: () => void,
  H?: () => void,
  J?: () => void
}

interface IsTouchBorder {
  W: () => boolean,
  A: () => boolean,
  S: () => boolean,
  D: () => boolean
}

interface BulletInfo {
  x: number,
  y: number,
  direction: string,
  type: string,
  rank: number,
  id: number
}

interface Mover {
  x: number,
  y: number,
  id: number,
  bulletAlive?: boolean,
  alive: boolean,
  draw: () => void
}

interface Spirit {
  tankArr: Mover[],
  bulletArr: Mover[]
}

