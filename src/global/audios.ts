// @ts-ignore
const requireMusicContext = require.context('../assets/audio', true, /^\.\/.*\.mp3$/)
const audioBase64 = requireMusicContext.keys().map(requireMusicContext)

const audioArr = [
  'attack', 'attackOver', 'bomb', 'count', 'eat', 'explode', 'life', 'misc', 'over', 'pause', 'start'
]

type Audios = {
  [k in (typeof audioArr)[number]]: HTMLAudioElement;
}

const audios: Audios = {}

audioArr.forEach((key, index) => {
  audios[key] = document.createElement('audio')
  audios[key].src = audioBase64[index]
})

export {
  audios
}
