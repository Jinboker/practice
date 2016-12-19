// 导入所有图片和音频的base64资源
import resJson from '../asset/resource.json';
import { res } from './variable';

/**
 * 初始化游戏
 */
function init () {
  // 存储所有的图片和音频数据对象
  let _resKey = ['img', 'audio'];

  _resKey.forEach((ele) => {
    for (let key in resJson[ele]) {
      res[ele][key] = document.createElement(ele);
      res[ele][key].src = resJson[ele][key];
    }
  });
}

export { init };
