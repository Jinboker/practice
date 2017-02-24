import { requestAnimFrame } from './comm';
import { gameInit } from './init';
import renderGame from './renderGame';

/**
 * game loop fn
 */
function loop () {
  renderGame();
  requestAnimFrame(loop);
}

function startGame () {
  gameInit();
  loop();
}

export { startGame };