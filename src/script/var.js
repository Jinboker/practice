let state = {
  game: 'chooseMode',     // chooseMode, chooseStage, playGame, over
  stage: '',              // changeAble, noChange
  play: '',               // fight, construct
  over: ''                // nextStage, gameOver
};

// which key has been pressed
let inputKey = {
  hasPressed: false,
  pressedKey: null,
  directionKey: null,
  funcKey: null,
  W: false,
  A: false,
  S: false,
  D: false,
  H: false,
  J: false
};

let game = {
  stage: 1
};

let object = {
  player: null,
  npc: [],
  bullet: []
};

export { state, inputKey, game, object };
