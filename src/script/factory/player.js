import { Tank } from './tank';
import { res } from '../data';
import { DIR, CXT_ROLE, OFFSET_X, OFFSET_Y } from '../const';
import { inputKey } from '../var';

const PLAY_IMG = res.img.player;

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
      this.changeWheels();
      if (this.direction !== pressedDirectionKey) {
        changDirectionAble = true;
        this.direction = pressedDirectionKey;
      }
    }

    return [moveAble, changDirectionAble]
  }

  draw() {
    this.move();
    this.shield();
    CXT_ROLE.drawImage(PLAY_IMG, this.rank * 32, DIR[this.direction] * 64 + this.wheelPic * 32, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
  }
}

export { Player };
