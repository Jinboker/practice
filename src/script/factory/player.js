import { Tank } from './tank';
import { res } from '../data';
import { DIR, CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';
import { inputKey } from '../var';

let playImg = res.img.player;

class Player extends Tank {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.shieldLastNum = 200;
    this.hasShield = true;
    this.speed = 2;
  }

  moveState() {
    let pressedDirectionKey = inputKey.directionKey;
    let moveAble = false;
    let changDirectionAble = false;

    if (inputKey[pressedDirectionKey]) {
      moveAble = true;
      if (this.direction !== pressedDirectionKey) {
        changDirectionAble = true;
        this.direction = pressedDirectionKey;
      }
    }

    return [moveAble, changDirectionAble]
  }

  draw() {
    this.move();
    // this.doBeforeDrawObj();
    CXT_ROLE.drawImage(playImg, this.rank * 32, DIR[this.direction] * 64 + this.wheelPic * 32, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
  }
}

export { Player };
