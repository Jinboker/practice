import { state } from '../variables';
import { chooseMode } from './chooseMode';
import { chooseStage } from './chooseStage';
import { playGame } from './playGame';
import { gameOver } from './gameOver';


const renderType = {
  chooseMode,
  chooseStage,
  playGame,
  gameOver
};

export default function renderGame() {
  renderType[state.game]();
}
