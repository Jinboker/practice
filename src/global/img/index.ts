// @ts-ignore
const requirePicContext = require.context('../../assets/img', true, /^\.\/.*\.png$/)
const picBase64 = requirePicContext.keys().map(requirePicContext)

type Pics = {
  bonus: HTMLImageElement;
  boom: HTMLImageElement;
  brick: HTMLImageElement;
  enemy: HTMLImageElement;
  misc: HTMLImageElement;
  player: HTMLImageElement;
  ui: HTMLImageElement;
}

const pics = {}

;
[
  'bonus', 'boom', 'brick', 'enemy', 'misc', 'player', 'ui'
].forEach((key, index) => {
  pics[key] = document.createElement('img')
  pics[key].src = picBase64[index]
})

export default pics as Pics
