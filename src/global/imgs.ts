// @ts-ignore
const requirePicContext = require.context('../assets/img', true, /^\.\/.*\.png$/)
const picBase64 = requirePicContext.keys().map(requirePicContext)

import { tuple } from 'src/utils'

const imgArr = tuple('bonus', 'boom', 'brick', 'enemy', 'misc', 'player', 'ui')

type Pics = {
  [k in (typeof imgArr)[number]]: HTMLImageElement;
}

export const imgs = imgArr.reduce((prev, cur, index) => {
  prev[cur] = document.createElement('img')
  prev[cur].src = picBase64[index]

  return prev
}, {} as Pics)
