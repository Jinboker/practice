import { state } from './var';
import { cleanCxt } from './comm';

/**
 * start new game
 */
function newGame () {
  state.gameState = 'start';
}

/**
 * enter stage interface
 * @param [mode] [string] whether could change stage
 */
function enterStage (mode) {
  state.gameState = 'stage';
  state.stageState = mode;
}

/**
 * enter game interface and render map
 * @param [mode] [string] fight mode or construct mode
 */
function playGame (mode) {
  state.gameState = 'play';
  state.playGameState = mode;

  if (mode === 'construct') {
    cleanCxt('bg');
  }
}

/**
 * enter score interface, if game over ,restart game
 * @param [mode] [string] game over or next stage
 */
function thisStageOver (mode) {
  state.gameState = 'over';
  state.getScoreState = mode;
  cleanCxt('all');
}

let stateCtr = (() => {
  let operations = {};

  operations.newGame = () => newGame();
  operations.enterStage = mode => enterStage(mode);
  operations.playGame = mode => playGame(mode);
  operations.thisStageOver = mode => thisStageOver(mode);

  let receiveMessage = (...arg) => {
    let msg = Array.prototype.shift.call(arg);

    operations[msg].apply(this, arg);
  };

  return {
    receiveMessage: receiveMessage
  }
})();

export { stateCtr };