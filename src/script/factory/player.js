import { Tank } from './tank';
import { res } from '../data';
import { inputKey } from '../var';

let playImg = res.img.player;

class Player extends Tank {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.drawObjParam.unshift(playImg);
    this.moveAble = false;
    this.shieldLastNum = 200;
    this.hasShield = true;
  }

  confirmMoveAble() {

  }

  moveCtr() {
    let pressedKey = inputKey.pressedKey;

    if (inputKey.hasPressed) {

    }
  }

  isChangeDirection() {
    let keyCode = inputKey.pressedKey;

    if ( !inputKey.hasPressed
      || keyCode === this.direction
      || keyCode === 'H'
      || keyCode === 'J'
    ) {
      console.log('nnn');
      return false;
    }

    console.log('paa');

    this.direction = keyCode;
    return true;
  }
}

export { Player };
