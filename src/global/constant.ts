export type Direction = 'up' | 'right' | 'down' | 'left'
export enum DIRECTION {
  up,
  right,
  down,
  left
}

export const SCREEN = {
  width: 516,
  height: 456,
  gameView: {
    len: 416,
    xOffset: 35,
    yOffset: 20
  }
}

export enum KEY_CODE {
  // W
  up = 87,
  // S
  down = 83,
  // D
  right = 68,
  // A
  left = 65,
  // H
  A = 72,
  // J
  B = 74
}
