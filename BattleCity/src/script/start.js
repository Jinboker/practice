import { requestAnimFrame } from './comm';
import { drawGame } from './drawGame';

/**
 * 初始化游戏环境
 */
function init () {

}

/**
 * game loop fn
 */
function loop () {
  drawGame();
  // requestAnimFrame(loop());
}

function startGame () {
  init();
  loop();
}

export { startGame };