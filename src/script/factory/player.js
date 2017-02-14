import { Tank } from './tank';
import { res } from '../data';
import { inputKey } from '../var';

let playImg = res.img.player;

class Player extends Tank {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.drawObjParam.unshift(playImg);
    this.shieldLastNum = 200;
    this.hasShield = true;
  }

  moveAble() {
    let pressedDirectionKey = inputKey.directionKey;

    if (!inputKey[pressedDirectionKey]) {
      return false;
    } else {
      if (this.direction !== pressedDirectionKey) {
        this.direction = pressedDirectionKey;
        this.resetPosition();
      }
      return true;
    }
  }
}

export { Player };
