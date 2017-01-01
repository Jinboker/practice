import { Tank } from './tank';
import { res } from '../data';

let playImg = res.img.player;

class Player extends Tank {
  constructor (x, y, direction) {
    super(x, y, direction);
    this.drawImgParam = [playImg];
    this.moveAble = false;
  }
}

export { Player };