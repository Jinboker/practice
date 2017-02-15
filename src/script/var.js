// game state
let state = {
  gameState: 'start',           // start, stage, play, over
  stageState: '',              // changeAble, noChange
  playState: '',               // fight, construct
  overState: ''                // nextStage, gameOver
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

let obj = {
  player: null,
  npc: [],
  bullet: []
};

export { state, inputKey, game, obj };
