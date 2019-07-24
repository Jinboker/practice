import { ctx, screen } from '../global'

export function initialCanvas() {
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

  /**
   * initial canvas setting
   */
  const bgCtx = ctx.bg!
  const otherCtx = ctx.other!

  bgCtx.font = '15px prstart'
  bgCtx.fillStyle = '#000'
  bgCtx.textBaseline = 'top'

  otherCtx.font = '20px prstart'
  otherCtx.fillStyle = '#000'
  otherCtx.textBaseline = 'top'
}
