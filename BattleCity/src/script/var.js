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
  pressedKeyCode: null,
  87: false,   // W
  65: false,   // A
  83: false,   // S
  68: false,   // D
  72: false,   // H
  74: false    // J
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