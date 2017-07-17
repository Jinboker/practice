import RenderGame from '../renderGame';
import ChooseMode from '../renderGame/chooseMode';
import ChooseStage from '../renderGame/chooseStage';
import PlayGame from '../renderGame/playGame/index';

const listeners = {};

listeners['newGame'] = () => {
  RenderGame.renderContent = new ChooseMode();
};

listeners['enterStage'] = (couldChangeStage: boolean) => {
  RenderGame.renderContent = new ChooseStage(couldChangeStage);
};

listeners['playGame'] = () => {
  RenderGame.renderContent = new PlayGame();
};

listeners['construct'] = () => {
};

listeners['over'] = () => {
};

function getReceiveMsg() {
  const receiveMsg = <T>(topic: string, ...args: T[]) => listeners[topic](...args);

  return { receiveMsg };
}

export default getReceiveMsg();