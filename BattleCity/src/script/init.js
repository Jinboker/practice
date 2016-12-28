import { can } from './var';
import { keyBoardInit } from './input';

let cxt = can.cxt;

function gameInit () {
  cxt.bg.font      = "15px prstart";
  cxt.bg.fillStyle = '#000';
  cxt.bg.textBaseline="top";

  cxt.misc.font = "20px prstart";
  cxt.misc.fillStyle = '#000';
  cxt.misc.textBaseline="top";

  keyBoardInit(true, 'keydown', 'keyup');
}

export { gameInit }