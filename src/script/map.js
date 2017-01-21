import { mapData, res } from './data';
import { CXT_BG } from './const';

let roadMap = (() => {
  let arr = [];

  for (let i = 0; i < 28; i++) {
    arr.push((() => {
      let _arr = [];

      for (let j = 0; j < 28; j++) {
        _arr.push(0);
      }
      return _arr;
    })());
  }

  return arr;
})();

function ensureRoadMap (i, j, data) {
  switch (data) {
    // 1、2、3、4、5、17、18 brick
    case 1:
      roadMap[2*i][2*j] =
        roadMap[2*i][2*j+1] =
          roadMap[2*i+1][2*j] =
            roadMap[2*i+1][2*j+1] = 1;
      break;
    case 2:
      roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 0;
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 1;
      break;
    case 3:
      roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 0;
      roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 1;
      // oBrickStatus[(2*i)*28+(2*j+1)] = null;
      // oBrickStatus[(2*i+1)*28+(2*j+1)] = null;
      break;
    case 4:
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 0;
      roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 1;
      // oBrickStatus[(2*i+1)*28+(2*j)] = null;
      // oBrickStatus[(2*i+1)*28+(2*j+1)] = null;
      break;
    case 5:
      roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
      roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 1;
      // oBrickStatus[(2*i)*28+(2*j)] = null;
      // oBrickStatus[(2*i+1)*28+(2*j)] = null;
      break;
    case 17:
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
      roadMap[2*i+1][2*j] = 1;
      // oBrickStatus[(2*i+1)*28+(2*j)] = null;
      break;
    case 18:
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j] = 0;
      roadMap[2*i+1][2*j+1] = 1;
      // oBrickStatus[(2*i+1)*28+(2*j+1)] = null;
      break;
    // 6、7、8、9、10、19、20 steel
    case 6:
      roadMap[2*i][2*j] =
        roadMap[2*i][2*j+1] =
          roadMap[2*i+1][2*j] =
            roadMap[2*i+1][2*j+1] = 2;
      break;
    case 7:
      roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 0;
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 2;
      break;
    case 8:
      roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 0;
      roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 2;
      break;
    case 9:
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 0;
      roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 2;
      break;
    case 10:
      roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
      roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 2;
      break;
    case 19:
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
      roadMap[2*i+1][2*j] = 2;
      break;
    case 20:
      roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j] = 0;
      roadMap[2*i+1][2*j+1] = 2;
      break;
    // 13 river3
    case 13:
      roadMap[2*i][2*j] =
        roadMap[2*i][2*j+1] =
          roadMap[2*i+1][2*j] =
            roadMap[2*i+1][2*j+1] = 4;
      break;
    // 15 home
    case 15:
      roadMap[2*i][2*j] =
        roadMap[2*i][2*j+1] =
          roadMap[2*i+1][2*j] =
            roadMap[2*i+1][2*j+1] = 5;
      break;
    // 12 frozen road
    case 12:
      roadMap[2*i][2*j] =
        roadMap[2*i][2*j+1] =
          roadMap[2*i+1][2*j] =
            roadMap[2*i+1][2*j+1] = 3;
      break;
    default: break;
  }
}

function drawMap (stage) {
  // in construct mode, player may construct at the born position, clean it
  if (stage === 0) {
    mapData[0][0][0] =
      mapData[0][0][6] =
        mapData[0][0][12] =
          mapData[0][12][4] = 0;
  }

  // draw map
  for (let i = 0; i < 13; i++) {
    for(let j = 0; j < 13; j++){
      let dataItem = mapData[stage][i][j];
      if (dataItem) {
        CXT_BG.drawImage(res.img.brick, 32 * dataItem, 0, 32, 32, 35+32*j, 20+32*i, 32, 32);
        ensureRoadMap(i, j, dataItem);
      }
    }
  }
}

export { drawMap, roadMap };