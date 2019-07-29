export type ICtx = {
  /**
   * 主要用来渲染各种敌我双方的坦克
   */
  role?: CanvasRenderingContext2D;
  /**
   * 背景板，和地图
   */
  bg?: CanvasRenderingContext2D;
  other?: CanvasRenderingContext2D;
}

export const ctx: ICtx = {
  role: undefined,
  bg: undefined,
  other: undefined
}
