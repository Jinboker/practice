import { object } from '../variables';

let player = object.player;
let npcArr = object.npc;

function drawPlayer() {
  // if (!player) { return; }

  object.player.draw();
}

function drawNpc() {
  console.log(1);
}

export { drawNpc, drawPlayer };