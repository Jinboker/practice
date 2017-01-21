import { requestAnimFrame } from './comm';
import { drawGame } from './drawGame';
import { gameInit } from './init';

/**
 * game loop fn
 */
function loop () {
  drawGame();
  requestAnimFrame(loop);
}

function startGame () {
  gameInit();
  loop();
}

export { startGame };