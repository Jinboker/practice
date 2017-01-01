import { Mover } from './mover';
import { res } from '../data';

let bulletImg = res.img.misc;

class Bullet extends Mover {
  constructor (x, y, direction) {
    super(x, y, direction);
    this.drawImgParam = [bulletImg];
  }
}

export { Bullet };