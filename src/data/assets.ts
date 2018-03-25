// get all pic
const requirePicContext = require.context('^assets/img', true, /^\.\/.*\.png$/);
const picsBase64 = requirePicContext.keys().map(requirePicContext);

type Pics = {
  bonus?: HTMLImageElement;
  boom?: HTMLImageElement;
  brick?: HTMLImageElement;
  enemy?: HTMLImageElement;
  misc?: HTMLImageElement;
  player?: HTMLImageElement;
  ui?: HTMLImageElement;
};
let pics: Pics = {};

['bonus', 'boom', 'brick', 'enemy', 'misc', 'player', 'ui']
  .forEach((name, index) => {
    pics[name] = document.createElement('img');
    pics[name].src = picsBase64[index];
  });

// get all mp3 file
const requireMusicContext = require.context('^assets/sound', true, /^\.\/.*\.mp3$/);
const musicsBase64 = requireMusicContext.keys().map(requireMusicContext);

type Musics = {
  attack?: HTMLVideoElement;
  attackOver?: HTMLVideoElement;
  bomb?: HTMLVideoElement;
  count?: HTMLVideoElement;
  eat?: HTMLVideoElement;
  explode?: HTMLVideoElement;
  life?: HTMLVideoElement;
  misc?: HTMLVideoElement;
  over?: HTMLVideoElement;
  pause?: HTMLVideoElement;
  start?: HTMLVideoElement;
};
let musics: Musics = {};

['attack', 'attackOver', 'bomb', 'count', 'eat', 'explode', 'life', 'misc', 'over', 'pause', 'start']
  .forEach((name, index) => {
    musics[name] = document.createElement('audio');
    musics[name].src = musicsBase64[index];
  });

export { pics, musics };
