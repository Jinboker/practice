// get all pic
const requirePicContext = require.context('^assets/img', true, /^\.\/.*\.png$/);
const picsBase64 = requirePicContext.keys().map(requirePicContext);
const pics = {};

['bonus', 'boom', 'brick', 'enemy', 'misc', 'player', 'ui']
  .forEach((name, index) => (pics[name] = picsBase64[index]));

// get all mp3 file
const requireMusicContext = require.context('^assets/sound', true, /^\.\/.*\.mp3$/);
const musicsBase64 = requireMusicContext.keys().map(requireMusicContext);
const musics = {};

['attack', 'attackOver', 'bomb', 'count', 'eat', 'explode', 'life', 'misc', 'over', 'pause', 'start']
  .forEach((name, index) => (musics[name] = musicsBase64[index]));

export { pics, musics };
