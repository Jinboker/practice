import { requestAnimFrame } from './comm';

/**
 * 初始化游戏环境
 */
function init () {
}

/**
 * 游戏主循环函数
 */
function loop () {

  requestAnimFrame(loop());
}

function startGame () {
  init();
  loop();
}

export { startGame };