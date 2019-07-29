import { roadType } from 'src/global'

const { brick, empty, ice, river, home, steel } = roadType

/**
 * map 到 roadMap 的映射
 */
export const roadMapItemMapper = {
  // brick
  1: [brick, brick, brick, brick],
  2: [brick, brick, empty, empty],
  3: [empty, brick, empty, brick],
  4: [empty, empty, brick, brick],
  5: [brick, empty, brick, empty],
  17: [empty, empty, empty, brick],
  18: [empty, empty, brick, empty],

  // steel
  6: [steel, steel, steel, steel],
  7: [steel, steel, empty, empty],
  8: [empty, steel, empty, steel],
  9: [empty, empty, steel, steel],
  10: [steel, empty, steel, empty],
  19: [empty, empty, empty, steel],
  20: [empty, empty, steel, empty],

  // ice
  12: [ice, ice, ice, ice],

  // home
  15: [home, home, home, home],

  // river
  13: [river, river, river, river],
  14: [river, river, river, river],
}
