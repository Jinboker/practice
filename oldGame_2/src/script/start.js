import { requestAnimFrame } from './comm';
import renderGame from './renderGame';
import { CXT_BG, CXT_MISC } from './variables';
import { keyBoardInit } from './input';

function gameLoop() {
  renderGame();
  requestAnimFrame(gameLoop);
}

function startGame() {
  CXT_BG.font = '15px prstart';
  CXT_BG.fillStyle = '#000';
  CXT_BG.textBaseline = 'top';

  CXT_MISC.font = '20px prstart';
  CXT_MISC.fillStyle = '#000';
  CXT_MISC.textBaseline = 'top';

  keyBoardInit(true, 'keydown', 'keyup');

  gameLoop();
}

export { startGame };
