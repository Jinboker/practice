import { gameParam} from '../global/var';
import ChooseMode from '../gameInterface/chooseMode';
import ChooseStage from '../gameInterface/chooseStage';

const listeners = {};

listeners['newGame'] = () => {
  gameParam.gameState = 'chooseMode';
  gameParam.renderUI = new ChooseMode();
};

listeners['enterStage'] = () => {
  gameParam.renderUI = new ChooseStage(true);
};

listeners['playGame'] = () => {
  
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

// const controller = getReceiveMsg();
//
// export default controller;
export default getReceiveMsg();