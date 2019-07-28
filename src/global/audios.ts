// @ts-ignore
const requireMusicContext = require.context('../assets/audio', true, /^\.\/.*\.mp3$/)
const audioBase64 = requireMusicContext.keys().map(requireMusicContext)

import { tuple } from 'src/utils'

const audioArr = tuple(
  'attack', 'attackOver', 'bomb', 'count', 'eat', 'explode', 'life', 'misc', 'over', 'pause', 'start'
)

type Audios = {
  [k in (typeof audioArr)[number]]: HTMLAudioElement;
}

export const audios = audioArr.reduce((prev, cur, index) => {
  prev[cur] = document.createElement('audio')
  prev[cur].src = audioBase64[index]

  return prev
}, {} as Audios)
