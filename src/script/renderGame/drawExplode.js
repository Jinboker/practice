import {obj} from '../variables';

function drawExplode() {
  let explodeArr = obj.explode;

  for (let i = explodeArr.length - 1, flag = true; i >= 0; flag ? i-- : i) {
    explodeArr[i].alive
      ? flag = true
      : (flag = false, obj.explode.splice(i, 1));
  }
}

export {drawExplode};
