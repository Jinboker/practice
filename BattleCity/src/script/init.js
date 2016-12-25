import { can } from './var';
import { keyBoardInit } from './input';

function gameInit () {
  can.cxt.bg.font      = "15px prstart";
  can.cxt.bg.fillStyle = '#000';
  can.cxt.bg.textBaseline="top";

  keyBoardInit(true, 'keydown', 'keyup');
}

export { gameInit }