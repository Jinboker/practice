import { gameParam } from '../global/var';
import ChooseMode from '../renderGame/chooseMode';
import ChooseStage from '../renderGame/chooseStage';
import PlayGame from '../renderGame/playeGame/index';

const listeners = {};

listeners['newGame'] = () => {
  gameParam.gameState = 'chooseMode';
  gameParam.renderContent = new ChooseMode();
};

listeners['enterStage'] = (couldChangeStage: boolean) => {
  gameParam.renderContent = new ChooseStage(couldChangeStage);
};

listeners['playGame'] = () => {
  gameParam.renderContent = new PlayGame();
};

listeners['construct'] = () => {

};

listeners['over'] = () => {

};
//
// listeners['newBullet'] = (bulletInfo: bulletInfo) => {
//   const {x, y, direction, id, type, rank} = bulletInfo;
//
//   bulletArr.push(new Bullet(x, y, direction, type, rank, id));
// };
//
// listeners['bulletDie'] = () => {
//
// };

function getReceiveMsg() {
  let receiveMsg = <T>(topic: string, ...args: Array<T>) => listeners[topic](...args);

  return { receiveMsg };
}

export default getReceiveMsg();