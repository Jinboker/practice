import { CXT_BG, CXT_MISC } from './const';
import { keyBoardInit } from './input';
import { obj } from './var';
import { Player } from './factory/player';
import { Npc } from './factory/npc';

function gameInit () {
  CXT_BG.font      = "15px prstart";
  CXT_BG.fillStyle = '#000';
  CXT_BG.textBaseline="top";

  CXT_MISC.font = "20px prstart";
  CXT_MISC.fillStyle = '#000';
  CXT_MISC.textBaseline="top";

  keyBoardInit(true, 'keydown', 'keyup');
}

function objInit () {
  obj.player = new Player(4, 12, 'W', 'player');
  //
  // for (let i = 0; i < 5; i++) {
  //   obj.npc.push(new Npc());
  // }
}

export { gameInit, objInit }