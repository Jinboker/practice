import { Tank } from './tank';
import { res } from '../data';
import { inputKey } from '../var';
import { W, A, S, D } from '../const';

let playImg = res.img.player;
let directionToKeyCode = {
  U: 'W',
  R: 'D',
  D: 'S',
  L: 'A'
};
let keyCodeToDirection = {
  W: 'U',
  D: 'R',
  S: 'D',
  A: 'L'
};

class Player extends Tank {
  constructor (x, y, direction, type) {
    super(x, y, direction, type);

    this.drawObjParam.unshift(playImg);
    this.moveAble = false;
    this.shieldLastNum = 200;
    this.hasShield = true;
  }

  changeDirection () {
    let keyCode = inputKey.pressedKeyCode;

    if ( !inputKey.hasPressed
      || keyCode === directionToKeyCode[this.direction]
      || keyCode === 'H'
      || keyCode === 'J'
    ) {
      console.log('nnn');
      return false;
    }

    this.moveAble = true;
    this.direction = keyCodeToDirection[keyCode];
    return true;
  }
}

export { Player };