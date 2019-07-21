import { ctx } from '../global'
import { screen } from '../constant'

export function initialDom() {
  const root = document.createElement('div')

  ;
  ['role', 'bg', 'other'].forEach((key, i) => {
    const ele = document.createElement('canvas') as HTMLCanvasElement

    if (!i) {
      ele.style.zIndex = '-1'
    }

    ele.width = screen.width
    ele.height = screen.height

    root.appendChild(ele)

    ctx[key] = ele.getContext('2d')!
  })

  document.body.insertBefore(root, document.body.firstChild)
}
