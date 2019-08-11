import { ctx, ICtx, SCREEN } from 'src/global'

export const tuple = <T extends string[]>(...args: T) => args

export function clearCanvas(cleanType?: Array<keyof ICtx>) {
  const cleanArr = !cleanType ? Object.keys(ctx) : cleanType

  cleanArr.forEach(key => {
    (ctx[key] as CanvasRenderingContext2D).clearRect(0, 0, SCREEN.width, SCREEN.height)
  })
}

export function delayLoop(count: number) {
  let curCount = 0

  return function (cb: Function, doInEachLoop?: Function) {
    if (curCount >= count) {
      curCount = 0
      cb()
    } else {
      curCount += 1

      doInEachLoop && doInEachLoop()
    }
  }
}

const idCounter = {}
export function uniqueId(prefix: string = '$uniqueId$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id = ++idCounter[prefix]

  if (prefix === '$uniqueId$') {
    return `${id}`
  }

  return `${prefix + id}`
}
