import { gameState } from './var';

/**
 * enable to choose stage
 */
function chooseStage (able) {
  if (gameState.enterStageState !== able) {
    gameState.enterStageState = able;
  }
}

/**
 * enter game interface, prepare to render map
 * @param [mode] play mode or construct mode
 */
function enterGame (mode) {
  if (mode === 'construct') {
    return ;
  }
}

/**
 * enter score interface, if game over ,restart game
 * @param [gameOver] whether game over
 */
function getScore (gameOver) {
  if (gameOver === 'gameOver') {
    gameState.getScoreState = 'gameOver';
    return ;
  }
}

let stateCtr = (() => {
  let operations = {};

  operations.enterGame = mode => enterGame(mode);
  operations.getScore = gameOver => getScore(gameOver);
  operations.enterStage = able => chooseStage(able);

  let ReceiveMessage = (...arg) => {
    let msg = Array.prototype.shift.call(arg);

    operations[msg].apply(this, arg);
  };

  return {
    ReceiveMessage: ReceiveMessage
  }
})();

export { stateCtr };