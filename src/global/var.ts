// import ChooseMode from '../gameInterface/chooseMode';

export const codeToKey = {
  87: 'W', 65: 'A', 83: 'S', 68: 'D', 72: 'H', 74: 'J'
};

export const dirNum = {
  W: 0, D: 1, S: 2, A: 3
};

export const inputParam = {
  isPressed: false,
  functionKey: '',
  directionKey: '',
  W: false,
  A: false,
  S: false,
  D: false,
  H: false,
  J: false
};

interface renderClass {
  draw: () => void
}

export const gameParam = {
  stageNum: 1,
  gameState: 'chooseMode',  // chooseMode, chooseStage, playGame, over, construct
  renderUI: <renderClass>{}
};
