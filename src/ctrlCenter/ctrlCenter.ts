import { gameParam } from '../global/var';
import ChooseMode from '../gameInterface/chooseMode';
import ChooseStage from '../gameInterface/chooseStage';
import PlayGame from '../gameInterface/playGame';

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

listeners['newBullet'] = () => {

};

listeners['bulletDie'] = () => {

};

function getReceiveMsg() {
  let receiveMsg = <T>(topic: string, ...args: Array<T>) => listeners[topic](...args);

  return { receiveMsg };
}

export default getReceiveMsg();