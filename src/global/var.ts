export const codeToKey = {
  87: 'W', 65: 'A', 83: 'S', 68: 'D', 72: 'H', 74: 'J'
};

export enum roadType {
  Pass = 0, IceRoad = 1, River = 2, Brick = 3, Steel = 4, Home = 5
};

export enum dirNum {
  W = 0, A = 3, S = 2, D = 1
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
