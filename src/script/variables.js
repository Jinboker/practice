// canvas
export const CXT_ROLE = document.getElementById('role').getContext('2d');
export const CXT_BG = document.getElementById('bg').getContext('2d');
export const CXT_MISC = document.getElementById('misc').getContext('2d');
export const CXT_W = 516;
export const CXT_H = 456;
export const SCREEN_L = 416;
export const OFFSET_X = 35;
export const OFFSET_Y = 20;

export const MAX_STAGE = 10;
export const WHEEL_CHANGE_FREQUENT = 6;
export const SHIELD_CHANGE_FREQUENT = 4;
export const FIRE_MIN_FREQUENT = 15;

export const DIR = { W: 0, D: 1, S: 2, A: 3 };
export let state = {
  game: 'chooseMode',     // chooseMode, chooseStage, playGame, over
  stage: '',              // chaneAble, noChange
  play: '',               // fight, construct
  over: ''                // nextStage, gameOver
};

// which key has been pressed
export let inputKey = {
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

export let game = {
  stage: 1
};

export let object = {
  tank: new Array(6),
  bullet: []
};
