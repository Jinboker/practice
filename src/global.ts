export const CXT_ROLE = (document.getElementById('role') as HTMLCanvasElement).getContext('2d')!;
export const CXT_BG = (document.getElementById('bg') as HTMLCanvasElement).getContext('2d')!;
export const CXT_MISC = (document.getElementById('misc') as HTMLCanvasElement).getContext('2d')!;

export const CXT_W = 516;
export const CXT_H = 456;
export const SCREEN_L = 416;
export const OFFSET_X = 35;
export const OFFSET_Y = 20;

export const MAX_STAGE = 10;
export const FIRE_MIN_FREQUENT = 25;

export const NPC_MAX_NUM = 20;

export enum keyNum {
  W = 87, A = 65, S = 83, D = 68, H = 72, J = 74
}

export enum roadType {
  Pass = 0, IceRoad = 1, River = 2, Brick = 3, Steel = 4, Home = 5
}

export enum directionNum {
  W = 0, D = 1, S = 2, A = 3
}

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
  maxStage: 10,
  aliveNpcMax: 5,
  npcNumMax: 20
};

export const spiritCollection: SpiritCollection = {
  tankArr: [],
  bulletArr: [],
  explodeArr: []
};

export const brickStatus = {};
