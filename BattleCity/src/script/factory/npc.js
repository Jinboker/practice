import { Tank } from './tank';
import { res } from '../data';

let npcImg = res.img.npc;

class Npc extends Tank {
  constructor (x, y, direction) {
    super(x, y, direction);
    this.drawImgParam = [npcImg];
  }
}

export { Npc };