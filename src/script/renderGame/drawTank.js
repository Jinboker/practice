import {obj} from '../variables';

function drawTank() {
  let tankArr = obj.tank;

  tankArr.forEach(ele => {
    ele.alive ? ele.draw() : ele = void 0;
  });
}

export {drawTank};
