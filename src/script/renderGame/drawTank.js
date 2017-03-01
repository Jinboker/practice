import { object } from '../variables';



function drawPlayer() {
  let player = object.tank[0];

  if (!player) {return;}
  
  player.draw();
}

function drawNpc() {
  let npcArr = object.slice(1);

  npcArr.forEach((ele) => {
    ele && ele.draw();
  });
}

export { drawNpc, drawPlayer };
