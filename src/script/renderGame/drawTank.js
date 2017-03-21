import {obj} from '../variables';
import {controller} from '../control';

function drawTank() {
  let tankArr = obj.tank;

  // 默认tankArr第一个元素为玩家，如果玩家未定义，那么新建玩家
  (tankArr[0] === void 0) && controller.receiveMessage('newTank', 'player');

  tankArr.forEach(ele => {
    ele.alive ? ele.draw() : ele = void 0;
  });
}

export {drawTank};
