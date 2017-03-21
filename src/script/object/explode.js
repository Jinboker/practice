import {res} from '../data';
import {CXT_MISC, OFFSET_X, OFFSET_Y} from '../variables';
import {delay} from '../comm';

const BOOM_IMG = res.img.boom;

class Explode {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.boomPic = 0;
    this.alive = true;

    this.init();
  }

  init() {
    if (this.type === 'big') {
      [this.x, this.y] = [this.x - 16, this.y - 16];
    } else {
      
    }
  }

  drawBig() {
    CXT_MISC.drawImage(BOOM_IMG, 16 + 64 * this.boomPic, 16, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
  }

  drawSmall() {
    CXT_MISC.drawImage(BOOM_IMG, 128 + 64 * this.boomPic, 0, 64, 64, this.x + OFFSET_X, this.y + OFFSET_Y, 64, 64);
  }

  draw() {
    this[this.type]();
  }
}

export {Explode};
