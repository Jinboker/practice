import { tuple } from 'src/utils'

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
