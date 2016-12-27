// game state
let state = {
  // mode, stage, play, over
  gameState: 'mode',
  // chooseAble, noChoose
  stageState: 'choose',
  // fight, construct
  playState: '',
  // nextStage, gameOver
  overState: ''
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

export { state, can, W, A, S, D, H, J, inputKey };