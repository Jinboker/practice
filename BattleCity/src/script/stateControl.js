import { state } from './var';

/**
 * start new game
 */
function newGame () {
  state.gameState = 'mode';
}

/**
 * enter stage interface
 * @param [chooseAble] [boolean] enable to choose stage
 */
function enterStage (chooseAble) {
  state.gameState = 'stage';
  state.stageState = chooseAble;
}

/**
 * enter game interface and render map
 * @param [mode] [string] fight mode or construct mode
 */
function playGame (mode) {
  state.gameState = 'play';
  if (mode === 'construct') {
    state.playGameState = mode;
    return ;
  }
}

/**
 * enter score interface, if game over ,restart game
 * @param [gameOver] [boolean] whether game over
 */
function over (gameOver) {
  if (gameOver) {
    state.getScoreState = 'gameOver';
    return ;
  }
}

let stateCtr = (() => {
  let operations = {};

  operations.newGame = () => newGame();
  operations.enterStage = chooseAble => enterStage(chooseAble);
  operations.playGame = mode => playGame(mode);
  operations.getScore = gameOver => over(gameOver);

  let ReceiveMessage = (...arg) => {
    let msg = Array.prototype.shift.call(arg);

    operations[msg].apply(this, arg);
  };

  return {
    ReceiveMessage: ReceiveMessage
  }
})();

export { stateCtr };