export type ICtx = {
  role?: CanvasRenderingContext2D;
  bg?: CanvasRenderingContext2D;
  other?: CanvasRenderingContext2D;
}

export const ctx: ICtx = {
  role: undefined,
  bg: undefined,
  other: undefined
}
