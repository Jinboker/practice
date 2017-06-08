export const codeToKey = {
  87: 'W', 65: 'A', 83: 'S', 68: 'D', 72: 'H', 74: 'J'
};

export enum roadType {
  pass = 0, iceRoad = 1, river = 2, brick = 3, steel = 4, home = 5
};

export enum dirNum {
  W = 0, D = 1, S = 2, A = 3
};

export const inputParam = {
  isPressed: false,
  functionKey: '',
  directionKey: '',
  pressedKey: '',
  W: false,
  A: false,
  S: false,
  D: false,
  H: false,
  J: false
};

export const gameParam = {
  stageNum: 1,
  maxStage: 20,
  npcMax: 5,
  gameState: 'chooseMode',  // chooseMode, chooseStage, playGame, over, construct
  renderContent: <renderUI>{}
};

export const brickStatus = {};
