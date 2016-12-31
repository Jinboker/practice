// game state
let state = {
  gameState: 'mode',           // mode, stage, play, over
  stageState: '',              // changeAble, noChange
  playState: '',               // fight, construct
  overState: ''                // nextStage, gameOver
};

// canvas
const role = document.getElementById('role');
const bg = document.getElementById('bg');
const misc = document.getElementById('misc');

let can = {
  role,
  bg,
  misc,
  cxt: {
    role: role.getContext('2d'),
    bg: bg.getContext('2d'),
    misc: misc.getContext('2d'),
    w: 516,
    h: 456,
    x: 20,
    y: 35
  }
};

// keyboard code
const W = 87;
const A = 65;
const S = 83;
const D = 68;
const H = 72;
const J = 74;

// which key has been pressed
let inputKey = {
  hasPressed: false,
  pressedKeyCode: null,
  [W]: false,
  [A]: false,
  [S]: false,
  [D]: false,
  [H]: false,
  [J]: false
};

let game = {
  playScreenL: 416,
  stage: 1,
  maxStage: 10
};

const PLAY_OFFSET_X = 35;
const PLAY_OFFSET_Y = 20;

export {
  state, can, W, A, S, D, H, J, inputKey, game,
  PLAY_OFFSET_X, PLAY_OFFSET_Y
};