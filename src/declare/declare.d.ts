declare module "*.json" {
  const value: any;
  export default value;
}

interface delayOption {
  count: number,
  amount: number
}

interface renderUI {
  draw: () => void
}

interface collisionInfo {
  isCollision: boolean,
  info: string[]
}

interface keyboardEvent extends Event {
  keyCode: number
}

interface operate {
  W?: () => void,
  A?: () => void,
  S?: () => void,
  D?: () => void,
  H?: () => void,
  J?: () => void
}

interface isTouchBorder {
  W: () => boolean,
  A: () => boolean,
  S: () => boolean,
  D: () => boolean
}

interface bulletInfo {
  x: number,
  y: number
  direction: string,
  type: string,
  rank: number,
  id: number
}
