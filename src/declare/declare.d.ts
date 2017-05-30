declare module "*.json" {
  const value: any;
  export default value;
}

interface delayOption {
  count: number,
  amount: number
}

interface spirit {
  draw: () => void
}

interface renderUI {
  draw: () => void
}

interface collisionInfo {
  isCollision: boolean,
  info?: string[]
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

interface getPositon {
  (speed: number): number[];
}
