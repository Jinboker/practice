import { ctx, ICtx, SCREEN } from 'src/global'

export { eventBus } from './eventBus'
export { uniqueId } from './uniqueId'

export function clearCanvas(cleanType?: Array<keyof ICtx>) {
  const cleanArr = !cleanType ? Object.keys(ctx) : cleanType

  cleanArr.forEach(key => {
    (ctx[key] as CanvasRenderingContext2D).clearRect(0, 0, SCREEN.width, SCREEN.height)
  })
}

export function delayLoop(count: number) {
  let curCount = 0

  return function (cb: Function) {
    if (curCount >= count) {
      curCount = 0
      cb()
    } else {
      curCount += 1
    }
  }
}

export const tuple = <T extends string[]>(...args: T) => args
