import '../data/assets';
import NewGame from '../renderGame/newGame';
// import Controller from '^src/controller/controller';

const newGame = new NewGame();

/**
 * 游戏的循环渲染函数
 */
function renderLoop() {
  newGame.draw();
  window.requestAnimationFrame(renderLoop);
}

export default function () {
  renderLoop();
}
