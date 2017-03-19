import { res } from '../data';

const BOOM_IMG = res.img.boom;

class Explode {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.boomScope = type === 'big' ? 64 : 32;
    this.over = false;
  }

  big() {
    
  }

  small() {

  }

  draw() {
    this[this.type]();
  }
}

export {Explode};
