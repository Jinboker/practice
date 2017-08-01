import RenderGame from '../renderGame';
import ChooseMode from '../renderGame/chooseMode';
import PlayGame from '../renderGame/playGame/index';
import ChooseStage from '../renderGame/chooseStage';
import { spiritCollection } from '../global';

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

listeners['bullet-die'] = (bulletId: number) => {
  spiritCollection.tankArr.find(ele =>
    (ele && ele.id === bulletId && Boolean(ele.bulletAlive = false)));
};

function getReceiveMsg() {
  const receiveMsg = <T>(topic: string, ...args: T[]) => listeners[topic](...args);

  return { receiveMsg };
}

export default getReceiveMsg();
