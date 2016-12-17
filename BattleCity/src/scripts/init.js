// 导入所有图片和音频的base64资源
import jRes from '../asset/resource.json';
import { oRes } from './variable';

/**
 * 初始化游戏
 */
function init () {
  // 存储所有的图片和音频数据对象
  let _resKey = ['img', 'audio'];

  _resKey.forEach((n) => {
    for (let _key in jRes[n]) {
      oRes[n][_key] = document.createElement(n);
      oRes[n][_key].src = jRes[n][_key];
    }
  });
}

export { init };