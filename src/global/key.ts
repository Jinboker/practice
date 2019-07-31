import { tuple } from 'src/utils'

export type KeyName = 'up' | 'down' | 'left' | 'right' | 'A' | 'B'

export const keyStatus = {
  up: false,
  down: false,
  left: false,
  right: false,
  A: false,
  B: false,
  // todo 这个对象上直接写getter和setter
  pressedKey: undefined
}

export const directionKey = tuple('up', 'down', 'left', 'right')
export type DirectionKey = (typeof directionKey)[number]

export const funcKey = tuple('A', 'B')
export type FuncKey = (typeof funcKey)[number]

export type Key = DirectionKey | FuncKey

type PressedKey = {
  func: FuncKey | '',
  direction: DirectionKey | ''
}
export const pressedKey: PressedKey = {
  func: '',
  direction: ''
}
