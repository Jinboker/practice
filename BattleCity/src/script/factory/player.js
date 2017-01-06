import { Tank } from './tank';
import { res } from '../data';

let playImg = res.img.player;

class Player extends Tank {
  constructor (x, y, direction, type) {
    super(x, y, direction, type);

    this.drawObjParam.unshift(playImg);
    this.moveAble = false;
    this.shieldLastNum = 200;
    this.hasShield = true;
  }
}

export { Player };