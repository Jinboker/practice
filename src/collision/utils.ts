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
