import { object } from '../variables';

function drawTank() {
  let tankArr = object.tank;

  tankArr.forEach(ele => {
    ele.alive ? ele.draw() : ele = void 0;
  });
}

export {drawTank};
