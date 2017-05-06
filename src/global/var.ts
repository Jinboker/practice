export const codeToKey = {
  87: 'W',
  65: 'A',
  83: 'S',
  68: 'D',
  72: 'H',
  74: 'J'
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

export const gameParam = {
  stageNum: 1,
  gameState: 'chooseMode', // chooseMode, chooseStage, playGame, over
  stage: '',              // chaneAble, noChange
  play: '',               // fight, construct
  over: ''                // nextStage, gameOver
};