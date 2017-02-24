import { state, inputKey, game, obj } from './var';

function drawGame() {
  drawType[state.gameState]();
}

export { drawGame };