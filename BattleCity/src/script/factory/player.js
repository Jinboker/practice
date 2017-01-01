import { Tank } from './tank';
import { res } from '../data';

let playImg = res.img.player;

class Player extends Tank {
  constructor (x, y, direction) {
    super(x, y, direction);

    this.drawObjParam.unshift(playImg);
    this.moveAble = false;
    this.shieldLastNum = 200;
    this.hasShield = true;
  }


  doBeforeDrawImg() {
    this.shield();
  }
}

export { Player };