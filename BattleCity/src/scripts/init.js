// 导入所有图片和音频的base64资源
import res from '../asset/resource.json';

/**
 * 初始化游戏
 */
function init () {
  let img = {};

  for (let key in res.img) {
    img[key] = document.createElement('img');
    img[key].src = res.img[key];
  }

  let aud = {};

  for (let key in res.audio) {
    aud[key] = document.createElement('audio');
    aud[key].src = res.audio[key];
  }
}

export { init };