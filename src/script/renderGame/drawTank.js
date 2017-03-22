import {obj} from '../variables';
import {controller} from '../control';
import {delayTimeout} from '../comm';
import {Player} from '../object/player';

// 第一个npc延迟30个循环出生，后面的延迟150个循环
const NEW_TANK_FREQUENCE = 150;

let setNewTankTimeout = 30;
let hasNpcDie = true;

function newTank(index) {
  // index === 0 ,player
  index
    ? ''
    : obj.tank[0] = new Player(128, 384, 'W', 'player', 0);
}

function drawTank() {
  let tankArr = obj.tank;

  // 默认tankArr第一个元素为玩家，如果玩家未定义，那么新建玩家
  !tankArr[0] && controller.receiveMessage('newTank', 'player');

  setNewTankTimeout = delayTimeout(setNewTankTimeout, () => {
    return void 0;
  });

  tankArr.forEach((ele, index) => {
    ele && ele.alive ? ele.draw() : ele = null;
  });
}

export {drawTank};
