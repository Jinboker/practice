import { state, object } from './variables';
import { cleanCxt } from './comm';
import { Bullet } from './object/bullet';

/**
 * start new game
 */
function newGame() {
  state.game = 'chooseMode';
}

/**
 * enter stage interface
 * @param [mode] [string] whether could change stage
 */
function enterStage(mode) {
  state.game = 'chooseStage';
  state.stage = mode;
}

/**
 * enter game interface and render map
 * @param [mode] [string] fight mode or construct mode
 */
function playGame(mode) {
  state.game = 'playGame';
  state.play = mode;

  mode === 'construct' && cleanCxt('bg');
}

/**
 * enter score interface, if game over ,restart game
 * @param [mode] [string] game over or next stage
 */
function thisStageOver(mode) {
  state.game = 'gameOver';
  state.over = mode;
  cleanCxt('all');
}

function newBullet(param) {
  object.bullet.push(new Bullet(...param));
}

function bulletDie(index) {
  object.tank[index].bulletAlive = false;
}

let controller = (() => {
  let operations = {};

  operations.newGame = () => newGame();
  operations.enterStage = mode => enterStage(...mode);
  operations.playGame = mode => playGame(...mode);
  operations.thisStageOver = mode => thisStageOver(...mode);
  operations.newBullet = param => newBullet(param);
  operations.bulletDie = index => bulletDie(index);

  let receiveMessage = (...arg) => {
    let msg = Array.prototype.shift.call(arg);

    operations[msg](arg);
  };

  return {receiveMessage};
})();

export {controller};
