const roadMap = new Array(28).fill(0).map(() => {
  return new Array(28).fill(0);
});

// roadMap值的意义：
// 0: 无障碍
// 1: 冰
// 2: 河流
// 3: 砖块
// 4: 钢筋
// 5: 老家
function affirmRoadMap (i: number, j: number, data: number) {
  switch (data) {
    // 1、2、3、4、5、17、18 砖
    case 1:
      roadMap[2 * i][2 * j] =
        roadMap[2 * i][2 * j + 1] =
          roadMap[2 * i + 1][2 * j] =
            roadMap[2 * i + 1][2 * j + 1] = 3;
      break;
    case 2:
      roadMap[2 * i + 1][2 * j] = roadMap[2 * i + 1][2 * j + 1] = 0;
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = 3;
      break;
    case 3:
      roadMap[2 * i][2 * j] = roadMap[2 * i + 1][2 * j] = 0;
      roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j + 1] = 3;
      // oBrickStatus[(2 * i) * 28 + (2 * j + 1)] = null;
      // oBrickStatus[(2 * i + 1) * 28 + (2 * j + 1)] = null;
      break;
    case 4:
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = 0;
      roadMap[2 * i + 1][2 * j] = roadMap[2 * i + 1][2 * j + 1] = 3;
      // oBrickStatus[(2 * i + 1) * 28 + (2 * j)] = null;
      // oBrickStatus[(2 * i + 1) * 28 + (2 * j + 1)] = null;
      break;
    case 5:
      roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j + 1] = 0;
      roadMap[2 * i][2 * j] = roadMap[2 * i + 1][2 * j] = 3;
      // oBrickStatus[(2 * i) * 28 + (2 * j)] = null;
      // oBrickStatus[(2 * i + 1) * 28 + (2 * j)] = null;
      break;
    case 17:
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j + 1] = 0;
      roadMap[2 * i + 1][2 * j] = 3;
      // oBrickStatus[(2 * i + 1) * 28 + (2 * j)] = null;
      break;
    case 18:
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j] = 0;
      roadMap[2 * i + 1][2 * j + 1] = 3;
      // oBrickStatus[(2 * i + 1) * 28 + (2 * j + 1)] = null;
      break;
    // 6、7、8、9、10、19、20 钢
    case 6:
      roadMap[2 * i][2 * j] =
        roadMap[2 * i][2 * j + 1] =
          roadMap[2 * i + 1][2 * j] =
            roadMap[2 * i + 1][2 * j + 1] = 4;
      break;
    case 7:
      roadMap[2 * i + 1][2 * j] = roadMap[2 * i + 1][2 * j + 1] = 0;
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = 4;
      break;
    case 8:
      roadMap[2 * i][2 * j] = roadMap[2 * i + 1][2 * j] = 0;
      roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j + 1] = 4;
      break;
    case 9:
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = 0;
      roadMap[2 * i + 1][2 * j] = roadMap[2 * i + 1][2 * j + 1] = 4;
      break;
    case 10:
      roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j + 1] = 0;
      roadMap[2 * i][2 * j] = roadMap[2 * i + 1][2 * j] = 4;
      break;
    case 19:
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j + 1] = 0;
      roadMap[2 * i + 1][2 * j] = 4;
      break;
    case 20:
      roadMap[2 * i][2 * j] = roadMap[2 * i][2 * j + 1] = roadMap[2 * i + 1][2 * j] = 0;
      roadMap[2 * i + 1][2 * j + 1] = 4;
      break;
    // 13 river
    case 13:
      roadMap[2 * i][2 * j] =
        roadMap[2 * i][2 * j + 1] =
          roadMap[2 * i + 1][2 * j] =
            roadMap[2 * i + 1][2 * j + 1] = 2;
      break;
    // 15 home
    case 15:
      roadMap[2 * i][2 * j] =
        roadMap[2 * i][2 * j + 1] =
          roadMap[2 * i + 1][2 * j] =
            roadMap[2 * i + 1][2 * j + 1] = 5;
      break;
    // 12 frozen road
    case 12:
      roadMap[2 * i][2 * j] =
        roadMap[2 * i][2 * j + 1] =
          roadMap[2 * i + 1][2 * j] =
            roadMap[2 * i + 1][2 * j + 1] = 1;
      break;
    default: break;
  }
}

export { roadMap, affirmRoadMap };