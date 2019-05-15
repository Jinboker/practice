// @ts-ignore
const requireMusicContext = require.context('../assets/audio', true, /^\.\/.*\.mp3$/)
const audioBase64 = requireMusicContext.keys().map(requireMusicContext)

type Audios = {
  attack: HTMLVideoElement;
  attackOver: HTMLVideoElement;
  bomb: HTMLVideoElement;
  count: HTMLVideoElement;
  eat: HTMLVideoElement;
  explode: HTMLVideoElement;
  life: HTMLVideoElement;
  misc: HTMLVideoElement;
  over: HTMLVideoElement;
  pause: HTMLVideoElement;
  start: HTMLVideoElement;
}

const audios = {}

;
[
  'attack', 'attackOver', 'bomb', 'count', 'eat', 'explode', 'life', 'misc', 'over', 'pause', 'start'
].forEach((key, index) => {
  audios[key] = document.createElement('audio')
  audios[key].src = audioBase64[index]
})

export default audios as Audios
