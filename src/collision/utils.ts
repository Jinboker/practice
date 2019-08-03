import { Direction, SCREEN } from '../global'

const { len } = SCREEN.gameView

/**
 * 获取坐标上最大和最小的两个顶点
 * @param x
 * @param y
 */

export function getVertex(x: number, y: number) {
  return {
    min: [x, y],
    max: [x, y]
  }
}

/**
 * 检查是否碰到了边界
 * @param x
 * @param y
 * @param size
 * @param direction
 */
export function touchBorder(x: number, y: number, size: number, direction: Direction) {
  const checkMap: { [k in Direction]: () => boolean } = {
    up: () => y <= 0,
    down: () => y >= len - (size << 1),
    left: () => x <= 0,
    right: () => x >= len - (size << 1)
  }

  return checkMap[direction]()
}
