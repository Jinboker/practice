import { CXT_BG, OFFSET_X, OFFSET_Y } from '../global/const';
import { affirmRoadMap } from './affirmRoadMap';
import res from '../data/assets';
import { mapData } from '../data/map';

const BRICK_IMG = res.img.brick;

export default function (stage: number) {
  // 重置坦克出生点的环境
  if (stage === 0) {
    mapData[0][0][0] =
      mapData[0][0][6] =
        mapData[0][0][12] =
          mapData[0][12][4] = 0;
  }

  // draw map
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      let item = mapData[stage][i][j];

      if (item) {
        CXT_BG.drawImage(BRICK_IMG, 32 * item, 0, 32, 32, OFFSET_X + 32 * j, OFFSET_Y + 32 * i, 32, 32);
        affirmRoadMap(i, j, item);
      }
    }
  }
};