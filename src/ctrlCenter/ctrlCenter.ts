import RenderGame from '../renderGame';
import ChooseMode from '../renderGame/chooseMode';
import PlayGame from '../renderGame/playGame/index';
import ChooseStage from '../renderGame/chooseStage';
import GameOver from '../renderGame/gameOver';

const listeners = {};

listeners['newGame'] = () => {
  RenderGame.renderContent = new ChooseMode();
};

listeners['enterStage'] = (couldChangeStage: boolean) => {
  RenderGame.renderContent = new ChooseStage(couldChangeStage);
};

// 三种状态：new next over
listeners['playGame'] = (state: string) => {
  switch (state) {
    case 'new': RenderGame.renderContent = new PlayGame(); break;
    case 'over': RenderGame.renderContent.state = 'over'; break;
    case 'next': ''; break;
    default: break;
  }
};

listeners['construct'] = () => {
};

listeners['over'] = () => {
  RenderGame.renderContent = new GameOver();
};

function getReceiveMsg() {
  const receiveMsg = <T>(topic: string, ...args: T[]) => listeners[topic](...args);

  return { receiveMsg };
}

export default getReceiveMsg();
