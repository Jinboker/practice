// @ts-ignore
const requirePicContext = require.context('../assets/img', true, /^\.\/.*\.png$/)
const picBase64 = requirePicContext.keys().map(requirePicContext)

const imgArr = ['bonus', 'boom', 'brick', 'enemy', 'misc', 'player', 'ui']

type Pics = {
  [k in (typeof imgArr)[number]]: HTMLImageElement;
}

const imgs: Pics = {}

imgArr.forEach((key, index) => {
  imgs[key] = document.createElement('img')
  imgs[key].src = picBase64[index]
})

export {
  imgs
}
